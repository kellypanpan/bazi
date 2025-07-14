import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Heart, Briefcase, DollarSign, Activity, Share2, Download } from 'lucide-react';
import { ZodiacService, ZodiacSign, DailyHoroscope, WeeklyHoroscope, MonthlyHoroscope } from '../services/zodiacService';

const ZodiacPage: React.FC = () => {
  const { sign } = useParams<{ sign: string }>();
  const location = useLocation();
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscope | null>(null);
  const [weeklyHoroscope, setWeeklyHoroscope] = useState<WeeklyHoroscope | null>(null);
  const [monthlyHoroscope, setMonthlyHoroscope] = useState<MonthlyHoroscope | null>(null);
  const [loading, setLoading] = useState(false);

  const loadHoroscopeCallback = React.useCallback(async (type: 'daily' | 'weekly' | 'monthly', signName: string) => {
    setLoading(true);
    try {
      switch (type) {
        case 'daily':
          if (!dailyHoroscope) {
            const daily = await ZodiacService.getDailyHoroscope(signName);
            setDailyHoroscope(daily);
          }
          break;
        case 'weekly':
          if (!weeklyHoroscope) {
            const weekly = await ZodiacService.getWeeklyHoroscope(signName);
            setWeeklyHoroscope(weekly);
          }
          break;
        case 'monthly':
          if (!monthlyHoroscope) {
            const monthly = await ZodiacService.getMonthlyHoroscope(signName);
            setMonthlyHoroscope(monthly);
          }
          break;
      }
    } catch (error) {
      console.error('Error loading horoscope:', error);
    } finally {
      setLoading(false);
    }
  }, [dailyHoroscope, weeklyHoroscope, monthlyHoroscope]);

  useEffect(() => {
    // Get sign name from URL parameter or pathname
    let signName = sign;
    if (!signName) {
      // Extract sign name from pathname (e.g., '/aries' -> 'aries')
      signName = location.pathname.replace('/', '');
    }
    
    if (signName) {
      const capitalizedSign = signName.charAt(0).toUpperCase() + signName.slice(1).toLowerCase();
      const foundSign = ZodiacService.getAllZodiacSigns().find(z => z.name === capitalizedSign);
      if (foundSign) {
        setZodiacSign(foundSign);
        loadHoroscopeCallback('daily', capitalizedSign);
      }
    }
  }, [sign, location.pathname, loadHoroscopeCallback]);

  const handleTabChange = (tab: 'daily' | 'weekly' | 'monthly') => {
    setActiveTab(tab);
    if (zodiacSign) {
      loadHoroscopeCallback(tab, zodiacSign.name);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreStars = (score: number) => {
    const stars = Math.round(score / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  if (!zodiacSign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Zodiac Sign Not Found</h1>
          <p>Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{zodiacSign.symbol}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{zodiacSign.name}</h1>
          <p className="text-xl text-indigo-300 mb-4">{zodiacSign.dates}</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="px-4 py-2 bg-indigo-800 rounded-full text-white">
              Element: {zodiacSign.element}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {zodiacSign.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-800 bg-opacity-50 rounded-full text-sm text-purple-200"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto">{zodiacSign.personality}</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-1 flex">
            {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-indigo-300 hover:text-white hover:bg-indigo-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white mt-4">Loading your {activeTab} horoscope...</p>
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'daily' && dailyHoroscope && (
              <DailyHoroscopeView horoscope={dailyHoroscope} />
            )}
            {activeTab === 'weekly' && weeklyHoroscope && (
              <WeeklyHoroscopeView horoscope={weeklyHoroscope} />
            )}
            {activeTab === 'monthly' && monthlyHoroscope && (
              <MonthlyHoroscopeView horoscope={monthlyHoroscope} />
            )}
          </motion.div>
        )}

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              <Share2 className="h-5 w-5" />
              Share Reading
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
              <Download className="h-5 w-5" />
              Download Image
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  function DailyHoroscopeView({ horoscope }: { horoscope: DailyHoroscope }) {
    const categories = [
      { key: 'overall', label: 'Overall', icon: Star, data: horoscope.overall },
      { key: 'love', label: 'Love', icon: Heart, data: horoscope.love },
      { key: 'career', label: 'Career', icon: Briefcase, data: horoscope.career },
      { key: 'wealth', label: 'Wealth', icon: DollarSign, data: horoscope.wealth },
      { key: 'health', label: 'Health', icon: Activity, data: horoscope.health },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-800 rounded-lg">
                <category.icon className="h-5 w-5 text-indigo-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">{category.label}</h3>
            </div>
            <p className="text-slate-300 mb-4">{category.data.prediction}</p>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${getScoreColor(category.data.score)}`}>
                {getScoreStars(category.data.score)}
              </span>
              <span className={`text-sm ${getScoreColor(category.data.score)}`}>
                {category.data.score}/100
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  function WeeklyHoroscopeView({ horoscope }: { horoscope: WeeklyHoroscope }) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Weekly Forecast</h2>
            <p className="text-indigo-300">{horoscope.week}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                Overview
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.overview}</p>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-400" />
                Love & Relationships
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.love}</p>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
                Career
              </h3>
              <p className="text-slate-300">{horoscope.career}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Money & Finances
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.money}</p>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-400" />
                Health & Wellness
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.health}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Lucky Numbers</h4>
                  <div className="flex flex-wrap gap-1">
                    {horoscope.luckyNumbers.map((number, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-800 bg-opacity-50 rounded text-sm text-purple-200"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Lucky Colors</h4>
                  <div className="flex flex-wrap gap-1">
                    {horoscope.luckyColors.map((color, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-800 bg-opacity-50 rounded text-sm text-indigo-200"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function MonthlyHoroscopeView({ horoscope }: { horoscope: MonthlyHoroscope }) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Monthly Forecast</h2>
            <p className="text-indigo-300">{horoscope.month} {horoscope.year}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Monthly Overview
                </h3>
                <p className="text-slate-300">{horoscope.overview}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-400" />
                  Love & Romance
                </h3>
                <p className="text-slate-300">{horoscope.love}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                  Career & Work
                </h3>
                <p className="text-slate-300">{horoscope.career}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Finances & Money
                </h3>
                <p className="text-slate-300">{horoscope.finances}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-400" />
                  Health & Well-being
                </h3>
                <p className="text-slate-300">{horoscope.health}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  Key Dates
                </h3>
                <div className="space-y-2">
                  {horoscope.keyDates.map((date, index) => (
                    <div key={index} className="text-sm text-slate-300 bg-purple-900 bg-opacity-30 rounded p-2">
                      {date}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Monthly Advice</h4>
                <p className="text-slate-300 text-sm">{horoscope.advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ZodiacPage;