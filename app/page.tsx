import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { MissionSteps } from "@/components/sections/MissionSteps";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { CtaBanner } from "@/components/sections/CtaBanner";

const defaultHero = {
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

const defaultServices = [
  { _id: "1", title: "Foncier", icon: "Scale", shortDescription: "Bornage et reconnaissance de limites · Délimitations de la propriété des personnes publiques · Divisions parcellaires · Étude de servitudes", order: 1 },
  { _id: "2", title: "Topographie", icon: "Mountain", shortDescription: "Plans topographiques · Géoréférencement · Nivellement · Implantations", order: 2 },
  { _id: "3", title: "Urbanisme", icon: "FileCheck", shortDescription: "Certificats d'urbanisme (CUa, CUb) · Déclaration préalable (DP) · Permis d'aménager (PA)", order: 3 },
  { _id: "4", title: "Copropriété", icon: "Building2", shortDescription: "Mise en copropriété · États Descriptifs de Division en Copropriété · Modificatifs de copropriété · Calcul de charges de copropriété · Calculs de surface privative dite « Carrez »", order: 4 },
  { _id: "5", title: "Plans d'architecture", icon: "Home", shortDescription: "Plans d'intérieurs · Plans de coupe · Plans de façades · Plans d'héberges et de figures de murs · Plans de toiture", order: 5 },
  { _id: "6", title: "Relevés et acquisitions 3D", icon: "Scan", shortDescription: "Relevé par scanner 3D · Relevé par drone · Orthophotographie · Visites virtuelles", order: 6 },
];

const defaultMissionSteps = [
  { _id: "1", title: "Prise de contact", description: "Échange téléphonique ou en ligne pour comprendre votre besoin", stepNumber: 1 },
  { _id: "2", title: "Consultation", description: "Analyse de votre dossier et proposition d'intervention adaptée", stepNumber: 2 },
  { _id: "3", title: "Terrain", description: "Intervention sur site avec nos équipements de pointe", stepNumber: 3 },
  { _id: "4", title: "Traitement", description: "Traitement des données et élaboration des documents techniques et juridiques", stepNumber: 4 },
  { _id: "5", title: "Restitution", description: "Remise des documents finaux et explications claires des enjeux techniques et juridiques", stepNumber: 5 },
];

export async function generateMetadata(): Promise<Metadata> {
  let title = "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe";
  const description =
    "Cabinet de géomètre-expert en Guadeloupe. Bornage, topographie, copropriété, plans d'architecture, relevés 3D. Intervention sur tout l'archipel guadeloupéen.";

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { homePageQuery } = await import("@/sanity/lib/queries");
      const data = await client.fetch(homePageQuery);
      if (data?.heroTitle) title = data.heroTitle;
    }
  } catch {
    // Sanity pas encore alimenté
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function Home() {
  let homeData = null;
  let services: typeof defaultServices = [];
  let missionSteps: typeof defaultMissionSteps = [];
  let phone = "0690 61 22 24";
  const phoneLandline = "0590 26 35 90";

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { homePageQuery, allServicesQuery, allMissionStepsQuery, siteSettingsQuery } =
        await import("@/sanity/lib/queries");
      homeData = await client.fetch(homePageQuery);
      services = (await client.fetch(allServicesQuery)) ?? [];
      missionSteps = (await client.fetch(allMissionStepsQuery)) ?? [];
      const settings = await client.fetch(siteSettingsQuery);
      if (settings?.phone) phone = settings.phone;
    }
  } catch {
    // Sanity pas encore alimenté — fallback hardcoded
  }

  const hero = homeData ?? defaultHero;
  const trustBarItems = hero.trustBarItems?.length
    ? hero.trustBarItems
    : defaultHero.trustBarItems;
  const servicesList = services.length ? services : defaultServices;
  const stepsList = missionSteps.length ? missionSteps : defaultMissionSteps;

  return (
    <>
      <HeroSection
        heroTitle={hero.heroTitle ?? defaultHero.heroTitle}
        heroSubtitle={hero.heroSubtitle ?? defaultHero.heroSubtitle}
        heroCtaPrimary={hero.heroCtaPrimary ?? defaultHero.heroCtaPrimary}
        heroCtaSecondary={hero.heroCtaSecondary ?? defaultHero.heroCtaSecondary}
        phone={phone}
        phoneLandline={phoneLandline}
      />
      <TrustBar items={trustBarItems} />
      <ServicesGrid services={servicesList} />
      <MissionSteps steps={stepsList} />
      <ZoneIntervention />
      <DiagnosticSection
        diagnosticTitle={hero.diagnosticTitle ?? defaultHero.diagnosticTitle}
        diagnosticDescription={hero.diagnosticDescription ?? defaultHero.diagnosticDescription}
      />
      <CtaBanner
        title={hero.ctaBannerTitle ?? defaultHero.ctaBannerTitle}
        subtitle={hero.ctaBannerSubtitle ?? defaultHero.ctaBannerSubtitle}
        buttonText={hero.ctaBannerButton ?? defaultHero.ctaBannerButton}
      />
    </>
  );
}
