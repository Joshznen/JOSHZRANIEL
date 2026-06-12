import { useState } from 'react';
import { Network, Video, Cpu, Sparkles, Check } from 'lucide-react';

interface PitchConfig {
  role: string;
  icon: any;
  customPitch: string;
  keySkills: string[];
  keyCerts: string[];
  recommendedProject: string;
}

const pitches: Record<string, PitchConfig> = {
  general: {
    role: 'IT & Multimedia generalist',
    icon: Sparkles,
    customPitch: 'As a multi-talented IT Professional with a Multimedia Specialization, I bridge the critical gap between complex server environments and high-fidelity user experiences. With certifications spanning Cisco CCNA networking, IBM AI models, Google IT support, and Adobe video engineering, I offer cross-functional expertise that ensures technical reliability while driving customer-facing design excellence.',
    keySkills: ['Computer Troubleshooting & Diagnostic Lab', 'Cisco Network Security & Routing', 'Adobe Premiere Pro Video Editorial', 'MySQL Database Normalized Structures', 'Figma Interactive Screens Prototyping'],
    keyCerts: ['Google IT Support Professional Certificate', 'CCNA: Switching, Routing, and Wireless Essentials', 'IBM Artificial Intelligence Fundamentals', 'Coursera Creative Video Editing Badges'],
    recommendedProject: 'Campus Network Topologies or Neural Doc Classifier'
  },
  networking: {
    role: 'Network & System Administrator',
    icon: Network,
    customPitch: 'Leveraging multi-course Cisco Routing & Switching Academy credentials (three specialized tracks) and Linux OS terminal mastery, I specialize in designing, configuring, and maintaining enterprise infrastructure topology. My hands-on lab experiences include setting up VLSM subnets, managing firewall rules, configuring mesh access networks, and securing network routers to ensure 99.9% operational performance.',
    keySkills: ['Cisco Enterprise Routing & Switching Protocols', 'IP Subnetting (VLSM/CIDR Layout)', 'VLAN Isolation & Inter-VLAN Configuration', 'Computer Troubleshooting & Motherboard Diagnostics', 'Linux Command Terminal & Shell Permissions'],
    keyCerts: ['CCNA: Enterprise Networking, Security, and Automation', 'CCNA: Switching, Routing, and Wireless Essentials', 'CCNA: Introduction to Networks', 'Partner: NDG Linux Unhatched Badge'],
    recommendedProject: 'Enterprise Multi-Segment Campus Network Topology'
  },
  multimedia: {
    role: 'Multimedia Specialist & Designer',
    icon: Video,
    customPitch: 'My specialization in Multimedia Technology from Lyceum of the Philippines University equips me with strong visual principles across interactive media, non-linear video editing, and motion asset curation. I combine high-end design sensibilities (typography, spacing, heuristics) with technical software capabilities like Adobe Premiere Pro, Canva Pro, Powtoon, and VR 360 formats to tell powerful, compliance-checked digital stories.',
    keySkills: ['Adobe Premiere Pro Professional NLE Timeline Editing', 'Canva Brand Identity Framing & Graphic Design', 'Interactive UI/UX Wireframing & Responsive Prototypes', 'VR & 360-degree Video Synthesis Methods', 'International Copyright & Asset Licensing Guidelines'],
    keyCerts: ['Adobe Premiere Pro Quickstart Editor Credential', 'Using Video in Social Media Posts with Canva', 'VR and 360 Video Production (Google AR/VR)', 'Copyright for Multimedia (Duke / Emory / UNC)'],
    recommendedProject: 'Commercial Brand Reel & Cinema System Portfolio'
  },
  support: {
    role: 'IT Support & Operations Engineer',
    icon: Cpu,
    customPitch: 'Equipped with the comprehensive Google IT Support Professional Certificate, active on-campus helpdesk internship experience, and medical hardware monitoring tasks, I diagnose complex operating conflicts with absolute precision. I am dedicated to keeping computer hardware healthy, standardizing business logs using optimized Excel spreadsheets, and resolving system malfunctions rapidly under strict timelines.',
    keySkills: ['Advanced Computer Diagnostics & System Repairs', 'Operating System Provisioning (OS Windows/Linux)', 'Active Network Diagnostics (Ping, Trace, DNS Audit)', 'Microsoft Excel Spreadsheet formulas & Data Processing', 'Technical Documentation Compliance & Ticket Logbooks'],
    keyCerts: ['Google IT Support Professional Certificate', 'Technical Support Fundamentals (Google)', 'CCNA: Computer Troubleshooting and Repair', 'Microsoft Office Specialist: Excel Associate'],
    recommendedProject: 'Enterprise System Troubleshooting logbook & SQL Admin Database'
  }
};

export default function PitchBuilder() {
  const [activeTab, setActiveTab] = useState<keyof typeof pitches>('general');
  const currentPitch = pitches[activeTab];
  const IconComponent = currentPitch.icon;

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden" id="pitch-builder-root">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 glow-spot-1 rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col gap-6">
        <div className="border-b border-light/10 pb-4">
          <span className="text-xs font-mono tracking-widest text-electric uppercase font-bold">Recruiter Companion</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-1">
            Dynamic Role Personalizer
          </h3>
          <p className="text-gray-400 text-sm mt-1.5 font-sans">
            Select the specific role you are scouting for and witness Joshz's portfolio narrative, key strengths, and essential credentials align dynamically to match your criteria in real time!
          </p>
        </div>

        {/* Dynamic selector Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3" id="pitch-tabs">
          {(Object.keys(pitches) as Array<keyof typeof pitches>).map((key) => {
            const pitch = pitches[key];
            const TabIcon = pitch.icon;
            const isActive = activeTab === key;
            return (
              <button
                id={`pitch-btn-${key}`}
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs md:text-sm font-display font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-electric/15 text-electric border-electric/40 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                    : 'bg-slate-cyber/40 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-electric' : 'text-gray-400'}`} />
                <span className="capitalize">{key === 'general' ? 'Universal Focus' : key}</span>
              </button>
            );
          })}
        </div>

        {/* Pitch Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          {/* Left Column: Narrative Box */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4 p-5 rounded-xl bg-slate-cyber-light/40 border border-white/5 relative">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center border border-electric/20">
                  <IconComponent className="w-4 h-4 text-electric" />
                </div>
                <span className="font-mono text-xs font-semibold uppercase text-electric tracking-wider">
                  Aligned Pitch Value
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-sm md:text-base italic">
                "{currentPitch.customPitch}"
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-gray-400">
                Primary Case Recommendation:
              </span>
              <span className="px-3 py-1 text-xs font-display font-medium rounded-full bg-electric/10 text-electric border border-electric/20">
                {currentPitch.recommendedProject}
              </span>
            </div>
          </div>

          {/* Right Column: Key Skills & Credentials List */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Aligned Skills section */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-electric rounded-full"></span>
                Top-Priority Alignments
              </h4>
              <ul className="flex flex-col gap-2">
                {currentPitch.keySkills.map((specSkill, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans leading-tight">
                    <Check className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />
                    <span>{specSkill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Certifications section */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-white/5">
              <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-electric rounded-full"></span>
                Gold-Standard Credentials
              </h4>
              <div className="flex flex-col gap-1.5">
                {currentPitch.keyCerts.map((certItem, i) => (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-slate-cyber/50 border border-white/5 text-[11px] text-gray-300 font-mono">
                    <span className="w-1 h-1 bg-electric rounded-full"></span>
                    <span className="truncate">{certItem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
