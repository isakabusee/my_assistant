'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PortfolioChat() {
  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status, error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();

    if (!text || isLoading) return;

    sendMessage({ text });
    setInput('');
  }

  return (
    <Card className="mx-auto flex h-[600px] w-full max-w-2xl flex-col border-muted shadow-lg">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle>AI Portfolio Assistant</CardTitle>
        <CardDescription>
          Ask about my experience, projects, or skills.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4" role="log" aria-live="polite">
            {messages.length === 0 && (
              <div className="flex justify-start">
                <p className="max-w-[80%] rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                  Hi! Ask me anything about my experience, projects, or skills.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary font-medium text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.parts.map((part, index) =>
                    part.type === 'text' ? (
                      <span key={`${message.id}-${index}`} className="whitespace-pre-wrap">
                        {part.text}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            ))}

            {status === 'submitted' && (
              <div className="flex justify-start">
                <p className="max-w-[80%] animate-pulse rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                  Thinking...
                </p>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {error && (
        <div className="flex items-center justify-between gap-3 px-4 pb-2">
          <p className="text-sm text-destructive" role="alert">
            Something went wrong. Please try again.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => regenerate()}
          >
            Retry
          </Button>
        </div>
      )}

      <CardFooter className="border-t bg-muted/10 p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <label className="sr-only" htmlFor="portfolio-chat-input">
            Ask a question about the portfolio
          </label>
          <Input
            id="portfolio-chat-input"
            type="text"
            placeholder="e.g., What technologies did they use for their latest project?"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isLoading}
            className="flex-1 focus-visible:ring-primary"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
