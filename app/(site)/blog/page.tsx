import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { allBlogPostsQuery, type BlogPostListItem } from '@/sanity/lib/queries'
import { Card, CardContent } from '@/components/ui/card'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = {
  title: 'Blog — CLBGE, Géomètre-Expert en Guadeloupe',
  description:
    'Articles et actualités du cabinet CLBGE. Informations sur le métier de géomètre-expert, le foncier et les sujets immobiliers en Guadeloupe.',
  openGraph: {
    title: 'Blog — CLBGE',
    description: 'Articles et actualités du cabinet CLBGE.',
    type: 'website',
  },
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export default async function BlogPage() {
  const posts = await client.fetch<BlogPostListItem[]>(allBlogPostsQuery)

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Blog</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug?.current}`} className="group block">
                  <Card className="h-full transition-all duration-200 group-hover:border-primary group-hover:shadow-md">
                    <div className="relative aspect-video overflow-hidden rounded-t-xl">
                      {post.mainImage?.asset ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(338).auto('format').url()}
                          alt={post.mainImage.alt || post.title || ''}
                          width={600}
                          height={338}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted/30 text-sm text-muted-foreground">
                          Image à venir
                        </div>
                      )}
                    </div>
                    <CardContent className="flex flex-1 flex-col gap-2">
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug">
                        {post.title}
                      </h3>
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      {post.excerpt && (
                        <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-lg text-center">
              <p className="text-lg text-muted-foreground">
                Les premiers articles arrivent bientôt. En attendant,
                n&apos;hésitez pas à{' '}
                <Link
                  href="/contact"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  nous contacter
                </Link>
                .
              </p>
            </div>
          )}
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
