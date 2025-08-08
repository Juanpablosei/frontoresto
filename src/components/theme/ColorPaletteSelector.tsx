import React from 'react';
import { useThemeStore } from '../../store/themeStore';

const ColorPaletteSelector: React.FC = () => {
  const { selectedPaletteName, setPalette, getPaletteNames, getCurrentPalette } = useThemeStore();
  const paletteNames = getPaletteNames();
  const paletteInfo = {
    'amber': {
      name: 'Ámbar',
      description: 'Tono cálido y acogedor',
      colors: ['#f59e0b', '#d97706', '#b45309'],
    },
    'emerald': {
      name: 'Esmeralda',
      description: 'Verde fresco y natural',
      colors: ['#10b981', '#059669', '#047857'],
    },
    'purple': {
      name: 'Púrpura',
      description: 'Elegante y sofisticado',
      colors: ['#a855f7', '#9333ea', '#7c3aed'],
    },
    'rose': {
      name: 'Rosa',
      description: 'Moderno y vibrante',
      colors: ['#f43f5e', '#e11d48', '#be123c'],
    },
    'sober': {
      name: 'Sobrio',
      description: 'Grises y blancos elegantes',
      colors: ['#64748b', '#475569', '#334155'],
    },
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🎨 Personaliza tu Experiencia</h2>
        <p className="text-white/80 text-lg">
          Selecciona una paleta de colores que refleje tu estilo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paletteNames.map((paletteName) => {
          const info = paletteInfo[paletteName as keyof typeof paletteInfo];
          const isSelected = selectedPaletteName === paletteName;

          return (
            <div
              key={paletteName}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${isSelected 
                  ? 'border-white bg-white/20 shadow-lg scale-105' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10 hover:scale-102'
                }
              `}
              onClick={() => setPalette(paletteName)}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{info.name}</h3>
                <p className="text-white/70 text-sm mb-4">{info.description}</p>
                
                <div className="flex justify-center gap-2 mb-4">
                  {info.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="text-xs text-white/60">
                  Paleta {paletteName}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          Los cambios se aplicarán automáticamente en toda la aplicación
        </p>
      </div>
    </div>
  );
};

export default ColorPaletteSelector;
