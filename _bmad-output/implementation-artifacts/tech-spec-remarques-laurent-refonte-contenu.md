---
title: 'Remarques Laurent — refonte contenu et structure site CLBGE'
slug: 'remarques-laurent-refonte-contenu'
created: '2026-03-28'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: [Next.js 16, React 19, Tailwind CSS 4, Lucide React, Sanity CMS, Base UI, Playwright]
files_to_modify: [app/page.tsx, app/layout.tsx, app/nos-prestations/page.tsx, app/qui-suis-je/page.tsx, app/notre-mission/page.tsx, app/nos-technologies/page.tsx, app/contact/page.tsx, components/layout/Footer.tsx, components/sections/HeroSection.tsx, components/sections/ServicesGrid.tsx, components/sections/ServiceAccordion.tsx, components/sections/Timeline.tsx, lib/navigation.ts, lib/icons.tsx]
code_patterns: [fallback-hardcoded-then-sanity, lucide-icon-map, centralized-navigation, server-components-async, portable-text-rendering]
test_patterns: [playwright-e2e, pages-statiques-spec, responsive-spec]
---

# Tech-Spec: Remarques Laurent — refonte contenu et structure site CLBGE

**Created:** 2026-03-28

## Overview

### Problem Statement

Le site actuel contient des intitulés incorrects, du contenu manquant, et une structure qui ne reflète pas l'offre réelle du cabinet CLB Géomètre-Expert. Laurent a listé 12 points de remarques couvrant toutes les pages du site.

### Solution

Appliquer systématiquement les remarques de Laurent : correction des textes, réorganisation des prestations (remplacement Surfaces réglementaires par Urbanisme), ajout de contenu détaillé sur chaque page, refonte du footer, nouvelle biographie et frise chronologique, mise à jour des technologies.

### Scope

**In Scope:**
- Accueil : téléphone fixe 0590 26 35 90, texte « Inscrit au tableau de l'Ordre des Géomètres-Experts sous le n°12345 », titre prestations corrigé, réordonnancement services, remplacement Surfaces réglementaires par Urbanisme, nouvelles icônes Foncier/Architecture, étapes 4 et 5 corrigées, déplacement zone d'intervention sur homepage
- Footer : logo SVG au lieu de texte CLBGE, lien « Qui suis-je ? », corrections prestations, adresse complète + téléphone fixe
- Page prestations : contenu détaillé (shortDescription + longDescription) pour chaque prestation
- Page Qui suis-je ? : titre avec ?, nouveau texte bio complet, frise chronologique (2012/2019/2024/2026)
- Page Notre mission : titre avec ?, descriptions étapes 4 et 5 corrigées
- Page Nos technologies : nouveau contenu détaillé (6 logiciels + 3 matériels terrain)
- Page Contact : titre « Contactez le cabinet CLB Géomètre-Expert », téléphone fixe, adresse complète
- Navigation : « Qui suis-je » → « Qui suis-je ? »

**Out of Scope:**
- Création des articles de blog (Laurent via Sanity Studio)
- N° d'inscription réel (placeholder 12345 conservé pour l'instant)
- Page Diagnostic (RAS selon Laurent)

## Context for Development

### Codebase Patterns

- **Fallback Pattern** : Chaque page tente un fetch Sanity, fallback sur des données hardcodées (`defaultServices`, `defaultMissionSteps`, etc.)
- **Icon System** : `lib/icons.tsx` contient un `iconMap` qui mappe des noms string → composants Lucide. `getIcon(name)` retourne le composant, fallback `HelpCircle`
- **Navigation** : Centralisée dans `lib/navigation.ts`, utilisée par NavLinks, MobileMenu et Footer
- **Server Components** : Toutes les pages sont des async server components
- **Styling** : Tailwind CSS 4 avec tokens CSS custom (primary: #B5342B, background: #F5F0EB, foreground: #2D2D3F)
- **Section Pattern** : `bg-background py-12 md:py-20` / `mx-auto max-w-7xl px-4 md:px-8 lg:px-16`
- **Footer** : 4 colonnes (Brand, Navigation, Prestations, Contact) — grid `lg:grid-cols-[2fr_1fr_1fr_1fr]`
- **Prestations** : `ServiceAccordion` (client component) utilise `longDescription` (PortableText) avec fallback `shortDescription`
- **Phone** : Format affiché "0690 61 22 24", tel: link via `phone.replace(/\s/g, "")`

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `app/page.tsx` | Homepage — hero, services grid, mission steps, diagnostic, CTA |
| `app/layout.tsx` | Root layout — NavBar + Footer avec props depuis siteSettings |
| `app/nos-prestations/page.tsx` | Page prestations — ServiceAccordion |
| `app/qui-suis-je/page.tsx` | Page profil — portrait, bio, qualifications |
| `app/notre-mission/page.tsx` | Page mission — MissionSteps avec hideTitle |
| `app/nos-technologies/page.tsx` | Page technologies — cards logiciels/matériel + ZoneIntervention |
| `app/contact/page.tsx` | Page contact — formulaire Tally + infos contact |
| `components/layout/Footer.tsx` | Footer — 4 colonnes, prestationLinks hardcodé |
| `components/layout/MobileMenu.tsx` | Menu mobile — phone default "0690 61 22 24" |
| `components/sections/HeroSection.tsx` | Hero — titre, sous-titre, portrait, badge, CTAs |
| `components/sections/ServicesGrid.tsx` | Grille services accueil — titre section hardcodé |
| `components/sections/MissionSteps.tsx` | Étapes mission — numérotées avec connecteurs |
| `components/sections/ServiceAccordion.tsx` | Accordéon prestations — icon + longDescription |
| `components/sections/ZoneIntervention.tsx` | Zone intervention — 4 zones hardcodées |
| `lib/navigation.ts` | Liens navigation centralisés |
| `lib/icons.tsx` | Mapping noms string → Lucide icons |

### Technical Decisions

1. **Icônes** : Remplacer `Landmark` (Foncier) par `Scale` (balance juridique — plus explicite pour le foncier). Remplacer `PenTool` (Architecture) par `Home` (maison — plus parlant). Ajouter `FileCheck` pour Urbanisme (document administratif).
2. **longDescription string** : Le `ServiceAccordion` supporte déjà `longDescription` en PortableText. Pour le fallback hardcodé, on ajoutera un champ `longDescriptionHtml` (string) qui sera rendu via `dangerouslySetInnerHTML` uniquement pour le fallback. Quand Sanity est alimenté, c'est le PortableText qui prime.
3. **Timeline** : Nouveau composant `components/sections/Timeline.tsx` — horizontal sur desktop (flex-row), vertical sur mobile (flex-col). 4 jalons avec point visuel (cercle primary) et ligne de connexion.
4. **ZoneIntervention** : Retirer de `/nos-technologies`, ajouter sur `/` (homepage) entre MissionSteps et DiagnosticSection.
5. **Footer logo** : Remplacer le `<div>CLBGE</div>` par `<Image src="/images/logo-clb.svg" />` avec taille visible.
6. **Téléphone** : Ajouter le fixe (0590 26 35 90) en plus du mobile existant. Le layout passe le phone depuis siteSettings — on ajoute un `phoneLandline` prop.

## Implementation Plan

### Tasks

- [x] **Task 1 : Fondations — icônes, navigation, layout defaults**
  - File: `lib/icons.tsx`
  - Action: Remplacer `Landmark` par `Scale`, `PenTool` par `Home`. Ajouter `FileCheck` pour Urbanisme. Importer les nouvelles icônes depuis lucide-react.
  - File: `lib/navigation.ts`
  - Action: Changer `"Qui suis-je"` → `"Qui suis-je ?"`
  - File: `app/layout.tsx`
  - Action: Modifier `defaults.address` en `"17, rue Amédée FENGAROL\nLotissement Vince Arnouville\n97170 PETIT-BOURG"`. Ajouter `phoneLandline: "0590 26 35 90"` dans defaults. Passer `phoneLandline` au Footer.

- [x] **Task 2 : HeroSection — texte inscription Ordre + téléphone fixe**
  - File: `components/sections/HeroSection.tsx`
  - Action: Dans le badge overlay, remplacer `Géomètre-Expert Foncier DPLG — Inscrit à l'Ordre n°12345` par `Inscrit au tableau de l'Ordre des Géomètres-Experts sous le n°12345`. Ajouter le téléphone fixe à côté du mobile dans la zone CTA : `ou appelez le 0590 26 35 90`.
  - Notes: Ajouter un prop `phoneLandline` à l'interface. Le passer depuis `app/page.tsx`.

- [x] **Task 3 : ServicesGrid — titre section + services reordonnés**
  - File: `components/sections/ServicesGrid.tsx`
  - Action: Changer le sous-titre `"Des solutions adaptées à chaque situation foncière"` → `"Des solutions adaptées à chaque projet"`
  - File: `app/page.tsx`
  - Action: Modifier `defaultServices` :
    1. Réordonner : Foncier (1), Topographie (2), Urbanisme (3), Copropriété (4), Plans d'architecture (5), Relevés et acquisitions 3D (6)
    2. Remplacer l'entrée "Surfaces réglementaires" par : `{ _id: "3", title: "Urbanisme", icon: "FileCheck", shortDescription: "Certificats d'urbanisme (CUa, CUb), déclaration préalable (DP), permis d'aménager (PA)", order: 3 }`
    3. Changer icon Foncier : `"Scale"`, icon Plans d'architecture : `"Home"`
    4. Mettre à jour les `_id` et `order` pour refléter le nouvel ordre

- [x] **Task 4 : MissionSteps — étapes 4 et 5 corrigées**
  - File: `app/page.tsx`
  - Action: Dans `defaultMissionSteps`, modifier :
    - Étape 4 description : `"Traitement des données et élaboration des documents techniques et juridiques"`
    - Étape 5 description : `"Remise des documents finaux et explications claires des enjeux techniques et juridiques"`
  - File: `app/notre-mission/page.tsx`
  - Action: Mêmes modifications dans le `defaultMissionSteps` local. Changer le h1 de `"Comment se déroule une mission"` → `"Comment se déroule une mission ?"`

- [x] **Task 5 : Homepage — ZoneIntervention déplacée**
  - File: `app/page.tsx`
  - Action: Importer `ZoneIntervention` depuis `@/components/sections/ZoneIntervention`. L'insérer dans le JSX entre `<MissionSteps>` et `<DiagnosticSection>`.
  - File: `app/nos-technologies/page.tsx`
  - Action: Retirer l'import et l'usage de `<ZoneIntervention />`.

- [x] **Task 6 : Footer — logo, navigation, prestations, contact**
  - File: `components/layout/Footer.tsx`
  - Action:
    1. Ajouter import `Image` de `next/image`
    2. Remplacer `<div className="mb-4 text-xl font-bold text-background">CLBGE</div>` par `<Image src="/images/logo-clb.svg" alt="Logo CLB Géomètre-Expert" width={140} height={140} className="mb-4 h-16 w-auto" />`
    3. Remplacer le texte description : `Géomètre-Expert Foncier DPLG` → `Inscrit au tableau de l'Ordre des Géomètres-Experts sous le n°12345`
    4. Mettre à jour `prestationLinks` : remplacer `"Surfaces réglementaires"` par `"Urbanisme"`, remplacer `"Relevés 3D"` par `"Relevés et acquisitions 3D"`
    5. Ajouter prop `phoneLandline?: string` à l'interface. Afficher le fixe au-dessus du mobile dans la section Contact.
    6. Rendre l'adresse multi-ligne (split sur `\n` ou affichage sur 3 lignes).

- [x] **Task 7 : Page Prestations — contenu détaillé + Urbanisme**
  - File: `app/nos-prestations/page.tsx`
  - Action:
    1. Modifier `defaultServices` : même réordonnancement qu'en Task 3, remplacer Surfaces réglementaires par Urbanisme
    2. Ajouter un champ `longDescriptionHtml` (string) à chaque service avec le contenu détaillé du PDF de Laurent (sous-titres en `<h4>`, paragraphes en `<p>`)
    3. Mettre à jour les icônes (Scale, FileCheck, Home)
    4. Changer le h1 : ajouter sous-titre `"Nos prestations : des solutions adaptées à chaque projet"` ou remplacer le titre existant
  - File: `components/sections/ServiceAccordion.tsx`
  - Action: Ajouter `longDescriptionHtml?: string` à l'interface Service. Dans le rendu, ajouter un 3ème cas : si `longDescriptionHtml` existe, le rendre via `<div dangerouslySetInnerHTML={{ __html: service.longDescriptionHtml }} className="prose prose-sm text-muted-foreground" />`. Priorité : PortableText > longDescriptionHtml > shortDescription.
  - Notes: Les textes détaillés incluent pour chaque prestation : un paragraphe intro + sous-sections (h4 + p). Contenu à prendre du PDF.

- [x] **Task 8 : Page Qui suis-je — bio + frise chronologique**
  - File: `app/qui-suis-je/page.tsx`
  - Action:
    1. Changer `title: "Qui suis-je"` → `"Qui suis-je ?"`
    2. Remplacer le texte bio fallback par le texte complet du PDF (7 paragraphes sur le parcours de Laurent)
    3. Remplacer la section "Qualifications" par le nouveau composant `<Timeline />`
    4. Importer Timeline depuis `@/components/sections/Timeline`
  - File: `components/sections/Timeline.tsx` (NOUVEAU)
  - Action: Créer un composant Timeline avec :
    - Props: `items: Array<{ year: string; label: string }>`
    - Design horizontal sur desktop : flex-row, cercles primary connectés par ligne
    - Design vertical sur mobile : flex-col
    - 4 jalons hardcodés passés en props :
      - 2012 : "Départ en hexagone pour suivre la formation de géomètre"
      - 2019 : "Début de carrière en cabinets de géomètres-experts parisiens"
      - 2024 : "Obtention du titre de Géomètre-Expert Foncier DPLG"
      - 2026 : "Reprise du cabinet d'Alain NEGRONI (créé en 1987)"
  - Notes: Le composant doit être responsive. Sur mobile, affichage vertical avec ligne à gauche. Sur desktop, horizontal avec points alignés sur une ligne.

- [x] **Task 9 : Page Notre mission — titre corrigé**
  - (Déjà couvert dans Task 4 — étapes + titre)

- [x] **Task 10 : Page Nos technologies — nouveau contenu**
  - File: `app/nos-technologies/page.tsx`
  - Action: Remplacer `defaultTechnologies` par le nouveau contenu du PDF :
    - **Logiciels** (6) : Trimble Business Center (TBC), Trimble RealWorks, AutoCAD, Covadis, UAV Manager 2022, RD12 — avec descriptions détaillées du PDF
    - **Matériel terrain** (3) : Station totale Trimble, Système GNSS Trimble, SLAM100 Scanner LiDAR portatif — avec descriptions détaillées du PDF
    - Mettre à jour les catégories pour matcher : `"Logiciel"` et `"Matériel terrain"`
  - Notes: ZoneIntervention déjà retirée en Task 5.

- [x] **Task 11 : Page Contact — titre, téléphone, adresse**
  - File: `app/contact/page.tsx`
  - Action:
    1. Changer `defaultContact.title` : `"Contactez-nous"` → `"Contactez le cabinet CLB Géomètre-Expert"`
    2. Ajouter le téléphone fixe `0590 26 35 90` avec icône Phone au-dessus du mobile
    3. Remplacer l'adresse `"Petit-Bourg, Guadeloupe"` par l'adresse complète sur 3 lignes : `"17, rue Amédée FENGAROL"`, `"Lotissement Vince Arnouville"`, `"97170 PETIT-BOURG"`
  - Notes: Le téléphone fixe est hardcodé dans cette page. L'adresse aussi.

- [x] **Task 12 : Vérification build + tests**
  - Action: Lancer `npm run build` pour vérifier la compilation. Vérifier qu'il n'y a pas d'erreurs TypeScript. Lancer les tests Playwright si possible.
  - Notes: Les tests `pages-statiques.spec.ts` vérifient les h1 — il faudra peut-être les ajuster si les titres ont changé.

### Acceptance Criteria

- [x] AC 1: Given la homepage, when je regarde le badge portrait, then je vois "Inscrit au tableau de l'Ordre des Géomètres-Experts sous le n°12345"
- [x] AC 2: Given la homepage, when je regarde la section prestations, then le titre est "Nos prestations" avec sous-titre "Des solutions adaptées à chaque projet" et les 6 services sont dans l'ordre : Foncier, Topographie, Urbanisme, Copropriété, Plans d'architecture, Relevés et acquisitions 3D
- [x] AC 3: Given la homepage, when je regarde les icônes des services, then Foncier a une icône de balance (Scale), Architecture a une icône de maison (Home), et Urbanisme a une icône de document (FileCheck)
- [x] AC 4: Given la homepage, when je regarde les étapes de mission, then l'étape 4 mentionne "documents techniques et juridiques" et l'étape 5 mentionne "enjeux techniques et juridiques"
- [x] AC 5: Given la homepage, when je scrolle après les étapes de mission, then je vois la section Zone d'intervention avant le diagnostic
- [x] AC 6: Given le footer, when je regarde la colonne Brand, then je vois le logo SVG (pas le texte "CLBGE") et le texte mentionne l'inscription à l'Ordre
- [x] AC 7: Given le footer, when je regarde la colonne Navigation, then je vois un lien "Qui suis-je ?" (avec point d'interrogation)
- [x] AC 8: Given le footer, when je regarde les prestations, then "Surfaces réglementaires" est remplacé par "Urbanisme" et "Relevés 3D" est remplacé par "Relevés et acquisitions 3D"
- [x] AC 9: Given le footer, when je regarde la colonne Contact, then je vois le téléphone fixe 0590 26 35 90, le mobile, l'email et l'adresse complète sur 3 lignes
- [x] AC 10: Given la page /nos-prestations, when j'ouvre l'accordéon "Foncier", then je vois le contenu détaillé avec les sous-sections (Bornage, Délimitations, Divisions parcellaires, Étude de servitudes)
- [x] AC 11: Given la page /nos-prestations, when je regarde les services, then "Urbanisme" apparaît en 3ème position avec ses sous-sections (CUa/CUb, DP, PA)
- [x] AC 12: Given la page /qui-suis-je, when je regarde le titre, then il affiche "Qui suis-je ?"
- [x] AC 13: Given la page /qui-suis-je, when je lis le texte bio, then je vois le parcours complet de Laurent (ESGT, cabinets parisiens, reprise cabinet Negroni)
- [x] AC 14: Given la page /qui-suis-je, when je regarde la section sous la bio, then je vois une frise chronologique avec 4 jalons (2012, 2019, 2024, 2026)
- [x] AC 15: Given la page /qui-suis-je sur mobile, when je regarde la frise, then elle s'affiche verticalement
- [x] AC 16: Given la page /notre-mission, when je regarde le titre, then il affiche "Comment se déroule une mission ?"
- [x] AC 17: Given la page /nos-technologies, when je regarde les logiciels, then je vois TBC, RealWorks, AutoCAD, Covadis, UAV Manager 2022, RD12 avec leurs descriptions détaillées
- [x] AC 18: Given la page /nos-technologies, when je regarde le matériel, then je vois Station totale Trimble, Système GNSS Trimble, SLAM100 avec descriptions
- [x] AC 19: Given la page /nos-technologies, when je cherche la zone d'intervention, then elle n'est plus affichée (déplacée sur homepage)
- [x] AC 20: Given la page /contact, when je regarde le titre, then il affiche "Contactez le cabinet CLB Géomètre-Expert"
- [x] AC 21: Given la page /contact, when je regarde les coordonnées, then je vois le téléphone fixe 0590 26 35 90 et l'adresse complète (17 rue Amédée FENGAROL, Lotissement Vince Arnouville, 97170 PETIT-BOURG)
- [x] AC 22: Given n'importe quelle page, when je regarde la navigation, then le lien affiche "Qui suis-je ?" avec point d'interrogation
- [x] AC 23: Given le projet, when je lance `npm run build`, then la compilation réussit sans erreur

## Additional Context

### Dependencies

Aucune nouvelle dépendance requise. Les icônes `Scale`, `Home` et `FileCheck` sont disponibles dans `lucide-react` (déjà installé v0.577.0).

### Testing Strategy

- **Build** : `npm run build` doit passer sans erreur TypeScript
- **Tests Playwright** : `pages-statiques.spec.ts` vérifie h1 sur chaque page — adapter les assertions si nécessaire (ex: "Qui suis-je ?" au lieu de "Qui suis-je")
- **Vérification visuelle** : Timeline sur mobile et desktop, logo footer, adresse multi-ligne
- **Responsive** : `responsive.spec.ts` vérifie l'absence de scroll horizontal — la timeline doit passer

### Notes

- Le logo SVG est déjà copié dans `public/images/logo-clb.svg` et utilisé dans le NavBar (h-20)
- Le numéro 12345 est un placeholder — à remplacer plus tard par le vrai numéro d'inscription
- `ServiceAccordion` est un client component ("use client") — `dangerouslySetInnerHTML` est safe ici car le contenu est hardcodé (pas d'input utilisateur)
- La `ZoneIntervention` n'a pas de connexion Sanity — données purement hardcodées
- Les contenus détaillés des prestations proviennent du PDF "Remarques site internet-1.pdf" de Laurent
