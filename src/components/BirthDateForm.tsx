import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Clock, MapPin, Settings2, User } from 'lucide-react';
import { useI18n } from '../i18n';

export type BirthData = {
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthTime: string;
  location: string;
  calendarType: 'solar' | 'lunar';
  isLeapMonth: boolean;
  timeAccuracy: 'exact' | 'approximate' | 'unknown';
  useSolarTime: boolean;
  dayBoundaryRule: 'midnight' | 'zi-hour';
  yearBoundaryRule: 'lichun' | 'lunar-new-year';
};

interface BirthDateFormProps {
  onSubmit: (data: BirthData) => void;
}

type FormErrors = Partial<Record<keyof BirthData, string>>;

const defaultFormData: BirthData = {
  name: '',
  gender: 'male',
  birthDate: '',
  birthTime: '',
  location: '',
  calendarType: 'solar',
  isLeapMonth: false,
  timeAccuracy: 'exact',
  useSolarTime: true,
  dayBoundaryRule: 'zi-hour',
  yearBoundaryRule: 'lichun',
};

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BirthData>(defaultFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { pick } = useI18n();

  const text = pick({
    en: {
      eyebrow: 'Birth Data',
      title: 'Enter Your Birth Information',
      intro: 'Accurate date, time, and location help the chart handle hour pillars, time zone context, and rule settings more transparently.',
      name: 'Full Name',
      namePlaceholder: 'Enter your name',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      birthDate: 'Birth Date',
      dateHint: 'Use your recorded birth date. Lunar conversion can be refined in the advanced settings below.',
      birthTime: 'Birth Time',
      timeHint: 'Unknown time uses noon as a neutral placeholder and marks the hour pillar as less certain.',
      location: 'Birth Location',
      locationPlaceholder: 'e.g., Shanghai, New York, London',
      advanced: 'Advanced Chart Settings',
      advancedHint: 'These rules improve transparency for BaZi calculations.',
      advancedSummary: 'Solar calendar, true solar time, Zi hour, Li Chun',
      calendarType: 'Calendar Type',
      solar: 'Solar',
      lunar: 'Lunar',
      timeAccuracy: 'Time Accuracy',
      exact: 'Exact time',
      approximate: 'Approximate time',
      unknown: 'Unknown time',
      trueSolarTime: 'Use true solar time',
      trueSolarTimeHint: 'Recommended when birth city is available.',
      leapMonth: 'Lunar leap month',
      leapMonthHint: 'Only applies when lunar calendar is selected.',
      dayBoundary: 'Day Boundary',
      ziHour: 'Zi hour boundary',
      midnight: 'Midnight boundary',
      yearBoundary: 'Year Boundary',
      liChun: 'Li Chun boundary',
      lunarNewYear: 'Lunar New Year boundary',
      submit: 'Generate My BaZi Chart',
      privacy: 'Your information is used to generate the reading in this session. For sensitive decisions, treat astrology as reflection and planning context.',
      errors: {
        name: 'Please enter your name',
        birthDate: 'Please enter your birth date',
        validDate: 'Please enter a valid date in MM/DD/YYYY format',
        birthTime: 'Please select your birth time or mark it as unknown',
        location: 'Please enter your birth location',
      },
    },
    'zh-CN': {
      eyebrow: '出生资料',
      title: '输入你的出生信息',
      intro: '准确的日期、时间和出生地有助于处理时柱、时区背景和排盘规则。',
      name: '姓名',
      namePlaceholder: '输入你的姓名',
      gender: '性别',
      male: '男',
      female: '女',
      birthDate: '出生日期',
      dateHint: '请使用记录中的出生日期。农历转换可在高级设置中继续细化。',
      birthTime: '出生时间',
      timeHint: '若时间未知，系统会以中午作为中性占位，并标记时柱可信度较低。',
      location: '出生地点',
      locationPlaceholder: '例如：上海、纽约、伦敦',
      advanced: '高级排盘设置',
      advancedHint: '这些规则用于提升八字计算的透明度。',
      advancedSummary: '阳历、真太阳时、子时换日、立春换年',
      calendarType: '历法类型',
      solar: '阳历',
      lunar: '农历',
      timeAccuracy: '时间精确度',
      exact: '准确时间',
      approximate: '大概时间',
      unknown: '时间未知',
      trueSolarTime: '使用真太阳时',
      trueSolarTimeHint: '已知出生城市时建议开启。',
      leapMonth: '农历闰月',
      leapMonthHint: '仅在选择农历时生效。',
      dayBoundary: '换日规则',
      ziHour: '子时换日',
      midnight: '午夜换日',
      yearBoundary: '换年规则',
      liChun: '立春换年',
      lunarNewYear: '春节换年',
      submit: '生成我的八字命盘',
      privacy: '你的信息仅用于本次生成解读。涉及重要决策时，请把命理作为参考和规划背景。',
      errors: {
        name: '请输入姓名',
        birthDate: '请输入出生日期',
        validDate: '请输入有效日期，格式为 MM/DD/YYYY',
        birthTime: '请选择出生时间，或标记为时间未知',
        location: '请输入出生地点',
      },
    },
    'zh-TW': {
      eyebrow: '出生資料',
      title: '輸入你的出生資訊',
      intro: '準確的日期、時間和出生地有助於處理時柱、時區背景和排盤規則。',
      name: '姓名',
      namePlaceholder: '輸入你的姓名',
      gender: '性別',
      male: '男',
      female: '女',
      birthDate: '出生日期',
      dateHint: '請使用記錄中的出生日期。農曆轉換可在進階設定中繼續細化。',
      birthTime: '出生時間',
      timeHint: '若時間未知，系統會以中午作為中性佔位，並標記時柱可信度較低。',
      location: '出生地點',
      locationPlaceholder: '例如：上海、紐約、倫敦',
      advanced: '進階排盤設定',
      advancedHint: '這些規則用於提升八字計算的透明度。',
      advancedSummary: '陽曆、真太陽時、子時換日、立春換年',
      calendarType: '曆法類型',
      solar: '陽曆',
      lunar: '農曆',
      timeAccuracy: '時間精確度',
      exact: '準確時間',
      approximate: '大概時間',
      unknown: '時間未知',
      trueSolarTime: '使用真太陽時',
      trueSolarTimeHint: '已知出生城市時建議開啟。',
      leapMonth: '農曆閏月',
      leapMonthHint: '僅在選擇農曆時生效。',
      dayBoundary: '換日規則',
      ziHour: '子時換日',
      midnight: '午夜換日',
      yearBoundary: '換年規則',
      liChun: '立春換年',
      lunarNewYear: '春節換年',
      submit: '生成我的八字命盤',
      privacy: '你的資訊僅用於本次生成解讀。涉及重要決策時，請把命理作為參考和規劃背景。',
      errors: {
        name: '請輸入姓名',
        birthDate: '請輸入出生日期',
        validDate: '請輸入有效日期，格式為 MM/DD/YYYY',
        birthTime: '請選擇出生時間，或標記為時間未知',
        location: '請輸入出生地點',
      },
    },
  });

  const convertToISODate = (mmddyy: string): string => {
    const parts = mmddyy.split('/');
    if (parts.length !== 3) return '';

    const [month, day, year] = parts;
    let fullYear = Number.parseInt(year, 10);

    if (fullYear <= 30) {
      fullYear += 2000;
    } else if (fullYear <= 99) {
      fullYear += 1900;
    }

    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const validateDateFormat = (dateStr: string): boolean => {
    const mmddyyRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{2}|\d{4})$/;
    if (!mmddyyRegex.test(dateStr)) return false;

    const [month, day, year] = dateStr.split('/').map((num) => Number.parseInt(num, 10));
    let fullYear = year;
    if (year <= 30) {
      fullYear += 2000;
    } else if (year <= 99) {
      fullYear += 1900;
    }

    if (fullYear < 1900) return false;

    const inputDate = new Date(fullYear, month - 1, day);
    const isSameDate =
      inputDate.getFullYear() === fullYear &&
      inputDate.getMonth() === month - 1 &&
      inputDate.getDate() === day;

    if (!isSameDate) return false;
    return inputDate <= new Date();
  };

  const formatDateInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = text.errors.name;
    }
    if (!formData.birthDate) {
      newErrors.birthDate = text.errors.birthDate;
    } else if (!validateDateFormat(formData.birthDate)) {
      newErrors.birthDate = text.errors.validDate;
    }
    if (formData.timeAccuracy !== 'unknown' && !formData.birthTime) {
      newErrors.birthTime = text.errors.birthTime;
    }
    if (!formData.location.trim()) {
      newErrors.location = text.errors.location;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      birthDate: convertToISODate(formData.birthDate),
      birthTime: formData.timeAccuracy === 'unknown' ? '12:00' : formData.birthTime,
    });
  };

  const updateField = <K extends keyof BirthData>(name: K, value: BirthData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof BirthData;
    const processedValue = name === 'birthDate' ? formatDateInput(value).slice(0, 10) : value;
    updateField(key, processedValue as BirthData[typeof key]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass-panel space-y-6 border-amber-300/10 p-5 md:p-6"
    >
      <div className="border-b border-white/10 pb-4">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
          {text.eyebrow}
        </p>
        <h3 className="text-2xl font-semibold text-white">{text.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {text.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            <User className="mr-2 inline-block h-4 w-4" />
            {text.name}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleTextInputChange}
            className={`w-full rounded-md border px-4 py-3 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500 bg-red-950/25 focus:ring-red-500'
                : 'glass-input'
            }`}
            placeholder={text.namePlaceholder}
          />
          {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-white">{text.gender}</label>
          <div className="grid grid-cols-2 gap-3">
            {(['male', 'female'] as const).map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => updateField('gender', gender)}
                className={`rounded-md px-4 py-3 font-medium capitalize transition-all ${
                  formData.gender === gender
                    ? 'glass-primary-button'
                    : 'glass-secondary-button'
                }`}
              >
                {gender === 'male' ? text.male : text.female}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            <Calendar className="mr-2 inline-block h-4 w-4" />
            {text.birthDate}
          </label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleTextInputChange}
            className={`w-full rounded-md border px-4 py-3 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
              errors.birthDate
                ? 'border-red-500 bg-red-950/25 focus:ring-red-500'
                : 'glass-input'
            }`}
            placeholder="MM/DD/YYYY"
            maxLength={10}
          />
          {errors.birthDate && <p className="mt-2 text-sm text-red-400">{errors.birthDate}</p>}
          <p className="mt-2 text-xs text-slate-500">
            {text.dateHint}
          </p>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            <Clock className="mr-2 inline-block h-4 w-4" />
            {text.birthTime}
          </label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleTextInputChange}
            disabled={formData.timeAccuracy === 'unknown'}
            className={`w-full rounded-md border px-4 py-3 text-white transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-55 ${
              errors.birthTime
                ? 'border-red-500 bg-red-950/25 focus:ring-red-500'
                : 'glass-input'
            }`}
            style={{ colorScheme: 'dark' }}
          />
          {errors.birthTime && <p className="mt-2 text-sm text-red-400">{errors.birthTime}</p>}
          <p className="mt-2 text-xs text-slate-500">
            {text.timeHint}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-3 block text-sm font-medium text-white">
            <MapPin className="mr-2 inline-block h-4 w-4" />
            {text.location}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleTextInputChange}
            className={`w-full rounded-md border px-4 py-3 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
              errors.location
                ? 'border-red-500 bg-red-950/25 focus:ring-red-500'
                : 'glass-input'
            }`}
            placeholder={text.locationPlaceholder}
          />
          {errors.location && <p className="mt-2 text-sm text-red-400">{errors.location}</p>}
        </div>
      </div>

      <div className="rounded-lg border border-white/15 bg-white/[0.06] p-4 shadow-xl shadow-black/15 backdrop-blur-2xl md:p-5">
        <button
          type="button"
          onClick={() => setShowAdvanced((current) => !current)}
          className="flex w-full items-center gap-3 text-left"
          aria-expanded={showAdvanced}
        >
            <div className="glass-inset flex h-10 w-10 items-center justify-center text-amber-300">
            <Settings2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-white">{text.advanced}</h4>
            <p className="truncate text-sm text-slate-500">
              {showAdvanced ? text.advancedHint : text.advancedSummary}
            </p>
          </div>
          <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>

        {showAdvanced && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-5 grid grid-cols-1 gap-4 overflow-hidden border-t border-white/10 pt-5 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{text.calendarType}</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'solar', label: text.solar },
                { value: 'lunar', label: text.lunar },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('calendarType', option.value as BirthData['calendarType'])}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    formData.calendarType === option.value
                      ? 'glass-primary-button'
                      : 'glass-secondary-button'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{text.timeAccuracy}</label>
            <select
              value={formData.timeAccuracy}
              onChange={(event) => updateField('timeAccuracy', event.target.value as BirthData['timeAccuracy'])}
              className="glass-input w-full rounded-md px-4 py-3 focus:outline-none"
            >
              <option value="exact">{text.exact}</option>
              <option value="approximate">{text.approximate}</option>
              <option value="unknown">{text.unknown}</option>
            </select>
          </div>

          <label className="glass-inset flex items-start gap-3 p-3">
            <input
              type="checkbox"
              checked={formData.useSolarTime}
              onChange={(event) => updateField('useSolarTime', event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
            />
            <span>
              <span className="block text-sm font-medium text-white">{text.trueSolarTime}</span>
              <span className="text-xs leading-5 text-slate-400">{text.trueSolarTimeHint}</span>
            </span>
          </label>

          <label className="glass-inset flex items-start gap-3 p-3">
            <input
              type="checkbox"
              checked={formData.isLeapMonth}
              disabled={formData.calendarType !== 'lunar'}
              onChange={(event) => updateField('isLeapMonth', event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500 disabled:opacity-40"
            />
            <span>
              <span className="block text-sm font-medium text-white">{text.leapMonth}</span>
              <span className="text-xs leading-5 text-slate-400">{text.leapMonthHint}</span>
            </span>
          </label>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{text.dayBoundary}</label>
            <select
              value={formData.dayBoundaryRule}
              onChange={(event) => updateField('dayBoundaryRule', event.target.value as BirthData['dayBoundaryRule'])}
              className="glass-input w-full rounded-md px-4 py-3 focus:outline-none"
            >
              <option value="zi-hour">{text.ziHour}</option>
              <option value="midnight">{text.midnight}</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{text.yearBoundary}</label>
            <select
              value={formData.yearBoundaryRule}
              onChange={(event) => updateField('yearBoundaryRule', event.target.value as BirthData['yearBoundaryRule'])}
              className="glass-input w-full rounded-md px-4 py-3 focus:outline-none"
            >
              <option value="lichun">{text.liChun}</option>
              <option value="lunar-new-year">{text.lunarNewYear}</option>
            </select>
          </div>
        </motion.div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="glass-primary-button w-full rounded-md px-6 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        {text.submit}
      </motion.button>

      <p className="text-center text-xs leading-5 text-slate-500">
        {text.privacy}
      </p>
    </motion.form>
  );
};

export default BirthDateForm;
