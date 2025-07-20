import { useTranslation } from './useTranslation';

export const useRTL = () => {
  const { isRTL } = useTranslation();

  return {
    isRTL,
    // Text alignment
    textAlign: isRTL ? 'text-right' : 'text-left',
    textAlignCenter: isRTL ? 'text-right' : 'text-center',
    
    // Flex direction
    flexDirection: isRTL ? 'flex-row-reverse' : '',
    flexDirectionWithJustify: isRTL ? 'flex-row-reverse justify-end' : '',
    
    // Margins
    marginLeft: isRTL ? 'ml-2' : 'mr-2',
    marginRight: isRTL ? 'mr-2' : 'ml-2',
    marginLeft3: isRTL ? 'ml-3' : 'mr-3',
    marginRight3: isRTL ? 'mr-3' : 'ml-3',
    
    // Spacing
    spaceX: isRTL ? 'space-x-reverse space-x-2' : 'space-x-2',
    spaceX2: isRTL ? 'space-x-reverse space-x-2' : 'space-x-2',
    spaceX3: isRTL ? 'space-x-reverse space-x-3' : 'space-x-3',
    spaceX4: isRTL ? 'space-x-reverse space-x-4' : 'space-x-4',
    
    // Radio button positioning
    radioButton: isRTL ? 'ml-3 order-last' : 'mr-3',
    
    // Icon positioning
    iconMargin: isRTL ? 'ml-2' : 'mr-2',
    
    // Header alignment
    headerAlign: isRTL ? 'text-right' : 'text-center',
    
    // Error message alignment
    errorAlign: isRTL ? 'text-right' : 'text-left'
  };
}; 