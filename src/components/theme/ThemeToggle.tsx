import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeStore } from '../../store/themeStore';
import { useThemeColors } from '../../hooks/useThemeColors';

const ThemeToggle: React.FC = () => {
  const { selectedPaletteName, setPalette, getPaletteNames } = useThemeStore();
  const { getCardBorder, getTextColor } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
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

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 192, // 192px es el ancho del dropdown (min-w-48 = 12rem = 192px)
      });
    }
    setIsOpen(!isOpen);
  };

  const currentInfo = paletteInfo[selectedPaletteName as keyof typeof paletteInfo];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-lg rounded-lg border-2 transition-all duration-200"
        style={{
          borderColor: getCardBorder(),
          color: getTextColor(900),
        }}
      >
        <div
          className="w-4 h-4 rounded-full border border-white/30"
          style={{ backgroundColor: currentInfo.color }}
        />
        <span className="text-sm font-medium">{currentInfo.name}</span>
        <span className="text-lg">{currentInfo.emoji}</span>
      </button>

                    {isOpen && createPortal(
         <div
           className="fixed inset-0 z-[99998]"
           onClick={() => setIsOpen(false)}
         />,
         document.body
       )}

       {isOpen && createPortal(
         <div 
           className="fixed bg-white/95 backdrop-blur-lg rounded-lg border border-gray-200 shadow-lg z-[99999] min-w-48"
           style={{
             top: dropdownPosition.top,
             left: dropdownPosition.left,
           }}
         >
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
         </div>,
         document.body
       )}
    </div>
  );
};

export default ThemeToggle;
