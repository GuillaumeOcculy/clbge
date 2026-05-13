import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Timeline } from "@/components/sections/Timeline";

const timelineItems = [
  { year: "2012", label: "Départ en hexagone pour suivre la formation de géomètre" },
  { year: "2019", label: "Diplômé de l'ESGT et début de carrière en cabinets de Géomètres-Experts parisiens" },
  { year: "2024", label: "Obtention du titre de Géomètre-Expert Foncier DPLG" },
  { year: "2026", label: "Création de CLBGE, successeur du cabinet Alain NEGRONI, créé en 1987" },
];

export const metadata: Metadata = {
  title: "Qui sommes-nous — CLB Géomètre-Expert en Guadeloupe",
  description:
    "Découvrez le cabinet CLB Géomètre-Expert, fondé par Laurent BAZILE en Guadeloupe, successeur du cabinet Alain NEGRONI.",
  openGraph: {
    title: "Qui sommes-nous — CLB Géomètre-Expert",
    description:
      "Découvrez le cabinet CLB Géomètre-Expert, fondé par Laurent BAZILE en Guadeloupe.",
    type: "website",
  },
};

export default function QuiSommesNous() {
  return (
    <>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4">Qui sommes-nous ?</h1>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            <div className="flex justify-center md:sticky md:top-8 md:w-2/5">
              <Image
                src="/images/qui-sommes-nous.jpg"
                alt="Cabinet CLB Géomètre-Expert"
                width={400}
                height={500}
                className="h-auto w-full max-w-[350px] rounded-lg object-contain"
                priority
              />
            </div>

            <div className="md:w-3/5">
              <div className="space-y-4 text-justify text-muted-foreground">
                <p>
                  CLB Géomètre-Expert est un cabinet fondé par Laurent BAZILE, diplômé de l&apos;École Supérieure des Ingénieurs Géomètres et Topographes (ESGT). Animé par une exigence constante de rigueur et de précision, il a bâti le cabinet sur des valeurs fortes, entièrement tournées vers la satisfaction de ses clients.
                </p>
                <p>
                  Après plusieurs années d&apos;expérience au sein de cabinets parisiens, Laurent BAZILE a forgé une expertise technique solide, nourrie d&apos;une maîtrise approfondie des enjeux juridiques et fonciers. Attaché à sa Guadeloupe natale, il a choisi d&apos;y ancrer son activité et de mettre les compétences du cabinet au service du territoire, dans une vision d&apos;aménagement équilibré, responsable et durable.
                </p>
                <p>
                  CLB Géomètre-Expert s&apos;inscrit dans la continuité du cabinet fondé par Monsieur Alain NEGRONI en 1987, dont Laurent BAZILE est le successeur désigné. Forts de près de 40 années de présence et d&apos;engagement sur le territoire guadeloupéen, nous bénéficions d&apos;une légitimité reconnue et d&apos;une connaissance fine du contexte local. Cette transmission est avant tout une continuité naturelle : elle unit le savoir-faire historique du cabinet à une volonté d&apos;évolution vers des méthodes modernes et performantes.
                </p>
                <p>
                  Particuliers, professionnels ou collectivités — nous adaptons notre accompagnement à chaque situation, avec une attention particulière portée à la qualité des prestations et à la clarté des échanges.
                </p>
                <p>
                  <strong>Précision. Impartialité. Engagement.</strong> Tels sont les fondements de notre démarche. Notre priorité : sécuriser vos projets avec des solutions fiables et maîtrisées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Timeline items={timelineItems} />

      <CtaBanner
        title="Besoin d'un géomètre-expert ?"
        subtitle="Consultation avec paiement sécurisé. Réponse sous 24h."
        buttonText="Prendre rendez-vous"
      />
    </>
  );
}
