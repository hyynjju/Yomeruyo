
import React, { useState } from 'react';
import { KeigoConfig } from '../types';

interface KeigoConfigViewProps {
  onBack: () => void;
  onStart: (config: KeigoConfig) => void;
}

const KeigoConfigView: React.FC<KeigoConfigViewProps> = ({ onBack, onStart }) => {
  const [category, setCategory] = useState<KeigoConfig['category']>('BASIC');
  const [customScript, setCustomScript] = useState('');

  return (
    <div className="flex flex-col h-full space-y-8 overflow-y-auto pb-32">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]"><i className="fas fa-arrow-left text-xl"></i></button>
        <h2 className="text-2xl font-bold text-gray-800">경어 학습 설정</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setCategory('BASIC')}
            className={`p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${category === 'BASIC' ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
          >
            <i className="fas fa-book text-2xl"></i>
            <span className="font-bold text-center">기본 경어</span>
          </button>
          <button 
            onClick={() => setCategory('CAFE')}
            className={`p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${category === 'CAFE' ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
          >
            <i className="fas fa-coffee text-2xl"></i>
            <span className="font-bold">카페 특화</span>
          </button>
        </div>

        <button 
          onClick={() => setCategory('CUSTOM')}
          className={`w-full p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${category === 'CUSTOM' ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
        >
          <i className="fas fa-file-alt text-2xl"></i>
          <span className="font-bold">커스텀 대본</span>
        </button>

        {category === 'CUSTOM' && (
          <div className="animate-in slide-in-from-top duration-300">
            <textarea
              placeholder="대본을 입력하세요. 줄바꿈으로 문장이 구분됩니다."
              value={customScript}
              onChange={(e) => setCustomScript(e.target.value)}
              className="w-full h-40 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm outline-none focus:border-[#ff4500]"
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white z-[9999]">
        <button 
          onClick={() => onStart({ category, customScript })}
          className="w-full py-5 rounded-2xl bg-[#ff4500] text-white font-black text-xl active:scale-95 transition-all"
        >
          학습 시작
        </button>
      </div>
    </div>
  );
};

export default KeigoConfigView;
