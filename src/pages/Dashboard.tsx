import React from 'react';
import { Users, DollarSign, CheckSquare, CreditCard, Clock, TrendingUp } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { KPICard } from '../components/dashboard/KPICard';
import { DealsPipeline } from '../components/dashboard/DealsPipeline';
import { TasksOverview } from '../components/dashboard/TasksOverview';
import { RecentActivities } from '../components/dashboard/RecentActivities';

export const Dashboard: React.FC = () => {
  const { contacts, deals, tasks, activities } = useCRM();
  
  // Calculate KPIs
  const totalContacts = contacts.length;
  const totalDeals = deals.length;
  const totalActivities = activities.length;
  
  const activeDealsValue = deals
    .filter(deal => deal.stage !== 'closed-won' && deal.stage !== 'closed-lost')
    .reduce((sum, deal) => sum + deal.value, 0);
  
  const wonDealsValue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.value, 0);
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-500">Overview of your sales performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Contacts"
          value={totalContacts}
          change={{ value: 12, trend: 'up' }}
          icon={<Users size={18} />}
          variant="primary"
        />
        
        <KPICard
          title="Active Deals Value"
          value={`$${activeDealsValue.toLocaleString()}`}
          change={{ value: 8, trend: 'up' }}
          icon={<DollarSign size={18} />}
          variant="secondary"
        />
        
        <KPICard
          title="Won Deals Value"
          value={`$${wonDealsValue.toLocaleString()}`}
          change={{ value: 5, trend: 'up' }}
          icon={<TrendingUp size={18} />}
          variant="success"
        />
        
        <KPICard
          title="Tasks"
          value={`${completedTasks}/${tasks.length}`}
          icon={<CheckSquare size={18} />}
          variant="warning"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DealsPipeline />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TasksOverview />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};