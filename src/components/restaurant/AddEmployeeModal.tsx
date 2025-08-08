import React, { useState } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';
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
            ➕ Agregar Nuevo Empleado
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: getTextColor(600) }}
          >
            Completa la información del empleado
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              Nombre Completo *
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
              placeholder="Ej: María González"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              Email *
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
              placeholder="maria@restaurant.com"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              Teléfono *
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
              placeholder="+54 9 11 1234-5678"
              required
            />
          </div>

          {/* Rol */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              Rol
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
              <option value="WAITER">Mesero/a</option>
              <option value="COOK">Cocinero/a</option>
              <option value="MANAGER">Gerente</option>
              <option value="CASHIER">Cajero/a</option>
              <option value="HOST">Anfitrión/a</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: getTextColor(700) }}
            >
              Estado
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
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
              <option value="VACATION">Vacaciones</option>
              <option value="SICK">Enfermo</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              fullWidth
              type="submit"
            >
              Agregar Empleado
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
