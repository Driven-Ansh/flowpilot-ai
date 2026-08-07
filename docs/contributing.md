# Contribution Guide

## Code Standards
- **TypeScript**: Strict type definitions for all API models and component props. Zero `any` where possible.
- **Python**: Follow PEP 8 guidelines with explicit type annotations on functions and Pydantic models for validation.
- **Git Commit Convention**: Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`).

## Workflow
1. Create a feature branch: `git checkout -b feat/my-feature`
2. Validate TypeScript: `cd frontend && npx tsc --noEmit`
3. Validate Python: `cd backend && python -m pytest`
4. Submit pull request with detailed summary.
