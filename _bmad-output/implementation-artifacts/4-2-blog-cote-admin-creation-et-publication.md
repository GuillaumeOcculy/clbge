# Story 4.2 : Blog côté admin — Création et publication

Status: done

## Story

En tant qu'administrateur (Laurent),
Je veux créer, éditer, prévisualiser et publier des articles de blog sans compétence technique,
Afin de gérer ma stratégie de contenu SEO en autonomie.

## Acceptance Criteria

1. **Given** je suis connecté à Sanity Studio (`/studio`) **When** je crée un nouvel article **Then** je peux remplir : titre, slug (auto-généré depuis le titre), corps rich text, image principale, date de publication, meta SEO (title, description)

2. **Given** je suis dans l'éditeur d'article **When** je mets en forme le contenu **Then** je peux utiliser titres, paragraphes, listes, liens, images et texte en gras/italique sans écrire de code

3. **Given** j'ai rédigé un article **When** je clique sur prévisualiser **Then** je peux voir le rendu de l'article avant publication

4. **Given** j'ai un article prêt **When** je clique sur publier **Then** l'article est publié et le webhook Sanity déclenche un rebuild Vercel **And** l'article apparaît sur `/blog` après le redéploy

5. **Given** j'ai un article publié **When** je clique sur dépublier **Then** l'article n'est plus visible sur le site public après rebuild

6. **Given** je suis dans l'éditeur **When** j'ajoute une image **Then** l'image est uploadée sur le CDN Sanity et optimisée automatiquement

## Tasks / Subtasks

- [x] Task 1 : Configurer la prévisualisation Draft Mode (AC: #3)
  - [x] 1.1 Ajouter `SANITY_API_READ_TOKEN` dans `.env.local` et `.env.example`
  - [x] 1.2 Créer `sanity/lib/token.ts` pour exporter le token serveur
  - [x] 1.3 Créer `app/api/draft-mode/enable/route.ts` avec `defineEnableDraftMode` de `next-sanity/draft-mode`
  - [x] 1.4 Créer `app/api/draft-mode/disable/route.ts` pour désactiver le draft mode
  - [x] 1.5 Ajouter `presentationTool` dans `sanity.config.ts` avec `previewUrl` pointant vers `/api/draft-mode/enable`
  - [x] 1.6 Configurer le `resolve` dans `presentationTool` pour mapper le type `blogPost` vers `/blog/${slug}`

- [x] Task 2 : Adapter les pages blog pour supporter le Draft Mode (AC: #3)
  - [x] 2.1 Modifier `app/blog/page.tsx` — vérifier `draftMode()` et fetcher avec `perspective: 'previewDrafts'` si activé
  - [x] 2.2 Modifier `app/blog/[slug]/page.tsx` — même logique avec `perspective` et `useCdn: false` en draft
  - [x] 2.3 Dans les deux pages, passer `token` au client en draft mode pour pouvoir lire les brouillons
  - [x] 2.4 Ajouter un indicateur visuel discret quand le draft mode est actif (ex: bandeau "Mode prévisualisation")

- [x] Task 3 : Améliorer l'UX du schéma blogPost dans Sanity Studio (AC: #1, #2, #6)
  - [x] 3.1 Ajouter des `group` (fieldsets) au schéma : "Contenu" (title, slug, mainImage, body), "Publication" (publishedAt, excerpt), "SEO" (metaTitle, metaDescription)
  - [x] 3.2 Ajouter des `description` aux champs pour guider Laurent (ex: slug → "URL de l'article, générée automatiquement")
  - [x] 3.3 Ajouter `initialValue` pour `publishedAt` → `new Date().toISOString()` pour pré-remplir la date
  - [x] 3.4 Vérifier que le `body` rich text supporte bien : headings (h2, h3), paragraphs, bold, italic, links, images, blockquote, bullet lists, numbered lists

- [x] Task 4 : Configurer la desk structure pour les articles blog (AC: #1, #3)
  - [x] 4.1 Créer une desk structure custom dans `sanity.config.ts` ou `sanity/deskStructure.ts`
  - [x] 4.2 Ajouter un noeud "Articles de blog" avec icône dédiée, trié par `publishedAt` desc
  - [x] 4.3 Séparer les types de documents en groupes logiques dans le menu latéral Studio (Blog, Pages, Configuration)

- [x] Task 5 : Mettre à jour la CSP pour le Draft Mode (AC: #3)
  - [x] 5.1 Vérifier que `next.config.ts` autorise les appels API Sanity nécessaires au draft mode
  - [x] 5.2 Ajouter `connect-src` pour `*.sanity.io` si nécessaire sur les routes non-studio

- [x] Task 6 : Validation (AC: tous)
  - [x] 6.1 `npm run build` réussit sans erreur
  - [x] 6.2 `npm run lint` passe
  - [x] 6.3 Sanity Studio charge correctement sur `/studio`
  - [x] 6.4 Un article peut être créé avec tous les champs (titre, slug auto, body, image, date, meta SEO)
  - [x] 6.5 Le rich text editor supporte headings, paragraphs, bold, italic, links, images, blockquote, lists
  - [x] 6.6 Le bouton "Preview" dans le Presentation Tool ouvre l'article en draft mode
  - [x] 6.7 L'article en draft mode affiche le contenu non publié sur `/blog/[slug]`
  - [x] 6.8 Publier un article le rend visible (après rebuild ou en vérifiant la query)
  - [x] 6.9 Dépublier un article (Sanity native Unpublish) le retire du site (la query filtre `defined(publishedAt)`)
  - [x] 6.10 Les images sont uploadées sur le CDN Sanity et optimisées automatiquement (natif)
  - [x] 6.11 La desk structure affiche les articles organisés et les autres types de documents

## Dev Notes

### Architecture & Patterns obligatoires

- **Sanity Studio est sur `/studio`** — Le Studio est un composant `'use client'` dans `app/studio/[[...tool]]/page.tsx` utilisant `NextStudio` de `next-sanity/studio`.
- **Schéma blogPost existe déjà** — Tous les champs requis (title, slug, publishedAt, mainImage, excerpt, body, metaTitle, metaDescription) sont définis dans `sanity/schemas/blogPost.ts`. On améliore l'UX, on ne recrée rien.
- **Pattern de fetch Sanity** — Suivre le pattern de `app/page.tsx` : try/catch avec vérification de `NEXT_PUBLIC_SANITY_PROJECT_ID`, import dynamique du client et des queries, fallback sur des données vides.
- **Tailwind v4** — Pas de `tailwind.config.ts`. Les couleurs et tokens sont en CSS variables dans `globals.css` via `@theme`.
- **Supprimer le `<main>` wrapper** — NE PAS ajouter de `<main>` dans `page.tsx`. Le layout global a déjà `<main id="main-content">`.
- **Button `render` prop** — shadcn/ui avec @base-ui/react. Utiliser `render={<Link href="..." />}`, PAS `asChild`.

### Preview / Draft Mode — Approche technique

Le preview utilise le **Draft Mode de Next.js** couplé au **Presentation Tool de Sanity**.

**Flux :**
1. Laurent ouvre un article dans Sanity Studio
2. Le Presentation Tool affiche un iframe du site avec le draft mode activé
3. L'API route `/api/draft-mode/enable` active le draft mode Next.js et authentifie avec un token Sanity
4. Les pages blog détectent `draftMode().isEnabled` et fetchent avec `perspective: 'previewDrafts'`
5. Laurent voit l'article tel qu'il apparaîtra une fois publié

**Implémentation Draft Mode API route :**

```typescript
// app/api/draft-mode/enable/route.ts
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
})
```

```typescript
// app/api/draft-mode/disable/route.ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  (await draftMode()).disable()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
```

**Presentation Tool dans sanity.config.ts :**

```typescript
import { presentationTool } from 'sanity/presentation'

// Ajouter aux plugins :
presentationTool({
  previewUrl: {
    previewMode: {
      enable: '/api/draft-mode/enable',
    },
  },
}),
```

**Modification des pages blog pour le draft mode :**

```typescript
// Pattern à utiliser dans app/blog/page.tsx et app/blog/[slug]/page.tsx
import { draftMode } from 'next/headers'

// Dans la fonction page :
const isDraftMode = (await draftMode()).isEnabled

const posts = await client.fetch(
  allBlogPostsQuery,
  {},
  {
    perspective: isDraftMode ? 'previewDrafts' : 'published',
    useCdn: !isDraftMode,
    ...(isDraftMode ? { token: process.env.SANITY_API_READ_TOKEN } : {}),
  }
)
```

### Token Sanity — Configuration

Le token `SANITY_API_READ_TOKEN` est un **Viewer token** (lecture seule) créé dans le dashboard Sanity (manage.sanity.io → projet → API → Tokens).

```
# .env.local
SANITY_API_READ_TOKEN=sk...  # Viewer token, jamais NEXT_PUBLIC_
```

```
# .env.example — ajouter :
SANITY_API_READ_TOKEN=  # Token API Sanity (Viewer) pour la prévisualisation
```

**IMPORTANT :** Ce token ne doit JAMAIS être préfixé `NEXT_PUBLIC_` — il est server-side uniquement.

### Schéma blogPost — Améliorations UX

Le schéma existe dans `sanity/schemas/blogPost.ts`. Améliorations à faire :

**Groups (fieldsets) :**
```typescript
groups: [
  { name: 'content', title: 'Contenu', default: true },
  { name: 'publication', title: 'Publication' },
  { name: 'seo', title: 'SEO' },
],
```

Puis ajouter `group: 'content'` sur title, slug, mainImage, body ; `group: 'publication'` sur publishedAt, excerpt ; `group: 'seo'` sur metaTitle, metaDescription.

**Descriptions pour guider Laurent :**
- slug → `"URL de l'article. Générée automatiquement depuis le titre."`
- publishedAt → `"Date de publication. L'article apparaîtra sur le site après cette date."`
- excerpt → `"Résumé court affiché dans la liste des articles (max 200 caractères)."`
- metaTitle → `"Titre affiché dans Google (max 60 caractères). Laissez vide pour utiliser le titre de l'article."`
- metaDescription → `"Description affichée dans Google (max 160 caractères)."`
- mainImage → `"Image principale de l'article, affichée en tête d'article et dans la liste du blog."`

**Initial value pour publishedAt :**
```typescript
initialValue: () => new Date().toISOString()
```

### Desk Structure — Organisation du Studio

Actuellement le Studio utilise la structure par défaut (tous les types listés). Créer une structure organisée :

```typescript
// Dans sanity.config.ts, remplacer structureTool() par :
import { structureTool } from 'sanity/structure'

structureTool({
  structure: (S) =>
    S.list()
      .title('Contenu')
      .items([
        S.listItem()
          .title('Articles de blog')
          .icon(/* BookOpen ou similaire */)
          .child(
            S.documentTypeList('blogPost')
              .title('Articles de blog')
              .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
          ),
        S.divider(),
        S.listItem()
          .title('Pages')
          .child(
            S.list()
              .title('Pages')
              .items([
                S.listItem().title('Accueil').child(S.document().schemaType('homePage').documentId('homePage')),
                S.listItem().title('À propos').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                S.listItem().title('Contact').child(S.document().schemaType('contactPage').documentId('contactPage')),
              ])
          ),
        S.divider(),
        S.listItem()
          .title('Services & Contenu')
          .child(
            S.list()
              .title('Services & Contenu')
              .items([
                S.documentTypeListItem('serviceItem').title('Prestations'),
                S.documentTypeListItem('missionStep').title('Étapes de mission'),
                S.documentTypeListItem('technology').title('Technologies'),
              ])
          ),
        S.divider(),
        S.listItem()
          .title('Configuration')
          .child(
            S.document().schemaType('siteSettings').documentId('siteSettings')
          ),
      ]),
}),
```

**IMPORTANT :** Les icônes dans le desk structure utilisent les composants React du module `@sanity/icons` (déjà disponible avec Sanity). Par exemple `BookIcon`, `CogIcon`, `DocumentsIcon`, etc. Chercher les imports dans `@sanity/icons`.

### Publish / Unpublish — Fonctionnement natif Sanity

Le mécanisme de publication/dépublication est **natif dans Sanity Studio** :

- **Publier** : Le bouton "Publish" en bas du document dans Sanity Studio. L'article passe de l'état draft à published. Le client public (sans token) peut alors le lire.
- **Dépublier** : Le menu "..." à côté du bouton Publish → "Unpublish". Le document revient en draft, invisible pour le client public.

La query GROQ existante filtre déjà correctement :
```groq
*[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()]
```

Le client Sanity (`sanity/lib/client.ts`) utilise `useCdn: false` et **pas de token** → il ne voit que les documents publiés. Cela signifie :
- Un article publié (bouton Publish) AVEC `publishedAt` défini → visible sur le site
- Un article non publié (draft) → invisible
- Un article publié sans `publishedAt` → invisible (la query filtre)

**Webhook Sanity → Vercel :**
Le webhook est commenté dans `sanity.config.ts`. Pour le configurer :
1. Aller dans manage.sanity.io → projet → API → Webhooks
2. Créer un webhook pointant vers le Deploy Hook Vercel du projet
3. Déclencher sur : Create, Update, Delete pour le type `blogPost`
4. Cela provoque un rebuild Vercel automatique à chaque publication

Ce webhook est une **configuration manuelle** dans le dashboard Sanity, pas du code. Documenter les étapes dans `.env.example` ou un README.

### Images dans le body — Déjà fonctionnel

L'upload d'images dans le corps de l'article (via le champ `body` rich text) est **natif Sanity** :
- L'éditeur rich text a un bouton "Insert image" (configuré dans le schéma `body` avec `type: 'image'`)
- Les images sont uploadées sur le CDN Sanity automatiquement
- L'optimisation (format, taille) est gérée par le CDN Sanity via `urlFor()`

L'image principale (`mainImage`) est un champ image standard avec hotspot. Upload natif, CDN automatique.

### Fichiers existants à modifier

- `sanity.config.ts` — Ajouter `presentationTool`, custom desk structure
- `sanity/schemas/blogPost.ts` — Ajouter groups, descriptions, initialValue
- `app/blog/page.tsx` — Ajouter support draft mode
- `app/blog/[slug]/page.tsx` — Ajouter support draft mode
- `.env.example` — Ajouter `SANITY_API_READ_TOKEN`

### Fichiers à créer

- `app/api/draft-mode/enable/route.ts` — API route enable draft mode
- `app/api/draft-mode/disable/route.ts` — API route disable draft mode
- `sanity/lib/token.ts` — Export du token (optionnel, peut être inline)

### CSP Headers — Vérification

Le `next.config.ts` a déjà une CSP permissive pour `/studio/:path*` qui autorise `*.sanity.io`. Vérifier que les routes `/api/draft-mode/*` et les pages blog en draft mode peuvent communiquer avec l'API Sanity. Si besoin, ajouter `connect-src https://*.sanity.io` à la CSP générale pour les requêtes draft mode server-side.

**Note :** Les requêtes draft mode sont server-side (Server Components), donc la CSP navigateur ne les bloque pas. Mais vérifier au cas où.

### Composants existants à RÉUTILISER

- `components/blog/BlogPostCard.tsx` — Card article (Server Component)
- `components/blog/BlogPostContent.tsx` — Contenu article (Server Component)
- `components/blog/BlogCtaEndArticle.tsx` — CTA fin d'article
- `components/sections/CtaBanner.tsx` — Bandeau CTA
- `components/sanity/PortableTextRenderer.tsx` — Rendu rich text
- `sanity/lib/client.ts` — Client Sanity
- `sanity/lib/queries.ts` — Queries GROQ (ne pas en créer de nouvelles)
- `sanity/lib/image.ts` — Helper `urlFor()`

### Anti-patterns à éviter

- **NE PAS** créer de nouvelles queries GROQ — les queries existantes suffisent, la différence draft/published est gérée par `perspective`
- **NE PAS** exposer le token Sanity côté client — `SANITY_API_READ_TOKEN` est server-side uniquement, jamais `NEXT_PUBLIC_`
- **NE PAS** recréer le schéma blogPost — l'améliorer avec groups et descriptions
- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** ajouter un `<main>` dans page.tsx — déjà dans layout
- **NE PAS** créer de fichier `tailwind.config.ts` — Tailwind v4 utilise `globals.css`
- **NE PAS** implémenter un système custom de publish/unpublish — utiliser le natif Sanity
- **NE PAS** écrire de queries GROQ inline dans les composants
- **NE PAS** modifier les composants blog de la story 4.1 (BlogPostCard, BlogPostContent, etc.) sauf pour le bandeau draft mode

### Pièges techniques critiques

1. **`defineEnableDraftMode` nécessite `next-sanity/draft-mode`** — Vérifier que le package `next-sanity` est à jour (>= v9). Le projet utilise déjà `next-sanity` pour le Studio.
2. **`presentationTool` import** — Importer depuis `sanity/presentation` (natif dans le package `sanity`), PAS depuis `next-sanity`.
3. **`draftMode()` est async dans Next.js 16** — Utiliser `const { isEnabled } = await draftMode()`.
4. **`perspective: 'previewDrafts'`** — Ce paramètre nécessite un `token` dans les options de fetch. Sans token, Sanity rejette la requête.
5. **Desk structure et Presentation Tool** — Les deux plugins coexistent. `structureTool` pour l'édition de contenu, `presentationTool` pour la preview. Les deux doivent être dans le tableau `plugins`.
6. **Next.js 16 `params` est une Promise** — `const { slug } = await params;` dans `generateMetadata` et dans le composant page.
7. **Le token Sanity doit être un Viewer token** — Créé dans manage.sanity.io → API → Tokens → Add API token → "Viewer" role. NE PAS utiliser un Editor ou Admin token.

### Intelligence story précédente (4.1)

- Pattern D1 confirmé : titre h1 centré + séparateur rouge `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- Container `max-w-7xl mx-auto px-4 md:px-8 lg:px-16` pour les pages
- Tailwind v4, pas de tailwind.config.ts — `@theme` dans globals.css
- Button `render` prop (pas `asChild`) — shadcn/ui v4.0.8 avec @base-ui/react
- Build OK après story 4.1 : 13 pages statiques, lint OK
- CtaBanner : props title, subtitle, buttonText, href (défaut `/rendez-vous`)
- PortableTextRenderer est `'use client'` car `@portabletext/react` nécessite client-side rendering
- Queries GROQ existantes : `allBlogPostsQuery`, `blogPostBySlugQuery`, `blogPostSlugsQuery`
- `blogPost` schema : preview config avec title + publishedAt (fr-FR) + mainImage
- `notFound()` utilisé quand slug inexistant dans `/blog/[slug]`
- `generateStaticParams()` utilisé pour pré-rendre les articles au build
- `generateMetadata()` avec metaTitle/metaDescription depuis Sanity, fallback sur titre
- Code review 4.1 : 1 fix appliqué (suppression classe CSS non définie), build OK

### Project Structure Notes

- `app/api/draft-mode/enable/route.ts` → nouveau (API route draft mode)
- `app/api/draft-mode/disable/route.ts` → nouveau (API route disable draft mode)
- `sanity.config.ts` → modifié (ajout presentationTool, desk structure custom)
- `sanity/schemas/blogPost.ts` → modifié (ajout groups, descriptions, initialValue)
- `app/blog/page.tsx` → modifié (ajout support draft mode)
- `app/blog/[slug]/page.tsx` → modifié (ajout support draft mode)
- `.env.example` → modifié (ajout SANITY_API_READ_TOKEN)

### References

- [Source: planning-artifacts/epics.md#Story 4.2] — Acceptance criteria, FR17-21
- [Source: planning-artifacts/architecture.md#Authentication & Security] — Auth native Sanity
- [Source: planning-artifacts/architecture.md#API & Communication Patterns] — GROQ queries, webhook
- [Source: planning-artifacts/architecture.md#Frontend Architecture] — Server Components par défaut
- [Source: planning-artifacts/architecture.md#Infrastructure & Deployment] — Webhook Sanity → Vercel
- [Source: planning-artifacts/ux-design-specification.md#Parcours 4 — Laurent (admin)] — Workflow publication
- [Source: planning-artifacts/prd.md#Blog & Contenu SEO] — FR17-21
- [Source: sanity/schemas/blogPost.ts] — Schéma existant
- [Source: sanity.config.ts] — Configuration Studio existante
- [Source: next-sanity docs] — defineEnableDraftMode, presentationTool, perspective previewDrafts
- [Source: implementation-artifacts/4-1-blog-cote-visiteur-liste-et-articles.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Presentation Tool "Unable to connect" : manquait `basePath: '/studio'` dans `sanity.config.ts` (le Studio ne savait pas qu'il était monté sur `/studio`) et `<VisualEditing />` dans le layout (pont de communication Studio/iframe)
- CSP bloquait les WebSocket Sanity : `wss://*.sanity.io` et `https://sanity-cdn.com` manquants dans la CSP générale
- `next/image` hostname non configuré : ajout `images.remotePatterns` pour `cdn.sanity.io` dans `next.config.ts`

### Completion Notes List

- Task 1 : Draft Mode configuré avec `defineEnableDraftMode` (next-sanity), `presentationTool` avec `defineLocations` pour le type `blogPost`, token exporté depuis `sanity/lib/token.ts`
- Task 2 : Pages `/blog` et `/blog/[slug]` adaptées avec `draftMode()` async, `perspective: 'previewDrafts'`, token server-side. Composant `DraftModeIndicator` créé (bandeau fixe en bas à gauche avec lien "Quitter")
- Task 3 : Schéma `blogPost` amélioré avec 3 groups (Contenu, Publication, SEO), descriptions françaises sur tous les champs, `initialValue` sur `publishedAt`, listes bullet/numbered ajoutées explicitement au rich text
- Task 4 : Desk structure custom dans `sanity.config.ts` — Articles de blog (BookIcon, tri publishedAt desc), Pages (singleton homePage/aboutPage/contactPage), Services & Contenu, Configuration (siteSettings)
- Task 5 : CSP étendue — ajout `wss://*.sanity.io`, `https://sanity-cdn.com`, `https://*.sanity-cdn.com`, `https://core.sanity-cdn.com` pour le Presentation Tool
- Task 6 : Build OK (14 pages, routes API draft-mode dynamiques), lint OK

### Change Log

- 2026-03-20 : Implémentation complète story 4.2 — Draft Mode, schéma UX, desk structure
- 2026-03-20 : Fix post-test — basePath Studio, VisualEditing, CSP wss/sanity-cdn, images.remotePatterns cdn.sanity.io

### File List

- `app/api/draft-mode/enable/route.ts` — nouveau (API route enable draft mode)
- `app/api/draft-mode/disable/route.ts` — nouveau (API route disable draft mode)
- `sanity/lib/token.ts` — nouveau (export token Sanity Viewer)
- `components/blog/DraftModeIndicator.tsx` — nouveau (bandeau prévisualisation)
- `sanity.config.ts` — modifié (basePath, presentationTool, defineLocations, desk structure custom, icônes @sanity/icons)
- `sanity/schemas/blogPost.ts` — modifié (groups, descriptions, initialValue, listes bullet/numbered)
- `app/layout.tsx` — modifié (ajout VisualEditing conditionnel en draft mode)
- `app/blog/page.tsx` — modifié (draftMode, perspective, token, DraftModeIndicator)
- `app/blog/[slug]/page.tsx` — modifié (draftMode, perspective, token, DraftModeIndicator)
- `next.config.ts` — modifié (images.remotePatterns cdn.sanity.io, CSP wss/sanity-cdn)
- `.env.example` — modifié (ajout SANITY_API_READ_TOKEN)
