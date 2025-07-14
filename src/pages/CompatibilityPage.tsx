import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Briefcase, Star, Share2, Download, ArrowRight } from 'lucide-react';
import { ZodiacService, CompatibilityResult } from '../services/zodiacService';

const CompatibilityPage: React.FC = () => {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const zodiacSigns = ZodiacService.getAllZodiacSigns();

  const handleCalculateCompatibility = async () => {
    if (!sign1 || !sign2) return;
    
    setLoading(true);
    try {
      const result = await ZodiacService.getCompatibility(sign1, sign2);
      setCompatibility(result);
    } catch (error) {
      console.error('Error calculating compatibility:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 65) return 'from-yellow-500 to-orange-500';
    if (score >= 50) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-700';
  };

  const getCompatibilityText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 65) return 'Great Compatibility';
    if (score >= 50) return 'Good Potential';
    return 'Challenging but Possible';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">💕</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Zodiac Compatibility
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover how well your zodiac signs align in love, friendship, and business relationships
          </p>
        </motion.div>

        {/* Compatibility Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Select Two Zodiac Signs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* First Sign */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  First Sign
                </label>
                <select
                  value={sign1}
                  onChange={(e) => setSign1(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Sign</option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.name} value={sign.name}>
                      {sign.symbol} {sign.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="p-3 bg-purple-800 bg-opacity-50 rounded-full">
                  <Heart className="h-6 w-6 text-pink-400" />
                </div>
              </div>

              {/* Second Sign */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Second Sign
                </label>
                <select
                  value={sign2}
                  onChange={(e) => setSign2(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Sign</option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.name} value={sign.name}>
                      {sign.symbol} {sign.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculateCompatibility}
              disabled={!sign1 || !sign2 || loading}
              className="w-full mt-8 px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Calculating Compatibility...
                </div>
              ) : (
                'Calculate Compatibility'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Compatibility Results */}
        {compatibility && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Overall Compatibility Score */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-4 bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
                <div className="text-4xl">
                  {zodiacSigns.find(s => s.name === compatibility.sign1)?.symbol}
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${getCompatibilityColor(compatibility.overallCompatibility)} bg-clip-text text-transparent`}>
                    {compatibility.overallCompatibility}%
                  </div>
                  <div className="text-white font-medium">
                    {getCompatibilityText(compatibility.overallCompatibility)}
                  </div>
                </div>
                <div className="text-4xl">
                  {zodiacSigns.find(s => s.name === compatibility.sign2)?.symbol}
                </div>
              </div>
            </div>

            {/* Detailed Compatibility Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <CompatibilityCard
                icon={Heart}
                title="Love & Romance"
                score={compatibility.loveCompatibility}
                color="text-pink-400"
              />
              <CompatibilityCard
                icon={Users}
                title="Friendship"
                score={compatibility.friendshipCompatibility}
                color="text-blue-400"
              />
              <CompatibilityCard
                icon={Briefcase}
                title="Business"
                score={compatibility.businessCompatibility}
                color="text-green-400"
              />
            </div>

            {/* Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-400" />
                  Compatibility Analysis
                </h3>
                <p className="text-slate-300 leading-relaxed">{compatibility.analysis}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-green-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-green-800 p-6">
                  <h4 className="text-lg font-semibold text-green-300 mb-4">Strengths</h4>
                  <ul className="space-y-2">
                    {compatibility.strengths.map((strength, index) => (
                      <li key={index} className="text-slate-300 flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-amber-800 p-6">
                  <h4 className="text-lg font-semibold text-amber-300 mb-4">Challenges</h4>
                  <ul className="space-y-2">
                    {compatibility.challenges.map((challenge, index) => (
                      <li key={index} className="text-slate-300 flex items-start gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Advice */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-purple-800 p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Relationship Advice
              </h3>
              <p className="text-slate-300 text-center leading-relaxed text-lg">
                {compatibility.advice}
              </p>
            </div>

            {/* Share Section */}
            <div className="text-center">
              <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  <Share2 className="h-5 w-5" />
                  Share Compatibility
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                  <Download className="h-5 w-5" />
                  Download Result
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Popular Compatibility Matches */}
        {!compatibility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Popular Compatibility Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { sign1: 'Leo', sign2: 'Aries', compatibility: 92 },
                { sign1: 'Cancer', sign2: 'Pisces', compatibility: 89 },
                { sign1: 'Libra', sign2: 'Gemini', compatibility: 87 },
                { sign1: 'Taurus', sign2: 'Virgo', compatibility: 85 },
                { sign1: 'Scorpio', sign2: 'Cancer', compatibility: 88 },
                { sign1: 'Sagittarius', sign2: 'Aquarius', compatibility: 84 }
              ].map((match, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-xl border border-indigo-800 p-4 hover:border-purple-600 transition-all cursor-pointer"
                  onClick={() => {
                    setSign1(match.sign1);
                    setSign2(match.sign2);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {zodiacSigns.find(s => s.name === match.sign1)?.symbol}
                      </span>
                      <Heart className="h-4 w-4 text-pink-400" />
                      <span className="text-2xl">
                        {zodiacSigns.find(s => s.name === match.sign2)?.symbol}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-sm text-white font-medium">
                    {match.sign1} & {match.sign2}
                  </div>
                  <div className={`text-sm font-bold ${match.compatibility >= 85 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {match.compatibility}% Compatible
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const CompatibilityCard: React.FC<{
  icon: React.ElementType;
  title: string;
  score: number;
  color: string;
}> = ({ icon: Icon, title, score, color }) => {
  const getScoreStars = (score: number) => {
    const stars = Math.round(score / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-indigo-800 rounded-full">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="text-2xl font-bold text-white mb-2">{score}%</div>
      <div className="text-yellow-400 text-lg">{getScoreStars(score)}</div>
    </div>
  );
};

export default CompatibilityPage;