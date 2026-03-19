# Story 1.2 : Configuration Sanity CMS & Studio

Status: done

## Story

En tant qu'administrateur (Laurent),
Je veux accéder à un back-office CMS intégré au site,
Afin de pouvoir gérer le contenu du site de manière autonome.

## Acceptance Criteria

1. **Given** le projet Next.js est initialisé **When** je navigue vers `/studio` **Then** Sanity Studio s'affiche avec une interface d'authentification

2. **Given** Sanity Studio est accessible **When** je consulte les types de contenu **Then** les schémas de contenu sont définis : `blogPost`, `homePage`, `aboutPage`, `serviceItem`, `missionStep`, `technology`, `siteSettings`, `contactPage`

3. **Given** Sanity est configuré **When** je consulte `/sanity/lib/` **Then** le client Sanity et les helpers sont configurés (`client.ts`, `image.ts`)

4. **Given** Sanity est configuré **When** je consulte `/sanity/lib/queries.ts` **Then** les queries GROQ sont centralisées (jamais inline dans les composants)

5. **Given** le projet est déployé sur Vercel **When** Laurent publie du contenu dans Sanity Studio **Then** un webhook Sanity → Vercel déclenche un rebuild automatique

## Tasks / Subtasks

- [x] Task 1 : Installer les dépendances Sanity (AC: #1, #3)
  - [x] 1.1 Installer `next-sanity` et `@sanity/image-url` : `npm install next-sanity @sanity/image-url`
  - [x] 1.2 Installer `sanity` (core pour Studio + schémas) : `npm install sanity`
  - [x] 1.3 Installer `@portabletext/react` pour le rendu rich text (nécessaire Epic 4 mais best practice de l'installer maintenant) : `npm install @portabletext/react`
  - [x] 1.4 Vérifier que les dépendances sont compatibles avec React 19.2+ et Next.js 16

- [x] Task 2 : Configurer les variables d'environnement Sanity (AC: #3)
  - [x]2.1 Créer un fichier `sanity/env.ts` exportant les variables typées :
    ```typescript
    export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-11'
    export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
    export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
    ```
  - [x] 2.2 Mettre à jour `.env.local` avec les valeurs du projet Sanity (le `NEXT_PUBLIC_SANITY_PROJECT_ID` doit être renseigné — si pas encore créé, utiliser un placeholder documenté)
  - [x] 2.3 Mettre à jour `.env.example` avec `NEXT_PUBLIC_SANITY_API_VERSION=2024-07-11`

- [x] Task 3 : Configurer le client Sanity (AC: #3)
  - [x]3.1 Créer `sanity/lib/client.ts` avec `createClient` de `next-sanity` :
    ```typescript
    import { createClient } from 'next-sanity'
    import { apiVersion, dataset, projectId } from '../env'

    export const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // false car SSG — pages pré-rendues au build
    })
    ```
  - [x]3.2 Créer `sanity/lib/image.ts` avec le helper `@sanity/image-url` :
    ```typescript
    import createImageUrlBuilder from '@sanity/image-url'
    import { dataset, projectId } from '../env'

    const builder = createImageUrlBuilder({ projectId, dataset })

    export function urlFor(source: any) {
      return builder.image(source)
    }
    ```
  - [x]3.3 Supprimer les fichiers `.gitkeep` de `sanity/lib/` et `sanity/schemas/` (remplacés par du vrai contenu)

- [x] Task 4 : Créer la configuration Sanity Studio (AC: #1)
  - [x]4.1 Créer `sanity.config.ts` à la racine du projet :
    ```typescript
    import { defineConfig } from 'sanity'
    import { structureTool } from 'sanity/structure'
    import { schemaTypes } from './sanity/schemas'
    import { apiVersion, dataset, projectId } from './sanity/env'

    export default defineConfig({
      name: 'clbge-studio',
      title: 'CLBGE - Cabinet Laurent Bazile',
      projectId,
      dataset,
      plugins: [structureTool()],
      schema: { types: schemaTypes },
    })
    ```
  - [x]4.2 Créer la route Studio dans `app/studio/[[...tool]]/page.tsx` :
    ```tsx
    import { NextStudio } from 'next-sanity/studio'
    import config from '../../../../sanity.config'

    export const dynamic = 'force-static'
    export { metadata, viewport } from 'next-sanity/studio'

    export default function StudioPage() {
      return <NextStudio config={config} />
    }
    ```
  - [x]4.3 Mettre à jour `next.config.ts` pour exclure `/studio` de la CSP restrictive (Sanity Studio a besoin de charger ses propres scripts/styles) — ajouter une règle `source: '/studio/:path*'` avec CSP permissive

- [x] Task 5 : Définir les schémas de contenu Sanity (AC: #2)
  - [x]5.1 Créer `sanity/schemas/blogPost.ts` — Article de blog :
    - Champs : `title` (string, required), `slug` (slug, source: title, required), `publishedAt` (datetime), `mainImage` (image avec hotspot + champ `alt` required), `excerpt` (text, max 200 chars), `body` (array de blocks + images avec alt/caption), `metaTitle` (string), `metaDescription` (text)
    - Preview : title + date + mainImage
  - [x]5.2 Créer `sanity/schemas/homePage.ts` — Contenu homepage (singleton) :
    - Champs : `heroTitle` (string), `heroSubtitle` (text), `heroCtaPrimary` (string), `heroCtaSecondary` (string), `trustBarItems` (array d'objets : text), `diagnosticTitle` (string), `diagnosticDescription` (text), `ctaBannerTitle` (string), `ctaBannerSubtitle` (string), `ctaBannerButton` (string)
  - [x]5.3 Créer `sanity/schemas/aboutPage.ts` — Page "Qui suis-je" :
    - Champs : `title` (string), `portrait` (image avec alt), `bio` (array de blocks — Portable Text), `qualifications` (array d'objets : title, description), `metaTitle` (string), `metaDescription` (text)
  - [x]5.4 Créer `sanity/schemas/serviceItem.ts` — Prestation individuelle :
    - Champs : `title` (string, required), `icon` (string — nom de l'icône Lucide), `shortDescription` (text — description courte homepage), `longDescription` (array de blocks — description longue accordion), `order` (number — ordre d'affichage)
    - 6 prestations : Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires
  - [x]5.5 Créer `sanity/schemas/missionStep.ts` — Étape de mission :
    - Champs : `title` (string, required), `description` (text), `stepNumber` (number, 1-5, required)
    - 5 étapes : Prise de contact, Consultation, Terrain, Traitement, Restitution
  - [x]5.6 Créer `sanity/schemas/technology.ts` — Technologie/équipement :
    - Champs : `name` (string, required), `category` (string, options: 'logiciel' | 'materiel'), `description` (text), `image` (image avec alt), `order` (number)
  - [x]5.7 Créer `sanity/schemas/siteSettings.ts` — Settings globaux (singleton) :
    - Champs : `cabinetName` (string), `phone` (string), `email` (string), `address` (text), `linkedinUrl` (url), `orderNumber` (string — n° d'inscription Ordre), `metaTitle` (string — title par défaut), `metaDescription` (text — description par défaut), `ogImage` (image)
  - [x]5.8 Créer `sanity/schemas/contactPage.ts` — Page contact :
    - Champs : `title` (string), `introText` (text), `tallyFormId` (string — ID du formulaire Tally contact), `metaTitle` (string), `metaDescription` (text)
  - [x]5.9 Créer `sanity/schemas/index.ts` exportant tous les schémas :
    ```typescript
    import { blogPost } from './blogPost'
    import { homePage } from './homePage'
    import { aboutPage } from './aboutPage'
    import { serviceItem } from './serviceItem'
    import { missionStep } from './missionStep'
    import { technology } from './technology'
    import { siteSettings } from './siteSettings'
    import { contactPage } from './contactPage'

    export const schemaTypes = [
      blogPost, homePage, aboutPage, serviceItem,
      missionStep, technology, siteSettings, contactPage,
    ]
    ```

- [x] Task 6 : Créer les queries GROQ centralisées (AC: #4)
  - [x]6.1 Créer `sanity/lib/queries.ts` avec les queries initiales utilisant `defineQuery` de `next-sanity` :
    - `siteSettingsQuery` — settings globaux (singleton)
    - `homePageQuery` — contenu homepage (singleton)
    - `allServicesQuery` — toutes les prestations triées par `order`
    - `allMissionStepsQuery` — toutes les étapes triées par `stepNumber`
    - `allTechnologiesQuery` — toutes les technologies triées par `order`
    - `aboutPageQuery` — contenu page "Qui suis-je"
    - `contactPageQuery` — contenu page contact
    - `allBlogPostsQuery` — tous les articles publiés triés par date desc
    - `blogPostBySlugQuery` — un article par slug
  - [x]6.2 Chaque query doit utiliser `defineQuery()` pour le support TypeGen
  - [x]6.3 Les queries ne retournent que les champs nécessaires (projection explicite, pas de `*`)

- [x] Task 7 : Configurer le webhook Sanity → Vercel (AC: #5)
  - [x]7.1 Documenter dans un commentaire en haut de `sanity.config.ts` les étapes de configuration du webhook :
    1. Aller dans le dashboard Sanity (manage.sanity.io)
    2. Settings → Webhooks → Add webhook
    3. URL : `https://api.vercel.com/v1/integrations/deploy/...` (Deploy Hook Vercel)
    4. Trigger on : Create, Update, Delete
    5. Filter : aucun (rebuild sur tout changement)
  - [x]7.2 Documenter dans `.env.example` la variable optionnelle `SANITY_WEBHOOK_SECRET` pour sécuriser le webhook (post-MVP)

- [x] Task 8 : Validation finale
  - [x]8.1 `npm run dev` démarre sans erreur
  - [x]8.2 `npm run build` réussit sans erreur
  - [x]8.3 La route `/studio` affiche Sanity Studio (ou la page de login si pas de projet Sanity configuré)
  - [x]8.4 Les 8 types de documents apparaissent dans le menu Studio
  - [x]8.5 Les queries GROQ dans `queries.ts` sont syntaxiquement valides
  - [x]8.6 Aucun import inline de queries GROQ dans les fichiers `page.tsx`

## Dev Notes

### Packages à installer (versions compatibles React 19.2+ / Next.js 16)

```bash
npm install next-sanity @sanity/image-url sanity @portabletext/react
```

- `next-sanity` — toolkit officiel : createClient, NextStudio, defineQuery
- `sanity` — core Sanity : defineType, defineField, defineArrayMember, structureTool
- `@sanity/image-url` — génération URLs images optimisées CDN Sanity
- `@portabletext/react` — rendu Portable Text → React (utilisé Epic 4 mais installé maintenant)

### Architecture & Patterns obligatoires

- **Queries GROQ centralisées** dans `/sanity/lib/queries.ts` — JAMAIS inline dans les composants ou pages
- **Server Components par défaut** — les pages fetchent Sanity et passent les données en props
- **`useCdn: false`** dans le client car SSG (pages pré-rendues au build)
- **`defineQuery()`** de `next-sanity` pour chaque query (support TypeGen)
- **Schémas avec `defineType` / `defineField` / `defineArrayMember`** de `sanity`
- **Images** : toujours champ `alt` required (accessibilité WCAG 2.1 AA)
- **Singletons** (`homePage`, `siteSettings`) : un seul document par type — pas de liste
- **Sanity Studio** dans `/app/studio/[[...tool]]/page.tsx` avec `dynamic = 'force-static'`

### Conventions de nommage Sanity

- Types de document : `camelCase` → `blogPost`, `serviceItem`, `homePage`
- Champs : `camelCase` → `title`, `slug`, `publishedAt`, `mainImage`, `shortDescription`
- Fichiers schémas : `camelCase.ts` → `blogPost.ts`, `serviceItem.ts`
- Slugs/URLs : `kebab-case` → `/blog/combien-coute-un-geometre`

### CSP pour Sanity Studio

Sanity Studio charge ses propres scripts, styles et polices. La route `/studio` doit avoir une CSP permissive. Ajouter dans `next.config.ts` :

```typescript
{
  source: '/studio/:path*',
  headers: [
    {
      key: 'Content-Security-Policy',
      value: "default-src 'self'; frame-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://cdn.sanity.io data: blob:; connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.sanity.io; font-src 'self' data:; media-src 'self' https://cdn.sanity.io",
    },
  ],
}
```

La règle pour `/studio` doit être placée AVANT la règle globale `/(.*)`  dans le tableau `headers()` de `next.config.ts` (Next.js applique la première correspondance).

### Structure de fichiers à créer/modifier

**Nouveaux fichiers :**
```
sanity/env.ts                          # Variables d'environnement typées
sanity/lib/client.ts                   # Client Sanity configuré
sanity/lib/image.ts                    # Helper @sanity/image-url
sanity/lib/queries.ts                  # Queries GROQ centralisées
sanity/schemas/index.ts                # Export de tous les schémas
sanity/schemas/blogPost.ts             # Article de blog
sanity/schemas/homePage.ts             # Contenu homepage (singleton)
sanity/schemas/aboutPage.ts            # Page "Qui suis-je"
sanity/schemas/serviceItem.ts          # Prestation individuelle
sanity/schemas/missionStep.ts          # Étape de mission
sanity/schemas/technology.ts           # Technologie/équipement
sanity/schemas/siteSettings.ts         # Settings globaux (singleton)
sanity/schemas/contactPage.ts          # Page contact
sanity.config.ts                       # Configuration Sanity Studio (RACINE)
app/studio/[[...tool]]/page.tsx        # Route Sanity Studio
```

**Fichiers modifiés :**
```
next.config.ts                         # Ajout CSP permissive pour /studio
.env.example                           # Ajout NEXT_PUBLIC_SANITY_API_VERSION
.env.local                             # Mise à jour avec valeurs Sanity
package.json                           # Nouvelles dépendances
```

**Fichiers supprimés :**
```
sanity/schemas/.gitkeep                # Remplacé par les vrais schémas
sanity/lib/.gitkeep                    # Remplacé par client.ts, image.ts, queries.ts
```

### Pièges techniques critiques

1. **`sanity.config.ts` à la RACINE** — pas dans `/sanity/`. Le `NextStudio` importe depuis la racine.
2. **`dynamic = 'force-static'`** dans la page Studio — recommandé par next-sanity pour la performance.
3. **`export { metadata, viewport } from 'next-sanity/studio'`** — exporter les metadata/viewport fournis par next-sanity pour la page Studio.
4. **CSP Studio vs CSP site** — deux règles distinctes. La CSP restrictive du site (Story 1.1) bloquerait Sanity Studio si appliquée à `/studio`.
5. **Singletons** — `homePage` et `siteSettings` sont des documents uniques. Utiliser `*[_type == "homePage"][0]` dans les queries GROQ.
6. **Pas de `'use client'`** sur la page Studio — `NextStudio` gère le rendu client internement.
7. **Images avec `hotspot: true`** — permet le recadrage dans Studio, essentiel pour le responsive.
8. **Champ `alt` required sur TOUTES les images** — conformité WCAG 2.1 AA, ne pas oublier.

### Intelligence Story 1.1 (story précédente)

- Projet initialisé avec Next.js 16.2.0, React 19.2.4, Tailwind v4
- shadcn/ui v4.0.8 initialisé (style base-nova, cssVariables activé)
- Palette CLBGE en hex dans `:root` (pas d'oklch)
- Tailwind v4 utilise `@theme` dans `globals.css` (PAS de `tailwind.config.ts`)
- Headers CSP déjà configurés dans `next.config.ts` pour Tally, Zcal, Sanity CDN, GA
- Structure de dossiers créée avec `.gitkeep` dans `sanity/schemas/` et `sanity/lib/`
- Import alias `@/*` configuré par défaut
- `components.json` shadcn/ui avec `cssVariables: true`

### Anti-patterns à éviter

- **NE PAS** écrire de queries GROQ inline dans les composants ou pages
- **NE PAS** utiliser `useCdn: true` avec SSG (les données sont fetchées au build, pas besoin de CDN)
- **NE PAS** créer de fichier `sanity.cli.ts` — non nécessaire avec Studio embedded via next-sanity
- **NE PAS** oublier le champ `alt` sur les images (violation WCAG)
- **NE PAS** utiliser `'use client'` sur la page Studio (géré par NextStudio)
- **NE PAS** mettre `sanity.config.ts` dans le dossier `/sanity/` — il doit être à la racine

### Schémas détaillés — Portable Text (rich text)

Pour les champs `body` (blogPost, aboutPage) utiliser :
```typescript
defineField({
  name: 'body',
  title: 'Contenu',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              defineField({ name: 'href', type: 'url', title: 'URL' }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif', validation: (Rule) => Rule.required() }),
        defineField({ name: 'caption', type: 'string', title: 'Légende' }),
      ],
    }),
  ],
})
```

Pas de `h1` dans les styles block — le h1 est le titre de l'article/page, géré séparément.

### References

- [Source: planning-artifacts/architecture.md#Data Architecture] — Sanity comme unique source de données
- [Source: planning-artifacts/architecture.md#Structure Patterns] — Organisation `/sanity/schemas/` et `/sanity/lib/`
- [Source: planning-artifacts/architecture.md#Format Patterns] — Queries GROQ centralisées, nommage camelCase
- [Source: planning-artifacts/architecture.md#Architectural Boundaries] — Frontière Sanity (données)
- [Source: planning-artifacts/epics.md#Story 1.2] — Acceptance criteria originaux
- [Source: planning-artifacts/epics.md#Additional Requirements] — Schémas Sanity, webhook, GROQ centralisées
- [Source: planning-artifacts/ux-design-specification.md#Component Strategy] — Composants custom vs shadcn/ui
- [Source: implementation-artifacts/1-1-*.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Type import `SanityImageSource` : le chemin `@sanity/image-url/lib/types/types` n'existe plus dans la version actuelle. Corrigé en important depuis `@sanity/image-url` directement.
- Studio `force-static` : incompatible avec Next.js 16 + Sanity Studio (React context non disponible au build SSG). Résolu en utilisant `'use client'` sur la page et un layout séparé pour les metadata/viewport.

### Completion Notes List

- Task 1 : 4 packages installés (next-sanity, sanity, @sanity/image-url, @portabletext/react), compatibles React 19.2.4 + Next.js 16.2.0
- Task 2 : `sanity/env.ts` créé avec assertValue typé, `.env.example` et `.env.local` mis à jour avec `NEXT_PUBLIC_SANITY_API_VERSION`
- Task 3 : Client Sanity configuré avec `useCdn: false` (SSG), helper `urlFor()` pour images CDN Sanity avec types corrects
- Task 4 : `sanity.config.ts` à la racine, route Studio `app/studio/[[...tool]]/page.tsx` en `'use client'` + layout séparé pour metadata, CSP permissive pour `/studio` ajoutée avant la CSP restrictive dans `next.config.ts`
- Task 5 : 8 schémas créés (blogPost, homePage, aboutPage, serviceItem, missionStep, technology, siteSettings, contactPage) avec validations, previews, orderings. Tous les champs image ont `alt` required (WCAG). Portable Text configuré avec H2/H3/blockquote/strong/em/link/image.
- Task 6 : 11 queries GROQ centralisées dans `sanity/lib/queries.ts` avec `defineQuery()` — singletons, collections triées, blog avec filtre publishedAt
- Task 7 : Webhook documenté dans `sanity.config.ts`, `SANITY_WEBHOOK_SECRET` ajouté dans `.env.example`
- Task 8 : `npm run build` OK, `npm run lint` OK, route `/studio` rendue en mode dynamique

### Change Log

- 2026-03-19 : Implémentation complète Story 1.2 — Configuration Sanity CMS & Studio
- 2026-03-19 : Code review — 2 corrections appliquées : ogImage.alt required (WCAG), apiVersion retiré de defineConfig()

### File List

- sanity/env.ts (nouveau — variables d'environnement typées)
- sanity/lib/client.ts (nouveau — client Sanity configuré)
- sanity/lib/image.ts (nouveau — helper urlFor @sanity/image-url)
- sanity/lib/queries.ts (nouveau — 11 queries GROQ centralisées)
- sanity/schemas/index.ts (nouveau — export de tous les schémas)
- sanity/schemas/blogPost.ts (nouveau — schéma article de blog)
- sanity/schemas/homePage.ts (nouveau — schéma homepage singleton)
- sanity/schemas/aboutPage.ts (nouveau — schéma page Qui suis-je)
- sanity/schemas/serviceItem.ts (nouveau — schéma prestation)
- sanity/schemas/missionStep.ts (nouveau — schéma étape de mission)
- sanity/schemas/technology.ts (nouveau — schéma technologie/équipement)
- sanity/schemas/siteSettings.ts (nouveau — schéma settings globaux ; review: ogImage.alt → required WCAG)
- sanity/schemas/contactPage.ts (nouveau — schéma page contact)
- sanity.config.ts (nouveau — configuration Sanity Studio racine ; review: apiVersion retiré de defineConfig)
- app/studio/[[...tool]]/page.tsx (nouveau — route Sanity Studio)
- app/studio/[[...tool]]/layout.tsx (nouveau — layout Studio avec metadata)
- next.config.ts (modifié — CSP permissive pour /studio)
- .env.example (modifié — ajout API_VERSION + WEBHOOK_SECRET)
- .env.local (modifié — ajout API_VERSION)
- package.json (modifié — dépendances Sanity)
- package-lock.json (modifié)
- sanity/lib/.gitkeep (supprimé)
- sanity/schemas/.gitkeep (supprimé)
