import React from 'react';
import { useRTL } from '../utils/useRTL';

const PageHeader = ({ 
  icon, 
  title, 
  subtitle, 
  iconSize = "w-16 h-16",
  iconInnerSize = "w-8 h-8",
  titleSize = "text-3xl",
  subtitleSize = "text-gray-600"
}) => {
  const { headerAlign } = useRTL();

  return (
    <div className="mb-8 text-center">
      <div className={`inline-flex items-center justify-center ${iconSize} bg-primary-100 rounded-full mb-4`}>
        <div className={`${iconInnerSize} text-primary-600`}>
          {icon}
        </div>
      </div>
      <h1 className={`${titleSize} font-bold text-gray-900 mb-2 ${headerAlign}`}>
        {title}
      </h1>
      <p className={`${subtitleSize} ${headerAlign}`}>
        {subtitle}
      </p>
    </div>
  );
};

export default PageHeader; 