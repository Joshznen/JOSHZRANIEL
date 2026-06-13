import React, { useState, useMemo, useEffect, useRef, FormEvent } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import {
  Network,
  Database,
  Bot,
  Play,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Github,
  Download,
  Check,
  ExternalLink,
  FileText,
  Menu,
  X,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Info,
  Eye,
  CheckCircle2,
  Lock,
  Sun,
  Moon,
  Terminal,
  Shield,
  Sparkles,
  Zap,
  Layout,
  Globe,
  Clock,
  Facebook,
  Handshake,
  Send,
  Linkedin
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

import {
  personalInfo,
  experiences,
  skillCategories,
  achievements,
  seminars,
  projects,
  educationHistory,
  services,
  certifications
} from './data';

import { Project, Service } from './types';

import DentistrySystemScreenshots from './components/DentistrySystemScreenshots';
import EcommerceWebScreenshots from './components/EcommerceWebScreenshots';
import AdobeXdRecordings from './components/AdobeXdRecordings';
import MarketFreelancerScreenshots from './components/MarketFreelancerScreenshots';

// Import the static PDF
import cvPdfUrl from './assets/IT SUPPORT_MARASIGAN_CV.pdf';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'IT' | 'Networking' | 'Database' | 'Multimedia' | 'UI/UX' | 'AI' | 'Full-Stack'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageCarouselIdx, setImageCarouselIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = () => {
    // Trigger a native browser download of the static PDF file
    const link = document.createElement('a');
    link.href = cvPdfUrl;
    link.download = 'Joshz_Raniel_Marasigan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Loading screen state
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Interactive Scroll Companion & Click Ripple states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScrollSection, setActiveScrollSection] = useState<'Hero' | 'About' | 'Projects' | 'Certs' | 'Contact'>('Hero');
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: 'bot'|'user', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; tag: string }[]>([]);

  const clickTags = useMemo(() => [
    "+1 Click Signal", "Cisco OSPF Setup", "OpenAI Core System", "Live Multimedia Wire",
    "Creative Packaging Dieline", "PostgreSQL Entity Schema", "Adaptive Spark", "Custom UI Node",
    "Figma Color Token", "Canva Poster Edit", "Google IT Diagnostic", "Rapid Full-Stack Render",
    "No-Code Command", "Ping Trace Done", "VLAN Connected", "IP Routed", "4K Vector Graphic",
    "IBM Neural Training Model"
  ], []);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const randomTag = clickTags[Math.floor(Math.random() * clickTags.length)];
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      tag: randomTag,
    };
    setRipples(prev => [...prev.slice(-12), newRipple]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.round(progress));

      const scrollY = window.scrollY;
      if (scrollY < 400) {
        setActiveScrollSection('Hero');
      } else if (scrollY >= 400 && scrollY < 1200) {
        setActiveScrollSection('About');
      } else if (scrollY >= 1200 && scrollY < 2400) {
        setActiveScrollSection('Projects');
      } else if (scrollY >= 2400 && scrollY < 3600) {
        setActiveScrollSection('Certs');
      } else {
        setActiveScrollSection('Contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading screen effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ripples.length === 0) return;
    const cleanupTimer = setTimeout(() => {
      setRipples(prev => prev.filter(r => Date.now() - r.id < 600));
    }, 600);
    return () => clearTimeout(cleanupTimer);
  }, [ripples]);

  const openProjectCase = (proj: Project) => {
    setSelectedProject(proj);
    setImageCarouselIdx(0);
  };

  const currentYear = new Date().getFullYear();
  
  // Dynamic Recruiter Focus state
  const [recruiterFocus, setRecruiterFocus] = useState<'Universal' | 'Networking' | 'Multimedia' | 'Support' | 'AI'>('Universal');

  // Contact Form & Calculator States
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [customBriefNotes, setCustomBriefNotes] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Filter projects according to category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Recruiter Pitch definitions according to focus
  const focusPitches = useMemo(() => {
    return {
      Universal: {
        tagline: "Bridging physical networks, AI-assisted full-stack development, and high-end multimedia design.",
        description: "An OpenAI junior full-stack web developer and IT support specialist from LPU Batangas, specializing in Multimedia Technology. I combine reliable IT support, foundational network configurations, and database management with an active creative eye for custom product packaging structures, promotional marketing designs, and rapid AI-powered full-stack web solutions.",
        highlights: ["AI-powered full-stack web architectures", "Cisco IT support and network essentials", "Expert Adobe, Figma, and Canva design suite"]
      },
      Networking: {
        tagline: "Setting up secure router and switch networks for small businesses and lab environments.",
        description: "Equipped with foundational Cisco CCNA Networking Academy training. I set up basic IP configurations, cabling, subnets, routers, switches, and secure local VLAN partitions to keep office networks communicating smoothly and reliably.",
        highlights: ["Cisco Routing & Switching essentials", "Small-office routing and subnets", "Secure localized static and inter-VLAN paths"]
      },
      Multimedia: {
        tagline: "Formulating physical product packaging, promotional posters, and creative graphic media.",
        description: "Specialized in Multimedia Technology at Lyceum of the Philippines University. I Excel at logo design, promotional posters, and high-impact graphic design aimed at boosting marketing and sales. I am also highly skilled in professional photoshoots, multi-media editing, and creative templates using Canva, Adobe Suite, Figma, and modern generative AI art tools.",
        highlights: ["Logo & brand identity design", "Sales-boosting posters & marketing graphics", "Professional photoshoots & visual editing"]
      },
      Support: {
        tagline: "Providing robust hardware diagnostics, X-ray machinery OJT support, and desktop troubleshooting.",
        description: "Equipped with the Google IT Support Professional Certificate. Experience interning at Casedist Inc. performing physical maintenance, learning specialized technology modules, and servicing security X-ray scanning machinery deployed at Manila Bureau of Customs (BOC), airport baggage checking stations, and port gateways.",
        highlights: ["OS installations & troubleshoot (Win/Linux)", "Rapiscan hardware & system checkups", "Technical logs & parts inventory lists"]
      },
      AI: {
        tagline: "Evaluating sequential neural classifiers and custom structured prompt systems.",
        description: "Familiar with deep learning pipelines under IBM engineering mentorship, configuring weights, loss parameters, and ethical training thresholds. As an OpenAI junior full-stack developer, I build robust frontend, backend, and database integrations assisted by AI, while leveraging generative models as powerful productivity-multipliers for any type of technical or administrative task.",
        highlights: ["AI-powered full-stack web solutions", "TensorFlow & Keras Sequential class setups", "Frictionless prompt-engineered automations"]
      }
    };
  }, []);

  const freelancerToolkit = useMemo(() => {
    return [
      {
        title: "OpenAI-Powered Web Dev",
        description: "As an OpenAI junior web developer, I build full-stack web applications with robust frontends (React/Vite, HTML, Tailwind), secure backends, and relational databases. I leverage AI tools of all kinds to build complete web systems properly and efficiently, using it as an everyday partner for coding, debugging, and general problem-solving.",
        icon: Bot,
        highlights: [
          "Full-stack layout designs",
          "Relational databases & API routes",
          "Advanced generative AI workflows"
        ]
      },
      {
        title: "IT Support & Cisco Essentials",
        description: "Specialized in computer troubleshooting, hardware setup, and OS configurations (Windows/Linux). Backed by foundational Cisco CCNA training to set up IP routing, subnet configuration, local switches, helpdesk service checkups, and standard secure VLAN segmentation.",
        icon: Cpu,
        highlights: [
          "Workstation troubleshooting & OS setups",
          "Cisco routing / switching basics",
          "Patient, natural helpdesk support"
        ]
      },
      {
        title: "Marketing & Graphic Design",
        description: "Creative designer specializing in eye-catching customized logos, sales-boosting posters, and promotional graphics that drive user action. Experienced in clean photoshoot capturing, dieline structural packaging layouts, and digital composition using Canva, Figma, and Adobe Creative Suite.",
        icon: Award,
        highlights: [
          "Sales-oriented posters & design",
          "Logo design & brand style kits",
          "Photoshoot editing & asset layouts"
        ]
      },
      {
        title: "Adaptive Self-Learning",
        description: "I am a fast learner who can adapt quickly, understand concepts fast, and remain highly flexible. This allows me to easily pick up multiple different jobs or tasks, and relate quickly to any new topics I need to learn.",
        icon: Shield,
        highlights: [
          "Quick to master proprietary tools",
          "Highly versatile freelancer mindset",
          "Reliable, self-driven troubleshooting"
        ]
      }
    ];
  }, []);

  const selectedServicesList = useMemo(() => {
    return services.filter(s => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  const generatedBriefText = useMemo(() => {
    if (selectedServicesList.length === 0) return '';
    const items = selectedServicesList.map((s, idx) => `${idx + 1}. ${s.title}`).join('\n');
    return `Hello Joshz,\n\nI reviewed your portfolio and prepared a preliminary project brief:\n\nRequested Services:\n${items}\n\nProject Scope Notes:\n${customBriefNotes || 'Looking for an initial design/IT consultation.'}\n\nPlease let me know your availability for a short intake virtual sync.\n\nRegards,\n[My Name]\n[Organization / Email]`;
  }, [selectedServicesList, customBriefNotes]);

  const toggleServiceSelection = (id: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyBrief = () => {
    if (!generatedBriefText) return;
    navigator.clipboard.writeText(generatedBriefText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    
    // Construct prefilled mailto URL to directly send to gmail
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:joshzraniel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open in window location to launch mail application
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  const handleNextCarouselImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setImageCarouselIdx(prev => (prev + 1) % max);
  };

  const handlePrevCarouselImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setImageCarouselIdx(prev => (prev - 1 + max) % max);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0b0d] text-white overflow-hidden">
        
        {/* Ambient floating orbs for loading */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />

        {/* Glassmorphic Container */}
        <div className="relative flex flex-col items-center gap-8 max-w-sm w-full px-10 py-12 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl shadow-2xl">
          
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-4 h-4">
              <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              <div className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <span className="font-serif text-xl tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-stone-400">
              Joshz Marasigan
            </span>
          </div>
          
          <div className="w-full h-[3px] bg-stone-900 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 via-cyan-400 to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
              style={{ width: `${loadingPercent}%` }}
            />
          </div>
          
          <div className="flex justify-between w-full font-mono text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
            <span>Loading Portfolio</span>
            <span className="text-emerald-400">{loadingPercent}%</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handlePageClick}
      className={`min-h-screen relative overflow-hidden ${isDarkMode ? 'dark gradient-mesh-dark text-stone-200 selection:bg-emerald-500/20 selection:text-emerald-300' : 'gradient-mesh-light text-stone-900 selection:bg-emerald-100 selection:text-emerald-950'} transition-colors duration-500`} 
      id="portfolio-root"
    >
      
      {/* Ambient floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* HEADER / NAVIGATION - Inspiro Pro/Astra combination */}
      <nav className={`fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0b0e]/90 border-emerald-500/25 text-white' : 'bg-[#faf9f5]/90 border-emerald-600/20 text-stone-900'}`} id="minimalist-nav">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex flex-col">
              <span className={`font-serif text-lg font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
                Joshz Marasigan
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-widest mt-0.5 ${isDarkMode ? 'text-[#dfbc71]' : 'text-emerald-850 font-bold'}`}>
                Portfolio // Creative & IT Solutions
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#portfolio-root" className={`text-[11px] tracking-widest uppercase font-mono transition-colors ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Home
              </a>
              <a href="#projects-section" className={`text-[11px] tracking-widest uppercase font-mono transition-colors ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Work
              </a>
              <a href="#about-section" className={`text-[11px] tracking-widest uppercase font-mono transition-colors ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Profile
              </a>
              <a href="#experience-section" className={`text-[11px] tracking-widest uppercase font-mono transition-colors ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Experience
              </a>
              <a href="#education-section" className={`text-[11px] tracking-widest uppercase font-mono transition-colors ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Academics
              </a>
              <a href="#contact-section" className={`text-[11px] tracking-widest uppercase font-mono transition-colors ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-950'}`}>
                Inquire
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Showcase Launcher Header CTA */}
              <button
                id="header-sandbox-trigger"
                onClick={() => document.getElementById('screenshots-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase transition-all cursor-pointer rounded-sm"
              >
                <Layout className="w-3.5 h-3.5" />
                <span>System Layouts</span>
              </button>

              <button
                id="nav-cv-trigger"
                onClick={() => setShowCvModal(true)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 border text-[10px] font-mono font-medium tracking-wide transition-all cursor-pointer rounded-sm ${
                  isDarkMode ? 'bg-[#15151b] border-stone-800 hover:border-stone-600 text-stone-200' : 'bg-white border-stone-200 hover:border-stone-400 text-stone-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Verify CV</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                id="theme-switcher-toggle"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer rounded-sm ${
                  isDarkMode ? 'bg-[#15151b] border-stone-800 text-amber-400 hover:bg-stone-900' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
                title={isDarkMode ? 'Switch to Light Palette' : 'Switch to Dark Palette'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile trigger */}
            <div className="md:hidden flex items-center gap-2">
              {/* Theme toggle mobile */}
              <button
                id="theme-switcher-toggle-mobile"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-8 h-8 flex items-center justify-center border transition-all cursor-pointer rounded-sm ${
                  isDarkMode ? 'bg-[#15151b] border-stone-800 text-amber-400' : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                id="mobile-nav-trigger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-1 rounded-sm text-stone-600 hover:text-stone-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-b px-6 py-6 flex flex-col gap-4 animate-fade-in transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0b0e] border-stone-800' : 'bg-[#faf9f5] border-stone-200'}`} id="mobile-menu-container">
            <a 
              href="#portfolio-root" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium border-b pb-2 ${isDarkMode ? 'border-stone-850 text-stone-200' : 'border-stone-100 text-stone-805'}`}
            >
              Home
            </a>
            <a 
              href="#projects-section" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium border-b pb-2 ${isDarkMode ? 'border-stone-850 text-stone-200' : 'border-stone-100 text-stone-805'}`}
            >
              Work
            </a>
            <a 
              href="#about-section" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium border-b pb-2 ${isDarkMode ? 'border-stone-850 text-stone-200' : 'border-stone-100 text-stone-805'}`}
            >
              Profile
            </a>
            <a 
              href="#experience-section" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium border-b pb-2 ${isDarkMode ? 'border-stone-850 text-stone-200' : 'border-stone-100 text-stone-805'}`}
            >
              Experience
            </a>
            <a 
              href="#education-section" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium border-b pb-2 ${isDarkMode ? 'border-stone-855 text-stone-200' : 'border-stone-100 text-stone-850'}`}
            >
              Academics
            </a>
            <a 
              href="#contact-section" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium border-b pb-2 ${isDarkMode ? 'border-stone-855 text-stone-200' : 'border-stone-100 text-stone-805'}`}
            >
              Inquire
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <button
                id="mobile-sandbox-trigger"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('screenshots-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-1.5 py-3 border border-emerald-500/20 bg-emerald-600/10 text-emerald-400 text-xs font-mono font-medium tracking-wide uppercase transition-all cursor-pointer rounded-sm"
              >
                <Layout className="w-4 h-4" />
                <span>View System Screenshots</span>
              </button>

              <button
                id="mobile-cv-trigger"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowCvModal(true);
                }}
                className={`flex items-center justify-center gap-1.5 py-3 border text-xs font-mono font-medium tracking-wide ${
                  isDarkMode ? 'bg-[#15151b] border-stone-800 text-stone-200' : 'bg-white border-[#2b2b2b] text-stone-800'
                }`}
              >
                <Eye className="w-4 h-4 text-stone-600" />
                <span>Verify Credentials CV</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO INTRODUCTION - Immersive Split Layout (Inspiro Pro & Astra style) */}
      <motion.header 
        initial={{ opacity: 0, rotateX: -5, y: 30 }} 
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }} 
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 sm:px-8 pt-36 pb-24" 
        id="hero-segment"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in">
          
          {/* Left Column: Typographic Presentation */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative z-10">
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] md:text-xs font-mono font-bold tracking-widest self-start uppercase rounded-sm ${
                isDarkMode ? 'bg-[#121217] border-stone-800 text-stone-300' : 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
              }`}>
                <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>IT Graduate · Lyceum of the Philippines University</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif font-extrabold tracking-tight leading-[1.05] flex flex-col">
                <span className={`text-transparent bg-clip-text ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-stone-100 via-stone-200 to-[#dfbc71]' 
                    : 'bg-gradient-to-r from-stone-900 via-stone-950 to-emerald-950'
                }`}>
                  Joshz Raniel
                </span>
                <span className={`text-transparent bg-clip-text ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-stone-200 via-[#dfbc71] to-emerald-400' 
                    : 'bg-gradient-to-r from-stone-850 via-[#1b3f22] to-emerald-800'
                }`}>
                  Marasigan
                </span>
              </h1>
              
              <div className="flex items-center gap-3">
                <span className={`h-[1px] w-8 ${isDarkMode ? 'bg-[#dfbc71]/50' : 'bg-[#1b3f22]'}`}></span>
                <p className={`font-mono text-xs md:text-sm uppercase tracking-widest leading-none ${isDarkMode ? 'text-[#dfbc71]' : 'text-emerald-805 font-bold'}`}>
                  Junior OpenAI Web Dev & IT Support Freelancer
                </p>
              </div>
            </div>

            <p className={`leading-relaxed font-sans text-sm md:text-base max-w-xl transition-all duration-305 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>
              {personalInfo.brandingStatement}
            </p>

            {/* Quick Call to Action Buttons + Sandbox Console badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects-section"
                className={`px-5 py-3 text-xs tracking-wider font-mono uppercase font-medium transition-all rounded-sm ${
                  isDarkMode 
                    ? 'bg-[#dfbc71] hover:bg-[#c9a75d] text-stone-950 font-bold' 
                    : 'bg-stone-950 hover:bg-stone-800 text-white'
                }`}
              >
                Explore Work
              </a>
              <button
                onClick={() => setShowCvModal(true)}
                className={`px-5 py-3 border font-mono font-medium text-xs tracking-wider uppercase transition-all cursor-pointer rounded-sm ${
                  isDarkMode ? 'bg-[#121217] border-stone-800 hover:border-stone-600 text-stone-200' : 'bg-white border-stone-200 hover:border-stone-400 text-stone-800'
                }`}
              >
                Verify Credentials CV
              </button>
              
              <button
                onClick={() => document.getElementById('screenshots-section')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-5 py-3 font-mono font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-sm border rounded-sm ${
                  isDarkMode 
                    ? 'bg-emerald-600/10 hover:bg-emerald-600/15 border-emerald-500/30 text-emerald-400' 
                    : 'bg-emerald-50/70 border-emerald-200 text-[#1b3f22] hover:bg-emerald-100/55'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>System Layouts</span>
              </button>
            </div>

            {/* Mini Contact Channels */}
            <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] border-t pt-5 ${
              isDarkMode ? 'text-stone-400 border-stone-850' : 'text-stone-500 border-stone-200/55'
            }`}>
              <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-1.5 transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-stone-800'}`}>
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{personalInfo.email}</span>
              </a>
              <a href={`tel:${personalInfo.phone}`} className={`flex items-center gap-1.5 transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-stone-800'}`}>
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{personalInfo.phone}</span>
              </a>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{personalInfo.location.split(',')[1].trim()}, Philippines</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stunning Framing Portrait Area (Inspiro Pro / Astra combination) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative pr-2 select-none">
            {/* Ambient luxury geometry backings */}
            <div className={`absolute inset-0 max-w-[270px] sm:max-w-[300px] aspect-[4/5] border translate-x-3 translate-y-3 rounded-xs pointer-events-none transition-colors duration-500 ${
              isDarkMode ? 'border-[#dfbc71]/10 bg-[#15151b]/40' : 'border-[#1b3f22]/10 bg-emerald-50/20'
            }`} />

            {/* Main Portrait Frame - Astra clean alignment meets Inspiro media focus */}
            <div className={`relative max-w-[270px] sm:max-w-[300px] w-full border p-3 shadow-2xl hover_lift group overflow-hidden rounded-xs transition-all duration-500 ${
              isDarkMode ? 'bg-[#131317] border-stone-800 hover:border-[#dfbc71]/30' : 'bg-white border-stone-200 hover:border-emerald-700/30'
            }`}>
              <div className={`relative aspect-[3/4] overflow-hidden border ${isDarkMode ? 'border-stone-830' : 'border-stone-100'}`}>
                <img 
                  src="/assets/images/regenerated_image_1780980751610.jpg" 
                  alt="Joshz Raniel Marasigan Portrait" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-stone-900/90 backdrop-blur-xs border border-stone-800 text-[8.5px] font-mono tracking-widest text-[#dfbc71] uppercase rounded-sm">
                  PORTRAIT // CREATOR
                </div>
              </div>

              {/* Classic Gallery Inscription Plaque */}
              <div className="pt-3 pb-1 text-center flex flex-col gap-1">
                <span className={`font-serif text-[12px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-[#dfbc71]' : 'text-stone-900'}`}>
                  Joshz Raniel D. Marasigan
                </span>
                <span className={`font-mono text-[8px] uppercase tracking-widest ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  IT Support Specialist // Designer
                </span>
              </div>
            </div>
          </div>

        </div>
      </motion.header>

      {/* REACTION COMPANION: ROLE PERSONALIZER */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 border-y py-16 px-6 sm:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#080a0e]/85 border-emerald-500/10' : 'bg-stone-100/80 border-stone-200/70'}`} 
        id="role-personalizer"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div>
            <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-[#dfbc71]' : 'text-[#1b3f22] font-semibold'}`}>Recruiter Assistant</span>
            <h2 className={`text-2xl font-serif mt-1 font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>Focus Role Alignment</h2>
            <p className={`text-xs md:text-sm mt-1 font-sans ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Choose the particular service role you are scouting for and watch Joshz's narrative layout alignment adapt seamlessly.
            </p>
          </div>

          {/* Quick focus buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2" id="pitch-buttons-grid">
            {(['Universal', 'Networking', 'Multimedia', 'Support', 'AI'] as const).map((key) => {
              const isActive = recruiterFocus === key;
              return (
                <button
                  id={`pitch-trigger-${key}`}
                  key={key}
                  onClick={() => setRecruiterFocus(key)}
                  className={`py-2 px-3 border text-xs font-sans tracking-wide font-medium transition-luxury rounded-sm cursor-pointer ${
                    isActive
                      ? isDarkMode ? 'bg-white border-white text-stone-950 font-semibold' : 'bg-stone-950 border-stone-950 text-white font-semibold'
                      : isDarkMode ? 'bg-[#121217] border-stone-800 text-stone-400 hover:border-stone-650 hover:text-white' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
                  }`}
                >
                  {key === 'Universal' ? 'General' : key}
                </button>
              );
            })}
          </div>

          {/* Rendered Focus Material */}
          <div className={`border p-6 md:p-8 flex flex-col gap-6 transition-colors duration-300 rounded-sm ${isDarkMode ? 'bg-[#131318] border-stone-800/80' : 'bg-white border-stone-200'}`} id="focus-preview-card">
            <div className="flex flex-col gap-2">
              <span className={`font-mono text-[9px] uppercase tracking-widest ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Adaptive Statement</span>
              <h3 className={`font-serif text-lg md:text-xl font-medium italic ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
                "{focusPitches[recruiterFocus].tagline}"
              </h3>
              <p className={`font-sans text-sm leading-relaxed mt-2 ${isDarkMode ? 'text-stone-405' : 'text-stone-600'}`}>
                {focusPitches[recruiterFocus].description}
              </p>
            </div>

            <div className={`border-t pt-4 ${isDarkMode ? 'border-stone-800' : 'border-stone-100'}`}>
              <span className={`font-mono text-[9px] uppercase tracking-widest block mb-3 ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Key Strengths Demonstrated</span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {focusPitches[recruiterFocus].highlights.map((h, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-xs p-3 border rounded-sm ${
                    isDarkMode ? 'text-stone-300 bg-[#0d0d12] border-stone-850' : 'text-stone-700 bg-stone-50 border-stone-100'
                  }`}>
                    <Check className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WORKS & DESIGN GALLERY SECTION */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-24" id="projects-section">
        <div className="flex flex-col gap-4 mb-12">
          <span className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>PORTFOLIO & CREATIONS</span>
          <h2 className={`text-4.5xl font-serif font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
            My Projects & Works
          </h2>
          <p className={`font-sans text-sm md:text-base max-w-2xl leading-relaxed ${isDarkMode ? 'text-stone-350' : 'text-stone-600'}`}>
            Here is a personal showcase of what I can build ranging from AI-empowered web applications with complete database architectures, to high-converting promotional graphic assets, local business networks, and bespoke functional designs.
          </p>

          {/* Filtering Tabs */}
          <div className={`flex flex-wrap gap-2 mt-4 border-b pb-4 ${isDarkMode ? 'border-stone-800' : 'border-stone-200/60'}`} id="work-tabs">
            {(['All', 'Full-Stack', 'Multimedia', 'UI/UX', 'Database', 'Networking', 'AI'] as const).map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  id={`cat-filter-${cat}`}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? isDarkMode ? 'border-b-2 border-white font-medium text-white' : 'border-b-2 border-stone-900 font-medium text-stone-950'
                      : isDarkMode ? 'text-stone-500 hover:text-stone-200' : 'text-stone-400 hover:text-stone-800'
                  }`}
                >
                  {cat === 'All' ? 'Everything' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
          {filteredProjects.map((p, idx) => (
            <motion.div
              initial={{ opacity: 0, rotateX: 10, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              id={`project-card-${p.id}`}
              key={p.id}
              onClick={() => openProjectCase(p)}
              className={`group cursor-pointer border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between rounded-sm relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-[#121217] border-stone-800/85 hover:border-emerald-500/35 hover:shadow-[0_12px_28px_rgba(16,185,129,0.05)]' 
                  : 'bg-white border-stone-200 hover:border-emerald-200/50 hover:shadow-[0_15px_32px_rgba(16,185,129,0.0355)]'
              }`}
            >
              <div>
                {/* Visual Image container with referrer policy */}
                {p.imageUrl ? (
                  <div className={`aspect-[4/3] w-full overflow-hidden relative border-b ${
                    isDarkMode ? 'bg-[#0d0d12] border-stone-800/85' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute top-4 left-4 px-2 py-0.5 border border-stone-250 font-mono text-[9px] uppercase tracking-widest rounded-sm ${
                      isDarkMode ? 'bg-[#141419] border-stone-800 text-stone-300' : 'bg-[#fafaf7] border-stone-200 text-stone-600'
                    }`}>
                      {p.category}
                    </div>
                  </div>
                ) : (
                  <div className="pt-6 px-6">
                    <span className={`inline-block px-2 py-0.5 border font-mono text-[9px] uppercase tracking-widest rounded-sm ${
                      isDarkMode ? 'bg-[#141419] border-stone-800 text-stone-300' : 'bg-[#fafaf7] border-stone-200 text-stone-600'
                    }`}>
                      {p.category}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col gap-2">
                  <h3 className={`font-serif text-lg font-semibold transition-colors leading-snug ${
                    isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-stone-900 group-hover:text-stone-950'
                  }`}>
                    {p.title}
                  </h3>
                  <p className={`font-sans text-xs md:text-sm line-clamp-2 leading-relaxed ${
                    isDarkMode ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    {p.description}
                  </p>
                </div>
              </div>

              <div className={`px-6 pb-6 pt-2 flex items-center justify-between font-mono text-[10px] border-t ${
                isDarkMode ? 'border-stone-800 text-stone-550' : 'border-stone-50 text-stone-400'
              }`}>
                <span className="truncate max-w-[200px]">{p.tags[0]} · {p.tags[1]}</span>
                <span className={`group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium ${
                  isDarkMode ? 'text-stone-300 group-hover:text-cyan-400' : 'text-stone-500 group-hover:text-stone-950'
                }`}>
                  View Specs <ChevronRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FREELANCE TOOLBELT & WORKFLOW */}
      <section className={`relative z-10 border-y py-24 px-6 sm:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#080a0e]/85 border-emerald-500/10' : 'bg-stone-100/80 border-emerald-600/15'}`} id="about-section">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 flex flex-col gap-5 animate-fade-in">
              {/* Circular Professional Avatar Badge (Astra/Inspiro combination details) */}
              <div className="relative self-start select-none">
                <div className={`relative w-24 h-24 rounded-full p-1 border transition-colors duration-500 ${
                  isDarkMode ? 'bg-[#15151b]/40 border-[#dfbc71]/40' : 'bg-white border-emerald-700/30'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden border border-stone-200/20">
                    <img 
                      src="/assets/images/regenerated_image_1780980753910.jpg" 
                      alt="Joshz Raniel Marasigan Avatar" 
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                {/* Glowing ring/ping that looks premium */}
                <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 border-2 border-[#faf9f5] dark:border-[#0b0b0d] rounded-full flex items-center justify-center shadow-lg" title="Active & Available for Work">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute" />
                  <span className="w-2 h-2 bg-white rounded-full" />
                </span>
              </div>

              <div>
                <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-[#dfbc71]' : 'text-emerald-800'}`}>ABOUT ME</span>
                <h2 className={`text-3xl font-serif mt-1 font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
                  Freelance <br />& AI Workflow
                </h2>
              </div>
              <p className={`font-sans text-xs md:text-sm leading-relaxed mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                A highly versatile and rapid-learning IT freelancer. I combine foundational tech support and Cisco essentials with AI-powered web development, creative logo/poster design, and instant adaptability to help businesses grow.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6" id="skills-list">
              {freelancerToolkit.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className={`border p-6 flex flex-col gap-4 rounded-sm transition-all duration-300 hover:-translate-y-1 group ${
                    isDarkMode 
                      ? 'bg-[#111116] border-stone-850 text-stone-200 hover:border-emerald-500/20 hover:shadow-[0_8px_24px_rgba(16,185,129,0.03)]' 
                      : 'bg-white border-stone-200 text-stone-900 hover:border-emerald-200/50 hover:shadow-[0_12px_24px_rgba(16,185,129,0.025)]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-sm transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#171720] text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400' 
                          : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                      }`}>
                         <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className={`font-sans text-sm font-semibold tracking-wide ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{item.title}</h3>
                    </div>
                    
                    <p className={`font-sans text-xs leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                      {item.description}
                    </p>
                    
                    <div className={`pt-3 border-t flex flex-col gap-1.5 ${isDarkMode ? 'border-stone-850' : 'border-stone-100'}`}>
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 font-mono text-[9px] tracking-wide uppercase text-stone-550">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* TIMELINE EXPERIENCES SECTION */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 sm:px-8 py-24 relative z-0" 
        id="experience-section"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left info */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>CHRONICLES</span>
            <h2 className={`text-3xl font-serif font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
              On-Campus <br />& Lab Journey
            </h2>
            <p className={`font-sans text-xs md:text-sm mt-3 leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Active physical deployments, classroom diagnostics, and airport/hotel baggage X-ray security scanning maintenance maintained during rigorous internships.
            </p>
          </div>

          {/* Right vertical timeline */}
          <div className={`md:col-span-8 flex flex-col gap-8 relative border-l pl-6 md:pl-8 before:absolute before:top-0 before:bottom-0 before:left-[-1px] before:w-[1px] ${
            isDarkMode ? 'border-stone-800 before:bg-stone-800' : 'border-stone-200 before:bg-stone-200'
          }`}>
            {experiences.map((exp, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={exp.id} 
                className="relative flex flex-col gap-3" 
                id={`exp-node-${exp.id}`}
              >
                {/* Timeline node circle */}
                <div className={`absolute top-1.5 left-[-31px] md:left-[-39px] w-4 h-4 rounded-full border-[3px] transition-colors ${
                  isDarkMode ? 'bg-[#0a0a0d] border-cyan-550' : 'bg-[#fafaf7] border-stone-500'
                }`}></div>
                
                <span className="font-mono text-[10px] tracking-wide uppercase text-stone-500">
                  {exp.period} · {exp.location}
                </span>
                
                <div className="flex flex-col">
                  <h3 className={`font-serif text-lg font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                    {exp.role}
                  </h3>
                  <span className={`font-sans text-sm italic ${isDarkMode ? 'text-stone-400' : 'text-stone-700'}`}>
                    {exp.company}
                  </span>
                </div>

                <p className={`font-sans text-xs md:text-sm leading-relaxed mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  {exp.description}
                </p>

                <ul className="flex flex-col gap-2 font-sans text-[11px] text-stone-500 mt-2">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex gap-2 text-[11.5px]">
                      <span className={`${isDarkMode ? 'text-stone-700' : 'text-stone-400'} shrink-0 font-bold`}>·</span>
                      <span className={isDarkMode ? 'text-stone-400' : 'text-stone-600'}>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.skillsGained.map((skill, skIdx) => (
                    <span key={skIdx} className={`px-2 py-0.5 border font-mono text-[9px] uppercase tracking-wide rounded-sm ${
                      isDarkMode ? 'bg-[#141419] border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* CERTIFICATIONS & CREDENTIALS GRID */}
      <section className={`border-y py-24 px-6 sm:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#111116]/80 border-stone-800/90' : 'bg-stone-100/60 border-stone-200/70'}`}>
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${isDarkMode ? 'text-cyan-400' : 'text-stone-400'}`}>AUTHENTICATIONS</span>
            <h2 className={`text-2xl font-serif font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>Active Professional Credentials</h2>
            <p className={`font-sans text-xs md:text-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Direct verification registries corresponding to Cisco system configurations, Google operations, and analytical artificial intelligence frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="certifications-table-list">
            {certifications.map((cert, idx) => {
              const getCertStyle = (category: string) => {
                switch (category?.toLowerCase()) {
                  case 'cisco':
                    return {
                      textColor: 'text-sky-400',
                      badgeText: 'text-sky-300',
                      borderHover: 'hover:border-sky-500/45 hover:shadow-[0_12px_32px_rgba(56,189,248,0.06)]',
                      lightBorderHover: 'hover:border-sky-400 hover:shadow-[0_12px_28px_rgba(3,105,161,0.04)]',
                      badgeBg: 'bg-sky-950/45 border-sky-500/20',
                      cardBg: 'bg-gradient-to-br from-[#0c0d12] via-[#0d131f]/95 to-[#0b0e14] border-stone-850/90',
                      icon: Network,
                      vendorAccent: 'CISCO ACADEMY'
                    };
                  case 'ibm':
                    return {
                      textColor: 'text-indigo-400',
                      badgeText: 'text-indigo-300',
                      borderHover: 'hover:border-indigo-500/45 hover:shadow-[0_12px_32px_rgba(99,102,241,0.06)]',
                      lightBorderHover: 'hover:border-indigo-400 hover:shadow-[0_12px_28px_rgba(67,56,202,0.04)]',
                      badgeBg: 'bg-indigo-950/45 border-indigo-500/20',
                      cardBg: 'bg-gradient-to-br from-[#0c0d12] via-[#101021]/95 to-[#0c0b12] border-stone-850/90',
                      icon: Bot,
                      vendorAccent: 'IBM SKILLSBUILD'
                    };
                  case 'google':
                    return {
                      textColor: 'text-emerald-400',
                      badgeText: 'text-emerald-300',
                      borderHover: 'hover:border-emerald-500/45 hover:shadow-[0_12px_32px_rgba(16,185,129,0.06)]',
                      lightBorderHover: 'hover:border-emerald-400 hover:shadow-[0_12px_28px_rgba(4,120,87,0.04)]',
                      badgeBg: 'bg-emerald-950/45 border-emerald-500/20',
                      cardBg: 'bg-gradient-to-br from-[#0c0d12] via-[#091511]/95 to-[#060e0a] border-stone-850/90',
                      icon: Cpu,
                      vendorAccent: 'GOOGLE OPERATIONS'
                    };
                  case 'coursera':
                  case 'creative':
                  default:
                    return {
                      textColor: 'text-amber-400',
                      badgeText: 'text-amber-300',
                      borderHover: 'hover:border-amber-500/45 hover:shadow-[0_12px_32px_rgba(245,158,11,0.06)]',
                      lightBorderHover: 'hover:border-amber-400 hover:shadow-[0_12px_28px_rgba(180,83,9,0.04)]',
                      badgeBg: 'bg-amber-950/45 border-amber-500/20',
                      cardBg: 'bg-gradient-to-br from-[#0c0d12] via-[#16120b]/95 to-[#0b0a08] border-stone-850/90',
                      icon: Award,
                      vendorAccent: 'CREATIVE MEDIA'
                    };
                }
              };

              const style = getCertStyle(cert.category);
              const IconComponent = style.icon;

              return (
                <div 
                  key={idx} 
                  className={`relative border p-6 flex flex-col justify-between gap-5 transition-all duration-300 rounded-sm overflow-hidden group hover:-translate-y-1.5 ${
                    isDarkMode 
                      ? `${style.cardBg} ${style.borderHover}` 
                      : `bg-white border-stone-200/90 ${style.lightBorderHover}`
                  }`}
                >
                  {/* Glowing lateral bar */}
                  <span className={`absolute top-0 left-0 w-[4.5px] h-full ${
                    isDarkMode ? style.textColor.replace('text-', 'bg-') : 'bg-emerald-600'
                  }`} />
                  
                  {/* Subtle ambient light helper */}
                  <div className={`absolute -right-14 -top-14 w-32 h-32 rounded-full blur-[44px] opacity-15 transition-opacity duration-500 group-hover:opacity-35 pointer-events-none ${
                    isDarkMode ? style.badgeBg : 'bg-emerald-50/40'
                  }`} />

                  <div className="flex flex-col gap-2.5 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 border font-mono text-[8px] uppercase tracking-wider font-extrabold rounded-sm ${
                          isDarkMode ? `${style.badgeBg} ${style.badgeText}` : 'bg-emerald-50 border-emerald-100 text-emerald-850'
                        }`}>
                          {cert.category}
                        </span>
                        <span className={`font-mono text-[7px] tracking-widest font-semibold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                          // {style.vendorAccent}
                        </span>
                      </div>
                      <span className={`font-mono text-[9px] ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>{cert.date}</span>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className={`p-2 border rounded-sm shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-[#09090d] border-stone-800 text-emerald-400 group-hover:text-emerald-300' : 'bg-emerald-50/30 border-emerald-100 text-emerald-700'
                      }`}>
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className={`font-sans text-xs md:text-sm font-bold leading-snug tracking-normal ${isDarkMode ? 'text-white group-hover:text-emerald-100' : 'text-stone-900'}`}>
                          {cert.title}
                        </h3>
                        <p className={`text-[10px] font-sans mt-0.5 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    {/* Skill capsules highlights */}
                    {cert.skillsHighlighted && cert.skillsHighlighted.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skillsHighlighted.map((skill, sIdx) => (
                          <span key={sIdx} className={`px-1.5 py-0.5 border font-mono text-[8px] uppercase tracking-wider rounded-sm ${
                            isDarkMode ? 'bg-[#0d0d12]/60 border-stone-850/80 text-stone-400 group-hover:text-stone-300' : 'bg-stone-50/70 border-stone-150 text-stone-605'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`border-t pt-3 flex items-center justify-between relative z-10 ${isDarkMode ? 'border-stone-855' : 'border-stone-100'}`}>
                    <div className="flex items-center gap-1 font-mono text-[8.5px] uppercase text-stone-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>ID: {cert.credentialId || 'N/A REGISTRY'}</span>
                    </div>
                    {cert.verificationUrl ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(cert.verificationUrl, '_blank', 'noopener,noreferrer'); }}
                        className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-emerald-500 hover:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/10 hover:border-emerald-500/25 transition-all duration-300 cursor-pointer"
                      >
                        Verify Record <ExternalLink className="w-2.5 h-2.5 text-emerald-500" />
                      </button>
                    ) : (
                      <span className={`font-mono text-[9px] italic ${isDarkMode ? 'text-stone-600' : 'text-stone-400'}`}>
                        Verified Academic Record
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* SEMINARS SECTION */}
          <div className="mt-16">
            <div className="flex flex-col gap-3 mb-8 text-center md:text-left">
              <span className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>SEMINARS & TRAININGS</span>
              <h3 className={`text-2xl font-serif font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>Attended Programs</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="seminars-list">
              {seminars.map((seminar, idx) => (
                <div key={idx} className={`p-5 border rounded-sm transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? 'bg-[#111116] border-stone-850 hover:border-amber-500/30' : 'bg-white border-stone-200 hover:border-amber-400/40'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 border rounded-sm shrink-0 mt-0.5 ${
                      isDarkMode ? 'bg-[#16161a] border-stone-800 text-amber-500' : 'bg-amber-50 border-amber-100 text-amber-600'
                    }`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className={`font-sans text-sm font-bold leading-snug ${isDarkMode ? 'text-stone-200' : 'text-stone-900'}`}>
                        {seminar.title}
                      </h4>
                      <p className={`text-[11px] font-sans ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                        {seminar.organizer}
                      </p>
                      <span className={`font-mono text-[9px] uppercase tracking-wider ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                        {seminar.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ACADEMICS & EDUCATION HISTORY SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 border-y py-24 px-6 sm:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#080a0e]/85 border-emerald-500/10' : 'bg-stone-100/80 border-stone-200'}`} 
        id="education-section"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>ACADEMIC BACKGROUND</span>
            <h2 className={`text-3xl font-serif font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
              Where I Studied
            </h2>
            <p className={`font-sans text-xs md:text-sm mt-1 leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-550'}`}>
              My academic milestones at Lyceum of the Philippines University – Batangas, specialized in Multimedia Technology.
            </p>

            {/* Junior High School Graduate Placement */}
            {educationHistory[2] && (
              <div
                id="edu-item-2"
                className={`p-6 border transition-all duration-300 rounded-sm hover:-translate-y-0.5 mt-4 ${
                  isDarkMode
                    ? 'bg-[#111116] border-stone-850 hover:border-emerald-500/20'
                    : 'bg-white border-stone-200 hover:border-emerald-200/50'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className={`text-sm font-serif font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                      {educationHistory[2].degree}
                    </h4>
                    {educationHistory[2].specialization && (
                      <span className="text-[11px] font-sans font-medium text-emerald-500 block mt-0.5 font-bold">
                        {educationHistory[2].specialization}
                      </span>
                    )}
                    <span className={`text-[11px] font-sans block mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                      {educationHistory[2].institution}
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                    isDarkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {educationHistory[2].period}
                  </span>
                </div>

                {educationHistory[2].highlights && (
                  <div className={`mt-4 border-t pt-3 flex flex-col gap-1.5 ${isDarkMode ? 'border-stone-850' : 'border-stone-100'}`}>
                    {educationHistory[2].highlights.length > 0 ? (
                      educationHistory[2].highlights.map((item, keyIdx) => (
                        <div key={keyIdx} className="flex items-start gap-2 text-[11px] font-sans leading-relaxed text-stone-400 animate-fade-in">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={isDarkMode ? 'text-stone-300' : 'text-stone-600'}>{item}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start gap-2 text-[11px] font-sans leading-relaxed text-stone-500 italic">
                        <span>Completed comprehensive secondary education.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className={`font-mono text-[9px] uppercase tracking-widest block pb-1 ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Academic Path Timeline</span>
            
            <div className="flex flex-col gap-4">
              {educationHistory.slice(0, 2).map((edu, idx) => {
                return (
                  <div
                    id={`edu-item-${idx}`}
                    key={idx}
                    className={`p-6 border transition-all duration-300 rounded-sm hover:-translate-y-0.5 ${
                      isDarkMode
                        ? 'bg-[#111116] border-stone-850 hover:border-emerald-500/20'
                        : 'bg-white border-stone-200 hover:border-emerald-200/50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className={`text-sm font-serif font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                          {edu.degree}
                        </h4>
                        {edu.specialization && (
                          <span className="text-[11px] font-sans font-medium text-emerald-500 block mt-0.5 font-bold">
                            {edu.specialization}
                          </span>
                        )}
                        <span className={`text-[11px] font-sans block mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                          {edu.institution}
                        </span>
                      </div>
                      <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                        isDarkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {edu.period}
                      </span>
                    </div>

                    <div className={`mt-4 border-t pt-3 flex flex-col gap-1.5 ${isDarkMode ? 'border-stone-850' : 'border-stone-100'}`}>
                      {edu.highlights.map((item, keyIdx) => (
                        <div key={keyIdx} className="flex items-start gap-2 text-[11px] font-sans leading-relaxed text-stone-400 animate-fade-in">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={isDarkMode ? 'text-stone-300' : 'text-stone-600'}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </motion.section>

      {/* INQUIRE CONTACT SECTION */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className="py-24 px-6 sm:px-8" 
        id="contact-section"
      >
        <div className="max-w-5xl mx-auto flex flex-col gap-12 animate-fade-in">
          
          {/* Section Heading matching the style perfectly */}
          <div className="text-center flex flex-col items-center mb-6">
            <h2 className={`text-3xl sm:text-4xl font-sans font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
              Get <span className="text-emerald-400">In Touch</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mt-3 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <p className={`font-sans text-xs sm:text-sm mt-4 leading-relaxed max-w-md ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Feel free to reach out for collaborations or just a friendly hello
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Column 1: Contact Information */}
            <div className="md:col-span-6 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className={`text-xl font-sans font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                  Contact Information
                </h3>
                <p className={`font-sans text-sm leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Don't hesitate to reach out.
                </p>
              </div>

              {/* Vertical Contact Nodes */}
              <div className="flex flex-col gap-6 font-sans">
                
                {/* Location Row */}
                <div className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[11px] font-mono tracking-wider uppercase font-bold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Location</span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`}>Batangas City</span>
                  </div>
                </div>

                {/* Email Row */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-col">
                      <span className={`text-[11px] font-mono tracking-wider uppercase font-bold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Email</span>
                      <span className={`text-sm font-semibold break-all ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`}>joshzraniel@gmail.com</span>
                    </div>
                    {/* Direct Email Button with paper airplane icon pointing to Gmail compose interface */}
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=joshzraniel@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-sans font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-md hover:shadow-emerald-500/20 rounded-full transition-all mt-1.5 cursor-pointer border border-transparent"
                    >
                      <Send className="w-3 h-3" />
                      <span>Direct Email</span>
                    </a>
                  </div>
                </div>

                {/* Phone Row */}
                <div className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.2)] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[11px] font-mono tracking-wider uppercase font-bold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Phone</span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`}>{personalInfo.phone}</span>
                  </div>
                </div>

              </div>

              {/* Left Column Social Icons */}
              <div className="flex items-center gap-4 mt-2">
                <a
                  href={personalInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isDarkMode ? 'bg-[#15151b] border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 shadow-sm'
                  }`}
                  title="Joshz Marasigan on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isDarkMode ? 'bg-[#15151b] border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 shadow-sm'
                  }`}
                  title="Joshz Marasigan on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.indeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isDarkMode ? 'bg-[#15151b] border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 shadow-sm'
                  }`}
                  title="Joshz Marasigan on Indeed"
                >
                  <Briefcase className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Let's Work Together Card Container */}
            <div className="md:col-span-6 flex flex-col gap-6">
              
              <div className={`w-full p-8 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col items-center text-center ${
                isDarkMode ? 'bg-[#1b2531]/40 border-[#2d394a]/50 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.6)]' : 'bg-white border-stone-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.05)]'
              }`}>
                
                {/* Centered Handshake Bag */}
                <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <Handshake className="w-7 h-7 text-white" />
                </div>

                <h3 className={`text-xl font-sans font-bold tracking-tight mt-5 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                  Let's Work Together
                </h3>
                <p className={`font-sans text-[13px] leading-relaxed mt-2.5 max-w-xs ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  I'm currently available for freelance projects and full-time opportunities.
                </p>

                {/* Vertical Status Bars */}
                <div className="w-full flex flex-col gap-3.5 mt-7">
                  
                  {/* Status 1 */}
                  <div className={`w-full p-3 px-4 rounded-xl border flex items-center gap-3.5 text-xs text-left font-sans ${
                    isDarkMode ? 'bg-[#141b25]/80 border-[#2a3545] text-stone-200' : 'bg-stone-50 border-stone-200/80 text-stone-700'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <span className="font-semibold tracking-wide">Open to new opportunities</span>
                  </div>

                  {/* Status 2 */}
                  <div className={`w-full p-3 px-4 rounded-xl border flex items-center gap-3.5 text-xs text-left font-sans ${
                    isDarkMode ? 'bg-[#141b25]/80 border-[#2a3545] text-stone-200' : 'bg-stone-50 border-stone-200/80 text-stone-700'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold tracking-wide">Typically responds within 24 hours</span>
                  </div>

                  {/* Status 3 */}
                  <div className={`w-full p-3 px-4 rounded-xl border flex items-center gap-3.5 text-xs text-left font-sans ${
                    isDarkMode ? 'bg-[#141b25]/80 border-[#2a3545] text-stone-200' : 'bg-stone-50 border-stone-200/80 text-stone-700'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-cyan-550/15 border border-cyan-500/30 flex items-center justify-center text-cyan-455 shrink-0">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span className="font-semibold tracking-wide">
                      Available for <span className="text-cyan-400 underline decoration-cyan-400/50 underline-offset-2 font-bold">remote work worldwide</span>
                    </span>
                  </div>

                </div>

                {/* Footer in Card */}
                <div className="mt-8 flex flex-col items-center gap-2.5">
                  <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                    Connect with me on social media
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/joshzzdatinguinoo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#3b5998]/15 hover:bg-[#3b5998]/30 text-[#4085ff] border border-[#3b5998]/30 flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={personalInfo.indeed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#1340b0]/15 hover:bg-[#1340b0]/30 text-blue-400 border border-[#1340b0]/30 flex items-center justify-center transition-all hover:scale-105"
                      title="Joshz Marasigan on Indeed"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative z-20 bg-[#0b0b0e] text-stone-400 py-16 px-6 sm:px-8 border-t border-stone-900">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-white font-semibold uppercase tracking-wider">Joshz Marasigan</span>
            <span className="font-mono text-[9px] text-stone-500 uppercase mt-1">IT and Creative Solutions · Alangilan, Batangas, PH</span>
          </div>

          <div className="flex items-center gap-6">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={personalInfo.indeed} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Indeed Profile">
              <FileText className="w-4 h-4" />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>

          <p className="font-mono text-[9px] text-stone-500 text-center md:text-right">
            © {currentYear} Joshz Marasigan. All rights reserved. <br />
            Designed in Premium Editorial Minimalism.
          </p>
        </div>
      </footer>

      {/* ACTIVE CASE STUDY DETAIL MODAL OVERLAY */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          id="project-detail-overlay"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`border w-full ${
              selectedProject.id === 'proj_identify' ? 'max-w-5xl' : 'max-w-2xl'
            } max-h-[94vh] overflow-y-auto shadow-2xl relative animate-fade-in flex flex-col rounded-sm ${
              isDarkMode ? 'bg-[#141419] border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            {/* Direct Close Button */}
            <button
              id="close-modal-trigger"
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border cursor-pointer transition-colors rounded-sm ${
                isDarkMode ? 'bg-stone-900 border-stone-850 hover:border-stone-701 text-stone-300' : 'bg-white border-stone-200 hover:border-stone-400 text-stone-950'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Gallery with loop slide */}
            {(() => {
              const carouselImages = selectedProject.images && selectedProject.images.length > 0 
                ? selectedProject.images 
                : [selectedProject.imageUrl];
              const currentIndex = Math.min(imageCarouselIdx, carouselImages.length - 1);
              return (
                <div className={`w-full border-b relative group/carousel shrink-0 flex items-center justify-center ${
                  isDarkMode ? 'bg-[#0d0d12] border-stone-830' : 'bg-stone-100 border-stone-200'
                }`} style={{ minHeight: '260px', maxHeight: '520px' }}>
                  <img
                    src={carouselImages[currentIndex]}
                    alt={`${selectedProject.title} gallery ${currentIndex}`}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '520px', minHeight: '260px' }}
                    referrerPolicy="no-referrer"
                  />
                  {carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevCarouselImage(e, carouselImages.length)}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border shadow-sm cursor-pointer rounded-sm ${
                          isDarkMode ? 'bg-[#0f0f15]/90 hover:bg-[#151520] border-stone-800 text-stone-300' : 'bg-white/90 hover:bg-white border-stone-200/60 text-stone-950'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextCarouselImage(e, carouselImages.length)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border shadow-sm cursor-pointer rounded-sm ${
                          isDarkMode ? 'bg-[#0f0f15]/90 hover:bg-[#151520] border-stone-800 text-stone-300' : 'bg-white/90 hover:bg-white border-stone-200/60 text-stone-950'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 border font-mono text-[9px] rounded-sm ${
                        isDarkMode ? 'bg-[#0a0a0f]/95 border-stone-800 text-stone-300' : 'bg-white/90 border-stone-200/60 text-stone-700'
                      }`}>
                        {currentIndex + 1} / {carouselImages.length}
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            <div className="p-6 md:p-8 flex flex-col gap-6 select-text">
              <div className="flex flex-col gap-1">
                <span className={`font-mono text-[9px] uppercase tracking-widest block ${isDarkMode ? 'text-stone-500' : 'text-[#8a8a81]'}`}>
                  Project Case Study · {selectedProject.category}
                </span>
                <h3 className={`font-serif text-xl md:text-2xl font-bold tracking-tight leading-snug ${isDarkMode ? 'text-white' : 'text-stone-950'}`}>
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className={`px-2 py-0.5 border font-mono text-[9px] uppercase tracking-wide rounded-sm ${
                    isDarkMode ? 'bg-[#0d0d12] border-stone-800 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={`flex flex-col gap-4 font-sans text-xs md:text-sm border-t pt-5 leading-relaxed ${
                isDarkMode ? 'text-stone-300 border-stone-850' : 'text-stone-700 border-stone-100'
              }`}>
                
                {/* Description */}
                <div>
                  <h4 className="font-mono text-[9.5px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Introduction & Objective</h4>
                  <p className={`font-serif italic text-sm ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`}>
                    "{selectedProject.description}"
                  </p>
                </div>

                {/* Outcomes */}
                <div>
                  <h4 className="font-mono text-[9.5px] uppercase tracking-wider text-stone-400 font-bold block mb-2">Key Outcomes & Deliverables</h4>
                  <ul className={`flex flex-col gap-2 border p-4 rounded-sm ${isDarkMode ? 'bg-[#0d0d12]/80 border-stone-800' : 'bg-stone-50 border-stone-100 text-stone-700'}`}>
                    {selectedProject.outcomes.map((out, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Lessons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-3.5 border rounded-sm ${isDarkMode ? 'bg-[#0d0d12] border-stone-800' : 'bg-stone-50/40 border-stone-150'}`}>
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Core Challenge</h5>
                    <p className={`text-[11px] md:text-xs ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{selectedProject.challenges}</p>
                  </div>
                  <div className={`p-3.5 border rounded-sm ${isDarkMode ? 'bg-[#0d0d12] border-stone-800' : 'bg-stone-50/40 border-stone-150'}`}>
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Lessons Acquired</h5>
                    <p className={`text-[11px] md:text-xs ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{selectedProject.lessons}</p>
                  </div>
                </div>

                {/* KEY FEATURES */}
                {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (() => {
                  const iconMap: Record<string, React.ReactNode> = {
                    Shield:       <Shield className="w-5 h-5 text-emerald-400" />,
                    FileText:     <FileText className="w-5 h-5 text-emerald-400" />,
                    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
                    Briefcase:    <Briefcase className="w-5 h-5 text-emerald-400" />,
                    Zap:          <Zap className="w-5 h-5 text-emerald-400" />,
                    Layout:       <Layout className="w-5 h-5 text-emerald-400" />,
                    Sparkles:     <Sparkles className="w-5 h-5 text-emerald-400" />,
                    Moon:         <Moon className="w-5 h-5 text-emerald-400" />,
                    Eye:          <Eye className="w-5 h-5 text-emerald-400" />,
                    Download:     <Download className="w-5 h-5 text-emerald-400" />,
                    Network:      <Network className="w-5 h-5 text-emerald-400" />,
                    Database:     <Database className="w-5 h-5 text-emerald-400" />,
                    Globe:        <Globe className="w-5 h-5 text-emerald-400" />,
                    Lock:         <Lock className="w-5 h-5 text-emerald-400" />,
                    Terminal:     <Terminal className="w-5 h-5 text-emerald-400" />,
                    Bot:          <Bot className="w-5 h-5 text-emerald-400" />,
                  };
                  return (
                  <div className="border-t pt-8 mt-4" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' }}>
                    {/* Section Heading */}
                    <div className="text-center mb-8">
                      <h4 className={`text-xl font-bold font-sans tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                        Key <span className="text-[#00cba9]">Features</span>
                      </h4>
                      <div className="w-12 h-0.5 mx-auto mt-2 rounded-full bg-[#00cba9]" />
                      <p className={`text-xs mt-3 font-sans ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                        Explore the powerful features that make this project stand out
                      </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedProject.keyFeatures.map((feat, idx) => {
                        // Create a map to inject white color into the icons
                        const solidIconMap: Record<string, React.ReactNode> = {
                          Shield:       <Shield className="w-5 h-5 text-white" />,
                          FileText:     <FileText className="w-5 h-5 text-white" />,
                          CheckCircle2: <CheckCircle2 className="w-5 h-5 text-white" />,
                          Briefcase:    <Briefcase className="w-5 h-5 text-white" />,
                          Zap:          <Zap className="w-5 h-5 text-white" />,
                          Layout:       <Layout className="w-5 h-5 text-white" />,
                          Sparkles:     <Sparkles className="w-5 h-5 text-white" />,
                          Moon:         <Moon className="w-5 h-5 text-white" />,
                          Eye:          <Eye className="w-5 h-5 text-white" />,
                          Download:     <Download className="w-5 h-5 text-white" />,
                          Network:      <Network className="w-5 h-5 text-white" />,
                          Database:     <Database className="w-5 h-5 text-white" />,
                          Globe:        <Globe className="w-5 h-5 text-white" />,
                          Lock:         <Lock className="w-5 h-5 text-white" />,
                          Terminal:     <Terminal className="w-5 h-5 text-white" />,
                          Bot:          <Bot className="w-5 h-5 text-white" />,
                        };
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ duration: 0.4, delay: idx * 0.07 }}
                            className={`group p-5 rounded-xl border flex flex-col gap-3 cursor-default transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg ${
                              isDarkMode
                                ? 'bg-[#111216] border-[#1f2228] hover:border-[#00cba9]/40 hover:shadow-[#00cba9]/10'
                                : 'bg-white border-stone-200 hover:border-[#00cba9]/50 hover:shadow-[#00cba9]/10'
                            }`}
                          >
                            {/* Cyan Solid Circle Icon */}
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#00cba9]">
                              {solidIconMap[feat.icon] ?? <Sparkles className="w-5 h-5 text-white" />}
                            </div>
                            <div>
                              <h5 className={`font-sans font-bold text-sm mb-1.5 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                                {feat.title}
                              </h5>
                              <p className={`text-xs font-sans leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                                {feat.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
                })()}

                {/* TECH STACK */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="pt-8 mt-4" style={{ borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)' }}>
                    <div className="text-center mb-8">
                      <h4 className={`text-xl font-bold font-sans tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                        Technology <span className="text-[#00cba9]">Stack</span>
                      </h4>
                      <div className="w-12 h-0.5 mx-auto mt-2 rounded-full bg-[#00cba9]" />
                      <p className={`text-xs mt-3 font-sans ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                        Built with modern technologies and best practices
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {selectedProject.techStack.map((tech, idx) => {
                        const IconComponent = tech.name.toLowerCase() === 'mysql' ? Database 
                                           : tech.name.toLowerCase().includes('tailwind') ? Layout 
                                           : tech.name.toLowerCase().includes('chart') ? CheckCircle2 
                                           : tech.name.toLowerCase().includes('pdo') ? Shield 
                                           : Terminal; // fallback for code like PHP, JS, React

                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest border cursor-default transition-shadow duration-300 hover:shadow-md"
                            style={{
                              color: tech.color,
                              borderColor: isDarkMode ? '#1f2228' : 'rgba(0,0,0,0.1)',
                              backgroundColor: isDarkMode ? '#111216' : '#ffffff',
                              boxShadow: `0 0 0 ${tech.color}00`, // Initial shadow state
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${tech.color}40, 0 0 0 1px ${tech.color}50`;
                              (e.currentTarget as HTMLElement).style.borderColor = tech.color;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 ${tech.color}00`;
                              (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#1f2228' : 'rgba(0,0,0,0.1)';
                            }}
                          >
                            <IconComponent className="w-3.5 h-3.5" style={{ color: tech.color }} />
                            <span>{tech.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedProject.id === 'proj_identify' && (
                  <div className="border-t pt-8 mt-5">
                    <DentistrySystemScreenshots isDarkMode={isDarkMode} isModalMode={true} />
                  </div>
                )}

                {selectedProject.id === 'proj_ecommerce_2022' && (
                  <div className="border-t pt-8 mt-5">
                    <EcommerceWebScreenshots isDarkMode={isDarkMode} isModalMode={true} />
                  </div>
                )}

                {selectedProject.id === 'proj_adobe_xd' && (
                  <div className="border-t pt-8 mt-5">
                    <AdobeXdRecordings isDarkMode={isDarkMode} isModalMode={true} />
                  </div>
                )}

                {selectedProject.id === 'proj_market_freelancer' && (
                  <div className="border-t pt-8 mt-5">
                    <MarketFreelancerScreenshots isDarkMode={isDarkMode} isModalMode={true} />
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className={`flex items-center gap-3 pt-4 border-t font-mono text-[11px] ${isDarkMode ? 'border-stone-850' : 'border-stone-100'}`}>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 hover:bg-opacity-90 transition-all font-semibold inline-flex items-center gap-1 rounded-sm ${
                      isDarkMode ? 'bg-cyan-400 text-stone-950 font-bold' : 'bg-stone-900 text-white'
                    }`}
                  >
                    Launch Live Demo <ExternalLink className="w-3 h-3 text-stone-350" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 border transition-all inline-flex items-center gap-1.5 rounded-sm font-semibold ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 hover:border-stone-400 hover:text-white'
                        : 'bg-stone-900 border-stone-700 text-white hover:bg-stone-800'
                    }`}
                  >
                    <Github className="w-3.5 h-3.5" /> View Source Repository
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* CREDENTIALS CV VERIFIER MODAL OVERLAY */}
      {showCvModal && (
        <div 
          onClick={() => setShowCvModal(false)}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          id="cv-details-overlay"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl relative animate-fade-in p-6 select-text rounded-lg ${
              isDarkMode ? 'bg-[#0c0d12] border border-stone-800' : 'bg-stone-50 border border-stone-200'
            }`}
          >
            {/* Close */}
            <button
              id="close-cv-trigger"
              onClick={() => setShowCvModal(false)}
              className={`absolute top-4 right-4 z-25 w-9 h-9 flex items-center justify-center border cursor-pointer transition-all rounded-full ${
                isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300' : 'bg-white border-stone-200 hover:border-stone-400 text-stone-950'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Quick Action bar with Download Resume */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-700/10 dark:border-stone-805/40 pb-4 mb-6 pr-12">
              <div>
                <h4 className={`text-base font-serif font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>Official CV & Professional Resume</h4>
                <p className={`text-[11px] font-sans ${isDarkMode ? 'text-stone-450' : 'text-stone-500'}`}>High-fidelity representation of experiences and credentials.</p>
              </div>
              <button
                id="download-pdf-btn"
                disabled={isDownloadingPdf}
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:bg-emerald-800 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all rounded-md cursor-pointer shadow-lg shadow-emerald-650/15 group"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{isDownloadingPdf ? "Generating PDF..." : "Download PDF Resume"}</span>
              </button>
            </div>

            {/* ON SCREEN PDF PREVIEW */}
            <div className="w-full h-[75vh] bg-stone-100/50 rounded-md overflow-hidden border border-stone-200 dark:border-stone-800 shadow-inner">
              <iframe 
                src={`${cvPdfUrl}#view=FitH`}
                className="w-full h-full"
                title="Professional CV Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED printable resume content (completely hidden inside screen view, is display: block only under @media print) */}
      <div id="cv-print-area">
        {/* PAGE 1 */}
        <div className="print-page font-serif leading-relaxed text-black bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          
          <div className="text-center flex flex-col gap-[3px] select-text">
            <h2 className="text-[22pt] font-bold tracking-tight text-center uppercase" style={{ margin: '0 0 4px 0' }}>
              Joshz Raniel D. Marasigan
            </h2>
            <p className="text-[11pt] text-stone-900 tracking-wide" style={{ margin: '0' }}>
              Alangilan, Batangas City, 4200
            </p>
            <p className="text-[11pt] text-stone-900 tracking-wide" style={{ margin: '0' }}>
              +639812243106
            </p>
            <p className="text-[11pt] text-stone-900 tracking-wide" style={{ margin: '0 0 8px 0' }}>
              joshzraniel@gmail.com
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '4px 0 12px 0' }} />

          {/* SUMMARY */}
          <div style={{ margin: '0 0 14px 0' }}>
            <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
              SUMMARY
            </h3>
            <p className="text-[11pt]" style={{ textAlign: 'justify', lineHeight: '1.4', margin: '0' }}>
              Detailed-oriented IT professional and BSIT candidate specializing in Multimedia, with a diverse technical background spanning enterprise infrastructure and hardware maintenance. Proven track record in campus wide technical troubleshooting as an IT Support Intern at LPU Batangas, having successfully managed campus-wide IT support at LPU Batangas, including network connectivity, hardware repair, and Microsoft software ecosystems and windows. Further strengthened technical expertise through an internship at Casedist Xray, overseeing specialized X-ray systems equipment maintenance alongside HR data encoding and administrative workflows. Committed to delivering high-level system reliability and efficient technical supervision to ensure seamless business operations.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '12px 0' }} />

          {/* AWARDS AND CERTIFICATIONS */}
          <div style={{ margin: '0 0 14px 0' }}>
            <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
              AWARDS AND CERTIFICATIONS
            </h3>
            
            <ul style={{ paddingLeft: '15px', margin: '0', listStyleType: 'disc' }}>
              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Google IT Support Professional Certificate</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>April 2026</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Google/ Coursera</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>CCNA: Switching, Routing and Wireless Essentials</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>June 2025</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>CCNA: Introduction to Networks</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>July 2024</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Networking Basics</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>December 2025</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Microsoft Office Specialist: Excel Associate</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>December 2025</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Microsoft</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Introduction to Cybersecurity Essentials</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>May 2025</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>IBM</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Partner: NDG Linux Unhatched</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>April 2024</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>CCNA:Computer Troubleshooting and Repair</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>2025</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>CCNA: Enterprise Networking, Security, and Automation</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>2025</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>

              <li style={{ margin: '0 0 9px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Partner: NDG Linux Unhatched</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>2024</span>
                </div>
                <p style={{ fontStyle: 'italic', margin: '1px 0 0 0', fontSize: '10.5pt' }}>Cisco Systems Inc (CISCO)</p>
              </li>
            </ul>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '12px 0' }} />

          {/* ACADEMIC AWARDS */}
          <div style={{ margin: '0 0 14px 0' }}>
            <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
              ACADEMIC AWARDS & LEADERSHIP
            </h3>
            <ul style={{ paddingLeft: '15px', margin: '0', listStyleType: 'disc' }}>
              <li style={{ margin: '0 0 6px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>3rd Place, Hackathon/Pitching Competition</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>2024</span>
                </div>
              </li>
              <li style={{ margin: '0 0 6px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                  <span>Dean’s Lister</span>
                  <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>A.Y. 2022-2023</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* PAGE 2 */}
        <div className="print-page font-serif leading-relaxed text-black bg-white" style={{ fontFamily: "'Times New Roman', Times, serif", pageBreakBefore: 'always', breakBefore: 'page', paddingTop: '0.2in' }}>
          
          {/* WORK AND EXPERIENCE */}
          <div style={{ margin: '0 0 14px 0' }}>
            <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
              WORK AND EXPERIENCE
            </h3>

            {/* Job 1 */}
            <div style={{ margin: '0 0 15px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11pt' }}>
                <span style={{ fontWeight: 'bold' }}>IT Technician / Office Desk Intern</span>
                <span style={{ fontSize: '10.5pt' }}>February 2026 - June 2026</span>
              </div>
              <p style={{ fontStyle: 'italic', margin: '1px 0 4px 0', fontSize: '10.5pt' }}>Casedist Inc.</p>
              <ul style={{ paddingLeft: '17px', margin: '0', listStyleType: 'disc', fontSize: '11pt' }}>
                <li style={{ margin: '0 0 3px 0' }}>Assisted in the maintenance, inspection, and monitoring of Rapiscan X-ray machines.</li>
                <li style={{ margin: '0 0 3px 0' }}>Supported technical and administrative operations through troubleshooting, documentation, and report preparation.</li>
                <li style={{ margin: '0 0 3px 0' }}>Managed scanning, encoding, and organization of maintenance records using Excel and office systems.</li>
                <li style={{ margin: '0 0 3px 0' }}>Coordinated schedules, handled client communication, and assisted with front desk operations.</li>
                <li style={{ margin: '0 0 3px 0' }}>Gained experience in technical support, equipment handling, and workplace documentation procedures.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div style={{ margin: '0 0 15px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11pt' }}>
                <span style={{ fontWeight: 'bold' }}>IT Support Intern</span>
                <span style={{ fontSize: '10.5pt' }}>April 2026 – June 2026</span>
              </div>
              <p style={{ fontStyle: 'italic', margin: '1px 0 4px 0', fontSize: '10.5pt' }}>Lyceum of the Philippines University – Batangas</p>
              <ul style={{ paddingLeft: '17px', margin: '0', listStyleType: 'disc', fontSize: '11pt' }}>
                <li style={{ margin: '0 0 3px 0' }}>Assisted in network troubleshooting, internet connectivity checking, and Wi-Fi monitoring across laboratories and campus facilities.</li>
                <li style={{ margin: '0 0 3px 0' }}>Supported computer setup, cabling, printer maintenance, and technical troubleshooting for offices and laboratories.</li>
                <li style={{ margin: '0 0 3px 0' }}>Conducted speed testing and monitored network devices, including routers, switches, and Deco systems.</li>
                <li style={{ margin: '0 0 3px 0' }}>Helped organize and install computer equipment during office and laboratory transfers and system setup activities.</li>
                <li style={{ margin: '0 0 3px 0' }}>Assisted students and staff with technical concerns, including the excel or microsoft and there webpage of Lpu-b and laboratory monitoring, and basic IT support services.</li>
                <li style={{ margin: '0 0 3px 0' }}>Gained hands-on experience in hardware maintenance, technical support, network monitoring, and workplace IT operations.</li>
              </ul>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '12px 0' }} />

          {/* EDUCATION */}
          <div style={{ margin: '0 0 14px 0' }}>
            <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
              EDUCATION
            </h3>

            <div style={{ margin: '0 0 12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                <span>Bachelor of Science in Information and Technology</span>
                <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>2022 - 2026</span>
              </div>
              <p style={{ fontStyle: 'italic', margin: '1px 0', fontSize: '10.5pt' }}>Specialized in Multimedia Technology</p>
              <p style={{ margin: '1px 0', fontSize: '10.5pt' }}>Lyceum of the Philippines University - Batangas</p>
              <p style={{ margin: '1px 0', fontSize: '10pt', color: '#444' }}>Capitol Site, Batangas City</p>
            </div>

            <div style={{ margin: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                <span>Senior Highschool Graduate</span>
                <span style={{ fontWeight: 'normal', fontSize: '10.5pt' }}>2020 - 2022</span>
              </div>
              <p style={{ margin: '1px 0', fontSize: '10.5pt' }}>Lyceum of the Philippines University - Batangas</p>
              <p style={{ margin: '1px 0', fontSize: '10pt', color: '#444' }}>Capitol Site, Batangas City</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '12px 0' }} />

          {/* ADDITIONAL INFORMATION */}
          <div style={{ margin: '0' }}>
            <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
              ADDITIONAL INFORMATION
            </h3>
            <ul style={{ paddingLeft: '17px', margin: '0', listStyleType: 'disc', fontSize: '11pt' }}>
              <li style={{ margin: '0 0 4px 0' }}>
                <span style={{ fontWeight: 'bold' }}>Soft Skills:</span> Problem-Solving & Critical Thinking, Teamwork & Collaboration, Adaptability & Flexibility
              </li>
              <li style={{ margin: '0' }}>
                <span style={{ fontWeight: 'bold' }}>Technical Skills:</span> Operating Systems, Software & Productivity, Networking, IT Operations, Hardware
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* GLOBAL INTERACTIVE CLICK SIGNAL LAYER */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {ripples.map(r => (
          <div key={r.id} style={{ left: r.x, top: r.y }} className="absolute -translate-x-1/2 -translate-y-1/2 select-none">
            {/* Expanding Circle Pulse */}
            <span className="absolute block w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/40 animate-ping opacity-70" />
            <span className="absolute block w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/25 scale-125 animate-pulse duration-300" />
            
            {/* Tiny Floating Sparkle Info Tag */}
            <div className={`mt-5 whitespace-nowrap font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-md animate-float-up-fade ${
              isDarkMode ? 'bg-[#111116] text-emerald-300 border border-stone-800' : 'bg-white text-emerald-800 border border-stone-200'
            }`}>
              <Sparkles className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
              <span>{r.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* REACTIVE SCROLL CO-PILOT ASSISTANT */}
      <AnimatePresence>
        {showProgressPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-6 right-6 z-40 w-80 md:w-96 border rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl ${
              isDarkMode ? 'bg-[#0f0f15]/95 border-emerald-500/30 text-stone-200 shadow-emerald-900/20' : 'bg-white/95 border-emerald-300 text-stone-900 shadow-emerald-500/10'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              isDarkMode ? 'bg-[#15151b] border-emerald-500/20' : 'bg-emerald-50/80 border-emerald-200/50'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                  <Bot className="w-4 h-4 text-emerald-500" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse border border-[#0f0f15]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-bold tracking-wide">Nexus Assistant</span>
                  <span className="font-mono text-[8px] text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" /> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm font-semibold tracking-wider border ${
                  isDarkMode ? 'bg-[#0f0f15] border-stone-800 text-stone-400' : 'bg-white border-stone-200 text-stone-500'
                }`}>
                  {scrollProgress}% Read
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowProgressPopup(false); }} 
                  className={`p-1 rounded-sm transition-colors cursor-pointer ${
                    isDarkMode ? 'hover:bg-stone-800 text-stone-500 hover:text-white' : 'hover:bg-stone-200 text-stone-400 hover:text-stone-900'
                  }`}
                  title="Minimize Companion"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            {/* Chat Area */}
            <div className={`p-4 flex flex-col gap-4 max-h-64 overflow-y-auto ${
              isDarkMode ? 'bg-[#0b0b0f]/50' : 'bg-[#faf9f5]/50'
            }`}>
              
              {/* Bot Message */}
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Bot className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className={`p-2.5 rounded-r-xl rounded-bl-xl text-xs font-sans leading-relaxed shadow-sm ${
                  isDarkMode ? 'bg-[#15151b] border border-stone-800 text-stone-300' : 'bg-white border border-stone-200 text-stone-700'
                }`}>
                  {activeScrollSection === 'Hero' && "Greetings! I'm Joshz's AI Companion. Notice how this portfolio is engineered for responsiveness? Scroll down to explore my full-stack capabilities."}
                  {activeScrollSection === 'About' && "This is my core profile. I combine Cisco enterprise networking with rapid, AI-assisted full-stack development to build robust systems."}
                  {activeScrollSection === 'Projects' && "You're viewing my case studies. You can click on any project card to open an interactive 3D layout or deep dive into the blueprint."}
                  {activeScrollSection === 'Certs' && "These are my verified certifications. I hold active credentials from Cisco, IBM, and Google across cloud, networking, and creative design."}
                  {activeScrollSection === 'Contact' && "Let's work together! You can use the buttons below to reach out via email or directly connect through my professional networks."}
                </div>
              </div>
              
              {/* Context Actions */}
              <div className="flex flex-col gap-2 mt-2">
                <span className={`font-mono text-[8px] uppercase tracking-widest pl-1 ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Suggested Actions</span>
                <div className="flex flex-wrap gap-2">
                  {activeScrollSection === 'Hero' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }); }} 
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 font-sans text-xs font-medium rounded-full transition-colors"
                    >
                      Explore Profile
                    </button>
                  )}
                  {activeScrollSection === 'About' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowCvModal(true); }} 
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 font-sans text-xs font-medium rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> View CV
                    </button>
                  )}
                  {activeScrollSection === 'Projects' && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveCategory('All'); }} 
                        className={`px-3 py-1.5 border font-sans text-xs font-medium rounded-full transition-colors ${isDarkMode ? 'bg-[#15151b] border-stone-800 text-stone-300 hover:border-emerald-500/50' : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-400'}`}
                      >
                        Show All
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); document.getElementById('screenshots-section')?.scrollIntoView({ behavior: 'smooth' }); }} 
                        className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 font-sans text-xs font-medium rounded-full transition-colors flex items-center gap-1.5"
                      >
                        <Layout className="w-3.5 h-3.5" /> View Layouts
                      </button>
                    </>
                  )}
                  {activeScrollSection === 'Certs' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); document.getElementById('education-section')?.scrollIntoView({ behavior: 'smooth' }); }} 
                      className={`px-3 py-1.5 border font-sans text-xs font-medium rounded-full transition-colors ${isDarkMode ? 'bg-[#15151b] border-stone-800 text-stone-300 hover:border-emerald-500/50' : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-400'}`}
                    >
                      View Academics
                    </button>
                  )}
                  {activeScrollSection === 'Contact' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDownloadPdf(); }} 
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 font-sans text-xs font-medium rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Resume
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Input area mockup */}
            <div className={`px-4 py-3 border-t flex items-center gap-2 ${
              isDarkMode ? 'bg-[#15151b] border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-200/50'
            }`}>
              <div className={`flex-1 px-3 py-1.5 rounded-full border flex items-center justify-between ${
                isDarkMode ? 'bg-[#0f0f15] border-stone-800' : 'bg-white border-stone-200'
              }`}>
                <span className={`text-xs font-sans italic ${isDarkMode ? 'text-stone-600' : 'text-stone-400'}`}>Listening to scroll context...</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showProgressPopup && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={(e) => { e.stopPropagation(); setShowProgressPopup(true); }}
            className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group font-sans border border-emerald-400/30"
            title="Restore Assistant Companion"
          >
            <Bot className="w-5 h-5 animate-bounce" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 font-mono text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
              Nexus Assist
            </span>
            <span className="w-2.5 h-2.5 bg-emerald-300 border-[2px] border-emerald-600 rounded-full absolute -top-1 -right-1 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
