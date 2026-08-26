# Story 3.3 : Formulaire de contact (Tally) & Google Maps

Status: done

## Story

En tant que visiteur,
Je veux envoyer un message au cabinet ou localiser ses bureaux,
Afin de poser une question ou me rendre sur place.

## Acceptance Criteria

1. **Given** je navigue vers `/contact` **When** la page se charge **Then** un formulaire de contact Tally est affiché en embed (nom, email, message) via le composant TallyEmbed **And** les coordonnées du cabinet sont affichées sur la page (téléphone click-to-call, email click-to-mailto, adresse) **And** un embed Google Maps affiche la localisation du cabinet à Petit-Bourg **And** le contenu de la page est fetché depuis Sanity (schéma `contactPage`)

2. **Given** le formulaire est soumis **When** je clique sur envoyer **Then** Laurent reçoit une notification email avec le contenu du message (natif Tally) **And** la protection anti-spam est gérée nativement par Tally

3. **Given** l'iframe Tally est bloquée **When** la page se charge **Then** un lien externe vers le formulaire est affiché en fallback

4. **And** la page exporte `generateMetadata()` avec meta tags optimisées

## Tasks / Subtasks

- [x] Task 1 : Créer la page `/contact` (AC: #1, #4)
  - [x] 1.1 Créer `app/contact/page.tsx` — Server Component
  - [x] 1.2 Fetcher le contenu depuis Sanity via `contactPageQuery` (déjà définie dans `sanity/lib/queries.ts`)
  - [x] 1.3 Titre h1 centré + séparateur rouge (pattern D1) : `<div className="mx-auto h-0.5 w-12 bg-primary" />`
  - [x] 1.4 Paragraphe d'introduction (depuis Sanity `introText`, fallback hardcodé si pas de contenu)
  - [x] 1.5 Layout 2 colonnes desktop (`lg:grid lg:grid-cols-2 lg:gap-12`) : colonne gauche = formulaire Tally, colonne droite = coordonnées + Google Maps. Stack vertical sur mobile.
  - [x] 1.6 Intégrer le composant `TallyEmbed` existant avec `formId` depuis Sanity (`tallyFormId`) ou variable d'environnement `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID`. **NE PAS passer de `redirectUrl`** — pas de redirection après soumission du formulaire contact (contrairement au diagnostic).
  - [x] 1.7 Section coordonnées : téléphone click-to-call (`tel:0690612422`), email click-to-mailto (`mailto:contact@clbge.com`), adresse Petit-Bourg Guadeloupe. Utiliser des icônes Lucide (`Phone`, `Mail`, `MapPin`).
  - [x] 1.8 Intégrer Google Maps embed (voir Task 2)
  - [x] 1.9 CtaBanner en bas de page : "Vous savez déjà ce dont vous avez besoin ?" → "Prendre rendez-vous" (href par défaut `/rendez-vous`)
  - [x] 1.10 Exporter `generateMetadata()` avec title, description, openGraph — utiliser les meta Sanity si disponibles (`metaTitle`, `metaDescription`), sinon fallback hardcodé
  - [x] 1.11 Container : `max-w-5xl mx-auto px-4 md:px-8 lg:px-16` — plus large que diagnostic/rendez-vous car layout 2 colonnes

- [x] Task 2 : Intégrer Google Maps embed (AC: #1)
  - [x] 2.1 Créer un composant `GoogleMapsEmbed` dans `components/embeds/GoogleMapsEmbed.tsx` — Client Component (`'use client'`)
  - [x] 2.2 Props : `src: string` (URL d'embed Google Maps), `title: string` (accessibilité)
  - [x] 2.3 L'iframe Google Maps utilise une URL au format : `https://www.google.com/maps/embed?pb=...` — l'URL exacte sera fournie par Laurent ou générée depuis Google Maps (partager → intégrer une carte)
  - [x] 2.4 Utiliser une variable d'environnement `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` pour stocker l'URL. Fallback : afficher un lien vers Google Maps si pas d'URL.
  - [x] 2.5 Iframe responsive : `width="100%"`, hauteur fixe `h-[300px] md:h-[350px]`, `rounded-lg`, `border-0`
  - [x] 2.6 Attribut `title="Localisation du cabinet CLBGE à Petit-Bourg, Guadeloupe"` sur l'iframe (accessibilité)
  - [x] 2.7 Attributs sécurité : `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowFullScreen`
  - [x] 2.8 Fallback si pas d'URL : afficher un texte "Petit-Bourg, Guadeloupe" avec un lien vers Google Maps (`https://maps.google.com/?q=Petit-Bourg+Guadeloupe`)

- [x] Task 3 : Mettre à jour le CSP pour Google Maps (AC: #1)
  - [x] 3.1 Ajouter `https://www.google.com` et `https://maps.google.com` dans la directive `frame-src` de `next.config.ts`
  - [x] 3.2 Le CSP actuel : `frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co` → ajouter Google Maps

- [x] Task 4 : Ajouter les variables d'environnement (AC: #1)
  - [x] 4.1 Ajouter `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` dans `.env.example` avec commentaire
  - [x] 4.2 Ajouter `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` dans `.env.example` avec commentaire (si pas déjà présent)
  - [x] 4.3 Ajouter les valeurs placeholder dans `.env.local`

- [x] Task 5 : Validation (AC: #1, #2, #3, #4)
  - [x] 5.1 `npm run build` réussit sans erreur
  - [x] 5.2 `npm run lint` passe
  - [x] 5.3 La page `/contact` s'affiche avec le titre, le formulaire Tally et la section coordonnées
  - [x] 5.4 Le TallyEmbed affiche le Skeleton en loading puis le formulaire ou fallback lien
  - [x] 5.5 Les coordonnées affichent téléphone (click-to-call), email (click-to-mailto), adresse
  - [x] 5.6 Google Maps affiche le fallback lien (pas d'URL réelle pour le moment)
  - [x] 5.7 Responsive : vérifier mobile (375px), tablette (768px), desktop (1200px+)
  - [x] 5.8 Le h1 est unique sur la page
  - [x] 5.9 `generateMetadata()` est exporté avec title et description
  - [x] 5.10 L'iframe Tally a un attribut `title`
  - [x] 5.11 Le CtaBanner s'affiche en bas de page avec lien vers `/rendez-vous`

## Dev Notes

### Architecture & Patterns obligatoires

- **La page `contact/page.tsx` est un Server Component** — Fetche le contenu depuis Sanity au build (SSG). Le TallyEmbed et GoogleMapsEmbed sont les seuls composants client.
- **TallyEmbed est un composant EXISTANT** — `components/embeds/TallyEmbed.tsx`. NE PAS le recréer. L'importer directement. Props : `formId`, `redirectUrl` (optionnel — NE PAS le passer pour le contact), `title`.
- **GoogleMapsEmbed est un NOUVEAU composant** — Plus simple que TallyEmbed/ZcalEmbed car Google Maps est rarement bloqué. Pas besoin du pattern timeout/fallback complexe. Un simple fallback si l'URL est absente suffit.
- **Contenu Sanity** — Le schéma `contactPage` et la query `contactPageQuery` EXISTENT DÉJÀ. Les utiliser directement. La query retourne : `title`, `introText`, `tallyFormId`, `metaTitle`, `metaDescription`.
- **Tailwind v4** — Pas de `tailwind.config.ts`. Les couleurs sont en CSS variables dans `globals.css` via `@theme`.
- **Button `render` prop** — shadcn/ui v4.0.8 avec @base-ui/react. Utiliser `render={<Link href="..." />}`, PAS `asChild`.
- **Pattern D1** — Titre h1 centré + séparateur rouge : `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- **Container** — `max-w-5xl mx-auto px-4 md:px-8 lg:px-16` (plus large que diagnostic/rendez-vous car layout 2 colonnes).
- **CtaBanner** — Composant existant dans `components/sections/CtaBanner.tsx`. Props : `title`, `subtitle`, `buttonText`, `href` (optionnel, défaut `/rendez-vous`). Le href par défaut convient ici.

### Différences avec la page `/diagnostic`

| Aspect | `/diagnostic` | `/contact` |
|--------|--------------|------------|
| Layout | 1 colonne centrée | 2 colonnes desktop (formulaire + coordonnées/maps) |
| Container | `max-w-3xl` | `max-w-5xl` (plus large) |
| TallyEmbed `redirectUrl` | `/rendez-vous` | Aucun (pas de redirection) |
| Contenu additionnel | Aucun | Coordonnées + Google Maps |
| Source contenu | Sanity `diagnosticPage` ou hardcodé | Sanity `contactPage` |
| CtaBanner direction | → `/rendez-vous` | → `/rendez-vous` (même direction) |

### Composant GoogleMapsEmbed — Spécifications

**Approche simplifiée :** Google Maps embed est un iframe standard qui fonctionne de manière fiable. Pas besoin du pattern complexe timeout/fallback de TallyEmbed/ZcalEmbed. L'iframe Google Maps est rarement bloquée par les ad-blockers.

**URL d'embed Google Maps :** Format standard :
```
https://www.google.com/maps/embed?pb=!1m18!1m12!...
```
Cette URL est générée en allant sur Google Maps → Partager → Intégrer une carte → Copier le code HTML. L'URL exacte sera fournie par Laurent.

**Fallback si pas d'URL :** Afficher un bloc avec l'adresse textuelle et un lien vers Google Maps :
```
📍 Petit-Bourg, Guadeloupe
Voir sur Google Maps →
```

### Section coordonnées — Layout

```
┌──────────────────────────────────────────────┐
│           Contactez-nous (h1 + D1)           │
│              Texte introduction               │
├──────────────────┬───────────────────────────┤
│  Formulaire      │  Coordonnées              │
│  Tally embed     │  📞 06 90 61 24 22        │
│  (TallyEmbed)    │  ✉️ contact@clbge.com     │
│                  │  📍 Petit-Bourg, GP        │
│                  │                           │
│                  │  [Google Maps embed]       │
│                  │                           │
├──────────────────┴───────────────────────────┤
│              CtaBanner (RDV)                  │
└──────────────────────────────────────────────┘
```

Sur mobile : stack vertical — titre → intro → formulaire Tally → coordonnées → Google Maps → CtaBanner.

### Coordonnées du cabinet (hardcodées)

- **Téléphone :** `06 90 61 24 22` — lien `tel:0690612422`
- **Email :** `contact@clbge.com` — lien `mailto:contact@clbge.com`
- **Adresse :** Petit-Bourg, Guadeloupe

Ces coordonnées sont hardcodées dans le Footer existant. Pour la page contact, les reprendre directement (pas besoin de les mettre dans Sanity — cohérence avec le Footer).

### Composants existants à RÉUTILISER

- `components/embeds/TallyEmbed.tsx` — Formulaire Tally embed (déjà créé story 3.1)
- `components/sections/CtaBanner.tsx` — Bandeau CTA (props: title, subtitle, buttonText, href)
- `components/ui/skeleton.tsx` — Skeleton loading state (utilisé par TallyEmbed en interne)
- `components/ui/button.tsx` — Boutons shadcn/ui

### Pages existantes comme référence

- `app/diagnostic/page.tsx` — Modèle pour la structure de page (pattern D1, generateMetadata, CtaBanner). Adapter le layout pour 2 colonnes.
- `app/rendez-vous/page.tsx` — Modèle pour l'intégration d'un embed avec CtaBanner.

### Schéma Sanity `contactPage` — Déjà créé

Champs disponibles :
- `title` (string) — Titre de la page
- `introText` (text) — Texte d'introduction
- `tallyFormId` (string) — ID du formulaire Tally contact
- `metaTitle` (string, max 60 chars) — Title SEO
- `metaDescription` (text, max 160 chars) — Description SEO

**IMPORTANT :** Si aucun document `contactPage` n'existe dans Sanity, la page doit fonctionner avec des fallbacks hardcodés :
- title fallback : "Contactez-nous"
- introText fallback : "Une question ? Un projet ? Contactez le cabinet CLBGE. Nous vous répondons sous 24h."
- tallyFormId : utiliser `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` en priorité, puis fallback Sanity, puis fallback vide (le TallyEmbed gère l'absence de formId)

### Query GROQ — Déjà définie

```typescript
export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0] {
    title,
    introText,
    tallyFormId,
    metaTitle,
    metaDescription
  }
`)
```
Importée depuis `@/sanity/lib/queries`.

### CSP (Content-Security-Policy) — Modification requise

Le CSP actuel dans `next.config.ts` autorise Tally et Zcal. Il faut ajouter Google Maps :

**Avant :**
```
frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co
```

**Après :**
```
frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co https://www.google.com https://maps.google.com
```

### generateMetadata() — Pattern

```typescript
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(contactPageQuery);
  return {
    title: data?.metaTitle || "Contact — CLBGE, Géomètre-Expert en Guadeloupe",
    description: data?.metaDescription || "Contactez Laurent Bazile, géomètre-expert en Guadeloupe. Formulaire de contact, téléphone, email. Cabinet situé à Petit-Bourg.",
    openGraph: {
      title: data?.metaTitle || "Contact — CLBGE",
      description: data?.metaDescription || "Contactez le cabinet CLBGE à Petit-Bourg, Guadeloupe.",
      type: "website",
    },
  };
}
```

### Supprimer le `<main>` wrapper

NE PAS ajouter de `<main>` dans `page.tsx` — le layout global a déjà `<main id="main-content">`. Utiliser un fragment `<>` ou un `<div>`.

### Intelligence Story 3.2 (story précédente)

- ZcalEmbed créé en suivant le pattern exact de TallyEmbed
- CtaBanner enrichi d'une prop `href` optionnelle (défaut `/rendez-vous`) — fonctionne pour la page contact sans modification
- Pattern D1 confirmé : titre h1 centré + séparateur rouge `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- Container `max-w-3xl` pour les pages 1 colonne → adapter à `max-w-5xl` pour la page contact (2 colonnes)
- Tailwind v4, pas de tailwind.config.ts
- Button `render` prop (pas `asChild`)
- shadcn/ui v4.0.8 — @base-ui/react (pas Radix UI)
- Build OK : 10 pages statiques (après story 3.2), lint OK

### Notifications email et anti-spam

Les notifications email à Laurent après soumission du formulaire contact sont **natives à Tally** — configurées dans le dashboard Tally. La protection anti-spam est également **native Tally**. Pas de code à écrire côté Next.js.

### Anti-patterns à éviter

- **NE PAS** recréer le composant TallyEmbed — il existe déjà, l'importer
- **NE PAS** utiliser `asChild` sur Button — utiliser `render` prop (@base-ui/react)
- **NE PAS** ajouter un `<main>` dans page.tsx — déjà dans layout
- **NE PAS** créer de fichier `tailwind.config.ts`
- **NE PAS** utiliser `@apply` dans Tailwind
- **NE PAS** oublier le `title` sur les iframes (Tally + Google Maps)
- **NE PAS** passer `redirectUrl` au TallyEmbed pour le formulaire contact — pas de redirection après soumission
- **NE PAS** gérer les notifications email ou l'anti-spam côté code — c'est natif Tally
- **NE PAS** fetch côté client avec `useEffect` pour du contenu Sanity — c'est SSG au build
- **NE PAS** inventer des coordonnées — utiliser les mêmes que le Footer (06 90 61 24 22, contact@clbge.com, Petit-Bourg)
- **NE PAS** mettre les coordonnées dans Sanity — elles sont hardcodées dans le Footer et doivent rester cohérentes

### Pièges techniques critiques

1. **Pas de `redirectUrl` sur TallyEmbed** — Contrairement à la page diagnostic qui redirige vers `/rendez-vous`, la page contact NE DOIT PAS rediriger après soumission. Ne pas passer la prop `redirectUrl`.
2. **Sanity content optionnel** — La page doit fonctionner sans document `contactPage` dans Sanity. Tous les champs ont des fallbacks hardcodés.
3. **Google Maps CSP** — L'iframe Google Maps sera bloquée si `www.google.com` n'est pas ajouté au CSP. C'est un changement obligatoire dans `next.config.ts`.
4. **tallyFormId source** — Priorité : variable env `NEXT_PUBLIC_TALLY_CONTACT_FORM_ID` > Sanity `tallyFormId` > chaîne vide (TallyEmbed gère gracieusement l'absence de formId).
5. **Layout 2 colonnes** — Utiliser `lg:grid lg:grid-cols-2 lg:gap-12`. Sur mobile/tablette, les colonnes s'empilent. Le formulaire Tally est en premier (plus important), les coordonnées/maps en second.
6. **`'use client'` uniquement sur GoogleMapsEmbed et TallyEmbed** — La page reste Server Component.
7. **Icônes Lucide** — Utiliser `Phone`, `Mail`, `MapPin` de `lucide-react`. Accompagnées de texte → ajouter `aria-hidden="true"`.

### Project Structure Notes

- `app/contact/page.tsx` → nouveau (Server Component, page contact FR13-14)
- `components/embeds/GoogleMapsEmbed.tsx` → nouveau (Client Component, iframe Google Maps)
- `next.config.ts` → modifié (ajout Google Maps dans frame-src CSP)
- `.env.example` → modifié (ajout NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL, NEXT_PUBLIC_TALLY_CONTACT_FORM_ID)

### References

- [Source: planning-artifacts/epics.md#Story 3.3] — Acceptance criteria, FR13, FR14, UX-DR16
- [Source: planning-artifacts/architecture.md#Requirements → Structure Mapping] — FR13-14 → app/contact/page.tsx + components/embeds/TallyEmbed.tsx
- [Source: planning-artifacts/architecture.md#Enforcement Guidelines] — Server Components par défaut, 'use client' pour embeds
- [Source: planning-artifacts/architecture.md#API & Communication Patterns] — Embed Tally, pas d'API route
- [Source: planning-artifacts/ux-design-specification.md#Custom Components > TallyEmbed] — Props: formId/redirectUrl/title, states: Skeleton → iframe → fallback
- [Source: planning-artifacts/ux-design-specification.md#UX-DR16] — Google Maps embed sur `/contact` uniquement
- [Source: planning-artifacts/ux-design-specification.md#Feedback Patterns] — Skeleton loading, fallback lien externe
- [Source: sanity/schemas/contactPage.ts] — Schéma Sanity existant
- [Source: sanity/lib/queries.ts#contactPageQuery] — Query GROQ existante
- [Source: implementation-artifacts/3-2-prise-de-rdv-paiement-en-ligne-zcal-pro.md] — Intelligence story précédente

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré.

### Completion Notes List

- Page `/contact` créée en Server Component avec fetch Sanity (contactPageQuery) et fallbacks hardcodés
- Layout 2 colonnes desktop (formulaire Tally + coordonnées/Google Maps), stack vertical sur mobile
- TallyEmbed réutilisé sans `redirectUrl` (pas de redirection après soumission contact)
- GoogleMapsEmbed créé — Server Component simple avec fallback lien si pas d'URL d'embed
- Coordonnées hardcodées (cohérence avec Footer) : téléphone click-to-call, email click-to-mailto, adresse avec icônes Lucide
- CSP mis à jour dans next.config.ts pour autoriser les iframes Google Maps
- Variables d'environnement ajoutées dans .env.example et .env.local
- generateMetadata() avec meta Sanity ou fallback hardcodé
- CtaBanner en bas de page vers /rendez-vous (href par défaut)
- Build OK (11 pages statiques), lint OK
- Pattern D1 appliqué (h1 centré + séparateur rouge), container max-w-5xl

### Change Log

- 2026-03-19 : Implémentation complète de la story 3.3 — page contact, GoogleMapsEmbed, CSP, variables d'environnement
- 2026-03-19 : Code review — suppression `'use client'` inutile sur GoogleMapsEmbed (Server Component), ajout `aria-hidden` sur icône ExternalLink

### File List

- `app/contact/page.tsx` — nouveau (Server Component, page contact)
- `components/embeds/GoogleMapsEmbed.tsx` — nouveau (Server Component, iframe Google Maps avec fallback)
- `next.config.ts` — modifié (ajout Google Maps dans frame-src CSP)
- `.env.example` — modifié (ajout NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL)
- `.env.local` — modifié (ajout NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — modifié (story 3-3 → review)
