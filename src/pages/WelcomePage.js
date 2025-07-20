import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Sun, 
  Droplets, 
  Wind, 
  Palette, 
  Calculator,
  Download,
  Eye,
  Globe,
  DollarSign
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';
import { 
  PageWrapper, 
  PageHeader, 
  Button,
  InfoCard,
  Grid
} from '../components';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { setCurrentStep, settings, updateSettings } = useGardenStore();
  const [showSettings, setShowSettings] = useState(false);
  const { t, getSection, isRTL } = useTranslation();
  const welcome = getSection('welcome');

  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-primary-600" />,
      title: welcome.features.aiRecommendations,
      description: welcome.features.aiDescription
    },
    {
      icon: <Sun className="w-8 h-8 text-primary-600" />,
      title: welcome.features.sunAnalysis,
      description: welcome.features.sunDescription
    },
    {
      icon: <Droplets className="w-8 h-8 text-primary-600" />,
      title: welcome.features.irrigation,
      description: welcome.features.irrigationDescription
    },
    {
      icon: <Palette className="w-8 h-8 text-primary-600" />,
      title: welcome.features.visualConfig,
      description: welcome.features.visualDescription
    },
    {
      icon: <Eye className="w-8 h-8 text-primary-600" />,
      title: welcome.features.visualization,
      description: welcome.features.vizDescription
    },
    {
      icon: <Calculator className="w-8 h-8 text-primary-600" />,
      title: welcome.features.quotes,
      description: welcome.features.quotesDescription
    }
  ];

  const handleStart = () => {
    setCurrentStep(1);
    navigate('/balcony-info');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className={`max-w-6xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
        {/* Hero Section */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
              <Sprout className="w-10 h-10 text-primary-600" />
            </div>
            
            <h1 className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-center'}`}>
              {welcome.title}
            </h1>
            
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'text-right' : 'text-center'}`}>
              {welcome.subtitle}
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-center ${isRTL ? 'space-y-4 sm:space-y-0 sm:space-x-reverse sm:space-x-4' : 'space-y-4 sm:space-y-0 sm:space-x-4'}`}>
            <Button
              onClick={handleStart}
              size="lg"
              className="shadow-garden min-w-[140px]"
            >
              {welcome.startButton}
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              icon={<Globe />}
              onClick={() => setShowSettings(!showSettings)}
              className="min-w-[140px]"
            >
              {welcome.languageButton}
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="max-w-md mx-auto mb-12">
            <div className="card">
              <h3 className={`text-xl font-semibold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Globe className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {welcome.languageTitle}
              </h3>
              
              <div className="space-y-6">
                {/* Language Selection */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {welcome.languageLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateSettings({ language: 'en' })}
                      className={`p-3 border rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-center'} ${
                        settings.language === 'en'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-medium">English</div>
                      <div className="text-sm text-gray-500">{welcome.englishLabel}</div>
                    </button>
                    <button
                      onClick={() => updateSettings({ language: 'he' })}
                      className={`p-3 border rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-center'} ${
                        settings.language === 'he'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-medium">עברית</div>
                      <div className="text-sm text-gray-500">{welcome.hebrewLabel}</div>
                    </button>
                  </div>
                </div>

                {/* Currency Selection */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {welcome.currencyLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateSettings({ currency: 'USD' })}
                      className={`p-3 border rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-center'} ${
                        settings.currency === 'USD'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-medium">$ USD</div>
                      <div className="text-sm text-gray-500">{welcome.usDollarLabel}</div>
                    </button>
                    <button
                      onClick={() => updateSettings({ currency: 'ILS' })}
                      className={`p-3 border rounded-lg transition-colors ${isRTL ? 'text-right' : 'text-center'} ${
                        settings.currency === 'ILS'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-medium">₪ ILS</div>
                      <div className="text-sm text-gray-500">{welcome.israeliShekelLabel}</div>
                    </button>
                  </div>
                </div>

                {/* Current Selection Display */}
                <div className="pt-4 border-t border-gray-200">
                  <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse justify-between' : 'justify-between'}`}>
                      <span>{welcome.currentLanguage}</span>
                      <span className="font-medium">
                        {settings.language === 'en' ? 'English' : 'עברית'}
                      </span>
                    </div>
                    <div className={`flex items-center mt-1 ${isRTL ? 'flex-row-reverse justify-between' : 'justify-between'}`}>
                      <span>{welcome.currentCurrency}</span>
                      <span className="font-medium">
                        {settings.currency === 'USD' ? '$ USD' : '₪ ILS'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`flex flex-col items-center ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-center'}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-center'}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-20">
          <h2 className={`text-3xl font-bold text-gray-900 mb-12 ${isRTL ? 'text-right' : 'text-center'}`}>
            {welcome.howItWorks}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: welcome.steps.step1, desc: welcome.steps.step1Desc },
              { step: "2", title: welcome.steps.step2, desc: welcome.steps.step2Desc },
              { step: "3", title: welcome.steps.step3, desc: welcome.steps.step3Desc },
              { step: "4", title: welcome.steps.step4, desc: welcome.steps.step4Desc }
            ].map((item, index) => (
              <div key={item.step} className={isRTL ? 'text-right' : 'text-center'}>
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-center'}`}>{item.title}</h3>
                <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : 'text-center'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage; 