import React from 'react';
import { AppView } from '../types';

interface HomeProps {
  setView: (view: AppView) => void;
  proverb?: {
    display: string;
    reading: string;
    korean: string;
  } | null;
}

const Home: React.FC<HomeProps> = ({ setView, proverb }) => {
  const buttons = [
    { id: 'NUMBER_CONFIG' as AppView, label: '숫자 읽기', icon: 'fa-hashtag' },
    { id: 'NAME_CONFIG' as AppView, label: '인명 읽기', icon: 'fa-user' },
    {
      id: 'PLACE_CONFIG' as AppView,
      label: '지명 읽기',
      icon: 'fa-map-marker-alt',
    },
    // { id: 'KEIGO_CONFIG' as AppView, label: '경어 학습', icon: 'fa-comments' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      <div className="w-full aspect-square bg-[#ff4500] p-8 flex flex-col justify-between text-white relative">
        {/* Header - 로고 이미지 교체 */}
        <header className="flex justify-between items-center w-full">
          <img src="/assets/logo.svg" alt="logo" className="h-10 w-auto" />
          <button className="w-10 h-10 flex items-center justify-end active:opacity-60 transition-opacity">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </header>

        {/* 속담 */}
        {proverb ? (
          <div className="flex flex-col space-y-1 mb-2 max-w-full">
            <span className="text-white/50 text-sm font-semibold mb-1">
              추천 속담
            </span>
            <h2 className="text-4xl font-bold leading-tight break-all whitespace-pre-wrap">
              {proverb.display}
            </h2>
            <p className="text-white/50 text-md font-medium break-all whitespace-pre-wrap">
              {proverb.reading}
            </p>
            <p className="text-xl font-medium break-keep whitespace-pre-wrap">
              {proverb.korean}
            </p>
          </div>
        ) : (
          <div className="mb-2">
            <p className="text-white/50 text-sm">기다려주세요...</p>
          </div>
        )}
      </div>

      {/* 학습 버튼 리스트 */}
      <div className="flex-1 px-6 py-16 grid grid-cols-1 gap-5 -mt-10 bg-transparent relative z-10">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setView(btn.id)}
            className="group flex items-center justify-between p-5 rounded-[2rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all active:scale-[0.97]"
          >
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-[1.2rem] bg-[#ff4500]/10 flex items-center justify-center transition-colors group-hover:bg-[#ff4500]/20">
                <i className={`fas ${btn.icon} text-[#ff4500] text-2xl`}></i>
              </div>
              <span className="text-[#222] font-bold text-xl">{btn.label}</span>
            </div>

            <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <i className="fas fa-chevron-right text-gray-200 group-hover:text-[#CCC] text-sm"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
