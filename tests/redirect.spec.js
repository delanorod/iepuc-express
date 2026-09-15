const { test, expect } = require('@playwright/test');

test('HTTP redireciona para HTTPS', async ({ page }) => {
  const target = process.env.BASE_URL || 'https://www.iepuc.local';
  const http = target.replace(/^https:/, 'http:');
  const response = await page.goto(http + '/institucional.html', { waitUntil: 'domcontentloaded' });
  expect(response.status()).toBe(200);
  expect(page.url()).toMatch(/^https:\/\//);
});
