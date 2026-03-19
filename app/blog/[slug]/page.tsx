import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogCtaEndArticle } from "@/components/blog/BlogCtaEndArticle";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return [];
    const { client } = await import("@/sanity/lib/client");
    const { blogPostSlugsQuery } = await import("@/sanity/lib/queries");
    const slugs = await client.fetch(blogPostSlugsQuery);
    return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) throw new Error();
    const { client } = await import("@/sanity/lib/client");
    const { blogPostBySlugQuery } = await import("@/sanity/lib/queries");
    const post = await client.fetch(blogPostBySlugQuery, { slug });
    if (!post) return { title: "Article introuvable — CLBGE" };
    return {
      title: post.metaTitle || `${post.title} — CLBGE`,
      description: post.metaDescription || `Article : ${post.title}`,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || `Article : ${post.title}`,
        type: "article",
      },
    };
  } catch {
    return { title: "Blog — CLBGE" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post = null;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { blogPostBySlugQuery } = await import("@/sanity/lib/queries");
      post = await client.fetch(blogPostBySlugQuery, { slug });
    }
  } catch {
    // Sanity pas encore alimenté
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <BlogPostContent
            title={post.title}
            publishedAt={post.publishedAt}
            mainImage={post.mainImage}
            body={post.body ?? []}
          />
          <BlogCtaEndArticle />
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
