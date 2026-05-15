import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useI18n } from '../i18n';

const Footer: React.FC = () => {
  const { pick } = useI18n();
  const text = pick({
    en: {
      tagline: 'Discover the ancient wisdom of Chinese astrology and transform your life with personalized guidance.',
      quickLinks: 'Quick Links',
      home: 'Home',
      getReading: 'Get Reading',
      about: 'About Chinese Astrology',
      premium: 'Premium Readings',
      readings: 'Readings',
      bazi: 'BaZi (Four Pillars)',
      ziWei: 'Zi Wei Dou Shu',
      zodiac: 'Chinese Zodiac',
      elements: 'Five Elements',
      support: 'Support',
      contact: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      faq: 'FAQ',
      rights: 'All rights reserved.',
    },
    'zh-CN': {
      tagline: '用现代方式理解中国传统命理智慧，获得更清晰的个性化参考。',
      quickLinks: '快速入口',
      home: '首页',
      getReading: '开始解读',
      about: '关于中国命理',
      premium: '高级解读',
      readings: '解读类型',
      bazi: '八字四柱',
      ziWei: '紫微斗数',
      zodiac: '生肖与星座',
      elements: '五行分析',
      support: '支持',
      contact: '联系我们',
      privacy: '隐私政策',
      terms: '服务条款',
      faq: '常见问题',
      rights: '保留所有权利。',
    },
    'zh-TW': {
      tagline: '用現代方式理解中國傳統命理智慧，獲得更清晰的個人化參考。',
      quickLinks: '快速入口',
      home: '首頁',
      getReading: '開始解讀',
      about: '關於中國命理',
      premium: '高級解讀',
      readings: '解讀類型',
      bazi: '八字四柱',
      ziWei: '紫微斗數',
      zodiac: '生肖與星座',
      elements: '五行分析',
      support: '支援',
      contact: '聯絡我們',
      privacy: '隱私政策',
      terms: '服務條款',
      faq: '常見問題',
      rights: '保留所有權利。',
    },
  });

  return (
    <footer className="relative z-10 border-t border-white/15 bg-white/[0.045] text-slate-300 backdrop-blur-2xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif text-amber-300 mb-4">Celestial Insights</h3>
            <p className="text-slate-400 mb-4">
              {text.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">{text.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.home}
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.getReading}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.about}
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.premium}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">{text.readings}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/readings" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.bazi}
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.ziWei}
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.zodiac}
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.elements}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">{text.support}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.contact}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.terms}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-amber-300">
                  {text.faq}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Celestial Insights. {text.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
