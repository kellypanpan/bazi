import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const API_KEY = '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';
const MODEL = 'deepseek/deepseek-r1-0528:free';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const sendMessage = async (messages: ChatMessage[]) => {
  try {
    const response = await axios.post(
      `${OPENROUTER_API_URL}/chat/completions`,
      {
        model: MODEL,
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Bazi App',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
}; 