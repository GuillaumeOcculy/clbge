import Link from "next/link"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { navigationLinks } from "@/lib/navigation"

interface FooterProps {
  phone?: string
  phoneLandline?: string
  email?: string
  address?: string
  linkedinUrl?: string | null
  cabinetName?: string
}

const prestationLinks = [
  { label: "Foncier", href: "/nos-prestations#foncier" },
  { label: "Prescription acquisitive et usucapion", href: "/nos-prestations#prescription-acquisitive-et-usucapion" },
  { label: "Urbanisme", href: "/nos-prestations#urbanisme" },
  { label: "Évaluation des biens immobiliers", href: "/nos-prestations#evaluation-des-biens-immobiliers" },
  { label: "Copropriété & Division en volumes", href: "/nos-prestations#copropriete-division-en-volumes" },
  { label: "Plans d'architecture", href: "/nos-prestations#plans-d-architecture" },
  { label: "Topographie", href: "/nos-prestations#topographie" },
  { label: "Relevés et acquisitions 3D", href: "/nos-prestations#releves-et-acquisitions-3d" },
]

export function Footer({
  phone = "0690 61 24 22",
  phoneLandline = "0590 26 35 90",
  email = "contact@clbge.com",
  address = "17, rue Amédée FENGAROL\nLotissement Vince Arnouville\n97170 PETIT-BOURG",
  linkedinUrl = null,
  cabinetName = "Cabinet Laurent Bazile Géomètre-Expert",
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer data-testid="main-footer" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4 inline-flex h-32 w-32 items-center justify-center rounded-full bg-card">
              <Image
                src="/images/logo-clb.svg"
                alt="Logo CLB Géomètre-Expert"
                width={200}
                height={200}
                className="h-20 w-auto"
              />
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Cabinet Laurent BAZILE Géomètre-Expert<br />
              Inscrit au tableau de l&apos;Ordre des Géomètres-Experts<br />
              sous le numéro 07178<br />
              <a
                href="https://www.google.com/maps/search/?api=1&query=16.231611,-61.588806"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background transition-colors"
              >
                Guadeloupe, Marie-Galante, Les Saintes, La Désirade
              </a>
            </p>
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 transition-colors hover:bg-white/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/rendez-vous"
                  className="text-sm text-muted-foreground hover:text-background transition-colors"
                >
                  Prendre rendez-vous
                </Link>
              </li>
            </ul>
          </div>

          {/* Prestations */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background">
              Prestations
            </h4>
            <ul className="space-y-2">
              {prestationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-background">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {phoneLandline && (
                <li>
                  <a
                    href={`tel:+590${phoneLandline.replace(/\s/g, "").replace(/^0/, "")}`}
                    className="hover:text-background transition-colors"
                  >
                    {phoneLandline} (fixe)
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`tel:+590${phone.replace(/\s/g, "").replace(/^0/, "")}`}
                  className="hover:text-background transition-colors"
                >
                  {phone} (mobile)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-background transition-colors"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=16.231611,-61.588806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors"
                >
                  {address.split("\n").map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-8">
          <p className="text-center text-[13px] text-muted-foreground">
            &copy; {currentYear} {cabinetName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
