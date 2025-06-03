import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BirthDateForm from './BirthDateForm';
import { FormData } from './BirthDateForm';
import BasicResultsDisplay from './BasicResultsDisplay';

const HeroSection: React.FC = () => {
  const [showResults, setShowResults] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-16 px-4 relative">
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-tight">
            Discover Your Celestial <span className="text-amber-400">Destiny</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Unlock the ancient wisdom of Chinese astrology with personalized BaZi and Zi Wei Dou Shu readings to guide your path.
          </p>
        </motion.div>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <BirthDateForm onSubmit={handleFormSubmit} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BasicResultsDisplay formData={formData!} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;