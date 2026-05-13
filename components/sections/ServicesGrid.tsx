import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import { slugifyServiceTitle } from "@/lib/services";

interface Service {
  _id: string;
  title: string;
  icon: string;
  items: string[];
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
            const slug = slugifyServiceTitle(service.title);
            return (
              <Link key={service._id} href={`/nos-prestations#${slug}`}>
                <Card className="h-full transition-colors hover:border-primary hover:bg-secondary/50">
                  <CardContent className="flex items-start gap-4 p-7">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-background">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">{service.title}</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span aria-hidden="true">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
