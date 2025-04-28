import React from 'react';
import { currencies, type Currency } from '../../utils/currencies';

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-dark-800 border border-dark-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
    >
      {currencies.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code} - {currency.symbol} {currency.name}
        </option>
      ))}
    </select>
  );
};