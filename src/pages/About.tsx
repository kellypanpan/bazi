import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';

const About: React.FC = () => {
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
            About Chinese Astrology
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discover the ancient wisdom traditions that have guided countless lives for millennia.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-serif text-amber-400 mb-6">
              The Ancient Art of Chinese Astrology
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p>
                Chinese astrology is one of the oldest astrological systems in the world, dating back thousands of years. 
                Unlike Western astrology which focuses primarily on the positions of celestial bodies, Chinese astrology 
                incorporates a complex system of cosmological concepts including Yin and Yang, the Five Elements, the Chinese Zodiac, 
                and the interaction of celestial influences with earthly dynamics.
              </p>
              
              <p>
                This ancient practice evolved from the observation of celestial cycles and their correlation with natural phenomena 
                and human affairs. Over centuries, Chinese scholars refined these observations into sophisticated systems that could 
                provide insights into personality traits, relationships, career prospects, and life events.
              </p>
              
              <p>
                Today, these traditional systems continue to offer valuable guidance to those seeking to understand themselves 
                and navigate life's challenges with greater awareness and harmony.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl opacity-20 blur-3xl"></div>
            <img 
              src="https://images.pexels.com/photos/5731874/pexels-photo-5731874.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Ancient Chinese Astrology Chart" 
              className="w-full h-auto rounded-2xl border-4 border-indigo-800 shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white text-center mb-12">
            Key Systems in Chinese Astrology
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6"
            >
              <div className="flex items-start mb-4">
                <div className="bg-amber-500 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">BaZi (Four Pillars of Destiny)</h3>
                  <p className="text-slate-300">
                    Also known as "Four Pillars of Destiny," BaZi charts map your cosmic blueprint based on your birth time, 
                    with each pillar representing the year, month, day, and hour of birth. Each pillar contains elements that 
                    interact to reveal insights about your personality, strengths, challenges, and life path.
                  </p>
                </div>
              </div>
              
              <div className="pl-16">
                <h4 className="text-lg text-amber-400 mb-2">Key Features:</h4>
                <ul className="text-slate-300 space-y-2 list-disc pl-5">
                  <li>Analyzes the balance of Five Elements (Wood, Fire, Earth, Metal, Water)</li>
                  <li>Reveals hidden talents and natural aptitudes</li>
                  <li>Identifies favorable periods and potential challenges</li>
                  <li>Provides insights into relationship dynamics</li>
                  <li>Offers guidance for personal and professional decisions</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6"
            >
              <div className="flex items-start mb-4">
                <div className="bg-purple-600 p-3 rounded-full mr-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Zi Wei Dou Shu (Purple Star Astrology)</h3>
                  <p className="text-slate-300">
                    Considered the most comprehensive and accurate form of Chinese astrology, Zi Wei Dou Shu creates a detailed 
                    chart of 12 houses (or palaces), each representing different life aspects. Various stars are placed in these 
                    houses based on your birth data, creating a cosmic map of your life.
                  </p>
                </div>
              </div>
              
              <div className="pl-16">
                <h4 className="text-lg text-amber-400 mb-2">Key Features:</h4>
                <ul className="text-slate-300 space-y-2 list-disc pl-5">
                  <li>Provides detailed analysis of 12 life aspects (career, wealth, relationships, etc.)</li>
                  <li>Maps the influence of over 100 stars on different areas of life</li>
                  <li>Offers timing information for significant life events</li>
                  <li>Reveals deeper insights about destiny and life purpose</li>
                  <li>Helps identify optimal timing for major decisions and actions</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white text-center mb-8">
            The Five Elements and Their Significance
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8"
          >
            <p className="text-slate-300 mb-8 text-center">
              The Five Elements (Wu Xing) are fundamental energies that interact in cycles of creation and control, 
              forming the foundation of Chinese astrology and traditional medicine.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl border-l-4 border-green-600">
                <h3 className="text-lg text-green-500 mb-2">Wood (木)</h3>
                <p className="text-slate-300 text-sm">
                  Represents growth, vitality, and creativity. Wood types are visionary, innovative, and compassionate.
                </p>
                <div className="mt-3 text-sm text-slate-400">
                  <div>Direction: East</div>
                  <div>Season: Spring</div>
                  <div>Traits: Idealistic, flexible</div>
                </div>
              </div>
              
              <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl border-l-4 border-red-600">
                <h3 className="text-lg text-red-500 mb-2">Fire (火)</h3>
                <p className="text-slate-300 text-sm">
                  Symbolizes transformation, passion, and expressiveness. Fire types are charismatic, dynamic, and enthusiastic.
                </p>
                <div className="mt-3 text-sm text-slate-400">
                  <div>Direction: South</div>
                  <div>Season: Summer</div>
                  <div>Traits: Expressive, intuitive</div>
                </div>
              </div>
              
              <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl border-l-4 border-amber-600">
                <h3 className="text-lg text-amber-500 mb-2">Earth (土)</h3>
                <p className="text-slate-300 text-sm">
                  Embodies stability, nourishment, and centeredness. Earth types are reliable, practical, and nurturing.
                </p>
                <div className="mt-3 text-sm text-slate-400">
                  <div>Direction: Center</div>
                  <div>Season: Late Summer</div>
                  <div>Traits: Stable, supportive</div>
                </div>
              </div>
              
              <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl border-l-4 border-gray-400">
                <h3 className="text-lg text-gray-300 mb-2">Metal (金)</h3>
                <p className="text-slate-300 text-sm">
                  Represents clarity, precision, and efficiency. Metal types are structured, disciplined, and detail-oriented.
                </p>
                <div className="mt-3 text-sm text-slate-400">
                  <div>Direction: West</div>
                  <div>Season: Autumn</div>
                  <div>Traits: Organized, precise</div>
                </div>
              </div>
              
              <div className="bg-indigo-950 bg-opacity-70 p-4 rounded-xl border-l-4 border-blue-600">
                <h3 className="text-lg text-blue-500 mb-2">Water (水)</h3>
                <p className="text-slate-300 text-sm">
                  Symbolizes wisdom, adaptability, and depth. Water types are reflective, perceptive, and resourceful.
                </p>
                <div className="mt-3 text-sm text-slate-400">
                  <div>Direction: North</div>
                  <div>Season: Winter</div>
                  <div>Traits: Intuitive, deep</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="text-center mb-8">
          <Link to="/readings" className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-8 py-3 rounded-full font-medium text-lg inline-block transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
            Discover Your Personal Reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;