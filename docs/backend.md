# Backend Architecture

## Overview

The backend is built with **Quart**, an async Python microframework compatible with Flask APIs but running on ASGI (`Hypercorn`).

## Folder Structure

```
backend/
├── app/
│   ├── __init__.py          # App factory, blueprint registrations, CORS
│   ├── config.py            # Environment configuration
│   ├── models/              # Pydantic data schemas
│   ├── routes/              # Modular feature blueprints (10 endpoints)
│   └── services/            # LLM service, embeddings, Supabase client
├── requirements.txt         # Dependencies
├── run.py                   # Development launcher
└── render.yaml              # Deployment manifest
```

## Blueprints & Endpoints

1. **`health_bp`** (`/api/health`): Returns service health and mock status.
2. **`interview_bp`** (`/api/interview`): Starts session, handles conversational turns, and extracts structured JSON.
3. **`processes_bp`** (`/api/processes`): Maps and scores operational business processes.
4. **`workflow_bp`** (`/api/workflow`): Generates React Flow node/edge structures for before/after workflows.
5. **`opportunities_bp`** (`/api/opportunities`): Scores feasibility, impact, and ROI.
6. **`roi_bp`** (`/api/roi`): Calculates 24-month financial projections.
7. **`roadmap_bp`** (`/api/roadmap`): Generates 3-phase rollout timelines.
8. **`marketplace_bp`** (`/api/marketplace`): Serves AI tools directory and recommendations.
9. **`risk_bp`** (`/api/risk`): Performs security, accuracy, and change management risk assessments.
10. **`report_bp`** (`/api/report`): Programmatically renders PDF advisory reports using ReportLab.
