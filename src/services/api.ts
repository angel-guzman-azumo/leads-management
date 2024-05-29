import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { leadsResponseDecoder } from "../types/lead";
import { array } from "decoders";
import { sentimentDecoder } from "../types/sentiment";

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
