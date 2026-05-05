# Uploaded Spreadsheet Baseline

Source workbook inspected: `Property analysis.xlsx`.

## Sheets detected

| Sheet | Used range | Purpose |
|---|---:|---|
| `Scenarios` | `A1:S148` | Main scenario matrix with purchase, loan, STR assumptions, calculated revenue, coverage, rank, and payback period. |
| `Top 3` | `A1:M4` | Top-ranked scenarios pulled from `Scenarios` through `INDEX/MATCH` formulas. |

## `Scenarios` columns

1. Property Price (€)
2. Down payment (%)
3. Down payment (€)
4. Loan %
5. Loan length
6. Loan Payment (€/mo)
7. Guest cleaning fee (€ x check-in)
8. Cleaning cost (€ x check-in)
9. Avg. Stay
10. Amenities (€ x month)
11. Taxes (€ x year)
12. ADR (€/night)
13. Occupancy
14. Gross Revenue (€/yr)
15. Net Revenue (€/yr)
16. Net Monthly (€/mo)
17. Coverage (Net/Loan)
18. Rank
19. ROI time (Y)

## Detected baseline formulas

- Down payment (€) = `Property Price x Down payment %`
- Loan Payment (€/mo) = Excel `PMT(Loan % / 12, Loan length x 12, -(Property Price - Down payment))`
- Gross Revenue (€/yr) = `ADR x 365 x Occupancy`
- Net Revenue (€/yr) = `Gross Revenue x (1 - 3% platform fee - 21% tax/VAT) + (guest cleaning fee - cleaning cost) x ROUNDUP(365 x occupancy / avg stay, 0) - amenities x 12 - annual taxes`
- Net Monthly = `Net Revenue / 12`
- Coverage = `Net Monthly / Loan Payment`
- Rank = `RANK.EQ(Coverage, coverage_range, descending) + tie breaker`
- ROI time (Y) = `Down payment / Net Revenue`

## Interpretation correction

`ROI time (Y)` is implemented in the app as a payback-period concept. The app separately calculates:

- cash-on-cash ROI percentage; and
- payback period / ROI time in years.

## Spreadsheet baseline sample row

For property price `120,000`, down payment `20%`, loan rate `3%`, loan term `30`, ADR `70`, occupancy `50%`, average stay `3`, cleaning fee `45`, cleaning cost `25`, amenities `120/month`, and taxes `1,000/year`, the workbook returns:

- Down payment: `24,000`
- Monthly loan payment: `404.73987238027246`
- Gross revenue: `12,775`
- Net revenue: `8,489`
- Net monthly: `707.4166666667`
- Coverage: `1.7478304337`
- ROI time / payback period: `2.8271881258` years

The unit tests include this row as a regression baseline.
