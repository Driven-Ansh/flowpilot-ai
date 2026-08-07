# FlowPilot AI – AI Workflow Automation Advisor

[![Live Demo](https://img.shields.io/badge/Vercel-Live--Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://flowpilot-ai-chi.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Driven-Ansh/flowpilot-ai)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Driven-Ansh/flowpilot-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black.svg)](https://nextjs.org/)
[![Quart](https://img.shields.io/badge/Quart-Async-purple.svg)](https://pgjones.gitlab.io/quart/)

> **FlowPilot AI** is an enterprise-grade AI Workflow Automation Advisor platform designed to help startups and scaling businesses discover repetitive operational processes, quantify potential ROI from AI automation, simulate before/after workflow graphs, and generate actionable, prioritized implementation roadmaps.

---

## 🌐 Live Web Application & Deployment Links

- **Main Vercel App**: [https://flowpilot-ai-chi.vercel.app](https://flowpilot-ai-chi.vercel.app)
- **Production Alias**: [https://flowpilot-dbkw1xhcs-anshulsinhask-3885s-projects.vercel.app](https://flowpilot-dbkw1xhcs-anshulsinhask-3885s-projects.vercel.app)
- **GitHub Repository**: [https://github.com/Driven-Ansh/flowpilot-ai](https://github.com/Driven-Ansh/flowpilot-ai)

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

## 🖥️ Live Feature Deep-Dive

Explore the platform live across all core advisory modules:

- 🎤 **[AI Founder Discovery Advisor](https://flowpilot-ai-chi.vercel.app/dashboard/interview)**: Conversational multi-turn discovery wizard with quick choice chips and intelligent extraction.
- 🔀 **[Digital Twin Workflow Graph](https://flowpilot-ai-chi.vercel.app/dashboard/workflow)**: Interactive React Flow visualizer contrasting manual bottlenecks vs 98%+ AI speedup.
- 🎯 **[Automation Opportunities Matrix](https://flowpilot-ai-chi.vercel.app/dashboard/opportunities)**: Feasibility, Impact & ROI scored leaderboard for high-value targets.
- 💰 **[Interactive ROI Calculator](https://flowpilot-ai-chi.vercel.app/dashboard/roi)**: Dynamic parameter sliders (hourly rates, budgets) with 24-month cumulative area chart.
- 🗺️ **[Phased Implementation Roadmap](https://flowpilot-ai-chi.vercel.app/dashboard/roadmap)**: 24-week rollout timeline organized into Quick Wins, Core Automation & AI Agents.
- 🛒 **[AI Tool Marketplace](https://flowpilot-ai-chi.vercel.app/dashboard/marketplace)**: Curated vendor tech stack directory with complexity ratings & price models.
- 🛡️ **[Risk & Compliance Dashboard](https://flowpilot-ai-chi.vercel.app/dashboard/risk)**: Governance score meter, GDPR data privacy mitigations & model accuracy safeguards.
- 📄 **[Executive Advisory PDF Report](https://flowpilot-ai-chi.vercel.app/dashboard/report)**: One-click vector PDF generation and board-ready export.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vercel)                      │
│  Next.js 16 + TypeScript + TailwindCSS + shadcn/ui           │
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
14. 🌙 **Responsive Dark UI**: Tailored glassmorphic aesthetic built with TailwindCSS and Framer Motion.

---

## 🛠️ Technology Stack

| Layer | Tool | Rationale |
| --- | --- | --- |
| **Frontend Framework** | Next.js 16 (App Router) | Server components, optimized routing, native Vercel deployment. |
| **Language** | TypeScript 5.0 | Strict type safety across components, store, and API wrappers. |
| **Styling** | TailwindCSS v3 + CSS Variables | Maximum styling velocity with custom dark theme tokens matching Nimblize design system. |
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
├── frontend/                          # Next.js 16 App Router application
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
│   │   ├── auth/                      # Personalized AuthModal component
│   │   ├── layout/                    # Sidebar, Header, Navigation
│   │   ├── ui/                        # Animated FlowPilotLogo, SplashScreen
│   │   └── providers/                 # ThemeProvider and context wrappers
│   ├── lib/                           # Utility functions & API wrappers with fallback mocks
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
git clone https://github.com/Driven-Ansh/flowpilot-ai.git
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
python run.py
```
*Backend runs at `http://localhost:8000` (Mock mode is enabled automatically if OpenAI/Supabase keys are omitted).*

### 3. Set Up Frontend (Next.js)
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 📜 License & Contributors

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by senior SaaS architects and AI engineers.
