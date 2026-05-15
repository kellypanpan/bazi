import React from 'react';
import { motion } from 'framer-motion';
import BirthDateForm, { BirthData } from './BirthDateForm';
import BasicResultsDisplay from './BasicResultsDisplay';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n';

const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const BaZiWheel: React.FC = () => {
  return (
    <div className="relative mx-auto mb-8 h-72 w-72 md:mx-0 md:h-80 md:w-80">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,rgba(255,255,255,0.035)_38%,transparent_64%)]" />
      <div className="absolute inset-3 rounded-full border border-white/18" />
      <div className="absolute inset-10 rounded-full border border-dashed border-white/14" />
      <div className="absolute inset-[74px] rounded-full border border-amber-300/35" />
      <div className="absolute left-1/2 top-3 h-[calc(100%-24px)] w-px -translate-x-1/2 bg-white/10" />
      <div className="absolute left-3 top-1/2 h-px w-[calc(100%-24px)] -translate-y-1/2 bg-white/10" />

      <div className="absolute inset-0 animate-[spin_96s_linear_infinite]">
        {earthlyBranches.map((branch, index) => {
          const angle = index * 30;
          return (
            <span
              key={branch}
              className="absolute left-1/2 top-1/2 flex h-7 w-7 items-center justify-center font-serif text-lg text-slate-300/90"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-126px) rotate(${-angle}deg)`,
              }}
            >
              {branch}
            </span>
          );
        })}
      </div>

      <div className="absolute inset-0 animate-[spin_72s_linear_infinite_reverse]">
        {heavenlyStems.map((stem, index) => {
          const angle = index * 36;
          return (
            <span
              key={stem}
              className="absolute left-1/2 top-1/2 flex h-7 w-7 items-center justify-center font-serif text-xl text-amber-300/80"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-78px) rotate(${-angle}deg)`,
              }}
            >
              {stem}
            </span>
          );
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-24 w-24 rounded-full border border-amber-300/35 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
          <div className="absolute inset-2 overflow-hidden rounded-full bg-amber-300">
            <div className="absolute left-0 top-0 h-full w-1/2 rounded-l-full bg-slate-950" />
            <div className="absolute left-1/2 top-0 h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-slate-950" />
            <div className="absolute left-1/2 bottom-0 h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-amber-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [showResults, setShowResults] = React.useState(false);
  const [formData, setFormData] = React.useState<BirthData | null>(null);
  const { pick } = useI18n();

  const text = pick({
    en: {
      eyebrow: 'Free BaZi chart with AI interpretation',
      titlePrefix: 'Discover Your Celestial',
      titleAccent: 'Destiny',
      intro: 'Enter your birth data once to generate a structured Four Pillars chart, Five Elements balance, life area reading, and follow-up guidance.',
      trustPoints: ['Structured BaZi chart', 'AI interpretation', 'No account required'],
    },
    'zh-CN': {
      eyebrow: '免费八字排盘与 AI 解读',
      titlePrefix: '免费 AI 八字排盘',
      titleAccent: '看懂命盘',
      intro: '输入一次出生资料，即可生成四柱命盘、五行强弱、人生领域解读和可继续追问的命理建议。',
      trustPoints: ['结构化八字命盘', 'AI 白话解读', '无需注册'],
    },
    'zh-TW': {
      eyebrow: '免費八字排盤與 AI 解讀',
      titlePrefix: '免費 AI 八字排盤',
      titleAccent: '看懂命盤',
      intro: '輸入一次出生資料，即可生成四柱命盤、五行強弱、人生領域解讀和可繼續追問的命理建議。',
      trustPoints: ['結構化八字命盤', 'AI 白話解讀', '無需註冊'],
    },
  });

  const handleFormSubmit = (data: BirthData) => {
    setFormData(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative px-4 pb-14 pt-28 md:pt-32">
      <div className="container mx-auto relative z-10">
        {!showResults ? (
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.86fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-2 lg:pt-8"
            >
              <BaZiWheel />
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                {text.eyebrow}
              </div>
              <h1 className="mb-5 max-w-2xl text-4xl font-serif font-medium leading-tight text-white md:text-5xl lg:text-6xl">
                {text.titlePrefix} <span className="text-amber-400">{text.titleAccent}</span>
              </h1>
              <p className="mb-7 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                {text.intro}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                {text.trustPoints.map((point, index) => (
                  <span key={point} className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-xl">
                    {index === 2 ? (
                      <ShieldCheck className="h-4 w-4 text-amber-300" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-amber-300" />
                    )}
                    {point}
                </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto w-full max-w-2xl"
            >
              <BirthDateForm onSubmit={handleFormSubmit} />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BasicResultsDisplay formData={formData!} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
