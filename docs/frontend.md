# Frontend Architecture

## Overview

The frontend is a single-page SaaS dashboard built using **Next.js 14 App Router**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **React Flow**.

## Folder Structure

```
frontend/
├── app/
│   ├── (dashboard)/         # Protected layout with Sidebar & Header
│   │   ├── dashboard/       # Main executive overview
│   │   ├── interview/       # AI founder interview wizard
│   │   ├── processes/       # Business process list
│   │   ├── workflow/        # React Flow digital twin simulator
│   │   ├── opportunities/   # Automation opportunity scoring
│   │   ├── roi/             # Recharts financial calculator
│   │   ├── roadmap/         # Implementation roadmap
│   │   ├── marketplace/     # Filterable AI tool marketplace
│   │   ├── risk/            # Risk & compliance breakdown
│   │   └── report/          # PDF report preview & download
│   ├── onboarding/          # Multi-step company setup
│   ├── layout.tsx           # Global Root layout
│   └── page.tsx             # Marketing landing page
├── components/
│   ├── layout/              # Sidebar & Header components
│   └── providers/           # ThemeProvider
├── lib/
│   ├── api.ts               # Unified REST API client
│   ├── supabase.ts          # Supabase client instantiation
│   └── utils.ts             # Currency, numbers & class merge utilities
└── store/
    └── useAppStore.ts       # Zustand store with persistent local storage
```
