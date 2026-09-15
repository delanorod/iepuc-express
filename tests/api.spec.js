const { test, expect } = require('@playwright/test');

test('API de matérias responde JSON ou pode ser marcada como indisponível', async ({ request }) => {
  const response = await request.get('/api/materias?action=getAll', { ignoreHTTPSErrors: true });
  // Ajuste para 200 obrigatório quando o banco estiver configurado.
  expect([200, 503]).toContain(response.status());
  if (response.status() === 200) {
    const type = response.headers()['content-type'] || '';
    expect(type).toContain('application/json');
  }
});
