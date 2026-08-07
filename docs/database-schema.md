# Database Schema & ER Diagram

## Overview

FlowPilot AI utilizes PostgreSQL hosted on Supabase, protected by Row-Level Security (RLS) policies.

```sql
-- Company profiles
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  stage TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Interview sessions
CREATE TABLE interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress',
  transcript JSONB DEFAULT '[]',
  extracted_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Business processes
CREATE TABLE business_processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  department TEXT,
  frequency TEXT,
  time_per_week NUMERIC,
  people_involved INTEGER,
  pain_points JSONB DEFAULT '[]',
  tools_used JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Automation opportunities
CREATE TABLE automation_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID REFERENCES business_processes(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  feasibility_score NUMERIC,
  impact_score NUMERIC,
  roi_score NUMERIC,
  estimated_annual_cost_savings NUMERIC,
  recommended_tools JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);
```
