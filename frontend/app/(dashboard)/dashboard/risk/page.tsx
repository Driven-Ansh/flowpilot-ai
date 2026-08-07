'use client';

/**
 * Risk & Compliance Analysis Page
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { riskAPI } from '@/lib/api';
import type { RiskCategory } from '@/types';

function RiskBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}

export default function RiskPage() {
  const [riskData, setRiskData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    riskAPI.getMock()
      .then(setRiskData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories: RiskCategory[] = riskData?.categories || [];

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      {riskData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border flex items-center gap-6"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <motion.circle
                cx="40" cy="40" r="34" fill="none" stroke="#22d3ee" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 34}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - riskData.risk_score / 100) }}
                transition={{ duration: 1.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-white">{riskData.risk_score}</span>
              <span className="text-xs text-white/30">/100</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-white/40 mb-1">Overall Risk Level</p>
            <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{riskData.overall_risk_level}</p>
            <p className="text-xs text-emerald-400 mt-1">✅ Proceeding with automation is recommended</p>
          </div>
        </motion.div>
      )}

      {/* Risk Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl border"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" style={{ color: cat.color }} />
                <h3 className="font-bold text-white text-sm">{cat.category}</h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: cat.color, background: cat.color + '20', border: `1px solid ${cat.color}30` }}>
                {cat.level}
              </span>
            </div>
            <RiskBar score={cat.score} color={cat.color} />
            <p className="text-xs text-white/50 leading-relaxed mt-3 mb-3">{cat.description}</p>
            <div className="space-y-1.5">
              {cat.mitigations.map((m) => (
                <div key={m} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-white/40">{m}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compliance Notes */}
      {riskData?.compliance_notes && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl border"
          style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.15)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Compliance Notes</h3>
          </div>
          <div className="space-y-2">
            {riskData.compliance_notes.map((note: string) => (
              <p key={note} className="text-xs text-white/50 leading-relaxed">• {note}</p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
