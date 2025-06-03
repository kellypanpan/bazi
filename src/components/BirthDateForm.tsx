import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';

export interface FormData {
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthTime: string;
}

interface BirthDateFormProps {
  onSubmit: (data: FormData) => void;
}

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!selectedDate) {
      newErrors.birthDate = 'Please select your birth date';
    }
    if (!selectedTime) {
      newErrors.birthTime = 'Please select your birth time';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedDate = selectedDate?.toISOString().split('T')[0] || '';
    const formattedTime = selectedTime?.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) || '';

    onSubmit({
      ...formData,
      birthDate: formattedDate,
      birthTime: formattedTime
    });
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <User className="inline-block w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.name ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                formData.gender === 'male'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-800 bg-opacity-50 text-indigo-300'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                formData.gender === 'female'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-800 bg-opacity-50 text-indigo-300'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            Birth Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              if (errors.birthDate) {
                setErrors(prev => ({ ...prev, birthDate: undefined }));
              }
            }}
            dateFormat="MMMM d, yyyy"
            className={`w-full px-4 py-2 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.birthDate ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholderText="Select your birth date"
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-400">{errors.birthDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Clock className="inline-block w-4 h-4 mr-2" />
            Birth Time
          </label>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => {
              setSelectedTime(time);
              if (errors.birthTime) {
                setErrors(prev => ({ ...prev, birthTime: undefined }));
              }
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className={`w-full px-4 py-2 rounded-lg bg-indigo-800 bg-opacity-50 border ${
              errors.birthTime ? 'border-red-500' : 'border-indigo-600'
            } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholderText="Select your birth time"
          />
          {errors.birthTime && (
            <p className="mt-1 text-sm text-red-400">{errors.birthTime}</p>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-900 transition-colors"
      >
        Get Your Reading
      </motion.button>
    </motion.form>
  );
};

export default BirthDateForm;