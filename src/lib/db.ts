import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  slug: string;
  venueName: string;
  city: string;
  country: string;
  yearBuilt: number;
  voicesCount: number;
  manuals: string;
  actionType?: string;
  status: 'completed' | 'upcoming';
  mainImage: string;
  galleryImages: string[];
  longDescription: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Utility to upload base64 images to Supabase Storage
const uploadBase64Image = async (base64Str: string, folder: string): Promise<string> => {
  if (!base64Str.startsWith('data:image')) return base64Str; // Already a URL

  const base64Data = base64Str.split(',')[1];
  const mimeType = base64Str.match(/data:(.*?);/)?.[1] || 'image/jpeg';
  const extension = mimeType.split('/')[1];
  
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new Blob([byteArray], { type: mimeType });

  const fileName = `${folder}/${uuidv4()}.${extension}`;

  const { error } = await supabase.storage
    .from('project-images')
    .upload(fileName, file, { contentType: mimeType, upsert: true });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};

// Map DB snake_case to frontend camelCase
const mapToFrontend = (row: Record<string, unknown>): Project => ({
  id: row.id,
  slug: row.slug,
  venueName: row.venue_name,
  city: row.city,
  country: row.country,
  yearBuilt: row.year_built,
  voicesCount: row.voices_count,
  manuals: row.manuals,
  actionType: row.action_type,
  status: row.status,
  mainImage: row.main_image,
  galleryImages: row.gallery_images || [],
  longDescription: row.long_description,
});

// Map frontend camelCase to DB snake_case
const mapToDB = (project: Omit<Project, 'id'>) => ({
  slug: project.slug,
  venue_name: project.venueName,
  city: project.city,
  country: project.country,
  year_built: project.yearBuilt,
  voices_count: project.voicesCount,
  manuals: project.manuals,
  action_type: project.actionType,
  status: project.status,
  main_image: project.mainImage,
  gallery_images: project.galleryImages,
  long_description: project.longDescription,
});

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from('projects').select('*').order('year_built', { ascending: false });
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data.map(mapToFrontend);
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
  if (error || !data) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
  return mapToFrontend(data);
};

export const saveProject = async (project: Omit<Project, 'id'> & { id?: string }): Promise<void> => {
  try {
    // 1. Upload Images to Storage if they are base64
    let mainImageUrl = project.mainImage;
    if (project.mainImage && project.mainImage.startsWith('data:image')) {
      mainImageUrl = await uploadBase64Image(project.mainImage, project.slug);
    }

    const galleryUrls: string[] = [];
    for (const img of project.galleryImages) {
      if (img.startsWith('data:image')) {
        const url = await uploadBase64Image(img, project.slug);
        galleryUrls.push(url);
      } else {
        galleryUrls.push(img);
      }
    }

    const dbPayload = mapToDB({
      ...project,
      mainImage: mainImageUrl,
      galleryImages: galleryUrls
    });

    if (project.id) {
      // Update
      const { error } = await supabase.from('projects').update(dbPayload).eq('id', project.id);
      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase.from('projects').insert([dbPayload]);
      if (error) throw error;
    }
  } catch (error) {
    console.error('Save project error:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const createSlug = (name: string): string => {
  const polishMap: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n', 'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z'
  };
  
  const withoutPolish = name.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, match => polishMap[match]);

  return withoutPolish
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
