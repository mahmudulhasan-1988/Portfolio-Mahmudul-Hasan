'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2 } from 'lucide-react';

const DEFAULT_EXP = [
  {
    _id: '1',
    role: 'Senior Full-Stack Engineer',
    company: 'Badsha Textiles Ltd.',
    period: '2022 – Present',
    description: 'Led architecture and development of microservices-based SaaS platforms, serving 50k+ monthly active users. Built scalable Express.js APIs with native MongoDB drivers, implemented Redis caching layers, and reduced average API response time by 60%.',
    technologies: ['Next.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'AWS'],
  },
  {
    _id: '2',
    role: 'Full-Stack Developer',
    company: 'Pioneer Denim Limited',
    period: '2020 – 2022',
    description: 'Developed responsive web applications and REST APIs for 15+ client projects. Collaborated with designers to build pixel-perfect UI components using React and Tailwind CSS. Maintained CI/CD pipelines using GitHub Actions.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GitHub Actions'],
  },
  {
    _id: '3',
    role: 'Junior Web Developer',
    company: 'Kamal Yarn Limited',
    period: '2019 – 2020',
    description: 'Built and maintained client websites using React and Node.js. Implemented RESTful APIs, debugged production issues, and improved page load performance by 40% through image optimization and lazy loading.',
    technologies: ['HTML', 'CSS', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MySQL', 'CSS3', 'JavaScript'],
  },
];

export default function Experience({ initialExperiences }) {
  const [experiences, setExperiences] = useState(initialExperiences?.length ? initialExperiences : []);

  useEffect(() => {
    if (!experiences.length) {
      fetch('http://localhost:5000/api/experience')
        .then(r => r.json()).then(setExperiences).catch(() => setExperiences(DEFAULT_EXP));
    }
  }, []);

  const list = experiences.length ? experiences : DEFAULT_EXP;

  return (
    <section id="experience" className="py-28 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>

      <div className="glow-orb w-80 h-80 bg-violet-700/12 -left-16 top-1/3" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-pill mb-4"><Briefcase className="w-3.5 h-3.5" /> Career Track</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Key positions, backend engineering achievements, and project leadership milestones.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative timeline-purple ml-4 md:ml-36 space-y-10 pl-0">
          {list.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
              className="relative pl-10"
            >
              {/* Timeline dot */}
              <div className="timeline-dot absolute -left-[17px] top-5 w-8 h-8 rounded-full flex items-center justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
              </div>

              {/* Date label — desktop */}
              <div className="hidden md:block absolute -left-40 top-4 text-right w-32">
                <span className="text-xs font-mono text-slate-500 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  {exp.period}
                </span>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(139,92,246,0.45)', boxShadow: '0 0 30px rgba(139,92,246,0.1)' }}
                className="glow-card rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                      <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="text-violet-300 font-medium">{exp.company}</span>
                    </div>
                  </div>
                  {/* Mobile date */}
                  <span className="md:hidden text-xs font-mono text-slate-500 px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)' }}>
                    {exp.period}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies?.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-[0.68rem] font-mono text-violet-300"
                      style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.16)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
