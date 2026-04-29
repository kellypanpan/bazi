import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Calendar, 
  Heart, 
  Briefcase, 
  DollarSign, 
  Activity, 
  Share2, 
  Download,
  Crown,
  Award,
  TrendingUp,
  Users,
  Gift,
  LockKeyhole,
  MessageCircle,
  Target,
  Zap
} from 'lucide-react';
import { 
  EnhancedZodiacService, 
  EnhancedZodiacSign, 
  HoroscopeData, 
  MonthlyForecast, 
  YearlyForecast 
} from '../services/enhancedZodiacService';
import SEO from '../components/SEO';

const premiumZodiacModules = [
  'Complete birth chart interpretation',
  'Moon and rising sign analysis',
  'Monthly and yearly decision timing',
  'Love, career, wealth, and health report sections',
  'Shareable report image',
  'Downloadable premium PDF',
];

const ComprehensiveZodiacPage: React.FC = () => {
  const { sign } = useParams<{ sign: string }>();
  const location = useLocation();
  const [zodiacData, setZodiacData] = useState<EnhancedZodiacSign | null>(null);
  const [dailyHoroscope, setDailyHoroscope] = useState<HoroscopeData | null>(null);
  const [monthlyForecast, setMonthlyForecast] = useState<MonthlyForecast | null>(null);
  const [yearlyForecast, setYearlyForecast] = useState<YearlyForecast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadZodiacData = async () => {
      // Get sign name from URL parameter or pathname
      let signName = sign;
      if (!signName) {
        // Extract sign name from direct routes like /aries, /taurus, etc.
        signName = location.pathname.replace('/', '');
      }
      
      if (signName) {
        const data = EnhancedZodiacService.getEnhancedZodiacData(signName);
        if (data) {
          setZodiacData(data);
          
          // Load horoscope data
          try {
            const [daily, monthly, yearly] = await Promise.all([
              EnhancedZodiacService.getDailyHoroscope(signName),
              EnhancedZodiacService.getMonthlyForecast(signName),
              EnhancedZodiacService.getYearlyForecast(signName)
            ]);
            
            setDailyHoroscope(daily);
            setMonthlyForecast(monthly);
            setYearlyForecast(yearly);
          } catch (error) {
            console.error('Error loading horoscope data:', error);
          }
        }
      }
      setLoading(false);
    };

    loadZodiacData();
  }, [sign, location.pathname]);

  const getScoreStars = (score: number) => {
    const stars = Math.round(score / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="px-4 pb-16 pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Loading your zodiac insights...</p>
        </div>
      </div>
    );
  }

  if (!zodiacData) {
    return (
      <div className="px-4 pb-16 pt-28 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Zodiac Sign Not Found</h1>
          <p className="mb-6">Please check the URL and try again.</p>
          <Link to="/" className="glass-primary-button rounded-lg px-6 py-3 font-semibold">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Create dynamic SEO data
  const signName = zodiacData.name;
  const pageTitle = `${signName} Horoscope Today | ${signName} Daily Predictions & Personality Traits`;
  const pageDescription = `Get your ${signName} horoscope today! Discover ${signName} personality traits, daily predictions, love compatibility, career insights, and more. Born ${zodiacData.dates}.`;
  const pageUrl = `https://fortunetelling.it.com/${signName.toLowerCase()}`;
  
  const zodiacStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${signName} Horoscope and Personality Guide`,
    "description": pageDescription,
    "author": {
      "@type": "Organization",
      "name": "Chinese Astrology & Fortune Telling"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chinese Astrology & Fortune Telling",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fortunetelling.it.com/logo.png"
      }
    },
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": pageUrl,
    "about": {
      "@type": "Thing",
      "name": `${signName} Zodiac Sign`,
      "description": `${signName} astrology sign covering dates ${zodiacData.dates}`
    }
  };

  return (
    <div className="px-4 pb-16 pt-28">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={[
          `${signName.toLowerCase()} horoscope`, `${signName.toLowerCase()} daily`, `${signName.toLowerCase()} personality`,
          `${signName.toLowerCase()} traits`, `${signName.toLowerCase()} compatibility`, `${signName.toLowerCase()} love`,
          `${signName.toLowerCase()} career`, "zodiac sign", "astrology", "horoscope today",
          zodiacData.dates, zodiacData.element.toLowerCase(), zodiacData.rulingPlanet.toLowerCase()
        ]}
        url={pageUrl}
        type="article"
        structuredData={zodiacStructuredData}
      />
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* SEO-Optimized Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">{zodiacData.symbol}</div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            {zodiacData.name} 
            <span className="block sm:inline text-lg sm:text-2xl text-purple-300 mt-1 sm:mt-0 sm:ml-2">
              ({zodiacData.chineseName})
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-indigo-300 mb-4 sm:mb-6">{zodiacData.dates}</p>
          
          {/* Basic Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-indigo-300">Element</div>
              <div className="text-sm sm:text-lg font-semibold text-white">{zodiacData.element}</div>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-indigo-300">Ruling Planet</div>
              <div className="text-sm sm:text-lg font-semibold text-white break-words">{zodiacData.rulingPlanet}</div>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-indigo-300">Lucky Colors</div>
              <div className="text-sm sm:text-lg font-semibold text-white">{zodiacData.luckyColor.join(', ')}</div>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-indigo-300">Lucky Numbers</div>
              <div className="text-sm sm:text-lg font-semibold text-white">{zodiacData.luckyNumber.join(', ')}</div>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {zodiacData.keywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-purple-200 backdrop-blur-xl"
              >
                {keyword}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Daily/Weekly/Monthly Horoscope Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 px-4">Today's Horoscope</h2>
          
          {dailyHoroscope && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {/* Overall */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Overall</h3>
                </div>
                <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">{dailyHoroscope.overall.prediction}</p>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className={`text-base sm:text-lg ${getScoreColor(dailyHoroscope.overall.score)}`}>
                    {getScoreStars(dailyHoroscope.overall.score)}
                  </span>
                  <span className={`text-xs sm:text-sm ${getScoreColor(dailyHoroscope.overall.score)}`}>
                    {dailyHoroscope.overall.score}/100
                  </span>
                </div>
                <div className="glass-inset p-2 sm:p-3">
                  <div className="text-yellow-300 text-xs sm:text-sm font-medium">Lucky Tip</div>
                  <div className="text-yellow-100 text-xs sm:text-sm">{dailyHoroscope.overall.luckyTip}</div>
                </div>
              </div>

              {/* Love */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Love</h3>
                </div>
                <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">{dailyHoroscope.love.prediction}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg ${getScoreColor(dailyHoroscope.love.score)}`}>
                    {getScoreStars(dailyHoroscope.love.score)}
                  </span>
                  <span className={`text-xs sm:text-sm ${getScoreColor(dailyHoroscope.love.score)}`}>
                    {dailyHoroscope.love.score}/100
                  </span>
                </div>
              </div>

              {/* Career */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Career</h3>
                </div>
                <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">{dailyHoroscope.career.prediction}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg ${getScoreColor(dailyHoroscope.career.score)}`}>
                    {getScoreStars(dailyHoroscope.career.score)}
                  </span>
                  <span className={`text-xs sm:text-sm ${getScoreColor(dailyHoroscope.career.score)}`}>
                    {dailyHoroscope.career.score}/100
                  </span>
                </div>
              </div>

              {/* Wealth */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Wealth</h3>
                </div>
                <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">{dailyHoroscope.wealth.prediction}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg ${getScoreColor(dailyHoroscope.wealth.score)}`}>
                    {getScoreStars(dailyHoroscope.wealth.score)}
                  </span>
                  <span className={`text-xs sm:text-sm ${getScoreColor(dailyHoroscope.wealth.score)}`}>
                    {dailyHoroscope.wealth.score}/100
                  </span>
                </div>
              </div>

              {/* Health */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Health</h3>
                </div>
                <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">{dailyHoroscope.health.prediction}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg ${getScoreColor(dailyHoroscope.health.score)}`}>
                    {getScoreStars(dailyHoroscope.health.score)}
                  </span>
                  <span className={`text-xs sm:text-sm ${getScoreColor(dailyHoroscope.health.score)}`}>
                    {dailyHoroscope.health.score}/100
                  </span>
                </div>
              </div>

              {/* Do/Don't Today */}
              <div className="glass-card p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Today's Guide</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="text-green-300 font-medium text-xs sm:text-sm mb-2">✓ DO TODAY</h4>
                    <ul className="space-y-1">
                      {dailyHoroscope.doToday.map((item, index) => (
                        <li key={index} className="text-green-100 text-xs sm:text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-red-300 font-medium text-xs sm:text-sm mb-2">✗ AVOID TODAY</h4>
                    <ul className="space-y-1">
                      {dailyHoroscope.avoidToday.map((item, index) => (
                        <li key={index} className="text-red-100 text-xs sm:text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* Personality Analysis Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 px-4">Personality Deep Dive</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Positive & Negative Traits */}
            <div className="glass-card p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                Strengths & Challenges
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-green-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">✨ Positive Traits</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {zodiacData.personality.positiveTraits.map((trait, index) => (
                      <li key={index} className="text-slate-300 text-xs sm:text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-orange-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">⚠️ Areas for Growth</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {zodiacData.personality.negativeTraits.map((trait, index) => (
                      <li key={index} className="text-slate-300 text-xs sm:text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Behavioral Patterns */}
            <div className="space-y-4 sm:space-y-6">
              <div className="glass-card p-4 sm:p-6">
                <h4 className="text-pink-300 font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                  In Love & Relationships
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">{zodiacData.personality.inLove}</p>
              </div>
              
              <div className="glass-card p-4 sm:p-6">
                <h4 className="text-blue-300 font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                  At Work
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">{zodiacData.personality.atWork}</p>
              </div>
              
              <div className="glass-card p-4 sm:p-6">
                <h4 className="text-green-300 font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  With Money
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">{zodiacData.personality.withMoney}</p>
              </div>
            </div>
          </div>

          {/* Additional Personality Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-6xl mx-auto">
            <div className="glass-card p-4 sm:p-6">
              <h4 className="text-purple-300 font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                Social Style
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm">{zodiacData.personality.interpersonal}</p>
            </div>
            
            <div className="glass-card p-4 sm:p-6">
              <h4 className="text-indigo-300 font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                Childhood Patterns
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm">{zodiacData.personality.childhood}</p>
            </div>
            
            <div className="glass-card p-4 sm:p-6 sm:col-span-2 md:col-span-1">
              <h4 className="text-red-300 font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                Under Stress
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm">{zodiacData.personality.underStress}</p>
            </div>
          </div>
        </motion.section>

        {/* Famous People Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-8 px-4">
            Famous {zodiacData.name} Personalities
          </h2>
          <p className="text-center text-indigo-300 mb-6 sm:mb-8 px-4 text-sm sm:text-base">
            You share your zodiac sign with these remarkable individuals
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
            {zodiacData.famousPeople.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-3 sm:p-4 lg:p-6 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
                  <Crown className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-white mb-1 leading-tight">{person.name}</h3>
                <p className="text-purple-300 text-xs sm:text-sm mb-1">{person.profession}</p>
                <p className="text-slate-400 text-xs hidden sm:block">{person.birthDate}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Premium Birth Chart Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="glass-panel p-4 sm:p-6 lg:p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <Star className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">Complete Birth Chart Analysis</h2>
              <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base px-2">
                Your Sun sign is just the beginning. Discover your Moon sign, Rising sign, and complete astrological profile.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="glass-card p-3 sm:p-4 lg:p-6">
                  <h3 className="text-yellow-300 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">☀️ Sun Sign</h3>
                  <p className="text-slate-300 text-xs sm:text-sm">Your core personality and ego</p>
                </div>
                <div className="glass-card p-3 sm:p-4 lg:p-6">
                  <h3 className="text-blue-300 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">🌙 Moon Sign</h3>
                  <p className="text-slate-300 text-xs sm:text-sm">Your emotional nature and inner self</p>
                </div>
                <div className="glass-card p-3 sm:p-4 lg:p-6">
                  <h3 className="text-purple-300 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">⬆️ Rising Sign</h3>
                  <p className="text-slate-300 text-xs sm:text-sm">How others perceive you</p>
                </div>
              </div>
              
              <div className="glass-inset p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 border-purple-400 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <span className="text-purple-300 text-xs sm:text-sm">Birth Chart</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">Premium natal chart visualization coming soon</p>
              </div>

              <div className="mx-auto mb-6 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
                {premiumZodiacModules.map((module) => (
                  <div key={module} className="glass-inset flex items-center gap-3 p-3">
                    <LockKeyhole className="h-4 w-4 shrink-0 text-amber-300" />
                    <span className="text-sm text-slate-200">{module}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/subscription?source=zodiac&plan=pro#plans" className="glass-primary-button inline-flex rounded-lg px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base lg:px-8">
                Unlock Full Birth Chart Analysis
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Monthly/Yearly Forecasts */}
        {(monthlyForecast || yearlyForecast) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Extended Forecasts</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Monthly Forecast */}
              {monthlyForecast && (
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    {monthlyForecast.month} {monthlyForecast.year} Forecast
                  </h3>
                  
                  <p className="text-slate-300 mb-6">{monthlyForecast.overview}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-blue-300 font-medium mb-2">Key Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {monthlyForecast.keyThemes.map((theme, index) => (
                          <span key={index} className="rounded border border-white/10 bg-white/[0.06] px-2 py-1 text-xs text-blue-200">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-green-300 font-medium mb-2">Love Insights</h4>
                      <p className="text-slate-300 text-sm">{monthlyForecast.loveInsights}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-purple-300 font-medium mb-2">Career Highlights</h4>
                      <p className="text-slate-300 text-sm">{monthlyForecast.careerHighlights}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Yearly Forecast */}
              {yearlyForecast && (
                <div className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    {yearlyForecast.year} Annual Outlook
                  </h3>
                  
                  <p className="text-slate-300 mb-6">{yearlyForecast.overview}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-purple-300 font-medium mb-2">Major Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {yearlyForecast.majorThemes.map((theme, index) => (
                          <span key={index} className="rounded border border-white/10 bg-white/[0.06] px-2 py-1 text-xs text-purple-200">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-yellow-300 font-medium mb-2">Opportunities</h4>
                        <ul className="space-y-1">
                          {yearlyForecast.opportunities.slice(0, 2).map((opp, index) => (
                            <li key={index} className="text-slate-300 text-xs">• {opp}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-orange-300 font-medium mb-2">Challenges</h4>
                        <ul className="space-y-1">
                          {yearlyForecast.challenges.slice(0, 2).map((challenge, index) => (
                            <li key={index} className="text-slate-300 text-xs">• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 px-4">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {zodiacData.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-tight">{faq.question}</span>
                </h3>
                <p className="text-slate-300 pl-6 sm:pl-7 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Shareable Graphic Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-12 sm:mb-16"
        >
          <div className="glass-panel p-4 sm:p-6 lg:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-2">Share Your Daily Horoscope</h2>
            <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base px-2">Create a beautiful shareable image with today's predictions</p>
            
            <div className="glass-inset p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 max-w-sm sm:max-w-md mx-auto">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{zodiacData.symbol}</div>
              <div className="text-base sm:text-lg font-semibold text-white">{zodiacData.name}</div>
              <div className="text-xs sm:text-sm text-indigo-300 mb-2 sm:mb-4">{new Date().toLocaleDateString()}</div>
              <div className="text-xs text-slate-400">Shareable graphic preview</div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 glass-secondary-button rounded-lg text-sm sm:text-base">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                Share on Social
              </button>
              <Link to="/subscription?source=zodiac-download&plan=pro#plans" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 glass-primary-button rounded-lg text-sm sm:text-base">
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                Download Image
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="glass-panel p-4 sm:p-6 lg:p-8 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">Discover More About Yourself</h2>
            <p className="text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Ready to dive deeper into your cosmic profile? Explore our comprehensive BaZi analysis tools and unlock your full potential with authentic BaZi Four Pillars readings.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <Link 
                to="/readings"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 glass-primary-button rounded-lg text-sm sm:text-base"
              >
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                Get Your BaZi Analysis
              </Link>
              
              <Link 
                to="/compatibility"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 glass-secondary-button rounded-lg text-sm sm:text-base"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                Compatibility Check
              </Link>
              
              <Link to="/subscription?source=zodiac-updates&plan=annual#plans" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 glass-secondary-button rounded-lg text-sm sm:text-base">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
                Subscribe to Updates
              </Link>
            </div>
            
            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-400 px-2">
              Join thousands who trust their daily guidance to the stars
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default ComprehensiveZodiacPage;
