import React, { useState, useEffect, useRef } from 'react';
import { KeigoLine } from '../types';

interface KeigoPlayerProps {
  category: 'CAFE' | 'INTERVIEW';
  onEnd: () => void;
}

const KeigoPlayer: React.FC<KeigoPlayerProps> = ({ category, onEnd }) => {
  const [script, setScript] = useState<KeigoLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const [playbackRate, setPlaybackRate] = useState(1.15);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 오디오 제어 및 완료 로직 ---
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      setActiveIndex((prev) => {
        if (prev < script.length - 1) {
          setTimeout(() => setActiveIndex(prev + 1), 1200 / playbackRate);
          return prev;
        } else {
          setIsPlaying(false);
          setIsFinished(true);
          return prev;
        }
      });
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [script.length, playbackRate]);

  useEffect(() => {
    const loadScript = async () => {
      try {
        const fileName =
          category === 'CAFE' ? '/data/cafe.json' : '/data/interview.json';
        const res = await fetch(fileName);
        const data = await res.json();
        setScript(data);
        setActiveIndex(0);
        setIsPlaying(true);
        setIsFinished(false);
      } catch (err) {
        console.error('데이터 로딩 오류:', err);
      }
    };
    loadScript();
  }, [category]);

  useEffect(() => {
    if (!script.length || !script[activeIndex]) return;

    const audio = audioRef.current;
    const rawAudioPath = script[activeIndex].audio;
    const correctedAudioPath = rawAudioPath.replace('/audio/', '/audio/keigo/');

    if (isPlaying) {
      if (audio.src !== window.location.origin + correctedAudioPath) {
        audio.src = correctedAudioPath;
      }
      audio.playbackRate = playbackRate;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [activeIndex, isPlaying, script, playbackRate]);

  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector(
      `[data-index="${activeIndex}"]`,
    );
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (isFinished) {
      handleReset();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setActiveIndex(0);
    setIsPlaying(true);
    setIsFinished(false);
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setIsPlaying(true);
      setIsFinished(false);
    }
  };

  const goToNext = () => {
    if (activeIndex < script.length - 1) {
      setActiveIndex(activeIndex + 1);
      setIsPlaying(true);
      setIsFinished(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white overflow-hidden">
      <header className="flex-shrink-0 h-16 bg-white border-b border-gray-100 flex items-center px-4 z-[100]">
        <button
          onClick={onEnd}
          className="text-gray-400 p-2 active:scale-90 mr-auto"
        >
          <i className="fas fa-chevron-down text-lg"></i>
        </button>
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <span className="font-bold text-[#ff4500] text-[10px] tracking-[0.2em] uppercase leading-none mb-1">
            Learning
          </span>
          <span className="font-bold text-gray-900 text-sm uppercase">
            {category}
          </span>
        </div>
        <div className="w-10 ml-auto"></div>
      </header>

      <main
        ref={containerRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth"
      >
        <div className="bg-gray-100 px-8 pt-[24vh] pb-[40vh] space-y-20">
          {script.map((line, i) => (
            <div
              key={i}
              data-index={i}
              className={`transition-all duration-500 w-full ${
                i === activeIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-10 scale-95'
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-4 break-all whitespace-normal leading-snug tracking-tight ${
                  i === activeIndex ? 'text-black' : 'text-gray-200'
                }`}
              >
                {line.jp}
              </h2>
              {line.ko && (
                <p
                  className={`text-xl font-semibold break-all transition-opacity duration-500 ${
                    i === activeIndex
                      ? 'text-[#ff4500] opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {line.ko}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="flex-shrink-0 bg-white border-t border-gray-100 px-6 pt-4 pb-8 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="flex items-center gap-12 mb-1">
            <button
              onClick={goToPrev}
              disabled={activeIndex === 0}
              className={`p-2 transition-colors ${activeIndex === 0 ? 'text-gray-100' : 'text-gray-400 active:text-gray-900'}`}
            >
              <i className="fas fa-step-backward text-2xl"></i>
            </button>

            <button
              onClick={togglePlay}
              className={`w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-all ${
                isFinished
                  ? 'bg-[#ff4500] text-white'
                  : 'bg-gray-900 text-white'
              }`}
            >
              <i
                className={`fas ${
                  isFinished ? 'fa-redo' : isPlaying ? 'fa-pause' : 'fa-play'
                } text-2xl ${!isPlaying && !isFinished && 'ml-1'}`}
              ></i>
            </button>

            <button
              onClick={goToNext}
              disabled={activeIndex === script.length - 1}
              className={`p-2 transition-colors ${activeIndex === script.length - 1 ? 'text-gray-100' : 'text-gray-400 active:text-gray-900'}`}
            >
              <i className="fas fa-step-forward text-2xl"></i>
            </button>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Playback Speed
              </span>
              <span className="text-sm font-black text-[#ff4500]">
                {(playbackRate - 0.1).toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.1"
              step="0.1"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#ff4500]"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KeigoPlayer;
