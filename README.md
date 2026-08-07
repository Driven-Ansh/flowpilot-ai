# FlowPilot AI – AI Workflow Automation Advisor

![FlowPilot AI Banner](https://raw.githubusercontent.com/flowpilot/assets/main/banner.png)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/flowpilot/flowpilot-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![Quart](https://img.shields.io/badge/Quart-Async-purple.svg)](https://pgjones.gitlab.io/quart/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald.svg)](https://supabase.com/)

> **FlowPilot AI** is an enterprise-grade AI Workflow Automation Advisor platform designed to help startups and scaling businesses discover repetitive operational processes, quantify potential ROI from AI automation, simulate before/after workflow graphs, and generate actionable, prioritized implementation roadmaps.

---

## 📌 Problem Statement

Startups and growing companies waste hundreds of hours every month on manual, repetitive operational tasks—from data entry and lead triage to report generation and customer support routing. 

1. **Lack of Visibility**: Founders and department leads often lack a clear, bird's-eye view of where operational inefficiencies lie.
2. **Unclear ROI**: Companies hesitate to adopt AI tools because they cannot reliably forecast cost savings or time-to-value.
3. **Overwhelming Vendor Landscape**: With thousands of AI tools flooding the market, picking the right tech stack for specific processes is daunting.
4. **Execution Paralysis**: Without a phased implementation roadmap, AI adoption attempts become fragmented and fail to scale.

---

## 🚀 The Solution

FlowPilot AI operates as an automated senior AI strategy consultant:
- **Interactive AI Discovery**: Conducts a structured discovery interview with business leaders to map internal operations.
- **Explainable Automation Scoring**: Ranks every process by Feasibility, Impact, and ROI scores (0–100).
- **Digital Twin Workflows**: Renders interactive React Flow graph simulations contrasting current manual bottlenecks against automated future states.
- **Financial Projections**: Provides 24-month cumulative savings forecasts, payback periods, and 3-year net value calculations.
- **Board-Ready Artifacts**: Generates executive PDF advisory reports and phased 24-week rollout plans.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vercel)                      │
│  Next.js 14 + TypeScript + TailwindCSS + shadcn/ui           │
│  Framer Motion + React Flow + Recharts                        │
│  Zustand State Store + Supabase Client                        │
└────────────────────────┬────────────────────────────────────┘
                         │ REST / JSON (Async API)
┌────────────────────────▼────────────────────────────────────┐
│                       BACKEND (Render)                        │
│  Quart (Python Async Web Framework)                           │
│  Provider-Agnostic LLM Layer (OpenAI GPT-4o / Fallbacks)      │
│  ReportLab PDF Engine + Supabase Python Engine                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  DATABASE & AUTH (Supabase)                   │
│  PostgreSQL + Row-Level Security (RLS) + Storage              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Screenshots & UI Showcase

| Executive Dashboard | AI Founder Interview |
| :---: | :---: |
| ![Dashboard](https://raw.githubusercontent.com/flowpilot/assets/main/dashboard.png) | ![Interview](https://raw.githubusercontent.com/flowpilot/assets/main/interview.png) |

| Workflow Digital Twin | ROI Analytics |
| :---: | :---: |
| ![Workflow](https://raw.githubusercontent.com/flowpilot/assets/main/workflow.png) | ![ROI](https://raw.githubusercontent.com/flowpilot/assets/main/roi.png) |

---

## ⭐ Core Features

1. 🎤 **AI Founder Interview**: Conversational multi-turn discovery wizard with streaming response support.
2. 🔍 **Business Process Discovery**: Auto-detects departments, time commitments, team sizes, and pain points.
3. 🔀 **Digital Twin Flow Graph**: Interactive React Flow visualizer with animated edges showing real-time vs manual flow.
4. 🎯 **Automation Opportunity Detection**: Identifies rule-based and AI-eligible tasks.
5. 📊 **Opportunity Scoring Engine**: Evaluates Feasibility, Impact, and ROI on a 100-point scale.
6. 💰 **Interactive ROI Calculator**: Real-time parameter tweaking (hourly rate, implementation budget) with 24-month projections.
7. 🔄 **Before vs After Simulation**: Instant toggle showing 98%+ time reductions and error rate improvements.
8. 🧩 **AI Tool Recommendation Engine**: Maps specific workflows to top commercial AI solutions.
9. 🛒 **AI Agent Marketplace**: Filterable directory of verified enterprise AI tools with integration complexity ratings.
10. 🛡️ **Risk & Compliance Analysis**: Evaluates GDPR, security, model accuracy, and change management risks.
11. 🗺️ **Implementation Roadmap**: Phased 24-week rollout schedule broken into Quick Wins, Core Automation, and Advanced AI.
12. 📈 **Executive Dashboard**: Unified overview featuring KPI cards, opportunity leaderboards, and trajectory charts.
13. 📄 **Exportable PDF Report**: One-click generation of board-ready PDF executive summaries via ReportLab.
14. 🌙 **Responsive Dark/Light UI**: Tailored glassmorphic aesthetic built with TailwindCSS and Framer Motion.

---

## 🛠️ Technology Stack & Selection Rationale

| Layer | Tool | Rationale |
| --- | --- | --- |
| **Frontend Framework** | Next.js 14 (App Router) | Server components, optimized routing, native Vercel deployment. |
| **Language** | TypeScript 5.0 | Strict type safety across components, store, and API wrappers. |
| **Styling** | TailwindCSS + CSS Variables | Maximum styling velocity with custom dark/light theme tokens. |
| **Animations** | Framer Motion | Smooth layout transitions, modal reveals, and SVG ring animations. |
| **Visual Graphs** | React Flow (`@xyflow/react`) | Professional workflow graph rendering with custom node styling and animated edges. |
| **Analytics** | Recharts | Responsive SVG charts for monthly cumulative ROI and savings pie charts. |
| **State** | Zustand | Lightweight, unopinionated state management with persistent local storage. |
| **Backend Framework** | Quart (Python Async) | Modern ASGI Python framework compatible with Flask paradigms, ideal for streaming & AI. |
| **ASGI Server** | Hypercorn | High-performance production ASGI server for Quart. |
| **AI Integration** | OpenAI GPT-4o | State-of-the-art reasoning for business process analysis and extraction. |
| **PDF Generation** | ReportLab | Programmatic vector PDF creation for advisory report downloads. |
| **Database & Auth** | Supabase (PostgreSQL) | Managed database, Instant Auth, Storage, and Row-Level Security. |

---

## 📁 Project Structure

```
flowpilot-ai/
├── frontend/                          # Next.js 14 App Router application
│   ├── app/                           # App Router pages & layouts
│   │   ├── (dashboard)/               # Protected dashboard routes
│   │   │   ├── dashboard/             # Executive dashboard home
│   │   │   ├── interview/             # AI Founder Interview
│   │   │   ├── processes/             # Process discovery
│   │   │   ├── workflow/              # React Flow digital twin
│   │   │   ├── opportunities/         # Automation opportunity scoring
│   │   │   ├── roi/                   # ROI calculator
│   │   │   ├── roadmap/               # Implementation roadmap
│   │   │   ├── marketplace/           # AI tool marketplace
│   │   │   ├── risk/                  # Risk & compliance analysis
│   │   │   └── report/                # PDF report preview & download
│   │   ├── onboarding/                # Multi-step company setup wizard
│   │   ├── layout.tsx                 # Root HTML layout with providers
│   │   └── page.tsx                   # Marketing landing page
│   ├── components/                    # UI & layout components
│   │   ├── layout/                    # Sidebar, Header, Navigation
│   │   └── providers/                 # ThemeProvider and context wrappers
│   ├── lib/                           # Utility functions & API wrappers
│   │   ├── api.ts                     # Unified backend API client
│   │   ├── supabase.ts                # Supabase client instantiation
│   │   └── utils.ts                   # Formatting & style helpers
│   ├── store/                         # Zustand global state store (`useAppStore.ts`)
│   └── types/                         # Shared TypeScript interfaces
│
├── backend/                           # Quart Python API service
│   ├── app/
│   │   ├── __init__.py                # App factory & CORS setup
│   │   ├── config.py                  # Environment configuration
│   │   ├── models/                    # Pydantic data schemas
│   │   ├── routes/                    # Blueprint routes (10 route files)
│   │   └── services/                  # AI LLM service, embeddings, Supabase client
│   ├── requirements.txt               # Python dependencies
│   ├── run.py                         # Development entrypoint
│   ├── Procfile                       # Render deployment declaration
│   └── render.yaml                    # Render service config
│
├── docs/                              # Comprehensive developer documentation (15 files)
├── supabase/                          # Database migrations & schemas
├── .gitignore                         # Comprehensive monorepo gitignore
└── README.md                          # Main project documentation
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Node.js 18.x or 20.x
- Python 3.11+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/flowpilot/flowpilot-ai.git
cd flowpilot-ai
```

### 2. Set Up Backend (Quart API)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python run.py
```
*Backend runs at `http://localhost:8000` (Mock mode is enabled automatically if OpenAI/Supabase keys are omitted).*

### 3. Set Up Frontend (Next.js)
In a new terminal window:
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 🔑 Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (`backend/.env`)
```env
PORT=8000
FLASK_ENV=development
SECRET_KEY=dev-secret-key
CORS_ORIGINS=http://localhost:3000
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

---

## 📡 API Reference Overview

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/health` | GET | Service health and mock mode status check. |
| `/api/interview/start` | POST | Initializes a new founder interview session. |
| `/api/interview/message` | POST | Sends user message and receives AI advisor response. |
| `/api/interview/extract` | POST | Extracts structured business process JSON from interview history. |
| `/api/processes/` | POST | Enriches discovered processes with automation metrics. |
| `/api/workflow/generate` | POST | Generates React Flow nodes & edges for before/after states. |
| `/api/opportunities/` | POST | Scores and ranks automation opportunities. |
| `/api/roi/calculate` | POST | Returns 24-month financial projections and ROI metrics. |
| `/api/roadmap/generate` | POST | Generates phased implementation timeline data. |
| `/api/marketplace/` | GET | Fetches curated list of enterprise AI tools. |
| `/api/risk/analyze` | POST | Evaluates risk levels across security, accuracy, and compliance. |
| `/api/report/generate` | POST | Generates and serves a downloadable PDF executive report. |

*See [`/docs/api-reference.md`](file:///C:/Users/amazi/.gemini/antigravity/scratch/flowpilot-ai/docs/api-reference.md) for full request/response payloads.*

---

## 📊 Database Schema (Supabase PostgreSQL)

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  stage TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE business_processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  department TEXT,
  frequency TEXT,
  time_per_week NUMERIC,
  people_involved INTEGER,
  pain_points JSONB DEFAULT '[]',
  tools_used JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE automation_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  feasibility_score NUMERIC,
  impact_score NUMERIC,
  roi_score NUMERIC,
  estimated_annual_savings NUMERIC,
  recommended_tools JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)
1. Push repository to GitHub.
2. Import project into Vercel and set Root Directory to `frontend`.
3. Configure `NEXT_PUBLIC_API_URL` to point to your Render backend URL.
4. Deploy.

### Backend Deployment (Render)
1. Create a new Web Service on Render.
2. Connect repository and set Root Directory to `backend`.
3. Set environment to `Python 3`.
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `hypercorn run:app --bind 0.0.0.0:$PORT`
6. Add environment variables (`OPENAI_API_KEY`, `CORS_ORIGINS`).

---

## ❓ FAQ & Troubleshooting

**Q: Can I run FlowPilot AI locally without OpenAI or Supabase keys?**
> **Yes!** FlowPilot AI includes an automatic Mock Mode. If API keys are omitted in `.env`, both frontend and backend seamlessly utilize realistic demonstration datasets.

**Q: How are ROI numbers calculated?**
> ROI is derived from total team hours saved per week × hourly wage rate × 52 weeks, combined with direct software/license cost reductions, minus estimated setup and integration expenses.

---

## 📜 License & Contributors

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by senior SaaS architects and AI engineers.
