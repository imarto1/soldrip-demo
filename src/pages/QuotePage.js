import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Download, 
  ShoppingCart, 
  Calendar,
  CheckCircle,
  DollarSign,
  Package,
  Truck,
  FileText
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { generateQuote } from '../utils/quoteGenerator';
import { formatCurrency, convertCurrency } from '../utils/currencyUtils';
import { useTranslation } from '../utils/useTranslation';
import { 
  PageWrapper, 
  PageHeader, 
  LoadingState, 
  Button,
  InfoCard,
  Grid
} from '../components';

const QuotePage = () => {
  const { 
    balconyInfo, 
    preferences, 
    visualConfig, 
    recommendations, 
    quote, 
    setQuote,
    settings
  } = useGardenStore();
  const { t, getSection, isRTL } = useTranslation();
  const quoteTranslations = getSection('quote');

  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedOption, setSelectedOption] = useState('materials');

  useEffect(() => {
    const generateQuoteData = async () => {
      setIsGenerating(true);
      
      // Simulate quote generation
      setTimeout(() => {
        const quoteData = generateQuote(balconyInfo, preferences, visualConfig, recommendations);
        setQuote(quoteData);
        setIsGenerating(false);
      }, 2000);
    };

    generateQuoteData();
  }, [balconyInfo, preferences, visualConfig, recommendations, setQuote]);

  const handleDownloadPDF = () => {
    // Simulate PDF generation
    console.log('Generating PDF...');
    // In a real implementation, this would call a PDF generation service
  };

  const handlePurchase = (type) => {
    console.log(`Purchase ${type} clicked`);
    // In a real implementation, this would redirect to checkout
  };

  const getBudgetRange = () => {
    const baseRanges = {
      budget: { min: 50, max: 150 },
      standard: { min: 150, max: 300 },
      premium: { min: 300, max: 500 },
      luxury: { min: 500, max: 1000 }
    };
    
    const range = baseRanges[preferences.budget] || baseRanges.standard;
    const minConverted = convertCurrency(range.min, 'USD', settings.currency);
    const maxConverted = convertCurrency(range.max, 'USD', settings.currency);
    
    return `${formatCurrency(minConverted, settings.currency)} - ${formatCurrency(maxConverted, settings.currency)}`;
  };

  if (isGenerating) {
    return (
      <LoadingState
        icon={<Calculator />}
        title={quoteTranslations.calculating}
        description={quoteTranslations.calculatingDesc}
        progressSteps={[
          quoteTranslations.calculatingMaterials,
          quoteTranslations.addingPlants,
          quoteTranslations.finalizingCosts
        ]}
      />
    );
  }

  return (
    <PageWrapper maxWidth="max-w-6xl">
      <PageHeader
        icon={<Calculator />}
        title={quoteTranslations.title}
        subtitle={quoteTranslations.subtitle}
      />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Purchase Options */}
            <div className="card">
              <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.purchaseOptions}</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedOption('materials')}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedOption === 'materials'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className={`font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.materialsOnly}</div>
                      <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.diyInstallation}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    {formatCurrency(convertCurrency(quote.totalCost, 'USD', settings.currency), settings.currency)}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedOption('installation')}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedOption === 'installation'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Truck className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className={`font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.withInstallation}</div>
                      <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.professionalSetup}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    {formatCurrency(convertCurrency(quote.totalCost + quote.installationCost, 'USD', settings.currency), settings.currency)}
                  </div>
                </button>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card">
              <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.costBreakdown}</h2>
              
              <div className="space-y-4">
                {quote.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                                              <div className={`font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{item.name}</div>
                      <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.quantity} {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(convertCurrency(item.price, 'USD', settings.currency), settings.currency)}
                      </div>
                                              <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                          {formatCurrency(convertCurrency(item.unitPrice, 'USD', settings.currency), settings.currency)} {quoteTranslations.each}
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Installation cost */}
              {selectedOption === 'installation' && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className={`font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.professionalInstallation}</div>
                      <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.includesSetup}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(convertCurrency(quote.installationCost, 'USD', settings.currency), settings.currency)}
                    </div>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.total}</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {formatCurrency(convertCurrency(selectedOption === 'installation' ? quote.totalCost + quote.installationCost : quote.totalCost, 'USD', settings.currency), settings.currency)}
                  </div>
                </div>
              </div>
            </div>

            {/* Garden Summary */}
            <div className="card">
              <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.gardenSummary}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.specifications}</h3>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.balconySize}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{balconyInfo.width}m × {balconyInfo.depth}m</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.orientation}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{balconyInfo.orientation}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.floorLevel}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{balconyInfo.floorNumber}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.gardenType}:</span>
                      <span className={`font-medium capitalize ${isRTL ? 'text-right' : 'text-left'}`}>{preferences.gardenType}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className={`font-semibold text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.components}</h3>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.planters}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{visualConfig.planters.length}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.plants}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{Object.keys(visualConfig.selectedPlants).length}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.soliDrippers}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.soliDrippers}</span>
                    </div>
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.systemType}:</span>
                      <span className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{recommendations.irrigation.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {/* Budget Check */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.budgetCheck}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.yourBudget}</span>
                  <span className="font-medium">{getBudgetRange()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.totalCost}</span>
                  <span className="font-medium">
                    {formatCurrency(convertCurrency(selectedOption === 'installation' ? quote.totalCost + quote.installationCost : quote.totalCost, 'USD', settings.currency), settings.currency)}
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  {selectedOption === 'installation' ? 
                    (quote.totalCost + quote.installationCost <= 500 ? (
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-green-600`}>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">{quoteTranslations.withinBudget}</span>
                      </div>
                    ) : (
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-orange-600`}>
                        <DollarSign className="w-5 h-5" />
                        <span className="font-medium">{quoteTranslations.aboveBudget}</span>
                      </div>
                    )) : (
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-green-600`}>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">{quoteTranslations.withinBudget}</span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="card">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.downloadOptions}</h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{quoteTranslations.downloadPDF}</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>{quoteTranslations.saveGardenPlan}</span>
                </button>
              </div>
            </div>

            {/* Call to Action */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.readyToStart}</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => handlePurchase(selectedOption)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {selectedOption === 'installation' ? quoteTranslations.buyWithInstallation : quoteTranslations.buyMaterials}
                  </span>
                </button>
                
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{quoteTranslations.scheduleConsultation}</span>
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {selectedOption === 'installation' 
                    ? quoteTranslations.includesSetup
                    : quoteTranslations.diyInstallationDesc
                  }
                </p>
              </div>
            </div>

            {/* Guarantee */}
            <div className="card bg-green-50 border-green-200">
              <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className={`font-semibold text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>{quoteTranslations.guarantee}</h3>
                  <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {quoteTranslations.guaranteeDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  };

export default QuotePage; 