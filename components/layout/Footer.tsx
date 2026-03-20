import Link from "next/link"
import { Phone, Mail, MapPin, Linkedin } from "lucide-react"
import { navigationLinks } from "@/lib/navigation"
import { Separator } from "@/components/ui/separator"

interface FooterProps {
  phone?: string
  email?: string
  address?: string
  linkedinUrl?: string | null
  cabinetName?: string
}

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
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Coordonnées */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              {cabinetName}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-muted hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-muted hover:text-background transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{address}</span>
              </li>
              {linkedinUrl && (
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted hover:text-background transition-colors"
                  >
                    <Linkedin className="h-4 w-4 flex-shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Liens de navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/diagnostic"
                  className="text-muted hover:text-background transition-colors"
                >
                  Diagnostic gratuit
                </Link>
              </li>
              <li>
                <Link
                  href="/rendez-vous"
                  className="text-muted hover:text-background transition-colors"
                >
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted hover:text-background transition-colors"
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-muted-foreground/30" />

        {/* Copyright */}
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} {cabinetName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
