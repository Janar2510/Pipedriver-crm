import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useCRM } from '../../context/CRMContext';

export const DealsPipeline: React.FC = () => {
  const { deals } = useCRM();
  
  // Calculate total deals value
  const totalValue = deals.reduce((total, deal) => total + deal.value, 0);
  
  // Group deals by stage
  const stageGroups = deals.reduce((acc, deal) => {
    const stage = deal.stage;
    if (!acc[stage]) {
      acc[stage] = {
        count: 0,
        value: 0,
        deals: [],
      };
    }
    acc[stage].count += 1;
    acc[stage].value += deal.value;
    acc[stage].deals.push(deal);
    return acc;
  }, {} as Record<string, { count: number; value: number; deals: typeof deals }>);
  
  // Define pipeline stages in order
  const stages = [
    { id: 'lead', label: 'Lead' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'proposal', label: 'Proposal' },
    { id: 'negotiation', label: 'Negotiation' },
    { id: 'closed-won', label: 'Closed Won' },
    { id: 'closed-lost', label: 'Closed Lost' },
  ];
  
  const stageColors = {
    'lead': 'bg-blue-100 border-blue-400',
    'discovery': 'bg-indigo-100 border-indigo-400',
    'proposal': 'bg-amber-100 border-amber-400',
    'negotiation': 'bg-teal-100 border-teal-400',
    'closed-won': 'bg-green-100 border-green-400',
    'closed-lost': 'bg-red-100 border-red-400',
  };
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Deals Pipeline</CardTitle>
          <span className="text-sm font-medium text-gray-500">
            Total Value: ${totalValue.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4">
          {stages.map((stage) => {
            const stageData = stageGroups[stage.id] || { count: 0, value: 0, deals: [] };
            const percentage = totalValue > 0 ? (stageData.value / totalValue) * 100 : 0;
            
            return (
              <div key={stage.id} className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{stage.label}</span>
                  <span className="text-xs text-gray-500">{stageData.count}</span>
                </div>
                
                <div className={`flex-1 rounded-md p-3 ${stageColors[stage.id as keyof typeof stageColors]} border-l-4`}>
                  <div className="text-sm font-medium mb-1">
                    ${stageData.value.toLocaleString()}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div 
                      className="h-1.5 rounded-full bg-blue-600" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
                
                <div className="mt-2 space-y-2">
                  {stageData.deals.slice(0, 2).map((deal) => (
                    <div 
                      key={deal.id} 
                      className="p-2 bg-white border border-gray-200 rounded-md text-xs"
                    >
                      <div className="font-medium truncate">{deal.name}</div>
                      <div className="text-gray-500">${deal.value.toLocaleString()}</div>
                    </div>
                  ))}
                  {stageData.count > 2 && (
                    <div className="text-xs text-center text-blue-600">
                      +{stageData.count - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};