"use client";

import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-muted-foreground">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6">{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
