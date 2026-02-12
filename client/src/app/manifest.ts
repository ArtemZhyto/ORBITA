import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title.default,
    short_name: 'ORBITA',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: '70x70',
        type: 'image/png',
      },
      {
        src: '/images/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}