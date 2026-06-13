import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Eye } from 'lucide-react';

interface LayoutItem {
  id: string;
  name: string;
  photo: string;
}

interface MarketFreelancerScreenshotsProps {
  isDarkMode: boolean;
  isModalMode?: boolean;
}

const PHOTO_BASE = '/assets/TITA ANLYN RENT/';

export default function MarketFreelancerScreenshots({ isDarkMode, isModalMode = false }: MarketFreelancerScreenshotsProps) {
  const [hoveredLayoutId, setHoveredLayoutId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; title: string } | null>(null);

  const listToRender: LayoutItem[] = Array.from({ length: 25 }, (_, i) => ({
    id: `img_${i + 1}`,
    name: `Selling Screenshot ${i + 1}`,
    photo: `${PHOTO_BASE}${i + 1}.png`
  }));

  const contentBody = (
    <div className="flex flex-col gap-16 select-text">
      <div className="flex flex-col gap-8 pt-6">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className={`text-2xl font-sans font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            Selling <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">Screenshot</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          <p className={`font-sans text-xs md:text-sm mt-2 max-w-lg ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Explore successful sales, rentals, and client interactions
          </p>
        </div>

        {/* Screenshots Grid Display - 2 photos per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="screenshots-layout-grid">
          {listToRender.map((layout) => {
            const isHovered = hoveredLayoutId === layout.id;
            return (
              <div
                key={layout.id}
                onMouseEnter={() => setHoveredLayoutId(layout.id)}
                onMouseLeave={() => setHoveredLayoutId(null)}
                className="overflow-hidden flex flex-col gap-2.5 group transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Box */}
                <div className={`aspect-[4/3] rounded-xl overflow-hidden relative shadow-md transition-shadow duration-300 group-hover:shadow-lg border ${
                  isDarkMode ? 'bg-stone-950 border-stone-850/40' : 'bg-stone-50 border-stone-200/50'
                }`}>
                  <img
                    src={layout.photo}
                    alt={layout.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay Zoom */}
                  <div className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setLightboxPhoto({ src: layout.photo, title: layout.name })}
                      className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 transition-all text-[10px] font-bold leading-none uppercase font-mono tracking-wider flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const lightboxEl = lightboxPhoto ? ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
      onClick={() => setLightboxPhoto(null)}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="relative max-w-5xl w-full flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-xs text-stone-300 uppercase tracking-widest">{lightboxPhoto.title}</span>
          <button
            onClick={() => setLightboxPhoto(null)}
            className="text-stone-400 hover:text-white text-xs font-mono uppercase tracking-widest border border-stone-700 hover:border-stone-400 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>
        <img
          src={lightboxPhoto.src}
          alt={lightboxPhoto.title}
          className="w-full rounded-xl shadow-2xl border border-stone-700/60 object-contain"
          style={{ maxHeight: '82vh' }}
        />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {lightboxEl}

      {isModalMode ? contentBody : (
        <section className={`border-y py-24 px-6 sm:px-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0b0c10] border-stone-900' : 'bg-stone-50 border-stone-200'
        }`} id="screenshots-section">
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            {/* Headings */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                MARKET FREELANCER
              </span>
              <h2 className={`text-3xl font-serif font-semibold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-stone-950'
              }`}>
                Selling Screenshot
              </h2>
            </div>
            {contentBody}
          </div>
        </section>
      )}
    </>
  );
}
