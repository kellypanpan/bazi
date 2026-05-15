import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  HelpCircle,
  Layers3,
  MessagesSquare,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useAuth } from '../auth/AuthProvider';
import { CheckoutPlanId, createCheckoutSession } from '../services/checkoutService';

const PremiumFeatures: React.FC = () => {
  const { language, pick } = useI18n();
  const { session, openAuthModal, getAccessToken } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<CheckoutPlanId | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const text = pick({
    en: {
      eyebrow: 'Premium Access',
      title: 'Choose how deep you want the reading to go',
      subtitle: 'The free chart gives users a useful starting point. Premium plans unlock the interpretation, timing, and report depth that make the chart actionable.',
      recommended: 'Recommended',
      perYear: '/year',
      oneTime: 'one-time',
      plans: [
        {
          name: 'Essential',
          description: 'For users who want a polished BaZi report after the free chart.',
          badge: 'Best starter',
          features: ['Complete Four Pillars chart', 'Day Master and Five Elements summary', 'Personality strengths and challenges', 'Career and relationship overview', 'Clean report layout for later review'],
          cta: 'Get Essential Report',
        },
        {
          name: 'Pro',
          description: 'The main report for deeper timing, Ten Gods, and life-area interpretation.',
          badge: 'Most useful',
          features: ['Everything in Essential', 'Ten Gods reading for career, wealth, and relationships', 'Luck Pillars timeline and current cycle', 'Annual forecast with timing themes', 'AI follow-up questions about your chart', 'Downloadable premium report'],
          cta: 'Unlock Pro Reading',
        },
        {
          name: 'Annual',
          description: 'For users who want year-round guidance, updates, and multiple readings.',
          badge: 'Best value',
          features: ['Everything in Pro', 'Monthly forecast refreshes', 'Relationship compatibility readings', 'Multiple saved birth charts', 'Priority report generation', 'Extended AI chart conversations'],
          cta: 'Start Annual Access',
        },
      ],
      included: [
        ['Professional Report Structure', 'Each plan is built around chart sections users expect from a serious BaZi reading.'],
        ['Plain-English Guidance', 'Traditional terms stay visible, but the explanation is written for practical understanding.'],
        ['Helpful Upgrade Path', 'Users can start free, then unlock the exact modules that need deeper interpretation.'],
      ],
      nextStep: 'Continue to plan details',
      loading: 'Starting checkout...',
      checkoutError: 'Checkout could not start. Please try again.',
      loginRequired: 'Please sign in before checkout.',
    },
    'zh-CN': {
      eyebrow: '高级解读',
      title: '选择你想深入到哪一层',
      subtitle: '免费命盘提供有用起点。高级版本解锁更完整的解释、时间判断和报告深度。',
      recommended: '推荐',
      perYear: '/年',
      oneTime: '一次性',
      plans: [
        {
          name: '基础报告',
          description: '适合想在免费命盘之后获得清晰整理报告的用户。',
          badge: '入门首选',
          features: ['完整四柱命盘', '日主与五行概览', '性格优势和挑战', '事业与关系概览', '可反复查看的清晰报告'],
          cta: '获取基础报告',
        },
        {
          name: '专业报告',
          description: '包含更深入的时间、十神和人生领域解读。',
          badge: '最实用',
          features: ['包含基础报告全部内容', '事业、财富、关系十神解读', '大运时间轴和当前周期', '年度运势和时间主题', 'AI 命盘追问', '高级报告下载'],
          cta: '解锁专业解读',
        },
        {
          name: '年度会员',
          description: '适合需要全年更新、多命盘和长期指导的用户。',
          badge: '高性价比',
          features: ['包含专业报告全部内容', '月度运势更新', '关系合盘解读', '保存多个出生命盘', '优先生成报告', '更长 AI 命盘对话'],
          cta: '开启年度权限',
        },
      ],
      included: [
        ['专业报告结构', '每个套餐都围绕严肃八字解读中用户真正关心的命盘模块设计。'],
        ['通俗解释', '保留传统术语，同时用更容易理解的语言说明实际含义。'],
        ['清晰升级路径', '用户可以先免费查看，再解锁真正需要深度解释的模块。'],
      ],
      nextStep: '继续查看套餐详情',
      loading: '正在进入结账...',
      checkoutError: '暂时无法进入结账，请稍后重试。',
      loginRequired: '请先登录再进入结账。',
    },
    'zh-TW': {
      eyebrow: '高級解讀',
      title: '選擇你想深入到哪一層',
      subtitle: '免費命盤提供有用起點。高級版本解鎖更完整的解釋、時間判斷和報告深度。',
      recommended: '推薦',
      perYear: '/年',
      oneTime: '一次性',
      plans: [
        {
          name: '基礎報告',
          description: '適合想在免費命盤之後獲得清晰整理報告的使用者。',
          badge: '入門首選',
          features: ['完整四柱命盤', '日主與五行概覽', '性格優勢和挑戰', '事業與關係概覽', '可反覆查看的清晰報告'],
          cta: '獲取基礎報告',
        },
        {
          name: '專業報告',
          description: '包含更深入的時間、十神和人生領域解讀。',
          badge: '最實用',
          features: ['包含基礎報告全部內容', '事業、財富、關係十神解讀', '大運時間軸和當前週期', '年度運勢和時間主題', 'AI 命盤追問', '高級報告下載'],
          cta: '解鎖專業解讀',
        },
        {
          name: '年度會員',
          description: '適合需要全年更新、多命盤和長期指導的使用者。',
          badge: '高性價比',
          features: ['包含專業報告全部內容', '月度運勢更新', '關係合盤解讀', '保存多個出生命盤', '優先生成報告', '更長 AI 命盤對話'],
          cta: '開啟年度權限',
        },
      ],
      included: [
        ['專業報告結構', '每個套餐都圍繞嚴肅八字解讀中使用者真正關心的命盤模組設計。'],
        ['通俗解釋', '保留傳統術語，同時用更容易理解的語言說明實際含義。'],
        ['清晰升級路徑', '使用者可以先免費查看，再解鎖真正需要深度解釋的模組。'],
      ],
      nextStep: '繼續查看套餐詳情',
      loading: '正在進入結帳...',
      checkoutError: '暫時無法進入結帳，請稍後重試。',
      loginRequired: '請先登入再進入結帳。',
    },
  });

  const handleCheckout = async (planId: CheckoutPlanId) => {
    if (!session) {
      setCheckoutError(text.loginRequired);
      openAuthModal();
      return;
    }

    setLoadingPlan(planId);
    setCheckoutError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        setCheckoutError(text.loginRequired);
        openAuthModal();
        setLoadingPlan(null);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const source = params.get('source') || 'pricing';
      const session = await createCheckoutSession({
        planId,
        source,
        language,
        accessToken,
      });

      window.location.href = session.checkoutUrl;
    } catch (error) {
      console.error(error);
      setCheckoutError(text.checkoutError);
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      id: 'essential' as const,
      name: text.plans[0].name,
      price: '$19',
      description: text.plans[0].description,
      badge: text.plans[0].badge,
      icon: <FileText className="h-6 w-6" />,
      features: text.plans[0].features,
      cta: text.plans[0].cta,
      accent: 'border-sky-500/40',
      button: 'bg-sky-500 hover:bg-sky-400 text-indigo-950',
    },
    {
      id: 'pro' as const,
      name: text.plans[1].name,
      price: '$49',
      description: text.plans[1].description,
      badge: text.plans[1].badge,
      popular: true,
      icon: <Layers3 className="h-6 w-6" />,
      features: text.plans[1].features,
      cta: text.plans[1].cta,
      accent: 'border-amber-500',
      button: 'bg-amber-500 hover:bg-amber-400 text-indigo-950',
    },
    {
      id: 'annual' as const,
      name: text.plans[2].name,
      price: '$99',
      description: text.plans[2].description,
      badge: text.plans[2].badge,
      icon: <CalendarDays className="h-6 w-6" />,
      features: text.plans[2].features,
      cta: text.plans[2].cta,
      accent: 'border-emerald-500/40',
      button: 'bg-emerald-500 hover:bg-emerald-400 text-indigo-950',
    },
  ];

  const included = [
    {
      title: text.included[0][0],
      description: text.included[0][1],
      icon: <Sparkles className="h-5 w-5 text-amber-300" />,
    },
    {
      title: text.included[1][0],
      description: text.included[1][1],
      icon: <MessagesSquare className="h-5 w-5 text-sky-300" />,
    },
    {
      title: text.included[2][0],
      description: text.included[2][1],
      icon: <HelpCircle className="h-5 w-5 text-emerald-300" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
          {text.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
          {text.title}
        </h2>
        <p className="mx-auto max-w-2xl text-slate-300">
          {text.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true }}
            className={`glass-card glass-card-hover relative flex h-full flex-col border ${plan.accent} p-6 ${
              plan.popular ? 'shadow-2xl shadow-amber-500/10' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-6 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-indigo-950">
                {text.recommended}
              </div>
            )}

            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="glass-inset flex h-12 w-12 items-center justify-center text-amber-300">
                {plan.icon}
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300 backdrop-blur-xl">
                {plan.badge}
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-300">{plan.description}</p>

            <div className="my-6 flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="pb-1 text-sm text-slate-400">{index === 2 ? text.perYear : text.oneTime}</span>
            </div>

            <ul className="mb-7 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan !== null}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition ${plan.button}`}
            >
              {loadingPlan === plan.id ? text.loading : plan.cta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">{text.nextStep}</p>
          </motion.div>
        ))}
      </div>

      {checkoutError && (
        <div className="mx-auto mt-5 max-w-2xl rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
          {checkoutError}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {included.map((item) => (
          <div key={item.title} className="glass-card glass-card-hover p-5">
            <div className="glass-inset mb-4 flex h-10 w-10 items-center justify-center">
              {item.icon}
            </div>
            <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default PremiumFeatures;
