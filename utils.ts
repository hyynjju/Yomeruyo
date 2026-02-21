/**
 * 일본어 숫자를 히라가나 읽기로 변환하는 함수 (기본 수사)
 */
export function getJapaneseNumberReading(n: number): string {
  const units_base = [
    '',
    'いち',
    'に',
    'さん',
    'よん',
    'ご',
    'ろく',
    'なな',
    'はち',
    'きゅう',
  ];

  if (n === 0) return 'れい';

  const get100s = (v: number) => {
    if (v === 0) return '';
    if (v === 1) return 'ひゃく';
    if (v === 3) return 'さんびゃく';
    if (v === 6) return 'ろっぴゃく';
    if (v === 8) return 'はっぴゃく';
    return units_base[v] + 'ひゃく';
  };

  const get1000s = (v: number) => {
    if (v === 0) return '';
    if (v === 1) return 'せん';
    if (v === 3) return 'さんぜん';
    if (v === 8) return 'はっせん';
    return units_base[v] + 'せん';
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
    res += (j === 1 ? '' : units_base[j]) + 'じゅう';
    val %= 10;
  }

  if (val > 0) {
    res += units_base[val];
  }

  return res;
}

/**
 * 히라가나 -> 한글 매핑 테이블
 */
const jpToKoMap: Record<string, string> = {
  あ: '아',
  い: '이',
  う: '우',
  え: '에',
  お: '오',
  か: '카',
  き: '키',
  く: '쿠',
  け: '케',
  こ: '코',
  さ: '사',
  し: '시',
  す: '스',
  せ: '세',
  そ: '소',
  た: '타',
  ち: '치',
  つ: '츠',
  て: '테',
  と: '토',
  な: '나',
  に: '니',
  ぬ: '누',
  ね: '네',
  の: '노',
  は: '하',
  ひ: '히',
  ふ: '후',
  へ: '헤',
  ほ: '호',
  ま: '마',
  み: '미',
  む: '무',
  め: '메',
  も: '모',
  や: '야',
  ゆ: '유',
  よ: '요',
  ら: '라',
  り: '리',
  る: '루',
  れ: '레',
  ろ: '로',
  わ: '와',
  を: '오',
  ん: 'ㄴ',
  が: '가',
  ぎ: '기',
  ぐ: '구',
  げ: '게',
  ご: '고',
  ざ: '자',
  じ: '지',
  ず: '즈',
  ぜ: '제',
  ぞ: '조',
  だ: '다',
  ぢ: '지',
  づ: '즈',
  で: '데',
  ど: '도',
  ば: '바',
  び: '비',
  ぶ: '부',
  べ: '베',
  ぼ: '보',
  ぱ: '파',
  ぴ: '피',
  ぷ: '푸',
  ぺ: '페',
  ぽ: '포',
  きゃ: '캬',
  きゅ: '큐',
  きょ: '쿄',
  しゃ: '샤',
  しゅ: '슈',
  しょ: '쇼',
  ちゃ: '챠',
  ちゅ: '츄',
  ちょ: '쵸',
  にゃ: '냐',
  にゅ: '뉴',
  にょ: '뇨',
  ひゃ: '햐',
  ひゅ: '휴',
  ひょ: '효',
  みゃ: '먀',
  みゅ: '뮤',
  みょ: '묘',
  りゃ: '랴',
  りゅ: '류',
  りょ: '료',
  ぎゃ: '갸',
  ぎゅ: '규',
  ぎょ: '교',
  じゃ: '쟈',
  じゅ: '쥬',
  じょ: '죠',
  びゃ: '뱌',
  びゅ: '뷰',
  びょ: '뵤',
  ぴゃ: '퍄',
  ぴゅ: '퓨',
  ぴょ: '표',
  っ: 'ㅅ',
};

function combineHangul(prevChar: string, batchim: string): string {
  const GA = 44032;
  const uniCode = prevChar.charCodeAt(0) - GA;
  if (uniCode < 0 || uniCode > 11171 || uniCode % 28 !== 0)
    return prevChar + batchim;
  const weight = batchim === 'ㄴ' ? 4 : 19;
  return String.fromCharCode(prevChar.charCodeAt(0) + weight);
}

export function toKoreanPhonetic(japanese: string): string {
  let res: string[] = [];
  let i = 0;
  while (i < japanese.length) {
    const char = japanese[i];
    if (/\s/.test(char)) {
      res.push(char);
      i++;
      continue;
    }
    const nextChar = japanese[i + 1];
    const twoChar = char + (nextChar || '');
    if (nextChar && jpToKoMap[twoChar]) {
      res.push(jpToKoMap[twoChar]);
      i += 2;
    } else if (jpToKoMap[char]) {
      const hangeul = jpToKoMap[char];
      if ((hangeul === 'ㄴ' || hangeul === 'ㅅ') && res.length > 0) {
        const lastChar = res[res.length - 1];
        if (/[가-힣]/.test(lastChar))
          res[res.length - 1] = combineHangul(lastChar, hangeul);
        else res.push(hangeul);
      } else res.push(hangeul);
      i++;
    } else {
      res.push(char);
      i++;
    }
  }
  return res.join('');
}

const counterDisplayMap: Record<string, string> = {
  명: '人',
  마리: '匹',
  층: '階',
  개: '個',
  권: '冊',
  엔: '円',
};

/**
 * 숫자를 단위와 함께 일본어 및 한글 독음으로 변환
 */
export function convertNumberToJapanese(
  n: number,
  counterName: string
): { reading: string; display: string; korean: string } {
  if (counterName === '날짜') return convertDateToJapanese(n);

  let reading = '';
  const displayCounter = counterDisplayMap[counterName] || counterName;

  const lastDigit = n % 10;
  const isMultipleOfTen = n > 0 && lastDigit === 0;

  // 정교한 음편 처리를 위한 Prefix 추출 함수
  const getPrefix = (num: number, isTenth: boolean) => {
    if (num < 10) return '';
    // 마지막 10단위 앞까지의 읽기를 생성 (예: 183 -> 180)
    const base = getJapaneseNumberReading(Math.floor(num / 10) * 10);
    // 10의 배수 음편(っ)을 위해 'じゅう'의 마지막 'う'를 제거
    return isTenth ? base.slice(0, -1) : base;
  };

  if (counterName === '엔') {
    reading = getJapaneseNumberReading(n) + 'えん';
  } else if (counterName === '명') {
    if (n === 1) reading = 'ひとり';
    else if (n === 2) reading = 'ふたり';
    else if (n === 4) reading = 'よにん';
    else reading = getJapaneseNumberReading(n) + 'にん';
  } else if (counterName === '층') {
    const prefix = getPrefix(n, isMultipleOfTen);
    if (n === 1) reading = 'いっかい';
    else if (lastDigit === 1) reading = prefix + 'いっかい';
    else if (lastDigit === 3) reading = getJapaneseNumberReading(n) + 'がい';
    else if (lastDigit === 6) reading = prefix + 'ろっかい';
    else if (lastDigit === 8) reading = prefix + 'はっかい';
    else if (isMultipleOfTen) reading = prefix + 'っかい';
    else reading = getJapaneseNumberReading(n) + 'かい';
  } else if (counterName === '마리') {
    const prefix = getPrefix(n, isMultipleOfTen);
    if (n === 1) reading = 'いっぴき';
    else if (lastDigit === 1) reading = prefix + 'いっぴき';
    else if (lastDigit === 3) reading = getJapaneseNumberReading(n) + 'びき';
    else if (lastDigit === 6) reading = prefix + 'ろっぴき';
    else if (lastDigit === 8) reading = prefix + 'はっぴき';
    else if (isMultipleOfTen) reading = prefix + 'っぴき';
    else reading = getJapaneseNumberReading(n) + 'ひき';
  } else if (counterName === '개') {
    const prefix = getPrefix(n, isMultipleOfTen);
    if (n === 1) reading = 'いっこ';
    else if (lastDigit === 1) reading = prefix + 'いっこ';
    else if (lastDigit === 6) reading = prefix + 'ろっこ';
    else if (lastDigit === 8) reading = prefix + 'はっこ';
    else if (isMultipleOfTen) reading = prefix + 'っこ';
    else reading = getJapaneseNumberReading(n) + 'こ';
  } else {
    reading = getJapaneseNumberReading(n) + counterName;
  }

  return {
    display: `${n.toLocaleString()}${displayCounter}`,
    reading,
    korean: toKoreanPhonetic(reading),
  };
}

function convertDateToJapanese(timestamp: number): {
  reading: string;
  display: string;
  korean: string;
} {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const getEra = (y: number) => {
    if (y >= 2019) return { name: '令和', reading: 'れいわ', year: y - 2018 };
    if (y >= 1989) return { name: '平成', reading: 'へいせい', year: y - 1988 };
    if (y >= 1926) return { name: '昭和', reading: 'しょうわ', year: y - 1925 };
    if (y >= 1912)
      return { name: '大正', reading: 'たいしょう', year: y - 1911 };
    if (y >= 1868) return { name: '明治', reading: 'めいじ', year: y - 1867 };
    return null;
  };

  const monthReadings: Record<number, string> = {
    1: 'いちがつ',
    2: 'にがつ',
    3: 'さんがつ',
    4: 'しがつ',
    5: 'ごがつ',
    6: 'ろくがつ',
    7: 'しちがつ',
    8: 'はちがつ',
    9: 'くがつ',
    10: 'じゅうがつ',
    11: 'じゅういちがつ',
    12: 'じゅうにがつ',
  };

  const dayReadings: Record<number, string> = {
    1: 'ついたち',
    2: 'ふつか',
    3: 'みっか',
    4: 'よっか',
    5: 'いつか',
    6: 'むいか',
    7: 'なのか',
    8: 'ようか',
    9: 'ここのか',
    10: 'とおか',
    14: 'じゅうよっか',
    20: 'はつか',
    24: 'にじゅうよっか',
  };

  const era = getEra(year);
  const isEraMode = Math.random() < 0.2;
  let display = '';
  let reading = '';

  if (isEraMode && era) {
    display = `${era.name}${
      era.year === 1 ? '元年' : era.year + '年'
    } ${month}月 ${day}日`;
    reading = `${era.reading}${
      era.year === 1 ? 'がんねん' : getJapaneseNumberReading(era.year) + 'ねん'
    } ${monthReadings[month]} ${
      dayReadings[day] || getJapaneseNumberReading(day) + 'にち'
    }`;
  } else {
    display = `${year}년 ${month}월 ${day}일`;
    reading = `${getJapaneseNumberReading(year)}ねん ${monthReadings[month]} ${
      dayReadings[day] || getJapaneseNumberReading(day) + 'にち'
    }`;
  }

  return { display, reading, korean: toKoreanPhonetic(reading) };
}

export function generateRandomDate(): number {
  const start = new Date(1900, 0, 1).getTime();
  const end = new Date(2100, 11, 31).getTime();
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
