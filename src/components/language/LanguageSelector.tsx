import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';

const LanguageSelector: React.FC = () => {
  const { getCurrentLanguage, changeLanguage, getAvailableLanguages } = useTranslation();
  const { getCardBackground, getCardBorder, getTextColor } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = getCurrentLanguage();
  const availableLanguages = getAvailableLanguages();
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 backdrop-blur-lg rounded-lg border transition-all duration-200 hover:bg-opacity-80"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
          color: getTextColor(900),
        }}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium">{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 backdrop-blur-lg rounded-lg border shadow-lg z-50 min-w-[160px]"
          style={{
            backgroundColor: getCardBackground(),
            borderColor: getCardBorder(),
          }}
        >
          {availableLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-200 ${
                language.code === currentLanguage
                  ? 'bg-opacity-20'
                  : 'hover:bg-opacity-10'
              }`}
              style={{
                backgroundColor: language.code === currentLanguage ? getCardBackground() : 'transparent',
                color: getTextColor(900),
              }}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {language.code === currentLanguage && (
                <span className="text-xs ml-auto">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
