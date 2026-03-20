# Story 5.1 : Setup Playwright & tests des pages statiques

Status: done

## Story

En tant que développeur,
Je veux un framework de tests E2E fonctionnel avec une couverture de base sur toutes les pages statiques,
Afin de détecter les régressions de rendu, navigation et métadonnées à chaque changement de code.

## Acceptance Criteria

### AC1 : Installation et configuration Playwright

**Given** le projet n'a pas de framework de test
**When** Playwright est installé et configuré
**Then** `npx playwright test` exécute les tests sans erreur
**And** `playwright.config.ts` est configuré pour le dev server Next.js (`webServer`)
**And** les tests tournent en mode headless par défaut
**And** un script `npm run test:e2e` est ajouté au `package.json`

### AC2 : Tests des pages statiques — status 200, h1, metadata, navigation

**Given** les tests sont configurés
**When** les tests des pages statiques sont exécutés
**Then** chaque page du site (homepage, nos-prestations, qui-suis-je, notre-mission, nos-technologies, diagnostic, rendez-vous, contact, blog) retourne un status 200
**And** chaque page a un `<h1>` unique et visible
**And** chaque page a un `<title>` non vide et un meta description
**And** la navigation principale est présente sur chaque page (header, footer)
**And** le CTA "Prendre RDV" est visible dans le header

### AC3 : Tests responsive — mobile et desktop

**Given** les tests vérifient le responsive
**When** les tests sont exécutés en viewport mobile (375px) et desktop (1280px)
**Then** le menu hamburger est visible en mobile et le menu desktop en desktop
**And** aucune page n'a de contenu qui déborde horizontalement en mobile

### AC4 : Tests des embeds tiers

**Given** les tests vérifient les embeds tiers
**When** la page `/diagnostic` est chargée
**Then** l'iframe Tally est présente (ou le fallback s'affiche si le formulaire n'est pas configuré)
**When** la page `/rendez-vous` est chargée
**Then** l'iframe Zcal est présente (ou le fallback)
**When** la page `/contact` est chargée
**Then** l'iframe Google Maps est présente (ou le fallback)

## Tasks / Subtasks

- [x] Task 1 : Installer Playwright et configurer (AC: #1)
  - [x] 1.1 Installer `@playwright/test` en devDependency
  - [x] 1.2 Installer les navigateurs Playwright (`npx playwright install --with-deps chromium`)
  - [x] 1.3 Créer `playwright.config.ts` à la racine (voir Dev Notes)
  - [x] 1.4 Ajouter script `"test:e2e": "playwright test"` dans `package.json`
  - [x] 1.5 Ajouter `test-results/`, `playwright-report/`, `blob-report/` au `.gitignore`
  - [x] 1.6 Vérifier que `npx playwright test` se lance sans erreur (même sans tests)
- [x] Task 2 : Tests des pages statiques (AC: #2)
  - [x] 2.1 Créer `tests/pages-statiques.spec.ts`
  - [x] 2.2 Test paramétrique : pour chaque route, vérifier status 200, h1 visible unique, title non vide, meta description
  - [x] 2.3 Test navigation : header NavBar et Footer présents sur chaque page
  - [x] 2.4 Test CTA : bouton "Prendre RDV" visible dans le header
- [x] Task 3 : Tests responsive (AC: #3)
  - [x] 3.1 Créer `tests/responsive.spec.ts`
  - [x] 3.2 Tests mobile (375px) : menu hamburger visible, menu desktop masqué, pas de débordement horizontal
  - [x] 3.3 Tests desktop (1280px) : menu desktop visible, menu hamburger masqué
- [x] Task 4 : Tests des embeds tiers (AC: #4)
  - [x] 4.1 Créer `tests/embeds.spec.ts`
  - [x] 4.2 Test `/diagnostic` : iframe Tally ou fallback
  - [x] 4.3 Test `/rendez-vous` : iframe Zcal ou fallback
  - [x] 4.4 Test `/contact` : iframe Google Maps ou fallback
- [x] Task 5 : Validation finale
  - [x] 5.1 Exécuter `npm run test:e2e` — tous les tests passent (100/100)
  - [x] 5.2 Exécuter `npm run build` — build toujours OK
  - [x] 5.3 Exécuter `npm run lint` — pas de régression lint

## Dev Notes

### Configuration Playwright — playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
```

**Points critiques :**
- `webServer.command` = `npm run dev` (pas `npm run start` car pas de `next build` préalable nécessaire pour les tests de dev)
- Deux projets seulement : `chromium` (desktop 1280×720) et `mobile` (iPhone 12 = 390×844). Suffisant pour le MVP. Pas de Firefox/WebKit (overhead non justifié pour un site vitrine).
- `testDir: './tests'` — dossier dédié à la racine, pas de co-location (les tests E2E ne sont pas des tests unitaires de composants)

### Routes à tester

```typescript
const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/nos-prestations', name: 'Nos Prestations' },
  { path: '/qui-suis-je', name: 'Qui suis-je' },
  { path: '/notre-mission', name: 'Notre Mission' },
  { path: '/nos-technologies', name: 'Nos Technologies' },
  { path: '/diagnostic', name: 'Diagnostic' },
  { path: '/rendez-vous', name: 'Rendez-vous' },
  { path: '/contact', name: 'Contact' },
  { path: '/blog', name: 'Blog' },
] as const;
```

**Attention :** L'architecture mentionne `/nos-services/` mais le code réel utilise `/nos-prestations/`. Se fier au code, pas à l'architecture.

### Embeds tiers — stratégie de test

Les composants `TallyEmbed`, `ZcalEmbed` et l'iframe Google Maps utilisent des URLs configurées par variables d'environnement (`NEXT_PUBLIC_TALLY_*`, `NEXT_PUBLIC_ZCAL_*`, `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`). En environnement de test, ces variables peuvent être vides.

**Stratégie :** Tester la présence de l'iframe OU du composant fallback. Utiliser un sélecteur OR :
```typescript
// L'un des deux doit être visible
const embed = page.locator('iframe[src*="tally.so"], [data-testid="tally-fallback"]');
await expect(embed.first()).toBeVisible();
```

Si les composants n'ont pas de `data-testid` fallback, vérifier simplement que la page se charge sans erreur 500 et qu'un contenu est visible dans la zone embed.

### Navigation — sélecteurs

- **Header NavBar** : composant `NavBar.tsx` dans `components/layout/` — chercher le `<header>` ou `<nav>`
- **Footer** : composant `Footer.tsx` — chercher le `<footer>`
- **CTA "Prendre RDV"** : composant `CtaButton.tsx` — chercher un lien/bouton contenant le texte "Prendre RDV" ou similaire dans le header
- **Menu hamburger mobile** : composant `MobileMenu.tsx` — chercher le bouton hamburger (probablement un `<button>` avec aria-label ou icône Menu de lucide-react)

**Important :** Utiliser les sélecteurs sémantiques Playwright (`getByRole`, `getByText`, `locator('header')`, `locator('footer')`) plutôt que des classes CSS fragiles.

### Responsive — test de débordement horizontal

```typescript
// Vérifier qu'aucun élément ne déborde en mobile
const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
const viewportWidth = await page.evaluate(() => window.innerWidth);
expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
```

### Project Structure Notes

- Dossier `tests/` à la racine (PAS `__tests__/`, PAS co-localisé dans `app/` ou `components/`)
- L'architecture mentionne "Tests co-localisés `ComponentName.test.tsx`" mais cela concerne les tests unitaires éventuels, pas les tests E2E
- Fichiers de test : `*.spec.ts` (convention Playwright)
- Config : `playwright.config.ts` à la racine du projet

### Gitignore additions

```
# Playwright
test-results/
playwright-report/
blob-report/
```

### Previous Story Intelligence (Story 4.2)

**Learnings critiques pour cette story :**
- **CSP headers** dans `next.config.ts` bloquent potentiellement les WebSockets Playwright. Si les tests échouent avec des erreurs réseau, vérifier les CSP mais normalement Playwright bypass les CSP car il contrôle le navigateur.
- **Pattern de container** établi : `max-w-7xl mx-auto px-4 md:px-8 lg:px-16`
- **Pattern titre h1** : centré + séparateur rouge `<div className="mx-auto h-0.5 w-12 bg-primary" />`
- **3 bugs de configuration découverts en 4.2** (basePath Studio, CSP WebSocket, remotePatterns image) — exactement le type de bugs que les tests E2E auraient détectés. Cela confirme l'importance de cette story.
- **Build produit 14 pages** : toutes les routes statiques + API routes draft mode + Studio

### Git Intelligence

Derniers commits pertinents :
- `9e66943` chore: réorganisation epics — Epic 5 Tests E2E, Epic 6 SEO
- `900ffb7` retro: epic 4 — rétrospective Blog & Gestion de contenu
- `62d76e2` feat: story 4.2 — blog côté admin (draft mode, desk structure, schema UX)
- `525a0ab` feat: story 4.1 — blog côté visiteur (liste et articles)

Convention de commit : `type: description en français`

### Tech Stack Reminder

| Tech | Version | Notes |
|------|---------|-------|
| Next.js | 16.2.0 | App Router, Turbopack dev |
| React | 19.2.4 | Server Components |
| TypeScript | ^5 | Strict mode |
| Tailwind CSS | ^4 | CSS variables, pas de `tailwind.config.ts` |
| Node.js | 20.9+ | Runtime |
| Playwright | latest | A installer (`@playwright/test`) |

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5, Story 5.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Testing, Project Structure, Infrastructure]
- [Source: _bmad-output/implementation-artifacts/4-2-blog-cote-admin-creation-et-publication.md#Dev Notes, Review Feedback]
- [Source: Playwright docs — defineConfig, webServer, devices, assertions]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Problème initial : le projet mobile utilisait `devices['iPhone 12']` qui mappe sur WebKit (non installé). Corrigé en utilisant Desktop Chrome avec viewport mobile (390×844).
- Problème footer : Next.js dev mode injecte un overlay avec un `<footer>` supplémentaire. Corrigé en ciblant `footer.bg-foreground` spécifiquement.

### Completion Notes List

- ✅ Playwright installé (`@playwright/test` ^1.58.2) avec Chromium uniquement
- ✅ `playwright.config.ts` configuré : 2 projets (chromium desktop + mobile), webServer `npm run dev`, testDir `./tests`
- ✅ Script `test:e2e` ajouté au package.json
- ✅ `.gitignore` mis à jour (test-results, playwright-report, blob-report)
- ✅ 3 fichiers de tests créés : pages-statiques.spec.ts, responsive.spec.ts, embeds.spec.ts
- ✅ 100 tests passent (50 chromium desktop + 50 mobile) en ~15s
- ✅ Couverture : 9 pages statiques × (status 200, h1, metadata, navigation, CTA) + responsive + embeds tiers
- ✅ Build et lint OK sans régression

### Change Log

- 2026-03-20 : Implémentation complète story 5.1 — setup Playwright + 100 tests E2E pages statiques

### File List

- `playwright.config.ts` (nouveau) — configuration Playwright
- `tests/pages-statiques.spec.ts` (nouveau) — tests status 200, h1, metadata, navigation, CTA pour 9 pages
- `tests/responsive.spec.ts` (nouveau) — tests mobile/desktop : hamburger, nav, débordement
- `tests/embeds.spec.ts` (nouveau) — tests iframes Tally, Zcal, Google Maps
- `package.json` (modifié) — ajout devDependency @playwright/test + script test:e2e
- `.gitignore` (modifié) — ajout dossiers Playwright
- `package-lock.json` (modifié) — mis à jour par npm install @playwright/test
- `components/layout/Footer.tsx` (modifié) — ajout data-testid="main-footer" pour tests E2E
