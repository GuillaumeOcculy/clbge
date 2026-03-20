# Sprint Change Proposal — 2026-03-20

## 1. Résumé du problème

**Déclencheur :** Rétrospective Epic 4 (2026-03-20)

L'absence de tests automatisés a été identifiée comme risque systémique pour la 3ème retro consécutive. La story 4.2 a révélé 3 bugs de configuration (basePath Studio, CSP WebSocket, remotePatterns image) invisibles au build et au lint, découverts uniquement par test manuel. L'équipe a décidé unanimement d'insérer un epic dédié aux tests E2E avant l'Epic SEO.

## 2. Analyse d'impact

### Impact Epic

| Epic | Impact | Détail |
|------|--------|--------|
| Epic 4 (Blog) | Aucun | Terminé, déclenche le changement |
| Epic 5 (ancien SEO) | Renuméroté → Epic 6 | Contenu inchangé, stories 5.1/5.2 → 6.1/6.2 |
| Epic 5 (nouveau Tests) | Créé | 2 stories : setup Playwright + tests blog/draft mode |

### Impact Artifacts

| Artifact | Impact |
|----------|--------|
| PRD | Aucun — le MVP (FR1-FR30) reste inchangé |
| Architecture | Aucun — Playwright est un outil de test, pas un choix architectural |
| UX Design | Aucun — les tests valident l'UX existante |
| epics.md | Modifié — Epic 5 inséré, ancien Epic 5 → Epic 6, tableau FR mis à jour |
| sprint-status.yaml | Modifié — déjà mis à jour en retro |

## 3. Approche retenue

**Direct Adjustment** — Insertion d'un epic + renumérotation.

**Justification :**
- Effort : Low (ajout de stories et renumérotation)
- Risque : Low (aucune fonctionnalité retirée, MVP inchangé)
- Bénéfice : High (sécurise toutes les livraisons passées et futures)
- Le SEO mal testé est pire que pas de SEO (pénalités Google silencieuses)
- L'Epic 6 (SEO) sera livré avec ses tests dès le départ

## 4. Changements appliqués

### epics.md

- **Epic List (résumé)** : Epic 5 = Tests E2E & Qualité ajouté, Epic 6 = SEO & Performance (ancien Epic 5)
- **Tableau FR** : FR26-FR30 remappées vers Epic 6
- **Section détaillée Epic 5** : 2 nouvelles stories (5.1 setup Playwright + pages statiques, 5.2 blog + draft mode)
- **Section détaillée Epic 6** : Ancien contenu Epic 5 renommé (stories 6.1, 6.2)

### sprint-status.yaml

- Epic 5 = backlog (Tests E2E)
- Epic 6 = backlog (SEO, stories 6-1 et 6-2)
- Mis à jour lors de la retro Epic 4

## 5. Handoff

**Scope :** Moderate — réorganisation du backlog

| Responsable | Action |
|-------------|--------|
| Bob (SM) | Créer les story files individuels pour Epic 5 (5-1, 5-2) via `create-story` |
| Onizuka | Déployer sur Vercel + tester draft mode (action item retro) |
| Amelia (Dev) | Implémenter les stories Epic 5 |

**Critères de succès :**
- `npx playwright test` passe sur toutes les pages
- Couverture des pages statiques, blog, embeds, draft mode, responsive
- Framework prêt pour que l'Epic 6 soit livré avec tests
