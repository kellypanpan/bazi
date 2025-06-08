import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Loader, AlertCircle, Key, Star, BookOpen, Scale, Sun, Moon } from 'lucide-react';
import aiService, { BaziData, AIAnalysisResult, AnalysisMethod } from '../services/aiService';

interface AIAnalysisDisplayProps {
  baziData: BaziData;
}

// 单个分析方法的显示组件
const MethodAnalysisDisplay: React.FC<{
  method: AnalysisMethod;
  title: string;
  icon: React.ReactNode;
  colorScheme: string;
}> = ({ method, title, icon, colorScheme }) => {
  // 检查是否有有效内容
  const hasContent = (content: string) => content && content.trim().length > 0;
  
  return (
    <div className={`bg-gradient-to-br ${colorScheme} rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {/* 性格分析 */}
        {hasContent(method.personalityAnalysis) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              🧠 性格特征分析
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.personalityAnalysis}</p>
          </div>
        )}

        {/* 运势分析 */}
        {hasContent(method.fortuneAnalysis) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              🌟 运势分析
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.fortuneAnalysis}</p>
          </div>
        )}

        {/* 事业发展 */}
        {hasContent(method.careerAdvice) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              💼 事业发展
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.careerAdvice}</p>
          </div>
        )}

        {/* 感情关系 */}
        {hasContent(method.relationshipAdvice) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              💖 感情关系
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.relationshipAdvice}</p>
          </div>
        )}

        {/* 健康养生 */}
        {hasContent(method.healthAdvice) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              🏥 健康养生
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.healthAdvice}</p>
          </div>
        )}

        {/* 财运建议 */}
        {hasContent(method.wealthAdvice) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              💰 财运建议
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.wealthAdvice}</p>
          </div>
        )}

        {/* 开运元素 */}
        {hasContent(method.luckyElements) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              🔮 开运元素
            </h4>
            <p className="text-white text-opacity-90 leading-relaxed">{method.luckyElements}</p>
          </div>
        )}

        {/* 方法总结 */}
        {hasContent(method.summary) && (
          <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border-2 border-white border-opacity-30">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              📋 方法总结
            </h4>
            <p className="text-white text-opacity-95 leading-relaxed font-medium">{method.summary}</p>
          </div>
        )}

        {/* 如果没有任何内容，显示提示 */}
        {!Object.values(method).some(hasContent) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-white text-opacity-70">AI正在分析中，请稍后查看完整结果...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AIAnalysisDisplay: React.FC<AIAnalysisDisplayProps> = ({ baziData }) => {
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'both' | 'bazi' | 'ziwei'>('both');

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
    <div className="mb-8">
      {/* 主标题 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-10 h-10 text-white" />
          <div>
            <h2 className="text-3xl font-bold text-white">AI智能分析</h2>
            <p className="text-purple-100">基于DeepSeek R1模型的双重命理分析</p>
          </div>
        </div>
        
        {/* 分析方法说明 */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-6 h-6 text-yellow-300" />
              <h3 className="text-lg font-semibold text-white">八字命理</h3>
            </div>
            <p className="text-purple-100 text-sm">基于出生年月日时的天干地支组合，分析五行平衡与命运轨迹</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-6 h-6 text-blue-300" />
              <h3 className="text-lg font-semibold text-white">紫微斗数</h3>
            </div>
            <p className="text-purple-100 text-sm">以紫微星为主的星曜排盘，分析命宫星座与人生格局</p>
          </div>
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
            className="flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                AI分析中...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                开始双重分析
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
          {/* 切换标签 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">选择查看方式</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'both'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  对比查看
                </div>
              </button>
              <button
                onClick={() => setActiveTab('bazi')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'bazi'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  八字专析
                </div>
              </button>
              <button
                onClick={() => setActiveTab('ziwei')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'ziwei'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  紫微专析
                </div>
              </button>
            </div>
          </div>

          {/* 对比显示模式 */}
          {activeTab === 'both' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <MethodAnalysisDisplay
                method={analysisResult.bazi}
                title="八字命理分析"
                icon={<Sun className="w-8 h-8 text-yellow-300" />}
                colorScheme="from-yellow-600 to-orange-600"
              />
              <MethodAnalysisDisplay
                method={analysisResult.ziwei}
                title="紫微斗数分析"
                icon={<Star className="w-8 h-8 text-blue-300" />}
                colorScheme="from-blue-600 to-purple-600"
              />
            </div>
          )}

          {/* 八字专析模式 */}
          {activeTab === 'bazi' && (
            <MethodAnalysisDisplay
              method={analysisResult.bazi}
              title="八字命理专项分析"
              icon={<Sun className="w-8 h-8 text-yellow-300" />}
              colorScheme="from-yellow-600 to-orange-600"
            />
          )}

          {/* 紫微专析模式 */}
          {activeTab === 'ziwei' && (
            <MethodAnalysisDisplay
              method={analysisResult.ziwei}
              title="紫微斗数专项分析"
              icon={<Star className="w-8 h-8 text-blue-300" />}
              colorScheme="from-blue-600 to-purple-600"
            />
          )}

          {/* 对比总结 */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">两种方法对比总结</h3>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              {analysisResult.comparison && analysisResult.comparison.trim().length > 0 && 
               !analysisResult.comparison.includes('## 八字命理分析') ? (
                <p className="text-white text-opacity-90 leading-relaxed text-lg">
                  {analysisResult.comparison}
                </p>
              ) : (
                <div className="text-center">
                  <p className="text-white text-opacity-70 mb-2">
                    AI正在生成对比分析...
                  </p>
                  <p className="text-white text-opacity-50 text-sm">
                    请查看上方的八字和紫微斗数分析结果
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI模型信息 */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
            <p className="mb-1">分析由 DeepSeek R1 (deepseek/deepseek-r1-0528-qwen3-8b:free) 提供</p>
            <p className="mb-1">数据来源：OpenRouter AI Platform</p>
            <p className="text-xs">🔮 八字命理 & 紫微斗数双重智能分析</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAnalysisDisplay; 