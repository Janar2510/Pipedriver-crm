import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'bg-gray-50',
    primary: 'bg-blue-50',
    secondary: 'bg-teal-50',
    success: 'bg-green-50',
    warning: 'bg-amber-50',
  };
  
  const variantIconStyles = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-teal-100 text-teal-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                {change.trend === 'up' ? (
                  <>
                    <ArrowUpRight size={16} className="text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">
                      {change.value}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight size={16} className="text-red-600 mr-1" />
                    <span className="text-sm font-medium text-red-600">
                      {change.value}%
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            )}
          </div>
          
          <div className={`p-2 rounded-full ${variantIconStyles[variant]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};