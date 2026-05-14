import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BirthDateForm, { BirthData } from '../components/BirthDateForm';
import BasicResultsDisplay from '../components/BasicResultsDisplay';
import PremiumFeatures from '../components/PremiumFeatures';
import ChatInterface from '../components/ChatInterface';
import DetailedResultsSection from '../components/DetailedResultsSection';
import SEO from '../components/SEO';
import { calculateBaziChart } from '../services/baziCore';
import { useI18n } from '../i18n';

const Readings: React.FC = () => {
  const [formData, setFormData] = useState<BirthData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { pick } = useI18n();

  const text = pick({
    en: {
      title: 'Discover Your Celestial Blueprint',
      subtitle: 'Enter your birth information below to receive insights based on ancient astrology systems.',
      askTitle: 'Ask Questions About Your Reading',
      systemsTitle: 'Our Reading Systems',
      baziTitle: 'BaZi (Four Pillars)',
      baziBody: 'BaZi, also known as Four Pillars of Destiny, is derived from your birth date and time. It analyzes the interaction between the five elements and reveals insights about your personality, strengths, weaknesses, and life path.',
      baziBullets: [
        'Reveals your innate character traits',
        'Identifies favorable career paths',
        'Highlights relationship compatibility',
        'Shows auspicious timing for important decisions',
      ],
      ziweiTitle: 'Zi Wei Dou Shu (Purple Star Astrology)',
      ziweiBody: 'Zi Wei Dou Shu creates a detailed chart of 12 palaces representing different life aspects, with various stars influencing each palace.',
      ziweiBullets: [
        'Detailed analysis of 12 life aspects',
        'Insights about family relationships',
        'Wealth and career predictions',
        'Health indications and potential challenges',
        'Timing of significant life events',
      ],
    },
    'zh-CN': {
      title: '探索你的八字命盘',
      subtitle: '输入出生信息，生成基于传统命理结构的个性化解读。',
      askTitle: '继续追问你的命盘',
      systemsTitle: '我们的解读体系',
      baziTitle: '八字（四柱命理）',
      baziBody: '八字又称四柱命理，由出生日期和时间推导而来，用于分析五行互动、性格倾向、优势弱点和人生路径。',
      baziBullets: [
        '揭示先天性格特质',
        '识别更适合的事业方向',
        '分析关系与合盘信号',
        '提示重要决策的时间背景',
      ],
      ziweiTitle: '紫微斗数',
      ziweiBody: '紫微斗数通过十二宫位和星曜组合观察人生不同领域，适合补充八字之外的细节视角。',
      ziweiBullets: [
        '分析十二宫位的人生主题',
        '观察家庭与人际关系',
        '解读财富和事业趋势',
        '提示健康和潜在挑战',
        '辅助判断重大事件时间点',
      ],
    },
    'zh-TW': {
      title: '探索你的八字命盤',
      subtitle: '輸入出生資訊，生成基於傳統命理結構的個人化解讀。',
      askTitle: '繼續追問你的命盤',
      systemsTitle: '我們的解讀體系',
      baziTitle: '八字（四柱命理）',
      baziBody: '八字又稱四柱命理，由出生日期和時間推導而來，用於分析五行互動、性格傾向、優勢弱點和人生路徑。',
      baziBullets: [
        '揭示先天性格特質',
        '識別更適合的事業方向',
        '分析關係與合盤訊號',
        '提示重要決策的時間背景',
      ],
      ziweiTitle: '紫微斗數',
      ziweiBody: '紫微斗數透過十二宮位和星曜組合觀察人生不同領域，適合補充八字之外的細節視角。',
      ziweiBullets: [
        '分析十二宮位的人生主題',
        '觀察家庭與人際關係',
        '解讀財富和事業趨勢',
        '提示健康和潛在挑戰',
        '輔助判斷重大事件時間點',
      ],
    },
  });

  const handleFormSubmit = (data: BirthData) => {
    setFormData(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chart = formData ? calculateBaziChart(formData) : null;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free BaZi Reading",
      "url": "https://fortunetelling.it.com/readings",
      "description": "Generate a free BaZi Four Pillars reading from birth date, birth time, gender, and birth location.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Chinese Astrology & Fortune Telling",
        "url": "https://fortunetelling.it.com/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Free BaZi Reading Tool",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "url": "https://fortunetelling.it.com/readings",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ];
  const chatContext = chart
    ? `You are a knowledgeable BaZi expert. Answer questions using this structured chart data and avoid inventing pillars or element scores. Chart data: ${JSON.stringify({
        zodiac: chart.zodiac,
        dayMaster: chart.dayMaster,
        dayMasterElement: chart.dayMasterElement,
        strongestElement: chart.strongestElement,
        weakestElement: chart.weakestElement,
        elementScores: chart.elementScores,
        pillars: chart.pillars.map((pillar) => ({
          label: pillar.label,
          stem: pillar.stem,
          branch: pillar.branch,
          stemElement: pillar.stemElement,
          branchElement: pillar.branchElement,
          hiddenStems: pillar.hiddenStems,
          tenGod: pillar.tenGod,
        })),
        rules: chart.rules,
      })}`
    : '';

  return (
    <div className="pt-24 pb-16 px-4">
      <SEO
        title="Free BaZi Reading | Four Pillars Birth Chart Analysis"
        description="Generate a free BaZi reading with Four Pillars, Five Elements balance, Day Master insights, and Chinese astrology chart guidance based on your birth information."
        keywords={[
          "free bazi reading", "bazi calculator", "four pillars birth chart", "day master",
          "five elements analysis", "chinese astrology reading", "八字排盘", "四柱命盘"
        ]}
        url="https://fortunetelling.it.com/readings"
        structuredData={structuredData}
      />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">
            {text.title}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>
        
        {!showResults ? (
          <BirthDateForm onSubmit={handleFormSubmit} />
        ) : (
          <div className="space-y-8">
            <BasicResultsDisplay formData={formData!} />
            <DetailedResultsSection formData={formData!} />
            <div className="mt-8">
              <h2 className="text-2xl font-serif text-white mb-6 text-center">
                {text.askTitle}
              </h2>
              <ChatInterface 
                initialContext={chatContext}
              />
            </div>
            <PremiumFeatures />
          </div>
        )}
        
        {!showResults && (
          <div className="mt-16">
            <div className="glass-panel p-8">
              <h2 className="text-2xl font-serif text-white mb-6 text-center">
                {text.systemsTitle}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card glass-card-hover p-6">
                  <h3 className="text-xl text-amber-400 mb-4">{text.baziTitle}</h3>
                  <p className="text-slate-300 mb-4">
                    {text.baziBody}
                  </p>
                  <ul className="text-slate-300 space-y-2 list-disc pl-5">
                    {text.baziBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="glass-card glass-card-hover p-6">
                  <h3 className="text-xl text-amber-400 mb-4">{text.ziweiTitle}</h3>
                  <p className="text-slate-300 mb-4">
                    {text.ziweiBody}
                  </p>
                  <ul className="text-slate-300 space-y-2 list-disc pl-5">
                    {text.ziweiBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Readings;
