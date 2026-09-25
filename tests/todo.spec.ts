import { test, expect } from '@playwright/test';

// Small, stable tests against Playwright's public TodoMVC demo. The point
// of this repo is the container and CI wiring, not the test count.
test.describe('TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('adds a todo', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('write the report');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.getByTestId('todo-title')).toHaveText(['write the report']);
    await expect(page.getByTestId('todo-count')).toContainText('1 item left');
  });

  test('completes a todo and filters to Completed', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    for (const title of ['one', 'two']) {
      await input.fill(title);
      await input.press('Enter');
    }
    await page.getByTestId('todo-item').first().getByRole('checkbox').check();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-title')).toHaveText(['one']);
  });

  test('removes a todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('temporary');
    await input.press('Enter');
    await page.getByTestId('todo-item').hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
  });
});
