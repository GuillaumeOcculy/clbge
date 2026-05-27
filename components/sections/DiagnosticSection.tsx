import { ClipboardCheck } from "lucide-react";
import { TallyPopupButton } from "@/components/embeds/TallyPopupButton";

interface DiagnosticSectionProps {
  diagnosticTitle: string;
  diagnosticDescription: string;
}

export function DiagnosticSection({
  diagnosticTitle,
  diagnosticDescription,
}: DiagnosticSectionProps) {
  const formId = process.env.NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID || "";

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
          {/* Texte gauche */}
          <div className="md:w-1/2">
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-[1.5px] text-primary">Mon besoin</p>
            <h2 className="mb-4">{diagnosticTitle}</h2>
            <p className="mb-6 text-muted-foreground">{diagnosticDescription}</p>
            <TallyPopupButton formId={formId} label="Identifier mon besoin" />
          </div>

          {/* Visuel droite — card teasing */}
          <div className="w-full md:w-1/2">
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-8 text-center">
              <ClipboardCheck className="h-12 w-12 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Identifier votre besoin</h3>
              <p className="text-sm text-muted-foreground">
                Pas de jargon, on vous guide. Répondez à quelques questions simples pour identifier la prestation adaptée à votre situation.
              </p>
              <TallyPopupButton formId={formId} label="Identifier mon besoin" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
