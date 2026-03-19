import { defineQuery } from 'next-sanity'

// ─── Singletons ──────────────────────────────────────────────

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    cabinetName,
    phone,
    email,
    address,
    linkedinUrl,
    orderNumber,
    metaTitle,
    metaDescription,
    ogImage
  }
`)

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroCtaPrimary,
    heroCtaSecondary,
    trustBarItems[] { text },
    diagnosticTitle,
    diagnosticDescription,
    ctaBannerTitle,
    ctaBannerSubtitle,
    ctaBannerButton
  }
`)

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0] {
    title,
    portrait { asset, alt },
    bio,
    qualifications[] { title, description },
    metaTitle,
    metaDescription
  }
`)

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0] {
    title,
    introText,
    tallyFormId,
    metaTitle,
    metaDescription
  }
`)

// ─── Collections ─────────────────────────────────────────────

export const allServicesQuery = defineQuery(`
  *[_type == "serviceItem"] | order(order asc) {
    _id,
    title,
    icon,
    shortDescription,
    longDescription,
    order
  }
`)

export const allMissionStepsQuery = defineQuery(`
  *[_type == "missionStep"] | order(stepNumber asc) {
    _id,
    title,
    description,
    stepNumber
  }
`)

export const allTechnologiesQuery = defineQuery(`
  *[_type == "technology"] | order(order asc) {
    _id,
    name,
    category,
    description,
    image { asset, alt },
    order
  }
`)

// ─── Blog ────────────────────────────────────────────────────

export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage { asset, alt }
  }
`)

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage { asset, alt },
    body[] {
      ...,
      _type == "image" => { asset, alt, caption }
    },
    metaTitle,
    metaDescription
  }
`)

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && defined(publishedAt)] {
    "slug": slug.current
  }
`)
