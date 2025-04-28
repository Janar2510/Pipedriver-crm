import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';

export const DealsList: React.FC = () => {
  const { deals, contacts } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter deals based on search query and selected stage filter
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = 
      deal.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  });
  
  // Sort filtered deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'value') {
      return sortDirection === 'asc'
        ? a.value - b.value
        : b.value - a.value;
    } else {
      // Sort by date
      return sortDirection === 'asc'
        ? new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime()
        : new Date(b.expectedCloseDate).getTime() - new Date(a.expectedCloseDate).getTime();
    }
  });
  
  const handleSort = (newSortBy: 'name' | 'value' | 'date') => {
    if (sortBy === newSortBy) {
      // Toggle sort direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to descending
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };
  
  const getStageBadgeVariant = (stage: string) => {
    switch (stage) {
      case 'lead':
        return 'primary';
      case 'discovery':
        return 'secondary';
      case 'proposal':
        return 'warning';
      case 'negotiation':
        return 'warning';
      case 'closed-won':
        return 'success';
      case 'closed-lost':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown Contact';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Deals</h2>
        <Button variant="primary" icon={<Plus size={16} />}>
          Add Deal
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Filter size={16} />}
              >
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowUpDown size={16} />}
              >
                Sort
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto mt-4">
            <Button
              variant={stageFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('all')}
            >
              All Stages
            </Button>
            <Button
              variant={stageFilter === 'lead' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('lead')}
            >
              Lead
            </Button>
            <Button
              variant={stageFilter === 'discovery' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('discovery')}
            >
              Discovery
            </Button>
            <Button
              variant={stageFilter === 'proposal' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('proposal')}
            >
              Proposal
            </Button>
            <Button
              variant={stageFilter === 'negotiation' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('negotiation')}
            >
              Negotiation
            </Button>
            <Button
              variant={stageFilter === 'closed-won' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('closed-won')}
            >
              Closed Won
            </Button>
            <Button
              variant={stageFilter === 'closed-lost' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStageFilter('closed-lost')}
            >
              Closed Lost
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('name')}
                  >
                    Deal Name
                    {sortBy === 'name' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('value')}
                  >
                    Value
                    {sortBy === 'value' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('date')}
                  >
                    Expected Close
                    {sortBy === 'date' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDeals.length > 0 ? (
                sortedDeals.map(deal => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">${deal.value.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStageBadgeVariant(deal.stage)}>
                        {deal.stage.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getContactName(deal.contactId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(deal.expectedCloseDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${deal.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          deal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}
                      >
                        {deal.priority.charAt(0).toUpperCase() + deal.priority.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400 mb-2">
                        <Search size={40} />
                      </div>
                      <h3 className="text-gray-700 font-medium mb-1">No deals found</h3>
                      <p className="text-gray-500 text-sm mb-4">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                      <Button variant="outline" icon={<Plus size={16} />}>
                        Add Deal
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};