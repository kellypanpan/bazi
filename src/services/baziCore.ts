export type HeavenlyStem =
  | 'Jia'
  | 'Yi'
  | 'Bing'
  | 'Ding'
  | 'Wu'
  | 'Ji'
  | 'Geng'
  | 'Xin'
  | 'Ren'
  | 'Gui';

export type EarthlyBranch =
  | 'Zi'
  | 'Chou'
  | 'Yin'
  | 'Mao'
  | 'Chen'
  | 'Si'
  | 'Wu'
  | 'Wei'
  | 'Shen'
  | 'You'
  | 'Xu'
  | 'Hai';

export type FiveElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type Polarity = 'Yang' | 'Yin';

export type BaziInput = {
  birthDate: string;
  birthTime: string;
  location: string;
  calendarType?: 'solar' | 'lunar';
  isLeapMonth?: boolean;
  timeAccuracy?: 'exact' | 'approximate' | 'unknown';
  useSolarTime?: boolean;
  dayBoundaryRule?: 'midnight' | 'zi-hour';
  yearBoundaryRule?: 'lichun' | 'lunar-new-year';
};

export type BaziPillar = {
  label: 'Year' | 'Month' | 'Day' | 'Hour';
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  stemElement: FiveElement;
  branchElement: FiveElement;
  polarity: Polarity;
  hiddenStems: HeavenlyStem[];
  tenGod: string;
  meaning: string;
};

export type BaziChart = {
  zodiac: string;
  dayMaster: HeavenlyStem;
  dayMasterElement: FiveElement;
  pillars: BaziPillar[];
  elementScores: Record<FiveElement, number>;
  strongestElement: FiveElement;
  weakestElement: FiveElement;
  rules: string[];
  notes: string[];
};

const STEMS: HeavenlyStem[] = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const BRANCHES: EarthlyBranch[] = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
const ZODIACS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

const STEM_ELEMENT: Record<HeavenlyStem, FiveElement> = {
  Jia: 'Wood',
  Yi: 'Wood',
  Bing: 'Fire',
  Ding: 'Fire',
  Wu: 'Earth',
  Ji: 'Earth',
  Geng: 'Metal',
  Xin: 'Metal',
  Ren: 'Water',
  Gui: 'Water',
};

const STEM_POLARITY: Record<HeavenlyStem, Polarity> = {
  Jia: 'Yang',
  Yi: 'Yin',
  Bing: 'Yang',
  Ding: 'Yin',
  Wu: 'Yang',
  Ji: 'Yin',
  Geng: 'Yang',
  Xin: 'Yin',
  Ren: 'Yang',
  Gui: 'Yin',
};

const BRANCH_ELEMENT: Record<EarthlyBranch, FiveElement> = {
  Zi: 'Water',
  Chou: 'Earth',
  Yin: 'Wood',
  Mao: 'Wood',
  Chen: 'Earth',
  Si: 'Fire',
  Wu: 'Fire',
  Wei: 'Earth',
  Shen: 'Metal',
  You: 'Metal',
  Xu: 'Earth',
  Hai: 'Water',
};

const HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  Zi: ['Gui'],
  Chou: ['Ji', 'Gui', 'Xin'],
  Yin: ['Jia', 'Bing', 'Wu'],
  Mao: ['Yi'],
  Chen: ['Wu', 'Yi', 'Gui'],
  Si: ['Bing', 'Geng', 'Wu'],
  Wu: ['Ding', 'Ji'],
  Wei: ['Ji', 'Ding', 'Yi'],
  Shen: ['Geng', 'Ren', 'Wu'],
  You: ['Xin'],
  Xu: ['Wu', 'Xin', 'Ding'],
  Hai: ['Ren', 'Jia'],
};

const GENERATES: Record<FiveElement, FiveElement> = {
  Wood: 'Fire',
  Fire: 'Earth',
  Earth: 'Metal',
  Metal: 'Water',
  Water: 'Wood',
};

const CONTROLS: Record<FiveElement, FiveElement> = {
  Wood: 'Earth',
  Earth: 'Water',
  Water: 'Fire',
  Fire: 'Metal',
  Metal: 'Wood',
};

const PILLAR_MEANINGS: Record<BaziPillar['label'], string> = {
  Year: 'Family background, early environment, and public-facing roots',
  Month: 'Career pattern, social role, and seasonal strength',
  Day: 'Core self, spouse palace, and close relationship style',
  Hour: 'Long-term vision, children palace, and later-life themes',
};

const mod = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

const getYearStemIndex = (year: number) => mod(year - 4, 10);
const getYearBranchIndex = (year: number) => mod(year - 4, 12);

const getApproxSolarMonthBranchIndex = (month: number) => {
  const monthBranches: EarthlyBranch[] = ['Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai', 'Zi'];
  return BRANCHES.indexOf(monthBranches[month - 1]);
};

const getMonthStemIndex = (yearStemIndex: number, monthBranchIndex: number) => {
  const yinMonthStemStartByYearStem = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const yinBranchIndex = BRANCHES.indexOf('Yin');
  return mod(yinMonthStemStartByYearStem[yearStemIndex] + (monthBranchIndex - yinBranchIndex), 10);
};

const getJulianDayNumber = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
};

const getDayCycleIndex = (date: Date) => {
  const referenceJdn = getJulianDayNumber(new Date(1984, 1, 2));
  return mod(getJulianDayNumber(date) - referenceJdn, 60);
};

const getHourBranchIndex = (hour: number) => {
  if (hour >= 23 || hour < 1) return BRANCHES.indexOf('Zi');
  return Math.floor((hour + 1) / 2);
};

const getHourStemIndex = (dayStemIndex: number, hourBranchIndex: number) => {
  const ziHourStemStartByDayStem = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  return mod(ziHourStemStartByDayStem[dayStemIndex] + hourBranchIndex, 10);
};

const getTenGod = (dayMaster: HeavenlyStem, targetStem: HeavenlyStem) => {
  if (dayMaster === targetStem) return 'Self';

  const dayElement = STEM_ELEMENT[dayMaster];
  const targetElement = STEM_ELEMENT[targetStem];
  const samePolarity = STEM_POLARITY[dayMaster] === STEM_POLARITY[targetStem];

  if (targetElement === dayElement) return samePolarity ? 'Friend' : 'Rob Wealth';
  if (GENERATES[dayElement] === targetElement) return samePolarity ? 'Eating God' : 'Hurting Officer';
  if (GENERATES[targetElement] === dayElement) return samePolarity ? 'Indirect Resource' : 'Direct Resource';
  if (CONTROLS[dayElement] === targetElement) return samePolarity ? 'Indirect Wealth' : 'Direct Wealth';
  if (CONTROLS[targetElement] === dayElement) return samePolarity ? 'Seven Killings' : 'Direct Officer';

  return 'Auxiliary';
};

const createPillar = (
  label: BaziPillar['label'],
  stemIndex: number,
  branchIndex: number,
  dayMaster: HeavenlyStem
): BaziPillar => {
  const stem = STEMS[mod(stemIndex, STEMS.length)];
  const branch = BRANCHES[mod(branchIndex, BRANCHES.length)];

  return {
    label,
    stem,
    branch,
    stemElement: STEM_ELEMENT[stem],
    branchElement: BRANCH_ELEMENT[branch],
    polarity: STEM_POLARITY[stem],
    hiddenStems: HIDDEN_STEMS[branch],
    tenGod: label === 'Day' ? 'Day Master' : getTenGod(dayMaster, stem),
    meaning: PILLAR_MEANINGS[label],
  };
};

const getElementScores = (pillars: BaziPillar[]) => {
  const scores: Record<FiveElement, number> = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0,
  };

  pillars.forEach((pillar) => {
    scores[pillar.stemElement] += 2;
    scores[pillar.branchElement] += 2;
    pillar.hiddenStems.forEach((hiddenStem) => {
      scores[STEM_ELEMENT[hiddenStem]] += 1;
    });
  });

  return scores;
};

const getElementExtreme = (scores: Record<FiveElement, number>, direction: 'max' | 'min') => {
  const entries = Object.entries(scores) as [FiveElement, number][];
  return entries.reduce((selected, current) => {
    if (direction === 'max') return current[1] > selected[1] ? current : selected;
    return current[1] < selected[1] ? current : selected;
  })[0];
};

export const calculateBaziChart = (input: BaziInput): BaziChart => {
  const date = new Date(input.birthDate);
  const [hourText] = input.birthTime.split(':');
  const birthHour = Number.parseInt(hourText || '12', 10);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearStemIndex = getYearStemIndex(year);
  const yearBranchIndex = getYearBranchIndex(year);
  const monthBranchIndex = getApproxSolarMonthBranchIndex(month);
  const monthStemIndex = getMonthStemIndex(yearStemIndex, monthBranchIndex);
  const dayCycleIndex = getDayCycleIndex(date);
  const dayStemIndex = mod(dayCycleIndex, 10);
  const dayBranchIndex = mod(dayCycleIndex, 12);
  const hourBranchIndex = getHourBranchIndex(birthHour);
  const hourStemIndex = getHourStemIndex(dayStemIndex, hourBranchIndex);
  const dayMaster = STEMS[dayStemIndex];

  const pillars = [
    createPillar('Year', yearStemIndex, yearBranchIndex, dayMaster),
    createPillar('Month', monthStemIndex, monthBranchIndex, dayMaster),
    createPillar('Day', dayStemIndex, dayBranchIndex, dayMaster),
    createPillar('Hour', hourStemIndex, hourBranchIndex, dayMaster),
  ];

  const elementScores = getElementScores(pillars);
  const notes = [
    'This front-end chart engine uses deterministic stem-branch rules for a structured reading foundation.',
    'Solar terms, true solar time correction, and lunar conversion are represented as rule settings here and should be backed by a strict calendar engine before final paid interpretation.',
  ];

  return {
    zodiac: ZODIACS[yearBranchIndex],
    dayMaster,
    dayMasterElement: STEM_ELEMENT[dayMaster],
    pillars,
    elementScores,
    strongestElement: getElementExtreme(elementScores, 'max'),
    weakestElement: getElementExtreme(elementScores, 'min'),
    rules: [
      input.calendarType === 'lunar' ? 'Lunar calendar input' : 'Solar calendar input',
      input.isLeapMonth ? 'Leap lunar month selected' : 'No leap month',
      input.useSolarTime ? 'True solar time enabled' : 'Clock time mode',
      input.dayBoundaryRule === 'midnight' ? 'Midnight day boundary' : 'Zi hour day boundary',
      input.yearBoundaryRule === 'lunar-new-year' ? 'Lunar New Year boundary' : 'Li Chun year boundary',
      input.timeAccuracy === 'unknown' ? 'Birth time unknown' : `${input.timeAccuracy ?? 'exact'} birth time`,
    ],
    notes,
  };
};
