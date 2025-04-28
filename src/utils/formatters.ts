import { getCurrencySymbol } from './currencies';

export const formatCurrency = (value: number, currency = 'USD') => {
  const symbol = getCurrencySymbol(currency);
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace('$', symbol); // Replace default $ with correct symbol
};