import type { Metadata } from "next";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";

const defaultServices = [
  { _id: "1", title: "Foncier", icon: "Landmark", shortDescription: "Bornage, reconnaissance de limites, divisions parcellaires, servitudes", longDescription: null, order: 1 },
  { _id: "2", title: "Topographie", icon: "Mountain", shortDescription: "Relevés topographiques, plans de terrain, modélisation", longDescription: null, order: 2 },
  { _id: "3", title: "Copropriété", icon: "Building2", shortDescription: "Mise en copropriété, état descriptif de division, règlement", longDescription: null, order: 3 },
  { _id: "4", title: "Plans d'architecture", icon: "PenTool", shortDescription: "Plans, relevés et modélisation de bâtiments existants", longDescription: null, order: 4 },
  { _id: "5", title: "Relevés et acquisitions 3D", icon: "Scan", shortDescription: "Scan 3D, nuages de points, modélisation numérique", longDescription: null, order: 5 },
  { _id: "6", title: "Surfaces réglementaires", icon: "Ruler", shortDescription: "Loi Carrez, surfaces habitables, surfaces de plancher", longDescription: null, order: 6 },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nos prestations — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Découvrez nos 6 prestations : foncier, topographie, copropriété, plans d'architecture, relevés 3D, surfaces réglementaires.",
    openGraph: {
      title: "Nos prestations — CLBGE",
      description: "Découvrez nos 6 prestations de géomètre-expert en Guadeloupe.",
      type: "website",
    },
  };
}

export default async function NosPrestation() {
  let services: typeof defaultServices = [];

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { allServicesQuery } = await import("@/sanity/lib/queries");
      services = (await client.fetch(allServicesQuery)) ?? [];
    }
  } catch {
    // Sanity pas encore alimenté — fallback hardcoded
  }

  const servicesList = services.length ? services : defaultServices;

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Nos prestations</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <ServiceAccordion services={servicesList} />
        </div>
      </section>

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
