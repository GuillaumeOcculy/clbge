import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavLinks } from "@/components/layout/NavLinks"
import { MobileMenu } from "@/components/layout/MobileMenu"

interface NavBarProps {
  phone?: string
}

export function NavBar({ phone }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-placeholder.svg"
            alt="Logo Cabinet Laurent Bazile Géomètre-Expert"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center" aria-label="Navigation principale">
          <NavLinks />
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button render={<Link href="/rendez-vous" />}>
            Prendre RDV
          </Button>
        </div>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Button size="sm" render={<Link href="/rendez-vous" />}>
            Prendre RDV
          </Button>
          <MobileMenu phone={phone} />
        </div>
      </div>
    </header>
  )
}
