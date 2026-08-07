'use client';

/**
 * Executive Dashboard Page
 * 
 * The main dashboard shows a high-level overview of all
 * automation analysis results: KPI cards, ROI chart, 
 * top opportunities, and roadmap progress.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp, Clock, DollarSign, Zap, ArrowRight,
  ChevronRight, BarChart2, Users, Target, Map
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useAppStore } from '@/store/useAppStore';
import { opportunitiesAPI, roiAPI, roadmapAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

function KpiCard({
  icon: Icon, label, value, subtext, gradient, index
}: {
  icon: any; label: string; value: string; subtext: string; gradient: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative p-6 rounded-2xl border overflow-hidden group hover:border-white/20 transition-all"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2`} />
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</p>
      <p className="text-xs text-white/40">{subtext}</p>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { opportunities, roiData, company, processes, onboardingComplete } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [localOpps, setLocalOpps] = useState(opportunities);
  const [localRoi, setLocalRoi] = useState(roiData);
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (!localOpps.length) {
          const oppsData = await opportunitiesAPI.getMock();
          setLocalOpps(oppsData.opportunities);
        }
        if (!localRoi) {
          const roi = await roiAPI.getMock();
          setLocalRoi(roi);
        }
        const rm = await roadmapAPI.getMock();
        setRoadmap(rm);
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
      label: 'Annual Savings Identified',
      value: summary ? formatCurrency(summary.annual_cost_savings) : '$181K',
      subtext: 'Across all automation opportunities',
      gradient: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: Clock,
      label: 'Hours Saved / Week',
      value: summary ? `${summary.total_hours_saved_per_week}h` : '29h',
      subtext: 'Team hours freed from manual work',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      label: 'Expected ROI',
      value: summary ? `${summary.roi_percentage}%` : '726%',
      subtext: `${summary?.payback_months || 1.6} month payback period`,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Target,
      label: 'Opportunities Found',
      value: String(localOpps.length || 3),
      subtext: 'Ranked by impact and feasibility',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      {company && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-300 font-medium mb-0.5">Welcome back 👋</p>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {company.company_name} Automation Dashboard
              </h2>
              <p className="text-sm text-white/40 mt-0.5">{company.industry} · {company.stage} · {company.company_size} team</p>
            </div>
            <Link
              href="/dashboard/report"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-500/30 transition-all"
            >
              Export Report <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      {/* ROI Chart + Top Opportunities */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ROI Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-white">Cumulative ROI Projection</h3>
              <p className="text-xs text-white/40">12-month savings trajectory</p>
            </div>
            <Link href="/dashboard/roi" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Full Analysis <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: '#13131e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  formatter={(v: any) => [formatCurrency(v), 'Cumulative Savings']}
                />
                <Area type="monotone" dataKey="cumulative_savings" stroke="#6366f1" strokeWidth={2} fill="url(#roiGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-white/20 text-sm">
              Loading chart data...
            </div>
          )}
        </motion.div>

        {/* Top Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Top Opportunities</h3>
            <Link href="/dashboard/opportunities" className="text-xs text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {localOpps.slice(0, 3).map((opp: any, i: number) => (
              <div key={opp.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold flex-shrink-0">
                  #{i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/80 truncate">{opp.name}</p>
                  <p className="text-xs text-white/30">{opp.department} · ROI Score: {opp.roi_score}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Action Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { href: '/dashboard/interview', label: 'AI Interview', icon: '🎤', desc: 'Start discovery' },
          { href: '/dashboard/workflow', label: 'Workflow Graph', icon: '🔀', desc: 'View digital twin' },
          { href: '/dashboard/roadmap', label: 'Roadmap', icon: '🗺️', desc: 'See the plan' },
          { href: '/dashboard/marketplace', label: 'AI Tools', icon: '🤖', desc: 'Browse marketplace' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{item.label}</p>
            <p className="text-xs text-white/30">{item.desc}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
