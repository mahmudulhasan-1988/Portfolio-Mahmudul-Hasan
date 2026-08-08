'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Tag, AlertTriangle, Rocket, Calendar } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{   opacity: 0, scale: 0.95,  y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          style={{
            background: 'rgba(10,5,24,0.98)',
            border:     '1px solid rgba(139,92,246,0.28)',
            boxShadow:  '0 0 60px rgba(139,92,246,0.15), 0 40px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.05)' }}>
            <div className="flex items-center gap-3">
              <span className="badge-purple text-[0.68rem]">{project.category}</span>
              <h3 className="text-lg font-extrabold text-white">{project.title}</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-300">
            {/* Image */}
            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(139,92,246,0.18)' }}>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,5,24,0.5), transparent)' }} />
            </div>

            {/* Overview */}
            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 font-mono mb-3">
                <Layers className="w-4 h-4 text-violet-400" /> Project Overview & Architecture
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 font-mono mb-3">
                <Tag className="w-4 h-4 text-pink-400" /> Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300"
                    style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="rounded-xl p-4 space-y-2"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
                <AlertTriangle className="w-4 h-4" /> Technical Challenges
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                {project.challenges || 'Managing real-time synchronization, preventing event loop blockages, and tuning database indices under high concurrent request volume.'}
              </p>
            </div>

            {/* Future */}
            <div className="rounded-xl p-4 space-y-2"
              style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">
                <Rocket className="w-4 h-4" /> Future Plans
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                {project.futurePlans || 'Integrating AI prediction analytics, expanding team multi-tenancy, and automated CI/CD deployment pipelines.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.04)' }}>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recent'}
            </span>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <motion.a whileHover={{ scale: 1.05 }} href={project.githubUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all"
                  style={{ border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.07)' }}>
                  <Github className="w-4 h-4" /> GitHub
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(139,92,246,0.4)' }}
                  href={project.liveUrl} target="_blank" rel="noreferrer"
                  className="btn-glow flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
