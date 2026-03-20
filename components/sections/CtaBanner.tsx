import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  href?: string;
}

export function CtaBanner({ title, subtitle, buttonText, href = "/rendez-vous" }: CtaBannerProps) {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-8 lg:px-16">
        <h2 className="mb-3 text-[30px] font-bold text-primary-foreground">
          {title}
        </h2>
        <p className="mb-7 text-primary-foreground/90">{subtitle}</p>
        <Button
          variant="outline"
          className="border-white bg-white text-primary hover:bg-background"
          render={<Link href={href} />}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
