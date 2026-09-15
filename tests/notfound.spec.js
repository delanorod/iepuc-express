const { test, expect } = require('@playwright/test');

test('rota inexistente retorna 404', async ({ request }) => {
  const response = await request.get('/__teste-rota-inexistente-iepuc__.html', { ignoreHTTPSErrors: true });
  expect(response.status()).toBe(404);
});
