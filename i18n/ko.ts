export const ko = {
  common: {
    back: '이전',
    start: '학습 시작하기',
    language: '언어',
  },

  home: {
    number: '숫자 읽기',
    keigo: '경어 듣기',
    name: '인명 읽기',
    place: '지명 읽기',

    canReadInOneSecond: '1초만에',
    canRead: '읽을 수 있나요?',
    canAnswer: '대답할 수 있나요?',

    goToNumber: '숫자 읽기 학습하러 가기',
    goToName: '인명 읽기 학습하러 가기',
    goToPlace: '지명 읽기 학습하러 가기',
    goToKeigo: '경어 학습 하러 가기',

    study: '학습하기',

    language: '언어',

    nameExample: {
      name: 'お名前',
      count: '人数',
    },

    placeExample: {
      unknown: '???',
    },

    keigoExample: {
      question: '学生時代に一番力を入れたことはなんですか？',
    },
  },

  footer: {
    description: '실전 일본어 학습 서비스',
    feedback: '문의하기/피드백',
  },

  keigoConfig: {
    title: '상황 선택',
    header: '경어 듣기 학습 설정',
    interview: '면접',
    cafe: '카페',
    baito: '아르바이트',
  },

  nameConfig: {
    title: '상황 선택',
    header: '인명 읽기 학습 설정',
    celebrity: '유명인 이름',
    ranking: '많이 쓰는 이름',
    koreanReading: '한국어로 읽는법 표시하기',
    koreanReadingExample: '예) 山田太郎 → 야마다 타로',
  },

  numberConfig: {
    header: '숫자 읽기 학습 설정',

    recommended: '추천 옵션',
    recommendedDescription:
      '일본 생활에서 자주 접하는 숫자를 골라 바로 연습해보세요.',

    cafe: '카페·식당',
    shopping: '쇼핑',
    transport: '교통',
    large: '큰 숫자',

    custom: '커스텀 학습',
    customDescription: '연습할 숫자의 범위와 단위를 직접 설정해보세요.',

    counter: '세는 단위',
    counters: {
      yen: '엔',
      people: '명',
      animals: '마리',
      floors: '층',
      things: '개',
      books: '권',
      longObjects: '본',
      date: '날짜',
    },

    range: '숫자 범위',
    unit: '단위',
    dateCounter: '날짜 (연호 포함)',
    unitSuffix: '단위',

    koreanReading: '한국어로 읽는법 표시하기',
    koreanReadingExample: '예) 3,800円 → 산젠핫퍄쿠엔',
  },

  placeConfig: {
    title: '지역 선택',
    header: '지명 읽기 학습 설정',

    tokyoStation: '도쿄 역명',
    tokyoLine: '도쿄 선로명',
    osakaStation: '오사카 역명',
    osakaLine: '오사카 선로명',
    prefecture: '도도부현',

    koreanReading: '한국어로 읽는법 표시하기',
    koreanReadingExample: '예) 御徒町 → 오카치마치',
  },

  studySession: {
    close: '닫기',
    guessReading: '읽는 방법을 맞춰보세요',
    reveal: '정답 확인',
    next: '다음',
  },

  keigoPlayer: {
    previous: '이전 문장',
    next: '다음 문장',
    play: '재생',
    pause: '일시정지',
    replay: '처음부터 다시 재생',
    playbackSpeed: '재생 속도',
  },

  feedback: {
    title: '문의하기 / 피드백',
    heading: '의견을 보내주세요',
    description: '기능 제안이나 불편했던 점 등 자유롭게 알려주세요.',

    name: '성함',
    namePlaceholder: '성함을 입력해주세요',

    email: '이메일 주소',
    emailPlaceholder: '답변받으실 이메일을 입력해주세요',

    message: '문의 내용',
    messagePlaceholder: '기능 제안, 버그 제보 등 자유롭게 작성해주세요',

    submit: '의견 보내기',
    sending: '전송 중...',

    successTitle: '소중한 의견 감사합니다!',
    successDescription: '보내주신 내용은 서비스 개선에 적극 반영하겠습니다.',
    goHome: '홈으로 돌아가기',

    sendFailed: '전송에 실패했습니다. 다시 시도해주세요.',
  },
} as const;
