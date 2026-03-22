import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
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

    // Convert UI messages to model messages to match the expected schema
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: google('gemini-2.0-flash'),
      system: systemPrompt,
      messages: modelMessages,
      temperature: isCriticalMode ? 0.85 : 0.65,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("API Route Error:", error);
    
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
