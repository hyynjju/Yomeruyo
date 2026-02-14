import { KeigoLine } from './types';
import places from './data/places.json';
import names from './data/names.json';
import keigo from './data/keigo.json';
import proverb from './data/proverb.json';

export const PREFECTURES = places.prefectures;
export const TOKYO_STATIONS = places.tokyoStations;
export const TOKYO_LINES = places.tokyoLines;
export const OSAKA_STATIONS = places.osakaStations;
export const OSAKA_LINES = places.osakaLines;

export const SURNAMES = names.surnames;
export const GIVEN_NAMES = names.givenNames;
export const CELEBRITIES = names.celebrities;

export const KEIGO_BASIC: KeigoLine[] = keigo.basic;
export const KEIGO_CAFE: KeigoLine[] = keigo.cafe;

export const PROVERBS = proverb.proverbs;
