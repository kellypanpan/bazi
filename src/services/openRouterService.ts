import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'qwen/qwen3-8b:free';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

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