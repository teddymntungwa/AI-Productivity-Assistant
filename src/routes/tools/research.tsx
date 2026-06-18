import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { mockResearch } from "@/lib/mock-ai";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace" },
      { name: "description", content: "Get fast summaries, insights, recommendations and follow-up questions on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [objective, setObjective] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) { toast.error("Enter a topic to research."); return; }
    setLoading(true);
    try { setOutput(await mockResearch(`${topic}${objective ? ` (objective: ${objective})` : ""}`)); }
    finally { setLoading(false); }
  };

  return (
    <ToolShell
      title="AI Research Assistant"
      description="Provide a topic and objective. Get a structured summary with insights, recommendations, and follow-up questions."
      icon={<Search className="h-5 w-5" />}
      loading={loading}
      output={output}
      onChangeOutput={setOutput}
      onGenerate={generate}
      generateLabel="Run research"
      outputRows={18}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI adoption in mid-market SaaS" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="context">Context (optional)</Label>
            <Textarea id="context" rows={5} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Industry, audience, prior knowledge…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="objective">Objective</Label>
            <Input id="objective" value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="e.g. Brief execs on adoption trends" />
          </div>
        </div>
      }
    />
  );
}
