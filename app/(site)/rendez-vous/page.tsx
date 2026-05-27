import type { Metadata } from "next";
import { ConsultationChooser } from "@/components/sections/ConsultationChooser";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Prendre rendez-vous — CLBGE, Géomètre-Expert en Guadeloupe",
    description:
      "Réservez une consultation avec Laurent Bazile, géomètre-expert en Guadeloupe. En visioconférence ou au cabinet, paiement en ligne sécurisé.",
    openGraph: {
      title: "Prendre rendez-vous — CLBGE",
      description:
        "Consultation en visioconférence ou au cabinet, au choix.",
      type: "website",
    },
  };
}

export default function RendezVousPage() {
  const visioUrl = process.env.NEXT_PUBLIC_ZCAL_VISIO_URL || "";
  const cabinetUrl = process.env.NEXT_PUBLIC_ZCAL_CABINET_URL || "";

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Prenez rendez-vous</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <div className="mb-10 space-y-4 text-center">
            <p className="text-lg text-muted-foreground">
              La consultation initiale vous permet d&apos;exposer votre projet, d&apos;obtenir nos premiers conseils et de recevoir un devis adapté à votre situation.
            </p>
            <p className="text-lg font-semibold text-foreground">
              Tarif de la consultation : 100 € TTC
            </p>
            <p className="text-sm text-muted-foreground">
              Choisissez votre modalité ci-dessous, puis votre créneau.
              <br />
              Réponse sous 24h.
            </p>
          </div>

          <ConsultationChooser visioUrl={visioUrl} cabinetUrl={cabinetUrl} />
        </div>
      </section>

      <CtaBanner
        title="Vous ne savez pas encore ce dont vous avez besoin ?"
        subtitle="Répondez à quelques questions pour identifier la prestation adaptée."
        buttonText="Identifier mon besoin"
        href="/identifier-mon-besoin"
      />
    </>
  );
}
