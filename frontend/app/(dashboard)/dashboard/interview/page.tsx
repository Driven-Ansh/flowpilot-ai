'use client';

/**
 * AI Founder Interview Page (Nimblize Clean Layout & Guided AI Agent)
 * 
 * Features:
 * - Clean, spacious step-guided interface with visual progress bar
 * - Guided quick-option chips + freeform chat input
 * - Professional, non-hallucinated AI advisory responses
 * - One-click Digital Twin & ROI analysis generation
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Send, Bot, User, Loader2, CheckCircle2, ArrowRight, Sparkles,
  Zap, Clock, Target, Layers, ChevronRight
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { processesAPI, opportunitiesAPI, roiAPI } from '@/lib/api';

interface StepOption {
  label: string;
  value: string;
  desc?: string;
}

const INTERVIEW_STEPS = [
  {
    step: 1,
    title: 'Department & Process Focus',
    icon: Target,
    aiQuestion: `Hello! I'm your AI Automation Advisor. To begin our discovery, which primary operational area in your business consumes the most manual team hours each week?`,
    options: [
      { label: 'Sales & Lead Triage', value: 'Sales Operations & Lead Qualification', desc: 'Manual SDR lead scoring, enrichment & CRM data entry' },
      { label: 'Customer Support', value: 'Customer Support & Ticket Routing', desc: 'Triage, tagging, and repetitive FAQ resolution' },
      { label: 'Weekly Reporting', value: 'Weekly Performance Reporting', desc: 'Compiling metrics across Sheets, Slides & dashboards' },
      { label: 'Finance & Invoicing', value: 'Invoicing & Financial Reconciliation', desc: 'Payment tracking, receipt matching & ERP sync' },
    ],
  },
  {
    step: 2,
    title: 'Time & Software Stack',
    icon: Clock,
    aiQuestion: (process: string) =>
      `Understood. ${process} is a classic candidate for high-impact AI automation. How many team hours per week are spent here, and what software tools are involved?`,
    options: [
      { label: '12 hrs/wk · Salesforce, Gmail & Excel', value: '12 hours per week across Salesforce, Gmail, and Excel' },
      { label: '25 hrs/wk · Zendesk, Slack & Google Sheets', value: '25 hours per week using Zendesk, Slack, and Google Sheets' },
      { label: '18 hrs/wk · HubSpot, Notion & Manual Entry', value: '18 hours per week across HubSpot, Notion, and manual data entry' },
      { label: '35+ hrs/wk · Multiple legacy software tools', value: '35+ hours per week using multiple disconnected software tools' },
    ],
  },
  {
    step: 3,
    title: 'Pain Points & Friction',
    icon: Layers,
    aiQuestion: (timeAndTools: string) =>
      `Got it. Allocating ${timeAndTools} creates a significant drag on scaling. What is the single biggest bottleneck or point of failure in this workflow?`,
    options: [
      { label: 'Slow First-Response Time', value: 'Manual data entry delays customer & lead follow-up by several hours' },
      { label: 'Inconsistent Scoring & Errors', value: 'Human error and inconsistent lead qualification rules' },
      { label: 'Report Compilation Delay', value: 'Reports take days to prepare, delaying executive decisions' },
      { label: 'Repetitive Task Fatigue', value: 'Team burnout from performing repetitive, low-leverage tasks' },
    ],
  },
  {
    step: 4,
    title: 'AI Strategy Synthesis',
    icon: Sparkles,
    aiQuestion: (process: string, bottleneck: string) =>
      `Excellent discovery context. I have completed the operational assessment for ${process}.\n\n` +
      `Key Finding: ${bottleneck}.\n\n` +
      `We can eliminate 75%+ of this manual overhead by deploying an autonomous AI workflow layer. I have prepared your Digital Twin graph, opportunity scoring, and 24-month ROI model.`,
    options: [],
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 p-3">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.8, delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export default function InterviewPage() {
  const router = useRouter();
  const {
    company, interviewHistory, interviewComplete,
    addMessage, setInterviewComplete, setProcesses,
    setOpportunities, setRoiData,
  } = useAppStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [selections, setSelections] = useState({ process: '', time: '', pain: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasInitRef = useRef(false);
  useEffect(() => {
    if (interviewHistory.length === 0 && !hasInitRef.current) {
      hasInitRef.current = true;
      addMessage('assistant', INTERVIEW_STEPS[0].aiQuestion as string);
    }
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [interviewHistory, isLoading]);

  const currentStep = INTERVIEW_STEPS[Math.min(currentStepIndex, INTERVIEW_STEPS.length - 1)];

  const handleSelectOption = (option: StepOption) => {
    if (isLoading || interviewComplete) return;
    submitTurn(option.value);
  };

  const handleSubmitText = () => {
    if (!input.trim() || isLoading || interviewComplete) return;
    const text = input.trim();
    setInput('');
    submitTurn(text);
  };

  const submitTurn = (userResponse: string) => {
    addMessage('user', userResponse);
    setIsLoading(true);

    setTimeout(() => {
      let nextStepIdx = currentStepIndex + 1;
      let nextSelections = { ...selections };

      if (currentStepIndex === 0) nextSelections.process = userResponse;
      else if (currentStepIndex === 1) nextSelections.time = userResponse;
      else if (currentStepIndex === 2) nextSelections.pain = userResponse;

      setSelections(nextSelections);

      if (nextStepIdx >= 3) {
        // Complete interview
        const finalQuestion = (INTERVIEW_STEPS[3].aiQuestion as Function)(
          nextSelections.process || 'your core operations',
          nextSelections.pain || 'manual operational latency'
        );
        addMessage('assistant', finalQuestion);
        setCurrentStepIndex(3);
        setInterviewComplete(true);
      } else {
        // Next step question
        const stepDef = INTERVIEW_STEPS[nextStepIdx];
        let qText = '';
        if (typeof stepDef.aiQuestion === 'function') {
          qText = (stepDef.aiQuestion as any)(
            nextSelections.process || 'your core process',
            nextSelections.time || 'manual effort'
          );
        } else {
          qText = stepDef.aiQuestion;
        }
        addMessage('assistant', qText);
        setCurrentStepIndex(nextStepIdx);
      }

      setIsLoading(false);
    }, 600);
  };

  const extractAndAnalyze = async () => {
    setIsExtracting(true);
    try {
      const [procs, opps, roi] = await Promise.all([
        processesAPI.getMock(),
        opportunitiesAPI.getMock(),
        roiAPI.getMock(),
      ]);
      setProcesses(procs.processes);
      setOpportunities(opps.opportunities);
      setRoiData(roi);
      router.push('/dashboard/opportunities');
    } catch (e) {
      console.error(e);
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Progress Steps */}
      <div className="p-6 rounded-2xl border bg-white/[0.02] border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                AI Discovery Consultant
              </h2>
              <p className="text-xs text-white/40">
                {company?.company_name ? `${company.company_name} · ${company.industry}` : 'Operational Automation Analysis'}
              </p>
            </div>
          </div>

          {interviewComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={extractAndAnalyze}
              disabled={isExtracting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-60"
            >
              {isExtracting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Synthesizing Strategy...</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> View Digital Twin & ROI Projections <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5">
          {INTERVIEW_STEPS.map((s, i) => {
            const isActive = i === currentStepIndex;
            const isDone = i < currentStepIndex || interviewComplete;
            return (
              <div key={s.step} className="space-y-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isDone
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                      : isActive
                      ? 'bg-indigo-500'
                      : 'bg-white/10'
                  }`}
                />
                <p className={`text-xs font-medium truncate hidden md:block ${isActive || isDone ? 'text-white/80' : 'text-white/30'}`}>
                  {s.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Conversation Area */}
      <div
        className="rounded-2xl border p-6 space-y-6 overflow-y-auto"
        style={{ minHeight: '380px', maxHeight: '480px', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <AnimatePresence initial={false}>
          {interviewHistory.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  : 'bg-gradient-to-br from-cyan-500 to-emerald-500'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'rounded-tl-xs text-white/90 bg-indigo-950/30 border border-indigo-500/20'
                    : 'rounded-tr-xs text-white bg-cyan-950/40 border border-cyan-500/30'
                }`}
              >
                {msg.content.split('\n').map((line, li) => (
                  <span key={li}>{line}{li < msg.content.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="p-3 rounded-2xl rounded-tl-xs bg-indigo-950/30 border border-indigo-500/20">
              <TypingIndicator />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Guided Quick-Select Options */}
      {!interviewComplete && currentStep.options.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 px-1">
            Quick Options (or type custom answer below)
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {currentStep.options.map((opt: any) => (
              <button
                key={opt.label}
                onClick={() => handleSelectOption(opt)}
                disabled={isLoading}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all text-left group flex items-start justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                    {opt.label}
                  </p>
                  {opt.desc && (
                    <p className="text-xs text-white/40 mt-0.5">{opt.desc}</p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Text Input */}
      <div className="p-2.5 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center gap-3">
        <input
          type="text"
          placeholder={
            interviewComplete
              ? 'Interview complete! Click above to view analysis...'
              : 'Type custom operational details or select an option above...'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitText()}
          disabled={isLoading || interviewComplete}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/30 outline-none"
        />
        <button
          onClick={handleSubmitText}
          disabled={!input.trim() || isLoading || interviewComplete}
          className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
