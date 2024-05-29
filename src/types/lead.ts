import { Decoder, array, iso8601, number, object, string } from "decoders";

export interface Lead {
  _id: string;
  profile_url: string;
  name: string;
  current_title: string;
  ownership_bucket: string;
  city: string;
  lead_date: Date;
}

export const leadDecoder: Decoder<Lead> = object({
  _id: string,
  profile_url: string,
  name: string,
  current_title: string,
  ownership_bucket: string,
  city: string,
  lead_date: string.transform((date) => iso8601.verify(date + "Z")),
});

export interface LeadsResponse {
  total_results: number;
  leads: Lead[];
}

export const leadsResponseDecoder: Decoder<LeadsResponse> = object({
  total_results: number,
  leads: array(leadDecoder),
});
