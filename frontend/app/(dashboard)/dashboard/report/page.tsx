'use client';

/**
 * Export Report Page (Nimblize Clean Aesthetic)
 * 
 * Downloadable vector PDF advisory report preview and generator.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, CheckCircle2, Zap, Sparkles, ShieldCheck } from 'lucide-react';
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
      setError('PDF generation requires the backend API server. Ensure python run.py is running on localhost:8000.');
    } finally {
      setGenerating(false);
    }
  }

  const sections = [
    { icon: '🏞️', title: 'Executive Summary', desc: 'High-level advisory findings, strategic automation scope & key ROI metrics' },
    { icon: '📊', title: '24-Month ROI Projections', desc: 'Financial trajectory, payback period breakdown & net savings model' },
    { icon: '💡', title: 'Automation Opportunities', desc: `${opportunities.length || 3} scored vectors with feasibility & impact rankings` },
    { icon: '🗺️', title: 'Implementation Roadmap', desc: 'Phase-by-phase 24-week execution timeline with tool requirements' },
    { icon: '🛡️', title: 'Risk & Governance Assessment', desc: 'Data privacy, model accuracy & change management controls' },
    { icon: '🤖', title: 'Enterprise AI Tech Stack', desc: 'Vetted vendor list with pricing models & integration complexity' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Board-Ready Executive PDF Advisory Report
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Programmatically rendered vector PDF summarizing your AI automation strategy.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-60 flex-shrink-0"
        >
          {generating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Rendering PDF Document...</>
          ) : (
            <><Download className="w-4 h-4" /> Download Vector PDF Report</>
          )}
        </button>
      </motion.div>

      {/* Report Document Preview Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 rounded-3xl border border-white/10 bg-white/[0.02] relative overflow-hidden space-y-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
        
        {/* Document Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-black text-2xl text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                FlowPilot AI
              </h2>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">AI Automation Strategy Report</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Verified Analysis
            </span>
          </div>
        </div>

        {/* Company Target */}
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Prepared Exclusively For</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {company?.company_name || 'Your Startup Inc.'}
          </p>
          <p className="text-xs text-white/50">{company?.industry || 'Technology SaaS'} · Stage: {company?.stage || 'Growth'}</p>
        </div>

        {/* Key Metrics Grid */}
        {roiData?.summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center">
              <p className="text-xs text-white/40 mb-1">Identified Annual Savings</p>
              <p className="text-xl font-black text-emerald-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(roiData.summary.annual_cost_savings)}
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-center">
              <p className="text-xs text-white/40 mb-1">Target ROI Percentage</p>
              <p className="text-xl font-black text-indigo-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {roiData.summary.roi_percentage}%
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-center">
              <p className="text-xs text-white/40 mb-1">Investment Payback Period</p>
              <p className="text-xl font-black text-cyan-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {roiData.summary.payback_months} Months
              </p>
            </div>
          </div>
        )}

        {/* Included Report Sections List */}
        <div className="space-y-4 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Included Advisory Chapters</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <div key={section.title} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-3.5">
                <span className="text-2xl flex-shrink-0">{section.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{section.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed mt-0.5">{section.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Notification */}
      {error && (
        <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-xs text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Vector PDF Advisory Report generated & saved to your downloads.
        </div>
      )}
    </div>
  );
}
