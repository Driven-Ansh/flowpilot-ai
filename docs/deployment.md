# Production Deployment Guide

## Frontend (Vercel)
1. Import repository in Vercel dashboard.
2. Set Root Directory to `frontend`.
3. Set Framework Preset to `Next.js`.
4. Configure environment variable `NEXT_PUBLIC_API_URL` pointing to Render API.
5. Deploy.

## Backend (Render)
1. Create a Web Service on Render.
2. Set Root Directory to `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `hypercorn run:app --bind 0.0.0.0:$PORT`
5. Configure environment variables (`OPENAI_API_KEY`, `CORS_ORIGINS`).

## Database (Supabase)
1. Execute SQL migration scripts located in `supabase/migrations/`.
2. Configure Row-Level Security policies.
