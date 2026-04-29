import { BaziData, DetailedBaziAnalysis } from './aiService';
import { BaziChart, calculateBaziChart } from './baziCore';

export class EnhancedBaziService {
  
  static async getDetailedBaziAnalysis(baziData: BaziData): Promise<DetailedBaziAnalysis> {
    const chart = calculateBaziChart({
      birthDate: baziData.birthDate,
      birthTime: baziData.birthTime,
      location: baziData.location,
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    return {
      careerForecast: this.generateCareerForecast(chart),
      wealthAnalysis: this.generateWealthAnalysis(chart),
      marriageDestiny: this.generateMarriageAnalysis(chart),
      healthInsights: this.generateHealthInsights(chart),
      annualForecast: this.generateAnnualForecast(chart),
      lifeOverview: this.generateLifeOverview(chart)
    };
  }

  private static getScore(chart: BaziChart, base: number, offset: number): number {
    const strongest = chart.elementScores[chart.strongestElement];
    const weakest = chart.elementScores[chart.weakestElement];
    return Math.min(98, Math.max(62, base + strongest - weakest + offset));
  }

  private static getTenGodPattern(chart: BaziChart): string {
    return chart.pillars
      .filter((pillar) => pillar.label !== 'Day')
      .map((pillar) => `${pillar.label} pillar ${pillar.tenGod}`)
      .join(', ');
  }

  private static generateCareerForecast(chart: BaziChart) {
    const tenGodPattern = this.getTenGodPattern(chart);
    
    return {
      next12Months: `Your career reading should be anchored in the month pillar, the ${chart.dayMaster} Day Master, and the visible Ten Gods pattern: ${tenGodPattern}. The chart shows ${chart.strongestElement} as the strongest weighted signal, which can become a professional advantage when it is expressed through consistent skill, service, structure, or leadership. The weakest element is ${chart.weakestElement}, so career growth should include systems, collaborators, or training that compensate for that missing mode. Over the next 12 months, the most useful approach is to treat opportunities as timing windows rather than guaranteed outcomes. Focus first on roles where your strongest element can produce visible results, then build the weaker element through deliberate habits. If you are considering a job change, business launch, or major negotiation, compare the timing against annual cycles before committing. The safest career strategy is not to chase every visible chance, but to choose opportunities that strengthen the full chart balance. Watch for periods when pressure pushes you to overuse familiar strengths and ignore the support you actually need.`,
      luckyDays: [
        "Early spring window - review career positioning and skill gaps",
        "Mid-spring window - initiate networking, interviews, or client outreach",
        "Early summer window - test a visible project or leadership responsibility",
        "Early autumn window - review compensation, contracts, and long-term structure",
        "Late autumn window - consolidate gains and document repeatable systems"
      ],
      recommendations: `Use the ${chart.dayMasterElement} Day Master as your work-style anchor, but do not let the strongest element, ${chart.strongestElement}, dominate every decision. Build a plan that turns existing strengths into measurable results and uses mentors, tools, or collaborators to support ${chart.weakestElement}. Avoid making career decisions only from excitement or short-term recognition. A strong report should next add luck pillars to identify whether the timing favors expansion, consolidation, learning, or restraint.`,
      score: this.getScore(chart, 78, 3)
    };
  }

  private static generateWealthAnalysis(chart: BaziChart) {
    return {
      overallTrend: `Wealth should be read through the Day Master, the elements it controls, visible Ten Gods, and timing cycles rather than through a single lucky sign. In this chart, ${chart.strongestElement} provides the easiest momentum, while ${chart.weakestElement} shows the area that needs structure, discipline, or outside support. This suggests wealth growth is more likely to come from repeatable systems and informed decisions than from sudden speculation. The chart favors treating money as a managed resource: income generation, reserves, investment risk, and spending should be reviewed separately. If the person overuses the strongest element, they may feel confident but overlook risk controls. If the weakest element is ignored, financial decisions may lack the missing ingredient needed for stability.`,
      windfall: `Windfall potential should be interpreted cautiously. The chart may show periods when visibility, relationships, or timing create unexpected openings, but a true windfall reading requires luck pillars and annual cycles. The more practical opportunity is to prepare for sudden openings by having clear offers, organized finances, and a disciplined decision process. When a chance appears quickly, the person should ask whether it strengthens the whole chart balance or only excites the strongest element. Unexpected money should be stabilized before it is expanded.`,
      investments: `This is not financial advice, but the chart suggests that investment behavior should prioritize risk management, patience, and alignment with real expertise. The strongest element, ${chart.strongestElement}, can show where confidence is easiest, while ${chart.weakestElement} can show where blind spots may appear. Avoid speculative decisions based only on emotion, social pressure, or a single favorable timing signal. A better approach is to define rules before acting: position size, exit conditions, review dates, and professional consultation. Major financial decisions should always be checked with qualified financial professionals.`,
      score: this.getScore(chart, 76, 1)
    };
  }

  private static generateMarriageAnalysis(chart: BaziChart) {
    return {
      romanticFortune: `Relationship reading should begin with the day pillar because it represents the self and close partnership palace. The ${chart.dayMaster} Day Master with ${chart.dayMasterElement} as the core element suggests that emotional compatibility depends on whether a partner respects this natural processing style. The strongest element, ${chart.strongestElement}, may be attractive and expressive, but it can become repetitive or overwhelming if not balanced. The weakest element, ${chart.weakestElement}, often shows what the person seeks, avoids, or needs to develop in intimate relationships. Hidden stems matter because private needs may not match the surface impression.`,
      compatibility: `Compatibility should compare two complete charts across elements, branches, Ten Gods, hidden stems, and timing cycles. Zodiac-sign matching alone is too broad for serious relationship guidance. A supportive partner may either strengthen ${chart.weakestElement} or help the person express ${chart.strongestElement} in a healthier way. Long-term harmony is more likely when both people can name needs clearly and avoid turning the strongest element into a repeated conflict pattern.`,
      bestMarriageTime: `Marriage timing should not be reduced to a fixed age or generic lucky year. The responsible next step is to compare the natal chart with luck pillars, annual branches, and the partner's chart. Favorable periods are those that support relationship stability, communication, shared resources, and emotional readiness at the same time. If a period creates attraction but not stability, it may be better for dating than formal commitment. Use this section as relationship planning context rather than a fixed prediction.`,
      score: this.getScore(chart, 80, 2)
    };
  }

  private static generateHealthInsights(chart: BaziChart) {
    return {
      potentialIssues: `Health guidance from BaZi should be handled conservatively and symbolically. The current element distribution shows ${chart.strongestElement} as strongest and ${chart.weakestElement} as weakest, which can be used to reflect on lifestyle imbalance, stress patterns, and recovery needs. It is not a diagnosis. When life pressure rises, the person may overuse the strongest element and neglect the weaker mode. This can show up as uneven routines, emotional strain, overwork, or inconsistent restoration depending on the person's real circumstances.`,
      preventiveCare: `Preventive care should focus on consistency, sleep, movement, emotional regulation, and realistic boundaries. The practical goal is to keep ${chart.strongestElement} productive rather than excessive while slowly supporting ${chart.weakestElement}. Choose simple habits that can be maintained through busy periods instead of dramatic lifestyle changes. If the birth time is uncertain, hour-pillar wellness interpretation should remain cautious.`,
      recommendations: `Use this as wellness reflection only, not medical advice. If symptoms or health concerns exist, consult qualified medical professionals. From a lifestyle perspective, track stress triggers, recovery quality, and the moments when the strongest element becomes overused. Add one small practice that supports the weakest element through environment, routine, food awareness, movement style, or emotional support. Review the pattern monthly rather than expecting immediate transformation.`,
      score: this.getScore(chart, 82, 0)
    };
  }

  private static generateAnnualForecast(chart: BaziChart) {
    const months2025 = [
      { month: "January", prediction: `Planning month: review how ${chart.strongestElement} is being used and where ${chart.weakestElement} needs support.`, score: 75 },
      { month: "February", prediction: "Relationship and networking month: observe which contacts strengthen balance rather than only excitement.", score: 82 },
      { month: "March", prediction: "Resource month: organize finances, tools, and work systems before expanding commitments.", score: 88 },
      { month: "April", prediction: "Health focus, establish good habits", score: 79 },
      { month: "May", prediction: "Travel and learning experiences", score: 85 },
      { month: "June", prediction: "Family harmony, home improvements", score: 91 },
      { month: "July", prediction: "Creative projects, artistic expression", score: 77 },
      { month: "August", prediction: "Career advancement, recognition", score: 89 },
      { month: "September", prediction: "Wealth accumulation, business success", score: 93 },
      { month: "October", prediction: "Relationship milestones, commitments", score: 86 },
      { month: "November", prediction: "Spiritual growth, introspection", score: 74 },
      { month: "December", prediction: "Goal completion, year-end achievements", score: 81 }
    ];

    const months2026 = [
      { month: "January", prediction: "Innovation and technology focus", score: 83 },
      { month: "February", prediction: "Partnership opportunities", score: 87 },
      { month: "March", prediction: "Real estate and investments", score: 90 },
      { month: "April", prediction: "Health optimization, fitness goals", score: 78 },
      { month: "May", prediction: "Educational advancement", score: 84 },
      { month: "June", prediction: "Home and family expansion", score: 92 },
      { month: "July", prediction: "Creative collaborations", score: 80 },
      { month: "August", prediction: "Leadership roles, authority", score: 88 },
      { month: "September", prediction: "Financial peak, major gains", score: 95 },
      { month: "October", prediction: "Relationship culmination", score: 89 },
      { month: "November", prediction: "Wisdom sharing, teaching", score: 76 },
      { month: "December", prediction: "Legacy building, planning ahead", score: 85 }
    ];

    return {
      year2025: months2025,
      year2026: months2026
    };
  }

  private static generateLifeOverview(chart: BaziChart) {
    return {
      overallScore: this.getScore(chart, 84, 4),
      strengthsWeaknesses: `Strengths: the ${chart.dayMaster} Day Master gives the chart a clear center, while ${chart.strongestElement} provides the most accessible momentum. Hidden stems show secondary resources that may emerge through maturity, pressure, or specific environments. Challenges: ${chart.weakestElement} needs deliberate cultivation, and the strongest element should not be allowed to dominate every decision. The person grows fastest when they understand which Ten God role is active instead of reacting only from habit.`,
      lifeThemes: `The major life theme is learning to turn natural momentum into balanced, repeatable life structure. The chart asks the person to honor the Day Master, use the month pillar for social and career direction, and develop the weakest element through practical habits. Life becomes more coherent when career, relationships, health, and wealth are read from the same structural map rather than treated as separate problems.`,
      spiritualPath: `The spiritual path is not escape from practical life; it is the refinement of repeated patterns. The person benefits from observing when ${chart.strongestElement} becomes excessive and when ${chart.weakestElement} is avoided. Practices that build rhythm, honesty, and balanced action will usually be more useful than dramatic transformation. The chart supports steady self-knowledge over fatalistic prediction.`
    };
  }
}
