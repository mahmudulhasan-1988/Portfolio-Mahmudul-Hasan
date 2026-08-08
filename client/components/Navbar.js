'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Heart, Code2, FolderGit2, Briefcase, GraduationCap, Mail, ShieldCheck, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const navLinks = [
  { name: 'Home',       href: '#home',       icon: Terminal },
  { name: 'About',      href: '#about-me',   icon: Heart },
  { name: 'Skills',     href: '#skills',     icon: Code2 },
  { name: 'Projects',   href: '#projects',   icon: FolderGit2 },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Education',  href: '#education',  icon: GraduationCap },
  { name: 'Contact',    href: '#contact',    icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [mounted, setMounted] = useState(false);
  const isManualScroll = useRef(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isManualScroll.current) return;

      // Bottom of page detection for #contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('#contact');
        return;
      }

      const scrollPos = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const sectionId = navLinks[i].href.replace('#', '');
        const el = document.getElementById(sectionId);
        if (el) {
          if (scrollPos >= el.offsetTop) {
            setActiveSection(navLinks[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveSection(href);
    isManualScroll.current = true;

    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-3.5 transition-colors duration-300 ${
        scrolled ? 'glass-nav shadow-lg shadow-violet-950/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-700 to-purple-400 flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:shadow-violet-500/50 transition-shadow duration-300">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-[1.05rem] text-white group-hover:text-violet-300 transition-colors flex items-center gap-1">
              Mahmudul Hasan
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse ml-0.5" />
            </span>
            <span className="text-[0.68rem] text-slate-500 font-mono block">Full-Stack Engineer</span>
          </div>
        </Link>

        {/* Desktop links with Sliding Active Pill */}
        <div className="hidden lg:flex items-center gap-1 rounded-full border border-violet-500/12 bg-white/[0.03] backdrop-blur-md px-2 py-1.5 relative">
          {navLinks.map(({ name, href, icon: Icon }) => {
            const isActive = activeSection === href;
            return (
              <a
                key={name}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 z-10 ${
                  isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && mounted && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-md shadow-violet-600/40 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-violet-500'}`} />
                {name}
              </a>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Dark and Light theme"
            className="p-2.5 rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 hover:text-white hover:border-violet-500/40 transition-all flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </motion.button>

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white border border-violet-500/18 hover:border-violet-500/40 rounded-lg transition-all duration-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            Admin
          </Link>

          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(139,92,246,0.55)' }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:inline-flex btn-glow px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Hire Me
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            className="lg:hidden p-2.5 rounded-lg border border-violet-500/20 text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-all"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden mx-4 mt-2 rounded-2xl border border-violet-500/20"
            style={{ background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="p-4 space-y-1">
              {navLinks.map(({ name, href, icon: Icon }) => {
                const isActive = activeSection === href;
                return (
                  <a
                    key={name}
                    href={href}
                    onClick={(e) => {
                      handleNavClick(e, href);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'text-white bg-violet-600/30 border border-violet-500/40 font-semibold shadow-inner' 
                        : 'text-slate-300 hover:text-white hover:bg-violet-500/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-violet-300' : 'text-violet-400'}`} />
                    <span className="text-sm font-medium">{name}</span>
                  </a>
                );
              })}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleNavClick(e, '#contact');
                    setOpen(false);
                  }}
                  className="flex items-center justify-center w-full btn-glow py-3 rounded-xl text-sm font-semibold"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
