import React, { useEffect, useRef, useState } from 'react';
import { StudyItem } from '../types';
import { speakJapanese } from '../services/geminiService';

interface StudySessionProps {
  items: StudyItem[];
  showKorean: boolean;
  onEnd: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({
  items,
  showKorean,
  onEnd,
}) => {
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(performance.now());

  const [audioCtx] = useState(
    () => new (window.AudioContext || (window as any).webkitAudioContext)(),
  );

  const currentItem = items[index];

  useEffect(() => {
    if (isRevealed) return;

    const timer = window.setInterval(() => {
      setElapsedTime((performance.now() - startTimeRef.current) / 1000);
    }, 10);

    return () => window.clearInterval(timer);
  }, [index, isRevealed]);

  const handleReveal = async () => {
    const elapsed = (performance.now() - startTimeRef.current) / 1000;
    setElapsedTime(elapsed);
    setIsRevealed(true);
    await speakJapanese(currentItem.reading, audioCtx);
  };

  const handleNext = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setIsRevealed(false);
      setElapsedTime(0);
      startTimeRef.current = performance.now();
    } else {
      onEnd();
    }
  };

  return (
    <div className="w-full h-full min-h-screen relative bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
      <div className="w-full h-16 px-2 pt-4 pb-2 absolute left-0 top-0 border-b border-white/10 flex justify-between items-center z-[9999]">
        <div className="w-10 h-10" />

        <button
          onClick={onEnd}
          className="w-10 h-10 p-2.5 flex justify-center items-center text-white/70 hover:text-white transition-colors active:scale-90"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="w-full h-full px-4 pt-20 pb-8 absolute left-0 top-0 flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch flex-1 min-h-0 px-6 py-5 bg-gradient-to-br from-red-700 via-pink-500 to-red-500 rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden">
          <div className="text-center text-white text-5xl sm:text-6xl font-bold tracking-tight leading-tight break-keep">
            {currentItem.display}
          </div>
        </div>

        <div className="self-stretch flex-1 min-h-0 px-6 py-5 bg-gradient-to-b from-white/10 to-white/5 rounded-xl outline outline-2 outline-offset-[-2px] outline-white/5 flex flex-col justify-center items-center gap-2.5 overflow-hidden relative">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div
              className={`text-center text-2xl font-bold leading-9 break-keep transition-opacity duration-200 ${
                isRevealed ? 'text-white' : 'text-white/30'
              }`}
            >
              {isRevealed ? currentItem.reading : '읽는 방법을 생각해보세요'}
            </div>

            {isRevealed && showKorean && currentItem.korean && (
              <div className="text-center text-xl text-white/60 font-medium leading-8 break-keep mt-4">
                {currentItem.korean}
              </div>
            )}
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-[999px] inline-flex justify-center items-center gap-2.5">
            <div className="text-center text-white/70 text-base font-medium leading-6 tabular-nums">
              {elapsedTime.toFixed(2)}s
            </div>
          </div>
        </div>

        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <button
            onClick={onEnd}
            className="flex-[2] h-14 bg-white/10 rounded-full flex justify-center items-center text-center text-white text-lg font-bold leading-6 active:scale-95 transition-all"
          >
            이전
          </button>

          {!isRevealed ? (
            <button
              onClick={handleReveal}
              className="flex-[3] h-14 bg-gradient-to-b from-white to-white/70 rounded-full outline outline-[3px] outline-offset-[-3px] outline-white/40 flex justify-center items-center text-center text-rose-900 text-lg font-bold leading-6 active:scale-95 transition-all"
            >
              정답 확인
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-[3] h-14 bg-gradient-to-b from-white to-white/70 rounded-full outline outline-[3px] outline-offset-[-3px] outline-white/40 flex justify-center items-center text-center text-rose-900 text-lg font-bold leading-6 active:scale-95 transition-all"
            >
              다음
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySession;
