// Translations for Balcony Garden AI
export const translations = {
  en: {
    // Welcome Page
      welcome: {
    title: "Design Your Perfect Balcony Garden",
    subtitle: "Transform your balcony into a thriving garden with AI-powered recommendations. Get personalized plant suggestions, smart irrigation planning, and beautiful 3D visualizations.",
    startButton: "Start Building Your Garden",
    languageButton: "Language & Settings",
    languageTitle: "Language & Currency Settings",
    languageLabel: "Language / שפה",
    currencyLabel: "Currency / מטבע",
    currentLanguage: "Current Language:",
    currentCurrency: "Current Currency:",
    englishLabel: "English",
    hebrewLabel: "Hebrew",
    usDollarLabel: "US Dollar",
    israeliShekelLabel: "Israeli Shekel",
      features: {
        aiRecommendations: "AI-Powered Recommendations",
        aiDescription: "Get personalized plant and layout suggestions based on your balcony's unique conditions",
        sunAnalysis: "Sun & Weather Analysis",
        sunDescription: "Advanced analysis of sunlight, wind, and rain exposure for optimal plant placement",
        irrigation: "Smart Irrigation Planning",
        irrigationDescription: "Automated SoliDripper system design for efficient watering",
        visualConfig: "Visual Configuration",
        visualDescription: "Drag-and-drop interface to customize your garden layout",
        visualization: "3D Visualization",
        vizDescription: "See your garden come to life with realistic previews",
        quotes: "Instant Quotes",
        quotesDescription: "Get detailed cost breakdowns and material lists"
      },
      howItWorks: "How It Works",
      steps: {
        step1: "Tell us about your balcony",
        step1Desc: "Dimensions, orientation, and location",
        step2: "Share your preferences",
        step2Desc: "Garden type, style, and maintenance level",
        step3: "Get AI recommendations",
        step3Desc: "Personalized plant and layout suggestions",
        step4: "Visualize & order",
        step4Desc: "3D preview and instant quote generation"
      }
    },

    // Balcony Info Page
    balconyInfo: {
      title: "Tell us about your balcony",
      subtitle: "We'll use this information to analyze sun exposure and recommend the perfect plants for your space.",
      dimensions: "Dimensions",
      width: "Width (meters)",
      depth: "Depth (meters)",
      totalArea: "Total area:",
      orientation: "Orientation",
      floorLevel: "Floor Level",
      floorNumber: "Floor Number",
      location: "Location (Optional)",
      zipCode: "ZIP Code",
      city: "City",
      locationInfo: "Providing your location helps us analyze local weather patterns and provide more accurate recommendations.",
      rainProtection: "Rain Protection",
      rainProtectionText: "My balcony has rain protection (overhang, awning, etc.)",
      orientations: {
        N: { label: "North", description: "Minimal direct sunlight, good for shade-loving plants" },
        NE: { label: "Northeast", description: "Morning sun, moderate exposure" },
        E: { label: "East", description: "Morning sun, gentle exposure" },
        SE: { label: "Southeast", description: "Morning to early afternoon sun" },
        S: { label: "South", description: "Full sun exposure, best for most plants" },
        SW: { label: "Southwest", description: "Afternoon sun, hot exposure" },
        W: { label: "West", description: "Afternoon sun, moderate to hot" },
        NW: { label: "Northwest", description: "Late afternoon sun, moderate exposure" }
      }
    },

    // Garden Preferences Page
    preferences: {
      title: "What's your garden style?",
      subtitle: "Help us understand your preferences to create the perfect garden design.",
      gardenType: "Garden Type",
      visualStyle: "Visual Style",
      maintenanceLevel: "Maintenance Level",
      budget: "Budget Range",
      examples: "Examples",
      gardenTypes: {
        edible: { label: "Edible Garden", description: "Herbs, vegetables, and fruits for fresh homegrown produce", examples: "Tomatoes, basil, strawberries, peppers" },
        ornamental: { label: "Ornamental Garden", description: "Beautiful flowers and decorative plants for visual appeal", examples: "Petunias, marigolds, geraniums, begonias" },
        lowMaintenance: { label: "Low-Maintenance", description: "Hardy plants that require minimal care and attention", examples: "Succulents, snake plants, ZZ plants, pothos" },
        kidFriendly: { label: "Kid-Friendly", description: "Safe, interactive plants perfect for children to learn and explore", examples: "Sunflowers, snapdragons, mint, chives" },
        medicinal: { label: "Medicinal Garden", description: "Herbs and plants with healing properties", examples: "Lavender, chamomile, aloe vera, echinacea" },
        mixed: { label: "Mixed Garden", description: "Combination of different types for variety and interest", examples: "Mix of edibles, flowers, and herbs" }
      },
      visualStyles: {
        mediterranean: { label: "Mediterranean", description: "Warm, rustic style with olive trees, lavender, and terracotta" },
        tropical: { label: "Tropical", description: "Lush, vibrant plants with bold colors and large leaves" },
        desert: { label: "Desert", description: "Minimalist with succulents, cacti, and warm earth tones" },
        minimalist: { label: "Minimalist", description: "Clean, simple design with few plants and lots of space" },
        cottage: { label: "Cottage", description: "Charming, romantic style with climbing plants and vintage touches" },
        modern: { label: "Modern", description: "Contemporary design with geometric planters and architectural plants" }
      },
      maintenanceLevels: {
        low: { label: "Low Maintenance", description: "Water once a week, minimal pruning" },
        medium: { label: "Medium Maintenance", description: "Water 2-3 times per week, regular pruning" },
        high: { label: "High Maintenance", description: "Daily attention, frequent pruning and care" }
      },
      budgets: {
        budget: { label: "Budget ($50-150)", description: "Basic setup with essential items" },
        standard: { label: "Standard ($150-300)", description: "Good quality materials and variety" },
        premium: { label: "Premium ($300-500)", description: "High-end materials and premium plants" },
        luxury: { label: "Luxury ($500+)", description: "Custom design with rare plants and features" }
      }
    },

    // AI Recommendations Page
    aiRecommendations: {
      title: "Your AI Garden Recommendations",
      subtitle: "Based on your balcony analysis, here's what we recommend for your perfect garden.",
      analyzing: "Analyzing your balcony...",
      analyzingDesc: "Our AI is analyzing sun exposure, wind patterns, and creating personalized recommendations.",
      sunAnalysis: "Sun analysis",
      windPatterns: "Wind patterns",
      rainExposure: "Rain exposure",
      exposureAnalysis: "Balcony Exposure Analysis",
      sunExposure: "Sun Exposure",
      windExposure: "Wind Exposure",
      rainProtection: "Rain Protection",
      recommendedPlants: "Recommended Plants",
      layoutRecommendations: "Layout Recommendations",
      irrigationSystem: "Irrigation System",
      expectedYield: "Expected Yield",
      soliDrippers: "SoliDrippers",
      systemType: "System Type",
      wateringSchedule: "Watering Schedule",
      automatedSystem: "Your automated irrigation system will ensure optimal watering for all plants."
    },

    // Visual Configurator Page
    visualConfigurator: {
      title: "Configure Your Garden Layout",
      subtitle: "Drag and drop planters to create your perfect garden arrangement.",
      balconyLayout: "Balcony Layout",
      irrigation: "Irrigation",
      size: "size",
      instructions: "💡 Click planters to select plants • Drag to move • Use controls on the right",
      addPlanters: "Add Planters",
      selectPlant: "Select Plant",
      emptyPlanter: "Empty Planter",
      noPlantSelected: "No plant selected",
      irrigationSystem: "Irrigation System",
      irrigationInfo: "Toggle irrigation overlay to see dripper placement in your layout.",
      planterTypes: {
        hanging: { name: "Hanging Basket", size: "small" },
        window: { name: "Window Box", size: "medium" },
        railing: { name: "Railing Planter", size: "small" },
        floor: { name: "Floor Planter", size: "large" },
        vertical: { name: "Vertical Garden", size: "medium" }
      }
    },

    // Visualization Page
    visualization: {
      title: "Your Garden Visualization",
      subtitle: "See your balcony garden come to life with this realistic preview.",
      generating: "Generating your garden visualization...",
      generatingDesc: "Creating a beautiful 3D preview of your balcony garden.",
      renderingPlants: "Rendering plants",
      addingLighting: "Adding lighting",
      finalizing: "Finalizing",
      gardenPreview: "3D Garden Preview",
      irrigation: "Irrigation",
      rotate: "Rotate",
      noGardenConfigured: "No garden configured yet",
      goBackToConfigure: "Go back to configure your planters",
      frontView: "Front View",
      sideView: "Side View",
      gardenSummary: "Garden Summary",
      planters: "Total Planters",
      plants: "Plants Selected",
      gardenStyle: "Garden Style",
      maintenance: "Maintenance",
      weatherConditions: "Weather Conditions",
      sunExposure: "Sun Exposure",
      windExposure: "Wind Exposure",
      rainProtection: "Rain Protection",
      irrigationSystem: "Irrigation System",
      wateringSchedule: "Watering Schedule",
      automatedIrrigation: "Your automated irrigation system will ensure optimal watering for all plants.",
      downloadOptions: "Download Options",
      downloadPreview: "Download 3D Preview",
      saveGardenPlan: "Save Garden Plan"
    },

    // Quote Page
    quote: {
      title: "Your Garden Quote",
      subtitle: "Complete breakdown of costs for your perfect balcony garden.",
      calculating: "Calculating your quote...",
      calculatingDesc: "Analyzing your garden design and generating a detailed cost breakdown.",
      calculatingMaterials: "Calculating materials",
      addingPlants: "Adding plants",
      finalizingCosts: "Finalizing costs",
      purchaseOptions: "Purchase Options",
      materialsOnly: "Materials Only",
      diyInstallation: "DIY installation",
      withInstallation: "With Installation",
      professionalSetup: "Professional setup",
      costBreakdown: "Cost Breakdown",
      quantity: "Qty:",
      each: "each",
      professionalInstallation: "Professional Installation",
      includesSetup: "Includes setup, testing, and 30-day support.",
      total: "Total",
      budgetCheck: "Budget Check",
      yourBudget: "Your Budget:",
      totalCost: "Total Cost:",
      withinBudget: "Within budget range",
      aboveBudget: "Above budget range",
      downloadPDF: "Download PDF Quote",
      saveGardenPlan: "Save Garden Plan",
      readyToStart: "Ready to Start?",
      buyMaterials: "Buy Materials",
      buyWithInstallation: "Buy with Installation",
      scheduleConsultation: "Schedule Consultation",
      diyInstallationDesc: "DIY installation with detailed instructions and video guides included.",
      guarantee: "30-Day Guarantee",
      guaranteeDesc: "Not satisfied? We'll help you adjust your garden or provide a full refund.",
      gardenSummary: "Garden Summary",
      specifications: "Specifications",
      components: "Components",
      downloadOptions: "Download Options"
    },

    // Common
    common: {
      previous: "Previous",
      next: "Next",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      remove: "Remove",
      select: "Select",
      choose: "Choose",
      required: "Required",
      optional: "Optional"
    },

    // Progress Bar
    progress: {
      welcome: "Welcome",
      balconyInfo: "Balcony Info",
      preferences: "Preferences",
      aiAnalysis: "AI Analysis",
      configure: "Configure",
      visualize: "Visualize",
      quote: "Quote"
    }
  },

  he: {
    // Welcome Page
    welcome: {
      title: "עיצב את גינת המרפסת המושלמת שלך",
      subtitle: "הפוך את המרפסת שלך לגינה משגשגת עם המלצות מבוססות בינה מלאכותית. קבל הצעות צמחים מותאמות אישית, תכנון השקיה חכם וויזואליזציות תלת מימד יפות.",
      startButton: "התחל לבנות את הגינה שלך",
      languageButton: "שפה והגדרות",
      languageTitle: "הגדרות שפה ומטבע",
      languageLabel: "Language / שפה",
      currencyLabel: "Currency / מטבע",
      currentLanguage: "שפה נוכחית:",
      currentCurrency: "מטבע נוכחי:",
      features: {
        aiRecommendations: "המלצות מבוססות בינה מלאכותית",
        aiDescription: "קבל הצעות צמחים ופריסה מותאמות אישית בהתבסס על תנאי המרפסת הייחודיים שלך",
        sunAnalysis: "ניתוח שמש ומזג אוויר",
        sunDescription: "ניתוח מתקדם של חשיפה לשמש, רוח וגשם למיקום צמחים אופטימלי",
        irrigation: "תכנון השקיה חכם",
        irrigationDescription: "עיצוב מערכת SoliDripper אוטומטית להשקיה יעילה",
        visualConfig: "הגדרה ויזואלית",
        visualDescription: "ממשק גרירה ושחרור להתאמה אישית של פריסת הגינה שלך",
        visualization: "ויזואליזציה תלת מימד",
        vizDescription: "ראה את הגינה שלך מתעוררת לחיים עם תצוגות מקדימות ריאליסטיות",
        quotes: "הצעות מחיר מיידיות",
        quotesDescription: "קבל פירוט עלויות מפורט ורשימת חומרים"
      },
      howItWorks: "איך זה עובד",
      steps: {
        step1: "ספר לנו על המרפסת שלך",
        step1Desc: "מידות, כיוון ומיקום",
        step2: "שתף את העדפותיך",
        step2Desc: "סוג גינה, סגנון ורמת תחזוקה",
        step3: "קבל המלצות בינה מלאכותית",
        step3Desc: "הצעות צמחים ופריסה מותאמות אישית",
        step4: "ויזואליזציה וזמנה",
        step4Desc: "תצוגה מקדימה תלת מימד ויצירת הצעת מחיר מיידית"
      }
    },

    // Balcony Info Page
    balconyInfo: {
      title: "ספר לנו על המרפסת שלך",
      subtitle: "נשתמש במידע זה כדי לנתח חשיפה לשמש ולהמליץ על הצמחים המושלמים למרחב שלך.",
      dimensions: "מידות",
      width: "רוחב (מטרים)",
      depth: "עומק (מטרים)",
      totalArea: "שטח כולל:",
      orientation: "כיוון",
      floorLevel: "קומה",
      floorNumber: "מספר קומה",
      location: "מיקום (אופציונלי)",
      zipCode: "מיקוד",
      city: "עיר",
      locationInfo: "מתן המיקום שלך עוזר לנו לנתח דפוסי מזג אוויר מקומיים ולספק המלצות מדויקות יותר.",
      rainProtection: "הגנה מפני גשם",
      rainProtectionText: "למרפסת שלי יש הגנה מפני גשם (מרזב, סוכך וכו')",
      orientations: {
        N: { label: "צפון", description: "חשיפה מינימלית לשמש ישירה, טוב לצמחים אוהבי צל" },
        NE: { label: "צפון-מזרח", description: "שמש בוקר, חשיפה מתונה" },
        E: { label: "מזרח", description: "שמש בוקר, חשיפה עדינה" },
        SE: { label: "דרום-מזרח", description: "שמש בוקר עד צהריים מוקדם" },
        S: { label: "דרום", description: "חשיפה מלאה לשמש, הטוב ביותר לרוב הצמחים" },
        SW: { label: "דרום-מערב", description: "שמש אחר הצהריים, חשיפה חמה" },
        W: { label: "מערב", description: "שמש אחר הצהריים, מתונה עד חמה" },
        NW: { label: "צפון-מערב", description: "שמש אחר הצהריים מאוחר, חשיפה מתונה" }
      }
    },

    // Garden Preferences Page
    preferences: {
      title: "מה הסגנון של הגינה שלך?",
      subtitle: "עזור לנו להבין את העדפותיך כדי ליצור עיצוב גינה מושלם.",
      gardenType: "סוג גינה",
      visualStyle: "סגנון ויזואלי",
      maintenanceLevel: "רמת תחזוקה",
      budget: "טווח תקציב",
      examples: "דוגמאות",
      gardenTypes: {
        edible: { label: "גינת ירק", description: "עשבי תיבול, ירקות ופירות לייצור ביתי טרי", examples: "עגבניות, בזיליקום, תותים, פלפלים" },
        ornamental: { label: "גינה דקורטיבית", description: "פרחים יפים וצמחים דקורטיביים לערעור ויזואלי", examples: "פטוניות, ציפורני חתול, גרניום, ביגוניות" },
        lowMaintenance: { label: "תחזוקה נמוכה", description: "צמחים עמידים שדורשים טיפול מינימלי ותשומת לב", examples: "צמחים בשרניים, סנסוורייה, צמח ZZ, פוטוס" },
        kidFriendly: { label: "ידידותי לילדים", description: "צמחים בטוחים ואינטראקטיביים מושלמים לילדים ללמוד ולחקור", examples: "חמניות, לוע הארי, נענע, עירית" },
        medicinal: { label: "גינה רפואית", description: "עשבי תיבול וצמחים עם תכונות מרפא", examples: "לבנדר, קמומיל, אלוורה, אכינצאה" },
        mixed: { label: "גינה מעורבת", description: "שילוב של סוגים שונים למגוון ועניין", examples: "ערבוב של ירקות, פרחים ועשבי תיבול" }
      },
      visualStyles: {
        mediterranean: { label: "ים תיכוני", description: "סגנון חם וכפרי עם עצי זית, לבנדר וטרקוטה" },
        tropical: { label: "טרופי", description: "צמחים ירוקים וצבעוניים עם צבעים נועזים ועלים גדולים" },
        desert: { label: "מדברי", description: "מינימליסטי עם צמחים בשרניים, קקטוסים וגווני אדמה חמים" },
        minimalist: { label: "מינימליסטי", description: "עיצוב נקי ופשוט עם מעט צמחים והרבה מקום" },
        cottage: { label: "בית כפרי", description: "סגנון מקסים ורומנטי עם צמחים מטפסים ונגיעות וינטג'" },
        modern: { label: "מודרני", description: "עיצוב עכשווי עם עציצים גיאומטריים וצמחים אדריכליים" }
      },
      maintenanceLevels: {
        low: { label: "תחזוקה נמוכה", description: "השקיה פעם בשבוע, גיזום מינימלי" },
        medium: { label: "תחזוקה בינונית", description: "השקיה 2-3 פעמים בשבוע, גיזום קבוע" },
        high: { label: "תחזוקה גבוהה", description: "תשומת לב יומית, גיזום וטיפול תכופים" }
      },
      budgets: {
        budget: { label: "תקציב (₪180-550)", description: "התקנה בסיסית עם פריטים חיוניים" },
        standard: { label: "סטנדרטי (₪550-1100)", description: "חומרים באיכות טובה ומגוון" },
        premium: { label: "פרימיום (₪1100-1800)", description: "חומרים באיכות גבוהה וצמחים פרימיום" },
        luxury: { label: "יוקרה (₪1800+)", description: "עיצוב מותאם אישית עם צמחים נדירים ותכונות" }
      }
    },

    // AI Recommendations Page
    aiRecommendations: {
      title: "המלצות הגינה של הבינה המלאכותית שלך",
      subtitle: "תבסס על ניתוח המרפסת שלך, הנה מה שאנו ממליצים לגינה המושלמת שלך.",
      analyzing: "מנתח את המרפסת שלך...",
      analyzingDesc: "הבינה המלאכותית שלנו מנתחת חשיפה לשמש, דפוסי רוח ויוצרת המלצות מותאמות אישית.",
      sunAnalysis: "ניתוח שמש",
      windPatterns: "דפוסי רוח",
      rainExposure: "חשיפה לגשם",
      exposureAnalysis: "ניתוח חשיפת המרפסת",
      sunExposure: "חשיפה לשמש",
      windExposure: "חשיפה לרוח",
      rainProtection: "הגנה מפני גשם",
      recommendedPlants: "צמחים מומלצים",
      layoutRecommendations: "המלצות פריסה",
      irrigationSystem: "מערכת השקיה",
      expectedYield: "תנובה צפויה",
      soliDrippers: "טפטפות",
      systemType: "סוג מערכת",
      wateringSchedule: "לוח השקיה",
      automatedSystem: "מערכת ההשקיה האוטומטית שלך תבטיח השקיה אופטימלית לכל הצמחים."
    },

    // Visual Configurator Page
    visualConfigurator: {
      title: "הגדר את פריסת הגינה שלך",
      subtitle: "גרור ושחרר עציצים כדי ליצור את סידור הגינה המושלם שלך.",
      balconyLayout: "פריסת מרפסת",
      irrigation: "השקיה",
      size: "גודל",
      instructions: "💡 לחץ על עציצים לבחירת צמחים • גרור להזזה • השתמש בפקדים מימין",
      addPlanters: "הוסף עציצים",
      selectPlant: "בחר צמח",
      emptyPlanter: "עציץ ריק",
      noPlantSelected: "לא נבחר צמח",
      irrigationSystem: "מערכת השקיה",
      irrigationInfo: "החלף שכבת השקיה כדי לראות מיקום טפטפות בפריסה שלך.",
      planterTypes: {
        hanging: { name: "סל תלוי", size: "קטן" },
        window: { name: "קופסת חלון", size: "בינוני" },
        railing: { name: "עציץ מעקה", size: "קטן" },
        floor: { name: "עציץ רצפה", size: "גדול" },
        vertical: { name: "גינה אנכית", size: "בינוני" }
      }
    },

    // Visualization Page
    visualization: {
      title: "ויזואליזציית הגינה שלך",
      subtitle: "ראה את גינת המרפסת שלך מתעוררת לחיים עם תצוגה מקדימה ריאליסטית זו.",
      generating: "מייצר ויזואליזציית גינה...",
      generatingDesc: "יוצר תצוגה מקדימה תלת מימד יפה של גינת המרפסת שלך.",
      renderingPlants: "מרנדר צמחים",
      addingLighting: "מוסיף תאורה",
      finalizing: "מסיים",
      gardenPreview: "תצוגה מקדימה תלת מימד",
      irrigation: "השקיה",
      rotate: "סובב",
      noGardenConfigured: "לא הוגדרה גינה עדיין",
      goBackToConfigure: "חזור להגדרת העציצים שלך",
      frontView: "תצוגה קדמית",
      sideView: "תצוגה צדדית",
      gardenSummary: "סיכום גינה",
      specifications: "מפרטים",
      components: "רכיבים",
      balconySize: "גודל מרפסת:",
      orientation: "כיוון:",
      floorLevel: "קומה:",
      gardenType: "סוג גינה:",
      planters: "סך הכל עציצים",
      plants: "צמחים נבחרים",
      gardenStyle: "סגנון גינה",
      maintenance: "תחזוקה",
      weatherConditions: "תנאי מזג אוויר",
      sunExposure: "חשיפה לשמש",
      windExposure: "חשיפה לרוח",
      rainProtection: "הגנה מפני גשם",
      irrigationSystem: "מערכת השקיה",
      soliDrippers: "טפטפות",
      systemType: "סוג מערכת",
      wateringSchedule: "לוח השקיה",
      automatedIrrigation: "מערכת ההשקיה האוטומטית שלך תבטיח השקיה אופטימלית לכל הצמחים.",
      downloadOptions: "אפשרויות הורדה",
      downloadPreview: "הורד תצוגה מקדימה תלת מימד",
      saveGardenPlan: "שמור תוכנית גינה"
    },

    // Quote Page
    quote: {
      title: "הצעת המחיר של הגינה שלך",
      subtitle: "פירוט מלא של עלויות לגינת המרפסת המושלמת שלך.",
      calculating: "מחשב את הצעת המחיר שלך...",
      calculatingDesc: "מנתח את עיצוב הגינה שלך ומייצר פירוט עלויות מפורט.",
      calculatingMaterials: "מחשב חומרים",
      addingPlants: "מוסיף צמחים",
      finalizingCosts: "מסיים עלויות",
      purchaseOptions: "אפשרויות רכישה",
      materialsOnly: "חומרים בלבד",
      diyInstallation: "התקנה עצמית",
      withInstallation: "עם התקנה",
      professionalSetup: "התקנה מקצועית",
      costBreakdown: "פירוט עלויות",
      quantity: "כמות:",
      each: "כל אחד",
      professionalInstallation: "התקנה מקצועית",
      includesSetup: "כולל התקנה, בדיקה ותמיכה ל-30 יום.",
      total: "סה\"כ",
      budgetCheck: "בדיקת תקציב",
      yourBudget: "התקציב שלך:",
      totalCost: "עלות כוללת:",
      withinBudget: "בתוך טווח התקציב",
      aboveBudget: "מעל טווח התקציב",
      downloadPDF: "הורד הצעת מחיר PDF",
      saveGardenPlan: "שמור תוכנית גינה",
      readyToStart: "מוכן להתחיל?",
      buyMaterials: "קנה חומרים",
      buyWithInstallation: "קנה עם התקנה",
      scheduleConsultation: "תזמן התייעצות",
      diyInstallationDesc: "התקנה עצמית עם הוראות מפורטות ומדריכי וידאו כלולים.",
      guarantee: "ערבות 30 יום",
      guaranteeDesc: "לא מרוצה? נעזור לך להתאים את הגינה או לספק החזר כספי מלא.",
      gardenSummary: "סיכום גינה",
      specifications: "מפרטים",
      components: "רכיבים",
      downloadOptions: "אפשרויות הורדה"
    },

    // Common
    common: {
      previous: "קודם",
      next: "הבא",
      loading: "טוען...",
      error: "שגיאה",
      success: "הצלחה",
      cancel: "ביטול",
      save: "שמור",
      delete: "מחק",
      edit: "ערוך",
      add: "הוסף",
      remove: "הסר",
      select: "בחר",
      choose: "בחר",
      required: "נדרש",
      optional: "אופציונלי"
    },

    // Progress Bar
    progress: {
      welcome: "ברוכים הבאים",
      balconyInfo: "מידע מרפסת",
      preferences: "העדפות",
      aiAnalysis: "ניתוח בינה מלאכותית",
      configure: "הגדר",
      visualize: "ויזואליזציה",
      quote: "הצעת מחיר"
    }
  }
};

/**
 * Get translation for a specific key
 * @param {string} language - Language code ('en' or 'he')
 * @param {string} key - Translation key (e.g., 'welcome.title')
 * @returns {string} - Translated text
 */
export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let translation = translations[language] || translations.en;
  
  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k];
    } else {
      // Fallback to English
      translation = translations.en;
      for (const fallbackKey of keys) {
        if (translation && translation[fallbackKey]) {
          translation = translation[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof translation === 'string' ? translation : key;
};

/**
 * Get nested translation object
 * @param {string} language - Language code ('en' or 'he')
 * @param {string} section - Section key (e.g., 'welcome')
 * @returns {object} - Translation object for the section
 */
export const getTranslationSection = (language, section) => {
  return translations[language]?.[section] || translations.en[section] || {};
}; 