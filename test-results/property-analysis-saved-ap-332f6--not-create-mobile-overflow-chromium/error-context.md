# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: property-analysis.spec.ts >> saved apartment delete controls do not create mobile overflow
- Location: tests\e2e\property-analysis.spec.ts:139:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('region', { name: 'Saved apartments' }).getByText('Saved Mobile Apartment')
Expected: visible
Error: strict mode violation: getByRole('region', { name: 'Saved apartments' }).getByText('Saved Mobile Apartment') resolved to 2 elements:
    1) <div class="truncate font-semibold text-slate-950">Saved Mobile Apartment</div> aka getByRole('article').getByText('Saved Mobile Apartment')
    2) <td class="px-3 py-3 font-semibold">Saved Mobile Apartment</td> aka locator('td').filter({ hasText: 'Saved Mobile Apartment' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('region', { name: 'Saved apartments' }).getByText('Saved Mobile Apartment')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - banner [ref=e4]:
        - generic [ref=e7]: European Property Investment Platform
      - main [ref=e8]:
        - generic [ref=e9]:
          - generic [ref=e10]:
            - heading "Dashboard" [level=1] [ref=e11]
            - paragraph [ref=e12]: Portfolio-level KPI overview using demo properties and imported spreadsheet scenario logic.
          - generic [ref=e13]:
            - generic [ref=e15]:
              - generic [ref=e16]: Properties analyzed
              - generic [ref=e17]: "3"
            - generic [ref=e19]:
              - generic [ref=e20]: Scenarios generated
              - generic [ref=e21]: "210"
            - generic [ref=e23]:
              - generic [ref=e24]: Best net monthly
              - generic [ref=e25]: Demo Lisbon Apartment
              - generic [ref=e26]: €1,481
            - generic [ref=e28]:
              - generic [ref=e29]: Best ROI
              - generic [ref=e30]: Demo Lisbon Apartment
              - generic [ref=e31]: 19.8%
            - generic [ref=e33]:
              - generic [ref=e34]: Fastest payback
              - generic [ref=e35]: Demo Lisbon Apartment
              - generic [ref=e36]: 5.0 years
            - generic [ref=e38]:
              - generic [ref=e39]: Avg monthly cash flow
              - generic [ref=e40]: €643
            - generic [ref=e42]:
              - generic [ref=e43]: Negative scenarios
              - generic [ref=e44]: "28"
            - generic [ref=e46]:
              - generic [ref=e47]: Strong scenarios
              - generic [ref=e48]: "100"
          - generic [ref=e49]:
            - generic [ref=e51]:
              - generic [ref=e52]:
                - generic [ref=e53]:
                  - generic [ref=e54]: Demo Lisbon Apartment
                  - generic [ref=e55]: Lisbon, Portugal
                - generic [ref=e56]: 90/100
              - generic [ref=e57]:
                - generic [ref=e58]:
                  - term [ref=e59]: Price
                  - definition [ref=e60]: €150,000
                - generic [ref=e61]:
                  - term [ref=e62]: ADR
                  - definition [ref=e63]: €120
                - generic [ref=e64]:
                  - term [ref=e65]: Occupancy
                  - definition [ref=e66]: 70.0%
                - generic [ref=e67]:
                  - term [ref=e68]: Cash flow
                  - definition [ref=e69]: €975
                - generic [ref=e70]:
                  - term [ref=e71]: ROI
                  - definition [ref=e72]: 19.8%
                - generic [ref=e73]:
                  - term [ref=e74]: Coverage
                  - definition [ref=e75]: 2.93x
            - generic [ref=e77]:
              - generic [ref=e78]:
                - generic [ref=e79]:
                  - generic [ref=e80]: Demo Valencia Beach Flat
                  - generic [ref=e81]: Valencia, Spain
                - generic [ref=e82]: 44/100
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - term [ref=e85]: Price
                  - definition [ref=e86]: €200,000
                - generic [ref=e87]:
                  - term [ref=e88]: ADR
                  - definition [ref=e89]: €105
                - generic [ref=e90]:
                  - term [ref=e91]: Occupancy
                  - definition [ref=e92]: 64.0%
                - generic [ref=e93]:
                  - term [ref=e94]: Cash flow
                  - definition [ref=e95]: €410
                - generic [ref=e96]:
                  - term [ref=e97]: ROI
                  - definition [ref=e98]: 7.5%
                - generic [ref=e99]:
                  - term [ref=e100]: Coverage
                  - definition [ref=e101]: 1.61x
            - generic [ref=e103]:
              - generic [ref=e104]:
                - generic [ref=e105]:
                  - generic [ref=e106]: Demo Athens Historic Studio
                  - generic [ref=e107]: Athens, Greece
                - generic [ref=e108]: 70/100
              - generic [ref=e109]:
                - generic [ref=e110]:
                  - term [ref=e111]: Price
                  - definition [ref=e112]: €120,000
                - generic [ref=e113]:
                  - term [ref=e114]: ADR
                  - definition [ref=e115]: €91
                - generic [ref=e116]:
                  - term [ref=e117]: Occupancy
                  - definition [ref=e118]: 61.0%
                - generic [ref=e119]:
                  - term [ref=e120]: Cash flow
                  - definition [ref=e121]: €544
                - generic [ref=e122]:
                  - term [ref=e123]: ROI
                  - definition [ref=e124]: 13.8%
                - generic [ref=e125]:
                  - term [ref=e126]: Coverage
                  - definition [ref=e127]: 2.34x
          - region "Saved apartments" [ref=e128]:
            - generic [ref=e130]:
              - generic [ref=e131]:
                - heading "Saved apartments" [level=3] [ref=e132]
                - paragraph [ref=e133]: Your saved apartment analyses from this browser. Deleting one removes only this saved-list entry.
              - generic [ref=e134]: 1 saved
            - article [ref=e137]:
              - generic [ref=e138]:
                - generic [ref=e139]:
                  - generic [ref=e140]: Saved Mobile Apartment
                  - generic [ref=e141]: Porto, Portugal
                - generic [ref=e142]: 82/100
              - generic [ref=e143]:
                - generic [ref=e144]:
                  - term [ref=e145]: Price
                  - definition [ref=e146]: €175,000
                - generic [ref=e147]:
                  - term [ref=e148]: ADR
                  - definition [ref=e149]: €120
                - generic [ref=e150]:
                  - term [ref=e151]: Occupancy
                  - definition [ref=e152]: 70.0%
                - generic [ref=e153]:
                  - term [ref=e154]: Cash flow
                  - definition [ref=e155]: €891
                - generic [ref=e156]:
                  - term [ref=e157]: ROI
                  - definition [ref=e158]: 16.4%
                - generic [ref=e159]:
                  - term [ref=e160]: Coverage
                  - definition [ref=e161]: 2.51x
              - button "Delete apartment Saved Mobile Apartment" [ref=e162] [cursor=pointer]:
                - img [ref=e163]
                - text: Delete
    - navigation "Mobile primary navigation" [ref=e166]:
      - generic [ref=e167]:
        - link "Dashboard" [ref=e168] [cursor=pointer]:
          - /url: /
          - img [ref=e169]
          - generic [ref=e172]: Dashboard
        - link "New Analysis" [ref=e173] [cursor=pointer]:
          - /url: /new-analysis
          - img [ref=e174]
          - generic [ref=e177]: New Analysis
        - link "Scenario Builder" [ref=e178] [cursor=pointer]:
          - /url: /scenario-builder
          - img [ref=e179]
          - generic [ref=e181]: Scenario Builder
        - link "Top Deals" [ref=e182] [cursor=pointer]:
          - /url: /top-deals
          - img [ref=e183]
          - generic [ref=e185]: Top Deals
        - link "Sensitivity" [ref=e186] [cursor=pointer]:
          - /url: /sensitivity-analysis
          - img [ref=e187]
          - generic [ref=e190]: Sensitivity
        - link "Compare" [ref=e191] [cursor=pointer]:
          - /url: /compare
          - img [ref=e192]
          - generic [ref=e197]: Compare
        - link "Reports" [ref=e198] [cursor=pointer]:
          - /url: /reports
          - img [ref=e199]
          - generic [ref=e202]: Reports
        - link "Settings" [ref=e203] [cursor=pointer]:
          - /url: /settings
          - img [ref=e204]
          - generic [ref=e207]: Settings
  - button "Open Next.js Dev Tools" [ref=e213] [cursor=pointer]:
    - img [ref=e214]
  - alert [ref=e217]
```

# Test source

```ts
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
> 144 |   await expect(page.getByRole('region', { name: 'Saved apartments' }).getByText('Saved Mobile Apartment')).toBeVisible();
      |                                                                                                            ^ Error: expect(locator).toBeVisible() failed
  145 |   await expectNoHorizontalOverflow(page);
  146 | });
  147 | 
```