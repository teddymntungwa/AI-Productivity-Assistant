// Mock AI response generators. Simulate latency so the UX feels real.
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function mockEmail(input: {
  recipient: string;
  role: string;
  tone: string;
  purpose: string;
  keyPoints: string;
  outcome: string;
}) {
  await sleep(900);
  const points = input.keyPoints
    .split(/\n|,/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `• ${p}`)
    .join("\n");
  return `Subject: ${input.purpose || "Following up"}

Hi ${input.recipient || "there"}${input.role ? ` (${input.role})` : ""},

I hope this message finds you well. I'm reaching out regarding ${input.purpose || "an important matter"}. I wanted to share a few key points for your consideration:

${points || "• [Add your key points here]"}

${input.outcome ? `Ideally, I'd love to ${input.outcome.toLowerCase()}.` : ""} Please let me know your thoughts at your earliest convenience — happy to set up a quick call if that's easier.

Thank you for your time and consideration.

Best regards,
[Your name]`;
}

export async function mockMeetingSummary(notes: string) {
  await sleep(1000);
  const first = notes.split(/[.\n]/).find((s) => s.trim().length > 0) ?? "the meeting topic";
  return `## Summary
The team discussed ${first.trim().toLowerCase()} and aligned on the next phase of work, covering scope, ownership, and timeline.

## Action Items
- [ ] Draft project brief — Owner: Project Lead — Due: this week
- [ ] Confirm stakeholder availability — Owner: PM — Due: Friday
- [ ] Share updated roadmap — Owner: Product — Due: next Monday

## Decisions
- Move forward with the proposed approach
- Adopt weekly check-ins for the next 4 weeks
- Prioritize launch readiness over additional scope

## Blockers
- Pending budget approval from finance
- Awaiting access to analytics dashboard

## Next Steps
1. Circulate notes within 24 hours
2. Schedule kickoff session
3. Set up shared workspace for assets`;
}

export async function mockTaskPlan(goal: string) {
  await sleep(900);
  return `## Prioritized Tasks for: ${goal || "Your project"}

### 🔴 High Priority (This Week)
1. **Define success metrics** — Due: Tomorrow — Depends on: stakeholder alignment
2. **Kickoff with core team** — Due: Day 2 — Depends on: calendar coordination
3. **Draft initial scope doc** — Due: Day 3 — Depends on: task 1

### 🟡 Medium Priority (Next 2 Weeks)
4. **Identify required resources** — Due: Day 7 — Depends on: task 3
5. **Build first prototype/draft** — Due: Day 10 — Depends on: task 4
6. **Internal review cycle** — Due: Day 12 — Depends on: task 5

### 🟢 Lower Priority (Following Sprint)
7. **Polish & QA pass** — Due: Day 18 — Depends on: task 6
8. **Stakeholder presentation** — Due: Day 20 — Depends on: task 7
9. **Retrospective & next-phase planning** — Due: Day 21`;
}

export async function mockResearch(topic: string) {
  await sleep(1100);
  return `## Summary
${topic || "Your topic"} is a rapidly evolving area with significant implications for modern workplaces. Recent developments point to growing adoption, new best practices, and emerging challenges around governance and quality.

## Key Insights
- **Adoption is accelerating** across mid-market and enterprise segments
- **Tooling has matured** — integrations now cover most major workflows
- **Skills gap remains** the most-cited barrier to scale
- **ROI is measurable** within 3–6 months when paired with clear KPIs

## Recommendations
1. Start with a focused pilot on a single high-value workflow
2. Pair every rollout with training and clear usage guidelines
3. Establish review checkpoints to validate output quality
4. Track adoption + outcomes monthly and iterate

## Further Questions
- What's the existing baseline for the workflow you'd target?
- Which teams are most ready to adopt early?
- What governance is needed for compliance & quality?
- How will success be measured at 30/60/90 days?`;
}

const chatReplies = [
  "Great question — here's how I'd approach it: break the work into smaller, verifiable steps, then tackle the highest-leverage one first.",
  "Happy to help. Could you share a bit more context about the audience and desired outcome so I can tailor this better?",
  "Here's a quick draft you can iterate on. Let me know what you'd like to adjust — tone, length, or focus.",
  "Good thinking. A simple framework that often helps here is: Goal → Constraints → Options → Decision → Next step.",
  "Sure thing. I'd suggest starting with a clear one-line objective, then listing 3–5 concrete tasks underneath it.",
];

export async function mockChat(message: string) {
  await sleep(700);
  const base = chatReplies[Math.floor(Math.random() * chatReplies.length)];
  return `${base}\n\nRegarding "${message.slice(0, 80)}${message.length > 80 ? "…" : ""}" — let me know if you'd like me to go deeper, draft something, or summarize a different angle.`;
}
