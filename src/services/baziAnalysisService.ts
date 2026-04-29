import { BirthData } from '../components/BirthDateForm';
import { sendMessage, ChatMessage } from './openRouterService';
import { BaziChart, calculateBaziChart } from './baziCore';

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
  const chart = calculateBaziChart(data);
  const chartForPrompt = {
    zodiac: chart.zodiac,
    dayMaster: chart.dayMaster,
    dayMasterElement: chart.dayMasterElement,
    strongestElement: chart.strongestElement,
    weakestElement: chart.weakestElement,
    elementScores: chart.elementScores,
    pillars: chart.pillars.map((pillar) => ({
      label: pillar.label,
      stem: pillar.stem,
      branch: pillar.branch,
      stemElement: pillar.stemElement,
      branchElement: pillar.branchElement,
      hiddenStems: pillar.hiddenStems,
      tenGod: pillar.tenGod,
      meaning: pillar.meaning,
    })),
    rules: chart.rules,
    notes: chart.notes,
  };

  const prompt = `Please provide a comprehensive BaZi (Four Pillars) fortune analysis based on the following structured chart data. Requirements:
  
1. Use professional English with clear explanations for all concepts
2. Provide 10-12 items for each array field; every item should be specific, chart-grounded, and at least 18 words
3. String fields should be detailed long-form report sections:
   - currentPhase: 8-10 sentences
   - detailedGuidance.career: 10-12 sentences
   - detailedGuidance.relationships: 10-12 sentences
   - detailedGuidance.health: 8-10 sentences, with a clear non-medical disclaimer
   - detailedGuidance.wealth: 10-12 sentences, with a clear non-financial-advice disclaimer
4. For each life area, explain the basis from the chart: Day Master, month pillar, Ten Gods, hidden stems, strongest element, weakest element, and visible element distribution
5. Include practical "what to do" guidance, "what to avoid", and "timing caveats" where relevant
6. Output ONLY valid JSON, no extra text
7. Be comprehensive and detailed in all sections
8. Ground the interpretation in the provided Four Pillars, Ten Gods, hidden stems, and Five Elements scores
9. Do not invent different pillars, zodiac animal, Day Master, or element scores than the structured chart data

Birth Information:
Name: ${data.name}
Gender: ${data.gender}
Birth Date: ${data.birthDate}
Birth Time: ${data.birthTime}
Birth Location: ${data.location}
Calendar Type: ${data.calendarType}
Time Accuracy: ${data.timeAccuracy}
True Solar Time Enabled: ${data.useSolarTime ? 'yes' : 'no'}
Day Boundary Rule: ${data.dayBoundaryRule}
Year Boundary Rule: ${data.yearBoundaryRule}

Structured BaZi Chart:
${JSON.stringify(chartForPrompt, null, 2)}

Please return the analysis in this exact JSON structure:
${JSON.stringify({
  basicInfo: {
    chineseZodiac: chart.zodiac,
    heavenlyStem: chart.pillars[0].stem,
    earthlyBranch: chart.pillars[0].branch,
    elements: {
      year: chart.pillars[0].stemElement,
      month: chart.pillars[1].stemElement,
      day: chart.pillars[2].stemElement,
      hour: chart.pillars[3].stemElement
    }
  },
  personalityAnalysis: {
    strengths: ["List 10-12 detailed strength points grounded in Day Master, Ten Gods, elements, and hidden stems"],
    challenges: ["List 10-12 detailed challenge areas grounded in imbalances, weak elements, and pillar interactions"],
    careerSuggestions: ["List 10-12 specific career recommendations with practical actions and chart basis"],
    relationshipInsights: ["List 10-12 relationship insights with day pillar, spouse palace, element balance, and compatibility caveats"]
  },
  lifePath: {
    currentPhase: "Detailed description of current life phase (8-10 sentences with chart basis and timing caveats)",
    opportunities: ["List 10-12 upcoming opportunities grounded in chart structure"],
    challenges: ["List 10-12 life challenges to watch for grounded in chart structure"],
    recommendations: ["List 10-12 specific life recommendations with practical actions"]
  },
  detailedGuidance: {
    career: "Comprehensive career guidance section (10-12 sentences with specific advice, chart basis, timing caveats, what to do, and what to avoid)",
    relationships: "Detailed relationship guidance section (10-12 sentences with day pillar, spouse palace, communication patterns, compatibility caveats, and practical guidance)",
    health: "Thorough non-medical wellness guidance section (8-10 sentences with element balance, stress patterns, routine suggestions, and medical disclaimer)",
    wealth: "Complete non-financial-advice wealth guidance section (10-12 sentences with Ten Gods basis, planning habits, risk management, and financial disclaimer)"
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
    return generateStructuredFallback(chart);
  }
}

const getElementTone = (chart: BaziChart) => {
  return `The chart is led by a ${chart.dayMaster} Day Master with ${chart.dayMasterElement} as the core self element. ${chart.strongestElement} is the strongest visible signal in the current weighted distribution, while ${chart.weakestElement} is the lightest signal.`;
};

const getTenGodList = (chart: BaziChart) => {
  return chart.pillars
    .filter((pillar) => pillar.label !== 'Day')
    .map((pillar) => `${pillar.label}: ${pillar.tenGod}`)
    .join('; ');
};

const generateStructuredFallback = (chart: BaziChart): BaziAnalysis => {
  const elementTone = getElementTone(chart);
  const tenGodPattern = getTenGodList(chart);
  const yearPillar = chart.pillars[0];

  return {
    basicInfo: {
      chineseZodiac: chart.zodiac,
      heavenlyStem: yearPillar.stem,
      earthlyBranch: yearPillar.branch,
      elements: {
        year: chart.pillars[0].stemElement,
        month: chart.pillars[1].stemElement,
        day: chart.pillars[2].stemElement,
        hour: chart.pillars[3].stemElement,
      },
    },
    personalityAnalysis: {
      strengths: [
        `${elementTone} This gives the reading a clearer center than a generic zodiac-only profile.`,
        `The ${chart.dayMasterElement} Day Master suggests decisions are best understood through the qualities of that element before judging career, wealth, or relationship timing.`,
        `The visible Ten Gods pattern (${tenGodPattern}) gives the chart several practical angles for describing motivation, pressure, resources, and expression.`,
        `The hidden stems show that not every tendency is obvious at first glance; several strengths may appear only in specific environments or life stages.`,
        `The ${chart.strongestElement} emphasis can become a reliable asset when it is expressed with discipline rather than excess.`,
        `The hour pillar points to long-range thinking, later-life development, and the way the person plans beyond immediate circumstances.`,
        `The month pillar gives a useful signal for public role and career rhythm, so professional choices should not be judged from personality alone.`,
        `The chart has enough structure to separate core temperament from temporary pressure, which helps avoid overreacting to short-term setbacks.`,
        `The branch and hidden-stem layers suggest the person may carry more internal resources than are immediately visible from the surface stems.`,
        `Because the reading includes weighted elements rather than only pillar labels, it can identify practical strengths that repeat across several parts of the chart.`,
        `The chart supports a reflective decision style: the person benefits from reading patterns, comparing cycles, and acting after the larger structure is clear.`,
        `When the strongest element is used in service of a clear goal, it can become a stable source of consistency, confidence, and recognizable personal style.`,
      ],
      challenges: [
        `Because ${chart.weakestElement} is the lightest signal, themes associated with that element may require more deliberate cultivation.`,
        `An overreliance on the strongest element, ${chart.strongestElement}, can narrow decision-making if the person does not consciously balance it.`,
        `The Ten Gods should be read as roles and tendencies, not fixed labels; treating them too literally can lead to rigid self-judgment.`,
        `If the recorded birth time is approximate or unknown, hour-pillar conclusions should be handled with caution.`,
        `Hidden stems may create internal contradictions between what the person shows publicly and what they need privately.`,
        `Career timing needs luck-pillar context before making strong claims about promotions, pivots, or business launches.`,
        `Relationship interpretation should include the day branch and spouse palace before reducing compatibility to zodiac signs.`,
        `Health and wealth guidance should remain reflective and practical rather than being treated as deterministic prediction.`,
        `Hidden-stem complexity can make the person appear straightforward externally while carrying layered private concerns or mixed motivations internally.`,
        `When the chart is under stress, the person may default to the easiest element pattern instead of developing the weaker but necessary response.`,
        `If the person seeks simple yes-or-no answers from the chart, they may miss the more useful guidance about timing, balance, and preparation.`,
        `Major life themes should be checked against real events and current circumstances, because the natal chart shows tendencies rather than isolated outcomes.`,
      ],
      careerSuggestions: [
        `Use the ${chart.dayMasterElement} Day Master as the base: work environments should support its natural decision style instead of constantly forcing the opposite mode.`,
        `The month pillar deserves priority for career reading because it describes social function, professional rhythm, and seasonal strength.`,
        `Roles that let the strongest element, ${chart.strongestElement}, become useful through structure, craft, or leadership may feel more sustainable.`,
        `If ${chart.weakestElement} is needed in the industry or role, build systems, partners, or habits that compensate for it.`,
        `The visible Ten Gods pattern (${tenGodPattern}) can help distinguish whether the chart leans toward output, authority, resources, wealth, or peer competition.`,
        `Avoid choosing a career only from the zodiac animal; the Four Pillars provide more actionable signals than the birth year alone.`,
        `For business decisions, compare annual timing against the current luck pillar before making major commitments.`,
        `Keep a record of important career events by year so future readings can calibrate how the chart expresses in real life.`,
        `Use hidden-stem themes to identify secondary skills that may become valuable later, especially when the career path changes or expands.`,
        `Strengthen the weakest element through training, collaborators, systems, or advisors so professional decisions are not limited by one missing mode.`,
        `When pressure rises, distinguish whether the chart is asking for output, authority, resources, wealth management, or peer cooperation before reacting.`,
        `Choose long-term opportunities that let the day master mature rather than roles that only reward short bursts of the strongest element.`,
      ],
      relationshipInsights: [
        `The day pillar should be treated as the relationship center because it holds the Day Master and the close-partnership palace.`,
        `A ${chart.dayMasterElement} Day Master often needs relationship dynamics that respect its natural way of processing pressure and support.`,
        `The hidden stems can explain why attraction, trust, and conflict may operate below the obvious surface of personality.`,
        `Compatibility should compare both charts across elements, Ten Gods, branches, and luck cycles rather than using zodiac signs alone.`,
        `The strongest element, ${chart.strongestElement}, may be attractive when balanced but tiring when exaggerated in daily life.`,
        `The weakest element, ${chart.weakestElement}, may show where the person seeks support, growth, or complementary energy from others.`,
        `Relationship timing should be read with annual branches and luck pillars before identifying important windows.`,
        `Healthy communication is especially important when the chart shows a gap between public role and private emotional needs.`,
        `The strongest element can become a relationship gift when it is expressed consciously, but it can also become a repetitive conflict pattern when overused.`,
        `Compatibility is strongest when another person supports the weaker element without suppressing the day master or exaggerating existing imbalance.`,
        `The person may need a relationship style that honors both visible pillar traits and hidden-stem needs that are harder to verbalize at first.`,
        `Important relationship choices should be read through both natal structure and current timing, because attraction and long-term stability are different questions.`,
      ],
    },
    lifePath: {
      currentPhase: `${elementTone} The current chart foundation suggests that life direction should be read from the interaction between the Day Master, the month pillar, and the weighted element distribution. The year pillar gives background and public roots, but it is not enough by itself to describe destiny. The strongest element shows where energy is easiest to access, while the weakest element shows where conscious practice may create growth. The Ten Gods pattern (${tenGodPattern}) adds another layer by showing the roles that tend to activate around work, pressure, resources, output, and relationships. A deeper forecast should next add luck pillars and annual cycles so timing can be interpreted with more confidence.`,
      opportunities: [
        `Use ${chart.strongestElement} as a practical strength while avoiding excess.`,
        `Develop habits or partnerships that strengthen ${chart.weakestElement}.`,
        'Build career plans around the month pillar instead of relying only on broad personality labels.',
        'Use the day pillar as the anchor for relationship reflection and close partnership patterns.',
        'Track annual events against the chart to improve future timing interpretation.',
        'Separate fixed chart tendencies from temporary luck-cycle pressure.',
        'Turn hidden-stem themes into self-awareness instead of treating them as contradictions.',
        'Use the Ten Gods pattern to identify whether current growth comes from output, authority, resources, wealth, or peers.',
        'Translate the strongest element into a visible skill, product, leadership style, or service that other people can recognize and trust.',
        'Use the weakest element as a development map, choosing one habit or support system that gradually brings it into daily life.',
        'Review career, relationship, and wealth decisions through the same chart structure so choices become more coherent over time.',
        'Use annual reviews to compare life events against the pillars, which makes later timing interpretation more accurate and personal.',
      ],
      challenges: [
        `Overusing ${chart.strongestElement} can create imbalance if other elements are ignored.`,
        `${chart.weakestElement} may feel less natural and therefore needs deliberate support.`,
        'Approximate birth time can weaken conclusions about the hour pillar.',
        'Year-zodiac interpretations can be too broad when separated from the full Four Pillars.',
        'Luck-cycle timing is needed before making strong forecasts about major life events.',
        'Hidden stems can make motivations layered and sometimes hard to explain quickly.',
        'Career and relationship themes should not be reduced to one isolated pillar.',
        'Practical decisions still need real-world information alongside astrology context.',
        'A strong visible pattern can create confidence, but it can also cause the person to repeat familiar strategies after circumstances have changed.',
        'The weakest element may show up as avoidance, overcompensation, or dependence on other people if it is never trained directly.',
        'Without luck-pillar timing, the report should avoid claiming exact event dates and instead describe preparation windows and themes.',
        'If the person focuses only on favorable meanings, they may miss the most useful part of the chart: where balance and discipline are needed.',
      ],
      recommendations: [
        'Use this free chart as a structured overview, then refine conclusions with luck pillars and annual cycles.',
        `Create routines that keep ${chart.strongestElement} productive rather than excessive.`,
        `Consciously cultivate ${chart.weakestElement} through environment, habits, learning, or collaborators.`,
        'Journal major events by year to calibrate the chart against lived experience.',
        'For career planning, compare the month pillar and current annual energy before committing to big moves.',
        'For relationship questions, evaluate the day branch and compatibility chart rather than zodiac alone.',
        'Treat health and wealth notes as reflection prompts, not substitute professional advice.',
        'Use follow-up questions to ask about specific pillars, Ten Gods, or element imbalances instead of broad fortune questions.',
        'Write down three repeated life patterns and compare them with the visible Ten Gods to see which role is most active.',
        'When making decisions, ask whether the choice strengthens balance or simply repeats the strongest element because it feels familiar.',
        'Use the hidden stems as prompts for deeper self-inquiry, especially around needs that are difficult to express publicly.',
        'Revisit the chart after major events so the interpretation becomes calibrated to real experience instead of remaining abstract.',
      ],
    },
    detailedGuidance: {
      career: `Career interpretation should begin with the month pillar and the visible Ten Gods pattern rather than the zodiac animal alone. In this chart, ${elementTone} The Ten Gods pattern (${tenGodPattern}) suggests that work decisions should be evaluated through role, pressure, resources, and output. The strongest element, ${chart.strongestElement}, can be used as a productive asset when the person chooses environments that reward that quality. The weakest element, ${chart.weakestElement}, should not be ignored because it may represent a skill, resource, or style that must be developed deliberately. The year pillar describes background and public roots, but the month pillar is more useful for career direction because it reflects social role and seasonal strength. The hidden stems suggest that secondary talents may appear later or under specific circumstances, so the person should not judge their career only by obvious early strengths. Practical action should include tracking which tasks create momentum, which tasks drain energy, and which collaborators compensate for weaker chart functions. What to avoid is choosing work purely because it activates the strongest element, since that may feel easy but become repetitive or narrow. A stronger strategy is to turn the strongest element into a mature professional signature while deliberately training the weakest element. Before making high-stakes career timing claims, the next step is to add luck pillars and annual cycles. This report should therefore be used as a strategic map, not a fixed job prediction.`,
      relationships: `Relationship guidance should center on the day pillar because it represents the self and close partnership palace. A ${chart.dayMasterElement} Day Master needs relationship patterns that support its natural rhythm while still balancing the overall element distribution. The strongest element, ${chart.strongestElement}, may show what the person expresses easily, while the weakest element, ${chart.weakestElement}, can show what they seek, avoid, or need to practice in close relationships. Hidden stems are important because emotional needs and conflict triggers are not always visible from the surface stem. This means the person may communicate one need openly while carrying another need more privately. Compatibility should therefore compare two full charts rather than relying on zodiac signs alone. The best relationship pattern is not simply someone who feels exciting, but someone whose chart helps balance weak areas without suppressing the day master. What to avoid is treating repeated attraction as proof of long-term harmony, because attraction and stability can come from different chart mechanics. Practical relationship work should include naming needs clearly, observing conflict cycles, and checking whether both people support each other's growth. Timing questions around marriage, reconciliation, or separation should be checked against annual cycles and luck pillars before making strong conclusions. This guidance is best used for self-awareness and communication, not as a replacement for real conversation or professional counseling when needed.`,
      health: `Health guidance from this chart should remain practical and conservative. The weighted element distribution shows where symbolic imbalance may exist, with ${chart.strongestElement} strongest and ${chart.weakestElement} weakest. This can be used as a reflection tool for routines, stress patterns, rest, movement, diet awareness, and lifestyle balance, but it is not a medical diagnosis. If physical symptoms or health concerns exist, professional medical advice should come first. The most useful astrology-based approach is to notice when life pressure causes the strongest element to become excessive or the weakest element to be neglected. A good routine should support recovery, emotional regulation, and steady energy rather than chasing extreme performance. The person should watch whether stress pushes them toward overwork, avoidance, rigidity, or scattered activity, then design habits that counter that pattern. Element-balancing guidance is best treated as symbolic self-observation, not as treatment. If the weakest element corresponds to a lifestyle area that is often ignored, the first practical step is to add one small consistent habit rather than a dramatic overhaul. This section is for wellness reflection only and should never replace medical care.`,
      wealth: `Wealth interpretation should focus on the Day Master relationship to controlled elements, visible Ten Gods, and timing cycles. This free reading can identify broad tendencies, but serious wealth timing needs luck pillars and annual cycles. The strongest element, ${chart.strongestElement}, may show where the person has easier momentum, while the weakest element, ${chart.weakestElement}, may show the missing discipline, support, or market condition that needs attention. Avoid reading wealth purely from one lucky sign or a single pillar. The practical recommendation is to align financial decisions with long-term planning, risk control, and real-world expertise. The chart can help identify whether wealth is more likely to come through expertise, output, authority, relationships, resource accumulation, or structured management, but it cannot replace financial analysis. If the person overuses the strongest element, they may become confident in familiar earning patterns while missing risk signals. If the weakest element is ignored, they may lack the system, patience, negotiation style, or external support needed to stabilize gains. A useful habit is to separate income generation, savings, investment risk, and spending decisions into different review cycles. Timing caveats matter because a favorable natal tendency can still perform poorly in an unfavorable external cycle. This section is reflective guidance only and is not financial advice; major investment, tax, or business decisions should involve qualified professionals.`,
    },
  };
};
