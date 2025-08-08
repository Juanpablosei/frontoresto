import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { selectedPaletteName, setPalette, getPaletteNames } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const paletteNames = getPaletteNames();
  const paletteInfo = {
    'amber': {
      name: 'Ámbar',
      emoji: '🍂',
      color: '#f59e0b',
    },
    'emerald': {
      name: 'Esmeralda',
      emoji: '🌿',
      color: '#10b981',
    },
    'purple': {
      name: 'Púrpura',
      emoji: '🔮',
      color: '#a855f7',
    },
    'rose': {
      name: 'Rosa',
      emoji: '🌸',
      color: '#f43f5e',
    },
    'sober': {
      name: 'Sobrio',
      emoji: '⚪',
      color: '#64748b',
    },
  };

  const handlePaletteChange = (paletteName: string) => {
    setPalette(paletteName);
    setIsOpen(false);
  };

  const currentInfo = paletteInfo[selectedPaletteName as keyof typeof paletteInfo];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <div
          className="w-4 h-4 rounded-full border border-white/30"
          style={{ backgroundColor: currentInfo.color }}
        />
        <span className="text-sm font-medium">{currentInfo.name}</span>
        <span className="text-lg">{currentInfo.emoji}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-lg rounded-lg border border-gray-200 shadow-lg z-50 min-w-48">
          <div className="p-2">
            {paletteNames.map((paletteName) => {
              const info = paletteInfo[paletteName as keyof typeof paletteInfo];
              const isSelected = selectedPaletteName === paletteName;

              return (
                <button
                  key={paletteName}
                  onClick={() => handlePaletteChange(paletteName)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-200
                    ${isSelected 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: info.color }}
                  />
                  <span className="text-sm font-medium">{info.name}</span>
                  <span className="text-sm ml-auto">{info.emoji}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
