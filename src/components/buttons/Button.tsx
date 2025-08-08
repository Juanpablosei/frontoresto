import React from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
}) => {
  const { getColorClass, getGradientClass } = useThemeColors();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: getGradientClass('primary', 500, 600),
          color: 'white',
          hoverBackground: getGradientClass('primary', 600, 700),
        };
      case 'secondary':
        return {
          background: getGradientClass('secondary', 500, 600),
          color: 'white',
          hoverBackground: getGradientClass('secondary', 600, 700),
        };
      case 'accent':
        return {
          background: getGradientClass('accent', 500, 600),
          color: 'white',
          hoverBackground: getGradientClass('accent', 600, 700),
        };
      case 'danger':
        return {
          background: 'linear-gradient(to right, #ef4444, #dc2626)',
          color: 'white',
          hoverBackground: 'linear-gradient(to right, #dc2626, #b91c1c)',
        };
      case 'success':
        return {
          background: 'linear-gradient(to right, #22c55e, #16a34a)',
          color: 'white',
          hoverBackground: 'linear-gradient(to right, #16a34a, #15803d)',
        };
      default:
        return {
          background: getGradientClass('primary', 500, 600),
          color: 'white',
          hoverBackground: getGradientClass('primary', 600, 700),
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const styles = getVariantStyles();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        font-semibold rounded-lg transition-all duration-200 
        transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        shadow-lg hover:shadow-xl
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        background: styles.background,
        color: styles.color,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = styles.hoverBackground;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = styles.background;
        }
      }}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin mr-2"></span>
      )}
      {children}
    </button>
  );
};

export default Button; 