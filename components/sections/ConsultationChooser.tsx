"use client";

import { useState, useRef, useEffect } from "react";
import { Video, Building2, Check } from "lucide-react";
import { ZcalEmbed } from "@/components/embeds/ZcalEmbed";

type Modality = "visio" | "cabinet";

interface ConsultationChooserProps {
  visioUrl: string;
  cabinetUrl: string;
}

const modalities = {
  visio: {
    icon: Video,
    title: "Consultation en visioconférence",
    subtitle: "Échangez avec nous depuis chez vous, en toute simplicité.",
    steps: [
      "Sélectionnez un créneau disponible",
      "Procédez au paiement en ligne pour confirmer votre rendez-vous",
      "Recevez votre mail de confirmation avec les informations de connexion",
    ],
    cta: "Réserver une visio",
    embedTitle: "Prise de rendez-vous — Visioconférence",
  },
  cabinet: {
    icon: Building2,
    title: "Consultation au cabinet",
    subtitle: "Rencontrons-nous directement dans nos locaux.",
    steps: [
      "Sélectionnez un créneau disponible",
      "Choisissez votre mode de règlement : paiement en ligne ou sur place",
      "Recevez votre mail de confirmation de rendez-vous",
    ],
    cta: "Réserver au cabinet",
    embedTitle: "Prise de rendez-vous — Cabinet",
  },
} as const;

export function ConsultationChooser({ visioUrl, cabinetUrl }: ConsultationChooserProps) {
  const [selected, setSelected] = useState<Modality | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && embedRef.current) {
      embedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  const urlFor = (modality: Modality) =>
    modality === "visio" ? visioUrl : cabinetUrl;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {(Object.keys(modalities) as Modality[]).map((key) => {
          const m = modalities[key];
          const Icon = m.icon;
          const isSelected = selected === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={`group flex h-full flex-col rounded-2xl border bg-card p-8 text-left transition-all ${
                isSelected
                  ? "border-primary shadow-md ring-2 ring-primary/20"
                  : "hover:border-primary hover:shadow-md"
              }`}
              aria-pressed={isSelected}
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                <h2 className="text-xl font-semibold">{m.title}</h2>
              </div>
              <p className="mb-6 text-muted-foreground">{m.subtitle}</p>

              <ol className="mb-8 space-y-3">
                {m.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto">
                <span
                  className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary text-primary-foreground group-hover:bg-primary/90"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                      Sélectionné
                    </>
                  ) : (
                    m.cta
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div ref={embedRef} className="mt-12 scroll-mt-24">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold">
              Choisissez votre créneau — {modalities[selected].title}
            </h3>
          </div>
          <ZcalEmbed
            calendarUrl={urlFor(selected)}
            title={modalities[selected].embedTitle}
          />
        </div>
      )}
    </>
  );
}
