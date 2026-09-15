const { test, expect } = require('@playwright/test');
const { getRoutes } = require('./helpers/routes');

const shouldCheck = href => href && !href.startsWith('#') && !/^(mailto:|tel:|javascript:)/i.test(href);

for (const route of getRoutes()) {
  test(`links internos não quebram: ${route}`, async ({ page, request }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const origin = new URL(page.url()).origin;
    const hrefs = await page.locator('a[href]').evaluateAll(as => as.map(a => a.href));
    const links = [...new Set(hrefs.filter(shouldCheck).filter(h => new URL(h).origin === origin))];
    const broken = [];
    for (const link of links) {
      try {
        const r = await request.get(link, { ignoreHTTPSErrors: true, timeout: 15000 });
        if (r.status() >= 400) broken.push(`${r.status()} ${link}`);
      } catch (e) { broken.push(`ERRO ${link}: ${e.message}`); }
    }
    expect(broken, `Links internos quebrados em ${route}:\n${broken.join('\n')}`).toEqual([]);
  });
}
