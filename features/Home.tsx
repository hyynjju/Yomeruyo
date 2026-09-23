import React, { useEffect, useState, useRef } from 'react';
import { AppView } from '../types';
import Footer from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  setView: (view: AppView) => void;
  proverb?: {
    display: string;
    reading: string;
    korean: string;
  } | null;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const { language, setLanguage, t } = useLanguage();

  const [activeCard, setActiveCard] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languageMenuRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);

  const cardCount = 4;

  useEffect(() => {
    if (isSwiping) return;

    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cardCount);
    }, 4000);

    return () => clearInterval(timer);
  }, [isSwiping, cardCount]);

  // 언어 메뉴 바깥을 클릭하면 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (nextLanguage: 'ko' | 'ja') => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 20;

    if (distance > minSwipeDistance) {
      setActiveCard((prev) => (prev + 1) % cardCount);
    } else if (distance < -minSwipeDistance) {
      setActiveCard((prev) => (prev - 1 + cardCount) % cardCount);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSwiping(true);
    hasMoved.current = false;

    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;

    if (
      touchStartX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 10
    ) {
      hasMoved.current = true;
    }
  };

  const handleTouchEnd = () => {
    handleSwipe();
    setIsSwiping(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    setIsSwiping(true);

    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    touchEndX.current = e.clientX;

    if (
      touchStartX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 10
    ) {
      hasMoved.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    touchEndX.current = e.clientX;
    isDragging.current = false;

    handleSwipe();
    setIsSwiping(false);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging.current) {
      touchEndX.current = e.clientX;
      isDragging.current = false;

      handleSwipe();
      setIsSwiping(false);
    }
  };

  const handleCardClick = (view: AppView) => {
    if (hasMoved.current) return;

    setView(view);
  };

  const buttons = [
    {
      id: 'NUMBER_CONFIG' as AppView,
      label: t.home.number,
      icon: 'fa-hashtag',
    },
    {
      id: 'KEIGO_CONFIG' as AppView,
      label: t.home.keigo,
      icon: 'fa-comments',
    },
    {
      id: 'NAME_CONFIG' as AppView,
      label: t.home.name,
      icon: 'fa-address-card',
    },
    {
      id: 'PLACE_CONFIG' as AppView,
      label: t.home.place,
      icon: 'fa-map',
    },
  ];

  return (
    <div className="fixed inset-0 bg-stone-900 overflow-hidden">
      <div className="relative w-full max-w-xl h-full mx-auto bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
        {/* Scroll Area */}
        <main className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full pb-0">
            {/* Header */}
            <header className="relative w-full px-2 pt-3 pb-2 flex items-center justify-between">
              <div className="w-10 h-10 opacity-0" />

              <div className="text-center text-white/40 text-lg font-bold tracking-wider">
                yomeruyo
              </div>

              {/* Language Button */}
              <div ref={languageMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
                  aria-label={t.home.language}
                  aria-expanded={isLanguageMenuOpen}
                  className="
                    w-10
                    h-10
                    p-2.5
                    flex
                    items-center
                    justify-center
                    text-white/50
                    active:scale-90
                    transition-transform
                  "
                >
                  <i className="fas fa-globe text-md" />
                </button>

                {/* Language Dropdown */}
                {isLanguageMenuOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-11
                      z-[100]
                      w-32
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/10
                      bg-stone-900/95
                      shadow-xl
                      backdrop-blur-md
                    "
                  >
                    <button
                      type="button"
                      onClick={() => handleLanguageChange('ko')}
                      className={`
                        w-full
                        px-4
                        py-3
                        flex
                        items-center
                        justify-between
                        text-sm
                        transition-colors
                        ${
                          language === 'ko'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5'
                        }
                      `}
                    >
                      <span>🇰🇷 한국어</span>

                      {language === 'ko' && (
                        <i className="fas fa-check text-xs text-rose-400" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLanguageChange('ja')}
                      className={`
                        w-full
                        px-4
                        py-3
                        flex
                        items-center
                        justify-between
                        text-sm
                        transition-colors
                        ${
                          language === 'ja'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5'
                        }
                      `}
                    >
                      <span>🇯🇵 日本語</span>

                      {language === 'ja' && (
                        <i className="fas fa-check text-xs text-rose-400" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* Main Visual */}
            <section className="w-full mt-2">
              <div className="w-full px-4">
                {/* Card Area */}
                <div
                  className="
                    w-full
                    h-[361px]
                    rounded-[32px]
                    overflow-hidden
                    select-none
                    cursor-grab
                    active:cursor-grabbing
                    touch-pan-y
                  "
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${activeCard * 100}%)`,
                    }}
                  >
                    {/* 숫자 읽기 */}
                    <button
                      type="button"
                      onClick={() => handleCardClick('NUMBER_CONFIG')}
                      className="
                        shrink-0
                        w-full
                        h-full
                        relative
                        overflow-hidden
                        bg-gradient-to-br
                        from-red-700
                        via-pink-500
                        to-red-500
                        text-left
                      "
                    >
                      <div className="absolute w-[656px] h-96 left-[-117px] top-[107px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute w-[454px] h-64 left-[-27px] top-[179px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute left-0 top-6 w-full text-center">
                        <div className="text-white text-2xl font-bold leading-8">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div className="text-white/60 text-2xl font-bold leading-9">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-64 h-32 left-1/2 -translate-x-1/2 top-[124px] -rotate-3 bg-white rounded-2xl flex items-center justify-center">
                        <div className="text-center text-red-700 text-5xl font-bold leading-[60px]">
                          1,900円
                        </div>
                      </div>

                      <div className="absolute left-0 bottom-5 w-full px-4">
                        <div className="w-full h-14 bg-black/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold leading-6">
                            {t.home.goToNumber}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* 인명 읽기 */}
                    <button
                      type="button"
                      onClick={() => handleCardClick('NAME_CONFIG')}
                      className="
                        shrink-0
                        w-full
                        h-full
                        relative
                        overflow-hidden
                        bg-gradient-to-br
                        from-blue-950
                        to-teal-400
                        text-left
                      "
                    >
                      <div className="absolute w-[656px] h-96 left-[-117px] top-[107px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute w-[454px] h-64 left-[-27px] top-[179px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute left-0 top-6 w-full text-center">
                        <div className="text-white text-2xl font-bold leading-8">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div className="text-white/60 text-2xl font-bold leading-9">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-64 left-1/2 -translate-x-1/2 top-[124px] -rotate-3 bg-gradient-to-b from-white to-gray-200 rounded-3xl overflow-hidden">
                        <div className="flex border-b-2 border-black">
                          <div className="flex-1 px-2 pt-2.5 pb-2 border-r border-neutral-200 flex justify-center">
                            <span className="text-black/50 text-sm font-medium">
                              {t.home.nameExample.name}
                            </span>
                          </div>

                          <div className="flex-1 px-2 pt-2.5 pb-2 flex justify-center">
                            <span className="text-black/50 text-sm font-medium">
                              {t.home.nameExample.count}
                            </span>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="flex-1 p-2 border-r border-neutral-200 text-center">
                            <span className="text-blue-950 text-xl font-bold">
                              堀之内
                            </span>
                          </div>

                          <div className="flex-1 p-2 text-center">
                            <span className="text-blue-950 text-xl font-bold">
                              2人
                            </span>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="flex-1 px-2 pt-2 pb-3 border-r border-neutral-200 text-center">
                            <span className="text-blue-950 text-xl font-bold">
                              安藤
                            </span>
                          </div>

                          <div className="flex-1 px-2 pt-2 pb-3 text-center">
                            <span className="text-blue-950 text-xl font-bold">
                              3人
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-0 bottom-5 w-full px-4">
                        <div className="w-full h-14 bg-black/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold leading-6">
                            {t.home.goToName}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* 지명 읽기 */}
                    <button
                      type="button"
                      onClick={() => handleCardClick('PLACE_CONFIG')}
                      className="
                        shrink-0
                        w-full
                        h-full
                        relative
                        overflow-hidden
                        bg-gradient-to-br
                        from-amber-600
                        to-yellow-500
                        text-left
                      "
                    >
                      <div className="absolute w-[656px] h-96 left-[-117px] top-[107px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute w-[454px] h-64 left-[-27px] top-[179px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute left-0 top-6 w-full text-center">
                        <div className="text-white text-2xl font-bold leading-8">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div className="text-white/60 text-2xl font-bold leading-9">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-72 left-1/2 -translate-x-1/2 top-[110px] -rotate-3 bg-gradient-to-b from-white to-gray-200 rounded-3xl overflow-hidden">
                        <div className="pt-3.5 pb-2.5">
                          <div className="flex items-center justify-center">
                            <div className="w-6 h-6 rounded border-4 border-lime-400 bg-white" />

                            <div className="mx-2 text-black text-3xl font-bold leading-[48px]">
                              御徒町
                            </div>

                            <div className="w-6 h-6 opacity-0 rounded border-4 border-lime-400 bg-white" />
                          </div>

                          <div className="text-center text-black/50 text-xs font-semibold">
                            {t.home.placeExample.unknown}
                          </div>
                        </div>

                        <div className="px-2 bg-emerald-500 flex items-center justify-between">
                          <span className="flex-1 text-white text-sm font-semibold">
                            上野
                          </span>

                          <div className="w-7 h-7 bg-emerald-300" />

                          <span className="flex-1 text-right text-white text-sm font-semibold">
                            秋葉原
                          </span>
                        </div>

                        <div className="py-2 text-center text-black/50 text-xs font-semibold">
                          {t.home.placeExample.unknown}
                        </div>
                      </div>

                      <div className="absolute left-0 bottom-5 w-full px-4">
                        <div className="w-full h-14 bg-black/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold leading-6">
                            {t.home.goToPlace}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* 경어 */}
                    <button
                      type="button"
                      onClick={() => handleCardClick('KEIGO_CONFIG')}
                      className="
                        shrink-0
                        w-full
                        h-full
                        relative
                        overflow-hidden
                        bg-gradient-to-br
                        from-teal-700
                        to-lime-500
                        text-left
                      "
                    >
                      <div className="absolute w-[656px] h-96 left-[-117px] top-[107px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute w-[454px] h-64 left-[-27px] top-[179px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute left-0 top-6 w-full text-center">
                        <div className="text-white text-2xl font-bold leading-8">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div className="text-white/60 text-2xl font-bold leading-9">
                          {t.home.canAnswer}
                        </div>
                      </div>

                      <div className="absolute w-72 h-36 left-1/2 -translate-x-1/2 top-[118px] -rotate-3 bg-white rounded-full border-4 border-gray-200" />

                      <div className="absolute w-full px-5 top-[143px] -rotate-3 text-center">
                        <div className="text-teal-700 text-xl font-bold leading-7">
                          学生時代に一番力を
                          <br />
                          入れたことはなんですか？
                        </div>

                        <div className="mt-2 text-black/50 text-xs font-semibold leading-4">
                          학생 때 가장 열심히 했던 활동은
                          <br />
                          무엇인가요?
                        </div>
                      </div>

                      <div className="absolute left-0 bottom-5 w-full px-4">
                        <div className="w-full h-14 bg-black/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold leading-6">
                            {t.home.goToKeigo}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Indicator */}
                <div className="flex justify-center items-center gap-1.5 mt-3">
                  {Array.from({ length: cardCount }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveCard(index)}
                      aria-label={`${index + 1}번째 카드`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeCard === index
                          ? 'w-5 bg-white'
                          : 'w-1.5 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 학습하기 */}
            <section className="w-full px-4 mt-8">
              <div className="w-full h-7 mb-5 text-white text-xl font-bold leading-8">
                {t.home.study}
              </div>

              <div className="w-full flex flex-col gap-2">
                {/* 1행 */}
                <div className="w-full flex items-center gap-2">
                  {buttons.slice(0, 2).map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setView(btn.id)}
                      className="
                        flex-1
                        min-w-0
                        p-4
                        bg-gradient-to-b
                        from-white/10
                        to-white/5
                        rounded-[20px]
                        border
                        border-white/5
                        flex
                        flex-col
                        items-start
                        gap-4
                        text-left
                        active:scale-[0.97]
                        transition-transform
                      "
                    >
                      <div className="p-1.5 bg-rose-400/10 rounded-lg flex items-center justify-center">
                        <i
                          className={`fas ${btn.icon} w-6 h-6 text-rose-400 text-xl flex items-center justify-center`}
                        />
                      </div>

                      <div className="text-white text-xl font-bold leading-8">
                        {btn.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 2행 */}
                <div className="w-full flex items-center gap-2">
                  {buttons.slice(2, 4).map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setView(btn.id)}
                      className="
                        flex-1
                        min-w-0
                        p-4
                        bg-gradient-to-b
                        from-white/10
                        to-white/5
                        rounded-[20px]
                        border
                        border-white/5
                        flex
                        flex-col
                        items-start
                        gap-4
                        text-left
                        active:scale-[0.97]
                        transition-transform
                      "
                    >
                      <div className="p-1.5 bg-rose-400/10 rounded-lg flex items-center justify-center">
                        <i
                          className={`fas ${btn.icon} w-6 h-6 text-rose-400 text-xl flex items-center justify-center`}
                        />
                      </div>

                      <div className="text-white text-xl font-bold leading-8">
                        {btn.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-32">
              <Footer setView={setView} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
