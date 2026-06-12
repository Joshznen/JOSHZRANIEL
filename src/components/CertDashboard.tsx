import { useState, useMemo } from 'react';
import { Search, Trophy, CheckSquare, Layers, HelpCircle, ArrowUpRight, ExternalLink } from 'lucide-react';
import { certifications } from '../data';
import { Certification } from '../types';

export default function CertDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'Cisco' | 'IBM' | 'Google' | 'Coursera' | 'Other'>('all');

  // Stats calculation
  const stats = useMemo(() => {
    const total = certifications.length;
    const cisco = certifications.filter((c) => c.category === 'Cisco').length;
    const ibm = certifications.filter((c) => c.category === 'IBM').length;
    const google = certifications.filter((c) => c.category === 'Google').length;
    const others = total - (cisco + ibm + google);
    return { total, cisco, ibm, google, others };
  }, []);

  // Filter logic
  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
      const matchesSearch =
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.skillsHighlighted.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex flex-col gap-8" id="certifications-dashboard-root">
      {/* Visual KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3" id="cert-stats-grid">
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-l-electric">
          <div>
            <span className="text-gray-400 text-xs font-mono">Total Verified</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1">{stats.total}</h4>
          </div>
          <Trophy className="w-5 h-5 text-electric opacity-60" />
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <span className="text-gray-400 text-xs font-mono">Cisco NetAcad</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1">{stats.cisco}</h4>
          </div>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 font-mono px-2 py-1 rounded">CCNA</span>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-l-purple-500">
          <div>
            <span className="text-gray-400 text-xs font-mono">IBM AI & Security</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1">{stats.ibm}</h4>
          </div>
          <span className="text-[10px] bg-purple-500/10 text-purple-400 font-mono px-2 py-1 rounded">Cognitive</span>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-l-green-500">
          <div>
            <span className="text-gray-400 text-xs font-mono">Google Careers</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1">{stats.google}</h4>
          </div>
          <span className="text-[10px] bg-green-500/10 text-green-400 font-mono px-2 py-1 rounded">IT Support</span>
        </div>
        <div className="glass-panel p-4 col-span-2 lg:col-span-1 rounded-xl flex items-center justify-between border-l-4 border-l-cyan-400">
          <div>
            <span className="text-gray-400 text-xs font-mono">Specialized Courses</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1">{stats.others}</h4>
          </div>
          <span className="text-[10px] bg-cyan-400/10 text-cyan-400 font-mono px-2 py-1 rounded">Diverse</span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-cyber-light/30 p-4 rounded-xl border border-white/5">
        {/* Keywords input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            id="cert-search-input"
            type="text"
            placeholder="Search credential or highlighted skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 bg-slate-cyber/50 border border-white/5 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
          />
        </div>

        {/* Categories toggler */}
        <div className="flex flex-wrap items-center gap-1.5" id="cert-category-filters">
          {(['all', 'Cisco', 'IBM', 'Google', 'Coursera', 'Other'] as const).map((cat) => (
            <button
              id={`cert-btn-${cat}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-electric text-slate-cyber font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]'
                  : 'bg-slate-cyber/70 text-gray-400 border border-white/5 hover:border-white/10 hover:text-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Credentials' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials results layout */}
      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="cert-cards-container">
          {filteredCerts.map((cert, index) => {
            // Pick aesthetic styling based on categories
            const categoryTheme = {
              Cisco: { text: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-500/10', glow: 'shadow-blue-500/5' },
              IBM: { text: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-500/10', glow: 'shadow-purple-500/5' },
              Google: { text: 'text-green-400', bg: 'bg-green-400/5', border: 'border-green-500/10', glow: 'shadow-green-500/5' },
              Coursera: { text: 'text-indigo-400', bg: 'bg-indigo-400/5', border: 'border-indigo-500/10', glow: 'shadow-indigo-500/5' },
              TESDA: { text: 'text-red-400', bg: 'bg-red-400/5', border: 'border-red-500/10', glow: 'shadow-red-500/5' },
              Other: { text: 'text-cyan-400', bg: 'bg-cyan-400/5', border: 'border-cyan-500/10', glow: 'shadow-cyan-400/5' }
            }[cert.category] || { text: 'text-electric', bg: 'bg-electric/5', border: 'border-electric/10', glow: 'shadow-electric/5' };

            return (
              <div
                key={index}
                className={`glass-panel-interactive p-5 rounded-xl flex flex-col justify-between gap-4 border ${categoryTheme.border} ${categoryTheme.glow} relative group`}
              >
                {/* Decorative category badge top right */}
                <span className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-cyber-light border border-white/5 text-gray-400 select-none">
                  {cert.category}
                </span>

                <div className="flex flex-col gap-2">
                  <span className={`text-[11px] font-mono tracking-widest uppercase font-bold ${categoryTheme.text}`}>
                    {cert.issuer}
                  </span>
                  <h4 className="text-sm font-display font-medium text-white leading-snug pr-8 group-hover:text-electric transition-colors">
                    {cert.title}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-mono mt-0.5">
                    Completed: {cert.date}
                  </span>
                </div>

                <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsHighlighted.map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-sans px-2 py-0.5 rounded bg-slate-cyber text-gray-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-gray-500">
                    <span className="truncate max-w-[150px]">
                      ID: {cert.credentialId || 'Verifiable Pathway'}
                    </span>
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-slate-cyber transition-all text-[10px] font-bold uppercase shrink-0 hover:shadow-[0_0_10px_rgba(249,115,22,0.3)] cursor-pointer"
                      >
                        <span>Verify Record</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="flex items-center gap-0.5 text-electric/80 group-hover:text-electric transition-colors">
                        Academy Checked <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel text-center py-12 rounded-xl flex flex-col items-center justify-center gap-3">
          <HelpCircle className="w-10 h-10 text-gray-500" />
          <h4 className="font-display font-bold text-white text-lg">No Credentials Found</h4>
          <p className="text-gray-400 text-sm max-w-sm">
            We couldn't locate any certifications matching your search filters. Try adjusting your query or resetting category parameters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
            className="mt-2 px-4 py-1.5 text-xs text-slate-cyber bg-electric font-mono font-bold rounded-lg hover:bg-white transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
