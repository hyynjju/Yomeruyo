import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

console.log('Loaded KEY:', process.env.OPENAI_API_KEY ? 'OK' : 'NOT FOUND');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_DIR = path.join(process.cwd(), '../public/audio/keigo');
const DATA_DIR = path.join(process.cwd(), '../data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateFromFile(filename) {
  const filePath = path.join(DATA_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`오류: 파일을 찾을 수 없습니다 -> ${filePath}`);
    return;
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const scripts = JSON.parse(rawData);

  for (const item of scripts) {
    console.log(`Generating: ${item.id} (${item.jp.substring(0, 10)}...)`);

    try {
      const response = await openai.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: 'marin',
        input: item.jp,
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      const outputPath = path.join(OUTPUT_DIR, `${item.id}.mp3`);
      fs.writeFileSync(outputPath, buffer);

      console.log(`Saved: ${outputPath}`);
    } catch (error) {
      console.error(`${item.id} 생성 중 오류 발생:`, error.message);
    }
  }
}

const targetFile = process.argv[2];

if (!targetFile) {
  console.error('사용법: node generate.js interview.json');
  console.error('설명: ../data/ 폴더 내의 해당 파일을 읽어 TTS를 생성합니다.');
  process.exit(1);
}

generateFromFile(targetFile);
