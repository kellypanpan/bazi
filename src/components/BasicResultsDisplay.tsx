import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BirthData } from './BirthDateForm';
import { BaziAnalysis, analyzeBazi } from '../services/baziAnalysisService';
import { Calendar, Clock, Star, Moon, Flame, Droplets, Compass, Sparkles, Sun, Heart, Briefcase, Leaf, Cloud, Mountain, Gem, Waves } from 'lucide-react';

interface BasicResultsDisplayProps {
  formData: BirthData;
}

const BasicResultsDisplay: React.FC<BasicResultsDisplayProps> = ({ formData }) => {
  const [analysis, setAnalysis] = useState<BaziAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const result = await analyzeBazi(formData);
        setAnalysis(result);
        setError(null);
      } catch (err) {
        setError('分析过程中出现错误，请稍后重试。');
        console.error('Error fetching analysis:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [formData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-indigo-300">正在生成您的八字分析...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900 bg-opacity-30 rounded-xl">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const birthYear = new Date(formData.birthDate).getFullYear();
  const birthMonth = new Date(formData.birthDate).getMonth() + 1;
  const birthDay = new Date(formData.birthDate).getDate();
  const birthHour = parseInt(formData.birthTime.split(':')[0]);
  
  const getChineseZodiac = (year: number) => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(year - 4) % 12];
  };

  const getHeavenlyStem = (year: number) => {
    const stems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
    return stems[(year - 4) % 10];
  };

  const getEarthlyBranch = (year: number) => {
    const branches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
    return branches[(year - 4) % 12];
  };

  const getElement = (stem: string) => {
    const elements = {
      'Jia': 'Wood', 'Yi': 'Wood',
      'Bing': 'Fire', 'Ding': 'Fire',
      'Wu': 'Earth', 'Ji': 'Earth',
      'Geng': 'Metal', 'Xin': 'Metal',
      'Ren': 'Water', 'Gui': 'Water'
    };
    return elements[stem as keyof typeof elements];
  };

  const getMonthElement = (month: number) => {
    const elements = ['Wood', 'Wood', 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Water', 'Water'];
    return elements[month - 1];
  };

  const getDayElement = (day: number) => {
    return ['Metal', 'Water', 'Wood', 'Fire', 'Earth'][day % 5];
  };

  const getHourElement = (hour: number) => {
    if (hour >= 23 || hour < 1) return 'Water';
    if (hour >= 1 && hour < 5) return 'Wood';
    if (hour >= 5 && hour < 9) return 'Fire';
    if (hour >= 9 && hour < 13) return 'Earth';
    if (hour >= 13 && hour < 17) return 'Metal';
    if (hour >= 17 && hour < 21) return 'Water';
    return 'Wood';
  };

  const zodiac = getChineseZodiac(birthYear);
  const heavenlyStem = getHeavenlyStem(birthYear);
  const earthlyBranch = getEarthlyBranch(birthYear);
  const yearElement = getElement(heavenlyStem);
  const monthElement = getMonthElement(birthMonth);
  const dayElement = getDayElement(birthDay);
  const hourElement = getHourElement(birthHour);

  const getElementalBalance = () => {
    const elements: Record<string, number> = {
      Wood: 0,
      Fire: 0,
      Earth: 0,
      Metal: 0,
      Water: 0
    };

    elements[yearElement] = (elements[yearElement] || 0) + 1;
    elements[monthElement] = (elements[monthElement] || 0) + 1;
    elements[dayElement] = (elements[dayElement] || 0) + 1;
    elements[hourElement] = (elements[hourElement] || 0) + 1;

    return elements;
  };

  const elementalBalance = getElementalBalance();

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Wood': return <Leaf className="h-5 w-5 text-green-500" />;
      case 'Fire': return <Flame className="h-5 w-5 text-red-500" />;
      case 'Earth': return <Mountain className="h-5 w-5 text-amber-500" />;
      case 'Metal': return <Gem className="h-5 w-5 text-gray-400" />;
      case 'Water': return <Waves className="h-5 w-5 text-blue-500" />;
      default: return <Star className="h-5 w-5 text-purple-500" />;
    }
  };

  const getElementalNature = () => {
    const dominantElement = Object.entries(elementalBalance).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    const weakestElement = Object.entries(elementalBalance).reduce((a, b) => b[1] < a[1] ? b : a)[0];

    const elementalTraits = {
      Wood: {
        strengths: ['creativity', 'growth mindset', 'adaptability', 'compassion'],
        challenges: ['indecisiveness', 'scattered energy', 'difficulty with boundaries'],
        careers: ['education', 'healthcare', 'environmental science', 'counseling'],
        relationships: ['nurturing', 'supportive', 'growth-oriented partnerships']
      },
      Fire: {
        strengths: ['leadership', 'charisma', 'passion', 'inspiration'],
        challenges: ['impulsiveness', 'burnout', 'emotional volatility'],
        careers: ['entertainment', 'sales', 'marketing', 'public speaking'],
        relationships: ['dynamic', 'exciting', 'transformative connections']
      },
      Earth: {
        strengths: ['stability', 'reliability', 'practicality', 'groundedness'],
        challenges: ['resistance to change', 'stubbornness', 'overthinking'],
        careers: ['finance', 'real estate', 'agriculture', 'construction'],
        relationships: ['stable', 'dependable', 'security-focused bonds']
      },
      Metal: {
        strengths: ['precision', 'discipline', 'clarity', 'organization'],
        challenges: ['perfectionism', 'rigidity', 'difficulty expressing emotions'],
        careers: ['technology', 'engineering', 'law', 'research'],
        relationships: ['structured', 'clear boundaries', 'respect-based connections']
      },
      Water: {
        strengths: ['wisdom', 'intuition', 'adaptability', 'emotional depth'],
        challenges: ['fear of commitment', 'overwhelming emotions', 'difficulty with structure'],
        careers: ['research', 'psychology', 'spiritual work', 'artistic pursuits'],
        relationships: ['deep emotional bonds', 'intuitive understanding', 'fluid dynamics']
      }
    };

    return {
      dominant: {
        element: dominantElement,
        traits: elementalTraits[dominantElement as keyof typeof elementalTraits]
      },
      weakest: {
        element: weakestElement,
        traits: elementalTraits[weakestElement as keyof typeof elementalTraits]
      }
    };
  };

  const elementalNature = getElementalNature();

  const getZodiacPersonality = (zodiac: string) => {
    const personalities = {
      'Rat': {
        traits: ['resourceful', 'versatile', 'witty', 'imaginative'],
        strengths: 'Quick-witted problem solver with natural charm',
        challenges: 'Can be opportunistic and sometimes restless',
        relationships: 'Best matches with Dragon, Monkey, and Ox',
        career: 'Excellence in business, technology, and creative fields'
      },
      'Ox': {
        traits: ['reliable', 'patient', 'kind', 'persistent'],
        strengths: 'Natural leader with strong principles and determination',
        challenges: 'May be stubborn and slow to embrace change',
        relationships: 'Harmonious with Snake, Rooster, and Rat',
        career: 'Success in agriculture, manufacturing, and leadership roles'
      },
      'Tiger': {
        traits: ['brave', 'confident', 'charismatic', 'unpredictable'],
        strengths: 'Natural authority and magnetic personality',
        challenges: 'Can be impulsive and prone to emotional decisions',
        relationships: 'Compatible with Horse, Dog, and Pig',
        career: 'Thrives in competitive and dynamic environments'
      },
      'Rabbit': {
        traits: ['gentle', 'elegant', 'alert', 'quick'],
        strengths: 'Diplomatic skills and artistic sensibilities',
        challenges: 'May avoid conflict and be too cautious',
        relationships: 'Best with Sheep, Pig, and Dog',
        career: 'Excellence in arts, diplomacy, and public relations'
      },
      'Dragon': {
        traits: ['confident', 'intelligent', 'enthusiastic', 'ambitious'],
        strengths: 'Natural leadership and innovative thinking',
        challenges: 'Can be perfectionistic and demanding',
        relationships: 'Matches well with Rat, Monkey, and Rooster',
        career: 'Success in leadership, entertainment, and innovation'
      },
      'Snake': {
        traits: ['wise', 'enigmatic', 'graceful', 'intuitive'],
        strengths: 'Deep wisdom and excellent problem-solving abilities',
        challenges: 'May be secretive and overly suspicious',
        relationships: 'Compatible with Dragon, Rooster, and Ox',
        career: 'Excellence in research, spirituality, and psychology'
      },
      'Horse': {
        traits: ['energetic', 'independent', 'adventurous', 'warm-hearted'],
        strengths: 'Natural enthusiasm and ability to inspire others',
        challenges: 'Can be impatient and prone to wanderlust',
        relationships: 'Best with Tiger, Dog, and Sheep',
        career: 'Success in sales, sports, and adventure-related fields'
      },
      'Goat': {
        traits: ['gentle', 'compassionate', 'creative', 'resilient'],
        strengths: 'Artistic talent and emotional intelligence',
        challenges: 'May worry too much and depend on others',
        relationships: 'Harmonious with Rabbit, Horse, and Pig',
        career: 'Thrives in arts, healing professions, and counseling'
      },
      'Monkey': {
        traits: ['clever', 'innovative', 'quick-witted', 'versatile'],
        strengths: 'Exceptional problem-solving and adaptability',
        challenges: 'Can be opportunistic and inconsistent',
        relationships: 'Compatible with Dragon, Rat, and Snake',
        career: 'Excellence in science, engineering, and entertainment'
      },
      'Rooster': {
        traits: ['honest', 'energetic', 'intelligent', 'flamboyant'],
        strengths: 'Strong work ethic and attention to detail',
        challenges: 'May be too critical and perfectionistic',
        relationships: 'Best with Ox, Snake, and Dragon',
        career: 'Success in management, analysis, and performance'
      },
      'Dog': {
        traits: ['loyal', 'honest', 'intelligent', 'protective'],
        strengths: 'Strong sense of justice and reliability',
        challenges: 'Can be anxious and overly critical',
        relationships: 'Harmonious with Tiger, Horse, and Rabbit',
        career: 'Excellence in service professions and advocacy'
      },
      'Pig': {
        traits: ['honest', 'diligent', 'generous', 'optimistic'],
        strengths: 'Sincerity and ability to build lasting relationships',
        challenges: 'May be too trusting and easily influenced',
        relationships: 'Compatible with Rabbit, Sheep, and Tiger',
        career: 'Success in entertainment, hospitality, and retail'
      }
    };

    return personalities[zodiac as keyof typeof personalities];
  };

  const zodiacPersonality = getZodiacPersonality(zodiac);

  const getLifePhases = () => {
    const phases = [
      {
        age: '0-15',
        description: `Early years marked by ${elementalNature.dominant.traits.strengths[0]} and ${elementalNature.dominant.traits.strengths[1]}. Focus on education and personal development.`,
        element: yearElement
      },
      {
        age: '16-30',
        description: `Young adulthood brings opportunities in ${elementalNature.dominant.traits.careers[0]} and ${elementalNature.dominant.traits.careers[1]}. Time for career foundation and relationship exploration.`,
        element: monthElement
      },
      {
        age: '31-45',
        description: `Mid-life period emphasizes ${zodiacPersonality.strengths}. Career advancement and family life take center stage.`,
        element: dayElement
      },
      {
        age: '46-60',
        description: `Mature years bring wisdom and mastery in ${elementalNature.dominant.traits.careers[2]}. Focus on legacy and mentorship.`,
        element: hourElement
      },
      {
        age: '61+',
        description: `Golden years emphasize ${elementalNature.dominant.traits.relationships}. Time for spiritual growth and sharing wisdom.`,
        element: yearElement
      }
    ];

    return phases;
  };

  const lifePhases = getLifePhases();

  const getDetailedGuidance = () => {
    return {
      personal: [
        `Your ${elementalNature.dominant.element} dominance suggests ${elementalNature.dominant.traits.strengths.join(', ')} as your core strengths.`,
        `The influence of ${zodiac} brings ${zodiacPersonality.traits.join(', ')} to your personality.`,
        `Your birth hour in the ${hourElement} phase indicates special aptitude for ${elementalNature.dominant.traits.careers[0]} and ${elementalNature.dominant.traits.careers[1]}.`,
        `The combination of ${heavenlyStem}-${earthlyBranch} suggests a unique destiny path focused on ${elementalNature.dominant.traits.relationships}.`
      ],
      relationships: [
        `In relationships, you naturally create ${elementalNature.dominant.traits.relationships}.`,
        `Your ${zodiac} nature makes you especially compatible with ${zodiacPersonality.relationships}.`,
        `The ${monthElement} influence in your birth month suggests ${elementalNature.dominant.traits.strengths[2]} in emotional connections.`,
        `Balance your ${elementalNature.weakest.element} aspect to improve relationship dynamics.`
      ],
      career: [
        `Your professional strengths lie in ${elementalNature.dominant.traits.careers.join(', ')}.`,
        `The ${zodiac} influence suggests excellence in ${zodiacPersonality.career}.`,
        `Your ${yearElement} year element supports success in leadership and innovation.`,
        `Consider roles that allow you to express your ${elementalNature.dominant.traits.strengths[0]} and ${elementalNature.dominant.traits.strengths[1]}.`
      ],
      health: [
        `Your dominant ${elementalNature.dominant.element} energy suggests focusing on ${elementalNature.dominant.traits.strengths[3]}-based activities.`,
        `Balance your ${elementalNature.weakest.element} aspect through appropriate exercise and diet.`,
        `The ${zodiac} influence indicates potential sensitivity in ${zodiacPersonality.challenges.toLowerCase()}.`,
        `Regular practices that enhance your ${elementalNature.dominant.traits.strengths[2]} will support overall well-being.`
      ]
    };
  };

  const detailedGuidance = getDetailedGuidance();

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8 mb-8"
      >
        <h2 className="text-2xl font-serif text-white mb-6 text-center">
          Your Detailed Celestial Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="text-lg text-amber-400 mb-4">Birth Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                <span className="text-slate-300">
                  {new Date(formData.birthDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-slate-400 mr-3" />
                <span className="text-slate-300">
                  {new Date(`2000-01-01T${formData.birthTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="text-lg text-amber-400 mb-4">Celestial Identity</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                  <Star className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <span className="block text-white text-xl">{zodiac}</span>
                  <span className="text-slate-400 text-sm">{heavenlyStem}-{earthlyBranch} Year</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl mb-8">
          <h3 className="text-lg text-amber-400 mb-4">Elemental Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white mb-3">Birth Elements Distribution</h4>
              <div className="space-y-3">
                {Object.entries(elementalBalance).map(([element, count]) => (
                  <div key={element} className="flex items-center">
                    {getElementIcon(element)}
                    <span className="text-slate-300 ml-2">{element}: {count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white mb-3">Dominant Element: {elementalNature.dominant.element}</h4>
              <p className="text-slate-300 text-sm mb-4">
                Your {elementalNature.dominant.element} dominance shapes your core characteristics and life approach.
              </p>
              <div className="flex items-center space-x-2">
                {getElementIcon(elementalNature.dominant.element)}
                <span className="text-slate-300">Primary Influence</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="text-lg text-amber-400 mb-4">Core Personality Traits</h3>
            <ul className="space-y-3">
              {zodiacPersonality.traits.map((trait, index) => (
                <li key={index} className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 capitalize">{trait}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="text-lg text-amber-400 mb-4">Life Path Indicators</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Star className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{zodiacPersonality.strengths}</span>
              </li>
              <li className="flex items-start">
                <Moon className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{zodiacPersonality.challenges}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl mb-8">
          <h3 className="text-lg text-amber-400 mb-4">Life Phases Journey</h3>
          <div className="space-y-4">
            {lifePhases.map((phase, index) => (
              <div key={index} className="flex items-start">
                {getElementIcon(phase.element)}
                <div className="ml-3">
                  <span className="text-white font-medium">Ages {phase.age}</span>
                  <p className="text-slate-300 text-sm">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="flex items-center text-lg text-amber-400 mb-4">
              <Briefcase className="h-5 w-5 mr-2" />
              Career Path
            </h3>
            <ul className="space-y-3">
              {detailedGuidance.career.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="flex items-center text-lg text-amber-400 mb-4">
              <Heart className="h-5 w-5 mr-2" />
              Relationship Dynamics
            </h3>
            <ul className="space-y-3">
              {detailedGuidance.relationships.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center text-slate-300">
          <p>This analysis provides a comprehensive view of your celestial blueprint.</p>
          <p>For an even more detailed reading, including specific timing for important life decisions and yearly forecasts, consider our premium readings.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicResultsDisplay;