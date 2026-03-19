---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
status: 'complete'
completedAt: '2026-03-15'
inputDocuments:
  - planning-artifacts/prd.md
workflowType: 'architecture'
project_name: 'clbge'
user_name: 'Onizuka'
date: '2026-03-15'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
30 FRs en 6 domaines. Architecture principalement frontend : pages statiques de présentation (FR1-5), tunnel de conversion via embeds tiers (FR6-11), formulaire de contact (FR12-14), blog CMS avec back-office complet (FR15-21), navigation responsive (FR22-25), et SEO technique (FR26-30). Aucune FR ne nécessite de logique serveur propriétaire.

**Non-Functional Requirements:**
24 NFRs orientées performance web (LCP < 2.5s, Lighthouse > 90, TTFB < 200ms), sécurité basique (HTTPS, headers, anti-spam), accessibilité (WCAG 2.1 AA), SEO technique (SSG, URLs propres, canoniques), et fiabilité des intégrations tierces (Tally, Zcal Pro, Analytics).

**Scale & Complexity:**

- Primary domain: Frontend / Static Web
- Complexity level: Low
- Estimated architectural components: 6 (pages statiques, blog CMS, formulaire contact, embed Tally, embed Zcal, couche SEO)

### Technical Constraints & Dependencies

- Architecture MPA / SSG imposée par le PRD
- Hébergement Vercel (CDN, CI/CD, HTTPS automatique)
- Domaine clbge.com
- 1 développeur solo, 8 semaines
- Deadline 11 mai 2025
- Dépendances tierces : Tally (formulaire diagnostic), Zcal Pro (RDV + paiement), Google Analytics
- CMS : Sanity (headless CMS, tier gratuit, back-office intégré, CDN images)
- Contenu fourni par le client (textes, logo, 2 portraits). Photos terrain post-MVP.

### Cross-Cutting Concerns Identified

- **SEO** — Impacte toutes les pages : SSG, meta tags dynamiques, sitemap XML, données structurées (LocalBusiness, ProfessionalService), URLs propres
- **Performance** — Impacte tout le frontend : optimisation images (WebP/AVIF, lazy loading, srcset), CSS/JS minimal, CDN Vercel Edge
- **Accessibilité** — Impacte tout le frontend : HTML sémantique, navigation clavier, contrastes, alt text, ARIA
- **Responsive design** — Mobile-first avec breakpoints (< 768px, 768-1024px, > 1024px)

## Starter Template Evaluation

### Primary Technology Domain

Frontend / Static Web (SSG) — Site vitrine multi-pages avec blog CMS headless.

### Starter Options Considered

| Option | Stack | Pour | Contre |
|--------|-------|------|--------|
| `create-next-app` + Sanity manuel | Next.js 16 + Tailwind + TS + Sanity | Contrôle total, apprentissage progressif | Setup manuel |
| `nextjs-sanity-clean` (template officiel) | Next.js 16 + Sanity Studio intégré | Rapide, preview live, drag & drop | Boîte noire, features en trop au départ |
| SanityPress | Next.js 16 + Tailwind 4 + Sanity | Composants prêts | Dépendance communautaire |

### Selected Starter: create-next-app + Sanity manuel

**Rationale :** Développeur backend (Rails) découvrant React/Next.js. Partir d'un projet propre et ajouter Sanity manuellement permet de comprendre chaque couche et de garder le contrôle sur l'architecture.

**Initialization Command:**

```bash
npx create-next-app@latest clbge --yes
```

Defaults : TypeScript, Tailwind CSS, ESLint, App Router, Turbopack.

**Architectural Decisions Provided by Starter:**

- **Language & Runtime :** TypeScript, Node.js 20.9+
- **Styling :** Tailwind CSS (utility-first)
- **Build Tooling :** Turbopack (dev), Webpack (production)
- **Code Organization :** App Router (`/app` directory), layouts, pages, composants
- **Dev Experience :** Hot reload, TypeScript strict, ESLint, import alias `@/*`

### Sanity CMS — Roadmap d'intégration

**MVP (11 mai 2025) :**
- Sanity Studio intégré (back-office pour créer/éditer des articles)
- Schémas blog : article (titre, slug, corps, image, date, meta SEO)
- CDN images Sanity pour l'optimisation automatique
- Webhook Sanity → Vercel rebuild (publication = redéploiement automatique)

**Phase 2 (été 2025) :**
- Visual Editing (Presentation Tool) — Laurent édite directement sur la preview du site
- Live Content API — preview en temps réel avant publication
- Drag & drop pour la mise en page des articles
- Gestion d'images avancée (galeries, recadrage)

**Note :** L'initialisation du projet sera la première story. L'ajout de Sanity (Studio + schémas blog) sera la story suivante.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (bloquantes) :**
- Stack : Next.js 16 + TypeScript + Tailwind CSS + Sanity + Vercel
- Contenu : Tout le contenu (pages + blog) géré dans Sanity
- Formulaires : Tally pour diagnostic ET contact

**Important Decisions (structurantes) :**
- Anti-spam : géré nativement par Tally
- Images : next/image + CDN Sanity
- Rebuild : Webhook Sanity → Vercel redeploy

**Deferred Decisions (post-MVP) :**
- Sanity Visual Editing / Presentation Tool (Phase 2)
- Monitoring avancé (si besoin)
- Captcha (si spam malgré Tally)

### Data Architecture

- **CMS :** Sanity (tier gratuit, hébergé)
- **Contenu pages statiques :** Géré dans Sanity (services, à propos, mission, technologies) — Laurent peut modifier sans développeur
- **Contenu blog :** Géré dans Sanity (articles avec titre, slug, corps rich text, image, date, meta SEO)
- **Base de données custom :** Aucune — Sanity est la seule source de données
- **Cache :** SSG (pages pré-rendues au build). Rebuild déclenché par webhook Sanity → Vercel.

### Authentication & Security

- **Sanity Studio :** Authentification native Sanity (login Google/email). Pas d'auth custom.
- **Visiteurs du site :** Aucune authentification requise (site public)
- **Anti-spam formulaires :** Géré nativement par Tally
- **HTTPS :** Certificat automatique Vercel
- **Headers sécurité :** CSP, X-Frame-Options, X-Content-Type-Options (configurés dans `next.config.js`)

### API & Communication Patterns

- **API Sanity :** GROQ queries pour récupérer le contenu au build (SSG)
- **Formulaires :** Embed Tally (diagnostic + contact) — pas d'API route Next.js
- **RDV :** Embed Zcal Pro — pas d'API route Next.js
- **Analytics :** Google Analytics script async côté client
- **Webhook :** Sanity → Vercel (redeploy on publish)
- **API routes Next.js :** Aucune nécessaire au MVP

### Frontend Architecture

- **State management :** Non nécessaire (pages statiques, pas d'état global)
- **Composants :** React simples, pas de librairie UI. Tailwind pour tout le styling.
- **Routing :** App Router Next.js (file-based routing dans `/app`)
- **Images :** `next/image` pour les assets statiques + `@sanity/image-url` pour les images Sanity
- **Fonts :** `next/font` pour le chargement optimisé
- **Animations :** CSS transitions simples uniquement, pas de librairie d'animation

### Infrastructure & Deployment

- **Hébergement :** Vercel (tier gratuit suffisant)
- **CI/CD :** Push to deploy (Vercel natif, branche main → production)
- **Environments :** Production (clbge.com) + Preview automatique (branches/PR)
- **Domaine :** clbge.com configuré sur Vercel
- **Monitoring :** Vercel Analytics (gratuit) + Google Search Console
- **Rebuild :** Webhook Sanity → Vercel redeploy automatique à chaque publication de contenu

### Decision Impact Analysis

**Séquence d'implémentation :**
1. Init projet Next.js (`create-next-app`)
2. Configuration Sanity (projet, schémas, Studio)
3. Pages statiques avec contenu Sanity
4. Blog (listing + articles)
5. Intégrations (Tally, Zcal Pro, Analytics)
6. SEO (meta, sitemap, données structurées)
7. Formulaire contact (Tally)
8. Polish (responsive, accessibilité, performance)

**Dépendances inter-composants :**
- Les pages statiques ET le blog dépendent de Sanity → Sanity doit être configuré en premier
- Le SEO dépend du contenu → se fait après les pages
- Les intégrations (Tally, Zcal) sont indépendantes → peuvent être faites en parallèle

## Implementation Patterns & Consistency Rules

### Points de conflit potentiels identifiés

7 zones où des agents IA pourraient faire des choix différents sur ce projet.

### Naming Patterns

**Fichiers & Dossiers :**
- Composants React : `PascalCase.tsx` → `HeroSection.tsx`, `ServiceCard.tsx`
- Pages/routes Next.js : `kebab-case` → `/app/nos-services/page.tsx`
- Utilitaires/helpers : `camelCase.ts` → `formatDate.ts`, `sanityClient.ts`
- Schémas Sanity : `camelCase.ts` → `blogPost.ts`, `serviceItem.ts`

**Composants & Variables :**
- Composants React : `PascalCase` → `<NavBar />`, `<BlogPostCard />`
- Fonctions : `camelCase` → `getServices()`, `fetchBlogPosts()`
- Variables : `camelCase` → `blogPosts`, `serviceList`
- Props interfaces : `PascalCase` + `Props` suffix → `ServiceCardProps`
- CSS classes Tailwind : utiliser les classes utilitaires directement, pas de `@apply` sauf pour des patterns très répétés

**Sanity :**
- Types de document : `camelCase` → `blogPost`, `serviceItem`, `homePage`
- Champs : `camelCase` → `title`, `slug`, `publishedAt`, `mainImage`
- Slugs/URLs : `kebab-case` → `/blog/combien-coute-un-geometre`

### Structure Patterns

**Organisation par feature dans `/app` :**
```
/app
  /page.tsx                    # Homepage
  /layout.tsx                  # Layout global (nav + footer)
  /nos-services/page.tsx       # Page services
  /qui-suis-je/page.tsx        # Page à propos
  /contact/page.tsx            # Page contact
  /blog/page.tsx               # Liste articles
  /blog/[slug]/page.tsx        # Article individuel
```

**Composants partagés dans `/components` :**
```
/components
  /ui/                         # Composants réutilisables (Button, Card, etc.)
  /layout/                     # NavBar, Footer, Header
  /sections/                   # Sections de page (HeroSection, ServicesGrid, etc.)
  /blog/                       # Composants blog (BlogPostCard, BlogList, etc.)
```

**Sanity dans `/sanity` :**
```
/sanity
  /schemas/                    # Schémas de contenu
  /lib/                        # Client, queries GROQ, helpers
```

**Assets statiques dans `/public` :**
```
/public
  /images/                     # Images statiques (logo, icônes)
  /fonts/                      # Fonts custom (si pas next/font)
```

**Tests : co-localisés** (si ajoutés) → `ComponentName.test.tsx` à côté du composant.

### Format Patterns

**Sanity GROQ Queries :**
- Toujours définir les queries dans `/sanity/lib/queries.ts`
- Nommer les queries en `camelCase` avec suffixe descriptif → `allBlogPostsQuery`, `homePageQuery`
- Ne jamais écrire de queries GROQ inline dans les composants

**Dates :**
- Stockage Sanity : ISO 8601 (`2025-05-11T00:00:00Z`)
- Affichage : format français (`11 mai 2025`) via `Intl.DateTimeFormat('fr-FR')`

**Images :**
- Images statiques (logo, icônes) : `next/image` avec import depuis `/public`
- Images Sanity (blog, contenu) : `@sanity/image-url` pour générer les URLs optimisées
- Toujours fournir `alt`, `width`, `height` (ou `fill`)

### Process Patterns

**Error Handling :**
- Pages : utiliser `error.tsx` (App Router error boundaries) par route
- Fetch Sanity : try/catch avec fallback gracieux (afficher contenu par défaut si Sanity indisponible)
- Pas de crash visible pour l'utilisateur — toujours un fallback

**Loading States :**
- Utiliser `loading.tsx` (App Router) pour les pages avec fetch dynamique
- Pour le SSG pur : pas de loading state nécessaire (pages pré-rendues)
- Embeds Tally/Zcal : afficher un placeholder pendant le chargement de l'iframe

**SEO :**
- Chaque `page.tsx` exporte une fonction `generateMetadata()` pour les meta tags dynamiques
- Sitemap généré via `/app/sitemap.ts`
- Données structurées JSON-LD injectées dans le layout ou les pages

### Enforcement Guidelines

**Tous les agents IA DOIVENT :**
- Suivre les conventions de nommage ci-dessus sans exception
- Placer les queries GROQ dans `/sanity/lib/queries.ts`, jamais inline
- Utiliser `next/image` pour toutes les images, jamais de `<img>` HTML brut
- Exporter `generateMetadata()` dans chaque `page.tsx`
- Utiliser Tailwind pour tout le styling, pas de CSS custom sauf cas exceptionnel
- Écrire les composants en tant que fonctions (pas de classes React)
- Utiliser les Server Components par défaut, `'use client'` uniquement si nécessaire (embeds, interactions)

**Anti-patterns à éviter :**
- `@apply` excessif dans Tailwind (préférer les classes utilitaires)
- CSS modules ou styled-components (on utilise Tailwind exclusivement)
- Queries GROQ dans les composants
- `<img>` au lieu de `next/image`
- `useEffect` + `fetch` côté client pour du contenu qui peut être SSG
- `'use client'` sur des composants qui n'en ont pas besoin

## Project Structure & Boundaries

### Complete Project Directory Structure

```
clbge/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── .env.local                          # NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN, etc.
├── .env.example                        # Template des variables d'environnement
├── .gitignore
│
├── public/
│   ├── images/
│   │   ├── logo.svg                    # Logo CLBGE
│   │   ├── portrait-laurent.jpg        # Photo portrait
│   │   └── og-image.jpg               # Image Open Graph par défaut
│   ├── favicon.ico
│   └── robots.txt
│
├── sanity/
│   ├── schemas/
│   │   ├── index.ts                    # Export de tous les schémas
│   │   ├── blogPost.ts                 # Article de blog
│   │   ├── homePage.ts                 # Contenu homepage
│   │   ├── aboutPage.ts               # Contenu "Qui suis-je"
│   │   ├── serviceItem.ts             # Prestation individuelle
│   │   ├── missionStep.ts             # Étape de mission (1-5)
│   │   ├── technology.ts              # Technologie/équipement
│   │   ├── siteSettings.ts            # Settings globaux (coordonnées, réseaux sociaux)
│   │   └── contactPage.ts             # Contenu page contact
│   ├── lib/
│   │   ├── client.ts                   # Client Sanity configuré
│   │   ├── queries.ts                  # Toutes les queries GROQ
│   │   └── image.ts                    # Helper @sanity/image-url
│   └── sanity.config.ts                # Configuration Sanity Studio
│
├── app/
│   ├── globals.css                     # Tailwind base + custom CSS minimal
│   ├── layout.tsx                      # Layout global (NavBar + Footer + metadata par défaut)
│   ├── page.tsx                        # Homepage
│   ├── sitemap.ts                      # Sitemap XML dynamique
│   ├── not-found.tsx                   # Page 404 custom
│   ├── error.tsx                       # Error boundary global
│   │
│   ├── nos-services/
│   │   └── page.tsx                    # Page services (FR3)
│   │
│   ├── qui-suis-je/
│   │   └── page.tsx                    # Page à propos (FR2)
│   │
│   ├── notre-mission/
│   │   └── page.tsx                    # Déroulement mission 5 étapes (FR4)
│   │
│   ├── nos-technologies/
│   │   └── page.tsx                    # Équipements et logiciels (FR5)
│   │
│   ├── diagnostic/
│   │   └── page.tsx                    # Page avec embed Tally diagnostic (FR6-7)
│   │
│   ├── rendez-vous/
│   │   └── page.tsx                    # Page avec embed Zcal Pro (FR8-9)
│   │
│   ├── contact/
│   │   └── page.tsx                    # Page contact avec embed Tally (FR13-14)
│   │
│   ├── blog/
│   │   ├── page.tsx                    # Liste des articles (FR15)
│   │   └── [slug]/
│   │       └── page.tsx                # Article individuel (FR16)
│   │
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx                # Sanity Studio embedded (FR17-21)
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx                  # Navigation principale (FR22-23)
│   │   ├── Footer.tsx                  # Footer avec coordonnées (FR12)
│   │   ├── MobileMenu.tsx              # Menu hamburger mobile (FR23)
│   │   └── CtaButton.tsx               # CTA "Prendre RDV" global (FR24)
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx             # Hero homepage (FR1)
│   │   ├── ServicesGrid.tsx            # Grille des services (FR3)
│   │   ├── MissionSteps.tsx            # 5 étapes de mission (FR4)
│   │   ├── TechnologyShowcase.tsx      # Technologies et équipements (FR5)
│   │   ├── ZoneIntervention.tsx        # Zone d'intervention archipel (FR25)
│   │   └── AboutPreview.tsx            # Preview profil Laurent (FR2)
│   │
│   ├── blog/
│   │   ├── BlogPostCard.tsx            # Card article dans la liste
│   │   ├── BlogPostList.tsx            # Liste paginée d'articles
│   │   └── BlogPostContent.tsx         # Rendu rich text d'un article
│   │
│   ├── embeds/
│   │   ├── TallyEmbed.tsx              # Composant embed Tally réutilisable
│   │   └── ZcalEmbed.tsx               # Composant embed Zcal Pro
│   │
│   ├── seo/
│   │   ├── JsonLd.tsx                  # Données structurées (FR29)
│   │   └── MetaTags.tsx                # Helper meta tags (FR27)
│   │
│   └── ui/
│       ├── Button.tsx                  # Bouton réutilisable
│       ├── Card.tsx                    # Card réutilisable
│       ├── SectionHeading.tsx          # Titre de section
│       └── Skeleton.tsx                # Placeholder loading embeds
│
├── lib/
│   ├── utils.ts                        # Utilitaires généraux
│   └── formatDate.ts                   # Formatage dates en français
│
└── types/
    ├── sanity.ts                       # Types générés/manuels pour Sanity
    └── index.ts                        # Types partagés
```

### Architectural Boundaries

**Frontière Sanity (données) :**
- Tout le contenu passe par `sanity/lib/queries.ts` → queries GROQ centralisées
- Le client Sanity (`sanity/lib/client.ts`) est le seul point d'accès aux données
- Les composants ne font jamais de queries directement — les pages (`page.tsx`) fetchent et passent les données en props

**Frontière Embeds (tiers) :**
- Tally et Zcal sont encapsulés dans `components/embeds/` — composants `'use client'`
- Le reste du site est en Server Components (SSG)
- Isolation : si un embed échoue, le reste de la page fonctionne (fallback lien externe)

**Frontière SEO :**
- Chaque `page.tsx` gère ses propres `generateMetadata()`
- Les données structurées JSON-LD sont dans `components/seo/JsonLd.tsx`
- Le sitemap est généré dynamiquement dans `app/sitemap.ts`

### Requirements → Structure Mapping

| FR | Composant/Fichier |
|----|-------------------|
| FR1 (comprendre services) | `app/page.tsx` + `components/sections/HeroSection.tsx` |
| FR2 (profil Laurent) | `app/qui-suis-je/page.tsx` |
| FR3 (services détaillés) | `app/nos-services/page.tsx` + `components/sections/ServicesGrid.tsx` |
| FR4 (5 étapes mission) | `app/notre-mission/page.tsx` + `components/sections/MissionSteps.tsx` |
| FR5 (technologies) | `app/nos-technologies/page.tsx` + `components/sections/TechnologyShowcase.tsx` |
| FR6-7 (diagnostic Tally) | `app/diagnostic/page.tsx` + `components/embeds/TallyEmbed.tsx` |
| FR8-9 (RDV Zcal) | `app/rendez-vous/page.tsx` + `components/embeds/ZcalEmbed.tsx` |
| FR10-11 (notifications) | Natif Tally + Zcal (pas de code) |
| FR12 (coordonnées) | `components/layout/Footer.tsx` |
| FR13-14 (contact) | `app/contact/page.tsx` + `components/embeds/TallyEmbed.tsx` |
| FR15-16 (blog) | `app/blog/page.tsx` + `app/blog/[slug]/page.tsx` |
| FR17-21 (CMS blog) | `app/studio/[[...tool]]/page.tsx` (Sanity Studio) |
| FR22-24 (navigation) | `components/layout/NavBar.tsx` + `CtaButton.tsx` |
| FR25 (zone intervention) | `components/sections/ZoneIntervention.tsx` |
| FR26-30 (SEO) | `generateMetadata()` + `app/sitemap.ts` + `components/seo/` |

### Data Flow

```
Sanity CMS (cloud)
    │
    ├── [Build time] GROQ queries → SSG pages pré-rendues
    │       │
    │       └── Vercel CDN → Visiteur
    │
    └── [Publish] Webhook → Vercel redeploy

Tally (cloud) ← [Embed iframe] ← Visiteur
    │
    └── Notification email → Laurent

Zcal Pro (cloud) ← [Embed/lien] ← Visiteur
    │
    └── Notification email → Laurent
```

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility :** Aucun conflit détecté.
- Next.js 16 + Tailwind + TypeScript + Sanity + Vercel = stack éprouvé et nativement compatible
- App Router SSG + Sanity GROQ au build = pattern standard, bien documenté
- Embeds tiers (Tally, Zcal) isolés en `'use client'` → pas d'interférence avec le SSG

**Pattern Consistency :** Cohérent.
- Naming : camelCase partout (variables, fonctions, schémas Sanity), PascalCase pour les composants, kebab-case pour les routes/slugs
- Structure : organisation claire par feature dans `/app`, composants partagés dans `/components`
- Queries : centralisées dans `sanity/lib/queries.ts`, jamais inline

**Structure Alignment :** La structure projet supporte toutes les décisions architecturales sans contradiction.

### Requirements Coverage Validation

**Functional Requirements (30 FRs) :** Couverture 100%

| Statut | FRs | Détail |
|--------|-----|--------|
| Via code | FR1-5, FR12, FR15-16, FR22-30 | Composants React + pages Next.js |
| Via Sanity | FR17-21 | Sanity Studio embedded |
| Via Tally | FR6-7, FR10, FR13-14 | Embed + notifications natives |
| Via Zcal | FR8-9, FR11 | Embed + notifications natives |

**Non-Functional Requirements (24 NFRs) :** Couverture 100%

| NFR | Support architectural |
|-----|----------------------|
| Performance (NFR1-6) | SSG + CDN Vercel + next/image + Tailwind minimal |
| Sécurité (NFR7-11) | HTTPS Vercel + auth Sanity native + Tally anti-spam |
| Accessibilité (NFR12-17) | HTML sémantique, Tailwind contrastes, next/image alt |
| SEO (NFR18-21) | SSG + generateMetadata() + sitemap.ts + JSON-LD |
| Intégrations (NFR22-24) | Composants embed isolés avec fallback |

### Implementation Readiness Validation

**Decision Completeness :** Complète. Stack, patterns, structure, et séquence d'implémentation documentés.

**Structure Completeness :** Complète. Chaque fichier et dossier défini avec rôle et FRs associées.

**Pattern Completeness :** Complète pour ce niveau de complexité.

### Gap Analysis Results

**Gaps critiques :** Aucun.

**Gaps importants :**
- Schémas Sanity détaillés → définis pendant l'implémentation (non bloquant)
- Design system (couleurs, typographie) → défini au moment du design (acceptable pour complexité low)

**Gaps mineurs :**
- Pas de stratégie de tests formalisée (acceptable pour site vitrine MVP)
- Pas de monitoring d'erreurs dédié (Vercel Analytics suffit au MVP)

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Contexte projet analysé
- [x] Complexité évaluée (low)
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales documentées

**Architectural Decisions**
- [x] Stack complet spécifié
- [x] Données : tout dans Sanity (pages + blog)
- [x] Formulaires : tout dans Tally
- [x] RDV : Zcal Pro embed
- [x] Pas d'API routes, pas de backend custom

**Implementation Patterns**
- [x] Conventions de nommage établies
- [x] Patterns de structure définis
- [x] Patterns SEO documentés
- [x] Anti-patterns listés

**Project Structure**
- [x] Arborescence complète définie
- [x] Frontières composants établies
- [x] Points d'intégration documentés
- [x] Mapping FR → fichiers complet

### Architecture Readiness Assessment

**Overall Status : READY FOR IMPLEMENTATION**

**Confidence Level : High**

**Forces :**
- Architecture simple et cohérente — pas de sur-ingénierie
- Stack éprouvé et bien documenté
- Zéro backend custom = zéro dette technique côté serveur
- 100% des FRs et NFRs couvertes
- Mapping FR → fichier explicite pour guider les agents IA

**Améliorations futures (post-MVP) :**
- Sanity Visual Editing / Presentation Tool (Phase 2)
- Design tokens formalisés
- Tests automatisés
- Monitoring d'erreurs dédié (Sentry si nécessaire)

### Implementation Handoff

**Directives pour les agents IA :**
- Suivre toutes les décisions architecturales exactement comme documentées
- Utiliser les patterns d'implémentation de manière consistante
- Respecter la structure projet et les frontières
- Se référer à ce document pour toute question architecturale

**Première priorité d'implémentation :**
```bash
npx create-next-app@latest clbge --yes
```
