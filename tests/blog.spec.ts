import { test, expect } from '@playwright/test';

test.describe('Blog — liste et empty state', () => {
  test('affiche les articles ou l\'empty state', async ({ page }) => {
    await page.goto('/blog');

    const articleCards = page.locator('a[href^="/blog/"]');
    const hasArticles = (await articleCards.count()) > 0;

    if (hasArticles) {
      const firstCard = articleCards.first();
      await expect(firstCard).toBeVisible();
    } else {
      await expect(
        page.getByText('Les premiers articles arrivent bientôt'),
      ).toBeVisible();
      const mainContent = page.locator('#main-content, main, section').first();
      await expect(
        mainContent.getByRole('link', { name: /nous contacter/i }),
      ).toHaveAttribute('href', '/contact');
    }
  });

  test('a le CtaBanner "Prendre rendez-vous"', async ({ page }) => {
    await page.goto('/blog');
    await expect(
      page.getByRole('link', { name: 'Prendre rendez-vous', exact: true }).first(),
    ).toBeVisible();
  });

  test('articles triés par date décroissante', async ({ page }) => {
    await page.goto('/blog');
    const timeElements = page.locator('time[datetime]');
    const count = await timeElements.count();

    if (count < 2) {
      test.skip();
      return;
    }

    const dates: number[] = [];
    for (let i = 0; i < count; i++) {
      const datetime = await timeElements.nth(i).getAttribute('datetime');
      dates.push(new Date(datetime!).getTime());
    }

    for (let i = 0; i < dates.length - 1; i++) {
      expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
    }
  });
});

test.describe('Blog — article individuel', () => {
  test('article affiche le contenu complet', async ({ page }) => {
    await page.goto('/blog');
    const firstArticleLink = page.locator('a[href^="/blog/"]').first();

    if ((await firstArticleLink.count()) === 0) {
      test.skip();
      return;
    }

    const href = await firstArticleLink.getAttribute('href');
    await page.goto(href!);

    // Titre
    await expect(page.locator('h1')).toBeVisible();

    // Date formatée fr-FR
    await expect(page.locator('time')).toBeVisible();

    // Corps de l'article
    await expect(page.locator('article, [data-testid="blog-content"], .prose').first()).toBeVisible();
  });

  test('article a le CTA fin d\'article', async ({ page }) => {
    await page.goto('/blog');
    const firstArticleLink = page.locator('a[href^="/blog/"]').first();

    if ((await firstArticleLink.count()) === 0) {
      test.skip();
      return;
    }

    const href = await firstArticleLink.getAttribute('href');
    await page.goto(href!);

    await expect(page.getByText('Besoin d\'un géomètre')).toBeVisible();
    await expect(
      page.getByRole('link', { name: /diagnostic/i }),
    ).toBeVisible();
  });

  test('article a le CtaBanner "Prendre rendez-vous"', async ({ page }) => {
    await page.goto('/blog');
    const firstArticleLink = page.locator('a[href^="/blog/"]').first();

    if ((await firstArticleLink.count()) === 0) {
      test.skip();
      return;
    }

    const href = await firstArticleLink.getAttribute('href');
    await page.goto(href!);

    await expect(
      page.getByRole('link', { name: 'Prendre rendez-vous', exact: true }).first(),
    ).toBeVisible();
  });

  test('article a les métadonnées dynamiques', async ({ page }) => {
    await page.goto('/blog');
    const firstArticleLink = page.locator('a[href^="/blog/"]').first();

    if ((await firstArticleLink.count()) === 0) {
      test.skip();
      return;
    }

    const href = await firstArticleLink.getAttribute('href');
    await page.goto(href!);

    // Title non vide
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // og:title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });
});

test.describe('Blog — 404', () => {
  test('retourne 404 pour un slug inexistant', async ({ page }) => {
    const response = await page.goto('/blog/slug-totalement-inexistant-xyz-404');
    expect(response?.status()).toBe(404);
  });
});
