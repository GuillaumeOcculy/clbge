# Story 6.1 : SEO technique — Sitemap, données structurées & canoniques

Status: done

## Story

En tant que moteur de recherche,
Je veux accéder à un sitemap XML, des données structurées et des balises canoniques,
Afin d'indexer correctement le site et afficher des résultats enrichis.

## Acceptance Criteria

### AC1 : Sitemap XML dynamique

**Given** un crawler accède à `/sitemap.xml`
**When** le sitemap est généré
**Then** toutes les pages statiques du site sont listées (homepage, nos-prestations, qui-suis-je, notre-mission, nos-technologies, diagnostic, rendez-vous, contact, blog)
**And** les articles de blog publiés sont inclus dynamiquement via Sanity (query `blogPostSlugsQuery` existante)
**And** le sitemap est généré par `app/sitemap.ts` (convention Next.js App Router)
**And** chaque URL inclut `lastModified` et `changeFrequency`

### AC2 : Données structurées JSON-LD

**Given** un crawler accède à n'importe quelle page
**When** il analyse le HTML
**Then** des données structurées JSON-LD sont présentes dans un `<script type="application/ld+json">`
**And** le schéma LocalBusiness est utilisé avec : nom du cabinet, adresse (Petit-Bourg, Guadeloupe), téléphone (`0690 61 22 24`), email (`contact@clbge.com`), zone d'intervention (archipel guadeloupéen)
**And** le schéma ProfessionalService est utilisé avec : services proposés (Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires)

### AC3 : Balises canoniques

**Given** un crawler accède à n'importe quelle page
**When** il analyse les balises `<head>`
**Then** une balise canonique (`rel="canonical"`) est présente avec l'URL propre de la page
**And** ceci est implémenté via `metadataBase` + `alternates.canonical` dans la metadata Next.js

### AC4 : robots.txt

**Given** les pages du site sont indexables
**When** le fichier `robots.txt` est consulté
**Then** toutes les pages publiques sont autorisées (`Allow: /`)
**And** `/studio` est bloqué (`Disallow: /studio`)
**And** `/api` est bloqué (`Disallow: /api`)
**And** le sitemap est référencé (`Sitemap: https://clbge.com/sitemap.xml`)
**And** le fichier est généré par `app/robots.ts` (convention Next.js App Router)

### AC5 : Score Lighthouse SEO

**Given** un audit Lighthouse SEO est exécuté
**Then** le score est > 95

## Tasks / Subtasks

- [x] Task 1 : Créer `app/sitemap.ts` (AC: #1)
  - [x] 1.1 Exporter une fonction `sitemap()` retournant `MetadataRoute.Sitemap`
  - [x] 1.2 Lister les 9 pages statiques avec URL complète (`https://clbge.com/...`)
  - [x] 1.3 Fetcher les slugs des articles blog publiés via `blogPostSlugsQuery` (query existante dans `sanity/lib/queries.ts`)
  - [x] 1.4 Ajouter dynamiquement les URLs `/blog/{slug}` pour chaque article publié
  - [x] 1.5 Définir `changeFrequency` et `priority` par page (homepage: weekly/1.0, blog: weekly/0.8, pages statiques: monthly/0.7)
- [x] Task 2 : Créer `app/robots.ts` (AC: #4)
  - [x] 2.1 Exporter une fonction `robots()` retournant `MetadataRoute.Robots`
  - [x] 2.2 Autoriser `/` pour tous les user-agents
  - [x] 2.3 Bloquer `/studio` et `/api`
  - [x] 2.4 Référencer le sitemap `https://clbge.com/sitemap.xml`
- [x] Task 3 : Créer le composant JSON-LD `components/seo/JsonLd.tsx` (AC: #2)
  - [x] 3.1 Créer un Server Component qui injecte un `<script type="application/ld+json">`
  - [x] 3.2 Implémenter le schéma `LocalBusiness` avec les informations du cabinet
  - [x] 3.3 Ajouter le schéma `ProfessionalService` avec les 6 services
  - [x] 3.4 Inclure `areaServed` (Guadeloupe, Marie-Galante, Les Saintes, La Désirade)
  - [x] 3.5 Inclure `geo` (coordonnées GPS Petit-Bourg) et `openingHours`
- [x] Task 4 : Intégrer JSON-LD dans le layout (AC: #2)
  - [x] 4.1 Importer et ajouter `<JsonLd />` dans `app/layout.tsx` (dans `<body>`, après le skip link)
- [x] Task 5 : Configurer `metadataBase` et canoniques (AC: #3)
  - [x] 5.1 Ajouter `metadataBase: new URL('https://clbge.com')` dans la metadata de `app/layout.tsx`
  - [x] 5.2 Ajouter `alternates: { canonical: './' }` dans `app/layout.tsx` metadata par défaut — Next.js résoudra automatiquement l'URL canonique relative pour chaque page
  - [x] 5.3 Vérifier que les `generateMetadata()` existants dans chaque page n'écrasent pas les canoniques (si un `generateMetadata` retourne `alternates`, il override le parent)
- [x] Task 6 : Supprimer `components/seo/.gitkeep` (nettoyage)
- [x] Task 7 : Validation finale (AC: #5)
  - [x] 7.1 `npm run build` — build OK
  - [x] 7.2 `npm run lint` — pas de régression
  - [x] 7.3 `npm run test:e2e` — pas de régression (122 tests existants)
  - [x] 7.4 Vérifier `/sitemap.xml` en dev (contient toutes les pages + articles blog)
  - [x] 7.5 Vérifier `/robots.txt` en dev (bloque `/studio` et `/api`, référence sitemap)
  - [x] 7.6 Vérifier JSON-LD dans le source HTML (script `application/ld+json` présent)
  - [x] 7.7 Vérifier les canoniques dans le source HTML (`<link rel="canonical">` sur chaque page)

## Dev Notes

### API Next.js pour sitemap.ts et robots.ts

Next.js 16 supporte nativement la génération de `sitemap.xml` et `robots.txt` via des fichiers conventions dans le dossier `app/`.

**sitemap.ts** — Convention Next.js App Router :
```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://clbge.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    // ...
  ]
}
```

**robots.ts** — Convention Next.js App Router :
```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api'] },
    sitemap: 'https://clbge.com/sitemap.xml',
  }
}
```

Ces fichiers sont automatiquement cachés par Next.js et servis comme des routes statiques.

### Sitemap — fetcher les articles blog

La query `blogPostSlugsQuery` existe déjà dans `sanity/lib/queries.ts` (ligne 117-121) et retourne `{ slug: string }[]`. L'utiliser directement dans `app/sitemap.ts` :

```typescript
import { client } from '@/sanity/lib/client'
import { blogPostSlugsQuery } from '@/sanity/lib/queries'

// Dans la fonction sitemap() :
const posts = await client.fetch(blogPostSlugsQuery)
const blogUrls = posts.map((post) => ({
  url: `https://clbge.com/blog/${post.slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}))
```

**Gestion d'erreur Sanity** : Envelopper le fetch dans un try/catch. Si Sanity est indisponible, retourner uniquement les pages statiques (le sitemap doit toujours fonctionner).

### JSON-LD — schémas schema.org

**LocalBusiness + ProfessionalService combinés** — Utiliser `@type: ["LocalBusiness", "ProfessionalService"]` pour combiner les deux schémas :

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'Cabinet Laurent Bazile Géomètre-Expert',
  description: 'Cabinet de géomètre-expert en Guadeloupe...',
  url: 'https://clbge.com',
  telephone: '+590690612224',
  email: 'contact@clbge.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Petit-Bourg',
    addressRegion: 'Guadeloupe',
    addressCountry: 'GP',
  },
  areaServed: [
    { '@type': 'Place', name: 'Guadeloupe' },
    { '@type': 'Place', name: 'Marie-Galante' },
    { '@type': 'Place', name: 'Les Saintes' },
    { '@type': 'Place', name: 'La Désirade' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foncier' } },
      // ... 6 services
    ],
  },
}
```

**Injection dans le DOM** — Server Component pur, pas de `'use client'` :
```tsx
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### Canoniques — metadataBase

Next.js résout automatiquement les URLs canoniques relatives grâce à `metadataBase`. En ajoutant `metadataBase: new URL('https://clbge.com')` dans le layout root, toutes les pages héritent de la base URL.

**Important** : Les `generateMetadata()` existants dans chaque page (10 pages en ont un) n'incluent pas `alternates` — donc ils n'écraseront PAS la canonique héritée du layout. Aucune modification des pages existantes n'est nécessaire.

Si un `generateMetadata()` retourne un objet avec `alternates`, il override le parent. Vérifier qu'aucune page ne le fait.

### URL de production

L'URL de production est `https://clbge.com`. Elle est utilisée dans :
- `metadataBase` (layout.tsx)
- `app/sitemap.ts` (URLs absolues requises)
- `app/robots.ts` (référence sitemap)

**Idéalement**, utiliser une variable d'environnement `NEXT_PUBLIC_SITE_URL` pour éviter le hardcoding. Mais comme l'architecture ne la prévoit pas et que l'URL est stable, hardcoder `https://clbge.com` est acceptable pour le MVP.

### Fichiers à créer/modifier

| Action | Fichier | Description |
|--------|---------|-------------|
| CRÉER | `app/sitemap.ts` | Sitemap XML dynamique (pages + blog Sanity) |
| CRÉER | `app/robots.ts` | Robots.txt (allow /, disallow /studio /api) |
| CRÉER | `components/seo/JsonLd.tsx` | Données structurées JSON-LD (LocalBusiness + ProfessionalService) |
| MODIFIER | `app/layout.tsx` | Ajouter `metadataBase`, `alternates.canonical`, import `<JsonLd />` |
| SUPPRIMER | `components/seo/.gitkeep` | Nettoyage (remplacé par JsonLd.tsx) |

### CSP — pas de modification nécessaire

Les scripts JSON-LD `type="application/ld+json"` ne sont pas exécutés par le navigateur (c'est du JSON, pas du JS). Ils ne sont pas affectés par la Content-Security-Policy. Aucune modification de `next.config.ts` n'est nécessaire.

### Project Structure Notes

- `app/sitemap.ts` et `app/robots.ts` : conventions Next.js App Router, prévus dans l'architecture (`architecture.md` ligne 349, 351)
- `components/seo/JsonLd.tsx` : prévu dans l'architecture (`architecture.md` ligne 409)
- Le dossier `components/seo/` existe déjà (avec un `.gitkeep`)
- Pas de conflit avec la structure existante

### Previous Story Intelligence (Story 5.2)

**Learnings critiques :**
- **Next.js 16.2.0** : `draftMode()` est async (`await draftMode()`), les params de `generateMetadata` sont des `Promise<>`. Penser à `await` les params si nécessaire dans sitemap.ts.
- **Sanity client** : import dynamique dans layout.tsx (`await import('@/sanity/lib/client')`). Pour sitemap.ts, un import statique est OK car le fichier n'est pas un layout conditionnel.
- **blogPostSlugsQuery** : retourne `{ slug: string }[]` — attention, le champ est `slug` (pas `slug.current`, la query GROQ fait déjà la projection).
- **Convention de commit** : `type: description en français` — pas de co-author.
- **122 tests E2E** existants (114 passed + 8 skipped) — aucun ne doit régresser.

### Git Intelligence

Derniers commits pertinents :
- `0352107` retro: epic 5 — rétrospective Tests E2E & Qualité
- `f54dba1` fix: renforcer assertions E2E blog
- `657efef` feat: story 5.2 — tests E2E blog, draft mode et Sanity Studio
- `2ea8fe7` feat: story 5.1 — setup Playwright & tests E2E pages statiques

Convention de commit : `type: description en français`

### Tech Stack

| Tech | Version | Notes |
|------|---------|-------|
| Next.js | 16.2.0 | App Router, `MetadataRoute.Sitemap`, `MetadataRoute.Robots` |
| next-sanity | ^12.1.3 | Client Sanity |
| TypeScript | strict | Types `MetadataRoute` depuis `next` |

### Anti-patterns à éviter

- **NE PAS créer un fichier `public/robots.txt` statique** — utiliser `app/robots.ts` (convention Next.js, dynamique)
- **NE PAS créer un API route pour le sitemap** — utiliser `app/sitemap.ts` (convention Next.js)
- **NE PAS utiliser un package tiers pour JSON-LD** (next-seo, schema-dts) — un simple objet JSON + `dangerouslySetInnerHTML` suffit
- **NE PAS modifier les `generateMetadata()` existants des pages** — les canoniques sont héritées via `metadataBase` du layout
- **NE PAS oublier le try/catch Sanity dans sitemap.ts** — le sitemap doit fonctionner même si Sanity est indisponible
- **NE PAS utiliser `'use client'` pour le composant JsonLd** — c'est un Server Component pur

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 6, Story 6.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#SEO, Frontend Architecture, Project Structure]
- [Source: _bmad-output/planning-artifacts/prd.md#FR26-FR30, NFR18-NFR21]
- [Source: sanity/lib/queries.ts#blogPostSlugsQuery (ligne 117-121)]
- [Source: app/layout.tsx — metadata par défaut, import conditionnel Sanity]
- [Source: components/seo/.gitkeep — dossier existant, prévu pour JsonLd.tsx]
- [Source: Next.js docs — app/sitemap.ts, app/robots.ts, metadataBase, alternates.canonical]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

Aucun problème rencontré.

### Completion Notes List

- **Task 1** : `app/sitemap.ts` créé — 9 pages statiques + articles blog dynamiques via `blogPostSlugsQuery`, try/catch Sanity, `changeFrequency` et `priority` configurés par type de page.
- **Task 2** : `app/robots.ts` créé — Allow `/`, Disallow `/studio` et `/api`, sitemap référencé.
- **Task 3** : `components/seo/JsonLd.tsx` créé — Server Component pur, schéma combiné `LocalBusiness` + `ProfessionalService`, 6 services, `areaServed` (4 îles), `geo` (Petit-Bourg), `openingHoursSpecification`.
- **Task 4** : `<JsonLd />` intégré dans `app/layout.tsx` dans `<body>` avant le skip link.
- **Task 5** : `metadataBase` et `alternates.canonical` ajoutés dans la metadata du layout. Vérifié qu'aucun `generateMetadata()` existant n'écrase les canoniques.
- **Task 6** : `components/seo/.gitkeep` supprimé.
- **Task 7** : Build OK, lint OK, 114 tests E2E passed (0 régression), sitemap/robots.txt/JSON-LD/canoniques vérifiés en dev.

### Change Log

- 2026-03-20 : Implémentation complète story 6.1 — SEO technique (sitemap, robots.txt, JSON-LD, canoniques)

### File List

- `app/sitemap.ts` (CRÉÉ)
- `app/robots.ts` (CRÉÉ)
- `components/seo/JsonLd.tsx` (CRÉÉ)
- `app/layout.tsx` (MODIFIÉ — metadataBase, alternates.canonical, import JsonLd)
- `components/seo/.gitkeep` (SUPPRIMÉ)
