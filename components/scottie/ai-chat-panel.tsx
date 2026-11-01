"use client";

import { useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { AIResponseCard } from "@/components/scottie/ai-response-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScottieResponse } from "@/lib/ai/scottie";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "Do I have any tax deadlines this month?",
  "Which property is most at risk right now?",
  "Are any operating accounts close to dormancy?",
  "What should I review for my Lisbon property?"
];

interface AIChatPanelProps {
  propertyId?: string;
  mode?: "full" | "embedded";
}

export function AIChatPanel({ propertyId, mode = "full" }: AIChatPanelProps) {
  const isEmbedded = mode === "embedded";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I am Scottie. Ask me about compliance deadlines, payment risks, or operational issues across your portfolio."
    }
  ]);
  const [latestResponse, setLatestResponse] = useState<ScottieResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitPrompt(prompt: string) {
    const text = prompt.trim();
    if (!text) return;

    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");

    try {
      const response = await fetch("/api/scottie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: text, propertyId })
      });

      if (!response.ok) {
        throw new Error("Scottie is unavailable right now.");
      }

      const payload = (await response.json()) as ScottieResponse;
      setLatestResponse(payload);
      setMessages((current) => [...current, { role: "assistant", content: payload.answer }]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to reach Scottie.");
    } finally {
      setLoading(false);
    }
  }

  const chatCard = (
    <Card className="surface">
      <CardHeader>
        <CardTitle className="font-[var(--font-space-grotesk)]">Scottie Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn("space-y-3 overflow-y-auto rounded-xl border p-3", isEmbedded ? "max-h-[320px]" : "max-h-[400px]")}>
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex gap-2 ${message.role === "assistant" ? "items-start" : "justify-end"}`}
            >
              {message.role === "assistant" ? (
                <Avatar className="size-7">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              ) : null}
              <div
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Ask Scottie about deadlines, risks, or this property..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submitPrompt(input);
              }
            }}
          />
          <Button onClick={() => void submitPrompt(input)} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const promptsCard = (
    <Card className="surface">
      <CardHeader>
        <CardTitle className="text-base">Suggested prompts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestedPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            className="h-auto w-full justify-start whitespace-normal py-2.5 text-left"
            onClick={() => void submitPrompt(prompt)}
          >
            <Bot className="mt-0.5 size-4 shrink-0" />
            <span>{prompt}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );

  if (isEmbedded) {
    return (
      <div className="space-y-4">
        {chatCard}
        {promptsCard}
        {latestResponse ? <AIResponseCard response={latestResponse} /> : null}
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      {chatCard}
      <div className="space-y-4">
        {promptsCard}
        {latestResponse ? <AIResponseCard response={latestResponse} /> : null}
      </div>
    </div>
  );
}
