import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BirthData } from './BirthDateForm';
import {
  BarChart3,
  Briefcase,
  Calendar,
  Clock,
  Compass,
  Flame,
  Gem,
  Heart,
  Leaf,
  MessageCircle,
  MapPin,
  Mountain,
  Settings2,
  Star,
  Waves,
} from 'lucide-react';
import { analyzeBazi, BaziAnalysis } from '../services/baziAnalysisService';
import { calculateBaziChart } from '../services/baziCore';
import { useI18n } from '../i18n';

interface BasicResultsDisplayProps {
  formData: BirthData;
}

const BasicResultsDisplay: React.FC<BasicResultsDisplayProps> = ({ formData }) => {
  const [analysis, setAnalysis] = useState<BaziAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { pick } = useI18n();

  const text = useMemo(() => pick({
    en: {
      loadingSteps: [
        ['Calculating celestial coordinates and birth chart positions...', 'Determining exact astronomical positions at your birth time'],
        ['Analyzing Five Elements balance and interactions...', 'Examining Wood, Fire, Earth, Metal, and Water influences'],
        ['Computing Four Pillars and Heavenly Stems combinations...', 'Processing Year, Month, Day, and Hour pillars'],
        ['Interpreting Zodiac influences and personality traits...', 'Understanding your Chinese zodiac characteristics'],
        ['Generating life path predictions and guidance...', 'Creating personalized insights and recommendations'],
      ],
      whyTitle: 'Why does this take time?',
      whyBody: 'Fortune analysis requires precise calculations of celestial positions, elemental interactions, and complex astrological computations.',
      eyebrow: 'BaZi Chart',
      title: 'Your Four Pillars Overview',
      birthInfo: 'Birth Information',
      chartIdentity: 'Chart Identity',
      dayMaster: 'Day Master',
      rules: 'Calculation Rules',
      snapshot: 'Four Pillars Snapshot',
      pillar: 'Pillar',
      stem: 'Heavenly Stem',
      branch: 'Earthly Branch',
      elements: 'Elements',
      tenGod: 'Ten God',
      hiddenStems: 'Hidden Stems',
      focus: 'Reading Focus',
      elemental: 'Elemental Analysis',
      distribution: 'Birth Elements Distribution',
      howToRead: 'How to read this section',
      strongest: 'Strongest signal',
      weakest: 'Weakest signal',
      engineNote: 'This overview now comes from the shared chart engine, including stems, branches, hidden stems, Ten Gods, and weighted element scores.',
      summaryTitle: 'Chart Summary',
      strongestElement: 'Dominant element',
      weakestElement: 'Element to support',
      dayMasterLabel: 'Day Master element',
      timeConfidence: 'Time confidence',
      notes: 'Calculation Notes',
      strengths: 'Core Strengths',
      challenges: 'Growth Challenges',
      lifePhase: 'Current Life Phase',
      opportunities: 'Upcoming Opportunities',
      risks: 'Areas to Watch',
      recommendations: 'Practical Recommendations',
      detailedGuidance: 'Detailed Life Guidance',
      wealth: 'Wealth & Resources',
      health: 'Health & Balance',
      career: 'Career Path',
      relationship: 'Relationship Dynamics',
      ctaLine1: 'This analysis provides a comprehensive view of your celestial blueprint.',
      ctaLine2: 'Looking for even deeper insights such as precise timing for major life events and year-by-year forecasts? Tap into our advanced engine.',
      cta: 'Explore More on FacePalm AI',
      followUpTitle: 'Useful follow-up questions',
      followUpHint: 'Use these prompts to move from a general chart into practical timing and decisions.',
      followUps: [
        'What should I focus on this year?',
        'When is a better window for career change?',
        'What relationship pattern should I watch?',
        'How can I balance my weakest element?',
      ],
      ruleLabels: {},
    },
    'zh-CN': {
      loadingSteps: [
        ['正在计算出生时空与命盘位置...', '根据出生时间推定命盘基础位置'],
        ['正在分析五行平衡与互动...', '检查木、火、土、金、水的分布'],
        ['正在计算四柱与天干组合...', '处理年柱、月柱、日柱、时柱'],
        ['正在解读生肖与性格信号...', '理解生肖和命盘特征'],
        ['正在生成生命路径建议...', '整理个性化洞察和建议'],
      ],
      whyTitle: '为什么需要一点时间？',
      whyBody: '命理分析需要处理出生时间、五行互动和多层命盘结构。',
      eyebrow: '八字命盘',
      title: '你的四柱概览',
      birthInfo: '出生信息',
      chartIdentity: '命盘身份',
      dayMaster: '日主',
      rules: '计算规则',
      snapshot: '四柱快照',
      pillar: '柱位',
      stem: '天干',
      branch: '地支',
      elements: '五行',
      tenGod: '十神',
      hiddenStems: '藏干',
      focus: '解读重点',
      elemental: '五行分析',
      distribution: '出生五行分布',
      howToRead: '如何阅读这一部分',
      strongest: '最强信号',
      weakest: '最弱信号',
      engineNote: '此概览来自统一命盘引擎，包含天干、地支、藏干、十神和加权五行分数。',
      summaryTitle: '命盘摘要',
      strongestElement: '主导五行',
      weakestElement: '需要补足',
      dayMasterLabel: '日主五行',
      timeConfidence: '时间可信度',
      notes: '计算说明',
      strengths: '核心优势',
      challenges: '成长挑战',
      lifePhase: '当前人生阶段',
      opportunities: '未来机会',
      risks: '需要留意的方面',
      recommendations: '实用建议',
      detailedGuidance: '详细人生指导',
      wealth: '财富与资源',
      health: '健康与平衡',
      career: '事业路径',
      relationship: '关系动态',
      ctaLine1: '这份分析提供了你的命盘结构概览。',
      ctaLine2: '如果你需要更深入的重大事件时间点和逐年预测，可以继续解锁高级解读。',
      cta: '查看更多 FacePalm AI 解读',
      followUpTitle: '可以继续追问的问题',
      followUpHint: '从总览报告进入更具体的时机、选择和行动建议。',
      followUps: [
        '今年最应该把重心放在哪里？',
        '什么时候更适合换工作？',
        '感情里最需要注意什么模式？',
        '如何补足命盘里较弱的五行？',
      ],
      ruleLabels: {
        'Solar calendar input': '阳历输入',
        'Lunar calendar input': '农历输入',
        'Leap lunar month selected': '已选择农历闰月',
        'No leap month': '非闰月',
        'True solar time enabled': '已启用真太阳时',
        'Clock time mode': '使用钟表时间',
        'Midnight day boundary': '午夜换日',
        'Zi hour day boundary': '子时换日',
        'Lunar New Year boundary': '春节换年',
        'Li Chun year boundary': '立春换年',
        'Birth time unknown': '出生时间未知',
        'exact birth time': '准确出生时间',
        'approximate birth time': '大概出生时间',
      },
    },
    'zh-TW': {
      loadingSteps: [
        ['正在計算出生時空與命盤位置...', '根據出生時間推定命盤基礎位置'],
        ['正在分析五行平衡與互動...', '檢查木、火、土、金、水的分布'],
        ['正在計算四柱與天干組合...', '處理年柱、月柱、日柱、時柱'],
        ['正在解讀生肖與性格訊號...', '理解生肖和命盤特徵'],
        ['正在生成生命路徑建議...', '整理個人化洞察和建議'],
      ],
      whyTitle: '為什麼需要一點時間？',
      whyBody: '命理分析需要處理出生時間、五行互動和多層命盤結構。',
      eyebrow: '八字命盤',
      title: '你的四柱概覽',
      birthInfo: '出生資訊',
      chartIdentity: '命盤身份',
      dayMaster: '日主',
      rules: '計算規則',
      snapshot: '四柱快照',
      pillar: '柱位',
      stem: '天干',
      branch: '地支',
      elements: '五行',
      tenGod: '十神',
      hiddenStems: '藏干',
      focus: '解讀重點',
      elemental: '五行分析',
      distribution: '出生五行分布',
      howToRead: '如何閱讀這一部分',
      strongest: '最強訊號',
      weakest: '最弱訊號',
      engineNote: '此概覽來自統一命盤引擎，包含天干、地支、藏干、十神和加權五行分數。',
      summaryTitle: '命盤摘要',
      strongestElement: '主導五行',
      weakestElement: '需要補足',
      dayMasterLabel: '日主五行',
      timeConfidence: '時間可信度',
      notes: '計算說明',
      strengths: '核心優勢',
      challenges: '成長挑戰',
      lifePhase: '當前人生階段',
      opportunities: '未來機會',
      risks: '需要留意的方面',
      recommendations: '實用建議',
      detailedGuidance: '詳細人生指導',
      wealth: '財富與資源',
      health: '健康與平衡',
      career: '事業路徑',
      relationship: '關係動態',
      ctaLine1: '這份分析提供了你的命盤結構概覽。',
      ctaLine2: '如果你需要更深入的重大事件時間點和逐年預測，可以繼續解鎖高級解讀。',
      cta: '查看更多 FacePalm AI 解讀',
      followUpTitle: '可以繼續追問的問題',
      followUpHint: '從總覽報告進入更具體的時機、選擇和行動建議。',
      followUps: [
        '今年最應該把重心放在哪裡？',
        '什麼時候更適合換工作？',
        '感情裡最需要注意什麼模式？',
        '如何補足命盤裡較弱的五行？',
      ],
      ruleLabels: {
        'Solar calendar input': '陽曆輸入',
        'Lunar calendar input': '農曆輸入',
        'Leap lunar month selected': '已選擇農曆閏月',
        'No leap month': '非閏月',
        'True solar time enabled': '已啟用真太陽時',
        'Clock time mode': '使用鐘錶時間',
        'Midnight day boundary': '午夜換日',
        'Zi hour day boundary': '子時換日',
        'Lunar New Year boundary': '春節換年',
        'Li Chun year boundary': '立春換年',
        'Birth time unknown': '出生時間未知',
        'exact birth time': '準確出生時間',
        'approximate birth time': '大概出生時間',
      },
    },
  }), [pick]);

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true);
      setLoadingStep(0);
      setProgress(0);
      
      const steps = [
        { message: text.loadingSteps[0][0], duration: 1200 },
        { message: text.loadingSteps[1][0], duration: 1000 },
        { message: text.loadingSteps[2][0], duration: 800 },
        { message: text.loadingSteps[3][0], duration: 600 },
        { message: text.loadingSteps[4][0], duration: 400 }
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
            console.log('Starting real API analysis...');
            const result = await analyzeBazi(formData);
            console.log('API analysis completed:', result);
            setAnalysis(result);
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
          } catch (error) {
            console.error('API analysis failed:', error);
            // Show error or fallback to mock data
            setLoading(false);
          }
        }
      };

      processStep();
    };

    performAnalysis();
  }, [formData, text.loadingSteps]);

  if (loading) {
    const steps = [
      { message: text.loadingSteps[0][0], description: text.loadingSteps[0][1] },
      { message: text.loadingSteps[1][0], description: text.loadingSteps[1][1] },
      { message: text.loadingSteps[2][0], description: text.loadingSteps[2][1] },
      { message: text.loadingSteps[3][0], description: text.loadingSteps[3][1] },
      { message: text.loadingSteps[4][0], description: text.loadingSteps[4][1] }
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
            {/* Rotating chart marks */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="relative w-full h-full">
                {[Compass, BarChart3, Star, Clock].map((Icon, index) => (
                  <div
                    key={index}
                    className="absolute flex h-7 w-7 items-center justify-center rounded-md border border-amber-300/20 bg-slate-950/60 text-amber-300"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-70px)`
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
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
          <div className="glass-card p-4">
            <p className="text-indigo-200 text-sm leading-relaxed">
              <strong>{text.whyTitle}</strong><br/>
              {text.whyBody}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const chart = calculateBaziChart(formData);
  const maxElementCount = Math.max(...Object.values(chart.elementScores), 1);
  const summaryItems = [
    {
      label: text.strongestElement,
      value: chart.strongestElement,
      icon: <BarChart3 className="h-5 w-5" />,
      tone: 'text-emerald-300',
    },
    {
      label: text.weakestElement,
      value: chart.weakestElement,
      icon: <Sparkles className="h-5 w-5" />,
      tone: 'text-amber-300',
    },
    {
      label: text.dayMasterLabel,
      value: chart.dayMasterElement,
      icon: <Compass className="h-5 w-5" />,
      tone: 'text-sky-300',
    },
    {
      label: text.timeConfidence,
      value: formData.timeAccuracy,
      icon: <Clock className="h-5 w-5" />,
      tone: 'text-violet-300',
    },
  ];

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
        className="glass-panel mb-8 p-6 md:p-8"
      >
        <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              {text.eyebrow}
            </p>
            <h2 className="text-2xl font-serif text-white">
              {text.title}
            </h2>
          </div>
          <div className="glass-inset inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-300">
            <Settings2 className="h-4 w-4 text-amber-400" />
            {formData.useSolarTime ? 'True solar time' : 'Clock time'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-4">
            <h3 className="text-lg text-amber-400 mb-4">{text.birthInfo}</h3>
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
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                <span className="text-slate-300">{formData.location}</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="text-lg text-amber-400 mb-4">{text.chartIdentity}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 rounded-full border border-amber-300/20 bg-amber-300/10 p-3 backdrop-blur-xl">
                  <Compass className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <span className="block text-white text-xl">{chart.zodiac}</span>
                  <span className="text-slate-400 text-sm">
                    {chart.pillars[0].stem}-{chart.pillars[0].branch}, {chart.dayMasterElement} {text.dayMaster}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card mb-8 p-4">
          <h3 className="mb-4 text-lg text-amber-400">{text.rules}</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {chart.rules.map((rule) => (
              <div key={rule} className="glass-inset px-3 py-2 text-sm text-slate-300">
                {text.ruleLabels[rule as keyof typeof text.ruleLabels] ?? rule}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card mb-8 p-4">
          <h3 className="mb-4 text-lg text-amber-400">{text.summaryTitle}</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summaryItems.map((item) => (
              <div key={item.label} className="glass-inset p-4">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] ${item.tone}`}>
                  {item.icon}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">{item.label}</div>
                <div className="mt-1 text-lg font-semibold capitalize text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card mb-8 overflow-x-auto p-4">
          <h3 className="mb-4 text-lg text-amber-400">{text.snapshot}</h3>
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm text-slate-400">
                <th className="py-3 pr-4 font-medium">{text.pillar}</th>
                <th className="px-4 py-3 font-medium">{text.stem}</th>
                <th className="px-4 py-3 font-medium">{text.branch}</th>
                <th className="px-4 py-3 font-medium">{text.elements}</th>
                <th className="px-4 py-3 font-medium">{text.tenGod}</th>
                <th className="px-4 py-3 font-medium">{text.hiddenStems}</th>
                <th className="py-3 pl-4 font-medium">{text.focus}</th>
              </tr>
            </thead>
            <tbody>
              {chart.pillars.map((pillar) => (
                <tr key={pillar.label} className="border-b border-white/10 last:border-0">
                  <td className="py-4 pr-4 font-semibold text-white">{pillar.label}</td>
                  <td className="px-4 py-4 text-amber-300">{pillar.stem}</td>
                  <td className="px-4 py-4 text-slate-200">{pillar.branch}</td>
                  <td className="px-4 py-4 text-slate-200">{pillar.stemElement} / {pillar.branchElement}</td>
                  <td className="px-4 py-4 text-slate-200">{pillar.tenGod}</td>
                  <td className="px-4 py-4 text-slate-300">{pillar.hiddenStems.join(', ')}</td>
                  <td className="py-4 pl-4 text-sm text-slate-300">{pillar.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card mb-8 p-4">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg text-amber-400">{text.elemental}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white mb-3">{text.distribution}</h4>
              <div className="space-y-3">
                {Object.entries(chart.elementScores).map(([element, count]) => (
                  <div key={element}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="flex items-center text-slate-300">
                        {getElementIcon(element)}
                        <span className="ml-2">{element}</span>
                      </span>
                      <span className="text-sm text-slate-400">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-amber-400"
                        style={{ width: `${Math.max((count / maxElementCount) * 100, 12)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-inset p-4">
              <h4 className="mb-3 text-white">{text.howToRead}</h4>
              <p className="text-sm leading-6 text-slate-300">
                {text.strongest}: {chart.strongestElement}. {text.weakest}: {chart.weakestElement}.
                {text.engineNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
          <h3 className="mb-3 text-lg text-amber-300">{text.notes}</h3>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {chart.notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="glass-card p-5">
            <h3 className="mb-4 text-lg text-amber-400">{text.strengths}</h3>
            <ul className="space-y-3">
              {analysis.personalityAnalysis.strengths.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card p-5">
            <h3 className="mb-4 text-lg text-amber-400">{text.challenges}</h3>
            <ul className="space-y-3">
              {analysis.personalityAnalysis.challenges.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="glass-card mb-8 p-5">
          <h3 className="mb-4 text-lg text-amber-400">{text.lifePhase}</h3>
          <p className="text-sm leading-7 text-slate-300">{analysis.lifePath.currentPhase}</p>
        </section>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            { title: text.opportunities, items: analysis.lifePath.opportunities, dot: 'bg-emerald-400' },
            { title: text.risks, items: analysis.lifePath.challenges, dot: 'bg-red-400' },
            { title: text.recommendations, items: analysis.lifePath.recommendations, dot: 'bg-sky-400' },
          ].map((section) => (
            <section key={section.title} className="glass-card p-5">
              <h3 className="mb-4 text-lg text-amber-400">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${section.dot}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="glass-card mb-8 p-5">
          <h3 className="mb-5 text-lg text-amber-400">{text.detailedGuidance}</h3>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {[
              { title: text.career, body: analysis.detailedGuidance.career },
              { title: text.relationship, body: analysis.detailedGuidance.relationships },
              { title: text.health, body: analysis.detailedGuidance.health },
              { title: text.wealth, body: analysis.detailedGuidance.wealth },
            ].map((section) => (
              <article key={section.title} className="glass-inset p-4">
                <h4 className="mb-3 font-semibold text-white">{section.title}</h4>
                <p className="text-sm leading-7 text-slate-300">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card mb-8 p-5">
          <div className="mb-5 flex items-start gap-3">
            <div className="glass-inset flex h-10 w-10 shrink-0 items-center justify-center text-amber-300">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg text-amber-400">{text.followUpTitle}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">{text.followUpHint}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {text.followUps.map((question) => (
              <Link
                key={question}
                to="/readings"
                className="glass-inset text-left px-4 py-3 text-sm leading-6 text-slate-200 transition hover:border-amber-300/40 hover:text-amber-200"
              >
                {question}
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-4">
            <h3 className="flex items-center text-lg text-amber-400 mb-4">
              <Briefcase className="h-5 w-5 mr-2" />
              {text.career}
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
          
          <div className="glass-card p-4">
            <h3 className="flex items-center text-lg text-amber-400 mb-4">
              <Heart className="h-5 w-5 mr-2" />
              {text.relationship}
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
          <p>{text.ctaLine1}</p>
          <p className="mb-4">{text.ctaLine2}</p>
          <a
            href="https://facepalmai.com" target="_blank" rel="noopener noreferrer"
            className="glass-primary-button mt-2 inline-block rounded-lg px-6 py-3 font-semibold"
          >
            {text.cta}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicResultsDisplay;
