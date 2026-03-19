"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { navigationLinks } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  phone?: string
}

export function MobileMenu({ phone = "0690 61 22 24" }: MobileMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Ouvrir le menu" />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col flex-1" aria-label="Navigation mobile">
          {navigationLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)

            return (
              <SheetClose
                key={link.href}
                render={
                  <Link
                    href={link.href}
                    className={cn(
                      "py-4 px-4 text-base border-b border-border transition-colors hover:bg-muted",
                      isActive && "text-primary font-semibold"
                    )}
                  />
                }
              >
                {link.label}
              </SheetClose>
            )
          })}
        </nav>

        {/* Téléphone click-to-call */}
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 px-4 py-3 text-base hover:bg-muted transition-colors"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span>{phone}</span>
        </a>

        {/* CTA pleine largeur */}
        <div className="p-4 mt-auto">
          <Button
            className="w-full"
            render={<Link href="/rendez-vous" />}
            onClick={() => setOpen(false)}
          >
            Prendre RDV
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
