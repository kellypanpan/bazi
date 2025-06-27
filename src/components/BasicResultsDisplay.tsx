import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BirthData } from './BirthDateForm';
import { Calendar, Clock, Star, Flame, Heart, Briefcase, Leaf, Mountain, Gem, Waves } from 'lucide-react';
import { analyzeBazi, BaziAnalysis } from '../services/baziAnalysisService';

interface BasicResultsDisplayProps {
  formData: BirthData;
}

const BasicResultsDisplay: React.FC<BasicResultsDisplayProps> = ({ formData }) => {
  const [analysis, setAnalysis] = useState<BaziAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true);
      setLoadingStep(0);
      setProgress(0);
      
      const steps = [
        { message: "Calculating celestial coordinates and birth chart positions...", duration: 1200 },
        { message: "Analyzing Five Elements balance and interactions...", duration: 1000 },
        { message: "Computing Four Pillars and Heavenly Stems combinations...", duration: 800 },
        { message: "Interpreting Zodiac influences and personality traits...", duration: 600 },
        { message: "Generating life path predictions and guidance...", duration: 400 }
      ];

      let currentStep = 0;
      let currentProgress = 0;

      const processStep = async () => {
        if (currentStep < steps.length) {
          setLoadingStep(currentStep);
          
          // Animate progress within this step
          const stepProgress = 100 / steps.length;
          const endProgress = (currentStep + 1) * stepProgress;
          
          const progressAnimation = setInterval(() => {
            currentProgress += 2;
            const stepProgressValue = Math.min(currentProgress, endProgress);
            setProgress(stepProgressValue);
            
            if (currentProgress >= endProgress) {
              clearInterval(progressAnimation);
              currentStep++;
              setTimeout(processStep, 100);
            }
          }, steps[currentStep].duration / 50);
        } else {
          try {
            console.log('🔮 Starting real API analysis...');
            const result = await analyzeBazi(formData);
            console.log('✅ API analysis completed:', result);
            setAnalysis(result);
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
          } catch (error) {
            console.error('❌ API analysis failed:', error);
            // Show error or fallback to mock data
            setLoading(false);
          }
        }
      };

      processStep();
    };

    performAnalysis();
  }, [formData]);

  // Helper functions
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

  if (loading) {
    const steps = [
      { message: "Calculating celestial coordinates and birth chart positions...", description: "Determining exact astronomical positions at your birth time" },
      { message: "Analyzing Five Elements balance and interactions...", description: "Examining Wood, Fire, Earth, Metal, and Water influences" },
      { message: "Computing Four Pillars and Heavenly Stems combinations...", description: "Processing Year, Month, Day, and Hour pillars" },
      { message: "Interpreting Zodiac influences and personality traits...", description: "Understanding your Chinese zodiac characteristics" },
      { message: "Generating life path predictions and guidance...", description: "Creating personalized insights and recommendations" }
    ];

    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <motion.div 
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Progress Circle */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-indigo-800"
                opacity="0.3"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className="text-indigo-400"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
            </svg>
            {/* Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-300">{Math.round(progress)}%</span>
            </div>
            {/* Mystical symbols around the circle */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="relative w-full h-full">
                {['☯', '🔮', '⭐', '🌙'].map((symbol, index) => (
                  <div
                    key={index}
                    className="absolute text-amber-400 text-xl"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-70px)`
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Step */}
          <motion.div
            key={loadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {steps[loadingStep]?.message}
            </h3>
            <p className="text-indigo-300 text-sm">
              {steps[loadingStep]?.description}
            </p>
          </motion.div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= loadingStep ? 'bg-indigo-400' : 'bg-indigo-800'
                }`}
              />
            ))}
          </div>

          {/* Explanation */}
          <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-4 border border-indigo-700">
            <p className="text-indigo-200 text-sm leading-relaxed">
              ✨ <strong>Why does this take time?</strong><br/>
              Fortune analysis requires precise calculations of celestial positions, elemental interactions, 
              and complex astrological computations. Our system carefully analyzes hundreds of variables 
              from your birth data to provide the most accurate personalized insights.
            </p>
          </div>
        </motion.div>
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

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8 mb-8"
      >
        <h2 className="text-2xl font-serif text-white mb-6 text-center">
          Your Detailed Fortune Analysis
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl">
            <h3 className="flex items-center text-lg text-amber-400 mb-4">
              <Briefcase className="h-5 w-5 mr-2" />
              Career Path
            </h3>
            <ul className="space-y-3">
              {analysis.personalityAnalysis.careerSuggestions.map((tip, index) => (
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
              {analysis.personalityAnalysis.relationshipInsights.map((tip, index) => (
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
          <p className="mb-4">Looking for even deeper insights—such as precise timing for major life events and year-by-year forecasts? Tap into our advanced engine.</p>
          <a
            href="https://facepalmai.com" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-3 rounded-lg bg-amber-500 text-indigo-950 font-semibold hover:bg-amber-400 transition"
          >
            Explore More on FacePalm&nbsp;AI →
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicResultsDisplay;