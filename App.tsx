import React, { useState, useMemo } from 'react';
import { AppView, StudyItem, KeigoLine } from './types';
import Home from './features/Home';
import NumberConfigView from './features/NumberConfig';
import NameConfigView from './features/NameConfig';
import PlaceConfigView from './features/PlaceConfig';
import KeigoConfigView from './features/KeigoConfig';
import StudySession from './features/StudySession';
import KeigoPlayer from './features/KeigoPlayer';
import {
  PREFECTURES,
  TOKYO_STATIONS,
  TOKYO_LINES,
  OSAKA_STATIONS,
  OSAKA_LINES,
  SURNAMES,
  GIVEN_NAMES,
  CELEBRITIES,
  KEIGO_BASIC,
  KEIGO_CAFE,
  PROVERBS,
} from './constants';
import {
  convertNumberToJapanese,
  generateRandomDate,
  toKoreanPhonetic,
  shuffleArray,
} from './utils';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('HOME');
  const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
  const [keigoScript, setKeigoScript] = useState<KeigoLine[]>([]);
  const [globalShowKorean, setGlobalShowKorean] = useState(true);

  const dailyProverb = useMemo(() => {
    return PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
  }, []);

  const startStudy = (items: StudyItem[], showKorean: boolean) => {
    setStudyItems(items);
    setGlobalShowKorean(showKorean);
    setView('STUDY_SESSION');
  };

  const startKeigo = (lines: KeigoLine[]) => {
    setKeigoScript(lines);
    setView('KEIGO_PLAYER');
  };

  const handleBack = () => setView('HOME');
  const ITEM_COUNT = 20;

  // 1. 패딩이 없어야 하는 뷰 (홈 화면 포함)
  const isNoPaddingView =
    view === 'HOME' || view === 'STUDY_SESSION' || view === 'KEIGO_PLAYER';

  // 2. 스크롤이 금지되어야 하는 뷰 (학습 화면만)
  const isPlayerView = view === 'STUDY_SESSION' || view === 'KEIGO_PLAYER';

  return (
    <div className="min-h-screen max-w-xl mx-auto relative overflow-hidden flex flex-col bg-white">
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
              for (let i = 0; i < ITEM_COUNT; i++) {
                const val =
                  config.counter === '날짜'
                    ? generateRandomDate()
                    : Math.floor(Math.random() * 1000);
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
              let script =
                config.category === 'BASIC' ? KEIGO_BASIC : KEIGO_CAFE;
              startKeigo(shuffleArray(script));
            }}
          />
        )}

        {view === 'STUDY_SESSION' && (
          <StudySession
            items={studyItems}
            showKorean={globalShowKorean}
            onEnd={handleBack}
          />
        )}
        {view === 'KEIGO_PLAYER' && (
          <KeigoPlayer script={keigoScript} onEnd={handleBack} />
        )}
      </main>
    </div>
  );
};

export default App;
