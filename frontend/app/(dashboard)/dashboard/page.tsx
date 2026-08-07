'use client';

/**
 * Executive Dashboard Page
 * Exact match to reference screenshot design.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp, Clock, DollarSign, ArrowRight, Play,
  ChevronRight, Target, Sparkles, Zap, Shield, GitBranch,
  BarChart2, MessageSquare, Map, ShoppingBag, FileText,
  Users, CheckCircle2, Search, ArrowUpRight, Rocket, X
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useAppStore } from '@/store/useAppStore';
import { opportunitiesAPI, roiAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const { opportunities, roiData, setOpportunities, setRoiData } = useAppStore();
  const [localOpps, setLocalOpps] = useState(opportunities);
  const [localRoi, setLocalRoi] = useState(roiData);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeDemoSlide, setActiveDemoSlide] = useState(0);

  useEffect(() => {
    async function loadData() {
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
      }
    }
    loadData();
  }, []);

  const summary = localRoi?.summary;
  const chartData = localRoi?.monthly_projections?.slice(0, 12) || [];

  const kpis = [
    {
      icon: DollarSign,
      label: 'ANNUAL COST SAVINGS',
      value: summary ? formatCurrency(summary.annual_cost_savings) : '$294,060',
      subtext: 'Identified across top 3 automation vectors',
      color: 'bg-emerald-500',
      badge: '+94% efficiency',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Clock,
      label: 'WEEKLY HOURS SAVED',
      value: summary ? `${summary.total_hours_saved_per_week} hrs/wk` : '29 hrs/wk',
      subtext: 'Equivalent to 1.5 full-time hires',
      color: 'bg-indigo-500',
      badge: 'Immediate impact',
      badgeColor: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: TrendingUp,
      label: 'EXPECTED ROI',
      value: summary ? `${summary.roi_percentage}%` : '1076.2%',
      subtext: '1 month payback period',
      color: 'bg-amber-500',
      badge: 'High return',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Target,
      label: 'AUTOMATION OPPORTUNITIES',
      value: String(localOpps.length || 3),
      subtext: 'Feasibility & impact scored',
      color: 'bg-pink-500',
      badge: 'Ready to deploy',
      badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
    },
  ];

  const features = [
    {
      title: 'AI Founder Interview',
      desc: 'Understand your business with an intelligent conversation.',
      icon: MessageSquare,
      color: 'from-indigo-600 to-purple-600',
      href: '/dashboard/interview',
    },
    {
      title: 'Digital Twin Workflows',
      desc: 'Visualize your processes and simulate the future state.',
      icon: GitBranch,
      color: 'from-blue-600 to-cyan-500',
      href: '/dashboard/workflow',
    },
    {
      title: 'ROI Calculator',
      desc: 'Get precise projections before committing to any automation.',
      icon: BarChart2,
      color: 'from-emerald-600 to-teal-500',
      href: '/dashboard/roi',
    },
    {
      title: 'Implementation Roadmap',
      desc: 'Follow a step-by-step plan tailored to your team.',
      icon: Map,
      color: 'from-purple-600 to-pink-600',
      href: '/dashboard/roadmap',
    },
    {
      title: 'AI Marketplace',
      desc: 'Explore curated tools and agents for your use case.',
      icon: ShoppingBag,
      color: 'from-pink-600 to-rose-500',
      href: '/dashboard/marketplace',
    },
    {
      title: 'Executive PDF Report',
      desc: 'Export a complete report with insights, ROI and next steps.',
      icon: FileText,
      color: 'from-amber-600 to-orange-500',
      href: '/dashboard/report',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 md:p-10 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-purple-950/80 relative overflow-hidden shadow-2xl"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI AUTOMATION STRATEGY ACTIVE
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Welcome to <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">FlowPilot AI</span>
            </h1>

            <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
              Turn repetitive work into remarkable growth. Discover, analyze and automate your business processes with the power of AI.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard/interview"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                Continue Analysis <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" /> Watch Demo
              </button>
            </div>
          </div>

          {/* Right Hero Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl space-y-5 shadow-2xl">
              <div className="space-y-1">
                <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
                  "Automation is not about replacing people, but about freeing them to do what truly matters."
                </p>
                <p className="text-[11px] font-bold text-cyan-400 text-right">— FlowPilot AI</p>
              </div>

              {/* Floating Step Cards */}
              <div className="space-y-2.5 pt-2">
                {[
                  { step: '1', label: 'Analyze Your Business', icon: Search, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
                  { step: '2', label: 'Find Opportunities', icon: Target, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
                  { step: '3', label: 'Automate & Grow', icon: Rocket, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                ].map((s) => (
                  <div key={s.step} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${s.color} border flex items-center justify-center`}>
                        <s.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">{s.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-[#0e1122] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center text-white shadow-md`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">{kpi.label}</p>
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-1">{kpi.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Priority Vectors Row */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* ROI Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-[#0e1122] border border-white/10 space-y-6 shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                12-Month Cumulative ROI Forecast
              </h3>
              <p className="text-xs text-slate-400">Projected cost savings net of setup & licensing investment</p>
            </div>
            <Link href="/dashboard/roi" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Full Calculator <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full relative">
            {/* Total Savings Marker Pill */}
            <div className="absolute top-2 right-12 px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-right z-10">
              <p className="text-xs font-black text-cyan-300">$294K</p>
              <p className="text-[9px] text-slate-400 uppercase font-semibold">Total Savings</p>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashboardRoiGradExact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: '#0a0c1a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
                  formatter={(v: any) => [formatCurrency(v), 'Cumulative Savings']}
                />
                <Area type="monotone" dataKey="cumulative_savings" stroke="#3b82f6" strokeWidth={3} fill="url(#dashboardRoiGradExact)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Priority Vectors */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 p-6 md:p-8 rounded-2xl bg-[#0e1122] border border-white/10 space-y-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Top Priority Vectors
              </h3>
            </div>
            <Link href="/dashboard/opportunities" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
              View All ({localOpps.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {localOpps.slice(0, 3).map((opp: any, i: number) => (
              <div
                key={opp.id || i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-indigo-300">Priority #{i + 1}</p>
                    <h4 className="font-bold text-white text-xs truncate">{opp.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{opp.department} · Feasibility: {opp.feasibility_score}/100</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                  <span className="text-xs font-bold text-emerald-400">{formatCurrency(opp.estimated_annual_cost_savings)}/yr</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Core Features Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Core Features
              </h3>
            </div>
            <p className="text-xs text-slate-400">Everything you need to automate smarter, in one place.</p>
          </div>
          <Link href="/dashboard/opportunities" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
            Explore all features <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={feat.href}
                className="p-6 rounded-2xl bg-[#0e1122] border border-white/10 hover:border-white/20 transition-all block group space-y-4 h-full shadow-lg"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <feat.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-2 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Clean Footer Matching Reference Image */}
      <footer className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-300">FlowPilot AI</span> © 2025 | Smarter Workflows. Bigger Impact.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <span className="hover:text-slate-300 cursor-pointer">GitHub</span>
            <span className="hover:text-slate-300 cursor-pointer">LinkedIn</span>
            <span className="hover:text-slate-300 cursor-pointer">Twitter</span>
          </div>
        </div>
      </footer>

      {/* Demo Video Walkthrough Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-3xl bg-[#0e1122] border border-white/15 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      FlowPilot AI Interactive Platform Demo
                    </h3>
                    <p className="text-xs text-slate-400">Experience how AI identifies operational waste and calculates instant ROI</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Demo Slide Navigation Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { step: 'Step 1', title: '1. AI Founder Discovery', desc: 'Structured Bottleneck Audit' },
                  { step: 'Step 2', title: '2. Digital Twin Workflow', desc: '98% Execution Speedup' },
                  { step: 'Step 3', title: '3. ROI & Phased Rollout', desc: '$294,060/yr Value Output' },
                ].map((s, idx) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveDemoSlide(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      activeDemoSlide === idx
                        ? 'bg-indigo-600/20 border-cyan-400 text-white shadow-lg'
                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <p className="text-[10px] font-bold text-cyan-400 uppercase">{s.step}</p>
                    <p className="text-xs font-bold text-white truncate">{s.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{s.desc}</p>
                  </button>
                ))}
              </div>

              {/* Interactive Demo Simulation Screen */}
              <div className="aspect-video w-full rounded-2xl bg-[#060813] border border-indigo-500/20 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

                {/* Top Status Header */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE SIMULATION RUNNING
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    SLIDE 0{activeDemoSlide + 1} / 03 · 100% EXPLAINABLE AI
                  </span>
                </div>

                {/* Slide 0: Discovery Audit */}
                {activeDemoSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 z-10 my-auto py-2"
                  >
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-300">AI Advisor Query</span>
                        <span className="text-[10px] text-slate-400">FinTech Growth Audit</span>
                      </div>
                      <p className="text-xs text-white leading-relaxed">
                        "What repetitive manual tasks consume the majority of your team's weekly bandwidth?"
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400">Detected Process Bottleneck</span>
                        <span className="text-[10px] font-bold text-emerald-400">HIGH AUTOMATION POTENTIAL</span>
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Lead Qualification & CRM Data Sync: 12 hrs/wk manual entry across Salesforce & Gmail.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Slide 1: Digital Twin Graph */}
                {activeDemoSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 z-10 my-auto py-2"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                        <p className="text-[10px] font-bold text-rose-400 uppercase">Current Manual State</p>
                        <p className="text-xl font-bold text-white">2.5 Hours / Lead</p>
                        <p className="text-xs text-slate-400">Manual review, spreadsheet scoring & delayed SDR outreach</p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase font-mono">Future AI State</p>
                        <p className="text-xl font-bold text-cyan-300 font-mono">&lt; 45 Seconds</p>
                        <p className="text-xs text-slate-400">Instant ML scoring, Clearbit enrichment & auto CRM sync</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">Execution Velocity Multiplier</span>
                      <span className="text-xs font-bold text-cyan-400">+98% Efficiency Gain</span>
                    </div>
                  </motion.div>
                )}

                {/* Slide 2: ROI & Roadmap */}
                {activeDemoSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 z-10 my-auto py-2"
                  >
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Annual Savings</p>
                        <p className="text-lg font-black text-emerald-400">$294,060</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Hours Recovered</p>
                        <p className="text-lg font-black text-indigo-300">29 hrs/wk</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Payback Period</p>
                        <p className="text-lg font-black text-cyan-400">1.0 Month</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-200">Recommended Rollout Roadmap</span>
                      <span className="text-xs font-bold text-white">Phase 1: Quick Wins (2 Weeks)</span>
                    </div>
                  </motion.div>
                )}

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between z-10 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveDemoSlide((s) => (s > 0 ? s - 1 : 2))}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setActiveDemoSlide((s) => (s < 2 ? s + 1 : 0))}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10"
                    >
                      Next Step
                    </button>
                  </div>

                  <Link
                    href="/dashboard/interview"
                    onClick={() => setShowDemoModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
                  >
                    Start Your Personalized Analysis <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
