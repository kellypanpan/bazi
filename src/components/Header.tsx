import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, ChevronDown, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { languageOptions, useI18n } from '../i18n';
import { useAuth } from '../auth/AuthProvider';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isZodiacOpen, setIsZodiacOpen] = useState(false);
  const [isMobileZodiacOpen, setIsMobileZodiacOpen] = useState(false);
  // Services dropdown removed for cleaner nav
  const location = useLocation();
  const { language, setLanguage, pick } = useI18n();
  const { user, openAuthModal, signOut } = useAuth();

  const text = pick({
    en: {
      home: 'Home',
      baziReadings: 'BaZi Readings',
      bazi: 'BaZi',
      ziWei: 'Zi Wei',
      compatibility: 'Compatibility',
      palmFace: 'Palm & Face',
      zodiacSigns: 'Zodiac Signs',
      about: 'About',
      premium: 'Premium',
      signIn: 'Sign in',
      signOut: 'Sign out',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    'zh-CN': {
      home: '首页',
      baziReadings: '八字排盘',
      bazi: '八字',
      ziWei: '紫微',
      compatibility: '合盘',
      palmFace: '手相面相',
      zodiacSigns: '星座',
      about: '关于',
      premium: '高级版',
      signIn: '登录',
      signOut: '退出',
      openMenu: '打开菜单',
      closeMenu: '关闭菜单',
    },
    'zh-TW': {
      home: '首頁',
      baziReadings: '八字排盤',
      bazi: '八字',
      ziWei: '紫微',
      compatibility: '合盤',
      palmFace: '手相面相',
      zodiacSigns: '星座',
      about: '關於',
      premium: '高級版',
      signIn: '登入',
      signOut: '退出',
      openMenu: '打開選單',
      closeMenu: '關閉選單',
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: text.home, path: '/' },
    { name: text.baziReadings, path: '/readings' },
    { name: text.compatibility, path: '/compatibility' },
    { name: text.about, path: '/about' },
    { name: text.premium, path: '/subscription' }
  ];

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', path: '/aries', dates: 'Mar 21 - Apr 19' },
    { name: 'Taurus', symbol: '♉', path: '/taurus', dates: 'Apr 20 - May 20' },
    { name: 'Gemini', symbol: '♊', path: '/gemini', dates: 'May 21 - Jun 20' },
    { name: 'Cancer', symbol: '♋', path: '/cancer', dates: 'Jun 21 - Jul 22' },
    { name: 'Leo', symbol: '♌', path: '/leo', dates: 'Jul 23 - Aug 22' },
    { name: 'Virgo', symbol: '♍', path: '/virgo', dates: 'Aug 23 - Sep 22' },
    { name: 'Libra', symbol: '♎', path: '/libra', dates: 'Sep 23 - Oct 22' },
    { name: 'Scorpio', symbol: '♏', path: '/scorpio', dates: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius', symbol: '♐', path: '/sagittarius', dates: 'Nov 22 - Dec 21' },
    { name: 'Capricorn', symbol: '♑', path: '/capricorn', dates: 'Dec 22 - Jan 19' },
    { name: 'Aquarius', symbol: '♒', path: '/aquarius', dates: 'Jan 20 - Feb 18' },
    { name: 'Pisces', symbol: '♓', path: '/pisces', dates: 'Feb 19 - Mar 20' }
  ];

  const externalPalmFace = { name: text.palmFace, url: 'https://facepalmai.com/' };

  const languageSwitcher = (
    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-lg shadow-black/20 backdrop-blur-xl">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            language === option.code
              ? 'bg-amber-500 text-indigo-950'
              : 'text-slate-300 hover:text-amber-300'
          }`}
          aria-label={option.label}
        >
          {option.shortLabel}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-serif text-amber-400">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-8 w-8 text-amber-400" />
            </motion.div>
            <span className="hidden sm:block">Celestial Insights</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {/* Home */}
            <Link to="/" className={`text-lg transition-all duration-300 ${location.pathname==='/'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>{text.home}</Link>
            {/* BaZi */}
            <Link to="/readings" className={`text-lg transition-all duration-300 ${location.pathname==='/readings'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>{text.bazi}</Link>
            {/* Zi Wei */}
            <Link to="/zi-wei" className={`text-lg transition-all duration-300 ${location.pathname==='/zi-wei'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>{text.ziWei}</Link>
            {/* Compatibility */}
            <Link to="/compatibility" className={`text-lg transition-all duration-300 ${location.pathname==='/compatibility'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>{text.compatibility}</Link>
            {/* Palm & Face external */}
            <a href={externalPalmFace.url} target="_blank" rel="noopener noreferrer" className="text-lg text-slate-200 hover:text-amber-400 transition-all duration-300">{externalPalmFace.name}</a>
            {/* Zodiac Dropdown (kept) */}
            <div 
              className="relative"
              onMouseEnter={() => setIsZodiacOpen(true)}
              onMouseLeave={() => setIsZodiacOpen(false)}
            >
              <button
                className={`text-lg transition-all duration-300 flex items-center gap-1 ${
                  zodiacSigns.some(sign => location.pathname === sign.path)
                    ? 'text-amber-400 font-medium'
                    : 'text-slate-200 hover:text-amber-400'
                }`}
              >
                {text.zodiacSigns}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isZodiacOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isZodiacOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass-panel absolute top-full left-0 mt-2 w-80"
                >
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {zodiacSigns.map((sign) => (
                      <Link
                        key={sign.path}
                        to={sign.path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          location.pathname === sign.path
                            ? 'bg-amber-500 bg-opacity-20 text-amber-400'
                            : 'hover:bg-white/[0.08] text-slate-200 hover:text-amber-400'
                        }`}
                      >
                        <span className="text-2xl">{sign.symbol}</span>
                        <div>
                          <div className="font-medium">{sign.name}</div>
                          <div className="text-xs text-slate-400">{sign.dates}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* About */}
            <Link to="/about" className={`text-lg transition-all duration-300 ${location.pathname==='/about'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>{text.about}</Link>
            {/* Premium button */}
            <Link to="/subscription" className="glass-primary-button rounded-full px-4 py-2 font-medium">{text.premium}</Link>
            {languageSwitcher}
            {user ? (
              <button
                type="button"
                onClick={signOut}
                className="flex max-w-[170px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-200 transition hover:text-amber-300"
                title={user.email || text.signOut}
              >
                <UserCircle className="h-4 w-4 shrink-0" />
                <span className="truncate">{user.email}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openAuthModal}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-amber-300"
              >
                {text.signIn}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white md:hidden focus:outline-none"
            aria-label={isMenuOpen ? text.closeMenu : text.openMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="glass-nav md:hidden overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`text-lg py-2 transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-amber-400 font-medium'
                    : 'text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Zodiac Signs */}
            <div>
              <button
                onClick={() => setIsMobileZodiacOpen(!isMobileZodiacOpen)}
                className={`text-lg py-2 transition-all duration-300 flex items-center gap-2 w-full ${
                  zodiacSigns.some(sign => location.pathname === sign.path)
                    ? 'text-amber-400 font-medium'
                    : 'text-slate-200'
                }`}
              >
                {text.zodiacSigns}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileZodiacOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMobileZodiacOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden ml-4 mt-2"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {zodiacSigns.map((sign) => (
                      <Link
                        key={sign.path}
                        to={sign.path}
                        onClick={closeMenu}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                          location.pathname === sign.path
                            ? 'bg-amber-500 bg-opacity-20 text-amber-400'
                            : 'hover:bg-white/[0.08] text-slate-300'
                        }`}
                      >
                        <span className="text-lg">{sign.symbol}</span>
                        <div>
                          <div className="text-sm font-medium">{sign.name}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Direct links */}
            <Link to="/readings" onClick={closeMenu} className={`text-lg py-2 transition-all duration-300 ${location.pathname==='/readings'?'text-amber-400 font-medium':'text-slate-200'}`}>{text.bazi}</Link>
            <Link to="/zi-wei" onClick={closeMenu} className={`text-lg py-2 transition-all duration-300 ${location.pathname==='/zi-wei'?'text-amber-400 font-medium':'text-slate-200'}`}>{text.ziWei}</Link>
            <Link to="/compatibility" onClick={closeMenu} className={`text-lg py-2 transition-all duration-300 ${location.pathname==='/compatibility'?'text-amber-400 font-medium':'text-slate-200'}`}>{text.compatibility}</Link>
            <a href={externalPalmFace.url} target="_blank" rel="noopener noreferrer" className="text-lg py-2 text-slate-200 transition-all duration-300 hover:text-amber-400" onClick={closeMenu}>{externalPalmFace.name}</a>

            {/* About link in mobile */}
            <Link
              to="/about"
              onClick={closeMenu}
              className={`text-lg py-2 transition-all duration-300 ${
                location.pathname === '/about' ? 'text-amber-400 font-medium' : 'text-slate-200'
              }`}
            >
              {text.about}
            </Link>
            <Link
              to="/subscription"
              onClick={closeMenu}
              className="glass-primary-button rounded-full px-4 py-2 text-center font-medium"
            >
              {text.premium}
            </Link>
            {languageSwitcher}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-left text-sm text-slate-200"
              >
                {text.signOut}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  openAuthModal();
                  closeMenu();
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-left text-sm text-slate-200"
              >
                {text.signIn}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
