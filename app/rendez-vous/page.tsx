import type { Metadata } from "next";
import { ZcalEmbed } from "@/components/embeds/ZcalEmbed";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Prendre rendez-vous — CLBGE, Géomètre-Expert en Guadeloupe",
    description:
      "Réservez une consultation avec Laurent Bazile, géomètre-expert en Guadeloupe. Paiement sécurisé en ligne, réponse sous 24h.",
    openGraph: {
      title: "Prendre rendez-vous — CLBGE",
      description:
        "Réservez votre consultation en ligne avec paiement sécurisé.",
      type: "website",
    },
  };
}

export default function RendezVousPage() {
  const calendarUrl = process.env.NEXT_PUBLIC_ZCAL_CALENDAR_URL || "";

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Prendre rendez-vous</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <p className="mb-10 text-center text-lg text-muted-foreground">
            Consultation avec paiement sécurisé en ligne. Choisissez votre
            créneau, réglez en quelques clics. Réponse sous 24h.
          </p>

          <ZcalEmbed calendarUrl={calendarUrl} title="Prise de rendez-vous" />
        </div>
      </section>

      <CtaBanner
        title="Vous ne savez pas encore ce dont vous avez besoin ?"
        subtitle="Répondez à quelques questions pour identifier la prestation adaptée."
        buttonText="Faire le diagnostic"
        href="/diagnostic"
      />
    </>
  );
}
