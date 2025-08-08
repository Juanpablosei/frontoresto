import React, { useState } from 'react';
import { Restaurant, Table, Product, Menu, RestaurantStats } from './types';
import { Button } from '../../buttons';

interface RestaurantActionsProps {
  restaurant: Restaurant;
  onToggleStatus: (restaurantId: string) => void;
  isLoading: boolean;
}

const RestaurantActions: React.FC<RestaurantActionsProps> = ({
  restaurant,
  onToggleStatus,
  isLoading
}) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'products' | 'menus' | 'stats'>('tables');
  const [data, setData] = useState<{
    tables: Table[];
    products: Product[];
    menus: Menu[];
    stats: RestaurantStats | null;
  }>({
    tables: [],
    products: [],
    menus: [],
    stats: null
  });

  // Simular datos de ejemplo
  React.useEffect(() => {
    const mockTables: Table[] = [
      { id: '1', number: 1, capacity: 4, status: 'available', restaurantId: restaurant.id },
      { id: '2', number: 2, capacity: 6, status: 'occupied', restaurantId: restaurant.id },
      { id: '3', number: 3, capacity: 2, status: 'reserved', restaurantId: restaurant.id },
      { id: '4', number: 4, capacity: 8, status: 'maintenance', restaurantId: restaurant.id }
    ];

    const mockProducts: Product[] = [
      { id: '1', name: 'Pizza Margherita', description: 'Pizza tradicional italiana', price: 12.99, category: 'Pizzas', isAvailable: true, restaurantId: restaurant.id },
      { id: '2', name: 'Pasta Carbonara', description: 'Pasta con salsa cremosa', price: 15.99, category: 'Pastas', isAvailable: true, restaurantId: restaurant.id },
      { id: '3', name: 'Tiramisú', description: 'Postre italiano clásico', price: 8.99, category: 'Postres', isAvailable: false, restaurantId: restaurant.id }
    ];

    const mockMenus: Menu[] = [
      { id: '1', name: 'Menú Principal', description: 'Platos principales del restaurante', isActive: true, restaurantId: restaurant.id, items: mockProducts.map(p => ({ id: p.id, name: p.name, description: p.description, price: p.price, category: p.category })) },
      { id: '2', name: 'Menú Ejecutivo', description: 'Opciones rápidas para el almuerzo', isActive: true, restaurantId: restaurant.id, items: mockProducts.slice(0, 2).map(p => ({ id: p.id, name: p.name, description: p.description, price: p.price, category: p.category })) }
    ];

    const mockStats: RestaurantStats = {
      totalOrders: 156,
      totalRevenue: 2847.50,
      averageOrderValue: 18.25,
      popularProducts: mockProducts.slice(0, 2).map(p => ({ id: p.id, name: p.name, price: p.price, orderCount: Math.floor(Math.random() * 50) + 10 })),
      dailyStats: [
        { date: '2024-01-01', orders: 15, revenue: 245.30 },
        { date: '2024-01-02', orders: 18, revenue: 312.45 },
        { date: '2024-01-03', orders: 16, revenue: 198.75 }
      ]
    };

    setData({
      tables: mockTables,
      products: mockProducts,
      menus: mockMenus,
      stats: mockStats
    });
  }, [restaurant.id]);

  const handleToggleStatus = () => {
    onToggleStatus(restaurant.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green';
      case 'occupied': return 'red';
      case 'reserved': return 'orange';
      case 'maintenance': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'maintenance': return 'Mantenimiento';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="restaurant-actions">
      <div className="actions-header">
        <h2>⚙️ Gestión del Restaurante</h2>
        <Button
          variant={restaurant.isOpen ? 'danger' : 'success'}
          size="medium"
          onClick={handleToggleStatus}
          loading={isLoading}
          disabled={isLoading}
        >
          {restaurant.isOpen ? '🔴 Cerrar Restaurante' : '🟢 Abrir Restaurante'}
        </Button>
      </div>

      <div className="actions-tabs">
        <button
          className={`tab-button ${activeTab === 'tables' ? 'active' : ''}`}
          onClick={() => setActiveTab('tables')}
        >
          🪑 Mesas ({data.tables.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          🍽️ Productos ({data.products.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'menus' ? 'active' : ''}`}
          onClick={() => setActiveTab('menus')}
        >
          📋 Menús ({data.menus.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Estadísticas
        </button>
      </div>

      <div className="actions-content">
        {activeTab === 'tables' && (
          <div className="tables-section">
            <h3>Mesas del Restaurante</h3>
            <div className="tables-grid">
              {data.tables.map((table) => (
                <div key={table.id} className={`table-card ${getStatusColor(table.status)}`}>
                  <div className="table-header">
                    <h4>Mesa {table.number}</h4>
                    <span className={`status-badge ${getStatusColor(table.status)}`}>
                      {getStatusText(table.status)}
                    </span>
                  </div>
                  <p>Capacidad: {table.capacity} personas</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <h3>Productos del Restaurante</h3>
            <div className="products-grid">
              {data.products.map((product) => (
                <div key={product.id} className={`product-card ${product.isAvailable ? 'available' : 'unavailable'}`}>
                  <div className="product-header">
                    <h4>{product.name}</h4>
                    <span className={`availability-badge ${product.isAvailable ? 'available' : 'unavailable'}`}>
                      {product.isAvailable ? '✅ Disponible' : '❌ No disponible'}
                    </span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-details">
                    <span className="category">📂 {product.category}</span>
                    <span className="price">💰 ${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menus' && (
          <div className="menus-section">
            <h3>Menús del Restaurante</h3>
            <div className="menus-grid">
              {data.menus.map((menu) => (
                <div key={menu.id} className={`menu-card ${menu.isActive ? 'active' : 'inactive'}`}>
                  <div className="menu-header">
                    <h4>{menu.name}</h4>
                    <span className={`status-badge ${menu.isActive ? 'active' : 'inactive'}`}>
                      {menu.isActive ? '✅ Activo' : '❌ Inactivo'}
                    </span>
                  </div>
                  <p className="menu-description">{menu.description}</p>
                  <div className="menu-products">
                    <span>Productos: {menu.items.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && data.stats && (
          <div className="stats-section">
            <h3>Estadísticas del Restaurante</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>📦 Total de Pedidos</h4>
                <span className="stat-value">{data.stats.totalOrders}</span>
              </div>
              <div className="stat-card">
                <h4>💰 Ingresos Totales</h4>
                <span className="stat-value">${data.stats.totalRevenue.toFixed(2)}</span>
              </div>
              <div className="stat-card">
                <h4>📊 Valor Promedio</h4>
                <span className="stat-value">${data.stats.averageOrderValue.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="popular-products">
              <h4>🍽️ Productos Populares</h4>
              <div className="products-list">
                {data.stats.popularProducts.map((product: any) => (
                  <div key={product.id} className="popular-product">
                    <span>{product.name}</span>
                    <span className="price">${product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantActions;
