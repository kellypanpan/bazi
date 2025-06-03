import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl border border-indigo-800 relative"
    >
      <Quote className="absolute top-4 right-4 h-6 w-6 text-amber-500 opacity-50" />
      
      <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
      
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-amber-500"
        />
        <div>
          <h4 className="text-white font-medium">{testimonial.name}</h4>
          <p className="text-slate-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;