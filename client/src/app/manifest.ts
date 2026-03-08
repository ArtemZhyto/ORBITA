//@ Modules
import { MetadataRoute } from 'next'

//@ Config
import { siteConfig } from '@config/metadata'

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
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}