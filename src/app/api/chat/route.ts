import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SYSTEM_PROMPT_BASE, ROAST_MODE_ADDITION } from '@/lib/prompt';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages, isCriticalMode } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request: No messages provided." }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const systemPrompt = isCriticalMode 
      ? `${SYSTEM_PROMPT_BASE}\n${ROAST_MODE_ADDITION}` 
      : SYSTEM_PROMPT_BASE;

    const result = await streamText({
      model: google('gemini-2.0-flash'),
      system: systemPrompt,
      messages,
      temperature: isCriticalMode ? 0.85 : 0.65,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("API Route Error:", error);
    
    // Provide a structured error response
    return new Response(
      JSON.stringify({ 
        error: "Investment evaluation failed due to a system error.", 
        message: error?.message || "Internal Server Error"
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
