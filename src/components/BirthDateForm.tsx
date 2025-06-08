import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

export interface FormData {
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthTime: string;
  location: string;
}

interface BirthDateFormProps {
  onSubmit: (data: FormData) => void;
}

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '',
    location: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = '请选择您的出生日期';
    }
    if (!formData.birthTime) {
      newErrors.birthTime = '请选择您的出生时间';
    }
    if (!formData.location.trim()) {
      newErrors.location = '请输入您的出生地点';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleGenderChange = (gender: 'male' | 'female') => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  // 获取当前日期作为最大日期（不能选择未来日期）
  const today = new Date().toISOString().split('T')[0];
  // 设置最小年份为1900年
  const minDate = '1900-01-01';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">填写您的生辰信息</h3>
        <p className="text-indigo-300">准确的出生信息有助于更精准的分析</p>
      </div>

      <div className="space-y-6">
        {/* 姓名输入 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <User className="inline-block w-4 h-4 mr-2" />
            姓名
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.name ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="请输入您的姓名"
          />
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* 性别选择 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            性别
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                formData.gender === 'male'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-indigo-800 bg-opacity-50 text-indigo-300 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              男
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                formData.gender === 'female'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-indigo-800 bg-opacity-50 text-indigo-300 hover:bg-indigo-700 hover:bg-opacity-50'
              }`}
            >
              女
            </button>
          </div>
        </div>

        {/* 出生日期 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            出生日期
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            min={minDate}
            max={today}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.birthDate ? 'border-red-500' : 'border-indigo-600'
            } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            style={{
              colorScheme: 'dark'
            }}
          />
          {errors.birthDate && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400"
            >
              {errors.birthDate}
            </motion.p>
          )}
          <p className="mt-2 text-xs text-indigo-300">
            请选择农历或阳历出生日期，系统会自动处理转换
          </p>
        </div>

        {/* 出生时间 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Clock className="inline-block w-4 h-4 mr-2" />
            出生时间
          </label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.birthTime ? 'border-red-500' : 'border-indigo-600'
            } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            style={{
              colorScheme: 'dark'
            }}
          />
          {errors.birthTime && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400"
            >
              {errors.birthTime}
            </motion.p>
          )}
          <p className="mt-2 text-xs text-indigo-300">
            精确的出生时间对命盘分析非常重要，如不确定可选择大概时间
          </p>
        </div>

        {/* 出生地点 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            出生地点
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.location ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="例如：北京市、上海市、广州市"
          />
          {errors.location && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400"
            >
              {errors.location}
            </motion.p>
          )}
          <p className="mt-2 text-xs text-indigo-300">
            出生地点用于计算地理经纬度，影响时辰的准确性
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-900 transition-all shadow-lg"
      >
        开始分析我的命盘
      </motion.button>

      <div className="text-center">
        <p className="text-xs text-indigo-400">
          您的个人信息将被安全保护，仅用于命理分析
        </p>
      </div>
    </motion.form>
  );
};

export default BirthDateForm;