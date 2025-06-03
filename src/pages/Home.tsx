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
      description: 'Discover your destiny code based on your birth time revealing your personal traits and life path.',
      icon: <Sun className="h-6 w-6 text-amber-500" />
    },
    {
      title: 'Zi Wei Dou Shu',
      description: 'The "Purple Star Astrology" maps celestial influences on different aspects of your life.',
      icon: <Star className="h-6 w-6 text-purple-500" />
    },
    {
      title: 'Personalized Guidance',
      description: 'Receive actionable insights to harmonize your life with cosmic energies.',
      icon: <Moon className="h-6 w-6 text-blue-400" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <Link to="/readings" className="text-amber-400 inline-flex items-center group">
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