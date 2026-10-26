
"use client";

import React, { useState, useTransition } from 'react';
import { askResume } from './api/chat/route';

export default function ResumeQueryAPP() {
  const [question, setQuestion ] = useState('');
  const [answer, setAnswer ] = useState('');
  const [error, setError ] = useState('');
  const [isPending, startTransition ] = useTransition();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    setError('');
    startTransition(async () => {
      try {
        const result = await askResume(question);
        setAnswer(result);
      } catch (err: any) {
        setError('An error occured while fetching the answer.');
        console.error(err);
      }
    });
  };

  
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
  <h1 className="text-2xl font-bold">Resume Q&A Assistant</h1>
  <form onSubmit={handleSubmit} className='space-y-4'>
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Ask anything about my resume</label>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g., Wehere did Isaac go to school?" 
      className='w-ful border p-2 rounded-md'/>
    </div>
    <button type="submit" disabled={isPending} className="w-full bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 font-medium"
    >{isPending ? 'Searching resume...' : 'Ask Resume'}
    </button>
  </form>
{error && (
  <div className="p-3 border border-red-200 rounded-md bg-red-50 text-red-700 text-sm">
    {error}
  </div>
)}
{ answer && (
  <div className="p-4 border rounded-md bg-gray-50">
    <h2 className="font-semibold text-sm text-gray-500 mb-1">Answer:</h2>
    <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
  </div>
)}
</main>
)
}
