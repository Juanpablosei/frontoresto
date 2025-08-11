import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';
import AddProductModal from './AddProductModal';
import { MockIngredient } from '../../mock/productsData';

interface ProductsTabProps {
  products: MockIngredient[];
  onAddProduct: (product: Omit<MockIngredient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onEditProduct: (productId: string, productData: Omit<MockIngredient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onToggleProductStatus: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onToggleProductStatus,
  onDeleteProduct
}) => {
  const { t } = useTranslation();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getDangerColor,
    getSuccessColor,
    getInfoColor,
    getWarningColor
  } = useThemeColors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MockIngredient | null>(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleSaveProduct = (productData: Omit<MockIngredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      // Si estamos editando, llamar a onEditProduct
      onEditProduct(editingProduct.id, productData);
    } else {
      // Si estamos creando, llamar a onAddProduct
      onAddProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            📦 {t('restaurant.products')}({products.length})
          </h3>
          <Button
            variant="primary"
            onClick={handleAddProduct}
          >
            ➕ {t('restaurant.addProduct')}
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noProducts')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addProductsToOperate')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr 
                  className="border-b"
                  style={{ borderColor: getCardBorder() }}
                >
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.product')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.category')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.price')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.stock')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Proveedor
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.status')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr 
                    key={product.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: index % 2 === 0 ? 'transparent' : `${getCardBackground()}50`
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getInfoColor() }}
                        >
                          <span className="text-white text-sm">🍽️</span>
                        </div>
                        <div>
                          <span 
                            className="font-semibold text-sm block"
                            style={{ color: getTextColor(900) }}
                          >
                            {product.name}
                          </span>
                          <span 
                            className="text-xs block"
                            style={{ color: getTextColor(600) }}
                          >
                            {product.description}
                          </span>
                          {product.allergens.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {product.allergens.map((allergen: string, idx: number) => (
                                <span 
                                  key={idx}
                                  className="px-1 py-0.5 text-xs rounded bg-yellow-100 text-yellow-800"
                                  style={{ 
                                    backgroundColor: getWarningColor() + '20',
                                    color: getWarningColor()
                                  }}
                                >
                                  {allergen}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getInfoColor() }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span 
                          className="font-semibold text-sm block"
                          style={{ color: getTextColor(900) }}
                        >
                          ${product.price.toLocaleString()}
                        </span>
                        <span 
                          className="text-xs block"
                          style={{ color: getTextColor(600) }}
                        >
                          Costo: ${product.cost.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white`}
                          style={{
                            backgroundColor: product.stock > product.minStock ? getSuccessColor() : 
                                         product.stock > 0 ? getWarningColor() : getDangerColor()
                          }}
                        >
                          {product.stock} {product.unit}
                        </span>
                        {product.stock <= product.minStock && (
                          <span 
                            className="text-xs block mt-1"
                            style={{ color: getWarningColor() }}
                          >
                            Stock bajo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {product.supplier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          product.isActive ? '' : ''
                        }`}
                        style={{
                          backgroundColor: product.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {product.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          onClick={() => handleEditProduct(product.id)}
                          title={t('restaurant.editProduct')}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={() => onToggleProductStatus(product.id)}
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={product.isActive ? t('restaurant.deactivateProduct') : t('restaurant.activateProduct')}
                        >
                          {product.isActive ? '🔴' : '🟢'}
                        </button>
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={() => onDeleteProduct(product.id)}
                          style={{ 
                            color: getDangerColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.deleteProduct')}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        initialData={editingProduct}
        isEditing={!!editingProduct}
      />
    </div>
  );
};

export default ProductsTab;
