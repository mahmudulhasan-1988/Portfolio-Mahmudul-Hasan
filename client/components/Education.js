'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Building2, BookOpen } from 'lucide-react';

const DEFAULT_EDU = [
  {
    degree: 'Bachelor of Science in Computer Science & Engineering (B.Sc)',
    institution: 'Daffodil International University, Dhaka',
    period: '2007 – 2010',
    gpa: '3.14 / 4.0 (Magna Cum Laude)',
    highlights: 'Specialized in Distributed Systems, Database Optimization, and Software Architecture. Served as Lead Tech VP of the ACM Student Chapter.',
    keyCourses: ['Data Structures & Algorithms', 'Database Systems', 'Web Architecture', 'Distributed Systems'],
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Savar Cantonment Public School & College, Dhaka',
    period: '2004 – 2006',
    gpa: '4.60 / 5.0 (Full Marks in Science)',
    highlights: 'Top 1% in State Mathematics and Computer Programming Olympiad.',
    keyCourses: ['Advanced Mathematics', 'Physics', 'Computer Fundamentals'],
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Savar Cantonment Public School & College, Dhaka',
    period: '2002 – 2004',
    gpa: '3.56 / 5.0 (Full Marks in Science)',
    highlights: 'Top 1% in State Mathematics and Computer Programming Olympiad.',
    keyCourses: ['Advanced Mathematics', 'Physics', 'Computer Fundamentals'],
  },
];

const cardV = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' } }),
};

export default function Education({ educationList }) {
  const list = (educationList?.length ? educationList : DEFAULT_EDU);

  return (
    <section id="education" className="py-28 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>

      <div className="glow-orb w-72 h-72 bg-cyan-600/10 -right-10 top-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-pill mb-4"><GraduationCap className="w-3.5 h-3.5" /> Academic Background</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Educational <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Academic achievements, degree specializations, and coursework foundations.
          </p>
        </motion.div>

        {/* Grid: 3 Cards Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((edu, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardV}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: 'rgba(139,92,246,0.45)', boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}
              className="glow-card rounded-2xl p-7 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Icon + Period */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <GraduationCap className="w-6 h-6 text-violet-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.14)' }}>
                    {edu.period}
                  </span>
                </div>

                {/* Degree & Institution */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-violet-200 transition-colors leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="flex items-center gap-1.5 text-slate-400 text-sm mt-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {edu.institution}
                  </p>
                </div>

                {/* GPA badge */}
                <div className="inline-block px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-emerald-300"
                  style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.22)' }}>
                  GPA: {edu.gpa}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{edu.highlights}</p>
              </div>

              {/* Key Courses */}
              {edu.keyCourses?.length > 0 && (
                <div className="pt-4" style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>
                  <p className="flex items-center gap-1.5 text-[0.68rem] font-mono text-slate-500 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-violet-500" /> Core Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.keyCourses.map((course, ci) => (
                      <span key={ci} className="px-2.5 py-1 rounded-md text-[0.68rem] font-mono text-slate-400"
                        style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.13)' }}>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
