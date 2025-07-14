import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { BirthData } from './BirthDateForm';
import DetailedBaziDisplay from './DetailedBaziDisplay';
import { EnhancedBaziService } from '../services/enhancedBaziService';
import { DetailedBaziAnalysis } from '../services/aiService';

interface DetailedResultsSectionProps {
  formData: BirthData;
}

const DetailedResultsSection: React.FC<DetailedResultsSectionProps> = ({ formData }) => {
  const [analysis, setAnalysis] = useState<DetailedBaziAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await EnhancedBaziService.getDetailedBaziAnalysis({
          name: formData.name,
          gender: formData.gender,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          location: formData.location,
        });
        setAnalysis(result);
      } catch (err) {
        setError((err as Error).message || 'Failed to load detailed analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [formData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 1.2 }}
          className="mb-4"
        >
          <Loader2 className="w-10 h-10 text-indigo-400" />
        </motion.div>
        <p className="text-slate-300">Generating your in-depth fortune analysis…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-16">
        {error}
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="mt-12">
      <DetailedBaziDisplay analysis={analysis} userName={formData.name} />
    </div>
  );
};

export default DetailedResultsSection; 