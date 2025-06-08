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

// 单种分析方法的结果
export interface AnalysisMethod {
  personalityAnalysis: string;
  fortuneAnalysis: string;
  careerAdvice: string;
  relationshipAdvice: string;
  healthAdvice: string;
  wealthAdvice: string;
  luckyElements: string;
  summary: string;
}

// 完整的AI分析结果，包含两种方法
export interface AIAnalysisResult {
  bazi: AnalysisMethod;
  ziwei: AnalysisMethod;
  comparison: string;
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

  // 生成综合分析提示词
  private generateComprehensivePrompt(baziData: BaziData): string {
    return `
作为一位精通中华传统命理学的专业大师，请根据以下出生信息进行详细的命理分析。请分别使用八字命理和紫微斗数两种方法进行分析，并提供对比总结。

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

请按照以下格式进行分析：

## 八字命理分析

### 性格特征分析
[基于八字的性格分析内容]

### 运势分析
[基于八字的运势分析内容]

### 事业发展
[基于八字的事业建议内容]

### 感情关系
[基于八字的感情建议内容]

### 健康养生
[基于八字的健康建议内容]

### 财运建议
[基于八字的财运建议内容]

### 开运元素
[基于八字的开运元素内容]

### 八字总结
[基于八字的综合总结内容]

## 紫微斗数分析

### 性格特征分析
[基于紫微斗数的性格分析内容]

### 运势分析
[基于紫微斗数的运势分析内容]

### 事业发展
[基于紫微斗数的事业建议内容]

### 感情关系
[基于紫微斗数的感情建议内容]

### 健康养生
[基于紫微斗数的健康建议内容]

### 财运建议
[基于紫微斗数的财运建议内容]

### 开运元素
[基于紫微斗数的开运元素内容]

### 紫微总结
[基于紫微斗数的综合总结内容]

## 两种方法对比总结
[对比八字和紫微斗数两种分析方法的异同，提供综合建议]

请用中文回答，语言要专业但易懂，提供实用的建议。每个部分都要有具体的内容，不要泛泛而谈。两种分析方法要体现出各自的特色和侧重点。
    `;
  }

  // 调用AI模型进行分析
  async analyzeBazi(baziData: BaziData): Promise<AIAnalysisResult> {
    if (!this.apiKey) {
      throw new Error('API Key未设置，请先设置OpenRouter API Key');
    }

    try {
      const prompt = this.generateComprehensivePrompt(baziData);
      
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
          max_tokens: 6000,
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
      return this.parseComprehensiveResponse(aiResponse);
      
    } catch (error) {
      console.error('AI分析错误:', error);
      throw new Error('AI分析失败，请稍后重试');
    }
  }

  // 解析综合AI响应内容
  private parseComprehensiveResponse(response: string): AIAnalysisResult {
    console.log('AI原始响应:', response); // 调试用
    
    // 八字分析部分
    const baziAnalysis = this.extractAnalysisMethod(response, '八字命理分析', '紫微斗数分析');
    
    // 紫微斗数分析部分
    const ziweiAnalysis = this.extractAnalysisMethod(response, '紫微斗数分析', '两种方法对比总结');
    
    // 对比总结
    const comparison = this.extractSection(response, '两种方法对比总结', null) || response;

    return {
      bazi: baziAnalysis,
      ziwei: ziweiAnalysis,
      comparison
    };
  }

  // 提取单种分析方法的内容
  private extractAnalysisMethod(text: string, startKeyword: string, endKeyword: string): AnalysisMethod {
    const sectionText = this.extractSection(text, startKeyword, endKeyword);
    
    return {
      personalityAnalysis: this.extractSubSection(sectionText, '性格特征分析'),
      fortuneAnalysis: this.extractSubSection(sectionText, '运势分析'),
      careerAdvice: this.extractSubSection(sectionText, '事业发展'),
      relationshipAdvice: this.extractSubSection(sectionText, '感情关系'),
      healthAdvice: this.extractSubSection(sectionText, '健康养生'),
      wealthAdvice: this.extractSubSection(sectionText, '财运建议'),
      luckyElements: this.extractSubSection(sectionText, '开运元素'),
      summary: this.extractSubSection(sectionText, '总结')
    };
  }

  // 提取子部分内容
  private extractSubSection(text: string, keyword: string): string {
    if (!text) return '';
    
    const lines = text.split('\n');
    let startIndex = -1;
    let endIndex = lines.length;
    
    // 找到包含关键词的行
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(keyword)) {
        startIndex = i;
        break;
      }
    }
    
    if (startIndex === -1) {
      // 如果没找到标题，尝试直接搜索内容
      const keywordIndex = text.indexOf(keyword);
      if (keywordIndex !== -1) {
        const afterKeyword = text.substring(keywordIndex + keyword.length);
        const nextSectionIndex = afterKeyword.search(/###|##|\n\n.*[:：]/);
        if (nextSectionIndex !== -1) {
          return afterKeyword.substring(0, nextSectionIndex).trim().replace(/^\[/, '').replace(/\]$/, '');
        } else {
          return afterKeyword.trim().replace(/^\[/, '').replace(/\]$/, '');
        }
      }
      return '';
    }
    
    // 找到下一个###标题行作为结束
    for (let i = startIndex + 1; i < lines.length; i++) {
      if (lines[i].startsWith('###') || lines[i].startsWith('##')) {
        endIndex = i;
        break;
      }
    }
    
    const content = lines.slice(startIndex + 1, endIndex)
      .join('\n')
      .trim()
      .replace(/^\[/, '')
      .replace(/\]$/, '');
    
    return content || '';
  }

  // 提取特定部分的内容
  private extractSection(text: string, startKeyword: string, endKeyword: string | null): string {
    if (!text) return '';
    
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
作为命理师，请简要分析以下信息：
生肖：${baziData.zodiac}
主要五行：${baziData.yearElement}
五行平衡：${Object.entries(baziData.elementalBalance).map(([element, count]) => `${element}:${count}`).join(', ')}

请用150字以内简要概括此人从八字和紫微斗数角度的主要特征。
      `;
      
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: MODEL_NAME,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
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