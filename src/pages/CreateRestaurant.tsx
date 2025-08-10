import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../components/buttons';
import UserInfo from '../components/auth/UserInfo';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';

interface CreateRestaurantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

const CreateRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateRestaurantData>();

  const onSubmit = async (data: CreateRestaurantData) => {
    try {
      // Simular envío al backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Agregar el clientId del usuario autenticado
      const restaurantData = {
        ...data,
        clientId: user?.id || ''
      };
      
      console.log('Restaurante creado:', restaurantData);
      
      // Mostrar mensaje de éxito (aquí podrías usar un toast)
      alert(t('success.created'));
      
      // Redirigir de vuelta a la vista de restaurantes
      navigate('/restaurants');
    } catch (error) {
      console.error('Error al crear restaurante:', error);
      alert(t('errors.general'));
    }
  };

  const handleCancel = () => {
    navigate('/restaurants');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 pt-20">
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 py-8">
        <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 shadow-lg">➕ {t('restaurant.create')}</h1>
            <p className="text-white/90 text-lg">{t('restaurant.createDescription')}</p>
          </div>
          <div className="flex gap-4">
            <UserInfo />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="border-b border-amber-200 pb-8 mb-4">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 pb-2 border-b-2 border-amber-600">📋 {t('restaurant.basicInfo')}</h3>
              
              <div className="mb-6">
                <label htmlFor="name" className="block font-semibold text-amber-800 mb-2 text-base">🏪 {t('restaurant.restaurantName')} *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: t('auth.validation.restaurantNameRequired'),
                    minLength: {
                      value: 3,
                      message: t('auth.validation.restaurantNameMinLength')
                    }
                  })}
                  placeholder={t('restaurant.namePlaceholder')}
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block font-semibold text-amber-800 mb-2 text-base">📝 {t('common.description')}</label>
                <textarea
                  id="description"
                  {...register('description', {
                    required: t('auth.validation.descriptionRequired'),
                    minLength: {
                      value: 10,
                      message: t('auth.validation.descriptionMinLength')
                    }
                  })}
                  placeholder={t('restaurant.descriptionPlaceholder')}
                  rows={4}
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 resize-vertical min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.description.message}</span>
                )}
              </div>
            </div>

            <div className="border-b border-amber-200 pb-8 mb-4">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 pb-2 border-b-2 border-amber-600">📍 {t('restaurant.contactInfo')}</h3>
              
              <div className="mb-6">
                <label htmlFor="address" className="block font-semibold text-amber-800 mb-2 text-base">🏠 {t('restaurant.address')} *</label>
                <input
                  id="address"
                  type="text"
                  {...register('address', {
                    required: t('auth.validation.addressRequired')
                  })}
                  placeholder={t('restaurant.addressPlaceholder')}
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.address.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block font-semibold text-amber-800 mb-2 text-base">📞 {t('restaurant.phone')} *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: t('auth.validation.phoneRequired'),
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: t('auth.validation.phoneInvalid')
                      }
                    })}
                    placeholder={t('restaurant.phonePlaceholder')}
                    className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold text-amber-800 mb-2 text-base">📧 {t('restaurant.email')} *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: t('auth.validation.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('auth.validation.emailInvalid')
                      }
                    })}
                    placeholder={t('restaurant.emailPlaceholder')}
                    className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="website" className="block font-semibold text-amber-800 mb-2 text-base">🌐 {t('restaurant.websiteLabel')}</label>
                <input
                  id="website"
                  type="url"
                  {...register('website', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: t('auth.validation.websiteInvalid')
                    }
                  })}
                  placeholder={t('restaurant.websitePlaceholder')}
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.website ? 'border-red-500' : ''}`}
                />
                {errors.website && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.website.message}</span>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-8 border-t border-amber-200 flex-wrap">
              <Button
                type="button"
                variant="secondary"
                size="large"
                onClick={handleCancel}
              >
                ❌ {t('common.cancel')}
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? '🔄 ' + t('restaurant.creatingRestaurant') : '✅ ' + t('restaurant.createButton')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
