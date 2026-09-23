import React, { useState } from 'react';
import { NumberConfig } from '../types';
import GradientOptionButton from './GradientOptionButton';

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
  const [preset, setPreset] = useState<string>('CELEBRITY');

  const isDateMode = counter === '날짜';

  const presets = [
    {
      id: 'CAFE',
      label: '카페·식당',
      gradient: 'bg-gradient-to-br from-red-700 via-pink-500 to-red-500',
    },
    {
      id: 'SHOPPING',
      label: '쇼핑',
      gradient: 'bg-gradient-to-br from-amber-600 to-yellow-500',
    },
    {
      id: 'TRANSPORT',
      label: '교통',
      gradient: 'bg-gradient-to-br from-teal-700 to-lime-500',
    },
    {
      id: 'LARGE',
      label: '큰 숫자',
      gradient: 'bg-gradient-to-br from-blue-950 to-teal-400',
    },
  ] as const;

  const counters = ['엔', '명', '마리', '층', '개', '권', '본', '날짜'];
  const units = [1, 10, 100, 1000, 10000] as const;

  const unitIndex = units.indexOf(unit);

  const handleUnitChange = (index: number) => {
    setUnit(units[index]);
  };

  return (
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* Header */}
        <header className="absolute left-0 top-0 z-50 w-full h-16 px-2 pt-4 pb-2 border-b border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 p-2.5 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <i className="fas fa-chevron-left text-xl" />
          </button>

          <div className="text-center text-white text-base font-semibold leading-6">
            숫자 읽기 학습 설정
          </div>

          <div className="w-10 h-10" />
        </header>

        {/* Scroll Area */}
        <main className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full px-4 pt-24 pb-40">
            {/* 추천 옵션 */}
            <section className="w-full mb-12">
              <h2 className="h-7 text-white text-xl font-bold leading-8">
                추천 옵션
              </h2>
              <p className="mt-0.5 mb-6 text-white/50 text-xs font-normal leading-4 break-keep">
                일본 생활에서 자주 접하는 숫자를 골라 바로 연습해보세요.
              </p>

              <div
                className="
                w-[calc(100vw-16px)]
                overflow-x-auto
                overflow-y-hidden
                flex
                flex-nowrap
                gap-3
                pr-4
                pb-1
                scrollbar-hide
                touch-pan-x
              "
              >
                {presets.map((p) => (
                  <div key={p.id} className="shrink-0 w-40">
                    <GradientOptionButton
                      label={p.label}
                      gradient={p.gradient}
                      selected={preset === p.id}
                      onClick={() => setPreset(p.id)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 커스텀 학습 */}
            <section className="w-full">
              <h2 className="h-7 text-white text-xl font-bold leading-8">
                커스텀 학습
              </h2>
              <p className="mt-0.5 mb-8 text-white/50 text-xs font-normal leading-4 break-keep">
                연습할 숫자의 범위와 단위를 직접 설정해보세요.
              </p>

              <div className="w-full flex flex-col gap-12">
                {/* 세는 단위 */}
                <div className="w-full">
                  <div className="mb-2 text-white text-base font-medium leading-6">
                    세는 단위
                  </div>

                  <div className="relative w-full h-16">
                    <select
                      value={counter}
                      onChange={(e) => setCounter(e.target.value)}
                      className="
                      appearance-none
                      w-full
                      h-16
                      px-5
                      pr-12
                      rounded-[20px]
                      border-0
                      outline
                      outline-[1.5px]
                      outline-offset-[-1.5px]
                      outline-white/5
                      bg-gradient-to-b
                      from-white/10
                      to-white/5
                      bg-transparent
                      text-white
                      text-base
                      font-medium
                      leading-6
                    "
                    >
                      {counters.map((c) => (
                        <option
                          key={c}
                          value={c}
                          className="bg-stone-900 text-white"
                        >
                          {c === '날짜' ? '날짜 (연호 포함)' : c}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white/30">
                      <i className="fas fa-chevron-right text-xs" />
                    </div>
                  </div>
                </div>

                {!isDateMode && (
                  <>
                    {/* 숫자 범위 */}
                    <div className="w-full">
                      <div className="mb-2 text-white text-base font-medium leading-6">
                        숫자 범위
                      </div>

                      <div className="w-full flex items-center gap-2">
                        <input
                          type="number"
                          value={min}
                          onChange={(e) => setMin(Number(e.target.value))}
                          className="
                          appearance-none
                          min-w-0
                          flex-1
                          w-0
                          h-16
                          px-5
                          rounded-[20px]
                          border-0
                          outline
                          outline-[1.5px]
                          outline-offset-[-1.5px]
                          outline-white/5
                          bg-gradient-to-b
                          from-white/10
                          to-white/5
                          bg-transparent
                          text-white
                          text-base
                          font-medium
                          leading-6
                        "
                        />

                        <span className="shrink-0 text-white text-lg font-bold leading-7">
                          ~
                        </span>

                        <input
                          type="number"
                          value={max}
                          onChange={(e) => setMax(Number(e.target.value))}
                          className="
                          appearance-none
                          min-w-0
                          flex-1
                          w-0
                          h-16
                          px-5
                          rounded-[20px]
                          border-0
                          outline
                          outline-[1.5px]
                          outline-offset-[-1.5px]
                          outline-white/5
                          bg-gradient-to-b
                          from-white/10
                          to-white/5
                          bg-transparent
                          text-white
                          text-base
                          font-medium
                          leading-6
                        "
                        />
                      </div>
                    </div>

                    {/* 단위 */}
                    <div className="w-full">
                      <div className="mb-2 text-white text-base font-medium leading-6">
                        단위
                      </div>

                      <div className="relative w-full h-12">
                        {/* 긴 막대 */}
                        <div className="absolute left-0 right-0 top-[6px] h-4 bg-white/10 rounded-full" />

                        {/* 실제 range input */}
                        <input
                          type="range"
                          min={0}
                          max={units.length - 1}
                          step={1}
                          value={unitIndex}
                          onChange={(e) =>
                            handleUnitChange(Number(e.target.value))
                          }
                          className="
                          absolute
                          left-0
                          top-0
                          z-20
                          w-full
                          h-4
                          opacity-0
                          cursor-pointer
                          appearance-none
                        "
                        />

                        {/* 핸들 */}
                        <div className="pointer-events-none absolute top-[6px] left-0 right-0 h-4 flex items-center">
                          {units.map((u, index) => {
                            const selected = index === unitIndex;

                            return (
                              <div
                                key={u}
                                className="relative flex-1 h-4 flex items-center justify-center"
                              >
                                <div
                                  className={
                                    selected
                                      ? 'w-7 h-7 rounded-full bg-rose-300'
                                      : 'w-2 h-2 rounded-full bg-white/20'
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* 라벨 */}
                        <div className="absolute left-0 right-0 top-7 flex">
                          {units.map((u, index) => {
                            const selected = index === unitIndex;

                            return (
                              <div
                                key={u}
                                className={`
                                flex-1
                                text-center
                                text-sm
                                font-medium
                                leading-5
                                ${selected ? 'text-rose-300' : 'text-white/30'}
                              `}
                              >
                                {u}단위
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 한국어 독음 */}
                <div className="w-full flex items-center">
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="text-white text-lg font-bold leading-7 break-keep">
                      한국어로 읽는법 표시하기
                    </div>

                    <div className="mt-0.5 text-white/50 text-xs font-normal leading-4 break-keep">
                      예) 3,800円 → 산젠핫퍄쿠엔
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={showKorean}
                    onClick={() => setShowKorean((prev) => !prev)}
                    className={`
                    relative
                    shrink-0
                    w-14
                    h-8
                    rounded-full
                    ${showKorean ? 'bg-rose-300' : 'bg-white/20'}
                  `}
                  >
                    <span
                      className={`
                      absolute
                      top-1
                      w-6
                      h-6
                      rounded-full
                      bg-white
                      ${showKorean ? 'right-1' : 'left-1'}
                    `}
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="absolute left-0 right-0 bottom-0 z-50 pointer-events-none">
          <div className="h-12 bg-gradient-to-b from-stone-900/0 to-stone-900" />

          <div className="w-full px-5 pt-2 pb-8 bg-stone-900 flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={onBack}
              className="
              flex-[2]
              min-w-0
              h-14
              rounded-full
              bg-white/10
              flex
              items-center
              justify-center
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
              onClick={() =>
                onStart({
                  range: [min, max],
                  unit,
                  counter,
                  showKorean,
                })
              }
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
              items-center
              justify-center
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

export default NumberConfigView;
