import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, DollarSign, Users } from 'lucide-react';
import type { Deal } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { format } from 'date-fns';

interface PipelineCardProps {
  deal: Deal;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ deal }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <Card className="bg-dark-800 hover:bg-dark-700 transition-colors p-3 cursor-move">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-white">{deal.name}</h3>
          <Badge variant="primary">
            {formatCurrency(deal.value)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-dark-400">
            <Users size={14} className="mr-2" />
            <span>{deal.contactName}</span>
          </div>

          <div className="flex items-center text-dark-400">
            <Calendar size={14} className="mr-2" />
            <span>
              {format(new Date(deal.expectedCloseDate), 'MMM d, yyyy')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Badge
              className={priorityColors[deal.priority]}
            >
              {deal.priority}
            </Badge>
            
            {deal.probability && (
              <span className="text-dark-400">
                {deal.probability}% probability
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};