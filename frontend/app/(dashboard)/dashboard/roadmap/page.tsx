'use client';

/**
 * Implementation Roadmap Page (Nimblize Clean Aesthetic)
 * 
 * Phased 24-week rollout schedule across Quick Wins, Core Automation, and Advanced AI.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, Users, Zap, CheckCircle, Circle, DollarSign, Calendar, Layers } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { roadmapAPI } from '@/lib/api';
import type { RoadmapPhase, RoadmapItem } from '@/types';

function RoadmapItemCard({ item, phaseColor }: { item: RoadmapItem; phaseColor: string }) {
  const effortColors: Record<string, string> = {
    Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    High: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Circle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: phaseColor }} />
            <h4 className="font-bold text-white text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {item.title}
            </h4>
          </div>
          <p className="text-xs text-white/50 leading-relaxed pl-5">{item.description}</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-xl text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
          {item.roi_estimate}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5 text-xs text-white/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> {item.estimated_weeks} weeks
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" /> Owner: {item.owner}
          </span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full border font-semibold ${effortColors[item.effort] || effortColors.Low}`}>
          {item.effort} Effort
        </span>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {item.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs font-semibold px-3 py-1 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-300"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const { roadmapData, setRoadmapData } = useAppStore();
  const [localRoadmap, setLocalRoadmap] = useState(roadmapData);

  useEffect(() => {
    if (!roadmapData) {
      roadmapAPI.getMock()
        .then((d) => { setLocalRoadmap(d); setRoadmapData(d); })
        .catch(console.error);
    } else {
      setLocalRoadmap(roadmapData);
    }
  }, []);

  const phases: RoadmapPhase[] = localRoadmap?.phases || [];

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
            AI Implementation Roadmap & Rollout Schedule
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Phased 24-week execution timeline designed for low risk, rapid ROI, and team adoption.
          </p>
        </div>

        {localRoadmap && (
          <div className="flex items-center gap-4">
            <div className="px-5 py-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
              <p className="text-xs text-white/40">Total Timeline</p>
              <p className="text-xl font-black">{localRoadmap.total_weeks} Weeks</p>
            </div>
            <div className="px-5 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
              <p className="text-xs text-white/40">Total Target Value</p>
              <p className="text-xl font-black">{localRoadmap.total_estimated_value}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Progress Timeline Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-white/40 uppercase tracking-wider px-1">
          <span>Phase 1: Quick Wins (W1-W4)</span>
          <span>Phase 2: Core Automation (W5-W12)</span>
          <span>Phase 3: Advanced AI Agents (W13-W24)</span>
        </div>
        <div className="flex gap-2">
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="flex-1 h-2 rounded-full transition-all"
              style={{ background: phase.color }}
            />
          ))}
        </div>
      </div>

      {/* Phases List */}
      <div className="space-y-10">
        {phases.map((phase, pi) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.15 }}
            className="space-y-4"
          >
            {/* Phase Header */}
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-black flex-shrink-0"
                style={{ background: phase.color + '25', border: `1px solid ${phase.color}40` }}
              >
                P{phase.phase}
              </div>
              <div>
                <h3 className="font-black text-xl text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {phase.title}
                </h3>
                <p className="text-xs text-white/40">Duration: {phase.duration_weeks} weeks · {phase.items.length} initiatives</p>
              </div>
            </div>

            {/* Initiatives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14">
              {phase.items.map((item) => (
                <RoadmapItemCard key={item.id} item={item} phaseColor={phase.color} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
