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

test('contains blog posts section', async ({ page }) => {
  await page.goto('/');

  const blogSection = page.getByTitle('Blog');

  await expect(blogSection).toBeVisible();

  const blogPosts = blogSection.locator('ul > li');
  expect(await blogPosts.count()).toBeGreaterThan(0);
  expect(await blogPosts.count()).toBeLessThanOrEqual(4);
});

test('contains projects section', async ({ page }) => {
  await page.goto('/');

  const projectsSection = page.getByTitle('Projects');

  await expect(projectsSection).toBeVisible();

  const projects = projectsSection.locator('ul > li');
  expect(await projects.count()).toBeGreaterThan(0);
});