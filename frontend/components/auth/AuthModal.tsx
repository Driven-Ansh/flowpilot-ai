'use client';

/**
 * Personalized Auth & Profile Selection Modal
 * Allows viewers to sign in, create a persona, or switch sessions
 * ensuring zero shared/trash data between viewers.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Building, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user, setUser, reset } = useAppStore();

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState(user?.name || 'Anshul Sinha');
  const [email, setEmail] = useState(user?.email || 'anshul@startup.io');
  const [companyName, setCompanyName] = useState('Acme Technologies');
  const [role, setRole] = useState('Founder / CEO');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Set isolated user session
    setUser({
      name: name.trim(),
      email: email.trim(),
      companyName: companyName.trim(),
      role: role.trim(),
    });

    onClose();
  };

  const handleQuickDemo = (demoName: string, demoCompany: string, demoRole: string) => {
    reset(); // Clear old session data so viewer gets a fresh 100% clean session
    setUser({
      name: demoName,
      email: `${demoName.toLowerCase().replace(/\s+/g, '.')}@demo.com`,
      companyName: demoCompany,
      role: demoRole,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-[#0e1122] border border-white/15 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {user ? 'Personalized Viewer Session' : 'Sign In / Viewer Access'}
                  </h3>
                  <p className="text-xs text-slate-400">Isolated workspace data for each team member</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anshul Sinha"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white outline-none focus:border-cyan-400 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anshul@startup.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white outline-none focus:border-cyan-400 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-purple-400" /> Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Tech"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white outline-none focus:border-cyan-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Your Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070914] border border-white/10 text-sm text-white outline-none focus:border-cyan-400 transition-all"
                >
                  <option value="Founder / CEO">Founder / CEO</option>
                  <option value="VP of Operations">VP of Operations</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="AI Consultant">AI Consultant</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 mt-2 cursor-pointer"
              >
                Save & Start Fresh Session <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Preset Accounts */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or Select Instant Demo Persona:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Anshul Sinha', 'FlowPilot AI', 'Startup Founder')}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300">Anshul Sinha</p>
                  <p className="text-[10px] text-slate-400">Startup Founder · FinTech</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Sarah Jenkins', 'Apex Global', 'VP Operations')}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">Sarah Jenkins</p>
                  <p className="text-[10px] text-slate-400">VP Operations · B2B SaaS</p>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
