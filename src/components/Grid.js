import React from 'react';

const Grid = ({ 
  children, 
  cols = 2, 
  gap = 4, 
  className = '',
  responsive = true 
}) => {
  const getGapClass = (gap) => {
    const gapClasses = {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12'
    };
    return gapClasses[gap] || 'gap-4';
  };

  const getGridClasses = () => {
    const baseClasses = `grid ${getGapClass(gap)}`;
    
    if (responsive) {
      return `${baseClasses} grid-cols-1 md:grid-cols-${cols} ${className}`;
    }
    
    return `${baseClasses} grid-cols-${cols} ${className}`;
  };

  return (
    <div className={getGridClasses()}>
      {children}
    </div>
  );
};

export default Grid; 