import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  phone: string;
  phoneLandline?: string;
}

export function HeroSection({
  heroTitle,
  heroSubtitle,
  heroCtaPrimary,
  heroCtaSecondary,
  phone,
  phoneLandline,
}: HeroSectionProps) {
  const phoneDigits = phone.replace(/\s/g, "");
  const phoneTel = "+596" + phoneDigits.replace(/^0/, "");
  const landlineDigits = phoneLandline?.replace(/\s/g, "");
  const landlineTel = landlineDigits ? "+596" + landlineDigits.replace(/^0/, "") : undefined;

  return (
    <section className="bg-background py-12 md:pt-20 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:gap-16">
          {/* Portrait — mobile first (au-dessus) */}
          <div className="relative mx-auto mb-8 aspect-[380/460] w-full max-w-[300px] overflow-hidden rounded-xl md:order-2 md:mb-0 md:w-2/5 md:max-w-[380px]">
            <Image
              src="/images/portrait-laurent.jpg"
              alt="Laurent Bazile, Géomètre-Expert en Guadeloupe"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
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
              <Button nativeButton={false} render={<Link href="/rendez-vous" />}>
                {heroCtaPrimary}
              </Button>
              <button
                data-tally-open={process.env.NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID || ""}
                data-tally-layout="modal"
                data-tally-width="700"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border-2 border-primary bg-transparent px-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {heroCtaSecondary}
              </button>
              <span className="text-sm text-muted-foreground">
                ou appelez le{" "}
                {phoneLandline && landlineTel ? (
                  <>
                    <a
                      href={`tel:${landlineTel}`}
                      className="font-semibold text-foreground hover:underline"
                    >
                      {phoneLandline}
                    </a>
                    {" / "}
                  </>
                ) : null}
                <a
                  href={`tel:${phoneTel}`}
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
