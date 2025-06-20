
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "@/components/ui/pagination-controls";
import ClientSummaryTable from "./ClientSummaryTable";

interface ClientSummaryData {
  client: string;
  totalValue: number;
  totalOpportunities: number;
  funnelId: string;
  stageId: string;
}

interface ClientSummaryTableWithPaginationProps {
  clientSummary: ClientSummaryData[];
  getFunnelName: (funnelId: string) => string;
  getStageName: (stageId: string) => string;
  itemsPerPage?: number;
}

const ClientSummaryTableWithPagination = ({
  clientSummary,
  getFunnelName,
  getStageName,
  itemsPerPage = 10
}: ClientSummaryTableWithPaginationProps) => {
  // Transform data to match ClientSummaryTable interface
  const transformedData = clientSummary.map(item => ({
    client: item.client,
    opportunityCount: item.totalOpportunities,
    totalValue: item.totalValue,
    mostRecentDate: null, // Will be handled by the table component
    funnelId: item.funnelId,
    stageId: item.stageId
  }));

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    totalItems,
    startIndex,
    endIndex
  } = usePagination({
    data: transformedData,
    itemsPerPage
  });

  return (
    <div className="space-y-4">
      <ClientSummaryTable
        clientSummary={paginatedData}
        getFunnelName={getFunnelName}
        getStageName={getStageName}
      />
      
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
};

export default ClientSummaryTableWithPagination;
