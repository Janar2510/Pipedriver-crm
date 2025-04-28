import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useCRM } from '../../context/CRMContext';
import { Phone, Mail, FileText, MessageSquare } from 'lucide-react';

export const RecentActivities: React.FC = () => {
  const { activities, contacts, deals } = useCRM();
  
  // Sort activities by date (most recent first)
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={16} className="text-blue-600" />;
      case 'email':
        return <Mail size={16} className="text-green-600" />;
      case 'meeting':
        return <MessageSquare size={16} className="text-amber-600" />;
      case 'note':
        return <FileText size={16} className="text-indigo-600" />;
      default:
        return null;
    }
  };
  
  const getRelatedName = (activity: typeof activities[0]) => {
    if (activity.relatedToType === 'contact') {
      const contact = contacts.find(c => c.id === activity.relatedTo);
      return contact ? contact.name : 'Unknown Contact';
    } else {
      const deal = deals.find(d => d.id === activity.relatedTo);
      return deal ? deal.name : 'Unknown Deal';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedActivities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatDate(activity.date)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                
                <p className="mt-1 text-xs text-gray-500">
                  Related to: {getRelatedName(activity)}
                </p>
              </div>
            </div>
          ))}
          
          {activities.length === 0 && (
            <p className="text-sm text-gray-500">No recent activities</p>
          )}
          
          {activities.length > 5 && (
            <p className="text-sm text-center text-blue-600">
              View all activities
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};