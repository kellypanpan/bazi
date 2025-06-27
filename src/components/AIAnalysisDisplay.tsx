import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stars, Sun, Moon, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { analyzeBaziWithAI, BaziData, AIAnalysisResponse, AnalysisResult } from '../services/aiService';

interface AIAnalysisDisplayProps {
  baziData: BaziData;
}

type ViewMode = 'comparison' | 'bazi' | 'ziwei';

const AIAnalysisDisplay: React.FC<AIAnalysisDisplayProps> = ({ baziData }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('comparison');
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true);
      setError(null);
      setLoadingStep(0);
      setProgress(0);
      
      const steps = [
        { message: "Initializing dual-method analysis system...", duration: 800 },
        { message: "Processing BaZi Four Pillars calculations...", duration: 1000 },
        { message: "Analyzing Zi Wei Dou Shu star positions...", duration: 1200 },
        { message: "Cross-referencing both systems for accuracy...", duration: 800 },
        { message: "Generating comprehensive comparison report...", duration: 600 }
      ];

      let currentStep = 0;
      let currentProgress = 0;

      const processStep = async () => {
        if (currentStep < steps.length) {
          setLoadingStep(currentStep);
          
          const stepProgress = 100 / steps.length;
          const endProgress = (currentStep + 1) * stepProgress;
          
          const progressAnimation = setInterval(() => {
            currentProgress += 2;
            const stepProgressValue = Math.min(currentProgress, endProgress);
            setProgress(stepProgressValue);
            
            if (currentProgress >= endProgress) {
              clearInterval(progressAnimation);
              currentStep++;
              setTimeout(processStep, 100);
            }
          }, steps[currentStep].duration / 50);
        } else {
          try {
            console.log('Starting AI analysis with data:', baziData);
            const result = await analyzeBaziWithAI(baziData);
            console.log('AI analysis completed:', result);
            setAnalysis(result);
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
          } catch (err: unknown) {
            console.error('AI analysis failed:', err);
            setError((err as Error).message || 'AI analysis failed, please try again');
            setLoading(false);
          }
        }
      };

      processStep();
    };

    performAnalysis();
  }, [baziData]);

  const renderAnalysisSection = (title: string, content: string, gradient: string) => {
    if (!content || content.trim() === '') return null;
    
    return (
      <motion.div
        className={`p-6 rounded-xl ${gradient} text-white shadow-lg`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-lg font-bold mb-3 flex items-center">
          <Stars className="w-5 h-5 mr-2" />
          {title}
        </h4>
        <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">{content}</p>
      </motion.div>
    );
  };

  const renderAnalysisResults = (results: AnalysisResult, title: string, gradient: string, icon: React.ReactNode) => {
    const sections = [
      { title: 'Personality', content: results.personality },
      { title: 'Fortune', content: results.fortune },
      { title: 'Career', content: results.career },
      { title: 'Relationships', content: results.relationships },
      { title: 'Health', content: results.health },
      { title: 'Wealth', content: results.wealth },
      { title: 'Lucky Elements', content: results.luckyElements },
      { title: 'Summary', content: results.summary },
    ];

    const validSections = sections.filter(section => section.content && section.content.trim() !== '');

    if (validSections.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">{icon}</div>
          <p className="text-gray-500">No {title} analysis content available</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            {icon}
            <h3 className="text-2xl font-bold ml-3">{title}</h3>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {validSections.map((section, index) => (
            <div key={index}>
              {renderAnalysisSection(section.title, section.content, gradient)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    const steps = [
      { message: "Initializing dual-method analysis system...", description: "Preparing both BaZi and Zi Wei systems" },
      { message: "Processing BaZi Four Pillars calculations...", description: "Analyzing Year, Month, Day, and Hour pillars" },
      { message: "Analyzing Zi Wei Dou Shu star positions...", description: "Mapping Purple Star constellation influences" },
      { message: "Cross-referencing both systems for accuracy...", description: "Comparing results between methodologies" },
      { message: "Generating comprehensive comparison report...", description: "Creating detailed analysis document" }
    ];

    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center max-w-lg mx-auto">
          {/* Dual Circle Progress */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
              {/* Outer circle (BaZi) */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-yellow-800"
                opacity="0.3"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="text-yellow-500"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
              
              {/* Inner circle (Zi Wei) */}
              <circle
                cx="80"
                cy="80"
                r="50"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-purple-800"
                opacity="0.3"
              />
              <circle
                cx="80"
                cy="80"
                r="50"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="text-purple-500"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{Math.round(progress)}%</span>
              <span className="text-xs text-gray-400">Dual Analysis</span>
            </div>
            
            {/* Rotating symbols */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
              <div className="relative w-full h-full">
                {['☀️', '🌙', '⭐', '🔮', '☯️', '💫'].map((symbol, index) => (
                  <div
                    key={index}
                    className="absolute text-2xl"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-90px)`
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Step */}
          <motion.div
            key={loadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {steps[loadingStep]?.message}
            </h3>
            <p className="text-gray-400 text-sm">
              {steps[loadingStep]?.description}
            </p>
          </motion.div>

          {/* Method Labels */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-yellow-400 font-medium">BaZi Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-purple-400 font-medium">Zi Wei Dou Shu</span>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= loadingStep ? 'bg-blue-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Advanced Analysis Explanation */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-600">
            <p className="text-gray-300 text-sm leading-relaxed">
              🔬 <strong>Advanced Dual-Method Analysis</strong><br/>
              Our system combines two powerful ancient Chinese fortune-telling methods: 
              BaZi (Four Pillars) and Zi Wei Dou Shu (Purple Star Astrology). This comprehensive 
              approach provides deeper insights by cross-validating predictions from both systems, 
              ensuring greater accuracy and detailed life guidance.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          AI Fortune Analysis
        </motion.h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              viewMode === 'comparison'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Comparison
          </button>
          <button
            onClick={() => setViewMode('bazi')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              viewMode === 'bazi'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Sun className="w-5 h-5 inline mr-2" />
            BaZi
          </button>
          <button
            onClick={() => setViewMode('ziwei')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              viewMode === 'ziwei'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Moon className="w-5 h-5 inline mr-2" />
            Zi Wei
          </button>
        </div>
      </div>

      <motion.div
        key={viewMode}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {viewMode === 'comparison' && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              {renderAnalysisResults(
                analysis.bazi,
                'BaZi Analysis',
                'bg-gradient-to-br from-yellow-500 to-orange-600',
                <Sun className="w-8 h-8 text-yellow-600" />
              )}
            </div>
            <div>
              {renderAnalysisResults(
                analysis.ziwei,
                'Zi Wei Dou Shu',
                'bg-gradient-to-br from-blue-500 to-purple-600',
                <Moon className="w-8 h-8 text-blue-600" />
              )}
            </div>
          </div>
        )}

        {viewMode === 'bazi' && (
          <div>
            {renderAnalysisResults(
              analysis.bazi,
              'BaZi Four Pillars Analysis',
              'bg-gradient-to-br from-yellow-500 to-orange-600',
              <Sun className="w-8 h-8 text-yellow-600" />
            )}
          </div>
        )}

        {viewMode === 'ziwei' && (
          <div>
            {renderAnalysisResults(
              analysis.ziwei,
              'Zi Wei Dou Shu Analysis',
              'bg-gradient-to-br from-blue-500 to-purple-600',
              <Moon className="w-8 h-8 text-blue-600" />
            )}
          </div>
        )}

        {viewMode === 'comparison' && analysis.comparison && analysis.comparison.trim() !== '' && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Comparative Analysis
              </h3>
              <div className="text-white/90 leading-relaxed whitespace-pre-line">
                {analysis.comparison}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Debug Information */}
      <motion.div
        className="mt-12 p-6 bg-gray-100 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-bold mb-4">Debug Information</h3>
        <details className="mb-4">
          <summary className="cursor-pointer font-medium">Input Data</summary>
          <pre className="mt-2 p-4 bg-white rounded text-xs overflow-auto">
            {JSON.stringify(baziData, null, 2)}
          </pre>
        </details>
        <details className="mb-4">
          <summary className="cursor-pointer font-medium">Analysis Results</summary>
          <pre className="mt-2 p-4 bg-white rounded text-xs overflow-auto">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </details>
      </motion.div>
    </motion.div>
  );
};

export default AIAnalysisDisplay; 