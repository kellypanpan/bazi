import { BaziData, DetailedBaziAnalysis } from './aiService';

export class EnhancedBaziService {
  
  static async getDetailedBaziAnalysis(baziData: BaziData): Promise<DetailedBaziAnalysis> {
    // In production, this would call your AI service with detailed prompts
    // For now, providing comprehensive mock data based on birth information
    
    const birthYear = new Date(baziData.birthDate).getFullYear();
    const zodiacAnimal = this.getZodiacAnimal(birthYear);
    const element = this.getDominantElement(baziData);
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    return {
      careerForecast: this.generateCareerForecast(zodiacAnimal, element),
      wealthAnalysis: this.generateWealthAnalysis(zodiacAnimal, element),
      marriageDestiny: this.generateMarriageAnalysis(zodiacAnimal, element),
      healthInsights: this.generateHealthInsights(zodiacAnimal, element),
      annualForecast: this.generateAnnualForecast(),
      lifeOverview: this.generateLifeOverview(zodiacAnimal, element)
    };
  }

  private static getZodiacAnimal(year: number): string {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(year - 4) % 12];
  }

  private static getDominantElement(baziData: BaziData): string {
    // Simplified element calculation based on birth year
    const year = new Date(baziData.birthDate).getFullYear();
    const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
    return elements[year % 5];
  }

  private static generateCareerForecast(zodiac: string, element: string) {
    const luckyMonths = [2, 5, 8, 11]; // Spring, summer, autumn, winter starts
    
    return {
      next12Months: `Your ${zodiac} nature combined with ${element} energy suggests significant career opportunities in the coming year. Peak periods for advancement will be in ${this.getSeasonNames(luckyMonths)}. Your natural leadership abilities will be recognized, leading to increased responsibilities and potential promotions. Focus on collaborative projects in Q2 and independent initiatives in Q4.`,
      luckyDays: [
        "January 15th, 2025 - New project opportunities",
        "March 22nd, 2025 - Important meeting success", 
        "June 8th, 2025 - Career breakthrough",
        "September 13th, 2025 - Recognition and rewards",
        "November 27th, 2025 - Strategic planning success"
      ],
      recommendations: `Leverage your ${element} energy by taking calculated risks in your field. Network actively during spring months. Consider additional training or certification in emerging technologies. Your ${zodiac} traits make you particularly suited for mentoring roles.`,
      score: Math.floor(Math.random() * 30) + 70 // 70-100 range
    };
  }

  private static generateWealthAnalysis(zodiac: string, element: string) {
    return {
      overallTrend: `Your wealth pattern shows steady growth with ${element} energy bringing stability to your financial decisions. The ${zodiac} influence suggests periods of conservative saving followed by strategic investments. Expect gradual wealth accumulation rather than sudden windfalls, with peak earning potential in your late thirties to early forties.`,
      windfall: `Unexpected financial opportunities may arise through social connections and collaborative ventures. Your ${zodiac} nature attracts benefactors and mentors who can open doors to profitable opportunities. Small windfalls likely in spring and autumn seasons through real estate or investment returns.`,
      investments: `Your ${element} element favors long-term, stable investments over high-risk ventures. Consider diversified portfolios with emphasis on blue-chip stocks, real estate, and precious metals. Avoid speculative trading. Best investment timing: late spring and early autumn. Technology and sustainable energy sectors align well with your elemental profile.`,
      score: Math.floor(Math.random() * 25) + 75 // 75-100 range
    };
  }

  private static generateMarriageAnalysis(zodiac: string, element: string) {
    const compatibleZodiacs = this.getCompatibleZodiacs(zodiac);
    
    return {
      romanticFortune: `Your ${zodiac} nature brings loyalty and depth to relationships. The ${element} influence adds emotional intelligence and intuitive understanding of partners' needs. You attract partners who appreciate stability and long-term commitment. Peak romantic periods occur during your favorable seasonal cycles.`,
      compatibility: `Most compatible with ${compatibleZodiacs.join(', ')} signs. Seek partners who complement your ${element} energy with balancing elements. Look for intellectual compatibility and shared values. Avoid impulsive romantic decisions during your challenging months (typically summer if you're earth/metal signs).`,
      bestMarriageTime: `Optimal marriage timing falls between ages 28-34, with especially favorable periods in years ending in 5 and 8. The most auspicious months for marriage are spring (March-May) and autumn (September-November). Consider years when your lunar birthday aligns with lucky star configurations.`,
      score: Math.floor(Math.random() * 20) + 80 // 80-100 range
    };
  }

  private static generateHealthInsights(zodiac: string, element: string) {
    return {
      potentialIssues: `Your ${element} constitution may be prone to ${this.getElementHealthRisks(element)}. The ${zodiac} influence suggests attention needed for stress management and maintaining work-life balance. Monitor digestive health and circulation, especially during seasonal transitions.`,
      preventiveCare: `Regular exercise aligning with your ${element} nature is recommended - gentle activities like swimming or yoga for water/earth types, more dynamic exercises for fire/wood types. Seasonal detox programs, meditation practices, and consistent sleep schedules will support your natural rhythms.`,
      recommendations: `Strengthen your health through ${element}-balancing foods and activities. Avoid overwork during your challenging lunar months. Consider traditional Chinese medicine approaches like acupuncture or herbal supplements. Pay attention to emotional health as it directly impacts your physical well-being.`,
      score: Math.floor(Math.random() * 15) + 85 // 85-100 range
    };
  }

  private static generateAnnualForecast() {
    const months2025 = [
      { month: "January", prediction: "New beginnings in career, focus on planning", score: 75 },
      { month: "February", prediction: "Romantic opportunities, social networking", score: 82 },
      { month: "March", prediction: "Financial gains, investment opportunities", score: 88 },
      { month: "April", prediction: "Health focus, establish good habits", score: 79 },
      { month: "May", prediction: "Travel and learning experiences", score: 85 },
      { month: "June", prediction: "Family harmony, home improvements", score: 91 },
      { month: "July", prediction: "Creative projects, artistic expression", score: 77 },
      { month: "August", prediction: "Career advancement, recognition", score: 89 },
      { month: "September", prediction: "Wealth accumulation, business success", score: 93 },
      { month: "October", prediction: "Relationship milestones, commitments", score: 86 },
      { month: "November", prediction: "Spiritual growth, introspection", score: 74 },
      { month: "December", prediction: "Goal completion, year-end achievements", score: 81 }
    ];

    const months2026 = [
      { month: "January", prediction: "Innovation and technology focus", score: 83 },
      { month: "February", prediction: "Partnership opportunities", score: 87 },
      { month: "March", prediction: "Real estate and investments", score: 90 },
      { month: "April", prediction: "Health optimization, fitness goals", score: 78 },
      { month: "May", prediction: "Educational advancement", score: 84 },
      { month: "June", prediction: "Home and family expansion", score: 92 },
      { month: "July", prediction: "Creative collaborations", score: 80 },
      { month: "August", prediction: "Leadership roles, authority", score: 88 },
      { month: "September", prediction: "Financial peak, major gains", score: 95 },
      { month: "October", prediction: "Relationship culmination", score: 89 },
      { month: "November", prediction: "Wisdom sharing, teaching", score: 76 },
      { month: "December", prediction: "Legacy building, planning ahead", score: 85 }
    ];

    return {
      year2025: months2025,
      year2026: months2026
    };
  }

  private static generateLifeOverview(zodiac: string, element: string) {
    const overallScore = Math.floor(Math.random() * 15) + 85; // 85-100 range
    
    return {
      overallScore,
      strengthsWeaknesses: `Strengths: Your ${zodiac} nature provides ${this.getZodiacStrengths(zodiac)}, while your ${element} element adds ${this.getElementStrengths(element)}. Challenges to work on: ${this.getElementChallenges(element)} and managing ${zodiac} tendencies toward ${this.getZodiacChallenges(zodiac)}.`,
      lifeThemes: `Your life journey centers around ${this.getLifeThemes(zodiac, element)}. Key lessons involve balancing material success with spiritual growth, and learning to trust your intuitive wisdom while maintaining practical grounding.`,
      spiritualPath: `Your spiritual development follows the path of ${this.getSpiritualPath(element)}, with emphasis on ${this.getZodiacSpirituality(zodiac)}. Consider practices that align with your elemental nature for optimal growth.`
    };
  }

  // Helper methods for generating specific content
  private static getSeasonNames(months: number[]): string {
    const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
    return months.map(m => seasons[Math.floor(m / 3)]).join(' and ');
  }

  private static getCompatibleZodiacs(zodiac: string): string[] {
    const compatibility = {
      'Rat': ['Dragon', 'Monkey', 'Ox'],
      'Ox': ['Rat', 'Snake', 'Rooster'],
      'Tiger': ['Horse', 'Dog', 'Pig'],
      'Rabbit': ['Goat', 'Pig', 'Dog'],
      'Dragon': ['Rat', 'Monkey', 'Rooster'],
      'Snake': ['Ox', 'Rooster', 'Monkey'],
      'Horse': ['Tiger', 'Dog', 'Goat'],
      'Goat': ['Rabbit', 'Horse', 'Pig'],
      'Monkey': ['Rat', 'Dragon', 'Snake'],
      'Rooster': ['Ox', 'Snake', 'Dragon'],
      'Dog': ['Tiger', 'Horse', 'Rabbit'],
      'Pig': ['Tiger', 'Rabbit', 'Goat']
    };
    return compatibility[zodiac as keyof typeof compatibility] || ['Dragon', 'Monkey', 'Rooster'];
  }

  private static getElementHealthRisks(element: string): string {
    const risks = {
      'Metal': 'respiratory issues and skin sensitivities',
      'Water': 'kidney function and circulatory concerns',
      'Wood': 'liver health and tendon flexibility',
      'Fire': 'heart health and blood pressure',
      'Earth': 'digestive system and spleen function'
    };
    return risks[element as keyof typeof risks] || 'general constitutional balance';
  }

  private static getZodiacStrengths(zodiac: string): string {
    const strengths = {
      'Rat': 'adaptability, intelligence, and resourcefulness',
      'Ox': 'reliability, determination, and methodical approach',
      'Tiger': 'courage, leadership, and natural charisma',
      'Rabbit': 'diplomacy, artistic sensitivity, and peaceful nature',
      'Dragon': 'confidence, innovation, and natural authority',
      'Snake': 'wisdom, intuition, and analytical thinking',
      'Horse': 'independence, enthusiasm, and adventurous spirit',
      'Goat': 'creativity, compassion, and aesthetic appreciation',
      'Monkey': 'cleverness, versatility, and problem-solving skills',
      'Rooster': 'precision, honesty, and organizational abilities',
      'Dog': 'loyalty, justice, and protective instincts',
      'Pig': 'generosity, optimism, and genuine heart'
    };
    return strengths[zodiac as keyof typeof strengths] || 'balanced characteristics';
  }

  private static getElementStrengths(element: string): string {
    const strengths = {
      'Metal': 'clarity, structure, and refined judgment',
      'Water': 'adaptability, wisdom, and emotional depth',
      'Wood': 'growth mindset, flexibility, and creative expansion',
      'Fire': 'passion, enthusiasm, and transformative energy',
      'Earth': 'stability, nurturing ability, and practical grounding'
    };
    return strengths[element as keyof typeof strengths] || 'elemental balance';
  }

  private static getElementChallenges(element: string): string {
    const challenges = {
      'Metal': 'rigidity and perfectionist tendencies',
      'Water': 'emotional overwhelm and indecisiveness', 
      'Wood': 'impatience and scattered energy',
      'Fire': 'impulsiveness and burnout risk',
      'Earth': 'stubbornness and resistance to change'
    };
    return challenges[element as keyof typeof challenges] || 'elemental excess';
  }

  private static getZodiacChallenges(zodiac: string): string {
    const challenges = {
      'Rat': 'anxiety and overthinking',
      'Ox': 'stubbornness and inflexibility',
      'Tiger': 'impulsiveness and aggression',
      'Rabbit': 'avoidance and indecision',
      'Dragon': 'arrogance and impatience',
      'Snake': 'secretiveness and mistrust',
      'Horse': 'restlessness and inconsistency',
      'Goat': 'pessimism and dependency',
      'Monkey': 'superficiality and restlessness',
      'Rooster': 'criticism and perfectionism',
      'Dog': 'worry and cynicism',
      'Pig': 'naivety and overindulgence'
    };
    return challenges[zodiac as keyof typeof challenges] || 'typical zodiac challenges';
  }

  private static getLifeThemes(zodiac: string, element: string): string {
    return `harmonizing ${element} qualities with ${zodiac} characteristics, building lasting relationships, and finding meaning through service to others`;
  }

  private static getSpiritualPath(element: string): string {
    const paths = {
      'Metal': 'refinement and purification',
      'Water': 'flow and surrender',
      'Wood': 'growth and expansion',
      'Fire': 'illumination and transformation',
      'Earth': 'grounding and nurturing'
    };
    return paths[element as keyof typeof paths] || 'balanced spiritual development';
  }

  private static getZodiacSpirituality(zodiac: string): string {
    const spirituality = {
      'Rat': 'mindful intelligence and adaptable wisdom',
      'Ox': 'patient cultivation and steady practice',
      'Tiger': 'courageous truth-seeking and authentic expression',
      'Rabbit': 'gentle compassion and artistic beauty',
      'Dragon': 'visionary leadership and divine connection',
      'Snake': 'deep wisdom and transformative insight',
      'Horse': 'freedom-seeking and adventurous spirit',
      'Goat': 'creative expression and heart-centered practice',
      'Monkey': 'playful wisdom and adaptive learning',
      'Rooster': 'disciplined practice and moral clarity',
      'Dog': 'loyal service and protective guidance',
      'Pig': 'generous heart and joyful abundance'
    };
    return spirituality[zodiac as keyof typeof spirituality] || 'balanced spiritual approach';
  }
}