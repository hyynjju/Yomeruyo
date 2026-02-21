import React, { useState } from 'react';
import { NumberConfig } from '../types';

interface NumberConfigViewProps {
  onBack: () => void;
  onStart: (config: NumberConfig) => void;
}

const NumberConfigView: React.FC<NumberConfigViewProps> = ({
  onBack,
  onStart,
}) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000);
  const [unit, setUnit] = useState<1 | 10 | 100 | 1000 | 10000>(1);
  const [counter, setCounter] = useState('엔');
  const [showKorean, setShowKorean] = useState(true);

  const isDateMode = counter === '날짜';

  return (
    <div className="flex flex-col h-full space-y-8 pb-32">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-[#ff4500]">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">숫자 읽기 설정</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            세는 단위
          </label>
          <select
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 outline-none focus:border-[#ff4500] appearance-none"
          >
            {/* '본' 단위를 리스트에 추가했습니다 */}
            {['엔', '명', '마리', '층', '개', '권', '본', '날짜'].map((c) => (
              <option key={c} value={c}>
                {c === '날짜' ? '날짜 (연호 포함)' : c}
              </option>
            ))}
          </select>
        </div>

        {!isDateMode && (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                숫자 범위
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 outline-none focus:border-[#ff4500]"
                />
                <span className="text-[#ff4500] font-bold">~</span>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 outline-none focus:border-[#ff4500]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                단위
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 10, 100, 1000, 10000].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      unit === u
                        ? 'bg-[#ff4500] text-white'
                        : 'bg-gray-100 text-gray-500 border border-transparent'
                    }`}
                  >
                    {u}단위
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

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
          onClick={() =>
            onStart({ range: [min, max], unit, counter, showKorean })
          }
          className="w-full py-5 rounded-2xl bg-[#ff4500] text-white font-bold text-xl active:scale-95 transition-all"
        >
          학습 시작
        </button>
      </div>
    </div>
  );
};

export default NumberConfigView;
