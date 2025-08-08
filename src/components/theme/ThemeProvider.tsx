import React, { useEffect } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { 
    getBackgroundGradient, 
    getBackgroundColor, 
    getTextColor,
    getCardBackground,
    getCardBorder,
    getInputBackground,
    getInputBorder,
    getInputFocusBorder,
    getButtonPrimaryBackground,
    getButtonSecondaryBackground,
    getButtonAccentBackground,
    getModalBackground,
    getModalOverlay,
    getTableHeaderBackground,
    getTableRowBackground,
    getSuccessColor,
    getDangerColor,
    getWarningColor,
    getInfoColor,
  } = useThemeColors();

  useEffect(() => {
    // Aplicar gradiente de fondo al body
    document.body.style.background = getBackgroundGradient();
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'background 0.3s ease';

    // Crear CSS custom properties para usar en toda la aplicación
    const root = document.documentElement;
    root.style.setProperty('--theme-background', getBackgroundColor(50));
    root.style.setProperty('--theme-text-primary', getTextColor(900));
    root.style.setProperty('--theme-text-secondary', getTextColor(600));
    root.style.setProperty('--theme-text-muted', getTextColor(500));
    root.style.setProperty('--theme-card-background', getCardBackground());
    root.style.setProperty('--theme-card-border', getCardBorder());
    root.style.setProperty('--theme-input-background', getInputBackground());
    root.style.setProperty('--theme-input-border', getInputBorder());
    root.style.setProperty('--theme-input-focus-border', getInputFocusBorder());
    root.style.setProperty('--theme-button-primary-bg', getButtonPrimaryBackground());
    root.style.setProperty('--theme-button-secondary-bg', getButtonSecondaryBackground());
    root.style.setProperty('--theme-button-accent-bg', getButtonAccentBackground());
    root.style.setProperty('--theme-modal-background', getModalBackground());
    root.style.setProperty('--theme-modal-overlay', getModalOverlay());
    root.style.setProperty('--theme-table-header-bg', getTableHeaderBackground());
    root.style.setProperty('--theme-table-row-bg', getTableRowBackground(false));
    root.style.setProperty('--theme-table-row-bg-even', getTableRowBackground(true));
    root.style.setProperty('--theme-success', getSuccessColor());
    root.style.setProperty('--theme-danger', getDangerColor());
    root.style.setProperty('--theme-warning', getWarningColor());
    root.style.setProperty('--theme-info', getInfoColor());

  }, [getBackgroundGradient, getBackgroundColor, getTextColor, getCardBackground, getCardBorder, getInputBackground, getInputBorder, getInputFocusBorder, getButtonPrimaryBackground, getButtonSecondaryBackground, getButtonAccentBackground, getModalBackground, getModalOverlay, getTableHeaderBackground, getTableRowBackground, getSuccessColor, getDangerColor, getWarningColor, getInfoColor]);

  return <>{children}</>;
};

export default ThemeProvider;
