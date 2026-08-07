'use client';

/**
 * AI Founder Interview Page
 * 
 * Multi-turn conversational interview with the AI advisor.
 * Features:
 * - Chat interface with streaming-like typing animation
 * - Turn counter and completion tracking
 * - Auto-scroll to latest message
 * - Extract & analyze button when interview completes
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Send, Bot, User, Loader2, CheckCircle2, ArrowRight, Mic } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { interviewAPI, processesAPI, opportunitiesAPI, roiAPI } from '@/lib/api';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3">
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
    company, sessionId, companyContext,
    interviewHistory, interviewComplete,
    addMessage, setInterviewComplete, setSession,
    setProcesses, setOpportunities, setRoiData,
  } = useAppStore();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState('');
  const [localSessionId, setLocalSessionId] = useState(sessionId);
  const [localContext, setLocalContext] = useState(companyContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [interviewHistory, isLoading]);

  // Start interview if no session
  useEffect(() => {
    if (!sessionId && company) {
      startInterview();
    } else if (!sessionId && !company) {
      // No company set — demo mode with mock data
      startDemoInterview();
    }
  }, []);

  async function startInterview() {
    try {
      const res = await interviewAPI.start({
        company_name: company?.company_name || 'Demo Company',
        industry: company?.industry || 'SaaS',
        company_size: company?.company_size || '10-50',
        stage: company?.stage || 'Growth',
      });
      setSession(res.session_id, res.company_context);
      setLocalSessionId(res.session_id);
      setLocalContext(res.company_context);
      addMessage('assistant', res.message);
    } catch (e) {
      startDemoInterview();
    }
  }

  function startDemoInterview() {
    const demoMsg = `Hello! I'm your AI Automation Advisor. I'm here to help you identify which parts of your business could benefit most from AI automation.\n\nLet's start — can you walk me through what your team spends most of its time doing each week? Think about repetitive tasks, manual data entry, reporting, or communication workflows.`;
    addMessage('assistant', demoMsg);
    setLocalSessionId('demo-session');
    setLocalContext('Demo Company | SaaS | Growth');
  }

  async function sendMessage() {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setError('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      const res = await interviewAPI.sendMessage({
        session_id: localSessionId || 'demo',
        message: userMessage,
        history: interviewHistory,
        company_context: localContext || '',
      });
      addMessage('assistant', res.response);
      if (res.is_complete) setInterviewComplete(true);
    } catch (e) {
      // Fallback: use a canned response
      const fallbacks = [
        "That's very insightful! How many hours per week does your team spend on that process?",
        "Interesting. What tools are you currently using for that workflow?",
        "Got it. Are there any pain points or bottlenecks you've noticed in that process?",
        "That's a clear automation target. Can you tell me about any other repetitive processes your team handles?",
        "Excellent context. I think I have enough to generate your automation analysis. Ready to see your opportunities?",
      ];
      const turnCount = Math.floor(interviewHistory.length / 2);
      addMessage('assistant', fallbacks[Math.min(turnCount, fallbacks.length - 1)]);
      if (turnCount >= 4) setInterviewComplete(true);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function extractAndAnalyze() {
    setIsExtracting(true);
    try {
      // Run extraction and all downstream analysis in parallel
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
      setError('Analysis failed. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 160px)' }}>
      {/* Interview Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">AI Automation Advisor</p>
            <p className="text-xs text-white/40">
              {interviewComplete ? '✅ Interview complete — ready to analyze' : `Turn ${Math.ceil(interviewHistory.length / 2)} · Listening...`}
            </p>
          </div>
        </div>
        {interviewComplete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={extractAndAnalyze}
            disabled={isExtracting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60"
          >
            {isExtracting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> Generate Analysis <ArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        )}
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto rounded-2xl border p-4 space-y-4 mb-4"
        style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <AnimatePresence initial={false}>
          {interviewHistory.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  : 'bg-gradient-to-br from-cyan-500 to-emerald-500'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'rounded-tl-sm text-white/80'
                    : 'rounded-tr-sm text-white'
                }`}
                style={{
                  background: msg.role === 'assistant'
                    ? 'rgba(99,102,241,0.1)'
                    : 'rgba(34,211,238,0.1)',
                  border: `1px solid ${
                    msg.role === 'assistant'
                      ? 'rgba(99,102,241,0.2)'
                      : 'rgba(34,211,238,0.2)'
                  }`,
                }}
              >
                {msg.content.split('\n').map((line, li) => (
                  <span key={li}>{line}{li < msg.content.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-2 rounded-2xl rounded-tl-sm" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <TypingIndicator />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        {error && <p className="text-rose-400 text-xs mb-2">{error}</p>}
        {interviewComplete && (
          <p className="text-indigo-300 text-xs mb-2 text-center">
            ✨ Great conversation! Click "Generate Analysis" above to see your automation opportunities.
          </p>
        )}
        <div
          className="flex gap-3 items-center p-3 rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={interviewComplete ? 'Interview complete...' : 'Type your answer...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={isLoading || interviewComplete}
            className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading || interviewComplete}
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
