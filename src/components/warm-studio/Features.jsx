const accelerators = [
  {
    title: 'Outreach Systems',
    desc: 'Automated prospecting and qualification to fill your pipeline.',
    nodes: ['Enrichment', 'Targeting'],
    cards: [
      {
        heading: 'Data Enrichment',
        content:
          'Append verified firmographics, technographics, key contacts, and social URLs. Normalize fields and dedupe so your CRM stays clean.',
      },
      {
        heading: 'ICP Targeting',
        content:
          'Define your ICP and score accounts by industry, size, region, tech stack, and intent to surface high-fit target lists.',
      },
    ],
  },
  {
    title: 'Content Creation Engines',
    desc: 'Scale blog posts, landing pages, and SEO assets with AI.',
    nodes: ['Repurposing', 'SEO'],
    cards: [
      {
        heading: 'Content Repurposing',
        content:
          'Turn webinars, blogs, and support answers into channel-specific posts, emails, and short scripts-on-brand, with reusable CTAs.',
      },
      {
        heading: 'SEO Optimization',
        content:
          'Optimize titles, metas, schema, and internal links. Audit pages, fix issues, and surface keyword gaps to lift organic growth.',
      },
    ],
  },
  {
    title: 'Ads Systems',
    desc:
      'Launch and scale paid campaigns faster with creative generation, audience expansion, and experiment automation across Google, Meta, and LinkedIn.',
    nodes: ['Creative', 'Experiments'],
    cards: [
      {
        heading: 'Creative Variants',
        content:
          'Generate on-brand headlines, copy, and visuals from your brief. Auto-trim to channel specs and track performance by concept.',
      },
      {
        heading: 'Experiment Orchestrator',
        content:
          'Spin up A/B tests with budget guardrails, UTM hygiene, and automatic pausing on under-performance.',
      },
    ],
  },
  {
    title: 'Operations Accelerators',
    desc:
      'Automate repetitive ops tasks-routing, data hygiene, escalations, and reporting-so teams move faster with fewer errors.',
    nodes: ['Automation', 'SLAs'],
    cards: [
      {
        heading: 'Workflow Automation',
        content:
          'Trigger multi-step workflows from events in your CRM, helpdesk, or billing-no spreadsheets, full audit trail.',
      },
      {
        heading: 'Data Quality & SLAs',
        content:
          'Normalize fields, dedupe records, and enforce response SLAs with alerts and weekly rollups.',
      },
    ],
  },
];

function NodeDiagram({ nodes }) {
  return (
    <div className="relative mt-2 flex h-64 w-full items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-x-12 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-20"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-sm items-center justify-between px-4">
        {nodes.map((node, index) => (
          <div
            key={node}
            className="group relative flex flex-col items-center gap-4"
            style={{ width: `${100 / nodes.length}%` }}
          >
            {index !== nodes.length - 1 && (
              <div className="absolute top-[11px] left-[50%] -z-10 h-[1px] w-full bg-[var(--color-accent)] opacity-20 transition-opacity group-hover:opacity-60"></div>
            )}

            <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[var(--color-accent)] bg-[var(--color-base)] shadow-[0_0_10px_var(--color-accent-glow)] transition-all group-hover:shadow-[0_0_15px_var(--color-accent-glow)]">
              <div className="h-1.5 w-1.5 animate-pulse rounded-sm bg-[var(--color-accent)]"></div>
            </div>

            <span className="text-center font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/40 transition-colors group-hover:text-[var(--color-accent)]">
              {node}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="solutions"
      className="relative border-b border-[var(--color-text-primary)]/5 bg-[var(--color-base)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl px-4">
          <h2 className="mb-6 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
            The 4 Accelerators
          </h2>
          <h3 className="mb-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
            What we build for teams
          </h3>
          <p className="max-w-xl font-sans text-lg font-light leading-relaxed text-[var(--color-text-primary)]/50">
            We don&apos;t sell you another tool. We build intelligent
            infrastructure tailored to your exact workflows, transferring
            ownership directly to you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {accelerators.map((accelerator) => (
            <div
              key={accelerator.title}
              className="group flex flex-col overflow-hidden rounded-2xl luxe-glass"
            >
              <NodeDiagram nodes={accelerator.nodes} />
              <div className="flex h-full flex-col justify-end border-t border-[var(--color-text-primary)]/5 bg-[var(--color-text-primary)]/[0.01] p-8 transition-colors duration-500 group-hover:bg-[var(--color-text-primary)]/[0.03]">
                <h4 className="mb-3 font-sans text-xl font-light text-[var(--color-text-primary)]">
                  {accelerator.title}
                </h4>
                <p className="font-sans text-sm font-light leading-relaxed text-[var(--color-text-primary)]/50">
                  {accelerator.desc}
                </p>

                <div className="mt-6 grid gap-4">
                  {accelerator.cards.map((card) => (
                    <div
                      key={card.heading}
                      className="rounded-xl border border-[var(--color-text-primary)]/5 bg-[var(--color-base)]/40 p-4"
                    >
                      <h5 className="mb-2 font-sans text-sm text-[var(--color-text-primary)]">
                        {card.heading}
                      </h5>
                      <p className="font-sans text-sm font-light leading-relaxed text-[var(--color-text-primary)]/50">
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
