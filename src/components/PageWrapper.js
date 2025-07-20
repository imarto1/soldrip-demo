import React from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ 
  children, 
  maxWidth = "max-w-4xl",
  className = "",
  animationDuration = 0.5
}) => {
  return (
    <div className="wizard-step">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration }}
        className={`${maxWidth} mx-auto ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageWrapper; 