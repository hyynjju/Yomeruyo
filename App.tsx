import React, { useState, useMemo, useEffect } from 'react';
import { AppView, StudyItem, KeigoLine } from './types';
import MenuConfigView from './features/MenuConfig';
import { MENUS } from './constants';
import Home from './features/Home';
import NumberConfigView from './features/NumberConfig';
import NameConfigView from './features/NameConfig';
import PlaceConfigView from './features/PlaceConfig';
import KeigoConfigView from './features/KeigoConfig';
import StudySession from './features/StudySession';
import KeigoPlayer from './features/KeigoPlayer';
import FeedbackView from './features/FeedbackView';
import { Analytics } from '@vercel/analytics/react';

import { useNavigate, useLocation } from 'react-router-dom';

import {
  PREFECTURES,
  TOKYO_STATIONS,
  TOKYO_LINES,
  OSAKA_STATIONS,
  OSAKA_LINES,
  SURNAMES,
  GIVEN_NAMES,
  CELEBRITIES,
  PROVERBS,
} from './constants';

import {
  convertNumberToJapanese,
  generateRandomDate,
  toKoreanPhonetic,
  shuffleArray,
} from './utils';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState<AppView>('HOME');
  const [studySource, setStudySource] = useState<AppView>('NUMBER_CONFIG');
  const [completedStudies, setCompletedStudies] = useState<AppView[]>([]);
  const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
  const [keigoCategory, setKeigoCategory] = useState<
    'CAFE' | 'INTERVIEW' | 'BAITO'
  >(
    'CAFE',
  );
  const [globalShowKorean, setGlobalShowKorean] = useState(true);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setView('HOME');
        break;
      case '/number':
        setView('NUMBER_CONFIG');
        break;
      case '/name':
        setView('NAME_CONFIG');
        break;
      case '/menu':
        setView('MENU_CONFIG');
        break;
      case '/place':
        setView('PLACE_CONFIG');
        break;
      case '/keigo':
        setView('KEIGO_CONFIG');
        break;
      case '/study':
        setView('STUDY_SESSION');
        break;
      case '/keigo-player':
        setView('KEIGO_PLAYER');
        break;
      case '/feedback':
        setView('FEEDBACK');
        break;
      default:
        setView('HOME');
    }
  }, [location.pathname]);

  // ✅ view → URL 동기화
  useEffect(() => {
    switch (view) {
      case 'HOME':
        navigate('/');
        break;
      case 'NUMBER_CONFIG':
        navigate('/number');
        break;
      case 'NAME_CONFIG':
        navigate('/name');
        break;
      case 'MENU_CONFIG':
        navigate('/menu');
        break;
      case 'PLACE_CONFIG':
        navigate('/place');
        break;
      case 'KEIGO_CONFIG':
        navigate('/keigo');
        break;
      case 'STUDY_SESSION':
        navigate('/study');
        break;
      case 'KEIGO_PLAYER':
        navigate('/keigo-player');
        break;
      case 'FEEDBACK':
        navigate('/feedback');
        break;
    }
  }, [view]);

  const dailyProverb = useMemo(() => {
    return PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
  }, []);

  const startStudy = (items: StudyItem[], showKorean: boolean) => {
    if (!items.length) return;
    setStudySource(view);
    setStudyItems(Array.from({ length: 20 }, (_, index) => items[index % items.length]));
    setGlobalShowKorean(showKorean);
    setView('STUDY_SESSION');
  };

  const handleBack = () => setView('HOME');
  const ITEM_COUNT = 20;

  const isNoPaddingView =
    view === 'HOME' ||
    view === 'STUDY_SESSION' ||
    view === 'KEIGO_PLAYER' ||
    view === 'FEEDBACK';

  const isPlayerView = view === 'STUDY_SESSION' || view === 'KEIGO_PLAYER';


  return (
    <>
      <div className={`min-h-screen mx-auto relative overflow-hidden flex flex-col bg-white ${view === 'HOME' || isPlayerView ? 'w-full' : 'max-w-xl'}`}>
        <main
          className={`flex-1 flex flex-col ${isNoPaddingView ? 'p-0' : 'p-6'} ${
            isPlayerView ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {view === 'HOME' && <Home setView={setView} proverb={dailyProverb} />}

          {view === 'NUMBER_CONFIG' && (
            <NumberConfigView
              onBack={handleBack}
              onStart={(config) => {
                const items: StudyItem[] = [];
                let [min, max] = config.range;

                if (config.unit === 1000 && max <= 1000) max = 10000;
                if (config.unit === 10000 && max <= 10000) max = 100000;

                for (let i = 0; i < ITEM_COUNT; i++) {
                  let val: number;
                  if (config.counter === '날짜') {
                    val = generateRandomDate();
                  } else {
                    const randomVal =
                      Math.floor(Math.random() * (max - min + 1)) + min;
                    val = Math.floor(randomVal / config.unit) * config.unit;
                    if (val < config.unit) val = config.unit;
                    if (val < min) val = min;
                  }
                  const result = convertNumberToJapanese(val, config.counter);
                  items.push(result);
                }
                startStudy(items, config.showKorean);
              }}
            />
          )}

          {view === 'NAME_CONFIG' && (
            <NameConfigView
              onBack={handleBack}
              onStart={(config) => {
                let items: StudyItem[] = [];
                if (config.type === 'RANKING') {
                  const shuffledSurnames = shuffleArray(SURNAMES);
                  const shuffledGivens = shuffleArray(GIVEN_NAMES);

                  for (let i = 0; i < ITEM_COUNT; i++) {
                    const s = shuffledSurnames[i % shuffledSurnames.length];
                    const g =
                      shuffledGivens[
                        Math.floor(Math.random() * shuffledGivens.length)
                      ];
                    const reading = s.reading + g.reading;
                    items.push({
                      display: s.kanji + g.kanji,
                      reading,
                      korean: toKoreanPhonetic(reading),
                    });
                  }
                } else {
                  const shuffledCelebs = shuffleArray(CELEBRITIES);
                  items = shuffledCelebs.slice(0, ITEM_COUNT).map((c) => ({
                    display: c.display,
                    reading: c.reading,
                    korean: c.korean || toKoreanPhonetic(c.reading),
                  }));
                }
                startStudy(items, config.showKorean);
              }}
            />
          )}

          {view === 'MENU_CONFIG' && (
            <MenuConfigView onBack={handleBack} onStart={async (config) => {
              const pool = shuffleArray(MENUS[config.category]).slice(0, ITEM_COUNT);
              const handwritten = config.category === 'izakaya' || config.category === 'yakiniku';
              const family = handwritten ? 'Yuji Syuku' : 'Noto Serif JP';
              let questionFont: StudyItem['questionFont'];
              try {
                // Load every glyph used in this session, including later questions.
                const fonts = await document.fonts.load(`400 48px "${family}"`, pool.map(item => item.display).join(''));
                if (fonts.length > 0) questionFont = handwritten ? 'handwriting' : 'mincho';
              } catch {
                // Keep the default font for the whole session if loading fails.
              }
              startStudy(pool.map(item => ({ ...item, questionFont })), config.showKorean);
            }} />
          )}

          {view === 'PLACE_CONFIG' && (
            <PlaceConfigView
              onBack={handleBack}
              onStart={(config) => {
                let selectedPool: any[] = [];
                switch (config.category) {
                  case 'PREFECTURE':
                    selectedPool = PREFECTURES;
                    break;
                  case 'TOKYO_STATION':
                    selectedPool = TOKYO_STATIONS;
                    break;
                  case 'TOKYO_LINE':
                    selectedPool = TOKYO_LINES;
                    break;
                  case 'OSAKA_STATION':
                    selectedPool = OSAKA_STATIONS;
                    break;
                  case 'OSAKA_LINE':
                    selectedPool = OSAKA_LINES;
                    break;
                  default:
                    selectedPool = PREFECTURES;
                }

                const pool = shuffleArray(selectedPool);
                const items = pool.slice(0, ITEM_COUNT).map((p) => ({
                  display: p.display,
                  reading: p.reading,
                  korean: p.korean,
                }));
                startStudy(items, config.showKorean);
              }}
            />
          )}

          {view === 'KEIGO_CONFIG' && (
            <KeigoConfigView
              onBack={handleBack}
              onStart={(config) => {
                setKeigoCategory(config.category);
                setView('KEIGO_PLAYER');
              }}
            />
          )}

          {view === 'FEEDBACK' && <FeedbackView onBack={handleBack} />}

          {view === 'STUDY_SESSION' && (
            <StudySession
              items={studyItems}
              source={studySource}
              completedStudies={completedStudies}
              onComplete={() => setCompletedStudies(previous => previous.includes(studySource) ? previous : [...previous, studySource])}
              onSelectStudy={setView}
              showKorean={globalShowKorean}
              onEnd={handleBack}
            />
          )}

          {view === 'KEIGO_PLAYER' && (
            <KeigoPlayer category={keigoCategory} onEnd={handleBack} />
          )}

        </main>
      </div>
      <Analytics />
    </>
  );
};

export default App;
