import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Stars, Sun, Moon, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
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

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Starting AI analysis with data:', baziData);
        const result = await analyzeBaziWithAI(baziData);
        console.log('AI analysis completed:', result);
        setAnalysis(result);
      } catch (err: unknown) {
        console.error('AI analysis failed:', err);
        setError((err as Error).message || 'AI analysis failed, please try again');
      } finally {
        setLoading(false);
      }
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
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">AI is analyzing your birth chart...</p>
        <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
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