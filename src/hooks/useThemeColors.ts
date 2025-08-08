import { useThemeStore } from '../store/themeStore';

export const useThemeColors = () => {
  const { currentPalette } = useThemeStore();

  const getColorClass = (colorType: 'primary' | 'secondary' | 'accent' | 'neutral', shade: number) => {
    const color = currentPalette[colorType][shade as keyof typeof currentPalette.primary];
    return color;
  };

  const getGradientClass = (colorType: 'primary' | 'secondary' | 'accent', fromShade: number, toShade: number) => {
    const fromColor = currentPalette[colorType][fromShade as keyof typeof currentPalette.primary];
    const toColor = currentPalette[colorType][toShade as keyof typeof currentPalette.primary];
    return `linear-gradient(to right, ${fromColor}, ${toColor})`;
  };

  const getBackgroundGradient = () => {
    return `linear-gradient(135deg, ${currentPalette.primary[800]}, ${currentPalette.primary[700]}, ${currentPalette.primary[600]})`;
  };

  // Nuevas funciones para aplicar colores dinámicamente
  const getBackgroundColor = (shade: number = 50) => {
    return currentPalette.primary[shade as keyof typeof currentPalette.primary];
  };

  const getTextColor = (shade: number = 900) => {
    return currentPalette.neutral[shade as keyof typeof currentPalette.neutral];
  };

  const getCardBackground = () => {
    return currentPalette.neutral[50];
  };

  const getCardBorder = () => {
    return currentPalette.neutral[200];
  };

  const getInputBackground = () => {
    return currentPalette.neutral[50];
  };

  const getInputBorder = () => {
    return currentPalette.neutral[300];
  };

  const getInputFocusBorder = () => {
    return currentPalette.primary[500];
  };

  const getButtonPrimaryBackground = () => {
    return `linear-gradient(to right, ${currentPalette.primary[500]}, ${currentPalette.primary[600]})`;
  };

  const getButtonSecondaryBackground = () => {
    return `linear-gradient(to right, ${currentPalette.secondary[500]}, ${currentPalette.secondary[600]})`;
  };

  const getButtonAccentBackground = () => {
    return `linear-gradient(to right, ${currentPalette.accent[500]}, ${currentPalette.accent[600]})`;
  };

  const getModalBackground = () => {
    return currentPalette.neutral[50];
  };

  const getModalOverlay = () => {
    return `rgba(${currentPalette.neutral[900]}, 0.5)`;
  };

  const getTableHeaderBackground = () => {
    return currentPalette.primary[100];
  };

  const getTableRowBackground = (isEven: boolean = false) => {
    return isEven ? currentPalette.neutral[50] : currentPalette.neutral[100];
  };

  const getSuccessColor = () => {
    return '#22c55e';
  };

  const getDangerColor = () => {
    return '#ef4444';
  };

  const getWarningColor = () => {
    return '#f59e0b';
  };

  const getInfoColor = () => {
    return currentPalette.primary[500];
  };

  return {
    currentPalette,
    getColorClass,
    getGradientClass,
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
  };
};
