import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BlogCtaEndArticle() {
  return (
    <div className="mx-auto mt-12 max-w-prose rounded-lg border bg-muted/30 p-6 text-center md:p-8">
      <p className="mb-4 text-lg font-medium">
        Besoin d&apos;un géomètre ? Faites le diagnostic en 4 questions
      </p>
      <Button variant="outline" render={<Link href="/diagnostic" />}>
        Faire le diagnostic
      </Button>
    </div>
  );
}
