---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - planning-artifacts/prd.md
  - planning-artifacts/architecture.md
  - planning-artifacts/ux-design-specification.md
---

# clbge - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for clbge, decomposing the requirements from the PRD, UX Design and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Présentation & Identité**

- FR1 : Le visiteur peut comprendre immédiatement les services proposés par le cabinet depuis la homepage
- FR2 : Le visiteur peut consulter le profil, le parcours et les qualifications de Laurent Bazile
- FR3 : Le visiteur peut consulter la liste détaillée des prestations proposées (Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires)
- FR4 : Le visiteur peut consulter les 5 étapes du déroulement d'une mission (prise de contact → consultation → terrain → traitement → restitution)
- FR5 : Le visiteur peut consulter les technologies et équipements utilisés (logiciels et matériel terrain)

**Diagnostic & Conversion**

- FR6 : Le visiteur peut remplir un formulaire diagnostic interactif pour identifier son besoin (type de projet, localisation, documents disponibles, urgence)
- FR7 : Le visiteur est redirigé vers la prise de RDV après soumission du formulaire diagnostic
- FR8 : Le visiteur peut prendre un rendez-vous de consultation en ligne
- FR9 : Le visiteur peut payer sa consultation en ligne lors de la prise de RDV
- FR10 : Laurent reçoit une notification email à chaque soumission de formulaire diagnostic
- FR11 : Laurent reçoit une notification email à chaque RDV pris et payé

**Contact & Accessibilité**

- FR12 : Le visiteur peut accéder aux coordonnées du cabinet (téléphone, email) depuis n'importe quelle page
- FR13 : Le visiteur peut envoyer un message via un formulaire de contact classique
- FR14 : Laurent reçoit une notification email à chaque soumission du formulaire de contact

**Blog & Contenu SEO**

- FR15 : Le visiteur peut consulter la liste des articles de blog
- FR16 : Le visiteur peut lire un article de blog individuel
- FR17 : Laurent peut créer un nouvel article de blog depuis un back-office
- FR18 : Laurent peut éditer et mettre en forme un article (titres, paragraphes, images, liens) sans compétence technique
- FR19 : Laurent peut prévisualiser un article avant publication
- FR20 : Laurent peut publier ou dépublier un article en un clic
- FR21 : Laurent peut ajouter des images à ses articles

**Navigation & Expérience**

- FR22 : Le visiteur peut naviguer entre toutes les sections du site via un menu principal
- FR23 : Le visiteur peut naviguer de manière fluide sur mobile (menu responsive)
- FR24 : Le visiteur peut accéder à un CTA de prise de RDV depuis n'importe quelle page
- FR25 : Le visiteur peut identifier la zone d'intervention du cabinet (archipel guadeloupéen)

**SEO & Découvrabilité**

- FR26 : Les pages du site sont indexables par les moteurs de recherche
- FR27 : Chaque page dispose de balises meta (title, description) optimisées
- FR28 : Le site génère un sitemap XML automatiquement
- FR29 : Le site dispose de données structurées (schema.org : LocalBusiness, ProfessionalService)
- FR30 : Les articles de blog sont optimisés pour le référencement (URL propres, balises heading, meta)

### NonFunctional Requirements

**Performance**

- NFR1 : Temps de chargement initial (LCP) < 2.5 secondes sur mobile 4G
- NFR2 : Temps de chargement complet < 3 secondes sur mobile
- NFR3 : Score Lighthouse : Performance > 90, Best Practices > 90
- NFR4 : Poids total des pages < 1.5 MB (hors embeds Tally/Zcal)
- NFR5 : Images optimisées : formats modernes (WebP/AVIF), lazy loading, responsive srcset
- NFR6 : Temps de réponse serveur (TTFB) < 200ms (CDN Vercel)

**Sécurité**

- NFR7 : HTTPS obligatoire sur toutes les pages (certificat automatique Vercel)
- NFR8 : Back-office CMS protégé par authentification
- NFR9 : Aucune donnée personnelle stockée côté serveur (formulaires gérés par Tally, paiements par Zcal Pro)
- NFR10 : Headers de sécurité : Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
- NFR11 : Protection contre le spam sur le formulaire de contact (honeypot ou captcha léger)

**Accessibilité**

- NFR12 : Conformité WCAG 2.1 niveau AA
- NFR13 : Score Lighthouse Accessibility > 90
- NFR14 : Navigation complète au clavier
- NFR15 : Contrastes de couleurs conformes (ratio minimum 4.5:1)
- NFR16 : Textes alternatifs sur toutes les images
- NFR17 : Structure sémantique HTML (headings, landmarks, ARIA si nécessaire)

**SEO**

- NFR18 : Score Lighthouse SEO > 95
- NFR19 : Pages statiques pré-rendues (SSG) pour indexation optimale
- NFR20 : URLs propres, lisibles, sans paramètres dynamiques
- NFR21 : Balises canoniques sur toutes les pages

**Intégrations**

- NFR22 : Tally : embed fonctionnel sans dégradation de performance, fallback lien externe si iframe bloquée
- NFR23 : Zcal Pro : embed ou lien externe fonctionnel, ouverture dans un contexte clair pour l'utilisateur
- NFR24 : Google Analytics / Search Console : tracking opérationnel sans impact performance (chargement async)

### Additional Requirements

- **Starter Template** : `npx create-next-app@latest clbge --yes` (Next.js 16 + TypeScript + Tailwind CSS + ESLint + App Router + Turbopack) — impacte Epic 1 Story 1
- **shadcn/ui** : `npx shadcn@latest init` après create-next-app — composants accessibles (Button, Card, Sheet, Accordion, Skeleton, Separator, Navigation Menu)
- **Sanity CMS** : Intégration manuelle (projet Sanity, schémas, Studio embedded dans `/app/studio/`)
- **Sanity Schémas** : blogPost, homePage, aboutPage, serviceItem, missionStep, technology, siteSettings, contactPage
- **Webhook Sanity → Vercel** : Rebuild automatique à chaque publication de contenu
- **Contenu pages statiques dans Sanity** : Tout le contenu (services, à propos, mission, technologies) géré dans Sanity pour modification sans développeur
- **Headers de sécurité** : CSP, X-Frame-Options, X-Content-Type-Options configurés dans `next.config.ts`
- **GROQ queries centralisées** : Toutes les queries dans `/sanity/lib/queries.ts`, jamais inline
- **Server Components par défaut** : `'use client'` uniquement pour les embeds et interactions
- **next/image obligatoire** : Jamais de `<img>` HTML brut, toujours `next/image` ou `@sanity/image-url`
- **generateMetadata() par page** : Chaque `page.tsx` exporte ses meta tags dynamiques
- **Séquence d'implémentation** : Init → Sanity → Pages statiques → Blog → Intégrations → SEO → Contact → Polish
- **Variables d'environnement** : `.env.local` avec NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN, etc.
- **Environments Vercel** : Production (clbge.com) + Preview automatique (branches/PR)

### UX Design Requirements

- UX-DR1 : Implémenter la direction "Hybride élégant" : hero avec portrait Laurent (next/image) + badge Ordre en overlay, titre "Laurent BAZILE, votre Géomètre-Expert en Guadeloupe", 2 CTAs (RDV + Diagnostic) + numéro click-to-call
- UX-DR2 : Implémenter la TrustBar (4 points de confiance : Ordre, archipel, RDV en ligne, technologies) en flex horizontal, wrap 2x2 sur mobile
- UX-DR3 : Mettre à jour les prestations : 6 services (Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires) avec descriptions courtes (homepage) et descriptions longues (page dédiée)
- UX-DR4 : Implémenter le ServiceAccordion sur `/nos-prestations` (shadcn/ui Accordion, icône Lucide + titre visible, description longue au clic, un seul ouvert à la fois)
- UX-DR5 : Implémenter le bandeau CTA rouge dédié (fond `#B5342B`, titre + sous-texte + bouton blanc, séparé du footer)
- UX-DR6 : Configurer shadcn/ui avec la palette CLBGE (CSS variables dans globals.css : primary `#B5342B`, background `#F5F0EB`, etc.)
- UX-DR7 : Configurer les design tokens Tailwind (colors, spacing scale 4px, border-radius `rounded-lg`, max-width 1200px)
- UX-DR8 : Configurer Inter via `next/font/google` avec l'échelle typographique (h1 32/48px, h2 28/36px, h3 20/24px, body 16/18px)
- UX-DR9 : Implémenter le composant TallyEmbed (`'use client'`, props: formId/redirectUrl/title, states: Skeleton → iframe → fallback lien externe)
- UX-DR10 : Implémenter le composant ZcalEmbed (`'use client'`, props: calendarUrl/title, states: Skeleton → embed → fallback lien externe)
- UX-DR11 : Configurer la redirection automatique Tally → `/rendez-vous` après soumission du formulaire diagnostic
- UX-DR12 : Implémenter le menu mobile Sheet (slide-in droite, liens empilés 16px padding, CTA "Prendre RDV" pleine largeur en bas, coordonnées click-to-call)
- UX-DR13 : Implémenter le CTA contextuel fin d'article blog ("Besoin d'un géomètre ? Faites le diagnostic en 4 questions" avec lien vers `/diagnostic`)
- UX-DR14 : Implémenter l'empty state blog ("Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à nous contacter." + lien contact)
- UX-DR15 : Ajouter le lien LinkedIn (icône + lien) dans le footer
- UX-DR16 : Intégrer Google Maps embed sur la page `/contact` uniquement (pas sur la homepage)
- UX-DR17 : Implémenter le skip link "Aller au contenu principal" (visible au focus, premier élément du body)
- UX-DR18 : Utiliser le logo image CLB dans le header (placeholder jusqu'à réception du SVG)

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Comprendre les services depuis la homepage |
| FR2 | Epic 2 | Profil et qualifications de Laurent |
| FR3 | Epic 2 | Liste détaillée des 6 prestations |
| FR4 | Epic 2 | 5 étapes d'une mission |
| FR5 | Epic 2 | Technologies et équipements |
| FR6 | Epic 3 | Formulaire diagnostic interactif (Tally) |
| FR7 | Epic 3 | Redirection vers RDV après diagnostic |
| FR8 | Epic 3 | Prise de RDV en ligne (Zcal) |
| FR9 | Epic 3 | Paiement en ligne |
| FR10 | Epic 3 | Notification email diagnostic |
| FR11 | Epic 3 | Notification email RDV |
| FR12 | Epic 1 | Coordonnées accessibles (footer) |
| FR13 | Epic 3 | Formulaire de contact (Tally) |
| FR14 | Epic 3 | Notification email contact |
| FR15 | Epic 4 | Liste des articles blog |
| FR16 | Epic 4 | Article individuel |
| FR17 | Epic 4 | Création article back-office |
| FR18 | Epic 4 | Édition et mise en forme |
| FR19 | Epic 4 | Prévisualisation |
| FR20 | Epic 4 | Publication/dépublication |
| FR21 | Epic 4 | Ajout d'images |
| FR22 | Epic 1 | Menu principal |
| FR23 | Epic 1 | Menu responsive mobile |
| FR24 | Epic 1 | CTA RDV global |
| FR25 | Epic 2 | Zone d'intervention |
| FR26 | Epic 5 | Pages indexables |
| FR27 | Epic 5 | Balises meta optimisées |
| FR28 | Epic 5 | Sitemap XML |
| FR29 | Epic 5 | Données structurées schema.org |
| FR30 | Epic 5 | Blog optimisé SEO |

## Epic List

### Epic 1 : Fondations & Design System
Le développeur dispose d'un projet Next.js fonctionnel avec Sanity CMS, shadcn/ui configuré aux couleurs CLBGE, et un layout global (header sticky avec logo + navigation + CTA, footer avec coordonnées et LinkedIn, menu mobile, skip link).
**FRs couvertes :** FR12, FR22, FR23, FR24
**UX-DRs couvertes :** UX-DR6, UX-DR7, UX-DR8, UX-DR12, UX-DR15, UX-DR17, UX-DR18

### Epic 2 : Découverte du cabinet
Le visiteur peut découvrir le cabinet depuis la homepage (hero avec portrait Laurent, trust bar, grille des 6 prestations, 5 étapes de mission, section diagnostic, bandeau CTA), consulter le détail des prestations (accordion), le profil de Laurent, les technologies et la zone d'intervention.
**FRs couvertes :** FR1, FR2, FR3, FR4, FR5, FR25
**UX-DRs couvertes :** UX-DR1, UX-DR2, UX-DR3, UX-DR4, UX-DR5

### Epic 3 : Conversion & Contact
Le visiteur peut remplir le formulaire diagnostic (Tally), être redirigé automatiquement vers la prise de RDV (Zcal Pro), prendre RDV avec paiement en ligne, ou envoyer un message via le formulaire de contact. Laurent reçoit les notifications. La page contact inclut Google Maps.
**FRs couvertes :** FR6, FR7, FR8, FR9, FR10, FR11, FR13, FR14
**UX-DRs couvertes :** UX-DR9, UX-DR10, UX-DR11, UX-DR16

### Epic 4 : Blog & Gestion de contenu
Laurent peut créer, éditer, prévisualiser et publier des articles de blog en autonomie via Sanity Studio. Les visiteurs consultent la liste des articles et lisent un article individuel. Chaque article se termine par un CTA contextuel. L'empty state blog est géré au lancement.
**FRs couvertes :** FR15, FR16, FR17, FR18, FR19, FR20, FR21
**UX-DRs couvertes :** UX-DR13, UX-DR14

### Epic 5 : SEO & Performance
Le site est optimisé pour les moteurs de recherche : meta tags dynamiques par page, sitemap XML incluant les articles blog, données structurées JSON-LD (LocalBusiness, ProfessionalService), balises canoniques. Google Analytics est intégré en async.
**FRs couvertes :** FR26, FR27, FR28, FR29, FR30

## Epic 1 : Fondations & Design System

Le développeur dispose d'un projet Next.js fonctionnel avec Sanity CMS, shadcn/ui configuré aux couleurs CLBGE, et un layout global (header sticky avec logo + navigation + CTA, footer avec coordonnées et LinkedIn, menu mobile, skip link).

### Story 1.1 : Initialisation du projet Next.js + shadcn/ui + Design System

En tant que développeur,
Je veux initialiser le projet avec Next.js, shadcn/ui et les design tokens CLBGE,
Afin de disposer d'un socle technique cohérent visuellement pour construire le site.

**Acceptance Criteria :**

**Given** aucun projet n'existe
**When** le projet est initialisé avec `npx create-next-app@latest clbge --yes` et `npx shadcn@latest init`
**Then** le projet démarre en dev sans erreur avec TypeScript, Tailwind CSS, ESLint, App Router
**And** la configuration Tailwind inclut les design tokens CLBGE (colors: primary `#B5342B`, text `#2D2D3F`, background `#F5F0EB`, surface `#FFFFFF`, border `#C0B8B0`, muted `#6B6B7B`)
**And** les CSS variables shadcn/ui dans `globals.css` utilisent la palette CLBGE
**And** Inter est configuré via `next/font/google` avec l'échelle typographique (h1 32/48px, h2 28/36px, h3 20/24px, body 16/18px)
**And** le fichier `.env.example` documente les variables d'environnement requises
**And** `next.config.ts` inclut les headers de sécurité (CSP, X-Frame-Options, X-Content-Type-Options)
**And** la structure de dossiers suit l'architecture (`/components`, `/sanity`, `/lib`, `/types`)

### Story 1.2 : Configuration Sanity CMS & Studio

En tant qu'administrateur (Laurent),
Je veux accéder à un back-office CMS intégré au site,
Afin de pouvoir gérer le contenu du site de manière autonome.

**Acceptance Criteria :**

**Given** le projet Next.js est initialisé
**When** je navigue vers `/studio`
**Then** Sanity Studio s'affiche avec une interface d'authentification
**And** les schémas de contenu sont définis (blogPost, homePage, aboutPage, serviceItem, missionStep, technology, siteSettings, contactPage)
**And** le client Sanity et les helpers sont configurés dans `/sanity/lib/`
**And** les queries GROQ sont centralisées dans `/sanity/lib/queries.ts`
**And** un webhook Sanity → Vercel est configuré pour le rebuild automatique à chaque publication

### Story 1.3 : Layout global, navigation & coordonnées

En tant que visiteur,
Je veux naviguer entre toutes les sections du site via un menu professionnel et accéder aux coordonnées du cabinet,
Afin de trouver rapidement l'information dont j'ai besoin.

**Acceptance Criteria :**

**Given** je suis sur n'importe quelle page du site
**When** je consulte le header
**Then** le logo CLB est affiché à gauche (image placeholder jusqu'à réception du SVG)
**And** un menu principal affiche les liens vers toutes les sections (Accueil, Nos prestations, Qui suis-je, Notre mission, Nos technologies, Diagnostic, Blog, Contact)
**And** un bouton CTA "Prendre RDV" est visible en permanence à droite
**And** le header est sticky (reste visible au scroll)

**Given** je suis sur mobile (< 768px)
**When** je consulte le header
**Then** le menu est remplacé par un menu hamburger
**And** le menu mobile s'ouvre en slide-in depuis la droite (Sheet shadcn/ui)
**And** les liens sont empilés verticalement avec padding 16px
**And** un CTA "Prendre RDV" pleine largeur est affiché en bas du menu
**And** le numéro de téléphone click-to-call (`tel:0690612224`) est visible dans le menu
**And** le CTA "Prendre RDV" reste visible dans le header même quand le menu est fermé

**Given** je suis sur n'importe quelle page
**When** je consulte le footer
**Then** les coordonnées du cabinet sont affichées (téléphone click-to-call, email click-to-mailto, adresse)
**And** le footer inclut les liens de navigation et les liens vers les prestations
**And** un lien LinkedIn avec icône est affiché
**And** le copyright est visible

**Given** je navigue au clavier
**When** je presse Tab
**Then** un skip link "Aller au contenu principal" apparaît en premier (visible au focus uniquement)
**And** tous les éléments du menu et du footer sont accessibles au clavier avec focus ring visible (`#B5342B`)

## Epic 2 : Découverte du cabinet

Le visiteur peut découvrir le cabinet depuis la homepage (hero avec portrait Laurent, trust bar, grille des 6 prestations, 5 étapes de mission, section diagnostic, bandeau CTA), consulter le détail des prestations (accordion), le profil de Laurent, les technologies et la zone d'intervention.

### Story 2.1 : Homepage — Hero, Trust Bar et présentation du cabinet

En tant que visiteur,
Je veux comprendre immédiatement qui est Laurent et ce que fait le cabinet depuis la homepage,
Afin de savoir si ce professionnel peut répondre à mon besoin.

**Acceptance Criteria :**

**Given** je suis un visiteur arrivant sur la homepage
**When** la page se charge
**Then** un hero affiche le portrait de Laurent (`next/image`) à droite avec un badge Ordre en overlay ("Géomètre-Expert Foncier DPLG — Inscrit à l'Ordre n°12345")
**And** le titre h1 affiche "Laurent BAZILE, votre Géomètre-Expert en Guadeloupe"
**And** un sous-titre décrit l'activité et la zone d'intervention (archipel guadeloupéen)
**And** 2 CTAs sont visibles : "Prendre rendez-vous" (primary) et "Diagnostic gratuit" (outline)
**And** le numéro de téléphone click-to-call est affiché à côté des CTAs

**Given** la page est chargée
**When** je regarde sous le hero
**Then** une TrustBar affiche 4 points de confiance avec checkmarks rouges (Inscrit à l'Ordre, Intervention sur tout l'archipel, RDV et paiement en ligne, Technologies de pointe)
**And** la TrustBar est en flex horizontal sur desktop et wrap 2x2 sur mobile

**Given** je scroll la homepage
**When** je passe la section services
**Then** une grille de 6 cards présente les prestations (Foncier, Topographie, Copropriété, Plans d'architecture, Relevés 3D, Surfaces réglementaires)
**And** chaque card affiche une icône Lucide + titre + description courte
**And** chaque card est cliquable et mène vers `/nos-prestations`

**And** une section présente les 5 étapes de mission (numéros rouges circulaires + titre + description + connecteurs)
**And** une section diagnostic affiche le texte "Vous ne savez pas exactement ce dont vous avez besoin ?" avec un CTA "Faire le diagnostic"
**And** un bandeau CTA rouge est affiché avant le footer ("Besoin d'un géomètre-expert ?" + bouton blanc "Prendre rendez-vous")

**And** le contenu est fetché depuis Sanity (schéma `homePage`) au build (SSG)
**And** la page exporte `generateMetadata()` avec title et description optimisées
**And** les images utilisent `next/image` avec lazy loading

**Given** je suis sur mobile
**When** la page se charge
**Then** le hero s'affiche en stack vertical (portrait au-dessus du texte)
**And** les cards de services passent en 1 colonne
**And** les étapes de mission s'empilent verticalement

### Story 2.2 : Pages Prestations (accordion), Profil et Mission

En tant que visiteur,
Je veux consulter le détail des prestations, le profil de Laurent et le déroulement d'une mission,
Afin d'évaluer la crédibilité et la pertinence du cabinet pour mon besoin.

**Acceptance Criteria :**

**Given** je navigue vers `/nos-prestations`
**When** la page se charge
**Then** les 6 prestations sont affichées en accordion (shadcn/ui Accordion)
**And** chaque item affiche une icône Lucide + titre de la prestation (visible)
**And** au clic, la description longue fournie par Laurent s'affiche
**And** un seul accordion est ouvert à la fois
**And** le contenu est fetché depuis Sanity (schéma `serviceItem`) au build

**Given** je navigue vers `/qui-suis-je`
**When** la page se charge
**Then** le profil, le parcours et les qualifications de Laurent sont présentés
**And** le contenu est fetché depuis Sanity (schéma `aboutPage`) au build

**Given** je navigue vers `/notre-mission`
**When** la page se charge
**Then** les 5 étapes du déroulement d'une mission sont affichées de manière claire et pédagogique
**And** le contenu est fetché depuis Sanity (schéma `missionStep`) au build

**Given** je suis sur chacune de ces pages
**Then** chaque page exporte `generateMetadata()` avec meta tags optimisées
**And** la structure HTML est sémantique (headings, landmarks)
**And** les pages sont pré-rendues en SSG

### Story 2.3 : Page Technologies & Zone d'intervention

En tant que visiteur,
Je veux consulter les technologies utilisées et la zone d'intervention du cabinet,
Afin de vérifier le sérieux des équipements et la couverture géographique.

**Acceptance Criteria :**

**Given** je navigue vers `/nos-technologies`
**When** la page se charge
**Then** les logiciels et le matériel terrain utilisés par le cabinet sont présentés
**And** le contenu est fetché depuis Sanity (schéma `technology`) au build
**And** les images d'équipements utilisent `next/image`

**Given** je suis sur la homepage ou une page pertinente
**When** je consulte la section zone d'intervention
**Then** l'archipel guadeloupéen est identifié (Guadeloupe, Marie-Galante, Les Saintes, La Désirade)

**Given** je suis sur chacune de ces pages
**Then** chaque page exporte `generateMetadata()` avec meta tags optimisées
**And** la structure HTML est sémantique et accessible

## Epic 3 : Conversion & Contact

Le visiteur peut remplir le formulaire diagnostic (Tally), être redirigé automatiquement vers la prise de RDV (Zcal Pro), prendre RDV avec paiement en ligne, ou envoyer un message via le formulaire de contact. Laurent reçoit les notifications. La page contact inclut Google Maps.

### Story 3.1 : Formulaire diagnostic interactif (Tally)

En tant que visiteur indécis,
Je veux remplir un formulaire diagnostic pour identifier mon besoin,
Afin d'être guidé vers la bonne prestation sans avoir besoin de jargon technique.

**Acceptance Criteria :**

**Given** je navigue vers `/diagnostic`
**When** la page se charge
**Then** un texte d'introduction explique l'objectif du diagnostic ("Pas de jargon, on vous guide. Répondez à 4 questions simples...")
**And** le composant TallyEmbed (`'use client'`) affiche le formulaire Tally en iframe
**And** un Skeleton shadcn/ui est affiché pendant le chargement de l'iframe
**And** l'iframe a un attribut `title="Formulaire de diagnostic"`

**Given** le formulaire Tally est soumis
**When** je termine les questions
**Then** Tally redirige automatiquement vers `/rendez-vous` (redirection configurée dans Tally)
**And** Laurent reçoit une notification email avec les réponses (natif Tally)

**Given** l'iframe Tally est bloquée (navigateur, extension)
**When** la page se charge
**Then** un message fallback est affiché : "Le formulaire ne s'affiche pas ?" avec un lien externe vers le formulaire Tally

**Given** je consulte la page sur mobile
**Then** l'embed Tally est responsive et utilisable sans dégradation

**And** la page exporte `generateMetadata()` avec meta tags optimisées

### Story 3.2 : Prise de RDV & paiement en ligne (Zcal Pro)

En tant que visiteur,
Je veux prendre un rendez-vous de consultation et payer en ligne,
Afin de sécuriser mon créneau rapidement sans échange préalable.

**Acceptance Criteria :**

**Given** je navigue vers `/rendez-vous`
**When** la page se charge
**Then** un texte d'introduction explique le processus de consultation et rassure ("Consultation avec paiement sécurisé. Réponse sous 24h.")
**And** le composant ZcalEmbed (`'use client'`) affiche l'interface Zcal Pro
**And** un Skeleton shadcn/ui est affiché pendant le chargement de l'embed
**And** l'embed a un attribut `title="Prise de rendez-vous"`

**Given** je sélectionne un créneau et finalise le paiement
**When** la réservation est confirmée
**Then** Laurent reçoit une notification email de confirmation du RDV et du paiement (natif Zcal)

**Given** l'embed Zcal est indisponible
**When** la page se charge
**Then** un lien externe vers Zcal Pro est affiché en fallback avec un contexte clair

**Given** je consulte la page sur mobile
**Then** l'embed/lien Zcal est fonctionnel et utilisable

**And** la page exporte `generateMetadata()` avec meta tags optimisées

### Story 3.3 : Formulaire de contact (Tally) & Google Maps

En tant que visiteur,
Je veux envoyer un message au cabinet ou localiser ses bureaux,
Afin de poser une question ou me rendre sur place.

**Acceptance Criteria :**

**Given** je navigue vers `/contact`
**When** la page se charge
**Then** un formulaire de contact Tally est affiché en embed (nom, email, message) via le composant TallyEmbed
**And** les coordonnées du cabinet sont affichées sur la page (téléphone click-to-call, email click-to-mailto, adresse)
**And** un embed Google Maps affiche la localisation du cabinet à Petit-Bourg
**And** le contenu de la page est fetché depuis Sanity (schéma `contactPage`)

**Given** le formulaire est soumis
**When** je clique sur envoyer
**Then** Laurent reçoit une notification email avec le contenu du message (natif Tally)
**And** la protection anti-spam est gérée nativement par Tally

**Given** l'iframe Tally est bloquée
**When** la page se charge
**Then** un lien externe vers le formulaire est affiché en fallback

**And** la page exporte `generateMetadata()` avec meta tags optimisées

## Epic 4 : Blog & Gestion de contenu

Laurent peut créer, éditer, prévisualiser et publier des articles de blog en autonomie via Sanity Studio. Les visiteurs consultent la liste des articles et lisent un article individuel. Chaque article se termine par un CTA contextuel. L'empty state blog est géré au lancement.

### Story 4.1 : Blog côté visiteur — Liste et articles

En tant que visiteur,
Je veux consulter la liste des articles de blog et lire un article individuel,
Afin de m'informer sur le métier de géomètre-expert et les sujets fonciers.

**Acceptance Criteria :**

**Given** je navigue vers `/blog`
**When** la page se charge
**Then** la liste des articles publiés est affichée avec pour chacun : image principale, titre, date, extrait
**And** les articles sont triés par date de publication (plus récent en premier)
**And** le contenu est fetché depuis Sanity (query GROQ centralisée dans `/sanity/lib/queries.ts`) au build (SSG)

**Given** aucun article n'est publié
**When** la page `/blog` se charge
**Then** un empty state est affiché : "Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à nous contacter." avec un lien vers `/contact`

**Given** je clique sur un article
**When** la page `/blog/[slug]` se charge
**Then** l'article complet est affiché avec titre, date, image principale, corps rich text (Portable Text rendu en HTML sémantique)
**And** le slug est en kebab-case et l'URL est propre (`/blog/combien-coute-un-geometre`)
**And** les images de l'article utilisent `@sanity/image-url` avec optimisation CDN Sanity
**And** la colonne de lecture est centrée avec max-width 720px

**Given** je suis en fin d'article
**When** je termine la lecture
**Then** un CTA contextuel est affiché : "Besoin d'un géomètre ? Faites le diagnostic en 4 questions" avec un lien vers `/diagnostic`

**Given** je suis sur la page blog ou un article
**Then** la page exporte `generateMetadata()` avec title et description dynamiques (tirées du contenu Sanity)
**And** la structure HTML est sémantique (`<article>`, `<time>`, headings)
**And** les pages sont pré-rendues en SSG

### Story 4.2 : Blog côté admin — Création et publication

En tant qu'administrateur (Laurent),
Je veux créer, éditer, prévisualiser et publier des articles de blog sans compétence technique,
Afin de gérer ma stratégie de contenu SEO en autonomie.

**Acceptance Criteria :**

**Given** je suis connecté à Sanity Studio (`/studio`)
**When** je crée un nouvel article
**Then** je peux remplir : titre, slug (auto-généré depuis le titre), corps rich text, image principale, date de publication, meta SEO (title, description)

**Given** je suis dans l'éditeur d'article
**When** je mets en forme le contenu
**Then** je peux utiliser titres, paragraphes, listes, liens, images et texte en gras/italique sans écrire de code

**Given** j'ai rédigé un article
**When** je clique sur prévisualiser
**Then** je peux voir le rendu de l'article avant publication

**Given** j'ai un article prêt
**When** je clique sur publier
**Then** l'article est publié et le webhook Sanity déclenche un rebuild Vercel
**And** l'article apparaît sur `/blog` après le redéploy

**Given** j'ai un article publié
**When** je clique sur dépublier
**Then** l'article n'est plus visible sur le site public après rebuild

**Given** je suis dans l'éditeur
**When** j'ajoute une image
**Then** l'image est uploadée sur le CDN Sanity et optimisée automatiquement

## Epic 5 : SEO & Performance

Le site est optimisé pour les moteurs de recherche : meta tags dynamiques par page, sitemap XML incluant les articles blog, données structurées JSON-LD (LocalBusiness, ProfessionalService), balises canoniques. Google Analytics est intégré en async.

### Story 5.1 : SEO technique — Sitemap, données structurées & canoniques

En tant que moteur de recherche,
Je veux accéder à un sitemap XML, des données structurées et des balises canoniques,
Afin d'indexer correctement le site et afficher des résultats enrichis.

**Acceptance Criteria :**

**Given** un crawler accède à `/sitemap.xml`
**When** le sitemap est généré
**Then** toutes les pages du site sont listées (homepage, prestations, qui suis-je, mission, technologies, diagnostic, rendez-vous, contact, blog)
**And** les articles de blog publiés sont inclus dynamiquement via Sanity
**And** le sitemap est généré par `/app/sitemap.ts`

**Given** un crawler accède à n'importe quelle page
**When** il analyse le HTML
**Then** des données structurées JSON-LD sont présentes (schema.org : LocalBusiness, ProfessionalService)
**And** les informations du cabinet sont renseignées (nom, adresse, téléphone, zone d'intervention, services)

**Given** un crawler accède à n'importe quelle page
**When** il analyse les balises `<head>`
**Then** une balise canonique (`rel="canonical"`) est présente avec l'URL propre de la page

**Given** les pages du site sont indexables
**When** le fichier `robots.txt` est consulté
**Then** aucune page publique n'est bloquée (sauf `/studio`)

**Given** un audit Lighthouse SEO est exécuté
**Then** le score est > 95

### Story 5.2 : Analytics & optimisation blog SEO

En tant que propriétaire du site (Laurent),
Je veux suivre le trafic du site et que les articles de blog soient optimisés pour le référencement,
Afin de mesurer l'impact de ma présence digitale et capter du trafic organique.

**Acceptance Criteria :**

**Given** un visiteur charge n'importe quelle page
**When** la page est rendue
**Then** le script Google Analytics est chargé de manière asynchrone sans impact sur les performances (LCP, CLS)
**And** Google Search Console est configurable via le meta tag de vérification

**Given** un article de blog est publié
**When** un crawler indexe la page `/blog/[slug]`
**Then** l'URL est propre et en kebab-case
**And** les balises heading (h1, h2, h3) structurent correctement le contenu
**And** les meta tags (title, description) sont dynamiques et tirées du contenu Sanity
**And** la balise canonique est présente
**And** l'image principale a un alt text descriptif
**And** la page est pré-rendue en SSG

**Given** tous les `generateMetadata()` des epics précédents sont en place
**When** un audit global est effectué
**Then** chaque page a un title unique et une description unique
**And** aucune page n'a de meta tags manquantes ou dupliquées
