import { test, expect } from '@playwright/test';

test.skip('line chart works', async ({ page }) => {
  await page.goto('/kitchen-sink/charts');

  await expect(page.getByText('JS Package manager usage over time')).toBeVisible();

  const chart = page.getByTitle('JS Package manager usage over time');
  expect(chart).toBeVisible();
});