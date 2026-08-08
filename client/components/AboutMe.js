'use client';

import { motion } from 'framer-motion';
import { Heart, Compass, Code, Activity, Palette, Camera, Headphones, Sparkles, UserCheck } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' } }),
};

const HOBBIES_DEFAULT = [
  { name: 'Competitive Tennis', description: 'Weekend matches & staying active outdoors', icon: Activity },
  { name: 'Digital Painting', description: 'Creating concept art & UI illustrations', icon: Palette },
  { name: 'Landscape Photography', description: 'Capturing natural scenery & urban architecture', icon: Camera },
  { name: 'Music Production', description: 'Synthesizing lo-fi beats & ambient soundscapes', icon: Headphones },
];

export default function AboutMe({ bio }) {
  const about = bio?.aboutMe || {
    journey: "My programming journey began at Programming Hero, when I wrote my first HTML & CSS code to create a website with a simple HTML. What started as a mere curiosity quickly grew into a deep passion for software engineering. Over the years, I have completed my degree in Computer Science, contributed to open-source tools, and built production-grade microservices serving thousands of daily active users. I am previously a Hardware and Networking Expart. I have over 15 years of experience in Hardware and Networking. I work for a company as a Hardware, Networking & Software Department Head",
    workEnjoyed: "I thrive solving complex backend challenges — optimizing query performance, building resilient RESTful APIs, and crafting fluid frontend experiences using Next.js, Tailwind CSS, and DaisyUI.",
    hobbies: HOBBIES_DEFAULT,
  };

  const hobbies = about.hobbies?.length ? about.hobbies : HOBBIES_DEFAULT;

  const getIcon = (name) => {
    if (name.includes('Tennis') || name.includes('Sport')) return <Activity className="w-5 h-5 text-emerald-400" />;
    if (name.includes('Paint') || name.includes('Art')) return <Palette className="w-5 h-5 text-pink-400" />;
    if (name.includes('Photo')) return <Camera className="w-5 h-5 text-cyan-400" />;
    return <Headphones className="w-5 h-5 text-violet-400" />;
  };

  return (
    <section id="about-me" className="py-28 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>

      {/* Ambient */}
      <div className="glow-orb w-72 h-72 bg-violet-700/12 -right-16 top-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-pill mb-4">
            <Heart className="w-3.5 h-3.5" /> Personal Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            About <span className="text-gradient">Me & My Journey</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Beyond lines of code — who I am, my background, and what drives my creativity.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: <Compass className="w-6 h-6" />,
              color: 'text-violet-400',
              bg: 'rgba(139,92,246,0.1)',
              title: 'My Programming Journey',
              body: about.journey,
              quote: '"Clean code is not just written for machines — it\'s crafted for human minds to read effortlessly."',
            },
            {
              icon: <Code className="w-6 h-6" />,
              color: 'text-pink-400',
              bg: 'rgba(236,72,153,0.1)',
              title: 'The Work I Enjoy',
              body: about.workEnjoyed,
              chips: ['Clean Architecture', 'Scalable Express APIs'],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.4)' }}
              className="glow-card rounded-2xl p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: card.bg }}>
                  <span className={card.color}>{card.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
              </div>
              {card.quote && (
                <div className="px-4 py-3 rounded-xl flex items-start gap-3"
                  style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">{card.quote}</p>
                </div>
              )}
              {card.chips && (
                <div className="grid grid-cols-2 gap-3">
                  {card.chips.map((c, ci) => (
                    <div key={ci} className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.12)' }}>
                      <UserCheck className="w-4 h-4 text-violet-400 shrink-0" />
                      <span className="text-xs text-slate-300 font-mono">{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Hobbies */}
        <motion.div {...fadeUp(0.1)}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Hobbies & Interests Outside Coding</h3>
            <p className="text-slate-500 text-xs font-mono mt-1">Staying inspired, active, and creative away from the keyboard</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hobbies.map((h, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, borderColor: 'rgba(139,92,246,0.45)' }}
                className="glow-card rounded-2xl p-6 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  {getIcon(h.name)}
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors mb-1">{h.name}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
