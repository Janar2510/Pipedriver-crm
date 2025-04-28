import React, { useState } from 'react';
import { EmailComposer } from '../components/email/EmailComposer';
import { EmailHistory } from '../components/email/EmailHistory';
import { EmailTemplates } from '../components/email/EmailTemplates';
import { EmailSettings } from '../components/email/EmailSettings';
import { Button } from '../components/ui/Button';
import { Mail, History, BookTemplate as Template, Settings } from 'lucide-react';

type EmailView = 'compose' | 'history' | 'templates' | 'settings';

export const Email: React.FC = () => {
  const [activeView, setActiveView] = useState<EmailView>('history');

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Email</h1>
          <p className="text-dark-400">Manage your email communications</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeView === 'compose' ? 'primary' : 'outline'}
            icon={<Mail size={16} />}
            onClick={() => setActiveView('compose')}
          >
            Compose
          </Button>
          <Button
            variant={activeView === 'history' ? 'primary' : 'outline'}
            icon={<History size={16} />}
            onClick={() => setActiveView('history')}
          >
            History
          </Button>
          <Button
            variant={activeView === 'templates' ? 'primary' : 'outline'}
            icon={<Template size={16} />}
            onClick={() => setActiveView('templates')}
          >
            Templates
          </Button>
          <Button
            variant={activeView === 'settings' ? 'primary' : 'outline'}
            icon={<Settings size={16} />}
            onClick={() => setActiveView('settings')}
          >
            Settings
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeView === 'compose' && <EmailComposer />}
        {activeView === 'history' && <EmailHistory />}
        {activeView === 'templates' && <EmailTemplates />}
        {activeView === 'settings' && <EmailSettings />}
      </div>
    </div>
  );
};