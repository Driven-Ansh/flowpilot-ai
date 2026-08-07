'use client';

/**
 * Automation Opportunities Page
 * 
 * Displays all detected automation opportunities ranked by ROI score.
 * Each opportunity shows feasibility, impact, ROI scores with visual rings.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, DollarSign, TrendingUp, Zap, ChevronDown, ChevronUp, Filter, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { opportunitiesAPI } from '@/lib/api';
import { formatCurrency, getScoreColor } from '@/lib/utils';
import type { AutomationOpportunity } from '@/types';

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
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
          <span className="text-sm font-bold text-white">{score}</span>
        </div>
      </div>
      <p className="text-xs text-white/40">{label}</p>
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
      className="rounded-2xl border overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                #{index + 1} Priority
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${effortColors[opp.implementation_effort] || effortColors.Medium}`}>
                {opp.implementation_effort} effort
              </span>
            </div>
            <h3 className="font-bold text-lg text-white mb-1">{opp.name}</h3>
            <p className="text-sm text-white/40 mb-3">{opp.process} · {opp.department}</p>
            <p className="text-sm text-white/60 leading-relaxed">{opp.description}</p>
          </div>

          {/* Scores */}
          <div className="flex gap-4 flex-shrink-0">
            <ScoreRing score={opp.feasibility_score} label="Feasibility" color={getScoreColor(opp.feasibility_score)} />
            <ScoreRing score={opp.impact_score} label="Impact" color={getScoreColor(opp.impact_score)} />
            <ScoreRing score={opp.roi_score} label="ROI Score" color={getScoreColor(opp.roi_score)} />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
              <Clock className="w-3 h-3" /> Hours Saved/Week
            </div>
            <p className="text-base font-bold text-white">{opp.estimated_hours_saved_per_week}h</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
              <DollarSign className="w-3 h-3" /> Annual Savings
            </div>
            <p className="text-base font-bold text-emerald-400">{formatCurrency(opp.estimated_annual_cost_savings)}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
              <TrendingUp className="w-3 h-3" /> Time to Value
            </div>
            <p className="text-base font-bold text-white">{opp.time_to_value_weeks}w</p>
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'Show less' : 'Show recommended tools'}
        </button>
      </div>

      {/* Expanded: Recommended Tools */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-6 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-white/40 font-medium uppercase tracking-wider mt-4 mb-3">Recommended Tools</p>
          <div className="flex flex-wrap gap-2">
            {opp.recommended_tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 border"
                style={{ background: 'rgba(34,211,238,0.05)', borderColor: 'rgba(34,211,238,0.15)' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      )}
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
    <div className="space-y-6">
      {/* Summary Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: 'Opportunities Found', value: String(opportunities.length), icon: Lightbulb, color: 'from-indigo-500 to-purple-500' },
          { label: 'Total Annual Savings', value: formatCurrency(totalSavings), icon: DollarSign, color: 'from-emerald-500 to-cyan-500' },
          { label: 'Hours Saved / Week', value: `${totalHours}h`, icon: Clock, color: 'from-amber-500 to-orange-500' },
        ].map((item, i) => (
          <div key={item.label} className="p-4 rounded-xl border flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
              <p className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-white/30" />
        <span className="text-xs text-white/30">Sort by:</span>
        {(['roi_score', 'impact_score', 'feasibility_score'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sort === s ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300' : 'text-white/40 hover:text-white/60 border border-transparent'
            }`}
          >
            {s.replace('_', ' ').replace('_score', '').replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Opportunity Cards */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-white/30">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />Loading opportunities...
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((opp: any, i: number) => (
            <OpportunityCard key={opp.id} opp={opp} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
