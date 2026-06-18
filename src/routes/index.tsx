import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageCircle, ArrowRight, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      { name: "description", content: "Your hub for AI-assisted email drafting, meeting summaries, planning, research, and chat." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { title: "Smart Email Generator", desc: "Draft polished, on-tone emails in seconds.", to: "/tools/email", icon: Mail, accent: "from-indigo-500 to-blue-500" },
  { title: "Meeting Notes Summarizer", desc: "Turn raw notes into clear summaries & actions.", to: "/tools/meeting", icon: FileText, accent: "from-cyan-500 to-teal-500" },
  { title: "AI Task Planner", desc: "Get prioritized tasks with deadlines & deps.", to: "/tools/tasks", icon: ListChecks, accent: "from-blue-500 to-cyan-500" },
  { title: "AI Research Assistant", desc: "Summaries, insights & recommendations.", to: "/tools/research", icon: Search, accent: "from-teal-500 to-indigo-500" },
  { title: "AI Chatbot", desc: "Conversational help for anything workplace.", to: "/tools/chat", icon: MessageCircle, accent: "from-sky-500 to-indigo-500" },
];

const activity = [
  { tool: "Email Generator", text: "Drafted a follow-up to Acme procurement team", time: "12 min ago" },
  { tool: "Meeting Summarizer", text: "Summarized Q3 planning sync (42 min)", time: "1 hr ago" },
  { tool: "Task Planner", text: "Planned launch checklist — 9 tasks created", time: "3 hrs ago" },
  { tool: "Research Assistant", text: "Researched competitor pricing models", time: "Yesterday" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-banner p-6 text-white shadow-card md:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <Badge className="mb-4 border-white/30 bg-white/15 text-white hover:bg-white/20">Welcome back</Badge>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            Less busywork. More meaningful work.
          </h1>
          <p className="mt-3 text-sm text-white/85 md:text-base">
            Your AI workplace assistant is ready to help you draft, summarize, plan, and research — all from one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/tools/email">Draft an email <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Link to="/tools/chat">Open AI chat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Quick actions</h2>
            <p className="text-sm text-muted-foreground">Jump straight into a tool.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-card">
                <CardHeader>
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${t.accent} text-white shadow-soft`}>
                    <t.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-3 text-base">{t.title}</CardTitle>
                  <CardDescription>{t.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    Open tool <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity + disclaimer */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Recent activity</CardTitle>
            </div>
            <CardDescription>Your latest AI-assisted work.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {activity.map((a, i) => (
                <li key={i} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.text}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.tool}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {a.time}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Responsible AI</CardTitle>
            <CardDescription>Guidelines for trustworthy output.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <AIDisclaimer />
            <ul className="space-y-2 pl-1">
              <li>• Always review AI output before sharing.</li>
              <li>• Avoid sharing confidential or personal data in prompts.</li>
              <li>• Cross-check facts, figures, and names.</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
