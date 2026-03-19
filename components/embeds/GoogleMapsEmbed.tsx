import { ExternalLink } from "lucide-react";

interface GoogleMapsEmbedProps {
  src: string;
  title: string;
}

export function GoogleMapsEmbed({ src, title }: GoogleMapsEmbedProps) {
  if (!src) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-lg border bg-card md:h-[350px]">
        <div className="text-center">
          <p className="mb-2 text-muted-foreground">
            Petit-Bourg, Guadeloupe
          </p>
          <a
            href="https://maps.google.com/?q=Petit-Bourg+Guadeloupe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            Voir sur Google Maps
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      className="h-[300px] rounded-lg border-0 md:h-[350px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
