import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Mail, Paperclip, Reply, Star } from 'lucide-react';
import { format } from 'date-fns';

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  hasAttachments: boolean;
  isStarred: boolean;
  status: 'sent' | 'received' | 'draft';
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'john.doe@example.com',
    to: 'contact@company.com',
    subject: 'Meeting Follow-up',
    content: 'Thank you for your time today...',
    date: '2024-03-15T10:30:00',
    hasAttachments: true,
    isStarred: true,
    status: 'sent'
  },
  // Add more mock emails as needed
];

export const EmailHistory: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockEmails.map((email) => (
            <div
              key={email.id}
              className="p-4 border border-dark-800 rounded-lg hover:bg-dark-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary-900/20 flex items-center justify-center">
                    <Mail size={16} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{email.from}</h3>
                    <p className="text-sm text-dark-400">{email.to}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      email.status === 'sent' ? 'success' :
                      email.status === 'received' ? 'primary' :
                      'warning'
                    }
                  >
                    {email.status}
                  </Badge>
                  <button className="text-dark-400 hover:text-primary-400">
                    <Star
                      size={16}
                      className={email.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}
                    />
                  </button>
                </div>
              </div>

              <div className="ml-11">
                <h4 className="font-medium text-white mb-1">{email.subject}</h4>
                <p className="text-sm text-dark-400 line-clamp-2">{email.content}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2 text-dark-400">
                    {email.hasAttachments && (
                      <Paperclip size={14} />
                    )}
                    <span className="text-sm">
                      {format(new Date(email.date), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  
                  <button
                    className="text-dark-400 hover:text-primary-400 p-1 rounded-full hover:bg-dark-700"
                  >
                    <Reply size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};