import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { TallyEmbed } from "@/components/embeds/TallyEmbed";
import { GoogleMapsEmbed } from "@/components/embeds/GoogleMapsEmbed";
import { CtaBanner } from "@/components/sections/CtaBanner";

const defaultContact = {
  title: "Contactez-nous",
  introText:
    "Une question ? Un projet ? Contactez le cabinet CLBGE. Nous vous répondons sous 24h.",
  tallyFormId: "",
  metaTitle: "Contact — CLBGE, Géomètre-Expert en Guadeloupe",
  metaDescription:
    "Contactez Laurent Bazile, géomètre-expert en Guadeloupe. Formulaire de contact, téléphone, email. Cabinet situé à Petit-Bourg.",
};

export async function generateMetadata(): Promise<Metadata> {
  let metaTitle = defaultContact.metaTitle;
  let metaDescription = defaultContact.metaDescription;

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { contactPageQuery } = await import("@/sanity/lib/queries");
      const data = await client.fetch(contactPageQuery);
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

export default async function ContactPage() {
  let title = defaultContact.title;
  let introText = defaultContact.introText;
  let sanityFormId = "";

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { contactPageQuery } = await import("@/sanity/lib/queries");
      const data = await client.fetch(contactPageQuery);
      if (data?.title) title = data.title;
      if (data?.introText) introText = data.introText;
      if (data?.tallyFormId) sanityFormId = data.tallyFormId;
    }
  } catch {
    // Sanity pas encore alimenté
  }

  const formId =
    process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID || sanityFormId || "";
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "";

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">{title}</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <p className="mb-10 text-center text-lg text-muted-foreground">
            {introText}
          </p>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div>
              <TallyEmbed formId={formId} title="Formulaire de contact" />
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="mb-8 space-y-4">
                <a
                  href="tel:0690612224"
                  className="flex items-center gap-3 text-foreground hover:text-primary"
                >
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  06 90 61 22 24
                </a>
                <a
                  href="mailto:contact@clbge.com"
                  className="flex items-center gap-3 text-foreground hover:text-primary"
                >
                  <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  contact@clbge.com
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  Petit-Bourg, Guadeloupe
                </div>
              </div>

              <GoogleMapsEmbed
                src={mapsEmbedUrl}
                title="Localisation du cabinet CLBGE à Petit-Bourg, Guadeloupe"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vous savez déjà ce dont vous avez besoin ?"
        subtitle="Réservez directement une consultation avec paiement sécurisé."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
