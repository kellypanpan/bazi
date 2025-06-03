import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Calendar, Clock, Laptop, Phone, MessageCircle, FileText, Shield } from 'lucide-react';
import PremiumFeatures from '../components/PremiumFeatures';

const Subscription: React.FC = () => {
  const benefits = [
    {
      title: 'In-depth Personalized Analysis',
      description: 'Our premium readings go beyond the basics to provide nuanced insights tailored specifically to your unique cosmic blueprint.',
      icon: <Star className="h-6 w-6 text-amber-500" />
    },
    {
      title: 'Actionable Life Guidance',
      description: 'Receive practical advice and specific timing recommendations for important decisions and life changes.',
      icon: <Calendar className="h-6 w-6 text-green-500" />
    },
    {
      title: 'Expert Consultation',
      description: 'Connect directly with our experienced astrologers who can answer your specific questions and provide personalized guidance.',
      icon: <MessageCircle className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Comprehensive Reports',
      description: 'Beautiful, detailed PDF reports that you can reference throughout the year as you navigate life\'s challenges and opportunities.',
      icon: <FileText className="h-6 w-6 text-purple-500" />
    }
  ];

  const faqs = [
    {
      question: 'How accurate are Chinese astrology readings?',
      answer: 'Chinese astrology readings are based on ancient systems refined over thousands of years. Their accuracy depends on several factors, including the precision of your birth information and the expertise of the interpreter. Many find that properly calculated BaZi and Zi Wei Dou Shu charts offer remarkably accurate insights into personality traits and life patterns.'
    },
    {
      question: 'What information do I need for an accurate reading?',
      answer: 'For the most accurate reading, you\'ll need your exact date of birth (year, month, day) and time of birth (hour and minute if possible). The place of birth is also important. The more precise this information, the more accurate your reading will be.'
    },
    {
      question: 'How is Chinese astrology different from Western astrology?',
      answer: 'While Western astrology focuses primarily on the positions of planets at birth, Chinese astrology is based on different cosmological principles including the lunar calendar, the five elements, yin and yang energies, and the 12 animal signs. Chinese astrology also places greater emphasis on the specific hour of birth and uses different calculation methods.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 14-day satisfaction guarantee on all our premium readings. If you\'re not completely satisfied with your reading, simply contact our support team within 14 days of purchase for a full refund.'
    },
    {
      question: 'How will I receive my reading?',
      answer: 'After purchase, you\'ll receive your detailed reading as a beautifully formatted PDF report via email within 24-48 hours. For packages that include consultation, our team will contact you to schedule a convenient time.'
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Premium Celestial Insights
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Unlock the full power of Chinese astrology with our premium readings and personalized guidance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-serif text-amber-400 mb-6">
              Why Choose Our Premium Readings?
            </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex">
                  <div className="bg-indigo-950 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0 mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{benefit.title}</h3>
                    <p className="text-slate-300">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-indigo-950 bg-opacity-70 p-4 rounded-xl border-l-4 border-amber-500">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">
                  All premium readings include our satisfaction guarantee. If you're not completely satisfied 
                  with your reading, we'll refund your payment within 14 days - no questions asked.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-600 to-red-600 rounded-2xl opacity-20 blur-3xl"></div>
            <img 
              src="https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Premium Astrology Reading" 
              className="w-full h-auto rounded-2xl border-4 border-indigo-800 shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
        
        <PremiumFeatures />
        
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6"
              >
                <h3 className="text-lg text-amber-400 mb-3">{faq.question}</h3>
                <p className="text-slate-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-indigo-800 to-purple-900 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
            Ready to Discover Your Cosmic Blueprint?
          </h2>
          <p className="text-slate-200 max-w-2xl mx-auto mb-8">
            Choose from our premium reading packages and start your journey towards greater self-awareness 
            and alignment with your true destiny path.
          </p>
          <button className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-8 py-3 rounded-full font-medium text-lg inline-block transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
            Get Your Premium Reading
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;