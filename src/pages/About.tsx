import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Compass, Sparkles, Star } from 'lucide-react';
import SEO from '../components/SEO';
import { useI18n } from '../i18n';

const aboutCopy = {
  en: {
    title: 'About Chinese Astrology',
    subtitle: 'Discover the ancient wisdom traditions that have guided countless lives for millennia.',
    methodology: 'Methodology',
    ancientTitle: 'The Ancient Art of Chinese Astrology',
    paragraphs: [
      'Chinese astrology is one of the oldest astrological systems in the world, dating back thousands of years. Unlike Western astrology which focuses primarily on the positions of celestial bodies, Chinese astrology incorporates a complex system of cosmological concepts including Yin and Yang, the Five Elements, the Chinese Zodiac, and the interaction of celestial influences with earthly dynamics.',
      'This ancient practice evolved from the observation of celestial cycles and their correlation with natural phenomena and human affairs. Over centuries, Chinese scholars refined these observations into sophisticated systems that could provide insights into personality traits, relationships, career prospects, and life events.',
      "Today, these traditional systems continue to offer valuable guidance to those seeking to understand themselves and navigate life's challenges with greater awareness and harmony.",
    ],
    systemsTitle: 'Key Systems in Chinese Astrology',
    baziTitle: 'BaZi (Four Pillars of Destiny)',
    baziBody: 'Also known as "Four Pillars of Destiny," BaZi charts map your cosmic blueprint based on your birth time. Each pillar represents the year, month, day, and hour of birth, revealing personality, strengths, challenges, and life path.',
    baziFeatureTitle: 'BaZi Key Features:',
    baziFeatures: [
      'Analyzes the balance of Five Elements: Wood, Fire, Earth, Metal, and Water',
      'Reveals hidden talents and natural aptitudes through elemental analysis',
      'Identifies favorable periods and potential challenges in your life cycle',
      'Provides insights into relationship dynamics and compatibility',
      'Offers guidance for personal and professional decisions based on your elemental makeup',
    ],
    ziweiTitle: 'Zi Wei Dou Shu (Purple Star Astrology)',
    ziweiBody: 'Zi Wei Dou Shu creates a detailed chart of 12 palaces, each representing different life aspects. Stars are placed in these houses based on birth data, creating a cosmic map of your life.',
    ziweiFeatureTitle: 'Key Features:',
    ziweiFeatures: [
      'Provides detailed analysis of 12 life aspects including career, wealth, and relationships',
      'Maps the influence of over 100 stars on different areas of life',
      'Offers timing information for significant life events',
      'Reveals deeper insights about destiny and life purpose',
      'Helps identify optimal timing for major decisions and actions',
    ],
    elementsTitle: 'The Five Elements and Their Significance',
    elementsIntro: 'The Five Elements (Wu Xing) are fundamental energies that interact in cycles of creation and control, forming the foundation of Chinese astrology and traditional medicine.',
    meta: ['Direction', 'Season', 'Traits'],
    cta: 'Get Your Free BaZi Reading',
    elements: [
      ['Wood (木)', 'Represents growth, vitality, and creativity. Wood types are visionary, innovative, and compassionate.', ['East', 'Spring', 'Idealistic, flexible']],
      ['Fire (火)', 'Symbolizes transformation, passion, and expressiveness. Fire types are charismatic, dynamic, and enthusiastic.', ['South', 'Summer', 'Expressive, intuitive']],
      ['Earth (土)', 'Embodies stability, nourishment, and centeredness. Earth types are reliable, practical, and nurturing.', ['Center', 'Late Summer', 'Stable, supportive']],
      ['Metal (金)', 'Represents clarity, precision, and efficiency. Metal types are structured, disciplined, and detail-oriented.', ['West', 'Autumn', 'Organized, precise']],
      ['Water (水)', 'Symbolizes wisdom, adaptability, and depth. Water types are reflective, perceptive, and resourceful.', ['North', 'Winter', 'Intuitive, deep']],
    ],
  },
  'zh-CN': {
    title: '关于中国命理',
    subtitle: '了解传承千年的东方命理体系，以及它如何帮助现代人理解自己。',
    methodology: '方法体系',
    ancientTitle: '中国命理的古老智慧',
    paragraphs: [
      '中国命理是世界上历史最悠久的命理体系之一。它不只看天体位置，也结合阴阳、五行、生肖、天干地支，以及天地气机与人生处境之间的互动。',
      '这些体系源自古人对天时、节气、自然变化和人事规律的长期观察。经过历代整理，逐渐形成可用于理解性格、关系、事业节奏和人生阶段的分析框架。',
      '今天，八字和紫微仍然适合作为自我理解和规划工具，帮助用户以更清晰、更有秩序的方式面对选择。',
    ],
    systemsTitle: '中国命理的核心系统',
    baziTitle: '八字（四柱命盘）',
    baziBody: '八字以出生年、月、日、时四柱为基础，通过天干、地支、藏干、五行和十神之间的关系，呈现一个人的性格结构、优势挑战和人生节奏。',
    baziFeatureTitle: '八字重点：',
    baziFeatures: ['分析木火土金水五行的强弱与平衡', '通过五行和十神看见潜能与能力倾向', '识别人生周期中的有利阶段和挑战阶段', '提供关系互动与合盘参考', '为个人、事业和长期规划提供结构化建议'],
    ziweiTitle: '紫微斗数',
    ziweiBody: '紫微斗数以十二宫位和星曜组合建立人生地图。不同宫位对应命宫、事业、财帛、夫妻、福德等领域，能提供更细分的人生主题观察。',
    ziweiFeatureTitle: '核心特点：',
    ziweiFeatures: ['分析事业、财富、关系等十二个人生宫位', '观察主星、辅星和四化对不同领域的影响', '提供关键事件和人生阶段的时间参考', '揭示更深层的人生方向与主题', '帮助判断重大决定的合适时机'],
    elementsTitle: '五行及其意义',
    elementsIntro: '五行是中国命理和传统文化中的基础能量模型，通过相生相克解释性格、资源、节奏和平衡。',
    meta: ['方位', '季节', '特质'],
    cta: '免费获取八字解读',
    elements: [
      ['木（Wood）', '代表生长、活力和创造力。木型人通常有愿景、同理心和开拓精神。', ['东方', '春季', '理想、灵活']],
      ['火（Fire）', '代表热情、表达和转化。火型人通常有感染力、行动力和直觉。', ['南方', '夏季', '表达、直觉']],
      ['土（Earth）', '代表稳定、承载和滋养。土型人通常务实、可靠、能照顾整体。', ['中央', '长夏', '稳定、支持']],
      ['金（Metal）', '代表秩序、边界和效率。金型人通常重规则、执行力强、注重细节。', ['西方', '秋季', '组织、精准']],
      ['水（Water）', '代表智慧、流动和深度。水型人通常敏锐、善思考、适应力强。', ['北方', '冬季', '直觉、深度']],
    ],
  },
  'zh-TW': {
    title: '關於中國命理',
    subtitle: '了解傳承千年的東方命理體系，以及它如何幫助現代人理解自己。',
    methodology: '方法體系',
    ancientTitle: '中國命理的古老智慧',
    paragraphs: [
      '中國命理是世界上歷史最悠久的命理體系之一。它不只看天體位置，也結合陰陽、五行、生肖、天干地支，以及天地氣機與人生處境之間的互動。',
      '這些體系源自古人對天時、節氣、自然變化和人事規律的長期觀察。經過歷代整理，逐漸形成可用於理解性格、關係、事業節奏和人生階段的分析框架。',
      '今天，八字和紫微仍然適合作為自我理解和規劃工具，幫助使用者以更清晰、更有秩序的方式面對選擇。',
    ],
    systemsTitle: '中國命理的核心系統',
    baziTitle: '八字（四柱命盤）',
    baziBody: '八字以出生年、月、日、時四柱為基礎，透過天干、地支、藏干、五行和十神之間的關係，呈現一個人的性格結構、優勢挑戰和人生節奏。',
    baziFeatureTitle: '八字重點：',
    baziFeatures: ['分析木火土金水五行的強弱與平衡', '透過五行和十神看見潛能與能力傾向', '識別人生週期中的有利階段和挑戰階段', '提供關係互動與合盤參考', '為個人、事業和長期規劃提供結構化建議'],
    ziweiTitle: '紫微斗數',
    ziweiBody: '紫微斗數以十二宮位和星曜組合建立人生地圖。不同宮位對應命宮、事業、財帛、夫妻、福德等領域，能提供更細分的人生主題觀察。',
    ziweiFeatureTitle: '核心特點：',
    ziweiFeatures: ['分析事業、財富、關係等十二個人生宮位', '觀察主星、輔星和四化對不同領域的影響', '提供關鍵事件和人生階段的時間參考', '揭示更深層的人生方向與主題', '幫助判斷重大決定的合適時機'],
    elementsTitle: '五行及其意義',
    elementsIntro: '五行是中國命理和傳統文化中的基礎能量模型，透過相生相剋解釋性格、資源、節奏和平衡。',
    meta: ['方位', '季節', '特質'],
    cta: '免費獲取八字解讀',
    elements: [
      ['木（Wood）', '代表生長、活力和創造力。木型人通常有願景、同理心和開拓精神。', ['東方', '春季', '理想、靈活']],
      ['火（Fire）', '代表熱情、表達和轉化。火型人通常有感染力、行動力和直覺。', ['南方', '夏季', '表達、直覺']],
      ['土（Earth）', '代表穩定、承載和滋養。土型人通常務實、可靠、能照顧整體。', ['中央', '長夏', '穩定、支持']],
      ['金（Metal）', '代表秩序、邊界和效率。金型人通常重規則、執行力強、注重細節。', ['西方', '秋季', '組織、精準']],
      ['水（Water）', '代表智慧、流動和深度。水型人通常敏銳、善思考、適應力強。', ['北方', '冬季', '直覺、深度']],
    ],
  },
};

const About: React.FC = () => {
  const { pick } = useI18n();
  const copy = pick(aboutCopy);
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Chinese Astrology",
    "description": "Learn about the ancient traditions of Chinese astrology, BaZi Four Pillars, and Zi Wei Dou Shu systems.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Chinese Astrology & Fortune Telling",
      "description": "Providing authentic Chinese astrology readings and guidance through ancient wisdom traditions."
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <SEO 
        title="About Chinese Astrology | Learn BaZi & Zi Wei Dou Shu Systems"
        description="Discover the ancient wisdom traditions of Chinese astrology. Learn about BaZi Four Pillars, Zi Wei Dou Shu, Five Elements, and how these systems guide modern life."
        keywords={[
          "chinese astrology", "bazi four pillars", "zi wei dou shu", "five elements",
          "ancient wisdom", "astrology systems", "chinese fortune telling", "destiny analysis",
          "wu xing", "purple star astrology", "天干地支", "五行相克"
        ]}
        url="https://fortunetelling.it.com/about"
        type="article"
        structuredData={aboutStructuredData}
      />
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <div className="glass-inset mb-5 inline-flex h-12 w-12 items-center justify-center text-amber-300">
            <Compass className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {copy.title}
          </h1>
          <p className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 md:p-8"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
              <Sparkles className="h-4 w-4" />
              {copy.methodology}
            </div>
            <h2 className="text-2xl font-serif text-white mb-6">
              {copy.ancientTitle}
            </h2>
            
            <div className="prose prose-invert max-w-none text-slate-200 prose-p:leading-8">
              {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </motion.div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white text-center mb-12">
            {copy.systemsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className="flex items-start mb-4">
                <div className="glass-inset mr-4 flex h-12 w-12 shrink-0 items-center justify-center text-amber-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{copy.baziTitle}</h3>
                  <p className="text-slate-300">{copy.baziBody}</p>
                </div>
              </div>
              
              <div className="pl-16">
                <h4 className="text-lg text-amber-400 mb-2">{copy.baziFeatureTitle}</h4>
                <ul className="text-slate-300 space-y-3">
                  {copy.baziFeatures.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className="flex items-start mb-4">
                <div className="glass-inset mr-4 flex h-12 w-12 shrink-0 items-center justify-center text-amber-300">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{copy.ziweiTitle}</h3>
                  <p className="text-slate-300">{copy.ziweiBody}</p>
                </div>
              </div>
              
              <div className="pl-16">
                <h4 className="text-lg text-amber-400 mb-2">{copy.ziweiFeatureTitle}</h4>
                <ul className="text-slate-300 space-y-3">
                  {copy.ziweiFeatures.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white text-center mb-8">
            {copy.elementsTitle}
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 md:p-8"
          >
            <p className="text-slate-300 mb-8 text-center">
              {copy.elementsIntro}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {copy.elements.map(([name, body, meta], index) => (
                <div key={name as string} className={`glass-card p-4 border-l-4 ${['border-green-600', 'border-red-600', 'border-amber-600', 'border-gray-400', 'border-blue-600'][index]}`}>
                  <h3 className={`text-lg mb-2 ${['text-green-500', 'text-red-500', 'text-amber-500', 'text-gray-300', 'text-blue-500'][index]}`}>{name as string}</h3>
                  <p className="text-slate-300 text-sm">{body as string}</p>
                  <div className="mt-3 text-sm text-slate-400">
                    {(meta as string[]).map((item, metaIndex) => (
                      <div key={item}>{copy.meta[metaIndex]}: {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="text-center mb-8">
          <Link to="/readings" className="glass-primary-button inline-block rounded-lg px-8 py-3 text-lg font-semibold">
            {copy.cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
