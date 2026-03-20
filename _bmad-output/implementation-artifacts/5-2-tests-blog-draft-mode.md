# Story 5.2 : Tests du blog & du Draft Mode

Status: done

## Story

En tant que développeur,
Je veux des tests E2E couvrant le blog (liste, article, empty state) et le Draft Mode (Presentation Tool),
Afin de détecter les régressions sur les fonctionnalités Sanity et les intégrations serveur avant la prod.

## Acceptance Criteria

### AC1 : Empty state du blog

**Given** la page `/blog` est chargée
**When** aucun article n'est publié dans Sanity
**Then** l'empty state s'affiche avec le texte "Les premiers articles arrivent bientôt" et un lien vers `/contact`

### AC2 : Liste des articles blog

**Given** la page `/blog` est chargée
**When** des articles sont publiés dans Sanity
**Then** les articles sont affichés sous forme de cards avec titre, date, extrait et image
**And** les articles sont triés par date de publication (plus récent en premier)
**And** chaque card est cliquable et mène vers `/blog/[slug]`

### AC3 : Page article individuel

**Given** la page `/blog/[slug]` est chargée avec un article existant
**When** l'article s'affiche
**Then** le titre, la date formatée fr-FR, l'image principale et le corps rich text sont présents
**And** le CTA contextuel "Besoin d'un géomètre ?" est affiché en fin d'article
**And** le CtaBanner "Prendre rendez-vous" est affiché en bas de page
**And** les métadonnées (title, description, og:title) sont dynamiques et correspondent à l'article

### AC4 : 404 blog

**Given** la page `/blog/slug-inexistant` est chargée
**When** le slug ne correspond à aucun article
**Then** la page retourne un 404

### AC5 : Routes API Draft Mode

**Given** l'API route `/api/draft-mode/enable` existe
**When** un test vérifie sa disponibilité
**Then** la route répond (status 200 ou redirect selon l'authentification)

**Given** l'API route `/api/draft-mode/disable` est appelée
**When** le draft mode est désactivé
**Then** la route redirige vers la page d'origine ou la homepage

### AC6 : Sanity Studio

**Given** la page `/studio` est chargée
**When** le Sanity Studio se charge
**Then** la page ne retourne pas une erreur 500
**And** le DOM contient les éléments de base du Studio Sanity

## Tasks / Subtasks

- [x] Task 1 : Tests du blog — liste et empty state (AC: #1, #2)
  - [x] 1.1 Créer `tests/blog.spec.ts`
  - [x] 1.2 Test `/blog` : détection dynamique — si articles présents → vérifier cards (titre, date, lien `/blog/[slug]`), si pas d'articles → vérifier empty state ("Les premiers articles arrivent bientôt" + lien `/contact`)
  - [x] 1.3 Test `/blog` : vérifier le CtaBanner "Prendre rendez-vous" en bas de page
- [x] Task 2 : Tests article individuel (AC: #2, #3)
  - [x] 2.1 Test conditionnel : si articles existent sur `/blog`, récupérer le premier lien `a[href^="/blog/"]`, naviguer vers l'article
  - [x] 2.2 Vérifier : h1 (titre), date formatée (format fr-FR), présence du corps de l'article
  - [x] 2.3 Vérifier le CTA fin d'article : texte "Besoin d'un géomètre" + lien vers `/diagnostic`
  - [x] 2.4 Vérifier le CtaBanner "Prendre rendez-vous" en bas de page
  - [x] 2.5 Vérifier les métadonnées dynamiques : title non vide, meta description, og:title
- [x] Task 3 : Test 404 blog (AC: #4)
  - [x] 3.1 Test `/blog/slug-totalement-inexistant-xyz-404` retourne un 404 (pas un 500)
- [x] Task 4 : Tests Draft Mode API routes (AC: #5)
  - [x] 4.1 Créer `tests/draft-mode.spec.ts`
  - [x] 4.2 Test GET `/api/draft-mode/enable` : la route répond (pas de crash 500). Attendre un 4xx ou redirect (pas de token valide en test)
  - [x] 4.3 Test GET `/api/draft-mode/disable` : la route redirige (status 307 ou 302) vers la homepage ou le referer
- [x] Task 5 : Tests Sanity Studio (AC: #6)
  - [x] 5.1 Test `/studio` : la page ne retourne pas 500 (status 200)
  - [x] 5.2 Test `/studio` : un élément `#sanity` ou `[data-sanity]` est présent dans le DOM (Studio Sanity root)
- [x] Task 6 : Validation finale
  - [x] 6.1 Exécuter `npm run test:e2e` — tous les tests passent (anciens 100 + nouveaux)
  - [x] 6.2 Exécuter `npm run build` — build toujours OK
  - [x] 6.3 Exécuter `npm run lint` — pas de régression lint

## Dev Notes

### Stratégie de test blog — données Sanity dynamiques

Le blog dépend de Sanity pour les données. En environnement de test, deux scénarios possibles :

1. **Sanity pas alimenté** (pas de `NEXT_PUBLIC_SANITY_PROJECT_ID` ou aucun article publié) → l'empty state s'affiche
2. **Sanity alimenté** (articles publiés) → les cards s'affichent

**Approche : détection dynamique du contenu**, pas de mock. Les tests doivent être résilients aux deux cas.

```typescript
// Pattern de détection dynamique
test('affiche les articles ou l\'empty state', async ({ page }) => {
  await page.goto('/blog');

  const emptyState = page.getByText('Les premiers articles arrivent bientôt');
  const articleCards = page.locator('a[href^="/blog/"]');

  // L'un des deux doit être visible
  const hasArticles = await articleCards.count() > 0;

  if (hasArticles) {
    // Vérifier les cards
    const firstCard = articleCards.first();
    await expect(firstCard).toBeVisible();
  } else {
    // Vérifier l'empty state
    await expect(emptyState).toBeVisible();
    await expect(page.getByRole('link', { name: /nous contacter/i })).toHaveAttribute('href', '/contact');
  }
});
```

### Tests article individuel — conditionnel

Si des articles sont disponibles, naviguer vers le premier article et vérifier le contenu. Sinon, skipper gracieusement ces tests.

```typescript
test('article individuel affiche le contenu complet', async ({ page }) => {
  await page.goto('/blog');
  const firstArticleLink = page.locator('a[href^="/blog/"]').first();

  if (await firstArticleLink.count() === 0) {
    test.skip(); // Pas d'articles disponibles
    return;
  }

  const href = await firstArticleLink.getAttribute('href');
  await page.goto(href!);

  // Vérifications article
  await expect(page.locator('h1')).toBeVisible();
  // CTA fin d'article
  await expect(page.getByText('Besoin d\'un géomètre')).toBeVisible();
  await expect(page.getByRole('link', { name: /diagnostic/i })).toBeVisible();
});
```

### Test 404 blog

```typescript
test('retourne 404 pour un slug inexistant', async ({ page }) => {
  const response = await page.goto('/blog/slug-totalement-inexistant-xyz-404');
  expect(response?.status()).toBe(404);
});
```

### Draft Mode — stratégie de test

Le Draft Mode (`defineEnableDraftMode` de `next-sanity`) nécessite un token Sanity valide pour s'activer. En environnement de test, le token peut être absent.

**Ce qu'on teste :**
- **`/api/draft-mode/enable`** : la route répond sans crash (pas 500). Sans token valide, on attend un 401/403 ou un redirect. L'important est qu'elle ne crash pas.
- **`/api/draft-mode/disable`** : la route désactive le draft mode et redirige. Pas besoin de token.

```typescript
test('GET /api/draft-mode/enable répond sans crash', async ({ request }) => {
  const response = await request.get('/api/draft-mode/enable');
  // La route ne doit pas crasher (pas de 500)
  expect(response.status()).not.toBe(500);
});

test('GET /api/draft-mode/disable redirige', async ({ page }) => {
  const response = await page.goto('/api/draft-mode/disable');
  // La route redirige (vers referer ou homepage)
  // Après redirect, on devrait être sur la homepage ou une page valide
  expect(page.url()).toContain('localhost:3000');
});
```

**Note :** On utilise `request` (APIRequestContext Playwright) pour tester l'enable car c'est un appel API pur. On utilise `page` pour le disable car il redirige et on veut vérifier la destination.

### Sanity Studio — stratégie de test

Le Studio est un SPA React chargé côté client. Il met du temps à s'initialiser.

```typescript
test('/studio se charge sans erreur 500', async ({ page }) => {
  const response = await page.goto('/studio');
  expect(response?.status()).toBe(200);
});

test('/studio contient le root Sanity', async ({ page }) => {
  await page.goto('/studio');
  // Le Studio Sanity monte dans un div #sanity ou un élément avec data-ui
  const studioRoot = page.locator('#sanity, [data-ui="Flex"]');
  await expect(studioRoot.first()).toBeAttached({ timeout: 15000 });
});
```

**Attention :** Timeout augmenté car le Studio est un SPA lourd qui prend du temps à monter. Ne pas tester le contenu interne du Studio (c'est du code Sanity, pas le nôtre).

### Sélecteurs importants — composants existants

| Élément | Sélecteur | Fichier source |
|---------|-----------|----------------|
| Empty state blog | `getByText('Les premiers articles arrivent bientôt')` | `app/blog/page.tsx:79` |
| Lien contact empty state | `getByRole('link', { name: /nous contacter/i })` | `app/blog/page.tsx:83-87` |
| Cards articles | `a[href^="/blog/"]` | `components/blog/BlogPostCard.tsx` |
| CTA fin d'article | `getByText('Besoin d\'un géomètre')` | `components/blog/BlogCtaEndArticle.tsx:8` |
| Lien diagnostic CTA | `getByRole('link', { name: /diagnostic/i })` | `components/blog/BlogCtaEndArticle.tsx:10` |
| CtaBanner | `getByText('Prendre rendez-vous')` | `components/sections/CtaBanner.tsx` |
| DraftModeIndicator | `getByText('Mode prévisualisation')` | `components/blog/DraftModeIndicator.tsx:6` |
| Lien quitter draft | `getByRole('link', { name: /Quitter/i })` | `components/blog/DraftModeIndicator.tsx:8` |
| Studio root | `#sanity` ou `[data-ui="Flex"]` | `app/studio/[[...tool]]/page.tsx` |

### Structure des fichiers de test

Suivre les conventions établies en story 5.1 :
- Dossier : `tests/` à la racine
- Fichiers : `*.spec.ts`
- 2 nouveaux fichiers : `tests/blog.spec.ts` et `tests/draft-mode.spec.ts`
- Sélecteurs sémantiques Playwright (`getByRole`, `getByText`, `locator`) — PAS de classes CSS

### Métadonnées article — vérification

```typescript
// Vérifier les meta tags dynamiques d'un article
const title = await page.title();
expect(title).toContain('CLBGE'); // title contient CLBGE

const ogTitle = page.locator('meta[property="og:title"]');
await expect(ogTitle).toHaveAttribute('content', /.+/);
```

### Résultat attendu

Les tests de la story 5.1 produisent 100 tests (50 chromium + 50 mobile). Cette story ajoute environ 16-20 tests (8-10 par projet chromium/mobile). Total attendu : ~120 tests.

### Project Structure Notes

- `tests/blog.spec.ts` (nouveau) — tests blog listing, empty state, article individuel, CTA, metadata, 404
- `tests/draft-mode.spec.ts` (nouveau) — tests API routes draft mode enable/disable + Studio Sanity
- Aucun fichier existant modifié (pas de data-testid supplémentaires nécessaires)

### Previous Story Intelligence (Story 5.1)

**Learnings critiques :**
- **Projet mobile** : le projet `mobile` dans `playwright.config.ts` utilise Desktop Chrome avec viewport 390×844 (pas WebKit). Les tests s'exécutent sur les 2 projets automatiquement.
- **Footer Next.js dev overlay** : en dev mode, Next.js injecte un `<footer>` supplémentaire. Cibler `[data-testid="main-footer"]` pour le vrai footer.
- **`isMobile`** : disponible dans le contexte Playwright pour adapter les assertions (ex: CTA mobile est `toBeAttached` au lieu de `toBeVisible`).
- **Pattern de test paramétrique** : la story 5.1 utilise une boucle `for...of` sur un array de PAGES. Pour le blog, pas besoin de paramétrique car les tests sont conditionnels à la présence de données.
- **100 tests en ~15s** : performance excellente, garder le même pattern léger.
- **`test.skip()`** : utiliser pour les tests conditionnels (pas d'articles → skip les tests d'article individuel).

### Git Intelligence

Derniers commits pertinents :
- `2ea8fe7` feat: story 5.1 — setup Playwright & tests E2E pages statiques
- `62d76e2` feat: story 4.2 — blog côté admin (draft mode, desk structure, schema UX)
- `525a0ab` feat: story 4.1 — blog côté visiteur (liste et articles)

Convention de commit : `type: description en français`

### Tech Stack Reminder

| Tech | Version | Notes |
|------|---------|-------|
| Playwright | ^1.58.2 | Déjà installé (story 5.1) |
| Next.js | 16.2.0 | App Router, draftMode() async |
| next-sanity | 12.1.3 | defineEnableDraftMode |
| Sanity | 5.17.1 | Studio, Presentation Tool |

### Anti-patterns à éviter

- **NE PAS mocker Sanity** — les tests doivent être résilients aux données réelles (ou absentes)
- **NE PAS tester le contenu interne du Studio Sanity** — c'est du code tiers
- **NE PAS utiliser de classes CSS comme sélecteurs** — utiliser les sélecteurs sémantiques Playwright
- **NE PAS hardcoder des slugs d'articles** — utiliser la détection dynamique
- **NE PAS ajouter de timeouts arbitraires** — Playwright auto-wait est suffisant (sauf Studio : 15s)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5, Story 5.2]
- [Source: _bmad-output/planning-artifacts/architecture.md#Testing, Frontend Architecture]
- [Source: _bmad-output/implementation-artifacts/5-1-setup-playwright-tests-pages-statiques.md#Dev Notes, Completion Notes]
- [Source: app/blog/page.tsx — blog listing avec empty state et draft mode]
- [Source: app/blog/[slug]/page.tsx — article individuel avec draft mode et 404]
- [Source: app/api/draft-mode/enable/route.ts — defineEnableDraftMode next-sanity]
- [Source: app/api/draft-mode/disable/route.ts — disable avec redirect]
- [Source: components/blog/DraftModeIndicator.tsx — indicateur visuel draft mode]
- [Source: components/blog/BlogCtaEndArticle.tsx — CTA fin d'article]
- [Source: Playwright docs — APIRequestContext, storageState, test.skip]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Sélecteurs `getByText('Prendre rendez-vous')` et `getByRole('link', { name: /nous contacter/i })` ambigus car doublons avec le footer → corrigé en scopant au `main content` et en utilisant `.first()` pour le CtaBanner.

### Completion Notes List

- Créé `tests/blog.spec.ts` avec 7 tests : empty state/articles dynamique, CtaBanner blog, article contenu, CTA fin article, CtaBanner article, métadonnées, 404
- Créé `tests/draft-mode.spec.ts` avec 4 tests : enable (pas 500), disable (redirect), Studio status 200, Studio root DOM
- Approche de détection dynamique : les tests s'adaptent à la présence ou absence d'articles Sanity (test.skip si pas d'articles)
- Total : 122 tests (114 passed + 8 skipped), 0 failed, 0 régressions
- Build OK, lint OK

### Change Log

- 2026-03-20 : Implémentation story 5.2 — tests E2E blog, draft mode et Sanity Studio
- 2026-03-20 : Code review — ajout test tri par date (AC2), fix localhost hardcodé dans draft-mode.spec.ts

### File List

- `tests/blog.spec.ts` (nouveau)
- `tests/draft-mode.spec.ts` (nouveau)
