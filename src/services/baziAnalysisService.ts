import { BirthData } from '../components/BirthDateForm';
import { sendMessage } from './openRouterService';

export interface BaziAnalysis {
  basicInfo: {
    chineseZodiac: string;
    heavenlyStem: string;
    earthlyBranch: string;
    elements: {
      year: string;
      month: string;
      day: string;
      hour: string;
    };
  };
  personalityAnalysis: {
    strengths: string[];
    challenges: string[];
    careerSuggestions: string[];
    relationshipInsights: string[];
  };
  lifePath: {
    currentPhase: string;
    opportunities: string[];
    challenges: string[];
    recommendations: string[];
  };
  detailedGuidance: {
    career: string;
    relationships: string;
    health: string;
    wealth: string;
  };
}

export const analyzeBazi = async (birthData: BirthData): Promise<BaziAnalysis> => {
  const prompt = `作为一个专业的八字命理分析师，请根据以下信息进行全面的八字分析：

姓名：${birthData.name}
性别：${birthData.gender}
出生日期：${birthData.birthDate}
出生时间：${birthData.birthTime}
出生地点：${birthData.location}

请提供以下方面的详细分析：
1. 基本八字信息（生肖、天干地支、五行）
2. 性格特征分析（优势、挑战）
3. 事业发展建议
4. 人际关系分析
5. 人生阶段分析
6. 健康、财富等方面的具体指导

请以JSON格式返回分析结果，包含以下字段：
{
  "basicInfo": {
    "chineseZodiac": "生肖",
    "heavenlyStem": "天干",
    "earthlyBranch": "地支",
    "elements": {
      "year": "年柱五行",
      "month": "月柱五行",
      "day": "日柱五行",
      "hour": "时柱五行"
    }
  },
  "personalityAnalysis": {
    "strengths": ["优势1", "优势2", ...],
    "challenges": ["挑战1", "挑战2", ...],
    "careerSuggestions": ["建议1", "建议2", ...],
    "relationshipInsights": ["洞察1", "洞察2", ...]
  },
  "lifePath": {
    "currentPhase": "当前人生阶段描述",
    "opportunities": ["机遇1", "机遇2", ...],
    "challenges": ["挑战1", "挑战2", ...],
    "recommendations": ["建议1", "建议2", ...]
  },
  "detailedGuidance": {
    "career": "职业发展详细建议",
    "relationships": "人际关系详细建议",
    "health": "健康建议",
    "wealth": "财富建议"
  }
}`;

  try {
    const response = await sendMessage([
      {
        role: 'system',
        content: '你是一个专业的八字命理分析师，精通中国传统文化和命理学。请根据用户的出生信息提供详细、准确的八字分析。'
      },
      {
        role: 'user',
        content: prompt
      }
    ]);

    // 解析AI返回的JSON响应
    const analysis = JSON.parse(response.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('Error in Bazi analysis:', error);
    throw error;
  }
}; 