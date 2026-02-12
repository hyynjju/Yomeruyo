
export function getJapaneseNumberReading(n: number): string {
  const units = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  
  if (n === 0) return 'れい';
  
  const get100s = (v: number) => {
    if (v === 0) return '';
    if (v === 1) return 'ひゃく';
    if (v === 3) return 'さんびゃく';
    if (v === 6) return 'ろっぴゃく';
    if (v === 8) return 'はっぴゃく';
    return units[v] + 'ひゃく';
  };

  const get1000s = (v: number) => {
    if (v === 0) return '';
    if (v === 1) return 'せん';
    if (v === 3) return 'さんぜん';
    if (v === 8) return 'はっせん';
    return units[v] + 'せん';
  };

  let val = n;
  let res = '';
  
  if (val >= 10000) {
    const m = Math.floor(val / 10000);
    res += (m === 1 ? 'いち' : getJapaneseNumberReading(m)) + 'まん';
    val %= 10000;
  }
  
  if (val >= 1000) {
    res += get1000s(Math.floor(val / 1000));
    val %= 1000;
  }
  
  if (val >= 100) {
    res += get100s(Math.floor(val / 100));
    val %= 100;
  }
  
  if (val >= 10) {
    const j = Math.floor(val / 10);
    res += (j === 1 ? '' : units[j]) + 'じゅう';
    val %= 10;
  }
  
  if (val > 0) {
    res += units[val];
  }
  
  return res;
}

const jpToKoMap: Record<string, string> = {
  'あ': '아', 'い': '이', 'う': '우', 'え': '에', 'お': '오',
  'か': '카', 'き': '키', 'く': '쿠', 'け': '케', 'こ': '코',
  'さ': '사', 'し': '시', 'す': '스', 'せ': '세', 'そ': '소',
  'た': '타', 'ち': '치', 'つ': '츠', 'て': '테', 'と': '토',
  'な': '나', 'に': '니', 'ぬ': '누', 'ね': '네', 'の': '노',
  'は': '하', 'ひ': '히', 'ふ': '후', 'へ': '헤', 'ほ': '호',
  'ま': '마', 'み': '미', 'む': '무', 'め': '메', 'も': '모',
  '야': '야', 'ゆ': '유', 'よ': '요',
  'ら': '라', 'り': '리', 'る': '루', 'れ': '레', 'ろ': '로',
  'わ': '와', 'を': '오', 'ん': 'ㄴ',
  'が': '가', 'ぎ': '기', 'ぐ': '구', 'げ': '게', 'ご': '고',
  'ざ': '자', 'じ': '지', 'ず': '즈', 'ぜ': '제', 'ぞ': '조',
  'だ': '다', 'ぢ': '지', 'づ': '즈', 'で': '데', '도': '도',
  'ば': '바', 'び': '비', 'ぶ': '부', 'べ': '베', 'ぼ': '보',
  'ぱ': '파', 'ぴ': '피', 'ぷ': '푸', 'ぺ': '페', 'ぽ': '포',
  'きゃ': '캬', 'きゅ': '큐', 'きょ': '쿄',
  'しゃ': '샤', 'しゅ': '슈', 'しょ': '쇼',
  'ちゃ': '챠', 'ちゅ': '츄', 'ちょ': '쵸',
  'にゃ': '냐', 'にゅ': '뉴', 'にょ': '뇨',
  'ひゃ': '햐', 'ひゅ': '휴', 'ひょ': '효',
  'みゃ': '먀', 'みゅ': '뮤', 'みょ': '묘',
  'りゃ': '랴', 'りゅ': '류', 'りょ': '료',
  'ぎゃ': '갸', 'ぎゅ': '규', 'ぎょ': '교',
  'じゃ': '쟈', 'じゅ': '쥬', 'じょ': '죠',
  'びゃ': '뱌', 'びゅ': '뷰', 'びょ': '뵤',
  'ぴゃ': '퍄', 'ぴゅ': '퓨', 'ぴょ': '표',
  'っ': 'ㅅ',
};

export function toKoreanPhonetic(japanese: string): string {
  let res = '';
  let i = 0;
  const cleanJp = japanese.replace(/\s/g, '');
  while (i < cleanJp.length) {
    const twoChar = cleanJp.substring(i, i + 2);
    if (jpToKoMap[twoChar]) {
      res += jpToKoMap[twoChar];
      i += 2;
    } else {
      const oneChar = cleanJp[i];
      res += jpToKoMap[oneChar] || oneChar;
      i++;
    }
  }
  return res;
}

const counterDisplayMap: Record<string, string> = {
  '명': '人',
  '마리': '匹',
  '층': '階',
  '개': '個',
  '권': '冊',
  '엔': '円',
};

export function convertNumberToJapanese(n: number, counterName: string): { reading: string, display: string, korean: string } {
  if (counterName === '날짜') {
    return convertDateToJapanese(n);
  }

  let reading = getJapaneseNumberReading(n);
  let displayCounter = counterDisplayMap[counterName] || counterName;
  
  if (counterName === '엔') {
    if (n % 10 === 4 && Math.floor(n / 10) % 10 !== 1) {
       reading = reading.slice(0, -2) + 'よ'; 
    }
    reading += 'えん';
  } else if (counterName === '명') {
    if (n === 1) reading = 'ひとり';
    else if (n === 2) reading = 'ふたり';
    else if (n === 4) reading = 'よにん';
    else reading += 'にん';
  } else if (counterName === '층') {
    if (n === 1) reading = 'いっかい';
    else if (n === 3) reading = 'さんがい';
    else if (n === 6) reading = 'ろっかい';
    else if (n === 8) reading = 'はっかい';
    else if (n === 10) reading = 'じゅっかい';
    else reading += 'かい';
  } else if (counterName === '마리') {
    if (n === 1) reading = 'いっぴき';
    else if (n === 3) reading = 'さんびき';
    else if (n === 6) reading = 'ろっぴき';
    else if (n === 8) reading = 'はっぴき';
    else if (n === 10) reading = 'じゅっぴき';
    else reading += 'ひき';
  } else if (counterName === '개') {
    if (n === 1) reading = 'いっこ';
    else if (n === 6) reading = 'ろっこ';
    else if (n === 8) reading = 'はっこ';
    else if (n === 10) reading = 'じゅっこ';
    else reading += 'こ';
  } else {
    reading += counterName;
  }

  return {
    display: `${n.toLocaleString()}${displayCounter}`,
    reading: reading,
    korean: toKoreanPhonetic(reading)
  };
}

function convertDateToJapanese(timestamp: number): { reading: string, display: string, korean: string } {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const getEra = (y: number) => {
    if (y >= 2019) return { name: '令和', reading: 'れいわ', year: y - 2018 };
    if (y >= 1989) return { name: '平成', reading: 'へいせい', year: y - 1988 };
    if (y >= 1926) return { name: '昭和', reading: 'しょうわ', year: y - 1925 };
    if (y >= 1912) return { name: '大正', reading: 'たいしょう', year: y - 1911 };
    if (y >= 1868) return { name: '明治', reading: 'めいじ', year: y - 1867 };
    return null;
  };

  const monthReadings: Record<number, string> = {
    1: 'いちがつ', 2: 'にがつ', 3: 'さんがつ', 4: 'しがつ', 5: 'ごがつ', 6: 'ろくがつ',
    7: 'し치がつ', 8: 'はちがつ', 9: 'くがつ', 10: 'じゅうがつ', 11: 'じゅういちがつ', 12: 'じゅうにがつ'
  };

  const dayReadings: Record<number, string> = {
    1: 'ついたち', 2: 'ふつか', 3: 'みっか', 4: 'よっか', 5: 'いつか', 6: 'むいか', 7: 'なのか',
    8: 'ようか', 9: 'ここのか', 10: 'とおか', 14: 'じゅうよっか', 20: 'はつか', 24: 'にじゅうよっか'
  };

  const era = getEra(year);
  const isEraMode = Math.random() < 0.2; // 1:4 ratio

  let display = '';
  let reading = '';

  if (isEraMode && era) {
    display = `${era.name}${era.year === 1 ? '元年' : era.year + '年'} ${month}月 ${day}日`;
    reading = `${era.reading}${era.year === 1 ? 'がんねん' : getJapaneseNumberReading(era.year) + 'ねん'} ${monthReadings[month]} ${dayReadings[day] || (getJapaneseNumberReading(day) + 'にち')}`;
  } else {
    display = `${year}年 ${month}月 ${day}日`;
    reading = `${getJapaneseNumberReading(year)}ねん ${monthReadings[month]} ${dayReadings[day] || (getJapaneseNumberReading(day) + 'にち')}`;
  }

  return {
    display,
    reading,
    korean: toKoreanPhonetic(reading)
  };
}

export function generateRandomDate(): number {
  const start = new Date(1900, 0, 1).getTime();
  const end = new Date(2100, 11, 31).getTime();
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
