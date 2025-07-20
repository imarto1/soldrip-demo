import React from 'react';
import { motion } from 'framer-motion';
import { useRTL } from '../utils/useRTL';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
  type = 'button'
}) => {
  const { isRTL, spaceX2 } = useRTL();

  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6',
    lg: 'py-4 px-8 text-lg'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const iconClasses = `w-4 h-4 ${spaceX2}`;

  const renderContent = () => {
    if (!icon) return children;

    const iconElement = <span className={iconClasses}>{icon}</span>;
    
    if (iconPosition === 'left') {
      return (
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          {iconElement}
          <span>{children}</span>
        </div>
      );
    } else {
      return (
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span>{children}</span>
          {iconElement}
        </div>
      );
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={buttonClasses}
    >
      {renderContent()}
    </motion.button>
  );
};

export default Button; 