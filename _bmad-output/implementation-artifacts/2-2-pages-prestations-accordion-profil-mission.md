# Story 2.2 : Pages Prestations (accordion), Profil et Mission

Status: done

## Story

En tant que visiteur,
Je veux consulter le détail des prestations, le profil de Laurent et le déroulement d'une mission,
Afin d'évaluer la crédibilité et la pertinence du cabinet pour mon besoin.

## Acceptance Criteria

1. **Given** je navigue vers `/nos-prestations` **When** la page se charge **Then** les 6 prestations sont affichées en accordion (shadcn/ui Accordion) **And** chaque item affiche une icône Lucide + titre de la prestation (visible) **And** au clic, la description longue fournie par Laurent s'affiche **And** un seul accordion est ouvert à la fois **And** le contenu est fetché depuis Sanity (schéma `serviceItem`) au build

2. **Given** je navigue vers `/qui-suis-je` **When** la page se charge **Then** le profil, le parcours et les qualifications de Laurent sont présentés **And** le contenu est fetché depuis Sanity (schéma `aboutPage`) au build

3. **Given** je navigue vers `/notre-mission` **When** la page se charge **Then** les 5 étapes du déroulement d'une mission sont affichées de manière claire et pédagogique **And** le contenu est fetché depuis Sanity (schéma `missionStep`) au build

4. **Given** je suis sur chacune de ces pages **Then** chaque page exporte `generateMetadata()` avec meta tags optimisées **And** la structure HTML est sémantique (headings, landmarks) **And** les pages sont pré-rendues en SSG

## Tasks / Subtasks

- [x] Task 1 : Créer la page `/nos-prestations` avec ServiceAccordion (AC: #1, #4)
  - [x] 1.1 Créer `app/nos-prestations/page.tsx` — Server Component, async
  - [x] 1.2 Fetch `allServicesQuery` depuis Sanity (import conditionnel, même pattern que `app/page.tsx`)
  - [x] 1.3 Fallback hardcoded avec les 6 services par défaut (réutiliser les mêmes données que homepage `defaultServices`)
  - [x] 1.4 Créer `components/sections/ServiceAccordion.tsx` — **Client Component** (`'use client'`) car Accordion shadcn/ui est un client component (@base-ui/react)
  - [x] 1.5 ServiceAccordion reçoit `services: Array<{ _id, title, icon, shortDescription, longDescription, order }>` en props
  - [x] 1.6 Utiliser `Accordion` shadcn/ui avec `openMultiple={false}` (un seul ouvert à la fois) — vérifier la prop exacte de @base-ui/react Accordion
  - [x] 1.7 Chaque AccordionItem : icône Lucide dynamique (via `getIcon()` de `lib/icons.tsx`) + titre dans le trigger
  - [x] 1.8 AccordionContent : description longue (Portable Text si Sanity alimenté, fallback texte simple)
  - [x] 1.9 Titre h1 centré "Nos prestations" + séparateur rouge (pattern D1 de story 2.1)
  - [x] 1.10 Section fond crème (`bg-background`), padding section `py-12 md:py-20`, `max-w-7xl mx-auto px-4 md:px-8 lg:px-16`
  - [x] 1.11 Exporter `generateMetadata()` avec title, description et openGraph
  - [x] 1.12 Ajouter un CtaBanner en bas de page (réutiliser le composant existant `components/sections/CtaBanner.tsx`)

- [x] Task 2 : Créer la page `/qui-suis-je` (AC: #2, #4)
  - [x] 2.1 Créer `app/qui-suis-je/page.tsx` — Server Component, async
  - [x] 2.2 Fetch `aboutPageQuery` depuis Sanity (import conditionnel)
  - [x] 2.3 Fallback hardcoded avec données par défaut (titre, bio placeholder, qualifications placeholder)
  - [x] 2.4 Layout : portrait Laurent (`next/image`, réutiliser `portrait-placeholder.svg` existant) + contenu textuel
  - [x] 2.5 Layout 2 colonnes desktop (portrait 40% / texte 60%), stack vertical mobile (portrait au-dessus)
  - [x] 2.6 Section qualifications : liste des qualifications avec titre + description (liste `<ul>` sémantique)
  - [x] 2.7 Bio : rendu Portable Text si Sanity alimenté, fallback paragraphes simples
  - [x] 2.8 Titre h1 "Qui suis-je" ou titre dynamique depuis Sanity
  - [x] 2.9 Section fond crème (`bg-background`) + section qualifications fond blanc (`bg-card`)
  - [x] 2.10 Exporter `generateMetadata()` avec title, description et openGraph
  - [x] 2.11 Ajouter un CtaBanner en bas de page

- [x] Task 3 : Créer la page `/notre-mission` (AC: #3, #4)
  - [x] 3.1 Créer `app/notre-mission/page.tsx` — Server Component, async
  - [x] 3.2 Fetch `allMissionStepsQuery` depuis Sanity (import conditionnel)
  - [x] 3.3 Fallback hardcoded avec les 5 étapes par défaut (réutiliser les mêmes données que homepage `defaultMissionSteps`)
  - [x] 3.4 Réutiliser le composant `MissionSteps` existant (`components/sections/MissionSteps.tsx`) pour l'affichage des étapes
  - [x] 3.5 Titre h1 centré "Comment se déroule une mission" + séparateur rouge
  - [x] 3.6 Texte d'introduction pédagogique au-dessus des étapes (Sanity ou fallback hardcoded)
  - [x] 3.7 Section fond crème (`bg-background`), padding section standard
  - [x] 3.8 Exporter `generateMetadata()` avec title, description et openGraph
  - [x] 3.9 Ajouter un CtaBanner en bas de page

- [x] Task 4 : Portable Text renderer (AC: #1, #2)
  - [x] 4.1 Installer `@portabletext/react` : `npm install @portabletext/react`
  - [x] 4.2 Créer `components/sanity/PortableTextRenderer.tsx` — composant réutilisable pour le rendu rich text Sanity
  - [x] 4.3 Mapper les types de blocs : `normal` → `<p>`, `h2` → `<h2>`, `h3` → `<h3>`
  - [x] 4.4 Mapper les marks : `strong` → `<strong>`, `em` → `<em>`
  - [x] 4.5 Appliquer les classes Tailwind pour la typographie (taille, espacement, couleurs conformes au design system)
  - [x] 4.6 Ce composant sera réutilisé par le blog (Epic 4) — concevoir générique

- [x] Task 5 : Validation
  - [x] 5.1 `npm run build` réussit sans erreur
  - [x] 5.2 `npm run lint` passe
  - [x] 5.3 Les 3 pages s'affichent avec les fallback hardcoded
  - [x] 5.4 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 5.5 L'accordion fonctionne (un seul ouvert à la fois, animation open/close)
  - [x] 5.6 Les icônes Lucide s'affichent sur chaque prestation
  - [x] 5.7 Le h1 est unique sur chaque page
  - [x] 5.8 Les images utilisent `next/image` (portrait sur `/qui-suis-je`)
  - [x] 5.9 `generateMetadata()` est exporté sur chaque page
  - [x] 5.10 Navigation : les liens menu vers ces pages fonctionnent (plus de 404)
  - [x] 5.11 Le CtaBanner s'affiche en bas de chaque page
  - [x] 5.12 La structure HTML est sémantique (h1, landmarks, listes)

## Dev Notes

### Architecture & Patterns obligatoires

- **Server Components par défaut** — Les pages (`page.tsx`) sont des Server Components async. Les données sont fetchées dans la page et passées en props aux composants.
- **EXCEPTION : ServiceAccordion est un Client Component** — Le composant `Accordion` de shadcn/ui utilise `@base-ui/react/accordion` qui est `'use client'`. Le composant `ServiceAccordion` DOIT être un Client Component. Mais la page `/nos-prestations/page.tsx` reste un Server Component qui passe les données en props.
- **`next/image` obligatoire** — Pour le portrait sur `/qui-suis-je`. Réutiliser `portrait-placeholder.svg` existant dans `/public/images/`.
- **Tailwind classes utilitaires** — Pas de `@apply`, pas de CSS modules.
- **Icônes Lucide** — Via `getIcon()` de `lib/icons.tsx` (déjà existant). Pas d'emoji.
- **Queries GROQ centralisées** — Utiliser les queries DÉJÀ EXISTANTES dans `sanity/lib/queries.ts` : `allServicesQuery`, `aboutPageQuery`, `allMissionStepsQuery`. NE PAS créer de nouvelles queries.
- **Import conditionnel Sanity** — Même pattern que `app/page.tsx` : vérifier `NEXT_PUBLIC_SANITY_PROJECT_ID` avant d'importer le client.

### Pattern d'import conditionnel Sanity (copier depuis page.tsx)

```typescript
let services = [];
try {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (projectId) {
    const { client } = await import("@/sanity/lib/client");
    const { allServicesQuery } = await import("@/sanity/lib/queries");
    services = await client.fetch(allServicesQuery) ?? [];
  }
} catch {
  // Sanity pas encore alimenté — fallback hardcoded
}
```

### Composant Accordion shadcn/ui — CRITIQUE

Le composant Accordion est **déjà installé** dans `components/ui/accordion.tsx`. Il utilise `@base-ui/react/accordion` (pas Radix UI). Points critiques :

1. **C'est un `'use client'` component** — Le fichier `components/ui/accordion.tsx` a déjà la directive `'use client'`.
2. **Props @base-ui/react** — L'API n'est PAS identique à Radix. Vérifier les props disponibles :
   - `Accordion` (root) : probablement `openMultiple={false}` ou équivalent pour un seul ouvert
   - `AccordionItem` : probablement `value` prop pour identifier l'item
   - `AccordionTrigger` : le trigger cliquable
   - `AccordionContent` : le panel qui s'expand
3. **Pattern du projet** — Le composant `accordion.tsx` exporte : `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
4. **Le ServiceAccordion wrapper DOIT être `'use client'`** car il importe un composant client

### Composants existants à RÉUTILISER

- `components/sections/MissionSteps.tsx` — DÉJÀ créé dans story 2.1. Réutiliser tel quel sur `/notre-mission`.
- `components/sections/CtaBanner.tsx` — DÉJÀ créé dans story 2.1. Réutiliser en bas de chaque page.
- `lib/icons.tsx` — Helper `getIcon()` pour les icônes dynamiques Lucide.
- `components/ui/accordion.tsx` — Composant Accordion shadcn/ui déjà installé.
- `components/ui/card.tsx` — Card shadcn/ui déjà installé.

### Fallback hardcoded — Données par défaut

**Services (réutiliser les données de la homepage) :**
```typescript
const defaultServices = [
  { _id: "1", title: "Foncier", icon: "Landmark", shortDescription: "Bornage, reconnaissance de limites, divisions parcellaires, servitudes", longDescription: null, order: 1 },
  { _id: "2", title: "Topographie", icon: "Mountain", shortDescription: "Relevés topographiques, plans de terrain, modélisation", longDescription: null, order: 2 },
  { _id: "3", title: "Copropriété", icon: "Building2", shortDescription: "Mise en copropriété, état descriptif de division, règlement", longDescription: null, order: 3 },
  { _id: "4", title: "Plans d'architecture", icon: "PenTool", shortDescription: "Plans, relevés et modélisation de bâtiments existants", longDescription: null, order: 4 },
  { _id: "5", title: "Relevés et acquisitions 3D", icon: "Scan", shortDescription: "Scan 3D, nuages de points, modélisation numérique", longDescription: null, order: 5 },
  { _id: "6", title: "Surfaces réglementaires", icon: "Ruler", shortDescription: "Loi Carrez, surfaces habitables, surfaces de plancher", longDescription: null, order: 6 },
];
```

**About page :**
```typescript
const defaultAbout = {
  title: "Qui suis-je",
  portrait: null,
  bio: null, // Pas de Portable Text — afficher texte placeholder
  qualifications: [
    { title: "Géomètre-Expert Foncier DPLG", description: "Diplômé par le Gouvernement" },
    { title: "Inscrit à l'Ordre des Géomètres-Experts", description: "N° d'inscription : 12345" },
    { title: "Intervention sur tout l'archipel", description: "Guadeloupe, Marie-Galante, Les Saintes, La Désirade" },
  ],
  metaTitle: "Qui suis-je — Laurent Bazile, Géomètre-Expert en Guadeloupe",
  metaDescription: "Découvrez le parcours et les qualifications de Laurent Bazile, géomètre-expert en Guadeloupe.",
};
```

**Mission steps (réutiliser les données de la homepage) :**
```typescript
const defaultMissionSteps = [
  { _id: "1", title: "Prise de contact", description: "Échange téléphonique ou en ligne pour comprendre votre besoin", stepNumber: 1 },
  { _id: "2", title: "Consultation", description: "Analyse de votre dossier et proposition d'intervention adaptée", stepNumber: 2 },
  { _id: "3", title: "Terrain", description: "Intervention sur site avec nos équipements de pointe", stepNumber: 3 },
  { _id: "4", title: "Traitement", description: "Traitement des données et élaboration des documents techniques", stepNumber: 4 },
  { _id: "5", title: "Restitution", description: "Remise des documents finaux et explications claires", stepNumber: 5 },
];
```

### Portable Text — Rendu rich text Sanity

Les champs `longDescription` (serviceItem) et `bio` (aboutPage) sont des arrays Portable Text dans Sanity. Il faut un renderer :

```typescript
// components/sanity/PortableTextRenderer.tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-muted-foreground">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6">{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  return <PortableText value={value} components={components} />;
}
```

**Si `longDescription` est null** (Sanity pas alimenté), afficher la `shortDescription` comme fallback dans l'accordion content.

### Layout des pages — Pattern cohérent

Chaque page suit le même pattern structurel :

```
[Section titre h1 + intro] → bg-background (crème)
[Contenu principal]         → bg-background ou bg-card selon alternance
[CtaBanner]                 → bg-primary (rouge)
```

- Padding section : `py-12 md:py-20`
- Container : `max-w-7xl mx-auto px-4 md:px-8 lg:px-16`
- Titre h1 : centré, avec séparateur rouge en dessous (pattern D1)

### generateMetadata() — Pattern par page

```typescript
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nos prestations — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Découvrez nos 6 prestations : foncier, topographie, copropriété, plans d'architecture, relevés 3D, surfaces réglementaires.",
    openGraph: {
      title: "Nos prestations — CLBGE",
      description: "Découvrez nos 6 prestations de géomètre-expert en Guadeloupe.",
      type: "website",
    },
  };
}
```

### Navigation — Liens existants

Les liens vers `/nos-prestations`, `/qui-suis-je`, `/notre-mission` sont déjà dans la navigation (définis dans `lib/navigation.ts`). Créer ces pages supprime les 404 actuelles.

### Supprimer le `<main>` wrapper

Comme pour la homepage (story 2.1), NE PAS ajouter de `<main>` dans les `page.tsx` — le layout global a déjà `<main id="main-content">`. Utiliser un fragment `<>` ou un `<div>`.

### Tailwind v4 — Rappel

- Pas de fichier `tailwind.config.ts` — la config est dans `globals.css` via `@theme`
- `max-w-7xl` = 1200px (custom dans globals.css)
- Les couleurs sont en CSS variables hex (pas oklch)

### Button `render` prop — Rappel

shadcn/ui v4 avec @base-ui/react n'a PAS `asChild`. Utiliser la prop `render` :
```tsx
<Button render={<Link href="/rendez-vous" />}>
  Prendre rendez-vous
</Button>
```

### Project Structure Notes

- Alignement avec la structure définie dans l'architecture :
  - `app/nos-prestations/page.tsx` → route `/nos-prestations` (FR3)
  - `app/qui-suis-je/page.tsx` → route `/qui-suis-je` (FR2)
  - `app/notre-mission/page.tsx` → route `/notre-mission` (FR4)
  - `components/sections/ServiceAccordion.tsx` → nouveau composant (client)
  - `components/sanity/PortableTextRenderer.tsx` → nouveau composant réutilisable
- Le dossier `components/sanity/` n'existe peut-être pas encore — le créer

### Intelligence Story 2.1 (story précédente)

- Homepage complète et fonctionnelle avec toutes les sections
- Pattern `render` prop confirmé pour Button avec Link (pas `asChild`)
- Import Sanity conditionnel avec try/catch et vérification env var
- Tailwind v4 avec `@theme` dans globals.css
- shadcn/ui v4.0.8 — @base-ui/react (pas Radix UI)
- Palette CLBGE en hex dans `:root`
- `max-w-7xl` = 1200px custom
- Alternance fonds crème/blanc entre sections
- Pattern D1 : titre h2 centré + séparateur rouge `div` 48px
- Card shadcn/ui installé et fonctionnel
- Helper `getIcon()` dans `lib/icons.tsx` pour icônes dynamiques
- Build error story 2.1 : `asChild` n'existe pas → corrigé avec `render` prop
- Portrait placeholder SVG existant dans `/public/images/portrait-placeholder.svg`

### Anti-patterns à éviter

- **NE PAS** oublier `'use client'` sur ServiceAccordion — l'Accordion est un client component
- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** créer de nouvelles queries GROQ — utiliser celles existantes dans `sanity/lib/queries.ts`
- **NE PAS** ajouter un `<main>` dans les page.tsx — déjà dans layout
- **NE PAS** utiliser `<img>` au lieu de `next/image`
- **NE PAS** oublier les `alt` text sur toutes les images
- **NE PAS** hardcoder le numéro de téléphone dans le CtaBanner — il le reçoit via ses props
- **NE PAS** créer de fichier `tailwind.config.ts`
- **NE PAS** utiliser `@apply` dans Tailwind
- **NE PAS** fetch côté client avec `useEffect` — tout est SSG
- **NE PAS** dupliquer les données fallback — extraire dans un fichier partagé si nécessaire, ou copier depuis `app/page.tsx`

### Pièges techniques critiques

1. **Accordion @base-ui/react API** — L'API peut différer de Radix. Vérifier les props de `Accordion` root pour le mode "single" (un seul ouvert). La prop pourrait être `openMultiple={false}` ou similaire. Lire le code source de `components/ui/accordion.tsx` pour comprendre les props wrappées.
2. **Portable Text null** — Si Sanity pas alimenté, `longDescription` sera null. Le PortableTextRenderer ne doit PAS recevoir null — vérifier et afficher le fallback `shortDescription` à la place.
3. **Un seul h1 par page** — Le titre de la page est le h1. Les sections de contenu utilisent h2/h3.
4. **Import conditionnel Sanity** — Le build DOIT réussir sans `NEXT_PUBLIC_SANITY_PROJECT_ID`. Toujours wrapper dans try/catch.
5. **`@portabletext/react` à installer** — Ce package n'est probablement pas encore dans les dépendances. L'installer avant de coder : `npm install @portabletext/react`.
6. **Dossier `components/sanity/` à créer** — Ce dossier n'existe peut-être pas. Le créer pour le PortableTextRenderer.
7. **Réutiliser MissionSteps existant** — Le composant `MissionSteps` est déjà créé et fonctionnel. Ne PAS le recréer — l'importer directement dans `/notre-mission/page.tsx`.

### References

- [Source: planning-artifacts/epics.md#Story 2.2] — Acceptance criteria
- [Source: planning-artifacts/architecture.md#Frontend Architecture] — Server Components par défaut, `'use client'` pour embeds et interactions
- [Source: planning-artifacts/architecture.md#Structure Patterns] — Organisation `/components/sections/`, `/app/nos-services/`
- [Source: planning-artifacts/architecture.md#Naming Patterns] — PascalCase composants, camelCase helpers, kebab-case routes
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — next/image, Tailwind, generateMetadata(), queries centralisées
- [Source: planning-artifacts/ux-design-specification.md#Custom Components] — ServiceAccordion specs (Accordion shadcn/ui, icône + titre visible, un seul ouvert)
- [Source: planning-artifacts/ux-design-specification.md#Color System] — Palette et alternance crème/blanc
- [Source: planning-artifacts/ux-design-specification.md#Typography System] — Échelle typo Inter
- [Source: planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation] — Espacement sections
- [Source: planning-artifacts/ux-design-specification.md#Responsive Strategy] — Mobile-first, breakpoints md/lg
- [Source: planning-artifacts/ux-design-specification.md#Component Strategy] — ServiceAccordion, BlogPostContent (PortableText)
- [Source: implementation-artifacts/2-1-homepage-hero-trust-bar-presentation-cabinet.md] — Intelligence story précédente, patterns confirmés

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build failure: `PortableTextRenderer` type `unknown[]` incompatible with `TypedObject[]` — fixed by using `PortableTextBlock` type from `@portabletext/react`

### Completion Notes List

- Task 1: Page `/nos-prestations` avec `ServiceAccordion` (client component). Accordion @base-ui/react par défaut `multiple={false}` — un seul ouvert. 6 services en fallback hardcoded. Icônes Lucide dynamiques via `getIcon()`. PortableText pour longDescription, fallback shortDescription.
- Task 2: Page `/qui-suis-je` avec layout 2 colonnes (portrait 40% / texte 60%), stack vertical mobile. Section qualifications avec bordure primaire. Portrait via `next/image` + placeholder SVG. Metadata dynamique depuis Sanity avec fallback.
- Task 3: Page `/notre-mission` réutilise `MissionSteps` existant. Texte d'introduction pédagogique. 5 étapes en fallback hardcoded.
- Task 4: `PortableTextRenderer` générique dans `components/sanity/`. Mappe block types (normal, h2, h3) et marks (strong, em) avec classes Tailwind. Prêt pour réutilisation blog (Epic 4).
- Task 5: `npm run build` OK (7 pages statiques), `npm run lint` OK. Les 3 pages SSG avec fallback hardcoded. `generateMetadata()` exporté sur chaque page. CtaBanner en bas de chaque page. HTML sémantique (h1 unique, landmarks, listes).

### Change Log

- 2026-03-19: Story 2.2 implémentée — 3 pages (nos-prestations, qui-suis-je, notre-mission), ServiceAccordion client component, PortableTextRenderer générique. Dépendance `@portabletext/react` ajoutée.
- 2026-03-19: Code review — 3 fixes appliqués : (H1) ajout rendu PortableText pour bio sur /qui-suis-je, (H2) suppression doublon titre h1/h2 sur /notre-mission via prop hideTitle sur MissionSteps, (M1) portrait dynamique Sanity via urlFor quand disponible.

### File List

- app/nos-prestations/page.tsx (nouveau)
- app/qui-suis-je/page.tsx (nouveau)
- app/notre-mission/page.tsx (nouveau)
- components/sections/ServiceAccordion.tsx (nouveau)
- components/sanity/PortableTextRenderer.tsx (nouveau)
- package.json (modifié — ajout @portabletext/react)
- package-lock.json (modifié)
