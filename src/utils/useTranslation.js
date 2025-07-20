import { useMemo } from 'react';
import useGardenStore from '../store/gardenStore';
import { getTranslation, getTranslationSection } from './translations';

/**
 * Custom hook for translations
 * @returns {object} - Translation utilities
 */
export const useTranslation = () => {
  const { settings } = useGardenStore();
  const language = settings.language || 'en';

  const t = useMemo(() => {
    return (key) => getTranslation(language, key);
  }, [language]);

  const getSection = useMemo(() => {
    return (section) => getTranslationSection(language, section);
  }, [language]);

  return {
    t,
    getSection,
    language,
    isRTL: language === 'he'
  };
}; 