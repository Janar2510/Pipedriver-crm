import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Search, Plus, Filter, Upload, Download } from 'lucide-react';

interface ContactListProps {
  onSelectContact: (contactId: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  const { contacts } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'customer' | 'lead' | 'prospect'>('all');
  
  // Filter contacts based on search query and selected filter
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || contact.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
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
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <Button variant="primary" size="sm" icon={<Plus size={16} />}>
            Add Contact
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            fullWidth
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'customer' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('customer')}
          >
            Customers
          </Button>
          <Button
            variant={filter === 'lead' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('lead')}
          >
            Leads
          </Button>
          <Button
            variant={filter === 'prospect' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('prospect')}
          >
            Prospects
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
          >
            More
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {filteredContacts.length > 0 ? (
          <div className="space-y-3">
            {filteredContacts.map(contact => (
              <Card 
                key={contact.id}
                className="p-4 cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => onSelectContact(contact.id)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.company}</p>
                  </div>
                  <Badge variant={statusBadgeVariant(contact.status)}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {contact.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-gray-400 mb-2">
              <Search size={40} />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">No contacts found</h3>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button variant="outline" size="sm" icon={<Plus size={16} />}>
              Add Contact
            </Button>
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between">
          <Button variant="ghost" size="sm" icon={<Upload size={16} />}>
            Import
          </Button>
          <Button variant="ghost" size="sm" icon={<Download size={16} />}>
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};