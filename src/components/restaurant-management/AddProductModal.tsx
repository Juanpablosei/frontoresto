import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';
import { MockIngredient, ingredientCategories, measurementUnits, commonAllergens } from '../../mock/productsData';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<MockIngredient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: MockIngredient; // Datos iniciales para edición
  isEditing?: boolean; // Indica si estamos editando
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false
}) => {
  const { t } = useTranslation();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getInfoColor,
    getDangerColor,
    getSuccessColor
  } = useThemeColors();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    unit: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 0,
    supplier: '',
    allergens: [] as string[],
    expirationDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-llenar el formulario cuando se abre para editar
  useEffect(() => {
    if (isOpen && initialData && isEditing) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        unit: initialData.unit,
        price: initialData.price,
        cost: initialData.cost,
        stock: initialData.stock,
        minStock: initialData.minStock,
        supplier: initialData.supplier,
        allergens: initialData.allergens,
        expirationDate: initialData.expirationDate || ''
      });
    } else if (isOpen && !isEditing) {
      // Resetear formulario para crear nuevo
      setFormData({
        name: '',
        description: '',
        category: '',
        unit: '',
        price: 0,
        cost: 0,
        stock: 0,
        minStock: 0,
        supplier: '',
        allergens: [],
        expirationDate: ''
      });
    }
    setErrors({});
  }, [isOpen, initialData, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAllergenToggle = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (!formData.unit) {
      newErrors.unit = 'La unidad es requerida';
    }

    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (formData.cost <= 0) {
      newErrors.cost = 'El costo debe ser mayor a 0';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    if (formData.minStock < 0) {
      newErrors.minStock = 'El stock mínimo no puede ser negativo';
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = 'El proveedor es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newProduct = {
        ...formData,
        isActive: true
      };
      
      onSave(newProduct);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      unit: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      supplier: '',
      allergens: [],
      expirationDate: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border shadow-2xl"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 
              className="text-2xl font-bold"
              style={{ color: getTextColor(900) }}
            >
              {isEditing ? '✏️ Editar Ingrediente' : '➕ Agregar Nuevo Ingrediente'}
            </h2>
            <button
              onClick={handleClose}
              className="text-2xl hover:opacity-70 transition-opacity"
              style={{ color: getTextColor(600) }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Nombre del Ingrediente *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Arroz Blanco"
                />
                {errors.name && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar categoría</option>
                  {ingredientCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: getTextColor(700) }}
              >
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Descripción detallada del ingrediente..."
              />
              {errors.description && (
                <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Información de stock y precios */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Unidad de Medida *
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.unit ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar unidad</option>
                  {measurementUnits.map(unit => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.unit}
                  </p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Precio de Venta *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Costo *
                </label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.cost ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.cost && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.cost}
                  </p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Stock Actual
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.stock && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Stock Mínimo
                </label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    errors.minStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.minStock && (
                  <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                    {errors.minStock}
                  </p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: getTextColor(700) }}
                >
                  Fecha de Vencimiento
                </label>
                <input
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                />
              </div>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: getTextColor(700) }}
              >
                Proveedor *
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  errors.supplier ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nombre del proveedor"
              />
              {errors.supplier && (
                <p className="text-sm mt-1" style={{ color: getDangerColor() }}>
                  {errors.supplier}
                </p>
              )}
            </div>

            {/* Alérgenos */}
            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: getTextColor(700) }}
              >
                Alérgenos
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {commonAllergens.map(allergen => (
                  <label key={allergen} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allergens.includes(allergen)}
                      onChange={() => handleAllergenToggle(allergen)}
                      className="rounded border-gray-300"
                    />
                    <span 
                      className="text-sm"
                      style={{ color: getTextColor(700) }}
                    >
                      {allergen}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6 border-t" style={{ borderColor: getCardBorder() }}>
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {isEditing ? 'Actualizar Ingrediente' : 'Guardar Ingrediente'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
