
export type AppView = 'HOME' | 'NUMBER_CONFIG' | 'NAME_CONFIG' | 'PLACE_CONFIG' | 'KEIGO_CONFIG' | 'STUDY_SESSION' | 'KEIGO_PLAYER';

export interface NumberConfig {
  range: [number, number];
  unit: 1 | 10 | 100 | 1000 | 10000;
  counter: string;
  showKorean: boolean;
}

export interface NameConfig {
  type: 'RANKING' | 'CELEBRITY';
  showKorean: boolean;
}

export interface PlaceConfig {
  category: 'PREFECTURE' | 'TOKYO_STATION' | 'TOKYO_LINE' | 'OSAKA_STATION' | 'OSAKA_LINE';
  showKorean: boolean;
}

export interface KeigoConfig {
  category: 'BASIC' | 'CAFE' | 'CUSTOM';
  customScript?: string;
}

export interface StudyItem {
  display: string;
  reading: string;
  korean?: string;
}

export interface KeigoLine {
  japanese: string;
  korean?: string;
}
