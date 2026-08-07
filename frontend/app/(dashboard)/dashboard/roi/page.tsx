'use client';

/**
 * ROI Calculator Page (Nimblize Clean Aesthetic)
 * 
 * Interactive financial modeling page with adjustable hourly rate and budget sliders.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, TrendingUp, Clock, Target } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { roiAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function RoiPage() {
  const { roiData, setRoiData } = useAppStore();
  const [hourlyRate, setHourlyRate] = useState(75);
  const [implementationCost, setImplementationCost] = useState(25000);
  const [localRoi, setLocalRoi] = useState(roiData);

  useEffect(() => {
    if (!roiData) {
      roiAPI.getMock()
        .then((d) => { setLocalRoi(d); setRoiData(d); })
        .catch(console.error);
    } else {
      setLocalRoi(roiData);
    }
  }, []);

  const summary = localRoi?.summary;
  const monthlyData = localRoi?.monthly_projections || [];
  const breakdownData = localRoi?.breakdown || [];

  const kpis = summary ? [
    { label: 'Annual Cost Savings', value: formatCurrency(summary.annual_cost_savings), icon: DollarSign, color: 'from-emerald-500 to-cyan-500', sub: 'Total direct & indirect benefit' },
    { label: 'Expected ROI', value: `${summary.roi_percentage}%`, icon: TrendingUp, color: 'from-indigo-500 to-purple-500', sub: `${summary.payback_months} mo payback period` },
    { label: 'Weekly Hours Recovered', value: `${summary.total_hours_saved_per_week} hrs/wk`, icon: Clock, color: 'from-amber-500 to-orange-500', sub: `${summary.annual_hours_saved} annual hours` },
    { label: '3-Year Net Value', value: formatCurrency(summary.three_year_value), icon: Target, color: 'from-pink-500 to-rose-500', sub: 'Net of setup & license costs' },
  ] : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Interactive ROI Calculator & Financial Modeling
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Simulate financial return, payback thresholds, and 24-month cumulative net savings.
          </p>
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
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
              <kpi.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{kpi.value}</p>
            <p className="text-xs text-white/40">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Parameter Sliders */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6"
      >
        <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Financial Parameters & Assumptions
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60 font-medium">Average Team Hourly Rate</span>
              <span className="text-white font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/10">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60 font-medium">Estimated Setup & Integration Budget</span>
              <span className="text-white font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/10">{formatCurrency(implementationCost)}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={implementationCost}
              onChange={(e) => setImplementationCost(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 24-Month Trajectory Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6"
        >
          <div>
            <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              24-Month Cumulative Savings Trajectory
            </h3>
            <p className="text-xs text-white/40">Net financial benefit over time following initial implementation payback</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="roiFullGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: '#0e0e17', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
                  formatter={(v: any) => [formatCurrency(v), 'Cumulative Net Benefit']}
                />
                <Area type="monotone" dataKey="cumulative_savings" stroke="#6366f1" strokeWidth={3} fill="url(#roiFullGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Breakdown Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6"
        >
          <div>
            <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Value Source Breakdown
            </h3>
            <p className="text-xs text-white/40">Labor hours vs direct software savings</p>
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
                      contentStyle={{ background: '#0e0e17', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
                      formatter={(v: any) => [formatCurrency(v)]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 pt-2">
                {breakdownData.map((item: any) => (
                  <div key={item.category} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-white/70 font-medium">{item.category}</span>
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
