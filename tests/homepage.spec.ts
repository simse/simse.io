import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Simon Sorensen/);
});

test('contains header element', async ({ page }) => {
  await page.goto('/');

  // Find header
  await expect(page.getByRole('banner')).toBeVisible();

  // Ensure header contains text
  await expect(page.getByRole('banner')).toContainText('Hej');
});
