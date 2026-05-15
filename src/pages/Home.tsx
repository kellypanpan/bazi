import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Bot, ChevronRight, Download, MessageCircle, Moon, Star, Sun, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import TestimonialCard from '../components/TestimonialCard';
import SEO from '../components/SEO';
import { useI18n } from '../i18n';

const Home: React.FC = () => {
  const { pick } = useI18n();

  const text = pick({
    en: {
      reportEyebrow: 'Reading Output',
      reportTitle: 'From birth data to a usable life report',
      reportIntro: 'Inspired by modern BaZi tools, the experience now surfaces the chart, the explanation, and the next questions in one flow.',
      featuresTitle: 'Discover Ancient BaZi Wisdom for Modern Life',
      featuresIntro: "Our BaZi readings combine thousands of years of Chinese astrological knowledge with modern insights. Experience authentic BaZi Four Pillars analysis to guide your journey through life's challenges and opportunities.",
      fiveTitle: 'The Five Elements',
      fiveIntro: 'Chinese astrology is built on the interplay of five fundamental elements that shape our characteristics and destiny.',
      zodiacTitle: 'Explore Your Zodiac Sign',
      zodiacIntro: 'Get instant access to your daily horoscope, compatibility insights, and personalized predictions.',
      compatibilityCta: 'Check Compatibility',
      testimonialsTitle: 'Transforming Lives Through Ancient Wisdom',
      testimonialsIntro: 'See how our readings have provided clarity and guidance to people just like you.',
      learnMore: 'Learn more',
      reportModules: [
        ['AI Deep Analysis', 'Turn chart data into readable guidance for personality, work, money, relationships, and health.'],
        ['Visual Chart Structure', 'See Four Pillars, Five Elements balance, hidden stems, and rule settings before reading the interpretation.'],
        ['Smart Follow-up Questions', 'Move from a general report into specific questions about timing, decisions, and life areas.'],
        ['Report Ready Experience', 'A structured reading layout designed for saving, sharing, and upgrading into a complete report.'],
      ],
      elements: [
        ['Wood', 'Growth', 'Vitality, expansion, planning, and renewal'],
        ['Fire', 'Momentum', 'Visibility, passion, expression, and transformation'],
        ['Earth', 'Stability', 'Grounding, nourishment, trust, and continuity'],
        ['Metal', 'Structure', 'Precision, boundaries, refinement, and judgment'],
        ['Water', 'Adaptability', 'Wisdom, flow, intuition, and strategic movement'],
      ],
      features: [
        ['BaZi (Four Pillars)', 'Discover your BaZi destiny code based on your birth time. BaZi analysis reveals your personal traits and life path with detailed BaZi career, wealth, and relationship insights using authentic BaZi methods.'],
        ['Zi Wei Dou Shu', 'Generate your complete Chinese astrology chart with 12 life palaces, star positions, and detailed destiny analysis.'],
        ['Daily Horoscopes', 'Get personalized daily, weekly, and monthly zodiac predictions with love, career, and health insights.'],
        ['Compatibility Analysis', 'Discover relationship compatibility between zodiac signs with detailed analysis and shareable results.'],
      ],
      testimonials: [
        ['Emily Chen', 'Entrepreneur', 'The BaZi reading was incredibly accurate about my career path. My BaZi analysis helped me understand my natural strengths and make an important business decision that paid off tremendously. I now consult my BaZi chart regularly.'],
        ['Michael Wong', 'Software Engineer', 'I was skeptical at first, but the insights about my relationships were spot on. The guidance helped me improve communication with my partner.'],
        ['Sarah Johnson', 'Teacher', 'The premium reading was worth every penny. It provided depth and specificity that gave me clarity during a challenging time in my life.'],
      ],
    },
    'zh-CN': {
      reportEyebrow: '解读结果',
      reportTitle: '从出生资料到可使用的人生报告',
      reportIntro: '参考现代八字工具的产品结构，把命盘、解释和下一步追问整合在同一条流程里。',
      featuresTitle: '用现代方式理解传统八字',
      featuresIntro: '我们把四柱、五行、十神和人生领域解读结合起来，让八字分析不只是长篇文字，而是可以辅助规划的结构化参考。',
      fiveTitle: '五行结构',
      fiveIntro: '五行之间的生克、偏旺和不足，是理解命盘性格、能量和节奏的重要基础。',
      zodiacTitle: '探索你的星座',
      zodiacIntro: '快速查看每日运势、关系适配和个性化预测。',
      compatibilityCta: '查看合盘',
      testimonialsTitle: '用传统智慧获得清晰感',
      testimonialsIntro: '看看其他用户如何通过解读获得方向和参考。',
      learnMore: '了解更多',
      reportModules: [
        ['AI 深度分析', '把命盘数据转化为性格、事业、财富、感情和健康方面的可读建议。'],
        ['可视化命盘结构', '在阅读解释前，先看到四柱、五行平衡、藏干和排盘规则。'],
        ['智能追问', '从总览报告继续深入到具体时机、选择和人生领域。'],
        ['报告化体验', '结构化阅读布局，方便保存、分享和升级为完整报告。'],
      ],
      elements: [
        ['木', '生长', '生命力、扩展、计划与更新'],
        ['火', '动能', '表达、热情、可见度与转化'],
        ['土', '稳定', '承载、滋养、信任与延续'],
        ['金', '结构', '边界、判断、精确与提炼'],
        ['水', '流动', '智慧、适应、直觉与策略'],
      ],
      features: [
        ['八字四柱', '根据出生时间生成八字命盘，理解性格、人生路径、事业、财富和关系倾向。'],
        ['紫微斗数', '生成十二宫位、星曜分布和命盘分析，用另一套东方命理系统补充视角。'],
        ['每日运势', '查看每日、每周和每月的星座运势，包括感情、事业和健康参考。'],
        ['关系合盘', '分析星座或命理关系适配度，获得更清晰的相处参考。'],
      ],
      testimonials: [
        ['Emily Chen', '创业者', '八字解读对我的事业路径描述得很准确，也帮助我重新理解自己的优势。'],
        ['Michael Wong', '软件工程师', '一开始我有点怀疑，但关系方面的分析很贴近实际，给了我沟通上的提醒。'],
        ['Sarah Johnson', '教师', '高级报告的细节比我预期更具体，在一段困难时期给了我清晰感。'],
      ],
    },
    'zh-TW': {
      reportEyebrow: '解讀結果',
      reportTitle: '從出生資料到可使用的人生報告',
      reportIntro: '參考現代八字工具的產品結構，把命盤、解釋和下一步追問整合在同一條流程裡。',
      featuresTitle: '用現代方式理解傳統八字',
      featuresIntro: '我們把四柱、五行、十神和人生領域解讀結合起來，讓八字分析不只是長篇文字，而是可以輔助規劃的結構化參考。',
      fiveTitle: '五行結構',
      fiveIntro: '五行之間的生剋、偏旺和不足，是理解命盤性格、能量和節奏的重要基礎。',
      zodiacTitle: '探索你的星座',
      zodiacIntro: '快速查看每日運勢、關係適配和個人化預測。',
      compatibilityCta: '查看合盤',
      testimonialsTitle: '用傳統智慧獲得清晰感',
      testimonialsIntro: '看看其他使用者如何透過解讀獲得方向和參考。',
      learnMore: '了解更多',
      reportModules: [
        ['AI 深度分析', '把命盤資料轉化為性格、事業、財富、感情和健康方面的可讀建議。'],
        ['可視化命盤結構', '在閱讀解釋前，先看到四柱、五行平衡、藏干和排盤規則。'],
        ['智慧追問', '從總覽報告繼續深入到具體時機、選擇和人生領域。'],
        ['報告化體驗', '結構化閱讀版面，方便保存、分享和升級為完整報告。'],
      ],
      elements: [
        ['木', '生長', '生命力、擴展、計畫與更新'],
        ['火', '動能', '表達、熱情、可見度與轉化'],
        ['土', '穩定', '承載、滋養、信任與延續'],
        ['金', '結構', '邊界、判斷、精確與提煉'],
        ['水', '流動', '智慧、適應、直覺與策略'],
      ],
      features: [
        ['八字四柱', '根據出生時間生成八字命盤，理解性格、人生路徑、事業、財富和關係傾向。'],
        ['紫微斗數', '生成十二宮位、星曜分布和命盤分析，用另一套東方命理系統補充視角。'],
        ['每日運勢', '查看每日、每週和每月的星座運勢，包括感情、事業和健康參考。'],
        ['關係合盤', '分析星座或命理關係適配度，獲得更清晰的相處參考。'],
      ],
      testimonials: [
        ['Emily Chen', '創業者', '八字解讀對我的事業路徑描述得很準確，也幫助我重新理解自己的優勢。'],
        ['Michael Wong', '軟體工程師', '一開始我有點懷疑，但關係方面的分析很貼近實際，給了我溝通上的提醒。'],
        ['Sarah Johnson', '教師', '高級報告的細節比我預期更具體，在一段困難時期給了我清晰感。'],
      ],
    },
  });

  const elementTones = ['bg-emerald-400', 'bg-red-400', 'bg-amber-300', 'bg-slate-300', 'bg-sky-300'];
  const elements = text.elements.map(([name, value, description], index) => ({
    name,
    value,
    description,
    tone: elementTones[index],
  }));

  const features = [
    {
      title: text.features[0][0],
      description: text.features[0][1],
      icon: <Sun className="h-6 w-6 text-amber-500" />,
      link: '/readings'
    },
    {
      title: text.features[1][0],
      description: text.features[1][1],
      icon: <Compass className="h-6 w-6 text-purple-500" />,
      link: '/zi-wei'
    },
    {
      title: text.features[2][0],
      description: text.features[2][1],
      icon: <Star className="h-6 w-6 text-indigo-500" />,
      link: '/leo'
    },
    {
      title: text.features[3][0],
      description: text.features[3][1],
      icon: <Moon className="h-6 w-6 text-blue-400" />,
      link: '/compatibility'
    }
  ];

  const testimonials = [
    {
      name: text.testimonials[0][0],
      role: text.testimonials[0][1],
      content: text.testimonials[0][2],
    },
    {
      name: text.testimonials[1][0],
      role: text.testimonials[1][1],
      content: text.testimonials[1][2],
    },
    {
      name: text.testimonials[2][0],
      role: text.testimonials[2][1],
      content: text.testimonials[2][2],
    }
  ];

  const reportModules = [
    {
      title: text.reportModules[0][0],
      description: text.reportModules[0][1],
      icon: <Bot className="h-6 w-6" />,
      accent: 'text-sky-300',
    },
    {
      title: text.reportModules[1][0],
      description: text.reportModules[1][1],
      icon: <BarChart3 className="h-6 w-6" />,
      accent: 'text-emerald-300',
    },
    {
      title: text.reportModules[2][0],
      description: text.reportModules[2][1],
      icon: <MessageCircle className="h-6 w-6" />,
      accent: 'text-violet-300',
    },
    {
      title: text.reportModules[3][0],
      description: text.reportModules[3][1],
      icon: <Download className="h-6 w-6" />,
      accent: 'text-amber-300',
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Chinese Astrology & Fortune Telling",
    "url": "https://fortunetelling.it.com/",
    "description": "Authentic Chinese astrology with free BaZi analysis, daily horoscopes, Zi Wei Dou Shu readings, and zodiac compatibility insights.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://fortunetelling.it.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "Offer",
      "description": "Free Chinese astrology readings and horoscope analysis"
    }
  };

  return (
    <div className="w-full">
      <SEO 
        title="Free BaZi Reading & Chinese Astrology"
        description="Get free BaZi Four Pillars analysis, Zi Wei Dou Shu readings, daily horoscopes, and zodiac compatibility insights."
        keywords={[
          "bazi reading", "chinese astrology", "four pillars", "zi wei dou shu",
          "daily horoscope", "zodiac compatibility"
        ]}
        url="https://fortunetelling.it.com/"
        structuredData={structuredData}
      />
      <HeroSection />

      {/* Report Modules Section */}
      <section className="relative z-10 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                {text.reportEyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                {text.reportTitle}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              {text.reportIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {reportModules.map((module, index) => (
              <motion.article
                key={module.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-card glass-card-hover p-5"
              >
                <div className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.08] shadow-lg shadow-black/10 backdrop-blur-xl ${module.accent}`}>
                  {module.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{module.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{module.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              {text.featuresTitle}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {text.featuresIntro}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card glass-card-hover p-6"
              >
                <div className="glass-inset mb-6 flex h-10 w-10 items-center justify-center text-amber-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 mb-6">{feature.description}</p>
                <Link to={feature.link} className="text-amber-400 inline-flex items-center group">
                  {text.learnMore}
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Five Elements Section */}
      <section className="relative border-y border-white/15 bg-white/[0.035] px-4 py-16 backdrop-blur-xl">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              {text.fiveTitle}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {text.fiveIntro}
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 lg:grid-cols-5">
            {elements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{element.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{element.value}</p>
                  </div>
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${element.tone}`} />
                </div>
                <div className="mb-4 h-px w-full bg-white/10" />
                <p className="min-h-[48px] text-sm leading-6 text-slate-300">
                  {element.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zodiac Signs Quick Access */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              {text.zodiacTitle}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {text.zodiacIntro}
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Aries', symbol: 'AR', dates: 'Mar 21 - Apr 19' },
              { name: 'Taurus', symbol: 'TA', dates: 'Apr 20 - May 20' },
              { name: 'Gemini', symbol: 'GE', dates: 'May 21 - Jun 20' },
              { name: 'Cancer', symbol: 'CA', dates: 'Jun 21 - Jul 22' },
              { name: 'Leo', symbol: 'LE', dates: 'Jul 23 - Aug 22' },
              { name: 'Virgo', symbol: 'VI', dates: 'Aug 23 - Sep 22' },
              { name: 'Libra', symbol: 'LI', dates: 'Sep 23 - Oct 22' },
              { name: 'Scorpio', symbol: 'SC', dates: 'Oct 23 - Nov 21' },
              { name: 'Sagittarius', symbol: 'SG', dates: 'Nov 22 - Dec 21' },
              { name: 'Capricorn', symbol: 'CP', dates: 'Dec 22 - Jan 19' },
              { name: 'Aquarius', symbol: 'AQ', dates: 'Jan 20 - Feb 18' },
              { name: 'Pisces', symbol: 'PI', dates: 'Feb 19 - Mar 20' }
            ].map((sign, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link
                  to={`/${sign.name.toLowerCase()}`}
                  className="block rounded-lg border border-white/15 bg-white/[0.075] p-4 text-center shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-amber-300/40 hover:bg-white/[0.11]"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-md border border-amber-300/20 bg-amber-300/10 text-xs font-semibold tracking-wide text-amber-200 transition-transform duration-300 group-hover:scale-105">
                    {sign.symbol}
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">{sign.name}</h3>
                  <p className="text-slate-400 text-xs">{sign.dates}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/compatibility"
              className="glass-primary-button inline-flex items-center gap-2 rounded-md px-8 py-4 font-semibold"
            >
              {text.compatibilityCta}
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              {text.testimonialsTitle}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {text.testimonialsIntro}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
