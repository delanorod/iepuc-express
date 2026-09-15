const { test, expect } = require('@playwright/test');
const { getRoutes } = require('./helpers/routes');

for (const route of getRoutes()) {
  test(`sem erros JavaScript fatais: ${route}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    expect(errors, `Erros JS em ${route}:\n${errors.join('\n')}`).toEqual([]);
  });
}
