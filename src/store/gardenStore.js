import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGardenStore = create(
  persist(
    (set, get) => ({
      // Current step in the wizard
      currentStep: 0,
      
      // Language and currency settings
      settings: {
        language: 'en', // 'en' or 'he'
        currency: 'USD', // 'USD' or 'ILS'
      },
      
      // Balcony information
      balconyInfo: {
        width: '',
        depth: '',
        orientation: '',
        floorNumber: '',
        zipCode: '',
        city: '',
        hasRainProtection: false,
      },
      
      // Garden preferences
      preferences: {
        gardenType: '',
        visualStyle: '',
        maintenanceLevel: '',
        budget: '',
      },
      
      // AI recommendations
      recommendations: {
        layout: [],
        plants: [],
        irrigation: {
          soliDrippers: 0,
          type: '',
        },
        expectedYield: null,
      },
      
      // Visual configuration
      visualConfig: {
        planters: [],
        selectedPlants: {},
        irrigationOverlay: false,
      },
      
      // Quote and plan
      quote: {
        items: [],
        totalCost: 0,
        installationCost: 0,
      },
      
      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings }
      })),
      
      updateBalconyInfo: (info) => set((state) => ({
        balconyInfo: { ...state.balconyInfo, ...info }
      })),
      
      updatePreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs }
      })),
      
      setRecommendations: (recs) => set({ recommendations: recs }),
      
      updateVisualConfig: (config) => set((state) => ({
        visualConfig: { ...state.visualConfig, ...config }
      })),
      
      setQuote: (quote) => set({ quote }),
      
      // Navigation helpers
      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 6) 
      })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 0) 
      })),
      
      // Reset store
      resetStore: () => set({
        currentStep: 0,
        settings: {
          language: 'en',
          currency: 'USD',
        },
        balconyInfo: {
          width: '',
          depth: '',
          orientation: '',
          floorNumber: '',
          zipCode: '',
          city: '',
          hasRainProtection: false,
        },
        preferences: {
          gardenType: '',
          visualStyle: '',
          maintenanceLevel: '',
          budget: '',
        },
        recommendations: {
          layout: [],
          plants: [],
          irrigation: {
            soliDrippers: 0,
            type: '',
          },
          expectedYield: null,
        },
        visualConfig: {
          planters: [],
          selectedPlants: {},
          irrigationOverlay: false,
        },
        quote: {
          items: [],
          totalCost: 0,
          installationCost: 0,
        },
      }),
      
      // Validation helpers
      isBalconyInfoComplete: () => {
        const { balconyInfo } = get();
        return balconyInfo.width && balconyInfo.depth && balconyInfo.orientation && balconyInfo.floorNumber;
      },
      
      isPreferencesComplete: () => {
        const { preferences } = get();
        return preferences.gardenType && preferences.visualStyle && preferences.maintenanceLevel && preferences.budget;
      },
    }),
    {
      name: 'garden-store',
      partialize: (state) => ({
        balconyInfo: state.balconyInfo,
        preferences: state.preferences,
        recommendations: state.recommendations,
        visualConfig: state.visualConfig,
        quote: state.quote,
      }),
    }
  )
);

export default useGardenStore; 