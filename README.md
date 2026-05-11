# AIOps Transformation OS

> An enterprise-grade AIOps & IT Operations Transformation Operating System — boardroom-ready, frontend-only, deployable to GitHub Pages.

A premium SaaS-quality React application that serves as a command center for CIOs, Service Delivery Managers, Enterprise Architects, NOC/SOC leaders, SREs, Cloud Operations leads, and Transformation Managers.

## Highlights

- 15 first-class modules — Executive Command Center · AIOps Maturity Assessment · Observability Architecture Generator · Incident & MTTR Optimization · Automation Discovery · Predictive Incident Intelligence · ITIL Transformation · Cloud Operations · NOC / Telecom · SRE Reliability · Build · Buy · Partner · ROI Calculator · Governance & Compliance · Executive Report Export · Persona Operating Surfaces.
- 8 persona-driven dashboards (CIO, SDM, EA, CISO, NOC Lead, SRE Lead, Cloud Ops Lead, Transformation Manager).
- Dual-theme (Obsidian dark / Stark white light) toggle.
- Premium typography: Cabinet Grotesk · Satoshi · JetBrains Mono.
- Recharts visualizations, animated KPI counters, glassmorphism panels.
- LocalStorage-persisted state (Zustand): maturity answers, ROI inputs, persona, theme, reports.
- jsPDF + html2canvas based report export — fully offline.
- Mocked enterprise datasets — no backend required.

## Tech stack

- React 19 + React Router 7 (HashRouter for static-host friendliness)
- TailwindCSS 3 + shadcn/ui + Radix primitives
- Framer Motion · Recharts · Lucide Icons
- Zustand · jsPDF · html2canvas · Sonner

## Run locally

```bash
cd frontend
yarn install
yarn start
```

The app starts at `http://localhost:3000`.

## Deploy to GitHub Pages

The app uses `HashRouter` so it works on any static host (GitHub Pages, S3, Cloudflare Pages, Netlify, etc.) without needing server-side rewrites.

### Option A — gh-pages package (recommended)

```bash
cd frontend
yarn add -D gh-pages
```

Edit `frontend/package.json`:

```jsonc
{
  "homepage": "https://<your-username>.github.io/<your-repo>",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

Then:

```bash
yarn deploy
```

Push to GitHub and in **Settings → Pages → Source**, choose the `gh-pages` branch.

### Option B — GitHub Actions

Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: yarn, cache-dependency-path: frontend/yarn.lock }
      - run: yarn install --frozen-lockfile
        working-directory: frontend
      - run: yarn build
        working-directory: frontend
        env:
          PUBLIC_URL: /<your-repo>
      - uses: actions/upload-pages-artifact@v3
        with: { path: frontend/build }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Project structure

```
src/
 ├── components/         # KPICard, RadialGauge, Sidebar, Header, ExportButton, ...
 ├── pages/              # 15 module pages
 ├── layouts/            # DashboardLayout
 ├── store/              # Zustand store (persisted)
 ├── data/               # Mock datasets + recommendation engines
 ├── lib/                # cn, format helpers
 └── App.js              # HashRouter + routes
```

## License

Internal demo · all data is simulated.
