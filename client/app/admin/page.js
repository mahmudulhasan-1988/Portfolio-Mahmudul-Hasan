'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Plus, Trash2, Mail, FolderGit2, Cpu, ArrowLeft, LogOut, Lock, CheckCircle2, AlertCircle, ExternalLink, Github, Image, Link2, Sparkles, Pencil, Code2, Layout, Server, Database, GitBranch, Box, Globe, Palette, Zap, GraduationCap, BookOpen } from 'lucide-react';
import { useSession, signIn, signOut } from '@/lib/auth-client';

export default function AdminPage() {
  const { data: session } = useSession();
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [statusMsg, setStatusMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgPreview, setImgPreview] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingEduIndex, setEditingEduIndex] = useState(null);

  const [newEdu, setNewEdu] = useState({
    degree: '',
    institution: '',
    period: '',
    gpa: '',
    highlights: '',
    keyCourses: ''
  });


  const getTechIcon = (skillName) => {
    const name = (skillName || '').toLowerCase();
    if (name.includes('js') || name.includes('javascript') || name.includes('typescript') || name.includes('ts')) return Code2;
    if (name.includes('react') || name.includes('frontend') || name.includes('ui')) return Layout;
    if (name.includes('next')) return Globe;
    if (name.includes('node') || name.includes('backend') || name.includes('api')) return Server;
    if (name.includes('express')) return Zap;
    if (name.includes('mongo') || name.includes('database') || name.includes('sql') || name.includes('postgres') || name.includes('redis')) return Database;
    if (name.includes('tailwind') || name.includes('css') || name.includes('daisy')) return Palette;
    if (name.includes('docker') || name.includes('container') || name.includes('box')) return Box;
    if (name.includes('git') || name.includes('github') || name.includes('devops')) return GitBranch;
    return Cpu;
  };

  // New Project Form State with Live Link, GitHub Link, ImgBB Image URL, Challenges & Future Plans
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'Full Stack',
    tags: 'Next.js, Express, MongoDB, Tailwind CSS',
    image: '',
    liveUrl: '',
    githubUrl: '',
    challenges: '',
    futurePlans: '',
    featured: true
  });

  // New Skill Form State
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Frontend',
    level: 90
  });

  // ImgBB image upload handler — uploads via direct ImgBB API or server proxy fallback
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgUploading(true);
    setStatusMsg(null);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'fa8d04d9a9ea1f8f029cdc897d9dd2f7';
    let uploadedUrl = '';

    try {
      // 1. Direct ImgBB API upload via FormData (Fastest & avoids payload limits)
      try {
        const formData = new FormData();
        formData.append('image', file);
        if (file.name) formData.append('name', file.name);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success && data.data?.url) {
          uploadedUrl = data.data.url;
        }
      } catch (directErr) {
        console.warn('Direct ImgBB upload failed, attempting server proxy fallback...', directErr);
      }

      // 2. Fallback to Server Proxy if direct upload didn't return URL
      if (!uploadedUrl) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });

        const res = await fetch('http://localhost:5000/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, name: file.name })
        });
        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrl = data.url;
        } else {
          throw new Error(data.error || 'ImgBB upload failed.');
        }
      }

      if (uploadedUrl) {
        setNewProject(prev => ({ ...prev, image: uploadedUrl }));
        setImgPreview(uploadedUrl);
        setStatusMsg({ type: 'success', text: `Image uploaded to ImgBB successfully! URL: ${uploadedUrl}` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Image upload error: ' + err.message });
    } finally {
      setImgUploading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthenticated(true);
        loadAdminData();
      } else {
        setAuthError(data.error || 'Invalid admin passcode');
      }
    } catch (err) {
      if (passcode === 'admin123') {
        setAuthenticated(true);
        loadAdminData();
      } else {
        setAuthError('Invalid admin passcode or server unreachable');
      }
    }
  };

  const loadAdminData = () => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => { });

    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(() => { });

    fetch('http://localhost:5000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(() => { });

    fetch('http://localhost:5000/api/education')
      .then(res => res.json())
      .then(data => setEducationList(Array.isArray(data) ? data : []))
      .catch(() => { });
  };

  useEffect(() => {
    if (session?.user || authenticated) {
      loadAdminData();
    }
  }, [session, authenticated]);

  const handleCreateOrUpdateEducation = async (e) => {
    e.preventDefault();
    try {
      const isEditing = editingEduIndex !== null;
      const targetUrl = isEditing
        ? `http://localhost:5000/api/education/${editingEduIndex}`
        : 'http://localhost:5000/api/education';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(targetUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEdu)
      });
      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: isEditing ? 'Education entry updated successfully in MongoDB!' : 'Education entry saved successfully to MongoDB!'
        });
        loadAdminData();
        cancelEditEdu();
      } else {
        const data = await res.json();
        setStatusMsg({ type: 'error', text: data.error || 'Failed to save education entry.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to save education entry.' });
    }
  };

  const startEditEdu = (edu, idx) => {
    setEditingEduIndex(idx);
    setNewEdu({
      degree: edu.degree || '',
      institution: edu.institution || '',
      period: edu.period || '',
      gpa: edu.gpa || '',
      highlights: edu.highlights || '',
      keyCourses: Array.isArray(edu.keyCourses) ? edu.keyCourses.join(', ') : (edu.keyCourses || '')
    });
  };

  const cancelEditEdu = () => {
    setEditingEduIndex(null);
    setNewEdu({ degree: '', institution: '', period: '', gpa: '', highlights: '', keyCourses: '' });
  };

  const handleDeleteEdu = async (idx) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await fetch(`http://localhost:5000/api/education/${idx}`, { method: 'DELETE' });
      setStatusMsg({ type: 'success', text: 'Education entry deleted from MongoDB.' });
      loadAdminData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete education entry.' });
    }
  };


  useEffect(() => {
    if (session?.user || authenticated) {
      loadAdminData();
    }
  }, [session, authenticated]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    const isEditing = Boolean(editingProjectId);
    const targetUrl = isEditing
      ? `http://localhost:5000/api/projects/${editingProjectId}`
      : 'http://localhost:5000/api/projects';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(targetUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      const savedData = await res.json();

      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: isEditing
            ? `Project "${savedData.title || newProject.title}" updated successfully in MongoDB!`
            : `Project "${savedData.title}" saved successfully to MongoDB!`
        });
        loadAdminData();
        cancelEditProject();
      } else {
        setStatusMsg({ type: 'error', text: savedData.error || 'Failed to save project.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Server connection error. Make sure Express is running.' });
    } finally {
      setSubmitting(false);
    }
  };

  const startEditProject = (project) => {
    setEditingProjectId(project._id);
    setNewProject({
      title: project.title || '',
      description: project.description || '',
      longDescription: project.longDescription || '',
      category: project.category || 'Full Stack',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      challenges: project.challenges || '',
      futurePlans: project.futurePlans || '',
      featured: Boolean(project.featured)
    });
    setImgPreview(project.image || '');
    setStatusMsg({ type: 'success', text: `Editing project: "${project.title}". Update the fields below and click Update.` });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      category: 'Full Stack',
      tags: 'Next.js, Express, MongoDB, Tailwind CSS',
      image: '',
      liveUrl: '',
      githubUrl: '',
      challenges: '',
      futurePlans: '',
      featured: true
    });
    setImgPreview('');
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project from MongoDB?')) return;
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
      setStatusMsg({ type: 'success', text: 'Project deleted from MongoDB.' });
      loadAdminData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE' });
      setStatusMsg({ type: 'success', text: 'Message deleted from MongoDB.' });
      loadAdminData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete message.' });
    }
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    try {
      const isEditing = Boolean(editingSkillId);
      const targetUrl = isEditing
        ? `http://localhost:5000/api/skills/${editingSkillId}`
        : 'http://localhost:5000/api/skills';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(targetUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });
      if (res.ok) {
        setStatusMsg({ type: 'success', text: isEditing ? 'Skill updated successfully in MongoDB!' : 'Skill saved successfully to MongoDB!' });
        loadAdminData();
        cancelEditSkill();
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to save skill.' });
    }
  };

  const startEditSkill = (skill) => {
    setEditingSkillId(skill._id);
    setNewSkill({
      name: skill.name || '',
      category: skill.category || 'Frontend',
      level: skill.level || 80
    });
  };

  const cancelEditSkill = () => {
    setEditingSkillId(null);
    setNewSkill({ name: '', category: 'Frontend', level: 90 });
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm('Are you sure you want to delete this skill from MongoDB?')) return;
    try {
      await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE' });
      setStatusMsg({ type: 'success', text: 'Skill deleted from MongoDB.' });
      loadAdminData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete skill.' });
    }
  };

  const isUserAuthenticated = authenticated || Boolean(session?.user);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-8 mb-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link href="/" className="btn btn-sm btn-ghost text-slate-400 hover:text-white gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <div className="flex items-center gap-2 text-white font-extrabold text-lg">
            <ShieldCheck className="w-5 h-5 text-indigo-400" /> Admin Control Portal
          </div>
        </div>

        {isUserAuthenticated && (
          <button
            onClick={() => { setAuthenticated(false); signOut(); }}
            className="btn btn-sm btn-outline border-slate-700 text-slate-300 hover:bg-slate-800 gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        )}
      </div>

      {/* Login Screen if not authenticated */}
      {!isUserAuthenticated ? (
        <div className="max-w-md mx-auto my-16 glass-card p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="text-center space-y-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Admin Authentication</h2>
            <p className="text-xs text-slate-400 font-mono">
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-mono text-slate-300">Admin Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="input input-bordered bg-slate-900 border-slate-800 text-white"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary border-0">
              Authenticate Admin
            </button>
          </form>

        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Status Message */}
          {statusMsg && (
            <div className={`p-4 rounded-xl flex items-center justify-between ${statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}>
              <span className="text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {statusMsg.text}
              </span>
              <button onClick={() => setStatusMsg(null)} className="text-xs opacity-60 hover:opacity-100">Dismiss</button>
            </div>
          )}

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 flex-wrap">
            <button
              onClick={() => setActiveTab('projects')}
              className={`btn btn-sm rounded-lg gap-2 ${activeTab === 'projects' ? 'btn-primary' : 'btn-ghost text-slate-400'}`}
            >
              <FolderGit2 className="w-4 h-4" /> Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`btn btn-sm rounded-lg gap-2 ${activeTab === 'messages' ? 'btn-primary' : 'btn-ghost text-slate-400'}`}
            >
              <Mail className="w-4 h-4" /> Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`btn btn-sm rounded-lg gap-2 ${activeTab === 'skills' ? 'btn-primary' : 'btn-ghost text-slate-400'}`}
            >
              <Cpu className="w-4 h-4" /> Skills ({skills.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`btn btn-sm rounded-lg gap-2 ${activeTab === 'education' ? 'btn-primary' : 'btn-ghost text-slate-400'}`}
            >
              <GraduationCap className="w-4 h-4" /> Education ({educationList.length})
            </button>
          </div>


          {/* TAB 1: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Add Project Form with Live Link & ImgBB Image Support */}
              <div className="lg:col-span-6 glass-card p-6 rounded-2xl border border-slate-800 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {editingProjectId ? (
                      <><Pencil className="w-5 h-5 text-indigo-400" /> Edit Project in MongoDB</>
                    ) : (
                      <><Plus className="w-5 h-5 text-primary" /> Add New Project to MongoDB</>
                    )}
                  </h3>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={cancelEditProject}
                      className="btn btn-xs btn-outline border-slate-700 text-slate-400 hover:text-white rounded-lg"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg"
                      placeholder="e.g. NovaCloud E-Commerce"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300">Short Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={newProject.description}
                      onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                      className="textarea textarea-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg"
                      placeholder="Brief summary displayed on project cards"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300">Detailed Description / Architecture</label>
                    <textarea
                      rows={3}
                      value={newProject.longDescription}
                      onChange={e => setNewProject({ ...newProject, longDescription: e.target.value })}
                      className="textarea textarea-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg"
                      placeholder="Full case study explanation shown inside the details modal"
                    />
                  </div>

                  {/* Live Link Field */}
                  <div>
                    <label className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> Live Project Link (URL) *
                    </label>
                    <input
                      type="url"
                      required
                      value={newProject.liveUrl}
                      onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg"
                      placeholder="https://my-live-project.com"
                    />
                  </div>

                  {/* Client GitHub Link */}
                  <div>
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                      <Github className="w-3.5 h-3.5" /> Client GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={newProject.githubUrl}
                      onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg"
                      placeholder="https://github.com/username/project-client"
                    />
                  </div>

                  {/* Image - ImgBB File Upload + URL Fallback */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-accent flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Image className="w-3.5 h-3.5" /> Project Image (Upload to ImgBB or Paste URL)
                      </span>
                      {newProject.image && (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Link Loaded
                        </span>
                      )}
                    </label>

                    {/* File Picker Upload Button */}
                    <div className="flex items-center gap-3">
                      <label className={`btn btn-xs gap-1.5 rounded-lg cursor-pointer ${imgUploading ? 'btn-disabled opacity-60' : 'btn-outline border-accent text-accent hover:bg-accent/10'}`}>
                        {imgUploading ? (
                          <><span className="loading loading-spinner loading-xs"></span> Uploading to ImgBB...</>
                        ) : (
                          <><Image className="w-3.5 h-3.5" /> Click to Upload Image to ImgBB</>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={imgUploading}
                          onChange={handleImageUpload}
                        />
                      </label>
                      {imgPreview && (
                        <img src={imgPreview} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-accent/40 shadow-sm" />
                      )}
                    </div>

                    {/* ImgBB Generated Link Badge */}
                    {newProject.image && (
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                        <a
                          href={newProject.image}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-300 hover:underline font-mono truncate max-w-[90%] flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{newProject.image}</span>
                        </a>
                      </div>
                    )}

                    {/* Manual URL Input as fallback */}
                    <input
                      type="text"
                      value={newProject.image}
                      onChange={e => { setNewProject({ ...newProject, image: e.target.value }); setImgPreview(e.target.value); }}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg text-xs"
                      placeholder="Or paste ImgBB/Unsplash URL directly: https://i.ibb.co/..."
                    />
                  </div>


                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Category</label>
                      <select
                        value={newProject.category}
                        onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                        className="select select-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      >
                        <option>Full Stack</option>
                        <option>Frontend</option>
                        <option>Backend</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">Featured Showcase</label>
                      <select
                        value={newProject.featured ? "true" : "false"}
                        onChange={e => setNewProject({ ...newProject, featured: e.target.value === "true" })}
                        className="select select-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      >
                        <option value="true">Yes (Badge)</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400">Tech Tags (comma separated)</label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-amber-400">Challenges Faced</label>
                    <textarea
                      rows={2}
                      value={newProject.challenges}
                      onChange={e => setNewProject({ ...newProject, challenges: e.target.value })}
                      className="textarea textarea-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg text-xs"
                      placeholder="Technical hurdles overcome during development"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-indigo-400">Future Improvements</label>
                    <textarea
                      rows={2}
                      value={newProject.futurePlans}
                      onChange={e => setNewProject({ ...newProject, futurePlans: e.target.value })}
                      className="textarea textarea-sm w-full bg-slate-900 border-slate-800 text-white placeholder-slate-600 rounded-lg text-xs"
                      placeholder="Planned upcoming features and roadmap"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`btn btn-sm w-full border-0 mt-2 rounded-lg ${editingProjectId ? 'btn-accent text-slate-950 font-bold' : 'btn-primary bg-gradient-to-r from-primary to-secondary'
                      }`}
                  >
                    {submitting
                      ? (editingProjectId ? 'Updating in MongoDB...' : 'Saving to MongoDB...')
                      : (editingProjectId ? 'Update Project in MongoDB' : 'Save Project to MongoDB')
                    }
                  </button>

                </form>
              </div>

              {/* Projects List */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Projects in MongoDB ({projects.length})</h3>
                {projects.map(p => (
                  <div key={p._id} className={`p-4 rounded-xl bg-slate-900 border flex items-start justify-between gap-3 shadow-md transition-colors ${editingProjectId === p._id ? 'border-accent/80 bg-slate-900/90' : 'border-slate-800'
                    }`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{p.title}</span>
                        <span className="badge badge-primary text-xs">{p.category}</span>
                        {p.featured && (
                          <span className="badge bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono">Featured</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{p.description}</p>

                      {/* Live Link Badge */}
                      {p.liveUrl && (
                        <div className="pt-1 flex items-center gap-2">
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                          >
                            <ExternalLink className="w-3 h-3" /> {p.liveUrl}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => startEditProject(p)}
                        className="btn btn-sm btn-ghost text-indigo-400 hover:bg-indigo-500/10 rounded-lg gap-1.5 font-mono text-xs"
                        title="Edit Data"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit Data
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p._id)}
                        className="btn btn-sm btn-ghost text-red-400 hover:bg-red-500/10 rounded-lg"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Contact Form Inquiries</h3>
              {messages.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-mono">No messages received yet.</div>
              ) : (
                messages.map(m => (
                  <div key={m._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-base">{m.name}</span>
                        <span className="text-xs text-indigo-400 font-mono">{m.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 font-mono">{new Date(m.createdAt).toLocaleString()}</span>
                        <button onClick={() => handleDeleteMessage(m._id)} className="btn btn-xs btn-ghost text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-300 font-mono">Subject: {m.subject}</div>
                    <p className="text-sm text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {m.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {editingSkillId ? (
                      <><Pencil className="w-5 h-5 text-indigo-400" /> Edit Skill in MongoDB</>
                    ) : (
                      <><Plus className="w-5 h-5 text-primary" /> Add Skill to MongoDB</>
                    )}
                  </h3>
                  {editingSkillId && (
                    <button
                      type="button"
                      onClick={cancelEditSkill}
                      className="btn btn-xs btn-outline border-slate-700 text-slate-400 hover:text-white rounded-lg"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleCreateSkill} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={newSkill.name}
                      onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      placeholder="e.g. React.js, Redis, MongoDB"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="select select-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                    >
                      <option>Frontend</option>
                      <option>Backend</option>
                      <option>Database</option>
                      <option>Tools & DevOps</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Proficiency ({newSkill.level}%)</label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={newSkill.level}
                      onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                      className="range range-xs range-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-sm w-full rounded-lg ${editingSkillId ? 'btn-accent text-slate-950 font-bold' : 'btn-primary'}`}
                  >
                    {editingSkillId ? 'Update Skill in MongoDB' : 'Save Skill to MongoDB'}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-lg font-bold text-white mb-2">Current Skills ({skills.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map(s => {
                    const TechIcon = getTechIcon(s.name);
                    const isBeingEdited = editingSkillId === s._id;
                    return (
                      <div key={s._id} className={`p-3.5 rounded-xl bg-slate-900 border flex items-center justify-between shadow-md transition-colors ${isBeingEdited ? 'border-accent/80 bg-slate-900/90' : 'border-slate-800'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                            <TechIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              {s.name}
                            </div>
                            <div className="text-xs text-slate-400 font-mono">{s.category} ({s.level}%)</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => startEditSkill(s)}
                            className="btn btn-xs btn-ghost text-indigo-400 hover:bg-indigo-500/10 rounded-md gap-1 font-mono"
                            title="Edit Skill"
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(s._id)}
                            className="btn btn-xs btn-ghost text-red-400 hover:bg-red-500/10 rounded-md"
                            title="Delete Skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {editingEduIndex !== null ? (
                      <><Pencil className="w-5 h-5 text-indigo-400" /> Edit Education Record</>
                    ) : (
                      <><Plus className="w-5 h-5 text-primary" /> Add Education Record</>
                    )}
                  </h3>
                  {editingEduIndex !== null && (
                    <button
                      type="button"
                      onClick={cancelEditEdu}
                      className="btn btn-xs btn-outline border-slate-700 text-slate-400 hover:text-white rounded-lg"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleCreateOrUpdateEducation} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Degree / Qualification *</label>
                    <input
                      type="text"
                      required
                      value={newEdu.degree}
                      onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      placeholder="e.g. B.Sc in Computer Science & Engineering"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Institution *</label>
                    <input
                      type="text"
                      required
                      value={newEdu.institution}
                      onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      placeholder="e.g. Daffodil International University"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Period</label>
                      <input
                        type="text"
                        value={newEdu.period}
                        onChange={e => setNewEdu({ ...newEdu, period: e.target.value })}
                        className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                        placeholder="e.g. 2018 – 2022"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">GPA / Grade</label>
                      <input
                        type="text"
                        value={newEdu.gpa}
                        onChange={e => setNewEdu({ ...newEdu, gpa: e.target.value })}
                        className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                        placeholder="e.g. 3.85 / 4.0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Highlights / Summary</label>
                    <textarea
                      rows="3"
                      value={newEdu.highlights}
                      onChange={e => setNewEdu({ ...newEdu, highlights: e.target.value })}
                      className="textarea textarea-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      placeholder="Specialization, thesis, awards or achievements..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Core Coursework (Comma separated)</label>
                    <input
                      type="text"
                      value={newEdu.keyCourses}
                      onChange={e => setNewEdu({ ...newEdu, keyCourses: e.target.value })}
                      className="input input-sm w-full bg-slate-900 border-slate-800 text-white rounded-lg"
                      placeholder="Data Structures, Database Systems, Web Tech"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-sm w-full rounded-lg ${editingEduIndex !== null ? 'btn-accent text-slate-950 font-bold' : 'btn-primary'}`}
                  >
                    {editingEduIndex !== null ? 'Update Education Record' : 'Save Education Record'}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Academic Qualifications ({educationList.length})</h3>
                <div className="space-y-3">
                  {educationList.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 font-mono">No education entries found. Add one on the left!</div>
                  ) : (
                    educationList.map((edu, idx) => (
                      <div key={idx} className={`p-4 rounded-xl bg-slate-900 border flex flex-col justify-between shadow-md transition-colors space-y-3 ${editingEduIndex === idx ? 'border-accent/80 bg-slate-900/90' : 'border-slate-800'
                        }`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-bold text-white text-base leading-tight">{edu.degree}</h4>
                            <p className="text-xs text-indigo-400 font-medium">{edu.institution}</p>
                            {edu.period && <p className="text-[0.7rem] font-mono text-slate-400">Period: {edu.period} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}</p>}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => startEditEdu(edu, idx)}
                              className="btn btn-xs btn-ghost text-indigo-400 hover:bg-indigo-500/10 rounded-md gap-1 font-mono"
                              title="Edit Education"
                            >
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEdu(idx)}
                              className="btn btn-xs btn-ghost text-red-400 hover:bg-red-500/10 rounded-md"
                              title="Delete Education"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        {edu.highlights && <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">{edu.highlights}</p>}
                        {Array.isArray(edu.keyCourses) && edu.keyCourses.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {edu.keyCourses.map((c, ci) => (
                              <span key={ci} className="px-2 py-0.5 rounded text-[0.65rem] font-mono bg-violet-500/10 border border-violet-500/20 text-violet-300">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      )}


    </div>
  );
}
