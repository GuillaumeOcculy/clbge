const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'Cabinet Laurent Bazile Géomètre-Expert',
  description:
    'Cabinet de géomètre-expert en Guadeloupe. Bornage, division, copropriété, topographie et diagnostics immobiliers à Petit-Bourg.',
  url: 'https://clbge.com',
  telephone: '+590690612422',
  email: 'contact@clbge.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '29 Chem. de Papin',
    addressLocality: 'Petit-Bourg',
    addressRegion: 'Guadeloupe',
    postalCode: '97170',
    addressCountry: 'GP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 16.1894,
    longitude: -61.5938,
  },
  areaServed: [
    { '@type': 'Place', name: 'Guadeloupe' },
    { '@type': 'Place', name: 'Marie-Galante' },
    { '@type': 'Place', name: 'Les Saintes' },
    { '@type': 'Place', name: 'La Désirade' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foncier' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Topographie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Copropriété' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Plans d'architecture" } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Relevés 3D' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Surfaces réglementaires' } },
    ],
  },
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
