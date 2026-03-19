import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export function CtaBanner({ title, subtitle, buttonText }: CtaBannerProps) {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
        <h2 className="mb-2 text-2xl font-bold text-primary-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mb-8 text-primary-foreground/90">{subtitle}</p>
        <Button
          variant="outline"
          className="border-white bg-white text-primary hover:bg-white/90"
          render={<Link href="/rendez-vous" />}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
