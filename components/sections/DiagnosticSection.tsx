import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiagnosticSectionProps {
  diagnosticTitle: string;
  diagnosticDescription: string;
}

export function DiagnosticSection({
  diagnosticTitle,
  diagnosticDescription,
}: DiagnosticSectionProps) {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
          {/* Texte gauche */}
          <div className="md:w-1/2">
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-[1.5px] text-primary">Diagnostic</p>
            <h2 className="mb-4">{diagnosticTitle}</h2>
            <p className="mb-6 text-muted-foreground">{diagnosticDescription}</p>
            <Button nativeButton={false} render={<Link href="/diagnostic" />}>
              Faire le diagnostic
            </Button>
          </div>

          {/* Visuel droite — card teasing */}
          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="flex flex-col items-center gap-4 rounded-2xl border bg-background p-8 text-center shadow-sm">
              <ClipboardCheck className="h-16 w-16 text-primary" />
              <p className="text-lg font-semibold">4 questions simples</p>
              <p className="text-sm text-muted-foreground">
                Identifiez la prestation adaptée à votre situation en moins de 2 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
