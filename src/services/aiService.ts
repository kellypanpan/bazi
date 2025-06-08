import axios from 'axios';

export interface BaziData {
  birthDate: string;
  birthTime: string;
  gender: string;
  location: string;
}

export interface AnalysisResult {
  personality: string;
  fortune: string;
  career: string;
  relationships: string;
  health: string;
  wealth: string;
  luckyElements: string;
  summary: string;
}

export interface AIAnalysisResponse {
  bazi: AnalysisResult;
  ziwei: AnalysisResult;
  comparison: string;
}

const OPENROUTER_API_KEY = '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

const api = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://bazi-fortune-telling.kellyzhaoning.workers.dev',
    'X-Title': 'Bazi Fortune Telling',
  },
});

export const analyzeBaziWithAI = async (baziData: BaziData): Promise<AIAnalysisResponse> => {
  const prompt = `请基于以下八字信息进行详细分析：
生日: ${baziData.birthDate}
出生时间: ${baziData.birthTime}
性别: ${baziData.gender}
出生地: ${baziData.location}

请同时提供八字命理和紫微斗数两种分析方法的结果，格式如下：

【八字命理分析】
性格分析：[详细分析内容]
运势分析：[详细分析内容]
事业分析：[详细分析内容]
感情分析：[详细分析内容]
健康分析：[详细分析内容]
财运分析：[详细分析内容]
幸运元素：[详细分析内容]
总结建议：[详细分析内容]

【紫微斗数分析】
性格分析：[详细分析内容]
运势分析：[详细分析内容]
事业分析：[详细分析内容]
感情分析：[详细分析内容]
健康分析：[详细分析内容]
财运分析：[详细分析内容]
幸运元素：[详细分析内容]
总结建议：[详细分析内容]

【两种方法对比】
[对比分析内容]

请用中文回答，内容要专业且详细。`;

  try {
    const response = await api.post('/chat/completions', {
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = response.data.choices[0]?.message?.content;
    console.log('AI Response:', content);

    if (!content) {
      throw new Error('Empty response from AI');
    }

    return parseAIResponse(content);
  } catch (error: unknown) {
    console.error('AI Analysis Error:', error);
    throw new Error(`AI分析失败: ${(error as Error).message}`);
  }
};

const parseAIResponse = (content: string): AIAnalysisResponse => {
  console.log('Parsing AI response:', content);

  // 提取八字命理分析部分
  const baziMatch = content.match(/【八字命理分析】([\s\S]*?)(?=【紫微斗数分析】|$)/);
  const baziContent = baziMatch ? baziMatch[1] : '';

  // 提取紫微斗数分析部分
  const ziweiMatch = content.match(/【紫微斗数分析】([\s\S]*?)(?=【两种方法对比】|$)/);
  const ziweiContent = ziweiMatch ? ziweiMatch[1] : '';

  // 提取对比分析部分
  const comparisonMatch = content.match(/【两种方法对比】([\s\S]*?)$/);
  const comparisonContent = comparisonMatch ? comparisonMatch[1].trim() : '';

  const parseSection = (text: string, sectionName: string): string => {
    const regex = new RegExp(`${sectionName}[：:](.*?)(?=\\n[\\u4e00-\\u9fa5]+[：:]|$)`, 's');
    const match = text.match(regex);
    const result = match ? match[1].trim() : '';
    console.log(`Parsed ${sectionName}:`, result);
    return result;
  };

  const bazi: AnalysisResult = {
    personality: parseSection(baziContent, '性格分析'),
    fortune: parseSection(baziContent, '运势分析'),
    career: parseSection(baziContent, '事业分析'),
    relationships: parseSection(baziContent, '感情分析'),
    health: parseSection(baziContent, '健康分析'),
    wealth: parseSection(baziContent, '财运分析'),
    luckyElements: parseSection(baziContent, '幸运元素'),
    summary: parseSection(baziContent, '总结建议'),
  };

  const ziwei: AnalysisResult = {
    personality: parseSection(ziweiContent, '性格分析'),
    fortune: parseSection(ziweiContent, '运势分析'),
    career: parseSection(ziweiContent, '事业分析'),
    relationships: parseSection(ziweiContent, '感情分析'),
    health: parseSection(ziweiContent, '健康分析'),
    wealth: parseSection(ziweiContent, '财运分析'),
    luckyElements: parseSection(ziweiContent, '幸运元素'),
    summary: parseSection(ziweiContent, '总结建议'),
  };

  console.log('Parsed results:', { bazi, ziwei, comparison: comparisonContent });

  return {
    bazi,
    ziwei,
    comparison: comparisonContent
  };
}; 