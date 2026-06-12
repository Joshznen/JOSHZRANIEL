import { useState } from 'react';
import { techEcosystem } from '../data';
import { Network, Database, Bot, Play, Cpu, Sparkles } from 'lucide-react';

type TechGroup = 'network' | 'data' | 'ai' | 'media' | 'sys';

interface TechCategorySpec {
  id: TechGroup;
  title: string;
  icon: any;
  color: string;
  bgLight: string;
  bannerGradient: string;
  useCase: string;
  credentialFocus: string;
}

const techCategories: TechCategorySpec[] = [
  {
    id: 'network',
    title: 'Cisco Routing & Networking',
    icon: Network,
    color: 'text-blue-400',
    bgLight: 'bg-blue-400/10',
    bannerGradient: 'from-blue-600/20 via-cyan-500/10 to-transparent',
    useCase: 'Designing classless VLSM structural subnets and deploying dynamic OSPF tables in simulated and local university labs.',
    credentialFocus: 'CCNA 3-Track Academy Curriculum Completed'
  },
  {
    id: 'data',
    title: 'Relational Database Mechanics',
    icon: Database,
    color: 'text-emerald-400',
    bgLight: 'bg-emerald-400/10',
    bannerGradient: 'from-emerald-600/20 via-cyan-500/10 to-transparent',
    useCase: 'Creating fully indexed, 3NF-compliant relational schemas with automated trigger audits and stored transaction logging.',
    credentialFocus: 'Systems Analysis & Business Informatics'
  },
  {
    id: 'ai',
    title: 'Machine Learning & Integration',
    icon: Bot,
    color: 'text-purple-400',
    bgLight: 'bg-purple-400/10',
    bannerGradient: 'from-purple-600/20 via-purple-500/10 to-transparent',
    useCase: 'Structuring dense neural layers utilizing the Keras sequential framework, training diagnostic labels, and prompt parsing.',
    credentialFocus: 'IBM SkillsBuild Advanced Badging'
  },
  {
    id: 'media',
    title: 'Multimedia Design & Production',
    icon: Play,
    color: 'text-pink-400',
    bgLight: 'bg-pink-400/10',
    bannerGradient: 'from-pink-600/20 via-pink-500/10 to-transparent',
    useCase: 'Crafting corporate brand timelines, editing 360-degree high-fidelity videos in Premiere Pro, and securing visual copyrights.',
    credentialFocus: 'BSIT Specialization in Multimedia Technology'
  },
  {
    id: 'sys',
    title: 'System & Admin Environments',
    icon: Cpu,
    color: 'text-cyan-400',
    bgLight: 'bg-cyan-400/10',
    bannerGradient: 'from-cyan-600/20 via-blue-500/10 to-transparent',
    useCase: 'Deploying custom Windows active directories, administering complex permissions, running NDG Linux terminal scripts, and client diagnostic repair procedures.',
    credentialFocus: 'Google IT Support Specialist Pathway Complete'
  }
];

export default function TechMap() {
  const [selectedGroup, setSelectedGroup] = useState<TechGroup>('network');

  const currentGroupSpec = techCategories.find((cat) => cat.id === selectedGroup)!;
  const GroupIcon = currentGroupSpec.icon;

  const groupSkills = techEcosystem.filter((tech) => tech.category === selectedGroup);

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col gap-6 relative" id="tech-map-root">
      <div>
        <span className="text-xs font-mono tracking-widest text-electric uppercase font-bold">Tech Ecosystem</span>
        <h3 className="text-2xl font-display font-medium text-white mt-1">Interlinked System Architectures</h3>
        <p className="text-gray-400 text-sm mt-1 font-sans">
          Click on any technical domain to activate detailed node lists, verified competency parameters, and real-world implementation use cases.
        </p>
      </div>

      {/* Dynamic Selector Badges */}
      <div className="flex flex-wrap gap-2.5" id="tech-group-tabs">
        {techCategories.map((cat) => {
          const TabIcon = cat.icon;
          const isSelected = selectedGroup === cat.id;
          return (
            <button
              id={`tech-tab-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedGroup(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-electric/15 text-electric border-electric font-bold shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                  : 'bg-slate-cyber/50 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              <TabIcon className="w-4 h-4 shrink-0" />
              <span>{cat.title.split(' ')[0]} Focus</span>
            </button>
          );
        })}
      </div>

      {/* Grid Dashboard representation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Specific ecosystem nodes with skill gauges */}
        <div className="lg:col-span-6 flex flex-col gap-4 bg-slate-cyber-light/20 p-5 rounded-xl border border-white/5 relative">
          <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center justify-between">
            <span>Verified Proficiency Indicators</span>
            <span className="text-[10px] text-electric uppercase">Node State: ACTIVE</span>
          </h4>

          <div className="flex flex-col gap-4 mt-2">
            {groupSkills.map((tech, i) => (
              <div key={i} className="flex flex-col gap-1.5 font-sans">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-200 font-medium">{tech.name}</span>
                  <span className="text-electric font-mono font-semibold">{tech.proficiency}%</span>
                </div>
                {/* Visual bar container */}
                <div className="w-full h-1.5 bg-slate-cyber rounded-full overflow-hidden">
                  <div
                    className="h-full bg-electric rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${tech.proficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Description and credentials showcase */}
        <div className={`lg:col-span-6 flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-gradient-to-br ${currentGroupSpec.bannerGradient} relative`}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${currentGroupSpec.bgLight} flex items-center justify-center border border-white/5`}>
                <GroupIcon className={`w-4 h-4 ${currentGroupSpec.color}`} />
              </div>
              <h4 className="text-md font-display font-bold text-white uppercase">
                {currentGroupSpec.title}
              </h4>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-electric font-semibold uppercase tracking-wider">
                Concrete Engineering Use-Case:
              </span>
              <p className="text-gray-300 font-sans text-sm leading-relaxed italic">
                "{currentGroupSpec.useCase}"
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
              High-Value Credentials Alignment:
            </span>
            <div className="px-3 py-2 rounded-lg bg-slate-cyber/75 border border-white/5 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-electric shrink-0" />
              <span className="text-xs text-gray-200 font-mono font-medium">
                {currentGroupSpec.credentialFocus}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
