const { test, expect } = require('@playwright/test');
const { getRoutes } = require('./helpers/routes');

for (const route of getRoutes()) {
  test(`sem imagens quebradas: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const broken = await page.locator('img').evaluateAll(imgs => imgs
      .filter(img => img.src && (!img.complete || img.naturalWidth === 0))
      .map(img => img.currentSrc || img.src));
    expect(broken, `Imagens quebradas em ${route}:\n${broken.join('\n')}`).toEqual([]);
  });
}
