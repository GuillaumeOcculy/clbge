interface GoogleMapsEmbedProps {
  src: string;
  title: string;
}

// Coordonnées GPS précises du cabinet (16°13'53.8"N 61°35'19.7"W)
const DEFAULT_MAPS_QUERY = "loc:16.231611,-61.588806";

export function GoogleMapsEmbed({ src, title }: GoogleMapsEmbedProps) {
  const embedSrc = src || `https://maps.google.com/maps?q=${DEFAULT_MAPS_QUERY}&t=&z=18&ie=UTF8&iwloc=&output=embed`;

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
