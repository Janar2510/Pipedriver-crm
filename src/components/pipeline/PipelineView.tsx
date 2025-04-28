import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCRM } from '../../context/CRMContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Search, Filter, Settings } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { PipelineStage } from './PipelineStage';
import { PipelineCard } from './PipelineCard';
import type { Deal, Pipeline } from '../../types';

export const PipelineView: React.FC = () => {
  const { deals, pipelines } = useCRM();
  const [activePipeline, setActivePipeline] = useState<Pipeline>(pipelines[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  // Group deals by stage
  const dealsByStage = activePipeline.stages.reduce((acc, stage) => {
    acc[stage.id] = deals.filter(deal => deal.stage === stage.id);
    return acc;
  }, {} as Record<string, Deal[]>);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const deal = deals.find(d => d.id === active.id);
    if (deal) setActiveDeal(deal);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const dealId = active.id;
    const newStage = over.id;

    if (dealId !== newStage) {
      // Update deal stage
      const deal = deals.find(d => d.id === dealId);
      if (deal) {
        const updatedDeal = { ...deal, stage: newStage as string };
        // Update deal in context
      }
    }

    setActiveDeal(null);
  };

  const stageStats = activePipeline.stages.map(stage => {
    const stageDeals = dealsByStage[stage.id] || [];
    return {
      ...stage,
      totalValue: stageDeals.reduce((sum, deal) => sum + deal.value, 0),
      dealCount: stageDeals.length,
    };
  });

  const totalPipelineValue = stageStats.reduce((sum, stage) => sum + stage.totalValue, 0);

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-dark-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Pipeline</h1>
            <p className="text-dark-400">
              Total Value: {formatCurrency(totalPipelineValue)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" icon={<Settings size={16} />}>
              Pipeline Settings
            </Button>
            <Button variant="primary" icon={<Plus size={16} />}>
              Add Deal
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
            <Input
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" icon={<Filter size={16} />}>
            Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-6">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex space-x-4 min-w-max">
            {stageStats.map(stage => (
              <div key={stage.id} className="w-80">
                <Card>
                  <CardHeader className="bg-dark-800">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <span>{stage.name}</span>
                      <span className="text-dark-400">
                        {formatCurrency(stage.totalValue)} · {stage.dealCount}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <SortableContext
                      items={dealsByStage[stage.id]?.map(d => d.id) || []}
                      strategy={verticalListSortingStrategy}
                    >
                      <PipelineStage
                        deals={dealsByStage[stage.id] || []}
                        stageId={stage.id}
                      />
                    </SortableContext>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeDeal && <PipelineCard deal={activeDeal} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};