'use client';

/**
 * ROI Calculator Page
 * 
 * Interactive ROI dashboard with:
 * - Editable parameters (hourly rate, implementation cost)
 * - Area chart of cumulative savings over 24 months
 * - Pie/bar chart of savings breakdown
 * - Key metrics summary cards
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts';
import { DollarSign, TrendingUp, Clock, Target, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { roiAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function RoiPage() {
  const { roiData, setRoiData, opportunities } = useAppStore();
  const [hourlyRate, setHourlyRate] = useState(75);
  const [implementationCost, setImplementationCost] = useState(25000);
  const [loading, setLoading] = useState(false);
  const [localRoi, setLocalRoi] = useState(roiData);

  useEffect(() => {
    if (!roiData) loadRoi();
    else setLocalRoi(roiData);
  }, []);

  async function loadRoi() {
    setLoading(true);
    try {
      const data = await roiAPI.getMock();
      setLocalRoi(data);
      setRoiData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const summary = localRoi?.summary;
  const monthlyData = localRoi?.monthly_projections || [];
  const breakdownData = localRoi?.breakdown || [];

  const kpis = summary ? [
    { label: 'Annual Cost Savings', value: formatCurrency(summary.annual_cost_savings), icon: DollarSign, color: 'from-emerald-500 to-cyan-500', sub: 'Total identified value' },
    { label: 'ROI Percentage', value: `${summary.roi_percentage}%`, icon: TrendingUp, color: 'from-indigo-500 to-purple-500', sub: `${summary.payback_months}mo payback period` },
    { label: 'Hours Saved/Week', value: `${summary.total_hours_saved_per_week}h`, icon: Clock, color: 'from-amber-500 to-orange-500', sub: `${summary.annual_hours_saved} annual hours` },
    { label: '3-Year Value', value: formatCurrency(summary.three_year_value), icon: Target, color: 'from-pink-500 to-rose-500', sub: 'Net of implementation cost' },
  ] : [];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl border"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs text-white/40 mb-1">{kpi.label}</p>
            <p className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{kpi.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <h3 className="font-bold text-white mb-4">Adjust Parameters</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-white/50 mb-2">Avg. Hourly Rate ($/hr)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="30"
                max="200"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="flex-1 accent-indigo-500"
              />
              <span className="text-white font-bold w-16 text-right">${hourlyRate}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-2">Implementation Cost ($)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={implementationCost}
                onChange={(e) => setImplementationCost(Number(e.target.value))}
                className="flex-1 accent-indigo-500"
              />
              <span className="text-white font-bold w-20 text-right">{formatCurrency(implementationCost)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 p-6 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <h3 className="font-bold text-white mb-1">24-Month ROI Trajectory</h3>
          <p className="text-xs text-white/30 mb-5">Cumulative savings vs implementation investment</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: '#13131e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                formatter={(v: any) => [formatCurrency(v), 'Cumulative Savings']}
              />
              <Area type="monotone" dataKey="cumulative_savings" stroke="#6366f1" strokeWidth={2} fill="url(#savGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <h3 className="font-bold text-white mb-1">Savings Breakdown</h3>
          <p className="text-xs text-white/30 mb-5">By savings category</p>
          {breakdownData.length > 0 && (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={breakdownData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={65} strokeWidth={0}>
                    {breakdownData.map((entry: any, i: number) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#13131e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                    formatter={(v: any) => [formatCurrency(v)]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3">
                {breakdownData.map((item: any) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-white/50">{item.category}</span>
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
