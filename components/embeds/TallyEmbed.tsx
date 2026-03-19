"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TallyEmbedProps {
  formId: string;
  redirectUrl?: string;
  title: string;
}

export function TallyEmbed({ formId, redirectUrl, title }: TallyEmbedProps) {
  const tallyUrl = formId
    ? (() => {
        const params = new URLSearchParams({
          alignLeft: "1",
          hideTitle: "1",
          transparentBackground: "1",
        });
        if (redirectUrl) {
          params.set("redirectUrl", redirectUrl);
        }
        return `https://tally.so/embed/${formId}?${params.toString()}`;
      })()
    : null;

  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    tallyUrl ? "loading" : "error"
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!tallyUrl) return;

    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current));
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tallyUrl]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatus("loaded");
  };

  const fallbackUrl = formId
    ? `https://tally.so/r/${formId}`
    : "https://tally.so";

  return (
    <div className="w-full">
      {status === "loading" && (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {tallyUrl && (
        <iframe
          src={tallyUrl}
          title={title}
          width="100%"
          className={`min-h-[500px] border-0 md:min-h-[600px] ${status !== "loaded" ? "hidden" : ""}`}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}

      {status === "error" && (
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="mb-4 text-muted-foreground">
            Le formulaire ne s&apos;affiche pas ?
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            Accéder au formulaire
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
