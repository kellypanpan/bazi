import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'deepseek/deepseek-r1-0528:free';
const API_KEY = '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';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function sendMessage(messages: ChatMessage[]) {
  const resp = await axios.post(
    `${OPENROUTER_API_URL}/chat/completions`,
    { model: MODEL, messages },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Bazi App'
      }
    }
  );
  return resp.data;
}