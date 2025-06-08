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

  // Helper function to convert MM/DD/YY to YYYY-MM-DD
  const convertToISODate = (mmddyy: string): string => {
    if (!mmddyy || mmddyy.length < 8) return '';
    
    const parts = mmddyy.split('/');
    if (parts.length !== 3) return '';
    
    const [month, day, year] = parts;
    
    // Convert YY to YYYY (assume years 00-30 are 20xx, 31-99 are 19xx)
    let fullYear = parseInt(year);
    if (fullYear <= 30) {
      fullYear += 2000;
    } else if (fullYear <= 99) {
      fullYear += 1900;
    } else if (fullYear < 1900) {
      fullYear += 2000;
    }
    
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Helper function to validate MM/DD/YY format
  const validateDateFormat = (dateStr: string): boolean => {
    const mmddyyRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{2}|\d{4})$/;
    if (!mmddyyRegex.test(dateStr)) return false;
    
    const [month, day, year] = dateStr.split('/').map(num => parseInt(num));
    
    // Basic date validation
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    // Convert YY to full year for validation
    let fullYear = year;
    if (year <= 30) {
      fullYear += 2000;
    } else if (year <= 99) {
      fullYear += 1900;
    }
    
    // Check if date is not in the future
    const inputDate = new Date(fullYear, month - 1, day);
    const today = new Date();
    if (inputDate > today) return false;
    
    // Check if date is reasonable (not before 1900)
    if (fullYear < 1900) return false;
    
    return true;
  };

  // Format input as user types MM/DD/YY
  const formatDateInput = (value: string): string => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Format as MM/DD/YY
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'Please enter your birth date';
    } else if (!validateDateFormat(formData.birthDate)) {
      newErrors.birthDate = 'Please enter a valid date in MM/DD/YY format';
    }
    if (!formData.birthTime) {
      newErrors.birthTime = 'Please select your birth time';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your birth location';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert MM/DD/YY to YYYY-MM-DD before submitting
    const isoDate = convertToISODate(formData.birthDate);
    
    onSubmit({
      ...formData,
      birthDate: isoDate
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Special handling for birth date formatting
    if (name === 'birthDate') {
      processedValue = formatDateInput(value);
      // Limit to MM/DD/YYYY format (10 characters)
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Enter Your Birth Information</h3>
        <p className="text-indigo-300">Accurate birth details help provide more precise analysis</p>
      </div>

      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <User className="inline-block w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.name ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="Enter your full name"
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

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Gender
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
              Male
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
              Female
            </button>
          </div>
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            Birth Date
          </label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.birthDate ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="MM/DD/YY (e.g., 12/25/95)"
            maxLength={10}
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
            Enter your birth date in MM/DD/YY format (e.g., 12/25/95)
          </p>
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Clock className="inline-block w-4 h-4 mr-2" />
            Birth Time
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
            Precise birth time is crucial for accurate chart analysis. If unsure, select approximate time.
          </p>
        </div>

        {/* Birth Location */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            Birth Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.location ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="e.g., New York, London, Tokyo"
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
            Birth location is used to calculate geographical coordinates, affecting time accuracy
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-900 transition-all shadow-lg"
      >
        Get My Fortune Reading
      </motion.button>

      <div className="text-center">
        <p className="text-xs text-indigo-400">
          Your personal information is securely protected and used only for fortune analysis
        </p>
      </div>
    </motion.form>
  );
};

export default BirthDateForm;