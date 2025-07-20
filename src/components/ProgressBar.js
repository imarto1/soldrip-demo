import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/useTranslation';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  const { t, isRTL } = useTranslation();

  const steps = [
    t('progress.welcome'),
    t('progress.balconyInfo'),
    t('progress.preferences'),
    t('progress.aiAnalysis'),
    t('progress.configure'),
    t('progress.visualize'),
    t('progress.quote')
  ];

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Step Labels */}
      <div className={`flex justify-between text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {steps.map((step, index) => {
          // For RTL, we need to reverse the logic for determining active steps
          const isActive = isRTL ? (steps.length - 1 - index) <= currentStep : index <= currentStep;
          
          return (
            <div
              key={step}
              className={`flex flex-col items-center ${
                isActive ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mb-1 ${
                isActive ? 'bg-primary-600' : 'bg-gray-300'
              }`} />
              <span className={`text-xs font-medium ${isRTL ? 'text-right' : 'text-center'}`}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar; 