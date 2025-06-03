import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Download, CalendarDays, FileText, Headphones } from 'lucide-react';

const PremiumFeatures: React.FC = () => {
  const basicFeatures = [
    'Basic BaZi Chart Overview',
    'Chinese Zodiac Analysis',
    'Five Elements Balance',
    'General Life Guidance',
    'PDF Basic Report'
  ];
  
  const standardFeatures = [
    'Detailed BaZi Chart Analysis',
    'Zi Wei Dou Shu Basic Chart',
    'Personalized Annual Forecast',
    'Relationship Compatibility',
    'Career & Wealth Insights',
    'PDF Comprehensive Report',
    'Email Follow-up Support'
  ];
  
  const premiumFeatures = [
    'Complete BaZi & Zi Wei Analysis',
    'Ten-Year Detailed Forecast',
    'Major Life Events Prediction',
    'Health & Wellness Guidance',
    'Business & Investment Timing',
    'Family & Children Insights',
    'PDF Deluxe Report',
    '1-on-1 Consultation (30 min)',
    'Unlimited Email Support'
  ];
  
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      features: basicFeatures,
      icon: <FileText className="h-8 w-8" />,
      color: 'from-blue-600 to-blue-800',
      textColor: 'text-blue-500'
    },
    {
      name: 'Standard',
      price: '$69',
      popular: true,
      features: standardFeatures,
      icon: <Star className="h-8 w-8" />,
      color: 'from-amber-500 to-red-600',
      textColor: 'text-amber-500'
    },
    {
      name: 'Premium',
      price: '$129',
      features: premiumFeatures,
      icon: <Headphones className="h-8 w-8" />,
      color: 'from-purple-600 to-indigo-800',
      textColor: 'text-purple-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-white mb-4">
          Unlock Your Complete Celestial Blueprint
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Choose the reading package that's right for you and gain deeper insights into your destiny path.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border ${
              plan.popular ? 'border-amber-500' : 'border-indigo-800'
            } overflow-hidden relative`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                  MOST POPULAR
                </div>
              </div>
            )}
            
            <div className={`bg-gradient-to-br ${plan.color} p-6 text-center`}>
              <div className={`bg-white bg-opacity-20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-white`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-medium text-white mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
              <p className="text-white text-opacity-80 text-sm">One-time payment</p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className={`h-5 w-5 ${plan.textColor} mr-3 flex-shrink-0 mt-0.5`} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-amber-500 to-red-600'
                    : 'bg-indigo-800 hover:bg-indigo-700'
                } text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg`}
              >
                Get {plan.name} Reading
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 bg-indigo-900 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-indigo-800 p-6 md:p-8 text-center">
        <h3 className="text-2xl font-serif text-white mb-6">
          Special Package: Annual Subscription
        </h3>
        
        <div className="bg-indigo-950 bg-opacity-70 p-6 rounded-xl max-w-2xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:text-left">
              <h4 className="text-xl text-amber-400 mb-2">Year-Round Celestial Guidance</h4>
              <p className="text-slate-300 mb-4">
                Receive monthly updated readings, personalized advice for each lunar month, 
                and quarterly consultation sessions with our master astrologers.
              </p>
              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-slate-300 text-sm">Monthly Reports</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-slate-300 text-sm">Quarterly Consultations</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-slate-300 text-sm">Priority Support</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-xl text-white mb-1">$299<span className="text-slate-400 text-sm">/year</span></div>
              <div className="text-sm text-green-500 mb-4">Save $149 compared to monthly</div>
              <button className="bg-gradient-to-r from-green-500 to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm">
          All subscription plans include a 14-day satisfaction guarantee. <br />
          Not satisfied? We'll refund your payment - no questions asked.
        </p>
      </div>
    </motion.div>
  );
};

export default PremiumFeatures;