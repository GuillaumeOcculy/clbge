import { test, expect } from '@playwright/test';

test.describe('Embeds tiers', () => {
  test('page /identifier-mon-besoin — bouton popup Tally', async ({ page }) => {
    await page.goto('/identifier-mon-besoin');

    const button = page.locator('button[data-tally-open]');
    await expect(button).toBeVisible({ timeout: 10000 });
  });

  test('page /rendez-vous — iframe Zcal après choix de modalité', async ({ page }) => {
    await page.goto('/rendez-vous');

    await page.getByRole('button', { name: /Réserver une visio/i }).click();

    const embed = page.locator('iframe[src*="zcal.co"]');
    await expect(embed).toBeVisible({ timeout: 10000 });
  });

  test('page /contact — informations de contact', async ({ page }) => {
    await page.goto('/contact');

    const main = page.locator('main');
    await expect(main.locator('a[href*="mailto:"]')).toBeVisible();
    await expect(main.locator('a[href*="tel:"]').first()).toBeVisible();
  });
});
