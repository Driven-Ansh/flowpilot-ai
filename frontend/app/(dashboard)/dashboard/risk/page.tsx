'use client';

/**
 * Risk & Compliance Analysis Page (Nimblize Clean Aesthetic)
 * Displays governance scoring, risk mitigations, and compliance considerations with FeatureInfoTooltip.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { riskAPI } from '@/lib/api';
import type { RiskCategory } from '@/types';
import { FeatureInfoTooltip } from '@/components/ui/FeatureInfoTooltip';

const RISK_TOOLTIP = {
  title: 'Risk & Governance Analyzer',
  techStack: ['TypeScript 5', 'Quart Async', 'DPDP Compliance Matrix', 'TailwindCSS v3'],
  implementation: 'Scenarios data privacy vector hazards, model hallucinations, and vendor lock-in risks against enterprise governance standards.',
  howItWorks: 'Assigns risk scores (0-100) across data privacy, model accuracy, and change management, detailing actionable mitigation controls.',
};

function RiskBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-2.5 rounded-full overflow-hidden bg-white/10">
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

  useEffect(() => {
    riskAPI.getMock()
      .then(setRiskData)
      .catch(console.error);
  }, []);

  const categories: RiskCategory[] = riskData?.categories || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/10 bg-[#0e1122] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Risk & Compliance Governance Analysis
            </h1>
            <FeatureInfoTooltip info={RISK_TOOLTIP} />
          </div>
          <p className="text-sm text-slate-400">
            Evaluating data privacy, model accuracy, security, and organizational change readiness.
          </p>
        </div>

        {riskData && (
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
            <ShieldCheck className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Overall Assessment</p>
              <p className="text-lg font-black">{riskData.overall_risk_level} Risk ({riskData.risk_score}/100)</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Risk Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-white/10 bg-[#0e1122] space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5" style={{ color: cat.color }} />
                <h3 className="font-bold text-white text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {cat.category}
                </h3>
              </div>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}15` }}
              >
                {cat.level} Level
              </span>
            </div>

            <RiskBar score={cat.score} color={cat.color} />

            <p className="text-xs text-slate-300 leading-relaxed">{cat.description}</p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mitigation Controls</p>
              {cat.mitigations.map((m) => (
                <div key={m} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compliance Advisory Notes */}
      {riskData?.compliance_notes && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl border border-amber-500/20 bg-amber-500/5 space-y-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Compliance & Regulatory Considerations
            </h3>
          </div>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {riskData.compliance_notes.map((note: string) => (
              <p key={note}>• {note}</p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
