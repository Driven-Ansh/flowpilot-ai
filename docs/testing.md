# Testing & Verification Guide

## Automated Tests

### Frontend Type Check & Build Validation
```bash
cd frontend
npx tsc --noEmit
npm run build
```

### Backend Unit & Integration Tests
```bash
cd backend
python -m pytest
```

## Manual Acceptance Testing Checklist
- [x] Landing page CTA redirects to `/onboarding`
- [x] Multi-step onboarding saves company context to Zustand store
- [x] AI Founder Interview initiates session and handles conversation turns
- [x] Digital twin workflow graph toggles cleanly between Before (Manual) and After (AI) states
- [x] ROI sliders update financial projections dynamically
- [x] Opportunity cards display circular progress score rings
- [x] Export report button triggers PDF generation and browser file download
- [x] Dark/Light theme toggles background and card borders
