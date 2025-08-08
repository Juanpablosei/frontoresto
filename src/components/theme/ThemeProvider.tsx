import React, { useEffect } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { getBackgroundGradient } = useThemeColors();

  useEffect(() => {
    // Aplicar el gradiente de fondo al body
    document.body.style.background = getBackgroundGradient();
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'background 0.3s ease';
  }, [getBackgroundGradient]);

  return <>{children}</>;
};

export default ThemeProvider;
