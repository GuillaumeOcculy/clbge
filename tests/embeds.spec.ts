import { test, expect } from '@playwright/test';

test.describe('Embeds tiers', () => {
  test('page /diagnostic — iframe Tally ou fallback', async ({ page }) => {
    await page.goto('/diagnostic');

    const embed = page.locator(
      'iframe[title="Formulaire de diagnostic"], a[href*="tally.so"]'
    );
    await expect(embed.first()).toBeVisible({ timeout: 10000 });
  });

  test('page /rendez-vous — iframe Zcal ou fallback', async ({ page }) => {
    await page.goto('/rendez-vous');

    const embed = page.locator(
      'iframe[title="Prise de rendez-vous"], a[href*="zcal"]'
    );
    await expect(embed.first()).toBeVisible({ timeout: 10000 });
  });

  test('page /contact — iframe Google Maps ou fallback', async ({ page }) => {
    await page.goto('/contact');

    const embed = page.locator(
      'iframe[title*="Localisation"], a[href*="maps.google.com"]'
    );
    await expect(embed.first()).toBeVisible({ timeout: 10000 });
  });
});
