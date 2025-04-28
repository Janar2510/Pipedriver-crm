import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, Paperclip, BookTemplate as Template, Clock, ChevronDown, X, Plus } from 'lucide-react';
import { EmailScheduler } from './EmailScheduler';

interface EmailComposerProps {
  initialTo?: string;
  initialSubject?: string;
  onClose?: () => void;
}

export const EmailComposer: React.FC<EmailComposerProps> = ({
  initialTo = '',
  initialSubject = '',
  onClose
}) => {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    // Handle email sending
    console.log({ 
      to, 
      subject, 
      content, 
      attachments,
      scheduledDate 
    });
  };

  const handleSchedule = (date: Date) => {
    setScheduledDate(date);
    setShowScheduler(false);
  };

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {scheduledDate ? (
              <div className="flex items-center text-primary-400">
                <Clock size={16} className="mr-2" />
                Scheduled for {scheduledDate.toLocaleString()}
              </div>
            ) : (
              'Compose Email'
            )}
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} icon={<X size={16} />} />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full h-40 px-3 py-2 text-sm rounded-md bg-dark-800 border border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Write your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-dark-400">Attachments</p>
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-2 py-1 bg-dark-800 rounded-md"
                  >
                    <span className="text-sm text-white">{file.name}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-dark-400 hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-dark-800">
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleAttachmentChange}
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Paperclip size={16} />}
                  type="button"
                >
                  Attach
                </Button>
              </label>
              
              <Button
                variant="outline"
                size="sm"
                icon={<Template size={16} />}
                onClick={() => setShowTemplates(!showTemplates)}
              >
                Templates
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                icon={<Clock size={16} />}
                onClick={() => setShowScheduler(true)}
              >
                Schedule
              </Button>
            </div>

            <Button
              variant="primary"
              icon={<Send size={16} />}
              onClick={handleSend}
              disabled={!to || !subject || !content}
            >
              {scheduledDate ? 'Schedule' : 'Send'}
            </Button>
          </div>

          {/* Templates Dropdown */}
          {showTemplates && (
            <div className="absolute z-10 mt-2 w-64 bg-dark-800 rounded-md shadow-lg border border-dark-700">
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Templates</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Plus size={14} />}
                    className="text-primary-400 hover:text-primary-300"
                  >
                    New
                  </Button>
                </div>
                <div className="space-y-1">
                  {['Follow-up', 'Meeting Request', 'Thank You'].map((template) => (
                    <button
                      key={template}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-dark-700 rounded-md"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Scheduler Modal */}
      {showScheduler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <EmailScheduler
            onSchedule={handleSchedule}
            onClose={() => setShowScheduler(false)}
          />
        </div>
      )}
    </>
  );
};