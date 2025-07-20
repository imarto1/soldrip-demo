import React from 'react';
import { useRTL } from '../utils/useRTL';

const InfoCard = ({ 
  title, 
  description, 
  icon, 
  variant = 'default',
  className = '',
  children 
}) => {
  const { textAlign, flexDirection, iconMargin } = useRTL();

  const variants = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-primary-50 border-primary-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className={`card ${variants[variant]} ${className}`}>
      {(title || icon) && (
        <div className={`flex items-center mb-4 ${flexDirection}`}>
          {icon && (
            <span className={`text-primary-600 ${iconMargin}`}>
              {icon}
            </span>
          )}
          {title && (
            <h3 className={`font-semibold text-gray-900 ${textAlign}`}>
              {title}
            </h3>
          )}
        </div>
      )}
      
      {description && (
        <p className={`text-gray-600 mb-4 ${textAlign}`}>
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default InfoCard; 