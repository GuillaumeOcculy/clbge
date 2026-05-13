import type { Metadata } from "next";
import { MissionSteps } from "@/components/sections/MissionSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";

const missionSteps = [
  {
    _id: "1",
    title: "Prise de contact",
    description:
      "Échange téléphonique ou en ligne afin de convenir ensemble d'un rendez-vous de consultation en physique ou en visioconférence.",
    stepNumber: 1,
  },
  {
    _id: "2",
    title: "Consultation",
    description:
      "Compréhension de votre demande, recueil d'éventuels documents pour une proposition d'un devis adapté à votre projet.",
    stepNumber: 2,
  },
  {
    _id: "3",
    title: "Terrain",
    description:
      "Intervention sur site avec nos technologies de pointe, pour l'acquisition des données nécessaires à la mission.",
    stepNumber: 3,
  },
  {
    _id: "4",
    title: "Traitement",
    description:
      "Analyse et traitement des données collectées en vue de l'établissement des documents techniques et juridiques.",
    stepNumber: 4,
  },
  {
    _id: "5",
    title: "Restitution",
    description:
      "Présentation et remise des documents avec explications des conclusions et des enjeux de l'opération.",
    stepNumber: 5,
  },
];

export const metadata: Metadata = {
  title: "Notre démarche — CLBGE, Géomètre-Expert en Guadeloupe",
  description:
    "Découvrez les 5 étapes du déroulement d'une mission avec le cabinet CLBGE : prise de contact, consultation, terrain, traitement et restitution.",
  openGraph: {
    title: "Notre démarche — CLBGE",
    description: "Découvrez comment se déroule une mission avec votre géomètre-expert en Guadeloupe.",
    type: "website",
  },
};

export default function NotreDemarche() {
  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Notre démarche</h1>
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
