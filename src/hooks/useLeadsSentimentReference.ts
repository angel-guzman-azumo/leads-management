import { omit } from "ramda";
import { useEffect, useState } from "react";
import { useLeadsSentiment } from "../services/api";
import { SentimentValue } from "../types/sentiment";

export function useLeadsSentimentReference(leads: string[]) {
  const [sentimentReference, setSentimentReference] = useState<Record<string, SentimentValue>>({});
  const query = useLeadsSentiment(leads);

  useEffect(() => {
    if (!query.data) return;
    const newReference: Record<string, SentimentValue> = {};
    query.data.forEach((sentiment) => (newReference[sentiment.lead_id] = sentiment.sentiment));

    setSentimentReference((oldReference) => ({ ...omit(leads, oldReference), ...newReference }));
  }, [query.data, leads]);

  return sentimentReference;
}
