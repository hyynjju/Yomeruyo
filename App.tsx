
import React, { useState, useCallback, useMemo } from 'react';
import { AppView, NumberConfig, NameConfig, PlaceConfig, KeigoConfig, StudyItem, KeigoLine } from './types';
import Home from './features/Home';
import NumberConfigView from './features/NumberConfig';
import NameConfigView from './features/NameConfig';
import PlaceConfigView from './features/PlaceConfig';
import KeigoConfigView from './features/KeigoConfig';
import StudySession from './features/StudySession';
import KeigoPlayer from './features/KeigoPlayer';
import { PREFECTURES, TOKYO_STATIONS, SURNAMES, GIVEN_NAMES, CELEBRITIES, KEIGO_BASIC, KEIGO_CAFE } from './constants';
import { convertNumberToJapanese, generateRandomDate, toKoreanPhonetic } from './utils';

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

  const ITEM_COUNT = 1000;

  // Keigo player needs its own layout context to avoid main's padding/overflow
  const isPlayerView = view === 'KEIGO_PLAYER' || view === 'STUDY_SESSION';

  return (
    <div className="min-h-screen max-w-md mx-auto relative overflow-hidden flex flex-col bg-white">
      <main className={`flex-1 flex flex-col ${isPlayerView ? 'p-0 overflow-hidden' : 'p-6 overflow-y-auto'}`}>
        {view === 'HOME' && <Home setView={setView} />}
        
        {view === 'NUMBER_CONFIG' && (
          <NumberConfigView 
            onBack={handleBack} 
            onStart={(config) => {
              const items: StudyItem[] = [];
              if (config.counter === '날짜') {
                for (let i = 0; i < ITEM_COUNT; i++) {
                  const timestamp = generateRandomDate();
                  const result = convertNumberToJapanese(timestamp, '날짜');
                  items.push({ display: result.display, reading: result.reading, korean: result.korean });
                }
              } else {
                for (let i = 0; i < ITEM_COUNT; i++) {
                  const rand = Math.floor(Math.random() * (config.range[1] - config.range[0] + 1)) + config.range[0];
                  const rounded = Math.floor(rand / config.unit) * config.unit;
                  const result = convertNumberToJapanese(rounded || config.unit, config.counter);
                  items.push({ display: result.display, reading: result.reading, korean: result.korean });
                }
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
                for (let i = 0; i < ITEM_COUNT; i++) {
                  const surnameObj = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
                  const nameObj = GIVEN_NAMES[Math.floor(Math.random() * GIVEN_NAMES.length)];
                  const reading = surnameObj.reading + nameObj.reading;
                  items.push({ 
                    display: surnameObj.kanji + nameObj.kanji, 
                    reading: reading,
                    korean: toKoreanPhonetic(reading)
                  });
                }
              } else {
                for (let i = 0; i < ITEM_COUNT; i++) {
                  const c = CELEBRITIES[i % CELEBRITIES.length];
                  items.push({ display: c.display, reading: c.reading, korean: c.korean });
                }
              }
              startStudy(items, config.showKorean);
            }} 
          />
        )}

        {view === 'PLACE_CONFIG' && (
          <PlaceConfigView 
            onBack={handleBack} 
            onStart={(config) => {
              const pool = config.category === 'PREFECTURE' ? PREFECTURES : TOKYO_STATIONS;
              const items: StudyItem[] = [];
              for (let i = 0; i < ITEM_COUNT; i++) {
                const p = pool[i % pool.length];
                items.push({ display: p.display, reading: p.reading, korean: p.korean });
              }
              startStudy(items, config.showKorean);
            }} 
          />
        )}

        {view === 'KEIGO_CONFIG' && (
          <KeigoConfigView 
            onBack={handleBack} 
            onStart={(config) => {
              let script: KeigoLine[] = [];
              if (config.category === 'BASIC') script = KEIGO_BASIC;
              else if (config.category === 'CAFE') script = KEIGO_CAFE;
              else if (config.customScript) {
                script = config.customScript.split('\n').filter(l => l.trim()).map(l => ({ japanese: l.trim() }));
              }
              startKeigo(script);
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
          <KeigoPlayer 
            script={keigoScript} 
            onEnd={handleBack} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
