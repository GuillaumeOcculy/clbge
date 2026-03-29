import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { MissionSteps } from "@/components/sections/MissionSteps";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { CtaBanner } from "@/components/sections/CtaBanner";

const hero = {
  heroTitle: "Laurent BAZILE, votre Géomètre-Expert en Guadeloupe",
  heroSubtitle:
    "Cabinet de géomètre-expert intervenant sur l'ensemble de l'archipel guadeloupéen. Bornage, topographie, copropriété, plans d'architecture et relevés 3D.",
  heroCtaPrimary: "Prendre rendez-vous",
  heroCtaSecondary: "Diagnostic gratuit",
  trustBarItems: [
    { text: "Inscrit à l'Ordre des Géomètres-Experts" },
    { text: "Intervention sur tout l'archipel" },
    { text: "RDV et paiement en ligne" },
    { text: "Technologies de pointe" },
  ],
  diagnosticTitle: "Vous ne savez pas exactement ce dont vous avez besoin ?",
  diagnosticDescription:
    "Répondez à quelques questions simples pour identifier la prestation adaptée à votre situation. Sans jargon, on vous guide.",
  ctaBannerTitle: "Besoin d'un géomètre-expert ?",
  ctaBannerSubtitle: "Consultation avec paiement sécurisé. Réponse sous 24h.",
  ctaBannerButton: "Prendre rendez-vous",
};

const services = [
  { _id: "1", title: "Foncier", icon: "Scale", shortDescription: "Bornage et reconnaissance de limites · Délimitations de la propriété des personnes publiques · Divisions parcellaires · Étude de servitudes", order: 1 },
  { _id: "2", title: "Topographie", icon: "Mountain", shortDescription: "Plans topographiques · Géoréférencement · Nivellement · Implantations", order: 2 },
  { _id: "3", title: "Urbanisme", icon: "FileCheck", shortDescription: "Certificats d'urbanisme (CUa, CUb) · Déclaration préalable (DP) · Permis d'aménager (PA)", order: 3 },
  { _id: "4", title: "Copropriété", icon: "Building2", shortDescription: "Mise en copropriété · États Descriptifs de Division en Copropriété · Modificatifs de copropriété · Calcul de charges de copropriété · Calculs de surface privative dite « Carrez »", order: 4 },
  { _id: "5", title: "Plans d'architecture", icon: "Home", shortDescription: "Plans d'intérieurs · Plans de coupe · Plans de façades · Plans d'héberges et de figures de murs · Plans de toiture", order: 5 },
  { _id: "6", title: "Relevés et acquisitions 3D", icon: "Scan", shortDescription: "Relevé par scanner 3D · Relevé par drone · Orthophotographie · Visites virtuelles", order: 6 },
];

const missionSteps = [
  { _id: "1", title: "Prise de contact", description: "Échange téléphonique ou en ligne pour comprendre votre besoin", stepNumber: 1 },
  { _id: "2", title: "Consultation", description: "Analyse de votre dossier et proposition d'intervention adaptée", stepNumber: 2 },
  { _id: "3", title: "Terrain", description: "Intervention sur site avec nos équipements de pointe", stepNumber: 3 },
  { _id: "4", title: "Traitement", description: "Traitement des données et élaboration des documents techniques et juridiques", stepNumber: 4 },
  { _id: "5", title: "Restitution", description: "Remise des documents finaux et explications claires des enjeux techniques et juridiques", stepNumber: 5 },
];

export const metadata: Metadata = {
  title: "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe",
  description:
    "Cabinet de géomètre-expert en Guadeloupe. Bornage, topographie, copropriété, plans d'architecture, relevés 3D. Intervention sur tout l'archipel guadeloupéen.",
  openGraph: {
    title: "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe",
    description:
      "Cabinet de géomètre-expert en Guadeloupe. Bornage, topographie, copropriété, plans d'architecture, relevés 3D. Intervention sur tout l'archipel guadeloupéen.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection
        heroTitle={hero.heroTitle}
        heroSubtitle={hero.heroSubtitle}
        heroCtaPrimary={hero.heroCtaPrimary}
        heroCtaSecondary={hero.heroCtaSecondary}
        phone="0690 61 22 24"
        phoneLandline="0590 26 35 90"
      />
      <TrustBar items={hero.trustBarItems} />
      <ServicesGrid services={services} />
      <MissionSteps steps={missionSteps} />
      <ZoneIntervention />
      <DiagnosticSection
        diagnosticTitle={hero.diagnosticTitle}
        diagnosticDescription={hero.diagnosticDescription}
      />
      <CtaBanner
        title={hero.ctaBannerTitle}
        subtitle={hero.ctaBannerSubtitle}
        buttonText={hero.ctaBannerButton}
      />
    </>
  );
}
