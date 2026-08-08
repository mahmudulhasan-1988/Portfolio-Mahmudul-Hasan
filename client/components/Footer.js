'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Terminal, Github, Linkedin, Twitter, Facebook, ArrowUp, Sparkles } from 'lucide-react';
import Image from 'next/image';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about-me' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { href: 'https://github.com/mahmudulhasan-1988', Icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', Icon: Twitter, label: 'Twitter' },
  { href: 'https://www.facebook.com/arif.chowdhury.5243', Icon: Facebook, label: 'Facebook' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(139,92,246,0.15)', background: 'rgba(3,7,18,0.95)' }}>

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-10"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.1)' }}>

          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-700 to-purple-400 flex items-center justify-center shadow-lg shadow-violet-600/30">
                {/* <Terminal className="w-5 h-5 text-white" /> */}
                <Image className='w-10 h-10 rounded-xl' src="https://i.ibb.co.com/pv83jvbS/PP-Hasan.png" alt="Logo" width={25} height={25} />
              </div>
              <div>
                <span className="font-extrabold text-white text-base flex items-center gap-1">
                  Mahmudul Hasan <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </span>
                <p className="text-xs text-slate-500 font-mono">Full-Stack Software Engineer</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Crafting high-performance web applications with Express.js, native MongoDB, and Next.js — one commit at a time.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map(({ href, Icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-violet-300 transition-colors"
                  style={{ border: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.04)' }}>
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV.map(({ label, href }) => (
                <a key={label} href={href}
                  className="text-sm text-slate-500 hover:text-violet-300 transition-colors duration-200 font-medium">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">Available For</h4>
            {['Full-Time Roles', 'Contract Projects', 'Freelance Work', 'Technical Consulting'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {item}
              </div>
            ))}
            <motion.a href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(139,92,246,0.45)' }}
              className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold mt-2">
              Hire Me
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <span>© {new Date().getFullYear()} Mahmudul Hasan. Built with Express.js + MongoDB + Next.js</span>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.06, y: -2 }}
            className="flex items-center gap-2 text-slate-500 hover:text-violet-300 transition-colors px-4 py-2 rounded-lg"
            style={{ border: '1px solid rgba(139,92,246,0.15)' }}>
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
