import React, { useState } from 'react';
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
  const ITEM_COUNT = 20; // 퀴즈 개수 조절

  const isPlayerView = view === 'KEIGO_PLAYER' || view === 'STUDY_SESSION';

  return (
    <div className="min-h-screen max-w-md mx-auto relative overflow-hidden flex flex-col bg-white">
      <main
        className={`flex-1 flex flex-col ${
          isPlayerView ? 'p-0 overflow-hidden' : 'p-6 overflow-y-auto'
        }`}
      >
        {view === 'HOME' && <Home setView={setView} />}

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
                // 성씨와 이름을 각각 섞어서 조합
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
                // 연예인 목록을 통째로 섞음
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
              // 카테고리에 따른 데이터 풀 선택 로직 확장
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
              startKeigo(shuffleArray(script)); // 경어도 랜덤 순서 적용
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
