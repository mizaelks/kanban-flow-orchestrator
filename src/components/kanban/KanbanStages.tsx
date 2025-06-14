
import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import { Stage, Opportunity } from "@/types";
import StageColumn from "../stage/StageColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface KanbanStagesProps {
  stages: Stage[];
  funnelId: string;
  onOpportunityCreated: (opportunity: any) => void;
  onStageUpdated?: (stage: Stage) => void;
  onOpportunityUpdated?: (opportunity: Opportunity) => void;
  onOpportunityDeleted?: (opportunityId: string) => void;
}

const KanbanStages = ({ 
  stages, 
  funnelId, 
  onOpportunityCreated, 
  onStageUpdated,
  onOpportunityUpdated,
  onOpportunityDeleted
}: KanbanStagesProps) => {
  // Garantir que as etapas sejam renderizadas na ordem correta
  // Ordenamos as etapas com base no campo 'order'
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  return (
    <div className="relative w-full">
      <ScrollArea className="w-full">
        <div className="w-full overflow-visible pb-6 pt-2">
          <Droppable droppableId="stages-container" direction="horizontal" type="STAGE">
            {(provided) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex space-x-4 min-w-full pb-2"
              >
                {sortedStages.map((stage, index) => (
                  <StageColumn 
                    key={stage.id}
                    stage={stage} 
                    index={index} 
                    funnelId={funnelId}
                    onOpportunityCreated={onOpportunityCreated}
                    onStageUpdated={onStageUpdated}
                    onOpportunityUpdated={onOpportunityUpdated}
                    onOpportunityDeleted={onOpportunityDeleted}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default KanbanStages;
