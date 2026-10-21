
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  ArrowUp,
  Bot,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const suggestions = [
  "What technologies does Isaac know?",
  "Tell me about the Memories Project",
  "What is Isaac's backend experience?",
  "How has Isaac used AWS Lambda?",
];

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isBusy =
    status === "submitted" || status === "streaming";

  function submitMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isBusy) return;

    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <a href="/" className="font-bold tracking-tight">
            Isaac Busee's AI assistant
          </a>

          <nav className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/isaac-busee"
              target="_blank"
              rel="noreferrer"
              aria-label="Isaac's LinkedIn"
            >
              {/* <Linkedin className="size-5" /> */}
            </a>
            <a
              href="https://github.com/isakabusee"
              target="_blank"
              rel="noreferrer"
              aria-label="Isaac's GitHub"
            >
              {/* <Github className="size-5" /> */}
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Bot className="size-7" />
          </div>

          <p className="mb-2 text-sm font-medium text-slate-500">
            AI-POWERED PORTFOLIO
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Get to know Isaac.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Ask questions about Isaac's software engineering
            skills, projects, experience, and technical background.
          </p>
        </div>

        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="size-5" />
              Portfolio Assistant
            </CardTitle>
            <CardDescription>
              Answers are based on Isaac's portfolio information.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-4 sm:p-6">
            {messages.length === 0 ? (
              <div className="py-4">
                <h2 className="mb-3 font-semibold">
                  What would you like to know?
                </h2>

                <div className="grid gap-2 sm:grid-cols-2">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      className="h-auto min-h-12 justify-start whitespace-normal px-3 py-3 text-left"
                      onClick={() => submitMessage(suggestion)}
                      disabled={isBusy}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="max-h-[480px] space-y-5 overflow-y-auto"
                aria-live="polite"
                aria-relevant="additions text"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "user"
                        ? "ml-auto max-w-[90%] rounded-2xl bg-slate-900 p-4 text-white"
                        : "mr-auto max-w-[95%] rounded-2xl bg-slate-100 p-4"
                    }
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">
                      {message.role === "user" ? "You" : "Isaac's AI"}
                    </p>

                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <p
                          key={`${message.id}-${index}`}
                          className="whitespace-pre-wrap break-words text-sm leading-7"
                        >
                          {part.text}
                        </p>
                      ) : null,
                    )}
                  </div>
                ))}

                {isBusy && (
                  <div
                    className="flex items-center gap-2 text-sm text-slate-500"
                    role="status"
                  >
                    <LoaderCircle className="size-4 animate-spin" />
                    Isaac's assistant is thinking...
                  </div>
                )}
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            <form
              className="flex items-center gap-2 border-t pt-4"
              onSubmit={(event) => {
                event.preventDefault();
                submitMessage(input);
              }}
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about skills, projects, experience..."
                aria-label="Ask Isaac's portfolio assistant"
                disabled={isBusy}
                maxLength={2000}
              />

              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={!input.trim() || isBusy}
              >
                {isBusy ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <ArrowUp className="size-4" />
                )}
              </Button>
            </form>

            {/* <p className="text-center text-xs text-slate-500">
              AI-generated answers may be inaccurate. Verify
              important details against the resume.
            </p> */}
          </CardContent>
        </Card>

        <footer className="mt-6 text-center text-sm text-slate-500">
          Built with Next.js, Vercel AI SDK, Tailwind CSS, and shadcn/ui.
        </footer>
      </section>
    </main>
  );
}
