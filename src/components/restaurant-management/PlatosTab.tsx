import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';

interface PlatosTabProps {
  platos: any[];
  onAddPlato: () => void;
  onEditPlato: (platoId: string) => void;
  onTogglePlatoStatus: (platoId: string) => void;
  onDeletePlato: (platoId: string) => void;
}

const PlatosTab: React.FC<PlatosTabProps> = ({
  platos,
  onAddPlato,
  onEditPlato,
  onTogglePlatoStatus,
  onDeletePlato
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
            🍴 {t('restaurant.platos')}({platos.length})
          </h3>
          <Button
            variant="primary"
            onClick={onAddPlato}
          >
            ➕ {t('restaurant.addPlato')}
          </Button>
        </div>

        {platos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍴</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noPlatos')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addPlatosToOperate')}
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
                    {t('restaurant.plato')}
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
                    {t('restaurant.ingredients')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.preparationTime')}
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
                {platos.map((plato, index) => (
                  <tr 
                    key={plato.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: 'transparent'
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div 
                          className="font-medium"
                          style={{ color: getTextColor(900) }}
                        >
                          {plato.name}
                        </div>
                        <div 
                          className="text-sm"
                          style={{ color: getTextColor(600) }}
                        >
                          {plato.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: getInfoColor(),
                          color: 'white'
                        }}
                      >
                        {plato.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="font-medium"
                        style={{ color: getTextColor(900) }}
                      >
                        ${plato.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm" style={{ color: getTextColor(600) }}>
                        {plato.ingredients.length} {t('restaurant.ingredients')}
                      </div>
                      <div className="text-xs" style={{ color: getTextColor(500) }}>
                        {plato.ingredients.slice(0, 2).join(', ')}
                        {plato.ingredients.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="text-sm"
                        style={{ color: getTextColor(600) }}
                      >
                        {plato.preparationTime} {t('restaurant.minutes')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          plato.isActive ? 'text-white' : 'text-white'
                        }`}
                        style={{
                          backgroundColor: plato.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {plato.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onTogglePlatoStatus(plato.id)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ 
                            color: plato.isActive ? getWarningColor() : getSuccessColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={plato.isActive ? t('restaurant.deactivatePlato') : t('restaurant.activatePlato')}
                        >
                          {plato.isActive ? '⏸️' : '▶️'}
                        </button>
                        <button
                          onClick={() => onEditPlato(plato.id)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ 
                            color: getInfoColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.editPlato')}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDeletePlato(plato.id)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ 
                            color: getDangerColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.deletePlato')}
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
    </div>
  );
};

export default PlatosTab;
