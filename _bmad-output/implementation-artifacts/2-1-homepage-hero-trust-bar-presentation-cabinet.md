# Story 2.1 : Homepage — Hero, Trust Bar et présentation du cabinet

Status: done

## Story

En tant que visiteur,
Je veux comprendre immédiatement qui est Laurent et ce que fait le cabinet depuis la homepage,
Afin de savoir si ce professionnel peut répondre à mon besoin.

## Acceptance Criteria

1. **Given** je suis un visiteur arrivant sur la homepage **When** la page se charge **Then** un hero affiche le portrait de Laurent (`next/image`) à droite avec un badge Ordre en overlay ("Géomètre-Expert Foncier DPLG — Inscrit à l'Ordre n°12345") **And** le titre h1 affiche "Laurent BAZILE, votre Géomètre-Expert en Guadeloupe" **And** un sous-titre décrit l'activité et la zone d'intervention (archipel guadeloupéen) **And** 2 CTAs sont visibles : "Prendre rendez-vous" (primary) et "Diagnostic gratuit" (outline) **And** le numéro de téléphone click-to-call est affiché à côté des CTAs

2. **Given** la page est chargée **When** je regarde sous le hero **Then** une TrustBar affiche 4 points de confiance avec checkmarks rouges (Inscrit à l'Ordre, Intervention sur tout l'archipel, RDV et paiement en ligne, Technologies de pointe) **And** la TrustBar est en flex horizontal sur desktop et wrap 2x2 sur mobile

3. **Given** je scroll la homepage **When** je passe la section services **Then** une grille de 6 cards présente les prestations (Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires) **And** chaque card affiche une icône Lucide + titre + description courte **And** chaque card est cliquable et mène vers `/nos-prestations`

4. **Given** je continue de scroller **Then** une section présente les 5 étapes de mission (numéros rouges circulaires + titre + description + connecteurs) **And** une section diagnostic affiche le texte "Vous ne savez pas exactement ce dont vous avez besoin ?" avec un CTA "Faire le diagnostic" **And** un bandeau CTA rouge est affiché avant le footer ("Besoin d'un géomètre-expert ?" + bouton blanc "Prendre rendez-vous")

5. **Given** le contenu est fetché depuis Sanity (schéma `homePage`, `serviceItem`, `missionStep`) au build (SSG) **And** la page exporte `generateMetadata()` avec title et description optimisées **And** les images utilisent `next/image` avec lazy loading

6. **Given** je suis sur mobile **When** la page se charge **Then** le hero s'affiche en stack vertical (portrait au-dessus du texte) **And** les cards de services passent en 1 colonne **And** les étapes de mission s'empilent verticalement

## Tasks / Subtasks

- [x] Task 1 : Créer le composant HeroSection (AC: #1, #6)
  - [x] 1.1 Créer `components/sections/HeroSection.tsx` — Server Component
  - [x] 1.2 Layout 2 colonnes (texte 60% gauche / portrait 40% droite), stack vertical sur mobile (portrait au-dessus)
  - [x] 1.3 Portrait Laurent : `next/image` avec image placeholder (`/public/images/portrait-placeholder.svg`), `priority={true}` (LCP), `sizes="(max-width: 768px) 100vw, 40vw"`
  - [x] 1.4 Badge Ordre en overlay sur le portrait : position absolute, fond blanc/80 backdrop-blur, texte "Géomètre-Expert Foncier DPLG — Inscrit à l'Ordre n°12345", petit padding, rounded-lg
  - [x] 1.5 Titre h1 depuis props `heroTitle` (Sanity), fallback "Laurent BAZILE, votre Géomètre-Expert en Guadeloupe"
  - [x] 1.6 Sous-titre depuis props `heroSubtitle` (Sanity)
  - [x] 1.7 CTA primary "Prendre rendez-vous" → lien `/rendez-vous` (Button shadcn/ui `default` avec `render` prop)
  - [x] 1.8 CTA secondary "Diagnostic gratuit" → lien `/diagnostic` (Button shadcn/ui `outline` avec `render` prop)
  - [x] 1.9 Numéro click-to-call `tel:0690612422` avec icône `Phone` de Lucide, reçu en props `phone`
  - [x] 1.10 Section fond crème (`bg-background`), padding section 48px mobile / 80px desktop

- [x] Task 2 : Créer le composant TrustBar (AC: #2, #6)
  - [x] 2.1 Créer `components/sections/TrustBar.tsx` — Server Component
  - [x] 2.2 Reçoit `items: Array<{ text: string }>` en props (depuis Sanity `homePage.trustBarItems`)
  - [x] 2.3 Chaque item : checkmark rouge (icône `CircleCheck` de Lucide en `text-primary`) + texte
  - [x] 2.4 Layout : `flex flex-wrap justify-center gap-6 md:gap-8` — horizontal desktop, wrap 2x2 mobile
  - [x] 2.5 Fallback hardcoded si pas de données Sanity : les 4 items par défaut (géré dans page.tsx)
  - [x] 2.6 Sémantique : `<ul>` avec `<li>` pour chaque item
  - [x] 2.7 Section fond blanc (`bg-card`), padding vertical 24px, border-bottom subtile

- [x] Task 3 : Créer le composant ServicesGrid (AC: #3, #6)
  - [x] 3.1 Créer `components/sections/ServicesGrid.tsx` — Server Component
  - [x] 3.2 Reçoit `services: Array<{ title, icon, shortDescription }>` en props
  - [x] 3.3 Grille : `grid grid-cols-1 md:grid-cols-2 gap-6` — 2 colonnes desktop, 1 mobile
  - [x] 3.4 Chaque card : Card shadcn/ui avec icône Lucide dynamique + titre + description courte
  - [x] 3.5 Icône dynamique : mapper le champ `icon` (string Sanity) vers le composant Lucide correspondant via `getIcon()` de `lib/icons.tsx`
  - [x] 3.6 Card cliquable : `<Link href="/nos-prestations">` englobant, hover : `border-primary bg-secondary/50` transition
  - [x] 3.7 Section avec titre h2 centré "Nos prestations" + séparateur rouge `div` (pas Separator composant car plus simple)
  - [x] 3.8 Section fond crème (`bg-background`), padding section standard

- [x] Task 4 : Créer le composant MissionSteps (AC: #4, #6)
  - [x] 4.1 Créer `components/sections/MissionSteps.tsx` — Server Component
  - [x] 4.2 Reçoit `steps: Array<{ title, description, stepNumber }>` en props
  - [x] 4.3 Chaque étape : cercle rouge numéroté (`bg-primary text-primary-foreground rounded-full w-10 h-10`) + titre + description
  - [x] 4.4 Connecteurs entre étapes : ligne verticale mobile / horizontale desktop
  - [x] 4.5 Layout : `flex flex-col md:flex-row` — vertical mobile, horizontal desktop
  - [x] 4.6 Sémantique : `<ol>` avec `<li>` pour chaque étape
  - [x] 4.7 Section avec titre h2 centré "Comment se déroule une mission" + séparateur rouge
  - [x] 4.8 Section fond blanc (`bg-card`), padding section standard

- [x] Task 5 : Créer le composant DiagnosticSection (AC: #4)
  - [x] 5.1 Créer `components/sections/DiagnosticSection.tsx` — Server Component
  - [x] 5.2 Texte d'accroche depuis props `diagnosticTitle` et `diagnosticDescription` (Sanity)
  - [x] 5.3 Fallback géré dans page.tsx avec defaultHero
  - [x] 5.4 CTA "Faire le diagnostic" → lien `/diagnostic` (Button primary avec `render` prop)
  - [x] 5.5 Layout 2 colonnes desktop (texte gauche / visuel droite), stack mobile
  - [x] 5.6 Le visuel droite est une card de teasing avec icône ClipboardCheck
  - [x] 5.7 Section fond crème (`bg-background`), padding section standard

- [x] Task 6 : Créer le composant CtaBanner (AC: #4)
  - [x] 6.1 Créer `components/sections/CtaBanner.tsx` — Server Component
  - [x] 6.2 Reçoit `title`, `subtitle`, `buttonText` en props (depuis Sanity `homePage`)
  - [x] 6.3 Fallback géré dans page.tsx avec defaultHero
  - [x] 6.4 Fond rouge `bg-primary`, texte blanc `text-primary-foreground`
  - [x] 6.5 Bouton inversé : fond blanc, texte rouge (`variant="outline" className="bg-white text-primary hover:bg-white/90"`)
  - [x] 6.6 Lien vers `/rendez-vous`
  - [x] 6.7 Centré, pleine largeur, padding vertical 48px mobile / 64px desktop

- [x] Task 7 : Créer le portrait placeholder (AC: #1)
  - [x] 7.1 Créer une image placeholder SVG dans `/public/images/portrait-placeholder.svg` (400x500px, rectangle crème avec texte "Photo à venir")
  - [x] 7.2 Image SVG < 1KB, excellent pour le LCP

- [x] Task 8 : Assembler la homepage `app/page.tsx` (AC: #1-6)
  - [x] 8.1 Remplacer le contenu actuel de `app/page.tsx` par la homepage complète
  - [x] 8.2 Fetch `homePageQuery`, `allServicesQuery`, `allMissionStepsQuery` depuis Sanity au build
  - [x] 8.3 Fetch `siteSettingsQuery` pour le numéro de téléphone
  - [x] 8.4 Import conditionnel de Sanity (même pattern que `layout.tsx` : vérifier `NEXT_PUBLIC_SANITY_PROJECT_ID`)
  - [x] 8.5 Fallback hardcoded complet si Sanity pas alimenté
  - [x] 8.6 Ordre des sections : HeroSection → TrustBar → ServicesGrid → MissionSteps → DiagnosticSection → CtaBanner
  - [x] 8.7 Alternance des fonds : crème → blanc → crème → blanc → crème → rouge (CtaBanner)
  - [x] 8.8 Supprimer le `<main>` wrapper dans `page.tsx` (utilise fragment `<>`)

- [x] Task 9 : Exporter `generateMetadata()` (AC: #5)
  - [x] 9.1 Ajouter `export async function generateMetadata(): Promise<Metadata>` dans `app/page.tsx`
  - [x] 9.2 Fetch `homePageQuery` pour le titre dynamique si Sanity alimenté
  - [x] 9.3 Fallback statique : title et description conformes
  - [x] 9.4 Ajouter `openGraph` avec titre, description et type "website"

- [x] Task 10 : Créer le helper d'icônes Lucide dynamiques
  - [x] 10.1 Créer `lib/icons.tsx` — mapping nom string → composant Lucide
  - [x] 10.2 Mapper : `Landmark`, `Mountain`, `Building2`, `PenTool`, `Scan`, `Ruler` (+ fallback `HelpCircle`)
  - [x] 10.3 Export une fonction `getIcon(name: string): LucideIcon` pour utilisation dans ServicesGrid

- [x] Task 11 : Validation
  - [x] 11.1 `npm run build` réussit sans erreur
  - [x] 11.2 `npm run lint` passe
  - [x] 11.3 Homepage affiche toutes les sections avec les fallback hardcoded (Sanity pas alimenté)
  - [x] 11.4 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 11.5 Les 6 cards de services sont cliquables et pointent vers `/nos-prestations`
  - [x] 11.6 Les CTAs pointent vers les bonnes routes (`/rendez-vous`, `/diagnostic`)
  - [x] 11.7 Le numéro de téléphone est click-to-call
  - [x] 11.8 Le h1 est unique sur la page
  - [x] 11.9 Les images utilisent `next/image` (pas de `<img>` brut)
  - [x] 11.10 `generateMetadata()` est exporté et retourne les meta tags

## Dev Notes

### Architecture & Patterns obligatoires

- **Server Components par défaut** — Tous les composants de sections sont des Server Components. Aucun état React, aucune interactivité nécessaire pour cette story.
- **PAS de `'use client'`** — Aucun composant de cette story ne nécessite `'use client'`. Les embeds (Tally/Zcal) sont dans l'Epic 3.
- **`next/image` obligatoire** — Pour le portrait et toute image. Jamais de `<img>` brut.
- **Tailwind classes utilitaires** — Pas de `@apply`, pas de CSS modules. Tailwind directement dans les JSX.
- **Icônes Lucide** — Toutes les icônes viennent de `lucide-react` (inclus avec shadcn/ui). Pas d'emoji en production.
- **Données en props** — Les composants de sections reçoivent leurs données en props depuis `page.tsx`. Aucun fetch dans les composants.
- **Queries GROQ centralisées** — Toutes les queries sont DÉJÀ dans `sanity/lib/queries.ts` : `homePageQuery`, `allServicesQuery`, `allMissionStepsQuery`. NE PAS créer de nouvelles queries inline.
- **Import conditionnel Sanity** — Même pattern que `layout.tsx` : vérifier `NEXT_PUBLIC_SANITY_PROJECT_ID` avant d'importer le client Sanity. Cela permet le build même sans Sanity configuré.

### Composants shadcn/ui à utiliser

Les composants nécessaires sont **déjà installés** dans `components/ui/` :
- `button.tsx` — pour les CTAs (variantes `default` et `outline`)
- `card.tsx` — **À INSTALLER** avec `npx shadcn@latest add card` — pour les cards de services
- `separator.tsx` — pour les séparateurs rouges sous les titres de section
- `skeleton.tsx` — déjà installé mais pas nécessaire pour cette story (pas d'embeds)

### Pattern d'import conditionnel Sanity (existant dans layout.tsx)

```typescript
// Pattern EXISTANT dans layout.tsx — réutiliser le même pattern dans page.tsx
let homeData = null;
let services = [];
let missionSteps = [];
try {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (projectId) {
    const { client } = await import("@/sanity/lib/client");
    const { homePageQuery, allServicesQuery, allMissionStepsQuery } = await import("@/sanity/lib/queries");
    homeData = await client.fetch(homePageQuery);
    services = await client.fetch(allServicesQuery) ?? [];
    missionSteps = await client.fetch(allMissionStepsQuery) ?? [];
  }
} catch {
  // Sanity pas encore alimenté — fallback hardcoded
}
```

### Fallback hardcoded — Données par défaut

Puisque Sanity n'est probablement pas encore alimenté, fournir des données par défaut complètes :

```typescript
const defaultHero = {
  heroTitle: "Laurent BAZILE, votre Géomètre-Expert en Guadeloupe",
  heroSubtitle: "Cabinet de géomètre-expert intervenant sur l'ensemble de l'archipel guadeloupéen. Bornage, topographie, copropriété, plans d'architecture et relevés 3D.",
  heroCtaPrimary: "Prendre rendez-vous",
  heroCtaSecondary: "Diagnostic gratuit",
  trustBarItems: [
    { text: "Inscrit à l'Ordre des Géomètres-Experts" },
    { text: "Intervention sur tout l'archipel" },
    { text: "RDV et paiement en ligne" },
    { text: "Technologies de pointe" },
  ],
  diagnosticTitle: "Vous ne savez pas exactement ce dont vous avez besoin ?",
  diagnosticDescription: "Répondez à 4 questions simples pour identifier la prestation adaptée à votre situation. Sans jargon, on vous guide.",
  ctaBannerTitle: "Besoin d'un géomètre-expert ?",
  ctaBannerSubtitle: "Consultation avec paiement sécurisé. Réponse sous 24h.",
  ctaBannerButton: "Prendre rendez-vous",
};

const defaultServices = [
  { _id: "1", title: "Foncier", icon: "Landmark", shortDescription: "Bornage, reconnaissance de limites, divisions parcellaires, servitudes", order: 1 },
  { _id: "2", title: "Topographie", icon: "Mountain", shortDescription: "Relevés topographiques, plans de terrain, modélisation", order: 2 },
  { _id: "3", title: "Copropriété", icon: "Building2", shortDescription: "Mise en copropriété, état descriptif de division, règlement", order: 3 },
  { _id: "4", title: "Plans d'architecture", icon: "PenTool", shortDescription: "Plans, relevés et modélisation de bâtiments existants", order: 4 },
  { _id: "5", title: "Relevés et acquisitions 3D", icon: "Scan", shortDescription: "Scan 3D, nuages de points, modélisation numérique", order: 5 },
  { _id: "6", title: "Surfaces réglementaires", icon: "Ruler", shortDescription: "Loi Carrez, surfaces habitables, surfaces de plancher", order: 6 },
];

const defaultMissionSteps = [
  { _id: "1", title: "Prise de contact", description: "Échange téléphonique ou en ligne pour comprendre votre besoin", stepNumber: 1 },
  { _id: "2", title: "Consultation", description: "Analyse de votre dossier et proposition d'intervention adaptée", stepNumber: 2 },
  { _id: "3", title: "Terrain", description: "Intervention sur site avec nos équipements de pointe", stepNumber: 3 },
  { _id: "4", title: "Traitement", description: "Traitement des données et élaboration des documents techniques", stepNumber: 4 },
  { _id: "5", title: "Restitution", description: "Remise des documents finaux et explications claires", stepNumber: 5 },
];
```

### Icônes Lucide dynamiques — Pattern

Le champ `icon` dans Sanity est un string (ex: `"Landmark"`). Il faut le mapper vers le composant React Lucide :

```typescript
// lib/icons.tsx
import { Landmark, Mountain, Building2, PenTool, Scan, Ruler, HelpCircle, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Landmark, Mountain, Building2, PenTool, Scan, Ruler,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? HelpCircle;
}
```

### Portrait Laurent — Image

- Image placeholder à créer : `/public/images/portrait-placeholder.jpg`
- Le vrai portrait sera fourni par Laurent ultérieurement
- Utiliser `priority={true}` sur le hero portrait car c'est le LCP (Largest Contentful Paint)
- `sizes="(max-width: 768px) 100vw, 40vw"` pour optimiser le srcset

### Layout des sections — Alternance crème/blanc

```
HeroSection      → bg-background (crème #F5F0EB)
TrustBar         → bg-card (blanc #FFFFFF)
ServicesGrid     → bg-background (crème)
MissionSteps     → bg-card (blanc)
DiagnosticSection → bg-background (crème)
CtaBanner        → bg-primary (rouge #B5342B)
```

### Espacements entre sections

- Padding vertical des sections : `py-12 md:py-20` (48px mobile / 80px desktop)
- Padding horizontal : `px-4 md:px-8 lg:px-16` avec `max-w-7xl mx-auto` (max 1200px centré)
- Le `max-w-7xl` correspond à `--container-max-width-7xl: 1200px` défini dans `globals.css`

### Titre de section — Pattern D1

```tsx
<div className="text-center mb-12">
  <h2 className="mb-4">Nos prestations</h2>
  <div className="w-12 h-0.5 bg-primary mx-auto" />
</div>
```

### Button shadcn/ui — Variantes à utiliser

```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

// CTA Primary (fond rouge)
<Button asChild>
  <Link href="/rendez-vous">Prendre rendez-vous</Link>
</Button>

// CTA Secondary (outline)
<Button variant="outline" asChild>
  <Link href="/diagnostic">Diagnostic gratuit</Link>
</Button>

// CTA inversé sur bandeau rouge (fond blanc, texte rouge)
<Button variant="outline" className="bg-white text-primary border-white hover:bg-white/90" asChild>
  <Link href="/rendez-vous">Prendre rendez-vous</Link>
</Button>
```

### generateMetadata() — Pattern Next.js 16

```typescript
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  // Optionnel : fetch Sanity pour titre dynamique
  return {
    title: "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe",
    description: "Cabinet de géomètre-expert en Guadeloupe. Bornage, topographie, copropriété, plans d'architecture, relevés 3D. Intervention sur tout l'archipel guadeloupéen.",
    openGraph: {
      title: "CLBGE — Laurent Bazile, Géomètre-Expert en Guadeloupe",
      description: "Cabinet de géomètre-expert en Guadeloupe.",
      type: "website",
    },
  }
}
```

**Note :** Si `generateMetadata()` est exporté dans `page.tsx`, le `metadata` statique dans `layout.tsx` servira de fallback parent. Pas besoin de le modifier.

### Supprimer le `<main>` wrapper dans page.tsx

Le `page.tsx` actuel a un `<main>` wrapper. Le `layout.tsx` a déjà `<main id="main-content">`. Supprimer le `<main>` dans `page.tsx` pour éviter les `<main>` imbriqués (mauvaise sémantique HTML).

Remplacer par un simple fragment `<>` ou un `<div>`.

### Composant `card` shadcn/ui — À installer

Le composant Card n'est pas encore installé. L'ajouter AVANT de coder :
```bash
npx shadcn@latest add card
```

Cela créera `components/ui/card.tsx` avec `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### Project Structure Notes

- Tous les nouveaux composants dans `components/sections/` conformément à l'architecture
- Le helper d'icônes dans `lib/icons.tsx` suit le pattern `camelCase.ts` pour les utilitaires
- Les routes `/nos-prestations`, `/diagnostic`, `/rendez-vous` n'existent pas encore — les liens pointeront vers des 404 (attendu, sera créé dans les stories suivantes)
- La homepage `app/page.tsx` est le fichier principal à modifier

### Intelligence Story 1.3 (story précédente)

- NavBar, MobileMenu, Footer déjà implémentés et fonctionnels
- Layout.tsx : async, fetch Sanity défensif avec fallback hardcoded
- Pattern `render` prop pour NavigationMenu (pas `asChild` — @base-ui/react n'a pas cette prop)
- Import dynamique conditionnel de Sanity client
- Tailwind v4 avec `@theme` dans globals.css (pas de tailwind.config.ts)
- shadcn/ui v4.0.8 — utilise les variantes CSS par défaut
- Palette CLBGE en hex dans `:root` (pas d'oklch)
- Max-width 7xl = 1200px (custom dans globals.css)
- NavLinks extrait en client component pour `usePathname()`
- Liens de navigation centralisés dans `lib/navigation.ts`

### Anti-patterns à éviter

- **NE PAS** utiliser `'use client'` sur les composants de sections — tout est SSG, pas d'interactivité
- **NE PAS** utiliser `useEffect` + `fetch` côté client — le contenu est fetché au build dans `page.tsx`
- **NE PAS** écrire de queries GROQ inline — utiliser celles de `sanity/lib/queries.ts`
- **NE PAS** utiliser `<img>` au lieu de `next/image`
- **NE PAS** oublier `priority={true}` sur le portrait hero (c'est le LCP)
- **NE PAS** oublier les `alt` text sur toutes les images
- **NE PAS** créer un nouveau `<main>` dans `page.tsx` (déjà dans layout)
- **NE PAS** oublier `asChild` sur les Button qui wrappent un `<Link>` — sinon double `<a>` imbriqué
- **NE PAS** utiliser `@apply` dans Tailwind — classes utilitaires directement
- **NE PAS** hardcoder le numéro de téléphone — le recevoir en props depuis les siteSettings Sanity
- **NE PAS** créer de fichier `tailwind.config.ts` — Tailwind v4 utilise `@theme` dans `globals.css`

### Pièges techniques critiques

1. **Card shadcn/ui pas encore installé** — Installer avec `npx shadcn@latest add card` avant de coder
2. **`max-w-7xl` custom** — Défini dans globals.css à 1200px (pas la valeur Tailwind par défaut). Utiliser `max-w-7xl` directement.
3. **Import Sanity conditionnel** — Le build DOIT réussir même sans `NEXT_PUBLIC_SANITY_PROJECT_ID`. Toujours wrapper les imports Sanity dans try/catch avec vérification de l'env var.
4. **Un seul h1 par page** — Le hero contient le h1. Les sections utilisent h2. Jamais de h1 dans les composants de section.
5. **`asChild` sur Button** — shadcn/ui Button avec un `<Link>` enfant nécessite `asChild` pour éviter `<button><a>` imbriqué. Syntaxe : `<Button asChild><Link href="...">...</Link></Button>`.
6. **Portrait LCP** — Le portrait dans le hero est le Largest Contentful Paint. `priority={true}` et `sizes` sont essentiels pour le score Lighthouse Performance.
7. **Alternance des fonds** — L'alternance crème/blanc crée le rythme visuel. NE PAS mettre toutes les sections sur le même fond.

### References

- [Source: planning-artifacts/epics.md#Story 2.1] — Acceptance criteria
- [Source: planning-artifacts/architecture.md#Frontend Architecture] — Server Components par défaut
- [Source: planning-artifacts/architecture.md#Structure Patterns] — Organisation `/components/sections/`
- [Source: planning-artifacts/architecture.md#Naming Patterns] — PascalCase composants, camelCase helpers
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — next/image, Tailwind, generateMetadata()
- [Source: planning-artifacts/ux-design-specification.md#Custom Components] — HeroSection, TrustBar, ServicesGrid, MissionSteps, DiagnosticSection, CtaBanner specs
- [Source: planning-artifacts/ux-design-specification.md#Color System] — Palette couleurs et alternance crème/blanc
- [Source: planning-artifacts/ux-design-specification.md#Typography System] — Échelle typo Inter
- [Source: planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation] — Espacement 4px base, padding sections
- [Source: planning-artifacts/ux-design-specification.md#Button Hierarchy] — 3 variantes (primary, outline, ghost)
- [Source: planning-artifacts/ux-design-specification.md#Responsive Strategy] — Mobile-first, breakpoints md/lg
- [Source: planning-artifacts/ux-design-specification.md#Design Direction Decision] — Direction "Hybride élégant" choisie
- [Source: implementation-artifacts/1-3-layout-global-navigation-coordonnees.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build error: shadcn/ui v4 Button n'a pas `asChild` → corrigé avec `render` prop (pattern @base-ui/react existant dans NavBar)
- Lint error: `let description` → `const description` dans generateMetadata()
- Portrait placeholder en SVG au lieu de JPG (< 1KB vs image bitmap)

### Completion Notes List

- Tous les 6 composants de section créés en Server Components (pas de `'use client'`)
- Helper d'icônes Lucide dynamiques dans `lib/icons.tsx`
- Homepage assemblée avec fetch Sanity conditionnel et fallback hardcoded complet
- `generateMetadata()` exporté avec openGraph
- Build et lint passent sans erreur
- Adaptation au pattern `render` prop de @base-ui/react (pas `asChild`) conformément aux conventions du projet

### Change Log

- 2026-03-19 : Implémentation complète de la story 2.1 — Homepage hero, trust bar, services grid, mission steps, diagnostic section, CTA banner
- 2026-03-19 : Code review — Fix MissionSteps connecteurs (ajout `relative` sur `<li>`, repositionnement correct des connecteurs mobile/desktop)

### File List

- `app/page.tsx` (modifié) — Homepage complète avec sections et generateMetadata
- `components/sections/HeroSection.tsx` (nouveau) — Section hero avec portrait, titre, CTAs, téléphone
- `components/sections/TrustBar.tsx` (nouveau) — Barre de confiance 4 items
- `components/sections/ServicesGrid.tsx` (nouveau) — Grille 6 cards de services
- `components/sections/MissionSteps.tsx` (nouveau) — 5 étapes de mission numérotées
- `components/sections/DiagnosticSection.tsx` (nouveau) — Section diagnostic avec CTA
- `components/sections/CtaBanner.tsx` (nouveau) — Bandeau CTA rouge
- `lib/icons.tsx` (nouveau) — Helper mapping string → composant Lucide
- `public/images/portrait-placeholder.svg` (nouveau) — Placeholder portrait 400x500
- `components/ui/card.tsx` (nouveau) — Composant Card shadcn/ui installé
