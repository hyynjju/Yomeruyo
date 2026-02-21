import React, { useState } from 'react';
import { PlaceConfig } from '../types';

interface PlaceConfigViewProps {
  onBack: () => void;
  onStart: (config: PlaceConfig) => void;
}

const PlaceConfigView: React.FC<PlaceConfigViewProps> = ({
  onBack,
  onStart,
}) => {
  const [category, setCategory] =
    useState<PlaceConfig['category']>('PREFECTURE');
  const [showKorean, setShowKorean] = useState(true);

  const categories = [
    { id: 'PREFECTURE', label: '도도부현' },
    { id: 'TOKYO_STATION', label: '도쿄 지하철역' },
    { id: 'TOKYO_LINE', label: '도쿄 선로명' },
    { id: 'OSAKA_STATION', label: '오사카 지하철역' },
    { id: 'OSAKA_LINE', label: '오사카 선로명' },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 pb-32">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">지명 읽기 설정</h2>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as any)}
            className={`w-full p-4 rounded-xl text-left font-bold transition-all border ${
              category === cat.id
                ? 'bg-[#ff4500] border-transparent text-white'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-4">
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
          onClick={() => onStart({ category, showKorean })}
          className="w-full py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-xl active:scale-95 transition-all"
        >
          학습 시작
        </button>
      </div>
    </div>
  );
};

export default PlaceConfigView;
