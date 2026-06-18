import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockMeetingSummary } from "@/lib/mock-ai";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/meeting")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace" },
      { name: "description", content: "Turn raw meeting notes into structured summaries, actions, and decisions." },
    ],
  }),
  component: MeetingPage,
});

function MeetingPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!notes.trim()) { toast.error("Paste your notes or transcript first."); return; }
    setLoading(true);
    try { setOutput(await mockMeetingSummary(notes)); } finally { setLoading(false); }
  };

  return (
    <ToolShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a clean summary, action items, decisions, blockers, and next steps."
      icon={<FileText className="h-5 w-5" />}
      loading={loading}
      output={output}
      onChangeOutput={setOutput}
      onGenerate={generate}
      generateLabel="Summarize meeting"
      outputRows={18}
      inputs={
        <div className="space-y-1.5">
          <Label htmlFor="notes">Meeting notes / transcript</Label>
          <Textarea
            id="notes"
            rows={18}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your raw meeting notes or transcript here…"
            className="font-mono text-sm"
          />
        </div>
      }
    />
  );
}
