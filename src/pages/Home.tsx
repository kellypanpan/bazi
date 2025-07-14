import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Moon, Sun, Sparkles, Flame, Droplets, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import TestimonialCard from '../components/TestimonialCard';

const Home: React.FC = () => {
  const elements = [
    { name: 'Wood', icon: <Droplets className="h-8 w-8" />, color: 'bg-green-600', textColor: 'text-green-600' },
    { name: 'Fire', icon: <Flame className="h-8 w-8" />, color: 'bg-red-600', textColor: 'text-red-600' },
    { name: 'Earth', icon: <Compass className="h-8 w-8" />, color: 'bg-amber-600', textColor: 'text-amber-600' },
    { name: 'Metal', icon: <Sparkles className="h-8 w-8" />, color: 'bg-gray-400', textColor: 'text-gray-400' },
    { name: 'Water', icon: <Droplets className="h-8 w-8" />, color: 'bg-blue-600', textColor: 'text-blue-600' }
  ];

  const features = [
    {
      title: 'BaZi (Four Pillars)',
      description: 'Discover your destiny code based on your birth time revealing your personal traits and life path with detailed career, wealth, and relationship insights.',
      icon: <Sun className="h-6 w-6 text-amber-500" />,
      link: '/readings'
    },
    {
      title: 'Zi Wei Dou Shu',
      description: 'Generate your complete Chinese astrology chart with 12 life palaces, star positions, and detailed destiny analysis.',
      icon: <Compass className="h-6 w-6 text-purple-500" />,
      link: '/zi-wei'
    },
    {
      title: 'Daily Horoscopes',
      description: 'Get personalized daily, weekly, and monthly zodiac predictions with love, career, and health insights.',
      icon: <Star className="h-6 w-6 text-indigo-500" />,
      link: '/leo'
    },
    {
      title: 'Compatibility Analysis',
      description: 'Discover relationship compatibility between zodiac signs with detailed analysis and shareable results.',
      icon: <Moon className="h-6 w-6 text-blue-400" />,
      link: '/compatibility'
    }
  ];

  const testimonials = [
    {
      name: 'Emily Chen',
      role: 'Entrepreneur',
      content: 'The BaZi reading was incredibly accurate about my career path. It helped me make an important business decision that paid off tremendously.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Wong',
      role: 'Software Engineer',
      content: 'I was skeptical at first, but the insights about my relationships were spot on. The guidance helped me improve communication with my partner.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Sarah Johnson',
      role: 'Teacher',
      content: 'The premium reading was worth every penny. It provided depth and specificity that gave me clarity during a challenging time in my life.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="w-full">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Discover Ancient Wisdom for Modern Life
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our readings combine thousands of years of Chinese astrological knowledge with modern insights to guide your journey.
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
                className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl border border-indigo-800 hover:border-amber-500 transition-all duration-300"
              >
                <div className="bg-indigo-950 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 mb-6">{feature.description}</p>
                <Link to={feature.link} className="text-amber-400 inline-flex items-center group">
                  Learn more 
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Five Elements Section */}
      <section className="py-16 px-4 bg-indigo-950 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              The Five Elements
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Chinese astrology is built on the interplay of five fundamental elements that shape our characteristics and destiny.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {elements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 text-center"
              >
                <div className={`${element.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white`}>
                  {element.icon}
                </div>
                <h3 className={`text-xl font-medium ${element.textColor} mb-2`}>{element.name}</h3>
                <p className="text-slate-300 text-sm">
                  {element.name === 'Wood' && 'Growth, vitality, and new beginnings'}
                  {element.name === 'Fire' && 'Passion, energy, and transformation'}
                  {element.name === 'Earth' && 'Stability, nourishment, and balance'}
                  {element.name === 'Metal' && 'Clarity, precision, and structure'}
                  {element.name === 'Water' && 'Wisdom, adaptability, and flow'}
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
              Explore Your Zodiac Sign
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Get instant access to your daily horoscope, compatibility insights, and personalized predictions.
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
              { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
              { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
              { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
              { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
              { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
              { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
              { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
              { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
              { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
              { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
              { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
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
                  className="block bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-xl border border-indigo-800 p-4 text-center hover:border-amber-500 hover:bg-opacity-50 transition-all duration-300"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Check Compatibility
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
              Transforming Lives Through Ancient Wisdom
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              See how our readings have provided clarity and guidance to people just like you.
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