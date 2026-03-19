import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/react";

interface BlogPostContentProps {
  title: string;
  publishedAt: string;
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  body: PortableTextBlock[];
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function BlogPostContent({
  title,
  publishedAt,
  mainImage,
  body,
}: BlogPostContentProps) {
  return (
    <article className="mx-auto max-w-prose">
      {mainImage?.asset && (
        <Image
          src={urlFor(mainImage).width(720).height(405).auto("format").url()}
          alt={mainImage.alt || title}
          width={720}
          height={405}
          priority
          className="mb-8 w-full rounded-lg object-cover"
        />
      )}

      <h1 className="mb-4">{title}</h1>

      <time
        dateTime={publishedAt}
        className="mb-8 block text-sm text-muted-foreground"
      >
        {formatDate(publishedAt)}
      </time>

      <PortableTextRenderer value={body} />
    </article>
  );
}
