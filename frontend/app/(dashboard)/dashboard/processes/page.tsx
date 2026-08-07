'use client';

/**
 * Business Processes Page
 * 
 * Shows all discovered business processes with automation potential scores.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Clock, Users, Wrench, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { processesAPI } from '@/lib/api';

const POTENTIAL_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  high: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', text: '#6ee7b7' },
  medium: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#fcd34d' },
  low: { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)', text: '#94a3b8' },
};

export default function ProcessesPage() {
  const { processes, setProcesses } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!processes.length) {
      setLoading(true);
      processesAPI.getMock()
        .then((d) => setProcesses(d.processes))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  const totalHours = processes.reduce((s: number, p: any) => s + (p.time_per_week_hours || 0), 0);
  const highPotential = processes.filter((p: any) => p.automation_potential === 'high').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Processes Mapped', value: String(processes.length), icon: GitBranch, color: 'from-indigo-500 to-purple-500' },
          { label: 'Weekly Hours Consumed', value: `${totalHours}h`, icon: Clock, color: 'from-amber-500 to-orange-500' },
          { label: 'High Automation Potential', value: String(highPotential), icon: AlertCircle, color: 'from-emerald-500 to-cyan-500' },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl border flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/40">{item.label}</p>
              <p className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Process Cards */}
      <div className="space-y-4">
        {processes.map((process: any, i: number) => {
          const potentialStyle = POTENTIAL_COLORS[process.automation_potential] || POTENTIAL_COLORS.medium;
          return (
            <motion.div
              key={process.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{process.name}</h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: potentialStyle.bg, border: `1px solid ${potentialStyle.border}`, color: potentialStyle.text }}
                    >
                      {process.automation_potential} potential
                    </span>
                  </div>
                  <p className="text-sm text-white/40">{process.department} · {process.frequency}</p>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-4">{process.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs text-white/30 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time/Week</p>
                  <p className="font-bold text-white">{process.time_per_week_hours}h</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs text-white/30 mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> People</p>
                  <p className="font-bold text-white">{process.people_involved}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs text-white/30 mb-1 flex items-center gap-1"><Wrench className="w-3 h-3" /> Tools</p>
                  <p className="font-bold text-white">{process.tools_used?.length || 0}</p>
                </div>
              </div>

              {/* Pain Points */}
              <div className="mb-3">
                <p className="text-xs text-white/30 mb-2">Pain Points</p>
                <div className="flex flex-wrap gap-1.5">
                  {process.pain_points?.map((pp: string) => (
                    <span key={pp} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)', color: '#fda4af' }}>
                      {pp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <p className="text-xs text-white/30 mb-2">Current Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {process.tools_used?.map((tool: string) => (
                    <span key={tool} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
