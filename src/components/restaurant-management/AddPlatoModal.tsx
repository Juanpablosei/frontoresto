import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';
import { MockPlato, PlatoIngredient, platoCategories, difficultyLevels } from '../../mock/platosData';
import { MockIngredient } from '../../mock/productsData';

interface AddPlatoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platoData: Omit<MockPlato, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: MockPlato;
  isEditing?: boolean;
  availableIngredients: MockIngredient[];
}

const AddPlatoModal: React.FC<AddPlatoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
  availableIngredients
}) => {
  const { t } = useTranslation();
  const { getInfoColor } = useThemeColors();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'PRINCIPAL',
    price: 0,
    preparationTime: 15,
    difficulty: 'MEDIO' as const,
    servings: 1,
    instructions: '',
    allergens: [] as string[]
  });

  const [selectedIngredients, setSelectedIngredients] = useState<PlatoIngredient[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form when editing
  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        setFormData({
          name: initialData.name,
          description: initialData.description,
          category: initialData.category,
          price: initialData.price,
          preparationTime: initialData.preparationTime,
          difficulty: initialData.difficulty,
          servings: initialData.servings,
          instructions: initialData.instructions,
          allergens: initialData.allergens
        });
        setSelectedIngredients(initialData.ingredients);
      } else {
        // Reset form for new plato
        setFormData({
          name: '',
          description: '',
          category: 'PRINCIPAL',
          price: 0,
          preparationTime: 15,
          difficulty: 'MEDIO',
          servings: 1,
          instructions: '',
          allergens: []
        });
        setSelectedIngredients([]);
      }
      setErrors({});
    }
  }, [isOpen, isEditing, initialData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

  const handleAddIngredient = () => {
    const newIngredient: PlatoIngredient = {
      ingredientId: '',
      name: '',
      quantity: 1,
      unit: 'unidad',
      cost: 0
    };
    setSelectedIngredients(prev => [...prev, newIngredient]);
  };

  const handleRemoveIngredient = (index: number) => {
    setSelectedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof PlatoIngredient, value: any) => {
    setSelectedIngredients(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      // Auto-fill name and cost when ingredientId changes
      if (field === 'ingredientId') {
        const ingredient = availableIngredients.find(ing => ing.id === value);
        if (ingredient) {
          updated[index].name = ingredient.name;
          updated[index].cost = ingredient.cost * updated[index].quantity;
        }
      }
      
      // Recalculate cost when quantity changes
      if (field === 'quantity') {
        const ingredient = availableIngredients.find(ing => ing.id === updated[index].ingredientId);
        if (ingredient) {
          updated[index].cost = ingredient.cost * value;
        }
      }
      
      return updated;
    });
  };

  const calculateTotalCost = () => {
    return selectedIngredients.reduce((total, ingredient) => total + ingredient.cost, 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('validation.required');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('validation.required');
    }

    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (formData.preparationTime <= 0) {
      newErrors.preparationTime = 'El tiempo de preparación debe ser mayor a 0';
    }

    if (formData.servings <= 0) {
      newErrors.servings = 'Las porciones deben ser mayor a 0';
    }

    if (selectedIngredients.length === 0) {
      newErrors.ingredients = 'Debe agregar al menos un ingrediente';
    }

    // Validate each ingredient
    selectedIngredients.forEach((ingredient, index) => {
      if (!ingredient.ingredientId) {
        newErrors[`ingredient_${index}`] = 'Debe seleccionar un ingrediente';
      }
      if (ingredient.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'La cantidad debe ser mayor a 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const totalCost = calculateTotalCost();
    
    const platoData: Omit<MockPlato, 'id' | 'createdAt' | 'updatedAt'> = {
      ...formData,
      cost: totalCost,
      isActive: true,
      ingredients: selectedIngredients,
      image: undefined
    };

    onSave(platoData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: 'PRINCIPAL',
      price: 0,
      preparationTime: 15,
      difficulty: 'MEDIO',
      servings: 1,
      instructions: '',
      allergens: []
    });
    setSelectedIngredients([]);
    setErrors({});
    onClose();
  };

  const handleFillExample = () => {
    // Buscar algunos ingredientes disponibles para el ejemplo
    const availableIngs = availableIngredients.slice(0, 3);
    
    if (availableIngs.length === 0) {
      alert('No hay ingredientes disponibles para el ejemplo');
      return;
    }

    // Llenar el formulario con datos de ejemplo
    setFormData({
      name: 'Milanesa con Puré de Papas',
      description: 'Milanesa de ternera empanada con puré de papas casero y ensalada',
      category: 'PRINCIPAL',
      price: 2500,
      preparationTime: 25,
      difficulty: 'MEDIO',
      servings: 1,
      instructions: '1. Empanar la carne en huevo y pan rallado\n2. Freír hasta dorar\n3. Preparar puré de papas\n4. Servir con ensalada',
      allergens: ['GLUTEN', 'HUEVOS']
    });

    // Agregar ingredientes de ejemplo
    const exampleIngredients: PlatoIngredient[] = availableIngs.map((ing, index) => ({
      ingredientId: ing.id,
      name: ing.name,
      quantity: index === 0 ? 1 : index === 1 ? 0.5 : 0.2, // 1 kg carne, 0.5 kg papas, 0.2 kg otros
      unit: ing.unit,
      cost: ing.cost
    }));

    setSelectedIngredients(exampleIngredients);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: getInfoColor() }}>
              {isEditing ? t('restaurant.editPlato') : t('restaurant.addPlato')}
            </h2>
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <Button
                  variant="accent"
                  size="small"
                  onClick={handleFillExample}
                >
                  {t('restaurant.fillExample')}
                </Button>
              )}
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('restaurant.plato')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ej: Milanesa con Puré"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('restaurant.category')} *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {platoCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('restaurant.description')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full p-3 border rounded-lg h-20 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Describe el plato..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Precio y tiempo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('restaurant.price')} *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  className={`w-full p-3 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('restaurant.preparationTime')} *
                </label>
                <input
                  type="number"
                  value={formData.preparationTime}
                  onChange={(e) => handleInputChange('preparationTime', parseInt(e.target.value) || 0)}
                  className={`w-full p-3 border rounded-lg ${errors.preparationTime ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="15"
                />
                <p className="text-sm text-gray-500 mt-1">{t('restaurant.minutes')}</p>
                {errors.preparationTime && <p className="text-red-500 text-sm mt-1">{errors.preparationTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('restaurant.servings')} *
                </label>
                <input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => handleInputChange('servings', parseInt(e.target.value) || 0)}
                  className={`w-full p-3 border rounded-lg ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="1"
                />
                {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
              </div>
            </div>

            {/* Dificultad */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('restaurant.difficulty')} *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>
                    {t(`restaurant.${level.toLowerCase()}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Instrucciones */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('restaurant.instructions')}
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
                placeholder="Instrucciones de preparación..."
              />
            </div>

            {/* Alérgenos */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('restaurant.allergens')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['GLUTEN', 'LÁCTEOS', 'HUEVOS', 'PESCADO', 'MARISCOS', 'FRUTOS_SECOS', 'SOJA', 'SESAMO'].map(allergen => (
                  <label key={allergen} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.allergens.includes(allergen)}
                      onChange={() => handleAllergenToggle(allergen)}
                      className="rounded"
                    />
                    <span className="text-sm">{allergen}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ingredientes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium">
                  {t('restaurant.ingredients')} *
                </label>
                <Button
                  variant="success"
                  size="small"
                  onClick={handleAddIngredient}
                >
                  + {t('restaurant.addProduct')}
                </Button>
              </div>

              {errors.ingredients && <p className="text-red-500 text-sm mb-2">{errors.ingredients}</p>}

              <div className="space-y-3">
                {selectedIngredients.map((ingredient, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Ingrediente *</label>
                        <select
                          value={ingredient.ingredientId}
                          onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}
                          className={`w-full p-2 border rounded ${errors[`ingredient_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Seleccionar ingrediente</option>
                          {availableIngredients.map(ing => (
                            <option key={ing.id} value={ing.id}>
                              {ing.name}
                            </option>
                          ))}
                        </select>
                        {errors[`ingredient_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`ingredient_${index}`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Cantidad *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={ingredient.quantity}
                          onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className={`w-full p-2 border rounded ${errors[`quantity_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors[`quantity_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`quantity_${index}`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Unidad</label>
                        <input
                          type="text"
                          value={ingredient.unit}
                          onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="unidad"
                        />
                      </div>

                      <div className="flex items-end">
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedIngredients.length > 0 && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium">
                    Costo total: ${calculateTotalCost().toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {isEditing ? t('common.save') : t('restaurant.addPlato')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlatoModal;
