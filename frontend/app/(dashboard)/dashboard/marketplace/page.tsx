'use client';

/**
 * AI Agent Marketplace Page
 * 
 * Browse and filter curated AI tools matched to automation opportunities.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Star, Zap, Filter } from 'lucide-react';
import { marketplaceAPI } from '@/lib/api';
import type { AiTool } from '@/types';

const CATEGORIES = ['All', 'Foundation Model', 'Sales Intelligence', 'Customer Support AI', 'Workflow Automation', 'Productivity AI', 'CRM AI', 'Conversational AI'];

function ToolCard({ tool, index }: { tool: AiTool; index: number }) {
  const complexityColor: Record<string, string> = {
    'Very Low': '#10b981',
    Low: '#22d3ee',
    Medium: '#f59e0b',
    High: '#f43f5e',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="p-5 rounded-2xl border hover:border-white/15 transition-all group cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {tool.logo_emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm">{tool.name}</h3>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-white/40">{tool.rating}</span>
            </div>
          </div>
          <p className="text-xs text-white/40">{tool.vendor}</p>
        </div>
      </div>

      {/* Category + Complexity badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc' }}>
          {tool.category}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: complexityColor[tool.integration_complexity] || '#94a3b8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {tool.integration_complexity} setup
        </span>
      </div>

      <p className="text-xs text-white/50 leading-relaxed mb-4">{tool.description}</p>

      {/* Use cases */}
      <div className="flex flex-wrap gap-1 mb-4">
        {tool.use_cases.slice(0, 3).map((uc) => (
          <span key={uc} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {uc}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/30">{tool.pricing_model}</p>
          <p className="text-sm font-bold text-white">{tool.starting_price}</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-indigo-300 hover:text-indigo-200" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          Learn more <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

export default function MarketplacePage() {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    marketplaceAPI.getAll()
      .then((d) => setTools(d.tools))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = tools.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-white placeholder-white/20 outline-none focus:border-indigo-500 transition-colors text-sm"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                : 'border border-white/8 text-white/40 hover:text-white/60 hover:border-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-white/30">{filtered.length} tool{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Tool Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
