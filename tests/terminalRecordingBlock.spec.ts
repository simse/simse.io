import { test, expect } from '@playwright/test';

test('terminal recording block renders correctly', async ({ page }) => {
  await page.goto('/testing-document');

  const player = page.getByTitle('Test');
  await expect(player).toBeVisible();

  expect(player).toBeVisible();
  expect(player).toHaveAttribute('player-initialised')

  // click start
  await player.locator('.ap-play-button').click()

  // check that the button disappears after clicking play
  await expect(player.locator('.ap-play-button')).toHaveCount(0);
});