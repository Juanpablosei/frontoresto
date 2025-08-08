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

  return {
    currentPalette,
    getColorClass,
    getGradientClass,
    getBackgroundGradient,
  };
};
