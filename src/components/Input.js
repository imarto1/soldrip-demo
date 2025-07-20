import React from 'react';
import { useRTL } from '../utils/useRTL';

const Input = ({ 
  label,
  error,
  className = '',
  fullWidth = true,
  ...props 
}) => {
  const { textAlign, errorAlign } = useRTL();

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 mb-2 ${textAlign}`}>
          {label}
        </label>
      )}
      <input
        className={`input-field ${className}`}
        {...props}
      />
      {error && (
        <p className={`text-red-500 text-sm mt-1 ${errorAlign}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input; 