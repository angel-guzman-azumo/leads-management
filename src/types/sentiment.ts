import { Decoder, constant, either, object, string } from "decoders";

export type SentimentValue = "up" | "down";

export interface Sentiment {
  lead_id: string;
  sentiment: SentimentValue;
}

export const sentimentDecoder: Decoder<Sentiment> = object({
  lead_id: string,
  sentiment: either(constant(1), constant(-1)).transform((value) => (value === 1 ? "up" : "down")),
});
