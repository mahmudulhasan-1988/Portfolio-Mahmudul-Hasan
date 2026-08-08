'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Github, Linkedin, Twitter, Facebook, Download, Server,
  Database, Code, CheckCircle2, Sparkles, Zap, ShieldCheck, Terminal, Send
} from 'lucide-react';

import { API_BASE_URL } from '@/lib/api';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
};

const TICKER = [
  { text: 'React.js & Next.js', icon: '⚡' },
  { text: 'Node.js & Express.js', icon: '🚀' },
  { text: 'Native MongoDB Driver', icon: '🍃' },
  { text: 'Tailwind CSS & Modern UI', icon: '🎨' },
  { text: 'TypeScript & ES6+', icon: '💻' },
  { text: 'REST APIs & Systems', icon: '🔥' },
  { text: 'Cloud & Docker', icon: '📦' },
  { text: 'WebSockets & Realtime', icon: '🌐' },
];

export default function Hero({ bio }) {
  const [data, setData] = useState(bio || null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!data) {
      fetch(`${API_BASE_URL}/portfolio`)
        .then(r => r.json()).then(setData).catch(() => { });
    }
  }, [data]);

  const stats = data?.stats || { projectsCompleted: 28, yearsExperience: 5, codeCommits: '3.4k+', happyClients: 19 };
  const avatar = data?.avatar || 'https://i.ibb.co.com/pv83jvbS/PP-Hasan.png';


  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
    window.open('https://docs.google.com/document/d/155SFObDzqgTHAOEPCKRXPSAC6Ezs-jlB/export?format=pdf', '_blank');
  };

  const socials = [
    { href: data?.github || 'https://github.com', Icon: Github, label: 'GitHub', color: 'hover:text-violet-300 hover:border-violet-400/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]' },
    { href: data?.linkedin || 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
    { href: data?.twitter || 'https://twitter.com', Icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400 hover:border-sky-400/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]' },
    { href: data?.facebook || 'https://facebook.com', Icon: Facebook, label: 'Facebook', color: 'hover:text-indigo-400 hover:border-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
  ];

  const statCards = [
    { value: `${stats.projectsCompleted}+`, label: 'Projects Done', cls: 'text-purple-gradient', sub: 'Production Ready' },
    { value: `${stats.yearsExperience}+ Yrs`, label: 'Experience', cls: 'text-cyan-400', sub: 'Full Stack Dev' },
    { value: stats.codeCommits, label: 'Code Commits', cls: 'text-emerald-400', sub: 'Clean & Scalable' },
    { value: '100%', label: 'Satisfaction', cls: 'text-pink-400', sub: 'Client Rating' },
  ];

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Dynamic Background Glows & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(139,92,246,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-violet-600/18 -top-32 -left-40 blur-[100px]" />
      <div className="glow-orb w-[450px] h-[450px] bg-pink-500/14 top-1/3 -right-20 blur-[90px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/12 bottom-10 left-1/3 blur-[90px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Column: Content & Copywriting ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Status Pills */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for Senior Roles & Projects
              </span>
              <span className="badge-purple inline-flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-300" />
                {data?.designation || 'Senior Full-Stack Engineer'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={item} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Hello, I&apos;m{' '}
                <span className="text-gradient hover:opacity-90 transition-opacity cursor-default">
                  {data?.name || 'Mahmudul Hasan'}
                </span>{' '}
                <motion.span
                  animate={{ rotate: [0, 20, 0, 20, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5 }}
                  className="inline-block origin-bottom-right"
                >
                  👋
                </motion.span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-slate-300 leading-snug">
                {data?.title || 'Full-Stack Software Engineer & Digital Architect'}
              </p>
            </motion.div>

            {/* Infinite Tech Ticker */}
            <motion.div variants={item}>
              <div className="w-full overflow-hidden rounded-xl border border-violet-500/20 py-2.5 backdrop-blur-md"
                style={{ background: 'rgba(139,92,246,0.04)' }}>
                <div className="animate-marquee items-center gap-3">
                  {[...TICKER, ...TICKER].map((t, i) => (
                    <span key={i}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-violet-200 shrink-0 border border-violet-500/20 bg-violet-500/10 shadow-sm">
                      <span>{t.icon}</span> {t.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              {data?.bio || 'Passionate software engineer with 5+ years of experience architecting high-performance web applications, resilient RESTful microservices, and elegant responsive user interfaces.'}
            </motion.p>

            {/* Core Architectural Badges */}
            <motion.div variants={item} className="flex flex-wrap gap-2.5">
              {[
                { icon: <Server className="w-4 h-4 text-violet-400" />, text: 'Express.js & REST APIs' },
                { icon: <Database className="w-4 h-4 text-emerald-400" />, text: 'Native MongoDB Driver' },
                { icon: <Code className="w-4 h-4 text-cyan-400" />, text: 'Next.js 14 App Router' },
                { icon: <ShieldCheck className="w-4 h-4 text-pink-400" />, text: 'Secure Authentication' },
              ].map((b, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-300 text-xs sm:text-sm font-medium transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.18)' }}>
                  {b.icon} {b.text}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="btn-glow px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 text-white shadow-lg transition-all"
              >
                <Download className="w-4 h-4" /> Download Resume
              </motion.button>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, borderColor: 'rgba(139,92,246,0.5)', backgroundColor: 'rgba(139,92,246,0.1)' }}
                whileTap={{ scale: 0.96 }}
                className="group px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 text-slate-200 transition-all duration-200 border border-violet-500/30 bg-violet-500/5"
              >
                View Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-3.5 rounded-xl font-semibold flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm"
              >
                <Send className="w-4 h-4" /> Get in Touch
              </motion.a>
            </motion.div>

            {/* Download Toast Notification */}
            <AnimatePresence>
              {downloaded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex items-center gap-2 text-emerald-400 text-xs font-mono px-4 py-3 rounded-xl shadow-lg"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> Resume download initiated! Opening document…
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Links Bar */}
            <motion.div variants={item} className="flex items-center gap-3 pt-3"
              style={{ borderTop: '1px solid rgba(139,92,246,0.14)' }}>
              <span className="text-xs text-slate-400 font-mono font-medium">Connect:</span>
              <div className="flex items-center gap-2.5">
                {socials.map(({ href, Icon, label, color }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-200 ${color}`}
                    style={{ border: '1px solid rgba(139,92,246,0.18)', background: 'rgba(255,255,255,0.03)' }}>
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Futuristic Animated Profile Card & Stats ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Rotating Halo & Ambient Glow */}
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              
              {/* Floating Badge 1: Top-Left */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-xl bg-slate-900/80 border border-violet-500/40 text-white shadow-[0_10px_25px_rgba(139,92,246,0.3)]"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-violet-300">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[0.68rem] text-slate-400 font-mono">Expertise</p>
                  <p className="text-xs font-bold text-violet-200">Full-Stack Dev</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom-Right */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-xl bg-slate-900/80 border border-cyan-500/40 text-white shadow-[0_10px_25px_rgba(6,182,212,0.25)]"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[0.68rem] text-slate-400 font-mono">Quality</p>
                  <p className="text-xs font-bold text-cyan-200">100% Satisfaction</p>
                </div>
              </motion.div>

              {/* Main Glass Container */}
              <div className="glow-card rounded-3xl p-5 sm:p-6 space-y-5 border-pulse relative overflow-hidden backdrop-blur-2xl">
                
                {/* Profile Image Frame with Cyber Orbit Effect */}
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden group/img"
                  style={{ border: '1px solid rgba(139,92,246,0.3)' }}>
                  
                  {/* Image */}
                  <img
                    src={avatar}
                    alt={data?.name || 'Mahmudul Hasan'}
                    className="w-full h-full object-cover object-top sm:object-center group-hover/img:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-transparent to-pink-950/20" />

                  {/* Top-Right Badge inside photo */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[0.7rem] font-bold text-emerald-300 backdrop-blur-md"
                      style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Engineer
                    </span>
                  </div>

                  {/* Bottom Text Overlay inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-white font-extrabold text-lg sm:text-xl drop-shadow-md">
                        {data?.name || 'Mahmudul Hasan'}
                      </h3>
                      <p className="text-violet-300 text-xs font-mono font-medium mt-0.5">
                        {data?.designation || 'Senior Full-Stack Engineer'}
                      </p>
                    </div>
                    <span className="p-2 rounded-xl text-xs font-semibold text-violet-200 backdrop-blur-md"
                      style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.4)' }}>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </span>
                  </div>
                </div>

                {/* 2x2 Glass Stat Cards */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {statCards.map((s, i) => (
                    <motion.div key={i}
                      whileHover={{ scale: 1.03, borderColor: 'rgba(139,92,246,0.45)', backgroundColor: 'rgba(139,92,246,0.08)' }}
                      className="p-3.5 rounded-2xl text-center transition-all duration-300 border border-violet-500/15 bg-violet-500/5 backdrop-blur-sm"
                    >
                      <div className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${s.cls}`}>{s.value}</div>
                      <div className="text-xs font-semibold text-slate-300 mt-0.5">{s.label}</div>
                      <div className="text-[0.68rem] text-slate-400 font-mono mt-0.5">{s.sub}</div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

