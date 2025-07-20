import React from 'react';
import { motion } from 'framer-motion';
import { useRTL } from '../utils/useRTL';

const LoadingState = ({ 
  icon, 
  title, 
  description, 
  progressSteps = [],
  iconSize = "w-20 h-20",
  iconInnerSize = "w-10 h-10"
}) => {
  const { isRTL, spaceX, spaceX2 } = useRTL();

  return (
    <div className="wizard-step">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className={`inline-flex items-center justify-center ${iconSize} bg-primary-100 rounded-full`}>
            <div className={`${iconInnerSize} text-primary-600 animate-pulse`}>
              {icon}
            </div>
          </div>
          
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-center'}`}>
              {title}
            </h1>
            <p className={`text-gray-600 mb-8 ${isRTL ? 'text-right' : 'text-center'}`}>
              {description}
            </p>
            
            {progressSteps.length > 0 && (
              <div className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                {progressSteps.map((step, index) => (
                  <div key={index} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <div 
                      className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                    <span className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingState; 