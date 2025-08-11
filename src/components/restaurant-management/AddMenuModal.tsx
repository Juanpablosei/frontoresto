import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';
import { MockMenu, MenuPlato, menuCategories } from '../../mock/menusData';
import { MockPlato } from '../../mock/platosData';

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menuData: Omit<MockMenu, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: MockMenu | null;
  isEditing?: boolean;
  availablePlatos: MockPlato[];
}

const AddMenuModal: React.FC<AddMenuModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
  availablePlatos
}) => {
  const { t } = useTranslation();
  const { getTextColor } = useThemeColors();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'PRINCIPAL',
    isActive: true
  });

                const [selectedPlatos, setSelectedPlatos] = useState<MenuPlato[]>([]);
              const [errors, setErrors] = useState<Record<string, string>>({});
              const [searchTerm, setSearchTerm] = useState('');
              const [showPlatoSelector, setShowPlatoSelector] = useState(false);

                // Pre-llenar formulario si estamos editando
              useEffect(() => {
                if (initialData && isEditing) {
                  setFormData({
                    name: initialData.name,
                    description: initialData.description,
                    category: initialData.category,
                    isActive: initialData.isActive
                  });
                  setSelectedPlatos(initialData.platos);
                } else {
                  setFormData({
                    name: '',
                    description: '',
                    category: 'PRINCIPAL',
                    isActive: true
                  });
                  setSelectedPlatos([]);
                }
                setErrors({});
                setSearchTerm('');
                setShowPlatoSelector(false);
              }, [initialData, isEditing, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

                // Filtrar platos disponibles basado en búsqueda y platos ya seleccionados
              const filteredPlatos = availablePlatos.filter(plato => {
                const matchesSearch = plato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    plato.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    plato.category.toLowerCase().includes(searchTerm.toLowerCase());
                const notSelected = !selectedPlatos.some(selected => selected.platoId === plato.id);
                return matchesSearch && notSelected;
              });

              const handleAddPlato = (plato: MockPlato) => {
                const newMenuPlato: MenuPlato = {
                  platoId: plato.id,
                  name: plato.name,
                  description: plato.description,
                  price: plato.price,
                  category: plato.category,
                  isActive: plato.isActive
                };
                setSelectedPlatos(prev => [...prev, newMenuPlato]);
                setSearchTerm('');
                setShowPlatoSelector(false);
              };

              const handleShowPlatoSelector = () => {
                setShowPlatoSelector(true);
                setSearchTerm('');
              };

  const handleRemovePlato = (index: number) => {
    setSelectedPlatos(prev => prev.filter((_, i) => i !== index));
  };

  const handleFillExample = () => {
    const availablePlatosExample = availablePlatos.slice(0, 2); // Tomar los primeros 2 platos disponibles
    if (availablePlatosExample.length === 0) {
      alert('No hay platos disponibles para el ejemplo');
      return;
    }

    setFormData({
      name: 'Menú Ejemplo',
      description: 'Menú de ejemplo con platos seleccionados',
      category: 'PRINCIPAL',
      isActive: true
    });

    const examplePlatos: MenuPlato[] = availablePlatosExample.map(plato => ({
      platoId: plato.id,
      name: plato.name,
      description: plato.description,
      price: plato.price,
      category: plato.category,
      isActive: plato.isActive
    }));

    setSelectedPlatos(examplePlatos);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('validation.required');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('validation.required');
    }

    if (selectedPlatos.length === 0) {
      newErrors.platos = t('validation.atLeastOnePlato');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const menuData: Omit<MockMenu, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        isActive: formData.isActive,
        platos: selectedPlatos
      };
      
      onSave(menuData);
      handleClose();
    }
  };

                const handleClose = () => {
                setFormData({
                  name: '',
                  description: '',
                  category: 'PRINCIPAL',
                  isActive: true
                });
                setSelectedPlatos([]);
                setErrors({});
                setSearchTerm('');
                setShowPlatoSelector(false);
                onClose();
              };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? t('restaurant.editMenu') : t('restaurant.addMenu')}
            </h2>
            <div className="flex gap-2">
              {!isEditing && (
                <Button variant="accent" size="small" onClick={handleFillExample}>
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
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información básica del menú */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('restaurant.menuName')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('restaurant.menuNamePlaceholder')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('restaurant.category')} *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {menuCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('restaurant.description')} *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('restaurant.menuDescriptionPlaceholder')}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              {t('restaurant.active')}
            </label>
          </div>

                                {/* Selección de platos */}
                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {t('restaurant.platos')} ({selectedPlatos.length})
                          </h3>
                          <Button variant="success" size="small" onClick={handleShowPlatoSelector}>
                            + {t('restaurant.addPlato')}
                          </Button>
                        </div>

                                    {errors.platos && (
                          <p className="text-red-500 text-sm mb-4">{errors.platos}</p>
                        )}

                        {/* Selector de platos con búsqueda */}
                        {showPlatoSelector && (
                          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-medium text-gray-800">
                                {t('restaurant.searchPlatos')}
                              </h4>
                              <button
                                onClick={() => setShowPlatoSelector(false)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            </div>
                            
                            <div className="mb-3">
                              <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t('restaurant.searchPlatosPlaceholder')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div className="max-h-48 overflow-y-auto space-y-2">
                              {filteredPlatos.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">
                                  {searchTerm ? t('restaurant.noPlatosFound') : t('restaurant.noPlatosAvailable')}
                                </div>
                              ) : (
                                filteredPlatos.map((plato) => (
                                  <div
                                    key={plato.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer"
                                    onClick={() => handleAddPlato(plato)}
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                          <span className="text-blue-600 text-sm">🍽️</span>
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-gray-800">{plato.name}</h5>
                                          <p className="text-sm text-gray-600">{plato.description}</p>
                                          <div className="flex gap-2 mt-1">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                              {plato.category}
                                            </span>
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                              ${plato.price.toLocaleString()}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Button variant="success" size="small">
                                      +
                                    </Button>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}

            {selectedPlatos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🍽️</div>
                <p>{t('restaurant.noPlatosSelected')}</p>
                <p className="text-sm">{t('restaurant.clickAddPlato')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedPlatos.map((plato, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🍽️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{plato.name}</h4>
                          <p className="text-sm text-gray-600">{plato.description}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {plato.category}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              ${plato.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="danger" size="small" onClick={() => handleRemovePlato(index)}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="secondary" onClick={handleClose}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? t('common.save') : t('restaurant.addMenu')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
