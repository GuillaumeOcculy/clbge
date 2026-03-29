import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { blogPostSlugsQuery } from '@/sanity/lib/queries'

const SITE_URL = 'https://clbge.com'

const staticPages: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  { url: `${SITE_URL}/nos-prestations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/qui-suis-je`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/notre-mission`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/nos-technologies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/diagnostic`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/rendez-vous`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: MetadataRoute.Sitemap = []

  try {
    if (!client) throw new Error('no client')
    const posts = await client.fetch(blogPostSlugsQuery)
    blogUrls = (posts ?? []).map((post: { slug: string }) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity indisponible
  }

  return [...staticPages, ...blogUrls]
}
