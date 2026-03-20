# Story 4.1 : Blog côté visiteur — Liste et articles

Status: done

## Story

En tant que visiteur,
Je veux consulter la liste des articles de blog et lire un article individuel,
Afin de m'informer sur le métier de géomètre-expert et les sujets fonciers.

## Acceptance Criteria

1. **Given** je navigue vers `/blog` **When** la page se charge **Then** la liste des articles publiés est affichée avec pour chacun : image principale, titre, date, extrait **And** les articles sont triés par date de publication (plus récent en premier) **And** le contenu est fetché depuis Sanity (query GROQ centralisée dans `/sanity/lib/queries.ts`) au build (SSG)

2. **Given** aucun article n'est publié **When** la page `/blog` se charge **Then** un empty state est affiché : "Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à nous contacter." avec un lien vers `/contact`

3. **Given** je clique sur un article **When** la page `/blog/[slug]` se charge **Then** l'article complet est affiché avec titre, date, image principale, corps rich text (Portable Text rendu en HTML sémantique) **And** le slug est en kebab-case et l'URL est propre (`/blog/combien-coute-un-geometre`) **And** les images de l'article utilisent `@sanity/image-url` avec optimisation CDN Sanity **And** la colonne de lecture est centrée avec max-width 720px

4. **Given** je suis en fin d'article **When** je termine la lecture **Then** un CTA contextuel est affiché : "Besoin d'un géomètre ? Faites le diagnostic en 4 questions" avec un lien vers `/diagnostic`

5. **Given** je suis sur la page blog ou un article **Then** la page exporte `generateMetadata()` avec title et description dynamiques (tirées du contenu Sanity) **And** la structure HTML est sémantique (`<article>`, `<time>`, headings) **And** les pages sont pré-rendues en SSG

## Tasks / Subtasks

- [x] Task 1 : Créer le composant BlogPostCard (AC: #1)
  - [x] 1.1 Créer `components/blog/BlogPostCard.tsx` — Server Component
  - [x] 1.2 Props : `title`, `slug` (string — le slug.current), `publishedAt`, `excerpt`, `mainImage` (avec asset + alt)
  - [x] 1.3 Layout : image en haut (ratio 16:9, `next/image` via `urlFor()`), titre h3, date formatée fr-FR, extrait tronqué
  - [x] 1.4 Lien englobant toute la card vers `/blog/${slug}`
  - [x] 1.5 Hover : border primary + légère élévation (transition)
  - [x] 1.6 Utiliser le composant Card shadcn/ui existant dans `components/ui/card.tsx`
  - [x] 1.7 Fallback si pas d'image : fond `muted-light` avec texte "Image à venir"
  - [x] 1.8 Date formatée avec `Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })`

- [x] Task 2 : Créer la page `/blog` — Liste des articles (AC: #1, #2, #5)
  - [x] 2.1 Créer `app/blog/page.tsx` — Server Component
  - [x] 2.2 Fetcher `allBlogPostsQuery` depuis Sanity avec pattern try/catch + fallback tableau vide
  - [x] 2.3 Titre h1 centré + séparateur rouge (pattern D1) : "Blog" ou "Nos articles"
  - [x] 2.4 Grille d'articles : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
  - [x] 2.5 Empty state si tableau vide : texte "Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à nous contacter." + lien vers `/contact`
  - [x] 2.6 CtaBanner en bas de page : "Besoin d'un géomètre-expert ?" → "Prendre rendez-vous"
  - [x] 2.7 `generateMetadata()` : title "Blog — CLBGE, Géomètre-Expert en Guadeloupe", description dynamique
  - [x] 2.8 Container : `max-w-7xl mx-auto px-4 md:px-8 lg:px-16` (même que les autres pages)

- [x] Task 3 : Améliorer le PortableTextRenderer pour le blog (AC: #3)
  - [x] 3.1 Ajouter le handler pour les images dans le body : `types.image` → `next/image` via `urlFor()` avec `alt`, `caption` optionnelle, `rounded-lg`, centré
  - [x] 3.2 Ajouter le handler pour les liens : `marks.link` → `<a>` avec `href`, `target="_blank"` + `rel="noopener noreferrer"` si externe, couleur primary, underline
  - [x] 3.3 Ajouter le handler pour `blockquote` : bordure gauche primary, fond `muted-light`, padding
  - [x] 3.4 Ajouter le handler pour les listes : `list.bullet` → `<ul>`, `list.number` → `<ol>` avec styles appropriés

- [x] Task 4 : Créer le composant BlogPostContent (AC: #3, #4)
  - [x] 4.1 Créer `components/blog/BlogPostContent.tsx` — Server Component
  - [x] 4.2 Rendu de l'image principale en haut (pleine largeur max-width 720px, `next/image` via `urlFor()`, ratio 16:9, `rounded-lg`)
  - [x] 4.3 Titre h1 de l'article
  - [x] 4.4 Date formatée fr-FR sous le titre avec élément `<time datetime="...">`
  - [x] 4.5 Corps de l'article via `PortableTextRenderer` amélioré
  - [x] 4.6 Colonne de lecture centrée : `max-w-prose mx-auto` (~720px)
  - [x] 4.7 Structure sémantique : wrapper `<article>`

- [x] Task 5 : Créer le CTA contextuel fin d'article (AC: #4)
  - [x] 5.1 Créer `components/blog/BlogCtaEndArticle.tsx` — Server Component
  - [x] 5.2 Contenu : "Besoin d'un géomètre ? Faites le diagnostic en 4 questions"
  - [x] 5.3 Lien vers `/diagnostic`
  - [x] 5.4 Style : fond `muted-light`, border `border`, `rounded-lg`, padding, séparé du contenu article par un `mt-12`
  - [x] 5.5 Button outline "Faire le diagnostic"

- [x] Task 6 : Créer la page `/blog/[slug]` — Article individuel (AC: #3, #4, #5)
  - [x] 6.1 Créer `app/blog/[slug]/page.tsx` — Server Component
  - [x] 6.2 Fetcher `blogPostBySlugQuery` avec le paramètre `slug` depuis les params de la route
  - [x] 6.3 `generateStaticParams()` utilisant `blogPostSlugsQuery` pour pré-rendre tous les articles au build (SSG)
  - [x] 6.4 `generateMetadata()` avec metaTitle/metaDescription depuis Sanity, fallback sur le titre de l'article
  - [x] 6.5 Rendu via `BlogPostContent` + `BlogCtaEndArticle`
  - [x] 6.6 CtaBanner en bas de page
  - [x] 6.7 `notFound()` si aucun article trouvé pour le slug donné
  - [x] 6.8 Container : `max-w-7xl mx-auto px-4 md:px-8 lg:px-16` avec contenu limité à `max-w-prose`

- [x] Task 7 : Validation (AC: tous)
  - [x] 7.1 `npm run build` réussit sans erreur
  - [x] 7.2 `npm run lint` passe
  - [x] 7.3 La page `/blog` affiche l'empty state (pas d'articles dans Sanity)
  - [x] 7.4 La page `/blog` a un h1 unique et exporte `generateMetadata()`
  - [x] 7.5 La page `/blog/[slug]` retourne 404 pour un slug inexistant
  - [x] 7.6 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 7.7 Structure HTML sémantique : `<article>`, `<time>`, headings séquentiels
  - [x] 7.8 Images utilisent `next/image`, pas de `<img>` brut
  - [x] 7.9 CTA contextuel s'affiche en fin d'article avec lien vers `/diagnostic`
  - [x] 7.10 CtaBanner s'affiche sur les deux pages blog

## Dev Notes

### Architecture & Patterns obligatoires

- **Les pages `blog/page.tsx` et `blog/[slug]/page.tsx` sont des Server Components** — Fetch Sanity au build (SSG). Aucun `'use client'` sur ces pages ni les composants blog.
- **Pattern de fetch Sanity** — Suivre exactement le pattern de `app/page.tsx` : try/catch avec vérification de `NEXT_PUBLIC_SANITY_PROJECT_ID`, import dynamique du client et des queries, fallback sur des données vides.
- **Pattern D1** — Titre h1 centré + séparateur rouge : `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- **Container** — `max-w-7xl mx-auto px-4 md:px-8 lg:px-16` pour les pages. Contenu de l'article en `max-w-prose mx-auto` (720px).
- **Tailwind v4** — Pas de `tailwind.config.ts`. Les couleurs et tokens sont en CSS variables dans `globals.css` via `@theme`.
- **Button `render` prop** — shadcn/ui avec @base-ui/react. Utiliser `render={<Link href="..." />}`, PAS `asChild`.
- **Supprimer le `<main>` wrapper** — NE PAS ajouter de `<main>` dans `page.tsx`. Le layout global a déjà `<main id="main-content">`. Utiliser un fragment `<>` ou une `<div>`.

### Queries GROQ — Déjà définies

Toutes les queries nécessaires existent dans `sanity/lib/queries.ts` :

```typescript
// Liste des articles publiés (triés par date desc)
allBlogPostsQuery → _id, title, slug, publishedAt, excerpt, mainImage { asset, alt }

// Article par slug (contenu complet)
blogPostBySlugQuery → _id, title, slug, publishedAt, mainImage, body[], metaTitle, metaDescription

// Slugs pour generateStaticParams
blogPostSlugsQuery → "slug": slug.current
```

**NE PAS créer de nouvelles queries.** Utiliser celles existantes.

### Schéma Sanity `blogPost` — Déjà créé

Champs disponibles :
- `title` (string, 10-100 chars, required)
- `slug` (slug auto-généré, required)
- `publishedAt` (datetime)
- `mainImage` (image + hotspot + alt required)
- `excerpt` (text, max 200 chars)
- `body` (array : blocks h2/h3/normal/blockquote + images avec alt/caption + liens)
- `metaTitle` (string, max 60 chars)
- `metaDescription` (text, max 160 chars)

### PortableTextRenderer — Existant mais à enrichir

Le composant existe dans `components/sanity/PortableTextRenderer.tsx`. Il est `'use client'` et gère :
- `block.normal` → `<p>`
- `block.h2` → `<h2>`
- `block.h3` → `<h3>`
- `marks.strong` → `<strong>`
- `marks.em` → `<em>`

**Il manque et il faut ajouter :**
- `types.image` → `next/image` via `urlFor()` avec alt, caption (si présente), `rounded-lg`
- `marks.link` → `<a>` avec href, styling primary, `target="_blank"` + `rel="noopener noreferrer"` pour les liens externes
- `block.blockquote` → `<blockquote>` avec bordure gauche primary, fond `bg-muted/20`, padding
- `list.bullet` → `<ul>` avec `list-disc`, espacement
- `list.number` → `<ol>` avec `list-decimal`, espacement
- `listItem` → `<li>` avec espacement

**IMPORTANT :** Le composant est `'use client'` car `@portabletext/react` nécessite du client-side rendering. Pour les images dans le body, utiliser une `<img>` standard avec l'URL générée par `urlFor()` (car `next/image` ne fonctionne pas dans un composant `'use client'` sans dimensions statiques). Alternative : créer un composant Image wrapper.

Pour les images dans le body du PortableText, utiliser `urlFor(value).width(720).auto('format').url()` pour générer l'URL optimisée directement depuis le CDN Sanity (WebP automatique). Cela évite le besoin de `next/image` dans le contexte PortableText.

### Image helper — Existant

```typescript
// sanity/lib/image.ts
import { urlFor } from '@/sanity/lib/image'

// Usage pour l'image principale de l'article :
urlFor(post.mainImage).width(1200).height(675).auto('format').url()

// Usage pour les images dans le body :
urlFor(imageBlock).width(720).auto('format').url()
```

L'import de `SanityImageSource` est disponible depuis `@sanity/image-url`.

### Format de date — Pattern

Pas de `lib/formatDate.ts` dans le projet. Utiliser directement `Intl.DateTimeFormat` :

```typescript
function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}
```

Résultat : "19 mars 2026". Utiliser dans un élément `<time datetime={publishedAt}>` pour la sémantique HTML.

### generateStaticParams — Pattern pour le blog

```typescript
export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return [];
    const { client } = await import("@/sanity/lib/client");
    const { blogPostSlugsQuery } = await import("@/sanity/lib/queries");
    const slugs = await client.fetch(blogPostSlugsQuery);
    return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}
```

### generateMetadata pour l'article — Pattern

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) throw new Error();
    const { client } = await import("@/sanity/lib/client");
    const { blogPostBySlugQuery } = await import("@/sanity/lib/queries");
    const post = await client.fetch(blogPostBySlugQuery, { slug });
    if (!post) return { title: "Article introuvable — CLBGE" };
    return {
      title: post.metaTitle || `${post.title} — CLBGE`,
      description: post.metaDescription || `Article : ${post.title}`,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || `Article : ${post.title}`,
        type: "article",
      },
    };
  } catch {
    return { title: "Blog — CLBGE" };
  }
}
```

**IMPORTANT Next.js 16 :** `params` est une Promise. Il faut `await params` avant d'accéder aux propriétés.

### Composant Card shadcn/ui — Existant

Le composant `components/ui/card.tsx` est déjà installé. Exporte : `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`, `CardFooter`. L'utiliser pour `BlogPostCard`.

### Composants existants à RÉUTILISER

- `components/sections/CtaBanner.tsx` — Bandeau CTA (props: title, subtitle, buttonText, href optionnel défaut `/rendez-vous`)
- `components/ui/card.tsx` — Card shadcn/ui
- `components/ui/button.tsx` — Boutons shadcn/ui
- `components/ui/separator.tsx` — Séparateur (si besoin)
- `components/sanity/PortableTextRenderer.tsx` — Rendu rich text (à enrichir)
- `sanity/lib/image.ts` — Helper `urlFor()` pour les images Sanity
- `sanity/lib/client.ts` — Client Sanity

### Pages existantes comme référence

- `app/page.tsx` — Pattern de fetch Sanity avec try/catch et fallback. **C'est LE modèle à suivre.**
- `app/contact/page.tsx` — Pattern D1 (h1 centré + séparateur rouge), `generateMetadata()` avec données Sanity.
- `app/nos-technologies/page.tsx` — Grille de cards avec données Sanity, empty state possible.

### Empty state blog — UX

Le message empty state est défini par le PRD et l'UX : "Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à nous contacter." avec un lien vers `/contact` ou `/diagnostic`. Ton informatif et rassurant, pas d'excuse.

### CTA contextuel fin d'article — UX-DR13

Texte exact : "Besoin d'un géomètre ? Faites le diagnostic en 4 questions" avec lien vers `/diagnostic`. Ce composant est spécifique au blog et apparaît après le contenu de chaque article. Il est distinct du CtaBanner (qui est le bandeau rouge pleine largeur).

### Navigation — Blog déjà référencé

Le lien "Blog" est déjà dans `lib/navigation.ts` (href: `/blog`, label: "Blog"). Pas besoin de modifier la navigation.

### Anti-patterns à éviter

- **NE PAS** créer de nouvelles queries GROQ — elles existent toutes dans `sanity/lib/queries.ts`
- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** ajouter un `<main>` dans page.tsx — déjà dans layout
- **NE PAS** créer de fichier `tailwind.config.ts` — Tailwind v4 utilise `globals.css`
- **NE PAS** utiliser `@apply` dans Tailwind
- **NE PAS** fetch côté client avec `useEffect` pour du contenu Sanity — c'est SSG au build
- **NE PAS** utiliser `<img>` HTML brut — toujours `next/image` (sauf dans PortableTextRenderer `'use client'` où utiliser `urlFor()` avec `<img>`)
- **NE PAS** écrire de queries GROQ inline dans les composants
- **NE PAS** oublier `notFound()` quand un slug n'existe pas dans Sanity
- **NE PAS** oublier `generateStaticParams()` pour `/blog/[slug]`
- **NE PAS** oublier l'attribut `datetime` sur l'élément `<time>`
- **NE PAS** créer de `lib/formatDate.ts` — utiliser `Intl.DateTimeFormat` inline ou dans le composant

### Pièges techniques critiques

1. **Next.js 16 `params` est une Promise** — `const { slug } = await params;` dans `generateMetadata` et dans le composant page. Oublier `await` provoquera une erreur de type.
2. **PortableTextRenderer est `'use client'`** — Il utilise `@portabletext/react`. `next/image` fonctionne mal dans un composant client sans dimensions statiques. Pour les images dans le body, utiliser `<img>` avec `urlFor()` qui génère des URLs CDN Sanity optimisées (WebP auto).
3. **Empty state** — La page `/blog` doit fonctionner même sans aucun article dans Sanity. Le try/catch doit retourner un tableau vide, pas null.
4. **Slug type Sanity** — La query `allBlogPostsQuery` retourne `slug` comme objet `{ current: "le-slug" }`. Extraire `slug.current` pour le lien.
5. **Image principale optionnelle** — Le champ `mainImage` n'a pas de validation `required` dans le schéma. Gérer le cas où il est absent (fallback visuel).
6. **`blogPostBySlugQuery` utilise `$slug`** — Passer `{ slug }` en paramètre au `client.fetch()`, pas `{ slug: slug.current }`.

### Intelligence stories précédentes

- Pattern D1 confirmé : titre h1 centré + séparateur rouge `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- Container `max-w-7xl mx-auto px-4 md:px-8 lg:px-16` pour les pages
- Container `max-w-5xl` pour les pages 2 colonnes, `max-w-3xl` pour les pages 1 colonne centrée
- Tailwind v4, pas de tailwind.config.ts — `@theme` dans globals.css
- Button `render` prop (pas `asChild`) — shadcn/ui v4.0.8 avec @base-ui/react (pas Radix UI)
- Build OK : 11 pages statiques (après story 3.3), lint OK
- CtaBanner : props title, subtitle, buttonText, href (défaut `/rendez-vous`)
- GoogleMapsEmbed : finalement Server Component (pas besoin de `'use client'`)
- Icônes Lucide avec `aria-hidden="true"` quand accompagnées de texte

### Project Structure Notes

- `app/blog/page.tsx` → nouveau (Server Component, liste des articles)
- `app/blog/[slug]/page.tsx` → nouveau (Server Component, article individuel)
- `components/blog/BlogPostCard.tsx` → nouveau (Server Component, card d'article)
- `components/blog/BlogPostContent.tsx` → nouveau (Server Component, contenu article)
- `components/blog/BlogCtaEndArticle.tsx` → nouveau (Server Component, CTA fin d'article)
- `components/sanity/PortableTextRenderer.tsx` → modifié (ajout image, link, blockquote, lists)

### References

- [Source: planning-artifacts/epics.md#Story 4.1] — Acceptance criteria, FR15, FR16, UX-DR13, UX-DR14
- [Source: planning-artifacts/architecture.md#Structure Patterns] — blog/page.tsx, blog/[slug]/page.tsx, components/blog/
- [Source: planning-artifacts/architecture.md#Naming Patterns] — Composants PascalCase, slugs kebab-case
- [Source: planning-artifacts/architecture.md#Format Patterns] — Dates fr-FR, images @sanity/image-url, queries centralisées
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — Server Components par défaut, next/image, generateMetadata()
- [Source: planning-artifacts/ux-design-specification.md#BlogPostCard] — Card article : image, titre, date, extrait, hover élévation
- [Source: planning-artifacts/ux-design-specification.md#BlogPostContent] — Portable Text → HTML sémantique, max-width 720px
- [Source: planning-artifacts/ux-design-specification.md#Empty States] — Blog vide : message + lien contact
- [Source: planning-artifacts/ux-design-specification.md#Content Patterns] — Vouvoiement, CTAs verbes d'action
- [Source: sanity/schemas/blogPost.ts] — Schéma Sanity complet
- [Source: sanity/lib/queries.ts#Blog] — Queries GROQ existantes
- [Source: components/sanity/PortableTextRenderer.tsx] — Composant existant à enrichir
- [Source: implementation-artifacts/3-3-formulaire-de-contact-tally-google-maps.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré. Build et lint passent au premier essai.

### Completion Notes List

- Task 1 : BlogPostCard créé avec Card shadcn/ui, next/image via urlFor(), hover border primary + shadow, fallback image, date Intl.DateTimeFormat fr-FR, lien englobant la card
- Task 2 : Page /blog créée avec fetch Sanity (try/catch + fallback []), pattern D1 (h1 + séparateur rouge), grille responsive 1/2/3 colonnes, empty state avec lien /contact, CtaBanner, generateMetadata()
- Task 3 : PortableTextRenderer enrichi avec types.image (img + urlFor CDN), marks.link (externe/interne), block.blockquote (bordure primary + fond muted), list.bullet/number, listItem
- Task 4 : BlogPostContent créé avec article sémantique, image principale next/image, h1, time datetime, PortableTextRenderer, max-w-prose
- Task 5 : BlogCtaEndArticle créé avec texte diagnostic, lien /diagnostic, Button outline, fond muted/30 + border + rounded-lg + mt-12
- Task 6 : Page /blog/[slug] créée avec generateStaticParams(), generateMetadata() dynamique, notFound(), BlogPostContent + BlogCtaEndArticle + CtaBanner, await params (Next.js 16)
- Task 7 : npm run build OK (13 pages statiques dont /blog et /blog/[slug] SSG), npm run lint OK, structure HTML sémantique vérifiée

### Change Log

- 2026-03-19 : Implémentation complète story 4.1 — Blog côté visiteur (liste + articles)
- 2026-03-19 : Code review — 1 fix appliqué (suppression classe CSS `prose-blog` non définie dans BlogPostContent.tsx), build OK

### File List

- components/blog/BlogPostCard.tsx (nouveau)
- components/blog/BlogPostContent.tsx (nouveau)
- components/blog/BlogCtaEndArticle.tsx (nouveau)
- components/sanity/PortableTextRenderer.tsx (modifié — ajout image, link, blockquote, lists)
- app/blog/page.tsx (nouveau)
- app/blog/[slug]/page.tsx (nouveau)
- components/blog/.gitkeep (supprimé)
