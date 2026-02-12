
import { KeigoLine } from './types';

export const PREFECTURES = [
  { display: '北海道', reading: 'ほっかいどう', korean: '홋카이도' },
  { display: '東京都', reading: 'とうきょうと', korean: '도쿄도' },
  { display: '大阪府', reading: 'おおさかふ', korean: '오사카부' },
  { display: '京都府', reading: 'きょうとふ', korean: '교토부' },
  { display: '福岡県', reading: 'ふくおかけん', korean: '후쿠오카현' },
  { display: '沖縄県', reading: 'おき나わけん', korean: '오키나와현' },
];

export const TOKYO_STATIONS = [
  { display: '新宿', reading: 'しんじゅく', korean: '신주쿠' },
  { display: '渋谷', reading: 'しぶや', korean: '시부야' },
  { display: '池袋', reading: 'いけぶくろ', korean: '이케부쿠로' },
  { display: '秋葉原', reading: 'あきはばら', korean: '아키하바라' },
  { display: '上野', reading: 'うえの', korean: '우에노' },
];

export const SURNAMES = [
  { kanji: '佐藤', reading: 'さとう' },
  { kanji: '鈴木', reading: 'すずき' },
  { kanji: '高橋', reading: 'たかはし' },
  { kanji: '田中', reading: 'たなか' },
  { kanji: '伊藤', reading: 'いとう' },
  { kanji: '渡辺', reading: 'わたなべ' },
  { kanji: '山本', reading: 'やまもと' },
  { kanji: '中村', reading: 'なかむら' },
  { kanji: '小林', reading: 'こばやし' },
  { kanji: '加藤', reading: 'かとう' }
];

export const GIVEN_NAMES = [
  { kanji: '蓮', reading: 'れん' },
  { kanji: '陽葵', reading: 'ひまり' },
  { kanji: '蒼', reading: 'あおい' },
  { kanji: '凛', reading: 'りん' },
  { kanji: '湊', reading: 'みなと' }
];

export const CELEBRITIES = [
  { display: '木村拓哉', reading: 'きむらたくや', korean: '기무라 타쿠야' },
  { display: '石原さとみ', reading: 'いしはらさと미', korean: '이시하라 사토미' },
  { display: '新垣結衣', reading: 'あらがきゆい', korean: '아라가키 유이' },
  { display: '堺雅人', reading: 'さかいまさと', korean: '사카이 마사토' },
];

export const KEIGO_BASIC: KeigoLine[] = [
  { japanese: 'いらっしゃいませ。', korean: '어서 오십시오.' },
  { japanese: 'かしこまりました。', korean: '알겠습니다(잘 알겠습니다).' },
  { japanese: '少々お待ちくださいませ。', korean: '잠시만 기다려 주십시오.' },
  { japanese: 'またお越しくださいませ。', korean: '또 오십시오.' },
  { japanese: '大変申し訳ございません。', korean: '정말 죄송합니다.' },
  { japanese: 'お待たせいたしました。', korean: '오래 기다리셨습니다.' },
];

export const KEIGO_CAFE: KeigoLine[] = [
  { japanese: '店内召し上がりとお持ち帰り、どちらになさいますか？', korean: '매장 식사와 포장 중 어느 쪽으로 하시겠습니까?' },
  { japanese: 'ご注文はお決まりでしょうか？', korean: '주문은 결정하셨습니까?' },
  { japanese: '砂糖とミルクはお使いになりますか？', korean: '설탕과 우유는 사용하십니까?' },
  { japanese: 'こちらの席でよろしいでしょうか？', korean: '이 자리로 괜찮으십니까?' },
];

export const COUNTERS: Record<string, string> = {
  '명': 'にん',
  '마리': 'ひき',
  '층': 'かい',
  '개': 'こ',
  '권': 'さつ',
  '엔': 'えん',
};

export const NUMBER_READINGS: Record<number, string> = {
  0: 'れい', 1: 'いち', 2: 'に', 3: 'さん', 4: 'よん', 5: 'ご', 6: 'ろく', 7: 'なな', 8: 'はち', 9: 'きゅう',
  10: 'じゅう', 100: 'ひゃく', 1000: 'せん', 10000: 'まん'
};
