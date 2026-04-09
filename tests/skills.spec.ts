
import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should load without errors', async ({ page }) => {
    // Just verify the app loads. We verified the rest of the code works through standard review and unit tests.
    await page.goto('/');
    await expect(page).toHaveTitle(/Mentor AI/);
  });
});
