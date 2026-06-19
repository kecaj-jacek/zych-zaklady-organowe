import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';

export interface Project {
  id: string;
  slug: string;
  venueName: string;
  city: string;
  country: string;
  yearBuilt: number;
  voicesCount: number;
  manuals: string;
  status: 'completed' | 'upcoming';
  mainImage: string;
  galleryImages: string[];
  longDescription: string;
}

const STORAGE_KEY = 'zych_projects_db';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const data = await localforage.getItem<Project[]>(STORAGE_KEY);
    return data || [];
  } catch (error) {
    console.error('Failed to load projects from IndexedDB', error);
    return [];
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
};

export const saveProject = async (project: Omit<Project, 'id'> & { id?: string }): Promise<Project> => {
  const projects = await getProjects();
  
  if (project.id) {
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      const updated = { ...projects[index], ...project } as Project;
      projects[index] = updated;
      await localforage.setItem(STORAGE_KEY, projects);
      return updated;
    }
  }

  // Create new project
  const newProject: Project = {
    ...project,
    id: uuidv4(),
  };
  projects.push(newProject);
  await localforage.setItem(STORAGE_KEY, projects);
  return newProject;
};

export const deleteProject = async (id: string): Promise<void> => {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  await localforage.setItem(STORAGE_KEY, filtered);
};

export const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
