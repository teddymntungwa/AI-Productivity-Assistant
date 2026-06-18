import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIDisclaimer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-accent/60 bg-accent/40 p-3 text-xs text-accent-foreground",
        className,
      )}
      role="note"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <span className="font-medium">AI-generated content</span> may be inaccurate or incomplete.
        Please review, edit, and verify important information before use.
      </p>
    </div>
  );
}
