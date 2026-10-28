import React, { useEffect, useState, useRef } from 'react';
import { AppView } from '../types';
import Footer from './Footer';
import Logo from '../assets/yomeruyo.svg?react';
import { ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  setView: (view: AppView) => void;
  proverb?: {
    display: string;
    reading: string;
    korean: string;
  } | null;
}

const BannerPreview: React.FC<{ kind: AppView }> = ({ kind }) => {
  const { t } = useLanguage();
  const [menuFontReady, setMenuFontReady] = useState(false);
  useEffect(() => {
    if (kind !== 'MENU_CONFIG') return;
    let active = true;
    document.fonts.load('400 40px "Yuji Syuku"', '銀杏砂肝鶏皮').then(() => {
      if (active) setMenuFontReady(true);
    }).catch(() => { if (active) setMenuFontReady(true); });
    return () => { active = false; };
  }, [kind]);
  return <>
    {kind === 'MENU_CONFIG' && (
      <div lang="ja" className="w-64 h-40 md:h-44 rounded-xl bg-[#fff8e8] border border-amber-900/10 shadow-xl px-6 py-3 md:py-4 text-stone-800">
        <div style={{ fontFamily: '"Yuji Syuku", "Yu Mincho", serif', opacity: menuFontReady ? 1 : 0 }} className="h-full flex flex-row-reverse justify-between items-center">
          <span style={{ writingMode: 'vertical-rl' }} className="text-4xl tracking-widest">銀杏</span>
          <span style={{ writingMode: 'vertical-rl' }} className="text-4xl tracking-widest">砂肝</span>
          <span style={{ writingMode: 'vertical-rl' }} className="text-4xl tracking-widest">鶏皮</span>
        </div>
      </div>
    )}
    {kind === 'NUMBER_CONFIG' && (<>
<div className="w-64 h-32 bg-white rounded-2xl flex items-center justify-center">
                        <div className="text-center text-red-700 text-5xl font-bold leading-[60px]">
                          3,874円
                        </div>
                      </div>
    </>)}
    {kind === 'NAME_CONFIG' && (<>
<div className="w-64 bg-gradient-to-b from-white to-gray-200 rounded-3xl overflow-hidden">
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
    </>)}
    {kind === 'PLACE_CONFIG' && (<>
<div className="w-72 bg-gradient-to-b from-white to-gray-200 rounded-3xl overflow-hidden">
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
    </>)}
    {kind === 'KEIGO_CONFIG' && (<div className="relative w-72 h-36">
<div className="absolute inset-0 w-72 h-36 bg-white rounded-full border-4 border-gray-200" />

                      <div className="absolute w-[340px] left-1/2 -translate-x-1/2 px-5 top-[25px] text-center">
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
    </div>)}
  </>;
};

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

  const cardCount = 5;

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
    { id: 'MENU_CONFIG' as AppView, label: t.home.menu, icon: 'fa-utensils' },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-950 to-stone-900 overflow-hidden">
      <div className="relative w-full h-full mx-auto overflow-hidden">
        {/* Scroll Area */}
        <main className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain">
          <div className="w-full max-w-[873px] mx-auto pb-0 md:px-2">
            {/* Header */}
            <header className="relative w-full px-2 pt-3 pb-2 flex items-center justify-between">
              <div className="w-10 h-10 opacity-0" />

              <Logo className="w-auto h-3.5 opacity-40" />

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
                    text-[#915b6c]
                    active:scale-90
                    transition-transform
                  "
                >
                  <Globe size={18} strokeWidth={2} />
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
                    h-[361px] md:h-96
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
                    {/* Desktop banners share the mobile carousel index and gestures. */}
                    {[
                      { view: 'NUMBER_CONFIG', action: t.home.goToNumber, color: 'from-red-700 via-pink-500 to-red-500', example: '3,874円', ink: 'text-red-700' },
                      { view: 'NAME_CONFIG', action: t.home.goToName, color: 'from-blue-950 to-teal-400', example: '堀之内　2人', ink: 'text-blue-950' },
                      { view: 'PLACE_CONFIG', action: t.home.goToPlace, color: 'from-amber-600 to-yellow-500', example: '御徒町', ink: 'text-amber-700' },
                      { view: 'KEIGO_CONFIG', action: t.home.goToKeigo, color: 'from-teal-700 to-lime-500', example: t.home.keigoExample.question, ink: 'text-teal-700' },
                      { view: 'MENU_CONFIG', action: t.home.goToMenu, color: 'from-purple-900 via-violet-500 to-fuchsia-500' },
                    ].map(card => (
                      <button key={card.view} type="button" onClick={() => handleCardClick(card.view as AppView)}
                        className={`hidden md:flex shrink-0 w-full h-full relative overflow-hidden bg-gradient-to-br ${card.color} text-left items-center justify-between gap-8 pl-12 pr-16`}>
                        <div className="pointer-events-none absolute w-[699px] h-96 left-24 top-36 rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />
                        <div className="pointer-events-none absolute w-[483px] h-64 left-48 top-56 rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />
                        <div className="relative flex-1 min-w-0 flex flex-col gap-8">
                          <div style={{ lineHeight: 1.4 }} className="text-white text-[32px] lg:text-4xl font-bold whitespace-nowrap">{t.home.canReadInOneSecond}<br />{card.view === 'KEIGO_CONFIG' ? t.home.canAnswer : t.home.canRead}</div>
                          <div className="flex items-center gap-2 text-white/80 text-lg font-medium leading-6">
                            <span>{card.action}</span><ChevronRight size={20} className="shrink-0" />
                          </div>
                        </div>
                        <div className="relative w-72 lg:w-80 h-48 shrink-0 flex items-center justify-center">
                          <div className="relative -rotate-3 scale-105 lg:scale-[1.2]">
                            <BannerPreview kind={card.view as AppView} />
                          </div>
                        </div>
                      </button>
                    ))}
                    {/* 숫자 읽기 */}
                    <button
                      type="button"
                      onClick={() => handleCardClick('NUMBER_CONFIG')}
                      className="
                        md:hidden
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
                        <div style={{ lineHeight: 1.4 }} className="text-white text-2xl font-bold">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div style={{ lineHeight: 1.4 }} className="text-white/60 text-2xl font-bold">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-64 h-32 top-[124px] left-1/2 -translate-x-1/2 -rotate-3">
                        <BannerPreview kind="NUMBER_CONFIG" />
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
                        md:hidden
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
                        <div style={{ lineHeight: 1.4 }} className="text-white text-2xl font-bold">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div style={{ lineHeight: 1.4 }} className="text-white/60 text-2xl font-bold">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-64 top-[124px] left-1/2 -translate-x-1/2 -rotate-3">
                        <BannerPreview kind="NAME_CONFIG" />
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
                        md:hidden
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
                        <div style={{ lineHeight: 1.4 }} className="text-white text-2xl font-bold">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div style={{ lineHeight: 1.4 }} className="text-white/60 text-2xl font-bold">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-72 top-[110px] left-1/2 -translate-x-1/2 -rotate-3">
                        <BannerPreview kind="PLACE_CONFIG" />
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
                        md:hidden
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
                        <div style={{ lineHeight: 1.4 }} className="text-white text-2xl font-bold">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div style={{ lineHeight: 1.4 }} className="text-white/60 text-2xl font-bold">
                          {t.home.canAnswer}
                        </div>
                      </div>

                      <div className="absolute w-72 h-36 top-[118px] left-1/2 -translate-x-1/2 -rotate-3">
                        <BannerPreview kind="KEIGO_CONFIG" />
                      </div>

                      <div className="absolute left-0 bottom-5 w-full px-4">
                        <div className="w-full h-14 bg-black/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold leading-6">
                            {t.home.goToKeigo}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* 메뉴 읽기 */}
                    <button
                      type="button"
                      onClick={() => handleCardClick('MENU_CONFIG')}
                      className="
                        md:hidden
                        shrink-0
                        w-full
                        h-full
                        relative
                        overflow-hidden
                        bg-gradient-to-br
                        from-purple-900
                        via-violet-500
                        to-fuchsia-500
                        text-left
                      "
                    >
                      <div className="absolute w-[656px] h-96 left-[-117px] top-[107px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute w-[454px] h-64 left-[-27px] top-[179px] rotate-[9.54deg] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.20)_100%)] blur" />

                      <div className="absolute left-0 top-6 w-full text-center">
                        <div style={{ lineHeight: 1.4 }} className="text-white text-2xl font-bold">
                          {t.home.canReadInOneSecond}
                        </div>

                        <div style={{ lineHeight: 1.4 }} className="text-white/60 text-2xl font-bold">
                          {t.home.canRead}
                        </div>
                      </div>

                      <div className="absolute w-64 h-40 top-[118px] left-1/2 -translate-x-1/2 -rotate-3">
                        <BannerPreview kind="MENU_CONFIG" />
                      </div>

                      <div className="absolute left-0 bottom-5 w-full px-4">
                        <div className="w-full h-14 bg-black/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold leading-6">
                            {t.home.goToMenu}
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

              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {buttons.map((btn) => (
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
            </section>

          </div>
          <div className="mt-48 md:mt-56">
            <Footer setView={setView} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
