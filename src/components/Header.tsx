import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isZodiacOpen, setIsZodiacOpen] = useState(false);
  const [isMobileZodiacOpen, setIsMobileZodiacOpen] = useState(false);
  // Services dropdown removed for cleaner nav
  const location = useLocation();

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
    { name: 'Home', path: '/' },
    { name: 'BaZi Readings', path: '/readings' },
    { name: 'Compatibility', path: '/compatibility' },
    { name: 'About', path: '/about' },
    { name: 'Premium', path: '/subscription' }
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

  const externalPalmFace = { name: 'Palm & Face', url: 'https://facepalmai.com/' };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-indigo-950 bg-opacity-90 backdrop-blur-sm shadow-lg'
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
            <Link to="/" className={`text-lg transition-all duration-300 ${location.pathname==='/'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>Home</Link>
            {/* BaZi */}
            <Link to="/readings" className={`text-lg transition-all duration-300 ${location.pathname==='/readings'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>BaZi</Link>
            {/* Zi Wei */}
            <Link to="/zi-wei" className={`text-lg transition-all duration-300 ${location.pathname==='/zi-wei'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>Zi Wei</Link>
            {/* Compatibility */}
            <Link to="/compatibility" className={`text-lg transition-all duration-300 ${location.pathname==='/compatibility'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>Compatibility</Link>
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
                Zodiac Signs
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isZodiacOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isZodiacOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-indigo-950 bg-opacity-95 backdrop-blur-sm rounded-xl border border-indigo-800 shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {zodiacSigns.map((sign) => (
                      <Link
                        key={sign.path}
                        to={sign.path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          location.pathname === sign.path
                            ? 'bg-amber-500 bg-opacity-20 text-amber-400'
                            : 'hover:bg-indigo-800 hover:bg-opacity-50 text-slate-200 hover:text-amber-400'
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
            <Link to="/about" className={`text-lg transition-all duration-300 ${location.pathname==='/about'?'text-amber-400 font-medium':'text-slate-200 hover:text-amber-400'}`}>About</Link>
            {/* Premium button */}
            <Link to="/subscription" className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">Premium</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white md:hidden focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
        className="md:hidden overflow-hidden bg-indigo-950 bg-opacity-95 backdrop-blur-sm"
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
                Zodiac Signs
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
                            : 'hover:bg-indigo-800 hover:bg-opacity-50 text-slate-300'
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
            <Link to="/readings" onClick={closeMenu} className={`text-lg py-2 transition-all duration-300 ${location.pathname==='/readings'?'text-amber-400 font-medium':'text-slate-200'}`}>BaZi</Link>
            <Link to="/zi-wei" onClick={closeMenu} className={`text-lg py-2 transition-all duration-300 ${location.pathname==='/zi-wei'?'text-amber-400 font-medium':'text-slate-200'}`}>Zi Wei</Link>
            <Link to="/compatibility" onClick={closeMenu} className={`text-lg py-2 transition-all duration-300 ${location.pathname==='/compatibility'?'text-amber-400 font-medium':'text-slate-200'}`}>Compatibility</Link>
            <a href={externalPalmFace.url} target="_blank" rel="noopener noreferrer" className="text-lg py-2 text-slate-200 transition-all duration-300 hover:text-amber-400" onClick={closeMenu}>{externalPalmFace.name}</a>

            {/* About link in mobile */}
            <Link
              to="/about"
              onClick={closeMenu}
              className={`text-lg py-2 transition-all duration-300 ${
                location.pathname === '/about' ? 'text-amber-400 font-medium' : 'text-slate-200'
              }`}
            >
              About
            </Link>
            <Link
              to="/subscription"
              onClick={closeMenu}
              className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-4 py-2 rounded-full text-center font-medium transition-all duration-300"
            >
              Premium
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;