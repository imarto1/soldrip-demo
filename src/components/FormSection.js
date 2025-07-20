import React from 'react';
import { useRTL } from '../utils/useRTL';

const FormSection = ({ 
  title, 
  icon, 
  children, 
  error, 
  gridCols = "md:grid-cols-2" 
}) => {
  const { isRTL, flexDirection, iconMargin, textAlign, errorAlign } = useRTL();

  return (
    <div className="card">
      <div className={`flex items-center mb-6 ${flexDirection}`}>
        {icon && (
          <span className={`text-primary-600 ${iconMargin}`}>
            {icon}
          </span>
        )}
        <h2 className={`text-xl font-semibold text-gray-900 ${textAlign}`}>
          {title}
        </h2>
      </div>
      
      <div className={`grid ${gridCols} gap-4`}>
        {children}
      </div>
      
      {error && (
        <p className={`text-red-500 text-sm mt-2 ${errorAlign}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSection; 