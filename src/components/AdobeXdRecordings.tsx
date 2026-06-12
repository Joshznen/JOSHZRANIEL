import React from 'react';

interface AdobeXdRecordingsProps {
  isDarkMode: boolean;
  isModalMode?: boolean;
}

const VIDEO_BASE = '/src/assets/ADOBE XD/';

export default function AdobeXdRecordings({ isDarkMode, isModalMode = false }: AdobeXdRecordingsProps) {
  const videos = [
    { id: 'vid1', name: 'Account Recording 1', src: VIDEO_BASE + 'IMG_1967 (3).mov' },
    { id: 'vid2', name: 'Account Recording 2', src: VIDEO_BASE + 'IMG_1967 (2).MOV' }
  ];

  const contentBody = (
    <div className="flex flex-col gap-16 select-text">
      <div className="flex flex-col gap-8 pt-6">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className={`text-2xl font-sans font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            Account <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">Recordings</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          <p className={`font-sans text-xs md:text-sm mt-2 max-w-lg ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Watch the interactive prototypes and animations in action
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="video-layout-grid">
          {videos.map((vid) => (
            <div key={vid.id} className="overflow-hidden flex flex-col gap-2.5 group transition-all duration-300">
              <div className={`aspect-video rounded-xl overflow-hidden relative shadow-md border ${
                isDarkMode ? 'bg-stone-950 border-stone-850/40' : 'bg-stone-50 border-stone-200/50'
              }`}>
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={vid.src}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isModalMode ? contentBody : (
        <section className={`border-y py-24 px-6 sm:px-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0b0c10] border-stone-900' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                ADOBE XD PREVIEW
              </span>
              <h2 className={`text-3xl font-serif font-semibold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-stone-950'
              }`}>
                Account Recordings
              </h2>
            </div>
            {contentBody}
          </div>
        </section>
      )}
    </>
  );
}
