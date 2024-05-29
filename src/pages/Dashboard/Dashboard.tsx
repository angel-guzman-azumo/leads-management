import { useEffect, useMemo, useState } from "react";
import { P, match } from "ts-pattern";
import { CircularProgress } from "../../components/CircularProgress/CircularProgress";
import { LeadCard } from "../../components/LeadCard/LeadCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { useLeadsSentimentReference } from "../../hooks/useLeadsSentimentReference";
import { useLeads } from "../../services/api";
import { Lead, LeadsResponse } from "../../types/lead";

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const query = useCachedLeads(currentPage);

  if (query.isError) {
    console.error(query.error);
  }

  return (
    <div className="flex justify-center">
      <div className="py-[174px] flex flex-col gap-10 w-[1140px]">
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium front-md ml-4">Contacts Data</div>
          {query.isFetching && <CircularProgress className="!w-6 !h-6" />}
        </div>
        <div className="flex flex-wrap gap-4 justify-center h-[563px]">
          {query.isError && <p className="text-red-500 pl-5 w-full">An error occurred</p>}
          {query.isSuccess && query.data && <LeadsView leads={query.data.leads} />}
        </div>
        {match(query.data)
          .with(P.nullish, () => <Pagination pages={1} currentPage={1} onChange={() => {}} />)
          .otherwise((data) => (
            <Pagination pages={Math.ceil(data.total_results / 9)} currentPage={currentPage} onChange={setCurrentPage} />
          ))}
      </div>
    </div>
  );
}

function useCachedLeads(currentPage: number) {
  const query = useLeads(currentPage);
  const [cachedData, setCachedData] = useState<LeadsResponse | null>(null);

  useEffect(() => {
    if (query.data) {
      setCachedData(query.data);
    }
  }, [query.data]);

  return { ...query, data: cachedData };
}

function LeadsView({ leads }: { leads: Lead[] }) {
  const sentimentReference = useLeadsSentiment({ leads });
  return leads.map((lead) => (
    <LeadCard key={lead._id} lead={lead} sentiment={sentimentReference[lead._id] || "none"} />
  ));
}

function useLeadsSentiment({ leads }: { leads: Lead[] }) {
  const leadsIds = useMemo(() => leads.map((lead) => lead._id), [leads]);
  return useLeadsSentimentReference(leadsIds);
}
