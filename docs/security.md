# Security & Compliance

## Data Protection
- **Environment Isolation**: API keys and backend secrets are loaded exclusively via server-side environment variables. Zero secrets committed to Git.
- **Supabase Row-Level Security (RLS)**: Database tables utilize RLS policies ensuring users can only read and write data associated with their own `auth.users` UUID.
- **CORS Safeguards**: Quart backend enforces explicit `CORS_ORIGINS` headers restricting API access strictly to trusted domains.
- **Client Sanitization**: All user inputs are validated on the client via Zod schemas and sanitized on the backend via Pydantic model schemas.
