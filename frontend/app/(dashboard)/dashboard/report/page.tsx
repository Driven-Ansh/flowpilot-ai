'use client';

/**
 * Export Report Page
 * Downloadable vector PDF advisory report preview and generator.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, CheckCircle2, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { reportAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { FeatureInfoTooltip } from '@/components/ui/FeatureInfoTooltip';

const REPORT_TOOLTIP = {
  title: 'Executive Advisory PDF Generator',
  techStack: ['ReportLab Python', 'HTML5 Canvas API', 'Blob Stream', 'TypeScript'],
  implementation: 'Assembles discovered process schemas, ROI financial modeling charts, and 24-week rollout schedules into a clean PDF document.',
  howItWorks: 'Clicking Export Report compiles your personalized interview audit data and ROI metrics into a print-ready executive advisory report.',
};

export default function ReportPage() {
  const { company, opportunities, roiData } = useAppStore();
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    setSuccess(false);
    try {
      await reportAPI.generate({
        company_name: company?.company_name || 'Your Company',
        industry: company?.industry || 'FinTech',
        opportunities: opportunities,
        roi_summary: roiData?.summary,
      });
      setSuccess(true);
    } catch (e) {
      console.error(e);
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-[#0e1122] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Board-Ready Executive PDF Advisory Report
            </h1>
            <FeatureInfoTooltip info={REPORT_TOOLTIP} />
          </div>
          <p className="text-sm text-slate-400">
            Export a complete executive advisory report with your personalized findings, ROI forecasts, and roadmap.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-60 flex-shrink-0 cursor-pointer"
        >
          {generating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Compiling Executive Report...</>
          ) : (
            <><Download className="w-4 h-4" /> Export Report</>
          )}
        </button>
      </motion.div>

      {/* Report Document Preview Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 rounded-3xl border border-white/10 bg-[#0e1122] relative overflow-hidden space-y-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        
        {/* Document Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h2 className="font-black text-2xl text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                FlowPilot AI
              </h2>
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">AI Automation Strategy Report</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Verified Analysis
            </span>
          </div>
        </div>

        {/* Company Target */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prepared Exclusively For</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {company?.company_name || 'Your Startup Inc.'}
          </p>
          <p className="text-xs text-slate-400">{company?.industry || 'FinTech'} · Stage: {company?.stage || 'Growth'}</p>
        </div>

        {/* Key Metrics Grid */}
        {roiData?.summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center">
              <p className="text-xs text-slate-400 mb-1">Identified Annual Savings</p>
              <p className="text-xl font-black text-emerald-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(roiData.summary.annual_cost_savings)}
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-center">
              <p className="text-xs text-slate-400 mb-1">Target ROI Percentage</p>
              <p className="text-xl font-black text-indigo-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {roiData.summary.roi_percentage}%
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-center">
              <p className="text-xs text-slate-400 mb-1">Investment Payback Period</p>
              <p className="text-xl font-black text-cyan-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {roiData.summary.payback_months} Months
              </p>
            </div>
          </div>
        )}

        {/* Included Report Sections List */}
        <div className="space-y-4 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Included Advisory Chapters</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <div key={section.title} className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-start gap-3.5">
                <span className="text-2xl flex-shrink-0">{section.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{section.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{section.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Notification */}
      {success && (
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Executive Advisory Report generated & printable PDF ready.
        </div>
      )}
    </div>
  );
}
