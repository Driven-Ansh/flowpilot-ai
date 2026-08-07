'use client';

/**
 * Business Processes Page (Nimblize Clean Aesthetic)
 * 
 * Catalog of mapped operational processes with automation potential scoring.
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

  useEffect(() => {
    if (!processes.length) {
      processesAPI.getMock()
        .then((d) => setProcesses(d.processes))
        .catch(console.error);
    }
  }, []);

  const totalHours = processes.reduce((s: number, p: any) => s + (p.time_per_week_hours || 0), 0);
  const highPotential = processes.filter((p: any) => p.automation_potential === 'high').length;

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
            Discovered Business Processes
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Operational mapping of departmental workflows, team allocation, and pain points.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
            <p className="text-xs text-white/40">Processes Mapped</p>
            <p className="text-xl font-black">{processes.length}</p>
          </div>
          <div className="px-5 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
            <p className="text-xs text-white/40">High Potential</p>
            <p className="text-xl font-black">{highPotential}</p>
          </div>
        </div>
      </motion.div>

      {/* Process Cards */}
      <div className="space-y-6">
        {processes.map((process: any, i: number) => {
          const potentialStyle = POTENTIAL_COLORS[process.automation_potential] || POTENTIAL_COLORS.medium;
          return (
            <motion.div
              key={process.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {process.name}
                    </h3>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{ background: potentialStyle.bg, border: `1px solid ${potentialStyle.border}`, color: potentialStyle.text }}
                    >
                      {process.automation_potential} potential
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    {process.department} Department · Frequency: {process.frequency}
                  </p>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed max-w-4xl">{process.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <p className="text-xs font-medium text-white/40 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" /> Weekly Time</p>
                  <p className="text-lg font-black text-white">{process.time_per_week_hours} hrs/week</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <p className="text-xs font-medium text-white/40 mb-1 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cyan-400" /> Team Allocated</p>
                  <p className="text-lg font-black text-white">{process.people_involved} members</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <p className="text-xs font-medium text-white/40 mb-1 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5 text-purple-400" /> Tool Count</p>
                  <p className="text-lg font-black text-white">{process.tools_used?.length || 0} software tools</p>
                </div>
              </div>

              {/* Pain Points & Tools */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Operational Pain Points</p>
                  <div className="flex flex-wrap gap-2">
                    {process.pain_points?.map((pp: string) => (
                      <span key={pp} className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300">
                        {pp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Current Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {process.tools_used?.map((tool: string) => (
                      <span key={tool} className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/70">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
