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

interface DetailedBaziDisplayProps {
  analysis: DetailedBaziAnalysis;
  userName: string;
}

const DetailedBaziDisplay: React.FC<DetailedBaziDisplayProps> = ({ analysis, userName }) => {
  const [activeTab, setActiveTab] = useState<string>('career');
  const [showPreview, setShowPreview] = useState(true);

  const modules = [
    {
      id: 'career',
      title: 'Career Forecast',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-700',
      data: analysis.careerForecast,
      description: 'Next 12 months career opportunities'
    },
    {
      id: 'wealth',
      title: 'Wealth Analysis',
      icon: DollarSign,
      color: 'from-green-500 to-green-700',
      data: analysis.wealthAnalysis,
      description: 'Financial trends and investment guidance'
    },
    {
      id: 'marriage',
      title: 'Marriage Destiny',
      icon: Heart,
      color: 'from-pink-500 to-pink-700',
      data: analysis.marriageDestiny,
      description: 'Romance and relationship compatibility'
    },
    {
      id: 'health',
      title: 'Health Insights',
      icon: Activity,
      color: 'from-orange-500 to-orange-700',
      data: analysis.healthInsights,
      description: 'Wellness guidance and prevention'
    },
    {
      id: 'annual',
      title: 'Annual Forecast',
      icon: Calendar,
      color: 'from-purple-500 to-purple-700',
      data: analysis.annualForecast,
      description: '2025-2026 monthly predictions'
    },
    {
      id: 'overview',
      title: 'Life Overview',
      icon: Star,
      color: 'from-yellow-500 to-yellow-700',
      data: analysis.lifeOverview,
      description: 'Complete life path analysis'
    }
  ];

  const lockedModules = [
    '10-year Luck Pillars timeline',
    'Year-by-year timing windows',
    'Marriage and relationship timing',
    'Wealth opportunities and risk map',
    'Downloadable PDF report',
    'AI follow-up questions'
  ];

  const premiumReportSections = [
    {
      title: 'Chart Foundation',
      items: ['Four Pillars structure', 'Day Master strength', 'Five Elements balance', 'Hidden stems and seasonal context'],
    },
    {
      title: 'Life Area Reading',
      items: ['Career strategy', 'Wealth rhythm', 'Relationship patterns', 'Health and energy management'],
    },
    {
      title: 'Timing Layer',
      items: ['Current luck cycle', 'Annual opportunity windows', 'Risk periods', 'Decision timing notes'],
    },
    {
      title: 'Practical Plan',
      items: ['Priority actions', 'What to avoid', 'Best environments', 'Questions for deeper follow-up'],
    },
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
          Complete BaZi Analysis for {userName}
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Your comprehensive fortune analysis covering all aspects of life with detailed insights and predictions.
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
        {renderModuleContent(activeTab, analysis, modules)}
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
              Unlock Complete Analysis
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              You're seeing the free preview of your fortune analysis. Unlock the Pro report for timing,
              Ten Gods, relationship, wealth, career, PDF, and follow-up modules.
            </p>
            <div className="mx-auto mb-7 grid max-w-5xl grid-cols-1 gap-4 text-left md:grid-cols-2 lg:grid-cols-4">
              {premiumReportSections.map((section) => (
                <div key={section.title} className="glass-card p-4">
                  <h4 className="mb-3 font-semibold text-white">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-xs leading-5 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mx-auto mb-7 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
              {lockedModules.map((module) => (
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
                Upgrade Now
              </Link>
              <button 
                onClick={() => setShowPreview(false)}
                className="glass-secondary-button rounded-lg px-8 py-3 font-semibold"
              >
                Continue with Free
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
            Share Reading
          </button>
          <Link
            to="/subscription?source=download&plan=pro#plans"
            className="glass-primary-button flex items-center gap-2 rounded-lg px-6 py-3"
          >
            <Download className="h-5 w-5" />
            Download PDF
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

function renderModuleContent(activeTab: string, analysis: DetailedBaziAnalysis, modules: ModuleData[]) {
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
              <h3 className="text-2xl font-bold text-white">Career Forecast</h3>
              <p className="text-slate-400">Your professional journey ahead</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Next 12 Months</h4>
              <p className="text-slate-300 mb-6">{analysis.careerForecast.next12Months}</p>
              
              <h4 className="text-lg font-semibold text-white mb-4">Recommendations</h4>
              <p className="text-slate-300">{analysis.careerForecast.recommendations}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Lucky Career Days</h4>
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
              <h3 className="text-2xl font-bold text-white">Wealth Analysis</h3>
              <p className="text-slate-400">Financial fortune and investment guidance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">Overall Trend</h4>
              <p className="text-slate-300 text-sm">{analysis.wealthAnalysis.overallTrend}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-yellow-300 mb-3">Windfall Opportunities</h4>
              <p className="text-slate-300 text-sm">{analysis.wealthAnalysis.windfall}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">Investment Advice</h4>
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
              <h3 className="text-2xl font-bold text-white">Marriage Destiny</h3>
              <p className="text-slate-400">Love, relationships, and marriage timing</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-pink-300 mb-3">Romantic Fortune</h4>
              <p className="text-slate-300">{analysis.marriageDestiny.romanticFortune}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Compatibility Insights</h4>
                <p className="text-slate-300">{analysis.marriageDestiny.compatibility}</p>
              </div>
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-red-300 mb-3">Best Marriage Time</h4>
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
              <h3 className="text-2xl font-bold text-white">Health Insights</h3>
              <p className="text-slate-400">Wellness guidance and preventive care</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-3">Potential Areas</h4>
              <p className="text-slate-300 text-sm">{analysis.healthInsights.potentialIssues}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">Preventive Care</h4>
              <p className="text-slate-300 text-sm">{analysis.healthInsights.preventiveCare}</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">Recommendations</h4>
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
              <h3 className="text-2xl font-bold text-white">Annual Forecast</h3>
              <p className="text-slate-400">Monthly predictions for 2025-2026</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">2025 Forecast</h4>
              <div className="space-y-3">
                {analysis.annualForecast.year2025.map((month, index) => (
                  <div key={index} className="glass-inset p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-purple-300">{month.month}</span>
                      <span className="text-sm text-yellow-400">★ {month.score}/100</span>
                    </div>
                    <p className="text-slate-300 text-sm">{month.prediction}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">2026 Forecast</h4>
              <div className="space-y-3">
                {analysis.annualForecast.year2026.map((month, index) => (
                  <div key={index} className="glass-inset p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-indigo-300">{month.month}</span>
                      <span className="text-sm text-yellow-400">★ {month.score}/100</span>
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
              <h3 className="text-2xl font-bold text-white">Life Overview</h3>
              <p className="text-slate-400">Complete life path analysis and spiritual guidance</p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="glass-card inline-flex items-center gap-4 p-6">
              <div className="text-4xl font-bold text-yellow-400">
                {analysis.lifeOverview.overallScore}/100
              </div>
              <div>
                <div className="text-white font-semibold">Overall Life Score</div>
                <div className="text-slate-400 text-sm">Based on complete BaZi analysis</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-3">Strengths & Challenges</h4>
                <p className="text-slate-300">{analysis.lifeOverview.strengthsWeaknesses}</p>
              </div>
              
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Life Themes</h4>
                <p className="text-slate-300">{analysis.lifeOverview.lifeThemes}</p>
              </div>
            </div>
            
            <div>
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-indigo-300 mb-3">Spiritual Path</h4>
                <p className="text-slate-300">{analysis.lifeOverview.spiritualPath}</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <div className="text-white">Select a module to view detailed analysis</div>;
  }
}

export default DetailedBaziDisplay;
