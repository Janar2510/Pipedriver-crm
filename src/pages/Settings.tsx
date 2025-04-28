import React from 'react';
import { LanguageSettings } from '../components/settings/LanguageSettings';
import { CurrencySettings } from '../components/settings/CurrencySettings';
import { CustomFieldsManager } from '../components/settings/CustomFieldsManager';
import { EmailSettings } from '../components/email/EmailSettings';

export const Settings: React.FC = () => {
  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="space-y-6">
        <CurrencySettings />
        <LanguageSettings />
        <CustomFieldsManager />
        <EmailSettings />
      </div>
    </div>
  );
};