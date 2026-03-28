"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getIcon } from "@/lib/icons";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/react";

interface Service {
  _id: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription?: PortableTextBlock[] | null;
  longDescriptionHtml?: string;
  order: number;
}

interface ServiceAccordionProps {
  services: Service[];
}

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  return (
    <Accordion className="mx-auto max-w-3xl">
      {services.map((service) => {
        const Icon = getIcon(service.icon);
        return (
          <AccordionItem key={service._id} value={service._id}>
            <AccordionTrigger className="gap-3 px-4 py-4 text-base font-semibold">
              <Icon className="size-5 shrink-0 text-primary" />
              <span className="flex-1">{service.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              {service.longDescription && Array.isArray(service.longDescription) && service.longDescription.length > 0 ? (
                <PortableTextRenderer value={service.longDescription} />
              ) : service.longDescriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: service.longDescriptionHtml }}
                  className="prose prose-sm text-muted-foreground"
                />
              ) : (
                <p className="text-muted-foreground">
                  {service.shortDescription}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
