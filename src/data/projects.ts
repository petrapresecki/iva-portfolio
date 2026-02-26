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
    id: 'booklet',
    title: 'Booklet',
    description: 'Layout design project.',
    category: 'Layout design',
    thumbnail: '/images/booklet.jpg',
    year: 2025,

  },
  {
    id: 'apuro',
    title: 'Apuro',
    description: 'Packaging design project.',
    category: 'Packaging',
    thumbnail: '/images/apuro.jpg',
    year: 2025,

  },
  {
    id: 'rool',
    title: 'Rool',
    description: 'Branding project.',
    category: 'Branding',
    thumbnail: '/images/rool.jpg',
    year: 2025,

  },
  {
    id: 'ulicni_fenjer',
    title: 'Ulični fenjer',
    description: 'Illustration project.',
    category: 'Illustration',
    thumbnail: '/images/ulicni_fenjer.jpg',
    year: 2025,

  },
]
