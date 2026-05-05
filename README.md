# Property Investment Platform

`property-investment-platform` is a Next.js / TypeScript web application for real estate investment analysis. The app focuses on user-controlled investment scenario modelling, financing assumptions, sensitivity analysis, deal comparison, top-deal review, and reporting.

## Current User-Facing Routes

- `/` - dashboard with portfolio KPI summaries from demo analyses.
- `/new-analysis` - single-property assumption entry and formula-transparent KPI review.
- `/scenario-builder` - generated scenario matrix based on configurable assumptions.
- `/top-deals` - ranked scenario cohorts by investor KPIs.
- `/sensitivity-analysis` - sensitivity review for key investment assumptions.
- `/compare` - side-by-side comparison of selected scenarios.
- `/reports` - report generation and export workflows.
- `/settings` - local configuration and production integration checklist.

## Removed Area Research Flow

Area Research has been removed because free/public sources such as public STR listings, OSM POI data, and regional statistical datasets do not provide consistent, complete, city-level investment metrics across markets. The app now focuses on scenario modelling, assumptions, sensitivity analysis, comparison, and reporting, where users control the input data and assumptions.

Previous `/area-research` links should be replaced with one of the remaining workflows:

- `/new-analysis` when the user needs to enter or revise a property-level investment case.
- `/scenario-builder` when the user needs to explore financing, operating-cost, ADR, or occupancy variations.
- `/compare` when the user needs to compare saved or generated analyses.
- `/reports` when the user needs an exportable investment report.

The `/area-research` route and `/api/area/research` API are intentionally removed. Old bookmarks to `/area-research` should now receive the standard Next.js 404 page.

## Tech Stack

- Next.js 15.5.15 with App Router and typed routes enabled.
- React 18 and TypeScript in strict mode.
- Tailwind CSS for styling.
- Vitest for unit and component-level tests.
- Playwright for browser and responsive layout tests.
- Prisma client scaffolding for future production persistence.

## Local Development

Use Windows PowerShell from the project root:

```powershell
npm install
npm run dev
```

Then open `http://localhost:3000`.

`npm run dev` is for local development only. It starts the Next.js development server with development-time diagnostics and hot reloading.

## Validation Commands

Use these commands before shipping a change:

```powershell
npm run typecheck
npm run test
npm run build
```

Run Playwright when browser dependencies are installed:

```powershell
npm run test:e2e
```

## Production Build and Deployment

### Local production build test

Use PowerShell:

```powershell
npm install
npm run typecheck
npm run test
npm run build
npm run start
```

`npm run build` creates an optimized production build. `npm run start` runs the compiled Next.js production server. The default production server usually runs on port `3000` unless the hosting environment sets a different port.

### Environment variables

Copy `.env.example` to `.env.local` for local development:

```powershell
Copy-Item .env.example .env.local
```

For production hosting, configure environment variables in the hosting platform dashboard or secret manager. Do not commit secrets. Do not disable TLS verification. Do not use `NODE_TLS_REJECT_UNAUTHORIZED=0`.

The checked-in `.env.example` only contains non-secret placeholders and development-safe switches. Add production-only secrets, database URLs, and auth provider keys through the deployment platform.

### Vercel deployment

1. Push the project to GitHub.
2. Create a Vercel project.
3. Import the GitHub repository.
4. Configure environment variables in Vercel project settings.
5. Set the build command:

```text
npm run build
```

6. Set the install command:

```text
npm install
```

7. Deploy.

Vercel automatically runs the production build and hosts the app behind managed HTTPS.

### Self-hosted Node deployment

Use PowerShell on the host or build machine:

```powershell
npm install
npm run build
$env:NODE_ENV="production"
npm run start
```

Use a process manager such as PM2, systemd, Docker, or the hosting provider's Node process manager. Put the app behind HTTPS using a reverse proxy such as Nginx, Caddy, Cloudflare, or the hosting provider's managed HTTPS. Do not expose development server ports publicly.

### Docker deployment

Docker support is not configured in this patch. No Dockerfile is included because the existing project did not contain production Docker infrastructure. Add Docker only as a complete deployment path with a tested production image, dependency installation strategy, runtime user, and environment-variable handling.

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --ext .ts,.tsx --max-warnings=0",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "typecheck": "tsc --noEmit"
}
```

Additional maintenance scripts are available in `package.json` for Prisma, debug collection, and mobile development.

## Debug Collection

The generic debug collector remains available:

```powershell
npm run debug:collect
```

It writes redacted environment information, package scripts, dependency diagnostics, test/typecheck/build logs, Next.js info, and a filtered file tree to `debug-artifacts/`. Raw `.env` files are not copied, and sensitive values are redacted by key and value pattern.

## Security Notes

- Keep TypeScript strict mode enabled.
- Keep Next.js typed routes enabled.
- Do not commit `.env`, `.env.local`, database URLs, service-role keys, API tokens, or auth secrets.
- Do not use `NODE_TLS_REJECT_UNAUTHORIZED=0`.
- Run production behind HTTPS.
- Use server-side environment variables for secrets.

## Acceptance Smoke Test

After a successful production build, verify these routes:

- `/`
- `/new-analysis`
- `/scenario-builder`
- `/top-deals`
- `/sensitivity-analysis`
- `/compare`
- `/reports`
- `/settings`

Also verify that navigation and homepage content do not link to `/area-research`, and that `/area-research` returns the standard 404 page.
