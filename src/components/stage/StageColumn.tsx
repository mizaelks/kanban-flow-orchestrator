
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Stage, Opportunity } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import CreateOpportunityDialog from "../opportunity/CreateOpportunityDialog";
import OpportunityDetailsDialog from "../opportunity/OpportunityDetailsDialog";
import { AddTaskDialog } from "../opportunity/AddTaskDialog";
import { AddFieldDialog } from "../opportunity/AddFieldDialog";
import StageHeader from "./StageHeader";
import StageOpportunityList from "./StageOpportunityList";

interface StageColumnProps {
  stage: Stage;
  index: number;
  funnelId: string;
  onOpportunityCreated: (opportunity: Opportunity) => void;
  onStageUpdated?: (stage: Stage) => void;
  onOpportunityUpdated?: (opportunity: Opportunity) => void;
  onOpportunityDeleted?: (opportunityId: string) => void;
}

const StageColumn = ({ 
  stage, 
  index, 
  funnelId, 
  onOpportunityCreated, 
  onStageUpdated,
  onOpportunityUpdated,
  onOpportunityDeleted
}: StageColumnProps) => {
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isAddFieldDialogOpen, setIsAddFieldDialogOpen] = useState(false);
  const [selectedOpportunityForAction, setSelectedOpportunityForAction] = useState<Opportunity | null>(null);
  
  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunityId(opportunity.id);
  };

  const handleOpportunityUpdated = (updatedOpportunity: Opportunity) => {
    console.log('Opportunity updated in StageColumn:', updatedOpportunity);
    if (onOpportunityUpdated) {
      onOpportunityUpdated(updatedOpportunity);
    }
  };

  const handleOpportunityDeleted = (opportunityId: string) => {
    console.log('Opportunity deleted in StageColumn:', opportunityId);
    if (onOpportunityDeleted) {
      onOpportunityDeleted(opportunityId);
    }
    if (selectedOpportunityId === opportunityId) {
      setSelectedOpportunityId(null);
    }
  };

  const handleAddOpportunity = () => {
    setIsCreateDialogOpen(true);
  };

  const handleAddTask = (opportunity: Opportunity) => {
    setSelectedOpportunityForAction(opportunity);
    setIsAddTaskDialogOpen(true);
  };

  const handleAddField = (opportunity: Opportunity) => {
    setSelectedOpportunityForAction(opportunity);
    setIsAddFieldDialogOpen(true);
  };

  const handleTaskAdded = () => {
    // Trigger opportunity refresh if callback exists
    if (onOpportunityUpdated && selectedOpportunityForAction) {
      // Re-fetch opportunity data to get updated tasks
      handleOpportunityUpdated(selectedOpportunityForAction);
    }
  };

  const handleFieldAdded = () => {
    // Trigger opportunity refresh if callback exists
    if (onOpportunityUpdated && selectedOpportunityForAction) {
      // Re-fetch opportunity data to get updated fields
      handleOpportunityUpdated(selectedOpportunityForAction);
    }
  };

  const handleOpportunityCreatedSuccess = () => {
    console.log('Opportunity created in StageColumn');
    setIsCreateDialogOpen(false);
    // Trigger a refresh by calling the parent callback without parameters
    // The parent component should handle refetching the data
    if (onOpportunityCreated) {
      // Create a dummy opportunity object to satisfy the type requirement
      // The parent should handle the actual data refresh
      const dummyOpportunity = { id: '', title: '', value: 0, client: '', createdAt: new Date(), stageId: stage.id, funnelId } as Opportunity;
      onOpportunityCreated(dummyOpportunity);
    }
  };
  
  return (
    <Draggable draggableId={stage.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div 
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="w-80 flex-shrink-0"
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <Card className={`h-full flex flex-col ${snapshot.isDragging ? 'shadow-lg' : ''}`}>
              <StageHeader 
                stage={stage}
                dragHandleProps={provided.dragHandleProps}
                updateStage={onStageUpdated}
                onAddOpportunity={handleAddOpportunity}
              />
              <CardContent className="p-3 flex-1 overflow-hidden">
                <StageOpportunityList
                  stageId={stage.id}
                  opportunities={stage.opportunities}
                  stage={stage}
                  onOpportunityClick={handleOpportunityClick}
                  onAddTask={handleAddTask}
                  onAddField={handleAddField}
                />
              </CardContent>
            </Card>
            
            <CreateOpportunityDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              stageId={stage.id}
              funnelId={funnelId}
              onOpportunityCreated={handleOpportunityCreatedSuccess}
            />
            
            {selectedOpportunityId && (
              <OpportunityDetailsDialog
                open={!!selectedOpportunityId}
                onOpenChange={(open) => {
                  if (!open) setSelectedOpportunityId(null);
                }}
                opportunityId={selectedOpportunityId}
                onOpportunityUpdated={handleOpportunityUpdated}
                onOpportunityDeleted={handleOpportunityDeleted}
              />
            )}

            {selectedOpportunityForAction && (
              <>
                <AddTaskDialog
                  open={isAddTaskDialogOpen}
                  onOpenChange={setIsAddTaskDialogOpen}
                  opportunity={selectedOpportunityForAction}
                  onTaskAdded={handleTaskAdded}
                />
                
                <AddFieldDialog
                  open={isAddFieldDialogOpen}
                  onOpenChange={setIsAddFieldDialogOpen}
                  opportunity={selectedOpportunityForAction}
                  onFieldAdded={handleFieldAdded}
                />
              </>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default StageColumn;
