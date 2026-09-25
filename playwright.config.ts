import { defineConfig, devices } from '@playwright/test';

// Same config everywhere: local, Docker container, GitHub Actions.
// Only CI-specific behaviour is keyed off the CI env var.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://demo.playwright.dev/todomvc/',
    ...devices['Desktop Chrome'],
    trace: 'retain-on-failure',
  },
});
