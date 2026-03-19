import { getIcon } from "@/lib/icons";

const MapPin = getIcon("MapPin");

const zones = [
  { name: "Guadeloupe", description: "Basse-Terre et Grande-Terre" },
  { name: "Marie-Galante", description: "Interventions régulières" },
  { name: "Les Saintes", description: "Terre-de-Haut et Terre-de-Bas" },
  { name: "La Désirade", description: "Interventions sur demande" },
];

export function ZoneIntervention() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Zone d&apos;intervention</h2>
          <div className="mx-auto h-0.5 w-12 bg-primary" />
          <p className="mt-4 text-muted-foreground">
            Le cabinet intervient sur l&apos;ensemble de l&apos;archipel guadeloupéen
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {zones.map((zone) => (
            <div
              key={zone.name}
              className="flex flex-col items-center rounded-lg p-6 text-center"
            >
              <MapPin className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-semibold">{zone.name}</h3>
              <p className="text-sm text-muted-foreground">{zone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
