import Link from "next/link"
import { Linkedin } from "lucide-react"
import { navigationLinks } from "@/lib/navigation"

interface FooterProps {
  phone?: string
  email?: string
  address?: string
  linkedinUrl?: string | null
  cabinetName?: string
}

const prestationLinks = [
  { label: "Foncier", href: "/nos-prestations" },
  { label: "Topographie", href: "/nos-prestations" },
  { label: "Copropriété", href: "/nos-prestations" },
  { label: "Plans d'architecture", href: "/nos-prestations" },
  { label: "Relevés 3D", href: "/nos-prestations" },
  { label: "Surfaces réglementaires", href: "/nos-prestations" },
]

export function Footer({
  phone = "0690 61 22 24",
  email = "contact@clbge.com",
  address = "Petit-Bourg, Guadeloupe",
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
            <div className="mb-4 text-xl font-bold text-background">CLBGE</div>
            <p className="mb-4 text-sm text-muted-foreground">
              Cabinet Laurent Bazile<br />
              Géomètre-Expert Foncier DPLG<br />
              Guadeloupe, Marie-Galante, Les Saintes, La Désirade
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
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-background transition-colors"
                >
                  {phone}
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
              <li>{address}</li>
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
