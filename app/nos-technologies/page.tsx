import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CtaBanner } from "@/components/sections/CtaBanner";

const technologies = [
  { _id: "1", name: "Trimble Business Center (TBC)", category: "Logiciel", description: "Solution de traitement et d'analyse de données géospatiales, Trimble Business Center permet de centraliser, contrôler et exploiter l'ensemble des relevés issus du terrain. Il garantit une précision optimale dans le calcul, l'ajustement et la modélisation des données, pour des résultats fiables et exploitables à chaque étape du projet.", order: 1 },
  { _id: "2", name: "Trimble RealWorks", category: "Logiciel", description: "Logiciel dédié au traitement des nuages de points, RealWorks permet de transformer les relevés scanner 3D en modèles exploitables. Il offre une restitution fidèle des environnements complexes, avec un haut niveau de détail et de précision.", order: 2 },
  { _id: "3", name: "AutoCAD", category: "Logiciel", description: "Référence mondiale en conception assistée par ordinateur, AutoCAD permet la réalisation de plans précis, clairs et parfaitement structurés. Il constitue la base de production graphique de l'ensemble des livrables.", order: 3 },
  { _id: "4", name: "Covadis", category: "Logiciel", description: "Spécialisé dans les métiers de la topographie et du foncier, Covadis vient enrichir AutoCAD avec des outils métiers avancés. Il permet notamment le traitement des relevés topographiques, les calculs fonciers et la modélisation des projets d'aménagement.", order: 4 },
  { _id: "5", name: "UAV Manager 2022", category: "Logiciel", description: "Logiciel dédié au traitement des données issues de relevés par drone, UAV Manager permet la production d'orthophotographies, de modèles numériques de terrain et de nuages de points. Il offre une vision globale et précise des sites, même les plus étendus ou difficiles d'accès.", order: 5 },
  { _id: "6", name: "RD12", category: "Logiciel", description: "Solution de gestion et d'exploitation de données techniques, RD12 permet d'optimiser le traitement et l'organisation des informations issues du terrain. Il contribue à la fiabilité et à la structuration des données dans le cadre de projets complexes.", order: 6 },
  { _id: "7", name: "Station totale Trimble", category: "Matériel terrain", description: "Instrument de mesure de haute précision, la station totale permet de relever avec exactitude les coordonnées et les distances sur le terrain. Elle constitue un outil essentiel pour les opérations de bornage, d'implantation et de topographie.", order: 7 },
  { _id: "8", name: "Système GNSS Trimble", category: "Matériel terrain", description: "Grâce à la technologie satellitaire, le système GNSS permet de déterminer des positions avec une précision centimétrique en temps réel. Il garantit rapidité d'exécution et fiabilité des mesures, même sur de grandes surfaces.", order: 8 },
  { _id: "9", name: "SLAM100 – Scanner LiDAR portatif", category: "Matériel terrain", description: "Technologie de pointe en acquisition 3D, le scanner SLAM100 permet de capturer rapidement des environnements complexes sous forme de nuages de points. Sans nécessiter de stationnement fixe, il offre une grande mobilité et une efficacité remarquable sur le terrain.", order: 9 },
];

export const metadata: Metadata = {
  title: "Nos technologies — CLBGE, Géomètre-Expert en Guadeloupe",
  description: "Découvrez les logiciels et équipements de pointe utilisés par le cabinet : station totale, GPS RTK, scanner 3D, drone, AutoCAD, Covadis.",
  openGraph: {
    title: "Nos technologies — CLBGE",
    description: "Logiciels et matériel de pointe pour des relevés précis en Guadeloupe.",
    type: "website",
  },
};

function TechnologyCard({ tech }: { tech: typeof technologies[number] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tech.name}</CardTitle>
        {tech.description && (
          <CardDescription>{tech.description}</CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}

export default function NosTechnologies() {
  const logiciels = technologies.filter((t) => t.category === "Logiciel");
  const materiel = technologies.filter((t) => t.category === "Matériel terrain");

  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Nos technologies</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <h2 className="mb-8 text-center text-xl font-semibold md:text-2xl">Logiciels</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {logiciels.map((tech) => (
              <TechnologyCard key={tech._id} tech={tech} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <h2 className="mb-8 text-center text-xl font-semibold md:text-2xl">Matériel terrain</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {materiel.map((tech) => (
              <TechnologyCard key={tech._id} tech={tech} />
            ))}
          </div>
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
