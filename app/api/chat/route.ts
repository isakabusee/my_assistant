'use server'

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import resumeData from '@/lib/resume.json';

export async function askResume(question: string): Promise<string> {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    throw new Error('Question cannot be empty');
  }

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: `You are a helpful assistant that answers questions strictly based on the provided resume data.
      
Resume Data:
${JSON.stringify(resumeData, null, 2)}

Provide a clear, concise answer based ONLY on the resume data provided. If the answer is not explicitly stated in the data, reply exactly with: "I couldn't find that information in the resume."`,
      prompt: trimmedQuestion,
    });

    return text;
  } catch (error) {
    console.error('Failed to generate resume answer:', error);
    throw new Error('Something went wrong while processing your request.');
  }
}
