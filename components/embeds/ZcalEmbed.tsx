"use client";

interface ZcalEmbedProps {
  calendarUrl: string;
  title: string;
}

export function ZcalEmbed({ calendarUrl, title }: ZcalEmbedProps) {
  if (!calendarUrl) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Le calendrier de prise de rendez-vous n&apos;est pas encore configuré.
        </p>
      </div>
    );
  }

  const embedUrl = `${calendarUrl}?embed=1&embedType=inline`;

  return (
    <iframe
      src={embedUrl}
      title={title}
      width="100%"
      className="min-h-[700px] border-0 md:min-h-[800px]"
      loading="lazy"
    />
  );
}
