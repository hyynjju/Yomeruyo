export const ja = {
  common: {
    back: '戻る',
    start: '学習を始める',
    language: '言語',
  },

  home: {
    number: '数字の読み方',
    keigo: '敬語を聞く',
    name: '人名の読み方',
    place: '地名の読み方',

    canReadInOneSecond: '1秒で',
    canRead: '読めますか？',
    canAnswer: '答えられますか？',

    goToNumber: '数字の読み方を練習する',
    goToName: '人名の読み方を練習する',
    goToPlace: '地名の読み方を練習する',
    goToKeigo: '敬語を練習する',

    study: '学習する',

    language: '言語',

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
    description: '実践的な日本語学習サービス',
    feedback: 'お問い合わせ / フィードバック',
  },

  keigoConfig: {
    title: '場面を選択',
    header: '敬語リスニングの設定',
    interview: '面接',
    cafe: 'カフェ',
    baito: 'アルバイト',
  },

  nameConfig: {
    title: '種類を選択',
    header: '人名の読み方の設定',
    celebrity: '有名人の名前',
    ranking: 'よく使われる名前',
    koreanReading: '韓国語の読み方を表示',
    koreanReadingExample: '例）山田太郎 → 야마다 타로',
  },

  numberConfig: {
    header: '数字の読み方の設定',

    recommended: 'おすすめの練習',
    recommendedDescription:
      '日本での生活でよく使う数字を選んですぐに練習できます。',

    cafe: 'カフェ・飲食店',
    shopping: '買い物',
    transport: '交通',
    large: '大きな数字',

    custom: 'カスタム設定',
    customDescription: '練習する数字の範囲や単位を自由に設定できます。',

    counter: '数え方',
    counters: {
      yen: '円',
      people: '人',
      animals: '匹',
      floors: '階',
      things: '個',
      books: '冊',
      longObjects: '本',
      date: '日付',
    },

    range: '数字の範囲',
    unit: '単位',
    dateCounter: '日付（元号を含む）',
    unitSuffix: '単位',

    koreanReading: '韓国語の読み方を表示',
    koreanReadingExample: '例）3,800円 → 산젠핫퍄쿠엔',
  },

  placeConfig: {
    title: '地域を選択',
    header: '地名の読み方の設定',

    tokyoStation: '東京の駅名',
    tokyoLine: '東京の路線名',
    osakaStation: '大阪の駅名',
    osakaLine: '大阪の路線名',
    prefecture: '都道府県',

    koreanReading: '韓国語の読み方を表示',
    koreanReadingExample: '例）御徒町 → 오카치마치',
  },

  studySession: {
    close: '閉じる',
    guessReading: '読み方を当ててみましょう',
    reveal: '答えを見る',
    next: '次へ',
  },

  keigoPlayer: {
    previous: '前の文',
    next: '次の文',
    play: '再生',
    pause: '一時停止',
    replay: '最初から再生',
    playbackSpeed: '再生速度',
  },

  feedback: {
    title: 'お問い合わせ / フィードバック',
    heading: 'ご意見をお聞かせください',
    description:
      '機能のご提案や使いにくかった点など、お気軽にお知らせください。',

    name: 'お名前',
    namePlaceholder: 'お名前を入力してください',

    email: 'メールアドレス',
    emailPlaceholder: '返信を受け取るメールアドレスを入力してください',

    message: 'お問い合わせ内容',
    messagePlaceholder:
      '機能のご提案や不具合のご報告など、ご自由にお書きください',

    submit: '送信する',
    sending: '送信中...',

    successTitle: '貴重なご意見をありがとうございます！',
    successDescription:
      'いただいたご意見は、サービスの改善に活用させていただきます。',
    goHome: 'ホームに戻る',

    sendFailed: '送信に失敗しました。もう一度お試しください。',
  },
} as const;
