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
    {
      id: 'TOKYO_STATION',
      label: '도쿄 역명',
      color: 'pink',
    },
    {
      id: 'TOKYO_LINE',
      label: '도쿄 선로명',
      color: 'pink',
    },
    {
      id: 'OSAKA_STATION',
      label: '오사카 역명',
      color: 'blue',
    },
    {
      id: 'OSAKA_LINE',
      label: '오사카 선로명',
      color: 'blue',
    },
    {
      id: 'PREFECTURE',
      label: '도도부현',
      color: 'yellow',
    },
  ] as const;

  const getCardClass = (
    color: 'pink' | 'blue' | 'yellow',
    selected: boolean,
  ) => {
    const gradients = {
      pink: 'bg-gradient-to-br from-red-700 via-pink-500 to-red-500',
      blue: 'bg-gradient-to-br from-blue-950 to-teal-400',
      yellow: 'bg-gradient-to-br from-amber-600 to-yellow-500',
    };

    return `
      flex-1
      min-w-0
      h-48
      relative
      rounded-3xl
      overflow-hidden
      transition-all
      ${gradients[color]}
      ${selected ? '' : 'opacity-30'}
    `;
  };

  return (
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* Content */}
        <main className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full px-4 pt-32 pb-40">
            <div className="w-full flex flex-col gap-6">
              {/* 상황 선택 */}
              <div className="w-full h-7 text-white text-xl font-bold leading-8">
                상황 선택
              </div>

              <div className="w-full flex flex-col gap-12">
                {/* 지역 선택 */}
                <div className="w-full flex flex-col gap-4">
                  {/* 도쿄 */}
                  <div className="w-full flex items-center gap-5">
                    {categories.slice(0, 2).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setCategory(cat.id as PlaceConfig['category'])
                        }
                        className={getCardClass(cat.color, category === cat.id)}
                      >
                        <div className="absolute left-0 top-[158px] w-full text-center text-white text-lg font-bold leading-7">
                          {cat.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* 오사카 */}
                  <div className="w-full flex items-center gap-5">
                    {categories.slice(2, 4).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setCategory(cat.id as PlaceConfig['category'])
                        }
                        className={getCardClass(cat.color, category === cat.id)}
                      >
                        <div className="absolute left-0 top-[158px] w-full text-center text-white text-lg font-bold leading-7">
                          {cat.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* 도도부현 */}
                  <div className="w-full flex items-center gap-5">
                    {categories.slice(4, 5).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setCategory(cat.id as PlaceConfig['category'])
                        }
                        className={getCardClass(cat.color, category === cat.id)}
                      >
                        <div className="absolute left-0 top-[158px] w-full text-center text-white text-lg font-bold leading-7">
                          {cat.label}
                        </div>
                      </button>
                    ))}

                    <div className="flex-1 min-w-0 h-48" />
                  </div>
                </div>

                {/* 한국어 독음 */}
                <div className="w-full flex items-center">
                  <div className="min-w-0 flex-1 flex flex-col gap-0.5">
                    <div className="text-white text-lg font-bold leading-7 break-keep">
                      한국어로 읽는법 표시하기
                    </div>

                    <div className="text-white/50 text-xs font-normal leading-4 break-keep">
                      예) 3,800円 → 산젠핫퍄쿠엔
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={showKorean}
                    onClick={() => setShowKorean((prev) => !prev)}
                    className={`
              shrink-0
              ml-4
              w-14
              h-8
              relative
              rounded-[999px]
              ${showKorean ? 'bg-rose-300' : 'bg-white/20'}
            `}
                  >
                    <div
                      className={`
                absolute
                top-1
                w-6
                h-6
                bg-white
                rounded-[999px]
                ${showKorean ? 'right-1' : 'left-1'}
              `}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Header */}
        <div className="absolute left-0 top-0 z-50 w-full h-16 px-2 pt-4 pb-2 border-b border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 p-2.5 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <i className="fas fa-chevron-left text-xl" />
          </button>

          <div className="text-center text-white text-base font-semibold leading-6">
            지명 읽기 학습 설정
          </div>

          <div className="w-10 h-10 opacity-0" />
        </div>

        {/* Bottom */}
        <div className="absolute left-0 bottom-0 z-50 w-full">
          <div className="w-full h-12 bg-gradient-to-b from-stone-900/0 to-stone-900" />

          <div className="w-full px-5 pt-2 pb-8 bg-stone-900 flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="
                flex-[2]
                min-w-0
                h-14
                bg-white/10
                rounded-full
                flex
                justify-center
                items-center
                text-white
                text-lg
                font-bold
                leading-6
                active:scale-95
                transition-transform
              "
            >
              이전
            </button>

            <button
              type="button"
              onClick={() => onStart({ category, showKorean })}
              className="
                flex-[3]
                min-w-0
                h-14
                rounded-full
                bg-gradient-to-b
                from-white
                to-white/70
                outline
                outline-[3px]
                outline-offset-[-3px]
                outline-white/40
                flex
                justify-center
                items-center
                text-rose-900
                text-lg
                font-bold
                leading-6
                active:scale-95
                transition-transform
              "
            >
              학습 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceConfigView;
