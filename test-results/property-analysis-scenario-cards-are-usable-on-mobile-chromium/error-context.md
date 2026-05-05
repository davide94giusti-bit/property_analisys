# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: property-analysis.spec.ts >> scenario cards are usable on mobile
- Location: tests\e2e\property-analysis.spec.ts:98:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('article').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('article').first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - banner [ref=e4]:
        - generic [ref=e7]: European Property Investment Platform
      - main [ref=e8]:
        - generic [ref=e9]:
          - generic [ref=e10]:
            - heading "Scenario Builder" [level=1] [ref=e11]
            - paragraph [ref=e12]: Generated scenario matrix based on the uploaded spreadsheet logic plus improved scoring.
          - generic [ref=e13]:
            - generic [ref=e14]:
              - generic [ref=e16]:
                - generic [ref=e17]: Scenarios generated
                - generic [ref=e18]: "210"
              - generic [ref=e20]:
                - generic [ref=e21]: Filtered scenarios
                - generic [ref=e22]: "182"
              - generic [ref=e24]:
                - generic [ref=e25]: Best investment score
                - generic [ref=e26]: 96/100
              - generic [ref=e28]:
                - generic [ref=e29]: Best coverage
                - generic [ref=e30]: 8.49x
            - generic [ref=e31]:
              - heading "Scenario controls" [level=3] [ref=e33]
              - generic [ref=e34]:
                - generic [ref=e35]: Minimum coverage ratio
                - slider [ref=e36]: "1"
                - generic [ref=e37]: 1.00x
                - button "Save filtered set" [ref=e38] [cursor=pointer]:
                  - img [ref=e39]
                  - text: Save filtered set
                - button "Export CSV" [ref=e40] [cursor=pointer]:
                  - img [ref=e41]
                  - text: Export CSV
            - generic [ref=e44]:
              - textbox "Search scenarios..." [active] [ref=e45]: base
              - generic [ref=e46]:
                - generic [ref=e47]: Page 1 of 0
                - generic [ref=e48]:
                  - button "Previous" [disabled]
                  - button "Next" [disabled]
    - navigation "Mobile primary navigation" [ref=e49]:
      - generic [ref=e50]:
        - link "Dashboard" [ref=e51] [cursor=pointer]:
          - /url: /
          - img [ref=e52]
          - generic [ref=e55]: Dashboard
        - link "New Analysis" [ref=e56] [cursor=pointer]:
          - /url: /new-analysis
          - img [ref=e57]
          - generic [ref=e60]: New Analysis
        - link "Scenario Builder" [ref=e61] [cursor=pointer]:
          - /url: /scenario-builder
          - img [ref=e62]
          - generic [ref=e64]: Scenario Builder
        - link "Top Deals" [ref=e65] [cursor=pointer]:
          - /url: /top-deals
          - img [ref=e66]
          - generic [ref=e68]: Top Deals
        - link "Sensitivity" [ref=e69] [cursor=pointer]:
          - /url: /sensitivity-analysis
          - img [ref=e70]
          - generic [ref=e73]: Sensitivity
        - link "Compare" [ref=e74] [cursor=pointer]:
          - /url: /compare
          - img [ref=e75]
          - generic [ref=e80]: Compare
        - link "Reports" [ref=e81] [cursor=pointer]:
          - /url: /reports
          - img [ref=e82]
          - generic [ref=e85]: Reports
        - link "Settings" [ref=e86] [cursor=pointer]:
          - /url: /settings
          - img [ref=e87]
          - generic [ref=e90]: Settings
  - button "Open Next.js Dev Tools" [ref=e96] [cursor=pointer]:
    - img [ref=e97]
  - alert [ref=e100]
```

# Test source

```ts
  3   | import type { AnalysisInput } from '../../lib/types';
  4   | 
  5   | const mobileViewport = { width: 360, height: 800 };
  6   | const keyPages = ['/', '/new-analysis', '/scenario-builder', '/top-deals', '/sensitivity-analysis', '/compare', '/reports', '/settings'];
  7   | const savedAnalysesKey = 'property-platform:analyses';
  8   | 
  9   | function savedAnalysis(id: string, name: string, city: string, price: number): AnalysisInput {
  10  |   return {
  11  |     ...DEFAULT_ANALYSIS_INPUT,
  12  |     id,
  13  |     property: {
  14  |       ...DEFAULT_ANALYSIS_INPUT.property,
  15  |       name,
  16  |       city
  17  |     },
  18  |     purchase: {
  19  |       ...DEFAULT_ANALYSIS_INPUT.purchase,
  20  |       propertyPrice: price
  21  |     },
  22  |     scenarioLabel: `${name} Base Case`
  23  |   };
  24  | }
  25  | 
  26  | async function seedSavedAnalyses(page: Page, analyses: AnalysisInput[]) {
  27  |   await page.addInitScript(
  28  |     ({ key, items }) => window.localStorage.setItem(key, JSON.stringify(items)),
  29  |     { key: savedAnalysesKey, items: analyses }
  30  |   );
  31  | }
  32  | 
  33  | async function expectNoHorizontalOverflow(page: Page) {
  34  |   const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  35  |   expect(overflow).toBe(false);
  36  | }
  37  | 
  38  | async function expectNoAreaResearchLinks(page: Page) {
  39  |   await expect(page.locator('a[href="/area-research"]')).toHaveCount(0);
  40  |   await expect(page.getByRole('link', { name: /Area Research|Research Area|Market Research/i })).toHaveCount(0);
  41  | }
  42  | 
  43  | test('remaining primary routes load', async ({ page }) => {
  44  |   const expectedHeadings: Record<string, RegExp> = {
  45  |     '/': /^Dashboard$/,
  46  |     '/new-analysis': /^New Analysis$/,
  47  |     '/scenario-builder': /^Scenario Builder$/,
  48  |     '/top-deals': /^Top Deals$/,
  49  |     '/sensitivity-analysis': /^Sensitivity Analysis$/,
  50  |     '/compare': /^Compare$/,
  51  |     '/reports': /^Reports$/,
  52  |     '/settings': /^Settings$/
  53  |   };
  54  | 
  55  |   for (const path of keyPages) {
  56  |     await page.goto(path);
  57  |     await expect(page.getByRole('heading', { name: expectedHeadings[path] })).toBeVisible();
  58  |   }
  59  | });
  60  | 
  61  | test('desktop navigation and homepage do not expose Area Research', async ({ page }) => {
  62  |   await page.goto('/');
  63  |   await expectNoAreaResearchLinks(page);
  64  |   await expect(page.getByText(/Area Research|Research Area|Market Research/i)).toHaveCount(0);
  65  | });
  66  | 
  67  | test('mobile navigation does not expose Area Research and still opens retained routes', async ({ page }) => {
  68  |   await page.setViewportSize(mobileViewport);
  69  |   await page.goto('/');
  70  | 
  71  |   const mobileNav = page.getByRole('navigation', { name: 'Mobile primary navigation' });
  72  |   await expect(mobileNav.getByRole('link', { name: /Area Research|Research Area|Market Research/i })).toHaveCount(0);
  73  | 
  74  |   await mobileNav.getByRole('link', { name: /New Analysis/ }).click();
  75  |   await expect(page).toHaveURL(/\/new-analysis$/);
  76  |   await expect(page.getByRole('heading', { name: 'New Analysis' })).toBeVisible();
  77  | 
  78  |   await mobileNav.getByRole('link', { name: /Scenario Builder/ }).click();
  79  |   await expect(page).toHaveURL(/\/scenario-builder$/);
  80  |   await expect(page.getByRole('heading', { name: 'Scenario Builder' })).toBeVisible();
  81  | });
  82  | 
  83  | test('/area-research returns the app 404 page', async ({ page }) => {
  84  |   const response = await page.goto('/area-research');
  85  |   expect(response?.status()).toBe(404);
  86  |   await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  87  |   await expectNoAreaResearchLinks(page);
  88  | });
  89  | 
  90  | test('key pages have no horizontal overflow at 360px wide', async ({ page }) => {
  91  |   await page.setViewportSize(mobileViewport);
  92  |   for (const path of keyPages) {
  93  |     await page.goto(path);
  94  |     await expectNoHorizontalOverflow(page);
  95  |   }
  96  | });
  97  | 
  98  | test('scenario cards are usable on mobile', async ({ page }) => {
  99  |   await page.setViewportSize(mobileViewport);
  100 |   await page.goto('/scenario-builder');
  101 |   await expect(page.getByPlaceholder('Search scenarios...')).toBeVisible();
  102 |   await page.getByPlaceholder('Search scenarios...').fill('base');
> 103 |   await expect(page.locator('article').first()).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
  104 |   await expectNoHorizontalOverflow(page);
  105 | });
  106 | 
  107 | test('saved apartment delete flow requires confirmation and updates the UI', async ({ page }) => {
  108 |   await seedSavedAnalyses(page, [
  109 |     savedAnalysis('saved-lisbon-flow', 'Saved Lisbon Flow Apartment', 'Lisbon', 150000),
  110 |     savedAnalysis('saved-athens-flow', 'Saved Athens Flow Studio', 'Athens', 120000)
  111 |   ]);
  112 | 
  113 |   await page.goto('/');
  114 | 
  115 |   const savedPanel = page.getByRole('region', { name: 'Saved apartments' });
  116 |   await expect(savedPanel.getByText('Saved Lisbon Flow Apartment')).toBeVisible();
  117 |   await expect(savedPanel.getByText('Saved Athens Flow Studio')).toBeVisible();
  118 | 
  119 |   await savedPanel.getByRole('button', { name: 'Delete apartment Saved Lisbon Flow Apartment' }).click();
  120 |   const dialog = page.getByRole('dialog', { name: 'Delete apartment?' });
  121 |   await expect(dialog).toBeVisible();
  122 |   await dialog.getByRole('button', { name: 'Cancel' }).click();
  123 |   await expect(savedPanel.getByText('Saved Lisbon Flow Apartment')).toBeVisible();
  124 | 
  125 |   await savedPanel.getByRole('button', { name: 'Delete apartment Saved Lisbon Flow Apartment' }).click();
  126 |   await dialog.getByRole('button', { name: 'Delete' }).click();
  127 |   await expect(savedPanel.getByText('Saved Lisbon Flow Apartment')).toHaveCount(0);
  128 |   await expect(savedPanel.getByText('Saved Athens Flow Studio')).toBeVisible();
  129 | 
  130 |   const idsAfterFirstDelete = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key) ?? '[]').map((item: AnalysisInput) => item.id), savedAnalysesKey);
  131 |   expect(idsAfterFirstDelete).toEqual(['saved-athens-flow']);
  132 | 
  133 |   await savedPanel.getByRole('button', { name: 'Delete apartment Saved Athens Flow Studio' }).click();
  134 |   await page.getByRole('dialog', { name: 'Delete apartment?' }).getByRole('button', { name: 'Delete' }).click();
  135 |   await expect(savedPanel.getByText('Saved Athens Flow Studio')).toHaveCount(0);
  136 |   await expect(savedPanel.getByText('No saved apartments yet.')).toBeVisible();
  137 | });
  138 | 
  139 | test('saved apartment delete controls do not create mobile overflow', async ({ page }) => {
  140 |   await page.setViewportSize(mobileViewport);
  141 |   await seedSavedAnalyses(page, [savedAnalysis('saved-mobile-flow', 'Saved Mobile Apartment', 'Porto', 175000)]);
  142 | 
  143 |   await page.goto('/');
  144 |   await expect(page.getByRole('region', { name: 'Saved apartments' }).getByText('Saved Mobile Apartment')).toBeVisible();
  145 |   await expectNoHorizontalOverflow(page);
  146 | });
  147 | 
```