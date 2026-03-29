import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { GoogleMapsEmbed } from "@/components/embeds/GoogleMapsEmbed";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Contact — CLBGE, Géomètre-Expert en Guadeloupe",
  description:
    "Contactez Laurent Bazile, géomètre-expert en Guadeloupe. Formulaire de contact, téléphone, email. Cabinet situé à Petit-Bourg.",
  openGraph: {
    title: "Contact — CLBGE, Géomètre-Expert en Guadeloupe",
    description:
      "Contactez Laurent Bazile, géomètre-expert en Guadeloupe. Formulaire de contact, téléphone, email. Cabinet situé à Petit-Bourg.",
    type: "website",
  },
};

export default function ContactPage() {
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "";

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Contactez le cabinet CLB Géomètre-Expert</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <p className="mb-10 text-center text-lg text-muted-foreground">
            Une question ? Un projet ? Contactez le cabinet CLBGE. Nous vous répondons sous 24h.
          </p>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <a
                href="tel:+596590263590"
                className="flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                0590 26 35 90 (fixe)
              </a>
              <a
                href="tel:+596690612224"
                className="flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                06 90 61 22 24 (mobile)
              </a>
              <a
                href="mailto:contact@clbge.com"
                className="flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                contact@clbge.com
              </a>
              <div className="flex items-start gap-3 text-foreground">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent("17, rue Amédée FENGAROL, Lotissement Vince Arnouville, 97170 PETIT-BOURG")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  17, rue Amédée FENGAROL<br />
                  Lotissement Vince Arnouville<br />
                  97170 PETIT-BOURG
                </a>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
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
