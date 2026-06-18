import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { mockChat } from "@/lib/mock-ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace" },
      { name: "description", content: "A conversational AI assistant for workplace questions, drafting, and brainstorming." },
    ],
  }),
  component: ChatPage,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const suggestions = [
  "Help me prepare for a 1:1 with my manager",
  "Draft a Slack update for my team about a delayed launch",
  "Brainstorm Q4 OKRs for a product team",
  "Rewrite this paragraph to be more concise",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "welcome", role: "assistant", content: "Hi! I'm your AI workplace assistant. Ask me anything — drafting, brainstorming, planning, or summarizing." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await mockChat(content);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-soft">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">AI Chatbot</h1>
            <p className="line-clamp-2 text-sm text-muted-foreground">A conversational assistant for any workplace task.</p>
          </div>
        </div>
      </header>

      <AIDisclaimer />

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Conversation</CardTitle>
          <CardDescription>Your chat is local to this session.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div ref={scrollRef} className="h-[420px] space-y-4 overflow-y-auto rounded-xl border bg-muted/30 p-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                <div className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                  m.role === "assistant" ? "bg-gradient-brand text-brand-foreground" : "bg-secondary text-secondary-foreground",
                )}>
                  {m.role === "assistant" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft",
                  m.role === "assistant" ? "bg-card text-card-foreground" : "bg-primary text-primary-foreground",
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-brand-foreground">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <div className="rounded-2xl bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-soft">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => send(s)} className="rounded-full">
                  {s}
                </Button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
              }}
              placeholder="Message your AI assistant…  (Enter to send, Shift+Enter for newline)"
              rows={2}
              className="resize-none"
            />
            <Button onClick={() => send()} disabled={loading || !input.trim()} size="icon" className="h-11 w-11 shrink-0 bg-gradient-brand text-brand-foreground hover:opacity-95">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
