import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Download,
  Heart,
  LockKeyhole,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { ZodiacService, CompatibilityResult } from '../services/zodiacService';

const premiumModules = [
  'Full relationship dynamics report',
  'Communication and conflict patterns',
  'Love, friendship, and business timing',
  'Practical 30-day relationship plan',
  'PDF compatibility report',
  'AI follow-up questions',
];

const relationshipGuidance = [
  {
    title: 'Emotional Pattern',
    body: 'Use the score as a signal for how naturally two people regulate closeness, reassurance, and personal space. A high score does not remove the need for boundaries; a lower score means the pair needs clearer agreements.',
  },
  {
    title: 'Communication Strategy',
    body: 'The premium version should translate sign chemistry into daily behavior: what to say directly, what to slow down, and where each person may misread the other under stress.',
  },
  {
    title: 'Decision Timing',
    body: 'Relationship timing is strongest when attraction, practical life rhythm, and conflict-repair habits line up. This section frames when to deepen commitment, collaborate, or pause.',
  },
];

const premiumReportChapters = [
  {
    title: 'Relationship Map',
    body: 'A structured profile of attraction, attachment rhythm, emotional safety, and the roles each person tends to take in the connection.',
  },
  {
    title: 'Conflict Repair',
    body: 'Specific guidance for friction points: what triggers defensiveness, what each person needs to hear, and how to return to alignment after disagreement.',
  },
  {
    title: 'Life Context',
    body: 'Separate notes for romance, friendship, and business so users can understand whether the chemistry is best for intimacy, support, collaboration, or all three.',
  },
  {
    title: 'Action Plan',
    body: 'A practical 30-day plan with conversation prompts, boundaries, and timing suggestions for deepening or stabilizing the relationship.',
  },
];

const popularMatches = [
  { sign1: 'Leo', sign2: 'Aries', compatibility: 92 },
  { sign1: 'Cancer', sign2: 'Pisces', compatibility: 89 },
  { sign1: 'Libra', sign2: 'Gemini', compatibility: 87 },
  { sign1: 'Taurus', sign2: 'Virgo', compatibility: 85 },
  { sign1: 'Scorpio', sign2: 'Cancer', compatibility: 88 },
  { sign1: 'Sagittarius', sign2: 'Aquarius', compatibility: 84 },
];

const CompatibilityPage: React.FC = () => {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const zodiacSigns = useMemo(() => ZodiacService.getAllZodiacSigns(), []);
  const firstSign = zodiacSigns.find((sign) => sign.name === sign1);
  const secondSign = zodiacSigns.find((sign) => sign.name === sign2);

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
    if (score >= 80) return 'from-emerald-300 to-green-500';
    if (score >= 65) return 'from-amber-300 to-orange-500';
    if (score >= 50) return 'from-orange-300 to-red-500';
    return 'from-red-300 to-rose-600';
  };

  const getCompatibilityText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 65) return 'Strong Potential';
    if (score >= 50) return 'Workable Chemistry';
    return 'Needs Conscious Effort';
  };

  return (
    <div className="px-4 pb-16 pt-28">
      <div className="container mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
              <Heart className="h-4 w-4" />
              Compatibility Report
            </div>
            <h1 className="mb-5 text-4xl font-serif leading-tight text-white md:text-5xl">
              Relationship chemistry with a clearer upgrade path
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Compare two signs across love, friendship, and business, then unlock the deeper report for communication patterns, conflict repair, timing, and practical guidance.
            </p>
          </div>

          <div className="glass-panel p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">Report preview</p>
                <h2 className="text-xl font-semibold text-white">Compatibility Matrix</h2>
              </div>
              <div className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-200">Free Preview</div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ['Love', '82%'],
                ['Friendship', '76%'],
                ['Business', '68%'],
              ].map(([label, value]) => (
                <div key={label} className="glass-inset p-4">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel mx-auto mb-12 max-w-4xl p-5 md:p-8"
        >
          <h2 className="mb-7 text-center text-2xl font-serif text-white">Select Two Zodiac Signs</h2>
          <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-[1fr_auto_1fr]">
            <SignSelect label="First Sign" value={sign1} onChange={setSign1} signs={zodiacSigns} />
            <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-rose-300 backdrop-blur-xl">
              <Heart className="h-5 w-5" />
            </div>
            <SignSelect label="Second Sign" value={sign2} onChange={setSign2} signs={zodiacSigns} />
          </div>

          <button
            onClick={handleCalculateCompatibility}
            disabled={!sign1 || !sign2 || loading}
            className="glass-primary-button mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-indigo-950" />
                Calculating Compatibility...
              </>
            ) : (
              <>
                Calculate Compatibility
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </motion.section>

        {compatibility ? (
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-7xl"
          >
            <div className="glass-panel mb-8 p-6 text-center md:p-8">
              <div className="mb-5 flex items-center justify-center gap-5">
                <span className="text-5xl">{firstSign?.symbol}</span>
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${getCompatibilityColor(compatibility.overallCompatibility)} bg-clip-text text-5xl font-bold text-transparent`}>
                    {compatibility.overallCompatibility}%
                  </div>
                  <p className="mt-2 font-semibold text-white">{getCompatibilityText(compatibility.overallCompatibility)}</p>
                </div>
                <span className="text-5xl">{secondSign?.symbol}</span>
              </div>
              <p className="mx-auto max-w-3xl text-slate-300">{compatibility.analysis}</p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              <CompatibilityCard icon={Heart} title="Love & Romance" score={compatibility.loveCompatibility} color="text-rose-300" />
              <CompatibilityCard icon={Users} title="Friendship" score={compatibility.friendshipCompatibility} color="text-sky-300" />
              <CompatibilityCard icon={Briefcase} title="Business" score={compatibility.businessCompatibility} color="text-emerald-300" />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div className="glass-card p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="glass-inset flex h-11 w-11 items-center justify-center text-amber-300">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Professional Reading Notes</h3>
                    <p className="text-sm text-slate-400">What the free result suggests before premium depth.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {relationshipGuidance.map((item) => (
                    <div key={item.title} className="glass-inset p-4">
                      <h4 className="mb-2 font-semibold text-amber-200">{item.title}</h4>
                      <p className="text-sm leading-6 text-slate-300">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <ReportList title="Strengths" tone="green" items={compatibility.strengths} />
                <ReportList title="Challenges" tone="amber" items={compatibility.challenges} />
              </div>
            </div>

            <div className="glass-panel mb-8 p-6 md:p-8">
              <div className="mb-6 text-center">
                <div className="glass-inset mx-auto mb-4 flex h-12 w-12 items-center justify-center text-rose-300">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-2xl font-serif text-white">Relationship Advice</h3>
                <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">{compatibility.advice}</p>
              </div>
              <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {premiumReportChapters.map((chapter) => (
                  <div key={chapter.title} className="glass-card p-4 text-left">
                    <h4 className="mb-2 font-semibold text-white">{chapter.title}</h4>
                    <p className="text-sm leading-6 text-slate-300">{chapter.body}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {premiumModules.map((module) => (
                  <div key={module} className="glass-inset flex items-center gap-3 p-3">
                    <LockKeyhole className="h-4 w-4 shrink-0 text-amber-300" />
                    <span className="text-sm text-slate-200">{module}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/subscription?source=compatibility&plan=pro#plans" className="glass-primary-button inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold">
                  Unlock Full Compatibility Report
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/subscription?source=compatibility-download&plan=pro#plans" className="glass-secondary-button inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Link>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-5xl"
          >
            <div className="mb-8 text-center">
              <div className="glass-inset mb-4 inline-flex h-11 w-11 items-center justify-center text-amber-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-serif text-white">Popular Compatibility Matches</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popularMatches.map((match, index) => (
                <motion.button
                  key={`${match.sign1}-${match.sign2}`}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card glass-card-hover p-5 text-left"
                  onClick={() => {
                    setSign1(match.sign1);
                    setSign2(match.sign2);
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{zodiacSigns.find((sign) => sign.name === match.sign1)?.symbol}</span>
                      <Heart className="h-4 w-4 text-rose-300" />
                      <span className="text-3xl">{zodiacSigns.find((sign) => sign.name === match.sign2)?.symbol}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-amber-300" />
                  </div>
                  <p className="font-semibold text-white">{match.sign1} & {match.sign2}</p>
                  <p className="mt-1 text-sm text-emerald-300">{match.compatibility}% Compatible</p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        <section className="mx-auto mt-12 max-w-5xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <Shield className="h-6 w-6 shrink-0 text-amber-300" />
            <p className="text-sm leading-6 text-slate-300">
              Compatibility reports are designed as reflection and communication tools. They should help users understand patterns, not replace personal judgment or professional advice.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const SignSelect: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  signs: ReturnType<typeof ZodiacService.getAllZodiacSigns>;
}> = ({ label, value, onChange, signs }) => (
  <div>
    <label className="mb-3 block text-sm font-medium text-slate-200">{label}</label>
    <select value={value} onChange={(event) => onChange(event.target.value)} className="glass-input w-full rounded-lg px-4 py-3">
      <option value="">Select Sign</option>
      {signs.map((sign) => (
        <option key={sign.name} value={sign.name}>
          {sign.symbol} {sign.name}
        </option>
      ))}
    </select>
  </div>
);

const CompatibilityCard: React.FC<{
  icon: React.ElementType;
  title: string;
  score: number;
  color: string;
}> = ({ icon: Icon, title, score, color }) => (
  <div className="glass-card glass-card-hover p-6 text-center">
    <div className="mb-4 flex justify-center">
      <div className="glass-inset flex h-12 w-12 items-center justify-center">
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
    <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
    <div className="mb-3 text-3xl font-bold text-white">{score}%</div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-amber-400" style={{ width: `${score}%` }} />
    </div>
  </div>
);

const ReportList: React.FC<{ title: string; tone: 'green' | 'amber'; items: string[] }> = ({ title, tone, items }) => {
  const toneClass = tone === 'green' ? 'text-emerald-300' : 'text-amber-300';

  return (
    <div className="glass-card p-6">
      <h4 className={`mb-4 text-lg font-semibold ${toneClass}`}>{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${toneClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompatibilityPage;
