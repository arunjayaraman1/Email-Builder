import { getCloudflareContext } from "@opennextjs/cloudflare";

export const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

interface GenerateOptions {
  messages: { role: string; content: string }[];
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: "json_object" };
}

export async function generateText(
  opts: GenerateOptions,
): Promise<string | null> {
  try {
    const { env } = getCloudflareContext();
    const ai = (env as unknown as { AI: unknown }).AI as {
      run: (model: string, opts: Record<string, unknown>) => Promise<{ response?: string }>;
    } | undefined;
    if (!ai) return null;

    const result = await ai.run(MODEL, {
      messages: opts.messages,
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.max_tokens ?? 500,
      ...(opts.response_format ? { response_format: opts.response_format } : {}),
    });

    return result.response ?? null;
  } catch {
    return null;
  }
}
