# Scaling Strategy

## Horizontal Scaling Strategy

1. **Stateless Web Tier**: The Quart backend relies on external state (Supabase) and is fully stateless, allowing horizontal scaling across multiple Render / Kubernetes instances behind a load balancer.
2. **Edge Caching**: Next.js frontend assets and static page shells are served directly via Vercel's global Edge CDN network.
3. **Database Scaling**: PostgreSQL on Supabase supports read-replicas, connection pooling via PgBouncer, and vector indexes (pgvector) for future RAG expansions.
