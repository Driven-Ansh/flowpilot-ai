'use client';

/**
 * Implementation Roadmap Page
 * 
 * Visual phase-by-phase implementation roadmap with:
 * - Phased timeline view
 * - Item cards with effort, owner, tools
 * - ROI estimates per initiative
 * - Status tracking
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, Users, Zap, CheckCircle, Circle, DollarSign } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { roadmapAPI } from '@/lib/api';
import type { RoadmapPhase, RoadmapItem } from '@/types';

function RoadmapItemCard({ item, phaseColor }: { item: RoadmapItem; phaseColor: string }) {
  const effortColors: Record<string, string> = {
    Low: '#10b981',
    Medium: '#f59e0b',
    High: '#f43f5e',
  };

  return (
    <div
      className="p-5 rounded-xl border hover:border-white/15 transition-all"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Circle className="w-3 h-3" style={{ color: phaseColor }} />
            <h4 className="font-semibold text-white text-sm">{item.title}</h4>
          </div>
          <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0" style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          {item.roi_estimate}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-white/30">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {item.estimated_weeks}w
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" /> {item.owner}
        </span>
        <span style={{ color: effortColors[item.effort] }}>{item.effort} effort</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)', color: '#a5b4fc' }}
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
  const [loading, setLoading] = useState(false);
  const [localRoadmap, setLocalRoadmap] = useState(roadmapData);

  useEffect(() => {
    if (!roadmapData) {
      setLoading(true);
      roadmapAPI.getMock()
        .then((d) => { setLocalRoadmap(d); setRoadmapData(d); })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLocalRoadmap(roadmapData);
    }
  }, []);

  const phases: RoadmapPhase[] = localRoadmap?.phases || [];

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      {localRoadmap && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-6 p-5 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div>
            <p className="text-xs text-white/40">Total Duration</p>
            <p className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{localRoadmap.total_weeks} weeks</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-xs text-white/40">Total Estimated Value</p>
            <p className="text-xl font-black text-emerald-400" style={{ fontFamily: 'Outfit, sans-serif' }}>{localRoadmap.total_estimated_value}</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-xs text-white/40">Phases</p>
            <p className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{phases.length}</p>
          </div>
        </motion.div>
      )}

      {/* Phase Timeline */}
      <div className="flex gap-2 mb-2">
        {phases.map((phase) => (
          <div
            key={phase.phase}
            className="flex-1 h-1.5 rounded-full"
            style={{ background: phase.color, opacity: 0.8 }}
          />
        ))}
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {phases.map((phase, pi) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.15 }}
          >
            {/* Phase Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ background: phase.color + '30', border: `1px solid ${phase.color}40` }}
              >
                {phase.phase}
              </div>
              <div>
                <h3 className="font-bold text-white">{phase.title}</h3>
                <p className="text-xs text-white/40">{phase.duration_weeks} weeks · {phase.items.length} initiative{phase.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Items */}
            <div className="grid md:grid-cols-2 gap-4 pl-11">
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
