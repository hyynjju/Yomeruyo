import React, { useState } from 'react';
import { KeigoConfig } from '../types';

interface KeigoConfigViewProps {
  onBack: () => void;
  onStart: (config: KeigoConfig) => void;
}

const KeigoConfigView: React.FC<KeigoConfigViewProps> = ({
  onBack,
  onStart,
}) => {
  // 기본 학습 카테고리를 'CAFE'로 설정
  const [category, setCategory] = useState<KeigoConfig['category']>('CAFE');

  return (
    <div className="flex flex-col h-full space-y-8 overflow-y-auto pb-32">
      {/* 상단 헤더 및 뒤로가기 버튼 */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">경어 학습 설정</h2>
      </div>

      {/* 카테고리 선택 영역 */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCategory('CAFE')}
            className={`p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${
              category === 'CAFE'
                ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]'
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          >
            <i className="fas fa-coffee text-2xl"></i>
            <span className="font-bold">카페</span>
          </button>

          <button
            onClick={() => setCategory('INTERVIEW')}
            className={`p-6 rounded-2xl flex flex-col items-center space-y-2 border-2 transition-all ${
              category === 'INTERVIEW'
                ? 'border-[#ff4500] bg-orange-50 text-[#ff4500]'
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          >
            <i className="fas fa-briefcase text-2xl"></i>
            <span className="font-bold">면접</span>
          </button>
        </div>
      </div>

      {/* 시작 버튼 (고정 하단) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto p-6 bg-white z-[9999]">
        <button
          onClick={() => onStart({ category })}
          className="w-full py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-xl active:scale-95 transition-all"
        >
          학습 시작
        </button>
      </div>
    </div>
  );
};

export default KeigoConfigView;
