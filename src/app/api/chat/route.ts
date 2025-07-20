import { google } from "@ai-sdk/google";
import { streamText, type Message } from "ai";

export const maxDuration = 60;

const LEGAL_RIGHTS_SYSTEM_MESSAGE = `You are a helpful AI assistant specializing in legal rights information. You provide accurate, clear information about legal rights, especially focusing on civil rights, protest rights, police interactions, and constitutional protections.

Your knowledge is primarily based on U.S. constitutional law and civil rights guidelines from organizations like the ACLU. You should:

1. Provide clear, actionable information about legal rights
2. Explain complex legal concepts in simple terms
3. Always recommend consulting with a qualified attorney for specific legal situations
4. Focus on constitutional protections and established civil rights
5. Be helpful but emphasize that your advice is educational, not legal counsel
6. Encourage users to know their rights while being respectful of law enforcement

You should not:
- Provide specific legal advice for individual cases
- Encourage illegal activities
- Make definitive statements about complex legal situations without caveats
- Ignore the importance of safety in interactions with law enforcement

Always remind users that while you provide educational information, they should consult with qualified legal professionals for specific legal situations.`;

type RequestBody = {
  messages: Message[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { messages } = body;

    const fullPromptMessage: Message = {
      role: "system",
      content: LEGAL_RIGHTS_SYSTEM_MESSAGE,
      id: "system",
    };

    const stream = streamText({
      model: google("gemini-1.5-flash"),
      messages: [fullPromptMessage, ...messages],
      temperature: 0.3,
      maxTokens: 1000,
      maxRetries: 3,
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }
    return new Response("An unexpected error occurred", {
      status: 500,
    });
  }
}
