'use client';

/**
 * Export Report Page
 * 
 * Allows users to preview and download their PDF executive report.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, CheckCircle2, Zap } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { reportAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function ReportPage() {
  const { company, opportunities, roiData } = useAppStore();
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setGenerating(true);
    setError('');
    setSuccess(false);
    try {
      await reportAPI.generate({
        company_name: company?.company_name || 'Your Company',
        opportunities: opportunities,
        roi_summary: roiData?.summary,
      });
      setSuccess(true);
    } catch (e) {
      setError('PDF generation requires the backend server. Make sure it is running at localhost:8000.');
    } finally {
      setGenerating(false);
    }
  }

  const sections = [
    { icon: '🏞️', title: 'Executive Summary', desc: 'High-level overview of automation opportunity and expected ROI' },
    { icon: '📊', title: 'ROI Projections', desc: 'Detailed 24-month financial model with payback period analysis' },
    { icon: '💡', title: 'Top Opportunities', desc: `${opportunities.length || 3} automation opportunities with scoring and tool recommendations` },
    { icon: '🗺️', title: 'Implementation Roadmap', desc: 'Phase-by-phase action plan with timelines and ownership' },
    { icon: '🛡️', title: 'Risk & Compliance', desc: 'Risk assessment and mitigation strategies' },
    { icon: '🤖', title: 'AI Tool Recommendations', desc: 'Curated vendor list with pricing and integration guidance' },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />
        
        {/* Report Header Preview */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-black text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>FlowPilot AI</p>
            <p className="text-sm text-white/40">AI Automation Advisory Report</p>
          </div>
        </div>

        <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-sm text-white/40 mb-1">Prepared for</p>
          <p className="text-xl font-bold text-white">{company?.company_name || 'Your Company'}</p>
          <p className="text-sm text-white/40">{company?.industry} · {company?.stage}</p>
        </div>

        {/* Summary Stats */}
        {roiData?.summary && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Annual Savings', value: formatCurrency(roiData.summary.annual_cost_savings) },
              { label: 'ROI', value: `${roiData.summary.roi_percentage}%` },
              { label: 'Payback', value: `${roiData.summary.payback_months}mo` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <p className="text-lg font-black text-indigo-300" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Report Sections */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-white/30 uppercase tracking-wider">Report Sections</p>
          {sections.map((section) => (
            <div key={section.title} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-xl">{section.icon}</span>
              <div>
                <p className="text-sm font-medium text-white/80">{section.title}</p>
                <p className="text-xs text-white/30">{section.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {error && (
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-sm mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4" /> Report downloaded successfully!
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-base transition-all disabled:opacity-60 hover:opacity-90 text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
        >
          {generating ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...</>
          ) : (
            <><Download className="w-5 h-5" /> Download PDF Report</>
          )}
        </button>
        <p className="text-xs text-center text-white/20 mt-3">Requires backend running at localhost:8000</p>
      </motion.div>
    </div>
  );
}
