import React, { useState } from 'react';
import { MenuConfig } from '../types';
import GradientOptionButton from './GradientOptionButton';
import { useLanguage } from '../contexts/LanguageContext';

interface MenuConfigViewProps {
  onBack: () => void;
  onStart: (config: MenuConfig) => void | Promise<void>;
}

const MenuConfigView: React.FC<MenuConfigViewProps> = ({
  onBack,
  onStart,
}) => {
  const { t } = useLanguage();

  const [category, setCategory] =
    useState<MenuConfig['category']>('izakaya');

  const [showKorean, setShowKorean] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const handleStart = async () => {
    if (isStarting) return;
    setIsStarting(true);
    try {
      await onStart({ category, showKorean });
    } finally {
      setIsStarting(false);
    }
  };

  const categories = (['izakaya', 'yakiniku', 'cafe', 'western', 'cocktail'] as const).map(id => ({
    id,
    label: t.menuConfig[id],
    gradient: id === 'izakaya' || id === 'yakiniku'
      ? 'bg-gradient-to-br from-amber-700 to-orange-500'
      : 'bg-gradient-to-br from-blue-950 to-teal-400',
  }));

  return (
    <div className="app-screen fixed inset-0 bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
      <div className="relative w-full max-w-[873px] h-full mx-auto overflow-hidden">
        {/* Content */}
        <main className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full px-4 md:px-6 pt-24 md:pt-28 pb-40 md:pb-48">
            <div className="w-full flex flex-col gap-6">
              {/* 상황 선택 */}
              <div className="w-full h-7 text-white text-xl font-bold leading-8">
                {t.menuConfig.title}
              </div>

              <div className="w-full flex flex-col gap-12">
                {/* 지역 선택 */}
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {categories.map((cat) => (
                    <GradientOptionButton
                      key={cat.id}
                      label={cat.label}
                      gradient={cat.gradient}
                      selected={category === cat.id}
                      onClick={() =>
                        setCategory(cat.id as MenuConfig['category'])
                      }
                    />
                  ))}
                </div>

                {/* 한국어 독음 */}
                <div className="w-full flex items-center">
                  <div className="min-w-0 flex-1 flex flex-col gap-0.5 pr-4">
                    <div className="text-white text-lg font-bold leading-7 break-keep">
                      {t.menuConfig.koreanReading}
                    </div>

                    <div className="text-white/50 text-xs font-normal leading-4 break-keep">
                      {t.menuConfig.koreanReadingExample}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={showKorean}
                    onClick={() => setShowKorean((prev) => !prev)}
                    className={`
                      shrink-0
                      w-14
                      h-8
                      relative
                      rounded-full
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
                        rounded-full
                        transition-all
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
        <div style={{
          backgroundImage: 'linear-gradient(to bottom, #500724, #1c1917)',
          backgroundSize: '100% 100dvh',
          backgroundRepeat: 'no-repeat',
        }} className="absolute left-0 top-0 z-50 w-full h-16 px-2 md:px-4 pt-4 pb-2 border-b border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={isStarting}
            className="w-10 h-10 p-2.5 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <i className="fas fa-chevron-left text-xl" />
          </button>

          <div className="text-center text-white text-base font-semibold leading-6">
            {t.menuConfig.header}
          </div>

          <div className="w-10 h-10 opacity-0" />
        </div>

        {/* Bottom */}
        <div className="absolute left-0 bottom-0 z-50 w-full">
          <div className="w-full h-12 bg-gradient-to-b from-stone-900/0 to-stone-900" />

          <div className="w-full px-5 md:px-6 pt-2 safe-bottom bg-stone-900 flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={onBack}
            disabled={isStarting}
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
              onClick={handleStart}
              disabled={isStarting}
              aria-busy={isStarting}
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
              {isStarting ? t.menuConfig.loadingFont : t.common.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuConfigView;
