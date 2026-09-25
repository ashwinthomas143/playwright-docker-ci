import { test, expect } from '@playwright/test';

// One API-level check so the container run exercises both layers.
test('the demo site responds and serves the app shell', async ({ request }) => {
  const response = await request.get('./');
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('TodoMVC');
});
