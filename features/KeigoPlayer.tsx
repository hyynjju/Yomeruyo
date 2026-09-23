import React, { useState, useEffect, useRef } from 'react';
import { KeigoLine } from '../types';
import { KEIGO_CAFE, KEIGO_INTERVIEW, KEIGO_BAITO } from '../public/data/index';

interface KeigoPlayerProps {
  category: 'CAFE' | 'INTERVIEW' | 'BAITO';
  onEnd: () => void;
}

const KeigoPlayer: React.FC<KeigoPlayerProps> = ({ category, onEnd }) => {
  const [script, setScript] = useState<KeigoLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // 기본 재생속도
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const containerRef = useRef<HTMLDivElement>(null);

  // 재생속도 로테이션
  const playbackRates = [1.0, 1.25, 1.5, 1.75, 2.0, 0.5, 0.75];

  const handlePlaybackRate = () => {
    setPlaybackRate((current) => {
      const currentIndex = playbackRates.indexOf(current);
      const nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + 1) % playbackRates.length;

      return playbackRates[nextIndex];
    });
  };

  // ========================================
  // 오디오 완료 처리
  // ========================================

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setActiveIndex((prev) => {
        if (prev < script.length - 1) {
          setTimeout(
            () => setActiveIndex((current) => current + 1),
            1200 / playbackRate,
          );

          return prev;
        }

        setIsPlaying(false);
        setIsFinished(true);

        return prev;
      });
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [script.length, playbackRate]);

  // ========================================
  // 카테고리 변경
  // ========================================

  useEffect(() => {
    let selectedData: KeigoLine[];

    switch (category) {
      case 'CAFE':
        selectedData = KEIGO_CAFE;
        break;

      case 'INTERVIEW':
        selectedData = KEIGO_INTERVIEW;
        break;

      case 'BAITO':
        selectedData = KEIGO_BAITO;
        break;

      default:
        selectedData = [];
    }

    setScript(selectedData);
    setActiveIndex(0);
    setIsPlaying(true);
    setIsFinished(false);
  }, [category]);

  // ========================================
  // 오디오 재생
  // ========================================

  useEffect(() => {
    if (!script.length || !script[activeIndex]) return;

    const audio = audioRef.current;
    const audioPath = script[activeIndex].audio;

    if (isPlaying) {
      if (audio.src !== window.location.origin + audioPath) {
        audio.src = audioPath;
      }

      audio.playbackRate = playbackRate;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [activeIndex, isPlaying, script, playbackRate]);

  // ========================================
  // 현재 문장을 화면 중앙으로 이동
  // ========================================

  useEffect(() => {
    if (!containerRef.current) return;

    const activeEl = containerRef.current.querySelector(
      `[data-index="${activeIndex}"]`,
    );

    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  // ========================================
  // 재생 / 일시정지
  // ========================================

  const togglePlay = () => {
    if (isFinished) {
      handleReset();
      return;
    }

    setIsPlaying((prev) => !prev);
  };

  // ========================================
  // 처음부터 다시 재생
  // ========================================

  const handleReset = () => {
    setActiveIndex(0);
    setIsPlaying(true);
    setIsFinished(false);
  };

  // ========================================
  // 이전 문장
  // ========================================

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      setIsPlaying(true);
      setIsFinished(false);
    }
  };

  // ========================================
  // 다음 문장
  // ========================================

  const goToNext = () => {
    if (activeIndex < script.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setIsPlaying(true);
      setIsFinished(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* ========================================
            문장 영역
        ======================================== */}

        <main
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth"
        >
          <div className="pointer-events-none absolute left-0 top-28 w-full h-[568px] bg-gradient-to-b from-zinc-300/0 via-zinc-300/10 to-zinc-300/0 z-10" />

          <div className="min-h-full px-8 pt-[29vh] pb-[30vh] flex flex-col justify-center gap-12">
            {script.map((line, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={line.id}
                  data-index={i}
                  className={`w-full flex flex-col gap-2 origin-center transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-30 scale-[0.9]'
                  }`}
                >
                  <h2 className="font-bold break-all whitespace-normal text-xl leading-8 tracking-tight text-white w-full">
                    {line.jp}
                  </h2>

                  {line.ko && (
                    <p className="font-medium break-all text-sm leading-6 text-rose-400 w-full">
                      {line.ko}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* ========================================
            Header
        ======================================== */}

        <header className="absolute left-0 top-0 z-50 w-full h-16 px-2 pt-4 pb-2 border-b border-white/10 flex justify-between items-center">
          <button
            type="button"
            onClick={onEnd}
            className="w-10 h-10 p-2.5 flex justify-center items-center text-white active:scale-90 transition-transform"
          >
            <i className="fas fa-chevron-left text-xl" />
          </button>

          <div className="text-center text-white text-base font-semibold leading-6">
            {category === 'INTERVIEW'
              ? '면접'
              : category === 'CAFE'
                ? '카페'
                : '아르바이트'}
          </div>

          <div className="w-10 h-10 opacity-0" />
        </header>

        {/* ========================================
            하단 플레이어
        ======================================== */}

        <footer className="absolute left-0 bottom-0 z-50 w-full">
          <div className="w-full flex flex-col justify-center items-start">
            {/* 상단 페이드 */}
            <div className="w-full h-12 bg-gradient-to-b from-stone-900/0 to-stone-900" />

            {/* 컨트롤 영역 */}
            <div className="w-full px-5 pt-2 pb-8 bg-stone-900 flex justify-between items-center gap-2">
              {/* 왼쪽 속도 표시 */}
              <div className="px-5 py-4 opacity-0 flex justify-center items-center gap-2.5">
                <span className="text-white text-base font-semibold leading-6">
                  1.0x
                </span>
              </div>

              {/* 재생 컨트롤 */}
              <div className="flex items-center gap-1.5">
                {/* 이전 */}
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={activeIndex === 0}
                  className={`p-5 bg-white/5 rounded-full flex justify-center items-center transition-all active:scale-90 ${
                    activeIndex === 0 ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <i className="fas fa-step-backward text-white text-base" />
                </button>

                {/* 재생 / 일시정지 */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className={`px-10 py-7 bg-white/5 rounded-full flex justify-center items-center transition-all active:scale-95 ${
                    isFinished ? 'bg-rose-500/20' : ''
                  }`}
                >
                  <i
                    className={`fas ${
                      isFinished
                        ? 'fa-redo'
                        : isPlaying
                          ? 'fa-pause'
                          : 'fa-play'
                    } text-white text-2xl ${
                      !isPlaying && !isFinished ? 'ml-1' : ''
                    }`}
                  />
                </button>

                {/* 다음 */}
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={activeIndex === script.length - 1}
                  className={`p-5 bg-white/5 rounded-full flex justify-center items-center transition-all active:scale-90 ${
                    activeIndex === script.length - 1
                      ? 'opacity-30'
                      : 'opacity-100'
                  }`}
                >
                  <i className="fas fa-step-forward text-white text-base" />
                </button>
              </div>

              {/* 오른쪽 재생속도 버튼 */}
              <button
                type="button"
                onClick={handlePlaybackRate}
                className="px-5 py-4 flex justify-center items-center gap-2.5 active:scale-90 transition-transform"
              >
                <span className="text-white text-base font-semibold leading-6">
                  {playbackRate.toFixed(2).replace(/0$/, '')}x
                </span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default KeigoPlayer;
