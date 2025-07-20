import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const { currentStep, prevStep, nextStep, isBalconyInfoComplete, isPreferencesComplete } = useGardenStore();
  const { t, isRTL } = useTranslation();

  const pages = [
    '/',
    '/balcony-info',
    '/preferences',
    '/recommendations',
    '/configurator',
    '/visualization',
    '/quote'
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: // Balcony Info
        return isBalconyInfoComplete();
      case 2: // Preferences
        return isPreferencesComplete();
      default:
        return true;
    }
  };

  const handlePrev = () => {
    prevStep();
    navigate(pages[currentStep - 1]);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    nextStep();
    navigate(pages[currentStep + 1]);
    window.scrollTo(0, 0);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`flex items-center bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200 ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className={`btn-secondary flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
        >
          {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          <span>{t('common.previous')}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={!canProceed()}
          className={`btn-primary flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} ${
            !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span>{t('common.next')}</span>
          {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </motion.button>
      </div>
    </div>
  );
};

export default NavigationButtons; 