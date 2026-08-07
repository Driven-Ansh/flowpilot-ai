/**
 * Global application state using Zustand.
 *
 * This store manages:
 * - Company profile and interview session
 * - Discovered business processes
 * - Automation opportunities
 * - ROI data
 * - UI state (theme, sidebar, active tab)
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CompanyProfile {
  company_name: string;
  industry: string;
  company_size: string;
  stage: string;
  description?: string;
}

export interface Process {
  id: string;
  name: string;
  department: string;
  frequency: string;
  time_per_week_hours: number;
  people_involved: number;
  description: string;
  pain_points: string[];
  tools_used: string[];
  automation_potential: 'low' | 'medium' | 'high';
  complexity: 'low' | 'medium' | 'high';
}

export interface Opportunity {
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
  implementation_effort: string;
  time_to_value_weeks: number;
  recommended_tools: string[];
  risk_level: string;
}

interface AppState {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Company & Session
  company: CompanyProfile | null;
  sessionId: string | null;
  companyContext: string | null;
  setCompany: (company: CompanyProfile) => void;
  setSession: (sessionId: string, context: string) => void;

  // Interview
  interviewHistory: Array<{ role: string; content: string }>;
  interviewComplete: boolean;
  addMessage: (role: string, content: string) => void;
  setInterviewComplete: (complete: boolean) => void;

  // Processes
  processes: Process[];
  setProcesses: (processes: Process[]) => void;

  // Opportunities
  opportunities: Opportunity[];
  setOpportunities: (opportunities: Opportunity[]) => void;

  // ROI
  roiData: any | null;
  setRoiData: (data: any) => void;

  // Roadmap
  roadmapData: any | null;
  setRoadmapData: (data: any) => void;

  // Onboarding
  onboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;

  // Reset
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      // Company & Session
      company: null,
      sessionId: null,
      companyContext: null,
      setCompany: (company) => set({ company }),
      setSession: (sessionId, companyContext) => set({ sessionId, companyContext }),

      // Interview
      interviewHistory: [],
      interviewComplete: false,
      addMessage: (role, content) =>
        set((s) => ({ interviewHistory: [...s.interviewHistory, { role, content }] })),
      setInterviewComplete: (interviewComplete) => set({ interviewComplete }),

      // Processes
      processes: [],
      setProcesses: (processes) => set({ processes }),

      // Opportunities
      opportunities: [],
      setOpportunities: (opportunities) => set({ opportunities }),

      // ROI
      roiData: null,
      setRoiData: (roiData) => set({ roiData }),

      // Roadmap
      roadmapData: null,
      setRoadmapData: (roadmapData) => set({ roadmapData }),

      // Onboarding
      onboardingComplete: false,
      setOnboardingComplete: (onboardingComplete) => set({ onboardingComplete }),

      // Reset all state (preserves theme)
      reset: () =>
        set({
          company: null,
          sessionId: null,
          companyContext: null,
          interviewHistory: [],
          interviewComplete: false,
          processes: [],
          opportunities: [],
          roiData: null,
          roadmapData: null,
          onboardingComplete: false,
        }),
    }),
    {
      name: 'flowpilot-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist user-generated data and theme — omit transient UI state
      partialize: (state) => ({
        theme: state.theme,
        company: state.company,
        interviewHistory: state.interviewHistory,
        interviewComplete: state.interviewComplete,
        processes: state.processes,
        opportunities: state.opportunities,
        roiData: state.roiData,
        roadmapData: state.roadmapData,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);
