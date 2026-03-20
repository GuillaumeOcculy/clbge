"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigationLinks } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-7">
      {navigationLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium text-foreground hover:text-primary transition-colors",
              isActive && "text-primary font-semibold"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
