import { test, expect } from '@playwright/test';

test('App should load', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page).toHaveTitle(/Mentor AI/);
});
