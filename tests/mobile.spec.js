const { test, expect } = require('@playwright/test');

test.use({ viewport: { width: 390, height: 844 } });

test('página inicial abre em viewport mobile', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const r = await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(r.status()).toBe(200);
  await expect(page.locator('body')).toBeVisible();
  expect(errors).toEqual([]);
});
