import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Loader, AlertCircle, Settings, Key } from 'lucide-react';
import aiService, { BaziData, AIAnalysisResult } from '../services/aiService';

interface AIAnalysisDisplayProps {
  baziData: BaziData;
}

const AIAnalysisDisplay: React.FC<AIAnalysisDisplayProps> = ({ baziData }) => {
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // 检查是否已设置API Key
  const hasApiKey = aiService.hasApiKey();

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await aiService.analyzeBazi(baziData);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      aiService.setApiKey(apiKey.trim());
      setShowApiKeyInput(false);
      setApiKey('');
    }
  };

  // 自动设置提供的API Key
  React.useEffect(() => {
    const providedApiKey = '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';
    aiService.setApiKey(providedApiKey);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI智能分析</h2>
          <p className="text-gray-600">基于DeepSeek R1模型的专业八字分析</p>
        </div>
      </div>

      {/* API Key设置区域 */}
      {!hasApiKey && !showApiKeyInput && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">需要配置API Key</span>
          </div>
          <p className="text-yellow-700 text-sm mb-3">
            需要OpenRouter API Key来使用AI分析功能
          </p>
          <button
            onClick={() => setShowApiKeyInput(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Key className="w-4 h-4" />
            设置API Key
          </button>
        </div>
      )}

      {showApiKeyInput && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenRouter API Key
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSetApiKey}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              设置
            </button>
          </div>
        </div>
      )}

      {/* 分析按钮 */}
      {hasApiKey && !analysisResult && (
        <div className="text-center mb-6">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                AI分析中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                开始AI分析
              </>
            )}
          </button>
        </div>
      )}

      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">分析失败</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* 分析结果 */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 性格分析 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🧠 性格特征分析</h3>
            <p className="text-blue-700 leading-relaxed">{analysisResult.personalityAnalysis}</p>
          </div>

          {/* 运势分析 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">🌟 运势分析</h3>
            <p className="text-green-700 leading-relaxed">{analysisResult.fortuneAnalysis}</p>
          </div>

          {/* 事业建议 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">💼 事业发展</h3>
            <p className="text-orange-700 leading-relaxed">{analysisResult.careerAdvice}</p>
          </div>

          {/* 感情建议 */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-pink-800 mb-3">💖 感情关系</h3>
            <p className="text-pink-700 leading-relaxed">{analysisResult.relationshipAdvice}</p>
          </div>

          {/* 健康建议 */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-teal-800 mb-3">🏥 健康养生</h3>
            <p className="text-teal-700 leading-relaxed">{analysisResult.healthAdvice}</p>
          </div>

          {/* 财运建议 */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">💰 财运建议</h3>
            <p className="text-yellow-700 leading-relaxed">{analysisResult.wealthAdvice}</p>
          </div>

          {/* 开运元素 */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">🔮 开运元素</h3>
            <p className="text-purple-700 leading-relaxed">{analysisResult.luckyElements}</p>
          </div>

          {/* 综合总结 */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 综合总结</h3>
            <p className="text-gray-700 leading-relaxed">{analysisResult.summary}</p>
          </div>

          {/* AI模型信息 */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
            <p>分析由 DeepSeek R1 (deepseek/deepseek-r1-0528-qwen3-8b:free) 提供</p>
            <p>数据来源：OpenRouter AI Platform</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAnalysisDisplay; 