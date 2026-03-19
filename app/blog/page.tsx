import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog — CLBGE, Géomètre-Expert en Guadeloupe";
  const description =
    "Articles et actualités du cabinet CLBGE. Informations sur le métier de géomètre-expert, le foncier et les sujets immobiliers en Guadeloupe.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function BlogPage() {
  let posts: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt?: string;
    mainImage?: { asset: { _ref: string }; alt?: string };
  }[] = [];

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { allBlogPostsQuery } = await import("@/sanity/lib/queries");
      posts = (await client.fetch(allBlogPostsQuery)) ?? [];
    }
  } catch {
    // Sanity pas encore alimenté
  }

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
                <BlogPostCard
                  key={post._id}
                  title={post.title}
                  slug={post.slug.current}
                  publishedAt={post.publishedAt}
                  excerpt={post.excerpt}
                  mainImage={post.mainImage}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-lg text-center">
              <p className="text-lg text-muted-foreground">
                Les premiers articles arrivent bientôt. En attendant,
                n&apos;hésitez pas à{" "}
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
  );
}
