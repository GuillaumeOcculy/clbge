# Story 6.2 : Analytics & optimisation blog SEO

Status: done

## Story

En tant que propriétaire du site (Laurent),
Je veux suivre le trafic du site et que les articles de blog soient optimisés pour le référencement,
Afin de mesurer l'impact de ma présence digitale et capter du trafic organique.

## Acceptance Criteria

### AC1 : Google Analytics chargé en async

**Given** un visiteur charge n'importe quelle page
**When** la page est rendue
**Then** le script Google Analytics 4 est chargé via `@next/third-parties/google` (composant `GoogleAnalytics`)
**And** le chargement est asynchrone et n'impacte pas les performances (LCP, CLS)
**And** le `gaId` est lu depuis la variable d'environnement `NEXT_PUBLIC_GA_MEASUREMENT_ID`
**And** le composant n'est rendu que si la variable d'environnement est définie (pas d'erreur en dev/preview sans GA)

### AC2 : Google Search Console configurable

**Given** Laurent veut configurer Google Search Console
**When** il ajoute le code de vérification dans la variable d'environnement `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
**Then** le meta tag `<meta name="google-site-verification" content="...">` est présent dans le `<head>` de toutes les pages
**And** si la variable n'est pas définie, aucun meta tag n'est injecté

### AC3 : Blog — URLs propres et structure heading

**Given** un article de blog est publié
**When** un crawler indexe la page `/blog/[slug]`
**Then** l'URL est propre et en kebab-case (déjà le cas via `slug.current` Sanity)
**And** le `<h1>` est le titre de l'article (unique par page)
**And** les balises heading (h2, h3) dans le corps rich text sont rendues correctement par le `PortableTextRenderer`
**And** la hiérarchie heading est logique (pas de saut de niveau)

### AC4 : Blog — meta tags dynamiques

**Given** un article de blog est publié
**When** un crawler indexe la page `/blog/[slug]`
**Then** le `<title>` utilise `metaTitle` Sanity (fallback: `${post.title} — CLBGE`)
**And** la `<meta name="description">` utilise `metaDescription` Sanity (fallback: `post.excerpt`)
**And** la balise canonique est présente (héritée de `metadataBase` + `alternates.canonical` du layout)
**And** l'image principale a un `alt` descriptif (déjà implémenté : `mainImage.alt || title`)
**And** les meta Open Graph incluent `og:type: article`, `og:image`, `og:title`, `og:description`

### AC5 : Audit meta tags — unicité et complétude

**Given** tous les `generateMetadata()` des epics précédents sont en place
**When** un audit global est effectué
**Then** chaque page a un `<title>` unique
**And** chaque page a une `<meta name="description">` unique
**And** aucune page n'a de meta tags manquantes ou dupliquées

## Tasks / Subtasks

- [x] Task 1 : Installer `@next/third-parties` (AC: #1)
  - [x] 1.1 `npm install @next/third-parties`
  - [x] 1.2 Ajouter `NEXT_PUBLIC_GA_MEASUREMENT_ID` dans `.env.example` avec commentaire explicatif
  - [x] 1.3 Ajouter `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` dans `.env.example`

- [x] Task 2 : Intégrer Google Analytics dans le layout (AC: #1)
  - [x] 2.1 Importer `GoogleAnalytics` depuis `@next/third-parties/google` dans `app/layout.tsx`
  - [x] 2.2 Ajouter `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />` dans le `<html>` après `<body>`, conditionné par la présence de la variable d'environnement
  - [x] 2.3 Vérifier que la CSP dans `next.config.ts` autorise déjà les domaines GA (c'est le cas : `google-analytics.com`, `googletagmanager.com` déjà dans `script-src` et `connect-src`)

- [x] Task 3 : Configurer Google Search Console (AC: #2)
  - [x] 3.1 Ajouter `verification` dans la metadata du layout `app/layout.tsx` :
    ```typescript
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    ```
  - [x] 3.2 Si `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` est `undefined`, Next.js n'injecte pas le meta tag (comportement natif)

- [x] Task 4 : Vérifier la structure heading du blog (AC: #3)
  - [x] 4.1 Vérifier que `app/blog/[slug]/page.tsx` rend le titre dans un `<h1>` unique
  - [x] 4.2 Vérifier que le composant `PortableTextRenderer` (ou équivalent) rend les headings du corps en `<h2>`, `<h3>` etc. sans saut de niveau
  - [x] 4.3 Si le rendu heading est incorrect, corriger le composant de rendu Portable Text

- [x] Task 5 : Vérifier et compléter les meta tags blog (AC: #4)
  - [x] 5.1 Vérifier que `generateMetadata()` dans `app/blog/[slug]/page.tsx` utilise bien `metaTitle` / `metaDescription` avec fallback
  - [x] 5.2 Vérifier que `og:type` est `"article"` dans les Open Graph tags de l'article
  - [x] 5.3 Vérifier que `og:image` utilise l'image principale de l'article (via `@sanity/image-url`)
  - [x] 5.4 Si des champs manquent, les ajouter au `generateMetadata()`

- [x] Task 6 : Audit d'unicité des meta tags (AC: #5)
  - [x] 6.1 Lister tous les `<title>` et `<meta description>` de chaque page via build + inspection
  - [x] 6.2 Vérifier qu'aucun doublon n'existe entre pages
  - [x] 6.3 Corriger les doublons éventuels (notamment les pages statiques qui pourraient partager des descriptions similaires)

- [x] Task 7 : Validation finale
  - [x] 7.1 `npm run build` — build OK
  - [x] 7.2 `npm run lint` — pas de régression
  - [x] 7.3 `npm run test:e2e` — pas de régression sur les 122 tests existants
  - [x] 7.4 Vérifier en dev que le script GA n'est PAS injecté quand `NEXT_PUBLIC_GA_MEASUREMENT_ID` est absent
  - [x] 7.5 Vérifier en dev (avec variable) que le script GA est présent dans le HTML (`gtag`)
  - [x] 7.6 Vérifier que le meta tag `google-site-verification` n'est pas présent sans la variable

## Dev Notes

### Google Analytics — `@next/third-parties/google`

Next.js 16 fournit le package `@next/third-parties` avec un composant `GoogleAnalytics` optimisé. Il charge le script `gtag.js` de manière asynchrone **après hydration**, ce qui n'impacte pas le LCP ni le CLS.

**Intégration dans le layout :**
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* ... contenu existant ... */}
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  )
}
```

**Placement** : `<GoogleAnalytics />` se place **après** `<body>` mais **dans** `<html>`, conformément à la doc Next.js officielle.

**Pas de package tiers** : NE PAS utiliser `react-ga`, `next-ga`, ou un script `<Script>` manuel. Le composant officiel `@next/third-parties/google` est la solution recommandée.

### Google Search Console — metadata `verification`

Next.js supporte nativement le champ `verification` dans l'objet metadata :

```typescript
export const metadata: Metadata = {
  // ... existant ...
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}
```

Cela génère automatiquement `<meta name="google-site-verification" content="..." />`. Si la valeur est `undefined`, le meta tag n'est pas rendu.

### CSP — déjà configurée pour GA

Les headers CSP dans `next.config.ts` autorisent déjà les domaines Google Analytics :
- `script-src` : `https://*.google-analytics.com https://*.googletagmanager.com`
- `connect-src` : `https://*.google-analytics.com`

Aucune modification de `next.config.ts` n'est nécessaire.

### État actuel du blog SEO

**Déjà implémenté (pas de changement nécessaire sauf vérification) :**
- `generateMetadata()` dans `app/blog/[slug]/page.tsx` — utilise `metaTitle`, `metaDescription`, `og:type: "article"` ✓
- `generateMetadata()` dans `app/blog/page.tsx` — titre et description statiques ✓
- Images avec alt text (`mainImage.alt || title`) ✓
- URLs en kebab-case via `slug.current` Sanity ✓
- Canoniques héritées de `metadataBase` dans layout ✓
- Pages pré-rendues en SSG via `generateStaticParams()` ✓

**Points à vérifier attentivement :**
- Structure heading du Portable Text : s'assurer que le `PortableTextRenderer` génère des `<h2>`, `<h3>` corrects
- `og:image` : vérifier que l'image Sanity est bien incluse dans les Open Graph tags
- Fallback `metaDescription` : vérifier qu'il utilise `excerpt` si `metaDescription` est absent

### Audit meta tags — pages existantes

10 pages ont un `generateMetadata()`. État attendu :

| Page | Title | Description | Source |
|------|-------|-------------|--------|
| `/` | dynamique (Sanity `homePage`) | dynamique (Sanity) | `app/page.tsx` |
| `/nos-prestations` | statique | statique | `app/nos-prestations/page.tsx` |
| `/qui-suis-je` | dynamique (Sanity `aboutPage`) | dynamique (Sanity) | `app/qui-suis-je/page.tsx` |
| `/notre-mission` | statique | statique | `app/notre-mission/page.tsx` |
| `/nos-technologies` | statique | statique | `app/nos-technologies/page.tsx` |
| `/diagnostic` | statique | statique | `app/diagnostic/page.tsx` |
| `/rendez-vous` | statique | statique | `app/rendez-vous/page.tsx` |
| `/contact` | dynamique (Sanity `contactPage`) | dynamique (Sanity) | `app/contact/page.tsx` |
| `/blog` | statique | statique | `app/blog/page.tsx` |
| `/blog/[slug]` | dynamique (`metaTitle` Sanity) | dynamique (`metaDescription` Sanity) | `app/blog/[slug]/page.tsx` |

L'audit doit confirmer que chaque title et description sont **uniques** et **non vides**.

### Variables d'environnement à ajouter

```bash
# Google Analytics 4 — ID de mesure (format: G-XXXXXXXXXX)
# Laisser vide ou ne pas définir pour désactiver le tracking
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Google Search Console — code de vérification
# Laisser vide ou ne pas définir si pas encore configuré
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

### Fichiers à modifier

| Action | Fichier | Description |
|--------|---------|-------------|
| MODIFIER | `app/layout.tsx` | Ajouter `GoogleAnalytics`, `verification` metadata |
| MODIFIER | `.env.example` | Ajouter les 2 nouvelles variables d'environnement |
| VÉRIFIER | `app/blog/[slug]/page.tsx` | Vérifier meta tags, og:image, heading structure |
| VÉRIFIER | `app/blog/page.tsx` | Vérifier meta tags uniques |
| VÉRIFIER | Tous les `page.tsx` | Audit unicité title/description |
| ÉVENTUEL | Composant Portable Text | Corriger heading hierarchy si nécessaire |

### Project Structure Notes

- `@next/third-parties` est le package officiel Next.js pour les intégrations tierces — pas une dépendance communautaire
- Le composant `GoogleAnalytics` se place dans `app/layout.tsx` uniquement — pas de composant wrapper à créer
- Pas de nouveau fichier à créer (contrairement à story 6.1) — story principalement de configuration et vérification
- Cohérent avec l'architecture : pas de `'use client'` ajouté, le composant `GoogleAnalytics` gère son propre client-side loading

### Previous Story Intelligence (Story 6.1)

**Learnings critiques :**
- **metadataBase** déjà configuré dans `app/layout.tsx` : `new URL('https://clbge.com')` — ne pas le modifier
- **alternates.canonical** déjà configuré : `{ canonical: './' }` — les canoniques fonctionnent pour toutes les pages
- **CSP** : les domaines Google Analytics sont déjà autorisés dans `next.config.ts` — ne pas toucher à la CSP
- **Convention de commit** : `type: description en français`
- **122 tests E2E** (114 passed + 8 skipped) — aucun ne doit régresser
- **JsonLd** : déjà dans `app/layout.tsx` — ne pas dupliquer, ne pas modifier
- **Pas de co-author** dans les commits (cf. CLAUDE.md)

### Git Intelligence

Dernier commit pertinent :
- `c8db366` feat: story 6.1 — SEO technique (sitemap, robots.txt, JSON-LD, canoniques)
  - Fichiers créés : `app/sitemap.ts`, `app/robots.ts`, `components/seo/JsonLd.tsx`
  - Fichier modifié : `app/layout.tsx` (metadataBase, alternates.canonical, JsonLd)

### Anti-patterns à éviter

- **NE PAS installer `react-ga` ou `next-ga`** — utiliser `@next/third-parties/google` (package officiel Next.js)
- **NE PAS utiliser `<Script>` de `next/script` pour GA** — le composant `GoogleAnalytics` est optimisé et officiel
- **NE PAS hardcoder le GA Measurement ID** — utiliser `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **NE PAS modifier `metadataBase` ou `alternates.canonical`** dans le layout — déjà configurés en story 6.1
- **NE PAS modifier la CSP dans `next.config.ts`** — les domaines GA sont déjà autorisés
- **NE PAS créer un composant wrapper pour GA** — le composant s'ajoute directement dans le layout
- **NE PAS ajouter de JSON-LD `Article` pour les posts de blog** — hors scope de cette story (les FRs ne le demandent pas)
- **NE PAS toucher à `components/seo/JsonLd.tsx`** — composant de story 6.1, pas de changement requis

### Tech Stack

| Tech | Version | Notes |
|------|---------|-------|
| Next.js | 16.2.0 | `@next/third-parties/google` pour GA |
| @next/third-parties | latest | Composant `GoogleAnalytics` officiel |
| Sanity | ^5.17.1 | Champs `metaTitle`, `metaDescription` dans schema `blogPost` |
| TypeScript | strict | Types metadata Next.js |

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 6, Story 6.2]
- [Source: _bmad-output/planning-artifacts/architecture.md#SEO, Frontend Architecture, Infrastructure]
- [Source: _bmad-output/planning-artifacts/prd.md#FR26-FR30, NFR18-NFR24]
- [Source: _bmad-output/implementation-artifacts/6-1-seo-technique-sitemap-donnees-structurees-canoniques.md — story précédente]
- [Source: app/layout.tsx — metadata, metadataBase, alternates.canonical, JsonLd]
- [Source: app/blog/\[slug\]/page.tsx — generateMetadata dynamique, og:type article]
- [Source: next.config.ts — CSP headers avec domaines GA autorisés]
- [Source: .env.example — variables d'environnement existantes]
- [Source: Next.js docs v16 — @next/third-parties/google, GoogleAnalytics component]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré.

### Completion Notes List

- ✅ Installé `@next/third-parties` — composant officiel `GoogleAnalytics` de Next.js
- ✅ Ajouté `GoogleAnalytics` dans `app/layout.tsx` après `<body>`, conditionné par `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- ✅ Ajouté `verification.google` dans la metadata du layout pour Google Search Console
- ✅ Ajouté `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` dans `.env.example` avec commentaires
- ✅ Vérifié structure heading blog : `<h1>` unique dans `BlogPostContent`, `<h2>`/`<h3>` corrects dans `PortableTextRenderer`
- ✅ Ajouté `og:image` manquant dans `generateMetadata()` de `app/blog/[slug]/page.tsx` (1200x630, via `@sanity/image-url`)
- ✅ Audit meta tags : 10 pages avec titres et descriptions tous uniques, aucun doublon
- ✅ CSP déjà configurée pour GA (`google-analytics.com`, `googletagmanager.com`)
- ✅ Build OK, lint OK, 124 tests E2E (114 passed, 10 skipped) — aucune régression
- ✅ [Code Review] Corrigé fallback `metaDescription` → utilise `post.excerpt` (AC4)
- ✅ [Code Review] Ajouté `excerpt` dans `blogPostBySlugQuery` GROQ

### Change Log

- 2026-03-20 : Implémentation story 6.2 — Google Analytics, Google Search Console, og:image blog, audit meta tags
- 2026-03-20 : Code review — corrigé fallback metaDescription (excerpt au lieu de titre générique)

### File List

- `app/layout.tsx` — ajout import GoogleAnalytics, composant conditionnel, verification metadata
- `app/blog/[slug]/page.tsx` — ajout og:image dans generateMetadata(), fallback excerpt pour description
- `.env.example` — ajout NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, commentaires améliorés
- `package.json` — ajout dépendance @next/third-parties
- `package-lock.json` — mis à jour automatiquement
- `sanity/lib/queries.ts` — ajout champ excerpt dans blogPostBySlugQuery
