/**
 * Shared TypeScript types for FlowPilot AI.
 * These mirror the backend Pydantic models.
 */

export interface CompanyProfile {
  company_name: string;
  industry: string;
  company_size: string;
  stage: string;
  description?: string;
}

export interface BusinessProcess {
  id: string;
  name: string;
  department: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  time_per_week_hours: number;
  people_involved: number;
  description: string;
  pain_points: string[];
  tools_used: string[];
  automation_potential: 'low' | 'medium' | 'high';
  complexity: 'low' | 'medium' | 'high';
}

export interface AutomationOpportunity {
  id: string;
  name: string;
  process: string;
  department: string;
  description: string;
  automation_type: string;
  feasibility_score: number;
  impact_score: number;
  roi_score: number;
  estimated_hours_saved_per_week: number;
  estimated_annual_cost_savings: number;
  implementation_effort: 'Low' | 'Medium' | 'High';
  time_to_value_weeks: number;
  recommended_tools: string[];
  risk_level: string;
}

export interface RoiSummary {
  total_hours_saved_per_week: number;
  annual_hours_saved: number;
  annual_cost_savings: number;
  implementation_cost: number;
  roi_percentage: number;
  payback_months: number;
  three_year_value: number;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration_weeks: number;
  color: string;
  items: RoadmapItem[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  effort: string;
  priority: string;
  estimated_weeks: number;
  owner: string;
  tools: string[];
  status: 'planned' | 'in_progress' | 'completed';
  roi_estimate: string;
}

export interface AiTool {
  id: string;
  name: string;
  vendor: string;
  category: string;
  description: string;
  pricing_model: string;
  starting_price: string;
  integration_complexity: string;
  rating: number;
  use_cases: string[];
  tags: string[];
  logo_emoji: string;
}

export interface RiskCategory {
  category: string;
  level: string;
  score: number;
  description: string;
  mitigations: string[];
  color: string;
}
