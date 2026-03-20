import Image from "next/image";
import Link from "next/link";
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
    <section className="bg-background py-12 md:pt-20 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:gap-16">
          {/* Portrait — mobile first (au-dessus) */}
          <div className="relative mx-auto mb-8 w-full max-w-[300px] md:order-2 md:mb-0 md:w-2/5 md:max-w-none">
            <Image
              src="/images/portrait-laurent.jpg"
              alt="Laurent Bazile, Géomètre-Expert en Guadeloupe"
              width={380}
              height={460}
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="rounded-xl"
            />
            {/* Badge Ordre overlay */}
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/80 px-4 py-3 text-xs backdrop-blur-sm md:text-sm">
              Géomètre-Expert Foncier DPLG — Inscrit à l&apos;Ordre n°12345
            </div>
          </div>

          {/* Texte — colonne gauche */}
          <div className="md:order-1 md:w-3/5">
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-[44px]">
              {heroTitle.includes(",") ? (
                <>
                  <span className="text-primary">{heroTitle.split(",")[0]}</span>
                  ,{heroTitle.split(",").slice(1).join(",")}
                </>
              ) : (
                heroTitle
              )}
            </h1>
            <p className="mb-8 text-[17px] leading-relaxed text-muted-foreground">{heroSubtitle}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Button render={<Link href="/rendez-vous" />}>
                {heroCtaPrimary}
              </Button>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                render={<Link href="/diagnostic" />}
              >
                {heroCtaSecondary}
              </Button>
              <span className="text-sm text-muted-foreground">
                ou appelez le{" "}
                <a
                  href={`tel:${phoneDigits}`}
                  className="font-semibold text-foreground hover:underline"
                >
                  {phone}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
