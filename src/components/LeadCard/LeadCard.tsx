import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useContactedLeads } from "../../context/ContactedLeadsContext";
import { LinkedinIcon } from "../../icons/LinkedinIcon/LinkedinIcon";
import { ThumbsDownIcon } from "../../icons/ThumbsDownIcon/ThumbsDownIcon";
import { ThumbsUpIcon } from "../../icons/ThumbsUpIcon/ThumbsUpIcon";
import { UserIcon } from "../../icons/UserIcon/UserIcon";
import { useDeleteFeedback, useGiveFeedback } from "../../services/api";
import { Lead } from "../../types/lead";
import { SentimentValue } from "../../types/sentiment";
import { Button } from "../Button/Button";
import { Menu } from "../Menu/Menu";
import { Tooltip } from "../Tooltip/Tooltip";

export function LeadCard({ lead, sentiment }: { lead: Lead; sentiment: SentimentValue }) {
  return (
    <div className="flex flex-col w-card h-card max-h-card border border-borderGray rounded-lg justify-between">
      <LeadCardHeader lead={lead} sentiment={sentiment} />
      <LeadCardContent lead={lead} />
      <LeadCardFooter lead={lead} />
    </div>
  );
}

function LeadCardHeader({ lead, sentiment }: { lead: Lead; sentiment: SentimentValue }) {
  const { isContacted, toggleContacted } = useContactedLeads();
  const contacted = useMemo(() => isContacted(lead._id), [isContacted, lead._id]);
  const { localSentiment, updateFeedback } = useLocalSentiment(lead, sentiment);

  return (
    <div className="flex flex-row justify-between p-2 px-card items-center">
      <Button
        className={classNames({ "bg-contacted text-white": contacted, "text-userIcon": !contacted })}
        onClick={() => toggleContacted(lead._id)}
      >
        <UserIcon />
      </Button>

      <div className="flex flex-row gap-2">
        <Button variant="ghost" onClick={() => updateFeedback("up")}>
          <ThumbsUpIcon
            className={classNames({ "text-icon": localSentiment !== "up", "text-success": localSentiment === "up" })}
          />
        </Button>
        <Button variant="ghost" onClick={() => updateFeedback("down")}>
          <ThumbsDownIcon
            className={classNames({ "text-icon": localSentiment !== "down", "text-error": localSentiment === "down" })}
          />
        </Button>
        <Menu lead={lead} />
      </div>
    </div>
  );
}

function useLocalSentiment(lead: Lead, sentiment: SentimentValue) {
  const [localSentiment, setLocalSentiment] = useState(sentiment);
  useEffect(() => {
    setLocalSentiment(sentiment);
  }, [lead, sentiment]);

  const giveFeedbackMutation = useGiveFeedback(lead._id);
  const deleteFeedbackMutation = useDeleteFeedback(lead._id);
  const updateFeedback = useCallback(
    (newSentiment: SentimentValue) => {
      if (sentiment === newSentiment) {
        deleteFeedbackMutation.mutate();
        setLocalSentiment("none");
      } else {
        giveFeedbackMutation.mutate(newSentiment);
        setLocalSentiment(newSentiment);
      }
    },
    [deleteFeedbackMutation, giveFeedbackMutation, sentiment],
  );

  return { localSentiment, updateFeedback };
}

function LeadCardContent({ lead }: { lead: Lead }) {
  return (
    <div className="flex flex-col gap-1 px-card h-[87px]">
      <LeadCardField label="Name" value={lead.name} />
      <div className="flex flex-row gap-2">
        <div className="flex flex-1">
          {lead.current_title.length > 30 ? (
            <Tooltip text={lead.current_title}>
              <LeadCardField label="Role" value={lead.current_title} />
            </Tooltip>
          ) : (
            <LeadCardField label="Role" value={lead.current_title} />
          )}
        </div>
        <div className="flex flex-1">
          <LeadCardField label="Net Worth" value={lead.ownership_bucket} />
        </div>
        <div className="flex flex-1">
          <LeadCardField label="City" value={lead.city} />
        </div>
      </div>
    </div>
  );
}

function LeadCardField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-[11px] text-label">{label}</div>
      <div className="text-[11px] font-medium text-ellipsis">{value}</div>
    </div>
  );
}

function LeadCardFooter({ lead }: { lead: Lead }) {
  return (
    <div className="h-[47px] bg-footer px-card flex flex-row justify-between items-center">
      <LeadCardField
        label="Date"
        value={lead.lead_date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      />
      <div className="h-[18px] w-[18px]">
        <a href={lead.profile_url} target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </a>
      </div>
    </div>
  );
}
