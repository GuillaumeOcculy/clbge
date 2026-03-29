import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(720).auto('format').url()}
            alt={value.alt || ''}
            width={720}
            height={405}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2 className="mt-8 mb-4 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-3 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-1 text-muted-foreground">{children}</ol>,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogPortableText({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />
}
