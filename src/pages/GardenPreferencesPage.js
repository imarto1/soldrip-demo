import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Sprout, 
  Palette, 
  Settings, 
  DollarSign,
  Carrot,
  Flower,
  Leaf,
  Baby,
  Zap,
  Heart
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';
import { 
  PageWrapper, 
  PageHeader, 
  FormSection, 
  RadioCard 
} from '../components';

const GardenPreferencesPage = () => {
  const { preferences, updatePreferences } = useGardenStore();
  const { t, getSection } = useTranslation();
  const preferencesTranslations = getSection('preferences');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: preferences,
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Update store whenever form values change with debouncing
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updatePreferences(watchedValues);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  const gardenTypes = [
    {
      value: 'edible',
      label: preferencesTranslations.gardenTypes.edible.label,
      description: preferencesTranslations.gardenTypes.edible.description,
      icon: <Carrot className="w-6 h-6" />,
      examples: preferencesTranslations.gardenTypes.edible.examples
    },
    {
      value: 'ornamental',
      label: preferencesTranslations.gardenTypes.ornamental.label,
      description: preferencesTranslations.gardenTypes.ornamental.description,
      icon: <Flower className="w-6 h-6" />,
      examples: preferencesTranslations.gardenTypes.ornamental.examples
    },
    {
      value: 'low-maintenance',
      label: preferencesTranslations.gardenTypes.lowMaintenance.label,
      description: preferencesTranslations.gardenTypes.lowMaintenance.description,
      icon: <Leaf className="w-6 h-6" />,
      examples: preferencesTranslations.gardenTypes.lowMaintenance.examples
    },
    {
      value: 'kid-friendly',
      label: preferencesTranslations.gardenTypes.kidFriendly.label,
      description: preferencesTranslations.gardenTypes.kidFriendly.description,
      icon: <Baby className="w-6 h-6" />,
      examples: preferencesTranslations.gardenTypes.kidFriendly.examples
    },
    {
      value: 'medicinal',
      label: preferencesTranslations.gardenTypes.medicinal.label,
      description: preferencesTranslations.gardenTypes.medicinal.description,
      icon: <Heart className="w-6 h-6" />,
      examples: preferencesTranslations.gardenTypes.medicinal.examples
    },
    {
      value: 'mixed',
      label: preferencesTranslations.gardenTypes.mixed.label,
      description: preferencesTranslations.gardenTypes.mixed.description,
      icon: <Sprout className="w-6 h-6" />,
      examples: preferencesTranslations.gardenTypes.mixed.examples
    }
  ];

  const visualStyles = [
    {
      value: 'mediterranean',
      label: preferencesTranslations.visualStyles.mediterranean.label,
      description: preferencesTranslations.visualStyles.mediterranean.description,
      color: 'bg-orange-100 border-orange-300'
    },
    {
      value: 'tropical',
      label: preferencesTranslations.visualStyles.tropical.label,
      description: preferencesTranslations.visualStyles.tropical.description,
      color: 'bg-green-100 border-green-300'
    },
    {
      value: 'desert',
      label: preferencesTranslations.visualStyles.desert.label,
      description: preferencesTranslations.visualStyles.desert.description,
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      value: 'minimalist',
      label: preferencesTranslations.visualStyles.minimalist.label,
      description: preferencesTranslations.visualStyles.minimalist.description,
      color: 'bg-gray-100 border-gray-300'
    },
    {
      value: 'cottage',
      label: preferencesTranslations.visualStyles.cottage.label,
      description: preferencesTranslations.visualStyles.cottage.description,
      color: 'bg-pink-100 border-pink-300'
    },
    {
      value: 'modern',
      label: preferencesTranslations.visualStyles.modern.label,
      description: preferencesTranslations.visualStyles.modern.description,
      color: 'bg-blue-100 border-blue-300'
    }
  ];

  const maintenanceLevels = [
    {
      value: 'low',
      label: preferencesTranslations.maintenanceLevels.low.label,
      description: preferencesTranslations.maintenanceLevels.low.description,
      icon: <Zap className="w-5 h-5" />
    },
    {
      value: 'medium',
      label: preferencesTranslations.maintenanceLevels.medium.label,
      description: preferencesTranslations.maintenanceLevels.medium.description,
      icon: <Settings className="w-5 h-5" />
    },
    {
      value: 'high',
      label: preferencesTranslations.maintenanceLevels.high.label,
      description: preferencesTranslations.maintenanceLevels.high.description,
      icon: <Heart className="w-5 h-5" />
    }
  ];

  const budgets = [
    { value: 'budget', label: preferencesTranslations.budgets.budget.label, description: preferencesTranslations.budgets.budget.description },
    { value: 'standard', label: preferencesTranslations.budgets.standard.label, description: preferencesTranslations.budgets.standard.description },
    { value: 'premium', label: preferencesTranslations.budgets.premium.label, description: preferencesTranslations.budgets.premium.description },
    { value: 'luxury', label: preferencesTranslations.budgets.luxury.label, description: preferencesTranslations.budgets.luxury.description }
  ];

  return (
    <PageWrapper>
      <PageHeader
        icon={<Palette />}
        title={preferencesTranslations.title}
        subtitle={preferencesTranslations.subtitle}
      />

        <div className="space-y-8">
          {/* Garden Type */}
          <FormSection 
            title={preferencesTranslations.gardenType}
            icon={<Sprout className="w-5 h-5" />}
            error={errors.gardenType}
          >
            {gardenTypes.map((type) => (
              <RadioCard
                key={type.value}
                value={type.value}
                label={type.label}
                description={type.description}
                examples={type.examples}
                icon={type.icon}
                register={register}
                name="gardenType"
                required={true}
              />
            ))}
          </FormSection>

          {/* Visual Style */}
          <FormSection 
            title={preferencesTranslations.visualStyle}
            icon={<Palette className="w-5 h-5" />}
            error={errors.visualStyle}
          >
            {visualStyles.map((style) => (
              <RadioCard
                key={style.value}
                value={style.value}
                label={style.label}
                description={style.description}
                color={style.color}
                register={register}
                name="visualStyle"
                required={true}
              />
            ))}
          </FormSection>

          {/* Maintenance Level */}
          <FormSection 
            title={preferencesTranslations.maintenanceLevel}
            icon={<Settings className="w-5 h-5" />}
            error={errors.maintenanceLevel}
            gridCols="md:grid-cols-3"
          >
            {maintenanceLevels.map((level) => (
              <RadioCard
                key={level.value}
                value={level.value}
                label={level.label}
                description={level.description}
                icon={level.icon}
                register={register}
                name="maintenanceLevel"
                required={true}
              />
            ))}
          </FormSection>

          {/* Budget */}
          <FormSection 
            title={preferencesTranslations.budget}
            icon={<DollarSign className="w-5 h-5" />}
            error={errors.budget}
          >
            {budgets.map((budget) => (
              <RadioCard
                key={budget.value}
                value={budget.value}
                label={budget.label}
                description={budget.description}
                register={register}
                name="budget"
                required={true}
              />
            ))}
          </FormSection>
        </div>
      </PageWrapper>
    );
  };

export default GardenPreferencesPage; 