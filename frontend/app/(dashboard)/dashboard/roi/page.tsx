'use client';

/**
 * ROI Calculator Page (Feasible INR Standards & Real-time Dynamic Recalculation)
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { IndianRupee, TrendingUp, Clock, Target, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { roiAPI, calculateDynamicROI } from '@/lib/api';
import { formatCurrency, formatCompactINR } from '@/lib/utils';
import { FeatureInfoTooltip } from '@/components/ui/FeatureInfoTooltip';

const ROI_TOOLTIP = {
  title: 'Financial ROI Modeling Engine',
  techStack: ['Next.js 16', 'Recharts SVG', 'Zustand Dynamic Store', 'TypeScript 5'],
  implementation: 'Calculates dynamic cash flow projections via labor rate recovery (Hours/wk * 52 * Rate/hr) + direct operational cost reductions net of capex setup budget.',
  howItWorks: 'Adjusting hourly rate or setup budget sliders instantly triggers state recalculations, re-rendering 24-month cumulative area graphs and value breakdown pie charts in real time.',
};

export default function RoiPage() {
  const { roiData, setRoiData, opportunities } = useAppStore();
  const [hourlyRate, setHourlyRate] = useState(650); // ₹650/hr default
  const [implementationCost, setImplementationCost] = useState(150000); // ₹1,50,000 default
  const [localRoi, setLocalRoi] = useState<any>(null);

  // Recalculate ROI dynamically on slider or opportunity changes
  useEffect(() => {
    const updatedRoi = calculateDynamicROI(hourlyRate, implementationCost, opportunities);
    setLocalRoi(updatedRoi);
    setRoiData(updatedRoi);
  }, [hourlyRate, implementationCost, opportunities]);

  const summary = localRoi?.summary;
  const monthlyData = localRoi?.monthly_projections || [];
  const breakdownData = localRoi?.breakdown || [];

  const kpis = summary ? [
    { label: 'Annual Cost Savings', value: formatCurrency(summary.annual_cost_savings), icon: IndianRupee, color: 'from-emerald-500 to-cyan-500', sub: 'Total direct & labor benefit' },
    { label: 'Expected ROI', value: `${summary.roi_percentage}%`, icon: TrendingUp, color: 'from-indigo-500 to-purple-500', sub: `${summary.payback_months} mo payback period` },
    { label: 'Weekly Hours Recovered', value: `${summary.total_hours_saved_per_week} hrs/wk`, icon: Clock, color: 'from-amber-500 to-orange-500', sub: `${summary.annual_hours_saved} annual hours` },
    { label: '3-Year Net Value', value: formatCurrency(summary.three_year_value), icon: Target, color: 'from-pink-500 to-rose-500', sub: 'Net of setup & license costs' },
  ] : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6 relative"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Interactive ROI Calculator & Financial Modeling
            </h1>
            <FeatureInfoTooltip info={ROI_TOOLTIP} />
          </div>
          <p className="text-sm text-slate-400">
            Real-time financial modeling scaled for Indian startups (INR - ₹).
          </p>
        </div>

        <button
          onClick={() => { setHourlyRate(650); setImplementationCost(150000); }}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
        </button>
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl border border-white/10 bg-[#0e1122] space-y-3 shadow-lg"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shadow-md`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{kpi.value}</p>
            <p className="text-xs text-slate-400">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Parameter Sliders */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-8 rounded-3xl border border-white/10 bg-[#0e1122] space-y-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Financial Parameters & Assumptions
          </h3>
          <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Real-time Recalculation Active
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hourly Rate Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">Average Team Hourly Rate (INR)</span>
              <span className="text-cyan-300 font-bold bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                ₹{hourlyRate}/hr
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="2500"
              step="50"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹300/hr (Junior)</span>
              <span>₹1,200/hr (Senior)</span>
              <span>₹2,500/hr (Exec)</span>
            </div>
          </div>

          {/* Setup Budget Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">Estimated Setup & Integration Budget (INR)</span>
              <span className="text-indigo-300 font-bold bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                {formatCurrency(implementationCost)}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="25000"
              value={implementationCost}
              onChange={(e) => setImplementationCost(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹50K (Basic)</span>
              <span>₹5 Lakhs (Medium)</span>
              <span>₹20 Lakhs (Enterprise)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 24-Month Trajectory Dual Area & Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-8 rounded-3xl border border-white/10 bg-[#0e1122] space-y-6 shadow-lg relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                24-Month Cumulative Financial Trajectory (INR)
              </h3>
              <p className="text-xs text-slate-400">Non-linear compounding returns contrasting capex payback vs recurring yield velocity</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Cumulative Net Benefit
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Monthly Yield Velocity
              </span>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 15, right: 15, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="roiFullGradINR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.45} />
                    <stop offset="60%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} interval={1} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCompactINR(v)} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const isProfit = data.cumulative_savings >= 0;
                      return (
                        <div className="p-4 rounded-2xl bg-[#0a0c1a] border border-cyan-500/30 shadow-2xl space-y-2 text-xs backdrop-blur-xl">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 gap-4">
                            <span className="font-bold text-white font-mono">{data.month} Trajectory</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${isProfit ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                              {isProfit ? '✨ Net Profit Zone' : '⏳ Payback Phase'}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-slate-400">
                              Cumulative Net: <span className="font-extrabold text-cyan-300 ml-1">{formatCurrency(data.cumulative_savings)}</span>
                            </p>
                            <p className="text-slate-400">
                              Monthly Yield Velocity: <span className="font-extrabold text-indigo-300 ml-1">{formatCurrency(data.monthly_savings)}/mo</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="cumulative_savings" stroke="#06b6d4" strokeWidth={3.5} fill="url(#roiFullGradINR)" activeDot={{ r: 7, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="monthly_savings" stroke="#818cf8" strokeWidth={2} strokeDasharray="4 4" fill="url(#velocityGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Breakdown Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl border border-white/10 bg-[#0e1122] space-y-6 shadow-lg"
        >
          <div>
            <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Value Source Breakdown
            </h3>
            <p className="text-xs text-slate-400">Labor hours recovered vs operational efficiency</p>
          </div>

          {breakdownData.length > 0 && (
            <>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={breakdownData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={70} strokeWidth={0}>
                      {breakdownData.map((entry: any, i: number) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#0a0c1a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
                      formatter={(v: any) => [formatCurrency(v)]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 pt-2">
                {breakdownData.map((item: any) => (
                  <div key={item.category} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-slate-300 font-medium">{item.category}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
