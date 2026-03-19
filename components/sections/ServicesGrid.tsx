import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";

interface Service {
  _id: string;
  title: string;
  icon: string;
  shortDescription: string;
}

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4">Nos prestations</h2>
          <div className="mx-auto h-0.5 w-12 bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <Link key={service._id} href="/nos-prestations">
                <Card className="h-full transition-colors hover:border-primary hover:bg-secondary/50">
                  <CardContent className="flex items-start gap-4 p-6">
                    <Icon className="mt-1 h-8 w-8 shrink-0 text-primary" />
                    <div>
                      <h3 className="mb-1 font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
