interface GoogleMapsEmbedProps {
  src: string;
  title: string;
}

const DEFAULT_MAPS_QUERY = "17+rue+Amédée+FENGAROL+97170+PETIT-BOURG+Guadeloupe";

export function GoogleMapsEmbed({ src, title }: GoogleMapsEmbedProps) {
  const embedSrc = src || `https://maps.google.com/maps?q=${DEFAULT_MAPS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <iframe
      src={embedSrc}
      title={title}
      width="100%"
      className="h-[300px] rounded-lg border-0 md:h-[350px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
