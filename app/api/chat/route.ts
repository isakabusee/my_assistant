import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import resumeData from '@/lib/resume.json';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const message =
      typeof body === 'object' &&
      body !== null &&
      'message' in body &&
      typeof body.message === 'string'
        ? body.message.trim()
        : '';

    if (!message) {
      return Response.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      instructions:
        'You are an expert AI assistant for a portfolio website. Answer questions accurately based only on the following resume data. If the answer cannot be found or inferred from the data, politely say you do not know.',
      prompt: `Resume data:\n${JSON.stringify(resumeData, null, 2)}\n\nUser question: ${message}`,
      temperature: 0.3,
    });

    return Response.json({ reply: text });
  } catch (error) {
    console.error('Failed to generate resume answer:', error);
    return Response.json(
      { error: 'Something went wrong while processing your request.' },
      { status: 500 }
    );
  }
}
