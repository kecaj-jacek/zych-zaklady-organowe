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
  status: 'completed' | 'upcoming';
  mainImage: string;
  galleryImages: string[];
  longDescription: string;
}

const STORAGE_KEY = 'zych_projects';

export const getProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load projects from DB', error);
    return [];
  }
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug);
};

export const saveProject = (project: Omit<Project, 'id'> & { id?: string }): Project => {
  const projects = getProjects();
  
  if (project.id) {
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      const updated = { ...projects[index], ...project } as Project;
      projects[index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      return updated;
    }
  }

  // Create new project
  const newProject: Project = {
    ...project,
    id: uuidv4(),
  };
  projects.push(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return newProject;
};

export const deleteProject = (id: string): void => {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
