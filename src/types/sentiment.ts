import { Decoder, constant, either, object, string } from "decoders";

export type SentimentValue = "up" | "down" | "none";

export interface Sentiment {
  lead_id: string;
  sentiment: SentimentValue;
}

export const sentimentDecoder: Decoder<Sentiment> = object({
  lead_id: string,
  sentiment: either(constant(1), constant(-1)).transform(numberToSentiment),
});

function numberToSentiment(value: number): SentimentValue {
  return value === 1 ? "up" : "down";
}

export function sentimentToNumber(sentiment: SentimentValue) {
  return sentiment === "up" ? 1 : -1;
}
