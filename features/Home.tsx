import React from 'react';
import { AppView } from '../types';

interface HomeProps {
  setView: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const commonColor = 'bg-[#ff4500]';
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
    <div className="flex flex-col h-full justify-center items-center space-y-6">
      <div className="grid grid-cols-1 w-full gap-4 px-4">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setView(btn.id)}
            className={`flex items-center justify-between p-6 rounded-2xl ${commonColor} text-white font-bold text-xl transition-all active:scale-95 hover:brightness-105`}
          >
            <div className="flex items-center space-x-4">
              <i className={`fas ${btn.icon} text-2xl w-8 text-center`}></i>
              <span>{btn.label}</span>
            </div>
            <i className="fas fa-chevron-right text-sm opacity-50"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
