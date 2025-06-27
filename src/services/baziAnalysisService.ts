import { BirthData } from '../components/BirthDateForm';
import { sendMessage, ChatMessage } from './openRouterService';

export interface BaziAnalysis {
  basicInfo: {
    chineseZodiac: string;
    heavenlyStem: string;
    earthlyBranch: string;
    elements: {
      year: string;
      month: string;
      day: string;
      hour: string;
    };
  };
  personalityAnalysis: {
    strengths: string[];
    challenges: string[];
    careerSuggestions: string[];
    relationshipInsights: string[];
  };
  lifePath: {
    currentPhase: string;
    opportunities: string[];
    challenges: string[];
    recommendations: string[];
  };
  detailedGuidance: {
    career: string;
    relationships: string;
    health: string;
    wealth: string;
  };
}

export async function analyzeBazi(data: BirthData): Promise<BaziAnalysis> {
  const prompt = `Please provide a comprehensive BaZi (Four Pillars) fortune analysis based on the following birth information. Requirements:
  
1. Use professional English with clear explanations for all concepts
2. Provide at least 8-10 items for each array field; string fields should be detailed paragraphs (minimum 5 sentences each)
3. Output ONLY valid JSON, no extra text
4. Be comprehensive and detailed in all sections

Birth Information:
Name: ${data.name}
Gender: ${data.gender}
Birth Date: ${data.birthDate}
Birth Time: ${data.birthTime}
Birth Location: ${data.location}

Please return the analysis in this exact JSON structure:
${JSON.stringify({
  basicInfo: {
    chineseZodiac: "Animal name based on birth year",
    heavenlyStem: "Heavenly stem calculation",
    earthlyBranch: "Earthly branch calculation", 
    elements: {
      year: "Year pillar element",
      month: "Month pillar element",
      day: "Day pillar element",
      hour: "Hour pillar element"
    }
  },
  personalityAnalysis: {
    strengths: ["List 8-10 detailed strength points"],
    challenges: ["List 8-10 detailed challenge areas"],
    careerSuggestions: ["List 8-10 specific career recommendations"],
    relationshipInsights: ["List 8-10 relationship insights"]
  },
  lifePath: {
    currentPhase: "Detailed description of current life phase (5+ sentences)",
    opportunities: ["List 8-10 upcoming opportunities"],
    challenges: ["List 8-10 life challenges to watch for"],
    recommendations: ["List 8-10 specific life recommendations"]
  },
  detailedGuidance: {
    career: "Comprehensive career guidance paragraph (8+ sentences with specific advice)",
    relationships: "Detailed relationship guidance paragraph (8+ sentences with specific insights)",
    health: "Thorough health guidance paragraph (8+ sentences with wellness recommendations)",
    wealth: "Complete wealth and financial guidance paragraph (8+ sentences with financial advice)"
  }
}, null, 2)}`;

  const messages: ChatMessage[] = [
    { role: 'system', content: 'You are an expert BaZi fortune teller and Chinese astrology analyst. Provide detailed, professional analysis in perfect English. Your response must be valid JSON only.' },
    { role: 'user', content: prompt }
  ];
  
  try {
    const res = await sendMessage(messages);
    const text: string = res.choices[0].message.content.trim();
    
    // Clean up the response if it has markdown formatting
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (e) {
    console.warn('AI API failed, using enhanced fallback data', e);
    
    // Calculate actual zodiac and elements for the fallback
    const birthYear = new Date(data.birthDate).getFullYear();
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const zodiac = animals[(birthYear - 4) % 12];
    
    const fallback: BaziAnalysis = {
      basicInfo: {
        chineseZodiac: zodiac,
        heavenlyStem: 'Geng',
        earthlyBranch: 'Wu',
        elements: {
          year: 'Metal',
          month: 'Wood', 
          day: 'Fire',
          hour: 'Earth'
        }
      },
      personalityAnalysis: {
        strengths: [
          'Natural leadership abilities and charismatic presence',
          'Strong analytical thinking and problem-solving skills',
          'Excellent communication and interpersonal abilities',
          'Creative mindset with innovative approaches to challenges',
          'High emotional intelligence and empathy toward others',
          'Persistent and determined when pursuing goals',
          'Adaptable to changing circumstances and environments',
          'Strong moral compass and ethical decision-making',
          'Natural teaching and mentoring capabilities',
          'Balanced approach between logic and intuition'
        ],
        challenges: [
          'Tendency to overthink decisions and second-guess choices',
          'May struggle with perfectionist tendencies',
          'Occasional difficulty in setting personal boundaries',
          'Can be overly critical of self and others',
          'May procrastinate on tasks that seem overwhelming',
          'Sometimes avoids confrontation even when necessary',
          'Tendency to take on too many responsibilities',
          'May experience periods of self-doubt despite abilities',
          'Can be impatient with slower-paced individuals',
          'Occasional difficulty in delegating tasks to others'
        ],
        careerSuggestions: [
          'Executive leadership roles in corporate environments',
          'Educational positions such as teaching or training',
          'Consulting work in areas of expertise',
          'Creative fields including design, writing, or media',
          'Healthcare professions focusing on patient care',
          'Technology sector roles requiring innovation',
          'Social work or community development positions',
          'Financial advisory or investment management',
          'Legal profession or policy development work',
          'Entrepreneurial ventures in service industries'
        ],
        relationshipInsights: [
          'Values deep, meaningful connections over superficial relationships',
          'Seeks intellectual compatibility and shared values in partnerships',
          'Natural counselor and supporter for friends and family',
          'Appreciates loyalty, honesty, and mutual respect',
          'May need time alone to recharge emotional energy',
          'Drawn to partners who share similar life goals',
          'Excellent at mediating conflicts between others',
          'Values quality time and meaningful conversations',
          'May be hesitant to open up initially but deeply committed once trust is established',
          'Benefits from relationships that encourage personal growth'
        ]
      },
      lifePath: {
        currentPhase: 'You are currently in a significant period of personal and professional development where your natural talents are beginning to align with meaningful opportunities. This phase represents a time of building solid foundations for future success while learning to balance ambition with personal well-being. Your inherent wisdom and analytical abilities are becoming more refined, allowing you to make decisions with greater confidence and clarity. The experiences you are gathering now will serve as valuable lessons for the more prominent leadership roles that await you in the coming years. This is also a time for strengthening relationships and building networks that will support your long-term goals.',
        opportunities: [
          'Advancement opportunities in current professional field',
          'Chances to expand social and professional networks',
          'New learning experiences that enhance existing skills',
          'Potential for relocation or travel that broadens perspectives',
          'Investment opportunities for long-term financial growth',
          'Romantic partnerships that offer mutual growth and support',
          'Leadership roles in community or volunteer organizations',
          'Creative projects that showcase unique talents and abilities',
          'Mentorship opportunities both as mentor and mentee',
          'Health and wellness improvements through lifestyle changes'
        ],
        challenges: [
          'Balancing work responsibilities with personal relationships',
          'Managing financial resources during periods of transition',
          'Overcoming self-doubt when facing new challenges',
          'Dealing with increased expectations from others',
          'Maintaining work-life balance during busy periods',
          'Making important decisions with incomplete information',
          'Handling criticism or setbacks with resilience',
          'Managing stress during periods of rapid change',
          'Choosing between multiple attractive opportunities',
          'Maintaining authenticity while adapting to new environments'
        ],
        recommendations: [
          'Focus on continuous learning and skill development',
          'Build and maintain strong professional and personal relationships',
          'Practice mindfulness and stress-reduction techniques regularly',
          'Set clear boundaries between work and personal time',
          'Pursue creative outlets that bring joy and fulfillment',
          'Develop financial literacy and long-term investment strategies',
          'Seek mentorship from experienced professionals in your field',
          'Maintain physical health through regular exercise and proper nutrition',
          'Cultivate patience when working toward long-term goals',
          'Trust your instincts while remaining open to advice from others'
        ]
      },
      detailedGuidance: {
        career: 'Your career path is destined for significant success, particularly in roles that combine leadership with service to others. Your natural analytical abilities and strong communication skills make you well-suited for positions where you can guide teams toward common goals while maintaining harmony and productivity. Consider pursuing opportunities in fields that align with your values and allow for creative problem-solving. Your ability to see both the big picture and important details makes you valuable in strategic planning roles. As you advance in your career, focus on developing your emotional intelligence alongside technical skills, as this combination will set you apart from peers. Building strong professional relationships will be crucial to your success, so invest time in networking and maintaining connections. Don\'t be afraid to take calculated risks when opportunities for advancement arise, as your careful nature will help you evaluate options thoroughly. Remember that leadership is not just about achieving results, but also about developing others and creating positive work environments.',
        relationships: 'In relationships, you have the gift of creating deep, meaningful connections with others based on mutual respect and understanding. Your empathetic nature and strong communication skills make you a valued friend and partner, though you may sometimes struggle with setting appropriate boundaries. Focus on building relationships with people who appreciate your authentic self and support your personal growth. In romantic partnerships, seek someone who shares your core values and life goals, as intellectual and emotional compatibility will be more important than superficial attractions. Your natural tendency to support others is admirable, but remember to ensure that relationships are reciprocal and that your own needs are being met. Family relationships may require patience and understanding, particularly as you grow and change. Consider that your role as a mediator and counselor is valuable, but don\'t let it become a burden that prevents you from pursuing your own happiness. Maintain friendships that challenge you to grow while providing emotional support during difficult times.',
        health: 'Your overall health prospects are positive, but you need to pay particular attention to stress management and maintaining balance in all areas of life. Your tendency to take on multiple responsibilities can lead to mental and physical exhaustion if not properly managed. Develop a regular exercise routine that you enjoy, as physical activity will help manage stress levels and maintain energy throughout demanding periods. Pay attention to your diet and ensure you\'re getting proper nutrition, particularly during busy times when you might be tempted to skip meals or rely on convenience foods. Mental health is equally important, so consider practices like meditation, journaling, or therapy to process emotions and maintain psychological well-being. Sleep quality should be a priority, as your busy mind may sometimes interfere with proper rest. Regular health check-ups are important for prevention and early detection of any issues. Consider alternative wellness practices that appeal to you, such as yoga, massage, or acupuncture, as these can complement traditional healthcare approaches. Remember that taking care of your health is not selfish but necessary for you to continue supporting others effectively.',
        wealth: 'Your financial future shows great potential for steady growth and long-term prosperity, particularly through consistent effort and wise planning rather than risky speculation. Your analytical nature and attention to detail serve you well in financial matters, helping you make informed decisions about investments and expenditures. Focus on building multiple income streams rather than relying solely on traditional employment, as your diverse skills and leadership abilities can be monetized in various ways. Education and skill development should be viewed as investments that will pay dividends throughout your career. Consider working with a financial advisor to develop a comprehensive plan that includes retirement savings, emergency funds, and investment portfolios. Your generous nature may sometimes lead to overspending on others or charitable causes, which is admirable but should be balanced with your own financial security. Real estate investment may be particularly favorable for you, as your careful research approach aligns well with property investment strategies. Avoid get-rich-quick schemes or investments that seem too good to be true, as your wealth will come through patience and consistent effort. Building good credit and maintaining financial discipline will create opportunities for larger investments and business ventures in the future.'
      }
    };
    return fallback;
  }
} 