const { test, expect } = require('@playwright/test');

test('menu principal está visível e possui links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();
  expect(await nav.locator('a[href]').count()).toBeGreaterThan(0);
});
