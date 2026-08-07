/**
 * API client for FlowPilot AI backend.
 *
 * All API calls go through this module, which handles:
 * - Base URL configuration
 * - Error handling
 * - Request/response typing
 * - Mock mode fallback
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error ${response.status}: ${error}`);
  }

  return response.json() as T;
}

// --- Interview API ---
export const interviewAPI = {
  start: (data: { company_name: string; industry: string; company_size: string; stage: string }) =>
    fetchAPI<{ session_id: string; message: string; company_context: string }>('/interview/start', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  sendMessage: (data: { session_id: string; message: string; history: Array<{ role: string; content: string }>; company_context: string }) =>
    fetchAPI<{ response: string; is_complete: boolean; turn_count: number }>('/interview/message', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  extract: (data: { history: Array<{ role: string; content: string }>; company_context: string }) =>
    fetchAPI<any>('/interview/extract', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Processes API ---
export const processesAPI = {
  getMock: () => fetchAPI<{ processes: any[] }>('/processes/mock'),
  analyze: (data: any) =>
    fetchAPI<{ processes: any[] }>('/processes/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Workflow API ---
export const workflowAPI = {
  getMock: () => fetchAPI<{ before: any; after: any }>('/workflow/mock'),
  generate: (data: any) =>
    fetchAPI<{ nodes: any[]; edges: any[] }>('/workflow/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Opportunities API ---
export const opportunitiesAPI = {
  getMock: () => fetchAPI<{ opportunities: any[] }>('/opportunities/mock'),
  detect: (data: any) =>
    fetchAPI<{ opportunities: any[] }>('/opportunities/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- ROI API ---
export const roiAPI = {
  getMock: () => fetchAPI<any>('/roi/mock'),
  calculate: (data: any) =>
    fetchAPI<any>('/roi/calculate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Roadmap API ---
export const roadmapAPI = {
  getMock: () => fetchAPI<any>('/roadmap/mock'),
  generate: (data: any) =>
    fetchAPI<any>('/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Marketplace API ---
export const marketplaceAPI = {
  getAll: (category?: string) => {
    const params = category ? `?category=${category}` : '';
    return fetchAPI<{ tools: any[]; total: number }>(`/marketplace/${params}`);
  },
  recommend: (data: any) =>
    fetchAPI<{ recommended: any[]; all: any[] }>('/marketplace/recommend', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Risk API ---
export const riskAPI = {
  getMock: () => fetchAPI<any>('/risk/mock'),
  analyze: (data: any) =>
    fetchAPI<any>('/risk/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// --- Report API ---
export const reportAPI = {
  /**
   * Generates a PDF report and triggers a browser download.
   * Uses native fetch instead of fetchAPI because we need the raw blob.
   */
  generate: async (data: any): Promise<void> => {
    const response = await fetch(`${API_BASE}/report/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Report generation failed');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowpilot-report.pdf';
    a.click();
    URL.revokeObjectURL(url);
  },
};
