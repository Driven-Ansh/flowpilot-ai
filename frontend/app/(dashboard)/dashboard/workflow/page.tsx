'use client';

/**
 * Workflow Graph Page (Digital Twin Simulation)
 * Interactive React Flow graph displaying Before vs After AI state with FeatureInfoTooltip.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  type Node, type Edge, Controls, Background, BackgroundVariant,
  MiniMap, useNodesState, useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Cpu, User, ArrowLeftRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { FeatureInfoTooltip } from '@/components/ui/FeatureInfoTooltip';

const WORKFLOW_TOOLTIP = {
  title: 'Digital Twin Workflow Engine',
  techStack: ['React Flow (@xyflow/react)', 'Framer Motion', 'Canvas SVG', 'TypeScript 5'],
  implementation: 'Renders custom node trees and dynamic SVG edge paths. Toggling between states swaps static manual node configurations with animated streaming cyan edges.',
  howItWorks: 'Simulates how replacing manual human handoffs with AI webhooks and automated LLM models reduces execution latency from hours to seconds.',
};

const BEFORE_NODES: Node[] = [
  { id: 'start', type: 'input', position: { x: 0, y: 150 }, data: { label: '🔵 Process Start' }, style: { background: '#1e1b4b', border: '1px solid #6366f1', borderRadius: 12, color: '#a5b4fc', fontWeight: 600, fontSize: 12, padding: 12 } },
  { id: 'manual-1', position: { x: 220, y: 70 }, data: { label: '👤 Manual Lead Review\n~2 hrs/day' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'manual-2', position: { x: 440, y: 70 }, data: { label: '📋 SDR Data Entry\n~1.5 hrs/day' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'manual-3', position: { x: 660, y: 70 }, data: { label: '📧 Manual Email Outreach\n~1 hr/day' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'decision', position: { x: 880, y: 150 }, data: { label: '🤔 Qualified Lead?' }, style: { background: '#1e1b2b', border: '1px solid #a855f7', borderRadius: 12, color: '#d8b4fe', fontWeight: 600, fontSize: 12, padding: 12 } },
  { id: 'crm-update', position: { x: 1100, y: 50 }, data: { label: '💾 CRM Update\n(Manual Input)' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'discard', type: 'output', position: { x: 1100, y: 250 }, data: { label: '🗑️ Discard Lead' }, style: { background: '#1a1a1a', border: '1px solid #374151', borderRadius: 12, color: '#6b7280', fontWeight: 500, fontSize: 11, padding: 12 } },
  { id: 'end', type: 'output', position: { x: 1320, y: 50 }, data: { label: '✅ SDR Handoff' }, style: { background: '#0d2b1b', border: '1px solid #10b981', borderRadius: 12, color: '#6ee7b7', fontWeight: 600, fontSize: 12, padding: 12 } },
];

const BEFORE_EDGES: Edge[] = [
  { id: 'e1', source: 'start', target: 'manual-1', animated: false, style: { stroke: '#4b5563', strokeWidth: 2 } },
  { id: 'e2', source: 'manual-1', target: 'manual-2', label: 'Done', animated: false, style: { stroke: '#4b5563', strokeWidth: 2 }, labelStyle: { fill: '#9ca3af', fontSize: 10 } },
  { id: 'e3', source: 'manual-2', target: 'manual-3', animated: false, style: { stroke: '#4b5563', strokeWidth: 2 } },
  { id: 'e4', source: 'manual-3', target: 'decision', animated: false, style: { stroke: '#4b5563', strokeWidth: 2 } },
  { id: 'e5', source: 'decision', target: 'crm-update', label: 'Yes', animated: false, style: { stroke: '#10b981', strokeWidth: 2 }, labelStyle: { fill: '#6ee7b7', fontSize: 10 } },
  { id: 'e6', source: 'decision', target: 'discard', label: 'No', animated: false, style: { stroke: '#f43f5e', strokeWidth: 2 }, labelStyle: { fill: '#fca5a5', fontSize: 10 } },
  { id: 'e7', source: 'crm-update', target: 'end', animated: false, style: { stroke: '#10b981', strokeWidth: 2 } },
];

const AFTER_NODES: Node[] = [
  { id: 'start', type: 'input', position: { x: 0, y: 150 }, data: { label: '🔵 Process Start' }, style: { background: '#1e1b4b', border: '1px solid #6366f1', borderRadius: 12, color: '#a5b4fc', fontWeight: 600, fontSize: 12, padding: 12 } },
  { id: 'ai-intake', position: { x: 220, y: 70 }, data: { label: '🤖 AI Webhook Intake\n(Instant Sync)' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'ai-score', position: { x: 440, y: 70 }, data: { label: '🧠 AI Model Scoring\n(< 30 seconds)' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'ai-enrich', position: { x: 660, y: 70 }, data: { label: '✨ Clay.com Enrichment\n(Real-time)' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'ai-crm', position: { x: 880, y: 70 }, data: { label: '💾 Auto CRM Sync\n(Instant)' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'ai-out', position: { x: 1100, y: 70 }, data: { label: '📧 AI Personal Outreach\n(GPT-4o Triggered)' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center', padding: 12 } },
  { id: 'archive', type: 'output', position: { x: 660, y: 250 }, data: { label: '🗑️ Auto-Archived' }, style: { background: '#1a1a1a', border: '1px solid #374151', borderRadius: 12, color: '#6b7280', fontWeight: 500, fontSize: 11, padding: 12 } },
  { id: 'end', type: 'output', position: { x: 1320, y: 70 }, data: { label: '✅ High-Priority SDR Alert' }, style: { background: '#0d2b1b', border: '1px solid #10b981', borderRadius: 12, color: '#6ee7b7', fontWeight: 600, fontSize: 12, padding: 12 } },
];

const AFTER_EDGES: Edge[] = [
  { id: 'e1', source: 'start', target: 'ai-intake', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 'e2', source: 'ai-intake', target: 'ai-score', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 'e3', source: 'ai-score', target: 'ai-enrich', label: 'Score > 70', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 }, labelStyle: { fill: '#67e8f9', fontSize: 10 } },
  { id: 'e3b', source: 'ai-score', target: 'archive', label: 'Score < 30', animated: false, style: { stroke: '#374151', strokeWidth: 2 }, labelStyle: { fill: '#6b7280', fontSize: 10 } },
  { id: 'e4', source: 'ai-enrich', target: 'ai-crm', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 'e5', source: 'ai-crm', target: 'ai-out', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 } },
  { id: 'e6', source: 'ai-out', target: 'end', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
];

export default function WorkflowPage() {
  const [mode, setMode] = useState<'before' | 'after'>('after');
  const [nodes, setNodes, onNodesChange] = useNodesState(AFTER_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(AFTER_EDGES);

  useEffect(() => {
    if (mode === 'before') {
      setNodes(BEFORE_NODES);
      setEdges(BEFORE_EDGES);
    } else {
      setNodes(AFTER_NODES);
      setEdges(AFTER_EDGES);
    }
  }, [mode]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Simulation Control */}
      <div className="p-8 rounded-3xl border border-white/10 bg-[#0e1122] space-y-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Digital Twin Workflow Graph
              </h1>
              <FeatureInfoTooltip info={WORKFLOW_TOOLTIP} />
            </div>
            <p className="text-sm text-slate-400">
              Visualizing the operational transformation from manual processing to an automated AI pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/5 flex-shrink-0">
            <button
              onClick={() => setMode('before')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mode === 'before'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Manual State (Before AI)
            </button>
            <button
              onClick={() => setMode('after')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mode === 'after'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> Automated State (After AI)
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-indigo-500/20 border border-indigo-500" /> Start Node
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${mode === 'before' ? 'bg-rose-500/20 border border-rose-500' : 'bg-cyan-500/20 border border-cyan-500'}`} />
            {mode === 'before' ? 'Manual Step (Bottleneck)' : 'AI Autonomous Step'}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500" /> Final Output Handoff
          </div>
          {mode === 'after' && (
            <span className="text-cyan-400 font-medium ml-auto flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Animated Cyan Edges = Real-time Event Streaming
            </span>
          )}
        </div>
      </div>

      {/* React Flow Canvas Container */}
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        style={{ height: '540px', background: '#07070c' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="rgba(255,255,255,0.06)" />
          <Controls style={{ background: '#0f0e18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fill: '#ffffff' }} />
          <MiniMap style={{ background: '#090812', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} nodeColor="#6366f1" />
        </ReactFlow>
      </motion.div>

      {/* Operational Impact Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Processing Time', before: '4.5 hours / day', after: '< 2 minutes', gain: '98% faster execution' },
          { label: 'Data Error Rate', before: '~12% manual error', after: '< 0.1% validated', gain: '99% error reduction' },
          { label: 'Lead Response Velocity', before: '3–6 hours latency', after: 'Instant (< 30 sec)', gain: '10x conversion velocity' },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-white/10 bg-[#0e1122] space-y-3 shadow-lg">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-rose-400/70 line-through">{stat.before}</span>
              <ArrowLeftRight className="w-4 h-4 text-slate-500" />
              <span className="text-base font-bold text-cyan-300">{stat.after}</span>
            </div>
            <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {stat.gain}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
