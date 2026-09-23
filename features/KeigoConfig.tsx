import React, { useState } from 'react';
import { KeigoConfig } from '../types';
import GradientOptionButton from './GradientOptionButton';
import { useLanguage } from '../contexts/LanguageContext';

interface KeigoConfigViewProps {
  onBack: () => void;
  onStart: (config: KeigoConfig) => void;
}

const KeigoConfigView: React.FC<KeigoConfigViewProps> = ({
  onBack,
  onStart,
}) => {
  const { t } = useLanguage();

  const [category, setCategory] =
    useState<KeigoConfig['category']>('INTERVIEW');

  const categories = [
    {
      id: 'INTERVIEW',
      label: t.keigoConfig.interview,
      gradient: 'bg-gradient-to-br from-red-700 via-pink-500 to-red-500',
    },
    {
      id: 'CAFE',
      label: t.keigoConfig.cafe,
      gradient: 'bg-gradient-to-br from-teal-700 to-lime-500',
    },
    {
      id: 'BAITO',
      label: t.keigoConfig.baito,
      gradient: 'bg-gradient-to-br from-amber-600 to-yellow-500',
    },
  ] as const;

  return (
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* Content */}
        <main className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full px-4 pt-24 pb-40">
            <div className="w-full flex flex-col gap-6">
              {/* 상황 선택 */}
              <div className="w-full h-7 text-white text-xl font-bold leading-8">
                {t.keigoConfig.title}
              </div>

              {/* 카테고리 */}
              <div className="w-full grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <GradientOptionButton
                    key={cat.id}
                    label={cat.label}
                    gradient={cat.gradient}
                    selected={category === cat.id}
                    onClick={() =>
                      setCategory(cat.id as KeigoConfig['category'])
                    }
                  />
                ))}
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
            {t.keigoConfig.header}
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
              {t.common.back}
            </button>

            <button
              type="button"
              onClick={() => onStart({ category })}
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
              {t.common.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeigoConfigView;
