import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

import { interviewScript } from '../public/data/interview';
import { cafeScript } from '../public/data/cafe';
import { baitoScript } from '../public/data/baito';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_OUTPUT_DIR = path.join(process.cwd(), '../public/audio');

async function generate(category: string, scripts: any[]) {
  const targetOutputDir = path.join(BASE_OUTPUT_DIR, category);

  if (!fs.existsSync(targetOutputDir)) {
    fs.mkdirSync(targetOutputDir, { recursive: true });
  }

  for (const item of scripts) {
    console.log(`[${category}] Generating: ${item.id}`);

    const response = await openai.audio.speech.create({
      model: 'gpt-4o-mini-tts',
      voice: 'shimmer',
      input: item.jp,
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const outputPath = path.join(targetOutputDir, `${item.id}.mp3`);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Saved: ${outputPath}`);
  }
}

const target = process.argv[2];

switch (target) {
  case 'interview':
    generate('interview', interviewScript);
    break;
  case 'cafe':
    generate('cafe', cafeScript);
    break;
  case 'baito':
    generate('baito', baitoScript);
    break;
  default:
    console.log('cafe | interview | baito 중 하나 입력');
}
