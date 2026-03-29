import type { Metadata } from "next";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";

const defaultServices = [
  {
    _id: "1", title: "Foncier", icon: "Scale",
    shortDescription: "Bornage et reconnaissance de limites · Délimitations de la propriété des personnes publiques · Divisions parcellaires · Étude de servitudes",
    longDescription: null, order: 1,
    longDescriptionHtml: `<p>Le foncier constitue le cœur du métier de géomètre-expert. Il vise à définir avec précision, sécuriser juridiquement et organiser durablement la propriété.</p>
<p><strong>Bornage et reconnaissance de limites</strong></p>
<p>Le bornage permet de fixer de manière précise, contradictoire et définitive les limites d'un terrain. Il constitue une garantie juridique essentielle, assurant la pérennité des droits de propriété et la prévention des litiges.</p>
<p><strong>Délimitations de la propriété des personnes publiques</strong></p>
<p>Nous déterminons avec rigueur les limites entre propriété privée et domaine public, afin de sécuriser vos droits et d'éviter toute occupation irrégulière.</p>
<p><strong>Divisions parcellaires</strong></p>
<p>Nous réalisons des divisions parcellaires en vue de valoriser votre patrimoine, en créant des lots conformes aux règles d'urbanisme et aux contraintes techniques.</p>
<p><strong>Étude de servitudes</strong></p>
<p>Nous analysons l'ensemble des servitudes (passage, vue, écoulement des eaux, réseaux…) afin d'identifier les contraintes juridiques et techniques pesant sur votre bien et de sécuriser vos projets.</p>`,
  },
  {
    _id: "2", title: "Topographie", icon: "Mountain",
    shortDescription: "Plans topographiques · Géoréférencement · Nivellement · Implantations",
    longDescription: null, order: 2,
    longDescriptionHtml: `<p>La topographie permet de mesurer et de représenter avec une grande précision l'ensemble des caractéristiques d'un terrain, qu'il s'agisse du relief naturel ou des ouvrages existants.</p>
<p><strong>Plans topographiques – Plans de masse</strong></p>
<p>Nous produisons des plans de haute précision (relief, constructions, réseaux), véritables supports de référence pour la conception, l'étude et la réalisation de vos projets.</p>
<p><strong>Géoréférencement</strong></p>
<p>Nous positionnons vos données dans des systèmes de coordonnées officiels afin d'en garantir la précision, la cohérence et la fiabilité.</p>
<p><strong>Nivellement</strong></p>
<p>Nous déterminons avec exactitude les altitudes du terrain afin d'analyser les dénivelés et d'anticiper les contraintes liées à l'aménagement.</p>
<p><strong>Implantations</strong></p>
<p>Nous matérialisons sur le terrain l'implantation exacte de vos ouvrages, dans le strict respect des plans et des autorisations délivrées.</p>`,
  },
  {
    _id: "3", title: "Urbanisme", icon: "FileCheck",
    shortDescription: "Certificats d'urbanisme (CUa, CUb) · Déclaration préalable (DP) · Permis d'aménager (PA)",
    longDescription: null, order: 3,
    longDescriptionHtml: `<p>Nous vous accompagnons dans vos démarches administratives et réglementaires afin de sécuriser et concrétiser vos projets.</p>
<p><strong>Certificats d'urbanisme (CUa, CUb)</strong></p>
<p>Nous analysons la faisabilité de votre projet au regard des règles d'urbanisme applicables et des contraintes du terrain.</p>
<p><strong>Déclaration préalable (DP)</strong></p>
<p>Nous constituons et déposons vos dossiers de déclaration préalable, en assurant leur conformité aux exigences réglementaires.</p>
<p><strong>Permis d'aménager (PA)</strong></p>
<p>Nous vous accompagnons dans la réalisation de dossiers complexes liés à l'aménagement de terrains, notamment dans le cadre de lotissements ou de divisions.</p>`,
  },
  {
    _id: "4", title: "Copropriété", icon: "Building2",
    shortDescription: "Mise en copropriété · États Descriptifs de Division en Copropriété · Modificatifs de copropriété · Calcul de charges de copropriété · Calculs de surface privative dite « Carrez »",
    longDescription: null, order: 4,
    longDescriptionHtml: `<p>Nous structurons juridiquement vos biens immobiliers et garantissons leur conformité réglementaire.</p>
<p><strong>Mise en copropriété</strong></p>
<p>Nous organisons la division d'un immeuble en lots privatifs et parties communes, en définissant un cadre juridique clair et pérenne.</p>
<p><strong>États Descriptifs de Division (EDD)</strong></p>
<p>Nous définissons avec précision les lots, leurs surfaces et leurs tantièmes, constituant un document fondamental de la copropriété.</p>
<p><strong>Modificatifs de copropriété</strong></p>
<p>Nous adaptons les documents existants en cas de transformation, division ou réunion de lots, afin de refléter fidèlement la réalité du bien.</p>
<p><strong>Calcul de charges de copropriété</strong></p>
<p>Nous établissons une répartition équitable et conforme des charges entre les copropriétaires.</p>
<p><strong>Calculs de surface privative (Loi Carrez)</strong></p>
<p>Nous réalisons les mesurages réglementaires nécessaires lors des ventes en copropriété, garantissant la sécurité juridique des transactions.</p>`,
  },
  {
    _id: "5", title: "Plans d'architecture", icon: "Home",
    shortDescription: "Plans d'intérieurs · Plans de coupe · Plans de façades · Plans d'héberges et de figures de murs · Plans de toiture",
    longDescription: null, order: 5,
    longDescriptionHtml: `<p>Nous réalisons des plans précis et détaillés de bâtiments existants, véritables supports pour la conception, la rénovation ou la valorisation de vos biens.</p>
<p><strong>Plans d'intérieurs</strong></p>
<p>Relevé précis des espaces intérieurs, indispensable pour les projets d'aménagement ou de rénovation.</p>
<p><strong>Plans de coupe</strong></p>
<p>Analyse des volumes, des niveaux et des structures du bâtiment à travers des représentations en coupe.</p>
<p><strong>Plans de façades</strong></p>
<p>Représentation fidèle des élévations extérieures, essentielle pour les démarches administratives et les projets architecturaux.</p>
<p><strong>Plans d'héberges et de figures de murs</strong></p>
<p>Étude des limites bâties et des mitoyennetés afin de sécuriser les relations entre propriétés voisines.</p>
<p><strong>Plans de toiture</strong></p>
<p>Représentation détaillée des toitures et de leurs caractéristiques techniques.</p>`,
  },
  {
    _id: "6", title: "Relevés et acquisitions 3D", icon: "Scan",
    shortDescription: "Relevé par scanner 3D · Relevé par drone · Orthophotographie · Visites virtuelles",
    longDescription: null, order: 6,
    longDescriptionHtml: `<p>Nous intégrons des technologies de pointe pour capturer, analyser et modéliser les environnements avec un haut niveau de précision.</p>
<p><strong>Relevé par scanner 3D</strong></p>
<p>Acquisition rapide et extrêmement précise de l'existant sous forme de nuages de points, permettant une modélisation fidèle.</p>
<p><strong>Relevé par drone</strong></p>
<p>Captation aérienne idéale pour les grandes surfaces ou les zones difficiles d'accès, offrant une vision globale du site.</p>
<p><strong>Orthophotographie</strong></p>
<p>Production d'images géoréférencées à haute précision, exploitables directement en plan.</p>
<p><strong>Visites virtuelles</strong></p>
<p>Création d'environnements immersifs permettant de visualiser les lieux à distance avec réalisme.</p>`,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nos prestations — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Découvrez nos 6 prestations : foncier, topographie, urbanisme, copropriété, plans d'architecture, relevés et acquisitions 3D.",
    openGraph: {
      title: "Nos prestations — CLBGE",
      description: "Découvrez nos 6 prestations de géomètre-expert en Guadeloupe.",
      type: "website",
    },
  };
}

export default async function NosPrestation() {
  let services: typeof defaultServices = [];

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { allServicesQuery } = await import("@/sanity/lib/queries");
      services = (await client.fetch(allServicesQuery)) ?? [];
    }
  } catch {
    // Sanity pas encore alimenté — fallback hardcoded
  }

  const servicesList = services.length ? services : defaultServices;

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Nos prestations</h1>
            <p className="mx-auto mb-4 max-w-[500px] text-base text-muted-foreground">Des solutions adaptées à chaque projet</p>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <ServiceAccordion services={servicesList} />
        </div>
      </section>

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
