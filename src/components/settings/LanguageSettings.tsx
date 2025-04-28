import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Select } from '../ui/Select';
import { Languages } from 'lucide-react';

export const LanguageSettings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Languages className="mr-2 text-primary-400" size={20} />
          {t('settings.language.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          label={t('settings.language.select')}
          value={i18n.language}
          onChange={handleLanguageChange}
          options={[
            { value: 'en', label: t('settings.language.en') },
            { value: 'et', label: t('settings.language.et') }
          ]}
        />
      </CardContent>
    </Card>
  );
};