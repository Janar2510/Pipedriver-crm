import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Building2, Users, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const OrganizationList: React.FC = () => {
  const { organizations, contacts, deals } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilter === 'all' || org.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(new Set(organizations.map(org => org.industry)));

  const getOrganizationStats = (orgId: string) => {
    const orgContacts = contacts.filter(contact => contact.organizationId === orgId);
    const orgDeals = deals.filter(deal => deal.organizationId === orgId);
    const totalValue = orgDeals.reduce((sum, deal) => sum + deal.value, 0);
    
    return {
      contactCount: orgContacts.length,
      dealCount: orgDeals.length,
      totalValue
    };
  };

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Organizations</h1>
          <p className="text-dark-400">Manage your business relationships</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />}>
          Add Organization
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
              <Input
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="bg-dark-800 border border-dark-700 rounded-md px-3 py-2 text-white"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="sm"
                icon={<Filter size={16} />}
              >
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganizations.map(org => {
          const stats = getOrganizationStats(org.id);
          
          return (
            <Card key={org.id} className="hover:border-primary-500 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-900/20 flex items-center justify-center mr-3">
                      <Building2 size={20} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{org.name}</h3>
                      <p className="text-sm text-dark-400">{org.industry}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{org.size}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-dark-400 mb-1">
                      <Users size={14} className="mr-1" />
                      <span className="text-sm">Contacts</span>
                    </div>
                    <p className="text-lg font-medium text-white">{stats.contactCount}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-dark-400 mb-1">
                      <DollarSign size={14} className="mr-1" />
                      <span className="text-sm">Deals</span>
                    </div>
                    <p className="text-lg font-medium text-white">{stats.dealCount}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-dark-400 mb-1">
                      <DollarSign size={14} className="mr-1" />
                      <span className="text-sm">Value</span>
                    </div>
                    <p className="text-lg font-medium text-white">
                      {formatCurrency(stats.totalValue)}
                    </p>
                  </div>
                </div>

                {org.website && (
                  <a 
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-400 hover:text-primary-300"
                  >
                    {org.website}
                  </a>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};