import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpenCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  LockKeyhole,
  MessageCircle,
  Shield,
  Sparkles,
} from 'lucide-react';
import PremiumFeatures from '../components/PremiumFeatures';
import { useI18n } from '../i18n';

const Subscription: React.FC = () => {
  const { pick } = useI18n();
  const location = useLocation();
  const text = pick({
    en: {
      eyebrow: 'Premium BaZi Report',
      title: 'Unlock the full story behind your Four Pillars chart',
      subtitle: 'Go beyond a quick zodiac summary with a structured BaZi report covering your Day Master, Five Elements balance, Ten Gods, major luck cycles, and practical timing guidance.',
      conversionEyebrow: 'Full report is ready',
      conversionTitle: 'You are one step away from unlocking the complete reading',
      conversionSubtitle: 'Your free result already shows the chart foundation. Choose a premium report to unlock timing, Ten Gods, relationship, wealth, career, PDF, and follow-up modules.',
      viewPlans: 'View Plans',
      tryFree: 'Try Free Reading First',
      selectedPlan: 'Selected plan',
      planNames: { essential: 'Essential', pro: 'Pro', annual: 'Annual' },
      sample: 'Sample premium report',
      dashboard: 'BaZi Insight Dashboard',
      fullAccess: 'Full Access',
      pillars: ['Year', 'Month', 'Day', 'Hour'],
      modules: [
        ['Four Pillars Chart', 'Year, month, day, and hour pillars with heavenly stems, earthly branches, hidden stems, and Day Master context.'],
        ['Five Elements Balance', 'A clear breakdown of Wood, Fire, Earth, Metal, and Water strength so users can understand excess, lack, and balance.'],
        ['Ten Gods Reading', 'Career, wealth, relationship, and personality patterns explained through the Ten Gods instead of generic advice.'],
        ['Luck Pillars & Annual Forecast', 'A timeline view of major luck cycles, yearly themes, and timing guidance for important decisions.'],
      ],
      trust: [
        ['Built Around BaZi Logic', 'The premium report is structured around chart data first, then interpretation, so the reading feels specific to the user.'],
        ['Readable, Not Overwhelming', 'Advanced terms are translated into plain guidance while still keeping the professional chart details visible.'],
        ['Report You Can Revisit', 'The paid experience is positioned as a decision reference for the year, not a one-time novelty result.'],
      ],
      compareTitle: 'Free vs Premium',
      compareSubtitle: 'Keep the free reading useful, then unlock the sections that require deeper interpretation.',
      repeat: 'Designed for repeat reference',
      reportSection: 'Report Section',
      free: 'Free',
      premium: 'Premium',
      rows: ['Basic birth chart summary', 'Four Pillars table with pillar meaning', 'Five Elements strength explanation', 'Ten Gods personality and career reading', 'Luck Pillars and yearly timing guidance', 'Relationship, wealth, health, and career modules', 'Downloadable report and follow-up questions'],
      scopeTitle: 'Clear scope, no vague promise',
      scopeBody: 'Premium readings are presented as structured astrology reports for self-reflection and planning. They are not medical, legal, or financial advice. The value is clarity, context, and a report you can revisit as life circumstances change.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        ['Is this different from the free BaZi reading?', 'Yes. The free reading is designed to give a quick overview. Premium unlocks the full report structure: Ten Gods, luck cycle timing, deeper life-area modules, and a clearer explanation of what the chart suggests.'],
        ['What birth information should I prepare?', 'Use your birth date, birth time, gender, and birth location. Exact time gives the strongest reading because the hour pillar can change relationship, career, and timing details.'],
        ['Can I use the report for career or relationship decisions?', 'The report is designed as a reflection and planning tool. It highlights tendencies, timing windows, and risk areas, but important legal, medical, or financial decisions should still use professional advice.'],
        ['Will the report be easy to understand if I am new to BaZi?', 'Yes. The layout keeps the professional chart visible, then explains each section in practical language so beginners can follow the reading without losing the traditional structure.'],
      ],
    },
    'zh-CN': {
      eyebrow: '高级八字报告',
      title: '解锁四柱命盘背后的完整故事',
      subtitle: '不止是生肖概览。高级报告覆盖日主、五行平衡、十神、大运周期和实用时间建议。',
      conversionEyebrow: '完整报告已准备好',
      conversionTitle: '只差一步，解锁完整八字解读',
      conversionSubtitle: '免费结果已经给出命盘基础。选择高级报告即可解锁时间判断、十神、关系、财富、事业、PDF 和 AI 追问模块。',
      viewPlans: '查看套餐',
      tryFree: '先体验免费排盘',
      selectedPlan: '已选择套餐',
      planNames: { essential: '基础报告', pro: '专业报告', annual: '年度会员' },
      sample: '高级报告示例',
      dashboard: '八字洞察面板',
      fullAccess: '完整权限',
      pillars: ['年柱', '月柱', '日柱', '时柱'],
      modules: [
        ['四柱命盘', '年、月、日、时四柱，包含天干、地支、藏干和日主背景。'],
        ['五行平衡', '清晰拆解木、火、土、金、水强弱，帮助理解过旺、不足和平衡。'],
        ['十神解读', '通过十神解释事业、财富、关系和性格模式，而不是泛泛建议。'],
        ['大运与流年', '用时间轴展示主要大运周期、年度主题和重要决策时间背景。'],
      ],
      trust: [
        ['围绕八字逻辑构建', '高级报告先基于命盘结构，再进行解释，因此更贴近具体用户。'],
        ['专业但不压迫', '保留专业命理细节，同时用更通俗的语言解释。'],
        ['可反复查看的报告', '付费体验定位为年度决策参考，而不是一次性娱乐结果。'],
      ],
      compareTitle: '免费版 vs 高级版',
      compareSubtitle: '免费解读保持有用，高级版解锁需要更深解释的部分。',
      repeat: '适合反复参考',
      reportSection: '报告模块',
      free: '免费',
      premium: '高级',
      rows: ['基础命盘摘要', '四柱表和柱位含义', '五行强弱解释', '十神性格和事业解读', '大运与年度时间建议', '关系、财富、健康、事业模块', '报告下载和 AI 追问'],
      scopeTitle: '范围清晰，不做虚假承诺',
      scopeBody: '高级解读是用于自我理解和规划的结构化命理报告，不构成医疗、法律或金融建议。价值在于清晰、上下文和可反复查看的参考。',
      faqTitle: '常见问题',
      faqs: [
        ['这和免费八字解读有什么区别？', '免费解读提供快速概览。高级版解锁完整报告结构，包括十神、大运时间、人生领域模块和更清晰的命盘解释。'],
        ['我需要准备哪些出生信息？', '请准备出生日期、出生时间、性别和出生地点。时间越准确，时柱相关的关系、事业和时间判断越可靠。'],
        ['可以用报告做事业或关系决策吗？', '报告适合作为反思和规划工具，可提示倾向、时间窗口和风险点，但重要法律、医疗或金融决策仍需专业意见。'],
        ['新手能看懂吗？', '可以。页面保留专业命盘结构，同时用实用语言解释每个部分。'],
      ],
    },
    'zh-TW': {
      eyebrow: '高級八字報告',
      title: '解鎖四柱命盤背後的完整故事',
      subtitle: '不止是生肖概覽。高級報告覆蓋日主、五行平衡、十神、大運週期和實用時間建議。',
      conversionEyebrow: '完整報告已準備好',
      conversionTitle: '只差一步，解鎖完整八字解讀',
      conversionSubtitle: '免費結果已經給出命盤基礎。選擇高級報告即可解鎖時間判斷、十神、關係、財富、事業、PDF 和 AI 追問模組。',
      viewPlans: '查看套餐',
      tryFree: '先體驗免費排盤',
      selectedPlan: '已選擇套餐',
      planNames: { essential: '基礎報告', pro: '專業報告', annual: '年度會員' },
      sample: '高級報告示例',
      dashboard: '八字洞察面板',
      fullAccess: '完整權限',
      pillars: ['年柱', '月柱', '日柱', '時柱'],
      modules: [
        ['四柱命盤', '年、月、日、時四柱，包含天干、地支、藏干和日主背景。'],
        ['五行平衡', '清晰拆解木、火、土、金、水強弱，幫助理解過旺、不足和平衡。'],
        ['十神解讀', '透過十神解釋事業、財富、關係和性格模式，而不是泛泛建議。'],
        ['大運與流年', '用時間軸展示主要大運週期、年度主題和重要決策時間背景。'],
      ],
      trust: [
        ['圍繞八字邏輯構建', '高級報告先基於命盤結構，再進行解釋，因此更貼近具體使用者。'],
        ['專業但不壓迫', '保留專業命理細節，同時用更通俗的語言解釋。'],
        ['可反覆查看的報告', '付費體驗定位為年度決策參考，而不是一次性娛樂結果。'],
      ],
      compareTitle: '免費版 vs 高級版',
      compareSubtitle: '免費解讀保持有用，高級版解鎖需要更深解釋的部分。',
      repeat: '適合反覆參考',
      reportSection: '報告模組',
      free: '免費',
      premium: '高級',
      rows: ['基礎命盤摘要', '四柱表和柱位含義', '五行強弱解釋', '十神性格和事業解讀', '大運與年度時間建議', '關係、財富、健康、事業模組', '報告下載和 AI 追問'],
      scopeTitle: '範圍清晰，不做虛假承諾',
      scopeBody: '高級解讀是用於自我理解和規劃的結構化命理報告，不構成醫療、法律或金融建議。價值在於清晰、上下文和可反覆查看的參考。',
      faqTitle: '常見問題',
      faqs: [
        ['這和免費八字解讀有什麼區別？', '免費解讀提供快速概覽。高級版解鎖完整報告結構，包括十神、大運時間、人生領域模組和更清晰的命盤解釋。'],
        ['我需要準備哪些出生資訊？', '請準備出生日期、出生時間、性別和出生地點。時間越準確，時柱相關的關係、事業和時間判斷越可靠。'],
        ['可以用報告做事業或關係決策嗎？', '報告適合作為反思和規劃工具，可提示傾向、時間窗口和風險點，但重要法律、醫療或金融決策仍需專業意見。'],
        ['新手能看懂嗎？', '可以。頁面保留專業命盤結構，同時用實用語言解釋每個部分。'],
      ],
    },
  });

  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source');
  const selectedPlan = searchParams.get('plan');
  const cameFromReading = source === 'reading';
  const selectedPlanLabel = selectedPlan ? text.planNames[selectedPlan as keyof typeof text.planNames] : undefined;

  const reportModules = [
    {
      title: text.modules[0][0],
      description: text.modules[0][1],
      icon: <Compass className="h-5 w-5" />,
    },
    {
      title: text.modules[1][0],
      description: text.modules[1][1],
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: text.modules[2][0],
      description: text.modules[2][1],
      icon: <BookOpenCheck className="h-5 w-5" />,
    },
    {
      title: text.modules[3][0],
      description: text.modules[3][1],
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  const trustPoints = [
    {
      title: text.trust[0][0],
      description: text.trust[0][1],
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    },
    {
      title: text.trust[1][0],
      description: text.trust[1][1],
      icon: <MessageCircle className="h-5 w-5 text-sky-400" />,
    },
    {
      title: text.trust[2][0],
      description: text.trust[2][1],
      icon: <FileText className="h-5 w-5 text-amber-400" />,
    },
  ];

  const comparisonRows = [
    [text.rows[0], true, true],
    [text.rows[1], true, true],
    [text.rows[2], true, true],
    [text.rows[3], false, true],
    [text.rows[4], false, true],
    [text.rows[5], false, true],
    [text.rows[6], false, true],
  ];

  const faqs = [
    {
      question: text.faqs[0][0],
      answer: text.faqs[0][1],
    },
    {
      question: text.faqs[1][0],
      answer: text.faqs[1][1],
    },
    {
      question: text.faqs[2][0],
      answer: text.faqs[2][1],
    },
    {
      question: text.faqs[3][0],
      answer: text.faqs[3][1],
    },
  ];

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 mb-5">
              <Sparkles className="h-4 w-4" />
              {cameFromReading ? text.conversionEyebrow : text.eyebrow}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-5 leading-tight">
              {cameFromReading ? text.conversionTitle : text.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mb-8">
              {cameFromReading ? text.conversionSubtitle : text.subtitle}
            </p>
            {cameFromReading && selectedPlanLabel && (
              <div className="glass-card mb-6 inline-flex items-center gap-3 px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-amber-300" />
                <span className="text-sm text-slate-300">{text.selectedPlan}</span>
                <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-indigo-950">
                  {selectedPlanLabel}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-indigo-950 transition hover:bg-amber-400"
              >
                {text.viewPlans}
                <LockKeyhole className="h-4 w-4" />
              </a>
              <a
                href="/readings"
                className="glass-secondary-button inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold"
              >
                {text.tryFree}
              </a>
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">{text.sample}</p>
                <h2 className="text-xl font-semibold text-white">{text.dashboard}</h2>
              </div>
              <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                {text.fullAccess}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-5 text-center">
              {text.pillars.map((pillar, index) => (
                <div key={pillar} className="glass-inset p-3">
                  <p className="text-xs text-slate-400">{pillar}</p>
                  <p className="mt-2 text-lg font-serif text-amber-300">{['Geng', 'Yi', 'Ding', 'Ren'][index]}</p>
                  <p className="text-sm text-slate-300">{['Wu', 'Mao', 'You', 'Zi'][index]}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {reportModules.map((module) => (
                <div key={module.title} className="glass-card flex gap-3 p-4">
                  <div className="glass-inset flex h-10 w-10 shrink-0 items-center justify-center text-amber-300">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{module.title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="glass-card glass-card-hover p-5"
            >
              <div className="glass-inset mb-4 flex h-10 w-10 items-center justify-center">
                {point.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{point.title}</h3>
              <p className="text-sm leading-6 text-slate-300">{point.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="glass-panel mb-16 p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-serif text-white">{text.compareTitle}</h2>
              <p className="mt-2 text-slate-300">
                {text.compareSubtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-400">
              <Clock className="h-4 w-4 text-amber-400" />
              {text.repeat}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-sm text-slate-400">
                  <th className="py-3 pr-4 font-medium">{text.reportSection}</th>
                  <th className="py-3 px-4 font-medium">{text.free}</th>
                  <th className="py-3 pl-4 font-medium">{text.premium}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, free, premium]) => (
                  <tr key={label as string} className="border-b border-white/10 last:border-0">
                    <td className="py-4 pr-4 text-slate-200">{label}</td>
                    <td className="py-4 px-4">
                      {free ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <LockKeyhole className="h-5 w-5 text-slate-600" />
                      )}
                    </td>
                    <td className="py-4 pl-4">
                      {premium ? (
                        <CheckCircle2 className="h-5 w-5 text-amber-400" />
                      ) : (
                        <LockKeyhole className="h-5 w-5 text-slate-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div id="plans">
          {selectedPlanLabel && (
            <div className="glass-card mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-amber-300" />
                <div>
                  <p className="text-sm text-slate-400">{text.selectedPlan}</p>
                  <p className="font-semibold text-white">{selectedPlanLabel}</p>
                </div>
              </div>
              <a
                href="#plans"
                className="glass-secondary-button inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold"
              >
                {text.viewPlans}
              </a>
            </div>
          )}
          <PremiumFeatures />
        </div>

        <section className="mt-16 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
              <Shield className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h2 className="mb-2 text-xl font-semibold text-white">{text.scopeTitle}</h2>
              <p className="text-sm leading-6 text-slate-300">
                {text.scopeBody}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 text-center">
            <div className="glass-inset mb-3 inline-flex h-11 w-11 items-center justify-center text-amber-300">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-serif text-white">{text.faqTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="glass-card glass-card-hover p-5"
              >
                <h3 className="mb-3 text-lg font-semibold text-amber-300">{faq.question}</h3>
                <p className="text-sm leading-6 text-slate-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subscription;
