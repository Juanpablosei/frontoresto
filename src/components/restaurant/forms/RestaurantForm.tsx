import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { useTranslation } from '../../../hooks/useTranslation';
import { RestaurantFormData, RestaurantFormProps } from './types';

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<RestaurantFormData>({
    mode: 'onChange'
  });

  const onSubmitForm = (data: RestaurantFormData) => {
    onSubmit(data);
  };

  return (
    <div className="restaurant-form">
      <div className="restaurant-form__header">
        <h1>{t('restaurant.createTitle')}</h1>
        <p>{t('restaurant.createSubtitle')}</p>
      </div>

      {error && (
        <div className="restaurant-form__error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="restaurant-form__content">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            🏪 {t('restaurant.restaurantName')}
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            placeholder={t('restaurant.namePlaceholder')}
            {...register('name', {
              required: t('auth.validation.restaurantNameRequired'),
              minLength: {
                value: 3,
                message: t('auth.validation.restaurantNameMinLength')
              }
            })}
          />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            📝 {t('common.description')}
          </label>
          <textarea
            id="description"
            className={`form-textarea ${errors.description ? 'form-textarea--error' : ''}`}
            placeholder={t('restaurant.descriptionPlaceholder')}
            rows={4}
            {...register('description', {
              required: t('auth.validation.descriptionRequired'),
              minLength: {
                value: 10,
                message: t('auth.validation.descriptionMinLength')
              },
              maxLength: {
                value: 500,
                message: t('auth.validation.descriptionMaxLength')
              }
            })}
          />
          {errors.description && (
            <span className="form-error">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            📍 {t('restaurant.address')}
          </label>
          <input
            id="address"
            type="text"
            className={`form-input ${errors.address ? 'form-input--error' : ''}`}
            placeholder={t('restaurant.addressPlaceholder')}
            {...register('address', {
              required: t('auth.validation.addressRequired'),
              minLength: {
                value: 10,
                message: t('auth.validation.addressMinLength')
              }
            })}
          />
          {errors.address && (
            <span className="form-error">{errors.address.message}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              📞 {t('restaurant.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
              placeholder={t('restaurant.phonePlaceholder')}
              {...register('phone', {
                required: t('auth.validation.phoneRequired'),
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: t('auth.validation.phoneInvalid')
                }
              })}
            />
            {errors.phone && (
              <span className="form-error">{errors.phone.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              📧 {t('restaurant.email')}
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              placeholder={t('restaurant.emailPlaceholder')}
              {...register('email', {
                required: t('auth.validation.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('auth.validation.emailInvalid')
                }
              })}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="website" className="form-label">
              🌐 {t('restaurant.websiteLabel')}
            </label>
            <input
              id="website"
              type="url"
              className={`form-input ${errors.website ? 'form-input--error' : ''}`}
              placeholder={t('restaurant.websitePlaceholder')}
              {...register('website', {
                required: t('auth.validation.websiteRequired'),
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: t('auth.validation.websiteInvalid')
                }
              })}
            />
            {errors.website && (
              <span className="form-error">{errors.website.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="clientId" className="form-label">
              {t('restaurant.clientId')}
            </label>
            <input
              id="clientId"
              type="text"
              className={`form-input ${errors.clientId ? 'form-input--error' : ''}`}
              placeholder={t('restaurant.clientIdPlaceholder')}
              {...register('clientId', {
                required: t('auth.validation.clientIdRequired'),
                pattern: {
                  value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
                  message: t('auth.validation.clientIdInvalid')
                }
              })}
            />
            {errors.clientId && (
              <span className="form-error">{errors.clientId.message}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={!isValid || isLoading}
          >
            {isLoading ? t('restaurant.creatingRestaurant') : t('restaurant.createButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
