import { expect, test, type Page } from '@playwright/test';

const mobileViewport = { width: 360, height: 800 };
const keyPages = ['/', '/new-analysis', '/scenario-builder', '/top-deals', '/sensitivity-analysis', '/compare', '/reports', '/settings'];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
}

async function expectNoAreaResearchLinks(page: Page) {
  await expect(page.locator('a[href="/area-research"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Area Research|Research Area|Market Research/i })).toHaveCount(0);
}

test('remaining primary routes load', async ({ page }) => {
  const expectedHeadings: Record<string, RegExp> = {
    '/': /^Dashboard$/,
    '/new-analysis': /^New Analysis$/,
    '/scenario-builder': /^Scenario Builder$/,
    '/top-deals': /^Top Deals$/,
    '/sensitivity-analysis': /^Sensitivity Analysis$/,
    '/compare': /^Compare$/,
    '/reports': /^Reports$/,
    '/settings': /^Settings$/
  };

  for (const path of keyPages) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: expectedHeadings[path] })).toBeVisible();
  }
});

test('desktop navigation and homepage do not expose Area Research', async ({ page }) => {
  await page.goto('/');
  await expectNoAreaResearchLinks(page);
  await expect(page.getByText(/Area Research|Research Area|Market Research/i)).toHaveCount(0);
});

test('mobile navigation does not expose Area Research and still opens retained routes', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/');

  const mobileNav = page.getByRole('navigation', { name: 'Mobile primary navigation' });
  await expect(mobileNav.getByRole('link', { name: /Area Research|Research Area|Market Research/i })).toHaveCount(0);

  await mobileNav.getByRole('link', { name: /New Analysis/ }).click();
  await expect(page).toHaveURL(/\/new-analysis$/);
  await expect(page.getByRole('heading', { name: 'New Analysis' })).toBeVisible();

  await mobileNav.getByRole('link', { name: /Scenario Builder/ }).click();
  await expect(page).toHaveURL(/\/scenario-builder$/);
  await expect(page.getByRole('heading', { name: 'Scenario Builder' })).toBeVisible();
});

test('/area-research returns the app 404 page', async ({ page }) => {
  const response = await page.goto('/area-research');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await expectNoAreaResearchLinks(page);
});

test('key pages have no horizontal overflow at 360px wide', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  for (const path of keyPages) {
    await page.goto(path);
    await expectNoHorizontalOverflow(page);
  }
});

test('scenario cards are usable on mobile', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto('/scenario-builder');
  await expect(page.getByPlaceholder('Search scenarios...')).toBeVisible();
  await page.getByPlaceholder('Search scenarios...').fill('base');
  await expect(page.locator('article').first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
