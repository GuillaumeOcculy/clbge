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

for (const { path, name } of PAGES) {
  test.describe(`Page ${name} (${path})`, () => {
    test('retourne un status 200 et a un h1 visible unique', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();
    });

    test('a un title non vide et un meta description', async ({ page }) => {
      await page.goto(path);

      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
    });

    test('a le header et le footer', async ({ page }) => {
      await page.goto(path);

      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('[data-testid="main-footer"]')).toBeVisible();
    });

    test('a le CTA "Prendre RDV" dans le header', async ({ page, isMobile }) => {
      await page.goto(path);

      const header = page.locator('header');
      const cta = header.getByRole('button', { name: /Prendre RDV/i }).or(
        header.getByRole('link', { name: /Prendre RDV/i })
      );
      if (isMobile) {
        await expect(cta.first()).toBeAttached();
      } else {
        await expect(cta.first()).toBeVisible();
      }
    });
  });
}
