export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dates: string;
  keywords: string[];
  personality: string;
  imageUrl: string;
}

export interface DailyHoroscope {
  date: string;
  sign: string;
  overall: {
    prediction: string;
    score: number;
  };
  love: {
    prediction: string;
    score: number;
  };
  career: {
    prediction: string;
    score: number;
  };
  wealth: {
    prediction: string;
    score: number;
  };
  health: {
    prediction: string;
    score: number;
  };
}

export interface WeeklyHoroscope {
  week: string;
  sign: string;
  overview: string;
  love: string;
  career: string;
  money: string;
  health: string;
  luckyNumbers: number[];
  luckyColors: string[];
}

export interface MonthlyHoroscope {
  month: string;
  year: number;
  sign: string;
  overview: string;
  love: string;
  career: string;
  finances: string;
  health: string;
  keyDates: string[];
  advice: string;
}

export interface CompatibilityResult {
  sign1: string;
  sign2: string;
  overallCompatibility: number;
  loveCompatibility: number;
  friendshipCompatibility: number;
  businessCompatibility: number;
  analysis: string;
  strengths: string[];
  challenges: string[];
  advice: string;
  shareableImage?: string;
}

export type ZodiacLanguage = 'en' | 'zh-CN' | 'zh-TW';

const localizedText = {
  en: {
    daily: {
      overall: [
        (sign: string) => `Today brings positive energy and new opportunities for ${sign}`,
        (sign: string) => `A day of reflection and inner growth awaits ${sign}`,
        () => 'Unexpected encounters may lead to exciting developments',
        () => 'Focus on communication and relationships today'
      ],
      love: ['Romance is in the air with exciting possibilities', 'Focus on deepening existing relationships', 'Single? New connections may surprise you', 'Express your feelings openly and honestly'],
      career: ['Professional opportunities present themselves', 'Leadership qualities shine through today', 'Collaborative efforts yield positive results', 'Creative solutions impress colleagues'],
      wealth: ['Financial planning pays off today', 'Unexpected income or savings opportunities', 'Investment decisions require careful consideration', 'Budgeting efforts show positive results'],
      health: ['Energy levels are high and vitality strong', 'Focus on nutrition and hydration', 'Exercise and movement boost mood', 'Rest and relaxation are equally important']
    },
    weekly: {
      overview: (sign: string) => `This week offers ${sign} a blend of challenges and opportunities. Focus on personal growth and relationship building.`,
      love: (sign: string) => `Romantic energy peaks mid-week for ${sign}. Express your authentic self in relationships.`,
      career: (sign: string) => `Professional momentum builds gradually. Networking and collaboration are key for ${sign} this week.`,
      money: () => 'Financial planning and review are favored. Avoid impulsive purchases and focus on long-term goals.',
      health: (sign: string) => `Balance activity with rest. ${sign} benefits from outdoor activities and mindful practices this week.`
    },
    monthly: {
      overview: (sign: string) => `This month brings transformation and growth opportunities for ${sign}. Embrace change with confidence.`,
      love: (sign: string) => `Relationships deepen and evolve. ${sign} may experience significant romantic developments this month.`,
      career: () => 'Professional advancement and recognition are possible. Stay focused on long-term career goals.',
      finances: () => 'Financial stability improves through careful planning and smart decisions. Investments may pay off.',
      health: () => 'Overall vitality is strong. Establish healthy routines that support your long-term well-being.'
    },
    importantOpportunity: 'Important opportunity',
    advice: [
      (sign: string) => `Trust your instincts and take calculated risks this month, ${sign}`,
      () => 'Focus on building stronger relationships and partnerships',
      () => 'Invest time in personal development and skill building',
      () => 'Balance work commitments with personal well-being'
    ],
    compatibility: {
      analysis: (sign1: string, sign2: string, level: string, potential: string) => `${sign1} and ${sign2} share a ${level} compatible connection. Their relationship dynamics blend their unique strengths to create ${potential} partnership potential.`,
      highly: 'highly',
      moderately: 'moderately',
      potentially: 'potentially',
      exceptional: 'exceptional',
      meaningful: 'meaningful',
      strengths: ['Complementary communication styles', 'Shared values and life goals', 'Mutual respect and understanding', 'Balanced emotional connection'],
      challenges: ['Different approaches to decision-making', 'Varying energy levels and pace', 'Potential conflicts in priorities', 'Need for individual space and independence'],
      advice: (sign1: string, sign2: string) => `Focus on open communication and appreciation of differences. Both ${sign1} and ${sign2} can strengthen their bond by celebrating each other's unique qualities while building on shared interests.`
    }
  },
  'zh-CN': {
    daily: {
      overall: [
        (sign: string) => `今天会给 ${sign} 带来更积极的能量和新机会`,
        (sign: string) => `${sign} 今天适合反思、自我整理和内在成长`,
        () => '意外相遇可能带来新的发展线索',
        () => '今天重点放在沟通、关系和清晰表达上'
      ],
      love: ['感情氛围升温，可能出现让人心动的机会', '适合加深现有关系，认真表达真实需求', '单身者可能遇到意想不到的新连接', '坦诚表达感受会让关系更靠近'],
      career: ['事业机会正在浮现，适合主动争取', '你的领导力和判断力今天更容易被看见', '合作项目会带来更好的结果', '有创意的解决方案容易打动同事或上级'],
      wealth: ['财务规划会开始看到正面效果', '可能出现额外收入或节省开支的机会', '投资决定需要更谨慎地评估', '预算管理会带来更稳定的结果'],
      health: ['精力状态不错，适合推进重要事务', '注意营养、水分和规律作息', '运动和身体活动会改善情绪', '休息与放松同样重要，不要过度消耗']
    },
    weekly: {
      overview: (sign: string) => `${sign} 本周同时有挑战和机会，适合把重心放在个人成长和关系建设上。`,
      love: (sign: string) => `${sign} 本周中段感情能量较强，适合更真实地表达自己。`,
      career: (sign: string) => `${sign} 本周事业动能逐步增强，人脉、协作和主动沟通会是关键。`,
      money: () => '本周适合复盘财务计划，避免冲动消费，把注意力放在长期目标上。',
      health: (sign: string) => `${sign} 本周需要在行动和休息之间取得平衡，户外活动和正念练习会有帮助。`
    },
    monthly: {
      overview: (sign: string) => `${sign} 本月有转变和成长机会，适合用更自信的方式拥抱变化。`,
      love: (sign: string) => `${sign} 本月关系会继续深化，感情层面可能出现值得重视的发展。`,
      career: () => '事业上有推进和被认可的机会，适合继续围绕长期目标保持专注。',
      finances: () => '通过谨慎规划和理性决策，财务稳定度会有所提升。',
      health: () => '整体活力较强，建立能长期坚持的健康习惯会更有价值。'
    },
    importantOpportunity: '重要机会',
    advice: [
      (sign: string) => `${sign} 本月适合相信直觉，但行动前仍要做好风险评估`,
      () => '把重点放在更稳固的关系和合作上',
      () => '投入时间提升技能和个人成长',
      () => '在工作承诺和身心状态之间保持平衡'
    ],
    compatibility: {
      analysis: (sign1: string, sign2: string, level: string, potential: string) => `${sign1} 和 ${sign2} 拥有${level}的关系适配度。两个人的互动会把各自优势结合起来，形成${potential}的关系潜力。`,
      highly: '很高',
      moderately: '中等偏强',
      potentially: '需要培养',
      exceptional: '非常出色',
      meaningful: '有意义',
      strengths: ['沟通方式具有互补性', '价值观和人生目标有交集', '容易建立尊重和理解', '情绪连接相对平衡'],
      challenges: ['决策方式可能不同', '能量节奏和生活速度不一致', '优先级可能产生冲突', '需要保留个人空间和独立性'],
      advice: (sign1: string, sign2: string) => `${sign1} 和 ${sign2} 需要保持开放沟通，并学会欣赏差异。双方可以在共同兴趣上建立连接，同时尊重彼此独特的表达方式。`
    }
  },
  'zh-TW': {
    daily: {
      overall: [
        (sign: string) => `今天會給 ${sign} 帶來更積極的能量和新機會`,
        (sign: string) => `${sign} 今天適合反思、自我整理和內在成長`,
        () => '意外相遇可能帶來新的發展線索',
        () => '今天重點放在溝通、關係和清晰表達上'
      ],
      love: ['感情氛圍升溫，可能出現讓人心動的機會', '適合加深現有關係，認真表達真實需求', '單身者可能遇到意想不到的新連結', '坦誠表達感受會讓關係更靠近'],
      career: ['事業機會正在浮現，適合主動爭取', '你的領導力和判斷力今天更容易被看見', '合作項目會帶來更好的結果', '有創意的解決方案容易打動同事或上級'],
      wealth: ['財務規劃會開始看到正面效果', '可能出現額外收入或節省開支的機會', '投資決定需要更謹慎地評估', '預算管理會帶來更穩定的結果'],
      health: ['精力狀態不錯，適合推進重要事務', '注意營養、水分和規律作息', '運動和身體活動會改善情緒', '休息與放鬆同樣重要，不要過度消耗']
    },
    weekly: {
      overview: (sign: string) => `${sign} 本週同時有挑戰和機會，適合把重心放在個人成長和關係建設上。`,
      love: (sign: string) => `${sign} 本週中段感情能量較強，適合更真實地表達自己。`,
      career: (sign: string) => `${sign} 本週事業動能逐步增強，人脈、協作和主動溝通會是關鍵。`,
      money: () => '本週適合複盤財務計畫，避免衝動消費，把注意力放在長期目標上。',
      health: (sign: string) => `${sign} 本週需要在行動和休息之間取得平衡，戶外活動和正念練習會有幫助。`
    },
    monthly: {
      overview: (sign: string) => `${sign} 本月有轉變和成長機會，適合用更自信的方式擁抱變化。`,
      love: (sign: string) => `${sign} 本月關係會繼續深化，感情層面可能出現值得重視的發展。`,
      career: () => '事業上有推進和被認可的機會，適合繼續圍繞長期目標保持專注。',
      finances: () => '透過謹慎規劃和理性決策，財務穩定度會有所提升。',
      health: () => '整體活力較強，建立能長期堅持的健康習慣會更有價值。'
    },
    importantOpportunity: '重要機會',
    advice: [
      (sign: string) => `${sign} 本月適合相信直覺，但行動前仍要做好風險評估`,
      () => '把重點放在更穩固的關係和合作上',
      () => '投入時間提升技能和個人成長',
      () => '在工作承諾和身心狀態之間保持平衡'
    ],
    compatibility: {
      analysis: (sign1: string, sign2: string, level: string, potential: string) => `${sign1} 和 ${sign2} 擁有${level}的關係適配度。兩個人的互動會把各自優勢結合起來，形成${potential}的關係潛力。`,
      highly: '很高',
      moderately: '中等偏強',
      potentially: '需要培養',
      exceptional: '非常出色',
      meaningful: '有意義',
      strengths: ['溝通方式具有互補性', '價值觀和人生目標有交集', '容易建立尊重和理解', '情緒連結相對平衡'],
      challenges: ['決策方式可能不同', '能量節奏和生活速度不一致', '優先級可能產生衝突', '需要保留個人空間和獨立性'],
      advice: (sign1: string, sign2: string) => `${sign1} 和 ${sign2} 需要保持開放溝通，並學會欣賞差異。雙方可以在共同興趣上建立連結，同時尊重彼此獨特的表達方式。`
    }
  }
};

export class ZodiacService {
  private static readonly zodiacSigns: ZodiacSign[] = [
    {
      name: 'Aries',
      symbol: 'AR',
      element: 'Fire',
      dates: 'March 21 - April 19',
      keywords: ['Energetic', 'Pioneering', 'Competitive', 'Confident'],
      personality: 'Natural leaders with boundless energy and enthusiasm. Aries are pioneers who love to take initiative and face challenges head-on.',
      imageUrl: '/images/zodiac/aries.png'
    },
    {
      name: 'Taurus',
      symbol: 'TA',
      element: 'Earth',
      dates: 'April 20 - May 20',
      keywords: ['Reliable', 'Patient', 'Practical', 'Devoted'],
      personality: 'Steady and reliable, Taurus individuals value security and comfort. They have a natural appreciation for beauty and luxury.',
      imageUrl: '/images/zodiac/taurus.png'
    },
    {
      name: 'Gemini',
      symbol: 'GE',
      element: 'Air',
      dates: 'May 21 - June 20',
      keywords: ['Versatile', 'Curious', 'Social', 'Witty'],
      personality: 'Quick-witted and adaptable, Geminis are natural communicators who thrive on variety and intellectual stimulation.',
      imageUrl: '/images/zodiac/gemini.png'
    },
    {
      name: 'Cancer',
      symbol: 'CA',
      element: 'Water',
      dates: 'June 21 - July 22',
      keywords: ['Nurturing', 'Emotional', 'Protective', 'Intuitive'],
      personality: 'Deeply intuitive and emotional, Cancers are natural nurturers who create safe, comfortable environments for loved ones.',
      imageUrl: '/images/zodiac/cancer.png'
    },
    {
      name: 'Leo',
      symbol: 'LE',
      element: 'Fire',
      dates: 'July 23 - August 22',
      keywords: ['Dramatic', 'Creative', 'Generous', 'Confident'],
      personality: 'Natural performers with big hearts, Leos love to be the center of attention and inspire others with their creativity.',
      imageUrl: '/images/zodiac/leo.png'
    },
    {
      name: 'Virgo',
      symbol: 'VI',
      element: 'Earth',
      dates: 'August 23 - September 22',
      keywords: ['Analytical', 'Practical', 'Helpful', 'Perfectionist'],
      personality: 'Detail-oriented and service-minded, Virgos strive for perfection and are always looking for ways to improve.',
      imageUrl: '/images/zodiac/virgo.png'
    },
    {
      name: 'Libra',
      symbol: 'LI',
      element: 'Air',
      dates: 'September 23 - October 22',
      keywords: ['Diplomatic', 'Harmonious', 'Social', 'Artistic'],
      personality: 'Peace-loving and diplomatic, Libras seek balance and harmony in all aspects of life with refined aesthetic sense.',
      imageUrl: '/images/zodiac/libra.png'
    },
    {
      name: 'Scorpio',
      symbol: 'SC',
      element: 'Water',
      dates: 'October 23 - November 21',
      keywords: ['Intense', 'Passionate', 'Mysterious', 'Transformative'],
      personality: 'Intense and passionate, Scorpios are deep thinkers who possess remarkable willpower and investigative abilities.',
      imageUrl: '/images/zodiac/scorpio.png'
    },
    {
      name: 'Sagittarius',
      symbol: 'SG',
      element: 'Fire',
      dates: 'November 22 - December 21',
      keywords: ['Adventurous', 'Optimistic', 'Philosophical', 'Independent'],
      personality: 'Freedom-loving and optimistic, Sagittarians are eternal students with a thirst for adventure and knowledge.',
      imageUrl: '/images/zodiac/sagittarius.png'
    },
    {
      name: 'Capricorn',
      symbol: 'CP',
      element: 'Earth',
      dates: 'December 22 - January 19',
      keywords: ['Ambitious', 'Disciplined', 'Responsible', 'Traditional'],
      personality: 'Ambitious and disciplined, Capricorns are natural leaders who work steadily toward their goals with patience.',
      imageUrl: '/images/zodiac/capricorn.png'
    },
    {
      name: 'Aquarius',
      symbol: 'AQ',
      element: 'Air',
      dates: 'January 20 - February 18',
      keywords: ['Independent', 'Innovative', 'Humanitarian', 'Eccentric'],
      personality: 'Independent and innovative, Aquarians are forward-thinking humanitarians who value friendship and social causes.',
      imageUrl: '/images/zodiac/aquarius.png'
    },
    {
      name: 'Pisces',
      symbol: 'PI',
      element: 'Water',
      dates: 'February 19 - March 20',
      keywords: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy'],
      personality: 'Compassionate and intuitive, Pisceans are deeply empathetic dreamers with rich inner lives and artistic souls.',
      imageUrl: '/images/zodiac/pisces.png'
    }
  ];

  static getZodiacSign(birthDate: string): ZodiacSign {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return this.zodiacSigns[0]; // Aries
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return this.zodiacSigns[1]; // Taurus
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return this.zodiacSigns[2]; // Gemini
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return this.zodiacSigns[3]; // Cancer
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return this.zodiacSigns[4]; // Leo
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return this.zodiacSigns[5]; // Virgo
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return this.zodiacSigns[6]; // Libra
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return this.zodiacSigns[7]; // Scorpio
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return this.zodiacSigns[8]; // Sagittarius
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return this.zodiacSigns[9]; // Capricorn
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return this.zodiacSigns[10]; // Aquarius
    return this.zodiacSigns[11]; // Pisces
  }

  static getAllZodiacSigns(): ZodiacSign[] {
    return this.zodiacSigns;
  }

  static async getDailyHoroscope(sign: string, date?: string, language: ZodiacLanguage = 'en'): Promise<DailyHoroscope> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      date: targetDate,
      sign,
      overall: {
        prediction: this.generateDailyPrediction(sign, 'overall', language),
        score: Math.floor(Math.random() * 40) + 60 // 60-100
      },
      love: {
        prediction: this.generateDailyPrediction(sign, 'love', language),
        score: Math.floor(Math.random() * 50) + 50 // 50-100
      },
      career: {
        prediction: this.generateDailyPrediction(sign, 'career', language),
        score: Math.floor(Math.random() * 45) + 55 // 55-100
      },
      wealth: {
        prediction: this.generateDailyPrediction(sign, 'wealth', language),
        score: Math.floor(Math.random() * 35) + 65 // 65-100
      },
      health: {
        prediction: this.generateDailyPrediction(sign, 'health', language),
        score: Math.floor(Math.random() * 30) + 70 // 70-100
      }
    };
  }

  static async getWeeklyHoroscope(sign: string, language: ZodiacLanguage = 'en'): Promise<WeeklyHoroscope> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return {
      week: `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`,
      sign,
      overview: this.generateWeeklyContent(sign, 'overview', language),
      love: this.generateWeeklyContent(sign, 'love', language),
      career: this.generateWeeklyContent(sign, 'career', language),
      money: this.generateWeeklyContent(sign, 'money', language),
      health: this.generateWeeklyContent(sign, 'health', language),
      luckyNumbers: this.generateLuckyNumbers(),
      luckyColors: this.generateLuckyColors(sign)
    };
  }

  static async getMonthlyHoroscope(sign: string, month?: number, year?: number, language: ZodiacLanguage = 'en'): Promise<MonthlyHoroscope> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();
    
    return {
      month: new Date(targetYear, targetMonth - 1, 1).toLocaleDateString(language === 'en' ? 'en-US' : language, { month: 'long' }),
      year: targetYear,
      sign,
      overview: this.generateMonthlyContent(sign, 'overview', language),
      love: this.generateMonthlyContent(sign, 'love', language),
      career: this.generateMonthlyContent(sign, 'career', language),
      finances: this.generateMonthlyContent(sign, 'finances', language),
      health: this.generateMonthlyContent(sign, 'health', language),
      keyDates: this.generateKeyDates(targetMonth, targetYear, language),
      advice: this.generateMonthlyAdvice(sign, language)
    };
  }

  static async getCompatibility(sign1: string, sign2: string, language: ZodiacLanguage = 'en'): Promise<CompatibilityResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const compatibility = this.calculateCompatibility(sign1, sign2);
    
    return {
      sign1,
      sign2,
      overallCompatibility: compatibility.overall,
      loveCompatibility: compatibility.love,
      friendshipCompatibility: compatibility.friendship,
      businessCompatibility: compatibility.business,
      analysis: this.generateCompatibilityAnalysis(sign1, sign2, compatibility, language),
      strengths: this.getCompatibilityStrengths(language),
      challenges: this.getCompatibilityChallenges(language),
      advice: this.getCompatibilityAdvice(sign1, sign2, language),
      shareableImage: `/images/compatibility/${sign1.toLowerCase()}-${sign2.toLowerCase()}.png`
    };
  }

  // Private helper methods
  private static generateDailyPrediction(sign: string, category: string, language: ZodiacLanguage): string {
    const predictions = localizedText[language].daily;
    const categoryPredictions = predictions[category as keyof typeof predictions] || predictions.overall;
    const prediction = categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)];
    return typeof prediction === 'function' ? prediction(sign) : prediction;
  }

  private static generateWeeklyContent(sign: string, category: string, language: ZodiacLanguage): string {
    const content = localizedText[language].weekly;
    const contentEntry = content[category as keyof typeof content] || content.overview;
    return contentEntry(sign);
  }

  private static generateMonthlyContent(sign: string, category: string, language: ZodiacLanguage): string {
    const content = localizedText[language].monthly;
    const contentEntry = content[category as keyof typeof content] || content.overview;
    return contentEntry(sign);
  }

  private static generateLuckyNumbers(): number[] {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 99) + 1);
    }
    return numbers.sort((a, b) => a - b);
  }

  private static generateLuckyColors(sign: string): string[] {
    const colorSets = {
      'Aries': ['Red', 'Orange', 'Gold'],
      'Taurus': ['Green', 'Pink', 'Earth tones'],
      'Gemini': ['Yellow', 'Silver', 'Light blue'],
      'Cancer': ['White', 'Silver', 'Sea blue'],
      'Leo': ['Gold', 'Orange', 'Bright yellow'],
      'Virgo': ['Navy blue', 'Green', 'Brown'],
      'Libra': ['Pink', 'Light blue', 'Lavender'],
      'Scorpio': ['Deep red', 'Black', 'Maroon'],
      'Sagittarius': ['Purple', 'Turquoise', 'Orange'],
      'Capricorn': ['Black', 'Brown', 'Dark green'],
      'Aquarius': ['Electric blue', 'Silver', 'Violet'],
      'Pisces': ['Sea green', 'Lavender', 'White']
    };
    
    return colorSets[sign as keyof typeof colorSets] || ['Blue', 'Green', 'Purple'];
  }

  private static generateKeyDates(month: number, year: number, language: ZodiacLanguage): string[] {
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const day = Math.floor(Math.random() * 28) + 1;
      dates.push(`${month}/${day}/${year} - ${localizedText[language].importantOpportunity}`);
    }
    return dates;
  }

  private static generateMonthlyAdvice(sign: string, language: ZodiacLanguage): string {
    const advice = localizedText[language].advice;
    return advice[Math.floor(Math.random() * advice.length)](sign);
  }

  private static calculateCompatibility(sign1: string, sign2: string): { overall: number; love: number; friendship: number; business: number; } {
    // Simplified compatibility calculation based on elements
    const elements = {
      'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
      'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
      'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
      'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };
    
    const element1 = elements[sign1 as keyof typeof elements];
    const element2 = elements[sign2 as keyof typeof elements];
    
    let baseCompatibility = 70;
    
    // Same element = high compatibility
    if (element1 === element2) baseCompatibility = 85;
    
    // Compatible elements
    if ((element1 === 'Fire' && element2 === 'Air') || 
        (element1 === 'Air' && element2 === 'Fire') ||
        (element1 === 'Earth' && element2 === 'Water') ||
        (element1 === 'Water' && element2 === 'Earth')) {
      baseCompatibility = 80;
    }
    
    return {
      overall: baseCompatibility + Math.floor(Math.random() * 15) - 7,
      love: baseCompatibility + Math.floor(Math.random() * 20) - 10,
      friendship: baseCompatibility + Math.floor(Math.random() * 15) - 7,
      business: baseCompatibility + Math.floor(Math.random() * 15) - 7
    };
  }

  private static generateCompatibilityAnalysis(sign1: string, sign2: string, compatibility: { overall: number; love: number; friendship: number; business: number; }, language: ZodiacLanguage): string {
    const text = localizedText[language].compatibility;
    const level = compatibility.overall > 80 ? text.highly : compatibility.overall > 65 ? text.moderately : text.potentially;
    const potential = compatibility.overall > 80 ? text.exceptional : text.meaningful;
    return text.analysis(sign1, sign2, level, potential);
  }

  private static getCompatibilityStrengths(language: ZodiacLanguage): string[] {
    return localizedText[language].compatibility.strengths;
  }

  private static getCompatibilityChallenges(language: ZodiacLanguage): string[] {
    return localizedText[language].compatibility.challenges;
  }

  private static getCompatibilityAdvice(sign1: string, sign2: string, language: ZodiacLanguage): string {
    return localizedText[language].compatibility.advice(sign1, sign2);
  }
}
