---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - planning-artifacts/prd.md
  - planning-artifacts/architecture.md
---

# clbge - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for clbge, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Présentation & Identité**

- FR1 : Le visiteur peut comprendre immédiatement les services proposés par le cabinet depuis la homepage
- FR2 : Le visiteur peut consulter le profil, le parcours et les qualifications de Laurent Bazile
- FR3 : Le visiteur peut consulter la liste détaillée des prestations proposées (bornage, copropriété, implantation, topographie, etc.)
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
- **Sanity CMS** : Intégration manuelle (projet Sanity, schémas, Studio embedded dans `/app/studio/`) — story dédiée après l'init
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

Aucun document UX Design n'a été fourni. Pas d'exigences UX-DR extraites.

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Comprendre les services depuis la homepage |
| FR2 | Epic 2 | Profil et qualifications de Laurent |
| FR3 | Epic 2 | Liste détaillée des prestations |
| FR4 | Epic 2 | 5 étapes d'une mission |
| FR5 | Epic 2 | Technologies et équipements |
| FR6 | Epic 3 | Formulaire diagnostic interactif |
| FR7 | Epic 3 | Redirection vers RDV après diagnostic |
| FR8 | Epic 3 | Prise de RDV en ligne |
| FR9 | Epic 3 | Paiement en ligne |
| FR10 | Epic 3 | Notification email diagnostic |
| FR11 | Epic 3 | Notification email RDV |
| FR12 | Epic 1 | Coordonnées accessibles (footer) |
| FR13 | Epic 3 | Formulaire de contact |
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

### Epic 1 : Fondations & Navigation du site
Le visiteur peut naviguer sur un site professionnel avec un layout complet (header, footer, menu responsive, CTA RDV) et accéder aux coordonnées du cabinet depuis n'importe quelle page.
**FRs couvertes :** FR12, FR22, FR23, FR24

### Epic 2 : Découverte du cabinet
Le visiteur peut découvrir le cabinet : comprendre les services proposés, consulter le profil de Laurent, suivre les 5 étapes d'une mission, voir les technologies utilisées et identifier la zone d'intervention.
**FRs couvertes :** FR1, FR2, FR3, FR4, FR5, FR25

### Epic 3 : Conversion & Contact
Le visiteur peut passer à l'action : remplir le formulaire diagnostic interactif, prendre RDV avec paiement en ligne, ou envoyer un message via le formulaire de contact. Laurent reçoit les notifications.
**FRs couvertes :** FR6, FR7, FR8, FR9, FR10, FR11, FR13, FR14

### Epic 4 : Blog & Gestion de contenu
Laurent peut créer, éditer, prévisualiser et publier des articles de blog en autonomie. Les visiteurs peuvent consulter la liste des articles et lire un article individuel.
**FRs couvertes :** FR15, FR16, FR17, FR18, FR19, FR20, FR21

### Epic 5 : SEO & Découvrabilité
Le site est optimisé pour les moteurs de recherche : meta tags dynamiques, sitemap XML, données structurées schema.org, et articles de blog optimisés SEO.
**FRs couvertes :** FR26, FR27, FR28, FR29, FR30

## Epic 1 : Fondations & Navigation du site

Le visiteur peut naviguer sur un site professionnel avec un layout complet (header, footer, menu responsive, CTA RDV) et accéder aux coordonnées du cabinet depuis n'importe quelle page.

### Story 1.1 : Initialisation du projet Next.js

En tant que développeur,
Je veux initialiser le projet Next.js avec la configuration de base,
Afin de disposer d'un socle technique fonctionnel pour construire le site.

**Acceptance Criteria :**

**Given** aucun projet n'existe
**When** le projet est initialisé avec `npx create-next-app@latest clbge --yes`
**Then** le projet démarre en dev sans erreur avec TypeScript, Tailwind CSS, ESLint, App Router
**And** le fichier `.env.example` documente les variables d'environnement requises
**And** le fichier `next.config.ts` inclut les headers de sécurité (CSP, X-Frame-Options, X-Content-Type-Options)
**And** le projet se déploie sur Vercel avec HTTPS automatique
**And** la structure de dossiers suit l'architecture définie (`/components`, `/sanity`, `/lib`, `/types`)

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
**Then** un menu principal affiche les liens vers toutes les sections (Accueil, Nos services, Qui suis-je, Notre mission, Nos technologies, Diagnostic, Blog, Contact)
**And** un bouton CTA "Prendre RDV" est visible en permanence

**Given** je suis sur mobile (< 768px)
**When** je consulte le header
**Then** le menu est remplacé par un menu hamburger fonctionnel
**And** le CTA "Prendre RDV" reste visible

**Given** je suis sur n'importe quelle page
**When** je consulte le footer
**Then** les coordonnées du cabinet sont affichées (téléphone, email, adresse)
**And** le footer inclut les liens de navigation et les mentions légales

**Given** je navigue au clavier
**When** je parcours le menu et le footer
**Then** tous les éléments sont accessibles et le focus est visible (WCAG 2.1 AA)

## Epic 2 : Découverte du cabinet

Le visiteur peut découvrir le cabinet : comprendre les services proposés, consulter le profil de Laurent, suivre les 5 étapes d'une mission, voir les technologies utilisées et identifier la zone d'intervention.

### Story 2.1 : Homepage — Présentation du cabinet

En tant que visiteur,
Je veux comprendre immédiatement les services proposés par le cabinet depuis la homepage,
Afin de savoir si ce professionnel peut répondre à mon besoin.

**Acceptance Criteria :**

**Given** je suis un visiteur arrivant sur la homepage
**When** la page se charge
**Then** une section hero présente clairement le cabinet et son activité de géomètre-expert en Guadeloupe
**And** une section résume les services proposés avec des liens vers la page détaillée
**And** une preview du profil de Laurent est visible avec un lien vers "Qui suis-je"
**And** une section présente les 5 étapes d'une mission de manière synthétique
**And** un CTA vers le formulaire diagnostic et/ou la prise de RDV est visible
**And** le contenu est fetché depuis Sanity (schéma `homePage`) au build (SSG)
**And** la page exporte `generateMetadata()` avec title et description optimisées
**And** les images utilisent `next/image` avec lazy loading et formats modernes

### Story 2.2 : Pages Services, Profil et Mission

En tant que visiteur,
Je veux consulter le détail des prestations, le profil de Laurent et le déroulement d'une mission,
Afin d'évaluer la crédibilité et la pertinence du cabinet pour mon besoin.

**Acceptance Criteria :**

**Given** je navigue vers `/nos-services`
**When** la page se charge
**Then** la liste complète des prestations est affichée (bornage, copropriété, implantation, topographie, etc.) avec descriptions
**And** le contenu est fetché depuis Sanity (schéma `serviceItem`) au build

**Given** je navigue vers `/qui-suis-je`
**When** la page se charge
**Then** le profil, le parcours et les qualifications de Laurent sont présentés
**And** le contenu est fetché depuis Sanity (schéma `aboutPage`) au build

**Given** je navigue vers `/notre-mission`
**When** la page se charge
**Then** les 5 étapes du déroulement d'une mission sont affichées de manière claire et pédagogique (prise de contact → consultation → terrain → traitement → restitution)
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
**Then** l'archipel guadeloupéen est identifié comme zone de couverture (Guadeloupe, Marie-Galante, Les Saintes, La Désirade)
**And** la présentation est claire (texte et/ou visuel)

**Given** je suis sur chacune de ces pages
**Then** chaque page exporte `generateMetadata()` avec meta tags optimisées
**And** la structure HTML est sémantique et accessible (WCAG 2.1 AA)

## Epic 3 : Conversion & Contact

Le visiteur peut passer à l'action : remplir le formulaire diagnostic interactif, prendre RDV avec paiement en ligne, ou envoyer un message via le formulaire de contact. Laurent reçoit les notifications.

### Story 3.1 : Formulaire diagnostic interactif (Tally)

En tant que visiteur indécis,
Je veux remplir un formulaire diagnostic pour identifier mon besoin,
Afin d'être guidé vers la bonne prestation sans avoir besoin de jargon technique.

**Acceptance Criteria :**

**Given** je navigue vers `/diagnostic`
**When** la page se charge
**Then** le formulaire Tally est affiché en embed (iframe) avec les questions : type de projet, localisation, documents disponibles, urgence
**And** un texte d'introduction explique l'objectif du diagnostic

**Given** le formulaire Tally est soumis
**When** je termine les questions
**Then** je suis redirigé vers la page de prise de RDV (`/rendez-vous`)
**And** Laurent reçoit une notification email avec les réponses

**Given** l'iframe Tally est bloquée (navigateur, extension)
**When** la page se charge
**Then** un lien externe vers le formulaire Tally est affiché en fallback

**Given** je consulte la page sur mobile
**Then** l'embed Tally est responsive et utilisable sans dégradation

### Story 3.2 : Prise de RDV & paiement en ligne (Zcal Pro)

En tant que visiteur,
Je veux prendre un rendez-vous de consultation et payer en ligne,
Afin de sécuriser mon créneau rapidement sans échange préalable.

**Acceptance Criteria :**

**Given** je navigue vers `/rendez-vous`
**When** la page se charge
**Then** l'interface Zcal Pro est affichée (embed ou lien externe) permettant de choisir un créneau
**And** un texte d'introduction explique le processus de consultation

**Given** je sélectionne un créneau
**When** je finalise la réservation
**Then** le paiement en ligne est traité via Zcal Pro
**And** Laurent reçoit une notification email de confirmation du RDV et du paiement

**Given** l'embed Zcal est indisponible
**When** la page se charge
**Then** un lien externe vers Zcal Pro est affiché en fallback avec un contexte clair

**Given** je consulte la page sur mobile
**Then** l'embed/lien Zcal est fonctionnel et utilisable

### Story 3.3 : Formulaire de contact (Tally)

En tant que visiteur,
Je veux envoyer un message au cabinet via un formulaire de contact,
Afin de poser une question ou demander des informations sans prendre RDV.

**Acceptance Criteria :**

**Given** je navigue vers `/contact`
**When** la page se charge
**Then** un formulaire de contact Tally est affiché en embed (nom, email, message)
**And** les coordonnées du cabinet sont également affichées (téléphone, email, adresse)
**And** le contenu de la page est fetché depuis Sanity (schéma `contactPage`)

**Given** le formulaire est soumis
**When** je clique sur envoyer
**Then** Laurent reçoit une notification email avec le contenu du message
**And** la protection anti-spam est gérée nativement par Tally

**Given** l'iframe Tally est bloquée
**When** la page se charge
**Then** un lien externe vers le formulaire est affiché en fallback

**Given** la page exporte `generateMetadata()`
**Then** les meta tags sont optimisées pour la page contact

## Epic 4 : Blog & Gestion de contenu

Laurent peut créer, éditer, prévisualiser et publier des articles de blog en autonomie. Les visiteurs peuvent consulter la liste des articles et lire un article individuel.

### Story 4.1 : Blog côté visiteur — Liste et articles

En tant que visiteur,
Je veux consulter la liste des articles de blog et lire un article individuel,
Afin de m'informer sur le métier de géomètre-expert et les sujets fonciers.

**Acceptance Criteria :**

**Given** je navigue vers `/blog`
**When** la page se charge
**Then** la liste des articles publiés est affichée avec pour chacun : titre, date, image, extrait
**And** les articles sont triés par date de publication (plus récent en premier)
**And** le contenu est fetché depuis Sanity (query GROQ centralisée) au build (SSG)

**Given** je clique sur un article
**When** la page `/blog/[slug]` se charge
**Then** l'article complet est affiché avec titre, date, image principale, corps rich text
**And** le slug est en kebab-case et l'URL est propre (`/blog/combien-coute-un-geometre`)
**And** les images de l'article utilisent `@sanity/image-url` avec optimisation CDN Sanity

**Given** je suis sur la page blog ou un article
**Then** la page exporte `generateMetadata()` avec title et description dynamiques (tirées du contenu Sanity)
**And** la structure HTML est sémantique (headings, article, time)
**And** les pages sont pré-rendues en SSG

### Story 4.2 : Blog côté admin — Création et publication

En tant qu'administrateur (Laurent),
Je veux créer, éditer, prévisualiser et publier des articles de blog sans compétence technique,
Afin de gérer ma stratégie de contenu SEO en autonomie.

**Acceptance Criteria :**

**Given** je suis connecté à Sanity Studio (`/studio`)
**When** je crée un nouvel article
**Then** je peux remplir : titre, slug (auto-généré), corps rich text, image principale, date de publication, meta SEO (title, description)

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

## Epic 5 : SEO & Découvrabilité

Le site est optimisé pour les moteurs de recherche : meta tags dynamiques, sitemap XML, données structurées schema.org, et articles de blog optimisés SEO.

### Story 5.1 : SEO technique — Sitemap, données structurées & canoniques

En tant que moteur de recherche,
Je veux accéder à un sitemap XML, des données structurées et des balises canoniques,
Afin d'indexer correctement le site et afficher des résultats enrichis.

**Acceptance Criteria :**

**Given** un crawler accède à `/sitemap.xml`
**When** le sitemap est généré
**Then** toutes les pages du site sont listées (homepage, services, qui suis-je, mission, technologies, diagnostic, rendez-vous, contact, blog)
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
