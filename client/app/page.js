'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import MouseSpotlight from '@/components/MouseSpotlight';

export default function HomePage() {
  const [data, setData] = useState({ bio: null, projects: [], skills: [], experience: [] });

  useEffect(() => {
    async function load() {
      try {
        const [bioRes, projectsRes, skillsRes, expRes] = await Promise.all([
          fetch('http://localhost:5000/api/portfolio').catch(() => null),
          fetch('http://localhost:5000/api/projects').catch(() => null),
          fetch('http://localhost:5000/api/skills').catch(() => null),
          fetch('http://localhost:5000/api/experience').catch(() => null),
        ]);
        setData({
          bio:        bioRes?.ok      ? await bioRes.json()      : null,
          projects:   projectsRes?.ok ? await projectsRes.json() : [],
          skills:     skillsRes?.ok   ? await skillsRes.json()   : [],
          experience: expRes?.ok      ? await expRes.json()      : [],
        });
      } catch { /* use fallback state */ }
    }
    load();
  }, []);

  return (
    <>
      {/* Fixed layers — behind all content */}
      <StarBackground />
      <MouseSpotlight />

      {/* Content layer */}
      <div className="relative" style={{ zIndex: 20 }}>
        <Navbar />
        <main>
          <Hero       bio={data.bio} />
          <AboutMe    bio={data.bio} />
          <Skills     initialSkills={data.skills} />
          <Projects   initialProjects={data.projects} />
          <Experience initialExperiences={data.experience} />
          <Education  educationList={data.bio?.education} />
          <Contact    bio={data.bio} />
        </main>
        <Footer />
      </div>
    </>
  );
}
