import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Clock, Calendar, X, Check, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface EmailSchedulerProps {
  onSchedule: (date: Date) => void;
  onClose: () => void;
}

export const EmailScheduler: React.FC<EmailSchedulerProps> = ({ onSchedule, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customDate, setCustomDate] = useState(false);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const quickOptions = [
    { label: 'Later today', value: new Date(today.setHours(18, 0, 0, 0)) },
    { label: 'Tomorrow morning', value: new Date(today.setDate(today.getDate() + 1)).setHours(9, 0, 0, 0) },
    { label: 'Tomorrow afternoon', value: new Date(today.setDate(today.getDate() + 1)).setHours(14, 0, 0, 0) },
    { label: 'Next Monday', value: (() => {
      const next = new Date(today);
      next.setDate(next.getDate() + ((1 + 7 - next.getDay()) % 7));
      next.setHours(9, 0, 0, 0);
      return next;
    })() },
  ];

  const handleQuickOptionSelect = (date: Date) => {
    setSelectedDate(new Date(date));
    setSelectedTime(format(new Date(date), 'HH:mm'));
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const scheduleDate = new Date(selectedDate);
      scheduleDate.setHours(hours, minutes);
      onSchedule(scheduleDate);
    }
  };

  const isValidSchedule = () => {
    if (!selectedDate || !selectedTime) return false;
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(hours, minutes);
    return scheduleDate > new Date();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Clock size={20} className="mr-2 text-primary-400" />
          Schedule Email
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          icon={<X size={16} />}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {!customDate ? (
          <div className="space-y-2">
            {quickOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuickOptionSelect(option.value)}
                className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                  selectedDate?.getTime() === option.value.getTime()
                    ? 'bg-primary-900/50 text-primary-400 border border-primary-500'
                    : 'bg-dark-800 hover:bg-dark-700 text-white'
                }`}
              >
                <span className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {option.label}
                </span>
                <span className="text-sm text-dark-400">
                  {format(new Date(option.value), 'MMM d, h:mm a')}
                </span>
              </button>
            ))}
            
            <button
              onClick={() => setCustomDate(true)}
              className="w-full flex items-center justify-center p-3 rounded-md bg-dark-800 hover:bg-dark-700 text-white transition-colors"
            >
              <Calendar size={16} className="mr-2" />
              Custom Date & Time
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Date
              </label>
              <Input
                type="date"
                min={format(new Date(), 'yyyy-MM-dd')}
                value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Time
              </label>
              <Input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>

            {selectedDate && selectedTime && !isValidSchedule() && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>Please select a future date and time</span>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCustomDate(false)}
              >
                Back to Quick Options
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4 border-t border-dark-800">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Check size={16} />}
            onClick={handleSchedule}
            disabled={!isValidSchedule()}
          >
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};