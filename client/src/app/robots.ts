//@ Modules
import { MetadataRoute } from 'next'
import { siteConfig } from '@config/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteConfig.metadataBase.origin}/sitemap.xml`
  }
}