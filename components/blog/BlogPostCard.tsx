import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";

interface BlogPostCardProps {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function BlogPostCard({
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
}: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="h-full transition-all duration-200 group-hover:border-primary group-hover:shadow-md">
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          {mainImage?.asset ? (
            <Image
              src={urlFor(mainImage).width(600).height(338).auto("format").url()}
              alt={mainImage.alt || title}
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
            {title}
          </h3>
          <time
            dateTime={publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(publishedAt)}
          </time>
          {excerpt && (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {excerpt}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
