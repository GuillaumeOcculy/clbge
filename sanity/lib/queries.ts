export interface BlogPostListItem {
  _id: string
  title: string | null
  slug: { current: string } | null
  publishedAt: string | null
  excerpt: string | null
  mainImage: { asset: { _id: string; url: string } | null; alt: string | null } | null
}

export interface BlogPost extends BlogPostListItem {
  body: unknown[] | null
  metaTitle: string | null
  metaDescription: string | null
}

export const allBlogPostsQuery =
  `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt,
    mainImage { asset->{_id, url}, alt }
  }`

export const blogPostBySlugQuery =
  `*[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, body,
    mainImage { asset->{_id, url}, alt },
    metaTitle, metaDescription
  }`

export const blogPostSlugsQuery =
  `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt)]
    { "slug": slug.current }`
