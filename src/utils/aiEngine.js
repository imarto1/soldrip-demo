// AI Engine for generating garden recommendations
// This is a rules-based system that can be extended with ML models

const plantDatabase = {
  edible: [
    {
      name: 'Basil',
      description: 'Aromatic herb perfect for cooking',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Tomatoes',
      description: 'Compact cherry tomatoes for containers',
      sunNeeds: 'Full sun',
      waterNeeds: 'High',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'medium'
    },
    {
      name: 'Strawberries',
      description: 'Sweet berries that grow well in hanging baskets',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E'],
      maintenance: 'low'
    },
    {
      name: 'Mint',
      description: 'Fast-growing herb, great for tea and cocktails',
      sunNeeds: 'Partial sun',
      waterNeeds: 'High',
      suitableFor: ['N', 'NE', 'NW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Peppers',
      description: 'Compact pepper varieties for containers',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'medium'
    }
  ],
  ornamental: [
    {
      name: 'Petunias',
      description: 'Colorful trailing flowers perfect for hanging baskets',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Geraniums',
      description: 'Classic balcony flowers with long blooming season',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Begonias',
      description: 'Shade-loving flowers with beautiful foliage',
      sunNeeds: 'Partial sun',
      waterNeeds: 'Moderate',
      suitableFor: ['N', 'NE', 'NW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Marigolds',
      description: 'Bright flowers that also repel pests',
      sunNeeds: 'Full sun',
      waterNeeds: 'Low',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    }
  ],
  'low-maintenance': [
    {
      name: 'Snake Plant',
      description: 'Nearly indestructible plant with architectural leaves',
      sunNeeds: 'Low light',
      waterNeeds: 'Low',
      suitableFor: ['N', 'NE', 'NW'],
      maintenance: 'low'
    },
    {
      name: 'ZZ Plant',
      description: 'Glossy leaves, thrives on neglect',
      sunNeeds: 'Low light',
      waterNeeds: 'Low',
      suitableFor: ['N', 'NE', 'NW'],
      maintenance: 'low'
    },
    {
      name: 'Pothos',
      description: 'Trailing vine that purifies air',
      sunNeeds: 'Partial sun',
      waterNeeds: 'Low',
      suitableFor: ['N', 'NE', 'NW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Succulents',
      description: 'Drought-resistant plants in various shapes',
      sunNeeds: 'Full sun',
      waterNeeds: 'Low',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'low'
    }
  ],
  'kid-friendly': [
    {
      name: 'Sunflowers',
      description: 'Fast-growing giants that kids love to watch',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'low'
    },
    {
      name: 'Snapdragons',
      description: 'Interactive flowers that "snap" when squeezed',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Mint',
      description: 'Safe herb that kids can touch and smell',
      sunNeeds: 'Partial sun',
      waterNeeds: 'High',
      suitableFor: ['N', 'NE', 'NW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Chives',
      description: 'Easy to grow and safe for children',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    }
  ],
  medicinal: [
    {
      name: 'Lavender',
      description: 'Calming herb with beautiful purple flowers',
      sunNeeds: 'Full sun',
      waterNeeds: 'Low',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'low'
    },
    {
      name: 'Chamomile',
      description: 'Gentle herb for tea and relaxation',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW', 'E', 'W'],
      maintenance: 'low'
    },
    {
      name: 'Aloe Vera',
      description: 'Healing plant for skin and burns',
      sunNeeds: 'Full sun',
      waterNeeds: 'Low',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'low'
    },
    {
      name: 'Echinacea',
      description: 'Immune-boosting purple coneflower',
      sunNeeds: 'Full sun',
      waterNeeds: 'Moderate',
      suitableFor: ['S', 'SE', 'SW'],
      maintenance: 'low'
    }
  ]
};

const planterTypes = {
  hanging: { name: 'Hanging Baskets', capacity: 0.5, price: 15 },
  window: { name: 'Window Boxes', capacity: 1.0, price: 25 },
  railing: { name: 'Railing Planters', capacity: 0.8, price: 20 },
  floor: { name: 'Floor Planters', capacity: 2.0, price: 35 },
  vertical: { name: 'Vertical Gardens', capacity: 1.5, price: 45 }
};

export const generateRecommendations = (balconyInfo, preferences) => {
  const area = parseFloat(balconyInfo.width) * parseFloat(balconyInfo.depth);
  const orientation = balconyInfo.orientation;
  const floor = parseInt(balconyInfo.floorNumber);
  const gardenType = preferences.gardenType;
  const maintenanceLevel = preferences.maintenanceLevel;
  const budget = preferences.budget;

  // Select plants based on garden type and orientation
  const availablePlants = plantDatabase[gardenType] || plantDatabase.edible;
  const suitablePlants = availablePlants.filter(plant => 
    plant.suitableFor.includes(orientation) && 
    plant.maintenance === maintenanceLevel
  );

  // If no plants match maintenance level, get all suitable plants
  const selectedPlants = suitablePlants.length > 0 
    ? suitablePlants.slice(0, 4) 
    : availablePlants.filter(plant => plant.suitableFor.includes(orientation)).slice(0, 4);

  // Generate layout recommendations
  const layout = generateLayoutRecommendations(balconyInfo, selectedPlants);

  // Calculate irrigation needs
  const irrigation = calculateIrrigationNeeds(area, selectedPlants);

  // Calculate expected yield for edible gardens
  const expectedYield = gardenType === 'edible' 
    ? calculateExpectedYield(area, selectedPlants)
    : null;

  return {
    plants: selectedPlants,
    layout,
    irrigation,
    expectedYield
  };
};

const generateLayoutRecommendations = (balconyInfo, plants) => {
  const area = parseFloat(balconyInfo.width) * parseFloat(balconyInfo.depth);
  const orientation = balconyInfo.orientation;
  const recommendations = [];

  // Basic layout recommendations
  if (area < 2) {
    recommendations.push({
      description: 'Use vertical space with hanging baskets and railing planters',
      reasoning: 'Small balcony space optimized with vertical gardening'
    });
  } else if (area < 5) {
    recommendations.push({
      description: 'Mix of floor planters and hanging baskets for variety',
      reasoning: 'Medium space allows for diverse planting options'
    });
  } else {
    recommendations.push({
      description: 'Create zones with different planter types and heights',
      reasoning: 'Large space enables creative garden design'
    });
  }

  // Orientation-specific recommendations
  if (['S', 'SE', 'SW'].includes(orientation)) {
    recommendations.push({
      description: 'Place sun-loving plants in south-facing areas',
      reasoning: 'Maximum sun exposure for optimal growth'
    });
  } else if (['N', 'NW'].includes(orientation)) {
    recommendations.push({
      description: 'Focus on shade-tolerant plants and use reflective surfaces',
      reasoning: 'Limited sunlight requires careful plant selection'
    });
  }

  // Wind considerations for high floors
  if (parseInt(balconyInfo.floorNumber) > 10) {
    recommendations.push({
      description: 'Use wind-resistant planters and secure all containers',
      reasoning: 'High floors experience stronger winds'
    });
  }

  return recommendations;
};

const calculateIrrigationNeeds = (area, plants) => {
  // Calculate based on area and plant water needs
  const highWaterPlants = plants.filter(plant => plant.waterNeeds === 'High').length;
  const moderateWaterPlants = plants.filter(plant => plant.waterNeeds === 'Moderate').length;
  
  // Base calculation: 1 dripper per 2 square meters + additional for high water plants
  let baseDrippers = Math.ceil(area / 2);
  let additionalDrippers = highWaterPlants * 0.5 + moderateWaterPlants * 0.25;
  
  const totalDrippers = Math.ceil(baseDrippers + additionalDrippers);
  
  // Determine system type based on size
  let systemType = 'Basic';
  if (totalDrippers > 8) {
    systemType = 'Advanced';
  } else if (totalDrippers > 4) {
    systemType = 'Standard';
  }

  return {
    soliDrippers: totalDrippers,
    type: systemType
  };
};

const calculateExpectedYield = (area, plants) => {
  const ediblePlants = plants.filter(plant => 
    ['Tomatoes', 'Strawberries', 'Peppers', 'Basil', 'Mint'].includes(plant.name)
  );
  
  if (ediblePlants.length === 0) return null;

  // Rough yield estimation based on area and plant types
  const yieldPerPlant = {
    'Tomatoes': '2-3 lbs per plant',
    'Strawberries': '1-2 lbs per plant',
    'Peppers': '1-2 lbs per plant',
    'Basil': 'Continuous harvest',
    'Mint': 'Continuous harvest'
  };

  const totalPlants = Math.min(ediblePlants.length * 2, Math.floor(area * 2));
  
  return `${totalPlants} plants yielding fresh produce throughout the season`;
};

export const analyzeExposure = (balconyInfo) => {
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