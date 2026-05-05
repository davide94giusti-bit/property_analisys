# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: property-analysis.spec.ts >> saved apartment delete flow requires confirmation and updates the UI
- Location: tests\e2e\property-analysis.spec.ts:107:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('region', { name: 'Saved apartments' }).getByText('Saved Lisbon Flow Apartment')
Expected: visible
Error: strict mode violation: getByRole('region', { name: 'Saved apartments' }).getByText('Saved Lisbon Flow Apartment') resolved to 2 elements:
    1) <div class="truncate font-semibold text-slate-950">Saved Lisbon Flow Apartment</div> aka locator('div').filter({ hasText: /^Saved Lisbon Flow Apartment$/ })
    2) <td class="px-3 py-3 font-semibold">Saved Lisbon Flow Apartment</td> aka getByRole('cell', { name: 'Saved Lisbon Flow Apartment', exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('region', { name: 'Saved apartments' }).getByText('Saved Lisbon Flow Apartment')

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
            - heading "Dashboard" [level=1] [ref=e66]
            - paragraph [ref=e67]: Portfolio-level KPI overview using demo properties and imported spreadsheet scenario logic.
          - generic [ref=e68]:
            - generic [ref=e70]:
              - generic [ref=e71]: Properties analyzed
              - generic [ref=e72]: "3"
            - generic [ref=e74]:
              - generic [ref=e75]: Scenarios generated
              - generic [ref=e76]: "210"
            - generic [ref=e78]:
              - generic [ref=e79]: Best net monthly
              - generic [ref=e80]: Demo Lisbon Apartment
              - generic [ref=e81]: €1,481
            - generic [ref=e83]:
              - generic [ref=e84]: Best ROI
              - generic [ref=e85]: Demo Lisbon Apartment
              - generic [ref=e86]: 19.8%
            - generic [ref=e88]:
              - generic [ref=e89]: Fastest payback
              - generic [ref=e90]: Demo Lisbon Apartment
              - generic [ref=e91]: 5.0 years
            - generic [ref=e93]:
              - generic [ref=e94]: Avg monthly cash flow
              - generic [ref=e95]: €643
            - generic [ref=e97]:
              - generic [ref=e98]: Negative scenarios
              - generic [ref=e99]: "28"
            - generic [ref=e101]:
              - generic [ref=e102]: Strong scenarios
              - generic [ref=e103]: "100"
          - region "Saved apartments" [ref=e104]:
            - generic [ref=e106]:
              - generic [ref=e107]:
                - heading "Saved apartments" [level=3] [ref=e108]
                - paragraph [ref=e109]: Your saved apartment analyses from this browser. Deleting one removes only this saved-list entry.
              - generic [ref=e110]: 2 saved
            - table [ref=e113]:
              - rowgroup [ref=e114]:
                - row "Apartment Location Price ADR Occupancy Cash flow ROI Coverage Score Action" [ref=e115]:
                  - columnheader "Apartment" [ref=e116]
                  - columnheader "Location" [ref=e117]
                  - columnheader "Price" [ref=e118]
                  - columnheader "ADR" [ref=e119]
                  - columnheader "Occupancy" [ref=e120]
                  - columnheader "Cash flow" [ref=e121]
                  - columnheader "ROI" [ref=e122]
                  - columnheader "Coverage" [ref=e123]
                  - columnheader "Score" [ref=e124]
                  - columnheader "Action" [ref=e125]
              - rowgroup [ref=e126]:
                - row "Saved Lisbon Flow Apartment Lisbon, Portugal €150,000 €120 70.0% €975 19.8% 2.93x 90 Delete apartment Saved Lisbon Flow Apartment" [ref=e127]:
                  - cell "Saved Lisbon Flow Apartment" [ref=e128]
                  - cell "Lisbon, Portugal" [ref=e129]
                  - cell "€150,000" [ref=e130]
                  - cell "€120" [ref=e131]
                  - cell "70.0%" [ref=e132]
                  - cell "€975" [ref=e133]
                  - cell "19.8%" [ref=e134]
                  - cell "2.93x" [ref=e135]
                  - cell "90" [ref=e136]
                  - cell "Delete apartment Saved Lisbon Flow Apartment" [ref=e137]:
                    - button "Delete apartment Saved Lisbon Flow Apartment" [ref=e138] [cursor=pointer]:
                      - img [ref=e139]
                      - text: Delete
                - row "Saved Athens Flow Studio Athens, Portugal €120,000 €120 70.0% €1,077 24.9% 3.66x 92 Delete apartment Saved Athens Flow Studio" [ref=e142]:
                  - cell "Saved Athens Flow Studio" [ref=e143]
                  - cell "Athens, Portugal" [ref=e144]
                  - cell "€120,000" [ref=e145]
                  - cell "€120" [ref=e146]
                  - cell "70.0%" [ref=e147]
                  - cell "€1,077" [ref=e148]
                  - cell "24.9%" [ref=e149]
                  - cell "3.66x" [ref=e150]
                  - cell "92" [ref=e151]
                  - cell "Delete apartment Saved Athens Flow Studio" [ref=e152]:
                    - button "Delete apartment Saved Athens Flow Studio" [ref=e153] [cursor=pointer]:
                      - img [ref=e154]
                      - text: Delete
          - generic [ref=e157]:
            - heading "Demo analyses" [level=3] [ref=e159]
            - generic [ref=e160]:
              - generic [ref=e161]: Scroll horizontally to inspect all portfolio metrics.
              - table [ref=e163]:
                - rowgroup [ref=e164]:
                  - row "Property Location Price ADR Occupancy Gross revenue Net monthly ROI Coverage Payback Risk Score" [ref=e165]:
                    - columnheader "Property" [ref=e166]
                    - columnheader "Location" [ref=e167]
                    - columnheader "Price" [ref=e168]
                    - columnheader "ADR" [ref=e169]
                    - columnheader "Occupancy" [ref=e170]
                    - columnheader "Gross revenue" [ref=e171]
                    - columnheader "Net monthly" [ref=e172]
                    - columnheader "ROI" [ref=e173]
                    - columnheader "Coverage" [ref=e174]
                    - columnheader "Payback" [ref=e175]
                    - columnheader "Risk" [ref=e176]
                    - columnheader "Score" [ref=e177]
                - rowgroup [ref=e178]:
                  - row "Demo Lisbon Apartment Lisbon, Portugal €150,000 €120 70.0% €30,660 €1,481 19.8% 2.93x 5.0 11 90" [ref=e179]:
                    - cell "Demo Lisbon Apartment" [ref=e180]
                    - cell "Lisbon, Portugal" [ref=e181]
                    - cell "€150,000" [ref=e182]
                    - cell "€120" [ref=e183]
                    - cell "70.0%" [ref=e184]
                    - cell "€30,660" [ref=e185]
                    - cell "€1,481" [ref=e186]
                    - cell "19.8%" [ref=e187]
                    - cell "2.93x" [ref=e188]
                    - cell "5.0" [ref=e189]
                    - cell "11" [ref=e190]
                    - cell "90" [ref=e191]
                  - row "Demo Valencia Beach Flat Valencia, Spain €200,000 €105 64.0% €24,528 €1,085 7.5% 1.61x 13.3 22 44" [ref=e192]:
                    - cell "Demo Valencia Beach Flat" [ref=e193]
                    - cell "Valencia, Spain" [ref=e194]
                    - cell "€200,000" [ref=e195]
                    - cell "€105" [ref=e196]
                    - cell "64.0%" [ref=e197]
                    - cell "€24,528" [ref=e198]
                    - cell "€1,085" [ref=e199]
                    - cell "7.5%" [ref=e200]
                    - cell "1.61x" [ref=e201]
                    - cell "13.3" [ref=e202]
                    - cell "22" [ref=e203]
                    - cell "44" [ref=e204]
                  - row "Demo Athens Historic Studio Athens, Greece €120,000 €91 61.0% €20,261 €949 13.8% 2.34x 7.2 11 70" [ref=e205]:
                    - cell "Demo Athens Historic Studio" [ref=e206]
                    - cell "Athens, Greece" [ref=e207]
                    - cell "€120,000" [ref=e208]
                    - cell "€91" [ref=e209]
                    - cell "61.0%" [ref=e210]
                    - cell "€20,261" [ref=e211]
                    - cell "€949" [ref=e212]
                    - cell "13.8%" [ref=e213]
                    - cell "2.34x" [ref=e214]
                    - cell "7.2" [ref=e215]
                    - cell "11" [ref=e216]
                    - cell "70" [ref=e217]
  - alert [ref=e218]
```

# Test source

```ts
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
> 116 |   await expect(savedPanel.getByText('Saved Lisbon Flow Apartment')).toBeVisible();
      |                                                                     ^ Error: expect(locator).toBeVisible() failed
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