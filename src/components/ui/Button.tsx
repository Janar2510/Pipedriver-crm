import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:opacity-50 disabled:pointer-events-none border';
  
  const variantStyles = {
    primary: 'button-primary text-white',
    secondary: 'button-secondary text-white',
    outline: 'bg-transparent border-dark-700/50 hover:bg-dark-800/50 text-white',
    danger: 'bg-red-600/90 border-red-500/50 hover:bg-red-700/90 text-white',
    success: 'bg-green-600/90 border-green-500/50 hover:bg-green-700/90 text-white',
    ghost: 'bg-transparent hover:bg-dark-800/50 text-white border-transparent',
  };
  
  const sizeStyles = {
    sm: 'text-xs h-8 px-3',
    md: 'text-sm h-10 px-4',
    lg: 'text-base h-12 px-6',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  return (
    <button className={buttonStyles} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};