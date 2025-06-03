import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { name: 'Readings', path: '/readings' },
    { name: 'About', path: '/about' },
    { name: 'Premium', path: '/subscription' }
  ];

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
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-amber-400 font-medium'
                    : 'text-slate-200 hover:text-amber-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/readings"
              className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              Get Reading
            </Link>
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
            {navLinks.map((link) => (
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
            <Link
              to="/readings"
              onClick={closeMenu}
              className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-4 py-2 rounded-full text-center font-medium transition-all duration-300"
            >
              Get Reading
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;