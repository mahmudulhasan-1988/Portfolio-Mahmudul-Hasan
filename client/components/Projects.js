'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Search, ExternalLink, Github, Eye, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

import { API_BASE_URL } from '@/lib/api';

const CATS = ['All', 'Full Stack', 'Frontend', 'Backend'];
const ITEMS_PER_PAGE = 3;

const gridV = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const cardV = {
  hidden:  { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Projects({ initialProjects }) {
  const [projects, setProjects]     = useState(initialProjects || []);
  const [activeCat, setActiveCat]   = useState('All');
  const [query, setQuery]           = useState('');
  const [selected, setSelected]     = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCatChange = (cat) => {
    setActiveCat(cat);
    setCurrentPage(1);
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    setCurrentPage(1);
  };

  const filtered = projects.filter(p => {
    const catOk   = activeCat === 'All' || p.category === activeCat;
    const queryOk = !query || [p.title, p.description, ...(p.tags || [])].join(' ').toLowerCase().includes(query.toLowerCase());
    return catOk && queryOk;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="projects" className="py-28 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>

      <div className="glow-orb w-96 h-96 bg-violet-700/14 -right-24 top-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="section-pill mb-4"><FolderGit2 className="w-3.5 h-3.5" /> Portfolio Showcase</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Featured <span className="text-gradient">Projects & Works</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Real-world applications engineered with Express.js, native MongoDB APIs, and Next.js frontends.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
        >
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button key={c} onClick={() => handleCatChange(c)} className={`filter-btn ${activeCat === c ? 'active' : ''}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects or tags…"
              value={query}
              onChange={e => handleQueryChange(e.target.value)}
              className="purple-input pl-10 text-sm"
            />
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCat}-${query}-${currentPage}`}
            variants={gridV}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 min-h-[420px]"
          >
            {paginatedProjects.map(project => (
              <motion.div
                key={project._id}
                variants={cardV}
                whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.45)', boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}
                className="glow-card rounded-2xl overflow-hidden flex flex-col group h-full"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden"
                  style={{ background: 'rgba(139,92,246,0.06)' }}>
                  <img
                    src={project.image} alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <span className="absolute top-3 left-3 badge-purple text-[0.65rem]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold text-amber-300"
                      style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}>
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                    style={{ background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(4px)' }}>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => setSelected(project)}
                      className="btn-glow w-10 h-10 rounded-full flex items-center justify-center" title="View Details">
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    {project.githubUrl && (
                      <motion.a whileHover={{ scale: 1.1 }} href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a whileHover={{ scale: 1.1 }} href={project.liveUrl} target="_blank" rel="noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-300 transition-all"
                        style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)' }}>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 onClick={() => setSelected(project)}
                      className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors cursor-pointer leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags?.slice(0, 4).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-[0.68rem] font-mono text-slate-400"
                        style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.14)' }}>
                        {tag}
                      </span>
                    ))}
                    {(project.tags?.length ?? 0) > 4 && (
                      <span className="px-2 py-1 rounded-md text-[0.68rem] font-mono text-slate-500"
                        style={{ background: 'rgba(139,92,246,0.05)' }}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>
                    <button onClick={() => setSelected(project)}
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                      Explore Case Study →
                    </button>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer"
                        className="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <motion.div variants={cardV} className="col-span-full text-center py-20 text-slate-500 text-sm font-mono">
                No projects found. Try a different filter or search term.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Bar */}
        {filtered.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(139,92,246,0.15)' }}>
            <div className="text-xs sm:text-sm text-slate-400 font-mono">
              Showing <span className="text-violet-300 font-semibold">{startIndex + 1}</span>–
              <span className="text-violet-300 font-semibold">{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
              <span className="text-violet-300 font-semibold">{filtered.length}</span> projects
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-violet-500/20 bg-violet-500/5 text-slate-300 hover:text-white hover:bg-violet-500/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-mono font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 border border-violet-400/30 scale-105'
                        : 'border border-violet-500/20 bg-violet-500/5 text-slate-400 hover:text-white hover:bg-violet-500/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-violet-500/20 bg-violet-500/5 text-slate-300 hover:text-white hover:bg-violet-500/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

