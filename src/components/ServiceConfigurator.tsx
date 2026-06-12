import { useState } from 'react';
import { services } from '../data';
import { Network, Cpu, Video, Figma, Database, Bot, Check, Clipboard, Sparkles } from 'lucide-react';

export default function ServiceConfigurator() {
  const [selectedInquiryIds, setSelectedInquiryIds] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedInquiryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Figma':
        return <Figma className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const selectedServices = services.filter((srv) => selectedInquiryIds.includes(srv.id));

  // Build generated email message automatically
  const generatedProposal = (() => {
    if (selectedServices.length === 0) {
      return '';
    }
    const serviceList = selectedServices.map((s, i) => `${i + 1}. ${s.title}`).join('\n');
    return `Hello Joshz,\n\nI visited your interactive portfolio and generated a custom project inquiry brief:\n\n-- Inquiry Services --\n${serviceList}\n\n-- Project Timeline & Custom Context --\n${customNotes || 'Looking for initial roadmap advice.'}\n\nPlease let me know your availability for a consultant virtual intake session to review specifications and timelines.\n\nBest regards,\n[My Name]\n[Organization / Email]`;
  })();

  const handleCopy = () => {
    if (!generatedProposal) return;
    navigator.clipboard.writeText(generatedProposal);
    setCopiedNotification(true);
    setTimeout(() => {
      setCopiedNotification(false);
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="service-configurator-root">
      {/* Left Column: List of Services in Glass Cards */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="border-b border-light/5 pb-2">
          <span className="text-xs font-mono tracking-widest text-electric uppercase font-bold">Services Suite</span>
          <h3 className="text-xl md:text-2xl font-display font-medium text-white mt-0.5">
            Interactive Freelance Services Configure
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-sans">
            Review detailed capabilities and select the services that match your organizational problems to generate an instant project brief.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="service-grid-cards">
          {services.map((srv) => {
            const isSelected = selectedInquiryIds.includes(srv.id);
            return (
              <div
                id={`srv-card-${srv.id}`}
                key={srv.id}
                onClick={() => toggleSelect(srv.id)}
                className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 relative select-none ${
                  isSelected
                    ? 'bg-electric/10 border-electric shadow-[0_0_15px_rgba(0,229,255,0.15)] ring-1 ring-electric/30'
                    : 'bg-slate-cyber/50 border-white/5 hover:border-white/10 hover:bg-slate-cyber-light/45'
                }`}
              >
                {/* Select visual tick */}
                <span className={`absolute top-4 right-4 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  isSelected ? 'bg-electric border-electric text-slate-cyber' : 'border-white/10 text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </span>

                <div className="flex flex-col gap-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    isSelected ? 'bg-electric/15 text-electric border-electric/30' : 'bg-slate-cyber-light border-white/5 text-gray-400'
                  }`}>
                    {getIcon(srv.iconName)}
                  </div>
                  <h4 className="text-sm font-display font-bold text-white mt-1 pr-6 leading-tight">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mt-0.5">
                    {srv.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2.5 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    Highlighted Outcomes:
                  </span>
                  <div className="flex flex-col gap-1">
                    {srv.features.slice(0, 2).map((feat, i) => (
                      <span key={i} className="text-[10px] text-gray-300 font-sans truncate">
                        • {feat}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Mini Project Proposal Builder */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-electric/20 h-full flex flex-col justify-between gap-6 relative overflow-hidden" id="inquiry-briefcase">
          <div className="absolute top-0 right-0 w-44 h-44 glow-spot-2 rounded-full pointer-events-none"></div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-electric font-bold tracking-widest uppercase">
                Interactive Briefcase
              </span>
              <span className="text-[10px] bg-electric/10 text-electric font-mono px-2 py-0.5 rounded">
                {selectedServices.length} Selected
              </span>
            </div>

            {selectedServices.length > 0 ? (
              <div className="flex flex-col gap-4">
                {/* List of items selected */}
                <div className="flex flex-col gap-2 max-h-[170px] overflow-y-auto pr-1">
                  {selectedServices.map((s) => (
                    <div key={s.id} className="flex items-center justify-between bg-slate-cyber/70 p-2.5 rounded-lg border border-white/5 text-xs font-sans">
                      <span className="text-white font-medium">{s.title}</span>
                    </div>
                  ))}
                </div>

                {/* Additional contextual notes user input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Add custom project notes / parameters:
                  </label>
                  <textarea
                    id="briefcase-notes"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Describe deadlines, integration architectures, target networks, or custom design details..."
                    rows={2}
                    className="w-full text-xs text-gray-300 p-2.5 rounded-lg bg-slate-cyber/80 border border-white/10 focus:outline-none focus:border-electric font-sans resize-none"
                  />
                </div>

                {/* Copyable codeblock */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Generated Proposal Copy-Paste:
                  </span>
                  <div className="p-3 bg-slate-cyber/95 border border-white/5 rounded-lg text-[10px] font-mono text-gray-400 whitespace-pre-wrap max-h-[150px] overflow-y-auto leading-relaxed">
                    {generatedProposal}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 font-sans flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-gray-400 animate-pulse-slow">
                  +
                </div>
                <h4 className="font-display font-medium text-white text-sm">Briefcase Empty</h4>
                <p className="text-xs text-gray-400 max-w-[250px] mx-auto">
                  Click on one or more professional service cards to dynamically compile your project proposal!
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              id="briefcase-copy-btn"
              disabled={selectedServices.length === 0}
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-xs md:text-sm tracking-wide transition-all ${
                selectedServices.length > 0
                  ? 'bg-electric text-slate-cyber hover:bg-white cursor-pointer active:scale-[0.98]'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <Clipboard className="w-4 h-4" />
              <span>{copiedNotification ? 'Proposal Copied!' : 'Copy Proposal Text'}</span>
            </button>
            {selectedServices.length > 0 && (
              <p className="text-[10px] text-center text-gray-500 mt-2 font-mono">
                Copy and paste the proposal directly into the contact form!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
