'use client';

/**
 * AI Agent Marketplace Page (Nimblize Clean Aesthetic)
 * 
 * Filterable catalog of curated enterprise AI software solutions.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Star, Filter, Sparkles } from 'lucide-react';
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
      className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-white/5 border border-white/10">
            {tool.logo_emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-white text-base truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {tool.name}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-white/70">{tool.rating}</span>
              </div>
            </div>
            <p className="text-xs text-white/40">{tool.vendor}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
            {tool.category}
          </span>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border"
            style={{
              color: complexityColor[tool.integration_complexity] || '#94a3b8',
              borderColor: `${complexityColor[tool.integration_complexity] || '#94a3b8'}30`,
              background: `${complexityColor[tool.integration_complexity] || '#94a3b8'}15`,
            }}
          >
            {tool.integration_complexity} Setup
          </span>
        </div>

        <p className="text-xs text-white/60 leading-relaxed">{tool.description}</p>

        {/* Use Cases */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tool.use_cases.slice(0, 3).map((uc) => (
            <span key={uc} className="text-xs px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.03] text-white/40">
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div>
          <p className="text-xs text-white/40">{tool.pricing_model}</p>
          <p className="text-sm font-bold text-white">{tool.starting_price}</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-300 border border-indigo-500/25 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all">
          Explore Tool <ExternalLink className="w-3.5 h-3.5" />
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Enterprise AI Agent & Tool Marketplace
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Curated directory of vetted commercial AI tools matched to your identified process vectors.
          </p>
        </div>
      </motion.div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search AI agents by name, category, or capability..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.03] text-white placeholder-white/30 text-sm outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 shadow-sm'
                  : 'border border-white/10 bg-white/[0.02] text-white/50 hover:text-white/80 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
