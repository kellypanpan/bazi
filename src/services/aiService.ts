import axios from 'axios';

export interface BaziData {
  birthDate: string;
  birthTime: string;
  gender: string;
  location: string;
  name: string;
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
  const prompt = `You are an expert in Chinese astrology and fortune telling. Please provide a detailed analysis based on the following birth information:

Name: ${baziData.name}
Birth Date: ${baziData.birthDate}
Birth Time: ${baziData.birthTime}
Gender: ${baziData.gender}
Birth Location: ${baziData.location}

Please provide detailed analysis using both BaZi (Four Pillars) and Zi Wei Dou Shu (Purple Star Astrology) methods.

Format your response EXACTLY as follows:

=== BAZI ANALYSIS ===
PERSONALITY: [Detailed personality analysis based on BaZi Four Pillars]
FORTUNE: [Overall life fortune and luck patterns]
CAREER: [Career prospects and suitable professions]
RELATIONSHIPS: [Love, marriage, and relationship insights]
HEALTH: [Health tendencies and recommendations]
WEALTH: [Financial fortune and money management]
LUCKY_ELEMENTS: [Lucky colors, numbers, directions, elements]
SUMMARY: [Overall BaZi analysis summary and advice]

=== ZIWEI ANALYSIS ===
PERSONALITY: [Detailed personality analysis based on Zi Wei Dou Shu]
FORTUNE: [Overall life fortune from Purple Star perspective]
CAREER: [Career analysis using Zi Wei Dou Shu]
RELATIONSHIPS: [Relationship insights from Purple Star astrology]
HEALTH: [Health analysis using Zi Wei system]
WEALTH: [Wealth and financial insights]
LUCKY_ELEMENTS: [Lucky elements from Zi Wei perspective]
SUMMARY: [Overall Zi Wei Dou Shu summary and recommendations]

=== COMPARISON ===
[Compare and contrast the insights from both BaZi and Zi Wei Dou Shu methods, highlighting similarities and differences]

Please provide comprehensive, detailed, and professional analysis in English. Each section should be at least 3-4 sentences long with specific insights and practical advice.`;

  try {
    console.log('Sending AI request with data:', baziData);
    
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
    console.log('Raw AI Response:', content);

    if (!content) {
      throw new Error('Empty response from AI service');
    }

    return parseAIResponse(content);
  } catch (error: unknown) {
    console.error('AI Analysis Error:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', error.response?.data);
      throw new Error(`AI Analysis failed: ${error.response?.data?.error?.message || error.message}`);
    }
    throw new Error(`AI Analysis failed: ${(error as Error).message}`);
  }
};

const parseAIResponse = (content: string): AIAnalysisResponse => {
  console.log('Starting to parse AI response...');

  // Extract BaZi analysis section
  const baziMatch = content.match(/=== BAZI ANALYSIS ===([\s\S]*?)(?:=== ZIWEI ANALYSIS ===|$)/i);
  const baziContent = baziMatch ? baziMatch[1].trim() : '';
  console.log('Extracted BaZi content:', baziContent);

  // Extract Zi Wei analysis section
  const ziweiMatch = content.match(/=== ZIWEI ANALYSIS ===([\s\S]*?)(?:=== COMPARISON ===|$)/i);
  const ziweiContent = ziweiMatch ? ziweiMatch[1].trim() : '';
  console.log('Extracted Zi Wei content:', ziweiContent);

  // Extract comparison section
  const comparisonMatch = content.match(/=== COMPARISON ===([\s\S]*?)$/i);
  const comparisonContent = comparisonMatch ? comparisonMatch[1].trim() : '';
  console.log('Extracted comparison content:', comparisonContent);

  const parseSection = (text: string, sectionName: string): string => {
    // More flexible regex to capture content after section names
    const patterns = [
      new RegExp(`${sectionName}:\\s*(.*?)(?=\\n[A-Z_]+:|$)`, 'is'),
      new RegExp(`${sectionName}\\s*-\\s*(.*?)(?=\\n[A-Z_]+:|$)`, 'is'),
      new RegExp(`${sectionName}\\s+(.*?)(?=\\n[A-Z_]+:|$)`, 'is')
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const result = match[1].trim();
        console.log(`Successfully parsed ${sectionName}:`, result.substring(0, 100) + '...');
        return result;
      }
    }
    
    console.log(`Could not parse ${sectionName} from:`, text.substring(0, 200));
    return '';
  };

  const bazi: AnalysisResult = {
    personality: parseSection(baziContent, 'PERSONALITY'),
    fortune: parseSection(baziContent, 'FORTUNE'),
    career: parseSection(baziContent, 'CAREER'),
    relationships: parseSection(baziContent, 'RELATIONSHIPS'),
    health: parseSection(baziContent, 'HEALTH'),
    wealth: parseSection(baziContent, 'WEALTH'),
    luckyElements: parseSection(baziContent, 'LUCKY_ELEMENTS'),
    summary: parseSection(baziContent, 'SUMMARY'),
  };

  const ziwei: AnalysisResult = {
    personality: parseSection(ziweiContent, 'PERSONALITY'),
    fortune: parseSection(ziweiContent, 'FORTUNE'),
    career: parseSection(ziweiContent, 'CAREER'),
    relationships: parseSection(ziweiContent, 'RELATIONSHIPS'),
    health: parseSection(ziweiContent, 'HEALTH'),
    wealth: parseSection(ziweiContent, 'WEALTH'),
    luckyElements: parseSection(ziweiContent, 'LUCKY_ELEMENTS'),
    summary: parseSection(ziweiContent, 'SUMMARY'),
  };

  console.log('Final parsed results:', { 
    bazi: Object.keys(bazi).filter(k => bazi[k as keyof AnalysisResult]), 
    ziwei: Object.keys(ziwei).filter(k => ziwei[k as keyof AnalysisResult]),
    hasComparison: !!comparisonContent 
  });

  // If parsing failed, try to extract content more generically
  if (!bazi.personality && !ziwei.personality) {
    console.log('Structured parsing failed, trying generic extraction...');
    
    // Fall back to extracting paragraphs and distributing them
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50);
    
    if (paragraphs.length >= 8) {
      const midPoint = Math.floor(paragraphs.length / 2);
      
      return {
        bazi: {
          personality: paragraphs[0] || 'BaZi personality analysis available in full response.',
          fortune: paragraphs[1] || 'BaZi fortune analysis available in full response.',
          career: paragraphs[2] || 'BaZi career analysis available in full response.',
          relationships: paragraphs[3] || 'BaZi relationship analysis available in full response.',
          health: 'Health analysis available in full AI response.',
          wealth: 'Wealth analysis available in full AI response.',
          luckyElements: 'Lucky elements analysis available in full AI response.',
          summary: paragraphs[midPoint - 1] || 'BaZi summary available in full response.',
        },
        ziwei: {
          personality: paragraphs[midPoint] || 'Zi Wei personality analysis available in full response.',
          fortune: paragraphs[midPoint + 1] || 'Zi Wei fortune analysis available in full response.',
          career: paragraphs[midPoint + 2] || 'Zi Wei career analysis available in full response.',
          relationships: paragraphs[midPoint + 3] || 'Zi Wei relationship analysis available in full response.',
          health: 'Health analysis available in full AI response.',
          wealth: 'Wealth analysis available in full AI response.',
          luckyElements: 'Lucky elements analysis available in full AI response.',
          summary: paragraphs[paragraphs.length - 1] || 'Zi Wei summary available in full response.',
        },
        comparison: comparisonContent || content.substring(content.length - 500) || 'Full AI analysis and comparison available above.'
      };
    }
  }

  return {
    bazi,
    ziwei,
    comparison: comparisonContent
  };
}; 