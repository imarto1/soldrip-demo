import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Download,
  Sun,
  Droplets,
  Wind
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';
import { 
  PageWrapper, 
  PageHeader, 
  LoadingState, 
  Button,
  InfoCard
} from '../components';

const VisualizationPage = () => {
  const { 
    balconyInfo, 
    preferences, 
    visualConfig, 
    recommendations 
  } = useGardenStore();
  const { t, getSection, isRTL } = useTranslation();
  const visualizationTranslations = getSection('visualization');

  const [showIrrigation, setShowIrrigation] = useState(false);
  const [viewAngle, setViewAngle] = useState('front');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simulate 3D rendering time
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const generateVisualization = () => {
    const planters = visualConfig.planters;
    const selectedPlants = visualConfig.selectedPlants;
    
    if (planters.length === 0) {
      return {
        type: 'empty',
        message: 'No planters configured yet'
      };
    }

    // Generate a simple visualization based on the configuration
    return {
      type: 'garden',
      planters: planters.map(planter => ({
        ...planter,
        plant: selectedPlants[planter.id]
      }))
    };
  };

  const visualization = generateVisualization();

  const getWeatherIcon = () => {
    const orientation = balconyInfo.orientation;
    if (['S', 'SE', 'SW'].includes(orientation)) {
      return '☀️';
    } else if (['N', 'NW'].includes(orientation)) {
      return '⛅';
    }
    return '🌤️';
  };

  const getTimeOfDay = () => {
    const orientation = balconyInfo.orientation;
    if (['E', 'NE'].includes(orientation)) {
      return 'Morning';
    } else if (['W', 'NW'].includes(orientation)) {
      return 'Afternoon';
    } else if (['S', 'SE', 'SW'].includes(orientation)) {
      return 'Midday';
    }
    return 'Day';
  };

  if (isGenerating) {
    return (
      <LoadingState
        icon={<Eye />}
        title={visualizationTranslations.generating}
        description={visualizationTranslations.generatingDesc}
        progressSteps={[
          visualizationTranslations.renderingPlants,
          visualizationTranslations.addingLighting,
          visualizationTranslations.finalizing
        ]}
      />
    );
  }

  return (
    <PageWrapper maxWidth="max-w-6xl">
      <PageHeader
        icon={<Eye />}
        title={visualizationTranslations.title}
        subtitle={visualizationTranslations.subtitle}
      />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-xl font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {visualizationTranslations.gardenPreview}
                </h2>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <button
                    onClick={() => setShowIrrigation(!showIrrigation)}
                    className={`flex items-center text-sm text-gray-600 hover:text-primary-600 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                  >
                    {showIrrigation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{visualizationTranslations.irrigation}</span>
                  </button>
                  <button
                    onClick={() => setViewAngle(viewAngle === 'front' ? 'side' : 'front')}
                    className={`flex items-center text-sm text-gray-600 hover:text-primary-600 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{visualizationTranslations.rotate}</span>
                  </button>
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="relative bg-gradient-to-br from-sky-200 to-blue-300 rounded-lg overflow-hidden">
                <div 
                  className="w-full h-96 relative"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(135, 206, 235, 0.3) 0%, 
                      rgba(34, 197, 94, 0.2) 50%, 
                      rgba(59, 130, 246, 0.3) 100%)`
                  }}
                >
                  {/* Sky and weather */}
                  <div className="absolute top-4 right-4 text-4xl">
                    {getWeatherIcon()}
                  </div>
                  
                  {/* Time indicator */}
                  <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium">
                    {getTimeOfDay()}
                  </div>

                  {/* Balcony structure */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-800 rounded-t-lg">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gray-600"></div>
                    <div className="absolute top-2 left-4 right-4 h-1 bg-gray-400 rounded"></div>
                  </div>

                  {/* Railing */}
                  <div className="absolute bottom-16 left-0 right-0 h-8">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-600"></div>
                    <div className="absolute top-1 left-0 right-0 h-1 bg-gray-600"></div>
                    <div className="absolute top-2 left-0 right-0 h-1 bg-gray-600"></div>
                    <div className="absolute top-3 left-0 right-0 h-1 bg-gray-600"></div>
                  </div>

                  {/* Planters visualization */}
                  {visualization.type === 'garden' && visualization.planters.length > 0 ? (
                    visualization.planters.map((planter, index) => {
                    const isHanging = planter.type === 'hanging';
                    const isRailing = planter.type === 'railing';
                    const isFloor = planter.type === 'floor';
                    const isWindow = planter.type === 'window';
                    const isVertical = planter.type === 'vertical';
                    
                    let planterStyle = {};
                    let planterClass = '';
                    
                    if (isHanging) {
                      planterStyle = {
                        position: 'absolute',
                        top: `${20 + index * 15}%`,
                        left: `${30 + index * 20}%`,
                        transform: 'translate(-50%, -50%)'
                      };
                      planterClass = 'w-16 h-16 bg-amber-700 rounded-full border-4 border-amber-900 shadow-lg';
                    } else if (isRailing) {
                      planterStyle = {
                        position: 'absolute',
                        bottom: '16',
                        left: `${20 + index * 25}%`,
                        transform: 'translateX(-50%)'
                      };
                      planterClass = 'w-20 h-8 bg-amber-700 rounded-lg border-2 border-amber-900 shadow-lg';
                    } else if (isFloor) {
                      planterStyle = {
                        position: 'absolute',
                        bottom: '8',
                        left: `${25 + index * 30}%`,
                        transform: 'translateX(-50%)'
                      };
                      planterClass = 'w-24 h-12 bg-amber-700 rounded-lg border-2 border-amber-900 shadow-lg';
                    } else if (isWindow) {
                      planterStyle = {
                        position: 'absolute',
                        bottom: '20',
                        left: `${15 + index * 30}%`,
                        transform: 'translateX(-50%)'
                      };
                      planterClass = 'w-28 h-6 bg-amber-700 rounded-lg border-2 border-amber-900 shadow-lg';
                    } else if (isVertical) {
                      planterStyle = {
                        position: 'absolute',
                        bottom: '12',
                        left: `${40 + index * 20}%`,
                        transform: 'translateX(-50%)'
                      };
                      planterClass = 'w-8 h-20 bg-amber-700 rounded-lg border-2 border-amber-900 shadow-lg';
                    }

                    return (
                      <div key={planter.id} style={planterStyle}>
                        <div className={planterClass}>
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            {planter.plant ? '🌱' : '🪴'}
                          </div>
                        </div>
                        
                        {/* Hanging rope for hanging baskets */}
                        {isHanging && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-600"></div>
                        )}
                      </div>
                    );
                  }))
                  : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`text-gray-500 ${isRTL ? 'text-right' : 'text-center'}`}>
                        <div className="text-6xl mb-4">🏡</div>
                        <p className={`text-lg font-medium ${isRTL ? 'text-right' : 'text-center'}`}>{visualizationTranslations.noGardenConfigured}</p>
                        <p className={`text-sm ${isRTL ? 'text-right' : 'text-center'}`}>{visualizationTranslations.goBackToConfigure}</p>
                      </div>
                    </div>
                  )}

                  {/* Irrigation overlay */}
                  {showIrrigation && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: recommendations.irrigation.soliDrippers }, (_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 bg-blue-500/30 rounded-full border border-blue-500 flex items-center justify-center"
                          style={{
                            top: `${20 + (i * 15) % 60}%`,
                            left: `${30 + (i * 20) % 50}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <Droplets className="w-2 h-2 text-blue-600" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empty state */}
                  {visualization.type === 'empty' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`text-gray-500 ${isRTL ? 'text-right' : 'text-center'}`}>
                        <div className="text-6xl mb-4">🏡</div>
                        <p className={`text-lg font-medium ${isRTL ? 'text-right' : 'text-center'}`}>{visualizationTranslations.noGardenConfigured}</p>
                        <p className={`text-sm ${isRTL ? 'text-right' : 'text-center'}`}>{visualizationTranslations.goBackToConfigure}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* View controls */}
              <div className={`mt-4 flex justify-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                <button
                  onClick={() => setViewAngle('front')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewAngle === 'front' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {visualizationTranslations.frontView}
                </button>
                <button
                  onClick={() => setViewAngle('side')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewAngle === 'side' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {visualizationTranslations.sideView}
                </button>
              </div>
            </div>
          </div>

          {/* Garden Details */}
          <div className="space-y-6">
            {/* Garden Summary */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {visualizationTranslations.gardenSummary}
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.planters}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{visualConfig.planters.length}</span>
                </div>
                
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.plants}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                    {Object.keys(visualConfig.selectedPlants).length}
                  </span>
                </div>
                
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.gardenStyle}:</span>
                  <span className={`font-medium capitalize ${isRTL ? 'text-right' : 'text-left'}`}>{preferences.visualStyle}</span>
                </div>
                
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.maintenance}:</span>
                  <span className={`font-medium capitalize ${isRTL ? 'text-right' : 'text-left'}`}>{preferences.maintenanceLevel}</span>
                </div>
              </div>
            </div>

            {/* Weather Conditions */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {visualizationTranslations.weatherConditions}
              </h3>
              
              <div className="space-y-3">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-medium text-gray-900">{visualizationTranslations.sunExposure}</div>
                    <div className="text-sm text-gray-600">
                      {['S', 'SE', 'SW'].includes(balconyInfo.orientation) ? 'High' : 
                       ['N', 'NW'].includes(balconyInfo.orientation) ? 'Low' : 'Moderate'}
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Wind className="w-5 h-5 text-blue-500" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-medium text-gray-900">{visualizationTranslations.windExposure}</div>
                    <div className="text-sm text-gray-600">
                      {parseInt(balconyInfo.floorNumber) > 10 ? 'High' : 
                       parseInt(balconyInfo.floorNumber) > 5 ? 'Moderate' : 'Low'}
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-medium text-gray-900">{visualizationTranslations.rainProtection}</div>
                    <div className="text-sm text-gray-600">
                      {balconyInfo.hasRainProtection ? 'Protected' : 'Exposed'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Irrigation System */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {visualizationTranslations.irrigationSystem}
              </h3>
              
              <div className="space-y-3">
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.soliDrippers}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.soliDrippers}</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.systemType}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.type}</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualizationTranslations.wateringSchedule}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>2-3x per week</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className={`text-sm text-green-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {visualizationTranslations.automatedIrrigation}
                </p>
              </div>
            </div>

            {/* Download Options */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {visualizationTranslations.downloadOptions}
              </h3>
              
              <div className="space-y-3">
                <button className={`w-full btn-secondary flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Download className="w-4 h-4" />
                  <span>{visualizationTranslations.downloadPreview}</span>
                </button>
                <button className={`w-full btn-secondary flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Download className="w-4 h-4" />
                  <span>{visualizationTranslations.saveGardenPlan}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  };

export default VisualizationPage; 