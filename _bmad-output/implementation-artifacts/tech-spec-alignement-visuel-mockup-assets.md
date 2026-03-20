---
title: 'Alignement visuel maquette & assets réels'
slug: 'alignement-visuel-mockup-assets'
created: '2026-03-20'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: [Next.js 16, Tailwind CSS, shadcn/ui, next/image, lucide-react]
files_to_modify:
  - components/layout/NavBar.tsx
  - components/layout/NavLinks.tsx
  - components/layout/Footer.tsx
  - components/sections/HeroSection.tsx
  - components/sections/TrustBar.tsx
  - components/sections/ServicesGrid.tsx
  - components/sections/MissionSteps.tsx
  - components/sections/DiagnosticSection.tsx
  - components/sections/CtaBanner.tsx
  - public/images/ (assets)
code_patterns:
  - Tailwind utility classes for all styling
  - shadcn/ui components with CVA variants
  - next/image for all images
  - Server Components by default
  - navigationMenuTriggerStyle() causes button-like nav links
test_patterns:
  - Playwright E2E tests in tests/ directory
  - npm run test:e2e (124 tests)
  - npm run build + npm run lint for validation
---

# Tech-Spec: Alignement visuel maquette & assets réels

**Created:** 2026-03-20

## Overview

### Problem Statement

Des écarts visuels existent entre la maquette HTML (`_bmad-output/planning-artifacts/ux-design-directions.html`) et le rendu final du site. Les liens de navigation du header apparaissent comme des boutons avec background au lieu de simples liens texte. D'autres écarts de spacing, typographie et layout sont présents sur l'ensemble du site. Les assets réels (logo CLB, photos de Laurent) n'ont jamais été intégrés — des placeholders SVG sont toujours en place.

### Solution

Parcourir chaque section de la homepage, corriger les écarts CSS par rapport à la maquette, remplacer les placeholders par les vrais assets (logo JPEG, photo Laurent), et aligner le footer sur le layout 4 colonnes de la maquette. La homepage sert de référence — les autres pages suivront le même style via les composants partagés (header, footer, section headers).

### Scope

**In Scope:**
- Corriger les styles CSS pour matcher la maquette (header nav links, spacings, typo, couleurs, hover states)
- Intégrer le vrai logo `documents/LOGO CLB GEOMÈTRE-EXPERT.jpeg` dans le header et le footer
- Intégrer la photo de Laurent (la plus adaptée) dans le hero
- Refaire le footer en 4 colonnes (Brand + Navigation + Prestations + Contact) conformément à la maquette

**Out of Scope:**
- Changements fonctionnels
- Nouvelles pages ou composants
- Restructuration de l'architecture
- Modifications du contenu textuel (sauf si nécessaire pour matcher la maquette)

## Context for Development

### Codebase Patterns

- Tailwind CSS avec CSS variables shadcn/ui pour les design tokens
- Composants shadcn/ui (NavigationMenu, Button, Sheet, Accordion, etc.)
- `navigationMenuTriggerStyle()` (CVA) applique `bg-background`, `hover:bg-muted`, `px-2.5 py-1.5` — c'est la cause des nav links en style bouton
- `next/image` obligatoire pour toutes les images
- Server Components par défaut, `'use client'` uniquement si nécessaire
- Convention de commit : `type: description en français`
- Palette : primary `#B5342B`, background `#F5F0EB`, foreground `#2D2D3F`, border `#C0B8B0`, muted `#6B6B7B`, muted-light `#E8E3DD`

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `_bmad-output/planning-artifacts/ux-design-directions.html` | Maquette de référence — source de vérité visuelle |
| `documents/LOGO CLB GEOMÈTRE-EXPERT.jpeg` | Logo réel du cabinet |
| `documents/Photo_profil_1.jpg` | Photo portrait Laurent (option 1) |
| `documents/Photo_profil_2.jpg` | Photo portrait Laurent (option 2) |
| `components/layout/NavBar.tsx` | Header sticky — height h-16, logo 120x40, CTA button |
| `components/layout/NavLinks.tsx` | Liens nav desktop — `navigationMenuTriggerStyle()` cause le style bouton |
| `components/layout/Footer.tsx` | Footer 3 colonnes — à passer en 4 colonnes |
| `components/sections/HeroSection.tsx` | Hero — portrait placeholder, badge Ordre, CTAs |
| `components/sections/TrustBar.tsx` | Barre de confiance — 4 items avec checkmarks |
| `components/sections/ServicesGrid.tsx` | Grille 6 services — cards avec icônes |
| `components/sections/MissionSteps.tsx` | 5 étapes mission — numéros rouges + connecteurs |
| `components/sections/DiagnosticSection.tsx` | Section diagnostic — texte + preview Tally |
| `components/sections/CtaBanner.tsx` | Bandeau CTA rouge — titre + bouton blanc |
| `components/ui/navigation-menu.tsx` | Composant shadcn/ui — contient `navigationMenuTriggerStyle` |
| `public/images/logo-placeholder.svg` | Placeholder logo actuel — à remplacer |
| `public/images/portrait-placeholder.svg` | Placeholder portrait actuel — à remplacer |

### Technical Decisions

- **NavLinks** : Remplacer `NavigationMenu` shadcn/ui + `navigationMenuTriggerStyle()` par de simples `<Link>` avec classes Tailwind (`text-sm font-medium text-foreground hover:text-primary transition-colors`). Cela élimine le style bouton. Le composant reste `'use client'` car il utilise `usePathname()` pour le lien actif.
- **Footer 4 colonnes** : Passer de `grid-cols-3` à un layout `lg:grid-cols-[2fr_1fr_1fr_1fr]` sur desktop. Ajouter la colonne "Prestations" avec les 6 services.
- **Assets** : Copier les JPEG depuis `documents/` vers `public/images/`, les renommer proprement (`logo-clb.jpeg`, `portrait-laurent.jpg`). Utiliser `next/image` avec dimensions et `alt` appropriés.
- **Mesures pixel-perfect** : Les valeurs exactes de la maquette doivent être respectées (voir section Écarts).

### Écarts identifiés (maquette vs implémentation)

#### Header
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Height | 72px | h-16 (64px) | → h-[72px] |
| Logo dimensions | 140×44px | 120×40 | → 140×44 |
| Nav links | Liens texte simples (14px, font-500, pas de bg) | `navigationMenuTriggerStyle()` avec bg | → Simples `<Link>` |
| Nav gap | 28px | Géré par NavigationMenu | → gap-7 (28px) |

#### Hero
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Padding | 80px 64px 64px | py-12 md:py-20 | → pt-20 pb-16 |
| Gap text/portrait | 64px | md:gap-12 (48px) | → md:gap-16 (64px) |
| H1 font-size | 44px fixe | text-3xl md:text-4xl lg:text-5xl | → text-[44px] |
| Subtitle font-size | 17px | text-lg (18px) | → text-[17px] |
| Portrait dimensions | 380×460px | 400×500 | → 380×460 |
| Portrait border-radius | 12px | rounded-lg (8px) | → rounded-xl (12px) |
| Badge padding | 12px 16px | px-3 py-2 | → px-4 py-3 |

#### Trust Bar
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Borders | top + bottom | bottom only | → Ajouter border-t |
| Padding | 20px | py-6 (24px) | → py-5 (20px) |
| Gap | 48px | gap-6 md:gap-8 | → md:gap-12 (48px) |

#### Services Grid
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Gap | 20px | gap-6 (24px) | → gap-5 (20px) |
| Card padding | 28px | p-6 (24px) | → p-7 (28px) |
| Icon size | 44×44px avec bg | h-8 w-8 (32px) sans bg | → h-11 w-11 + bg-background rounded-lg |
| Section H2 | 36px | text-2xl md:text-3xl | → text-4xl (36px) |
| H2 margin | 12px | mb-4 (16px) | → mb-3 (12px) |
| Underline height | 3px | h-0.5 (2px) | → h-[3px] |
| Subtitle | Présent | Absent | → Ajouter |

#### Mission Steps
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Section H2 | 36px | text-2xl md:text-3xl | → text-4xl (36px) |
| H2 margin | 12px | mb-4 | → mb-3 |
| Underline height | 3px | h-0.5 | → h-[3px] |
| Subtitle | Présent | Absent | → Ajouter |
| Step P | 13px | text-sm (14px) | → text-[13px] |

#### Diagnostic Section
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Gap | 64px | md:gap-12 (48px) | → md:gap-16 (64px) |
| Label "Diagnostic" | Présent (13px uppercase primary) | Absent | → Ajouter |
| Preview bg | #F5F0EB | bg-card (#FFF) | → bg-background |
| Preview border-radius | 12px | rounded-xl | → rounded-2xl |

#### CTA Banner
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Padding | 64px | py-12 md:py-16 | → py-16 (64px) |
| H2 size | 30px | text-2xl md:text-3xl | → text-[30px] |
| H2 margin | 12px | mb-2 (8px) | → mb-3 (12px) |
| P margin | 28px | mb-8 (32px) | → mb-7 (28px) |
| Button hover | #F5F0EB | white/90 | → hover:bg-background |

#### Footer
| Propriété | Maquette | Implémentation | Fix |
|-----------|----------|----------------|-----|
| Padding | 64px | py-12 | → py-16 (64px) |
| Grid | 4 colonnes (2fr 1fr 1fr 1fr) | 3 colonnes | → 4 colonnes |
| Gap | 48px | gap-8 (32px) | → gap-12 (48px) |
| Headings | h4 14px uppercase letter-spacing | h3 text-lg | → text-sm uppercase tracking-wide |
| Colonne Prestations | Présente (6 services) | Absente | → Ajouter |
| Logo footer | "CLB" 20px bold ou image logo | Texte cabinet | → Logo image |
| Social icons | 36×36px carrés arrondis | Icône LinkedIn inline | → Refaire |
| Footer bottom | 13px, border-top rgba(255,255,255,0.15) | Separator component | → Ajuster |

## Implementation Plan

### Tasks

Ordre : assets d'abord (pas de dépendance), puis composants partagés (header/footer), puis sections homepage (top → bottom).

- [x] Task 1 : Préparer les assets réels
  - File: `public/images/`
  - Action: Copier `documents/LOGO CLB GEOMÈTRE-EXPERT.jpeg` → `public/images/logo-clb.jpeg`
  - Action: Comparer `documents/Photo_profil_1.jpg` et `Photo_profil_2.jpg`, choisir la plus adaptée pour un portrait professionnel, copier → `public/images/portrait-laurent.jpg`
  - Action: Supprimer `public/images/logo-placeholder.svg` et `public/images/portrait-placeholder.svg`
  - Notes: Utiliser `next/image` avec `priority` pour le logo header, `sizes` pour le portrait hero

- [x] Task 2 : Corriger le header — NavBar
  - File: `components/layout/NavBar.tsx`
  - Action: Changer la hauteur de `h-16` à `h-[72px]`
  - Action: Remplacer le logo placeholder par le vrai logo : `src="/images/logo-clb.jpeg"`, `width={140}`, `height={44}`
  - Action: Mettre à jour le `alt` du logo si nécessaire
  - Notes: Ne pas toucher au CTA "Prendre RDV" ni au menu mobile

- [x] Task 3 : Corriger les liens de navigation desktop — NavLinks
  - File: `components/layout/NavLinks.tsx`
  - Action: Supprimer les imports `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuLink`, `navigationMenuTriggerStyle`
  - Action: Remplacer le composant `NavigationMenu` par un simple `<nav>` avec `<Link>` directs
  - Action: Utiliser les classes : `flex items-center gap-7` pour le container
  - Action: Pour chaque lien : `text-sm font-medium text-foreground hover:text-primary transition-colors`
  - Action: Pour le lien actif : ajouter `text-primary font-semibold`
  - Action: Garder `'use client'` et `usePathname()` pour la détection du lien actif
  - Notes: Le composant reste un client component pour `usePathname()`. Ne pas importer `cn` si plus nécessaire — vérifier.

- [x] Task 4 : Corriger le Hero — HeroSection
  - File: `components/sections/HeroSection.tsx`
  - Action: Remplacer le portrait placeholder par `src="/images/portrait-laurent.jpg"`, `width={380}`, `height={460}`
  - Action: Changer `rounded-lg` → `rounded-xl` sur le container portrait (12px)
  - Action: Ajuster le padding section : `pt-20 pb-16` sur desktop (80px top, 64px bottom)
  - Action: Changer le gap text/portrait : `md:gap-16` (64px)
  - Action: Fixer le H1 à `text-[44px] font-bold leading-tight` (pas de responsive scaling)
  - Action: Changer le subtitle de `text-lg` à `text-[17px]` avec `leading-relaxed` (line-height 1.7)
  - Action: Ajuster le badge : `px-4 py-3` (padding 16px/12px)
  - Notes: Vérifier que le portrait reste responsive sur mobile (stack vertical). Le `priority` sur l'image peut être gardé car c'est au-dessus du fold.

- [x] Task 5 : Corriger la Trust Bar
  - File: `components/sections/TrustBar.tsx`
  - Action: Ajouter `border-t` en plus du `border-b` existant
  - Action: Changer padding de `py-6` à `py-5` (20px)
  - Action: Changer le gap des items de `gap-6 md:gap-8` à `gap-4 md:gap-12` (48px desktop)
  - Notes: Vérifier le rendu mobile — les items doivent wrapper proprement en 2x2

- [x] Task 6 : Corriger la grille Services
  - File: `components/sections/ServicesGrid.tsx`
  - Action: Changer le gap grille de `gap-6` à `gap-5` (20px)
  - Action: Changer le padding des cards de `p-6` à `p-7` (28px)
  - Action: Augmenter les icônes de `h-8 w-8` à `h-11 w-11` (44px) et ajouter un container avec `bg-background rounded-lg flex items-center justify-center`
  - Action: Corriger le section header — H2 : `text-4xl font-semibold` (36px), margin `mb-3` (12px)
  - Action: Ajouter le sous-titre sous le H2 : "Des solutions adaptées à chaque situation foncière" avec `text-base text-muted-foreground max-w-[500px] mx-auto`
  - Action: Corriger la ligne décorative : `h-[3px]` au lieu de `h-0.5`, `mt-4` (16px)
  - Notes: Les cards doivent avoir un hover state : `hover:border-primary` (déjà possible via le composant Card)

- [x] Task 7 : Corriger les étapes Mission
  - File: `components/sections/MissionSteps.tsx`
  - Action: Corriger le section header — H2 : `text-4xl font-semibold` (36px), margin `mb-3`
  - Action: Ajouter le sous-titre : "5 étapes simples, un processus transparent" avec mêmes classes que Task 6
  - Action: Corriger la ligne décorative : `h-[3px]`
  - Action: Changer la taille du texte description des steps de `text-sm` à `text-[13px]`
  - Notes: Les connecteurs entre les steps doivent rester fonctionnels sur desktop et mobile

- [x] Task 8 : Corriger la section Diagnostic
  - File: `components/sections/DiagnosticSection.tsx`
  - Action: Changer le gap de `md:gap-12` à `md:gap-16` (64px)
  - Action: Ajouter le label "Diagnostic" au-dessus du H2 : `<p className="text-[13px] font-semibold text-primary uppercase tracking-[1.5px] mb-2">Diagnostic</p>`
  - Action: Changer le background de la preview box de `bg-card` à `bg-background`
  - Action: Changer le border-radius de la preview box à `rounded-2xl` (12px, vérifier équivalence)
  - Notes: Ne pas toucher à l'embed Tally ni au fallback — changements CSS uniquement

- [x] Task 9 : Corriger le bandeau CTA
  - File: `components/sections/CtaBanner.tsx`
  - Action: Changer le padding de `py-12 md:py-16` à `py-16` (64px uniforme)
  - Action: Fixer le H2 à `text-[30px] font-bold` (30px)
  - Action: Changer la marge H2 de `mb-2` à `mb-3` (12px)
  - Action: Changer la marge P de `mb-8` à `mb-7` (28px)
  - Action: Corriger le hover du bouton blanc : remplacer `hover:bg-white/90` par `hover:bg-background` (#F5F0EB)
  - Notes: Le `text-primary-foreground` et `bg-primary` sont corrects — ne pas modifier

- [x] Task 10 : Refaire le footer en 4 colonnes
  - File: `components/layout/Footer.tsx`
  - Action: Changer le padding de `py-12` à `py-16` (64px)
  - Action: Changer le grid de `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` à `grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]`
  - Action: Changer le gap de `gap-8` à `gap-12` (48px)
  - Action: Restructurer la 1ère colonne "Brand" : logo image `next/image` (ou texte "CLB" en `text-xl font-bold`) + description cabinet + icônes sociales (LinkedIn dans un carré 36×36px arrondi avec `bg-white/10 hover:bg-white/20 rounded-md`)
  - Action: Renommer la 2ème colonne en "Navigation" avec les liens de navigation simples (texte uniquement, sans icônes)
  - Action: Ajouter la 3ème colonne "Prestations" avec les 6 services : Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires (liens vers `/nos-prestations`)
  - Action: Renommer la 4ème colonne en "Contact" avec téléphone (texte seul avec emoji 📞), mobile (📱), email (✉️), adresse
  - Action: Changer les headings de `text-lg font-semibold` à `text-sm font-semibold uppercase tracking-wide` (14px, uppercase, letter-spacing)
  - Action: Supprimer les icônes Lucide (Phone, Mail, MapPin) des coordonnées — utiliser des emojis ou texte simple comme dans la maquette
  - Action: Ajuster le footer bottom : `text-[13px]` au lieu de `text-sm`, border-top avec `border-white/15`
  - Notes: Le `data-testid="main-footer"` doit être conservé pour les tests E2E. Les liens de la colonne Navigation utilisent `navigationLinks` depuis `lib/navigation.ts`.

- [x] Task 11 : Validation finale
  - Action: `npm run build` — build OK, pas d'erreur TypeScript
  - Action: `npm run lint` — pas de régression
  - Action: `npm run test:e2e` — les 124 tests existants passent (0 régression)
  - Action: Vérification visuelle en dev : ouvrir la maquette HTML et le site côte à côte, section par section
  - Notes: Porter une attention particulière au responsive mobile — la maquette ne spécifie que le desktop, mais le mobile ne doit pas régresser

### Acceptance Criteria

- [x] AC1 : Given le header est affiché, when je regarde les liens de navigation, then ils apparaissent comme des liens texte simples (pas de background, pas de style bouton), avec font-size 14px, font-weight 500, et un hover vers la couleur primary
- [x] AC2 : Given le header est affiché, when je regarde le logo, then le vrai logo CLB (`logo-clb.jpeg`) est affiché à 140×44px au lieu du placeholder SVG
- [x] AC3 : Given la section hero est affichée, when je regarde le portrait, then la vraie photo de Laurent est affichée à 380×460px avec border-radius 12px au lieu du placeholder SVG
- [x] AC4 : Given la trust bar est affichée, when je regarde les items, then ils ont un gap de 48px sur desktop, un padding vertical de 20px, et des bordures top et bottom
- [x] AC5 : Given la grille services est affichée, when je regarde les cards, then chaque icône fait 44×44px avec un background beige arrondi, les cards ont un padding de 28px, et le gap entre les cards est 20px
- [x] AC6 : Given une section avec un titre H2 (services, mission), when je regarde le titre, then le H2 fait 36px, a un sous-titre descriptif, et la ligne décorative fait 3px de hauteur
- [x] AC7 : Given la section diagnostic est affichée, when je regarde le layout, then un label "DIAGNOSTIC" en uppercase rouge est présent au-dessus du H2, le gap est de 64px sur desktop, et la preview box a un fond beige (#F5F0EB)
- [x] AC8 : Given le bandeau CTA est affiché, when je regarde le bouton blanc, then son hover state change le background vers #F5F0EB (pas blanc avec opacité)
- [x] AC9 : Given le footer est affiché, when je compte les colonnes sur desktop, then il y a 4 colonnes : Brand (avec logo + social), Navigation, Prestations (6 services), Contact
- [x] AC10 : Given le footer est affiché, when je regarde les headings des colonnes, then ils sont en 14px, uppercase, avec letter-spacing élargi
- [x] AC11 : Given le site est buildé, when `npm run build` est exécuté, then le build réussit sans erreur
- [x] AC12 : Given les tests E2E sont exécutés, when `npm run test:e2e` est lancé, then les 124 tests existants passent (0 régression)
- [x] AC13 : Given le site est affiché sur mobile (< 768px), when je navigue, then aucune section ne déborde horizontalement et le menu hamburger fonctionne toujours

## Additional Context

### Dependencies

- Assets réels disponibles dans `documents/` (logo JPEG, photos JPG)
- Maquette HTML disponible dans `_bmad-output/planning-artifacts/ux-design-directions.html`
- `lib/navigation.ts` pour les liens de navigation (utilisé dans NavLinks et Footer)
- Aucune nouvelle dépendance npm requise

### Testing Strategy

- **Tests E2E existants (124)** : Doivent tous passer sans régression. Les tests vérifient la présence des éléments, pas leur style — donc les changements CSS ne devraient pas les casser.
- **Risque de régression** : Le footer restructuré (3 → 4 colonnes) pourrait casser des tests qui ciblent des éléments spécifiques du footer. Vérifier les sélecteurs dans `tests/pages-statiques.spec.ts`.
- **Build + Lint** : `npm run build` et `npm run lint` comme validation de base.
- **Vérification visuelle** : Comparer maquette HTML et rendu dev côte à côte pour chaque section.

### Notes

- Issue identifiée en rétrospective Epic 6 (2026-03-20)
- Pas d'epic dédié — travail de polish post-MVP
- La homepage est la référence — les autres pages héritent du style via les composants partagés (header, footer, section headers)
- **Risque** : Les changements dans `NavLinks.tsx` (suppression de `NavigationMenu` shadcn/ui) pourraient nécessiter des ajustements dans `MobileMenu.tsx` si ce composant utilise les mêmes imports. Vérifier.
- **Risque** : Le footer à 4 colonnes peut être trop dense sur tablette. Prévoir un breakpoint intermédiaire `md:grid-cols-2` avant `lg:grid-cols-[2fr_1fr_1fr_1fr]`.
- **Convention** : Ne pas modifier `components/ui/navigation-menu.tsx` (composant shadcn/ui). Le changement se fait dans `NavLinks.tsx` uniquement.
