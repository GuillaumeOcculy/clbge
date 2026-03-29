import type { Metadata } from "next";
import { TallyPopupButton } from "@/components/embeds/TallyPopupButton";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Diagnostic gratuit — CLBGE, Géomètre-Expert en Guadeloupe",
    description:
      "Répondez à quelques questions simples pour identifier la prestation de géomètre-expert adaptée à votre situation. Sans jargon, sans engagement.",
    openGraph: {
      title: "Diagnostic gratuit — CLBGE",
      description:
        "Identifiez votre besoin en géomètre-expert en quelques questions simples.",
      type: "website",
    },
  };
}

export default function DiagnosticPage() {
  const formId = process.env.NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID || "";

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Diagnostic gratuit</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <p className="mb-10 text-center text-lg text-muted-foreground">
            Pas de jargon, on vous guide. Répondez à quelques questions simples
            pour identifier la prestation adaptée à votre situation.
          </p>

          <p className="mb-2 text-center text-muted-foreground">
            À l&apos;issue de ce diagnostic, vous pourrez prendre rendez-vous
            pour une consultation personnalisée au cabinet.
          </p>

          <div className="flex justify-center pt-6">
            <TallyPopupButton formId={formId} />
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
