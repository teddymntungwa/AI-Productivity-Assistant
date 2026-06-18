import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { mockTaskPlan } from "@/lib/mock-ai";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace" },
      { name: "description", content: "Turn goals and workload into prioritized tasks with deadlines and dependencies." },
    ],
  }),
  component: TaskPage,
});

function TaskPage() {
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!goal.trim()) { toast.error("Add a goal or project."); return; }
    setLoading(true);
    try { setOutput(await mockTaskPlan(goal + (context ? ` — ${context}` : ""))); } finally { setLoading(false); }
  };

  return (
    <ToolShell
      title="AI Task Planner"
      description="Describe your goal, project, or workload. Get a prioritized plan with deadlines and dependencies."
      icon={<ListChecks className="h-5 w-5" />}
      loading={loading}
      output={output}
      onChangeOutput={setOutput}
      onGenerate={generate}
      generateLabel="Plan tasks"
      outputRows={18}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="goal">Goal / project</Label>
            <Input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Launch v2 of our onboarding flow" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="context">Context / workload (optional)</Label>
            <Textarea id="context" rows={8} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Team size, deadline, current commitments, constraints…" />
          </div>
        </div>
      }
    />
  );
}
