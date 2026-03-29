import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { blogPostBySlugQuery, blogPostSlugsQuery, type BlogPost } from '@/sanity/lib/queries'
import { BlogPortableText } from '@/components/blog/PortableText'
import { CtaBanner } from '@/components/sections/CtaBanner'

export async function generateStaticParams() {
  const slugs = await client.fetch(blogPostSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<BlogPost | null>(blogPostBySlugQuery, { slug })

  if (!post) return { title: 'Article introuvable — CLBGE' }

  const title = post.metaTitle || `${post.title} — CLBGE`
  const description = post.metaDescription || post.excerpt || `Article : ${post.title}`
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).auto('format').url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title: post.metaTitle || post.title || '',
      description,
      type: 'article',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  }
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch<BlogPost | null>(blogPostBySlugQuery, { slug })

  if (!post) notFound()

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <article className="mx-auto max-w-prose">
            {post.mainImage?.asset && (
              <Image
                src={urlFor(post.mainImage).width(720).height(405).auto('format').url()}
                alt={post.mainImage.alt || post.title || ''}
                width={720}
                height={405}
                priority
                className="mb-8 w-full rounded-lg object-cover"
              />
            )}

            <h1 className="mb-4">{post.title}</h1>

            {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="mb-8 block text-sm text-muted-foreground"
              >
                {formatDate(post.publishedAt)}
              </time>
            )}

            {post.body && <BlogPortableText value={post.body} />}
          </article>
        </div>
      </section>

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  )
}
