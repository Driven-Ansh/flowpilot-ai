'use client';

/**
 * Executive Dashboard Page (Nimblize Clean Spacious Aesthetic)
 * 
 * Features:
 * - Spacious card grid layout with 100% width responsiveness
 * - 24-month ROI trajectory chart with clean Recharts styling
 * - Opportunity leaderboard with feasibility & ROI indicators
 * - One-click access to Digital Twin Workflow and Implementation Roadmap
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp, Clock, DollarSign, ArrowRight,
  ChevronRight, Target, Sparkles, Zap, Shield, GitBranch
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useAppStore } from '@/store/useAppStore';
import { opportunitiesAPI, roiAPI, roadmapAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const { opportunities, roiData, company, setOpportunities, setRoiData } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [localOpps, setLocalOpps] = useState(opportunities);
  const [localRoi, setLocalRoi] = useState(roiData);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (!opportunities.length) {
          const oppsData = await opportunitiesAPI.getMock();
          setLocalOpps(oppsData.opportunities);
          setOpportunities(oppsData.opportunities);
        } else {
          setLocalOpps(opportunities);
        }
        if (!roiData) {
          const roi = await roiAPI.getMock();
          setLocalRoi(roi);
          setRoiData(roi);
        } else {
          setLocalRoi(roiData);
        }
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const summary = localRoi?.summary;
  const chartData = localRoi?.monthly_projections?.slice(0, 12) || [];

  const kpis = [
    {
      icon: DollarSign,
      label: 'Annual Cost Savings',
      value: summary ? formatCurrency(summary.annual_cost_savings) : '$181,200',
      subtext: 'Identified across top 3 automation vectors',
      gradient: 'from-emerald-500 to-cyan-500',
      badge: '+94% efficiency',
    },
    {
      icon: Clock,
      label: 'Weekly Team Hours Saved',
      value: summary ? `${summary.total_hours_saved_per_week} hrs/wk` : '29.0 hrs/wk',
      subtext: 'Equivalent to 1.5 full-time hires',
      gradient: 'from-indigo-500 to-purple-500',
      badge: 'Immediate impact',
    },
    {
      icon: TrendingUp,
      label: 'Expected ROI',
      value: summary ? `${summary.roi_percentage}%` : '726%',
      subtext: `${summary?.payback_months || 1.6} month payback period`,
      gradient: 'from-amber-500 to-orange-500',
      badge: 'High return',
    },
    {
      icon: Target,
      label: 'Automation Opportunities',
      value: String(localOpps.length || 3),
      subtext: 'Feasibility & impact scored',
      gradient: 'from-pink-500 to-rose-500',
      badge: 'Ready to deploy',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-cyan-950/30 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> AI Automation Strategy Active
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {company?.company_name ? `${company.company_name} AI Advisor Overview` : 'Executive Automation Strategy'}
            </h1>
            <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
              {company?.industry || 'Technology'} · Stage: {company?.stage || 'Growth'} · {company?.company_size || '10-50 team members'}. 
              All processes analyzed and mapped to optimal AI automation agents.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/workflow"
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" /> Digital Twin Graph
            </Link>
            <Link
              href="/dashboard/report"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              Export PDF Report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                {kpi.badge}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{kpi.value}</p>
              <p className="text-xs text-white/40 mt-1">{kpi.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ROI Trajectory & Top Opportunities Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* ROI Chart Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                12-Month Cumulative ROI Forecast
              </h3>
              <p className="text-xs text-white/40">Projected cost savings net of setup & licensing investment</p>
            </div>
            <Link href="/dashboard/roi" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold">
              Full Calculator <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dashboardRoiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ background: '#0e0e17', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
                    formatter={(v: any) => [formatCurrency(v), 'Cumulative Savings']}
                  />
                  <Area type="monotone" dataKey="cumulative_savings" stroke="#6366f1" strokeWidth={3} fill="url(#dashboardRoiGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-white/30 text-sm">
                Generating financial projections...
              </div>
            )}
          </div>
        </motion.div>

        {/* Opportunity Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Top Priority Vectors
            </h3>
            <Link href="/dashboard/opportunities" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
              View All ({localOpps.length})
            </Link>
          </div>

          <div className="space-y-4">
            {localOpps.slice(0, 3).map((opp: any, i: number) => (
              <div
                key={opp.id || i}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.03] hover:border-white/15 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25">
                    Priority #{i + 1}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    {formatCurrency(opp.estimated_annual_cost_savings)}/yr
                  </span>
                </div>
                <h4 className="font-semibold text-white text-sm truncate">{opp.name}</h4>
                <p className="text-xs text-white/40">{opp.department} · Feasibility: {opp.feasibility_score}/100</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
        {[
          { href: '/dashboard/interview', label: 'AI Founder Interview', icon: '🎤', desc: 'Interactive discovery advisor' },
          { href: '/dashboard/workflow', label: 'Digital Twin Workflow', icon: '🔀', desc: 'Simulate before & after states' },
          { href: '/dashboard/roadmap', label: 'Implementation Roadmap', icon: '🗺️', desc: '24-week rollout timeline' },
          { href: '/dashboard/marketplace', label: 'AI Tool Marketplace', icon: '🤖', desc: 'Curated vendor tech stack' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group space-y-3"
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <p className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">{item.label}</p>
              <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
