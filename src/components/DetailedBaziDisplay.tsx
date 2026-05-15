import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Heart, 
  Activity, 
  Calendar, 
  Star,
  Share2,
  Download,
  ChevronRight,
  Gem,
  LockKeyhole
} from 'lucide-react';
import { DetailedBaziAnalysis } from '../services/aiService';
import { useI18n } from '../i18n';

interface DetailedBaziDisplayProps {
  analysis: DetailedBaziAnalysis;
  userName: string;
}

const detailedBaziCopy = {
  en: {
    completeFor: (name: string) => `Complete BaZi Analysis for ${name}`,
    subtitle: 'Your comprehensive fortune analysis covering all aspects of life with detailed insights and predictions.',
    modules: {
      career: ['Career Forecast', 'Next 12 months career opportunities'],
      wealth: ['Wealth Analysis', 'Financial trends and investment guidance'],
      marriage: ['Marriage Destiny', 'Romance and relationship compatibility'],
      health: ['Health Insights', 'Wellness guidance and prevention'],
      annual: ['Annual Forecast', '2025-2026 monthly predictions'],
      overview: ['Life Overview', 'Complete life path analysis'],
    },
    locked: ['10-year Luck Pillars timeline', 'Year-by-year timing windows', 'Marriage and relationship timing', 'Wealth opportunities and risk map', 'Downloadable PDF report', 'AI follow-up questions'],
    premiumSections: [
      ['Chart Foundation', ['Four Pillars structure', 'Day Master strength', 'Five Elements balance', 'Hidden stems and seasonal context']],
      ['Life Area Reading', ['Career strategy', 'Wealth rhythm', 'Relationship patterns', 'Health and energy management']],
      ['Timing Layer', ['Current luck cycle', 'Annual opportunity windows', 'Risk periods', 'Decision timing notes']],
      ['Practical Plan', ['Priority actions', 'What to avoid', 'Best environments', 'Questions for deeper follow-up']],
    ],
    unlockTitle: 'Unlock Complete Analysis',
    unlockBody: "You're seeing the free preview of your fortune analysis. Unlock the Pro report for timing, Ten Gods, relationship, wealth, career, PDF, and follow-up modules.",
    upgrade: 'Upgrade Now',
    continueFree: 'Continue with Free',
    share: 'Share Reading',
    download: 'Download PDF',
    details: {
      careerSub: 'Your professional journey ahead',
      next12: 'Next 12 Months',
      recommendations: 'Recommendations',
      luckyCareerDays: 'Lucky Career Days',
      wealthSub: 'Financial fortune and investment guidance',
      overallTrend: 'Overall Trend',
      windfall: 'Windfall Opportunities',
      investment: 'Investment Advice',
      marriageSub: 'Love, relationships, and marriage timing',
      romantic: 'Romantic Fortune',
      compatibility: 'Compatibility Insights',
      bestMarriage: 'Best Marriage Time',
      healthSub: 'Wellness guidance and preventive care',
      potential: 'Potential Areas',
      preventive: 'Preventive Care',
      annualSub: 'Monthly predictions for 2025-2026',
      forecast2025: '2025 Forecast',
      forecast2026: '2026 Forecast',
      overviewSub: 'Complete life path analysis and spiritual guidance',
      overallLifeScore: 'Overall Life Score',
      scoreBasis: 'Based on complete BaZi analysis',
      strengths: 'Strengths & Challenges',
      themes: 'Life Themes',
      spiritual: 'Spiritual Path',
      fallback: 'Select a module to view detailed analysis',
    },
  },
  'zh-CN': {
    completeFor: (name: string) => `${name} 的完整八字分析`,
    subtitle: '覆盖事业、财富、关系、健康、年度节奏和人生主题的综合命理报告。',
    modules: {
      career: ['事业预测', '未来 12 个月事业机会'],
      wealth: ['财富分析', '财务趋势与投资参考'],
      marriage: ['婚恋缘分', '爱情关系与适配度'],
      health: ['健康洞察', '身心平衡与预防建议'],
      annual: ['年度预测', '2025-2026 月度趋势'],
      overview: ['人生总览', '完整人生路径分析'],
    },
    locked: ['十年大运时间轴', '逐年时间窗口', '婚恋与关系时机', '财富机会与风险地图', '可下载 PDF 报告', 'AI 追问问题'],
    premiumSections: [
      ['命盘基础', ['四柱结构', '日主强弱', '五行平衡', '藏干与季节背景']],
      ['人生领域解读', ['事业策略', '财富节奏', '关系模式', '健康与能量管理']],
      ['时间层判断', ['当前大运周期', '年度机会窗口', '风险阶段', '决策时机提示']],
      ['实用计划', ['优先行动', '需要避免的事', '适合环境', '深入追问问题']],
    ],
    unlockTitle: '解锁完整分析',
    unlockBody: '你现在看到的是免费预览。升级 Pro 报告可解锁时间判断、十神、关系、财富、事业、PDF 和 AI 追问模块。',
    upgrade: '立即升级',
    continueFree: '继续免费版',
    share: '分享解读',
    download: '下载 PDF',
    details: {
      careerSub: '你的事业发展路径',
      next12: '未来 12 个月',
      recommendations: '建议',
      luckyCareerDays: '事业有利日',
      wealthSub: '财富趋势与投资参考',
      overallTrend: '整体趋势',
      windfall: '额外机会',
      investment: '投资建议',
      marriageSub: '爱情、关系与婚姻时机',
      romantic: '桃花与感情运',
      compatibility: '适配度洞察',
      bestMarriage: '适合婚恋时机',
      healthSub: '健康平衡与预防建议',
      potential: '需要关注的方面',
      preventive: '预防建议',
      annualSub: '2025-2026 月度趋势',
      forecast2025: '2025 年预测',
      forecast2026: '2026 年预测',
      overviewSub: '人生路径与精神成长参考',
      overallLifeScore: '人生综合分',
      scoreBasis: '基于完整八字分析',
      strengths: '优势与挑战',
      themes: '人生主题',
      spiritual: '精神路径',
      fallback: '请选择一个模块查看详细分析',
    },
  },
  'zh-TW': {
    completeFor: (name: string) => `${name} 的完整八字分析`,
    subtitle: '覆蓋事業、財富、關係、健康、年度節奏和人生主題的綜合命理報告。',
    modules: {
      career: ['事業預測', '未來 12 個月事業機會'],
      wealth: ['財富分析', '財務趨勢與投資參考'],
      marriage: ['婚戀緣分', '愛情關係與適配度'],
      health: ['健康洞察', '身心平衡與預防建議'],
      annual: ['年度預測', '2025-2026 月度趨勢'],
      overview: ['人生總覽', '完整人生路徑分析'],
    },
    locked: ['十年大運時間軸', '逐年時間窗口', '婚戀與關係時機', '財富機會與風險地圖', '可下載 PDF 報告', 'AI 追問問題'],
    premiumSections: [
      ['命盤基礎', ['四柱結構', '日主強弱', '五行平衡', '藏干與季節背景']],
      ['人生領域解讀', ['事業策略', '財富節奏', '關係模式', '健康與能量管理']],
      ['時間層判斷', ['當前大運週期', '年度機會窗口', '風險階段', '決策時機提示']],
      ['實用計畫', ['優先行動', '需要避免的事', '適合環境', '深入追問問題']],
    ],
    unlockTitle: '解鎖完整分析',
    unlockBody: '你現在看到的是免費預覽。升級 Pro 報告可解鎖時間判斷、十神、關係、財富、事業、PDF 和 AI 追問模組。',
    upgrade: '立即升級',
    continueFree: '繼續免費版',
    share: '分享解讀',
    download: '下載 PDF',
    details: {
      careerSub: '你的事業發展路徑',
      next12: '未來 12 個月',
      recommendations: '建議',
      luckyCareerDays: '事業有利日',
      wealthSub: '財富趨勢與投資參考',
      overallTrend: '整體趨勢',
      windfall: '額外機會',
      investment: '投資建議',
      marriageSub: '愛情、關係與婚姻時機',
      romantic: '桃花與感情運',
      compatibility: '適配度洞察',
      bestMarriage: '適合婚戀時機',
      healthSub: '健康平衡與預防建議',
      potential: '需要關注的方面',
      preventive: '預防建議',
      annualSub: '2025-2026 月度趨勢',
      forecast2025: '2025 年預測',
      forecast2026: '2026 年預測',
      overviewSub: '人生路徑與精神成長參考',
      overallLifeScore: '人生綜合分',
      scoreBasis: '基於完整八字分析',
      strengths: '優勢與挑戰',
      themes: '人生主題',
      spiritual: '精神路徑',
      fallback: '請選擇一個模組查看詳細分析',
    },
  },
};

type DetailedBaziCopy = typeof detailedBaziCopy.en;

const DetailedBaziDisplay: React.FC<DetailedBaziDisplayProps> = ({ analysis, userName }) => {
  const { pick } = useI18n();
  const copy = pick(detailedBaziCopy);
  const [activeTab, setActiveTab] = useState<string>('career');
  const [showPreview, setShowPreview] = useState(true);

  const modules = [
    {
      id: 'career',
      title: copy.modules.career[0],
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-700',
      data: analysis.careerForecast,
      description: copy.modules.career[1]
    },
    {
      id: 'wealth',
      title: copy.modules.wealth[0],
      icon: DollarSign,
      color: 'from-green-500 to-green-700',
      data: analysis.wealthAnalysis,
      description: copy.modules.wealth[1]
    },
    {
      id: 'marriage',
      title: copy.modules.marriage[0],
      icon: Heart,
      color: 'from-pink-500 to-pink-700',
      data: analysis.marriageDestiny,
      description: copy.modules.marriage[1]
    },
    {
      id: 'health',
      title: copy.modules.health[0],
      icon: Activity,
      color: 'from-orange-500 to-orange-700',
      data: analysis.healthInsights,
      description: copy.modules.health[1]
    },
    {
      id: 'annual',
      title: copy.modules.annual[0],
      icon: Calendar,
      color: 'from-purple-500 to-purple-700',
      data: analysis.annualForecast,
      description: copy.modules.annual[1]
    },
    {
      id: 'overview',
      title: copy.modules.overview[0],
      icon: Star,
      color: 'from-yellow-500 to-yellow-700',
      data: analysis.lifeOverview,
      description: copy.modules.overview[1]
    }
  ];

  const getScoreRing = (score: number) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    return { strokeDasharray, strokeDashoffset };
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Soft starfield background */}
      <div
        className="absolute inset-0 -z-10 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#4c1d95_1px,transparent_0)] [background-size:24px_24px]"
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {copy.completeFor(userName)}
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          {copy.subtitle}
        </p>
      </motion.div>

      {/* Module Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveTab(module.id)}
            className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              activeTab === module.id ? 'ring-4 ring-amber-400/60 shadow-lg shadow-amber-400/20' : 'hover:ring-2 hover:ring-indigo-600/60'
            } rounded-2xl`}
          >
            <div className="glass-card glass-card-hover h-full overflow-hidden p-6 relative">
              {/* subtle gradient glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl pointer-events-none ${module.color.replace('from-', 'bg-gradient-to-br from-').replace(' to-', ' to-')}`}></div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color}`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <p className="text-sm text-slate-400">{module.description}</p>
                </div>
              </div>
              
              {/* Score Display */}
              {'score' in module.data && module.data.score !== undefined && (
                <div className="flex items-center justify-between">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#374151"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        {...getScoreRing('score' in module.data ? module.data.score || 0 : 0)}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{'score' in module.data ? module.data.score : 0}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Module Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel mb-8 p-8"
      >
        {renderModuleContent(activeTab, analysis, modules, copy)}
      </motion.div>

      {/* Premium Upgrade Notice */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel relative overflow-hidden p-8 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="relative z-10">
            <Gem className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {copy.unlockTitle}
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              {copy.unlockBody}
            </p>
            <div className="mx-auto mb-7 grid max-w-5xl grid-cols-1 gap-4 text-left md:grid-cols-2 lg:grid-cols-4">
              {copy.premiumSections.map((section) => {
                const [title, items] = section as [string, string[]];
                return (
                  <div key={title} className="glass-card p-4">
                    <h4 className="mb-3 font-semibold text-white">{title}</h4>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2 text-xs leading-5 text-slate-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mx-auto mb-7 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
              {copy.locked.map((module) => (
                <div key={module} className="glass-inset flex items-center gap-3 p-3">
                  <LockKeyhole className="h-4 w-4 shrink-0 text-amber-300" />
                  <span className="text-sm text-slate-200">{module}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <Link
                to="/subscription?source=reading&plan=pro#plans"
                className="glass-primary-button rounded-lg px-8 py-3 font-semibold"
              >
                {copy.upgrade}
              </Link>
              <button 
                onClick={() => setShowPreview(false)}
                className="glass-secondary-button rounded-lg px-8 py-3 font-semibold"
              >
                {copy.continueFree}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button className="glass-secondary-button flex items-center gap-2 rounded-lg px-6 py-3">
            <Share2 className="h-5 w-5" />
            {copy.share}
          </button>
          <Link
            to="/subscription?source=download&plan=pro#plans"
            className="glass-primary-button flex items-center gap-2 rounded-lg px-6 py-3"
          >
            <Download className="h-5 w-5" />
            {copy.download}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

interface ModuleData {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  data: {
    score?: number;
    next12Months?: string;
    luckyDays?: string[];
    recommendations?: string;
    overallTrend?: string;
    windfall?: string;
    investments?: string;
    romanticFortune?: string;
    compatibility?: string;
    bestMarriageTime?: string;
    potentialIssues?: string;
    preventiveCare?: string;
    year2025?: { month: string; prediction: string; score: number; }[];
    year2026?: { month: string; prediction: string; score: number; }[];
    overallScore?: number;
    strengthsWeaknesses?: string;
    lifeThemes?: string;
    spiritualPath?: string;
  };
  description: string;
}

function renderModuleContent(activeTab: string, analysis: DetailedBaziAnalysis, modules: ModuleData[], copy: DetailedBaziCopy) {
  const activeModule = modules.find(m => m.id === activeTab);
  if (!activeModule) return null;

  switch (activeTab) {
    case 'career':
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{copy.modules.career[0]}</h3>
              <p className="text-slate-400">{copy.details.careerSub}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{copy.details.next12}</h4>
              <p className="text-slate-300 mb-6">{analysis.careerForecast.next12Months}</p>
              
              <h4 className="text-lg font-semibold text-white mb-4">{copy.details.recommendations}</h4>
              <p className="text-slate-300">{analysis.careerForecast.recommendations}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{copy.details.luckyCareerDays}</h4>
              <div className="space-y-3">
                {analysis.careerForecast.luckyDays.map((day, index) => (
                  <div key={index} className="glass-inset p-3">
                    <span className="text-blue-300 text-sm">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'wealth':
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{copy.modules.wealth[0]}</h3>
              <p className="text-slate-400">{copy.details.wealthSub}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">{copy.details.overallTrend}</h4>
              <p className="text-slate-300 text-sm">{analysis.wealthAnalysis.overallTrend}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-yellow-300 mb-3">{copy.details.windfall}</h4>
              <p className="text-slate-300 text-sm">{analysis.wealthAnalysis.windfall}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">{copy.details.investment}</h4>
              <p className="text-slate-300 text-sm">{analysis.wealthAnalysis.investments}</p>
            </div>
          </div>
        </div>
      );

    case 'marriage':
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-700">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{copy.modules.marriage[0]}</h3>
              <p className="text-slate-400">{copy.details.marriageSub}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-pink-300 mb-3">{copy.details.romantic}</h4>
              <p className="text-slate-300">{analysis.marriageDestiny.romanticFortune}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">{copy.details.compatibility}</h4>
                <p className="text-slate-300">{analysis.marriageDestiny.compatibility}</p>
              </div>
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-red-300 mb-3">{copy.details.bestMarriage}</h4>
                <p className="text-slate-300">{analysis.marriageDestiny.bestMarriageTime}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'health':
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{copy.modules.health[0]}</h3>
              <p className="text-slate-400">{copy.details.healthSub}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-3">{copy.details.potential}</h4>
              <p className="text-slate-300 text-sm">{analysis.healthInsights.potentialIssues}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">{copy.details.preventive}</h4>
              <p className="text-slate-300 text-sm">{analysis.healthInsights.preventiveCare}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">{copy.details.recommendations}</h4>
              <p className="text-slate-300 text-sm">{analysis.healthInsights.recommendations}</p>
            </div>
          </div>
        </div>
      );

    case 'annual':
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{copy.modules.annual[0]}</h3>
              <p className="text-slate-400">{copy.details.annualSub}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">{copy.details.forecast2025}</h4>
              <div className="space-y-3">
                {analysis.annualForecast.year2025.map((month, index) => (
                  <div key={index} className="glass-inset p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-purple-300">{month.month}</span>
                      <span className="rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-200">{month.score}/100</span>
                    </div>
                    <p className="text-slate-300 text-sm">{month.prediction}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">{copy.details.forecast2026}</h4>
              <div className="space-y-3">
                {analysis.annualForecast.year2026.map((month, index) => (
                  <div key={index} className="glass-inset p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-indigo-300">{month.month}</span>
                      <span className="rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-200">{month.score}/100</span>
                    </div>
                    <p className="text-slate-300 text-sm">{month.prediction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'overview':
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{copy.modules.overview[0]}</h3>
              <p className="text-slate-400">{copy.details.overviewSub}</p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="glass-card inline-flex items-center gap-4 p-6">
              <div className="text-4xl font-bold text-yellow-400">
                {analysis.lifeOverview.overallScore}/100
              </div>
              <div>
                <div className="text-white font-semibold">{copy.details.overallLifeScore}</div>
                <div className="text-slate-400 text-sm">{copy.details.scoreBasis}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-3">{copy.details.strengths}</h4>
                <p className="text-slate-300">{analysis.lifeOverview.strengthsWeaknesses}</p>
              </div>
              
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">{copy.details.themes}</h4>
                <p className="text-slate-300">{analysis.lifeOverview.lifeThemes}</p>
              </div>
            </div>
            
            <div>
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-indigo-300 mb-3">{copy.details.spiritual}</h4>
                <p className="text-slate-300">{analysis.lifeOverview.spiritualPath}</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <div className="text-white">{copy.details.fallback}</div>;
  }
}

export default DetailedBaziDisplay;
