import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BirthDateForm from '../components/BirthDateForm';
import BasicResultsDisplay from '../components/BasicResultsDisplay';
import PremiumFeatures from '../components/PremiumFeatures';
import ChatInterface from '../components/ChatInterface';

type BirthData = {
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthTime: string;
  location: string;
};

const Readings: React.FC = () => {
  const [formData, setFormData] = useState<BirthData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: BirthData) => {
    setFormData(data);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Discover Your Celestial Blueprint
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Enter your birth information below to receive insights based on ancient astrology systems.
          </p>
        </motion.div>
        
        {!showResults ? (
          <BirthDateForm onSubmit={handleFormSubmit} />
        ) : (
          <div className="space-y-8">
            <BasicResultsDisplay formData={formData!} />
            <div className="mt-8">
              <h2 className="text-2xl font-serif text-white mb-6 text-center">
                Ask Questions About Your Reading
              </h2>
              <ChatInterface 
                initialContext={`You are a knowledgeable astrology expert. The user has provided their birth information for a fortune reading. Please help them understand their chart and answer any questions they may have about their destiny, personality traits, and life path based on their birth data.`}
              />
            </div>
            <PremiumFeatures />
          </div>
        )}
        
        {!showResults && (
          <div className="mt-16">
            <div className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
              <h2 className="text-2xl font-serif text-white mb-6 text-center">
                Our Reading Systems
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-950 bg-opacity-70 p-6 rounded-xl">
                  <h3 className="text-xl text-amber-400 mb-4">BaZi (Four Pillars)</h3>
                  <p className="text-slate-300 mb-4">
                    BaZi, also known as Four Pillars of Destiny, is derived from your birth date and time. 
                    It analyzes the interaction between the five elements (Wood, Fire, Earth, Metal, Water) 
                    and reveals insights about your personality, strengths, weaknesses, and life path.
                  </p>
                  <ul className="text-slate-300 space-y-2 list-disc pl-5">
                    <li>Reveals your innate character traits</li>
                    <li>Identifies favorable career paths</li>
                    <li>Highlights relationship compatibility</li>
                    <li>Shows auspicious timing for important decisions</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-950 bg-opacity-70 p-6 rounded-xl">
                  <h3 className="text-xl text-amber-400 mb-4">Zi Wei Dou Shu (Purple Star Astrology)</h3>
                  <p className="text-slate-300 mb-4">
                    Zi Wei Dou Shu is considered one of the most accurate and comprehensive astrology systems.
                    It creates a detailed chart of 12 palaces representing different life aspects, with various stars 
                    influencing each palace.
                  </p>
                  <ul className="text-slate-300 space-y-2 list-disc pl-5">
                    <li>Detailed analysis of 12 life aspects</li>
                    <li>Insights about family relationships</li>
                    <li>Wealth and career predictions</li>
                    <li>Health indications and potential challenges</li>
                    <li>Timing of significant life events</li>
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