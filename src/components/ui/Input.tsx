import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'flex h-10 w-full rounded-md border bg-dark-800 border-dark-700 px-3 py-2 text-sm text-white ring-offset-dark-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dark-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const widthStyles = fullWidth ? 'w-full' : '';
    const errorStyles = error ? 'border-red-500 focus-visible:ring-red-500' : '';
    
    const inputStyles = `${baseStyles} ${widthStyles} ${errorStyles} ${className}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-white mb-1">
            {label}
          </label>
        )}
        <input ref={ref} className={inputStyles} {...props} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';