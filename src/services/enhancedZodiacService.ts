export interface EnhancedZodiacSign {
  name: string;
  chineseName: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dates: string;
  rulingPlanet: string;
  luckyColor: string[];
  luckyNumber: number[];
  keywords: string[];
  personality: {
    positiveTraits: string[];
    negativeTraits: string[];
    inLove: string;
    atWork: string;
    withMoney: string;
    interpersonal: string;
    childhood: string;
    underStress: string;
  };
  famousPeople: {
    name: string;
    profession: string;
    birthDate: string;
  }[];
  compatibility: {
    bestMatches: string[];
    challenging: string[];
  };
  career: {
    suitedProfessions: string[];
    workStyle: string;
    leadership: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface HoroscopeData {
  date: string;
  sign: string;
  overall: {
    prediction: string;
    score: number;
    luckyTip: string;
  };
  love: {
    prediction: string;
    score: number;
    advice: string;
  };
  career: {
    prediction: string;
    score: number;
    advice: string;
  };
  wealth: {
    prediction: string;
    score: number;
    advice: string;
  };
  health: {
    prediction: string;
    score: number;
    advice: string;
  };
  doToday: string[];
  avoidToday: string[];
}

export interface MonthlyForecast {
  month: string;
  year: number;
  sign: string;
  overview: string;
  keyThemes: string[];
  importantDates: string[];
  advice: string;
  loveInsights: string;
  careerHighlights: string;
  healthFocus: string;
  financialGuidance: string;
}

export interface YearlyForecast {
  year: number;
  sign: string;
  overview: string;
  majorThemes: string[];
  quarters: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
  };
  loveYear: string;
  careerYear: string;
  healthYear: string;
  wealthYear: string;
  keyDates: string[];
  challenges: string[];
  opportunities: string[];
}

export class EnhancedZodiacService {
  private static readonly enhancedZodiacData: Record<string, EnhancedZodiacSign> = {
    aries: {
      name: 'Aries',
      chineseName: '白羊座',
      symbol: '♈',
      element: 'Fire',
      dates: 'March 21 - April 19',
      rulingPlanet: 'Mars',
      luckyColor: ['Red', 'Orange', 'Yellow'],
      luckyNumber: [1, 8, 17],
      keywords: ['Energetic', 'Leader', 'Impulsive', 'Brave', 'Independent'],
      personality: {
        positiveTraits: ['Natural leader', 'Energetic and enthusiastic', 'Brave and courageous', 'Independent and self-reliant', 'Optimistic and confident'],
        negativeTraits: ['Impatient and impulsive', 'Can be selfish', 'Short-tempered', 'Reckless at times', 'Struggles with routine'],
        inLove: 'Aries are passionate and direct in love. They fall hard and fast, bringing excitement and adventure to relationships. They need partners who can match their energy and give them space to be independent.',
        atWork: 'Natural leaders who thrive in fast-paced environments. They excel at starting projects and motivating teams, though they may struggle with long-term detailed work. Best in roles that allow for creativity and autonomy.',
        withMoney: 'Impulsive spenders who make quick financial decisions. They\'re willing to take risks for potential rewards but need to develop patience for long-term financial planning.',
        interpersonal: 'Direct communicators who value honesty. They can be inspiring leaders but may come across as too aggressive or insensitive. They form intense friendships quickly.',
        childhood: 'Energetic children who need lots of physical activity and mental stimulation. They often take on leadership roles among peers and may struggle with authority if not properly channeled.',
        underStress: 'Becomes more aggressive and impatient. May act impulsively or pick fights. Benefits from physical exercise and direct problem-solving approaches.'
      },
      famousPeople: [
        { name: 'Lady Gaga', profession: 'Singer/Actress', birthDate: 'March 28, 1986' },
        { name: 'Robert Downey Jr.', profession: 'Actor', birthDate: 'April 4, 1965' },
        { name: 'Maya Angelou', profession: 'Poet/Author', birthDate: 'April 4, 1928' },
        { name: 'Leonardo da Vinci', profession: 'Artist/Inventor', birthDate: 'April 15, 1452' },
        { name: 'Jackie Chan', profession: 'Actor/Martial Artist', birthDate: 'April 7, 1954' }
      ],
      compatibility: {
        bestMatches: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
        challenging: ['Cancer', 'Capricorn', 'Libra']
      },
      career: {
        suitedProfessions: ['Entrepreneur', 'Military Officer', 'Emergency Responder', 'Sales Manager', 'Athletic Coach', 'Surgeon', 'CEO'],
        workStyle: 'Prefers fast-paced, dynamic environments with clear goals and immediate results. Works best when given autonomy and leadership opportunities.',
        leadership: 'Natural leaders who inspire through enthusiasm and direct action. They excel at crisis management and initiating new projects but may struggle with long-term planning.'
      },
      faqs: [
        {
          question: 'What career suits an Aries best?',
          answer: 'Aries excel in leadership roles, entrepreneurship, emergency services, sports, and any fast-paced environment that rewards initiative and quick decision-making.'
        },
        {
          question: 'What is Aries\' biggest weakness?',
          answer: 'Impatience and impulsiveness. Aries often act before thinking things through, which can lead to mistakes or hurt feelings in relationships.'
        },
        {
          question: 'What signs are incompatible with Aries?',
          answer: 'Cancer (too emotional), Capricorn (too methodical), and Libra (too indecisive) can clash with Aries\' direct, fast-paced nature.'
        },
        {
          question: 'How does Aries handle money?',
          answer: 'Aries tend to be impulsive spenders who make quick financial decisions. They benefit from automatic savings plans and financial advisors who can help with long-term planning.'
        },
        {
          question: 'What makes Aries happy in relationships?',
          answer: 'Adventure, excitement, and a partner who gives them space to be independent while also being able to keep up with their energetic lifestyle.'
        },
        {
          question: 'How should you communicate with an Aries?',
          answer: 'Be direct, honest, and concise. Aries appreciate straightforward communication and dislike beating around the bush or passive-aggressive behavior.'
        }
      ]
    },
    leo: {
      name: 'Leo',
      chineseName: '狮子座',
      symbol: '♌',
      element: 'Fire',
      dates: 'July 23 - August 22',
      rulingPlanet: 'Sun',
      luckyColor: ['Gold', 'Orange', 'Yellow'],
      luckyNumber: [1, 3, 10, 19],
      keywords: ['Confident', 'Generous', 'Creative', 'Dramatic', 'Loyal'],
      personality: {
        positiveTraits: ['Natural performer and entertainer', 'Generous and warm-hearted', 'Confident and charismatic', 'Loyal and protective', 'Creative and artistic'],
        negativeTraits: ['Can be egotistical', 'Demands attention', 'Stubborn and inflexible', 'Can be dramatic', 'May struggle with criticism'],
        inLove: 'Leos love grandly and dramatically. They are generous, loyal partners who enjoy romance and showing off their relationships. They need appreciation and admiration from their partners.',
        atWork: 'Natural leaders who shine in creative fields and positions of authority. They motivate others through enthusiasm and charisma. They work best when their efforts are recognized and appreciated.',
        withMoney: 'Generous spenders who enjoy luxury and often spend on others. They have good instincts for investments but may overspend on status symbols. They work hard to maintain a comfortable lifestyle.',
        interpersonal: 'Warm, generous friends who love to entertain and be the center of attention. They are loyal and protective but can be demanding of attention and admiration.',
        childhood: 'Naturally confident children who love to perform and be the center of attention. They respond well to praise and recognition but may struggle if they feel overlooked.',
        underStress: 'Becomes more dramatic and attention-seeking. May become bossy or withdraw if they feel unappreciated. Benefits from creative outlets and positive recognition.'
      },
      famousPeople: [
        { name: 'Barack Obama', profession: 'Former President', birthDate: 'August 4, 1961' },
        { name: 'Madonna', profession: 'Singer/Performer', birthDate: 'August 16, 1958' },
        { name: 'Jennifer Lawrence', profession: 'Actress', birthDate: 'August 15, 1990' },
        { name: 'Andy Warhol', profession: 'Artist', birthDate: 'August 6, 1928' },
        { name: 'Mick Jagger', profession: 'Musician', birthDate: 'July 26, 1943' }
      ],
      compatibility: {
        bestMatches: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
        challenging: ['Taurus', 'Scorpio', 'Aquarius']
      },
      career: {
        suitedProfessions: ['Actor/Performer', 'CEO/Executive', 'Teacher', 'Event Planner', 'Artist', 'Politician', 'Marketing Director'],
        workStyle: 'Thrives in roles that allow for creativity, leadership, and recognition. Prefers collaborative environments where they can inspire and motivate others.',
        leadership: 'Charismatic leaders who inspire through enthusiasm and vision. They excel at motivating teams and creating positive work environments but need regular recognition.'
      },
      faqs: [
        {
          question: 'What career suits a Leo best?',
          answer: 'Leos excel in entertainment, leadership roles, teaching, politics, and any career that allows them to be creative, inspire others, and receive recognition for their work.'
        },
        {
          question: 'What is Leo\'s biggest weakness?',
          answer: 'Pride and need for constant attention. Leos can become hurt or difficult when they feel unappreciated or when their authority is questioned.'
        },
        {
          question: 'What signs are incompatible with Leo?',
          answer: 'Taurus (too stubborn), Scorpio (too intense and secretive), and Aquarius (too detached) can clash with Leo\'s need for warmth and admiration.'
        },
        {
          question: 'How does Leo handle criticism?',
          answer: 'Leos can be sensitive to criticism, especially if delivered harshly. They respond better to constructive feedback delivered with appreciation for their efforts.'
        },
        {
          question: 'What makes Leo happy in relationships?',
          answer: 'Admiration, loyalty, romance, and a partner who appreciates their generous nature and supports their ambitions and creative pursuits.'
        },
        {
          question: 'How can Leo manage their ego?',
          answer: 'By practicing humility, listening to others, sharing the spotlight, and remembering that true leadership involves lifting others up, not just themselves.'
        }
      ]
    },
    taurus: {
      name: 'Taurus',
      chineseName: '金牛座',
      symbol: '♉',
      element: 'Earth',
      dates: 'April 20 - May 20',
      rulingPlanet: 'Venus',
      luckyColor: ['Green', 'Pink', 'Blue'],
      luckyNumber: [2, 6, 9, 12],
      keywords: ['Reliable', 'Patient', 'Practical', 'Stubborn', 'Sensual'],
      personality: {
        positiveTraits: ['Reliable and trustworthy', 'Patient and determined', 'Practical and grounded', 'Loyal and devoted', 'Appreciates beauty and comfort'],
        negativeTraits: ['Stubborn and inflexible', 'Possessive', 'Materialistic tendencies', 'Resistant to change', 'Can be lazy'],
        inLove: 'Taurus individuals are loyal, devoted partners who value stability and security in relationships. They express love through physical affection and providing comfort.',
        atWork: 'Methodical workers who excel in structured environments. They prefer routine and are excellent at seeing projects through to completion.',
        withMoney: 'Conservative with finances, preferring security over risk. They work steadily toward financial stability and enjoy material comforts.',
        interpersonal: 'Calm, steady friends who are always there when needed. They prefer small, close-knit circles and value long-term relationships.',
        childhood: 'Calm children who enjoy routine and comfort. They may be slow to adapt to changes but are generally well-behaved and affectionate.',
        underStress: 'Becomes more stubborn and withdrawn. May overindulge in comfort foods or material pleasures as coping mechanisms.'
      },
      famousPeople: [
        { name: 'Adele', profession: 'Singer', birthDate: 'May 5, 1988' },
        { name: 'Queen Elizabeth II', profession: 'Former Monarch', birthDate: 'April 21, 1926' },
        { name: 'Mark Zuckerberg', profession: 'CEO of Meta', birthDate: 'May 14, 1984' },
        { name: 'Audrey Hepburn', profession: 'Actress', birthDate: 'May 4, 1929' },
        { name: 'David Beckham', profession: 'Former Footballer', birthDate: 'May 2, 1975' }
      ],
      compatibility: {
        bestMatches: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
        challenging: ['Leo', 'Aquarius', 'Scorpio']
      },
      career: {
        suitedProfessions: ['Banking', 'Real Estate', 'Chef', 'Artist', 'Accountant', 'Farmer', 'Interior Designer'],
        workStyle: 'Prefers stable, predictable work environments with clear expectations and steady progress toward goals.',
        leadership: 'Leads through reliability and consistency. Excellent at maintaining team morale and ensuring steady progress.'
      },
      faqs: [
        {
          question: 'What career suits a Taurus best?',
          answer: 'Taurus excels in careers requiring patience, reliability, and attention to detail such as banking, real estate, culinary arts, and creative fields like art or music.'
        },
        {
          question: 'What is Taurus\' biggest weakness?',
          answer: 'Stubbornness and resistance to change. Taurus can become too set in their ways and miss opportunities for growth.'
        },
        {
          question: 'What signs are incompatible with Taurus?',
          answer: 'Leo (too dramatic), Aquarius (too unpredictable), and Scorpio (too intense) can clash with Taurus\' need for stability and routine.'
        },
        {
          question: 'How does Taurus handle money?',
          answer: 'Taurus is naturally good with money, preferring to save and invest conservatively. They value financial security and work steadily toward it.'
        },
        {
          question: 'What makes Taurus happy in relationships?',
          answer: 'Stability, loyalty, physical affection, and a partner who appreciates the finer things in life and values commitment.'
        },
        {
          question: 'How can Taurus overcome stubbornness?',
          answer: 'By practicing flexibility, listening to other perspectives, and recognizing that change can lead to positive growth and new opportunities.'
        }
      ]
    },
    gemini: {
      name: 'Gemini',
      chineseName: '双子座',
      symbol: '♊',
      element: 'Air',
      dates: 'May 21 - June 20',
      rulingPlanet: 'Mercury',
      luckyColor: ['Yellow', 'Silver', 'Green'],
      luckyNumber: [5, 7, 14, 23],
      keywords: ['Curious', 'Adaptable', 'Witty', 'Restless', 'Communicative'],
      personality: {
        positiveTraits: ['Quick-witted and intelligent', 'Adaptable and flexible', 'Excellent communicators', 'Curious and eager to learn', 'Charming and sociable'],
        negativeTraits: ['Inconsistent and indecisive', 'Superficial at times', 'Restless and impatient', 'Can be gossipy', 'Difficulty with commitment'],
        inLove: 'Geminis need mental stimulation and variety in relationships. They are flirtatious and charming but need partners who can keep up with their wit.',
        atWork: 'Excel in fast-paced environments requiring communication and quick thinking. They prefer variety and may struggle with repetitive tasks.',
        withMoney: 'Impulsive spenders who may make quick financial decisions. They benefit from diversified investments and financial planning.',
        interpersonal: 'Social butterflies who enjoy meeting new people and engaging in stimulating conversations. They maintain large social networks.',
        childhood: 'Highly curious children who ask many questions and need mental stimulation. They may struggle with focus but are quick learners.',
        underStress: 'Becomes scattered and anxious. May talk excessively or become indecisive. Benefits from organizing thoughts and prioritizing.'
      },
      famousPeople: [
        { name: 'Marilyn Monroe', profession: 'Actress', birthDate: 'June 1, 1926' },
        { name: 'Johnny Depp', profession: 'Actor', birthDate: 'June 9, 1963' },
        { name: 'Angelina Jolie', profession: 'Actress/Humanitarian', birthDate: 'June 4, 1975' },
        { name: 'Donald Trump', profession: 'Former President', birthDate: 'June 14, 1946' },
        { name: 'Kanye West', profession: 'Musician/Designer', birthDate: 'June 8, 1977' }
      ],
      compatibility: {
        bestMatches: ['Libra', 'Aquarius', 'Aries', 'Leo'],
        challenging: ['Virgo', 'Pisces', 'Sagittarius']
      },
      career: {
        suitedProfessions: ['Journalist', 'Teacher', 'Sales', 'Writer', 'Translator', 'Social Media Manager', 'Public Relations'],
        workStyle: 'Thrives in dynamic environments with variety and social interaction. Needs intellectual challenges and freedom to express ideas.',
        leadership: 'Leads through communication and inspiration. Excellent at networking and bringing different groups together.'
      },
      faqs: [
        {
          question: 'What career suits a Gemini best?',
          answer: 'Geminis excel in communication-based careers like journalism, teaching, sales, writing, and any field requiring quick thinking and social interaction.'
        },
        {
          question: 'What is Gemini\'s biggest weakness?',
          answer: 'Inconsistency and difficulty with follow-through. Geminis may start many projects but struggle to complete them.'
        },
        {
          question: 'What signs are incompatible with Gemini?',
          answer: 'Virgo (too detail-oriented), Pisces (too emotional), and Sagittarius (too blunt) can clash with Gemini\'s need for mental stimulation.'
        },
        {
          question: 'How does Gemini handle relationships?',
          answer: 'Geminis need mental connection and variety. They may struggle with routine but thrive with partners who engage their intellect.'
        },
        {
          question: 'What makes Gemini happy?',
          answer: 'Learning new things, engaging conversations, variety in activities, and social connections with diverse groups of people.'
        },
        {
          question: 'How can Gemini improve focus?',
          answer: 'By setting clear priorities, breaking tasks into smaller steps, and using their natural curiosity to maintain interest in projects.'
        }
      ]
    },
    cancer: {
      name: 'Cancer',
      chineseName: '巨蟹座',
      symbol: '♋',
      element: 'Water',
      dates: 'June 21 - July 22',
      rulingPlanet: 'Moon',
      luckyColor: ['White', 'Silver', 'Sea Green'],
      luckyNumber: [2, 7, 11, 16],
      keywords: ['Nurturing', 'Emotional', 'Protective', 'Intuitive', 'Traditional'],
      personality: {
        positiveTraits: ['Deeply caring and nurturing', 'Highly intuitive', 'Loyal and protective', 'Emotionally intelligent', 'Strong family values'],
        negativeTraits: ['Overly sensitive', 'Moody and unpredictable', 'Can be clingy', 'Holds grudges', 'Prone to self-pity'],
        inLove: 'Cancers are devoted, nurturing partners who seek emotional security. They need partners who appreciate their caring nature and provide stability.',
        atWork: 'Excel in caregiving professions and team environments. They work best when they feel emotionally connected to their work and colleagues.',
        withMoney: 'Conservative savers who prioritize financial security for their family. They may sacrifice personal desires for family needs.',
        interpersonal: 'Deeply loyal friends who remember birthdays and special occasions. They create warm, welcoming environments for loved ones.',
        childhood: 'Sensitive children who need emotional security and gentle guidance. They are often close to family and may be shy around strangers.',
        underStress: 'Withdraws emotionally and may become overly protective or defensive. Benefits from quiet time and emotional support.'
      },
      famousPeople: [
        { name: 'Princess Diana', profession: 'Royal/Humanitarian', birthDate: 'July 1, 1961' },
        { name: 'Tom Hanks', profession: 'Actor', birthDate: 'July 9, 1956' },
        { name: 'Selena Gomez', profession: 'Singer/Actress', birthDate: 'July 22, 1992' },
        { name: 'Robin Williams', profession: 'Actor/Comedian', birthDate: 'July 11, 1951' },
        { name: 'Frida Kahlo', profession: 'Artist', birthDate: 'July 6, 1907' }
      ],
      compatibility: {
        bestMatches: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
        challenging: ['Aries', 'Libra', 'Capricorn']
      },
      career: {
        suitedProfessions: ['Nurse', 'Teacher', 'Social Worker', 'Chef', 'Therapist', 'Child Care', 'Real Estate'],
        workStyle: 'Prefers supportive, family-like work environments. Excels when they can help others and feel emotionally invested.',
        leadership: 'Leads with empathy and creates supportive team environments. Excellent at understanding and meeting team members\' needs.'
      },
      faqs: [
        {
          question: 'What career suits a Cancer best?',
          answer: 'Cancers excel in nurturing professions like healthcare, education, social work, and any career where they can care for and help others.'
        },
        {
          question: 'What is Cancer\'s biggest weakness?',
          answer: 'Oversensitivity and tendency to take things personally. Cancers may retreat into their shell when hurt instead of addressing issues.'
        },
        {
          question: 'What signs are incompatible with Cancer?',
          answer: 'Aries (too aggressive), Libra (too detached), and Capricorn (too business-focused) can clash with Cancer\'s emotional needs.'
        },
        {
          question: 'How does Cancer handle emotions?',
          answer: 'Cancers feel deeply and may need time to process emotions. They benefit from supportive environments and understanding partners.'
        },
        {
          question: 'What makes Cancer happy in relationships?',
          answer: 'Emotional security, loyalty, family time, and partners who appreciate their nurturing nature and need for deep connection.'
        },
        {
          question: 'How can Cancer build emotional resilience?',
          answer: 'By developing healthy boundaries, practicing self-care, and learning to communicate feelings directly rather than withdrawing.'
        }
      ]
    },
    virgo: {
      name: 'Virgo',
      chineseName: '处女座',
      symbol: '♍',
      element: 'Earth',
      dates: 'August 23 - September 22',
      rulingPlanet: 'Mercury',
      luckyColor: ['Navy Blue', 'Grey', 'Brown'],
      luckyNumber: [3, 6, 7, 13],
      keywords: ['Analytical', 'Perfectionist', 'Helpful', 'Practical', 'Detail-oriented'],
      personality: {
        positiveTraits: ['Highly analytical and organized', 'Helpful and service-oriented', 'Reliable and hardworking', 'Practical problem-solvers', 'Health-conscious'],
        negativeTraits: ['Overly critical', 'Perfectionist to a fault', 'Worries excessively', 'Can be judgmental', 'Difficulty relaxing'],
        inLove: 'Virgos show love through acts of service and attention to their partner\'s needs. They seek stable, practical relationships.',
        atWork: 'Excel in detail-oriented work requiring precision and analysis. They are excellent team players who improve processes.',
        withMoney: 'Careful budgeters who research before making purchases. They prefer practical investments and financial security.',
        interpersonal: 'Helpful friends who offer practical advice and support. They may struggle with criticism but are deeply caring.',
        childhood: 'Responsible children who enjoy helping and may worry about doing things perfectly. They thrive with structure and clear expectations.',
        underStress: 'Becomes more critical and anxious. May obsess over details or become overly focused on health concerns.'
      },
      famousPeople: [
        { name: 'Beyoncé', profession: 'Singer/Performer', birthDate: 'September 4, 1981' },
        { name: 'Warren Buffett', profession: 'Investor', birthDate: 'August 30, 1930' },
        { name: 'Michael Jackson', profession: 'Musician', birthDate: 'August 29, 1958' },
        { name: 'Mother Teresa', profession: 'Humanitarian', birthDate: 'August 26, 1910' },
        { name: 'Keanu Reeves', profession: 'Actor', birthDate: 'September 2, 1964' }
      ],
      compatibility: {
        bestMatches: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
        challenging: ['Gemini', 'Sagittarius', 'Pisces']
      },
      career: {
        suitedProfessions: ['Doctor', 'Analyst', 'Editor', 'Accountant', 'Researcher', 'Librarian', 'Quality Control'],
        workStyle: 'Thrives in organized environments with clear procedures. Excels at improving systems and maintaining high standards.',
        leadership: 'Leads by example and attention to detail. Creates efficient, well-organized teams focused on quality results.'
      },
      faqs: [
        {
          question: 'What career suits a Virgo best?',
          answer: 'Virgos excel in analytical, detail-oriented careers like healthcare, research, editing, accounting, and any field requiring precision and organization.'
        },
        {
          question: 'What is Virgo\'s biggest weakness?',
          answer: 'Perfectionism and excessive criticism. Virgos may become paralyzed by their need for everything to be perfect.'
        },
        {
          question: 'What signs are incompatible with Virgo?',
          answer: 'Gemini (too scattered), Sagittarius (too careless), and Pisces (too dreamy) can clash with Virgo\'s need for order and precision.'
        },
        {
          question: 'How does Virgo handle criticism?',
          answer: 'Virgos are sensitive to criticism despite being critical themselves. They respond better to constructive feedback delivered kindly.'
        },
        {
          question: 'What makes Virgo happy at work?',
          answer: 'Clear expectations, organized systems, opportunities to help others, and recognition for their attention to detail and reliability.'
        },
        {
          question: 'How can Virgo relax and reduce anxiety?',
          answer: 'By practicing mindfulness, setting realistic standards, and remembering that perfection isn\'t always necessary or healthy.'
        }
      ]
    },
    libra: {
      name: 'Libra',
      chineseName: '天秤座',
      symbol: '♎',
      element: 'Air',
      dates: 'September 23 - October 22',
      rulingPlanet: 'Venus',
      luckyColor: ['Pink', 'Blue', 'Green'],
      luckyNumber: [4, 6, 13, 15],
      keywords: ['Diplomatic', 'Harmonious', 'Artistic', 'Indecisive', 'Social'],
      personality: {
        positiveTraits: ['Natural diplomats and peacemakers', 'Appreciate beauty and harmony', 'Fair-minded and just', 'Charming and sociable', 'Excellent mediators'],
        negativeTraits: ['Indecisive and hesitant', 'Avoids confrontation', 'Can be superficial', 'People-pleasing tendencies', 'Difficulty being alone'],
        inLove: 'Libras are romantic idealists who seek harmony and partnership. They need balance and mutual respect in relationships.',
        atWork: 'Excel in collaborative environments and roles requiring diplomacy. They work well in teams and prefer harmonious workplaces.',
        withMoney: 'May struggle with financial decisions due to indecisiveness. They enjoy luxury but need help with practical budgeting.',
        interpersonal: 'Natural hosts who bring people together. They avoid conflict but excel at helping others resolve disagreements.',
        childhood: 'Social children who get along well with others. They may struggle with making decisions and need gentle guidance.',
        underStress: 'Becomes more indecisive and may seek excessive validation from others. Benefits from structured decision-making processes.'
      },
      famousPeople: [
        { name: 'Will Smith', profession: 'Actor', birthDate: 'September 25, 1968' },
        { name: 'Kim Kardashian', profession: 'Media Personality', birthDate: 'October 21, 1980' },
        { name: 'John Lennon', profession: 'Musician', birthDate: 'October 9, 1940' },
        { name: 'Mahatma Gandhi', profession: 'Leader/Activist', birthDate: 'October 2, 1869' },
        { name: 'Serena Williams', profession: 'Tennis Player', birthDate: 'September 26, 1981' }
      ],
      compatibility: {
        bestMatches: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
        challenging: ['Cancer', 'Capricorn', 'Aries']
      },
      career: {
        suitedProfessions: ['Lawyer', 'Diplomat', 'Artist', 'Designer', 'Counselor', 'Event Planner', 'Human Resources'],
        workStyle: 'Prefers collaborative, harmonious work environments. Excels in roles requiring aesthetic sense or conflict resolution.',
        leadership: 'Leads through consensus-building and diplomacy. Creates balanced teams and ensures everyone\'s voice is heard.'
      },
      faqs: [
        {
          question: 'What career suits a Libra best?',
          answer: 'Libras excel in careers requiring diplomacy, aesthetics, or mediation such as law, design, counseling, and human resources.'
        },
        {
          question: 'What is Libra\'s biggest weakness?',
          answer: 'Indecisiveness and conflict avoidance. Libras may struggle to make decisions or address problems directly.'
        },
        {
          question: 'What signs are incompatible with Libra?',
          answer: 'Cancer (too emotional), Capricorn (too serious), and Aries (too aggressive) can clash with Libra\'s need for harmony.'
        },
        {
          question: 'How does Libra handle conflict?',
          answer: 'Libras prefer to avoid conflict but are excellent mediators for others. They need to learn to address their own issues directly.'
        },
        {
          question: 'What makes Libra happy in relationships?',
          answer: 'Harmony, mutual respect, romance, and partners who appreciate beauty and culture as much as they do.'
        },
        {
          question: 'How can Libra become more decisive?',
          answer: 'By setting deadlines for decisions, listing pros and cons, and remembering that perfect decisions don\'t always exist.'
        }
      ]
    },
    scorpio: {
      name: 'Scorpio',
      chineseName: '天蝎座',
      symbol: '♏',
      element: 'Water',
      dates: 'October 23 - November 21',
      rulingPlanet: 'Mars/Pluto',
      luckyColor: ['Deep Red', 'Black', 'Maroon'],
      luckyNumber: [8, 11, 18, 22],
      keywords: ['Intense', 'Passionate', 'Mysterious', 'Transformative', 'Powerful'],
      personality: {
        positiveTraits: ['Deeply passionate and intense', 'Excellent investigators', 'Loyal and devoted', 'Transformative and healing', 'Strong intuition'],
        negativeTraits: ['Can be jealous and possessive', 'Holds grudges', 'Secretive and mysterious', 'Can be manipulative', 'All-or-nothing thinking'],
        inLove: 'Scorpios love deeply and completely. They seek intense, transformative relationships and absolute loyalty from partners.',
        atWork: 'Excel in research, investigation, and transformative work. They prefer depth over breadth and can handle difficult situations.',
        withMoney: 'Strategic with finances and often have good investment instincts. They research thoroughly before making financial decisions.',
        interpersonal: 'Intense friends who form deep, lasting bonds. They are fiercely loyal but expect the same in return.',
        childhood: 'Intense children who feel things deeply. They may be drawn to mysteries and need trust and emotional security.',
        underStress: 'May become more secretive or controlling. Can become fixated on problems and benefit from healthy outlets for intensity.'
      },
      famousPeople: [
        { name: 'Leonardo DiCaprio', profession: 'Actor', birthDate: 'November 11, 1974' },
        { name: 'Pablo Picasso', profession: 'Artist', birthDate: 'October 25, 1881' },
        { name: 'Hillary Clinton', profession: 'Politician', birthDate: 'October 26, 1947' },
        { name: 'Bill Gates', profession: 'Entrepreneur', birthDate: 'October 28, 1955' },
        { name: 'Katy Perry', profession: 'Singer', birthDate: 'October 25, 1984' }
      ],
      compatibility: {
        bestMatches: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
        challenging: ['Leo', 'Aquarius', 'Taurus']
      },
      career: {
        suitedProfessions: ['Detective', 'Psychologist', 'Surgeon', 'Researcher', 'Investigative Journalist', 'Therapist', 'Forensics'],
        workStyle: 'Prefers depth and intensity in work. Excels at uncovering hidden information and transforming difficult situations.',
        leadership: 'Leads through intensity and determination. Can motivate others through crisis and transformation.'
      },
      faqs: [
        {
          question: 'What career suits a Scorpio best?',
          answer: 'Scorpios excel in investigative, transformative careers like psychology, detective work, research, surgery, and any field requiring depth and intensity.'
        },
        {
          question: 'What is Scorpio\'s biggest weakness?',
          answer: 'Jealousy and holding grudges. Scorpios may become obsessive or vindictive when hurt or betrayed.'
        },
        {
          question: 'What signs are incompatible with Scorpio?',
          answer: 'Leo (too attention-seeking), Aquarius (too detached), and Taurus (too stubborn) can clash with Scorpio\'s intensity.'
        },
        {
          question: 'How does Scorpio handle betrayal?',
          answer: 'Scorpios take betrayal very seriously and may cut people off completely. They need time to process and may hold grudges.'
        },
        {
          question: 'What makes Scorpio happy in relationships?',
          answer: 'Deep emotional connection, loyalty, honesty, and partners who can handle their intensity and need for intimacy.'
        },
        {
          question: 'How can Scorpio learn to forgive?',
          answer: 'By understanding that holding grudges hurts them more than others, and that forgiveness is a form of personal power and freedom.'
        }
      ]
    },
    sagittarius: {
      name: 'Sagittarius',
      chineseName: '射手座',
      symbol: '♐',
      element: 'Fire',
      dates: 'November 22 - December 21',
      rulingPlanet: 'Jupiter',
      luckyColor: ['Purple', 'Turquoise', 'Orange'],
      luckyNumber: [9, 12, 21, 24],
      keywords: ['Adventurous', 'Optimistic', 'Philosophical', 'Freedom-loving', 'Honest'],
      personality: {
        positiveTraits: ['Adventurous and freedom-loving', 'Optimistic and enthusiastic', 'Philosophical and wise', 'Honest and direct', 'Great sense of humor'],
        negativeTraits: ['Can be tactless', 'Restless and impatient', 'Overly blunt', 'Commitment-phobic', 'May be irresponsible'],
        inLove: 'Sagittarians need freedom and adventure in relationships. They are honest partners who value intellectual connection and shared adventures.',
        atWork: 'Excel in careers involving travel, education, or philosophy. They need variety and freedom to explore new ideas.',
        withMoney: 'Optimistic about finances but may be careless with money. They prefer to spend on experiences rather than material things.',
        interpersonal: 'Fun-loving friends who bring adventure and laughter. They are honest but may sometimes be too blunt.',
        childhood: 'Curious children who love to explore and learn. They need freedom to roam and may struggle with too many restrictions.',
        underStress: 'May become more restless or escape into fantasies. Benefits from physical activity and new experiences.'
      },
      famousPeople: [
        { name: 'Taylor Swift', profession: 'Singer', birthDate: 'December 13, 1989' },
        { name: 'Brad Pitt', profession: 'Actor', birthDate: 'December 18, 1963' },
        { name: 'Winston Churchill', profession: 'Prime Minister', birthDate: 'November 30, 1874' },
        { name: 'Walt Disney', profession: 'Entrepreneur', birthDate: 'December 5, 1901' },
        { name: 'Jim Morrison', profession: 'Musician', birthDate: 'December 8, 1943' }
      ],
      compatibility: {
        bestMatches: ['Aries', 'Leo', 'Libra', 'Aquarius'],
        challenging: ['Virgo', 'Pisces', 'Gemini']
      },
      career: {
        suitedProfessions: ['Travel Writer', 'Professor', 'Foreign Correspondent', 'Tour Guide', 'Philosopher', 'Adventure Guide', 'Publisher'],
        workStyle: 'Needs variety, freedom, and opportunities to learn. Prefers big-picture thinking over detailed work.',
        leadership: 'Leads through vision and inspiration. Excellent at motivating others toward long-term goals and adventures.'
      },
      faqs: [
        {
          question: 'What career suits a Sagittarius best?',
          answer: 'Sagittarians excel in careers involving travel, education, philosophy, or adventure such as teaching, travel writing, and international business.'
        },
        {
          question: 'What is Sagittarius\' biggest weakness?',
          answer: 'Tactlessness and difficulty with commitment. Sagittarians may hurt feelings with their blunt honesty or struggle to stick with long-term plans.'
        },
        {
          question: 'What signs are incompatible with Sagittarius?',
          answer: 'Virgo (too detail-oriented), Pisces (too sensitive), and Gemini (too scattered) can clash with Sagittarius\' need for freedom and truth.'
        },
        {
          question: 'How does Sagittarius handle routine?',
          answer: 'Sagittarians struggle with routine and need variety. They benefit from flexible schedules and opportunities for new experiences.'
        },
        {
          question: 'What makes Sagittarius happy in relationships?',
          answer: 'Freedom, adventure, intellectual stimulation, and partners who share their love of exploration and learning.'
        },
        {
          question: 'How can Sagittarius improve their tact?',
          answer: 'By thinking before speaking, considering others\' feelings, and learning that honesty doesn\'t always require brutal directness.'
        }
      ]
    },
    capricorn: {
      name: 'Capricorn',
      chineseName: '摩羯座',
      symbol: '♑',
      element: 'Earth',
      dates: 'December 22 - January 19',
      rulingPlanet: 'Saturn',
      luckyColor: ['Black', 'Brown', 'Dark Green'],
      luckyNumber: [6, 8, 10, 26],
      keywords: ['Ambitious', 'Disciplined', 'Responsible', 'Traditional', 'Persistent'],
      personality: {
        positiveTraits: ['Highly ambitious and goal-oriented', 'Disciplined and responsible', 'Practical and realistic', 'Loyal and dependable', 'Natural leaders'],
        negativeTraits: ['Can be pessimistic', 'Overly serious', 'Stubborn and rigid', 'May prioritize work over relationships', 'Can be controlling'],
        inLove: 'Capricorns are traditional, loyal partners who take relationships seriously. They may be slow to open up but are deeply committed.',
        atWork: 'Natural leaders who excel in structured environments. They work steadily toward long-term goals and build successful careers.',
        withMoney: 'Excellent with money management and long-term financial planning. They prefer secure investments and building wealth gradually.',
        interpersonal: 'Reliable friends who can be counted on in difficult times. They may seem serious but have a dry sense of humor.',
        childhood: 'Mature children who take on responsibility early. They may seem older than their years and prefer adult company.',
        underStress: 'Becomes more rigid and controlling. May work excessively or become pessimistic about the future.'
      },
      famousPeople: [
        { name: 'Michelle Obama', profession: 'Former First Lady', birthDate: 'January 17, 1964' },
        { name: 'Martin Luther King Jr.', profession: 'Civil Rights Leader', birthDate: 'January 15, 1929' },
        { name: 'Stephen Hawking', profession: 'Physicist', birthDate: 'January 8, 1942' },
        { name: 'Dolly Parton', profession: 'Singer/Businesswoman', birthDate: 'January 19, 1946' },
        { name: 'Muhammad Ali', profession: 'Boxer', birthDate: 'January 17, 1942' }
      ],
      compatibility: {
        bestMatches: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
        challenging: ['Aries', 'Cancer', 'Libra']
      },
      career: {
        suitedProfessions: ['CEO', 'Government Official', 'Engineer', 'Architect', 'Judge', 'Financial Advisor', 'Project Manager'],
        workStyle: 'Thrives in hierarchical organizations with clear advancement paths. Excellent at long-term planning and execution.',
        leadership: 'Leads through authority and expertise. Creates structured, efficient organizations focused on long-term success.'
      },
      faqs: [
        {
          question: 'What career suits a Capricorn best?',
          answer: 'Capricorns excel in leadership roles, business, government, engineering, and any career with clear advancement opportunities and long-term goals.'
        },
        {
          question: 'What is Capricorn\'s biggest weakness?',
          answer: 'Being overly serious and prioritizing work over personal relationships. Capricorns may struggle to relax and enjoy life.'
        },
        {
          question: 'What signs are incompatible with Capricorn?',
          answer: 'Aries (too impulsive), Cancer (too emotional), and Libra (too indecisive) can clash with Capricorn\'s serious, goal-oriented nature.'
        },
        {
          question: 'How does Capricorn achieve work-life balance?',
          answer: 'Capricorns need to schedule personal time like work appointments and remember that relationships and fun are also important goals.'
        },
        {
          question: 'What makes Capricorn happy in relationships?',
          answer: 'Stability, loyalty, shared goals, and partners who understand their ambition and support their long-term plans.'
        },
        {
          question: 'How can Capricorn learn to relax?',
          answer: 'By scheduling downtime, practicing mindfulness, and remembering that rest and play are essential for long-term success.'
        }
      ]
    },
    aquarius: {
      name: 'Aquarius',
      chineseName: '水瓶座',
      symbol: '♒',
      element: 'Air',
      dates: 'January 20 - February 18',
      rulingPlanet: 'Uranus/Saturn',
      luckyColor: ['Electric Blue', 'Silver', 'Violet'],
      luckyNumber: [4, 11, 22, 29],
      keywords: ['Independent', 'Innovative', 'Humanitarian', 'Eccentric', 'Progressive'],
      personality: {
        positiveTraits: ['Independent and original thinkers', 'Humanitarian and progressive', 'Innovative and inventive', 'Friendly and social', 'Intellectually curious'],
        negativeTraits: ['Can be emotionally detached', 'Unpredictable and rebellious', 'May be too idealistic', 'Struggles with routine', 'Can be aloof'],
        inLove: 'Aquarians need intellectual connection and friendship in relationships. They value independence and may struggle with traditional romantic expectations.',
        atWork: 'Excel in innovative, humanitarian work. They prefer flexible environments and work best when pursuing causes they believe in.',
        withMoney: 'May be careless with money but have innovative ideas for earning. They prefer to spend on technology and humanitarian causes.',
        interpersonal: 'Friendly with many but close to few. They value intellectual connection and shared ideals in friendships.',
        childhood: 'Unique children who may feel different from peers. They need acceptance for their individuality and intellectual stimulation.',
        underStress: 'Becomes more detached and rebellious. May isolate themselves or become more unpredictable in behavior.'
      },
      famousPeople: [
        { name: 'Oprah Winfrey', profession: 'Media Mogul', birthDate: 'January 29, 1954' },
        { name: 'Ellen DeGeneres', profession: 'TV Host', birthDate: 'January 26, 1958' },
        { name: 'Abraham Lincoln', profession: 'Former President', birthDate: 'February 12, 1809' },
        { name: 'Bob Marley', profession: 'Musician', birthDate: 'February 6, 1945' },
        { name: 'Thomas Edison', profession: 'Inventor', birthDate: 'February 11, 1847' }
      ],
      compatibility: {
        bestMatches: ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
        challenging: ['Taurus', 'Scorpio', 'Cancer']
      },
      career: {
        suitedProfessions: ['Social Worker', 'Inventor', 'Scientist', 'Technology Developer', 'Activist', 'Humanitarian', 'Researcher'],
        workStyle: 'Needs freedom and flexibility to pursue innovative ideas. Works best in progressive, humanitarian organizations.',
        leadership: 'Leads through vision and innovation. Excellent at inspiring others toward progressive goals and social change.'
      },
      faqs: [
        {
          question: 'What career suits an Aquarius best?',
          answer: 'Aquarians excel in innovative, humanitarian careers like technology, social work, science, and any field focused on progressive change.'
        },
        {
          question: 'What is Aquarius\' biggest weakness?',
          answer: 'Emotional detachment and unpredictability. Aquarians may struggle to connect emotionally or may be too rebellious against authority.'
        },
        {
          question: 'What signs are incompatible with Aquarius?',
          answer: 'Taurus (too traditional), Scorpio (too intense), and Cancer (too emotional) can clash with Aquarius\' need for independence.'
        },
        {
          question: 'How does Aquarius handle emotions?',
          answer: 'Aquarians prefer to intellectualize emotions rather than feel them. They need to learn to connect with their emotional side.'
        },
        {
          question: 'What makes Aquarius happy in relationships?',
          answer: 'Friendship, intellectual connection, independence, and partners who share their humanitarian values and respect their uniqueness.'
        },
        {
          question: 'How can Aquarius become more emotionally connected?',
          answer: 'By practicing empathy, sharing feelings with trusted friends, and remembering that emotions are as important as intellect.'
        }
      ]
    },
    pisces: {
      name: 'Pisces',
      chineseName: '双鱼座',
      symbol: '♓',
      element: 'Water',
      dates: 'February 19 - March 20',
      rulingPlanet: 'Neptune/Jupiter',
      luckyColor: ['Sea Green', 'Lavender', 'White'],
      luckyNumber: [7, 12, 16, 21],
      keywords: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy', 'Sensitive'],
      personality: {
        positiveTraits: ['Deeply compassionate and empathetic', 'Highly intuitive and psychic', 'Artistic and creative', 'Adaptable and flowing', 'Spiritual and wise'],
        negativeTraits: ['Overly sensitive', 'Prone to escapism', 'Can be unrealistic', 'May be too trusting', 'Difficulty with boundaries'],
        inLove: 'Pisceans are romantic dreamers who give their all in love. They need emotional depth and spiritual connection in relationships.',
        atWork: 'Excel in creative, healing, or spiritual work. They work best in supportive environments that value their intuitive contributions.',
        withMoney: 'May be impractical with money but generous with others. They benefit from financial planning and budgeting assistance.',
        interpersonal: 'Deeply empathetic friends who absorb others\' emotions. They are supportive but may need help setting boundaries.',
        childhood: 'Sensitive, imaginative children who may seem otherworldly. They need emotional support and creative outlets.',
        underStress: 'May escape into fantasy or become overwhelmed by emotions. Benefits from creative expression and spiritual practices.'
      },
      famousPeople: [
        { name: 'Albert Einstein', profession: 'Physicist', birthDate: 'March 14, 1879' },
        { name: 'Rihanna', profession: 'Singer/Businesswoman', birthDate: 'February 20, 1988' },
        { name: 'Steve Jobs', profession: 'Entrepreneur', birthDate: 'February 24, 1955' },
        { name: 'Kurt Cobain', profession: 'Musician', birthDate: 'February 20, 1967' },
        { name: 'Elizabeth Taylor', profession: 'Actress', birthDate: 'February 27, 1932' }
      ],
      compatibility: {
        bestMatches: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
        challenging: ['Gemini', 'Sagittarius', 'Virgo']
      },
      career: {
        suitedProfessions: ['Artist', 'Therapist', 'Musician', 'Healer', 'Social Worker', 'Photographer', 'Spiritual Counselor'],
        workStyle: 'Needs emotionally fulfilling work that helps others. Thrives in creative, supportive environments with flexible schedules.',
        leadership: 'Leads through compassion and intuition. Excellent at understanding team emotions and creating supportive environments.'
      },
      faqs: [
        {
          question: 'What career suits a Pisces best?',
          answer: 'Pisceans excel in creative, healing, or spiritual careers like art, therapy, music, social work, and any field involving compassion and intuition.'
        },
        {
          question: 'What is Pisces\' biggest weakness?',
          answer: 'Escapism and poor boundaries. Pisceans may avoid reality or absorb too much from others, leading to emotional overwhelm.'
        },
        {
          question: 'What signs are incompatible with Pisces?',
          answer: 'Gemini (too superficial), Sagittarius (too blunt), and Virgo (too critical) can clash with Pisces\' sensitive, dreamy nature.'
        },
        {
          question: 'How does Pisces handle practical matters?',
          answer: 'Pisceans may struggle with practical details and benefit from partners or friends who can help with organization and planning.'
        },
        {
          question: 'What makes Pisces happy in relationships?',
          answer: 'Emotional depth, spiritual connection, creativity, and partners who understand their sensitive nature and need for compassion.'
        },
        {
          question: 'How can Pisces develop better boundaries?',
          answer: 'By learning to say no, practicing self-care, and remembering that helping others shouldn\'t come at the expense of their own well-being.'
        }
      ]
    }
  };

  static getEnhancedZodiacData(sign: string): EnhancedZodiacSign | null {
    return this.enhancedZodiacData[sign.toLowerCase()] || null;
  }

  static async getDailyHoroscope(sign: string, date?: string): Promise<HoroscopeData> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Simulate AI-generated content with realistic delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const horoscopes = this.generateDailyHoroscope(sign, targetDate);
    return horoscopes;
  }

  static async getMonthlyForecast(sign: string, month?: number, year?: number): Promise<MonthlyForecast> {
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return this.generateMonthlyForecast(sign, targetMonth, targetYear);
  }

  static async getYearlyForecast(sign: string, year?: number): Promise<YearlyForecast> {
    const targetYear = year || new Date().getFullYear();
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return this.generateYearlyForecast(sign, targetYear);
  }

  static getAllEnhancedSigns(): string[] {
    return Object.keys(this.enhancedZodiacData);
  }

  // Private helper methods for generating content
  private static generateDailyHoroscope(sign: string, date: string): HoroscopeData {
    const predictions = {
      overall: [
        'Today brings a perfect balance of opportunity and challenge for you.',
        'The cosmic energies align in your favor, bringing unexpected blessings.',
        'A day of transformation awaits as you embrace new possibilities.',
        'Trust your intuition today as it guides you toward your highest good.'
      ],
      love: [
        'Romance takes center stage with heartwarming surprises.',
        'Communication with loved ones flows more smoothly than usual.',
        'Single? An unexpected encounter could spark something beautiful.',
        'Express your feelings openly - vulnerability leads to deeper connections.'
      ],
      career: [
        'Professional opportunities present themselves through networking.',
        'Your creative solutions impress colleagues and superiors.',
        'Focus on collaboration rather than competition today.',
        'A work project reaches a significant milestone.'
      ],
      wealth: [
        'Financial planning efforts begin to show positive results.',
        'An unexpected opportunity for income presents itself.',
        'Wise spending decisions made today will benefit you long-term.',
        'Review your budget and make necessary adjustments.'
      ],
      health: [
        'Your energy levels are higher than usual - make the most of it.',
        'Focus on stress reduction and mindful breathing today.',
        'Physical activity will boost both mood and vitality.',
        'Pay attention to your body\'s signals and rest when needed.'
      ]
    };

    const doToday = [
      'Practice gratitude for three things',
      'Reach out to an old friend',
      'Take a short walk in nature',
      'Try something creative',
      'Help someone in need'
    ];

    const avoidToday = [
      'Making impulsive financial decisions',
      'Engaging in negative gossip',
      'Procrastinating on important tasks',
      'Overthinking past mistakes',
      'Isolating yourself from others'
    ];

    return {
      date,
      sign,
      overall: {
        prediction: predictions.overall[Math.floor(Math.random() * predictions.overall.length)],
        score: Math.floor(Math.random() * 30) + 70,
        luckyTip: doToday[Math.floor(Math.random() * doToday.length)]
      },
      love: {
        prediction: predictions.love[Math.floor(Math.random() * predictions.love.length)],
        score: Math.floor(Math.random() * 40) + 60,
        advice: 'Be open and honest in your communications.'
      },
      career: {
        prediction: predictions.career[Math.floor(Math.random() * predictions.career.length)],
        score: Math.floor(Math.random() * 35) + 65,
        advice: 'Focus on teamwork and collaboration.'
      },
      wealth: {
        prediction: predictions.wealth[Math.floor(Math.random() * predictions.wealth.length)],
        score: Math.floor(Math.random() * 30) + 70,
        advice: 'Consider long-term financial goals.'
      },
      health: {
        prediction: predictions.health[Math.floor(Math.random() * predictions.health.length)],
        score: Math.floor(Math.random() * 25) + 75,
        advice: 'Maintain a balanced lifestyle.'
      },
      doToday: doToday.slice(0, 3),
      avoidToday: avoidToday.slice(0, 3)
    };
  }

  private static generateMonthlyForecast(sign: string, month: number, year: number): MonthlyForecast {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    return {
      month: monthNames[month - 1],
      year,
      sign,
      overview: `This month brings significant opportunities for personal growth and positive changes. The planetary alignments favor ${sign} individuals, creating favorable conditions for both personal and professional advancement.`,
      keyThemes: ['Personal transformation', 'Career advancement', 'Relationship harmony', 'Financial stability'],
      importantDates: [`${month}/7`, `${month}/15`, `${month}/23`],
      advice: 'Focus on clear communication and stay open to unexpected opportunities that align with your long-term goals.',
      loveInsights: 'Romantic energy peaks mid-month. Existing relationships deepen while singles may find meaningful connections.',
      careerHighlights: 'Professional recognition and new opportunities emerge. Network actively and showcase your unique talents.',
      healthFocus: 'Maintain balance between work and rest. Regular exercise and proper nutrition support your increased activity levels.',
      financialGuidance: 'Conservative investments and careful budgeting lead to steady financial growth. Avoid impulsive purchases.'
    };
  }

  private static generateYearlyForecast(sign: string, year: number): YearlyForecast {
    return {
      year,
      sign,
      overview: `${year} marks a transformative year for ${sign}, bringing opportunities for significant personal and professional growth. The cosmic energies support your ambitions while encouraging balance and wisdom in your choices.`,
      majorThemes: ['Career advancement', 'Relationship evolution', 'Personal mastery', 'Financial growth'],
      quarters: {
        q1: 'Foundation building and planning set the stage for future success.',
        q2: 'Active pursuit of goals with increased energy and opportunities.',
        q3: 'Harvest season - enjoy the fruits of your earlier efforts.',
        q4: 'Reflection, preparation, and setting intentions for the following year.'
      },
      loveYear: 'A year of deepening connections and emotional growth. Committed relationships reach new levels of understanding.',
      careerYear: 'Professional advancement through skill development and strategic networking. Leadership opportunities emerge.',
      healthYear: 'Focus on sustainable wellness practices. Physical and mental health improvements through consistent care.',
      wealthYear: 'Steady financial growth through wise planning and strategic investments. Avoid get-rich-quick schemes.',
      keyDates: [`March ${year}`, `June ${year}`, `September ${year}`, `December ${year}`],
      challenges: ['Balancing ambition with patience', 'Managing increased responsibilities', 'Avoiding overcommitment'],
      opportunities: ['Leadership roles', 'Creative partnerships', 'Investment potential', 'Personal brand building']
    };
  }
}