import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Heart, Briefcase, DollarSign, Activity, Share2, Download } from 'lucide-react';
import { ZodiacService, ZodiacSign, DailyHoroscope, WeeklyHoroscope, MonthlyHoroscope } from '../services/zodiacService';
import { useI18n } from '../i18n';

const zodiacPageCopy = {
  en: {
    notFoundTitle: 'Zodiac Sign Not Found',
    notFoundBody: 'Please check the URL and try again.',
    element: 'Element',
    tabs: { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' },
    loading: (tab: string) => `Loading your ${tab} horoscope...`,
    shareReading: 'Share Reading',
    downloadImage: 'Download Image',
    categories: {
      overall: 'Overall',
      love: 'Love',
      career: 'Career',
      wealth: 'Wealth',
      health: 'Health',
    },
    weeklyForecast: 'Weekly Forecast',
    overview: 'Overview',
    loveRelationships: 'Love & Relationships',
    moneyFinances: 'Money & Finances',
    healthWellness: 'Health & Wellness',
    luckyNumbers: 'Lucky Numbers',
    luckyColors: 'Lucky Colors',
    monthlyForecast: 'Monthly Forecast',
    monthlyOverview: 'Monthly Overview',
    loveRomance: 'Love & Romance',
    careerWork: 'Career & Work',
    financesMoney: 'Finances & Money',
    healthWellbeing: 'Health & Well-being',
    keyDates: 'Key Dates',
    monthlyAdvice: 'Monthly Advice',
  },
  'zh-CN': {
    notFoundTitle: '未找到星座',
    notFoundBody: '请检查网址后重试。',
    element: '元素',
    tabs: { daily: '今日', weekly: '本周', monthly: '本月' },
    loading: (tab: string) => `正在加载${tab}运势...`,
    shareReading: '分享解读',
    downloadImage: '下载图片',
    categories: {
      overall: '整体',
      love: '爱情',
      career: '事业',
      wealth: '财富',
      health: '健康',
    },
    weeklyForecast: '本周运势',
    overview: '整体概览',
    loveRelationships: '爱情与关系',
    moneyFinances: '金钱与财务',
    healthWellness: '健康与状态',
    luckyNumbers: '幸运数字',
    luckyColors: '幸运颜色',
    monthlyForecast: '本月运势',
    monthlyOverview: '月度概览',
    loveRomance: '爱情与浪漫',
    careerWork: '事业与工作',
    financesMoney: '财务与金钱',
    healthWellbeing: '健康与身心',
    keyDates: '关键日期',
    monthlyAdvice: '月度建议',
  },
  'zh-TW': {
    notFoundTitle: '未找到星座',
    notFoundBody: '請檢查網址後重試。',
    element: '元素',
    tabs: { daily: '今日', weekly: '本週', monthly: '本月' },
    loading: (tab: string) => `正在載入${tab}運勢...`,
    shareReading: '分享解讀',
    downloadImage: '下載圖片',
    categories: {
      overall: '整體',
      love: '愛情',
      career: '事業',
      wealth: '財富',
      health: '健康',
    },
    weeklyForecast: '本週運勢',
    overview: '整體概覽',
    loveRelationships: '愛情與關係',
    moneyFinances: '金錢與財務',
    healthWellness: '健康與狀態',
    luckyNumbers: '幸運數字',
    luckyColors: '幸運顏色',
    monthlyForecast: '本月運勢',
    monthlyOverview: '月度概覽',
    loveRomance: '愛情與浪漫',
    careerWork: '事業與工作',
    financesMoney: '財務與金錢',
    healthWellbeing: '健康與身心',
    keyDates: '關鍵日期',
    monthlyAdvice: '月度建議',
  },
};

const ZodiacPage: React.FC = () => {
  const { language, pick } = useI18n();
  const copy = pick(zodiacPageCopy);
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
            const daily = await ZodiacService.getDailyHoroscope(signName, undefined, language);
            setDailyHoroscope(daily);
          }
          break;
        case 'weekly':
          if (!weeklyHoroscope) {
            const weekly = await ZodiacService.getWeeklyHoroscope(signName, language);
            setWeeklyHoroscope(weekly);
          }
          break;
        case 'monthly':
          if (!monthlyHoroscope) {
            const monthly = await ZodiacService.getMonthlyHoroscope(signName, undefined, undefined, language);
            setMonthlyHoroscope(monthly);
          }
          break;
      }
    } catch (error) {
      console.error('Error loading horoscope:', error);
    } finally {
      setLoading(false);
    }
  }, [dailyHoroscope, weeklyHoroscope, monthlyHoroscope, language]);

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
      <div className="px-4 pb-16 pt-28 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">{copy.notFoundTitle}</h1>
          <p>{copy.notFoundBody}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16 pt-28">
      <div className="container mx-auto max-w-7xl px-4">
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
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-white backdrop-blur-xl">
              {copy.element}: {zodiacSign.element}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {zodiacSign.keywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-purple-200 backdrop-blur-xl"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto">{zodiacSign.personality}</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass-inset flex p-1">
            {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-amber-500 text-indigo-950 shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {copy.tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white mt-4">{copy.loading(copy.tabs[activeTab])}</p>
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
            <button className="flex items-center gap-2 px-6 py-3 glass-secondary-button rounded-lg">
              <Share2 className="h-5 w-5" />
              {copy.shareReading}
            </button>
            <Link to="/subscription?source=simple-zodiac-download&plan=pro#plans" className="flex items-center gap-2 px-6 py-3 glass-primary-button rounded-lg">
              <Download className="h-5 w-5" />
              {copy.downloadImage}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );

  function DailyHoroscopeView({ horoscope }: { horoscope: DailyHoroscope }) {
    const categories = [
      { key: 'overall', label: copy.categories.overall, icon: Star, data: horoscope.overall },
      { key: 'love', label: copy.categories.love, icon: Heart, data: horoscope.love },
      { key: 'career', label: copy.categories.career, icon: Briefcase, data: horoscope.career },
      { key: 'wealth', label: copy.categories.wealth, icon: DollarSign, data: horoscope.wealth },
      { key: 'health', label: copy.categories.health, icon: Activity, data: horoscope.health },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="glass-inset p-2">
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
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{copy.weeklyForecast}</h2>
            <p className="text-indigo-300">{horoscope.week}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                {copy.overview}
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.overview}</p>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-400" />
                {copy.loveRelationships}
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.love}</p>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
                {copy.categories.career}
              </h3>
              <p className="text-slate-300">{horoscope.career}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                {copy.moneyFinances}
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.money}</p>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-400" />
                {copy.healthWellness}
              </h3>
              <p className="text-slate-300 mb-6">{horoscope.health}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">{copy.luckyNumbers}</h4>
                  <div className="flex flex-wrap gap-1">
                    {horoscope.luckyNumbers.map((number, index) => (
                      <span
                        key={index}
                        className="rounded border border-white/10 bg-white/[0.06] px-2 py-1 text-sm text-purple-200"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">{copy.luckyColors}</h4>
                  <div className="flex flex-wrap gap-1">
                    {horoscope.luckyColors.map((color, index) => (
                      <span
                        key={index}
                        className="rounded border border-white/10 bg-white/[0.06] px-2 py-1 text-sm text-indigo-200"
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
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{copy.monthlyForecast}</h2>
            <p className="text-indigo-300">{horoscope.month} {horoscope.year}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  {copy.monthlyOverview}
                </h3>
                <p className="text-slate-300">{horoscope.overview}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-400" />
                  {copy.loveRomance}
                </h3>
                <p className="text-slate-300">{horoscope.love}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                  {copy.careerWork}
                </h3>
                <p className="text-slate-300">{horoscope.career}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  {copy.financesMoney}
                </h3>
                <p className="text-slate-300">{horoscope.finances}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-400" />
                  {copy.healthWellbeing}
                </h3>
                <p className="text-slate-300">{horoscope.health}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  {copy.keyDates}
                </h3>
                <div className="space-y-2">
                  {horoscope.keyDates.map((date, index) => (
                    <div key={index} className="glass-inset p-2 text-sm text-slate-300">
                      {date}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-inset p-4">
                <h4 className="text-white font-medium mb-2">{copy.monthlyAdvice}</h4>
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
