// Quote Generator for calculating garden costs
// This generates realistic pricing based on the garden configuration

const planterPricing = {
  hanging: { name: 'Hanging Basket', price: 15, material: 'Plastic' },
  window: { name: 'Window Box', price: 25, material: 'Resin' },
  railing: { name: 'Railing Planter', price: 20, material: 'Metal' },
  floor: { name: 'Floor Planter', price: 35, material: 'Ceramic' },
  vertical: { name: 'Vertical Garden', price: 45, material: 'Fabric' }
};

const plantPricing = {
  'Basil': { price: 8, type: 'Herb' },
  'Tomatoes': { price: 12, type: 'Vegetable' },
  'Strawberries': { price: 10, type: 'Fruit' },
  'Mint': { price: 6, type: 'Herb' },
  'Peppers': { price: 11, type: 'Vegetable' },
  'Petunias': { price: 7, type: 'Flower' },
  'Geraniums': { price: 9, type: 'Flower' },
  'Begonias': { price: 8, type: 'Flower' },
  'Marigolds': { price: 6, type: 'Flower' },
  'Snake Plant': { price: 15, type: 'Houseplant' },
  'ZZ Plant': { price: 18, type: 'Houseplant' },
  'Pothos': { price: 12, type: 'Houseplant' },
  'Succulents': { price: 8, type: 'Succulent' },
  'Sunflowers': { price: 5, type: 'Flower' },
  'Snapdragons': { price: 7, type: 'Flower' },
  'Chives': { price: 6, type: 'Herb' },
  'Lavender': { price: 10, type: 'Herb' },
  'Chamomile': { price: 8, type: 'Herb' },
  'Aloe Vera': { price: 12, type: 'Succulent' },
  'Echinacea': { price: 9, type: 'Flower' }
};

const irrigationPricing = {
  Basic: { dripperPrice: 3, controllerPrice: 25 },
  Standard: { dripperPrice: 4, controllerPrice: 45 },
  Advanced: { dripperPrice: 5, controllerPrice: 75 }
};

const soilPricing = {
  budget: { price: 8, name: 'Basic Potting Mix' },
  standard: { price: 12, name: 'Premium Potting Mix' },
  premium: { price: 18, name: 'Organic Potting Mix' },
  luxury: { price: 25, name: 'Specialty Garden Soil' }
};

const fertilizerPricing = {
  budget: { price: 8, name: 'Basic Fertilizer' },
  standard: { price: 15, name: 'Balanced Fertilizer' },
  premium: { price: 22, name: 'Organic Fertilizer' },
  luxury: { price: 35, name: 'Premium Plant Food' }
};

export const generateQuote = (balconyInfo, preferences, visualConfig, recommendations) => {
  const items = [];
  let totalCost = 0;

  // Calculate planter costs
  const planterCounts = {};
  visualConfig.planters.forEach(planter => {
    planterCounts[planter.type] = (planterCounts[planter.type] || 0) + 1;
  });

  Object.entries(planterCounts).forEach(([type, quantity]) => {
    const planter = planterPricing[type];
    const price = planter.price * quantity;
    totalCost += price;
    
    items.push({
      name: planter.name,
      quantity: quantity,
      unitPrice: planter.price,
      price: price,
      category: 'Planters'
    });
  });

  // Calculate plant costs
  const plantCounts = {};
  Object.values(visualConfig.selectedPlants).forEach(plant => {
    if (plant) {
      plantCounts[plant.name] = (plantCounts[plant.name] || 0) + 1;
    }
  });

  Object.entries(plantCounts).forEach(([plantName, quantity]) => {
    const plant = plantPricing[plantName];
    if (plant) {
      const price = plant.price * quantity;
      totalCost += price;
      
      items.push({
        name: plantName,
        quantity: quantity,
        unitPrice: plant.price,
        price: price,
        category: 'Plants'
      });
    }
  });

  // Calculate irrigation costs
  const irrigation = irrigationPricing[recommendations.irrigation.type];
  const dripperCost = irrigation.dripperPrice * recommendations.irrigation.soliDrippers;
  const controllerCost = irrigation.controllerPrice;
  const irrigationTotal = dripperCost + controllerCost;
  totalCost += irrigationTotal;

  items.push({
    name: 'SoliDripper System',
    quantity: 1,
    unitPrice: irrigationTotal,
    price: irrigationTotal,
    category: 'Irrigation',
    details: `${recommendations.irrigation.soliDrippers} drippers + controller`
  });

  // Calculate soil costs
  const soilNeeded = Math.ceil(visualConfig.planters.length * 0.5); // 0.5 bags per planter
  const soil = soilPricing[preferences.budget];
  const soilCost = soil.price * soilNeeded;
  totalCost += soilCost;

  items.push({
    name: soil.name,
    quantity: soilNeeded,
    unitPrice: soil.price,
    price: soilCost,
    category: 'Soil'
  });

  // Calculate fertilizer costs
  const fertilizer = fertilizerPricing[preferences.budget];
  const fertilizerCost = fertilizer.price;
  totalCost += fertilizerCost;

  items.push({
    name: fertilizer.name,
    quantity: 1,
    unitPrice: fertilizer.price,
    price: fertilizerCost,
    category: 'Fertilizer'
  });

  // Add accessories based on garden type and budget
  const accessories = generateAccessories(preferences, balconyInfo);
  accessories.forEach(accessory => {
    totalCost += accessory.price;
    items.push(accessory);
  });

  // Calculate installation cost (30% of materials for standard, 50% for premium)
  const installationRate = preferences.budget === 'premium' || preferences.budget === 'luxury' ? 0.5 : 0.3;
  const installationCost = Math.round(totalCost * installationRate);

  return {
    items: items,
    totalCost: Math.round(totalCost),
    installationCost: installationCost,
    currency: 'USD'
  };
};

const generateAccessories = (preferences, balconyInfo) => {
  const accessories = [];

  // Basic tools
  accessories.push({
    name: 'Garden Tool Set',
    quantity: 1,
    unitPrice: 15,
    price: 15,
    category: 'Tools'
  });

  // Watering can
  accessories.push({
    name: 'Watering Can',
    quantity: 1,
    unitPrice: 12,
    price: 12,
    category: 'Tools'
  });

  // Wind protection for high floors
  if (parseInt(balconyInfo.floorNumber) > 10) {
    accessories.push({
      name: 'Wind Protection Netting',
      quantity: 1,
      unitPrice: 18,
      price: 18,
      category: 'Protection'
    });
  }

  // Rain protection if not already present
  if (!balconyInfo.hasRainProtection) {
    accessories.push({
      name: 'Rain Cover',
      quantity: 1,
      unitPrice: 25,
      price: 25,
      category: 'Protection'
    });
  }

  // Premium accessories for higher budgets
  if (preferences.budget === 'premium' || preferences.budget === 'luxury') {
    accessories.push({
      name: 'Garden Thermometer',
      quantity: 1,
      unitPrice: 8,
      price: 8,
      category: 'Monitoring'
    });

    accessories.push({
      name: 'pH Testing Kit',
      quantity: 1,
      unitPrice: 12,
      price: 12,
      category: 'Monitoring'
    });
  }

  // Luxury accessories
  if (preferences.budget === 'luxury') {
    accessories.push({
      name: 'Smart Garden Monitor',
      quantity: 1,
      unitPrice: 45,
      price: 45,
      category: 'Smart Technology'
    });

    accessories.push({
      name: 'Decorative Garden Stones',
      quantity: 1,
      unitPrice: 20,
      price: 20,
      category: 'Decoration'
    });
  }

  return accessories;
};

export const calculateBudgetCompatibility = (totalCost, budget) => {
  const budgetRanges = {
    budget: { min: 50, max: 150 },
    standard: { min: 150, max: 300 },
    premium: { min: 300, max: 500 },
    luxury: { min: 500, max: 1000 }
  };

  const range = budgetRanges[budget];
  if (!range) return 'unknown';

  if (totalCost <= range.max) {
    return 'within';
  } else if (totalCost <= range.max * 1.2) {
    return 'slightly_above';
  } else {
    return 'above';
  }
}; 