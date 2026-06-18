import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEmail } from "@/lib/mock-ai";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace" },
      { name: "description", content: "Draft polished, on-tone emails in seconds with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("Professional");
  const [purpose, setPurpose] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [outcome, setOutcome] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!purpose.trim()) { toast.error("Please add the email purpose."); return; }
    setLoading(true);
    try {
      const res = await mockEmail({ recipient, role, tone, purpose, keyPoints, outcome });
      setOutput(res);
    } finally { setLoading(false); }
  };

  return (
    <ToolShell
      title="Smart Email Generator"
      description="Generate professional, on-tone emails tailored to your recipient and goal."
      icon={<Mail className="h-5 w-5" />}
      loading={loading}
      output={output}
      onChangeOutput={setOutput}
      onGenerate={generate}
      generateLabel="Generate email"
      inputs={
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="recipient">Recipient name</Label>
              <Input id="recipient" placeholder="e.g. Jamie Chen" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Their role</Label>
              <Input id="role" placeholder="e.g. Head of Marketing" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Professional", "Friendly", "Formal", "Persuasive", "Concise", "Apologetic"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="purpose">Purpose</Label>
            <Input id="purpose" placeholder="e.g. Follow up on proposal" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="points">Key points (one per line)</Label>
            <Textarea id="points" rows={4} placeholder="Pricing approved\nKickoff next Monday\nNeed signed SOW" value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="outcome">Desired outcome</Label>
            <Input id="outcome" placeholder="e.g. Get confirmation by Friday" value={outcome} onChange={(e) => setOutcome(e.target.value)} />
          </div>
        </div>
      }
    />
  );
}
