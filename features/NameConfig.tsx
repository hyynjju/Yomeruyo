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
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* Content */}
        <div className="absolute left-0 top-0 w-full px-4 pt-32">
          <div className="w-full flex flex-col gap-12">
            {/* 상황 선택 */}
            <div className="w-full flex flex-col gap-6">
              <div className="w-full h-7 text-white text-xl font-bold leading-8">
                상황 선택
              </div>

              <div className="w-full flex items-center gap-5">
                {/* 유명인 이름 */}
                <button
                  type="button"
                  onClick={() => setType('CELEBRITY')}
                  className={`
                    flex-1
                    min-w-0
                    h-48
                    relative
                    rounded-3xl
                    overflow-hidden
                    transition-all
                    ${
                      type === 'CELEBRITY'
                        ? 'bg-gradient-to-br from-red-700 via-pink-500 to-red-500'
                        : 'bg-gradient-to-br from-red-700 via-pink-500 to-red-500 opacity-30'
                    }
                  `}
                >
                  <div className="absolute left-0 top-[158px] w-full text-center text-white text-lg font-bold leading-7">
                    유명인 이름
                  </div>
                </button>

                {/* 많이 쓰는 이름 */}
                <button
                  type="button"
                  onClick={() => setType('RANKING')}
                  className={`
                    flex-1
                    min-w-0
                    h-48
                    relative
                    rounded-3xl
                    overflow-hidden
                    transition-all
                    ${
                      type === 'RANKING'
                        ? 'bg-gradient-to-br from-blue-950 to-teal-400'
                        : 'bg-gradient-to-br from-blue-950 to-teal-400 opacity-30'
                    }
                  `}
                >
                  <div className="absolute left-0 top-[158px] w-full text-center text-white text-lg font-bold leading-7">
                    많이 쓰는 이름
                  </div>
                </button>
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
                  transition-all
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
                    transition-all
                    ${showKorean ? 'right-1' : 'left-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

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
            인명 읽기 학습 설정
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
              onClick={() => onStart({ type, showKorean })}
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

export default NameConfigView;
