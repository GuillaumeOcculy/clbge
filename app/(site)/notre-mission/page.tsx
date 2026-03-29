import type { Metadata } from "next";
import { MissionSteps } from "@/components/sections/MissionSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";

const missionSteps = [
  { _id: "1", title: "Prise de contact", description: "Échange téléphonique ou en ligne pour comprendre votre besoin", stepNumber: 1 },
  { _id: "2", title: "Consultation", description: "Analyse de votre dossier et proposition d'intervention adaptée", stepNumber: 2 },
  { _id: "3", title: "Terrain", description: "Intervention sur site avec nos équipements de pointe", stepNumber: 3 },
  { _id: "4", title: "Traitement", description: "Traitement des données et élaboration des documents techniques et juridiques", stepNumber: 4 },
  { _id: "5", title: "Restitution", description: "Remise des documents finaux et explications claires des enjeux techniques et juridiques", stepNumber: 5 },
];

export const metadata: Metadata = {
  title: "Notre mission — CLBGE, Géomètre-Expert en Guadeloupe",
  description: "Découvrez les 5 étapes du déroulement d'une mission avec le cabinet CLBGE : prise de contact, consultation, terrain, traitement et restitution.",
  openGraph: {
    title: "Notre mission — CLBGE",
    description: "Découvrez comment se déroule une mission avec votre géomètre-expert en Guadeloupe.",
    type: "website",
  },
};

export default function NotreMission() {
  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Comment se déroule une mission ?</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            De la prise de contact à la restitution des documents, chaque étape est pensée pour vous accompagner avec clarté et professionnalisme.
          </p>
        </div>
      </section>

      <MissionSteps steps={missionSteps} hideTitle />

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
