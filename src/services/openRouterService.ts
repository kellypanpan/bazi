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