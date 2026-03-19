import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  phone: string;
}

export function HeroSection({
  heroTitle,
  heroSubtitle,
  heroCtaPrimary,
  heroCtaSecondary,
  phone,
}: HeroSectionProps) {
  const phoneDigits = phone.replace(/\s/g, "");

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          {/* Portrait — mobile first (au-dessus) */}
          <div className="relative mx-auto mb-8 w-full max-w-[300px] md:order-2 md:mb-0 md:w-2/5 md:max-w-none">
            <Image
              src="/images/portrait-placeholder.svg"
              alt="Laurent Bazile, Géomètre-Expert en Guadeloupe"
              width={400}
              height={500}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="rounded-lg"
            />
            {/* Badge Ordre overlay */}
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/80 px-3 py-2 text-xs backdrop-blur-sm md:text-sm">
              Géomètre-Expert Foncier DPLG — Inscrit à l&apos;Ordre n°12345
            </div>
          </div>

          {/* Texte — colonne gauche */}
          <div className="md:order-1 md:w-3/5">
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">{heroSubtitle}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Button render={<Link href="/rendez-vous" />}>
                {heroCtaPrimary}
              </Button>
              <Button variant="outline" render={<Link href="/diagnostic" />}>
                {heroCtaSecondary}
              </Button>
              <a
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
