# Performance Optimizations

## Frontend Optimizations
- **Static Pre-rendering**: All dashboard routes are pre-rendered at build time with Next.js App Router for instant load performance.
- **Component Transpilation**: Packages like `framer-motion` and `@xyflow/react` are selectively transpiled for optimal code splitting.
- **State Persistence**: Zustand storage uses localized JSON serialization to prevent unnecessary global re-renders.

## Backend Optimizations
- **Async Execution**: Quart routes execute asynchronously using ASGI event loops for concurrent request handling.
- **Vector PDF Streaming**: ReportLab generates PDF streams directly in memory (`io.BytesIO()`) without disk I/O latency.
