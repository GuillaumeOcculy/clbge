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
          <h2 className="mb-3 text-4xl font-semibold">Nos prestations</h2>
          <p className="mx-auto mb-4 max-w-[500px] text-base text-muted-foreground">Des solutions adaptées à chaque projet</p>
          <div className="mx-auto h-[3px] w-12 bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <Link key={service._id} href="/nos-prestations">
                <Card className="h-full transition-colors hover:border-primary hover:bg-secondary/50">
                  <CardContent className="flex items-start gap-4 p-7">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-background">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
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
