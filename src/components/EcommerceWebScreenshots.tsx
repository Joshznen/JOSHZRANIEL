import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Eye } from 'lucide-react';
import {assetUrl} from '../lib/assetUrl';

interface LayoutItem {
  id: string;
  name: string;
  photo: string;
}

interface EcommerceWebScreenshotsProps {
  isDarkMode: boolean;
  isModalMode?: boolean;
}

const PHOTO_BASE = '/assets/ECOMMERCE/';

export default function EcommerceWebScreenshots({ isDarkMode, isModalMode = false }: EcommerceWebScreenshotsProps) {
  const [hoveredLayoutId, setHoveredLayoutId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; title: string } | null>(null);

  const listToRender: LayoutItem[] = [
    { id: 'img_1', name: 'Web Screenshot 1', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084813.png' },
    { id: 'img_2', name: 'Web Screenshot 2', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084835.png' },
    { id: 'img_3', name: 'Web Screenshot 3', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084852.png' },
    { id: 'img_4', name: 'Web Screenshot 4', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084905.png' },
    { id: 'img_5', name: 'Web Screenshot 5', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084917.png' },
    { id: 'img_6', name: 'Web Screenshot 6', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084928.png' },
    { id: 'img_7', name: 'Web Screenshot 7', photo: PHOTO_BASE + 'Screenshot 2026-06-12 084936.png' },
    { id: 'img_8', name: 'Web Screenshot 8', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085029.png' },
    { id: 'img_9', name: 'Web Screenshot 9', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085045.png' },
    { id: 'img_10', name: 'Web Screenshot 10', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085059.png' },
    { id: 'img_11', name: 'Web Screenshot 11', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085113.png' },
    { id: 'img_12', name: 'Web Screenshot 12', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085153.png' },
    { id: 'img_13', name: 'Web Screenshot 13', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085210.png' },
    { id: 'img_14', name: 'Web Screenshot 14', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085219.png' },
    { id: 'img_15', name: 'Web Screenshot 15', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085257.png' },
    { id: 'img_16', name: 'Web Screenshot 16', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085329.png' },
    { id: 'img_17', name: 'Web Screenshot 17', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085917.png' },
    { id: 'img_18', name: 'Web Screenshot 18', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085928.png' },
    { id: 'img_19', name: 'Web Screenshot 19', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085937.png' },
    { id: 'img_20', name: 'Web Screenshot 20', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085944.png' },
    { id: 'img_21', name: 'Web Screenshot 21', photo: PHOTO_BASE + 'Screenshot 2026-06-12 085954.png' },
    { id: 'img_22', name: 'Web Screenshot 22', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090003.png' },
    { id: 'img_23', name: 'Web Screenshot 23', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090015.png' },
    { id: 'img_24', name: 'Web Screenshot 24', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090031.png' },
    { id: 'img_25', name: 'Web Screenshot 25', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090040.png' },
    { id: 'img_26', name: 'Web Screenshot 26', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090053.png' },
    { id: 'img_27', name: 'Web Screenshot 27', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090110.png' },
    { id: 'img_28', name: 'Web Screenshot 28', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090122.png' },
    { id: 'img_29', name: 'Web Screenshot 29', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090136.png' },
    { id: 'img_30', name: 'Web Screenshot 30', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090159.png' },
    { id: 'img_31', name: 'Web Screenshot 31', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090208.png' },
    { id: 'img_32', name: 'Web Screenshot 32', photo: PHOTO_BASE + 'Screenshot 2026-06-12 090233.png' }
  ];

  const contentBody = (
    <div className="flex flex-col gap-16 select-text">
      
      {/* 2. Web Screenshots Subsection */}
      <div className="flex flex-col gap-8 pt-6">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className={`text-2xl font-sans font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            Web <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">Screenshots</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          <p className={`font-sans text-xs md:text-sm mt-2 max-w-lg ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Explore the layout and components of the Ecommerce Website
          </p>
        </div>

        {/* Screenshots Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="screenshots-layout-grid">
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
                    src={assetUrl(layout.photo)}
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
          src={assetUrl(lightboxPhoto.src)}
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
                ECOMMERCE VIEWPORT
              </span>
              <h2 className={`text-3xl font-serif font-semibold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-stone-950'
              }`}>
                Web Screenshots
              </h2>
            </div>
            {contentBody}
          </div>
        </section>
      )}
    </>
  );
}
