export interface GalleryImage {
  src: string
  alt: string
}

export type GalleryBlock =
  | { type: 'images'; items: GalleryImage[] }
  | { type: 'font-specimen'; fontName: string; fontStyle: string }

export interface Project {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  video?: string
  year: number
  // Detail page fields
  longDescription?: string
  tags?: string[]
  role?: string
  heroImage?: string
  gallery?: GalleryBlock[]
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
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['cider', 'packaging', 'branding'],
    role: 'logo, branding, packaging',
    heroImage: '/images/apuro-showcase.png',
    gallery: [
      { type: 'images', items: [
        { src: '/images/apuro-bottles.jpg', alt: 'Apuro bottles' },
        { src: '/images/apuro-bottle-detail.png', alt: 'Apuro bottle detail' },
      ]},
      { type: 'font-specimen', fontName: 'Gotoshi', fontStyle: 'Regular' },
      { type: 'images', items: [
        { src: '/images/apuro-packaging-wide.jpg', alt: 'Apuro packaging wide' },
      ]},
      { type: 'images', items: [
        { src: '/images/apuro-packaging-1.jpg', alt: 'Apuro packaging front' },
        { src: '/images/apuro-packaging-2.jpg', alt: 'Apuro packaging back' },
      ]},
      { type: 'images', items: [
        { src: '/images/apuro-closeup-1.jpg', alt: 'Apuro closeup' },
        { src: '/images/apuro-closeup-2.png', alt: 'Apuro closeup detail' },
      ]},
    ],
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
