"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getIcon } from "@/lib/icons";
import { slugifyServiceTitle } from "@/lib/services";

interface Service {
  _id: string;
  title: string;
  icon: string;
  items?: string[];
  longDescriptionHtml?: string;
  order: number;
}

interface ServiceAccordionProps {
  services: Service[];
}

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const slugs = useMemo(
    () => new Set(services.map((s) => slugifyServiceTitle(s.title))),
    [services]
  );
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash || !slugs.has(hash)) return;
      setOpenItems([hash]);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [slugs]);

  return (
    <Accordion
      multiple
      value={openItems}
      onValueChange={(v) => setOpenItems(v as string[])}
      className="mx-auto max-w-3xl"
    >
      {services.map((service) => {
        const Icon = getIcon(service.icon);
        const slug = slugifyServiceTitle(service.title);
        return (
          <AccordionItem key={service._id} value={slug} id={slug} className="scroll-mt-24">
            <AccordionTrigger className="gap-3 px-4 py-4 text-base font-semibold">
              <Icon className="size-5 shrink-0 text-primary" />
              <span className="flex-1">{service.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              {service.longDescriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: service.longDescriptionHtml }}
                  className="prose prose-sm text-muted-foreground"
                />
              ) : service.items ? (
                <ul className="space-y-1 text-muted-foreground">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
