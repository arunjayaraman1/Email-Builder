import OpenAI from "openai";

export const MODEL = process.env.OPENROUTER_MODEL ?? "stepfun/step-3.7-flash";

export function getClient(): OpenAI | null {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) return null;
  return new OpenAI({
    apiKey: key,
    baseURL: "https://openrouter.ai/api/v1",
  });
}
