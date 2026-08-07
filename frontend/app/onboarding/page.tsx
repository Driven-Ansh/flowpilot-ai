'use client';

/**
 * Onboarding Page
 * 
 * Multi-step company profile setup. Collects:
 * 1. Company name and industry
 * 2. Team size and stage
 * Then routes to the AI interview.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Zap, Building2, Users, Rocket } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const INDUSTRIES = [
  'SaaS / Software', 'E-commerce', 'FinTech', 'HealthTech', 'MarTech',
  'EdTech', 'Logistics', 'Real Estate', 'Legal Tech', 'Other',
];

const SIZES = [
  '1-5 (Founder stage)', '6-15 (Early team)', '16-50 (Growth stage)', '51-200 (Scale-up)', '200+ (Enterprise)',
];

const STAGES = [
  'Idea / Pre-product', 'MVP / Early traction', 'Product-market fit', 'Scaling fast', 'Established',
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setCompany, setOnboardingComplete } = useAppStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    company_name: '',
    industry: '',
    company_size: '',
    stage: '',
    description: '',
  });

  const steps = [
    {
      title: 'Tell us about your company',
      subtitle: 'We\'ll use this to personalize your automation analysis.',
      icon: Building2,
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Acme Inc."
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/20 outline-none focus:border-indigo-500 transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Industry *</label>
            <div className="grid grid-cols-2 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setForm({ ...form, industry: ind })}
                  className={`px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${
                    form.industry === ind
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                  }`}
                  style={{ background: form.industry === ind ? undefined : 'rgba(255,255,255,0.03)' }}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      isValid: () => form.company_name.trim() && form.industry,
    },
    {
      title: 'What does your team look like?',
      subtitle: 'This helps us calibrate the impact of automation for your scale.',
      icon: Users,
      fields: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Team Size *</label>
            <div className="space-y-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setForm({ ...form, company_size: size })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                    form.company_size === size
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                  }`}
                  style={{ background: form.company_size === size ? undefined : 'rgba(255,255,255,0.03)' }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      isValid: () => !!form.company_size,
    },
    {
      title: 'Where are you in your journey?',
      subtitle: 'We\'ll prioritize automation opportunities that match your stage.',
      icon: Rocket,
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Company Stage *</label>
            <div className="space-y-2">
              {STAGES.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setForm({ ...form, stage })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                    form.stage === stage
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                  }`}
                  style={{ background: form.stage === stage ? undefined : 'rgba(255,255,255,0.03)' }}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Brief Description (optional)</label>
            <textarea
              placeholder="What does your company do?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/20 outline-none focus:border-indigo-500 transition-colors resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      ),
      isValid: () => !!form.stage,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = async () => {
    if (!currentStep.isValid()) return;
    if (isLastStep) {
      setCompany(form);
      setOnboardingComplete(true);
      router.push('/dashboard/interview');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            FlowPilot <span className="text-indigo-400">AI</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-500"
              style={{ background: i <= step ? 'linear-gradient(90deg, #6366f1, #22d3ee)' : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>

        {/* Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="p-8 rounded-2xl border"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <currentStep.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {currentStep.title}
                </h2>
                <p className="text-sm text-white/40">{currentStep.subtitle}</p>
              </div>
            </div>

            {currentStep.fields}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-sm text-white/30">Step {step + 1} of {steps.length}</span>
          <button
            onClick={handleNext}
            disabled={!currentStep.isValid()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Start Interview' : 'Continue'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
