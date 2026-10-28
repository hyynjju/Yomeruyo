import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { AppView, StudyItem } from '../types';
import { speakJapanese } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface StudySessionProps {
  items: StudyItem[];
  showKorean: boolean;
  onEnd: () => void;
  source: AppView;
  completedStudies: AppView[];
  onComplete: () => void;
  onSelectStudy: (view: AppView) => void;
}

const StudySession: React.FC<StudySessionProps> = ({
  items,
  showKorean,
  onEnd, source, completedStudies, onComplete, onSelectStudy,
}) => {
  const { t } = useLanguage();

  const [isComplete, setIsComplete] = useState(false);
  const responseTimesRef = useRef<number[]>([]);
  const revealedRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(performance.now());

  const [audioCtx] = useState(
    () => new (window.AudioContext || (window as any).webkitAudioContext)(),
  );

  const currentItem = items[index];
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!isComplete || !confettiCanvasRef.current) return;
    const burst = confetti.create(confettiCanvasRef.current, { resize: true });
    void burst({
      particleCount: 80, spread: 90, origin: { y: 0.6 },
      startVelocity: 40, decay: 0.92, ticks: 150,
      colors: ['#fda4af', '#fb7185', '#fce7f3', '#ffffff'],
      disableForReducedMotion: true,
    });
    return () => burst.reset();
  }, [isComplete]);


  useEffect(() => {
    if (isRevealed || isComplete || !items.length) return;

    const timer = window.setInterval(() => {
      setElapsedTime((performance.now() - startTimeRef.current) / 1000);
    }, 10);

    return () => window.clearInterval(timer);
  }, [index, isRevealed, isComplete, items.length]);

  const handleReveal = async () => {
    if (revealedRef.current || !currentItem) return;
    revealedRef.current = true;
    const elapsed = (performance.now() - startTimeRef.current) / 1000;

    responseTimesRef.current.push(elapsed);
    setElapsedTime(elapsed);
    setIsRevealed(true);

    await speakJapanese(currentItem.reading, audioCtx);
  };

  const handleNext = () => {
    if (index < items.length - 1) {
      revealedRef.current = false;
      setIndex(index + 1);
      setIsRevealed(false);
      setElapsedTime(0);
      startTimeRef.current = performance.now();
    } else {
      setIsComplete(true);
      onComplete();
    }
  };

  if (!currentItem) return (
    <div className="fixed inset-0 bg-stone-900 flex items-center justify-center">
      <button onClick={onEnd} className="rounded-full bg-rose-100 px-8 py-4 text-rose-900">{t.studySession.home}</button>
    </div>
  );

  if (isComplete) {
    const average = responseTimesRef.current.reduce((sum, value) => sum + value, 0) / responseTimesRef.current.length;
    const recommendations = [
      { view: 'NUMBER_CONFIG' as AppView, label: t.home.number, icon: 'fa-hashtag' },
      { view: 'KEIGO_CONFIG' as AppView, label: t.home.keigo, icon: 'fa-comments' },
      { view: 'NAME_CONFIG' as AppView, label: t.home.name, icon: 'fa-address-card' },
      { view: 'PLACE_CONFIG' as AppView, label: t.home.place, icon: 'fa-map' },
      { view: 'MENU_CONFIG' as AppView, label: t.home.menu, icon: 'fa-utensils' },
    ].filter(item => item.view !== source && !completedStudies.includes(item.view));
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-pink-950 to-stone-900 overflow-y-auto">
        <div className="relative max-w-[873px] mx-auto min-h-full px-4 md:px-6 pt-6 pb-44">
          <header className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <button onClick={onEnd} aria-label={t.studySession.home} className="w-10 h-10"><i className="fas fa-chevron-left" /></button>
            <h1 className="font-semibold">{t.studySession.complete}</h1><span className="w-10" />
          </header>
          <section className="relative py-16 md:py-20">
            <div className="relative mx-auto w-full max-w-xs min-h-52 rounded-[20px] bg-gradient-to-br from-red-700 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 gap-3">
              <p className="text-white/70 font-medium">{t.studySession.averageSpeed}</p>
              <p className="text-white text-6xl font-bold tabular-nums">{average.toFixed(2)}s</p>
              <p className="text-white/70 text-sm">{items.length}/{items.length}</p>
            </div>
          </section>
          {recommendations.length > 0 && <section>
            <h2 className="text-white text-lg font-semibold mb-5">{t.studySession.remaining}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {recommendations.map(item => <button key={item.view} onClick={() => onSelectStudy(item.view)} className="p-4 rounded-[20px] bg-gradient-to-b from-white/10 to-white/5 border border-white/5 text-left flex flex-col items-start gap-4">
                <span className="p-1.5 rounded-lg bg-rose-400/10 text-rose-400"><i className={`fas ${item.icon} w-6 h-6 flex items-center justify-center text-xl`} /></span>
                <span className="text-white text-xl font-bold">{item.label}</span>
              </button>)}
            </div>
          </section>}
        </div>
        <canvas ref={confettiCanvasRef} aria-hidden="true" className="fixed inset-0 w-full h-full pointer-events-none z-[100]" />
        <div className="fixed bottom-0 inset-x-0 z-50 mx-auto w-full max-w-[873px]">
          <div className="h-12 bg-gradient-to-b from-stone-900/0 to-stone-900 pointer-events-none" />
          <div className="px-5 md:px-6 pt-2 pb-8 bg-stone-900">
            <button onClick={onEnd} className="w-full h-14 rounded-full bg-gradient-to-b from-white to-white/70 text-rose-900 text-lg font-bold active:scale-95 transition-transform">{t.studySession.home}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
      <div className="relative w-full max-w-[873px] h-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="w-full h-16 px-2 md:px-4 pt-4 pb-2 absolute left-0 top-0 border-b border-white/10 flex justify-between items-center z-[9999]">
          <div aria-label={t.studySession.progress} className="ml-2 rounded-full bg-rose-300/15 px-4 py-1.5 text-rose-300 text-sm font-semibold tabular-nums">
            {index + 1}/{items.length}
          </div>

          <button
            type="button"
            onClick={onEnd}
            aria-label={t.studySession.close}
            className="w-10 h-10 p-2.5 flex justify-center items-center text-white/70 hover:text-white transition-colors active:scale-90"
          >
            <i className="fas fa-times text-xl" />
          </button>
        </div>

        <div className="w-full h-full px-4 md:px-6 pt-20 pb-8 absolute left-0 top-0 flex flex-col justify-start items-start gap-2.5">
          {/* Question */}
          <div className="self-stretch flex-1 min-h-0 px-6 py-5 bg-gradient-to-br from-red-700 via-pink-500 to-red-500 rounded-xl flex flex-col justify-center items-center gap-2.5 overflow-hidden">
            <div lang="ja" style={currentItem.questionFont ? {
              fontFamily: currentItem.questionFont === 'handwriting'
                ? '"Yuji Syuku", "Yu Mincho", serif' : '"Noto Serif JP", "Yu Mincho", serif',
              fontWeight: 400,
              fontSize: 'clamp(1.75rem, 7vw, 3.75rem)',
              overflowWrap: 'anywhere',
            } : undefined} className="text-center text-white text-5xl sm:text-6xl font-bold tracking-tight leading-tight break-keep">
              {currentItem.display}
            </div>
          </div>

          {/* Answer */}
          <div className="self-stretch flex-1 min-h-0 px-6 py-5 bg-gradient-to-b from-white/10 to-white/5 rounded-xl outline outline-2 outline-offset-[-2px] outline-white/5 flex flex-col justify-center items-center gap-2.5 overflow-hidden relative">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div
                className={`text-center text-2xl font-bold leading-9 break-keep transition-opacity duration-200 ${
                  isRevealed ? 'text-white' : 'text-white/30'
                }`}
              >
                {isRevealed ? currentItem.reading : t.studySession.guessReading}
              </div>

              {isRevealed && showKorean && currentItem.korean && (
                <div className="text-center text-xl text-white/60 font-medium leading-8 break-keep mt-4">
                  {currentItem.korean}
                </div>
              )}
              {isRevealed && currentItem.meaning && (
                <div className="mt-2 text-center text-base text-white/70">{currentItem.meaning}</div>
              )}
            </div>

            {/* Timer */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-[999px] inline-flex justify-center items-center gap-2.5">
              <div className="text-center text-white/70 text-base font-medium leading-6 tabular-nums">
                {elapsedTime.toFixed(2)}s
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <button
              type="button"
              onClick={onEnd}
              className="flex-[2] h-14 bg-white/10 rounded-full flex justify-center items-center text-center text-white text-lg font-bold leading-6 active:scale-95 transition-all"
            >
              {t.common.back}
            </button>

            {!isRevealed ? (
              <button
                type="button"
                onClick={handleReveal}
                className="flex-[3] h-14 bg-gradient-to-b from-white to-white/70 rounded-full outline outline-[3px] outline-offset-[-3px] outline-white/40 flex justify-center items-center text-center text-rose-900 text-lg font-bold leading-6 active:scale-95 transition-all"
              >
                {t.studySession.reveal}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex-[3] h-14 bg-gradient-to-b from-white to-white/70 rounded-full outline outline-[3px] outline-offset-[-3px] outline-white/40 flex justify-center items-center text-center text-rose-900 text-lg font-bold leading-6 active:scale-95 transition-all"
              >
                {t.studySession.next}
                <i className="fas fa-chevron-right ml-2 text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession;
