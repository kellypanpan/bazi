import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from './BirthDateForm';
import { Calendar, Clock, Star, Moon, Flame, Droplets, Compass, Sparkles, Sun, Heart, Briefcase, Leaf, Cloud, Mountain, Gem, Waves, ArrowRight } from 'lucide-react';
import AIAnalysisDisplay from './AIAnalysisDisplay';
import { BaziData } from '../services/aiService';

interface DetailedResultsDisplayProps {
  formData: FormData;
}

interface ElementalTraits {
  strengths: string[];
  challenges: string[];
  careers: string[];
  relationships: string[];
}

interface ElementalNature {
  dominant: {
    element: string;
    traits: ElementalTraits;
  };
  weakest: {
    element: string;
    traits: ElementalTraits;
  };
}

type Element = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

const DetailedResultsDisplay: React.FC<DetailedResultsDisplayProps> = ({ formData }) => {
  const birthYear = new Date(formData.birthDate).getFullYear();
  const birthMonth = new Date(formData.birthDate).getMonth() + 1;
  const birthDay = new Date(formData.birthDate).getDate();
  const birthHour = parseInt(formData.birthTime.split(':')[0]);

  // 基础计算函数
  const getChineseZodiac = (year: number) => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(year - 4) % 12];
  };

  const getHeavenlyStem = (year: number) => {
    const stems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
    return stems[(year - 4) % 10];
  };

  const getEarthlyBranch = (year: number) => {
    const branches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
    return branches[(year - 4) % 12];
  };

  const getElement = (stem: string) => {
    const elements = {
      'Jia': 'Wood', 'Yi': 'Wood',
      'Bing': 'Fire', 'Ding': 'Fire',
      'Wu': 'Earth', 'Ji': 'Earth',
      'Geng': 'Metal', 'Xin': 'Metal',
      'Ren': 'Water', 'Gui': 'Water'
    };
    return elements[stem as keyof typeof elements];
  };

  const getMonthElement = (month: number) => {
    const elements = ['Wood', 'Wood', 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Water', 'Water'];
    return elements[month - 1];
  };

  const getDayElement = (day: number) => {
    return ['Metal', 'Water', 'Wood', 'Fire', 'Earth'][day % 5];
  };

  const getHourElement = (hour: number) => {
    if (hour >= 23 || hour < 1) return 'Water';
    if (hour >= 1 && hour < 5) return 'Wood';
    if (hour >= 5 && hour < 9) return 'Fire';
    if (hour >= 9 && hour < 13) return 'Earth';
    if (hour >= 13 && hour < 17) return 'Metal';
    if (hour >= 17 && hour < 21) return 'Water';
    return 'Wood';
  };

  // 计算命盘基本信息
  const zodiac = getChineseZodiac(birthYear);
  const heavenlyStem = getHeavenlyStem(birthYear);
  const earthlyBranch = getEarthlyBranch(birthYear);
  const yearElement = getElement(heavenlyStem);
  const monthElement = getMonthElement(birthMonth);
  const dayElement = getDayElement(birthDay);
  const hourElement = getHourElement(birthHour);

  const getElementalBalance = () => {
    const elements: Record<Element, number> = {
      Wood: 0,
      Fire: 0,
      Earth: 0,
      Metal: 0,
      Water: 0
    };

    elements[yearElement as Element]++;
    elements[monthElement as Element]++;
    elements[dayElement as Element]++;
    elements[hourElement as Element]++;

    return elements;
  };

  const elementalBalance = getElementalBalance();

  const getElementalNature = (): ElementalNature => {
    const dominantElement = Object.entries(elementalBalance).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    const weakestElement = Object.entries(elementalBalance).reduce((a, b) => b[1] < a[1] ? b : a)[0];

    const elementalTraits: Record<string, ElementalTraits> = {
      Wood: {
        strengths: ['创造力', '成长思维', '适应力', '同理心'],
        challenges: ['优柔寡断', '精力分散', '界限不清'],
        careers: ['教育', '医疗', '环保', '咨询'],
        relationships: ['滋养型', '支持型', '成长导向']
      },
      Fire: {
        strengths: ['领导力', '魅力', '热情', '感染力'],
        challenges: ['冲动', '精力耗尽', '情绪波动'],
        careers: ['娱乐', '销售', '营销', '演讲'],
        relationships: ['活力型', '激情型', '变革型']
      },
      Earth: {
        strengths: ['稳定性', '可靠性', '实用性', '踏实'],
        challenges: ['抗拒改变', '固执', '过度思考'],
        careers: ['金融', '房地产', '农业', '建筑'],
        relationships: ['稳定型', '可靠型', '安全导向']
      },
      Metal: {
        strengths: ['精确性', '纪律性', '清晰度', '组织力'],
        challenges: ['完美主义', '僵化', '情感表达困难'],
        careers: ['科技', '工程', '法律', '研究'],
        relationships: ['结构型', '界限清晰', '尊重导向']
      },
      Water: {
        strengths: ['智慧', '直觉', '适应力', '情感深度'],
        challenges: ['害怕承诺', '情绪过载', '结构困难'],
        careers: ['研究', '心理学', '灵性工作', '艺术'],
        relationships: ['深度情感', '直觉理解', '流动型']
      }
    };

    return {
      dominant: {
        element: dominantElement,
        traits: elementalTraits[dominantElement]
      },
      weakest: {
        element: weakestElement,
        traits: elementalTraits[weakestElement]
      }
    };
  };

  const elementalNature = getElementalNature();

  const getZodiacPersonality = (zodiac: string) => {
    const personalities = {
      'Rat': {
        traits: ['机敏', '多才多艺', '机智', '想象力丰富'],
        strengths: '快速解决问题，天生魅力',
        challenges: '可能过于投机，有时不安定',
        relationships: '与龙、猴、牛最相配',
        career: '在商业、技术和创意领域表现出色'
      },
      'Ox': {
        traits: ['可靠', '耐心', '善良', '坚持不懈'],
        strengths: '天生的领导者，原则性强，意志坚定',
        challenges: '可能固执，难以接受改变',
        relationships: '与蛇、鸡、鼠和谐相处',
        career: '在农业、制造业和领导岗位取得成功'
      },
      'Tiger': {
        traits: ['勇敢', '自信', '魅力', '不可预测'],
        strengths: '天生的权威和磁性人格',
        challenges: '可能冲动，容易情绪化决策',
        relationships: '与马、狗、猪相配',
        career: '在竞争性和动态环境中茁壮成长'
      },
      'Rabbit': {
        traits: ['温和', '优雅', '警觉', '敏捷'],
        strengths: '外交技巧和艺术敏感性',
        challenges: '可能回避冲突，过于谨慎',
        relationships: '与羊、猪、狗最相配',
        career: '在艺术、外交和公共关系方面表现出色'
      },
      'Dragon': {
        traits: ['自信', '聪明', '热情', '雄心勃勃'],
        strengths: '天生的领导力和创新思维',
        challenges: '可能完美主义，要求过高',
        relationships: '与鼠、猴、鸡相配',
        career: '在领导、娱乐和创新方面取得成功'
      },
      'Snake': {
        traits: ['智慧', '神秘', '优雅', '直觉'],
        strengths: '深刻的智慧和出色的解决问题能力',
        challenges: '可能过于神秘，过度怀疑',
        relationships: '与龙、鸡、牛相配',
        career: '在研究、灵性和心理学方面表现出色'
      },
      'Horse': {
        traits: ['精力充沛', '独立', '冒险', '热心'],
        strengths: '天生的热情和激励他人的能力',
        challenges: '可能缺乏耐心，容易漂泊',
        relationships: '与虎、狗、羊最相配',
        career: '在销售、体育和冒险相关领域取得成功'
      },
      'Goat': {
        traits: ['温和', '富有同情心', '创造力', '韧性'],
        strengths: '艺术才能和情商',
        challenges: '可能过于担忧，依赖他人',
        relationships: '与兔、马、猪和谐相处',
        career: '在艺术、治疗职业和咨询方面茁壮成长'
      },
      'Monkey': {
        traits: ['聪明', '创新', '机智', '多才多艺'],
        strengths: '出色的解决问题能力和适应力',
        challenges: '可能投机，不够稳定',
        relationships: '与龙、鼠、蛇相配',
        career: '在科学、工程和娱乐方面表现出色'
      },
      'Rooster': {
        traits: ['诚实', '精力充沛', '聪明', '华丽'],
        strengths: '强烈的工作道德和注重细节',
        challenges: '可能过于挑剔，完美主义',
        relationships: '与牛、蛇、龙最相配',
        career: '在管理、分析和表演方面取得成功'
      },
      'Dog': {
        traits: ['忠诚', '诚实', '聪明', '保护欲强'],
        strengths: '强烈的正义感和可靠性',
        challenges: '可能焦虑，过于挑剔',
        relationships: '与虎、马、兔和谐相处',
        career: '在服务职业和倡导方面表现出色'
      },
      'Pig': {
        traits: ['诚实', '勤奋', '慷慨', '乐观'],
        strengths: '真诚和建立持久关系的能力',
        challenges: '可能过于信任，容易受影响',
        relationships: '与兔、羊、虎相配',
        career: '在娱乐、酒店和零售方面取得成功'
      }
    };

    return personalities[zodiac as keyof typeof personalities];
  };

  const zodiacPersonality = getZodiacPersonality(zodiac);

  const getLifePhases = () => {
    return [
      {
        age: '0-15',
        description: `早年以${elementalNature.dominant.traits.strengths[0]}和${elementalNature.dominant.traits.strengths[1]}为特征。重点在教育和个人发展。`,
        element: yearElement
      },
      {
        age: '16-30',
        description: `青年期展现出${elementalNature.dominant.traits.strengths[2]}和${elementalNature.dominant.traits.strengths[3]}的特质。这是事业起步和感情发展的关键期。`,
        element: monthElement
      },
      {
        age: '31-45',
        description: `中年期需要平衡${elementalNature.dominant.traits.challenges[0]}和${elementalNature.dominant.traits.challenges[1]}的倾向。这是事业发展和家庭建设的重要阶段。`,
        element: dayElement
      },
      {
        age: '46-60',
        description: `成熟期要发挥${elementalNature.dominant.traits.strengths[0]}的优势，同时注意补充${elementalNature.weakest.element}的能量。这是人生智慧积累和传承的阶段。`,
        element: hourElement
      }
    ];
  };

  // 辅助函数
  const getHealthFocus = () => {
    const healthFocus = {
      'Wood': '肝胆系统',
      'Fire': '心血管系统',
      'Earth': '脾胃系统',
      'Metal': '呼吸系统',
      'Water': '泌尿系统'
    };
    return healthFocus[yearElement as keyof typeof healthFocus];
  };

  const getDietaryAdvice = () => {
    const dietaryAdvice = {
      'Wood': '绿色蔬菜、水果',
      'Fire': '红色食物、温性食材',
      'Earth': '黄色食物、谷物',
      'Metal': '白色食物、根茎类',
      'Water': '黑色食物、海鲜'
    };
    return dietaryAdvice[yearElement as keyof typeof dietaryAdvice];
  };

  const getExerciseAdvice = () => {
    const exerciseAdvice = {
      'Wood': '瑜伽、太极',
      'Fire': '有氧运动、舞蹈',
      'Earth': '力量训练、徒步',
      'Metal': '跑步、游泳',
      'Water': '游泳、冥想'
    };
    return exerciseAdvice[yearElement as keyof typeof exerciseAdvice];
  };

  const getSleepAdvice = () => {
    const sleepAdvice = {
      'Wood': '早睡早起，保持规律作息',
      'Fire': '避免熬夜，保证充足睡眠',
      'Earth': '保持固定作息时间',
      'Metal': '睡前放松，避免过度思考',
      'Water': '保持安静环境，避免刺激'
    };
    return sleepAdvice[yearElement as keyof typeof sleepAdvice];
  };

  const getWealthSource = () => {
    const wealthSource = {
      'Wood': '创意产业、教育行业',
      'Fire': '娱乐业、销售行业',
      'Earth': '房地产、农业',
      'Metal': '金融业、科技行业',
      'Water': '旅游业、服务业'
    };
    return wealthSource[yearElement as keyof typeof wealthSource];
  };

  const getWealthYears = () => {
    return `${birthYear + 20}-${birthYear + 30}`;
  };

  const getFinancialRisks = () => {
    const risks = {
      'Wood': '冲动投资、过度扩张',
      'Fire': '投机取巧、盲目跟风',
      'Earth': '固步自封、错失机会',
      'Metal': '过于保守、缺乏创新',
      'Water': '犹豫不决、错失良机'
    };
    return risks[yearElement as keyof typeof risks];
  };

  const getInvestmentAdvice = () => {
    const advice = {
      'Wood': '教育投资、环保产业',
      'Fire': '娱乐产业、餐饮业',
      'Earth': '房地产、农业',
      'Metal': '科技股、贵金属',
      'Water': '旅游业、服务业'
    };
    return advice[yearElement as keyof typeof advice];
  };

  const getFinancialStrategy = () => {
    const strategy = {
      'Wood': '稳健增长，注重长期投资',
      'Fire': '适度冒险，把握机会',
      'Earth': '稳健保守，注重保值',
      'Metal': '精打细算，注重效率',
      'Water': '灵活多变，把握时机'
    };
    return strategy[yearElement as keyof typeof strategy];
  };

  const getRiskPrevention = () => {
    const prevention = {
      'Wood': '避免冲动投资，做好风险评估',
      'Fire': '控制投资规模，避免过度冒险',
      'Earth': '保持资金流动性，避免过度保守',
      'Metal': '分散投资，避免过度集中',
      'Water': '把握投资时机，避免犹豫不决'
    };
    return prevention[yearElement as keyof typeof prevention];
  };

  const getWealthBuildingMethods = () => {
    const methods = {
      'Wood': '创意创业、教育培训',
      'Fire': '销售推广、娱乐产业',
      'Earth': '房地产投资、农业经营',
      'Metal': '金融投资、科技创新',
      'Water': '旅游服务、国际贸易'
    };
    return methods[yearElement as keyof typeof methods];
  };

  const getWealthPitfalls = () => {
    const pitfalls = {
      'Wood': '盲目扩张、过度投资',
      'Fire': '投机取巧、急功近利',
      'Earth': '固步自封、错失机会',
      'Metal': '过于保守、缺乏创新',
      'Water': '犹豫不决、错失良机'
    };
    return pitfalls[yearElement as keyof typeof pitfalls];
  };

  const getCareerTurningPoints = () => {
    return `${birthYear + 25}岁、${birthYear + 35}岁、${birthYear + 45}岁`;
  };

  const getRelationshipMilestones = () => {
    return `${birthYear + 22}岁、${birthYear + 28}岁、${birthYear + 34}岁`;
  };

  const getWealthAccumulationPeriods = () => {
    return `${birthYear + 30}岁至${birthYear + 45}岁`;
  };

  const getOpportunityTiming = () => {
    const timing = {
      'Wood': '春季、早晨',
      'Fire': '夏季、中午',
      'Earth': '四季交替、傍晚',
      'Metal': '秋季、下午',
      'Water': '冬季、夜晚'
    };
    return timing[yearElement as keyof typeof timing];
  };

  const getRiskAvoidance = () => {
    const risks = {
      'Wood': '避免冲动决策，保持理性',
      'Fire': '控制情绪波动，保持冷静',
      'Earth': '避免固步自封，保持开放',
      'Metal': '避免过于保守，保持创新',
      'Water': '避免犹豫不决，保持果断'
    };
    return risks[yearElement as keyof typeof risks];
  };

  const getLuckyColors = () => {
    const colors = {
      'Wood': '绿色、青色',
      'Fire': '红色、紫色',
      'Earth': '黄色、棕色',
      'Metal': '白色、金色',
      'Water': '黑色、蓝色'
    };
    return colors[yearElement as keyof typeof colors];
  };

  const getLuckyNumbers = () => {
    const numbers = {
      'Wood': '3、8',
      'Fire': '2、7',
      'Earth': '5、0',
      'Metal': '4、9',
      'Water': '1、6'
    };
    return numbers[yearElement as keyof typeof numbers];
  };

  const getLuckyDirections = () => {
    const directions = {
      'Wood': '东方、东南方',
      'Fire': '南方',
      'Earth': '中央、西南方',
      'Metal': '西方、西北方',
      'Water': '北方'
    };
    return directions[yearElement as keyof typeof directions];
  };

  const getLuckyItems = () => {
    const items = {
      'Wood': '植物、木制品',
      'Fire': '红色饰品、蜡烛',
      'Earth': '陶瓷、玉石',
      'Metal': '金属饰品、水晶',
      'Water': '蓝色饰品、鱼缸'
    };
    return items[yearElement as keyof typeof items];
  };

  const getDetailedAnalysis = () => {
    return {
      personalProfile: {
        title: "个人命盘分析",
        content: `根据您的生辰八字（${formData.birthDate} ${formData.birthTime}），您属于${zodiac}年${heavenlyStem}${earthlyBranch}命。这是一个充满${elementalNature.dominant.traits.strengths[0]}和${elementalNature.dominant.traits.strengths[1]}的命格。

您的命盘中${yearElement}、${monthElement}、${dayElement}、${hourElement}四柱俱全，形成了独特的五行格局。其中${elementalNature.dominant.element}气最盛，${elementalNature.weakest.element}气偏弱，这种五行配置对您的人生轨迹有着深远的影响。

在性格特征方面，您展现出${zodiacPersonality.traits.join('、')}等特质。这些特质在您的成长过程中会逐渐显现，并影响您的人生选择和发展方向。`
      },
      careerAnalysis: {
        title: "事业发展分析",
        content: `基于您的命盘特点，在职业发展方面，您特别适合以下领域：

1. ${zodiacPersonality.career}：您的命格中蕴含着这方面的天赋和潜力。
2. ${elementalNature.dominant.traits.careers.join('、')}：这些领域能够充分发挥您的优势。

在职场中，您需要注意以下几点：
- 发挥${elementalNature.dominant.traits.strengths[0]}的优势
- 注意避免${elementalNature.dominant.traits.challenges[0]}的倾向
- 适当补充${elementalNature.weakest.element}的能量

建议在${getLifePhases()[1].age}岁期间，重点关注职业发展和能力提升。这个阶段是您事业发展的关键期。`
      },
      relationshipAnalysis: {
        title: "感情姻缘分析",
        content: `在感情方面，您的命格显示出以下特点：

1. 感情特质：
- 您倾向于${elementalNature.dominant.traits.relationships[0]}的关系模式
- 在感情中表现出${zodiacPersonality.traits[0]}和${zodiacPersonality.traits[1]}的特质
- 容易与${zodiacPersonality.relationships}类型的人产生共鸣

2. 姻缘时机：
- 桃花运旺盛的年份：${getLifePhases()[2].age}岁期间
- 适合婚配的生肖：${zodiacPersonality.relationships}
- 需要注意的感情挑战：${elementalNature.dominant.traits.challenges[0]}

3. 感情建议：
- 在感情中保持${elementalNature.dominant.traits.strengths[0]}的特质
- 注意平衡${elementalNature.weakest.element}的能量
- 选择能够互补的伴侣，共同成长`
      },
      healthAnalysis: {
        title: "健康运势分析",
        content: `根据您的命盘，在健康方面需要注意以下几点：

1. 体质特点：
- 先天体质偏向${elementalNature.dominant.element}性
- 容易受到${elementalNature.weakest.element}气不足的影响
- 需要特别注意${getHealthFocus()}方面的保养

2. 养生建议：
- 饮食方面：多补充${getDietaryAdvice()}类食物
- 运动方面：适合${getExerciseAdvice()}等运动
- 作息方面：建议${getSleepAdvice()}

3. 健康提醒：
- 在${getLifePhases()[3].age}岁期间需要特别注意健康
- 定期进行${getHealthCheck()}方面的检查
- 保持${elementalNature.dominant.traits.strengths[0]}的生活态度`
      },
      wealthAnalysis: {
        title: "财运分析",
        content: `在财运方面，您的命盘显示：

1. 财运特点：
- 财源主要来自${getWealthSource()}
- 财运旺盛的年份：${getWealthYears()}
- 需要注意的财务风险：${getFinancialRisks()}

2. 理财建议：
- 适合的投资方向：${getInvestmentAdvice()}
- 理财策略：${getFinancialStrategy()}
- 风险防范：${getRiskPrevention()}

3. 财富积累：
- 在${getLifePhases()[1].age}岁期间是积累财富的关键期
- 建议通过${getWealthBuildingMethods()}等方式增加收入
- 注意避免${getWealthPitfalls()}等财务陷阱`
      },
      lifeGuidance: {
        title: "人生指导",
        content: `基于您的命盘特点，为您提供以下人生指导：

1. 人生阶段规划：
${getLifePhases().map(phase => `
- ${phase.age}岁：${phase.description}
`).join('')}

2. 关键时间节点：
- 事业转折点：${getCareerTurningPoints()}
- 感情重要期：${getRelationshipMilestones()}
- 财富积累期：${getWealthAccumulationPeriods()}

3. 人生建议：
- 发挥优势：${elementalNature.dominant.traits.strengths.join('、')}
- 弥补不足：${elementalNature.weakest.traits.strengths.join('、')}
- 把握机遇：${getOpportunityTiming()}
- 规避风险：${getRiskAvoidance()}

4. 开运建议：
- 幸运颜色：${getLuckyColors()}
- 幸运数字：${getLuckyNumbers()}
- 开运方位：${getLuckyDirections()}
- 开运物品：${getLuckyItems()}

记住，命理分析仅供参考，人生的精彩在于自己的把握和努力。希望这份详细的命格解析能够帮助您更好地认识自己，把握人生方向。`
      }
    };
  };

  const detailedAnalysis = getDetailedAnalysis();

  const getHealthCheck = () => {
    const healthChecks = {
      'Wood': '肝功能、胆囊',
      'Fire': '心脏、血压',
      'Earth': '脾胃、消化系统',
      'Metal': '肺部、呼吸系统',
      'Water': '肾脏、泌尿系统'
    };
    return healthChecks[yearElement as Element];
  };

  // 准备AI分析所需的数据
  const prepareBaziDataForAI = (): BaziData => {
    return {
      birthDate: formData.birthDate,
      birthTime: formData.birthTime,
      yearElement,
      monthElement,
      dayElement,
      hourElement,
      zodiac,
      heavenlyStem,
      earthlyBranch,
      elementalBalance
    };
  };

  const baziDataForAI = prepareBaziDataForAI();

  return (
    <div className="space-y-8">
      {/* AI分析组件 */}
      <AIAnalysisDisplay baziData={baziDataForAI} />
      
      {/* 传统分析 */}
      {Object.entries(detailedAnalysis).map(([key, section], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8"
        >
          <h2 className="text-2xl font-medium text-white mb-4">{section.title}</h2>
          <div className="prose prose-invert max-w-none">
            {section.content.split('\n').map((paragraph, i) => (
              <p key={i} className="text-slate-300 mb-4">{paragraph}</p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DetailedResultsDisplay; 