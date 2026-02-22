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
  const [category, setCategory] =
    useState<KeigoConfig['category']>('INTERVIEW');

  const categories = [
    { id: 'INTERVIEW', label: '면접', icon: 'fa-briefcase' },
    { id: 'CAFE', label: '카페', icon: 'fa-coffee' },
    { id: 'BAITO', label: '아르바이트', icon: 'fa-store' },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 overflow-y-auto pb-32">
      {/* 상단 헤더 및 뒤로가기 버튼 */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">경어 학습 설정</h2>
      </div>

      {/* 카테고리 선택 영역 (리스트 스타일 버튼) */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as any)}
            className={`w-full p-5 rounded-xl text-left font-bold transition-all border flex items-center justify-between ${
              category === cat.id
                ? 'bg-[#ff4500] border-transparent text-white w-lg'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <i className={`fas ${cat.icon} text-xl`}></i>
              <span className="text-lg">{cat.label}</span>
            </div>
            {category === cat.id && (
              <i className="fas fa-check-circle text-white"></i>
            )}
          </button>
        ))}
      </div>

      {/* 시작 버튼 (고정 하단) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto p-6 bg-white z-[9999] border-t border-gray-50">
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
