# Story 3.1 : Formulaire diagnostic interactif (Tally)

Status: done

## Story

En tant que visiteur indécis,
Je veux remplir un formulaire diagnostic pour identifier mon besoin,
Afin d'être guidé vers la bonne prestation sans avoir besoin de jargon technique.

## Acceptance Criteria

1. **Given** je navigue vers `/diagnostic` **When** la page se charge **Then** un texte d'introduction explique l'objectif du diagnostic ("Pas de jargon, on vous guide. Répondez à 4 questions simples...") **And** le composant TallyEmbed (`'use client'`) affiche le formulaire Tally en iframe **And** un Skeleton shadcn/ui est affiché pendant le chargement de l'iframe **And** l'iframe a un attribut `title="Formulaire de diagnostic"`

2. **Given** le formulaire Tally est soumis **When** je termine les questions **Then** Tally redirige automatiquement vers `/rendez-vous` (redirection configurée dans Tally) **And** Laurent reçoit une notification email avec les réponses (natif Tally)

3. **Given** l'iframe Tally est bloquée (navigateur, extension) **When** la page se charge **Then** un message fallback est affiché : "Le formulaire ne s'affiche pas ?" avec un lien externe vers le formulaire Tally

4. **Given** je consulte la page sur mobile **Then** l'embed Tally est responsive et utilisable sans dégradation

5. **And** la page exporte `generateMetadata()` avec meta tags optimisées

## Tasks / Subtasks

- [x] Task 1 : Créer le composant `TallyEmbed` (AC: #1, #3, #4)
  - [x] 1.1 Créer `components/embeds/TallyEmbed.tsx` — Client Component (`'use client'`)
  - [x] 1.2 Props : `formId: string`, `redirectUrl?: string`, `title: string`
  - [x] 1.3 État loading : afficher `Skeleton` de `@/components/ui/skeleton` pendant le chargement
  - [x] 1.4 Iframe Tally : `src="https://tally.so/embed/{formId}?alignLeft=1&hideTitle=1&transparentBackground=1"` avec les paramètres embed Tally standards
  - [x] 1.5 Si `redirectUrl` fourni, ajouter `&redirectUrl={encodeURIComponent(redirectUrl)}` aux paramètres de l'iframe (**Note:** la redirection est configurée dans Tally, ce paramètre est un complément optionnel)
  - [x] 1.6 Attribut `title` sur l'iframe pour accessibilité
  - [x] 1.7 Fallback : détecter le chargement via `onLoad` de l'iframe, afficher un lien externe si l'iframe ne charge pas après un délai (5s timeout)
  - [x] 1.8 Message fallback : "Le formulaire ne s'affiche pas ? [Accéder au formulaire →](https://tally.so/r/{formId})" avec icône lien externe (`ExternalLink` de lucide-react)
  - [x] 1.9 Responsive : iframe `width="100%"` et hauteur adaptée (min 500px mobile, 600px desktop)
  - [x] 1.10 Utiliser `useState` pour gérer les états loading/loaded/error

- [x] Task 2 : Créer la page `/diagnostic` (AC: #1, #4, #5)
  - [x] 2.1 Créer `app/diagnostic/page.tsx` — Server Component
  - [x] 2.2 Texte d'introduction : titre h1 centré "Diagnostic gratuit" + séparateur rouge (pattern D1) + paragraphe d'accroche
  - [x] 2.3 Paragraphe d'accroche : "Pas de jargon, on vous guide. Répondez à 4 questions simples pour identifier la prestation adaptée à votre situation."
  - [x] 2.4 Intégrer le composant `TallyEmbed` avec `formId` depuis variable d'environnement `NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID` ou fallback hardcoded
  - [x] 2.5 Passer `redirectUrl="/rendez-vous"` et `title="Formulaire de diagnostic"` au TallyEmbed
  - [x] 2.6 Layout : section fond crème `bg-background`, container `max-w-3xl mx-auto px-4 md:px-8 lg:px-16`, centré (formulaire ne doit pas être trop large)
  - [x] 2.7 Padding section : `py-12 md:py-20`
  - [x] 2.8 Ajouter un CtaBanner en bas de page comme alternative : "Vous savez déjà ce dont vous avez besoin ?" → "Prendre rendez-vous"
  - [x] 2.9 Exporter `generateMetadata()` avec title, description, openGraph

- [x] Task 3 : Ajouter la variable d'environnement (AC: #1)
  - [x] 3.1 Ajouter `NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID` dans `.env.example` avec un commentaire
  - [x] 3.2 Ajouter dans `.env.local` avec un placeholder (le vrai ID sera fourni par Laurent quand le formulaire Tally sera créé)

- [x] Task 4 : Validation (AC: #1, #2, #3, #4, #5)
  - [x] 4.1 `npm run build` réussit sans erreur
  - [x] 4.2 `npm run lint` passe
  - [x] 4.3 La page `/diagnostic` s'affiche avec le texte d'introduction
  - [x] 4.4 Le TallyEmbed affiche le Skeleton en loading puis le fallback lien (car pas de formId réel)
  - [x] 4.5 Le lien fallback pointe vers `https://tally.so/r/{formId}`
  - [x] 4.6 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 4.7 Le h1 "Diagnostic gratuit" est unique sur la page
  - [x] 4.8 `generateMetadata()` est exporté
  - [x] 4.9 L'iframe a un attribut `title`
  - [x] 4.10 Le CtaBanner s'affiche en bas de page
  - [x] 4.11 Le lien menu vers `/diagnostic` fonctionne (DiagnosticSection CTA pointe déjà vers `/diagnostic`)

## Dev Notes

### Architecture & Patterns obligatoires

- **TallyEmbed est un Client Component (`'use client'`)** — L'iframe nécessite du state management (loading/loaded/error) et des event handlers (`onLoad`). C'est un des rares composants client du projet.
- **La page `diagnostic/page.tsx` reste un Server Component** — Seul le TallyEmbed est client. La page passe le `formId` en prop.
- **Skeleton shadcn/ui** — Le composant existe déjà dans `components/ui/skeleton.tsx`. L'importer directement.
- **Tailwind v4** — Pas de `tailwind.config.ts`. Les couleurs sont en CSS variables dans `globals.css` via `@theme`.
- **Button `render` prop** — shadcn/ui v4.0.8 avec @base-ui/react. Utiliser `render={<Link href="..." />}`, PAS `asChild`.
- **Pattern D1** — Titre h1 centré + séparateur rouge : `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- **Container** — `max-w-7xl mx-auto px-4 md:px-8 lg:px-16` pour les pages standards. Pour la page diagnostic, utiliser `max-w-3xl` pour centrer le formulaire dans une colonne plus étroite.
- **CtaBanner** — Composant existant dans `components/sections/CtaBanner.tsx`. Props : `title`, `subtitle`, `buttonText`. Le lien pointe vers `/rendez-vous`.

### Composant TallyEmbed — Spécifications détaillées

**Méthode d'intégration Tally :** Utiliser l'embed iframe de Tally. L'URL d'embed suit le format :
```
https://tally.so/embed/{formId}?alignLeft=1&hideTitle=1&transparentBackground=1
```

**Paramètres Tally embed importants :**
- `alignLeft=1` — Aligne le formulaire à gauche
- `hideTitle=1` — Cache le titre Tally (on met notre propre titre)
- `transparentBackground=1` — Fond transparent pour s'intégrer visuellement

**Script Tally pour auto-resize :** Tally fournit un script qui ajuste automatiquement la hauteur de l'iframe au contenu. Charger le script Tally embed widget :
```html
<script src="https://tally.so/widgets/embed.js"></script>
```
Utiliser `data-tally-src` au lieu de `src` pour le lazy loading natif Tally, OU charger le script dynamiquement dans un `useEffect`.

**Alternative simplifiée :** Si le script embed Tally est complexe à intégrer, utiliser une iframe classique avec une hauteur fixe (600px) et `overflow-y: auto`. Le formulaire Tally est déjà responsive.

**Détection de blocage :** L'iframe peut être bloquée par des extensions (uBlock, etc.). Utiliser un `onLoad` handler avec un timeout. Si l'iframe n'a pas déclenché `onLoad` après 5 secondes, afficher le fallback.

### Composants existants à RÉUTILISER

- `components/ui/skeleton.tsx` — Skeleton shadcn/ui pour le loading state
- `components/sections/CtaBanner.tsx` — Bandeau CTA en bas de page (props: title, subtitle, buttonText)
- `components/ui/button.tsx` — Boutons shadcn/ui

### Pages existantes comme référence

- `app/nos-technologies/page.tsx` — Pattern Server Component avec `generateMetadata()`, container, pattern D1
- `components/sections/DiagnosticSection.tsx` — Section teaser sur la homepage qui pointe déjà vers `/diagnostic` (ne pas modifier)

### Redirection après soumission Tally

La redirection vers `/rendez-vous` après soumission du formulaire diagnostic est **configurée dans le dashboard Tally**, pas dans le code Next.js. Le paramètre `redirectUrl` dans l'URL embed est un complément. Laurent devra configurer la redirection dans Tally quand il créera le formulaire.

### Notifications email

Les notifications email à Laurent après soumission du diagnostic sont **natives à Tally** — configurées dans le dashboard Tally. Pas de code à écrire côté Next.js.

### Variable d'environnement

Le `formId` Tally sera fourni par Laurent quand il créera le formulaire sur tally.so. En attendant, utiliser un placeholder. Le composant doit fonctionner gracieusement sans formId valide (afficher le fallback).

### generateMetadata() — Pattern

```typescript
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Diagnostic gratuit — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Répondez à 4 questions simples pour identifier la prestation de géomètre-expert adaptée à votre situation. Sans jargon, sans engagement.",
    openGraph: {
      title: "Diagnostic gratuit — CLBGE",
      description: "Identifiez votre besoin en géomètre-expert en 4 questions simples.",
      type: "website",
    },
  };
}
```

### Supprimer le `<main>` wrapper

NE PAS ajouter de `<main>` dans `page.tsx` — le layout global a déjà `<main id="main-content">`. Utiliser un fragment `<>` ou un `<div>`.

### Intelligence Story 2.3 (story précédente)

- shadcn/ui v4.0.8 — @base-ui/react (pas Radix UI)
- Button `render` prop confirmé (pas `asChild`)
- Import Sanity conditionnel avec try/catch + env var check
- Tailwind v4 avec `@theme` dans globals.css, pas de tailwind.config.ts
- Palette CLBGE en hex dans `:root`
- `max-w-7xl` = 1200px custom
- Alternance fonds crème/blanc entre sections
- Pattern D1 : titre h1 centré + séparateur rouge `div` 48px
- Skeleton shadcn/ui installé
- Build OK : 8 pages statiques
- CtaBanner prend ses props — ne pas hardcoder les textes

### Anti-patterns à éviter

- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** ajouter un `<main>` dans page.tsx — déjà dans layout
- **NE PAS** créer de query GROQ pour la page diagnostic — pas de contenu Sanity sur cette page
- **NE PAS** créer de fichier `tailwind.config.ts`
- **NE PAS** utiliser `@apply` dans Tailwind
- **NE PAS** oublier le `title` sur l'iframe (accessibilité)
- **NE PAS** utiliser de librairie tierce pour l'intégration Tally — une simple iframe suffit
- **NE PAS** gérer les notifications email côté code — c'est natif Tally
- **NE PAS** fetch côté client avec `useEffect` pour du contenu — seul le TallyEmbed utilise des hooks pour le state de l'iframe

### Pièges techniques critiques

1. **formId vide/placeholder** — Le composant DOIT fonctionner sans formId valide. Afficher le lien fallback si pas de formId.
2. **Iframe bloquée** — Les ad-blockers et extensions de sécurité peuvent bloquer les iframes Tally. Le fallback est obligatoire.
3. **Hauteur iframe** — L'iframe Tally peut varier en hauteur selon le contenu. Soit utiliser le script embed Tally pour auto-resize, soit une hauteur fixe généreuse (600px+).
4. **CSP headers** — `next.config.ts` a des headers Content-Security-Policy. Vérifier que `tally.so` est autorisé dans `frame-src`. Si non, ajouter `tally.so` dans la directive CSP.
5. **`'use client'` uniquement sur TallyEmbed** — La page reste Server Component. Ne pas mettre `'use client'` sur la page.
6. **Le composant TallyEmbed sera réutilisé** dans la Story 3.3 (formulaire de contact) avec un formId différent. Le rendre générique avec props.

### Project Structure Notes

- `components/embeds/TallyEmbed.tsx` → nouveau composant client (réutilisable pour Story 3.3)
- `app/diagnostic/page.tsx` → nouvelle page route `/diagnostic` (FR6, FR7)
- `.env.example` → modifié (ajout NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID)
- Supprimer le `.gitkeep` dans `components/embeds/` après création du composant

### References

- [Source: planning-artifacts/epics.md#Story 3.1] — Acceptance criteria, FR6, FR7, FR10
- [Source: planning-artifacts/architecture.md#Requirements → Structure Mapping] — FR6-7 → app/diagnostic/page.tsx + components/embeds/TallyEmbed.tsx
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — Server Components par défaut, 'use client' pour embeds
- [Source: planning-artifacts/architecture.md#API & Communication Patterns] — Embed Tally, pas d'API route
- [Source: planning-artifacts/ux-design-specification.md#Custom Components > TallyEmbed] — Props, states, accessibilité
- [Source: planning-artifacts/ux-design-specification.md#Feedback Patterns] — Skeleton loading, fallback lien externe
- [Source: planning-artifacts/ux-design-specification.md#UX-DR9] — TallyEmbed specs
- [Source: planning-artifacts/ux-design-specification.md#UX-DR11] — Redirection auto vers /rendez-vous
- [Source: implementation-artifacts/2-3-page-technologies-zone-intervention.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Lint error initial : `react-hooks/set-state-in-effect` sur `setStatus("error")` dans useEffect. Corrigé en initialisant le state avec une valeur conditionnelle (`tallyUrl ? "loading" : "error"`).

### Completion Notes List

- Composant `TallyEmbed` créé comme Client Component réutilisable (sera aussi utilisé par Story 3.3 pour le formulaire de contact)
- 3 états gérés : loading (Skeleton), loaded (iframe visible), error (lien fallback externe)
- Timeout 5s pour détecter les iframes bloquées par ad-blockers
- Page `/diagnostic` avec pattern D1 (titre centré + séparateur rouge), container étroit `max-w-3xl`
- CtaBanner en bas de page pour les visiteurs qui savent déjà ce dont ils ont besoin
- `generateMetadata()` exporté avec title, description, openGraph
- Variables d'environnement `NEXT_PUBLIC_TALLY_DIAGNOSTIC_FORM_ID` et `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` ajoutées dans `.env.example` et `.env.local`
- CSP déjà configurée pour `tally.so` dans `next.config.ts` — pas de modification nécessaire
- `.gitkeep` supprimé de `components/embeds/`
- Build OK : 9 pages statiques, lint OK

### File List

- `components/embeds/TallyEmbed.tsx` (nouveau)
- `app/diagnostic/page.tsx` (nouveau)
- `.env.example` (modifié — ajout variables Tally)
- `.env.local` (modifié — ajout variables Tally)
- `components/embeds/.gitkeep` (supprimé)

### Change Log

- 2026-03-19 : Story 3.1 implémentée — composant TallyEmbed et page diagnostic
- 2026-03-19 : Code review — fix iframe visible pendant état error (hidden quand status !== "loaded")
