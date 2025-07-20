import React from 'react';
import { useTranslation } from '../utils/useTranslation';
import { useRTL } from '../utils/useRTL';

const RadioCard = ({ 
  value, 
  label, 
  description, 
  examples, 
  icon, 
  color = '', 
  register, 
  name, 
  required = false,
  error 
}) => {
  const { getSection } = useTranslation();
  const { isRTL, flexDirectionWithJustify, radioButton, textAlign, iconMargin, flexDirection } = useRTL();
  const preferencesTranslations = getSection('preferences');

  return (
    <label
      className={`flex items-start p-4 border rounded-lg cursor-pointer hover:border-primary-300 transition-colors ${color} ${flexDirectionWithJustify}`}
    >
      <input
        type="radio"
        value={value}
        {...register(name, { required: required ? `Please select a ${name}` : false })}
        className={`mt-1 text-primary-600 focus:ring-primary-500 ${radioButton}`}
      />
      <div className={`flex-1 ${textAlign}`}>
        {icon && (
          <div className={`flex items-center mb-2 ${flexDirection}`}>
            <span className={`text-primary-600 ${iconMargin}`}>{icon}</span>
            <span className="font-medium text-gray-900">{label}</span>
          </div>
        )}
        {!icon && <div className="font-medium text-gray-900 mb-1">{label}</div>}
        <div className="text-sm text-gray-600 mb-2">{description}</div>
        {examples && (
          <div className="text-xs text-gray-500">
            {preferencesTranslations.examples}: {examples}
          </div>
        )}
      </div>
    </label>
  );
};

export default RadioCard; 