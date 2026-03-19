# Story 1.1 : Initialisation du projet Next.js + shadcn/ui + Design System

Status: ready-for-dev

## Story

En tant que développeur,
Je veux initialiser le projet avec Next.js, shadcn/ui et les design tokens CLBGE,
Afin de disposer d'un socle technique cohérent visuellement pour construire le site.

## Acceptance Criteria

1. **Given** aucun projet n'existe **When** le projet est initialisé avec `npx create-next-app@latest clbge --yes` et `npx shadcn@latest init` **Then** le projet démarre en dev sans erreur avec TypeScript, Tailwind CSS, ESLint, App Router

2. **Given** le projet est initialisé **When** je consulte la configuration Tailwind **Then** les design tokens CLBGE sont définis via la directive `@theme` dans le CSS (colors: primary `#B5342B`, primary-hover `#922A23`, text `#2D2D3F`, background `#F5F0EB`, surface `#FFFFFF`, border `#C0B8B0`, muted `#6B6B7B`, muted-light `#E8E3DD`)

3. **Given** le projet est initialisé **When** je consulte `globals.css` **Then** les CSS variables shadcn/ui utilisent la palette CLBGE

4. **Given** le projet est initialisé **When** je consulte la configuration typographique **Then** Inter est configuré via `next/font/google` avec l'échelle typographique (h1 32/48px, h2 28/36px, h3 20/24px, body 16/18px)

5. **Given** le projet est initialisé **When** je consulte la racine du projet **Then** le fichier `.env.example` documente les variables d'environnement requises (NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN, etc.)

6. **Given** le projet est initialisé **When** je consulte `next.config.ts` **Then** les headers de sécurité sont configurés (CSP, X-Frame-Options, X-Content-Type-Options)

7. **Given** le projet est initialisé **When** je consulte la structure de dossiers **Then** elle suit l'architecture définie (`/components/ui/`, `/components/layout/`, `/components/sections/`, `/components/blog/`, `/components/embeds/`, `/components/seo/`, `/sanity/schemas/`, `/sanity/lib/`, `/lib/`, `/types/`)

## Tasks / Subtasks

- [ ] Task 1 : Initialiser le projet Next.js (AC: #1)
  - [ ] 1.1 Exécuter `npx create-next-app@latest clbge --yes`
  - [ ] 1.2 Vérifier que le projet démarre en dev (`npm run dev`) sans erreur
  - [ ] 1.3 Nettoyer le boilerplate par défaut (page.tsx, globals.css) — supprimer le contenu démo, conserver la structure

- [ ] Task 2 : Initialiser shadcn/ui (AC: #1, #3)
  - [ ] 2.1 Exécuter `npx shadcn@latest init` (choisir le style "default", couleur de base neutre — on override ensuite)
  - [ ] 2.2 Vérifier que `components.json` est créé et que `cssVariables: true` est activé
  - [ ] 2.3 Installer les composants shadcn/ui nécessaires pour Epic 1 : `npx shadcn@latest add button sheet navigation-menu skeleton separator accordion`

- [ ] Task 3 : Configurer les design tokens CLBGE dans Tailwind v4 (AC: #2, #3)
  - [ ] 3.1 Configurer les couleurs CLBGE via `@theme` dans `globals.css` (PAS dans un fichier `tailwind.config.ts` — Tailwind v4 utilise la config CSS)
  - [ ] 3.2 Mapper les CSS variables shadcn/ui vers la palette CLBGE
  - [ ] 3.3 Configurer les couleurs sémantiques (destructive `#DC2626`, success `#16A34A`, ring/focus `#B5342B`)
  - [ ] 3.4 Configurer border-radius par défaut à `rounded-lg` (8px)
  - [ ] 3.5 Vérifier que max-width container est 1200px

- [ ] Task 4 : Configurer la typographie Inter (AC: #4)
  - [ ] 4.1 Configurer Inter via `next/font/google` dans `layout.tsx`
  - [ ] 4.2 Définir l'échelle typographique via des classes utilitaires ou `@theme` dans le CSS
  - [ ] 4.3 Vérifier le rendu Inter sur la page d'accueil (pas de FOUT)

- [ ] Task 5 : Configurer les headers de sécurité (AC: #6)
  - [ ] 5.1 Ajouter dans `next.config.ts` les headers : Content-Security-Policy, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff)
  - [ ] 5.2 La CSP doit autoriser les iframes Tally (`tally.so`) et Zcal (`zcal.co`) — prévoir les directives `frame-src`
  - [ ] 5.3 Vérifier que les headers sont présents dans la réponse HTTP en dev

- [ ] Task 6 : Créer la structure de dossiers (AC: #7)
  - [ ] 6.1 Créer les dossiers vides avec fichiers `.gitkeep` ou `index.ts` :
    - `/components/layout/`
    - `/components/sections/`
    - `/components/blog/`
    - `/components/embeds/`
    - `/components/seo/`
    - `/sanity/schemas/`
    - `/sanity/lib/`
    - `/lib/`
    - `/types/`
    - `/public/images/`
  - [ ] 6.2 `/components/ui/` est déjà créé par shadcn/ui — vérifier qu'il existe

- [ ] Task 7 : Créer le fichier `.env.example` (AC: #5)
  - [ ] 7.1 Créer `.env.example` avec les variables documentées :
    ```
    # Sanity CMS
    NEXT_PUBLIC_SANITY_PROJECT_ID=
    NEXT_PUBLIC_SANITY_DATASET=production
    SANITY_API_TOKEN=

    # Site
    NEXT_PUBLIC_SITE_URL=https://clbge.com

    # Google Analytics (Epic 5)
    NEXT_PUBLIC_GA_MEASUREMENT_ID=
    ```
  - [ ] 7.2 Créer `.env.local` avec les mêmes variables (valeurs vides ou de dev) et vérifier qu'il est dans `.gitignore`

- [ ] Task 8 : Validation finale
  - [ ] 8.1 `npm run dev` démarre sans erreur
  - [ ] 8.2 `npm run build` réussit sans erreur
  - [ ] 8.3 Les couleurs CLBGE sont visibles si on utilise `bg-primary` ou `text-primary` dans une page test
  - [ ] 8.4 Inter est chargé correctement (vérifier dans les DevTools)

## Dev Notes

### Architecture & Patterns obligatoires

- **Server Components par défaut** — `'use client'` uniquement pour les embeds et interactions (pas dans cette story)
- **App Router** — tout dans `/app`, file-based routing
- **Import alias** — `@/*` configuré par défaut par create-next-app
- **Pas de `tailwind.config.ts`** — Tailwind v4 utilise la configuration CSS via `@theme` directive dans `globals.css`
- **Pas de `@tailwind base/components/utilities`** — utiliser `@import "tailwindcss"` (Tailwind v4)

### Conventions de nommage

- Composants React : `PascalCase.tsx` (ex: `HeroSection.tsx`)
- Pages/routes Next.js : `kebab-case` (ex: `/nos-services/page.tsx`)
- Utilitaires : `camelCase.ts` (ex: `formatDate.ts`)
- Schémas Sanity : `camelCase.ts` (ex: `blogPost.ts`)
- Props interfaces : `PascalCase` + `Props` suffix (ex: `ServiceCardProps`)

### Palette CLBGE complète

| Rôle | Hex | CSS Variable |
|------|-----|-------------|
| Primary (rouge profond) | `#B5342B` | `--primary` |
| Primary hover | `#922A23` | `--primary-hover` |
| Text (anthracite) | `#2D2D3F` | `--foreground` |
| Background (crème) | `#F5F0EB` | `--background` |
| Surface (blanc) | `#FFFFFF` | `--card` |
| Border (gris clair) | `#C0B8B0` | `--border` |
| Muted (gris moyen) | `#6B6B7B` | `--muted-foreground` |
| Muted light | `#E8E3DD` | `--muted` |
| Destructive | `#DC2626` | `--destructive` |
| Success | `#16A34A` | — |
| Ring/Focus | `#B5342B` | `--ring` |

### Échelle typographique Inter

| Élément | Mobile | Desktop | Weight | Line-height |
|---------|--------|---------|--------|-------------|
| h1 | 32px (2rem) | 48px (3rem) | 700 | 1.2 |
| h2 | 28px (1.75rem) | 36px (2.25rem) | 600 | 1.3 |
| h3 | 20px (1.25rem) | 24px (1.5rem) | 600 | 1.4 |
| body | 16px (1rem) | 18px (1.125rem) | 400 | 1.6 |
| small | 14px (0.875rem) | 14px | 400 | 1.5 |
| caption | 12px (0.75rem) | 13px | 500 | 1.4 |
| CTA button | 16px (1rem) | 16px | 600 | 1 |

### Spacing & Layout

- Unité de base : 4px
- Max-width container : 1200px
- Padding latéral : 16px mobile / 32px tablette / 64px desktop
- Border-radius par défaut : `rounded-lg` (8px)
- Breakpoints : `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px (Tailwind defaults)

### Headers de sécurité — Directives CSP

La Content-Security-Policy doit inclure :
- `frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co` (embeds Tally et Zcal pour Epic 3)
- `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://*.google-analytics.com https://*.googletagmanager.com` (Tally scripts + GA pour Epic 5)
- `img-src 'self' https://cdn.sanity.io data:` (images Sanity pour Epic 2+)
- `connect-src 'self' https://*.sanity.io https://*.google-analytics.com`

### Pièges techniques critiques (Next.js 16 + Tailwind v4)

1. **NE PAS créer de fichier `tailwind.config.ts`** — Tailwind v4 utilise la config CSS via `@theme`. Le fichier `tailwind.config.ts` n'est plus utilisé.
2. **NE PAS utiliser `@tailwind base; @tailwind components; @tailwind utilities;`** — Utiliser `@import "tailwindcss"` à la place.
3. **NE PAS utiliser `bg-gradient-to-*`** — Renommé en `bg-linear-to-*` dans Tailwind v4.
4. **Async Request APIs obligatoires dans Next.js 16** — `cookies()`, `headers()`, `params`, `searchParams` doivent être `await`ed. Pas de destructuration synchrone.
5. **React 19.2+ requis** — Sanity Studio v5 exige React 19.2+. `create-next-app` l'installe par défaut.
6. **Turbopack est le build tool par défaut** — Pas de config webpack custom sauf nécessité absolue.

### Anti-patterns à éviter

- `@apply` excessif dans Tailwind (préférer les classes utilitaires directement)
- CSS modules ou styled-components (on utilise Tailwind exclusivement)
- `<img>` au lieu de `next/image`
- `useEffect` + `fetch` côté client pour du contenu SSG
- `'use client'` sur des composants qui n'en ont pas besoin

### Project Structure Notes

- Structure alignée avec l'architecture documentée dans `planning-artifacts/architecture.md`
- Le dossier `/components/ui/` est géré par shadcn/ui (ne pas y mettre de composants custom non-shadcn)
- Les composants custom vont dans `/components/layout/`, `/components/sections/`, etc.
- `/sanity/` sera peuplé dans la Story 1.2 (Configuration Sanity CMS)

### References

- [Source: planning-artifacts/architecture.md#Selected Starter] — Commande d'init et stack
- [Source: planning-artifacts/architecture.md#Implementation Patterns] — Conventions de nommage et anti-patterns
- [Source: planning-artifacts/architecture.md#Project Structure] — Arborescence complète
- [Source: planning-artifacts/ux-design-specification.md#Design System Foundation] — shadcn/ui, palette, typographie
- [Source: planning-artifacts/ux-design-specification.md#Color System] — Palette complète avec contrastes WCAG
- [Source: planning-artifacts/ux-design-specification.md#Typography System] — Échelle typographique Inter
- [Source: planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation] — Tokens d'espacement
- [Source: planning-artifacts/epics.md#Story 1.1] — Acceptance criteria originaux

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
