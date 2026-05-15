import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const initials = testimonial.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <p className="mb-6 text-sm leading-7 text-slate-300">{testimonial.content}</p>
      
      <div className="flex items-center">
        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md border border-amber-300/20 bg-amber-300/10 text-xs font-semibold text-amber-200">
          {initials}
        </div>
        <div>
          <h4 className="text-white font-medium">{testimonial.name}</h4>
          <p className="text-slate-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
