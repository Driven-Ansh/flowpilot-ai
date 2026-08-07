'use client';

/**
 * Workflow Graph Page
 * 
 * React Flow-powered digital twin visualization.
 * Shows before/after workflow simulation for business processes.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  type Node, type Edge, Controls, Background, BackgroundVariant,
  MiniMap, useNodesState, useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Cpu, User, ArrowLeftRight } from 'lucide-react';

const BEFORE_NODES: Node[] = [
  { id: 'start', type: 'input', position: { x: 0, y: 150 }, data: { label: '🔵 Process Start' }, style: { background: '#1e1b4b', border: '1px solid #6366f1', borderRadius: 12, color: '#a5b4fc', fontWeight: 600, fontSize: 12 } },
  { id: 'manual-1', position: { x: 200, y: 80 }, data: { label: '👤 Manual Review\n~2 hrs/day' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'manual-2', position: { x: 400, y: 80 }, data: { label: '📋 Data Entry\n~1.5 hrs/day' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'manual-3', position: { x: 600, y: 80 }, data: { label: '📧 Manual Outreach\n~1 hr/day' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'decision', position: { x: 800, y: 150 }, data: { label: '🤔 Qualified?' }, style: { background: '#1e1b2b', border: '1px solid #a855f7', borderRadius: 12, color: '#d8b4fe', fontWeight: 600, fontSize: 12 } },
  { id: 'crm-update', position: { x: 1000, y: 60 }, data: { label: '💾 CRM Update\n(Manual)' }, style: { background: '#2d1b1b', border: '1px solid #f43f5e', borderRadius: 12, color: '#fca5a5', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'discard', type: 'output', position: { x: 1000, y: 240 }, data: { label: '🗑️ Discarded' }, style: { background: '#1a1a1a', border: '1px solid #374151', borderRadius: 12, color: '#6b7280', fontWeight: 500, fontSize: 11 } },
  { id: 'end', type: 'output', position: { x: 1200, y: 60 }, data: { label: '✅ Lead Handed Off' }, style: { background: '#0d2b1b', border: '1px solid #10b981', borderRadius: 12, color: '#6ee7b7', fontWeight: 600, fontSize: 12 } },
];

const BEFORE_EDGES: Edge[] = [
  { id: 'e1', source: 'start', target: 'manual-1', animated: false, style: { stroke: '#374151' } },
  { id: 'e2', source: 'manual-1', target: 'manual-2', label: 'Done', animated: false, style: { stroke: '#374151' }, labelStyle: { fill: '#6b7280', fontSize: 10 } },
  { id: 'e3', source: 'manual-2', target: 'manual-3', animated: false, style: { stroke: '#374151' } },
  { id: 'e4', source: 'manual-3', target: 'decision', animated: false, style: { stroke: '#374151' } },
  { id: 'e5', source: 'decision', target: 'crm-update', label: 'Yes', animated: false, style: { stroke: '#10b981' }, labelStyle: { fill: '#6ee7b7', fontSize: 10 } },
  { id: 'e6', source: 'decision', target: 'discard', label: 'No', animated: false, style: { stroke: '#f43f5e' }, labelStyle: { fill: '#fca5a5', fontSize: 10 } },
  { id: 'e7', source: 'crm-update', target: 'end', animated: false, style: { stroke: '#10b981' } },
];

const AFTER_NODES: Node[] = [
  { id: 'start', type: 'input', position: { x: 0, y: 150 }, data: { label: '🔵 Process Start' }, style: { background: '#1e1b4b', border: '1px solid #6366f1', borderRadius: 12, color: '#a5b4fc', fontWeight: 600, fontSize: 12 } },
  { id: 'ai-intake', position: { x: 200, y: 80 }, data: { label: '🤖 AI Intake\nInstant' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'ai-score', position: { x: 400, y: 80 }, data: { label: '🧠 AI Scoring\n< 1 min' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'ai-enrich', position: { x: 600, y: 80 }, data: { label: '✨ Auto Enrichment\nInstant' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'ai-crm', position: { x: 800, y: 80 }, data: { label: '💾 Auto CRM Sync\nInstant' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'ai-out', position: { x: 1000, y: 80 }, data: { label: '📧 Auto Outreach\nAI-personalized' }, style: { background: '#0d1b2b', border: '1px solid #22d3ee', borderRadius: 12, color: '#67e8f9', fontWeight: 500, fontSize: 11, whiteSpace: 'pre-line', textAlign: 'center' } },
  { id: 'archive', type: 'output', position: { x: 600, y: 250 }, data: { label: '🗑️ Auto-archived' }, style: { background: '#1a1a1a', border: '1px solid #374151', borderRadius: 12, color: '#6b7280', fontWeight: 500, fontSize: 11 } },
  { id: 'end', type: 'output', position: { x: 1200, y: 80 }, data: { label: '✅ Ready for SDR' }, style: { background: '#0d2b1b', border: '1px solid #10b981', borderRadius: 12, color: '#6ee7b7', fontWeight: 600, fontSize: 12 } },
];

const AFTER_EDGES: Edge[] = [
  { id: 'e1', source: 'start', target: 'ai-intake', animated: true, style: { stroke: '#22d3ee' } },
  { id: 'e2', source: 'ai-intake', target: 'ai-score', animated: true, style: { stroke: '#22d3ee' } },
  { id: 'e3', source: 'ai-score', target: 'ai-enrich', label: 'Score > 70', animated: true, style: { stroke: '#22d3ee' }, labelStyle: { fill: '#67e8f9', fontSize: 10 } },
  { id: 'e3b', source: 'ai-score', target: 'archive', label: 'Score < 30', animated: false, style: { stroke: '#374151' }, labelStyle: { fill: '#6b7280', fontSize: 10 } },
  { id: 'e4', source: 'ai-enrich', target: 'ai-crm', animated: true, style: { stroke: '#22d3ee' } },
  { id: 'e5', source: 'ai-crm', target: 'ai-out', animated: true, style: { stroke: '#22d3ee' } },
  { id: 'e6', source: 'ai-out', target: 'end', animated: true, style: { stroke: '#10b981' } },
];

export default function WorkflowPage() {
  const [mode, setMode] = useState<'before' | 'after'>('before');
  const [nodes, setNodes, onNodesChange] = useNodesState(BEFORE_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(BEFORE_EDGES);

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
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">Viewing: Lead Qualification Process</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setMode('before')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              mode === 'before' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Before AI
          </button>
          <button
            onClick={() => setMode('after')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              mode === 'after' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> After AI
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-white/40">
        {mode === 'before' ? (
          <><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border border-rose-500 bg-rose-900/30" />Manual steps (bottlenecks)</div></>
        ) : (
          <><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border border-cyan-500 bg-cyan-900/30" />AI-automated steps</div><span className="text-cyan-400">Animated edges = real-time data flow</span></>
        )}
      </div>

      {/* Flow Graph */}
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border overflow-hidden"
        style={{ height: '500px', background: '#0a0910', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.05)" />
          <Controls style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
          <MiniMap style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }} nodeColor="#6366f1" />
        </ReactFlow>
      </motion.div>

      {/* Comparison Stats */}
      {mode === 'after' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Time Reduction', before: '4.5 hrs/day', after: '< 5 min', improvement: '98%' },
            { label: 'Error Rate', before: '~12%', after: '< 1%', improvement: '92%' },
            { label: 'Lead Response', before: '2-4 hours', after: '< 2 min', improvement: '99%' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-xs text-white/40 mb-2">{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-rose-400 line-through">{stat.before}</span>
                <ArrowLeftRight className="w-3 h-3 text-white/20" />
                <span className="text-sm font-bold text-cyan-400">{stat.after}</span>
              </div>
              <p className="text-xs text-emerald-400 mt-1">{stat.improvement} improvement</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
