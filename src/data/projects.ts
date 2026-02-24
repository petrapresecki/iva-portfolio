export interface Project {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  video?: string
  year: number
}

// Placeholder — Iva will fill this in with her real projects
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'Brief description of the project.',
    category: 'Branding',
    thumbnail: '/videos/placeholder.mp4',
    year: 2025,
  },
]
