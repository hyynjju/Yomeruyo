
import React, { useState } from 'react';
import { StudyItem } from '../types';
import { speakJapanese } from '../services/geminiService';

interface StudySessionProps {
  items: StudyItem[];
  showKorean: boolean;
  onEnd: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ items, showKorean, onEnd }) => {
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [audioCtx] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)());

  const currentItem = items[index];

  const handleReveal = async () => {
    setIsRevealed(true);
    await speakJapanese(currentItem.reading, audioCtx);
  };

  const handleNext = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setIsRevealed(false);
    } else {
      onEnd();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Fixed Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-[9999] flex items-center justify-between px-6 border-b border-gray-50">
        <div className="bg-orange-50 text-[#ff4500] px-3 py-1 rounded-full text-xs font-bold border border-orange-100">
          QUESTION {index + 1}
        </div>
        <button onClick={onEnd} className="text-gray-400 hover:text-gray-600 transition-colors p-2 active:scale-90">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center pt-16 pb-32">
        <div className="text-center space-y-12 w-full px-4">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight break-keep">
            {currentItem.display}
          </h1>

          <div className={`${isRevealed ? 'block' : 'hidden'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#ff4500]">
                {currentItem.reading}
              </p>
              {showKorean && currentItem.korean && (
                <p className="text-xl text-gray-400 font-medium">
                  {currentItem.korean}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/95 backdrop-blur-md z-[9999] border-t border-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onEnd}
            className="py-5 rounded-2xl bg-gray-50 text-gray-500 font-bold text-lg active:scale-95 transition-all border border-gray-100"
          >
            종료
          </button>
          {!isRevealed ? (
            <button 
              onClick={handleReveal}
              className="py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-lg active:scale-95 transition-all"
            >
              정답 확인
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-lg active:scale-95 transition-all"
            >
              다음 <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySession;
