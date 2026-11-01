import { Sparkles } from "lucide-react";

import { AIActionsList } from "@/components/dashboard/ai-actions-list";
import { AIChatPanel } from "@/components/scottie/ai-chat-panel";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEstateData } from "@/lib/db/estate-data";

export default async function ScottiePage() {
  const data = await getEstateData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Scottie Assistant"
        description="Your AI chief operating layer for compliance, finance, and property risk across jurisdictions."
      />

      <section className="rounded-2xl border bg-gradient-to-r from-primary/15 via-transparent to-transparent p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="size-3" /> Scottie active
          </Badge>
          <Badge variant="outline">Compliance Agent online</Badge>
          <Badge variant="outline">Finance Agent online</Badge>
          <Badge variant="outline">Monitoring Agent online</Badge>
          <Badge variant="outline">Payments Agent online</Badge>
        </div>
      </section>

      <AIChatPanel />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle>Recent message history</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.aiConversations.map((conversation) => (
              <article key={conversation.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium">{conversation.title}</h3>
                  {conversation.propertyId ? (
                    <Badge variant="secondary">
                      {data.properties.find((property) => property.id === conversation.propertyId)?.name ??
                        "Property context"}
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-3 space-y-2">
                  {conversation.messages.map((message) => (
                    <div key={message.id} className="rounded-md border bg-background/60 p-2 text-sm">
                      <span className="mr-2 text-xs uppercase text-muted-foreground">{message.role}</span>
                      {message.content}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <AIActionsList items={data.aiActions} />
      </section>
    </div>
  );
}
