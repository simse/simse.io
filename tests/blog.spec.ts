import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/blog');

  // if the title does not contain "Blog", something is wrong with the website
  await expect(page).toHaveTitle(/Blog/);
});

test('has RSS feed button', async ({ page }) => {
  await page.goto('/blog');

  await expect(page.getByRole('button', { name: 'RSS feed' })).toBeVisible();
});

test('RSS feed button opens new tab', async ({ page }) => {
  await page.goto('/blog');

  const newTabPromise = page.waitForEvent('popup');

  await page.getByRole('button', { name: 'RSS feed' }).click();

  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL(/rss\.xml/);
});
