# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: property-analysis.spec.ts >> remaining primary routes load
- Location: tests\e2e\property-analysis.spec.ts:43:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /^Compare$/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /^Compare$/ })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e4]:
        - img [ref=e6]
        - generic [ref=e10]:
          - generic [ref=e11]: Property Alpha
          - generic [ref=e12]: Investor-grade STR analysis
      - navigation [ref=e13]:
        - link "Dashboard" [ref=e14] [cursor=pointer]:
          - /url: /
          - img [ref=e15]
          - generic [ref=e18]: Dashboard
        - link "New Analysis" [ref=e19] [cursor=pointer]:
          - /url: /new-analysis
          - img [ref=e20]
          - generic [ref=e23]: New Analysis
        - link "Scenario Builder" [ref=e24] [cursor=pointer]:
          - /url: /scenario-builder
          - img [ref=e25]
          - generic [ref=e27]: Scenario Builder
        - link "Top Deals" [ref=e28] [cursor=pointer]:
          - /url: /top-deals
          - img [ref=e29]
          - generic [ref=e31]: Top Deals
        - link "Sensitivity" [ref=e32] [cursor=pointer]:
          - /url: /sensitivity-analysis
          - img [ref=e33]
          - generic [ref=e36]: Sensitivity
        - link "Compare" [ref=e37] [cursor=pointer]:
          - /url: /compare
          - img [ref=e38]
          - generic [ref=e43]: Compare
        - link "Reports" [ref=e44] [cursor=pointer]:
          - /url: /reports
          - img [ref=e45]
          - generic [ref=e48]: Reports
        - link "Settings" [ref=e49] [cursor=pointer]:
          - /url: /settings
          - img [ref=e50]
          - generic [ref=e53]: Settings
    - generic [ref=e54]:
      - banner [ref=e55]:
        - generic [ref=e56]:
          - generic [ref=e57]:
            - generic [ref=e58]: European Property Investment Platform
            - generic [ref=e59]: Guest mode active. Connect Supabase/Auth.js for persistent multi-user accounts.
          - generic [ref=e60]:
            - img [ref=e61]
            - text: Formula-transparent
      - main [ref=e63]:
        - generic [ref=e64]:
          - generic [ref=e65]:
            - heading "Compare Properties" [level=1] [ref=e66]
            - paragraph [ref=e67]: Side-by-side comparison of saved analyses and demo properties.
          - generic [ref=e68]:
            - region "Saved properties in comparison" [ref=e69]:
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - heading "Saved properties in comparison" [level=3] [ref=e73]
                  - paragraph [ref=e74]: Delete saved apartments from the comparison source list without removing demo comparisons.
                - generic [ref=e75]: 0 saved
              - generic [ref=e77]:
                - paragraph [ref=e78]: No saved apartments yet.
                - paragraph [ref=e79]: Start a new analysis to add properties to your list.
                - link "Start New Analysis" [ref=e80] [cursor=pointer]:
                  - /url: /new-analysis
            - generic [ref=e81]:
              - heading "Property comparison" [level=3] [ref=e83]
              - generic [ref=e84]:
                - generic [ref=e85]: Scroll horizontally to compare all underwriting metrics.
                - table [ref=e87]:
                  - rowgroup [ref=e88]:
                    - row "Property Location Price ADR Occupancy Cash required Loan payment Net monthly Cash flow ROI Payback Coverage Risk Score" [ref=e89]:
                      - columnheader "Property" [ref=e90]
                      - columnheader "Location" [ref=e91]
                      - columnheader "Price" [ref=e92]
                      - columnheader "ADR" [ref=e93]
                      - columnheader "Occupancy" [ref=e94]
                      - columnheader "Cash required" [ref=e95]
                      - columnheader "Loan payment" [ref=e96]
                      - columnheader "Net monthly" [ref=e97]
                      - columnheader "Cash flow" [ref=e98]
                      - columnheader "ROI" [ref=e99]
                      - columnheader "Payback" [ref=e100]
                      - columnheader "Coverage" [ref=e101]
                      - columnheader "Risk" [ref=e102]
                      - columnheader "Score" [ref=e103]
                  - rowgroup [ref=e104]:
                    - row "Demo Lisbon Apartment Lisbon, Portugal €150,000 €120 70.0% €59,000 €506 €1,481 €975 19.8% 5.0 2.93x 11 90" [ref=e105]:
                      - cell "Demo Lisbon Apartment" [ref=e106]
                      - cell "Lisbon, Portugal" [ref=e107]
                      - cell "€150,000" [ref=e108]
                      - cell "€120" [ref=e109]
                      - cell "70.0%" [ref=e110]
                      - cell "€59,000" [ref=e111]
                      - cell "€506" [ref=e112]
                      - cell "€1,481" [ref=e113]
                      - cell "€975" [ref=e114]
                      - cell "19.8%" [ref=e115]
                      - cell "5.0" [ref=e116]
                      - cell "2.93x" [ref=e117]
                      - cell "11" [ref=e118]
                      - cell "90" [ref=e119]
                    - row "Demo Valencia Beach Flat Valencia, Spain €200,000 €105 64.0% €65,500 €675 €1,085 €410 7.5% 13.3 1.61x 22 44" [ref=e120]:
                      - cell "Demo Valencia Beach Flat" [ref=e121]
                      - cell "Valencia, Spain" [ref=e122]
                      - cell "€200,000" [ref=e123]
                      - cell "€105" [ref=e124]
                      - cell "64.0%" [ref=e125]
                      - cell "€65,500" [ref=e126]
                      - cell "€675" [ref=e127]
                      - cell "€1,085" [ref=e128]
                      - cell "€410" [ref=e129]
                      - cell "7.5%" [ref=e130]
                      - cell "13.3" [ref=e131]
                      - cell "1.61x" [ref=e132]
                      - cell "22" [ref=e133]
                      - cell "44" [ref=e134]
                    - row "Demo Athens Historic Studio Athens, Greece €120,000 €91 61.0% €47,300 €405 €949 €544 13.8% 7.2 2.34x 11 70" [ref=e135]:
                      - cell "Demo Athens Historic Studio" [ref=e136]
                      - cell "Athens, Greece" [ref=e137]
                      - cell "€120,000" [ref=e138]
                      - cell "€91" [ref=e139]
                      - cell "61.0%" [ref=e140]
                      - cell "€47,300" [ref=e141]
                      - cell "€405" [ref=e142]
                      - cell "€949" [ref=e143]
                      - cell "€544" [ref=e144]
                      - cell "13.8%" [ref=e145]
                      - cell "7.2" [ref=e146]
                      - cell "2.34x" [ref=e147]
                      - cell "11" [ref=e148]
                      - cell "70" [ref=e149]
  - button "Open Next.js Dev Tools" [ref=e155] [cursor=pointer]:
    - img [ref=e156]
  - alert [ref=e159]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test';
  2   | import { DEFAULT_ANALYSIS_INPUT } from '../../lib/constants';
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
> 57  |     await expect(page.getByRole('heading', { name: expectedHeadings[path] })).toBeVisible();
      |                                                                               ^ Error: expect(locator).toBeVisible() failed
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
  103 |   await expect(page.locator('article').first()).toBeVisible();
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