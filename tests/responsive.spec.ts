import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/nos-prestations', name: 'Nos Prestations' },
  { path: '/qui-suis-je', name: 'Qui suis-je' },
  { path: '/notre-mission', name: 'Notre Mission' },
  { path: '/nos-technologies', name: 'Nos Technologies' },
  { path: '/diagnostic', name: 'Diagnostic' },
  { path: '/rendez-vous', name: 'Rendez-vous' },
  { path: '/contact', name: 'Contact' },
] as const;

test.describe('Responsive — mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('menu hamburger visible, menu desktop masqué', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.getByLabel('Ouvrir le menu');
    await expect(hamburger).toBeVisible();

    const desktopNav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(desktopNav).toBeHidden();
  });

  for (const { path, name } of PAGES) {
    test(`${name} — pas de débordement horizontal`, async ({ page }) => {
      await page.goto(path);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });
  }
});

test.describe('Responsive — desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('menu desktop visible, menu hamburger masqué', async ({ page }) => {
    await page.goto('/');

    const desktopNav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(desktopNav).toBeVisible();

    const hamburger = page.getByLabel('Ouvrir le menu');
    await expect(hamburger).toBeHidden();
  });
});
