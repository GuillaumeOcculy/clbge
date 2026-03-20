import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/react";

const defaultAbout = {
  title: "Qui suis-je",
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
  const qualifications = about.qualifications?.length
    ? about.qualifications
    : defaultAbout.qualifications;

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">{about.title ?? defaultAbout.title}</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="flex justify-center md:w-2/5">
              <Image
                src={portraitUrl ?? "/images/portrait-laurent.jpg"}
                alt={about.portrait?.alt ?? "Portrait de Laurent Bazile, géomètre-expert"}
                width={400}
                height={500}
                className="rounded-lg"
                priority
              />
            </div>

            <div className="md:w-3/5">
              {about.bio && Array.isArray(about.bio) && about.bio.length > 0 ? (
                <PortableTextRenderer value={about.bio as PortableTextBlock[]} />
              ) : (
                <p className="text-muted-foreground">
                  Laurent Bazile est géomètre-expert foncier DPLG, inscrit à l&apos;Ordre des Géomètres-Experts.
                  Il intervient sur l&apos;ensemble de l&apos;archipel guadeloupéen pour des missions de bornage,
                  topographie, copropriété, plans d&apos;architecture et relevés 3D.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="mb-8 text-center">Qualifications</h2>

          <ul className="mx-auto max-w-3xl space-y-6">
            {qualifications.map((q) => (
              <li key={q.title} className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">{q.title}</h3>
                <p className="text-sm text-muted-foreground">{q.description}</p>
              </li>
            ))}
          </ul>
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
