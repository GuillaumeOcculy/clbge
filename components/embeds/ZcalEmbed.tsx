"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ZcalEmbedProps {
  calendarUrl: string;
  title: string;
}

export function ZcalEmbed({ calendarUrl, title }: ZcalEmbedProps) {
  const embedUrl = calendarUrl
    ? `${calendarUrl}${calendarUrl.includes("?") ? "&" : "?"}embed=1&embedType=iframe`
    : null;

  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    embedUrl ? "loading" : "error"
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!embedUrl) return;

    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current));
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [embedUrl]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatus("loaded");
  };

  const fallbackUrl = calendarUrl || "https://zcal.co";

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

      {embedUrl && (
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          className={`min-h-[600px] border-0 md:min-h-[700px] ${status !== "loaded" ? "hidden" : ""}`}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}

      {status === "error" && (
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="mb-4 text-muted-foreground">
            Le calendrier ne s&apos;affiche pas ?
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            Prendre rendez-vous sur Zcal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
