import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { CtaBanner } from "@/components/sections/CtaBanner";

const defaultTechnologies = [
  { _id: "1", name: "AutoCAD", category: "Logiciel", description: "Conception assistée par ordinateur pour les plans topographiques et fonciers", image: null, order: 1 },
  { _id: "2", name: "Covadis", category: "Logiciel", description: "Module topographique et VRD pour AutoCAD, calculs de surfaces et cubatures", image: null, order: 2 },
  { _id: "3", name: "Trimble Business Center", category: "Logiciel", description: "Traitement des données GNSS et stations totales, calculs géodésiques", image: null, order: 3 },
  { _id: "4", name: "Leica Cyclone", category: "Logiciel", description: "Traitement de nuages de points 3D issus du scanner laser", image: null, order: 4 },
  { _id: "5", name: "Station totale Leica", category: "Matériel terrain", description: "Mesures angulaires et de distances de haute précision pour les levés topographiques", image: null, order: 5 },
  { _id: "6", name: "GPS RTK Trimble", category: "Matériel terrain", description: "Positionnement centimétrique en temps réel pour les relevés de terrain", image: null, order: 6 },
  { _id: "7", name: "Scanner 3D Leica BLK360", category: "Matériel terrain", description: "Acquisition 3D rapide et précise pour la modélisation de bâtiments et de sites", image: null, order: 7 },
  { _id: "8", name: "Drone DJI", category: "Matériel terrain", description: "Photogrammétrie aérienne et relevés de grandes surfaces", image: null, order: 8 },
];

interface Technology {
  _id: string;
  name: string;
  category: string;
  description: string | null;
  image: { asset: unknown; alt: string } | null;
  order: number;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nos technologies — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Découvrez les logiciels et équipements de pointe utilisés par le cabinet : station totale, GPS RTK, scanner 3D, drone, AutoCAD, Covadis.",
    openGraph: {
      title: "Nos technologies — CLBGE",
      description: "Logiciels et matériel de pointe pour des relevés précis en Guadeloupe.",
      type: "website",
    },
  };
}

function TechnologyCard({ tech, urlFor }: { tech: Technology; urlFor?: (source: unknown) => { width: (w: number) => { height: (h: number) => { url: () => string } } } }) {
  return (
    <Card>
      {tech.image && urlFor && (
        <Image
          src={urlFor(tech.image).width(400).height(300).url()}
          alt={tech.image.alt || tech.name}
          width={400}
          height={300}
          className="rounded-t-xl object-cover"
        />
      )}
      <CardHeader>
        <CardTitle>{tech.name}</CardTitle>
        {tech.description && (
          <CardDescription>{tech.description}</CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}

export default async function NosTechnologies() {
  let technologies: Technology[] = [];
  let urlForFn: ((source: unknown) => { width: (w: number) => { height: (h: number) => { url: () => string } } }) | undefined;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { allTechnologiesQuery } = await import("@/sanity/lib/queries");
      const { urlFor } = await import("@/sanity/lib/image");
      technologies = (await client.fetch(allTechnologiesQuery)) ?? [];
      urlForFn = urlFor as typeof urlForFn;
    }
  } catch {
    // Sanity pas encore alimenté — fallback hardcoded
  }

  const techList = technologies.length ? technologies : defaultTechnologies;
  const logiciels = techList.filter((t) => t.category === "Logiciel");
  const materiel = techList.filter((t) => t.category === "Matériel terrain");

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Nos technologies</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <h2 className="mb-8 text-center text-xl font-semibold md:text-2xl">Logiciels</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {logiciels.map((tech) => (
              <TechnologyCard key={tech._id} tech={tech} urlFor={urlForFn} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="mb-8 text-center text-xl font-semibold md:text-2xl">Matériel terrain</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {materiel.map((tech) => (
              <TechnologyCard key={tech._id} tech={tech} urlFor={urlForFn} />
            ))}
          </div>
        </div>
      </section>

      <ZoneIntervention />

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
