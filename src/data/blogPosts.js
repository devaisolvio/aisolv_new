export const posts = [
  {
    slug: 'automation-vs-manual-workflows',
    title: 'When to Automate vs. When to Simplify',
    excerpt:
      'Not every process should be automated. We break down how to decide where automation creates real leverage and where a simpler workflow is enough.',
    date: '2024-03-01',
    category: 'Strategy',
    body: [
      'Not every process should be automated. The best teams know when to invest in automation and when a simpler, well-documented workflow is enough. Automation adds value when the same steps repeat often, when errors are costly, or when handoffs create delay. If a process runs a few times a month and the steps are clear, a good playbook and a bit of discipline often beat building a system.',
      'We help clients map their workflows and score them by volume, error cost, and integration complexity. That makes it obvious where to automate first and where to leave things manual until the picture stabilizes. The goal is leverage, not automation for its own sake.',
      'Start with one or two high-impact flows, get them live and stable, then expand. Teams that automate everything at once usually end up maintaining systems nobody uses. Simplify first; automate where it clearly pays off.',
    ],
  },
  {
    slug: 'ai-operating-systems',
    title: 'Building AI Operating Systems Teams Actually Use',
    excerpt:
      'The best AI system is the one that disappears into daily work. Here’s how we design for adoption, clarity, and measurable impact.',
    date: '2024-02-15',
    category: 'AI',
    body: [
      'The best AI system is the one that disappears into daily work. That only happens when it’s designed around how your team already operates—same tools, same language, same success criteria. We focus on adoption from day one: clear inputs, interpretable outputs, and a path to fix things when the model is wrong.',
      'We build AI operating systems that slot into existing workflows instead of forcing new ones. That means integrations with your CRM, helpdesk, and comms tools; guardrails so outputs stay on-brand and safe; and metrics that tie directly to revenue or ops KPIs so you know whether the system is actually helping.',
      'Ownership matters. We hand over the architecture, the prompts, and the monitoring so your team can iterate without depending on us. The result is AI that teams trust and use, not another dashboard that gets ignored.',
    ],
  },
  {
    slug: 'integration-patterns',
    title: 'Integration Patterns That Scale',
    excerpt:
      'Clean data flow between your CRM, helpdesk, and reporting tools without turning into an integration nightmare. Patterns we reuse across clients.',
    date: '2024-02-01',
    category: 'Engineering',
    body: [
      'Clean data flow between your CRM, helpdesk, and reporting tools doesn’t have to mean a spider web of point-to-point integrations. We use a small set of patterns that scale: a single source of truth for core entities, event-driven updates so systems stay in sync, and idempotent pipelines so retries don’t create duplicates or overwrite good data.',
      'We standardize on APIs and webhooks where they exist, and use lightweight middleware only where necessary. The goal is to keep logic in one place and avoid “integration code” scattered across five systems. That makes it easier to add a new tool or change a workflow without rewriting everything.',
      'Across clients we see the same pain: duplicate records, stale data, and no single view of a customer or deal. The fix is usually a clear data model, a few well-defined sync flows, and monitoring so you notice when something breaks. We’ll walk through the patterns we reuse and when to apply them.',
    ],
  },
  {
    slug: 'discovery-to-delivery',
    title: 'From Discovery to Delivery in Weeks',
    excerpt:
      'How we go from a vague automation idea to a live, operable system without endless discovery phases or surprise scope creep.',
    date: '2024-01-20',
    category: 'Process',
    body: [
      'Going from a vague automation idea to a live, operable system doesn’t require endless discovery or surprise scope creep. We keep the discovery phase short and outcome-focused: map the current process, agree on success metrics, and define the smallest slice that delivers value. That becomes the first release.',
      'We timebox discovery and tie it to a concrete proposal—what we’ll build, how long it will take, and what “done” looks like. Then we work in short delivery cycles so you see progress every few weeks and can adjust before we’ve built a mountain of wrong assumptions.',
      'The result is delivery in weeks, not quarters. We’d rather ship a narrow solution that works than spend months designing a perfect system that never goes live. You can always extend once the first slice is running and the team is using it.',
    ],
  },
  {
    slug: 'ownership-not-vendor-lock-in',
    title: 'Ownership Over Vendor Lock‑In',
    excerpt:
      'Why we structure engagements so you own the architecture and the team can run it without depending on us forever.',
    date: '2024-01-05',
    category: 'Strategy',
    body: [
      'We structure engagements so you own the architecture and your team can run it without depending on us forever. That means clear documentation, transferable code, and handover sessions so your people understand how the system works and how to change it. We’re not in the business of creating permanent dependency.',
      'Ownership also means you control the data, the integrations, and the roadmap. We don’t lock you into a proprietary platform or hide the “secret sauce” in a black box. You get the design decisions, the automation logic, and the ability to extend or replace parts of the system as your needs change.',
      'Our goal is to leave you in a better position than when we started—with a system that works, a team that can operate it, and the freedom to evolve it without us. That’s how we think about every engagement.',
    ],
  },
  {
    slug: 'measuring-automation-impact',
    title: 'Measuring Automation Impact',
    excerpt:
      'Defining success metrics before you build, so you know whether automation is actually moving the needle on revenue and ops.',
    date: '2023-12-18',
    category: 'Strategy',
    body: [
      'Defining success metrics before you build is the only way to know whether automation is actually moving the needle. We start every engagement by agreeing on a small set of outcomes: time saved per week, error rate reduction, cycle time, or revenue impact. Those become the criteria for “done” and for judging the system after launch.',
      'We instrument the workflows we build so you can see real numbers—how many tasks were automated, how long steps take, where bottlenecks remain. That makes it easy to report up and to decide where to optimize next. Without metrics, automation is a leap of faith; with them, it’s a measurable investment.',
      'We also recommend a lightweight review rhythm: weekly or monthly check-ins on the same metrics so you can spot drift early and iterate. The best clients treat automation like a product—continuously improved based on data, not a one-and-done project.',
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}
