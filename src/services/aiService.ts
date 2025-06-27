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

export const analyzeBaziWithAI = async (baziData: BaziData): Promise<AIAnalysisResponse> => {
  try {
    // Try multiple free AI APIs with fallback
    const apis = [
      {
        url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        data: { inputs: `Fortune analysis for birth: ${baziData.birthDate}, ${baziData.birthTime}, ${baziData.location}` }
      },
      {
        url: 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
        data: { inputs: `Please analyze fortune for someone born ${baziData.birthDate}` }
      }
    ];

    for (const api of apis) {
      try {
        const response = await axios.post(api.url, api.data, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 8000
        });

        if (response.data && response.data.length > 0) {
          const aiText = response.data[0].generated_text || response.data[0].response || '';
          if (aiText.length > 20) {
            console.log('✓ AI API working, got response:', aiText.substring(0, 100));
            return parseAIResponseFromText(aiText, baziData);
          }
        }
      } catch (apiError) {
        console.log(`API ${api.url} failed:`, apiError.message);
        continue;
      }
    }

    throw new Error('All AI APIs failed');
  } catch (error) {
    console.log('🔄 All AI APIs unavailable, using enhanced mock data');
    // Enhanced mock data with more realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return generateMockAnalysis(baziData);
  }
};

const getZodiacYear = (birthDate: string) => {
  const year = new Date(birthDate).getFullYear();
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  return animals[(year - 4) % 12];
};

const parseAIResponseFromText = (text: string, baziData: BaziData): AIAnalysisResponse => {
  // Simple text parsing - in a real app, you'd want more sophisticated parsing
  const zodiac = getZodiacYear(baziData.birthDate);
  
  return {
    bazi: {
      personality: `Based on your birth data and AI analysis: ${text.substring(0, 200)}... Your ${zodiac} nature brings unique characteristics to your personality.`,
      fortune: `AI-enhanced fortune reading suggests favorable periods ahead. Your birth elements indicate balanced energy patterns.`,
      career: `Career analysis shows potential in leadership and creative fields, aligned with your birth chart elements.`,
      relationships: `Relationship patterns suggest deep emotional connections and intellectual compatibility as key factors.`,
      health: `Health indicators point to the importance of stress management and balanced lifestyle choices.`,
      wealth: `Financial fortune shows steady growth through consistent effort and wise planning decisions.`,
      luckyElements: `Lucky elements include earth tones, metal accents, numbers 3, 6, 9, and southeastern directions.`,
      summary: `Your BaZi chart reveals a balanced individual with strong potential for success in multiple life areas.`
    },
    ziwei: {
      personality: `Zi Wei analysis reveals complementary insights to the BaZi reading, emphasizing intuitive and spiritual aspects.`,
      fortune: `Purple Star positioning indicates periods of significant growth and transformation in your life path.`,
      career: `Career palace shows aptitude for guidance roles, creative expression, and service-oriented professions.`,
      relationships: `Relationship dynamics favor long-term commitments and partnerships based on mutual respect and understanding.`,
      health: `Health palace suggests robust constitution with attention needed for emotional and mental well-being.`,
      wealth: `Wealth potential is substantial, particularly through helping others and developing your natural talents.`,
      luckyElements: `Zi Wei lucky elements include deep blues, purples, water features, and northern directional positioning.`,
      summary: `Your Purple Star configuration indicates a person destined for meaningful contributions and personal fulfillment.`
    },
    comparison: `Both BaZi and Zi Wei Dou Shu systems show consistent themes of leadership potential, creative abilities, and strong relationship values. The analyses complement each other in highlighting your balanced nature and potential for success through service to others.`
  };
};

const generateMockAnalysis = (baziData: BaziData): AIAnalysisResponse => {
  const getZodiacYear = (birthDate: string) => {
    const year = new Date(birthDate).getFullYear();
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(year - 4) % 12];
  };

  const zodiac = getZodiacYear(baziData.birthDate);
  
  return {
    bazi: {
      personality: `Based on BaZi Four Pillars analysis, you possess strong leadership qualities with a natural inclination towards innovation and creativity. Your ${zodiac} nature brings wisdom and strategic thinking to your personality. You tend to be analytical yet intuitive, often finding unique solutions to complex problems. Your birth configuration suggests a harmonious balance between emotional intelligence and logical reasoning.`,
      fortune: `Your overall life fortune shows a pattern of steady growth with significant opportunities in the coming years. The alignment of your birth elements indicates periods of prosperity alternating with learning phases. You are likely to experience your greatest success through collaborative efforts and by leveraging your natural communication skills. Financial stability will improve significantly after your early thirties.`,
      career: `Your BaZi chart reveals exceptional potential in leadership and consulting roles. Fields such as business management, education, healthcare, or creative industries align well with your elemental constitution. Your natural ability to inspire others and see the bigger picture makes you well-suited for executive positions. Entrepreneurial ventures started in partnership will be particularly successful.`,
      relationships: `In relationships, you seek deep emotional connections and intellectual compatibility. Your nurturing nature makes you a supportive partner, though you may sometimes struggle with setting boundaries. Family relationships are central to your happiness, and you have a natural ability to bring people together. Your ideal partner will appreciate your wisdom and share your values of growth and loyalty.`,
      health: `Your health profile suggests strong vitality with attention needed to stress management. Regular exercise and meditation will be beneficial for maintaining your natural energy levels. Pay particular attention to digestive health and ensure adequate rest. Your constitution benefits from consistent routines and avoiding extremes in diet or lifestyle.`,
      wealth: `Wealth accumulation will come through steady effort and wise investments rather than sudden windfalls. Your practical approach to money management serves you well, though you may benefit from being more assertive in financial negotiations. Multiple income streams and long-term planning will secure your financial future. Avoid impulsive purchases and focus on assets that appreciate over time.`,
      luckyElements: `Your lucky elements include earth tones (brown, beige, yellow), the directions of Southwest and Northeast, numbers 2, 5, and 8. Jade and citrine stones will enhance your natural energies. The best times for important decisions are during spring and late summer seasons.`,
      summary: `Your BaZi reading reveals a well-balanced individual with strong potential for success in both personal and professional spheres. Your natural leadership abilities, combined with wisdom and compassion, position you for significant achievements. Focus on building lasting relationships and maintaining balance in all aspects of life for optimal fulfillment.`
    },
    ziwei: {
      personality: `According to Zi Wei Dou Shu analysis, your Purple Star configuration reveals a person of great depth and complexity. You possess natural charisma and an innate understanding of human nature. Your personality combines ambition with compassion, making you both a natural leader and a trusted confidant. The stars in your life palace indicate strong intuitive abilities and a talent for seeing beyond surface appearances.`,
      fortune: `Your Purple Star chart shows a life path marked by significant achievements and recognition. The positioning of your main stars suggests periods of rapid advancement followed by consolidation phases. You are destined for positions of influence and respect within your community. Your fortune improves dramatically in your middle years, bringing both material success and spiritual fulfillment.`,
      career: `The Purple Star in your career palace indicates natural aptitude for roles involving guidance, healing, or creative expression. You may find success in fields such as psychology, counseling, the arts, or spiritual work. Your ability to understand and help others will be a key factor in your professional advancement. Leadership roles in service-oriented industries are particularly favored.`,
      relationships: `Your relationship palace shows a tendency toward deep, transformative connections. You attract partners who appreciate your depth and wisdom, though you may sometimes struggle with vulnerability. Family ties are especially important, and you have a natural ability to heal relationship conflicts. Your romantic relationships tend to be karmic in nature, bringing significant personal growth.`,
      health: `The health indicators in your Zi Wei chart suggest robust constitution with particular attention needed for emotional well-being. Stress from overthinking or emotional absorption may affect your physical health. Regular spiritual practices, time in nature, and creative expression will support your overall wellness. Pay attention to your intuitive insights about your body's needs.`,
      wealth: `Your wealth potential according to Purple Star astrology is substantial, particularly through service to others or creative endeavors. Money may come through helping others achieve their goals or through artistic expression. Your financial success is tied to your spiritual and emotional development. Generosity and wise sharing of resources will enhance your prosperity.`,
      luckyElements: `Your Purple Star configuration favors deep blue and purple colors, the North direction, and numbers 1, 6, and 9. Amethyst and lapis lazuli stones will support your natural intuitive abilities. Water elements in your environment will enhance your energy flow.`,
      summary: `Your Zi Wei Dou Shu reading reveals a soul destined for significant spiritual and material achievements. Your natural wisdom and compassion will guide you to success while helping others along their paths. Trust your intuition and embrace your role as a natural healer and guide for others.`
    },
    comparison: `Both BaZi and Zi Wei Dou Shu analyses reveal consistent themes in your destiny profile. Both systems highlight your natural leadership abilities, though BaZi emphasizes your practical and strategic approach while Zi Wei focuses on your intuitive and spiritual gifts. In career matters, both point to success in helping others, with BaZi suggesting more conventional leadership roles and Zi Wei indicating spiritual or healing professions. Your relationship patterns show remarkable consistency between both systems - deep connections, family importance, and the need for intellectual compatibility. The wealth indicators align in suggesting steady accumulation through service rather than speculation. Both analyses confirm your balanced nature and potential for significant achievements through combining practical wisdom with spiritual insight. The timing of your major life developments shows similar patterns in both systems, with significant progress expected in your middle years.`
  };
}; 