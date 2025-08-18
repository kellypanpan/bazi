import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-indigo-950">
      <SEO 
        title="BaZi Chinese Astrology | Free BaZi Readings & Compatibility"
        description="Explore BaZi Chinese astrology with free BaZi readings, BaZi compatibility insights, Four Pillars (BaZi) analysis, Zi Wei Dou Shu, and daily horoscope guidance."
        keywords={[
          'bazi', 'bazi readings', 'bazi analysis', 'bazi compatibility', 'four pillars', 'zi wei dou shu', 'chinese astrology', '八字'
        ]}
        url="https://fortunetelling.it.com/"
      />
      <div className="stars-container fixed top-0 left-0 w-full h-full pointer-events-none z-0"></div>
      <Header />
      <main className="flex-grow z-10 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;