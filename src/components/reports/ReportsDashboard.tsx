import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  BarChart, LineChart, PieChart, ResponsiveContainer, XAxis, YAxis, 
  Tooltip, Legend, Bar, Line, Pie, Cell 
} from 'recharts';
import { 
  Download, Calendar, Filter, 
  TrendingUp, Users, DollarSign, Target 
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#6046aa', '#4c3a88', '#382a66', '#241a44', '#100a22'];

export const ReportsDashboard: React.FC = () => {
  const { deals, contacts, activities } = useCRM();
  
  // Calculate sales metrics
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won');
  const wonDealsValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
  const avgDealValue = deals.length > 0 ? totalDealsValue / deals.length : 0;
  const winRate = deals.length > 0 ? (wonDeals.length / deals.length) * 100 : 0;

  // Pipeline by stage
  const pipelineByStage = deals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = { count: 0, value: 0 };
    }
    acc[deal.stage].count++;
    acc[deal.stage].value += deal.value;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  const pipelineData = Object.entries(pipelineByStage).map(([stage, data]) => ({
    stage: stage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: data.value,
    count: data.count
  }));

  // Sales trend data (last 6 months)
  const salesTrendData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleString('default', { month: 'short' });
    const monthDeals = deals.filter(deal => {
      const dealDate = new Date(deal.createdAt);
      return dealDate.getMonth() === date.getMonth() && 
             dealDate.getFullYear() === date.getFullYear();
    });
    return {
      month,
      value: monthDeals.reduce((sum, deal) => sum + deal.value, 0),
      count: monthDeals.length
    };
  }).reverse();

  // Deal sources
  const dealSources = deals.reduce((acc, deal) => {
    const source = deal.source || 'Other';
    if (!acc[source]) {
      acc[source] = { count: 0, value: 0 };
    }
    acc[source].count++;
    acc[source].value += deal.value;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  const sourceData = Object.entries(dealSources).map(([source, data]) => ({
    name: source,
    value: data.value
  }));

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Reports & Analytics</h1>
          <p className="text-dark-400">Sales performance and pipeline analysis</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" icon={<Calendar size={16} />}>
            Last 30 Days
          </Button>
          <Button variant="outline" icon={<Filter size={16} />}>
            Filters
          </Button>
          <Button variant="primary" icon={<Download size={16} />}>
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">Total Pipeline Value</p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {formatCurrency(totalDealsValue)}
                </p>
              </div>
              <div className="bg-primary-900/20 p-3 rounded-full">
                <DollarSign size={24} className="text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">Average Deal Size</p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {formatCurrency(avgDealValue)}
                </p>
              </div>
              <div className="bg-primary-900/20 p-3 rounded-full">
                <TrendingUp size={24} className="text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">Win Rate</p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {winRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-primary-900/20 p-3 rounded-full">
                <Target size={24} className="text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">Active Contacts</p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {contacts.length}
                </p>
              </div>
              <div className="bg-primary-900/20 p-3 rounded-full">
                <Users size={24} className="text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pipeline Value by Stage */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Value by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData}>
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1625',
                      border: '1px solid #382a66'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="value" fill="#6046aa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1625',
                      border: '1px solid #382a66'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6046aa" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deal Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Deal Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => entry.name}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1625',
                      border: '1px solid #382a66'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-900/20 flex items-center justify-center">
                    {activity.type === 'call' ? (
                      <Phone size={16} className="text-primary-400" />
                    ) : activity.type === 'meeting' ? (
                      <Users size={16} className="text-primary-400" />
                    ) : (
                      <Mail size={16} className="text-primary-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-dark-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};