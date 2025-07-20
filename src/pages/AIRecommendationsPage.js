import React, { useEffect, useState } from 'react';
import { 
  Brain, 
  Sprout, 
  Droplets, 
  Layout, 
  Sun,
  Wind,
  CloudRain,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';
import { generateRecommendations } from '../utils/aiEngine';
import { 
  PageWrapper, 
  PageHeader, 
  LoadingState, 
  InfoCard, 
  Grid 
} from '../components';

const AIRecommendationsPage = () => {
  const { balconyInfo, preferences, setRecommendations, recommendations } = useGardenStore();
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const { t, getSection, isRTL } = useTranslation();
  const aiRecommendationsTranslations = getSection('aiRecommendations');

  useEffect(() => {
    const analyzeAndRecommend = async () => {
      setIsLoading(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        const recs = generateRecommendations(balconyInfo, preferences);
        setRecommendations(recs);
        
        // Generate exposure analysis
        const exposureAnalysis = analyzeExposure(balconyInfo);
        setAnalysis(exposureAnalysis);
        
        setIsLoading(false);
      }, 2000);
    };

    if (balconyInfo.width && preferences.gardenType) {
      analyzeAndRecommend();
    }
  }, [balconyInfo, preferences, setRecommendations]);

  const analyzeExposure = (balconyInfo) => {
    const orientation = balconyInfo.orientation;
    const floor = parseInt(balconyInfo.floorNumber);
    
    let sunExposure = 'moderate';
    let windExposure = 'moderate';
    let rainExposure = balconyInfo.hasRainProtection ? 'protected' : 'exposed';
    
    // Sun exposure based on orientation
    if (['S', 'SE', 'SW'].includes(orientation)) {
      sunExposure = 'high';
    } else if (['N', 'NW'].includes(orientation)) {
      sunExposure = 'low';
    }
    
    // Wind exposure based on floor level
    if (floor > 10) {
      windExposure = 'high';
    } else if (floor > 5) {
      windExposure = 'moderate';
    } else {
      windExposure = 'low';
    }
    
    return { sunExposure, windExposure, rainExposure };
  };

  const getExposureIcon = (type, level) => {
    const icons = {
      sun: { high: '☀️', moderate: '🌤️', low: '⛅' },
      wind: { high: '💨', moderate: '🌬️', low: '🍃' },
      rain: { exposed: '🌧️', protected: '☂️' }
    };
    return icons[type][level];
  };

  const getExposureColor = (level) => {
    const colors = {
      high: 'text-orange-600',
      moderate: 'text-yellow-600',
      low: 'text-blue-600',
      exposed: 'text-red-600',
      protected: 'text-green-600'
    };
    return colors[level];
  };

  if (isLoading) {
    return (
      <LoadingState
        icon={<Brain />}
        title={aiRecommendationsTranslations.analyzing}
        description={aiRecommendationsTranslations.analyzingDesc}
        progressSteps={[
          aiRecommendationsTranslations.sunAnalysis,
          aiRecommendationsTranslations.windPatterns,
          aiRecommendationsTranslations.rainExposure
        ]}
      />
    );
  }

  return (
    <PageWrapper>
      <PageHeader
        icon={<Brain />}
        title={aiRecommendationsTranslations.title}
        subtitle={aiRecommendationsTranslations.subtitle}
      />

        <div className="space-y-8">
          {/* Exposure Analysis */}
          {analysis && (
            <div className="card">
              <h2 className={`text-xl font-semibold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Layout className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {aiRecommendationsTranslations.exposureAnalysis}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-4 bg-yellow-50 rounded-lg ${isRTL ? 'text-right' : 'text-center'}`}>
                  <div className="text-3xl mb-2">{getExposureIcon('sun', analysis.sunExposure)}</div>
                  <h3 className={`font-semibold text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-center'}`}>{aiRecommendationsTranslations.sunExposure}</h3>
                  <p className={`text-sm font-medium ${getExposureColor(analysis.sunExposure)}`}>
                    {analysis.sunExposure.charAt(0).toUpperCase() + analysis.sunExposure.slice(1)}
                  </p>
                </div>
                
                <div className={`p-4 bg-blue-50 rounded-lg ${isRTL ? 'text-right' : 'text-center'}`}>
                  <div className="text-3xl mb-2">{getExposureIcon('wind', analysis.windExposure)}</div>
                  <h3 className={`font-semibold text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-center'}`}>{aiRecommendationsTranslations.windExposure}</h3>
                  <p className={`text-sm font-medium ${getExposureColor(analysis.windExposure)}`}>
                    {analysis.windExposure.charAt(0).toUpperCase() + analysis.windExposure.slice(1)}
                  </p>
                </div>
                
                <div className={`p-4 bg-green-50 rounded-lg ${isRTL ? 'text-right' : 'text-center'}`}>
                  <div className="text-3xl mb-2">{getExposureIcon('rain', analysis.rainExposure)}</div>
                  <h3 className={`font-semibold text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-center'}`}>{aiRecommendationsTranslations.rainProtection}</h3>
                  <p className={`text-sm font-medium ${getExposureColor(analysis.rainExposure)}`}>
                    {analysis.rainExposure.charAt(0).toUpperCase() + analysis.rainExposure.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Plants */}
          <div className="card">
            <h2 className={`text-xl font-semibold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Sprout className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {aiRecommendationsTranslations.recommendedPlants}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.plants.map((plant, index) => (
                <div
                  key={plant.name}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sprout className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{plant.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{plant.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Sun className="w-3 h-3 mr-1" />
                          {plant.sunNeeds}
                        </span>
                        <span className="flex items-center">
                          <Droplets className="w-3 h-3 mr-1" />
                          {plant.waterNeeds}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layout Recommendations */}
          <div className="card">
            <h2 className={`text-xl font-semibold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Layout className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {aiRecommendationsTranslations.layoutRecommendations}
            </h2>
            
            <div className="space-y-4">
              {recommendations.layout.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{item.description}</p>
                    <p className="text-sm text-gray-600">{item.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation System */}
          <div className="card">
            <h2 className={`text-xl font-semibold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Droplets className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {aiRecommendationsTranslations.irrigationSystem}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{aiRecommendationsTranslations.systemType}</h3>
                <div className="space-y-2 text-sm">
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : 'justify-between'}`}>
                    <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{aiRecommendationsTranslations.soliDrippers}:</span>
                    <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.soliDrippers}</span>
                  </div>
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : 'justify-between'}`}>
                    <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{aiRecommendationsTranslations.systemType}:</span>
                    <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.type}</span>
                  </div>
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : 'justify-between'}`}>
                    <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{aiRecommendationsTranslations.wateringSchedule}:</span>
                    <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>2-3 times per week</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>Benefits</h3>
                <ul className={`space-y-1 text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <li>• {aiRecommendationsTranslations.automatedSystem}</li>
                  <li>• {aiRecommendationsTranslations.waterEfficient}</li>
                  <li>• {aiRecommendationsTranslations.preventsOverUnder}</li>
                  <li>• {aiRecommendationsTranslations.easyInstall}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Expected Yield (for edible gardens) */}
          {preferences.gardenType === 'edible' && recommendations.expectedYield && (
            <div className="card">
              <h2 className={`text-xl font-semibold text-gray-900 mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {aiRecommendationsTranslations.expectedYield}
              </h2>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className={`text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="font-semibold">{aiRecommendationsTranslations.estimatedHarvest}:</span> {recommendations.expectedYield}
                </p>
                <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {aiRecommendationsTranslations.harvestDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    );
  };

export default AIRecommendationsPage; 