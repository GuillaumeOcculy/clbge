# Story 2.3 : Page Technologies & Zone d'intervention

Status: done

## Story

En tant que visiteur,
Je veux consulter les technologies utilisées et la zone d'intervention du cabinet,
Afin de vérifier le sérieux des équipements et la couverture géographique.

## Acceptance Criteria

1. **Given** je navigue vers `/nos-technologies` **When** la page se charge **Then** les logiciels et le matériel terrain utilisés par le cabinet sont présentés **And** le contenu est fetché depuis Sanity (schéma `technology`) au build **And** les images d'équipements utilisent `next/image`

2. **Given** je suis sur la homepage ou une page pertinente **When** je consulte la section zone d'intervention **Then** l'archipel guadeloupéen est identifié (Guadeloupe, Marie-Galante, Les Saintes, La Désirade)

3. **Given** je suis sur chacune de ces pages **Then** chaque page exporte `generateMetadata()` avec meta tags optimisées **And** la structure HTML est sémantique et accessible

## Tasks / Subtasks

- [x] Task 1 : Créer la page `/nos-technologies` (AC: #1, #3)
  - [x] 1.1 Créer `app/nos-technologies/page.tsx` — Server Component, async
  - [x] 1.2 Fetch `allTechnologiesQuery` depuis Sanity (import conditionnel, même pattern que les autres pages)
  - [x] 1.3 Fallback hardcoded avec technologies par défaut (logiciels + matériel terrain)
  - [x] 1.4 Afficher les technologies en 2 catégories : "Logiciels" et "Matériel terrain" (champ `category` du schéma Sanity)
  - [x] 1.5 Utiliser des Cards (shadcn/ui) pour chaque technologie : image (si disponible via `next/image` + `urlFor()`), nom, description
  - [x] 1.6 Grille 2 colonnes desktop (`md:grid-cols-2`), 1 colonne mobile
  - [x] 1.7 Titre h1 centré "Nos technologies" + séparateur rouge (pattern D1)
  - [x] 1.8 Sous-titre de catégorie h2 pour "Logiciels" et "Matériel terrain"
  - [x] 1.9 Section fond crème (`bg-background`), padding section `py-12 md:py-20`, container `max-w-7xl mx-auto px-4 md:px-8 lg:px-16`
  - [x] 1.10 Exporter `generateMetadata()` avec title, description et openGraph
  - [x] 1.11 Ajouter un CtaBanner en bas de page (réutiliser `components/sections/CtaBanner.tsx`)

- [x] Task 2 : Créer la section Zone d'intervention (AC: #2)
  - [x] 2.1 Créer `components/sections/ZoneIntervention.tsx` — Server Component
  - [x] 2.2 Afficher les 4 zones : Guadeloupe (continent), Marie-Galante, Les Saintes, La Désirade
  - [x] 2.3 Utiliser des icônes Lucide (MapPin ou Map) + nom de zone + description courte
  - [x] 2.4 Layout : grille 4 colonnes desktop (`lg:grid-cols-4`), 2 colonnes tablette (`md:grid-cols-2`), 1 colonne mobile
  - [x] 2.5 Titre h2 centré "Zone d'intervention" + séparateur rouge (pattern D1)
  - [x] 2.6 Texte d'introduction : "Le cabinet intervient sur l'ensemble de l'archipel guadeloupéen"
  - [x] 2.7 Intégrer la section ZoneIntervention sur la page `/nos-technologies` entre le contenu technologies et le CtaBanner

- [x] Task 3 : Ajouter les icônes technologies dans `lib/icons.tsx` (AC: #1)
  - [x] 3.1 Ajouter les icônes nécessaires dans le `iconMap` : `Monitor` (logiciel), `Cpu` (matériel), `MapPin` (zone)
  - [x] 3.2 Importer les nouvelles icônes depuis `lucide-react`

- [x] Task 4 : Validation (AC: #1, #2, #3)
  - [x] 4.1 `npm run build` réussit sans erreur
  - [x] 4.2 `npm run lint` passe
  - [x] 4.3 La page `/nos-technologies` s'affiche avec les fallback hardcoded
  - [x] 4.4 Les 2 catégories (logiciels et matériel) sont visuellement distinctes
  - [x] 4.5 La zone d'intervention affiche les 4 îles
  - [x] 4.6 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 4.7 Le h1 est unique sur la page
  - [x] 4.8 Les images utilisent `next/image` (ou `urlFor()` pour images Sanity)
  - [x] 4.9 `generateMetadata()` est exporté
  - [x] 4.10 Navigation : le lien menu vers `/nos-technologies` fonctionne (plus de 404)
  - [x] 4.11 Le CtaBanner s'affiche en bas de la page
  - [x] 4.12 La structure HTML est sémantique (h1, h2, landmarks, listes)

## Dev Notes

### Architecture & Patterns obligatoires

- **Server Components par défaut** — La page (`page.tsx`) est un Server Component async. Les données sont fetchées dans la page et passées en props aux composants.
- **`next/image` obligatoire** — Pour les images de technologies. Si image Sanity disponible, utiliser `urlFor()` de `sanity/lib/image.ts`. Sinon, pas de placeholder image (afficher juste le nom et la description).
- **Tailwind classes utilitaires** — Pas de `@apply`, pas de CSS modules.
- **Queries GROQ centralisées** — Utiliser la query DÉJÀ EXISTANTE `allTechnologiesQuery` dans `sanity/lib/queries.ts`. NE PAS créer de nouvelle query.
- **Import conditionnel Sanity** — Même pattern que les autres pages.

### Pattern d'import conditionnel Sanity (copier depuis les pages existantes)

```typescript
let technologies = [];
try {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (projectId) {
    const { client } = await import("@/sanity/lib/client");
    const { allTechnologiesQuery } = await import("@/sanity/lib/queries");
    technologies = await client.fetch(allTechnologiesQuery) ?? [];
  }
} catch {
  // Sanity pas encore alimenté — fallback hardcoded
}
```

### Schéma Sanity `technology` — DÉJÀ EXISTANT

Le schéma est dans `sanity/schemas/technology.ts` avec les champs :
- `name` (string, required) — Nom de la technologie
- `category` (string, required) — "Logiciel" ou "Matériel terrain"
- `description` (text, optional) — Description multi-lignes
- `image` (image, optional) — Avec hotspot et alt text requis
- `order` (number, optional) — Ordre d'affichage

### Query GROQ — DÉJÀ EXISTANTE

`allTechnologiesQuery` dans `sanity/lib/queries.ts` (lignes 77-86) :
```groq
*[_type == "technology"] | order(order asc) {
  _id, name, category, description, image { asset, alt }, order
}
```

### Fallback hardcoded — Données par défaut

```typescript
const defaultTechnologies = [
  // Logiciels
  { _id: "1", name: "AutoCAD", category: "Logiciel", description: "Conception assistée par ordinateur pour les plans topographiques et fonciers", image: null, order: 1 },
  { _id: "2", name: "Covadis", category: "Logiciel", description: "Module topographique et VRD pour AutoCAD, calculs de surfaces et cubatures", image: null, order: 2 },
  { _id: "3", name: "Trimble Business Center", category: "Logiciel", description: "Traitement des données GNSS et stations totales, calculs géodésiques", image: null, order: 3 },
  { _id: "4", name: "Leica Cyclone", category: "Logiciel", description: "Traitement de nuages de points 3D issus du scanner laser", image: null, order: 4 },
  // Matériel terrain
  { _id: "5", name: "Station totale Leica", category: "Matériel terrain", description: "Mesures angulaires et de distances de haute précision pour les levés topographiques", image: null, order: 5 },
  { _id: "6", name: "GPS RTK Trimble", category: "Matériel terrain", description: "Positionnement centimétrique en temps réel pour les relevés de terrain", image: null, order: 6 },
  { _id: "7", name: "Scanner 3D Leica BLK360", category: "Matériel terrain", description: "Acquisition 3D rapide et précise pour la modélisation de bâtiments et de sites", image: null, order: 7 },
  { _id: "8", name: "Drone DJI", category: "Matériel terrain", description: "Photogrammétrie aérienne et relevés de grandes surfaces", image: null, order: 8 },
];
```

### Zone d'intervention — Données statiques

La zone d'intervention est du contenu statique (pas de schéma Sanity dédié). Hardcoder directement dans le composant :

```typescript
const zones = [
  { name: "Guadeloupe", description: "Basse-Terre et Grande-Terre" },
  { name: "Marie-Galante", description: "Interventions régulières" },
  { name: "Les Saintes", description: "Terre-de-Haut et Terre-de-Bas" },
  { name: "La Désirade", description: "Interventions sur demande" },
];
```

### Composants existants à RÉUTILISER

- `components/sections/CtaBanner.tsx` — Réutiliser en bas de la page.
- `components/ui/card.tsx` — Card shadcn/ui pour afficher chaque technologie.
- `lib/icons.tsx` — Helper `getIcon()` pour les icônes dynamiques. Ajouter `Monitor`, `Cpu`, `MapPin` dans le `iconMap`.
- `sanity/lib/image.ts` — `urlFor()` pour construire les URLs d'images Sanity avec width/height.

### Card composant — API disponible

Les Cards shadcn/ui exportent : `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Utiliser `CardHeader` + `CardTitle` + `CardDescription` pour chaque technologie.

### Images Sanity — Pattern avec urlFor()

```typescript
import { urlFor } from "@/sanity/lib/image";

// Dans le composant, si image Sanity disponible :
<Image
  src={urlFor(tech.image).width(400).height(300).url()}
  alt={tech.image.alt || tech.name}
  width={400}
  height={300}
  className="rounded-lg object-cover"
/>
```

**Si `image` est null** (Sanity pas alimenté), ne pas afficher de placeholder image. Afficher uniquement le nom et la description dans la Card.

### Layout de la page — Structure

```
[Section titre h1 "Nos technologies" + intro]        → bg-background (crème)
[Section h2 "Logiciels" + grille cards]               → bg-background (crème)
[Section h2 "Matériel terrain" + grille cards]         → bg-card (blanc)
[Section h2 "Zone d'intervention" + grille zones]      → bg-background (crème)
[CtaBanner]                                            → bg-primary (rouge)
```

- Padding section : `py-12 md:py-20`
- Container : `max-w-7xl mx-auto px-4 md:px-8 lg:px-16`
- Titre h1 : centré, avec séparateur rouge en dessous (pattern D1 — `div` 48px rouge `h-0.5 w-12 bg-primary mx-auto`)

### generateMetadata() — Pattern

```typescript
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nos technologies — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Découvrez les logiciels et équipements de pointe utilisés par le cabinet : station totale, GPS RTK, scanner 3D, drone, AutoCAD, Covadis.",
    openGraph: {
      title: "Nos technologies — CLBGE",
      description: "Logiciels et matériel de pointe pour des relevés précis en Guadeloupe.",
      type: "website",
    },
  };
}
```

### Navigation — Lien existant

Le lien vers `/nos-technologies` est DÉJÀ dans la navigation (`lib/navigation.ts` ligne 6). Créer cette page supprime la 404 actuelle.

### Supprimer le `<main>` wrapper

NE PAS ajouter de `<main>` dans `page.tsx` — le layout global a déjà `<main id="main-content">`. Utiliser un fragment `<>` ou un `<div>`.

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

### Intelligence Story 2.2 (story précédente)

- Pages `/nos-prestations`, `/qui-suis-je`, `/notre-mission` complètes et fonctionnelles
- `@portabletext/react` installé et `PortableTextRenderer` créé dans `components/sanity/`
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
- Build OK : 7 pages statiques
- `MissionSteps` accepte `hideTitle` prop pour contrôler l'affichage du titre
- Portrait placeholder SVG existant dans `/public/images/portrait-placeholder.svg`
- Le CtaBanner prend ses props — ne pas hardcoder les textes

### Git intelligence — Derniers commits

```
dde483a feat: story 2.2 — pages prestations, profil et mission
8f25533 plan: story 2.2 — pages prestations, profil et mission
307e9dc feat: story 2.1 — homepage hero, trust bar & présentation cabinet
```

Fichiers créés/modifiés dans la story 2.2 :
- `app/nos-prestations/page.tsx`, `app/qui-suis-je/page.tsx`, `app/notre-mission/page.tsx` (nouveaux)
- `components/sections/ServiceAccordion.tsx` (nouveau, client component)
- `components/sanity/PortableTextRenderer.tsx` (nouveau)
- `components/sections/MissionSteps.tsx` (modifié — ajout `hideTitle` prop)

### Anti-patterns à éviter

- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** créer de nouvelles queries GROQ — utiliser `allTechnologiesQuery` existante
- **NE PAS** ajouter un `<main>` dans page.tsx — déjà dans layout
- **NE PAS** utiliser `<img>` au lieu de `next/image`
- **NE PAS** oublier les `alt` text sur toutes les images
- **NE PAS** créer de fichier `tailwind.config.ts`
- **NE PAS** utiliser `@apply` dans Tailwind
- **NE PAS** fetch côté client avec `useEffect` — tout est SSG
- **NE PAS** ajouter de librairie de carte (Google Maps, Leaflet) — la zone d'intervention est un affichage texte simple, pas une carte interactive
- **NE PAS** créer de schéma Sanity pour la zone d'intervention — c'est du contenu statique

### Pièges techniques critiques

1. **Images Sanity null** — Sanity pas encore alimenté, `image` sera null. Vérifier avant d'appeler `urlFor()`. Si null, ne pas rendre d'image du tout.
2. **Catégories technologies** — Filtrer `defaultTechnologies` par `category` pour séparer logiciels et matériel. Utiliser `.filter()` sur le tableau.
3. **Un seul h1 par page** — Le titre "Nos technologies" est le h1. Les catégories "Logiciels", "Matériel terrain" et "Zone d'intervention" sont des h2.
4. **Import conditionnel Sanity** — Le build DOIT réussir sans `NEXT_PUBLIC_SANITY_PROJECT_ID`. Toujours wrapper dans try/catch.
5. **`urlFor()` import** — Importer depuis `@/sanity/lib/image`. Utiliser `.width().height().url()` pour construire l'URL. L'import doit être conditionnel comme le client Sanity.
6. **Réutiliser CtaBanner** — Le composant est déjà créé. L'importer directement. Vérifier les props attendues en lisant `components/sections/CtaBanner.tsx`.

### Project Structure Notes

- `app/nos-technologies/page.tsx` → route `/nos-technologies` (FR5, FR25)
- `components/sections/ZoneIntervention.tsx` → nouveau composant (server)
- `lib/icons.tsx` → modifié (ajout icônes Monitor, Cpu, MapPin)
- Pas de nouveau composant client nécessaire — tout est Server Component

### References

- [Source: planning-artifacts/epics.md#Story 2.3] — Acceptance criteria, FR5, FR25
- [Source: planning-artifacts/architecture.md#Structure Patterns] — Organisation `/components/sections/`, `/app/nos-technologies/`
- [Source: planning-artifacts/architecture.md#Requirements → Structure Mapping] — FR5 → TechnologyShowcase, FR25 → ZoneIntervention
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — next/image, Tailwind, generateMetadata(), queries centralisées
- [Source: planning-artifacts/ux-design-specification.md#Custom Components] — TechnologyShowcase specs
- [Source: planning-artifacts/ux-design-specification.md#Color System] — Palette et alternance crème/blanc
- [Source: planning-artifacts/ux-design-specification.md#Responsive Strategy] — Mobile-first, breakpoints md/lg
- [Source: sanity/schemas/technology.ts] — Schéma technology (name, category, description, image, order)
- [Source: sanity/lib/queries.ts#allTechnologiesQuery] — Query GROQ existante
- [Source: implementation-artifacts/2-2-pages-prestations-accordion-profil-mission.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

Aucun problème rencontré.

### Completion Notes List

- Page `/nos-technologies` créée en Server Component async avec import conditionnel Sanity (try/catch + env var)
- Fallback hardcoded avec 4 logiciels + 4 équipements terrain
- Technologies affichées en Cards shadcn/ui, grille 2 colonnes desktop / 1 mobile
- Séparation visuelle : section Logiciels (bg-background crème) et Matériel terrain (bg-card blanc)
- Composant `ZoneIntervention` créé : 4 zones de l'archipel guadeloupéen avec icône MapPin, grille 4 colonnes desktop
- Icônes Monitor, Cpu, MapPin ajoutées dans `lib/icons.tsx`
- `generateMetadata()` exporté avec title, description, openGraph
- CtaBanner réutilisé en bas de page
- Pattern D1 (titre centré + séparateur rouge) appliqué
- Un seul h1 par page, structure sémantique h1/h2/h3
- Images Sanity via `next/image` + `urlFor()` (conditionnel, null-safe)
- Build OK : 8 pages statiques, lint OK

### File List

- `app/nos-technologies/page.tsx` (nouveau)
- `components/sections/ZoneIntervention.tsx` (nouveau)
- `lib/icons.tsx` (modifié — ajout Monitor, Cpu, MapPin)

### Change Log

- 2026-03-19 : Story 2.3 implémentée — page Technologies et zone d'intervention
- 2026-03-19 : Code review — 2 LOW fixes : ZoneIntervention utilise getIcon() au lieu d'import direct, icônes Monitor/Cpu inutilisées retirées de icons.tsx. Status → done
