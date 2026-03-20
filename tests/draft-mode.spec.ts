import { test, expect } from '@playwright/test';

test.describe('Draft Mode — API routes', () => {
  test('GET /api/draft-mode/enable répond sans crash', async ({ request }) => {
    const response = await request.get('/api/draft-mode/enable');
    // La route ne doit pas crasher (pas de 500)
    expect(response.status()).not.toBe(500);
  });

  test('GET /api/draft-mode/disable redirige', async ({ page }) => {
    const response = await page.goto('/api/draft-mode/disable');
    // Après redirect, on doit être sur une page valide
    expect(response?.status()).toBe(200);
    expect(page.url()).toMatch(/^https?:\/\/localhost/);
  });
});

test.describe('Sanity Studio', () => {
  test('/studio se charge sans erreur 500', async ({ page }) => {
    const response = await page.goto('/studio');
    expect(response?.status()).toBe(200);
  });

  test('/studio contient le root Sanity', async ({ page }) => {
    await page.goto('/studio');
    const studioRoot = page.locator('#sanity, [data-ui="Flex"]');
    await expect(studioRoot.first()).toBeAttached({ timeout: 15000 });
  });
});
