'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Search, ExternalLink, Github, Eye, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

import { API_BASE_URL } from '@/lib/api';

const CATS = ['All', 'Full Stack', 'Frontend', 'Backend'];
const ITEMS_PER_PAGE = 3;

const DEFAULT_PROJECTS = [
  {
    _id: "6a748aaff1c69530dafaf301",
    title: "BiblioDrop – Local Library Delivery Website",
    description: "BiblioDrop is a modern library book delivery platform that connects readers with nearby libraries, making borrowing books faster and more convenient.",
    longDescription: "BiblioDrop is a full-stack web application designed to modernize traditional library services by introducing an efficient online book reservation and local delivery system.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/KpxyyC3n/Screenshot-2026-08-05-150130-png.png",
    liveUrl: "https://assignment-10-book-web.vercel.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/Assignment-10-Book-web",
    featured: true,
    createdAt: "2026-08-06T13:22:55.949Z"
  },
  {
    _id: "6a748a2cf1c69530dafaf300",
    title: "Government Tourism Website",
    description: "Government Tourism Website is a modern digital tourism platform developed to promote a country's cultural heritage, historical landmarks, natural attractions, and travel services.",
    longDescription: "The Government Tourism Website is a comprehensive tourism management system designed to serve both domestic and international travelers by providing reliable, up-to-date travel information.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/zk0F6Mz/Screenshot-2026-08-05-121818-png.png",
    liveUrl: "https://govtturismbd.netlify.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/govt-website-bd-Project",
    featured: true,
    createdAt: "2026-08-06T13:20:44.279Z"
  },
  {
    _id: "6a7481e9f1c69530dafaf2ff",
    title: "PerNest Website",
    description: "PetNest is a modern pet adoption and pet care platform that connects pet owners, animal shelters, and adopters in one place.",
    longDescription: "PetNest is a full-stack pet adoption management system built to promote responsible pet ownership and help homeless animals find loving homes.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/3mQmgRXg/Screenshot-2026-08-06-184002-png.png",
    liveUrl: "https://assignment-9-next-js-auth-projects.vercel.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/Assignment-9-Next.JS-auth-Projects",
    featured: true,
    createdAt: "2026-08-06T12:45:29.657Z"
  },
  {
    _id: "6a748068f1c69530dafaf2fe",
    title: "Online Delicious Fast Food Web",
    description: "Delicious Fast Food for Every Moment is a modern online fast-food ordering platform that allows users to explore delicious meals, customize orders, and enjoy a seamless food ordering experience.",
    longDescription: "Delicious Fast Food for Every Moment is a full-stack food ordering web application designed to simplify the process of discovering and ordering fast food online.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/ccVncJ8T/Screenshot-2026-08-06-183557-png.png",
    liveUrl: "https://fast-food-website-project.vercel.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/Fast-Food-Website-Project",
    featured: true,
    createdAt: "2026-08-06T12:39:04.061Z"
  },
  {
    _id: "6a747f55f1c69530dafaf2fd",
    title: "Online Newspaper Website",
    description: "NewsHub is a modern, responsive online newspaper platform that delivers the latest news across multiple categories, including politics, business, technology, sports, entertainment, health, and world news.",
    longDescription: "NewsHub is a full-stack newspaper web application designed to provide reliable and up-to-date news through a clean, responsive, and intuitive interface.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/0pXr8Rhp/Screenshot-2026-08-06-182951-png.png",
    liveUrl: "https://dragon-news-projects-liard.vercel.app/category/01",
    githubUrl: "https://github.com/mahmudulhasan-1988/dragon-news-projects",
    featured: true,
    createdAt: "2026-08-06T12:34:29.563Z"
  },
  {
    _id: "6a747d3ff1c69530dafaf2fc",
    title: "WanderLast Website",
    description: "WanderLast is a modern travel and tourism platform that helps users discover destinations, explore travel packages, book trips, and manage their travel plans in one place.",
    longDescription: "WanderLast is a full-stack travel management application designed to simplify trip planning and booking.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/FkTC44st/Screenshot-2026-08-06-182039-png.png",
    liveUrl: "https://wanderlast-website-projects.vercel.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/wanderlust-website-projects",
    featured: true,
    createdAt: "2026-08-06T12:25:35.561Z"
  },
  {
    _id: "6a747b89f1c69530dafaf2fb",
    title: "PetNest",
    description: "PetNest is a modern pet adoption platform that connects pet owners, shelters, and animal lovers in one place. The application simplifies the adoption process by allowing users to browse pets.",
    longDescription: "PetNest is a full-stack web application designed to make pet adoption easier, faster, and more transparent.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/7dWw0PgD/Screenshot-2026-08-06-181229-png.png",
    liveUrl: "https://petnest-b13.vercel.app",
    githubUrl: "https://github.com/mahmudulhasan-1988",
    featured: true,
    createdAt: "2026-08-06T12:18:17.548Z"
  },
  {
    _id: "6a7479caf1c69530dafaf2fa",
    title: "Friends to Keep Close in Your Life",
    description: "Friends to Keep Close in Your Life is a motivational and educational platform that helps people identify, appreciate, and build meaningful friendships.",
    longDescription: "In life, the quality of your friendships often matters more than the quantity. This project highlights the importance of surrounding yourself with people who inspire you.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/WvwGrMb7/Screenshot-2026-08-06-180549-png.png",
    liveUrl: "https://assignment-7-react-projects.netlify.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/Assignment-7-React-Next.JS-Projects",
    featured: true,
    createdAt: "2026-08-06T12:10:50.983Z"
  },
  {
    _id: "6a7477fff1c69530dafaf2f9",
    title: "DigiTools",
    description: "DigiTools is a modern web-based productivity platform that brings together essential digital utilities in one place. It helps users perform common tasks quickly and efficiently.",
    longDescription: "DigiTools is a modern web-based productivity platform that brings together essential digital utilities in one place.",
    category: "Full Stack",
    tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/hF9DJd7c/Screenshot-2026-08-06-175934-png.png",
    liveUrl: "https://assingment-6-digitools-project.netlify.app",
    githubUrl: "https://github.com/mahmudulhasan-1988/Assignment-06-digitools-projects",
    featured: true,
    createdAt: "2026-08-06T12:03:11.093Z"
  }
];

const gridV = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const cardV = {
  hidden:  { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Projects({ initialProjects }) {
  const [projects, setProjects]     = useState(
    initialProjects && initialProjects.length > 0 ? initialProjects : DEFAULT_PROJECTS
  );
  const [activeCat, setActiveCat]   = useState('All');
  const [query, setQuery]           = useState('');
  const [selected, setSelected]     = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialProjects && Array.isArray(initialProjects) && initialProjects.length > 0) {
      setProjects(initialProjects);
    } else {
      fetch(`${API_BASE_URL}/projects`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        })
        .catch(() => {});
    }
  }, [initialProjects]);

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

