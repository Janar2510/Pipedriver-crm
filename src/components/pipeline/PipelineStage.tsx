import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { Deal } from '../../types';
import { PipelineCard } from './PipelineCard';

interface PipelineStageProps {
  deals: Deal[];
  stageId: string;
}

export const PipelineStage: React.FC<PipelineStageProps> = ({ deals, stageId }) => {
  const { setNodeRef } = useDroppable({
    id: stageId,
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[200px] space-y-2 p-2"
    >
      {deals.map(deal => (
        <PipelineCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};