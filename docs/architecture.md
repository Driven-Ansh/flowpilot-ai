# System Architecture

## Overview

FlowPilot AI follows a modern, decoupled client-server architecture designed for high responsiveness, scalability, and maintainability.

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  Next.js 14 App Router (React 18 + TypeScript)              │
│  Zustand Global Store (Local Persistence)                   │
│  React Flow Digital Twin Engine                             │
│  Recharts Data Visualization                                │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS / REST API
┌────────────────────────▼────────────────────────────────────┐
│                      SERVER LAYER                           │
│  Quart Async Python ASGI Framework                          │
│  Provider-Agnostic LLM Abstraction                          │
│  ReportLab Vector PDF Generator                             │
└────────────────────────┬────────────────────────────────────┘
                         │ Async Postgres Protocol
┌────────────────────────▼────────────────────────────────────┐
│                     DATABASE LAYER                          │
│  Supabase Managed PostgreSQL                                │
│  Row-Level Security (RLS) Policies                          │
│  Supabase Auth & Storage                                    │
└─────────────────────────────────────────────────────────────┘
```

## Client Layer (Frontend)
- **Framework**: Next.js 14 with TypeScript in strict mode.
- **State Management**: Zustand store (`useAppStore.ts`) handles active company profiles, interview transcripts, discovered processes, opportunities, and ROI metrics.
- **Mock Fallback**: If Supabase or backend services are unreachable, the client state smoothly defaults to mock data without throwing UI errors.

## Server Layer (Backend)
- **Framework**: Quart (Python ASGI async web framework).
- **LLM Pipeline**: Provider-agnostic LLM client wrapping OpenAI GPT-4o with json-object response formatting.
- **Mock Mode**: When `SUPABASE_URL` or `OPENAI_API_KEY` is not present, backend endpoints return structured mock data for instant demo capabilities.
