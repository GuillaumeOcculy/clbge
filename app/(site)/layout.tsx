import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import Script from "next/script";

const settings = {
  phone: "0690 61 22 24",
  phoneLandline: "0590 26 35 90",
  email: "contact@clbge.com",
  address: "17, rue Amédée FENGAROL\nLotissement Vince Arnouville\n97170 PETIT-BOURG",
  linkedinUrl: null as string | null,
  cabinetName: "Cabinet Laurent Bazile Géomètre-Expert",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>
      <JsonLd />
      <NavBar phone={settings.phone} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        phone={settings.phone}
        phoneLandline={settings.phoneLandline}
        email={settings.email}
        address={settings.address}
        linkedinUrl={settings.linkedinUrl}
        cabinetName={settings.cabinetName}
      />
    </>
  );
}
