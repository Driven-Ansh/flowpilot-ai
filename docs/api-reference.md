# API Reference

Base URL: `http://localhost:8000/api` (Production: `https://your-backend.onrender.com/api`)

## Health Check
- `GET /api/health`
  - Response: `{"status": "healthy", "service": "FlowPilot AI Backend", "mock_mode": true}`

## Interview Endpoints
- `POST /api/interview/start`
  - Body: `{"company_name": "Acme", "industry": "SaaS", "company_size": "10-50", "stage": "Growth"}`
  - Response: `{"session_id": "uuid", "message": "string", "company_context": "string"}`

- `POST /api/interview/message`
  - Body: `{"session_id": "uuid", "message": "string", "history": [...], "company_context": "string"}`
  - Response: `{"response": "string", "is_complete": false, "turn_count": 3}`

- `POST /api/interview/extract`
  - Body: `{"history": [...], "company_context": "string"}`
  - Response: Structured JSON of processes, pain points, and current software tools.

## Discovery & Simulation Endpoints
- `POST /api/processes/` & `GET /api/processes/mock`
- `POST /api/workflow/generate` & `GET /api/workflow/mock`
- `POST /api/opportunities/` & `GET /api/opportunities/mock`
- `POST /api/roi/calculate` & `GET /api/roi/mock`
- `POST /api/roadmap/generate` & `GET /api/roadmap/mock`
- `GET /api/marketplace/` & `POST /api/marketplace/recommend`
- `POST /api/risk/analyze` & `GET /api/risk/mock`
- `POST /api/report/generate` (Returns vector PDF file stream)
