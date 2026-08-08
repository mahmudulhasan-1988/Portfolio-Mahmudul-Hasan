'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle2, AlertCircle, User, Tag, MessageSquare } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.6, delay, ease: 'easeOut' },
});

export default function Contact({ bio }) {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState(null);

  const email    = bio?.email    || 'engr.mharif24@gmail.com';
  const phone    = bio?.phone    || '+8801811562080';
  const whatsapp = bio?.whatsapp || '+8801811562080';
  const location = bio?.location || 'Jamirdia, Square Mastarbari, Valuka, Mymensingh, Bangladesh.';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const res  = await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ ok: true,  msg: 'Message sent! I\'ll get back to you shortly.' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ ok: false, msg: data.error || 'Failed to send. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Could not reach the server. Make sure it\'s running.' });
    } finally { setLoading(false); }
  };

  const contacts = [
    {
      href:  `mailto:${email}`,
      Icon:  Mail, label: 'Email Address', value: email,
      color: 'text-violet-400', bg: 'rgba(139,92,246,0.1)', hover: 'hover:border-violet-500/40',
    },
    {
      href:  `tel:${phone}`,
      Icon:  Phone, label: 'Phone Number', value: phone,
      color: 'text-pink-400', bg: 'rgba(236,72,153,0.1)', hover: 'hover:border-pink-500/40',
    },
    {
      href:  `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
      Icon:  MessageCircle, label: 'WhatsApp', value: phone,
      color: 'text-emerald-400', bg: 'rgba(52,211,153,0.1)', hover: 'hover:border-emerald-500/40',
      badge: 'Online',
    },
    {
      href:  `https://maps.google.com/?q=${encodeURIComponent(location)}`,
      Icon:  MapPin, label: 'Location', value: location,
      color: 'text-cyan-400', bg: 'rgba(6,182,212,0.1)', hover: 'hover:border-cyan-500/40',
    },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>

      <div className="glow-orb w-96 h-96 bg-violet-700/14 -right-20 bottom-0" />
      <div className="glow-orb w-72 h-72 bg-pink-600/10  -left-16  top-0"    />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-pill mb-4"><Mail className="w-3.5 h-3.5" /> Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Contact <span className="text-gradient">Me Directly</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Have a project, job opening, or technical inquiry? Let's talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left — contact info & Live Google Map */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 space-y-4">
            {contacts.map(({ href, Icon, label, value, color, bg, hover, badge }, i) => {
              const inner = (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl glow-card ${hover} transition-all group cursor-pointer`}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: bg }}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] text-slate-500 font-mono mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-white truncate flex items-center gap-2">
                      {value}
                      {badge && (
                        <span className="text-[0.6rem] font-bold text-emerald-400 px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}>
                          {badge}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
              return href
                ? <motion.a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" whileHover={{ x: 4 }}>{inner}</motion.a>
                : <div key={i}>{inner}</div>;
            })}

            {/* Live Google Map Card */}
            <div className="glow-card rounded-2xl p-2 border-pulse overflow-hidden mt-4">
              <div className="relative w-full h-60 rounded-xl overflow-hidden border border-violet-500/20">
                <iframe
                  title="Live Location Map"
                  src="https://maps.google.com/maps?q=Jamirdia,%20Square%20Mastarbari,%20Valuka,%20Mymensingh,%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-7">
            <div className="glow-card rounded-2xl p-8 border-pulse">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-400" /> Send a Message
              </h3>

              {/* Status banner */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-3 p-4 rounded-xl mb-5 text-sm ${status.ok ? 'text-emerald-300' : 'text-red-300'}`}
                  style={{
                    background: status.ok ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)',
                    border:     status.ok ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(248,113,113,0.25)',
                  }}
                >
                  {status.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  {status.msg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                      <User className="w-3 h-3" /> Your Name *
                    </label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="John Doe" className="purple-input" />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email Address *
                    </label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="john@example.com" className="purple-input" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Subject
                  </label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Project Opportunity / Technical Inquiry" className="purple-input" />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Message *
                  </label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Describe your project or inquiry in detail…"
                    className="purple-input resize-none" />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-glow w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <span className="loading loading-spinner loading-sm" />
                    : <><Send className="w-4 h-4" /> Send Message</>
                  }
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
