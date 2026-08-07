'use client';

/**
 * FlowPilot AI Landing Page
 * 
 * This is the public-facing marketing page. It showcases the product
 * with an animated hero, feature grid, stats, and CTA sections.
 */
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Brain, BarChart3, GitBranch, Zap, Shield,
  TrendingUp, Clock, Users, Star, ChevronRight, Sparkles,
  Bot, LineChart, FileText, Target
} from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Founder Interview',
    description: 'Our AI advisor conducts a structured discovery conversation to understand your business workflows in depth.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: GitBranch,
    title: 'Digital Twin Workflows',
    description: 'Visualize your current processes as interactive flow diagrams and simulate the AI-automated future state.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: BarChart3,
    title: 'ROI Calculator',
    description: 'Get precise ROI projections, payback periods, and 3-year value estimates before committing to any automation.',
    gradient: 'from-emerald-500 to-cyan-600',
  },
  {
    icon: Target,
    title: 'Opportunity Scoring',
    description: 'AI ranks every automation opportunity by feasibility, impact, and ROI so you tackle the biggest wins first.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Bot,
    title: 'AI Agent Marketplace',
    description: 'Browse curated AI tools matched to your specific processes, with integration complexity ratings.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: FileText,
    title: 'Executive PDF Report',
    description: 'Export a board-ready PDF report with all findings, recommendations, and implementation roadmap.',
    gradient: 'from-violet-500 to-indigo-600',
  },
];

const STATS = [
  { value: '10x', label: 'Faster process discovery vs manual consulting' },
  { value: '$180K', label: 'Average annual savings identified per startup' },
  { value: '94%', label: 'Accuracy on automation opportunity detection' },
  { value: '< 30min', label: 'Time from interview to full roadmap' },
];

const STEPS = [
  { num: '01', title: 'Answer the AI Interview', desc: 'A 10-minute conversational interview maps your business processes.' },
  { num: '02', title: 'Discover Opportunities', desc: 'AI identifies and scores every automation opportunity across your workflow.' },
  { num: '03', title: 'Analyze the ROI', desc: 'See precise cost savings, payback periods, and 3-year value projections.' },
  { num: '04', title: 'Execute the Roadmap', desc: 'Follow a prioritized, phase-by-phase implementation plan tailored to your team.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            FlowPilot <span className="text-indigo-400">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#stats" className="hover:text-white transition-colors">Results</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Automation Intelligence
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Turn Your Business
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Into an AI Powerhouse
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              FlowPilot AI analyzes your business processes, identifies automation opportunities,
              calculates ROI, and delivers a step-by-step implementation roadmap — in under 30 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/onboarding"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-base hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                Start Free Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl border border-white/10 text-white/80 font-medium text-base hover:bg-white/5 transition-all"
              >
                View Demo Dashboard
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-6 mt-12 text-sm text-white/40">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.9/5 rating</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span>No credit card required</span>
              <div className="w-px h-4 bg-white/10" />
              <span>Results in 30 minutes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-black mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Everything You Need to
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent"> Automate Smarter</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              A complete AI consulting platform — not just a chatbot.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              From Chaos to Clarity
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent"> in 4 Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex gap-5 p-6 rounded-2xl border border-white/8 bg-white/[0.03]"
              >
                <div className="text-4xl font-black text-white/10" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.num}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/5 to-cyan-500/5" />
            <h2 className="text-3xl md:text-4xl font-black mb-4 relative" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ready to 10x Your Team&apos;s
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent"> Output?</span>
            </h2>
            <p className="text-white/60 mb-8 relative">
              Join hundreds of startups that discovered $150K+ in annual automation savings with FlowPilot AI.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-indigo-500/25 relative"
            >
              Start Your Free Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5 text-center text-white/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-white/50">FlowPilot AI</span>
        </div>
        <p>© 2025 FlowPilot AI. Built for the builders.</p>
      </footer>
    </div>
  );
}
