import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  gateway,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';
import resumeData from '@/lib/resume.json';

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();
    const result = streamText({
      model: gateway('openai/gpt-4o-mini'),
      instructions: `You are an expert AI assistant for a portfolio website. Answer questions accurately based only on the following JSON resume data. If the answer cannot be found or inferred from the data, politely say you do not know.\n\nResume data:\n${JSON.stringify(resumeData, null, 2)}`,
      messages: await convertToModelMessages(messages),
      temperature: 0.3,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error('Failed to stream resume answer:', error);
    return Response.json(
      { error: 'Something went wrong while processing your request.' },
      { status: 500 }
    );
  }
}
