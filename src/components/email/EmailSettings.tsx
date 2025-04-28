import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mail, Key, RefreshCw, Check, X } from 'lucide-react';

interface EmailSettings {
  provider: string;
  email: string;
  password: string;
  signature: string;
  defaultTemplate: string;
  sendCopy: boolean;
  autoSave: boolean;
  autoFollowUp: {
    enabled: boolean;
    days: number;
  };
}

export const EmailSettings: React.FC = () => {
  const [settings, setSettings] = useState<EmailSettings>({
    provider: '',
    email: '',
    password: '',
    signature: '',
    defaultTemplate: '',
    sendCopy: true,
    autoSave: true,
    autoFollowUp: {
      enabled: false,
      days: 3
    }
  });

  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleConnect = async () => {
    setIsTesting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsConnected(true);
    setIsTesting(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSettings(prev => ({
      ...prev,
      provider: '',
      email: '',
      password: ''
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 text-primary-400" size={20} />
          Email Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Connection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Email Connection</h3>
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                icon={<X size={16} />}
                className="text-red-500 hover:text-red-400"
              >
                Disconnect
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleConnect}
                icon={isTesting ? <RefreshCw size={16} className="animate-spin" /> : <Key size={16} />}
                disabled={isTesting}
              >
                {isTesting ? 'Connecting...' : 'Connect'}
              </Button>
            )}
          </div>

          {!isConnected && (
            <div className="space-y-4 p-4 bg-dark-800 rounded-lg">
              <select
                value={settings.provider}
                onChange={(e) => setSettings(prev => ({ ...prev, provider: e.target.value }))}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-3 py-2 text-white"
              >
                <option value="">Select Email Provider</option>
                <option value="gmail">Gmail</option>
                <option value="outlook">Microsoft Outlook</option>
                <option value="yahoo">Yahoo Mail</option>
                <option value="custom">Custom SMTP</option>
              </select>

              <Input
                placeholder="Email Address"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              />

              <Input
                type="password"
                placeholder="App Password"
                value={settings.password}
                onChange={(e) => setSettings(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          )}
        </div>

        {/* Email Signature */}
        <div className="space-y-4 pt-6 border-t border-dark-800">
          <h3 className="text-lg font-medium text-white">Email Signature</h3>
          <textarea
            className="w-full h-32 px-3 py-2 text-sm rounded-md bg-dark-800 border border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your email signature..."
            value={settings.signature}
            onChange={(e) => setSettings(prev => ({ ...prev, signature: e.target.value }))}
          />
        </div>

        {/* Auto Follow-up */}
        <div className="space-y-4 pt-6 border-t border-dark-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Auto Follow-up</h3>
            <Button
              variant={settings.autoFollowUp.enabled ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSettings(prev => ({
                ...prev,
                autoFollowUp: {
                  ...prev.autoFollowUp,
                  enabled: !prev.autoFollowUp.enabled
                }
              }))}
              icon={settings.autoFollowUp.enabled ? <Check size={16} /> : undefined}
            >
              {settings.autoFollowUp.enabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          {settings.autoFollowUp.enabled && (
            <div className="flex items-center space-x-2">
              <span className="text-dark-400">Follow up after</span>
              <Input
                type="number"
                min="1"
                max="30"
                value={settings.autoFollowUp.days}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  autoFollowUp: {
                    ...prev.autoFollowUp,
                    days: parseInt(e.target.value) || 1
                  }
                }))}
                className="w-20"
              />
              <span className="text-dark-400">days</span>
            </div>
          )}
        </div>

        {/* Additional Settings */}
        <div className="space-y-4 pt-6 border-t border-dark-800">
          <h3 className="text-lg font-medium text-white">Additional Settings</h3>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.sendCopy}
              onChange={(e) => setSettings(prev => ({ ...prev, sendCopy: e.target.checked }))}
              className="rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-white">Send copy to my email</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
              className="rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-white">Auto-save drafts</span>
          </label>
        </div>

        <div className="flex justify-end pt-6 border-t border-dark-800">
          <Button
            variant="primary"
            icon={<Check size={16} />}
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};