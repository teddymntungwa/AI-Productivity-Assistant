import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { cn } from "@/lib/utils";

interface ToolShellProps {
  title: string;
  description: string;
  icon: ReactNode;
  inputs: ReactNode;
  output: string;
  loading: boolean;
  onGenerate: () => void;
  onChangeOutput: (v: string) => void;
  generateLabel?: string;
  outputPlaceholder?: string;
  outputRows?: number;
}

export function ToolShell({
  title,
  description,
  icon,
  inputs,
  output,
  loading,
  onGenerate,
  onChangeOutput,
  generateLabel = "Generate",
  outputPlaceholder = "Your AI-generated output will appear here. You can edit it freely.",
  outputRows = 14,
}: ToolShellProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-soft">
            {icon}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
            <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>

      <AIDisclaimer />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Inputs</CardTitle>
            <CardDescription>Fill in the details and let the assistant draft for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputs}
            <Button
              onClick={onGenerate}
              disabled={loading}
              className="w-full bg-gradient-brand text-brand-foreground hover:opacity-95 shadow-soft"
              size="lg"
            >
              <Sparkles className={cn("mr-2 h-4 w-4", loading && "animate-pulse")} />
              {loading ? "Generating…" : generateLabel}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <div className="min-w-0">
              <CardTitle className="text-base">Output</CardTitle>
              <CardDescription>Editable — refine before sharing.</CardDescription>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={onGenerate} disabled={loading}>
                <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} />
                Regenerate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              onChange={(e) => onChangeOutput(e.target.value)}
              placeholder={outputPlaceholder}
              rows={outputRows}
              className="resize-y font-mono text-sm leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
