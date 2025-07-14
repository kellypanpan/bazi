import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Calendar, 
  MapPin, 
  User, 
  Sparkles, 
  Download,
  Lock,
  Crown,
  CircleDot,
  Compass,
  Zap
} from 'lucide-react';

interface ZiWeiBirthData {
  name?: string;
  gender: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number;
  birthplace: string;
}

interface ZiWeiChart {
  palaces: ZiWeiPalace[];
  mainStars: ZiWeiStar[];
  transformations: Transformation[];
  lifeStars: {
    mingzhu: string; // 命主
    shenzhu: string; // 身主
  };
}

interface ZiWeiPalace {
  id: string;
  name: string;
  chineseName: string;
  position: number; // 1-12
  stars: ZiWeiStar[];
  description: string;
  aiAnalysis: string;
  isUnlocked: boolean;
}

interface ZiWeiStar {
  name: string;
  chineseName: string;
  type: 'major' | 'minor' | 'transformation';
  brightness: 'bright' | 'average' | 'dim';
  description: string;
}

interface Transformation {
  type: 'lu' | 'quan' | 'ke' | 'ji'; // 化禄、化权、化科、化忌
  star: string;
  palace: string;
  effect: string;
}

const ZiWeiPage: React.FC = () => {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [birthData, setBirthData] = useState<ZiWeiBirthData>({
    gender: 'male',
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    birthplace: ''
  });
  const [chart, setChart] = useState<ZiWeiChart | null>(null);
  const [loading, setLoading] = useState(false);

  const palaceNames = [
    { id: 'ming', name: 'Life Palace', chinese: '命宫', position: 1 },
    { id: 'xiong', name: 'Sibling Palace', chinese: '兄弟宫', position: 2 },
    { id: 'fuqi', name: 'Spouse Palace', chinese: '夫妻宫', position: 3 },
    { id: 'zinv', name: 'Children Palace', chinese: '子女宫', position: 4 },
    { id: 'caibo', name: 'Wealth Palace', chinese: '财帛宫', position: 5 },
    { id: 'jibing', name: 'Health Palace', chinese: '疾厄宫', position: 6 },
    { id: 'qianyi', name: 'Travel Palace', chinese: '迁移宫', position: 7 },
    { id: 'nuli', name: 'Servant Palace', chinese: '奴仆宫', position: 8 },
    { id: 'guanlu', name: 'Career Palace', chinese: '官禄宫', position: 9 },
    { id: 'tianzhai', name: 'Property Palace', chinese: '田宅宫', position: 10 },
    { id: 'fude', name: 'Fortune Palace', chinese: '福德宫', position: 11 },
    { id: 'fumu', name: 'Parent Palace', chinese: '父母宫', position: 12 }
  ];


  const handleInputChange = (field: keyof ZiWeiBirthData, value: string | number) => {
    setBirthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateChart = async () => {
    setLoading(true);
    
    // Simulate chart generation with AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enhanced star data with brightness and traditional attributes
    const allStars = [
      { name: 'Purple Star', chinese: '紫微', type: 'major', brightness: 'bright', element: '土', nature: '帝星' },
      { name: 'Heavenly Machine', chinese: '天机', type: 'major', brightness: 'average', element: '乙木', nature: '善变' },
      { name: 'Sun', chinese: '太阳', type: 'major', brightness: 'bright', element: '丙火', nature: '贵星' },
      { name: 'Martial Arts', chinese: '武曲', type: 'major', brightness: 'bright', element: '阴金', nature: '财星' },
      { name: 'Heavenly Harmony', chinese: '天同', type: 'major', brightness: 'average', element: '壬水', nature: '福星' },
      { name: 'Honest & Pure', chinese: '廉贞', type: 'major', brightness: 'average', element: '丁火', nature: '次桃花' },
      { name: 'Heavenly Mansion', chinese: '天府', type: 'major', brightness: 'bright', element: '己土', nature: '令星' },
      { name: 'Moon', chinese: '太阴', type: 'major', brightness: 'bright', element: '丁火', nature: '财星' },
      { name: 'Greedy Wolf', chinese: '贪狼', type: 'major', brightness: 'average', element: '甲木', nature: '桃花' },
      { name: 'Giant Gate', chinese: '巨门', type: 'major', brightness: 'dim', element: '癸水', nature: '暗星' },
      { name: 'Celestial Secretary', chinese: '天相', type: 'major', brightness: 'bright', element: '壬水', nature: '印星' },
      { name: 'Heavenly Beam', chinese: '天梁', type: 'major', brightness: 'bright', element: '戚土', nature: '老人星' },
      { name: 'Seven Killings', chinese: '七杀', type: 'major', brightness: 'average', element: '庚金', nature: '将星' },
      { name: 'Army Breaker', chinese: '破军', type: 'major', brightness: 'dim', element: '癸水', nature: '耗星' },
      // Add minor stars
      { name: 'Left Assistant', chinese: '左辅', type: 'minor', brightness: 'bright', element: '戚土', nature: '贵人' },
      { name: 'Right Assistant', chinese: '右弼', type: 'minor', brightness: 'bright', element: '己土', nature: '贵人' },
      { name: 'Literary Star', chinese: '文曲', type: 'minor', brightness: 'bright', element: '癸水', nature: '科甲' },
      { name: 'Martial Star', chinese: '文昌', type: 'minor', brightness: 'bright', element: '辛金', nature: '科甲' },
      { name: 'Lucky Star', chinese: '天魁', type: 'minor', brightness: 'average', element: '丙火', nature: '贵人' },
      { name: 'Virtue Star', chinese: '天钺', type: 'minor', brightness: 'average', element: '己土', nature: '贵人' }
    ];

    const mockChart: ZiWeiChart = {
      palaces: palaceNames.map((palace, index) => {
        // Professional star distribution with realistic patterns
        const assignedStars = [];
        
        // Life Palace (命宮) - Purple Star system
        if (index === 0) {
          assignedStars.push(allStars[0]); // 紫微
          assignedStars.push(allStars[14]); // 左辅
        }
        // Wealth Palace (财帛宮) - Wealth stars
        else if (index === 4) {
          assignedStars.push(allStars[3]); // 武曲
          assignedStars.push(allStars[17]); // 文昌
        }
        // Career Palace (官禄宮) - Authority stars
        else if (index === 8) {
          assignedStars.push(allStars[2]); // 太阳
          assignedStars.push(allStars[18]); // 天魁
        }
        // Spouse Palace (夫妻宮) - Relationship stars
        else if (index === 2) {
          assignedStars.push(allStars[7]); // 太阴
          assignedStars.push(allStars[8]); // 贪狼
        }
        // Random distribution for other palaces (1-2 stars)
        else {
          const numStars = Math.floor(Math.random() * 2) + 1;
          const availableStars = allStars.slice(1); // Exclude Purple Star
          
          for (let i = 0; i < numStars && i < 2; i++) {
            const randomStar = availableStars[Math.floor(Math.random() * availableStars.length)];
            if (!assignedStars.some(s => s.chinese === randomStar.chinese)) {
              assignedStars.push(randomStar);
            }
          }
        }

        return {
          id: palace.id,
          name: palace.name,
          chineseName: palace.chinese,
          position: palace.position,
          stars: assignedStars,
          description: `${palace.chinese}主寰${palace.name.toLowerCase()}相关事宜，影响个人命运的重要领域。`,
          aiAnalysis: `根据您的生辰八字，您的${palace.chinese}${assignedStars.length > 0 ? '有' + assignedStars.map(s => s.chinese).join('、') + '入宮' : '无主星入宮'}，${index % 3 === 0 ? '呈现吉利之象，主吉祥如意' : index % 3 === 1 ? '中平之象，宜努力进取' : '有挑战之象，需谨慎应对'}。`,
          isUnlocked: index < 3 // Only first 3 palaces unlocked for free
        };
      }),
      mainStars: allStars.slice(0, 6),
      transformations: [
        { type: 'lu', star: '紫微', palace: '命宫', effect: 'Enhances leadership and authority' },
        { type: 'quan', star: '武曲', palace: '财帛宫', effect: 'Strengthens financial capabilities' },
        { type: 'ke', star: '天机', palace: '兄弟宫', effect: 'Brings wisdom and knowledge' },
        { type: 'ji', star: '太阳', palace: '夫妻宫', effect: 'Challenges in relationships' }
      ],
      lifeStars: {
        mingzhu: '紫微', // Life Star
        shenzhu: '天机'  // Body Star
      }
    };
    
    setChart(mockChart);
    setStep('result');
    setLoading(false);
  };

  const resetForm = () => {
    setStep('input');
    setChart(null);
    setBirthData({
      gender: 'male',
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      birthplace: ''
    });
  };

  if (step === 'result' && chart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your Zi Wei Dou Shu Chart
            </h1>
            <p className="text-indigo-300 mb-6">
              Generated for {birthData.name || 'Anonymous'} • {birthData.year}/{birthData.month}/{birthData.day}
            </p>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Generate New Chart
            </button>
          </motion.div>

          {/* Life & Body Stars Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-50 rounded-2xl border border-purple-600 p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Your Destiny Stars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-900 bg-opacity-30 rounded-xl p-4">
                  <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-yellow-300 font-semibold mb-2">Life Star (命主)</h3>
                  <p className="text-2xl font-bold text-white">{chart.lifeStars.mingzhu}</p>
                  <p className="text-yellow-100 text-sm mt-2">
                    Your core personality and life direction
                  </p>
                </div>
                <div className="bg-blue-900 bg-opacity-30 rounded-xl p-4">
                  <CircleDot className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-blue-300 font-semibold mb-2">Body Star (身主)</h3>
                  <p className="text-2xl font-bold text-white">{chart.lifeStars.shenzhu}</p>
                  <p className="text-blue-100 text-sm mt-2">
                    Your physical manifestation and career focus
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 12 Palaces Chart */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              紫微斗数命盘
              <Crown className="h-8 w-8 text-yellow-400" />
            </h2>
            <div className="max-w-6xl mx-auto">
              {/* Professional Traditional Square Layout */}
              <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 rounded-3xl border-4 border-double border-yellow-600 p-6 shadow-2xl">
                {/* Traditional Corner Decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-yellow-500 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-yellow-500 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-yellow-500 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-yellow-500 rounded-br-lg"></div>
                
                <div className="grid grid-cols-4 gap-2 aspect-square max-w-4xl mx-auto">
                  {/* Row 1: 巳(5) 午(6) 未(7) 申(8) */}
                  {[4, 5, 6, 7].map((palaceIndex) => {
                    const palace = chart.palaces[palaceIndex];
                    const earthlyBranch = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][palaceIndex];
                    return (
                      <motion.div
                        key={palace.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: palaceIndex * 0.1 }}
                        className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg min-h-[120px] ${
                          palace.isUnlocked 
                            ? 'bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-800 border-2 border-yellow-400 shadow-yellow-500/20' 
                            : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-500 shadow-gray-700/20'
                        }`}
                      >
                        {!palace.isUnlocked && (
                          <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                        )}
                        {/* Palace Position & Branch */}
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs text-red-300 font-bold bg-red-900 bg-opacity-50 px-2 py-1 rounded">{earthlyBranch}</div>
                          <div className="text-xs text-yellow-300 font-bold bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">{palace.position}</div>
                        </div>
                        
                        {/* Palace Name */}
                        <div className="text-sm font-bold text-white mb-1 bg-black bg-opacity-30 py-1 px-2 rounded">
                          {palace.chineseName}
                        </div>
                        <div className="text-xs text-slate-300 mb-2">{palace.name}</div>
                        
                        {/* Stars Display */}
                        {palace.stars.length > 0 && (
                          <div className="space-y-1">
                            {palace.stars.map((star, starIndex) => (
                              <div key={starIndex} className="px-2 py-1 bg-purple-700 border border-purple-500 rounded-md text-xs text-yellow-100 font-semibold shadow-md">
                                {star.chineseName}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Traditional Elements */}
                        <div className="absolute bottom-1 left-1 text-xs text-blue-300 opacity-75">
                          {['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'][palaceIndex]}
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Row 2: 辰(4) [中央] [中央] 酉(9) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3 * 0.1 }}
                    className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg min-h-[120px] ${
                      chart.palaces[3].isUnlocked 
                        ? 'bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-800 border-2 border-yellow-400 shadow-yellow-500/20' 
                        : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-500 shadow-gray-700/20'
                    }`}
                  >
                    {!chart.palaces[3].isUnlocked && (
                      <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                    )}
                    {/* Palace Position & Branch */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-red-300 font-bold bg-red-900 bg-opacity-50 px-2 py-1 rounded">辰</div>
                      <div className="text-xs text-yellow-300 font-bold bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">{chart.palaces[3].position}</div>
                    </div>
                    
                    {/* Palace Name */}
                    <div className="text-sm font-bold text-white mb-1 bg-black bg-opacity-30 py-1 px-2 rounded">
                      {chart.palaces[3].chineseName}
                    </div>
                    <div className="text-xs text-slate-300 mb-2">{chart.palaces[3].name}</div>
                    
                    {/* Stars Display */}
                    {chart.palaces[3].stars.length > 0 && (
                      <div className="space-y-1">
                        {chart.palaces[3].stars.map((star, starIndex) => (
                          <div key={starIndex} className="px-2 py-1 bg-purple-700 border border-purple-500 rounded-md text-xs text-yellow-100 font-semibold shadow-md">
                            {star.chineseName}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Traditional Elements */}
                    <div className="absolute bottom-1 left-1 text-xs text-blue-300 opacity-75">土</div>
                  </motion.div>
                  
                  {/* Central Info - Professional Style */}
                  <div className="col-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 rounded-2xl border-4 border-double border-yellow-500 shadow-2xl relative overflow-hidden">
                    {/* Traditional Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-repeat" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <div className="mb-4">
                        <Sparkles className="h-12 w-12 text-yellow-300 mx-auto mb-2 animate-pulse" />
                        <div className="text-2xl font-bold text-yellow-100 mb-1 tracking-wide">紫微斗数</div>
                        <div className="text-sm text-yellow-300 mb-3 font-semibold">Purple Star Astrology</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-red-900 bg-opacity-50 rounded-lg p-2 border border-red-600">
                          <div className="text-xs text-red-300 mb-1">命主星</div>
                          <div className="text-lg font-bold text-yellow-100">{chart.lifeStars.mingzhu}</div>
                        </div>
                        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-2 border border-blue-600">
                          <div className="text-xs text-blue-300 mb-1">身主星</div>
                          <div className="text-lg font-bold text-yellow-100">{chart.lifeStars.shenzhu}</div>
                        </div>
                      </div>
                      
                      {/* Birth Info */}
                      <div className="mt-4 text-xs text-yellow-200 bg-black bg-opacity-30 rounded-lg p-2">
                        <div>{birthData.year}年{birthData.month}月{birthData.day}日</div>
                        <div>{birthData.hour}时 {birthData.gender === 'male' ? '男' : '女'}命</div>
                        <div>{birthData.birthplace}</div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 8 * 0.1 }}
                    className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg min-h-[120px] ${
                      chart.palaces[8].isUnlocked 
                        ? 'bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-800 border-2 border-yellow-400 shadow-yellow-500/20' 
                        : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-500 shadow-gray-700/20'
                    }`}
                  >
                    {!chart.palaces[8].isUnlocked && (
                      <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                    )}
                    {/* Palace Position & Branch */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-red-300 font-bold bg-red-900 bg-opacity-50 px-2 py-1 rounded">酉</div>
                      <div className="text-xs text-yellow-300 font-bold bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">{chart.palaces[8].position}</div>
                    </div>
                    
                    {/* Palace Name */}
                    <div className="text-sm font-bold text-white mb-1 bg-black bg-opacity-30 py-1 px-2 rounded">
                      {chart.palaces[8].chineseName}
                    </div>
                    <div className="text-xs text-slate-300 mb-2">{chart.palaces[8].name}</div>
                    
                    {/* Enhanced Stars Display with Brightness */}
                    {chart.palaces[8].stars.length > 0 && (
                      <div className="space-y-1">
                        {chart.palaces[8].stars.map((star, starIndex) => {
                          const brightnessColor = star.brightness === 'bright' ? 'from-yellow-600 to-yellow-700 border-yellow-500 text-yellow-100 shadow-yellow-500/30' :
                                                 star.brightness === 'average' ? 'from-purple-600 to-purple-700 border-purple-500 text-purple-100 shadow-purple-500/30' :
                                                 'from-gray-600 to-gray-700 border-gray-500 text-gray-100 shadow-gray-500/30';
                          
                          return (
                            <div key={starIndex} className={`relative px-2 py-1 bg-gradient-to-r ${brightnessColor} border rounded-lg text-xs font-bold shadow-lg transition-all duration-300 hover:scale-105`}>
                              <div className="flex items-center justify-between">
                                <span>{star.chineseName}</span>
                                {star.brightness === 'bright' && <Star className="h-3 w-3 text-yellow-300 animate-pulse" />}
                              </div>
                              {star.type === 'major' && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Traditional Elements */}
                    <div className="absolute bottom-1 left-1 text-xs text-blue-300 opacity-75">金</div>
                  </motion.div>
                  
                  {/* Row 3: 卯(3) [中央] [中央] 戌(10) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 * 0.1 }}
                    className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg min-h-[120px] ${
                      chart.palaces[2].isUnlocked 
                        ? 'bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-800 border-2 border-yellow-400 shadow-yellow-500/20' 
                        : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-500 shadow-gray-700/20'
                    }`}
                  >
                    {!chart.palaces[2].isUnlocked && (
                      <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                    )}
                    {/* Palace Position & Branch */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-red-300 font-bold bg-red-900 bg-opacity-50 px-2 py-1 rounded">卯</div>
                      <div className="text-xs text-yellow-300 font-bold bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">{chart.palaces[2].position}</div>
                    </div>
                    
                    {/* Palace Name */}
                    <div className="text-sm font-bold text-white mb-1 bg-black bg-opacity-30 py-1 px-2 rounded">
                      {chart.palaces[2].chineseName}
                    </div>
                    <div className="text-xs text-slate-300 mb-2">{chart.palaces[2].name}</div>
                    
                    {/* Stars Display */}
                    {chart.palaces[2].stars.length > 0 && (
                      <div className="space-y-1">
                        {chart.palaces[2].stars.map((star, starIndex) => (
                          <div key={starIndex} className="px-2 py-1 bg-purple-700 border border-purple-500 rounded-md text-xs text-yellow-100 font-semibold shadow-md">
                            {star.chineseName}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Traditional Elements */}
                    <div className="absolute bottom-1 left-1 text-xs text-blue-300 opacity-75">木</div>
                  </motion.div>
                  
                  {/* Transformation Stars Display - Professional Style */}
                  <div className="col-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-2xl border-3 border-double border-blue-500 shadow-2xl relative overflow-hidden">
                    {/* Traditional Pattern Background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)" }}></div>
                    </div>
                    
                    <div className="text-center relative z-10 p-4">
                      <div className="flex items-center justify-center mb-3">
                        <Zap className="h-8 w-8 text-blue-400 mr-2 animate-pulse" />
                        <div className="text-xl font-bold text-white tracking-wider">四化星系</div>
                        <Zap className="h-8 w-8 text-blue-400 ml-2 animate-pulse" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {chart.transformations.map((trans, index) => {
                          const colors = {
                            'lu': 'from-green-800 to-green-700 border-green-500 text-green-100',
                            'quan': 'from-red-800 to-red-700 border-red-500 text-red-100', 
                            'ke': 'from-blue-800 to-blue-700 border-blue-500 text-blue-100',
                            'ji': 'from-gray-800 to-gray-700 border-gray-500 text-gray-100'
                          };
                          const transformName = trans.type === 'lu' ? '禄' : trans.type === 'quan' ? '权' : trans.type === 'ke' ? '科' : '忌';
                          
                          return (
                            <div key={index} className={`bg-gradient-to-br ${colors[trans.type]} border-2 rounded-lg p-2 shadow-lg`}>
                              <div className="text-xs font-bold mb-1">化{transformName}</div>
                              <div className="text-sm font-semibold">{trans.star}</div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-3 text-xs text-blue-200 bg-black bg-opacity-30 rounded-lg p-2">
                        四化主导命运转化
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 9 * 0.1 }}
                    className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg min-h-[120px] ${
                      chart.palaces[9].isUnlocked 
                        ? 'bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-800 border-2 border-yellow-400 shadow-yellow-500/20' 
                        : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-500 shadow-gray-700/20'
                    }`}
                  >
                    {!chart.palaces[9].isUnlocked && (
                      <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                    )}
                    {/* Palace Position & Branch */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-red-300 font-bold bg-red-900 bg-opacity-50 px-2 py-1 rounded">戌</div>
                      <div className="text-xs text-yellow-300 font-bold bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">{chart.palaces[9].position}</div>
                    </div>
                    
                    {/* Palace Name */}
                    <div className="text-sm font-bold text-white mb-1 bg-black bg-opacity-30 py-1 px-2 rounded">
                      {chart.palaces[9].chineseName}
                    </div>
                    <div className="text-xs text-slate-300 mb-2">{chart.palaces[9].name}</div>
                    
                    {/* Stars Display */}
                    {chart.palaces[9].stars.length > 0 && (
                      <div className="space-y-1">
                        {chart.palaces[9].stars.map((star, starIndex) => (
                          <div key={starIndex} className="px-2 py-1 bg-purple-700 border border-purple-500 rounded-md text-xs text-yellow-100 font-semibold shadow-md">
                            {star.chineseName}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Traditional Elements */}
                    <div className="absolute bottom-1 left-1 text-xs text-blue-300 opacity-75">土</div>
                  </motion.div>
                  
                  {/* Row 4: 寅(2) 丑(1) 子(12) 亥(11) */}
                  {[1, 0, 11, 10].map((palaceIndex) => {
                    const palace = chart.palaces[palaceIndex];
                    const earthlyBranch = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][palaceIndex];
                    const element = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'][palaceIndex];
                    return (
                      <motion.div
                        key={palace.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: palaceIndex * 0.1 }}
                        className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg min-h-[120px] ${
                          palace.isUnlocked 
                            ? 'bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-800 border-2 border-yellow-400 shadow-yellow-500/20' 
                            : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-500 shadow-gray-700/20'
                        }`}
                      >
                        {!palace.isUnlocked && (
                          <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                        )}
                        {/* Palace Position & Branch */}
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs text-red-300 font-bold bg-red-900 bg-opacity-50 px-2 py-1 rounded">{earthlyBranch}</div>
                          <div className="text-xs text-yellow-300 font-bold bg-yellow-900 bg-opacity-50 px-2 py-1 rounded">{palace.position}</div>
                        </div>
                        
                        {/* Palace Name */}
                        <div className="text-sm font-bold text-white mb-1 bg-black bg-opacity-30 py-1 px-2 rounded">
                          {palace.chineseName}
                        </div>
                        <div className="text-xs text-slate-300 mb-2">{palace.name}</div>
                        
                        {/* Stars Display */}
                        {palace.stars.length > 0 && (
                          <div className="space-y-1">
                            {palace.stars.map((star, starIndex) => (
                              <div key={starIndex} className="px-2 py-1 bg-purple-700 border border-purple-500 rounded-md text-xs text-yellow-100 font-semibold shadow-md">
                                {star.chineseName}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Traditional Elements */}
                        <div className="absolute bottom-1 left-1 text-xs text-blue-300 opacity-75">{element}</div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Professional Legend */}
                <div className="mt-6 bg-slate-900 bg-opacity-60 rounded-xl p-4 border border-slate-600">
                  <h3 className="text-lg font-bold text-white text-center mb-4">排盘说明 Chart Legend</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-yellow-400 bg-gradient-to-br from-amber-800 to-orange-800 rounded shadow-md"></div>
                      <span className="text-yellow-300 font-semibold">已解锁宫位</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-500 bg-gradient-to-br from-gray-700 to-gray-900 rounded shadow-md"></div>
                      <span className="text-gray-400">锁定宫位</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-yellow-600 to-yellow-700 border border-yellow-500 rounded shadow-md"></div>
                      <span className="text-yellow-300">亮星</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-purple-700 border border-purple-500 rounded shadow-md"></div>
                      <span className="text-purple-300">平星</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-gray-600 to-gray-700 border border-gray-500 rounded shadow-md"></div>
                      <span className="text-gray-300">暗星</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-900 bg-opacity-50 border border-red-600 rounded"></div>
                      <span className="text-red-300">地支</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                      <span className="text-red-300">主星标记</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-yellow-300" />
                      <span className="text-yellow-300">亮星效应</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-xs text-slate-400">
                      传统紫微斗数排盘 • 十二宫分布 • 主星配置 • 四化体系
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Detailed Palace Analysis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-6">Palace Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chart.palaces.slice(0, 4).map((palace) => (
                <div
                  key={palace.id}
                  className={`rounded-xl border p-6 ${
                    palace.isUnlocked
                      ? 'border-indigo-800 bg-indigo-900 bg-opacity-50'
                      : 'border-gray-600 bg-gray-900 bg-opacity-50 relative overflow-hidden'
                  }`}
                >
                  {!palace.isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm">Unlock Full Report</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <Compass className="h-6 w-6 text-indigo-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{palace.chineseName}</h3>
                      <p className="text-indigo-300 text-sm">{palace.name}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4 text-sm">{palace.description}</p>
                  {palace.isUnlocked && (
                    <div className="bg-indigo-950 bg-opacity-50 rounded-lg p-4">
                      <h4 className="text-indigo-300 font-medium mb-2">AI Analysis</h4>
                      <p className="text-slate-300 text-sm">{palace.aiAnalysis}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Premium Unlock CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-50 rounded-2xl border border-yellow-600 p-8 text-center">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Unlock Your Complete Zi Wei Report</h2>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Get detailed analysis of all 12 palaces, special formations, annual forecasts, and personalized guidance based on your complete chart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all">
                  Unlock Full Report - $19.99
                </button>
                <button className="px-6 py-3 bg-transparent border border-yellow-600 text-yellow-300 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all">
                  <Download className="h-5 w-5 inline mr-2" />
                  Download Chart Image
                </button>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  q: "What is Zi Wei Dou Shu?",
                  a: "Zi Wei Dou Shu is an ancient Chinese astrological system that uses the positions of stars to create a detailed life map across 12 palaces, offering insights into personality, destiny, and life events."
                },
                {
                  q: "How is it different from BaZi?",
                  a: "While BaZi focuses on the five elements and your birth pillars, Zi Wei Dou Shu uses a star map approach with 12 life palaces, providing more specific predictions about different life areas."
                },
                {
                  q: "What's the role of the Life Star?",
                  a: "The Life Star (命主) represents your core personality and primary life direction, while the Body Star (身主) shows how you manifest in the physical world and your career focus."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-indigo-900 bg-opacity-50 rounded-xl border border-indigo-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    );
  }

  // Input Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-6">🪐</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Zi Wei Dou Shu
          </h1>
          <p className="text-xl text-indigo-300 mb-2">紫微斗数</p>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discover your destiny through the ancient Chinese star map. Generate your complete 12-palace chart and unlock the secrets of your cosmic blueprint.
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm rounded-2xl border border-indigo-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Generate Your Zi Wei Chart
            </h2>
            
            <div className="space-y-6">
              {/* Name (Optional) */}
              <div>
                <label className="block text-indigo-300 text-sm font-medium mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Name (Optional)
                </label>
                <input
                  type="text"
                  value={birthData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-indigo-300 text-sm font-medium mb-2">Gender</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={birthData.gender === 'male'}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-white">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={birthData.gender === 'female'}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-white">Female</span>
                  </label>
                </div>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-indigo-300 text-sm font-medium mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Birth Date (Gregorian Calendar)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Year</label>
                    <input
                      type="number"
                      value={birthData.year}
                      onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                      min={1900}
                      max={2030}
                      className="w-full px-3 py-2 bg-indigo-950 border border-indigo-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Month</label>
                    <select
                      value={birthData.month}
                      onChange={(e) => handleInputChange('month', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-indigo-950 border border-indigo-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Day</label>
                    <select
                      value={birthData.day}
                      onChange={(e) => handleInputChange('day', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-indigo-950 border border-indigo-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Birth Time */}
              <div>
                <label className="block text-indigo-300 text-sm font-medium mb-2">
                  Birth Time (24-hour format)
                </label>
                <select
                  value={birthData.hour}
                  onChange={(e) => handleInputChange('hour', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>

              {/* Birth Place */}
              <div>
                <label className="block text-indigo-300 text-sm font-medium mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Birth Place
                </label>
                <input
                  type="text"
                  value={birthData.birthplace}
                  onChange={(e) => handleInputChange('birthplace', e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateChart}
                disabled={loading || !birthData.birthplace}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Generating Your Chart...
                  </div>
                ) : (
                  <>
                    <Zap className="h-6 w-6 inline mr-2" />
                    Generate My Zi Wei Chart
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            What You'll Discover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Star className="h-8 w-8 text-yellow-400" />,
                title: "12 Life Palaces",
                description: "Detailed analysis of career, wealth, relationships, health, and more"
              },
              {
                icon: <Sparkles className="h-8 w-8 text-purple-400" />,
                title: "Star Positions",
                description: "Major stars, transformations, and their influence on your destiny"
              },
              {
                icon: <Crown className="h-8 w-8 text-amber-400" />,
                title: "Special Formations",
                description: "Rare patterns and structures that shape your unique life path"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-indigo-900 bg-opacity-30 rounded-xl border border-indigo-800 p-6 text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ZiWeiPage;