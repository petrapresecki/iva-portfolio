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

export const projects: Project[] = [
  {
    id: 'rool',
    title: 'Rool',
    description: 'Branding project.',
    category: 'Branding, visual identity',
    thumbnail: '/images/rool.jpg',
    video: '/videos/rool.mp4',
    year: 2026,
  },
  {
    id: 'apuro',
    title: 'Apuro',
    description: 'Packaging design project.',
    category: 'Branding, packaging, visual identity',
    thumbnail: '/images/apuro.jpg',
    video: '/videos/apuro/apuro.mp4',
    year: 2025,
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['cider', 'packaging', 'branding'],
    role: 'logo, branding, packaging',
    heroImage: '/images/apuro/apuro-showcase.webp',
    gallery: [
      { type: 'images', items: [
        { src: '/images/apuro/apuro-bottles.jpg', alt: 'Apuro bottles' },
        { src: '/images/apuro/apuro-bottle-detail.webp', alt: 'Apuro bottle detail' },
      ]},
      { type: 'font-specimen', fontName: 'Gotoshi', fontStyle: 'Regular' },
      { type: 'images', items: [
        { src: '/images/apuro/apuro-packaging-wide.jpg', alt: 'Apuro packaging wide' },
      ]},
      { type: 'images', items: [
        { src: '/images/apuro/apuro-packaging-1.jpg', alt: 'Apuro packaging front' },
        { src: '/images/apuro/apuro-packaging-2.jpg', alt: 'Apuro packaging back' },
      ]},
      { type: 'images', items: [
        { src: '/images/apuro/apuro-closeup-1.jpg', alt: 'Apuro closeup' },
        { src: '/images/apuro/apuro-closeup-2.webp', alt: 'Apuro closeup detail' },
      ]},
    ],
  },
  {
    id: 'booklet',
    title: 'Booklet',
    description: 'Editorial design project.',
    category: 'Editorial design, cover design',
    thumbnail: '/images/booklet.jpg',
    video: '/videos/booklet/booklet-hero.mp4',
    year: 2025,
  },
  {
    id: 'gabagool',
    title: 'Gabagool',
    description: 'Branding project.',
    category: 'Branding, visual identity',
    thumbnail: '/images/gabagool.jpg',
    video: '/videos/gabagool.mp4',
    year: 2026,
  },
]
