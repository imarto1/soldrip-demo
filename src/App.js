import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGardenStore from './store/gardenStore';
import { useTranslation } from './utils/useTranslation';

// Import wizard pages
import WelcomePage from './pages/WelcomePage';
import BalconyInfoPage from './pages/BalconyInfoPage';
import GardenPreferencesPage from './pages/GardenPreferencesPage';
import AIRecommendationsPage from './pages/AIRecommendationsPage';
import VisualConfiguratorPage from './pages/VisualConfiguratorPage';
import VisualizationPage from './pages/VisualizationPage';
import QuotePage from './pages/QuotePage';

// Import components
import ProgressBar from './components/ProgressBar';
import NavigationButtons from './components/NavigationButtons';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { currentStep, setCurrentStep } = useGardenStore();
  const { isRTL } = useTranslation();

  // Set the dir attribute on the HTML element for CSS RTL support
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  const pages = [
    { path: '/', component: WelcomePage },
    { path: '/balcony-info', component: BalconyInfoPage },
    { path: '/preferences', component: GardenPreferencesPage },
    { path: '/recommendations', component: AIRecommendationsPage },
    { path: '/configurator', component: VisualConfiguratorPage },
    { path: '/visualization', component: VisualizationPage },
    { path: '/quote', component: QuotePage },
  ];

  const currentPage = pages[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <ScrollToTop />
      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <ProgressBar currentStep={currentStep} totalSteps={pages.length - 1} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${currentStep > 0 ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              {pages.map((page, index) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={
                    <page.component />
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {currentStep > 0 && currentStep < pages.length - 1 && (
        <NavigationButtons />
      )}
    </div>
  );
};

export default App; 