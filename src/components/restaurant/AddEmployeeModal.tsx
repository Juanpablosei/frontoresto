import React, { useState } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useTranslation } from '../../hooks/useTranslation';
import Button from '../buttons/Button';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: {
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
  }) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'WAITER',
    status: 'ACTIVE'
  });

  const { 
    getModalBackground, 
    getModalOverlay, 
    getTextColor, 
    getInputBackground, 
    getInputBorder, 
    getInputFocusBorder,
    getCardBorder
  } = useThemeColors();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      onAddEmployee(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'WAITER',
        status: 'ACTIVE'
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: getModalOverlay() }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl"
        style={{ backgroundColor: getModalBackground() }}
      >
        <div 
          className="p-6 border-b"
          style={{ borderColor: getCardBorder() }}
        >
          <h2 
            className="text-xl font-semibold"
            style={{ color: getTextColor(900) }}
          >
            ➕ {t('employees.addEmployeeTitle')}
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: getTextColor(600) }}
          >
            {t('employees.addEmployeeDescription')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              {t('employees.fullName')} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-200"
              style={{
                backgroundColor: getInputBackground(),
                borderColor: getInputBorder(),
                color: getTextColor(900),
              }}
              onFocus={(e) => { e.target.style.borderColor = getInputFocusBorder(); }}
              onBlur={(e) => { e.target.style.borderColor = getInputBorder(); }}
              placeholder={t('employees.namePlaceholder')}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              {t('common.email')} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-200"
              style={{
                backgroundColor: getInputBackground(),
                borderColor: getInputBorder(),
                color: getTextColor(900),
              }}
              onFocus={(e) => { e.target.style.borderColor = getInputFocusBorder(); }}
              onBlur={(e) => { e.target.style.borderColor = getInputBorder(); }}
              placeholder={t('employees.emailPlaceholder')}
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              {t('employees.phone')} *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-200"
              style={{
                backgroundColor: getInputBackground(),
                borderColor: getInputBorder(),
                color: getTextColor(900),
              }}
              onFocus={(e) => { e.target.style.borderColor = getInputFocusBorder(); }}
              onBlur={(e) => { e.target.style.borderColor = getInputBorder(); }}
              placeholder={t('employees.phonePlaceholder')}
              required
            />
          </div>

          {/* Rol */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              {t('employees.role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-200"
              style={{
                backgroundColor: getInputBackground(),
                borderColor: getInputBorder(),
                color: getTextColor(900),
              }}
              onFocus={(e) => { e.target.style.borderColor = getInputFocusBorder(); }}
              onBlur={(e) => { e.target.style.borderColor = getInputBorder(); }}
            >
              <option value="WAITER">{t('employees.roles.WAITER')}</option>
              <option value="COOK">{t('employees.roles.COOK')}</option>
              <option value="MANAGER">{t('employees.roles.MANAGER')}</option>
              <option value="CASHIER">{t('employees.roles.CASHIER')}</option>
              <option value="HOST">{t('employees.roles.HOST')}</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              {t('employees.status')}
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-200"
              style={{
                backgroundColor: getInputBackground(),
                borderColor: getInputBorder(),
                color: getTextColor(900),
              }}
              onFocus={(e) => { e.target.style.borderColor = getInputFocusBorder(); }}
              onBlur={(e) => { e.target.style.borderColor = getInputBorder(); }}
            >
              <option value="ACTIVE">{t('common.active')}</option>
              <option value="INACTIVE">{t('common.inactive')}</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              {t('employees.addEmployee')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
