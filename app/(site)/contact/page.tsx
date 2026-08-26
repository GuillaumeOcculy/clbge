import type { Metadata } from "next";
import { Phone, Mail, MapPin, ClipboardCheck } from "lucide-react";
import { GoogleMapsEmbed } from "@/components/embeds/GoogleMapsEmbed";
import { TallyPopupButton } from "@/components/embeds/TallyPopupButton";
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
  const formId = process.env.NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID || "";

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Contactez CLB Géomètre-Expert</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <p className="mb-10 text-center text-lg text-muted-foreground">
            Une question ? Un projet ? Contactez le cabinet CLBGE. Nous vous répondons sous 24h.
          </p>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <a
                href="tel:+590590263590"
                className="flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                0590 26 35 90 (fixe)
              </a>
              <a
                href="tel:+590690612422"
                className="flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                0690 61 24 22 (mobile)
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
                  href="https://www.google.com/maps/search/?api=1&query=16.231611,-61.588806"
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
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-8 text-center">
                <ClipboardCheck className="h-12 w-12 text-primary" aria-hidden="true" />
                <h2 className="text-xl font-semibold">Identifier votre besoin</h2>
                <p className="text-sm text-muted-foreground">
                  Pas de jargon, on vous guide. Répondez à quelques questions simples pour identifier la prestation adaptée à votre situation.
                </p>
                <TallyPopupButton formId={formId} label="Identifier mon besoin" />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <GoogleMapsEmbed
              src={mapsEmbedUrl}
              title="Localisation du cabinet CLBGE à Petit-Bourg, Guadeloupe"
            />
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
