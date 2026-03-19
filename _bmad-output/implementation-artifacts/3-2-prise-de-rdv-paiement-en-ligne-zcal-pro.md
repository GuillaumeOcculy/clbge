# Story 3.2 : Prise de RDV & paiement en ligne (Zcal Pro)

Status: done

## Story

En tant que visiteur,
Je veux prendre un rendez-vous de consultation et payer en ligne,
Afin de sécuriser mon créneau rapidement sans échange préalable.

## Acceptance Criteria

1. **Given** je navigue vers `/rendez-vous` **When** la page se charge **Then** un texte d'introduction explique le processus de consultation et rassure ("Consultation avec paiement sécurisé. Réponse sous 24h.") **And** le composant ZcalEmbed (`'use client'`) affiche l'interface Zcal Pro **And** un Skeleton shadcn/ui est affiché pendant le chargement de l'embed **And** l'embed a un attribut `title="Prise de rendez-vous"`

2. **Given** je sélectionne un créneau et finalise le paiement **When** la réservation est confirmée **Then** Laurent reçoit une notification email de confirmation du RDV et du paiement (natif Zcal)

3. **Given** l'embed Zcal est indisponible **When** la page se charge **Then** un lien externe vers Zcal Pro est affiché en fallback avec un contexte clair

4. **Given** je consulte la page sur mobile **Then** l'embed/lien Zcal est fonctionnel et utilisable

5. **And** la page exporte `generateMetadata()` avec meta tags optimisées

## Tasks / Subtasks

- [x] Task 1 : Créer le composant `ZcalEmbed` (AC: #1, #3, #4)
  - [x] 1.1 Créer `components/embeds/ZcalEmbed.tsx` — Client Component (`'use client'`)
  - [x] 1.2 Props : `calendarUrl: string`, `title: string`
  - [x] 1.3 État loading : afficher `Skeleton` de `@/components/ui/skeleton` pendant le chargement
  - [x] 1.4 Iframe Zcal : `src="{calendarUrl}?embed=1&embedType=iframe"` — ajouter les paramètres embed Zcal
  - [x] 1.5 Attribut `title` sur l'iframe pour accessibilité
  - [x] 1.6 Fallback : détecter le chargement via `onLoad` de l'iframe, afficher un lien externe si l'iframe ne charge pas après un délai (5s timeout) — **même pattern que TallyEmbed**
  - [x] 1.7 Message fallback : "Le calendrier ne s'affiche pas ? [Prendre rendez-vous sur Zcal →]({calendarUrl})" avec icône lien externe (`ExternalLink` de lucide-react)
  - [x] 1.8 Responsive : iframe `width="100%"` et hauteur adaptée (min 600px mobile, 700px desktop — Zcal a besoin de plus de hauteur que Tally)
  - [x] 1.9 Utiliser `useState` pour gérer les états loading/loaded/error — **copier le pattern exact de TallyEmbed** (avec `useRef` pour le timeout)

- [x] Task 2 : Créer la page `/rendez-vous` (AC: #1, #4, #5)
  - [x] 2.1 Créer `app/rendez-vous/page.tsx` — Server Component
  - [x] 2.2 Texte d'introduction : titre h1 centré "Prendre rendez-vous" + séparateur rouge (pattern D1) + paragraphe d'accroche
  - [x] 2.3 Paragraphe d'accroche : "Consultation avec paiement sécurisé en ligne. Choisissez votre créneau, réglez en quelques clics. Réponse sous 24h."
  - [x] 2.4 Intégrer le composant `ZcalEmbed` avec `calendarUrl` depuis variable d'environnement `NEXT_PUBLIC_ZCAL_CALENDAR_URL` ou fallback hardcoded vide
  - [x] 2.5 Passer `title="Prise de rendez-vous"` au ZcalEmbed
  - [x] 2.6 Layout : section fond crème `bg-background`, container `max-w-3xl mx-auto px-4 md:px-8 lg:px-16`, centré (même pattern que page diagnostic)
  - [x] 2.7 Padding section : `py-12 md:py-20`
  - [x] 2.8 Ajouter un CtaBanner en bas de page comme alternative : "Vous ne savez pas encore ce dont vous avez besoin ?" → "Faire le diagnostic"
  - [x] 2.9 Exporter `generateMetadata()` avec title, description, openGraph

- [x] Task 3 : Ajouter la variable d'environnement (AC: #1)
  - [x] 3.1 Ajouter `NEXT_PUBLIC_ZCAL_CALENDAR_URL` dans `.env.example` avec un commentaire
  - [x] 3.2 Ajouter dans `.env.local` avec un placeholder (le vrai URL sera fourni par Laurent quand il aura configuré Zcal Pro)

- [x] Task 4 : Validation (AC: #1, #2, #3, #4, #5)
  - [x] 4.1 `npm run build` réussit sans erreur
  - [x] 4.2 `npm run lint` passe
  - [x] 4.3 La page `/rendez-vous` s'affiche avec le texte d'introduction
  - [x] 4.4 Le ZcalEmbed affiche le Skeleton en loading puis le fallback lien (car pas de calendarUrl réel)
  - [x] 4.5 Le lien fallback pointe vers la calendarUrl ou vers `https://zcal.co` par défaut
  - [x] 4.6 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 4.7 Le h1 "Prendre rendez-vous" est unique sur la page
  - [x] 4.8 `generateMetadata()` est exporté
  - [x] 4.9 L'iframe a un attribut `title`
  - [x] 4.10 Le CtaBanner s'affiche en bas de page avec lien vers `/diagnostic`
  - [x] 4.11 Le lien header CTA "Prendre RDV" pointe vers `/rendez-vous` (vérifier que ça fonctionne)

## Dev Notes

### Architecture & Patterns obligatoires

- **ZcalEmbed est un Client Component (`'use client'`)** — L'iframe nécessite du state management (loading/loaded/error) et des event handlers (`onLoad`). C'est un des rares composants client du projet.
- **La page `rendez-vous/page.tsx` reste un Server Component** — Seul le ZcalEmbed est client. La page passe la `calendarUrl` en prop.
- **Copier le pattern exact de TallyEmbed** — Le composant ZcalEmbed DOIT suivre la même architecture que `components/embeds/TallyEmbed.tsx` : mêmes états (loading/loaded/error), même gestion du timeout (5s), même pattern de fallback avec lien externe. Référencer TallyEmbed comme modèle exact.
- **Skeleton shadcn/ui** — Existe déjà dans `components/ui/skeleton.tsx`. L'importer directement.
- **Tailwind v4** — Pas de `tailwind.config.ts`. Les couleurs sont en CSS variables dans `globals.css` via `@theme`.
- **Button `render` prop** — shadcn/ui v4.0.8 avec @base-ui/react. Utiliser `render={<Link href="..." />}`, PAS `asChild`.
- **Pattern D1** — Titre h1 centré + séparateur rouge : `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- **Container** — `max-w-3xl mx-auto px-4 md:px-8 lg:px-16` pour centrer le contenu (même pattern que la page diagnostic).
- **CtaBanner** — Composant existant dans `components/sections/CtaBanner.tsx`. Props : `title`, `subtitle`, `buttonText`. **IMPORTANT** : Le lien dans CtaBanner est hardcodé vers `/rendez-vous`. Pour cette page, le CtaBanner doit pointer vers `/diagnostic`. Il faudra soit ajouter une prop `href` au CtaBanner, soit créer un CtaBanner alternatif. Vérifier l'implémentation actuelle.

### Composant ZcalEmbed — Spécifications détaillées

**Méthode d'intégration Zcal :** Utiliser l'embed iframe de Zcal. L'URL d'embed suit le format :
```
{calendarUrl}?embed=1&embedType=iframe
```

**Paramètres Zcal embed :**
- `embed=1` — signale que la page est chargée en mode embed
- `embedType=iframe` — type de rendu embed

**Format d'URL Zcal :** Les URLs de calendrier Zcal suivent le format `https://zcal.co/i/{INVITE_ID}`. La `calendarUrl` passée en prop doit être l'URL complète du calendrier (ex: `https://zcal.co/i/HGTuJNAF`).

**Alternative simplifiée :** Si l'embed iframe Zcal pose des problèmes, afficher directement le lien externe vers le calendrier Zcal. L'essentiel est que le visiteur puisse prendre RDV — le lien externe est une solution parfaitement acceptable.

**Détection de blocage :** Même approche que TallyEmbed. L'iframe peut être bloquée par des extensions. Utiliser un `onLoad` handler avec un timeout de 5 secondes. Si l'iframe n'a pas déclenché `onLoad` après 5 secondes, afficher le fallback.

**Hauteur iframe :** Zcal nécessite plus de hauteur que Tally (calendrier + créneaux + paiement). Utiliser `min-h-[600px]` sur mobile et `min-h-[700px]` sur desktop.

### Composants existants à RÉUTILISER

- `components/ui/skeleton.tsx` — Skeleton shadcn/ui pour le loading state
- `components/sections/CtaBanner.tsx` — Bandeau CTA en bas de page (props: title, subtitle, buttonText). **Attention** : le lien est actuellement hardcodé vers `/rendez-vous` dans le composant. Pour la page rendez-vous, le CTA doit pointer vers `/diagnostic`. Il faudra **ajouter une prop `href` optionnelle** au CtaBanner pour supporter les deux cas. Valeur par défaut : `/rendez-vous`.
- `components/ui/button.tsx` — Boutons shadcn/ui

### Pages existantes comme référence

- `app/diagnostic/page.tsx` — **MODÈLE EXACT** pour la page rendez-vous. Même structure : pattern D1 (titre h1 + séparateur), container `max-w-3xl`, `generateMetadata()`, CtaBanner en bas.
- `components/embeds/TallyEmbed.tsx` — **MODÈLE EXACT** pour le composant ZcalEmbed. Copier l'architecture, les états, la gestion du timeout, le pattern de fallback.

### Modification du CtaBanner (impact cross-story)

Le CtaBanner actuel a le lien `/rendez-vous` hardcodé. Pour cette story, le CtaBanner de la page rendez-vous doit pointer vers `/diagnostic`. **Solution recommandée :**
1. Ajouter une prop optionnelle `href?: string` au CtaBanner avec valeur par défaut `"/rendez-vous"`
2. Sur la page rendez-vous, passer `href="/diagnostic"`
3. Les pages existantes (diagnostic, homepage) qui utilisent le CtaBanner continuent de fonctionner sans changement (valeur par défaut)

### Notifications email et paiement

Les notifications email à Laurent après RDV et le paiement en ligne sont **natifs à Zcal Pro** — configurés dans le dashboard Zcal. Pas de code à écrire côté Next.js. Le paiement est géré via l'intégration Stripe native de Zcal.

### CSP (Content-Security-Policy)

Zcal est **déjà autorisé** dans le CSP de `next.config.ts` :
```
frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co
```
Pas de modification nécessaire.

### Variable d'environnement

La `calendarUrl` Zcal sera fournie par Laurent quand il aura configuré son invite sur zcal.co. Format attendu : `https://zcal.co/i/{INVITE_ID}`. En attendant, utiliser un placeholder vide. Le composant doit fonctionner gracieusement sans calendarUrl valide (afficher le fallback).

### generateMetadata() — Pattern

```typescript
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Prendre rendez-vous — CLBGE, Géomètre-Expert en Guadeloupe",
    description: "Réservez une consultation avec Laurent Bazile, géomètre-expert en Guadeloupe. Paiement sécurisé en ligne, réponse sous 24h.",
    openGraph: {
      title: "Prendre rendez-vous — CLBGE",
      description: "Réservez votre consultation en ligne avec paiement sécurisé.",
      type: "website",
    },
  };
}
```

### Supprimer le `<main>` wrapper

NE PAS ajouter de `<main>` dans `page.tsx` — le layout global a déjà `<main id="main-content">`. Utiliser un fragment `<>` ou un `<div>`.

### Intelligence Story 3.1 (story précédente)

- TallyEmbed créé comme Client Component réutilisable — **référence architecturale pour ZcalEmbed**
- 3 états : loading (Skeleton), loaded (iframe visible), error (lien fallback externe)
- Timeout 5s pour détecter les iframes bloquées par ad-blockers
- Page diagnostic avec pattern D1, container `max-w-3xl`
- CtaBanner en bas de page
- `generateMetadata()` exporté
- CSP déjà configurée pour `tally.so` ET `zcal.co`
- shadcn/ui v4.0.8 — @base-ui/react (pas Radix UI)
- Button `render` prop (pas `asChild`)
- Tailwind v4 avec `@theme` dans globals.css
- Build OK : 9 pages statiques, lint OK
- Iframe hidden quand status !== "loaded" (fix du code review story 3.1)

### Anti-patterns à éviter

- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** ajouter un `<main>` dans page.tsx — déjà dans layout
- **NE PAS** créer de query GROQ pour la page rendez-vous — pas de contenu Sanity sur cette page
- **NE PAS** créer de fichier `tailwind.config.ts`
- **NE PAS** utiliser `@apply` dans Tailwind
- **NE PAS** oublier le `title` sur l'iframe (accessibilité)
- **NE PAS** utiliser de librairie tierce pour l'intégration Zcal — une simple iframe suffit
- **NE PAS** gérer les notifications email ou le paiement côté code — c'est natif Zcal
- **NE PAS** fetch côté client avec `useEffect` pour du contenu — seul le ZcalEmbed utilise des hooks pour le state de l'iframe
- **NE PAS** inventer un pattern différent de TallyEmbed — la cohérence entre les deux composants embed est critique

### Pièges techniques critiques

1. **calendarUrl vide/placeholder** — Le composant DOIT fonctionner sans calendarUrl valide. Afficher le lien fallback si pas de calendarUrl.
2. **Iframe bloquée** — Les ad-blockers et extensions de sécurité peuvent bloquer les iframes Zcal. Le fallback est obligatoire.
3. **Hauteur iframe** — Zcal affiche un calendrier + créneaux + formulaire de paiement. La hauteur minimale doit être plus grande que Tally : `min-h-[600px]` mobile, `min-h-[700px]` desktop.
4. **CSP headers** — Déjà configuré dans `next.config.ts` pour `zcal.co`. Pas de modification nécessaire.
5. **`'use client'` uniquement sur ZcalEmbed** — La page reste Server Component. Ne pas mettre `'use client'` sur la page.
6. **CtaBanner href** — Le CtaBanner pointe vers `/rendez-vous` par défaut. Sur la page rendez-vous, il doit pointer vers `/diagnostic`. Ajouter la prop `href` au CtaBanner.
7. **Paramètres Zcal embed** — Les paramètres `?embed=1&embedType=iframe` sont ajoutés à la calendarUrl. Vérifier que la calendarUrl ne contient pas déjà ces paramètres avant de les ajouter.

### Project Structure Notes

- `components/embeds/ZcalEmbed.tsx` → nouveau composant client (FR8, FR9)
- `app/rendez-vous/page.tsx` → nouvelle page route `/rendez-vous` (FR8, FR9)
- `components/sections/CtaBanner.tsx` → modifié (ajout prop `href` optionnelle)
- `.env.example` → modifié (ajout NEXT_PUBLIC_ZCAL_CALENDAR_URL)

### References

- [Source: planning-artifacts/epics.md#Story 3.2] — Acceptance criteria, FR8, FR9, FR11
- [Source: planning-artifacts/architecture.md#Requirements → Structure Mapping] — FR8-9 → app/rendez-vous/page.tsx + components/embeds/ZcalEmbed.tsx
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — Server Components par défaut, 'use client' pour embeds
- [Source: planning-artifacts/architecture.md#API & Communication Patterns] — Embed Zcal Pro, pas d'API route
- [Source: planning-artifacts/ux-design-specification.md#Custom Components > ZcalEmbed] — Props: calendarUrl/title, states: Skeleton → embed → fallback
- [Source: planning-artifacts/ux-design-specification.md#Feedback Patterns] — Skeleton loading, fallback lien externe
- [Source: planning-artifacts/ux-design-specification.md#UX-DR10] — ZcalEmbed specs
- [Source: implementation-artifacts/3-1-formulaire-diagnostic-interactif-tally.md] — Intelligence story précédente, modèle TallyEmbed

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
- Build OK : 10 pages statiques (dont /rendez-vous), lint OK
- Aucune régression — toutes les pages existantes compilent correctement
- CtaBanner modifié avec prop `href` optionnelle — rétro-compatible (valeur par défaut `/rendez-vous`)

### Completion Notes List
- Composant ZcalEmbed créé en suivant le pattern exact de TallyEmbed (3 états, timeout 5s, fallback lien externe)
- Page /rendez-vous créée avec pattern D1 (titre h1 + séparateur rouge), container max-w-3xl, generateMetadata()
- CtaBanner enrichi d'une prop `href` optionnelle pour supporter les deux directions (rendez-vous ↔ diagnostic)
- Variables d'environnement ajoutées dans .env.example et .env.local
- Gestion gracieuse de l'absence de calendarUrl (affiche le fallback immédiatement)
- Paramètres Zcal embed (`?embed=1&embedType=iframe`) ajoutés avec détection de `?` existant dans l'URL
- Hauteur iframe adaptée : min-h-[600px] mobile, min-h-[700px] desktop (plus grand que Tally)
- Liens CTA header (NavBar, MobileMenu, Footer, HeroSection) pointent déjà vers /rendez-vous — aucune modification nécessaire

### Change Log
- 2026-03-19 : Story 3.2 implémentée — page /rendez-vous avec ZcalEmbed et CtaBanner modifié

### File List
- `components/embeds/ZcalEmbed.tsx` — nouveau (Client Component, embed iframe Zcal Pro)
- `app/rendez-vous/page.tsx` — nouveau (Server Component, page rendez-vous)
- `components/sections/CtaBanner.tsx` — modifié (ajout prop `href` optionnelle)
- `.env.example` — modifié (ajout NEXT_PUBLIC_ZCAL_CALENDAR_URL)
- `.env.local` — modifié (ajout NEXT_PUBLIC_ZCAL_CALENDAR_URL)
