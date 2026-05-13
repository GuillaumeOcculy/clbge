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
  heroCtaSecondary: "Identifier votre besoin gratuitement",
  trustBarItems: [
    { text: "Intervention sur tout l'archipel" },
    { text: "RDV et paiement en ligne" },
    { text: "Technologies de pointe" },
    { text: "Inscrit au tableau de l'Ordre des Géomètres-Experts sous le numéro 07178" },
  ],
  diagnosticTitle: "Vous ne savez pas exactement ce dont vous avez besoin ?",
  diagnosticDescription:
    "Répondez à quelques questions simples pour identifier la prestation adaptée à votre situation. Sans jargon, on vous guide.",
  ctaBannerTitle: "Besoin d'un géomètre-expert ?",
  ctaBannerSubtitle: "Consultation avec paiement sécurisé. Réponse sous 24h.",
  ctaBannerButton: "Prendre rendez-vous",
};

const services = [
  {
    _id: "1",
    title: "Foncier",
    icon: "Scale",
    items: [
      "Bornage et reconnaissance de limites",
      "Délimitations de la propriété des personnes publiques",
      "Divisions parcellaires",
      "Étude de servitudes",
    ],
    order: 1,
  },
  {
    _id: "2",
    title: "Prescription acquisitive et usucapion",
    icon: "FileText",
    items: [
      "Analyse des titres de propriété",
      "Calcul des délais de prescription trentenaire et décennaire",
      "Établissement des plans d'assiette de possession",
      "Constitution du dossier de prescription",
    ],
    order: 2,
  },
  {
    _id: "3",
    title: "Urbanisme",
    icon: "FileCheck",
    items: [
      "Certificats d'urbanisme (CUa, CUb)",
      "Déclaration préalable (DP)",
      "Permis d'aménager (PA)",
    ],
    order: 3,
  },
  {
    _id: "4",
    title: "Évaluation des biens immobiliers",
    icon: "Coins",
    items: [
      "Estimation de la valeur vénale ou locative",
      "Évaluation pour succession ou donation",
      "Appréciation objective tenant compte des caractéristiques du bien, de sa situation et du marché",
    ],
    order: 4,
  },
  {
    _id: "5",
    title: "Copropriété & Division en volumes",
    icon: "Building2",
    items: [
      "Mise en copropriété",
      "État descriptif de division (EDD)",
      "Modificatifs de copropriété",
      "Répartition des charges",
      "Mesurage Loi Carrez",
      "Division en volumes",
    ],
    order: 5,
  },
  {
    _id: "6",
    title: "Plans d'architecture",
    icon: "Home",
    items: [
      "Plans d'intérieurs",
      "Plans de coupe",
      "Plans de façades",
      "Plans d'héberges et de figures de murs",
      "Plans de toiture",
    ],
    order: 6,
  },
  {
    _id: "7",
    title: "Topographie",
    icon: "Mountain",
    items: [
      "Plans topographiques",
      "Géoréférencement",
      "Nivellement",
      "Implantations",
    ],
    order: 7,
  },
  {
    _id: "8",
    title: "Relevés et acquisitions 3D",
    icon: "Scan",
    items: [
      "Relevé par scanner 3D",
      "Relevé par drone",
      "Orthophotographie",
      "Visites virtuelles",
    ],
    order: 8,
  },
];

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
