import axios from 'axios';

// OpenRouter API配置
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_NAME = 'deepseek/deepseek-r1-0528-qwen3-8b:free';

// API Key 需要用户自己配置
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

export interface BaziData {
  birthDate: string;
  birthTime: string;
  yearElement: string;
  monthElement: string;
  dayElement: string;
  hourElement: string;
  zodiac: string;
  heavenlyStem: string;
  earthlyBranch: string;
  elementalBalance: Record<string, number>;
}

export interface AIAnalysisResult {
  personalityAnalysis: string;
  fortuneAnalysis: string;
  careerAdvice: string;
  relationshipAdvice: string;
  healthAdvice: string;
  wealthAdvice: string;
  luckyElements: string;
  summary: string;
}

class AIService {
  private apiKey: string;

  constructor() {
    this.apiKey = API_KEY;
  }

  // 设置API Key
  setApiKey(key: string) {
    this.apiKey = key;
  }

  // 检查API Key是否已设置
  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  // 生成八字分析提示词
  private generateBaziPrompt(baziData: BaziData): string {
    return `
作为一位专业的中华传统八字命理师，请根据以下出生信息进行详细的八字分析：

出生信息：
- 出生日期：${baziData.birthDate}
- 出生时间：${baziData.birthTime}
- 生肖：${baziData.zodiac}
- 天干：${baziData.heavenlyStem}
- 地支：${baziData.earthlyBranch}

五行信息：
- 年柱五行：${baziData.yearElement}
- 月柱五行：${baziData.monthElement}
- 日柱五行：${baziData.dayElement}
- 时柱五行：${baziData.hourElement}

五行平衡：
${Object.entries(baziData.elementalBalance).map(([element, count]) => `- ${element}: ${count}`).join('\n')}

请从以下几个方面进行深入分析，并提供具体的建议：

1. 性格特征分析：根据八字组合分析性格特点、优势和需要注意的地方
2. 运势分析：分析整体运势趋势，包括不同人生阶段的特点
3. 事业发展：根据五行特点推荐适合的职业方向和发展策略
4. 感情关系：分析在感情方面的特点和建议
5. 健康养生：根据五行平衡情况提供健康建议
6. 财运建议：分析财运特点和理财建议
7. 开运元素：推荐有利的颜色、方位、数字等开运元素
8. 综合总结：对整个命盘的综合评价和人生建议

请用中文回答，语言要专业但易懂，提供实用的建议。每个部分都要有具体的内容，不要泛泛而谈。
    `;
  }

  // 调用AI模型进行分析
  async analyzeBazi(baziData: BaziData): Promise<AIAnalysisResult> {
    if (!this.apiKey) {
      throw new Error('API Key未设置，请先设置OpenRouter API Key');
    }

    try {
      const prompt = this.generateBaziPrompt(baziData);
      
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: MODEL_NAME,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
          top_p: 0.9,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Bazi Fortune Telling AI Analysis'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      
      // 解析AI响应，提取各部分内容
      return this.parseAIResponse(aiResponse);
      
    } catch (error) {
      console.error('AI分析错误:', error);
      throw new Error('AI分析失败，请稍后重试');
    }
  }

  // 解析AI响应内容
  private parseAIResponse(response: string): AIAnalysisResult {
    // 这里简化处理，实际可以根据响应格式进行更精确的解析
    const sections = response.split(/\d+\.\s*/);
    
    return {
      personalityAnalysis: this.extractSection(response, '性格特征分析', '运势分析') || '性格分析内容',
      fortuneAnalysis: this.extractSection(response, '运势分析', '事业发展') || '运势分析内容',
      careerAdvice: this.extractSection(response, '事业发展', '感情关系') || '事业建议内容',
      relationshipAdvice: this.extractSection(response, '感情关系', '健康养生') || '感情建议内容',
      healthAdvice: this.extractSection(response, '健康养生', '财运建议') || '健康建议内容',
      wealthAdvice: this.extractSection(response, '财运建议', '开运元素') || '财运建议内容',
      luckyElements: this.extractSection(response, '开运元素', '综合总结') || '开运元素内容',
      summary: this.extractSection(response, '综合总结', null) || '综合总结内容'
    };
  }

  // 提取特定部分的内容
  private extractSection(text: string, startKeyword: string, endKeyword: string | null): string {
    const startIndex = text.indexOf(startKeyword);
    if (startIndex === -1) return '';
    
    const contentStart = startIndex + startKeyword.length;
    let contentEnd = text.length;
    
    if (endKeyword) {
      const endIndex = text.indexOf(endKeyword, contentStart);
      if (endIndex !== -1) {
        contentEnd = endIndex;
      }
    }
    
    return text.substring(contentStart, contentEnd).trim();
  }

  // 快速分析（简化版）
  async quickAnalysis(baziData: BaziData): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API Key未设置，请先设置OpenRouter API Key');
    }

    try {
      const prompt = `
作为八字命理师，请简要分析以下信息：
生肖：${baziData.zodiac}
主要五行：${baziData.yearElement}
五行平衡：${Object.entries(baziData.elementalBalance).map(([element, count]) => `${element}:${count}`).join(', ')}

请用100字以内简要概括此人的性格特点和运势特征。
      `;
      
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: MODEL_NAME,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Bazi Quick Analysis'
          }
        }
      );

      return response.data.choices[0].message.content;
      
    } catch (error) {
      console.error('快速分析错误:', error);
      throw new Error('快速分析失败，请稍后重试');
    }
  }
}

export const aiService = new AIService();
export default aiService; 