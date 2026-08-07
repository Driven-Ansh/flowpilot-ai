'use client';

/**
 * Automation Opportunities Page (Nimblize Clean Aesthetic)
 * 
 * Displays all detected automation opportunities ranked by ROI score.
 * Features score rings, financial impact cards, and recommended tool tags.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, DollarSign, TrendingUp, Zap, ChevronDown, ChevronUp, Filter, Loader2, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { opportunitiesAPI } from '@/lib/api';
import { formatCurrency, getScoreColor } from '@/lib/utils';
import type { AutomationOpportunity } from '@/types';

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <motion.circle
            cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-white">{score}</span>
        </div>
      </div>
      <p className="text-xs font-medium text-white/50">{label}</p>
    </div>
  );
}

function OpportunityCard({ opp, index }: { opp: AutomationOpportunity; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const effortColors: Record<string, string> = {
    Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    High: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.03] transition-all space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-3 py-1 rounded-full">
              Priority #{index + 1} Vector
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${effortColors[opp.implementation_effort] || effortColors.Medium}`}>
              {opp.implementation_effort} Implementation Effort
            </span>
          </div>
          <h3 className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {opp.name}
          </h3>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            {opp.process} · {opp.department} Department
          </p>
          <p className="text-sm text-white/60 leading-relaxed max-w-3xl">{opp.description}</p>
        </div>

        {/* Scores */}
        <div className="flex items-center gap-6 p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex-shrink-0">
          <ScoreRing score={opp.feasibility_score} label="Feasibility" color={getScoreColor(opp.feasibility_score)} />
          <ScoreRing score={opp.impact_score} label="Impact" color={getScoreColor(opp.impact_score)} />
          <ScoreRing score={opp.roi_score} label="ROI Score" color={getScoreColor(opp.roi_score)} />
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium mb-1">
            <Clock className="w-3.5 h-3.5" /> Weekly Hours Saved
          </div>
          <p className="text-lg font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{opp.estimated_hours_saved_per_week} hrs/wk</p>
        </div>
        <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium mb-1">
            <DollarSign className="w-3.5 h-3.5" /> Estimated Annual Savings
          </div>
          <p className="text-lg font-black text-emerald-400" style={{ fontFamily: 'Outfit, sans-serif' }}>{formatCurrency(opp.estimated_annual_cost_savings)}</p>
        </div>
        <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-white/40 text-xs font-medium mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Expected Time to Value
          </div>
          <p className="text-lg font-black text-cyan-300" style={{ fontFamily: 'Outfit, sans-serif' }}>{opp.time_to_value_weeks} weeks</p>
        </div>
      </div>

      {/* Recommended Tech Stack Toggle */}
      <div className="pt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Hide AI Tech Stack' : 'View Recommended AI Tech Stack'}
        </button>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pt-4 mt-3 border-t border-white/5 space-y-3"
          >
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Recommended Enterprise Tools</p>
            <div className="flex flex-wrap gap-2">
              {opp.recommended_tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 border border-cyan-500/20 bg-cyan-500/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function OpportunitiesPage() {
  const { opportunities, setOpportunities } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<'roi_score' | 'impact_score' | 'feasibility_score'>('roi_score');

  useEffect(() => {
    if (!opportunities.length) {
      setLoading(true);
      opportunitiesAPI.getMock()
        .then((d) => setOpportunities(d.opportunities))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  const sorted = [...opportunities].sort((a: any, b: any) => b[sort] - a[sort]);
  const totalSavings = opportunities.reduce((s: number, o: any) => s + o.estimated_annual_cost_savings, 0);
  const totalHours = opportunities.reduce((s: number, o: any) => s + o.estimated_hours_saved_per_week, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Automation Opportunities & Opportunity Scoring
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Algorithmic scoring combining Feasibility, Financial Impact, and Time-to-Value.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
            <p className="text-xs text-white/40">Total Savings Identified</p>
            <p className="text-xl font-black">{formatCurrency(totalSavings)}/yr</p>
          </div>
          <div className="px-5 py-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
            <p className="text-xs text-white/40">Weekly Hours Recovered</p>
            <p className="text-xl font-black">{totalHours} hrs/wk</p>
          </div>
        </div>
      </motion.div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Rank Vectors By:</span>
          {(['roi_score', 'impact_score', 'feasibility_score'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                sort === s
                  ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 shadow-sm'
                  : 'text-white/40 hover:text-white/70 border border-transparent'
              }`}
            >
              {s.replace('_', ' ').replace('_score', '').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-white/40">
          <Loader2 className="w-5 h-5 animate-spin mr-3 text-indigo-400" /> Scoring opportunities...
        </div>
      ) : (
        <div className="space-y-6">
          {sorted.map((opp: any, i: number) => (
            <OpportunityCard key={opp.id || i} opp={opp} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
