import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clbge.com"),
  title: "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe",
  description:
    "Cabinet Laurent Bazile, géomètre-expert en Guadeloupe. Bornage, division, copropriété, topographie et diagnostics immobiliers à Petit-Bourg.",
  alternates: {
    canonical: "./",
  },
};

const defaults = {
  phone: "0690 61 22 24",
  email: "contact@clbge.com",
  address: "Petit-Bourg, Guadeloupe",
  linkedinUrl: null,
  cabinetName: "Cabinet Laurent Bazile Géomètre-Expert",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = defaults;
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const { client } = await import("@/sanity/lib/client");
      const { siteSettingsQuery } = await import("@/sanity/lib/queries");
      const fetched = await client.fetch(siteSettingsQuery);
      if (fetched) settings = { ...defaults, ...fetched };
    }
  } catch {
    // Sanity pas encore configuré — utilise les valeurs par défaut
  }

  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Aller au contenu principal
        </a>
        <JsonLd />
        <NavBar phone={settings.phone ?? defaults.phone} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer
          phone={settings.phone ?? defaults.phone}
          email={settings.email ?? defaults.email}
          address={settings.address ?? defaults.address}
          linkedinUrl={settings.linkedinUrl ?? defaults.linkedinUrl}
          cabinetName={settings.cabinetName ?? defaults.cabinetName}
        />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
