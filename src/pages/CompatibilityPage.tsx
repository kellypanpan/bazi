import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Download,
  Heart,
  LockKeyhole,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import SEO from '../components/SEO';
import { ZodiacService, CompatibilityResult } from '../services/zodiacService';
import { useI18n } from '../i18n';

const popularMatches = [
  { sign1: 'Leo', sign2: 'Aries', compatibility: 92 },
  { sign1: 'Cancer', sign2: 'Pisces', compatibility: 89 },
  { sign1: 'Libra', sign2: 'Gemini', compatibility: 87 },
  { sign1: 'Taurus', sign2: 'Virgo', compatibility: 85 },
  { sign1: 'Scorpio', sign2: 'Cancer', compatibility: 88 },
  { sign1: 'Sagittarius', sign2: 'Aquarius', compatibility: 84 },
];

const compatibilityCopy = {
  en: {
    premiumModules: [
      'Full relationship dynamics report',
      'Communication and conflict patterns',
      'Love, friendship, and business timing',
      'Practical 30-day relationship plan',
      'PDF compatibility report',
      'AI follow-up questions',
    ],
    relationshipGuidance: [
      ['Emotional Pattern', 'Use the score as a signal for how naturally two people regulate closeness, reassurance, and personal space. A high score does not remove the need for boundaries; a lower score means the pair needs clearer agreements.'],
      ['Communication Strategy', 'The premium version should translate sign chemistry into daily behavior: what to say directly, what to slow down, and where each person may misread the other under stress.'],
      ['Decision Timing', 'Relationship timing is strongest when attraction, practical life rhythm, and conflict-repair habits line up. This section frames when to deepen commitment, collaborate, or pause.'],
    ],
    premiumReportChapters: [
      ['Relationship Map', 'A structured profile of attraction, attachment rhythm, emotional safety, and the roles each person tends to take in the connection.'],
      ['Conflict Repair', 'Specific guidance for friction points: what triggers defensiveness, what each person needs to hear, and how to return to alignment after disagreement.'],
      ['Life Context', 'Separate notes for romance, friendship, and business so users can understand whether the chemistry is best for intimacy, support, collaboration, or all three.'],
      ['Action Plan', 'A practical 30-day plan with conversation prompts, boundaries, and timing suggestions for deepening or stabilizing the relationship.'],
    ],
    excellent: 'Excellent Match',
    strong: 'Strong Potential',
    workable: 'Workable Chemistry',
    effort: 'Needs Conscious Effort',
    eyebrow: 'Compatibility Report',
    title: 'Relationship chemistry with a clearer upgrade path',
    subtitle: 'Compare two signs across love, friendship, and business, then unlock the deeper report for communication patterns, conflict repair, timing, and practical guidance.',
    preview: 'Report preview',
    matrix: 'Compatibility Matrix',
    freePreview: 'Free Preview',
    love: 'Love',
    friendship: 'Friendship',
    business: 'Business',
    selectTitle: 'Select Two Zodiac Signs',
    firstSign: 'First Sign',
    secondSign: 'Second Sign',
    selectSign: 'Select Sign',
    calculating: 'Calculating Compatibility...',
    calculate: 'Calculate Compatibility',
    loveRomance: 'Love & Romance',
    professionalNotes: 'Professional Reading Notes',
    notesSub: 'What the free result suggests before premium depth.',
    strengths: 'Strengths',
    challenges: 'Challenges',
    advice: 'Relationship Advice',
    unlock: 'Unlock Full Compatibility Report',
    download: 'Download PDF',
    popular: 'Popular Compatibility Matches',
    compatible: 'Compatible',
    disclaimer: 'Compatibility reports are designed as reflection and communication tools. They should help users understand patterns, not replace personal judgment or professional advice.',
  },
  'zh-CN': {
    premiumModules: ['完整关系动力报告', '沟通与冲突模式', '爱情、友情和合作时机', '30 天关系行动计划', 'PDF 合盘报告', 'AI 追问问题'],
    relationshipGuidance: [
      ['情绪模式', '分数用于判断两个人在亲近感、安全感和个人空间上的自然协调度。高分不代表不需要边界，低分则表示更需要清晰约定。'],
      ['沟通策略', '高级版会把星座化学反应转成日常行为建议：哪些话要直接说，哪些节奏要放慢，以及压力下彼此容易误读的地方。'],
      ['决策时机', '当吸引力、现实节奏和修复冲突的能力同时对齐时，关系时机更稳。这部分会提示何时深化、合作或暂停。'],
    ],
    premiumReportChapters: [
      ['关系地图', '系统拆解吸引力、依恋节奏、情绪安全感，以及双方在关系中容易扮演的角色。'],
      ['冲突修复', '针对摩擦点给出具体建议：什么会触发防御、彼此需要听到什么、如何在分歧后重新对齐。'],
      ['生活场景', '分别给出恋爱、友情、合作的判断，让用户知道这段化学反应更适合亲密、支持、协作，还是三者兼具。'],
      ['行动计划', '提供 30 天对话提示、边界建议和关系稳定/深化的时间安排。'],
    ],
    excellent: '绝佳匹配',
    strong: '潜力很强',
    workable: '可磨合关系',
    effort: '需要有意识经营',
    eyebrow: '合盘报告',
    title: '更清晰地理解两个人的关系化学反应',
    subtitle: '从爱情、友情和合作三个维度比较两个星座，并解锁更深入的沟通模式、冲突修复、时机判断和实用建议。',
    preview: '报告预览',
    matrix: '合盘矩阵',
    freePreview: '免费预览',
    love: '爱情',
    friendship: '友情',
    business: '合作',
    selectTitle: '选择两个星座',
    firstSign: '第一个星座',
    secondSign: '第二个星座',
    selectSign: '选择星座',
    calculating: '正在计算合盘...',
    calculate: '计算合盘',
    loveRomance: '爱情与亲密',
    professionalNotes: '专业解读笔记',
    notesSub: '免费结果在进入高级深度前提示的重点。',
    strengths: '优势',
    challenges: '挑战',
    advice: '关系建议',
    unlock: '解锁完整合盘报告',
    download: '下载 PDF',
    popular: '热门合盘组合',
    compatible: '匹配',
    disclaimer: '合盘报告用于自我反思和沟通参考，帮助用户理解模式，不应替代个人判断或专业建议。',
  },
  'zh-TW': {
    premiumModules: ['完整關係動力報告', '溝通與衝突模式', '愛情、友情和合作時機', '30 天關係行動計畫', 'PDF 合盤報告', 'AI 追問問題'],
    relationshipGuidance: [
      ['情緒模式', '分數用於判斷兩個人在親近感、安全感和個人空間上的自然協調度。高分不代表不需要邊界，低分則表示更需要清晰約定。'],
      ['溝通策略', '高級版會把星座化學反應轉成日常行為建議：哪些話要直接說，哪些節奏要放慢，以及壓力下彼此容易誤讀的地方。'],
      ['決策時機', '當吸引力、現實節奏和修復衝突的能力同時對齊時，關係時機更穩。這部分會提示何時深化、合作或暫停。'],
    ],
    premiumReportChapters: [
      ['關係地圖', '系統拆解吸引力、依戀節奏、情緒安全感，以及雙方在關係中容易扮演的角色。'],
      ['衝突修復', '針對摩擦點給出具體建議：什麼會觸發防禦、彼此需要聽到什麼、如何在分歧後重新對齊。'],
      ['生活場景', '分別給出戀愛、友情、合作的判斷，讓使用者知道這段化學反應更適合親密、支持、協作，還是三者兼具。'],
      ['行動計畫', '提供 30 天對話提示、邊界建議和關係穩定/深化的時間安排。'],
    ],
    excellent: '絕佳匹配',
    strong: '潛力很強',
    workable: '可磨合關係',
    effort: '需要有意識經營',
    eyebrow: '合盤報告',
    title: '更清晰地理解兩個人的關係化學反應',
    subtitle: '從愛情、友情和合作三個維度比較兩個星座，並解鎖更深入的溝通模式、衝突修復、時機判斷和實用建議。',
    preview: '報告預覽',
    matrix: '合盤矩陣',
    freePreview: '免費預覽',
    love: '愛情',
    friendship: '友情',
    business: '合作',
    selectTitle: '選擇兩個星座',
    firstSign: '第一個星座',
    secondSign: '第二個星座',
    selectSign: '選擇星座',
    calculating: '正在計算合盤...',
    calculate: '計算合盤',
    loveRomance: '愛情與親密',
    professionalNotes: '專業解讀筆記',
    notesSub: '免費結果在進入高級深度前提示的重點。',
    strengths: '優勢',
    challenges: '挑戰',
    advice: '關係建議',
    unlock: '解鎖完整合盤報告',
    download: '下載 PDF',
    popular: '熱門合盤組合',
    compatible: '匹配',
    disclaimer: '合盤報告用於自我反思和溝通參考，幫助使用者理解模式，不應替代個人判斷或專業建議。',
  },
};

const CompatibilityPage: React.FC = () => {
  const { language, pick } = useI18n();
  const copy = pick(compatibilityCopy);
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const zodiacSigns = useMemo(() => ZodiacService.getAllZodiacSigns(), []);
  const firstSign = zodiacSigns.find((sign) => sign.name === sign1);
  const secondSign = zodiacSigns.find((sign) => sign.name === sign2);

  const handleCalculateCompatibility = async () => {
    if (!sign1 || !sign2) return;

    setLoading(true);
    try {
      const result = await ZodiacService.getCompatibility(sign1, sign2, language);
      setCompatibility(result);
    } catch (error) {
      console.error('Error calculating compatibility:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'from-emerald-300 to-green-500';
    if (score >= 65) return 'from-amber-300 to-orange-500';
    if (score >= 50) return 'from-orange-300 to-red-500';
    return 'from-red-300 to-rose-600';
  };

  const getCompatibilityText = (score: number) => {
    if (score >= 80) return copy.excellent;
    if (score >= 65) return copy.strong;
    if (score >= 50) return copy.workable;
    return copy.effort;
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Zodiac Compatibility Calculator",
      "url": "https://fortunetelling.it.com/compatibility",
      "description": "Compare two zodiac signs across love, friendship, and business compatibility."
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Zodiac Compatibility Calculator",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "url": "https://fortunetelling.it.com/compatibility",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ];

  return (
    <div className="px-4 pb-16 pt-28">
      <SEO
        title="Zodiac Compatibility Calculator | Love, Friendship & Business"
        description="Compare zodiac compatibility for two signs across love, friendship, and business with relationship strengths, challenges, and practical guidance."
        keywords={[
          "zodiac compatibility", "compatibility calculator", "love compatibility",
          "relationship compatibility", "zodiac match", "astrology compatibility", "星座合盘"
        ]}
        url="https://fortunetelling.it.com/compatibility"
        structuredData={structuredData}
      />
      <div className="container mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
              <Heart className="h-4 w-4" />
              {copy.eyebrow}
            </div>
            <h1 className="mb-5 text-4xl font-serif leading-tight text-white md:text-5xl">
              {copy.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              {copy.subtitle}
            </p>
          </div>

          <div className="glass-panel p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">{copy.preview}</p>
                <h2 className="text-xl font-semibold text-white">{copy.matrix}</h2>
              </div>
              <div className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{copy.freePreview}</div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                [copy.love, '82%'],
                [copy.friendship, '76%'],
                [copy.business, '68%'],
              ].map(([label, value]) => (
                <div key={label} className="glass-inset p-4">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel mx-auto mb-12 max-w-4xl p-5 md:p-8"
        >
          <h2 className="mb-7 text-center text-2xl font-serif text-white">{copy.selectTitle}</h2>
          <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-[1fr_auto_1fr]">
            <SignSelect label={copy.firstSign} placeholder={copy.selectSign} value={sign1} onChange={setSign1} signs={zodiacSigns} />
            <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-rose-300 backdrop-blur-xl">
              <Heart className="h-5 w-5" />
            </div>
            <SignSelect label={copy.secondSign} placeholder={copy.selectSign} value={sign2} onChange={setSign2} signs={zodiacSigns} />
          </div>

          <button
            onClick={handleCalculateCompatibility}
            disabled={!sign1 || !sign2 || loading}
            className="glass-primary-button mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-indigo-950" />
                {copy.calculating}
              </>
            ) : (
              <>
                {copy.calculate}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </motion.section>

        {compatibility ? (
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-7xl"
          >
            <div className="glass-panel mb-8 p-6 text-center md:p-8">
              <div className="mb-5 flex items-center justify-center gap-5">
                <span className="text-5xl">{firstSign?.symbol}</span>
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${getCompatibilityColor(compatibility.overallCompatibility)} bg-clip-text text-5xl font-bold text-transparent`}>
                    {compatibility.overallCompatibility}%
                  </div>
                  <p className="mt-2 font-semibold text-white">{getCompatibilityText(compatibility.overallCompatibility)}</p>
                </div>
                <span className="text-5xl">{secondSign?.symbol}</span>
              </div>
              <p className="mx-auto max-w-3xl text-slate-300">{compatibility.analysis}</p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              <CompatibilityCard icon={Heart} title={copy.loveRomance} score={compatibility.loveCompatibility} color="text-rose-300" />
              <CompatibilityCard icon={Users} title={copy.friendship} score={compatibility.friendshipCompatibility} color="text-sky-300" />
              <CompatibilityCard icon={Briefcase} title={copy.business} score={compatibility.businessCompatibility} color="text-emerald-300" />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="glass-inset flex h-11 w-11 items-center justify-center text-amber-300">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{copy.professionalNotes}</h3>
                    <p className="text-sm text-slate-400">{copy.notesSub}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {copy.relationshipGuidance.map(([title, body]) => (
                    <div key={title} className="glass-inset p-4">
                      <h4 className="mb-2 font-semibold text-amber-200">{title}</h4>
                      <p className="text-sm leading-6 text-slate-300">{body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <ReportList title={copy.strengths} tone="green" items={compatibility.strengths} />
                <ReportList title={copy.challenges} tone="amber" items={compatibility.challenges} />
              </div>
            </div>

            <div className="glass-panel mb-8 p-6 md:p-8">
              <div className="mb-6 text-center">
                <div className="glass-inset mx-auto mb-4 flex h-12 w-12 items-center justify-center text-rose-300">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-2xl font-serif text-white">{copy.advice}</h3>
                <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">{compatibility.advice}</p>
              </div>
              <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {copy.premiumReportChapters.map(([title, body]) => (
                  <div key={title} className="glass-card p-4 text-left">
                    <h4 className="mb-2 font-semibold text-white">{title}</h4>
                    <p className="text-sm leading-6 text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {copy.premiumModules.map((module) => (
                  <div key={module} className="glass-inset flex items-center gap-3 p-3">
                    <LockKeyhole className="h-4 w-4 shrink-0 text-amber-300" />
                    <span className="text-sm text-slate-200">{module}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/subscription?source=compatibility&plan=pro#plans" className="glass-primary-button inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold">
                  {copy.unlock}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/subscription?source=compatibility-download&plan=pro#plans" className="glass-secondary-button inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold">
                  <Download className="h-4 w-4" />
                  {copy.download}
                </Link>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-5xl"
          >
            <div className="mb-8 text-center">
              <div className="glass-inset mb-4 inline-flex h-11 w-11 items-center justify-center text-amber-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-serif text-white">{copy.popular}</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popularMatches.map((match, index) => (
                <motion.button
                  key={`${match.sign1}-${match.sign2}`}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card glass-card-hover p-5 text-left"
                  onClick={() => {
                    setSign1(match.sign1);
                    setSign2(match.sign2);
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{zodiacSigns.find((sign) => sign.name === match.sign1)?.symbol}</span>
                      <Heart className="h-4 w-4 text-rose-300" />
                      <span className="text-3xl">{zodiacSigns.find((sign) => sign.name === match.sign2)?.symbol}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-amber-300" />
                  </div>
                  <p className="font-semibold text-white">{match.sign1} & {match.sign2}</p>
                  <p className="mt-1 text-sm text-emerald-300">{match.compatibility}% {copy.compatible}</p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        <section className="mx-auto mt-12 max-w-5xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <Shield className="h-6 w-6 shrink-0 text-amber-300" />
            <p className="text-sm leading-6 text-slate-300">
              {copy.disclaimer}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const SignSelect: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  signs: ReturnType<typeof ZodiacService.getAllZodiacSigns>;
}> = ({ label, placeholder, value, onChange, signs }) => (
  <div>
    <label className="mb-3 block text-sm font-medium text-slate-200">{label}</label>
    <select value={value} onChange={(event) => onChange(event.target.value)} className="glass-input w-full rounded-lg px-4 py-3">
      <option value="">{placeholder}</option>
      {signs.map((sign) => (
        <option key={sign.name} value={sign.name}>
          {sign.symbol} {sign.name}
        </option>
      ))}
    </select>
  </div>
);

const CompatibilityCard: React.FC<{
  icon: React.ElementType;
  title: string;
  score: number;
  color: string;
}> = ({ icon: Icon, title, score, color }) => (
  <div className="glass-card glass-card-hover p-6 text-center">
    <div className="mb-4 flex justify-center">
      <div className="glass-inset flex h-12 w-12 items-center justify-center">
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
    <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
    <div className="mb-3 text-3xl font-bold text-white">{score}%</div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-amber-400" style={{ width: `${score}%` }} />
    </div>
  </div>
);

const ReportList: React.FC<{ title: string; tone: 'green' | 'amber'; items: string[] }> = ({ title, tone, items }) => {
  const toneClass = tone === 'green' ? 'text-emerald-300' : 'text-amber-300';

  return (
    <div className="glass-card p-6">
      <h4 className={`mb-4 text-lg font-semibold ${toneClass}`}>{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${toneClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompatibilityPage;
