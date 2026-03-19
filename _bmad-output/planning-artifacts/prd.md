---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - inline-brief-clbge
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  projectDocs: 0
  projectContext: 0
  inlineBrief: 1
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - CLBGE

**Author:** Onizuka
**Date:** 2026-03-15

## Executive Summary

Le Cabinet Laurent Bazile Géomètre-Expert (CLBGE) est un site vitrine + blog destiné à établir la présence digitale d'un nouveau cabinet de géomètre-expert en Guadeloupe, opérant sur l'ensemble de l'archipel guadeloupéen (Guadeloupe, Marie-Galante, Les Saintes, La Désirade). Le site cible trois audiences : particuliers, professionnels (architectes, notaires, marchands de biens, BTP) et administrations/collectivités.

Le problème central : les prospects ne savent souvent pas qu'ils ont besoin d'un géomètre, ni ce que fait concrètement ce professionnel. Le site doit éduquer autant que convertir, en rendant le métier compréhensible en quelques secondes et en proposant un tunnel fluide : comprendre le besoin → diagnostiquer via formulaire interactif (Tally) → prendre RDV avec paiement en ligne (Zcal Pro).

Le volet blog/CMS permet au client de publier en autonomie des articles SEO éducatifs ("Combien coûte un géomètre ?", "Qu'est-ce qu'un bornage ?") pour capter du trafic organique et renforcer le positionnement d'expert transparent et accessible.

### Ce qui rend ce projet unique

Laurent Bazile est un géomètre-expert nouvelle génération dans un marché guadeloupéen dominé par des professionnels proches de la retraite, sans présence digitale. Le site CLBGE sera le premier site professionnel de géomètre-expert en Guadeloupe à proposer :
- Une approche pédagogique du métier (section mission, technologies, blog éducatif)
- Un diagnostic interactif qui guide les visiteurs indécis vers le bon service
- Une prise de RDV + paiement en ligne, inédite dans cette profession localement
- Une transparence totale sur le processus, les technologies et les coûts

Le timing est stratégique : un "papy-boom" imminent dans la profession (2-3 ans) laisse un vide que Laurent entend combler avec une approche moderne et digitale. La prestation de serment du 11 mai 2025 marque le lancement opérationnel.

## Project Classification

- **Type de projet :** Web App (site vitrine + blog avec CMS back-office)
- **Domaine :** Services professionnels — Géomètre-Expert (topographie, foncier)
- **Complexité :** Low — intégrations tierces simples (Tally, Zcal Pro), pas de données réglementées, pas de logique métier complexe
- **Contexte :** Greenfield — création from scratch, domaine clbge.com

## Success Criteria

### User Success

**Particulier (prospect non-initié) :**
- Comprend en moins de 30 secondes ce que fait un géomètre-expert et s'il en a besoin
- Soumet le formulaire diagnostic Tally (succès pour les indécis) OU prend RDV via Zcal Pro (succès maximal)
- Parcours type : Homepage → Section services/mission → Tally ou RDV

**Professionnel (architecte, notaire, marchand de biens, BTP) :**
- Trouve les coordonnées de contact ou le lien de RDV en moins de 10 secondes
- Identifie Laurent comme un prestataire fiable et moderne (technologies, parcours)
- Parcours type : Homepage → Contact direct ou RDV Zcal Pro

**Administration / Collectivité :**
- Accède rapidement aux informations sur les prestations et les qualifications professionnelles
- Prend contact via le formulaire classique ou par téléphone

### Business Success

**À 3 mois (juillet 2025) :**
- Site indexé sur Google pour les requêtes clés ("géomètre Guadeloupe", "bornage Guadeloupe", "géomètre-expert Guadeloupe")
- 2-3 RDV/mois générés via le site (Zcal Pro)
- 2-3 articles de blog publiés
- Premières soumissions Tally reçues

**À 12 mois (mai 2026) :**
- Trafic organique en croissance grâce au contenu SEO
- Le site génère une part significative de nouveaux clients (au-delà du seul bouche-à-oreille)
- 10+ articles de blog publiés
- Laurent identifié comme "le géomètre moderne de Guadeloupe" en termes de présence digitale

### Measurable Outcomes

| Métrique | Cible MVP | Cible 12 mois |
|----------|-----------|---------------|
| RDV via site/mois | 2-3 | 8-10 |
| Soumissions Tally/mois | 3-5 | 10+ |
| Articles blog publiés | 0 (infra prête) | 10+ |
| Lighthouse Performance | > 90 | > 90 |
| Indexation Google | Requêtes principales | Top 5 local |

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche :** MVP hybride "problem-solving + experience" — périmètre fonctionnel minimal mais exécution visuelle soignée. Le positionnement "géomètre moderne et pro" impose un niveau de finition élevé sur ce qui est livré, même si on livre moins de features.

**Ressources :** 1 développeur solo, ~8 semaines (mi-mars → 11 mai 2025)

**Prérequis timeline :**
- PRD + architecture bouclés : semaine du 17-21 mars
- Contenus fournis par Laurent : avant fin mars / mi-avril
- Pas de changements de scope majeurs en cours de route

### MVP Feature Set (Phase 1 — Live 11 mai 2025)

**Core User Journeys supportés :**
- Parcours 1 (Marie, non-initiée) : blog infra + homepage + Tally + Zcal
- Parcours 2 (Thomas, informé) : homepage + Zcal direct
- Parcours 3 (Maître Célimène, pro) : coordonnées + crédibilité
- Parcours 4 (DST, administration) : crédibilité + contact
- Parcours 5 (Laurent, admin) : CMS blog prêt

**Must-Have :**
- Homepage complète (services, à propos, mission 5 étapes, technologies)
- Formulaire diagnostic Tally intégré
- Prise de RDV Zcal Pro intégrée
- Page contact (formulaire + coordonnées)
- Design mobile-first, responsive, professionnel
- SEO technique (meta, sitemap, données structurées)
- Blog CMS fonctionnel (vide au lancement, prêt à publier)
- Hébergement Vercel + domaine clbge.com + HTTPS
- WCAG 2.1 AA

### Phase 2 — Été 2025 (contenu + enrichissement)

- Premiers articles blog SEO ("Combien coûte un géomètre ?", "Qu'est-ce qu'un bornage ?")
- Photos terrain professionnelles (post-shooting)
- Vidéos YouTube intégrées (quand tournées)
- Optimisation SEO basée sur données Analytics
- Affinage des textes après retours terrain

### Phase 3 — 2026+ (expansion)

- Positionnement top Google local
- Potentiel espace client / suivi de dossier en ligne
- Devis automatisé
- Référence digitale du métier sur l'archipel

### Risk Mitigation Strategy

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **Contenus textes non prêts** | Moyen | Moyenne | Rédaction par le dev à partir des inputs de Laurent, version courte si besoin, affinage post-lancement |
| **Photos terrain manquantes** | Faible | Haute | Lancement avec portraits + illustrations sobres (icônes, visuels abstraits). Remplacement par vraies photos dès shooting fait. Pas de stock photo générique. |
| **Changements de scope** | Élevé | Faible | PRD verrouillé, tout changement majeur reporté en Phase 2 |
| **Timeline serrée** | Moyen | Faible | Scope MVP bien défini, 8 semaines suffisantes pour un site vitrine, architecture simple (MPA/SSG sur Vercel) |

## User Journeys

### Parcours 1 : Marie, particulière non-initiée — "Mon voisin empiète sur mon terrain"

**Situation :** Marie, 45 ans, propriétaire à Sainte-Anne. Son voisin a construit un muret qui semble déborder sur son terrain. Elle ne sait pas quoi faire ni vers qui se tourner. Son notaire lui dit "il vous faut un géomètre-expert".

**Opening Scene :** Marie tape "limites de propriété voisin Guadeloupe" sur Google. Elle tombe sur un article du blog CLBGE : "Qu'est-ce qu'un bornage ?". Elle comprend que c'est exactement son problème.

**Rising Action :** Elle clique vers la homepage, découvre la section "Comment se déroule une mission" — 5 étapes claires, pas de jargon. Elle se dit "ok, c'est simple". Elle voit le formulaire diagnostic : "Vous ne savez pas exactement ce dont vous avez besoin ?". Elle clique, répond aux 4 questions (type de projet : litige de limite, localisation : Sainte-Anne, documents : titre de propriété, urgence : modérée).

**Climax :** Le formulaire la redirige vers la prise de RDV Zcal Pro. Elle réserve un créneau de consultation et paye en ligne. En 5 minutes, elle est passée de "je ne sais pas quoi faire" à "j'ai un RDV avec un expert".

**Resolution :** Marie reçoit un email de confirmation. Elle se sent rassurée : elle a compris le processus, elle sait ce qui va se passer, et elle a un professionnel moderne qui répond vite.

**Capabilities révélées :** Blog SEO, formulaire diagnostic Tally, intégration Zcal Pro, section mission pédagogique, email de confirmation.

### Parcours 2 : Thomas, particulier informé — "J'ai besoin d'un bornage pour ma construction"

**Situation :** Thomas, 35 ans, fait construire sa maison à Baie-Mahault. Son architecte lui a dit qu'il devait faire borner son terrain avant le permis de construire.

**Opening Scene :** Thomas cherche "géomètre bornage Guadeloupe" sur Google. Il tombe sur clbge.com. Il sait déjà ce qu'il veut.

**Rising Action :** Il scanne la homepage en 15 secondes : services listés, bornage mentionné clairement. Il voit le bouton "Prendre RDV". Il ne passe pas par Tally — il sait ce dont il a besoin.

**Climax :** Il réserve directement un créneau via Zcal Pro, paye en ligne. Fait en 2 minutes.

**Resolution :** Thomas envoie le lien clbge.com à son architecte : "voilà mon géomètre". Le site sert de carte de visite pro.

**Capabilities révélées :** SEO technique, CTA RDV visible immédiatement, parcours rapide sans friction, crédibilité visuelle.

### Parcours 3 : Maître Célimène, notaire — "Je cherche un géomètre fiable pour mes clients"

**Situation :** Maître Célimène, notaire à Pointe-à-Pitre, a régulièrement besoin de recommander un géomètre-expert à ses clients pour des mutations, successions, divisions. Son ancien géomètre part à la retraite.

**Opening Scene :** Laurent la rencontre lors d'un événement professionnel et lui donne le lien clbge.com. Elle consulte le site le soir-même sur son téléphone.

**Rising Action :** Elle regarde la section "Qui suis-je" — parcours, qualifications, prestation de serment. Elle vérifie les services proposés : bornage, copropriété, division — tout ce dont ses clients ont besoin. Elle note la section technologies : "sérieux, équipé".

**Climax :** Elle trouve les coordonnées en 5 secondes (téléphone + email visibles). Elle enregistre le contact. Dès le lendemain, elle recommande Laurent à un client en mutation.

**Resolution :** Maître Célimène a désormais un géomètre fiable dans son réseau. Elle recommande clbge.com directement à ses clients, qui arrivent sur le site déjà en confiance.

**Capabilities révélées :** Coordonnées accessibles immédiatement, page "Qui suis-je" crédible, responsive mobile, liste de services claire.

### Parcours 4 : Direction des Services Techniques, Mairie de Basse-Terre — "Vérifier un prestataire"

**Situation :** La DST de Basse-Terre lance un marché pour un relevé topographique. Laurent a répondu à l'appel d'offres. L'agent vérifie sa crédibilité en ligne.

**Opening Scene :** L'agent tape "Cabinet Laurent Bazile géomètre" sur Google. Il tombe sur clbge.com.

**Rising Action :** Il consulte la page "Qui suis-je" (qualifications, inscription à l'Ordre), la section technologies (équipements professionnels), les services (topographie mentionnée). Il vérifie que tout est cohérent avec le dossier d'appel d'offres.

**Climax :** Le site confirme le sérieux du prestataire. L'agent note les coordonnées pour les échanges directs via le formulaire de contact.

**Resolution :** Le site a rempli son rôle de crédibilité institutionnelle. Laurent est perçu comme un professionnel structuré et moderne.

**Capabilities révélées :** SEO sur le nom du cabinet, page qualifications, section technologies, formulaire de contact, image professionnelle.

### Parcours 5 : Laurent (admin) — "Gérer ma présence en ligne"

**Situation :** Laurent, après ses journées terrain, veut publier un article de blog et vérifier ses leads.

**Opening Scene :** Le samedi matin, Laurent ouvre le back-office CMS sur son laptop. Il a rédigé un brouillon d'article "Combien coûte un géomètre en Guadeloupe ?".

**Rising Action :** Il copie-colle son texte dans l'éditeur, ajoute une photo, met en forme les titres. Il prévisualise l'article. Il publie en un clic. Il vérifie ensuite ses emails : 2 nouvelles soumissions Tally et 1 RDV Zcal Pro confirmé cette semaine.

**Climax :** L'article est en ligne en 10 minutes. Pas besoin de toucher du code, pas d'appel au développeur.

**Resolution :** Laurent gère sa présence digitale en autonomie. Le blog alimente le SEO, les leads arrivent par email. Simple, efficace.

**Capabilities révélées :** CMS intuitif, éditeur WYSIWYG, publication autonome, notifications email Tally/Zcal.

### Journey → Requirements Traceability

| Capability | Parcours | FRs associées |
|-----------|----------|---------------|
| Blog SEO (articles éducatifs) | 1, 5 | FR15-21, FR30 |
| Formulaire diagnostic Tally | 1 | FR6-7, FR10 |
| Prise de RDV Zcal Pro + paiement | 1, 2, 3 | FR8-9, FR11 |
| Section "Comment se déroule une mission" | 1 | FR4 |
| Section "Nos services" | 1, 2, 3, 4 | FR3 |
| Section "Qui suis-je" (qualifications) | 3, 4 | FR2 |
| Section "Nos technologies" | 3, 4 | FR5 |
| Coordonnées accessibles (header/footer) | 2, 3, 4 | FR12 |
| Formulaire de contact classique | 4 | FR13-14 |
| CMS back-office (blog) | 5 | FR17-21 |
| Responsive mobile | 1, 2, 3 | FR23 |
| SEO technique | 1, 2, 4 | FR26-30 |

## Functional Requirements

### Présentation & Identité

- **FR1 :** Le visiteur peut comprendre immédiatement les services proposés par le cabinet depuis la homepage
- **FR2 :** Le visiteur peut consulter le profil, le parcours et les qualifications de Laurent Bazile
- **FR3 :** Le visiteur peut consulter la liste détaillée des prestations proposées (bornage, copropriété, implantation, topographie, etc.)
- **FR4 :** Le visiteur peut consulter les 5 étapes du déroulement d'une mission (prise de contact → consultation → terrain → traitement → restitution)
- **FR5 :** Le visiteur peut consulter les technologies et équipements utilisés (logiciels et matériel terrain)

### Diagnostic & Conversion

- **FR6 :** Le visiteur peut remplir un formulaire diagnostic interactif pour identifier son besoin (type de projet, localisation, documents disponibles, urgence)
- **FR7 :** Le visiteur est redirigé vers la prise de RDV après soumission du formulaire diagnostic
- **FR8 :** Le visiteur peut prendre un rendez-vous de consultation en ligne
- **FR9 :** Le visiteur peut payer sa consultation en ligne lors de la prise de RDV
- **FR10 :** Laurent reçoit une notification email à chaque soumission de formulaire diagnostic
- **FR11 :** Laurent reçoit une notification email à chaque RDV pris et payé

### Contact & Accessibilité

- **FR12 :** Le visiteur peut accéder aux coordonnées du cabinet (téléphone, email) depuis n'importe quelle page
- **FR13 :** Le visiteur peut envoyer un message via un formulaire de contact classique
- **FR14 :** Laurent reçoit une notification email à chaque soumission du formulaire de contact

### Blog & Contenu SEO

- **FR15 :** Le visiteur peut consulter la liste des articles de blog
- **FR16 :** Le visiteur peut lire un article de blog individuel
- **FR17 :** Laurent peut créer un nouvel article de blog depuis un back-office
- **FR18 :** Laurent peut éditer et mettre en forme un article (titres, paragraphes, images, liens) sans compétence technique
- **FR19 :** Laurent peut prévisualiser un article avant publication
- **FR20 :** Laurent peut publier ou dépublier un article en un clic
- **FR21 :** Laurent peut ajouter des images à ses articles

### Navigation & Expérience

- **FR22 :** Le visiteur peut naviguer entre toutes les sections du site via un menu principal
- **FR23 :** Le visiteur peut naviguer de manière fluide sur mobile (menu responsive)
- **FR24 :** Le visiteur peut accéder à un CTA de prise de RDV depuis n'importe quelle page
- **FR25 :** Le visiteur peut identifier la zone d'intervention du cabinet (archipel guadeloupéen)

### SEO & Découvrabilité

- **FR26 :** Les pages du site sont indexables par les moteurs de recherche
- **FR27 :** Chaque page dispose de balises meta (title, description) optimisées
- **FR28 :** Le site génère un sitemap XML automatiquement
- **FR29 :** Le site dispose de données structurées (schema.org : LocalBusiness, ProfessionalService)
- **FR30 :** Les articles de blog sont optimisés pour le référencement (URL propres, balises heading, meta)

## Non-Functional Requirements

### Performance

- Temps de chargement initial (LCP) < 2.5 secondes sur mobile 4G
- Temps de chargement complet < 3 secondes sur mobile
- Score Lighthouse : Performance > 90, Best Practices > 90
- Poids total des pages < 1.5 MB (hors embeds Tally/Zcal)
- Images optimisées : formats modernes (WebP/AVIF), lazy loading, responsive srcset
- Temps de réponse serveur (TTFB) < 200ms (CDN Vercel)

### Sécurité

- HTTPS obligatoire sur toutes les pages (certificat automatique Vercel)
- Back-office CMS protégé par authentification
- Aucune donnée personnelle stockée côté serveur (formulaires gérés par Tally, paiements par Zcal Pro)
- Headers de sécurité : Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
- Protection contre le spam sur le formulaire de contact (honeypot ou captcha léger)

### Accessibilité

- Conformité WCAG 2.1 niveau AA
- Score Lighthouse Accessibility > 90
- Navigation complète au clavier
- Contrastes de couleurs conformes (ratio minimum 4.5:1)
- Textes alternatifs sur toutes les images
- Structure sémantique HTML (headings, landmarks, ARIA si nécessaire)

### SEO

- Score Lighthouse SEO > 95
- Pages statiques pré-rendues (SSG) pour indexation optimale
- URLs propres, lisibles, sans paramètres dynamiques
- Balises canoniques sur toutes les pages

### Intégrations

- Tally : embed fonctionnel sans dégradation de performance, fallback lien externe si iframe bloquée
- Zcal Pro : embed ou lien externe fonctionnel, ouverture dans un contexte clair pour l'utilisateur
- Google Analytics / Search Console : tracking opérationnel sans impact performance (chargement async)

## Technical Architecture

### Architecture Overview

Site vitrine multi-pages (MPA) avec blog CMS, optimisé SEO et performance. Architecture statique/SSG privilégiée pour maximiser la vitesse de chargement et le référencement. Aucun besoin temps réel.

### Décisions Techniques

- **Architecture :** MPA avec rendu statique (SSG) ou server-side rendering (SSR)
- **Hébergement :** Vercel (CDN Edge Network, CI/CD push to deploy, HTTPS automatique)
- **Domaine :** clbge.com
- **Support navigateur :** Chrome, Safari, Firefox, Edge — versions modernes (desktop + mobile)

### Responsive Design

- **Approche :** Mobile-first
- **Breakpoints :** Mobile (< 768px), Tablette (768-1024px), Desktop (> 1024px)
- **Navigation :** Menu hamburger mobile, navigation horizontale desktop
- **Images :** Responsive avec srcset, formats modernes (WebP)

### Intégrations Tierces

| Service | Usage | Méthode d'intégration |
|---------|-------|----------------------|
| Tally | Formulaire diagnostic interactif | Embed iframe ou script |
| Zcal Pro | Prise de RDV + paiement en ligne | Embed ou lien externe |
| Google Analytics / Search Console | Suivi trafic et indexation | Script tracking async |

### CMS Blog

Back-office intuitif permettant à Laurent de créer/éditer/publier des articles sans toucher au code (éditeur WYSIWYG ou Markdown simplifié). Publication et dépublication en un clic, prévisualisation avant mise en ligne.
