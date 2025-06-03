import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-indigo-950 border-t border-indigo-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif text-amber-400 mb-4">Celestial Insights</h3>
            <p className="text-slate-400 mb-4">
              Discover the ancient wisdom of Chinese astrology and transform your life with personalized guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Get Reading
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-400 transition-colors">
                  About Chinese Astrology
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Premium Readings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Readings</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/readings" className="text-slate-400 hover:text-amber-400 transition-colors">
                  BaZi (Four Pillars)
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Zi Wei Dou Shu
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Chinese Zodiac
                </Link>
              </li>
              <li>
                <Link to="/readings" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Five Elements
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-900 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Celestial Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;