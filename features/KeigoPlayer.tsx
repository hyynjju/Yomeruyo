import React, { useState, useEffect, useRef } from 'react';
import { KeigoLine } from '../types';
import { speakJapanese } from '../services/geminiService';

interface KeigoPlayerProps {
  script: KeigoLine[];
  onEnd: () => void;
}

const KeigoPlayer: React.FC<KeigoPlayerProps> = ({ script, onEnd }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioCtx] = useState(
    () => new (window.AudioContext || (window as any).webkitAudioContext)()
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const playLoop = async () => {
      while (isMounted.current && isPlaying) {
        const currentLine = script[activeIndex];
        if (!currentLine) break;

        try {
          await speakJapanese(currentLine.japanese, audioCtx);

          if (isMounted.current && isPlaying) {
            // Wait after finishing speech
            await new Promise((r) => setTimeout(r, 1500));
            if (isMounted.current && isPlaying) {
              setActiveIndex((prev) => (prev + 1) % script.length);
            }
          }
        } catch (err) {
          console.error('[KeigoPlayer] Loop error:', err);
          await new Promise((r) => setTimeout(r, 2000));
          if (isMounted.current) {
            setActiveIndex((prev) => (prev + 1) % script.length);
          }
        }
      }
    };

    playLoop();
  }, [isPlaying, activeIndex, script, audioCtx]);

  useEffect(() => {
    if (containerRef.current) {
      const scrollContainer = containerRef.current;
      const listContainer = scrollContainer.querySelector(
        '.script-list'
      ) as HTMLElement;
      if (listContainer && listContainer.children[activeIndex]) {
        const activeEl = listContainer.children[activeIndex] as HTMLElement;

        // Target 1/3 down from the top for better visibility of the "current" and "next" lyrics
        const targetTop =
          activeEl.offsetTop - scrollContainer.clientHeight * 0.33;

        scrollContainer.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white relative">
      {/* Strictly Fixed Header with Max Z-Index */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-[9999] flex items-center justify-between px-4">
        <button
          onClick={onEnd}
          className="text-gray-400 p-2 active:scale-90 transition-transform"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#ff4500] text-[10px] tracking-[0.2em] uppercase leading-none mb-1">
            Learning
          </span>
          <span className="font-bold text-gray-900 text-sm">KEIGO RADIO</span>
        </div>
        <button
          onClick={togglePlay}
          className="text-gray-800 p-2 active:scale-90 transition-transform"
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scroll-smooth no-scrollbar relative"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        <div className="script-list px-8 pt-[35vh] pb-[45vh] space-y-12">
          {script.map((line, i) => (
            <div
              key={i}
              className={`transition-all duration-700 cursor-pointer origin-left py-2 ${
                i === activeIndex ? 'keigo-active' : 'keigo-inactive'
              }`}
              onClick={() => {
                setActiveIndex(i);
                if (!isPlaying) setIsPlaying(true);
              }}
            >
              <h2 className="text-3xl font-bold mb-3 leading-tight break-keep transition-all duration-500">
                {line.japanese}
              </h2>
              {line.korean && (
                <p
                  className={`text-lg font-medium transition-all duration-700 ${
                    i === activeIndex
                      ? 'opacity-50 text-gray-600 translate-y-0'
                      : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {line.korean}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Strictly Fixed Bottom Player with Max Z-Index */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-6 pb-10 bg-white/95 backdrop-blur-xl border-t border-gray-100 flex flex-col items-center z-[9999]">
        <div className="w-full h-[3px] bg-gray-100 rounded-full mb-8 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#ff4500] transition-all duration-700 ease-out rounded-full"
            style={{ width: `${((activeIndex + 1) / script.length) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between w-full max-w-[280px]">
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 active:scale-75 active:text-[#ff4500] transition-all"
            onClick={() =>
              setActiveIndex(
                (prev) => (prev - 1 + script.length) % script.length
              )
            }
          >
            <i className="fas fa-step-backward text-xl"></i>
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-[#ff4500] text-white flex items-center justify-center text-2xl active:scale-90 transition-all shadow-xl shadow-orange-200/50"
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>

          <button
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 active:scale-75 active:text-[#ff4500] transition-all"
            onClick={() => setActiveIndex((prev) => (prev + 1) % script.length)}
          >
            <i className="fas fa-step-forward text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeigoPlayer;
