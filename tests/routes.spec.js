const { test, expect } = require('@playwright/test');
const { getRoutes } = require('./helpers/routes');

for (const route of getRoutes()) {
  test(`rota responde corretamente: ${route}`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response, `Sem resposta HTTP em ${route}`).not.toBeNull();
    expect(response.status(), `Status inesperado em ${route}`).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}
