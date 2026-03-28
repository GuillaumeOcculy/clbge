import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Timeline } from "@/components/sections/Timeline";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/react";

const timelineItems = [
  { year: "2012", label: "Départ en hexagone pour suivre la formation de géomètre" },
  { year: "2019", label: "Début de carrière en cabinets de géomètres-experts parisiens" },
  { year: "2024", label: "Obtention du titre de Géomètre-Expert Foncier DPLG" },
  { year: "2026", label: "Reprise du cabinet d'Alain NEGRONI (créé en 1987)" },
];

const defaultAbout = {
  title: "Qui suis-je ?",
  portrait: null as { asset: unknown; alt?: string } | null,
  bio: null as unknown[] | null,
  qualifications: [
    { title: "Géomètre-Expert Foncier DPLG", description: "Diplômé par le Gouvernement" },
    { title: "Inscrit à l'Ordre des Géomètres-Experts", description: "N° d'inscription : 12345" },
    { title: "Intervention sur tout l'archipel", description: "Guadeloupe, Marie-Galante, Les Saintes, La Désirade" },
  ],
  metaTitle: "Qui suis-je — Laurent Bazile, Géomètre-Expert en Guadeloupe",
  metaDescription: "Découvrez le parcours et les qualifications de Laurent Bazile, géomètre-expert en Guadeloupe.",
};

export async function generateMetadata(): Promise<Metadata> {
  let metaTitle = defaultAbout.metaTitle;
  let metaDescription = defaultAbout.metaDescription;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { aboutPageQuery } = await import("@/sanity/lib/queries");
      const data = await client.fetch(aboutPageQuery);
      if (data?.metaTitle) metaTitle = data.metaTitle;
      if (data?.metaDescription) metaDescription = data.metaDescription;
    }
  } catch {
    // Sanity pas encore alimenté
  }

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
    },
  };
}

export default async function QuiSuisJe() {
  let aboutData: typeof defaultAbout | null = null;
  let portraitUrl: string | null = null;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { aboutPageQuery } = await import("@/sanity/lib/queries");
      aboutData = await client.fetch(aboutPageQuery);
      if (aboutData?.portrait?.asset) {
        const { urlFor } = await import("@/sanity/lib/image");
        portraitUrl = urlFor(aboutData.portrait.asset).width(400).height(500).url();
      }
    }
  } catch {
    // Sanity pas encore alimenté — fallback hardcoded
  }

  const about = aboutData ?? defaultAbout;

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">{about.title ?? defaultAbout.title}</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            <div className="flex justify-center md:sticky md:top-8 md:w-2/5">
              <Image
                src={portraitUrl ?? "/images/portrait-laurent.jpg"}
                alt={about.portrait?.alt ?? "Portrait de Laurent Bazile, géomètre-expert"}
                width={400}
                height={500}
                className="h-auto w-full max-w-[350px] rounded-lg object-contain"
                priority
              />
            </div>

            <div className="md:w-3/5">
              {about.bio && Array.isArray(about.bio) && about.bio.length > 0 ? (
                <PortableTextRenderer value={about.bio as PortableTextBlock[]} />
              ) : (
                <div className="space-y-4 text-muted-foreground">
                  <p>Diplômé de l&apos;École Supérieure des Ingénieurs Géomètres et Topographes (ESGT), Laurent BAZILE s&apos;inscrit dans une démarche d&apos;exigence, de rigueur et de précision au service de ses clients.</p>
                  <p>Fort de plusieurs années d&apos;expérience acquises au sein de cabinets parisiens, il a développé une expertise technique solide, associée à une parfaite maîtrise des enjeux juridiques et fonciers.</p>
                  <p>Attaché à sa terre natale, la Guadeloupe, il fait le choix d&apos;y poursuivre son parcours et de mettre ses compétences au service du territoire, dans une vision d&apos;aménagement équilibré, responsable et durable.</p>
                  <p>Aujourd&apos;hui, Laurent BAZILE reprend et perpétue l&apos;activité du cabinet fondé par Alain NEGRONI, dont il est le successeur. Créé en 1987, le cabinet s&apos;appuie sur près de 40 années d&apos;expérience et de présence sur le territoire, gage de sérieux, de confiance et de connaissance approfondie du contexte local.</p>
                  <p>Cette transmission s&apos;inscrit dans une continuité naturelle. Elle associe le savoir-faire historique du cabinet à une volonté d&apos;évolution vers des méthodes modernes et performantes.</p>
                  <p>Son approche repose sur un accompagnement sur mesure, adapté à chaque client : particuliers, professionnels et collectivités. Il accorde une attention particulière à la qualité des prestations et à la clarté des échanges.</p>
                  <p>Précision, impartialité et engagement constituent les fondements de son approche. Sa priorité : sécuriser vos projets avec des solutions fiables et maîtrisées.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Timeline items={timelineItems} />

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
