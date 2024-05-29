import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { leadsResponseDecoder } from "../types/lead";
import { array } from "decoders";
import { SentimentValue, sentimentDecoder, sentimentToNumber } from "../types/sentiment";

const API_BASE_URL = "https://api.cashmereai.com/test";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});

export const useLeads = (page: number = 1, limit: number = 9) => {
  return useQuery({
    queryKey: ["leads", page],
    queryFn: async () => {
      const response = await api.get("/leads", { params: { page, limit } });

      return leadsResponseDecoder.verify(response.data);
    },
  });
};

export function useLeadsSentiment(leads: string[]) {
  return useQuery({
    queryKey: ["leads-sentiment", leads],
    queryFn: async () => {
      const response = await api.get("/leads/feedback", { params: { lead_ids: leads } });

      return array(sentimentDecoder).verify(response.data);
    },
  });
}

export function useGiveFeedback(leadId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sentiment: SentimentValue) => {
      await api.put("/leads/feedback", {}, { params: { lead_id: leadId, sentiment: sentimentToNumber(sentiment) } });
      queryClient.invalidateQueries({ queryKey: ["leads-sentiment"] });
    },
  });
}

export function useDeleteFeedback(leadId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/leads/feedback/${leadId}`);
      queryClient.invalidateQueries({ queryKey: ["leads-sentiment"] });
    },
  });
}
