import React, { useState } from 'react';
import { 
  Layout, 
  Sprout, 
  Droplets, 
  Move,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';
import { 
  PageWrapper, 
  PageHeader, 
  Button,
  InfoCard
} from '../components';

const VisualConfiguratorPage = () => {
  const { 
    balconyInfo, 
    recommendations, 
    visualConfig, 
    updateVisualConfig 
  } = useGardenStore();
  const { t, getSection, isRTL } = useTranslation();
  const visualConfigTranslations = getSection('visualConfigurator');

  const [selectedPlanter, setSelectedPlanter] = useState(null);
  const [showIrrigation, setShowIrrigation] = useState(false);

  // Add some default planters if none exist
  React.useEffect(() => {
    if (visualConfig.planters.length === 0) {
      const defaultPlanters = [
        {
          id: Date.now(),
          type: 'hanging',
          name: 'Hanging Basket',
          x: 25,
          y: 30,
          plant: null,
          size: 'small'
        },
        {
          id: Date.now() + 1,
          type: 'railing',
          name: 'Railing Planter',
          x: 75,
          y: 70,
          plant: null,
          size: 'small'
        }
      ];
      updateVisualConfig({ planters: defaultPlanters });
    }
  }, [visualConfig.planters.length, updateVisualConfig]);

  const planterTypes = [
    { id: 'hanging', name: visualConfigTranslations.planterTypes.hanging.name, icon: '🪴', size: 'small' },
    { id: 'window', name: visualConfigTranslations.planterTypes.window.name, icon: '🪴', size: 'medium' },
    { id: 'railing', name: visualConfigTranslations.planterTypes.railing.name, icon: '🪴', size: 'small' },
    { id: 'floor', name: visualConfigTranslations.planterTypes.floor.name, icon: '🪴', size: 'large' },
    { id: 'vertical', name: visualConfigTranslations.planterTypes.vertical.name, icon: '🪴', size: 'medium' }
  ];

  const balconyWidth = parseFloat(balconyInfo.width) || 3;
  const balconyDepth = parseFloat(balconyInfo.depth) || 1.2;

  const addPlanter = (type) => {
    const newPlanter = {
      id: Date.now(),
      type: type.id,
      name: type.name,
      x: 10,
      y: 10,
      plant: null,
      size: type.size
    };

    const updatedPlanters = [...visualConfig.planters, newPlanter];
    updateVisualConfig({ planters: updatedPlanters });
  };

  const removePlanter = (planterId) => {
    const updatedPlanters = visualConfig.planters.filter(p => p.id !== planterId);
    updateVisualConfig({ planters: updatedPlanters });
    
    // Remove plant selection
    const updatedSelectedPlants = { ...visualConfig.selectedPlants };
    delete updatedSelectedPlants[planterId];
    updateVisualConfig({ selectedPlants: updatedSelectedPlants });
  };

  const selectPlant = (planterId, plant) => {
    const updatedSelectedPlants = {
      ...visualConfig.selectedPlants,
      [planterId]: plant
    };
    updateVisualConfig({ selectedPlants: updatedSelectedPlants });
  };

  const updatePlanterPosition = (planterId, x, y) => {
    const updatedPlanters = visualConfig.planters.map(planter =>
      planter.id === planterId ? { ...planter, x, y } : planter
    );
    updateVisualConfig({ planters: updatedPlanters });
  };

  const getPlanterSize = (size) => {
    const sizes = {
      small: 'w-16 h-16',
      medium: 'w-20 h-20',
      large: 'w-24 h-24'
    };
    return sizes[size] || sizes.medium;
  };

  return (
    <PageWrapper maxWidth="max-w-6xl">
      <PageHeader
        icon={<Layout />}
        title={visualConfigTranslations.title}
        subtitle={visualConfigTranslations.subtitle}
      />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Balcony Canvas */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-xl font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {visualConfigTranslations.balconyLayout}
                </h2>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <button
                    onClick={() => setShowIrrigation(!showIrrigation)}
                    className={`flex items-center text-sm text-gray-600 hover:text-primary-600 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                  >
                    {showIrrigation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{visualConfigTranslations.irrigation}</span>
                  </button>
                </div>
              </div>

              {/* Balcony Canvas */}
              <div 
                className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-300"
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
                }}
              >
                {/* Balcony dimensions indicator */}
                <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  {balconyWidth}m × {balconyDepth}m
                </div>

                {/* Irrigation overlay */}
                {showIrrigation && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                )}

                {/* Planters */}
                {visualConfig.planters.map((planter) => (
                  <div
                    key={planter.id}
                    className={`absolute cursor-move ${getPlanterSize(planter.size)}`}
                    style={{
                      left: `${planter.x}%`,
                      top: `${planter.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: selectedPlanter === planter.id ? 10 : 1
                    }}
                  >
                    <div 
                      className={`w-full h-full rounded-lg border-2 border-gray-300 bg-white shadow-md flex items-center justify-center text-2xl hover:border-primary-400 transition-colors ${
                        selectedPlanter === planter.id ? 'border-primary-500 ring-2 ring-primary-200' : ''
                      }`}
                      onClick={() => setSelectedPlanter(planter.id)}
                    >
                      {planter.plant ? '🌱' : '🪴'}
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePlanter(planter.id);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Instructions */}
                <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-xs text-gray-600 bg-white/80 px-2 py-1 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
                  {visualConfigTranslations.instructions}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Planter Types */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Plus className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {visualConfigTranslations.addPlanters}
              </h3>
              
              <div className="space-y-3">
                {planterTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => addPlanter(type)}
                    className={`w-full p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <span className="text-2xl">{type.icon}</span>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{type.size} {visualConfigTranslations.size}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Plant Selection */}
            {selectedPlanter && (
              <div className="card">
                <h3 className={`text-lg font-semibold text-gray-900 mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Sprout className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {visualConfigTranslations.selectPlant}
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => selectPlant(selectedPlanter, null)}
                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                      !visualConfig.selectedPlants[selectedPlanter]
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <span className="text-2xl">🪴</span>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className="font-medium text-gray-900">{visualConfigTranslations.emptyPlanter}</div>
                        <div className="text-sm text-gray-500">{visualConfigTranslations.noPlantSelected}</div>
                      </div>
                    </div>
                  </button>
                  
                  {recommendations.plants.map((plant) => (
                    <button
                      key={plant.name}
                      onClick={() => selectPlant(selectedPlanter, plant)}
                      className={`w-full p-3 border rounded-lg text-left transition-colors ${
                        visualConfig.selectedPlants[selectedPlanter]?.name === plant.name
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                        <span className="text-2xl">🌱</span>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <div className="font-medium text-gray-900">{plant.name}</div>
                          <div className="text-sm text-gray-500">{plant.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Irrigation Info */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Droplets className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {visualConfigTranslations.irrigationSystem}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualConfigTranslations.soliDrippers}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.soliDrippers}</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{visualConfigTranslations.systemType}:</span>
                  <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.type}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {visualConfigTranslations.irrigationInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  };

export default VisualConfiguratorPage; 