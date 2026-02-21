import React, { useState } from 'react';
import { NameConfig } from '../types';

interface NameConfigViewProps {
  onBack: () => void;
  onStart: (config: NameConfig) => void;
}

const NameConfigView: React.FC<NameConfigViewProps> = ({ onBack, onStart }) => {
  const [type, setType] = useState<'CELEBRITY' | 'RANKING'>('CELEBRITY');

  const [showKorean, setShowKorean] = useState(true);

  return (
    <div className="flex flex-col h-full space-y-8 pb-32">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">인명 읽기 설정</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setType('CELEBRITY')}
            className={`p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${
              type === 'CELEBRITY'
                ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]'
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          >
            <i className="fas fa-star text-2xl"></i>
            <span className="font-bold">유명인 이름</span>
          </button>
          <button
            onClick={() => setType('RANKING')}
            className={`p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${
              type === 'RANKING'
                ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]'
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          >
            <i className="fas fa-list-ol text-2xl"></i>
            <span className="font-bold">많이 사용되는 이름</span>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <span className="font-bold text-gray-700">한국어 독음 표시</span>
          <button
            onClick={() => setShowKorean(!showKorean)}
            className={`w-14 h-8 rounded-full transition-all relative ${
              showKorean ? 'bg-[#ff4500]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                showKorean ? 'left-7' : 'left-1'
              }`}
            ></div>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto p-6 bg-white z-[9999]">
        <button
          onClick={() => onStart({ type, showKorean })}
          className="w-full py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-xl active:scale-95 transition-all"
        >
          학습 시작
        </button>
      </div>
    </div>
  );
};

export default NameConfigView;
