import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Ruler, 
  Navigation, 
  Building, 
  MapPin, 
  Umbrella,
  Info
} from 'lucide-react';
import useGardenStore from '../store/gardenStore';
import { useTranslation } from '../utils/useTranslation';
import { 
  PageWrapper, 
  PageHeader, 
  FormSection, 
  Input, 
  RadioCard,
  InfoCard,
  Grid
} from '../components';

const BalconyInfoPage = () => {
  const { balconyInfo, updateBalconyInfo } = useGardenStore();
  const { t, getSection, isRTL } = useTranslation();
  const balconyInfoTranslations = getSection('balconyInfo');
  const isUpdatingRef = useRef(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: balconyInfo,
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Update store whenever form values change with debouncing
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateBalconyInfo(watchedValues);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  const orientations = [
    { value: 'N', label: balconyInfoTranslations.orientations.N.label, description: balconyInfoTranslations.orientations.N.description },
    { value: 'NE', label: balconyInfoTranslations.orientations.NE.label, description: balconyInfoTranslations.orientations.NE.description },
    { value: 'E', label: balconyInfoTranslations.orientations.E.label, description: balconyInfoTranslations.orientations.E.description },
    { value: 'SE', label: balconyInfoTranslations.orientations.SE.label, description: balconyInfoTranslations.orientations.SE.description },
    { value: 'S', label: balconyInfoTranslations.orientations.S.label, description: balconyInfoTranslations.orientations.S.description },
    { value: 'SW', label: balconyInfoTranslations.orientations.SW.label, description: balconyInfoTranslations.orientations.SW.description },
    { value: 'W', label: balconyInfoTranslations.orientations.W.label, description: balconyInfoTranslations.orientations.W.description },
    { value: 'NW', label: balconyInfoTranslations.orientations.NW.label, description: balconyInfoTranslations.orientations.NW.description }
  ];

  return (
    <PageWrapper maxWidth="max-w-2xl">
      <PageHeader
        icon={<Building />}
        title={balconyInfoTranslations.title}
        subtitle={balconyInfoTranslations.subtitle}
      />

        <div className="space-y-8">
          {/* Dimensions */}
          <FormSection
            title={balconyInfoTranslations.dimensions}
            icon={<Ruler className="w-5 h-5" />}
          >
            <Grid cols={2} gap={6}>
              <Input
                label={balconyInfoTranslations.width}
                type="number"
                step="0.1"
                min="0.5"
                max="20"
                error={errors.width}
                placeholder="e.g., 3.5"
                {...register('width', { 
                  required: 'Width is required',
                  min: { value: 0.5, message: 'Minimum width is 0.5m' },
                  max: { value: 20, message: 'Maximum width is 20m' }
                })}
              />
              <Input
                label={balconyInfoTranslations.depth}
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                error={errors.depth}
                placeholder="e.g., 1.2"
                {...register('depth', { 
                  required: 'Depth is required',
                  min: { value: 0.5, message: 'Minimum depth is 0.5m' },
                  max: { value: 10, message: 'Maximum depth is 10m' }
                })}
              />
            </Grid>

            {/* Area calculation */}
            {watchedValues.width && watchedValues.depth && (
              <InfoCard
                variant="primary"
                description={`${balconyInfoTranslations.totalArea} ${(watchedValues.width * watchedValues.depth).toFixed(1)} m²`}
              />
            )}
          </FormSection>

          {/* Orientation */}
          <FormSection
            title={balconyInfoTranslations.orientation}
            icon={<Navigation className="w-5 h-5" />}
            error={errors.orientation}
          >
            {orientations.map((orientation) => (
              <RadioCard
                key={orientation.value}
                value={orientation.value}
                label={orientation.label}
                description={orientation.description}
                register={register}
                name="orientation"
                required={true}
              />
            ))}
          </FormSection>

          {/* Floor Level */}
          <FormSection
            title={balconyInfoTranslations.floorLevel}
            icon={<Building className="w-5 h-5" />}
          >
            <Input
              label={balconyInfoTranslations.floorNumber}
              type="number"
              min="1"
              max="100"
              error={errors.floorNumber}
              placeholder="e.g., 5"
              {...register('floorNumber', { 
                required: 'Floor number is required',
                min: { value: 1, message: 'Floor number must be at least 1' },
                max: { value: 100, message: 'Floor number cannot exceed 100' }
              })}
            />
          </FormSection>

          {/* Location (Optional) */}
          <FormSection
            title={balconyInfoTranslations.location}
            icon={<MapPin className="w-5 h-5" />}
          >
            <Grid cols={2} gap={6}>
              <Input
                label={balconyInfoTranslations.zipCode}
                type="text"
                placeholder="e.g., 12345"
                {...register('zipCode')}
              />
              <Input
                label={balconyInfoTranslations.city}
                type="text"
                placeholder="e.g., New York"
                {...register('city')}
              />
            </Grid>
            
            <InfoCard
              variant="blue"
              icon={<Info className="w-5 h-5" />}
              description={balconyInfoTranslations.locationInfo}
            />
          </FormSection>

          {/* Rain Protection */}
          <FormSection
            title={balconyInfoTranslations.rainProtection}
            icon={<Umbrella className="w-5 h-5" />}
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('hasRainProtection')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-3"
              />
              <span className="text-gray-700">
                {balconyInfoTranslations.rainProtectionText}
              </span>
            </label>
          </FormSection>
        </div>
      </PageWrapper>
    );
  };

export default BalconyInfoPage; 