import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { 
  ArrowLeft, Edit, Trash, Mail, Phone, 
  Calendar, MessageSquare, Plus, Clock, CheckCircle 
} from 'lucide-react';

interface ContactDetailProps {
  contactId: string;
  onBack: () => void;
}

export const ContactDetail: React.FC<ContactDetailProps> = ({ contactId, onBack }) => {
  const { 
    getContactById, 
    getTasksByRelatedId,
    getActivitiesByRelatedId,
    getDealById,
    deals
  } = useCRM();
  
  const contact = getContactById(contactId);
  
  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500">Contact not found</p>
          <Button variant="outline" className="mt-4" onClick={onBack}>
            Back to Contacts
          </Button>
        </div>
      </div>
    );
  }
  
  const tasks = getTasksByRelatedId(contactId);
  const activities = getActivitiesByRelatedId(contactId);
  const contactDeals = deals.filter(deal => deal.contactId === contactId);
  
  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'customer':
        return 'success';
      case 'lead':
        return 'warning';
      case 'prospect':
        return 'primary';
      default:
        return 'default';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            icon={<ArrowLeft size={16} />}
            className="mr-2"
          >
            Back
          </Button>
          <h2 className="text-lg font-semibold">Contact Details</h2>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Edit size={16} />}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            icon={<Trash size={16} />}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Contact Information */}
          <div className="md:w-1/3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{contact.name}</h2>
                  <p className="text-gray-600">{contact.position}</p>
                  <div className="mt-2">
                    <Badge variant={statusBadgeVariant(contact.status)}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Mail size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Phone size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Calendar size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Contacted</p>
                      <p className="font-medium">{formatDate(contact.lastContacted)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Company</h3>
                  <p className="font-semibold">{contact.company}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="p-1 h-6">
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-gray-700">{contact.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Deals, Tasks and Activities */}
          <div className="md:w-2/3 space-y-6">
            {/* Deals */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Deals</CardTitle>
                <Button variant="outline" size="sm" icon={<Plus size={16} />}>
                  New Deal
                </Button>
              </CardHeader>
              <CardContent>
                {contactDeals.length > 0 ? (
                  <div className="space-y-4">
                    {contactDeals.map(deal => {
                      const stageColors = {
                        'lead': 'bg-blue-100 text-blue-800',
                        'discovery': 'bg-indigo-100 text-indigo-800',
                        'proposal': 'bg-amber-100 text-amber-800',
                        'negotiation': 'bg-teal-100 text-teal-800',
                        'closed-won': 'bg-green-100 text-green-800',
                        'closed-lost': 'bg-red-100 text-red-800',
                      };
                      
                      return (
                        <div key={deal.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{deal.name}</h4>
                              <span className="font-semibold">${deal.value.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${stageColors[deal.stage as keyof typeof stageColors]}`}>
                                {deal.stage.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </span>
                              <span className="text-xs text-gray-500">Expected: {formatDate(deal.expectedCloseDate)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No deals associated with this contact</p>
                    <Button variant="outline" size="sm" className="mt-2" icon={<Plus size={16} />}>
                      Add Deal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tasks</CardTitle>
                <Button variant="outline" size="sm" icon={<Plus size={16} />}>
                  New Task
                </Button>
              </CardHeader>
              <CardContent>
                {tasks.length > 0 ? (
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <div key={task.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-md">
                        <div className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-amber-500'}`}>
                          {task.completed ? <CheckCircle size={18} /> : <Clock size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <span className="text-xs text-gray-500">Due: {formatDate(task.dueDate)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No tasks for this contact</p>
                    <Button variant="outline" size="sm" className="mt-2" icon={<Plus size={16} />}>
                      Add Task
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Activities */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Activities</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" icon={<Mail size={16} />}>
                    Email
                  </Button>
                  <Button variant="outline" size="sm" icon={<Phone size={16} />}>
                    Call
                  </Button>
                  <Button variant="outline" size="sm" icon={<MessageSquare size={16} />}>
                    Meeting
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.map(activity => {
                      const activityIcons = {
                        'call': <Phone size={16} className="text-blue-600" />,
                        'email': <Mail size={16} className="text-green-600" />,
                        'meeting': <MessageSquare size={16} className="text-amber-600" />,
                        'note': <MessageSquare size={16} className="text-indigo-600" />,
                      };
                      
                      return (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-md">
                          <div className="mt-0.5">
                            {activityIcons[activity.type as keyof typeof activityIcons]}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">
                                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                              </h4>
                              <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No activity history for this contact</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <Button variant="outline" size="sm" icon={<Mail size={16} />}>
                        Log Email
                      </Button>
                      <Button variant="outline" size="sm" icon={<Phone size={16} />}>
                        Log Call
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};