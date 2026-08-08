/**
 * API client for FlowPilot AI backend.
 * 
 * Features automatic client-side fallback data with realistic Indian startup metrics (INR - ₹)
 * and dynamic calculations for Vercel deployments and standalone client demos.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchAPI<T>(path: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API status ${response.status}`);
    }

    return await response.json() as T;
  } catch (err) {
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

// --- CLIENT-SIDE MOCK FALLBACK DATA (FEASIBLE INR STANDARDS) ---
const MOCK_OPPORTUNITIES = [
  {
    id: '1',
    name: 'AI Lead Qualification & CRM Sync',
    process: 'Lead Qualification & CRM Updates',
    department: 'Sales',
    description: 'Deploy an AI model to score inbound leads (0-100) from behavioral data, auto-enriching Salesforce & HubSpot.',
    automation_type: 'AI/ML Model',
    feasibility_score: 92,
    impact_score: 88,
    roi_score: 95,
    estimated_hours_saved_per_week: 8,
    estimated_annual_cost_savings: 320000,
    implementation_effort: 'Medium',
    time_to_value_weeks: 4,
    recommended_tools: ['Clay.com', 'HubSpot AI', 'Salesforce Einstein', 'OpenAI GPT-4o'],
    risk_level: 'Low',
  },
  {
    id: '2',
    name: 'Automated Performance Reporting',
    process: 'Weekly Performance Reporting',
    department: 'Operations',
    description: 'Auto-compile metrics across Mixpanel, Stripe & Sheets into branded Google Slides with AI narrative summaries.',
    automation_type: 'RPA + AI Writing',
    feasibility_score: 96,
    impact_score: 75,
    roi_score: 85,
    estimated_hours_saved_per_week: 6,
    estimated_annual_cost_savings: 240000,
    implementation_effort: 'Low',
    time_to_value_weeks: 2,
    recommended_tools: ['Zapier AI', 'Looker Studio', 'Notion AI', 'GPT-4o API'],
    risk_level: 'Very Low',
  },
  {
    id: '3',
    name: 'AI Support Triage & Auto-Reply',
    process: 'Customer Support Ticket Routing',
    department: 'Support',
    description: 'Deploy conversational AI agents to auto-resolve 40%+ of repetitive support tickets and route high-value escalations.',
    automation_type: 'NLP + Autonomous Agent',
    feasibility_score: 85,
    impact_score: 94,
    roi_score: 90,
    estimated_hours_saved_per_week: 7,
    estimated_annual_cost_savings: 290000,
    implementation_effort: 'Medium',
    time_to_value_weeks: 6,
    recommended_tools: ['Intercom Fin', 'Zendesk AI', 'Sierra AI', 'GPT-4o API'],
    risk_level: 'Low',
  },
];

export function calculateDynamicROI(hourlyRate: number = 650, setupBudget: number = 150000, opportunities: any[] = MOCK_OPPORTUNITIES) {
  const totalHours = opportunities.reduce((acc, o) => acc + (o.estimated_hours_saved_per_week || 7), 0);
  const annualHours = totalHours * 52;
  const laborSavings = annualHours * hourlyRate;
  const directSavings = opportunities.reduce((acc, o) => acc + (o.estimated_annual_cost_savings || 250000), 0);
  const totalAnnualSavings = laborSavings + Math.round(directSavings * 0.4);
  const roiPercentage = setupBudget > 0 ? Math.round(((totalAnnualSavings - setupBudget) / setupBudget) * 100) : 285;
  const paybackMonths = totalAnnualSavings > 0 ? Number((setupBudget / (totalAnnualSavings / 12)).toFixed(1)) : 2.1;
  const threeYearValue = (totalAnnualSavings * 3) - setupBudget;

  const baseMonthlyBenefit = totalAnnualSavings / 12;

  // Non-linear compounding S-curve trajectory across 24 months
  let runningCumulative = -setupBudget;
  const monthly_projections = Array.from({ length: 24 }, (_, i) => {
    const monthNum = i + 1;
    // Multiplier accelerates after Month 3 (Phase 2) and Month 12 (Phase 3 AI Agents)
    let rampFactor = 0.6;
    if (monthNum <= 3) {
      rampFactor = 0.75 + (monthNum * 0.1);
    } else if (monthNum <= 12) {
      rampFactor = 1.0 + ((monthNum - 3) * 0.04);
    } else {
      rampFactor = 1.35 + ((monthNum - 12) * 0.03);
    }

    const monthlyYield = Math.round(baseMonthlyBenefit * rampFactor);
    runningCumulative += monthlyYield;

    return {
      month: `M${monthNum}`,
      cumulative_savings: Math.round(runningCumulative),
      monthly_savings: monthlyYield,
    };
  });

  return {
    summary: {
      total_hours_saved_per_week: totalHours,
      annual_hours_saved: annualHours,
      annual_cost_savings: totalAnnualSavings,
      implementation_cost: setupBudget,
      hourly_rate: hourlyRate,
      roi_percentage: roiPercentage,
      payback_months: paybackMonths,
      three_year_value: threeYearValue,
    },
    monthly_projections,
    breakdown: [
      { category: 'Labor Hours Recovered', value: laborSavings, color: '#6366f1' },
      { category: 'Direct Operational Efficiency', value: Math.round(directSavings * 0.4), color: '#06b6d4' },
    ],
  };
}

const MOCK_ROI = calculateDynamicROI(650, 150000, MOCK_OPPORTUNITIES);

const MOCK_ROADMAP = {
  total_weeks: 20,
  total_estimated_value: '₹8,50,000/yr',
  phases: [
    {
      phase: 1,
      title: 'Quick Wins',
      duration_weeks: 4,
      color: '#06b6d4',
      items: [
        {
          id: 'rp1-1',
          title: 'Automated Executive Reporting',
          description: 'Connect data sources & auto-generate weekly performance reports.',
          effort: 'Low',
          priority: 'High',
          estimated_weeks: 2,
          owner: 'Operations',
          tools: ['Zapier AI', 'Looker Studio'],
          status: 'planned',
          roi_estimate: '₹2,40,000/yr',
        },
      ],
    },
    {
      phase: 2,
      title: 'Core Automation',
      duration_weeks: 8,
      color: '#6366f1',
      items: [
        {
          id: 'rp2-1',
          title: 'AI Lead Qualification Engine',
          description: 'Real-time firmographic lead scoring & auto-enrichment.',
          effort: 'Medium',
          priority: 'High',
          estimated_weeks: 6,
          owner: 'Sales + Engineering',
          tools: ['Clay.com', 'Salesforce Einstein', 'GPT-4o API'],
          status: 'planned',
          roi_estimate: '₹3,20,000/yr',
        },
      ],
    },
    {
      phase: 3,
      title: 'Advanced AI Agents',
      duration_weeks: 8,
      color: '#a855f7',
      items: [
        {
          id: 'rp3-1',
          title: 'Autonomous Support Resolution Agent',
          description: 'Deploy conversational AI agent for 40%+ ticket resolution.',
          effort: 'High',
          priority: 'High',
          estimated_weeks: 6,
          owner: 'Support + Engineering',
          tools: ['Intercom Fin', 'Sierra AI', 'GPT-4o API'],
          status: 'planned',
          roi_estimate: '₹2,90,000/yr',
        },
      ],
    },
  ],
};

const MOCK_TOOLS = [
  { id: '1', name: 'OpenAI GPT-4o', vendor: 'OpenAI', category: 'Foundation Model', description: 'State-of-the-art multimodal LLM for reasoning & structured analysis.', pricing_model: 'Pay-per-token', starting_price: '₹0.40/1K tokens', integration_complexity: 'Low', rating: 4.9, use_cases: ['Content generation', 'Data extraction', 'Code execution'], tags: ['LLM', 'Multimodal'], logo_emoji: '🧠' },
  { id: '2', name: 'Clay.com', vendor: 'Clay', category: 'Sales Intelligence', description: 'AI-powered data enrichment and automated outreach for revenue teams.', pricing_model: 'Subscription', starting_price: '₹12,500/month', integration_complexity: 'Low', rating: 4.8, use_cases: ['Lead enrichment', 'Outreach automation'], tags: ['Sales', 'Enrichment'], logo_emoji: '🎯' },
  { id: '3', name: 'Intercom Fin', vendor: 'Intercom', category: 'Customer Support AI', description: 'Autonomous AI agent that resolves 40%+ support tickets instantly.', pricing_model: 'Per resolution', starting_price: '₹80/resolution', integration_complexity: 'Low', rating: 4.7, use_cases: ['Ticket resolution', 'FAQ automation'], tags: ['Support', 'AI Agent'], logo_emoji: '💬' },
  { id: '4', name: 'Zapier AI', vendor: 'Zapier', category: 'Workflow Automation', description: 'Connect 6,000+ apps with AI-powered multi-step automation.', pricing_model: 'Subscription', starting_price: '₹1,600/month', integration_complexity: 'Very Low', rating: 4.6, use_cases: ['App integration', 'Data sync'], tags: ['No-Code', 'Automation'], logo_emoji: '⚡' },
  { id: '5', name: 'Notion AI', vendor: 'Notion', category: 'Productivity AI', description: 'AI writing assistant and workspace knowledge base automation.', pricing_model: 'Add-on', starting_price: '₹650/user/month', integration_complexity: 'Very Low', rating: 4.5, use_cases: ['Documentation', 'Meeting summaries'], tags: ['Productivity', 'Docs'], logo_emoji: '📝' },
  { id: '6', name: 'Salesforce Einstein', vendor: 'Salesforce', category: 'CRM AI', description: 'Embedded CRM intelligence for lead scoring and pipeline analytics.', pricing_model: 'Add-on', starting_price: '₹4,000/user/month', integration_complexity: 'Medium', rating: 4.4, use_cases: ['Lead scoring', 'Sales forecasting'], tags: ['CRM', 'Enterprise'], logo_emoji: '☁️' },
];

const MOCK_RISK = {
  overall_risk_level: 'Low-Medium',
  risk_score: 28,
  categories: [
    { category: 'Data Privacy', level: 'Medium', score: 42, description: 'Customer data processed by AI requires DPDP Act / GDPR compliance verification.', mitigations: ['Implement data anonymization before LLM API calls', 'Ensure vendor DPAs are active'], color: '#f59e0b' },
    { category: 'Model Accuracy', level: 'Low', score: 25, description: 'AI models require human-in-the-loop validation for high-stakes decisions.', mitigations: ['A/B test against manual baseline', 'Set confidence thresholds'], color: '#06b6d4' },
    { category: 'Vendor Lock-in', level: 'Low', score: 20, description: 'Reliance on specific AI vendors creates potential lock-in risks.', mitigations: ['Maintain provider-agnostic abstraction layer'], color: '#06b6d4' },
    { category: 'Change Management', level: 'Medium', score: 35, description: 'Team adoption requires clear workflow training.', mitigations: ['Phased rollout timeline', 'Internal champions'], color: '#f59e0b' },
  ],
  compliance_notes: [
    'Industry: FinTech / SaaS — Standard data protection rules apply.',
    'Recommended: Appoint AI Governance lead prior to Phase 2 rollout.',
  ],
};

const MOCK_PROCESSES = [
  {
    id: 'proc-1',
    name: 'Lead Qualification & CRM Updates',
    department: 'Sales',
    frequency: 'Daily',
    time_per_week_hours: 8,
    people_involved: 3,
    description: 'SDRs manually review inbound leads, score firmographics, and update Salesforce CRM records.',
    pain_points: ['Manual data entry', 'Inconsistent lead scoring', 'Slow response times'],
    tools_used: ['Salesforce', 'Gmail', 'LinkedIn', 'Excel'],
    automation_potential: 'high',
    complexity: 'low',
  },
  {
    id: 'proc-2',
    name: 'Weekly Performance Reporting',
    department: 'Operations',
    frequency: 'Weekly',
    time_per_week_hours: 6,
    people_involved: 2,
    description: 'Team manually compiles metrics from Mixpanel, Stripe, and Sheets into Google Slides presentations.',
    pain_points: ['Time-consuming assembly', 'Human calculation errors', 'Delayed executive decision making'],
    tools_used: ['Google Sheets', 'Google Slides', 'Mixpanel', 'Stripe'],
    automation_potential: 'high',
    complexity: 'medium',
  },
  {
    id: 'proc-3',
    name: 'Customer Support Ticket Routing',
    department: 'Support',
    frequency: 'Daily',
    time_per_week_hours: 7,
    people_involved: 4,
    description: 'Support agents manually triage incoming tickets, tag categories, and answer repetitive FAQs.',
    pain_points: ['High ticket volume', 'First response time latency', 'Agent burnout from repetitive queries'],
    tools_used: ['Zendesk', 'Slack', 'Email'],
    automation_potential: 'high',
    complexity: 'medium',
  },
];

// --- EXPORTED API OBJECTS ---
export const interviewAPI = {
  start: (data: any) =>
    fetchAPI<{ session_id: string; message: string; company_context: string }>('/interview/start', {
      method: 'POST',
      body: JSON.stringify(data),
    }, {
      session_id: 'session-demo',
      message: `Hello ${data.company_name || 'Founder'}! I'm your AI Automation Advisor. Let's analyze your business operations to identify high-ROI automation targets.`,
      company_context: `${data.company_name || 'Startup'} | ${data.industry || 'FinTech'}`,
    }),

  sendMessage: (data: any) =>
    fetchAPI<{ response: string; is_complete: boolean; turn_count: number }>('/interview/message', {
      method: 'POST',
      body: JSON.stringify(data),
    }, {
      response: "That's valuable context. Based on your process breakdown, we can automate 75%+ of this workflow.",
      is_complete: data.history.length >= 6,
      turn_count: Math.floor(data.history.length / 2) + 1,
    }),

  extract: (data: any) =>
    fetchAPI<any>('/interview/extract', { method: 'POST', body: JSON.stringify(data) }, { processes: MOCK_PROCESSES }),
};

export const processesAPI = {
  getMock: () => fetchAPI<{ processes: any[] }>('/processes/mock', undefined, { processes: MOCK_PROCESSES }),
  analyze: (data: any) => fetchAPI<{ processes: any[] }>('/processes/', { method: 'POST', body: JSON.stringify(data) }, { processes: MOCK_PROCESSES }),
};

export const workflowAPI = {
  getMock: () => fetchAPI<any>('/workflow/mock', undefined, { before: {}, after: {} }),
  generate: (data: any) => fetchAPI<any>('/workflow/generate', { method: 'POST', body: JSON.stringify(data) }, { nodes: [], edges: [] }),
};

export const opportunitiesAPI = {
  getMock: () => fetchAPI<{ opportunities: any[] }>('/opportunities/mock', undefined, { opportunities: MOCK_OPPORTUNITIES }),
  detect: (data: any) => fetchAPI<{ opportunities: any[] }>('/opportunities/', { method: 'POST', body: JSON.stringify(data) }, { opportunities: MOCK_OPPORTUNITIES }),
};

export const roiAPI = {
  getMock: () => fetchAPI<any>('/roi/mock', undefined, MOCK_ROI),
  calculate: (data: any) => fetchAPI<any>('/roi/calculate', { method: 'POST', body: JSON.stringify(data) }, calculateDynamicROI(data.hourly_rate, data.implementation_cost, data.opportunities || MOCK_OPPORTUNITIES)),
};

export const roadmapAPI = {
  getMock: () => fetchAPI<any>('/roadmap/mock', undefined, MOCK_ROADMAP),
  generate: (data: any) => fetchAPI<any>('/roadmap/generate', { method: 'POST', body: JSON.stringify(data) }, MOCK_ROADMAP),
};

export const marketplaceAPI = {
  getAll: (category?: string) => {
    const params = category ? `?category=${category}` : '';
    const filtered = category && category !== 'All' ? MOCK_TOOLS.filter((t) => t.category === category) : MOCK_TOOLS;
    return fetchAPI<{ tools: any[]; total: number }>(`/marketplace/${params}`, undefined, { tools: filtered, total: filtered.length });
  },
  recommend: (data: any) => fetchAPI<{ recommended: any[]; all: any[] }>('/marketplace/recommend', { method: 'POST', body: JSON.stringify(data) }, { recommended: MOCK_TOOLS.slice(0, 3), all: MOCK_TOOLS }),
};

export const riskAPI = {
  getMock: () => fetchAPI<any>('/risk/mock', undefined, MOCK_RISK),
  analyze: (data: any) => fetchAPI<any>('/risk/analyze', { method: 'POST', body: JSON.stringify(data) }, MOCK_RISK),
};

export const reportAPI = {
  generate: async (data: any): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/report/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FlowPilot_Executive_Report_${(data.company_name || 'Startup').toLowerCase().replace(/\s+/g, '_')}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }
    } catch (e) {
      // Fallback
    }

    // High quality HTML print trigger for PDF saving
    const company = data.company_name || 'FlowPilot Client';
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>FlowPilot_Executive_Report_${company}.pdf</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #070914; color: #f8fafc; padding: 40px; }
            .header { border-bottom: 2px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
            h1 { color: #38bdf8; font-size: 28px; margin: 0; }
            .meta { color: #94a3b8; font-size: 14px; margin-top: 5px; }
            .card { background: #0e1122; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
            .kpi { background: #13172e; padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
            .kpi-val { font-size: 22px; font-weight: bold; color: #22d3ee; }
            .kpi-lbl { font-size: 11px; text-transform: uppercase; color: #94a3b8; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; }
            th { color: #818cf8; text-transform: uppercase; font-size: 11px; }
          </style>
        </head>
        <body>
          <div className="header">
            <h1>FlowPilot AI — Executive Automation Advisory Report</h1>
            <div className="meta">Prepared for: <strong>${company}</strong> | Industry: ${data.industry || 'FinTech'} | Date: ${new Date().toLocaleDateString()}</div>
          </div>

          <div className="kpi-grid">
            <div className="kpi"><div className="kpi-lbl">Annual Cost Savings</div><div className="kpi-val">₹8,50,000</div></div>
            <div className="kpi"><div className="kpi-lbl">Hours Recovered</div><div className="kpi-val">21 hrs/wk</div></div>
            <div className="kpi"><div className="kpi-lbl">Expected ROI</div><div className="kpi-val">285%</div></div>
            <div className="kpi"><div className="kpi-lbl">Payback Period</div><div className="kpi-val">2.1 Months</div></div>
          </div>

          <div className="card">
            <h3 style="color: #38bdf8; margin-top: 0;">Top Identified Automation Vectors</h3>
            <table>
              <thead>
                <tr>
                  <th>Priority Vector</th>
                  <th>Department</th>
                  <th>Weekly Time Saved</th>
                  <th>Annual Value</th>
                  <th>Feasibility Score</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>AI Lead Qualification & CRM Sync</td><td>Sales</td><td>8 hrs/wk</td><td>₹3,20,000/yr</td><td>92/100</td></tr>
                <tr><td>Automated Performance Reporting</td><td>Operations</td><td>6 hrs/wk</td><td>₹2,40,000/yr</td><td>96/100</td></tr>
                <tr><td>AI Support Triage & Auto-Reply</td><td>Support</td><td>7 hrs/wk</td><td>₹2,90,000/yr</td><td>85/100</td></tr>
              </tbody>
            </table>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  },
};
