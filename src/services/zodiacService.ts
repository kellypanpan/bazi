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

export class ZodiacService {
  private static readonly zodiacSigns: ZodiacSign[] = [
    {
      name: 'Aries',
      symbol: '♈',
      element: 'Fire',
      dates: 'March 21 - April 19',
      keywords: ['Energetic', 'Pioneering', 'Competitive', 'Confident'],
      personality: 'Natural leaders with boundless energy and enthusiasm. Aries are pioneers who love to take initiative and face challenges head-on.',
      imageUrl: '/images/zodiac/aries.png'
    },
    {
      name: 'Taurus',
      symbol: '♉',
      element: 'Earth',
      dates: 'April 20 - May 20',
      keywords: ['Reliable', 'Patient', 'Practical', 'Devoted'],
      personality: 'Steady and reliable, Taurus individuals value security and comfort. They have a natural appreciation for beauty and luxury.',
      imageUrl: '/images/zodiac/taurus.png'
    },
    {
      name: 'Gemini',
      symbol: '♊',
      element: 'Air',
      dates: 'May 21 - June 20',
      keywords: ['Versatile', 'Curious', 'Social', 'Witty'],
      personality: 'Quick-witted and adaptable, Geminis are natural communicators who thrive on variety and intellectual stimulation.',
      imageUrl: '/images/zodiac/gemini.png'
    },
    {
      name: 'Cancer',
      symbol: '♋',
      element: 'Water',
      dates: 'June 21 - July 22',
      keywords: ['Nurturing', 'Emotional', 'Protective', 'Intuitive'],
      personality: 'Deeply intuitive and emotional, Cancers are natural nurturers who create safe, comfortable environments for loved ones.',
      imageUrl: '/images/zodiac/cancer.png'
    },
    {
      name: 'Leo',
      symbol: '♌',
      element: 'Fire',
      dates: 'July 23 - August 22',
      keywords: ['Dramatic', 'Creative', 'Generous', 'Confident'],
      personality: 'Natural performers with big hearts, Leos love to be the center of attention and inspire others with their creativity.',
      imageUrl: '/images/zodiac/leo.png'
    },
    {
      name: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      dates: 'August 23 - September 22',
      keywords: ['Analytical', 'Practical', 'Helpful', 'Perfectionist'],
      personality: 'Detail-oriented and service-minded, Virgos strive for perfection and are always looking for ways to improve.',
      imageUrl: '/images/zodiac/virgo.png'
    },
    {
      name: 'Libra',
      symbol: '♎',
      element: 'Air',
      dates: 'September 23 - October 22',
      keywords: ['Diplomatic', 'Harmonious', 'Social', 'Artistic'],
      personality: 'Peace-loving and diplomatic, Libras seek balance and harmony in all aspects of life with refined aesthetic sense.',
      imageUrl: '/images/zodiac/libra.png'
    },
    {
      name: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      dates: 'October 23 - November 21',
      keywords: ['Intense', 'Passionate', 'Mysterious', 'Transformative'],
      personality: 'Intense and passionate, Scorpios are deep thinkers who possess remarkable willpower and investigative abilities.',
      imageUrl: '/images/zodiac/scorpio.png'
    },
    {
      name: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      dates: 'November 22 - December 21',
      keywords: ['Adventurous', 'Optimistic', 'Philosophical', 'Independent'],
      personality: 'Freedom-loving and optimistic, Sagittarians are eternal students with a thirst for adventure and knowledge.',
      imageUrl: '/images/zodiac/sagittarius.png'
    },
    {
      name: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      dates: 'December 22 - January 19',
      keywords: ['Ambitious', 'Disciplined', 'Responsible', 'Traditional'],
      personality: 'Ambitious and disciplined, Capricorns are natural leaders who work steadily toward their goals with patience.',
      imageUrl: '/images/zodiac/capricorn.png'
    },
    {
      name: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      dates: 'January 20 - February 18',
      keywords: ['Independent', 'Innovative', 'Humanitarian', 'Eccentric'],
      personality: 'Independent and innovative, Aquarians are forward-thinking humanitarians who value friendship and social causes.',
      imageUrl: '/images/zodiac/aquarius.png'
    },
    {
      name: 'Pisces',
      symbol: '♓',
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

  static async getDailyHoroscope(sign: string, date?: string): Promise<DailyHoroscope> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      date: targetDate,
      sign,
      overall: {
        prediction: this.generateDailyPrediction(sign, 'overall'),
        score: Math.floor(Math.random() * 40) + 60 // 60-100
      },
      love: {
        prediction: this.generateDailyPrediction(sign, 'love'),
        score: Math.floor(Math.random() * 50) + 50 // 50-100
      },
      career: {
        prediction: this.generateDailyPrediction(sign, 'career'),
        score: Math.floor(Math.random() * 45) + 55 // 55-100
      },
      wealth: {
        prediction: this.generateDailyPrediction(sign, 'wealth'),
        score: Math.floor(Math.random() * 35) + 65 // 65-100
      },
      health: {
        prediction: this.generateDailyPrediction(sign, 'health'),
        score: Math.floor(Math.random() * 30) + 70 // 70-100
      }
    };
  }

  static async getWeeklyHoroscope(sign: string): Promise<WeeklyHoroscope> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return {
      week: `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`,
      sign,
      overview: this.generateWeeklyContent(sign, 'overview'),
      love: this.generateWeeklyContent(sign, 'love'),
      career: this.generateWeeklyContent(sign, 'career'),
      money: this.generateWeeklyContent(sign, 'money'),
      health: this.generateWeeklyContent(sign, 'health'),
      luckyNumbers: this.generateLuckyNumbers(),
      luckyColors: this.generateLuckyColors(sign)
    };
  }

  static async getMonthlyHoroscope(sign: string, month?: number, year?: number): Promise<MonthlyHoroscope> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();
    
    return {
      month: new Date(targetYear, targetMonth - 1, 1).toLocaleDateString('en-US', { month: 'long' }),
      year: targetYear,
      sign,
      overview: this.generateMonthlyContent(sign, 'overview'),
      love: this.generateMonthlyContent(sign, 'love'),
      career: this.generateMonthlyContent(sign, 'career'),
      finances: this.generateMonthlyContent(sign, 'finances'),
      health: this.generateMonthlyContent(sign, 'health'),
      keyDates: this.generateKeyDates(targetMonth, targetYear),
      advice: this.generateMonthlyAdvice(sign)
    };
  }

  static async getCompatibility(sign1: string, sign2: string): Promise<CompatibilityResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const compatibility = this.calculateCompatibility(sign1, sign2);
    
    return {
      sign1,
      sign2,
      overallCompatibility: compatibility.overall,
      loveCompatibility: compatibility.love,
      friendshipCompatibility: compatibility.friendship,
      businessCompatibility: compatibility.business,
      analysis: this.generateCompatibilityAnalysis(sign1, sign2, compatibility),
      strengths: this.getCompatibilityStrengths(),
      challenges: this.getCompatibilityChallenges(),
      advice: this.getCompatibilityAdvice(sign1, sign2),
      shareableImage: `/images/compatibility/${sign1.toLowerCase()}-${sign2.toLowerCase()}.png`
    };
  }

  // Private helper methods
  private static generateDailyPrediction(sign: string, category: string): string {
    const predictions = {
      overall: [
        `Today brings positive energy and new opportunities for ${sign}`,
        `A day of reflection and inner growth awaits ${sign}`,
        `Unexpected encounters may lead to exciting developments`,
        `Focus on communication and relationships today`
      ],
      love: [
        'Romance is in the air with exciting possibilities',
        'Focus on deepening existing relationships',
        'Single? New connections may surprise you',
        'Express your feelings openly and honestly'
      ],
      career: [
        'Professional opportunities present themselves',
        'Leadership qualities shine through today',
        'Collaborative efforts yield positive results',
        'Creative solutions impress colleagues'
      ],
      wealth: [
        'Financial planning pays off today',
        'Unexpected income or savings opportunities',
        'Investment decisions require careful consideration',
        'Budgeting efforts show positive results'
      ],
      health: [
        'Energy levels are high and vitality strong',
        'Focus on nutrition and hydration',
        'Exercise and movement boost mood',
        'Rest and relaxation are equally important'
      ]
    };
    
    const categoryPredictions = predictions[category as keyof typeof predictions] || predictions.overall;
    return categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)];
  }

  private static generateWeeklyContent(sign: string, category: string): string {
    const content = {
      overview: `This week offers ${sign} a blend of challenges and opportunities. Focus on personal growth and relationship building.`,
      love: `Romantic energy peaks mid-week for ${sign}. Express your authentic self in relationships.`,
      career: `Professional momentum builds gradually. Networking and collaboration are key for ${sign} this week.`,
      money: `Financial planning and review are favored. Avoid impulsive purchases and focus on long-term goals.`,
      health: `Balance activity with rest. ${sign} benefits from outdoor activities and mindful practices this week.`
    };
    
    return content[category as keyof typeof content] || content.overview;
  }

  private static generateMonthlyContent(sign: string, category: string): string {
    const content = {
      overview: `This month brings transformation and growth opportunities for ${sign}. Embrace change with confidence.`,
      love: `Relationships deepen and evolve. ${sign} may experience significant romantic developments this month.`,
      career: `Professional advancement and recognition are possible. Stay focused on long-term career goals.`,
      finances: `Financial stability improves through careful planning and smart decisions. Investments may pay off.`,
      health: `Overall vitality is strong. Establish healthy routines that support your long-term well-being.`
    };
    
    return content[category as keyof typeof content] || content.overview;
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

  private static generateKeyDates(month: number, year: number): string[] {
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const day = Math.floor(Math.random() * 28) + 1;
      dates.push(`${month}/${day}/${year} - Important opportunity`);
    }
    return dates;
  }

  private static generateMonthlyAdvice(sign: string): string {
    const advice = [
      `Trust your instincts and take calculated risks this month, ${sign}`,
      `Focus on building stronger relationships and partnerships`,
      `Invest time in personal development and skill building`,
      `Balance work commitments with personal well-being`
    ];
    
    return advice[Math.floor(Math.random() * advice.length)];
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

  private static generateCompatibilityAnalysis(sign1: string, sign2: string, compatibility: { overall: number; love: number; friendship: number; business: number; }): string {
    return `${sign1} and ${sign2} share a ${compatibility.overall > 80 ? 'highly' : compatibility.overall > 65 ? 'moderately' : 'potentially'} compatible connection. Their relationship dynamics blend their unique strengths to create ${compatibility.overall > 80 ? 'exceptional' : 'meaningful'} partnership potential.`;
  }

  private static getCompatibilityStrengths(): string[] {
    return [
      'Complementary communication styles',
      'Shared values and life goals', 
      'Mutual respect and understanding',
      'Balanced emotional connection'
    ];
  }

  private static getCompatibilityChallenges(): string[] {
    return [
      'Different approaches to decision-making',
      'Varying energy levels and pace',
      'Potential conflicts in priorities',
      'Need for individual space and independence'
    ];
  }

  private static getCompatibilityAdvice(sign1: string, sign2: string): string {
    return `Focus on open communication and appreciation of differences. Both ${sign1} and ${sign2} can strengthen their bond by celebrating each other's unique qualities while building on shared interests.`;
  }
}