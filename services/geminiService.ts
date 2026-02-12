
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

/**
 * Helper to handle retries with exponential backoff for 429 (Resource Exhausted) errors.
 * Refined to match the specific error structure: {"error":{"code":429,"status":"RESOURCE_EXHAUSTED", ...}}
 */
async function fetchWithRetry(fn: () => Promise<any>, maxRetries = 5) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      
      // Parse error details from common SDK error structures
      const errorBody = err?.error || err;
      const status = errorBody?.status;
      const code = errorBody?.code;
      const message = err?.message || "";

      // Check for quota exhaustion (429)
      const isQuotaError = 
        status === 'RESOURCE_EXHAUSTED' || 
        code === 429 ||
        message.includes('429') ||
        message.includes('RESOURCE_EXHAUSTED');

      if (isQuotaError) {
        // Longer initial wait for 429s as they usually require a cooling period
        const delay = Math.pow(2, i) * 2000 + Math.random() * 1000;
        console.warn(`[TTS] Quota exceeded (429). Retrying in ${Math.round(delay)}ms (Attempt ${i + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // For 400 or other non-quota errors, stop retrying immediately
      throw err;
    }
  }
  throw lastError;
}

export async function speakJapanese(text: string, audioContext: AudioContext) {
  const cleanText = text.trim();
  if (!API_KEY || !cleanText) return;
  
  // Ensure AudioContext is active
  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
    } catch (e) {
      console.warn("[TTS] Failed to resume AudioContext", e);
    }
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const callTts = async () => {
    return await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
  };

  try {
    const response = await fetchWithRetry(callTts);
    
    const part = response.candidates?.[0]?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data;

    if (base64Audio) {
      const audioBuffer = await decodeAudioData(
        decodeBase64(base64Audio),
        audioContext,
        24000,
        1,
      );
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      return new Promise((resolve) => {
        source.onended = resolve;
      });
    } else {
      console.warn("[TTS] Model returned successfully but no audio data was found.");
    }
  } catch (error: any) {
    // Check if the error is ultimately a quota failure after all retries
    const isQuota = error?.error?.code === 429 || error?.message?.includes('429');
    if (isQuota) {
      console.error("[TTS] Quota completely exhausted. Please wait a few minutes before trying again.");
    } else {
      console.error("[TTS] Error generating/playing speech:", error);
    }
  }
}
