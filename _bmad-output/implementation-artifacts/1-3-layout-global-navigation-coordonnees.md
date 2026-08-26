# Story 1.3 : Layout global, navigation & coordonnées

Status: done

## Story

En tant que visiteur,
Je veux naviguer entre toutes les sections du site via un menu professionnel et accéder aux coordonnées du cabinet,
Afin de trouver rapidement l'information dont j'ai besoin.

## Acceptance Criteria

1. **Given** je suis sur n'importe quelle page du site **When** je consulte le header **Then** le logo CLB est affiché à gauche (image placeholder jusqu'à réception du SVG) **And** un menu principal affiche les liens vers toutes les sections (Accueil, Nos prestations, Qui suis-je, Notre mission, Nos technologies, Diagnostic, Blog, Contact) **And** un bouton CTA "Prendre RDV" est visible en permanence à droite **And** le header est sticky (reste visible au scroll)

2. **Given** je suis sur mobile (< 768px) **When** je consulte le header **Then** le menu est remplacé par un menu hamburger **And** le menu mobile s'ouvre en slide-in depuis la droite (Sheet shadcn/ui) **And** les liens sont empilés verticalement avec padding 16px **And** un CTA "Prendre RDV" pleine largeur est affiché en bas du menu **And** le numéro de téléphone click-to-call (`tel:0690612422`) est visible dans le menu **And** le CTA "Prendre RDV" reste visible dans le header même quand le menu est fermé

3. **Given** je suis sur n'importe quelle page **When** je consulte le footer **Then** les coordonnées du cabinet sont affichées (téléphone click-to-call, email click-to-mailto, adresse) **And** le footer inclut les liens de navigation et les liens vers les prestations **And** un lien LinkedIn avec icône est affiché **And** le copyright est visible

4. **Given** je navigue au clavier **When** je presse Tab **Then** un skip link "Aller au contenu principal" apparaît en premier (visible au focus uniquement) **And** tous les éléments du menu et du footer sont accessibles au clavier avec focus ring visible (`#B5342B`)

## Tasks / Subtasks

- [x] Task 1 : Créer le composant NavBar desktop (AC: #1)
  - [x] 1.1 Créer `components/layout/NavBar.tsx` — Server Component
  - [x] 1.2 Logo CLB à gauche (placeholder `next/image` — utiliser un SVG texte "CLB" ou une image placeholder dans `/public/images/logo.svg`)
  - [x] 1.3 NavigationMenu shadcn/ui au centre avec les 8 liens de navigation
  - [x] 1.4 Bouton CTA "Prendre RDV" (variante `default` primary) à droite, lien vers `/rendez-vous`
  - [x] 1.5 Header sticky : `sticky top-0 z-50 bg-card border-b border-border`
  - [x] 1.6 Lien actif mis en évidence (rouge primary + font-weight 600) via `usePathname()`
  - [x] 1.7 Max-width 1200px centré, padding latéral responsive (16px mobile, 32px tablette, 64px desktop)

- [x] Task 2 : Créer le composant MobileMenu (AC: #2)
  - [x] 2.1 Créer `components/layout/MobileMenu.tsx` — **`'use client'`** (Sheet nécessite interactivité)
  - [x] 2.2 Bouton hamburger (icône `Menu` de Lucide) visible uniquement < md (768px)
  - [x] 2.3 Sheet shadcn/ui `side="right"` avec les 8 liens empilés, padding 16px vertical par lien
  - [x] 2.4 CTA "Prendre RDV" pleine largeur en bas du Sheet (Button primary `w-full`)
  - [x] 2.5 Numéro de téléphone click-to-call (`tel:0690612422`) visible avec icône `Phone`
  - [x] 2.6 Fermer le Sheet automatiquement au clic sur un lien (utiliser `onOpenChange` ou `SheetClose`)
  - [x] 2.7 CTA "Prendre RDV" visible dans le header mobile AUSSI quand le menu est fermé (à côté du hamburger)

- [x] Task 3 : Créer le composant Footer (AC: #3)
  - [x] 3.1 Créer `components/layout/Footer.tsx` — Server Component
  - [x] 3.2 Section coordonnées : téléphone `tel:0690612422` (click-to-call), email `mailto:` (click-to-mailto), adresse texte
  - [x] 3.3 Section liens de navigation (mêmes 8 liens que le header)
  - [x] 3.4 Lien LinkedIn avec icône `Linkedin` de Lucide et `rel="noopener noreferrer"` `target="_blank"`
  - [x] 3.5 Copyright : `© {année courante} Cabinet Laurent Bazile Géomètre-Expert`
  - [x] 3.6 Layout : grille responsive (3-4 colonnes desktop, 1 colonne empilée mobile)
  - [x] 3.7 Fond `bg-foreground` (anthracite `#2D2D3F`), texte clair — contraste inversé pour différencier du contenu

- [x] Task 4 : Créer le skip link (AC: #4)
  - [x] 4.1 Ajouter un skip link en premier élément du `<body>` dans `app/layout.tsx`
  - [x] 4.2 Texte : "Aller au contenu principal", lien vers `#main-content`
  - [x] 4.3 Invisible par défaut, visible au focus (`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]`)
  - [x] 4.4 Ajouter `id="main-content"` sur le `<main>` dans `layout.tsx`

- [x] Task 5 : Intégrer dans le layout global (AC: #1, #2, #3, #4)
  - [x] 5.1 Modifier `app/layout.tsx` : ajouter `<NavBar />` et `<Footer />` autour du `{children}`
  - [x] 5.2 Envelopper `{children}` dans `<main id="main-content" className="flex-1">`
  - [x] 5.3 Corriger les métadonnées par défaut : title "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe", description adaptée
  - [x] 5.4 Fetcher `siteSettings` depuis Sanity dans le layout pour les coordonnées (téléphone, email, adresse, linkedinUrl) et passer en props au Footer
  - [x] 5.5 Gérer le fallback si Sanity n'est pas encore configuré (coordonnées en dur en attendant)

- [x] Task 6 : Créer le logo placeholder (AC: #1)
  - [x] 6.1 Créer un SVG placeholder simple dans `/public/images/logo-placeholder.svg` (texte "CLB" stylisé en rouge primary)
  - [x] 6.2 Utiliser `next/image` avec `width`, `height` et `alt="Logo Cabinet Laurent Bazile Géomètre-Expert"`
  - [x] 6.3 Le logo est un lien vers `/` (homepage)

- [x] Task 7 : Validation
  - [x] 7.1 `npm run build` réussit sans erreur
  - [x] 7.2 `npm run lint` passe
  - [x] 7.3 Navigation clavier complète fonctionnelle (Tab traverse skip link → nav → main → footer)
  - [x] 7.4 Menu mobile Sheet s'ouvre et se ferme correctement
  - [x] 7.5 CTA "Prendre RDV" visible sur toutes les tailles d'écran
  - [x] 7.6 Skip link visible au focus, invisible sinon
  - [x] 7.7 Liens `tel:` et `mailto:` fonctionnels

## Dev Notes

### Architecture & Patterns obligatoires

- **Server Components par défaut** — NavBar et Footer sont des Server Components. Seul MobileMenu est `'use client'` (Sheet nécessite état React)
- **Pas de `useEffect` + `fetch`** — les données Sanity sont fetchées au build dans le `layout.tsx` (SSG)
- **`next/image` obligatoire** — pour le logo, jamais de `<img>` brut
- **Tailwind classes utilitaires** — pas de `@apply` sauf cas répétitif extrême
- **Icônes Lucide** — `Menu` (hamburger), `X` (close), `Phone`, `Mail`, `MapPin`, `Linkedin`, `ExternalLink`

### Composants shadcn/ui déjà installés

Les composants nécessaires sont **déjà installés** dans `components/ui/` :
- `button.tsx` — pour CTA "Prendre RDV"
- `sheet.tsx` — pour le menu mobile (slide-in)
- `navigation-menu.tsx` — pour le menu desktop
- `separator.tsx` — pour les séparateurs visuels dans le footer

### NavigationMenu shadcn/ui — Pattern avec Next.js Link

Utiliser le render prop pour intégrer `next/link` :

```tsx
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

<NavigationMenuItem>
  <NavigationMenuLink
    render={<Link href="/nos-prestations" />}
    className={navigationMenuTriggerStyle()}
  >
    Nos prestations
  </NavigationMenuLink>
</NavigationMenuItem>
```

### Sheet shadcn/ui — Pattern menu mobile

```tsx
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetClose,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
      <Menu className="h-6 w-6" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Menu</SheetTitle>
    </SheetHeader>
    {/* Liens navigation empilés */}
    <SheetClose asChild>
      <Link href="/nos-prestations">Nos prestations</Link>
    </SheetClose>
  </SheetContent>
</Sheet>
```

### Liens de navigation (8 liens)

```typescript
const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/nos-prestations", label: "Nos prestations" },
  { href: "/qui-suis-je", label: "Qui suis-je" },
  { href: "/notre-mission", label: "Notre mission" },
  { href: "/nos-technologies", label: "Nos technologies" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]
```

Centraliser ce tableau dans un fichier partagé (ex: `lib/navigation.ts`) pour réutilisation NavBar + MobileMenu + Footer.

### Lien actif — `usePathname()`

Pour mettre en évidence le lien de la page courante, utiliser `usePathname()` de `next/navigation`. **Attention :** `usePathname()` nécessite `'use client'`. Deux options :

1. **Option recommandée :** Extraire un petit composant client `NavLinks.tsx` qui gère le lien actif, et l'intégrer dans NavBar (Server Component)
2. **Alternative :** Rendre NavBar entier en `'use client'` (acceptable mais moins optimal)

Le lien actif reçoit : `text-primary font-semibold` (rouge + semi-bold).

### Données Sanity — siteSettings

La query `siteSettingsQuery` dans `sanity/lib/queries.ts` retourne :
```
{ cabinetName, phone, email, address, linkedinUrl, orderNumber, metaTitle, metaDescription, ogImage }
```

Fetcher dans `layout.tsx` avec :
```typescript
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"

const settings = await client.fetch(siteSettingsQuery)
```

**Fallback hardcoded** si Sanity pas encore alimenté :
```typescript
const defaults = {
  phone: "0690 61 24 22",
  email: "contact@clbge.com",
  address: "Petit-Bourg, Guadeloupe",
  linkedinUrl: null,
  cabinetName: "Cabinet Laurent Bazile Géomètre-Expert",
}
const settings = (await client.fetch(siteSettingsQuery)) ?? defaults
```

### Layout responsive — Breakpoints

- **Mobile (< 768px)** : hamburger menu, CTA compact dans le header, footer 1 colonne
- **Tablette (768px - 1023px)** : NavigationMenu visible (pas de hamburger), footer 2 colonnes
- **Desktop (> 1024px)** : layout complet, footer 3-4 colonnes, max-width 1200px

Classes Tailwind responsive : mobile-first, puis `md:` (768px), `lg:` (1024px).

### Header sticky — Pattern

```tsx
<header className="sticky top-0 z-50 bg-card border-b border-border">
  <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-18">
    {/* Logo | Nav | CTA */}
  </div>
</header>
```

Le `max-w-7xl` est défini à 1200px dans les design tokens (`globals.css` : `--container-max-width-7xl: 1200px`).

### Footer — Design

- Fond anthracite (`bg-foreground text-background`) pour contraste avec le reste du site
- 3 colonnes desktop : Coordonnées | Navigation | Liens rapides
- Section coordonnées : icône + texte pour téléphone, email, adresse
- Liens avec style `text-muted hover:text-background` pour visibilité sur fond sombre
- LinkedIn : icône Lucide `Linkedin` + texte "LinkedIn" + `target="_blank" rel="noopener noreferrer"`
- Copyright en bas, centré, texte muted-foreground small

### Skip link — Pattern accessibilité

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
>
  Aller au contenu principal
</a>
```

Doit être le **premier élément focusable** dans le `<body>`, avant le `<header>`.

### Structure de fichiers à créer/modifier

**Nouveaux fichiers :**
```
components/layout/NavBar.tsx               # Navigation principale (Server Component)
components/layout/MobileMenu.tsx           # Menu mobile Sheet ('use client')
components/layout/Footer.tsx               # Footer avec coordonnées (Server Component)
lib/navigation.ts                          # Tableau des liens de navigation centralisé
public/images/logo-placeholder.svg         # Logo placeholder SVG
```

**Fichiers modifiés :**
```
app/layout.tsx                             # Intégration NavBar + Footer + skip link + main#main-content + fetch siteSettings
```

**Fichiers supprimés :**
```
components/layout/.gitkeep                 # Remplacé par les vrais composants
```

### Pièges techniques critiques

1. **`usePathname()` nécessite `'use client'`** — ne pas mettre `usePathname` dans un Server Component. Extraire un sous-composant client ou rendre le composant parent client.
2. **Sheet focus trap** — Le Sheet shadcn/ui (Radix UI) gère nativement le focus trap. Ne pas le réimplémenter.
3. **`<SheetTitle>` obligatoire** — Radix UI exige un titre pour l'accessibilité (aria-labelledby). Utiliser `<SheetTitle>` même si visuellement caché avec `sr-only`.
4. **Logo `next/image` avec SVG** — Utiliser `width` et `height` explicites (pas `fill`). Pour un SVG, les dimensions doivent correspondre au viewBox.
5. **Fond footer anthracite** — S'assurer que les contrastes texte/fond respectent WCAG AA. Texte `#F5F0EB` (crème) sur fond `#2D2D3F` (anthracite) = ratio ~10:1.
6. **Layout.tsx est un Server Component** — On peut fetch Sanity directement dedans (SSG). Pas besoin de `'use client'`.
7. **Pas de pages `/nos-prestations`, `/qui-suis-je`, etc. encore** — Les liens de navigation pointeront vers des routes qui n'existent pas encore (Epics 2-5). C'est normal et attendu. Next.js affichera la page 404 par défaut pour ces routes.
8. **`z-50` sur le header** — S'assurer qu'il est au-dessus de tout le contenu mais sous les modales (Sheet utilise z-50 par défaut).

### Intelligence Story 1.2 (story précédente)

- Sanity configuré avec `next-sanity`, client dans `sanity/lib/client.ts`
- 11 queries GROQ centralisées dans `sanity/lib/queries.ts` (dont `siteSettingsQuery`)
- Studio dans `app/studio/[[...tool]]/page.tsx` avec layout séparé
- CSP permissive pour `/studio`, restrictive pour le reste
- Tailwind v4 utilise `@theme` dans `globals.css` (pas de `tailwind.config.ts`)
- shadcn/ui v4.0.8 initialisé, composants dans `components/ui/`
- `'use client'` sur page Studio avec layout séparé pour metadata (workaround Next.js 16)
- Palette CLBGE en hex dans `:root` (pas d'oklch)
- Import alias `@/*` configuré
- Build et lint passent

### Anti-patterns à éviter

- **NE PAS** utiliser `<img>` pour le logo — toujours `next/image`
- **NE PAS** écrire les liens de navigation en dur dans chaque composant — centraliser dans `lib/navigation.ts`
- **NE PAS** mettre `'use client'` sur NavBar ou Footer si pas nécessaire
- **NE PAS** utiliser `useEffect` + `fetch` pour charger les coordonnées Sanity — fetch SSG dans `layout.tsx`
- **NE PAS** créer de CSS custom pour le responsive — utiliser les classes Tailwind (`md:`, `lg:`)
- **NE PAS** oublier `aria-label` sur le bouton hamburger ("Ouvrir le menu")
- **NE PAS** oublier `<SheetTitle>` dans le Sheet (requis par Radix pour a11y)
- **NE PAS** utiliser `@apply` pour les styles de navigation — classes utilitaires Tailwind directement
- **NE PAS** hardcoder le numéro de téléphone partout — utiliser les données Sanity avec fallback

### Project Structure Notes

- Les composants layout suivent l'architecture définie : `components/layout/NavBar.tsx`, `MobileMenu.tsx`, `Footer.tsx`
- Le tableau de navigation centralisé dans `lib/navigation.ts` est conforme au pattern utilitaires/helpers en `camelCase`
- Les routes ciblées par les liens de navigation (`/nos-prestations`, `/qui-suis-je`, etc.) seront créées dans les Epics 2-5

### References

- [Source: planning-artifacts/epics.md#Story 1.3] — Acceptance criteria
- [Source: planning-artifacts/architecture.md#Frontend Architecture] — Server Components par défaut, `'use client'` uniquement si nécessaire
- [Source: planning-artifacts/architecture.md#Structure Patterns] — Organisation `/components/layout/`
- [Source: planning-artifacts/architecture.md#Naming Patterns] — PascalCase composants, camelCase helpers
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — next/image obligatoire, Tailwind pour styling
- [Source: planning-artifacts/ux-design-specification.md#Navigation Patterns] — Header sticky, menu mobile Sheet, lien actif
- [Source: planning-artifacts/ux-design-specification.md#Button Hierarchy] — CTA primary = fond rouge, une seule primary par section
- [Source: planning-artifacts/ux-design-specification.md#Accessibility Strategy] — Skip link, focus ring, WCAG 2.1 AA
- [Source: planning-artifacts/ux-design-specification.md#Responsive Strategy] — Mobile-first, breakpoints md/lg
- [Source: implementation-artifacts/1-2-configuration-sanity-cms-studio.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Build initial échoué : `asChild` prop n'existe pas dans @base-ui/react — corrigé en utilisant le pattern `render` prop
- Build échoué : `createClient` Sanity throw quand `NEXT_PUBLIC_SANITY_PROJECT_ID` est vide — corrigé avec import dynamique conditionnel dans layout.tsx

### Completion Notes List

- NavBar (Server Component) avec logo placeholder, NavigationMenu desktop, CTA "Prendre RDV"
- NavLinks (Client Component) extrait pour `usePathname()` — lien actif en rouge primary + semi-bold
- MobileMenu ('use client') avec Sheet slide-in, 8 liens, téléphone click-to-call, CTA pleine largeur
- Footer (Server Component) avec coordonnées, liens navigation, LinkedIn, copyright dynamique
- Skip link accessible en premier élément focusable du body
- Layout.tsx : async, fetch Sanity défensif avec fallback hardcoded, metadata corrigée
- Liens de navigation centralisés dans `lib/navigation.ts`
- Logo placeholder SVG "CLB" en rouge primary
- Pattern @base-ui/react : utilisation de `render` prop au lieu de `asChild` (Radix)
- Import dynamique de Sanity client pour éviter crash build quand projectId est vide

### Change Log

- 2026-03-19 : Implémentation complète story 1.3 — layout global, navigation, footer, skip link
- 2026-03-19 : Code review — 1 MEDIUM fix (téléphone MobileMenu dynamique via props Sanity), 1 LOW fix (CTA mobile "Prendre RDV" au lieu de "RDV")

### File List

**Nouveaux fichiers :**
- `components/layout/NavBar.tsx` — Navigation principale desktop (Server Component)
- `components/layout/NavLinks.tsx` — Liens navigation avec état actif ('use client')
- `components/layout/MobileMenu.tsx` — Menu mobile Sheet ('use client')
- `components/layout/Footer.tsx` — Footer avec coordonnées (Server Component)
- `lib/navigation.ts` — Tableau des 8 liens de navigation centralisé
- `public/images/logo-placeholder.svg` — Logo placeholder SVG "CLB"

**Fichiers modifiés :**
- `app/layout.tsx` — Skip link, NavBar, Footer, main#main-content, fetch Sanity défensif, metadata corrigée

**Fichiers supprimés :**
- `components/layout/.gitkeep`
- `public/images/.gitkeep`
