import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CurrencySelect } from '../ui/CurrencySelect';
import { useCRM } from '../../context/CRMContext';
import { DollarSign } from 'lucide-react';

export const CurrencySettings: React.FC = () => {
  const { defaultCurrency, setDefaultCurrency } = useCRM();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 text-primary-400" size={20} />
          Currency Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Default Currency
          </label>
          <p className="text-sm text-dark-400 mb-4">
            Set the default currency for new deals and products. Existing items will keep their original currency.
          </p>
          <CurrencySelect
            value={defaultCurrency}
            onChange={setDefaultCurrency}
            className="w-full md:w-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};