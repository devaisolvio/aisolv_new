import { useEffect, useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import WorkflowMermaid from './WorkflowMermaid';
import { neuroqPostPurchaseWorkflowBlocks } from './neuroqPostPurchaseWorkflow';

/**
 * @typedef {{ title: string, definition: string, layout?: 'fixed' | 'responsive' }} MermaidWorkflowBlock
 * @typedef {{ title?: string, nodes: string[] }} WorkflowNodeStack
 * @typedef {{ title: string, summary: string, description: string, workflowNodes: string[], workflowNodeStacks?: WorkflowNodeStack[], workflowImage?: string, workflowMermaid?: string, workflowMermaidBlocks?: MermaidWorkflowBlock[], workflowMermaidLayout?: 'fixed' | 'responsive' }} Automation
 * @typedef {{ title: string, summary: string, automations: Automation[] }} BusinessFunction
 */

/** @type {BusinessFunction[]} */
const businessFunctions = [
  {
    title: 'Data & intelligence',
    summary:
      'Three pillars under one roof: AI that ingests every sales call into structured CRM signal, an organizational knowledge brain that makes everything you know retrievable, and a unified data layer that lets anyone ask a question across every connected source in plain English and get a sourced answer.',
    automations: [
      {
        title: 'Sales call AI ingestion - transcription, extraction & CRM sync',
        summary: 'Recorded calls → transcript → structured fields → CRM update + coaching signal',
        description:
          'Captures every sales conversation across the dialer, Zoom, Meet, and mobile, then turns it into structured signal the rest of the org can act on:\n\n' +
          '- Recording capture across channels with consent gating and a single inbox for audio + metadata\n' +
          '- High-accuracy transcription with speaker diarization, timestamps, and PII redaction so transcripts are safe to store and search\n' +
          '- Structured field extraction from every call - pain points, BANT, competitors mentioned, objections, decision criteria, sentiment, and next steps - not just a wall of text\n' +
          '- Automatic write-back to the CRM contact and deal record, follow-up email drafted, tasks created, and manager coaching alerts triggered when calls hit defined risk patterns\n' +
          '- Every call also feeds the organizational brain so future answers reference real customer language, not internal assumptions, and rep scorecards plus win-loss libraries compound over time',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Dialer / Zoom / Meet / mobile', 'Consent gate', 'Audio + metadata', 'Single intake'],
          },
          {
            title: 'Transcribe & enrich',
            nodes: ['Speech-to-text', 'Speaker diarization', 'PII redaction', 'Timestamps'],
          },
          {
            title: 'Structured extraction',
            nodes: ['Pain points', 'BANT', 'Competitors mentioned', 'Objections', 'Decision criteria', 'Sentiment', 'Next steps'],
          },
          {
            title: 'CRM sync & action',
            nodes: ['Contact / deal write-back', 'Follow-up draft', 'Task creation', 'Manager coaching alert'],
          },
          {
            title: 'Learn',
            nodes: ['Brain ingest', 'Rep scorecard', 'Win-loss patterns', 'Objection library'],
          },
        ],
        workflowNodes: ['Audio + metadata', 'Structured extraction', 'CRM write-back', 'Brain ingest'],
      },
      {
        title: 'Organizational knowledge brain - one retrievable source of truth',
        summary: 'Every internal source → permissioned brain → sourced answers in natural language',
        description:
          'The single retrievable brain for everything your organization knows - so the answer to any question lives one query away instead of buried in a doc nobody can find:\n\n' +
          '- Connectors ingest Notion, Confluence, Drive, Slack, email, support tickets, CRM notes, call transcripts, decks, recordings, and SOPs into one indexed corpus\n' +
          '- Chunking, embedding, and source-of-truth scoring so canonical docs outrank stale duplicates and tribal versions\n' +
          '- Permissions inherited from each source system - users only see what they should see, regardless of how the brain answers\n' +
          '- Natural-language query returns a sourced answer with citations back to the original document, conversation, or call\n' +
          '- Wrong-answer capture and knowledge-gap surfacing close the loop: missing or contradictory content gets routed to the right owner, scheduled re-indexing keeps the brain fresh, and stale-doc pings push owners to update before the answer drifts',
        workflowNodeStacks: [
          {
            title: 'Source ingest',
            nodes: ['Notion / Confluence / Drive', 'Slack + email', 'Support tickets', 'CRM notes', 'Call transcripts', 'Decks + recordings', 'SOPs'],
          },
          {
            title: 'Index & permission',
            nodes: ['Chunk', 'Embed', 'Source-of-truth score', 'ACL inheritance', 'Per-user scope'],
          },
          {
            title: 'Retrieval & answer',
            nodes: ['Natural language query', 'Multi-source retrieval', 'Sourced answer', 'Inline citations'],
          },
          {
            title: 'Feedback & maintenance',
            nodes: ['Wrong-answer capture', 'Knowledge-gap surfacing', 'Scheduled re-index', 'Stale-doc owner ping'],
          },
        ],
        workflowNodes: ['Source ingest', 'Index & permission', 'Sourced answer', 'Wrong-answer capture'],
      },
      {
        title: 'Unified data layer & natural-language search',
        summary: 'Every connected system → one warehouse → ask in plain English, get a sourced answer',
        description:
          'A Perplexity-style interface for every business system you run, sitting on top of a properly modelled warehouse so the answers are not hallucinated - they are queried:\n\n' +
          '- Connectors pull from the ERP, CRM, ecom platforms (Shopify, Amazon, TikTok Shop), ad platforms (Meta, Google, TikTok), warehouse and 3PL, billing, Stripe, and analytics into one normalized data layer\n' +
          '- Schema mapping, conformed dimensions, and locked metric definitions so "revenue", "customer", and "CAC" mean the same thing across every source - lineage tracked end-to-end\n' +
          '- Natural-language query interface translates business questions into SQL, returns the answer with the source rows, the underlying query exposed for trust, and an exportable result\n' +
          '- Trust layer enforces metric definitions at query time, freshness checks flag stale connectors before someone makes a decision on yesterday\'s data, and anomaly detection surfaces unusual movements automatically\n' +
          '- Change-log captures every definition update so leadership can see why a number moved when the underlying logic changed - no more silent drift across dashboards',
        workflowNodeStacks: [
          {
            title: 'Source connectors',
            nodes: ['ERP', 'CRM', 'Shopify / Amazon / TikTok Shop', 'Meta / Google / TikTok ads', 'Warehouse + 3PL', 'Billing + Stripe', 'GA + analytics'],
          },
          {
            title: 'Normalize & model',
            nodes: ['Schema map', 'Conformed dimensions', 'Metric definitions', 'Data lineage'],
          },
          {
            title: 'Query interface',
            nodes: ['Natural language → SQL', 'Sourced answer', 'Query trace exposed', 'Exportable result'],
          },
          {
            title: 'Trust layer',
            nodes: ['Definition gating', 'Freshness checks', 'Anomaly flags', 'Change-log'],
          },
        ],
        workflowNodes: ['Source connectors', 'Conformed dimensions', 'Natural language → SQL', 'Definition gating'],
      },
    ],
  },
  {
    title: 'Ad production & performance',
    summary:
      'One pipeline for the whole paid stack - SKU-accurate listing imagery, on-model PDP shots, hooks, headlines, scripts, static and video creative, bid hygiene, attribution, and creator-level hit rate scoring. So you stop paying $20K per shoot and $200-400 per UGC creator, and your media buyers stop guessing which creative actually worked.',
    automations: [
      {
        title: 'From Photoshoot Folder to Live PDP: SKU-Accurate Image Pairing',
        summary: 'Shoot assets → verified listing imagery',
        description:
          'Creative drops hundreds of frames from set; merchandising used to eyeball each file against the PDP and inventory master so the right variant went live. We ingest the shoot, join to SKU and variant truth from PIM or ERP, and score every candidate image against the real product record with vision similarity - not filename guesses. High-confidence pairs publish automatically; the rest land in a tight review queue so nothing ships to the site until the image matches the SKU customers actually add to cart.',
        workflowNodeStacks: [
          {
            title: 'Source & prep',
            nodes: ['Shoot ingest', 'Catalog join', 'Variant keys', 'Dedupe', 'Match queue'],
          },
          {
            title: 'Vision pairing',
            nodes: ['Embed frames', 'Rank vs PDP', 'Best pick', 'Confidence', 'Fallback flag', 'Manual triage'],
          },
          {
            title: 'Go-live',
            nodes: ['QA review', 'Publish PDP', 'Audit log'],
          },
        ],
        workflowNodes: ['Shoot ingest', 'Catalog join', 'Variant keys', 'Match queue'],
      },
      {
        title: 'Static Ad Creative Generation - Brief to Channel-Ready Assets',
        summary: 'Brief → variants → approved creatives',
        description:
          'Every ad starts with a brief - audience, offer, placement specs. We generate variants per channel (Meta, Google, email, display), enforce brand guardrails (fonts, colors, safe zones, legal copy), run automated QA for specs and compliance, then route through a human approval gate before anything goes live. Rejected variants loop back with feedback for regeneration.',
        workflowNodeStacks: [
          {
            title: 'Brief & strategy',
            nodes: ['Campaign brief', 'Audience segment', 'Channel specs', 'Brand rules', 'Copy inputs', 'CTA variants'],
          },
          {
            title: 'Generation',
            nodes: ['Prompt build', 'Batch generate', 'Format resize'],
          },
          {
            title: 'Review & compliance',
            nodes: ['Brand QA', 'Legal check', 'Human approval', 'Feedback loop', 'Regenerate'],
          },
          {
            title: 'Delivery',
            nodes: ['Asset export', 'Channel upload', 'Version archive', 'Performance tag'],
          },
        ],
        workflowNodes: ['Campaign brief', 'Batch generate', 'Brand QA', 'Channel upload'],
      },
      {
        title: 'PDP Product Image Generation - On-Model Imagery at Scale',
        summary: 'Product shots → on-model PDP imagery',
        description:
          'Instead of booking shoots for every SKU and variant, we generate on-model product imagery from flat lays or packshots. The pipeline pulls the product from the catalog, composites onto model templates matched to the brand demographic and styling guidelines, runs visual QA for realism and consistency, and pushes approved assets directly to the PDP. Failed generations get flagged for manual retouching or reshoot.',
        workflowNodeStacks: [
          {
            title: 'Product source',
            nodes: ['Catalog pull', 'Packshot prep', 'SKU metadata', 'Style guide', 'Background ref'],
          },
          {
            title: 'On-model compositing',
            nodes: ['Model select', 'Pose match', 'Scene render'],
          },
          {
            title: 'Quality & realism',
            nodes: ['Visual QA', 'Consistency check', 'Brand match', 'Retouch flag', 'Reject loop', 'Re-render'],
          },
          {
            title: 'PDP publish',
            nodes: ['Asset approval', 'PDP upload', 'A/B flag', 'Audit log'],
          },
        ],
        workflowNodes: ['Catalog pull', 'Scene render', 'Visual QA', 'PDP upload'],
      },
      {
        title: 'AI-Powered Creative Production - Hooks, Headlines, Scripts, and Variations at Scale',
        summary: 'Brief → hooks + headlines + scripts → channel-ready variations',
        description:
          'Systems that generate creative assets at scale and integrate directly into internal production workflows:\n\n' +
          '- Generates static ad concepts, hooks, headlines, and full scripts from structured briefs\n' +
          '- Produces creative variations at volume - different angles, CTAs, and formats per audience segment\n' +
          '- Enforces brand voice, compliance rules, and channel specs automatically so nothing ships off-brand\n' +
          '- Integrates into the creative team workflow: copywriters get drafts to refine, media buyers get launch-ready assets\n' +
          '- Feedback from live performance feeds back into the generation engine so output quality improves over time',
        workflowNodeStacks: [
          {
            title: 'Brief intake',
            nodes: ['Campaign brief', 'Audience + avatar', 'Channel specs', 'Brand rules', 'Past winners ref'],
          },
          {
            title: 'Generation engine',
            nodes: ['Hook variants', 'Headline batch', 'Script drafts', 'CTA alternatives', 'Format resize'],
          },
          {
            title: 'Brand + compliance',
            nodes: ['Voice check', 'Legal scan', 'Spec validation'],
          },
          {
            title: 'Team handoff',
            nodes: ['Copywriter queue', 'Media buyer package', 'Asset export', 'Version control'],
          },
          {
            title: 'Performance feedback',
            nodes: ['Live metrics ingest', 'Winner tagging', 'Model retrain', 'Quality loop'],
          },
        ],
        workflowNodes: ['Campaign brief', 'Hook variants', 'Voice check', 'Media buyer package'],
      },
      {
        title: 'AI Ad Creation System - Research, Breakdown, and Script Generation',
        summary: 'Raw research → winning frameworks → new ad scripts',
        description:
          'Full-stack AI ad creation pipeline built in stages. It starts with a knowledge foundation - internal best practices, proven frameworks, and advertising principles ingested via RAG so the system understands why ads work before it tries to make them. Next, deep research runs across Google, Amazon, Reddit, YouTube, TikTok, Facebook, competitors, and spy tools like Atria, storing raw data that can be sliced by any angle or avatar. A Gemini-powered video breakdown layer analyzes winning creatives scene by scene - timestamps, audio, on-screen text, visual descriptions - and tags each by avatar, angle, and hook. Learnings from your own ad performance (watch time, drop-off points, iteration notes) feed back in. When it is time to create, you query the full brain: pick avatars, reference analyzed frameworks, and the agent generates new ad scripts grounded in real research and proven structures - not assumptions.',
        workflowNodeStacks: [
          {
            title: 'Knowledge foundation',
            nodes: ['Internal best practices', 'Knowledge base docs', 'Why ads work', 'Stages of awareness', 'RAG ingest'],
          },
          {
            title: 'Deep research',
            nodes: ['Product research', 'Google + Amazon', 'Reddit + YouTube', 'Competitor spy', 'TikTok + Facebook', 'Atria'],
          },
          {
            title: 'Angle + avatar extraction',
            nodes: ['Raw data store', 'Pain point parsing', 'Avatar tagging', 'Angle ranking'],
          },
          {
            title: 'Gemini video breakdown',
            nodes: ['Scene-by-scene analysis', 'Timestamp + audio', 'Visual descriptions', 'Framework extraction', 'Hook identification', 'Winner tagging'],
          },
          {
            title: 'Performance + learnings',
            nodes: ['Facebook metrics', 'Drop-off analysis', 'Manual learnings', 'Iteration notes'],
          },
          {
            title: 'Script generation',
            nodes: ['Avatar select', 'Angle + research in', 'Framework match', 'Script draft', 'Feedback loop', 'Regenerate'],
          },
        ],
        workflowNodes: ['Internal best practices', 'Deep research', 'Gemini breakdown', 'Script draft'],
      },
      {
        title: 'Google Ads Keyword Hygiene - Auto-Kill Wasteful Spend',
        summary: 'Flag → pause → reclaim budget',
        description:
          'Low-intent and off-topic search terms burn budget silently. This pipeline continuously scores active keywords and search-term reports against your real service offerings and ICP signals. Terms that drive irrelevant clicks, zero conversions, or traffic that never engages get flagged, paused, and negative-listed automatically. A lightweight review queue catches edge cases before budget shifts, and a weekly digest shows exactly how much spend was reclaimed.',
        workflowNodeStacks: [
          {
            title: 'Signal collection',
            nodes: ['Search term pull', 'Click + conversion data', 'Landing page engagement', 'ICP match score'],
          },
          {
            title: 'Scoring & triage',
            nodes: ['Relevance model', 'Waste threshold', 'Flag queue'],
          },
          {
            title: 'Action',
            nodes: ['Auto-pause keyword', 'Add negative', 'Budget realloc', 'Ops review', 'Weekly digest'],
          },
        ],
        workflowNodes: ['Search term pull', 'Relevance model', 'Auto-pause keyword', 'Weekly digest'],
      },
      {
        title: 'Meta Ad Creative Hit Rate Tracking - Creator Attribution and Performance Scoring',
        summary: '50 creatives launched → which ones actually hit?',
        description:
          'Meta does not hand you hit rate on a plate - it requires pulling raw ad-level data, normalizing for delayed attribution windows (a creative can break out in week four, not week one), and scoring each asset against your custom definition of a hit: ROAS threshold, conversion volume, engagement benchmarks, or a weighted composite. This pipeline ingests the full Meta Ads reporting feed on a schedule, tracks every creative across its lifetime (not just the first 72 hours), scores it against your hit criteria, and attributes performance back to the specific creator, copywriter, or team that produced it. The output is a leaderboard and trend view so you know who is producing winners and where to double down.',
        workflowNodeStacks: [
          {
            title: 'Data ingestion',
            nodes: ['Meta API pull', 'Ad-level metrics', 'Spend + ROAS', 'Conversion events'],
          },
          {
            title: 'Attribution window',
            nodes: ['Delayed scoring', 'Week-over-week tracking', 'Maturity flag'],
          },
          {
            title: 'Hit rate scoring',
            nodes: ['Custom hit definition', 'Threshold check', 'Score per creative', 'Composite rank', 'Outlier detection'],
          },
          {
            title: 'Creator attribution',
            nodes: ['Map to creator', 'Map to copywriter', 'Team rollup', 'Historical trend'],
          },
          {
            title: 'Reporting',
            nodes: ['Hit rate dashboard', 'Creator leaderboard', 'Weekly digest'],
          },
        ],
        workflowNodes: ['Meta API pull', 'Score per creative', 'Map to creator', 'Hit rate dashboard'],
      },
      {
        title: 'Creative Analysis and Feedback Systems - Performance Frameworks for Ad Evaluation',
        summary: 'Live creatives → framework scoring → actionable iteration suggestions',
        description:
          'Tools that evaluate ad creatives against defined performance frameworks and provide actionable feedback:\n\n' +
          '- Scores every live creative against your internal performance framework - not just ROAS but hook strength, message clarity, audience fit, and visual engagement\n' +
          '- Provides specific iteration suggestions: what to keep, what to change, and why, grounded in the data\n' +
          '- Identifies underperforming elements (weak hook, unclear CTA, wrong format for the audience) so the creative team fixes the right thing\n' +
          '- Tracks improvement over iteration cycles to prove that feedback is actually moving the needle\n' +
          '- Framework itself evolves as more performance data flows in',
        workflowNodeStacks: [
          {
            title: 'Creative ingest',
            nodes: ['Active ad pull', 'Asset metadata', 'Performance data join', 'Framework load'],
          },
          {
            title: 'Framework scoring',
            nodes: ['Hook strength', 'Message clarity', 'Audience fit', 'Visual engagement', 'CTA effectiveness'],
          },
          {
            title: 'Feedback generation',
            nodes: ['Element diagnosis', 'Iteration suggestions', 'Priority ranking'],
          },
          {
            title: 'Tracking & learning',
            nodes: ['Iteration cycle tracking', 'Before/after comparison', 'Framework evolution', 'Team digest'],
          },
        ],
        workflowNodes: ['Active ad pull', 'Hook strength', 'Iteration suggestions', 'Framework evolution'],
      },
      {
        title: 'Internal Marketing AI Infrastructure - Manual Workflows to Scalable Systems',
        summary: 'Manual processes → AI-driven systems used by creative, copy, and media buying teams',
        description:
          'Turning manual marketing workflows into scalable AI-driven systems that the entire team uses daily:\n\n' +
          '- Audits existing manual workflows across creative, copywriting, and media buying to identify automation candidates\n' +
          '- Builds dedicated AI tools for each function: creative team gets concept generation, copywriters get draft assistance, media buyers get optimization signals\n' +
          '- Centralizes tribal knowledge into retrievable systems so insights are not locked in individual heads\n' +
          '- Continuous improvement loop: usage data and team feedback drive tool refinement so the systems get better with every campaign cycle\n' +
          '- Reduces time-to-launch for new campaigns from days to hours by removing manual bottlenecks',
        workflowNodeStacks: [
          {
            title: 'Workflow audit',
            nodes: ['Process mapping', 'Bottleneck identification', 'Automation scoring', 'Priority ranking'],
          },
          {
            title: 'Tool build-out',
            nodes: ['Creative tools', 'Copy tools', 'Media buyer tools', 'Knowledge capture', 'RAG setup'],
          },
          {
            title: 'Team integration',
            nodes: ['Role-based access', 'Onboarding flows', 'Usage tracking'],
          },
          {
            title: 'Continuous improvement',
            nodes: ['Feedback collection', 'Usage analytics', 'Tool iteration', 'Campaign cycle review', 'System expansion'],
          },
        ],
        workflowNodes: ['Process mapping', 'Creative tools', 'Role-based access', 'Tool iteration'],
      },
      {
        title: 'Post-Purchase Call Personalization - Handwritten Letter Pipeline',
        summary: 'Calls → letter in mailbox',
        description:
          'This pipeline targets purchasers only. Sold-call dispositions are joined to the customer record and validated for a mailable address. After a short cooling window - so the product can land first - the recording is transcribed and structured fields are extracted from the transcript: agent name, pain points, progression concerns, and whether the story centers on the buyer or a loved one. A testimonial is matched to the pain category, the letter is drafted in your brand voice, and automated QA reruns generation when any gate fails. The approved pack is submitted to the handwriting vendor API; sends, costs, and an append-only audit trail roll up in a single operations dashboard.',
        workflowNodes: ['Ingest', 'Extract', 'Letter', 'Mail'],
        workflowMermaidBlocks: neuroqPostPurchaseWorkflowBlocks,
        workflowMermaidLayout: 'responsive',
      },
    ],
  },
  {
    title: 'SEO',
    summary:
      'Always-on SEO engine - keyword gap mining, RAG-grounded long-form drafting, on-page QA, CMS publishing, and post-launch rank tracking - so organic compounds without an in-house content team.',
    automations: [
      {
        title: 'SEO Automation Suite - Research, Content, and Publishing Pipeline',
        summary: 'Keyword gaps → optimized blogs → live on site',
        description:
          'End-to-end SEO engine. It starts by pulling keyword and ranking data from SEMrush, mapping your current portfolio - what you rank for, where you sit second or third, and where you have no presence at all. The system identifies the highest-leverage gaps relative to your services and ICP, then clusters them into topic briefs. From there it drafts fully SEO-optimized long-form articles grounded in your company knowledge base (RAG), supplemented by live research from Perplexity, YouTube transcripts, and competitor analysis. Every piece is reviewed against on-page best practices - headings, internal links, schema, meta. The pipeline is agentic: editorial feedback is captured and applied to future turns so quality compounds over time. Approved articles publish directly to your CMS with proper metadata, and post-publish monitoring tracks ranking movement and flags pieces that need a refresh.',
        workflowNodeStacks: [
          {
            title: 'Keyword intelligence',
            nodes: ['SEMrush pull', 'Current rankings', 'Gap analysis', 'Competitor map', 'Opportunity score'],
          },
          {
            title: 'Topic strategy',
            nodes: ['Cluster briefs', 'ICP alignment', 'Priority queue'],
          },
          {
            title: 'Research & RAG',
            nodes: ['Company knowledge base', 'Perplexity deep search', 'YouTube transcripts', 'Competitor content', 'Source synthesis', 'Fact grounding'],
          },
          {
            title: 'Content generation',
            nodes: ['Draft article', 'SEO structure', 'Internal links', 'Schema + meta'],
          },
          {
            title: 'Agentic review loop',
            nodes: ['Editorial QA', 'Feedback capture', 'Model retrain', 'Regenerate', 'Approval gate'],
          },
          {
            title: 'Publish & monitor',
            nodes: ['CMS push', 'Live verification', 'Rank tracking', 'Refresh flag'],
          },
        ],
        workflowNodes: ['SEMrush pull', 'Gap analysis', 'Draft article', 'CMS push'],
      },
    ],
  },
  {
    title: 'Competitor intelligence',
    summary:
      'Always-on monitoring of competitor ads, hooks, offers, and creative rotations - turned into structured reports your strategy and creative teams can act on every week.',
    automations: [
      {
        title: 'Creative Strategy Intelligence - AI Agents for Ad Pattern Discovery',
        summary: 'Public marketing data → trend patterns → new creative directions',
        description:
          'AI agents that continuously analyze publicly available marketing data and ad trends to find what is actually working:\n\n' +
          '- Scans high-performing ad creatives across channels to identify repeating patterns in hooks, angles, offers, and formats\n' +
          '- Tags each pattern by audience segment, funnel stage, and creative type (UGC, static, VSL, carousel)\n' +
          '- Generates new ad concepts and creative directions grounded in real data rather than gut feel\n' +
          '- Trend detection surfaces emerging creative shifts before competitors catch on\n' +
          '- Output feeds directly into the creative team as structured briefs they can act on immediately',
        workflowNodeStacks: [
          {
            title: 'Data collection',
            nodes: ['Public ad scrape', 'Channel feeds', 'Trend APIs', 'Spy tool ingest'],
          },
          {
            title: 'Pattern extraction',
            nodes: ['Hook classification', 'Angle tagging', 'Offer parsing', 'Format detection', 'Audience signal'],
          },
          {
            title: 'Insight generation',
            nodes: ['Winning pattern clusters', 'Emerging trend flags', 'Fatigue detection'],
          },
          {
            title: 'Creative direction output',
            nodes: ['Concept generation', 'Brief formatting', 'Team delivery', 'Feedback loop'],
          },
        ],
        workflowNodes: ['Public ad scrape', 'Hook classification', 'Winning pattern clusters', 'Concept generation'],
      },
      {
        title: 'Market and Competitor Intelligence - Automated Monitoring and Reporting',
        summary: 'Competitor activity → categorized creatives → structured reports',
        description:
          'Agents that monitor and organize publicly available competitor marketing activity on an ongoing basis:\n\n' +
          '- Continuously tracks competitor ad launches, landing pages, and creative rotations across Meta, Google, TikTok, and display\n' +
          '- Categorizes every creative by type (UGC, static, VSL), messaging angle, positioning, and offer structure\n' +
          '- Extracts key insights on what competitors are testing, doubling down on, or pulling back from\n' +
          '- Delivers structured weekly reports for media buyers, creative leads, and strategy team\n' +
          '- Historical archive allows trend comparison - what a competitor was running 6 months ago vs today',
        workflowNodeStacks: [
          {
            title: 'Competitor tracking',
            nodes: ['Ad library scrape', 'Landing page monitor', 'Social feed watch', 'New launch alerts'],
          },
          {
            title: 'Creative categorization',
            nodes: ['Type tagging (UGC / static / VSL)', 'Messaging extraction', 'Offer parsing', 'Positioning map'],
          },
          {
            title: 'Insight extraction',
            nodes: ['Test detection', 'Scale signals', 'Pull-back flags', 'Trend delta'],
          },
          {
            title: 'Reporting',
            nodes: ['Weekly digest', 'Team-specific views', 'Historical archive', 'Strategy recs'],
          },
        ],
        workflowNodes: ['Ad library scrape', 'Type tagging', 'Scale signals', 'Weekly digest'],
      },
    ],
  },
  {
    title: 'Sales & GTM',
    summary:
      'B2B outbound and pipeline mechanics across email, LinkedIn, calling, lead sourcing, and enrichment - all tied back to a clean CRM so reps work qualified pipeline instead of stitching tools together.',
    automations: [
      {
        title: 'Lead sourcing & list building',
        summary: 'ICP definition → multi-source pull → ranked list',
        description:
          'Build prospect lists on demand from your ICP definition - firmographic, technographic, and intent signals pulled from Apollo, ZoomInfo, LinkedIn Sales Nav, Clay, and public sources, then deduped against the CRM and ranked by fit. Hand-off to enrichment is automatic so lists never sit stale in a spreadsheet.',
        workflowNodes: ['ICP brief', 'Multi-source pull', 'Dedupe vs CRM', 'Rank + handoff'],
      },
      {
        title: 'Enrichment & ICP fit scoring',
        summary: 'Raw list → enriched + scored → CRM write',
        description:
          'Batch enrichment for contact, company, and intent data with dedupe gates and ICP fit scoring before anything hits the CRM. Bad records, personal emails, out-of-ICP accounts, and duplicates get blocked at the door so outbound volume does not trash your system of record.',
        workflowNodes: ['List in', 'Enrich', 'ICP score', 'CRM write'],
      },
      {
        title: 'Cold email outbound & deliverability',
        summary: 'Sequences → inbox → reply triage',
        description:
          'Multi-mailbox sending infrastructure with warm-up, domain rotation, and bounce / spam monitoring so volume actually lands in the inbox. Sequences personalize off the enriched record (industry, role, recent trigger), reply classification routes hot replies to a rep and OOO / not-interested replies into the right CRM state automatically.',
        workflowNodes: ['Sequence build', 'Mailbox rotation', 'Send + warm-up', 'Reply triage'],
      },
      {
        title: 'LinkedIn outbound & social selling',
        summary: 'Connect → nurture → meeting',
        description:
          'Coordinated LinkedIn motion across SDR and exec profiles - connection requests, follow-up DMs, post engagement, and InMail - synced to the same prospect record as email and calling so prospects see one consistent narrative, not three teams pinging them blind.',
        workflowNodes: ['Connect', 'Nurture DMs', 'Engagement', 'Meeting handoff'],
      },
      {
        title: 'Outbound calling & dialer ops',
        summary: 'Call list → dial → disposition → next step',
        description:
          'Daily call lists generated from sequence triggers, intent signals, and stalled-deal criteria. Power dialer pulls the right contact, surfaces the account context, and auto-logs the call with disposition, transcript, and next step back to the CRM so nothing slips between the dial and the deal.',
        workflowNodes: ['Call list', 'Dial + script', 'Disposition + transcript', 'CRM log'],
      },
      {
        title: 'CRM automation & pipeline hygiene',
        summary: 'Routing → stages → tasks → forecast accuracy',
        description:
          'The connective tissue under everything else. Lead routing by territory and ICP fit, stage progression rules with required-field gates, automatic task creation per stage, follow-up SLAs with breach alerts, stale-deal cleanup on a schedule, duplicate merging, deal-room and quote generation, and forecast hygiene reports so leadership trusts the pipeline number. Reps sell instead of babysitting fields.',
        workflowNodes: ['Lead in', 'Route + assign', 'Stage rules + tasks', 'SLA + hygiene', 'Forecast roll-up'],
      },
      {
        title: 'Paid experiment guardrails',
        summary: 'Budget + UTM + auto-pause',
        description:
          'Spin tests with budget caps, UTM hygiene, and auto-pause on bad efficiency - same playbook across Google, Meta, and LinkedIn so paid never silently bleeds while attention is on outbound.',
        workflowNodes: ['Budget', 'UTM', 'Launch', 'Guardrail'],
      },
    ],
  },
  {
    title: 'Customer experience & service',
    summary:
      'Pre-purchase shopping assistance, order and shipping support, returns and refunds, subscription and billing self-service, and B2B account health - so customers get consistent answers and your team handles only the cases that actually need a human.',
    automations: [
      {
        title: 'Pre-purchase shopping assistance',
        summary: 'Sizing, fit, product Q&A, cart recovery',
        description:
          'On-site and in-channel assistant that answers product, sizing, fit, ingredient, and compatibility questions before checkout - grounded in the catalog and PDP content, not hallucinated. Hands off to a human for high-AOV or complex configurations, and triggers cart-recovery flows when the conversation stalls without a purchase.',
        workflowNodes: ['Visitor question', 'Catalog grounded answer', 'Recommendation', 'Cart recovery'],
      },
      {
        title: 'Order status & WISMO deflection',
        summary: 'Where is my order? → tracked + answered',
        description:
          'The single highest-volume support ticket in ecommerce. Pulls live order, shipment, and carrier exception data on demand, answers WISMO ("where is my order") tickets across email, chat, SMS, and DM in seconds, and proactively notifies customers on delays before they escalate to support.',
        workflowNodes: ['Inbound query', 'Order + carrier lookup', 'Auto-reply', 'Proactive delay alert'],
      },
      {
        title: 'Returns, refunds & exchanges automation',
        summary: 'Self-serve RMA → restock → refund / exchange',
        description:
          'Self-serve return portal that validates eligibility against your policy, generates the RMA and prepaid label, drafts the inbound shipment in the WMS, and triggers refund or exchange processing on receipt. Edge cases (damaged in transit, partial returns, store credit, fraud signals) route to a human with full context attached.',
        workflowNodes: ['Return request', 'Eligibility + label', 'Inbound + restock', 'Refund / exchange'],
      },
      {
        title: 'Subscriptions, billing & payment self-service',
        summary: 'Skip, swap, cancel, retry → without a ticket',
        description:
          'Handles the lifecycle around money: skip-a-shipment, swap SKUs, change cadence, update payment method, dunning on failed cards, refund and proration logic, and self-serve cancellation with save-offer flows. Cuts the billing ticket queue and the involuntary churn from declined cards in one motion.',
        workflowNodes: ['Subscribe / modify', 'Bill + retry', 'Save offer', 'Cancel / refund'],
      },
      {
        title: 'Troubleshooting, escalation & guided agent playbooks',
        summary: 'Same playbook for human and AI agents',
        description:
          'Decision-tree playbooks so every agent - human or AI - follows the same troubleshooting path, escalation criteria, and resolution scripts for setup, defects, replacements, consumables, and complex multi-product issues. Cuts variance in resolution quality and shortens AHT (average handle time) without sacrificing the hard cases.',
        workflowNodes: ['Issue intake', 'Guided diagnosis', 'Escalate or resolve', 'Disposition log'],
      },
      {
        title: 'FAQs, knowledge base & agent feedback loops',
        summary: 'Knowledge that compounds with every ticket',
        description:
          'Treats published FAQs, help docs, and PDPs as live retrievable sources for the support agent - not static pages. Captures every wrong answer or escalation as a structured signal so the next run behaves correctly, the knowledge base gets a draft update, and the deflection rate climbs week over week.',
        workflowNodes: ['Source ingest', 'Retrieval answer', 'Wrong-answer capture', 'KB update + retrain'],
      },
      {
        title: 'Post-purchase onboarding & activation',
        summary: 'Checkout complete → first value',
        description:
          'From checkout or contract signed through first success: welcome and task sequences, setup and how-to-use education, training scheduling for higher-touch SKUs, milestone checklists, replenishment reminders for consumables, and early health pings so stuck customers surface before churn or refund.',
        workflowNodes: ['Trigger', 'Educate', 'Milestone check', 'Health ping'],
      },
      {
        title: 'B2B account health & renewal signals',
        summary: 'Usage + sentiment + ticket trend → renewal action',
        description:
          'For wholesale, B2B, and account-managed customers: rolls up product usage or order frequency, support ticket volume and sentiment, NPS, and contract milestones into a single health score per account. Surfaces at-risk accounts to CSMs with the specific signal driving the risk and a suggested next action - QBR, exec touch, training, or save offer.',
        workflowNodes: ['Usage + tickets in', 'Health score', 'Risk surface', 'CSM next step'],
      },
    ],
  },
];

/**
 * DTC ERP modules used by the first (Custom ERP) accordion section when the
 * B2B/DTC toggle is set to DTC. Sourced from the D2C ERP architecture
 * reference + the "By Module" taxonomy (Inventory, Procurement, Order
 * Management, Warehouse, Freight & Fulfillment, Finance & Accounting,
 * Demand Planning).
 *
 * @type {BusinessFunction[]}
 */
const erpModulesDTC = [
  {
    title: 'Inventory Management',
    summary:
      'Real-time, multi-location inventory ledger with available-to-sell logic, batch/lot tracking, and valuation feeding finance.',
    automations: [
      {
        title: 'Real-time multi-location inventory ledger',
        summary:
          'On-hand, reserved, damaged, in-transit → unified ledger → channel sync → safety stock per channel',
        description:
          'A single source of truth for stock across every warehouse, 3PL, and retail location:\n\n' +
          '- Tracks on-hand, reserved, damaged, and in-transit quantities at the SKU and bin level across every location\n' +
          '- Pushes channel-aware availability to Shopify, Amazon, Walmart, TikTok Shop, and POS so the same unit is never oversold\n' +
          '- Applies safety stock rules per channel (e.g., reserve 10% for DTC, throttle marketplace listings during launches)\n' +
          '- Reconciles cycle counts and adjustments with full audit trails and reason codes\n' +
          '- Feeds inventory valuation (FIFO or weighted average) directly into the finance module for accurate COGS',
        workflowNodeStacks: [
          {
            title: 'Ledger ingest',
            nodes: ['Warehouse events', '3PL feeds', 'Retail POS', 'In-transit ASN', 'Returns receipts'],
          },
          {
            title: 'State buckets',
            nodes: ['On-hand', 'Reserved', 'Damaged', 'In-transit', 'Quarantine'],
          },
          {
            title: 'Channel sync',
            nodes: ['Shopify push', 'Amazon push', 'Walmart push', 'TikTok Shop', 'POS sync'],
          },
          {
            title: 'Safety stock rules',
            nodes: ['Per-channel reserve', 'Launch throttle', 'VIP allocation', 'Stockout guard'],
          },
          {
            title: 'Valuation feed',
            nodes: ['Method (FIFO / WA)', 'Cost layers', 'GL journal', 'COGS to finance'],
          },
        ],
        workflowNodes: ['Warehouse events', 'On-hand', 'Shopify push', 'GL journal'],
      },
      {
        title: 'Available-to-sell engine',
        summary:
          'Reservations + inbound supply + safety stock → ATS calculation → channel-specific exposure → backorder rules',
        description:
          'Calculates true available-to-sell so the storefront and marketplaces never promise stock you cannot ship:\n\n' +
          '- Subtracts active cart reservations, allocated orders, and damaged/quarantined units from on-hand\n' +
          '- Adds inbound supply (open POs, transfers, in-process production) within a configurable confidence window\n' +
          '- Applies channel-specific safety stock and pre-sale rules (preorder, backorder, allow oversell with cap)\n' +
          '- Recomputes on every stock event and pushes diffs only - no full catalog re-sync hammering the platform APIs',
        workflowNodeStacks: [
          {
            title: 'Demand-side subtractions',
            nodes: ['Cart reservations', 'Open orders', 'Allocated picks', 'Damaged / quarantine'],
          },
          {
            title: 'Supply-side additions',
            nodes: ['Open POs', 'Inbound ASN', 'Transfer orders', 'Production WIP'],
          },
          {
            title: 'Rule layer',
            nodes: ['Per-channel safety', 'Preorder / backorder', 'Oversell cap', 'VIP carve-out'],
          },
          {
            title: 'Push & monitor',
            nodes: ['Diff calc', 'Channel API push', 'Latency check', 'Drift alert'],
          },
        ],
        workflowNodes: ['Cart reservations', 'Open POs', 'Per-channel safety', 'Channel API push'],
      },
      {
        title: 'Cycle counting & adjustment workflow',
        summary:
          'Schedule → mobile count → variance flag → root-cause review → GL adjustment',
        description:
          'Replaces wall-to-wall annual counts with rolling, audit-ready cycle counts:\n\n' +
          '- Auto-schedules counts by ABC class, velocity, and last-counted date so high-movers are checked monthly\n' +
          '- Mobile pickers scan barcodes; variances above a configurable threshold escalate to a supervisor before posting\n' +
          '- Root-cause codes (mis-pick, theft, damage, mis-receipt) feed analytics to fix the upstream process\n' +
          '- Approved adjustments post journal entries automatically with full audit trail',
        workflowNodeStacks: [
          {
            title: 'Schedule',
            nodes: ['ABC classify', 'Velocity score', 'Last-counted lookup', 'Daily count list'],
          },
          {
            title: 'Execute',
            nodes: ['Mobile scan', 'Bin verify', 'Quantity capture', 'Variance calc'],
          },
          {
            title: 'Review',
            nodes: ['Threshold check', 'Supervisor escalation', 'Root-cause code', 'Approval'],
          },
          {
            title: 'Post',
            nodes: ['Inventory adjust', 'GL journal', 'Audit log', 'Trend dashboard'],
          },
        ],
        workflowNodes: ['ABC classify', 'Mobile scan', 'Threshold check', 'GL journal'],
      },
      {
        title: 'Batch / lot / expiry tracking',
        summary: 'Receipt → batch / lot capture → expiry date → FEFO pick logic → recall readiness',
        description:
          'Tracks units at the batch and lot level for food, beverage, supplements, cosmetics, and any SKU with an expiration date:\n\n' +
          '- Captures batch / lot numbers and manufacture / expiry dates at receipt with optional COA (certificate of analysis) attachment\n' +
          '- Routes picking by FEFO (first-expired-first-out) instead of FIFO so the freshest stock stays in inventory and aged stock ships first\n' +
          '- Quarantine workflow blocks expired or near-expiry stock from being allocated to outbound\n' +
          '- Lot genealogy traces forward from supplier batch through to the customer order - critical for recall response\n' +
          '- Recall workflow generates the impacted shipment list, freezes affected stock, and drafts customer notifications in minutes',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Batch / lot ID', 'Mfg / expiry date', 'COA attach', 'Per-SKU lot rule'],
          },
          {
            title: 'Allocate',
            nodes: ['FEFO pick logic', 'Near-expiry block', 'Quarantine flag', 'Substitution rule'],
          },
          {
            title: 'Trace',
            nodes: ['Lot genealogy', 'Supplier → SKU → order', 'Forward / backward trace'],
          },
          {
            title: 'Recall',
            nodes: ['Impacted shipment list', 'Stock freeze', 'Customer notify draft', 'Regulatory report'],
          },
        ],
        workflowNodes: ['Mfg / expiry date', 'FEFO pick logic', 'Lot genealogy', 'Stock freeze'],
      },
      {
        title: 'Inter-location stock transfers',
        summary: 'Imbalance detection → transfer order → pack & ship → in-transit visibility → receive & rebalance',
        description:
          'Rebalances stock across warehouses, 3PLs, and retail backrooms before it becomes a stockout or overstock problem:\n\n' +
          '- Detects imbalances by comparing days-of-stock at each location against safety stock and forward demand\n' +
          '- Drafts transfer orders automatically with source, destination, SKU, qty, and target receive date\n' +
          '- Generates pick / pack / ship docs at the source; tracks the transfer in-transit as a virtual inventory bucket\n' +
          '- Receives at destination, posts inventory, and triggers the cost-layer move so finance reflects the new location\n' +
          '- Reports recurring imbalances so safety stock or replenishment routing can be tuned',
        workflowNodeStacks: [
          {
            title: 'Detect',
            nodes: ['Days-of-stock by location', 'Safety stock check', 'Demand forecast pull', 'Imbalance score'],
          },
          {
            title: 'Plan',
            nodes: ['Source / destination', 'SKU / qty', 'Target receive date', 'Approval gate'],
          },
          {
            title: 'Execute',
            nodes: ['Source pick + pack', 'In-transit bucket', 'Carrier handoff', 'ETA tracking'],
          },
          {
            title: 'Receive & settle',
            nodes: ['Destination receipt', 'Inventory post', 'Cost layer move', 'Variance flag'],
          },
        ],
        workflowNodes: ['Days-of-stock by location', 'SKU / qty', 'In-transit bucket', 'Cost layer move'],
      },
    ],
  },
  {
    title: 'Procurement',
    summary:
      'Vendor master, replenishment rules, auto-PO generation, three-way match - the buying side of the supply chain on autopilot.',
    automations: [
      {
        title: 'Auto-PO generation from reorder triggers',
        summary:
          'Reorder point hit → vendor selected → PO drafted → approval gate → sent to vendor → tracked to receipt',
        description:
          'Eliminates the spreadsheet-driven PO process and stockouts that come from missed reorders:\n\n' +
          '- Monitors reorder points, min/max levels, and days-of-stock targets across every SKU and location\n' +
          '- Picks the preferred vendor based on lead time, MOQ, price tier, and historical fill rate\n' +
          '- Drafts the PO with line-level pricing, expected receipt date, and freight terms - routes to a buyer for approval over a configurable threshold\n' +
          '- Sends to the vendor via email or EDI and creates an open-PO record visible to the inventory and finance modules\n' +
          '- Reconciles against ASN and goods receipt; flags short-ships, late deliveries, and price variances',
        workflowNodeStacks: [
          {
            title: 'Trigger detection',
            nodes: ['Reorder point', 'Days-of-stock', 'Forecast pull', 'Promo plan check'],
          },
          {
            title: 'Vendor selection',
            nodes: ['Lead time', 'MOQ', 'Price tier', 'Fill rate history', 'Composite score'],
          },
          {
            title: 'PO draft',
            nodes: ['Line pricing', 'ETA calc', 'Freight terms', 'Approval gate (>$X)'],
          },
          {
            title: 'Send & track',
            nodes: ['Email / EDI', 'Open PO record', 'ASN watch', 'Goods receipt match'],
          },
          {
            title: 'Variance handling',
            nodes: ['Short-ship flag', 'Late delivery flag', 'Price variance', 'Vendor scorecard update'],
          },
        ],
        workflowNodes: ['Reorder point', 'Composite score', 'Approval gate (>$X)', 'Goods receipt match'],
      },
      {
        title: 'Vendor management & lead-time intelligence',
        summary:
          'Vendor master → performance tracking → lead time learning → contingency vendors → cost trend reports',
        description:
          'Turns vendor data from a static address book into an intelligent supply intelligence layer:\n\n' +
          '- Centralized vendor master with payment terms, MOQs, lead times, contacts, certifications, and tax IDs\n' +
          '- Tracks on-time-in-full (OTIF), price stability, defect rate, and responsiveness per vendor per SKU\n' +
          '- Learns actual lead times from receipt data and updates planning parameters automatically - no more stale 30-day assumptions\n' +
          '- Maintains backup vendors per SKU and surfaces them when the primary slips\n' +
          '- Monthly digest of cost trends, vendor scorecards, and concentration risk (e.g., >40% spend with one vendor)',
        workflowNodeStacks: [
          {
            title: 'Vendor master',
            nodes: ['Contacts', 'Terms & MOQ', 'Certifications', 'Tax / banking', 'Approved SKU list'],
          },
          {
            title: 'Performance tracking',
            nodes: ['OTIF', 'Defect rate', 'Price stability', 'Responsiveness', 'Composite scorecard'],
          },
          {
            title: 'Lead-time learning',
            nodes: ['Receipt timestamps', 'Rolling average', 'Variance band', 'Planning param update'],
          },
          {
            title: 'Contingency',
            nodes: ['Backup vendor list', 'Slip detection', 'Auto-failover prompt'],
          },
          {
            title: 'Reporting',
            nodes: ['Cost trend chart', 'Concentration risk', 'Monthly digest'],
          },
        ],
        workflowNodes: ['Terms & MOQ', 'OTIF', 'Rolling average', 'Backup vendor list'],
      },
      {
        title: 'AP three-way match',
        summary:
          'Vendor invoice → match against PO + receipt → variance routing → GL post → payment scheduling',
        description:
          'Removes manual invoice matching and ensures you only pay for what you ordered and received:\n\n' +
          '- Ingests vendor invoices via email, OCR, or EDI and parses lines\n' +
          '- Matches each line to the originating PO and goods receipt within configurable tolerances\n' +
          '- Auto-approves clean matches; routes variances to the right buyer with side-by-side comparison\n' +
          '- Posts approved invoices to the GL with vendor, account, and project tagging\n' +
          '- Schedules payment by terms and surfaces early-pay discount opportunities',
        workflowNodeStacks: [
          {
            title: 'Ingest',
            nodes: ['Email parse', 'OCR / EDI', 'Header capture', 'Line capture'],
          },
          {
            title: 'Match',
            nodes: ['PO lookup', 'Receipt lookup', 'Quantity tolerance', 'Price tolerance'],
          },
          {
            title: 'Route',
            nodes: ['Auto-approve clean', 'Variance to buyer', 'Side-by-side view', 'Approval'],
          },
          {
            title: 'Post & pay',
            nodes: ['GL post', 'Vendor / account tag', 'Payment schedule', 'Early-pay discount flag'],
          },
        ],
        workflowNodes: ['OCR / EDI', 'PO lookup', 'Variance to buyer', 'Payment schedule'],
      },
      {
        title: 'Drop-ship vendor coordination',
        summary: 'Order tagged dropship → vendor PO → tracking sync → branded packaging check → margin reconciliation',
        description:
          'Routes dropship-eligible orders to the right partner without breaking the customer experience:\n\n' +
          '- Identifies dropship-eligible SKUs and routes order lines to the right vendor automatically\n' +
          '- Sends per-vendor POs with branded packaging instructions (so the unboxing still feels like your brand)\n' +
          '- Polls vendor APIs and email confirmations for tracking, syncs back to the customer-facing order timeline\n' +
          '- Reconciles vendor invoice (cost) against the order (sell) to surface true dropship margin per SKU\n' +
          '- Flags vendors with missing tracking or slow ack times and routes them to vendor performance scorecards',
        workflowNodeStacks: [
          {
            title: 'Route',
            nodes: ['Dropship eligibility', 'Vendor selection', 'Order line split', 'Customer comms hold'],
          },
          {
            title: 'Send',
            nodes: ['Vendor PO', 'Branded packaging spec', 'Insert / packing slip', 'EDI / API / email'],
          },
          {
            title: 'Track',
            nodes: ['Ack capture', 'Tracking poll', 'Customer timeline push', 'Exception flag'],
          },
          {
            title: 'Settle',
            nodes: ['Vendor invoice ingest', 'Margin calc', 'AP post', 'Vendor scorecard update'],
          },
        ],
        workflowNodes: ['Dropship eligibility', 'Vendor PO', 'Tracking poll', 'Margin calc'],
      },
      {
        title: 'Supplier RFQ & sourcing workflow',
        summary: 'New SKU need → RFQ to qualified suppliers → bid compare → sample request → award + price book update',
        description:
          'Replaces email-thread sourcing with a structured RFQ process buyers actually want to use:\n\n' +
          '- Buyer drafts the RFQ with specs, target qty, lead time, packaging, and target landed cost\n' +
          '- Auto-distributes to qualified suppliers from the vendor master based on category and certification\n' +
          '- Captures bids in a structured comparison view: cost, lead time, MOQ, payment terms, sample availability\n' +
          '- Sample request workflow tracks who shipped, who reviewed, and the disposition (approved / rejected / revise)\n' +
          '- Award decision updates the price book, vendor SKU mapping, and replenishment routing',
        workflowNodeStacks: [
          {
            title: 'Draft',
            nodes: ['Spec sheet', 'Target qty', 'Target landed cost', 'Lead time req', 'Cert requirements'],
          },
          {
            title: 'Distribute',
            nodes: ['Qualified supplier filter', 'RFQ send', 'Response window', 'Reminder cadence'],
          },
          {
            title: 'Compare',
            nodes: ['Bid grid', 'Cost / lead time / MOQ', 'Side-by-side view', 'Score model'],
          },
          {
            title: 'Sample',
            nodes: ['Sample request', 'Receipt log', 'Review / disposition', 'Approval'],
          },
          {
            title: 'Award',
            nodes: ['Vendor selection', 'Price book update', 'SKU mapping', 'Replenishment routing'],
          },
        ],
        workflowNodes: ['Spec sheet', 'Qualified supplier filter', 'Bid grid', 'Price book update'],
      },
    ],
  },
  {
    title: 'Order Management',
    summary:
      'Multi-channel order capture, validation, distributed routing, and a unified lifecycle state machine across DTC, marketplaces, and B2B.',
    automations: [
      {
        title: 'Multi-channel order ingestion & normalization',
        summary:
          'Channel webhooks → common data model → validation → reservation → unified order record',
        description:
          'Captures orders from every channel into one normalized data model:\n\n' +
          '- Listens to webhooks from Shopify, Amazon, Walmart, TikTok Shop, B2B portal, and POS\n' +
          '- Normalizes line items, addresses, taxes, discounts, and gift cards into a single schema\n' +
          '- Runs payment auth, address validation (USPS / Smarty), fraud scoring, and duplicate detection\n' +
          '- Reserves inventory at the line level the moment the order is accepted\n' +
          '- Writes a unified order record that downstream modules (warehouse, finance, CX) all read from',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Shopify hook', 'Amazon SP-API', 'Walmart hook', 'B2B portal', 'POS sync'],
          },
          {
            title: 'Normalize',
            nodes: ['Schema map', 'Line item parse', 'Address normalize', 'Tax / discount split'],
          },
          {
            title: 'Validate',
            nodes: ['Payment auth', 'Address verify', 'Fraud score', 'Dedup check'],
          },
          {
            title: 'Reserve & write',
            nodes: ['Inventory reserve', 'Unified order record', 'Lifecycle: confirmed', 'Event emit'],
          },
        ],
        workflowNodes: ['Shopify hook', 'Schema map', 'Fraud score', 'Inventory reserve'],
      },
      {
        title: 'Distributed order routing (DOM)',
        summary:
          'Order intake → rule engine → optimal node selection → split allocation → fulfillment dispatch',
        description:
          'Routes each order to the right warehouse, 3PL, store, or dropshipper based on cost, speed, and inventory:\n\n' +
          '- Evaluates every fulfillable node (own warehouses, 3PLs, retail backrooms, dropshippers) against the ship-to address\n' +
          '- Optimizes on a weighted score of cost, transit time, SLA risk, and inventory health (avoids the last unit at any node)\n' +
          '- Splits multi-line orders across nodes when no single node can fulfill - or holds for a brief window if a future receipt makes a single shipment possible\n' +
          '- Falls back to a dropship partner when in-house inventory is insufficient\n' +
          '- Emits routing decisions back into the order timeline for audit and customer service visibility',
        workflowNodeStacks: [
          {
            title: 'Inputs',
            nodes: ['Ship-to address', 'Order lines', 'Promised SLA', 'Customer tier'],
          },
          {
            title: 'Node evaluation',
            nodes: ['Inventory check', 'Cost calc', 'Transit time', 'SLA risk', 'Capacity'],
          },
          {
            title: 'Decision',
            nodes: ['Single-node win', 'Split allocation', 'Hold-and-wait', 'Dropship fallback'],
          },
          {
            title: 'Dispatch',
            nodes: ['Warehouse handoff', '3PL API', 'Dropship PO', 'Timeline event'],
          },
        ],
        workflowNodes: ['Order lines', 'Cost calc', 'Split allocation', 'Warehouse handoff'],
      },
      {
        title: 'Lifecycle state machine & exceptions',
        summary:
          'Pending → confirmed → allocated → picked → shipped → delivered → returned → closed (with audit + exception branches)',
        description:
          'A single state machine governs every order from any channel - no more "lost in OMS" tickets:\n\n' +
          '- Strict state transitions with timestamps, actors, and reason codes for every change\n' +
          '- Exception branches for failed payment, address issues, stockouts, partial shipments, lost-in-transit, and returns\n' +
          '- SLA timers per state - escalations fire before the customer notices\n' +
          '- Customer-facing portal and CX agent view both read from this state directly\n' +
          '- Full audit trail for finance, support, and compliance',
        workflowNodeStacks: [
          {
            title: 'Happy path',
            nodes: ['Pending', 'Confirmed', 'Allocated', 'Picked', 'Shipped', 'Delivered', 'Closed'],
          },
          {
            title: 'Exception branches',
            nodes: ['Payment retry', 'Address fix', 'Stockout hold', 'Partial ship', 'Lost-in-transit', 'Return / refund'],
          },
          {
            title: 'SLA & escalation',
            nodes: ['Timer per state', 'Threshold breach', 'Auto-escalate', 'CX alert'],
          },
          {
            title: 'Surface',
            nodes: ['Customer portal', 'CX agent view', 'Audit log', 'Finance feed'],
          },
        ],
        workflowNodes: ['Confirmed', 'Stockout hold', 'Timer per state', 'CX agent view'],
      },
      {
        title: 'Subscription order generation & renewals',
        summary: 'Subscription schedule → upcoming renewal → payment auth → order generation → skip / swap handling',
        description:
          'Manages the subscription lifecycle alongside the one-time order pipeline:\n\n' +
          '- Maintains subscription frequency, next ship date, billing cycle, and skip / swap / cancel preferences per subscriber\n' +
          '- Pre-charges payment N days before ship and falls back through saved methods if the primary fails\n' +
          '- Generates a normal order on charge success - fulfillment, inventory, and finance see it like any other order\n' +
          '- Handles skips, swaps, and pause requests via customer portal + CX dashboard with no engineering involvement\n' +
          '- Surfaces churn signals (failed payment streak, multiple skips) so retention can intervene before cancel',
        workflowNodeStacks: [
          {
            title: 'Schedule',
            nodes: ['Frequency', 'Next ship date', 'Billing cycle', 'Pause / skip rules'],
          },
          {
            title: 'Charge',
            nodes: ['Pre-auth N days out', 'Method fallback', 'Retry cadence', 'Failure escalate'],
          },
          {
            title: 'Generate',
            nodes: ['Order create', 'Inventory reserve', 'Lifecycle handoff'],
          },
          {
            title: 'Modify',
            nodes: ['Skip / swap / pause', 'Customer portal', 'CX dashboard', 'Audit trail'],
          },
          {
            title: 'Retain',
            nodes: ['Failed payment streak', 'Skip pattern', 'Churn risk score', 'Save offer'],
          },
        ],
        workflowNodes: ['Next ship date', 'Pre-auth N days out', 'Order create', 'Churn risk score'],
      },
      {
        title: 'Fraud screening & manual review queue',
        summary: 'Order intake → risk score → auto-approve / hold / decline → reviewer queue → approved orders re-enter pipeline',
        description:
          'Catches fraud before it ships without holding clean orders for hours:\n\n' +
          '- Scores every order on a risk model: address mismatch, velocity, BIN country vs ship country, device fingerprint, prior chargeback history\n' +
          '- Auto-approves clean orders, declines obvious fraud, and routes everything in between to a manual review queue\n' +
          '- Reviewer screen shows the score breakdown, prior order history, and one-click approve / reject / contact-customer\n' +
          '- Approved orders re-enter the normal lifecycle; rejected orders trigger refund + customer comms\n' +
          '- Outcomes feed back into the model so it learns from your specific customer base',
        workflowNodeStacks: [
          {
            title: 'Score',
            nodes: ['Address mismatch', 'Velocity check', 'BIN vs ship country', 'Device fingerprint', 'Prior CB history'],
          },
          {
            title: 'Decide',
            nodes: ['Auto-approve', 'Manual review hold', 'Auto-decline', 'Threshold tuning'],
          },
          {
            title: 'Review',
            nodes: ['Reviewer queue', 'Score breakdown', 'Order history', 'Decision action'],
          },
          {
            title: 'Settle',
            nodes: ['Approved → pipeline', 'Rejected → refund', 'Customer comms', 'Outcome → model'],
          },
        ],
        workflowNodes: ['Velocity check', 'Manual review hold', 'Reviewer queue', 'Outcome → model'],
      },
      {
        title: 'CX-driven order modifications',
        summary: 'CX agent request → eligibility check → modification (cancel / address / line) → downstream sync → audit log',
        description:
          'Lets CX agents fix orders without filing engineering tickets - and without breaking finance:\n\n' +
          '- Single agent screen for cancel, change address, edit line item, swap SKU, or apply credit\n' +
          '- Eligibility engine checks lifecycle state (already shipped? already invoiced?) before allowing the change\n' +
          '- Modifications cascade automatically: warehouse pick is canceled or updated, label is voided / re-purchased, finance entries adjust\n' +
          '- Customer notification fires automatically with the new details\n' +
          '- Every change logged with agent identity, timestamp, reason code, and original vs new values',
        workflowNodeStacks: [
          {
            title: 'Initiate',
            nodes: ['CX agent screen', 'Order lookup', 'Mod type select', 'Reason code'],
          },
          {
            title: 'Validate',
            nodes: ['Lifecycle state check', 'Warehouse status', 'Carrier ack', 'Eligibility verdict'],
          },
          {
            title: 'Cascade',
            nodes: ['Pick update', 'Label void / replace', 'Inventory adjust', 'Finance adjust'],
          },
          {
            title: 'Communicate',
            nodes: ['Customer email / SMS', 'Order timeline event', 'Audit log entry'],
          },
        ],
        workflowNodes: ['Mod type select', 'Lifecycle state check', 'Pick update', 'Audit log entry'],
      },
    ],
  },
  {
    title: 'Warehouse Management',
    summary:
      'Receiving, putaway, slotting, wave/batch picking, packing, and shipping label generation - all wired into the same inventory ledger.',
    automations: [
      {
        title: 'Inbound receiving & putaway with ASN',
        summary:
          'ASN ingest → dock check-in → scan & verify → putaway suggestion → bin update → variance flag',
        description:
          'Speeds inbound from "truck arrives" to "available to sell" with full traceability:\n\n' +
          '- Pre-receives against the ASN so dock teams know exactly what is coming\n' +
          '- Scan-verifies each pallet/case at receipt; flags overages, shortages, and damage with photo capture\n' +
          '- Suggests putaway bins by SKU velocity, slotting rules, and lot/expiry constraints\n' +
          '- Updates inventory in real-time as putaway completes - no end-of-day batch lag\n' +
          '- Triggers AP three-way match in the procurement module on clean receipt',
        workflowNodeStacks: [
          {
            title: 'Pre-receive',
            nodes: ['ASN ingest', 'Dock schedule', 'Expected vs PO check'],
          },
          {
            title: 'Receive',
            nodes: ['Dock check-in', 'Pallet scan', 'Quantity verify', 'Damage photo'],
          },
          {
            title: 'Putaway',
            nodes: ['Slotting rules', 'Velocity-based bin', 'Lot / expiry', 'Mobile directed putaway'],
          },
          {
            title: 'Settle',
            nodes: ['Inventory update', 'ASN close', 'Variance flag', 'Trigger AP match'],
          },
        ],
        workflowNodes: ['ASN ingest', 'Pallet scan', 'Velocity-based bin', 'Inventory update'],
      },
      {
        title: 'Wave picking & cartonization',
        summary:
          'Order pool → wave creation → optimal pick path → cartonization → pick lists to handhelds',
        description:
          'Maximizes pick density and minimizes box waste:\n\n' +
          '- Pools eligible orders into waves grouped by ship date, carrier cutoff, and pick zone\n' +
          '- Builds optimized pick paths (S-curve / serpentine) so pickers walk the shortest distance\n' +
          '- Cartonizes each order into the smallest qualifying box using SKU dimensions and weight\n' +
          '- Pushes pick lists to handhelds in real time and re-balances waves if a stockout appears mid-pick\n' +
          '- Emits pick performance metrics (units/hour, pick accuracy) per associate and per zone',
        workflowNodeStacks: [
          {
            title: 'Wave plan',
            nodes: ['Eligibility filter', 'Carrier cutoff group', 'Zone group', 'Wave release'],
          },
          {
            title: 'Pick path',
            nodes: ['SKU map lookup', 'Path optimize', 'Handheld push', 'Real-time rebalance'],
          },
          {
            title: 'Cartonize',
            nodes: ['SKU dim / weight', 'Box catalog', 'Best-fit calc', 'Multi-box split'],
          },
          {
            title: 'Measure',
            nodes: ['Units / hour', 'Pick accuracy', 'Idle time', 'Zone heatmap'],
          },
        ],
        workflowNodes: ['Wave release', 'Path optimize', 'Best-fit calc', 'Pick accuracy'],
      },
      {
        title: 'Pack-out, label & manifest',
        summary:
          'Pack station scan → carton verify → label print → manifest build → handoff to carrier',
        description:
          'Closes the loop between pick and ship with no manual data entry:\n\n' +
          '- Pack station scans the order; system verifies every line was picked correctly before allowing label print\n' +
          '- Generates the shipping label, packing slip, customs docs (CN22/CN23, commercial invoice), and any inserts\n' +
          '- Logs carton dimensions and weight for billing reconciliation against carrier invoices\n' +
          '- Builds end-of-day manifests per carrier and emits ASNs to retail customers when applicable\n' +
          '- Tracking numbers flow back to the order record and out to the customer in real time',
        workflowNodeStacks: [
          {
            title: 'Pack station',
            nodes: ['Order scan', 'Line verify', 'Carton confirm', 'Insert / marketing'],
          },
          {
            title: 'Documents',
            nodes: ['Shipping label', 'Packing slip', 'Customs docs', 'Retailer ASN'],
          },
          {
            title: 'Capture',
            nodes: ['Dim / weight log', 'Tracking number', 'Order timeline'],
          },
          {
            title: 'Handoff',
            nodes: ['Carrier manifest', 'Pickup window', 'Customer notification'],
          },
        ],
        workflowNodes: ['Line verify', 'Shipping label', 'Tracking number', 'Carrier manifest'],
      },
      {
        title: 'Returns receiving & disposition',
        summary: 'Inbound return → RMA match → inspect → grade → restock / refurb / scrap → finance settle',
        description:
          'Processes returns with the same rigor as inbound POs - faster restock, less leakage:\n\n' +
          '- Scans inbound returns and matches to the open RMA (or flags as unauthorized)\n' +
          '- Inspects per the SKU\'s return spec (visual, function check, batch / serial verify)\n' +
          '- Grades A / B / C; A goes back to sellable inventory, B to refurb queue, C to scrap or liquidation\n' +
          '- Posts inventory updates and triggers customer refund or exchange in the order module\n' +
          '- Photo + reason code captured for high-return SKUs to feed product / merchandising decisions',
        workflowNodeStacks: [
          {
            title: 'Receive',
            nodes: ['Inbound scan', 'RMA match', 'Unauthorized flag', 'Photo capture'],
          },
          {
            title: 'Inspect',
            nodes: ['Visual check', 'Function check', 'Batch / serial verify', 'Reason code'],
          },
          {
            title: 'Grade',
            nodes: ['Grade A (resell)', 'Grade B (refurb)', 'Grade C (scrap / liquidate)'],
          },
          {
            title: 'Settle',
            nodes: ['Inventory post', 'Refund / exchange trigger', 'Cost layer adjust', 'Trend feed'],
          },
        ],
        workflowNodes: ['RMA match', 'Function check', 'Grade A (resell)', 'Refund / exchange trigger'],
      },
      {
        title: 'Bin slotting optimization',
        summary: 'Velocity + affinity + size analysis → reslot recommendations → mobile move tasks → pick-time savings tracked',
        description:
          'Continuously tunes where SKUs live in the warehouse so pickers walk less:\n\n' +
          '- Analyzes pick frequency, affinity (SKUs frequently picked together), size, and weight by SKU\n' +
          '- Recommends reslot moves: fastest movers near pack stations, affinity pairs adjacent, heavy items at waist height\n' +
          '- Generates mobile move tasks; warehouse can run them as background work between pick waves\n' +
          '- Tracks pick-time before / after to measure the actual labor savings\n' +
          '- Re-analyzes monthly so seasonal velocity shifts don\'t leave the layout stale',
        workflowNodeStacks: [
          {
            title: 'Analyze',
            nodes: ['Pick frequency', 'Affinity matrix', 'Size / weight', 'Current location'],
          },
          {
            title: 'Recommend',
            nodes: ['Fast-mover front', 'Affinity adjacency', 'Ergonomic height', 'Heavy on bottom'],
          },
          {
            title: 'Execute',
            nodes: ['Move task list', 'Mobile directed move', 'Bin update', 'Verification scan'],
          },
          {
            title: 'Measure',
            nodes: ['Pick-time before / after', 'Walk distance delta', 'Labor savings $'],
          },
        ],
        workflowNodes: ['Pick frequency', 'Fast-mover front', 'Move task list', 'Pick-time before / after'],
      },
    ],
  },
  {
    title: 'Freight & Fulfillment',
    summary:
      'Rate shopping, carrier selection, tracking, returns, and RTO management - parcel through LTL.',
    automations: [
      {
        title: 'Rate shopping & SLA-based carrier selection',
        summary:
          'Order → eligible carriers → rate + transit query → SLA filter → cheapest qualifying → label purchase',
        description:
          'Picks the right carrier for every shipment instead of defaulting to one expensive contract:\n\n' +
          '- Queries every eligible carrier and aggregator (UPS, FedEx, USPS, regional, freight broker network) in parallel\n' +
          '- Filters out carriers that miss the promised SLA or cannot serve the destination ZIP\n' +
          '- Picks the cheapest qualifying option but routes anything over a configurable cost threshold for human approval\n' +
          '- For pallets/LTL, pulls quotes from multiple brokers and flags variance over 50% so nothing ships without a sanity check\n' +
          '- Logs every decision so the carrier mix can be analyzed and renegotiated quarterly',
        workflowNodeStacks: [
          {
            title: 'Eligibility',
            nodes: ['Destination ZIP', 'Weight / dim band', 'Service type', 'Hazmat / restricted'],
          },
          {
            title: 'Quote',
            nodes: ['Parallel API call', 'Negotiated rate apply', 'Surcharge calc', 'Transit estimate'],
          },
          {
            title: 'Decide',
            nodes: ['SLA filter', 'Cheapest qualifying', 'Approval gate (>$X)', 'Variance flag (LTL)'],
          },
          {
            title: 'Purchase & log',
            nodes: ['Label purchase', 'BOL generation', 'Decision audit', 'Quarterly mix report'],
          },
        ],
        workflowNodes: ['Weight / dim band', 'Parallel API call', 'Cheapest qualifying', 'Label purchase'],
      },
      {
        title: 'Tracking sync & customer notifications',
        summary:
          'Carrier tracking events → status normalize → order timeline update → customer messaging → exception escalation',
        description:
          'Keeps customers and CX agents in sync without anyone refreshing a carrier portal:\n\n' +
          '- Polls/subscribes to carrier tracking events for every active shipment\n' +
          '- Normalizes carrier-specific status codes into a single set (in transit, out for delivery, exception, delivered)\n' +
          '- Updates the order timeline so the storefront, customer portal, and CX agents all see the same status\n' +
          '- Triggers customer notifications (email/SMS) on key events and proactively reaches out on exceptions\n' +
          '- Escalates stuck or lost-in-transit shipments with a Voice AI carrier call for resolution',
        workflowNodeStacks: [
          {
            title: 'Ingest',
            nodes: ['Carrier webhook', 'Polling fallback', 'Multi-tracking handle'],
          },
          {
            title: 'Normalize',
            nodes: ['Status map', 'Event dedup', 'Order timeline write'],
          },
          {
            title: 'Notify',
            nodes: ['Email / SMS template', 'Channel push', 'Quiet hours respect'],
          },
          {
            title: 'Exceptions',
            nodes: ['Stuck detection', 'Auto-escalate', 'Voice AI call', 'CX ticket'],
          },
        ],
        workflowNodes: ['Carrier webhook', 'Status map', 'Email / SMS template', 'Auto-escalate'],
      },
      {
        title: 'Returns, exchanges & RTO management',
        summary:
          'Return request → RMA → label → inbound scan → disposition → refund/exchange → analytics',
        description:
          'Turns returns from a margin leak into a managed workflow with analytics:\n\n' +
          '- Customer-facing return portal generates the RMA, captures reason codes, and decides refund vs exchange vs store credit\n' +
          '- Pre-paid return label issued automatically; rules enforce eligibility (window, condition, final sale)\n' +
          '- Warehouse scans the inbound, runs quality inspection, and dispositions to resell, refurb, or scrap\n' +
          '- Refund posts to the original payment method; exchange triggers a new fulfillment\n' +
          '- RTO (return-to-origin) failures from carriers are tracked separately and analyzed by SKU, geo, and carrier to fix root cause',
        workflowNodeStacks: [
          {
            title: 'Initiate',
            nodes: ['Return portal', 'Reason capture', 'Eligibility check', 'RMA issue'],
          },
          {
            title: 'Inbound',
            nodes: ['Return label', 'Carrier ingest', 'Dock scan', 'Quality inspect'],
          },
          {
            title: 'Disposition',
            nodes: ['Resell', 'Refurb', 'Scrap', 'Inventory update'],
          },
          {
            title: 'Settle',
            nodes: ['Refund / store credit', 'Exchange order', 'GL adjustment'],
          },
          {
            title: 'Analyze',
            nodes: ['SKU return rate', 'Carrier RTO rate', 'Geo heatmap', 'Root-cause feedback'],
          },
        ],
        workflowNodes: ['Reason capture', 'Quality inspect', 'Refund / store credit', 'SKU return rate'],
      },
      {
        title: 'Carrier billing reconciliation / parcel audit',
        summary: 'Carrier invoice → match to shipment → audit dim / weight / surcharges → variance dispute → refund recovery',
        description:
          'Audits every carrier invoice line so you stop paying for surcharges you don\'t owe:\n\n' +
          '- Ingests carrier invoices (UPS, FedEx, USPS, regional) line by line and matches to the originating shipment\n' +
          '- Compares billed dim / weight against scanned dim / weight at pack-out and flags discrepancies\n' +
          '- Audits surcharges (residential, area, fuel, oversize) against the original quote\n' +
          '- Auto-generates dispute claims for failed-service-guarantee, late deliveries, and miscalculated surcharges\n' +
          '- Tracks recovered refunds and feeds the carrier scorecard',
        workflowNodeStacks: [
          {
            title: 'Ingest',
            nodes: ['Carrier invoice', 'Line parse', 'Shipment lookup', 'Reference match'],
          },
          {
            title: 'Audit',
            nodes: ['Dim / weight compare', 'Surcharge audit', 'Quote vs billed', 'Variance flag'],
          },
          {
            title: 'Dispute',
            nodes: ['Service guarantee claim', 'Surcharge dispute', 'Carrier portal submit', 'Status track'],
          },
          {
            title: 'Recover',
            nodes: ['Refund post', 'GL credit', 'Scorecard update', 'Trend dashboard'],
          },
        ],
        workflowNodes: ['Carrier invoice', 'Dim / weight compare', 'Service guarantee claim', 'Refund post'],
      },
      {
        title: 'International shipping & customs',
        summary: 'Order destination check → HS code → duties / tax → DDP vs DDU → customs docs → carrier handoff',
        description:
          'Ships internationally with landed-cost transparency for the customer and clean customs paperwork:\n\n' +
          '- Detects international destinations and routes through the international workflow at order entry\n' +
          '- Looks up HS codes per SKU (with manual override) and calculates duties + taxes for the destination\n' +
          '- Quotes DDP (delivered duty paid) vs DDU (customer pays at delivery) and lets the storefront present the choice\n' +
          '- Generates customs paperwork (CN22 / CN23, commercial invoice) and routes to the right international carrier or partner (Passport, Zonos, Easyship)\n' +
          '- Handles returns from international orders including reverse customs and refund recovery',
        workflowNodeStacks: [
          {
            title: 'Detect',
            nodes: ['Destination check', 'Restricted SKU filter', 'Hazmat check'],
          },
          {
            title: 'Classify',
            nodes: ['HS code lookup', 'Duty calc', 'Tax / VAT calc', 'Restricted list'],
          },
          {
            title: 'Quote',
            nodes: ['DDP option', 'DDU option', 'Storefront present', 'Order accept'],
          },
          {
            title: 'Document',
            nodes: ['CN22 / CN23', 'Commercial invoice', 'Carrier handoff', 'Tracking sync'],
          },
          {
            title: 'Returns',
            nodes: ['Reverse customs', 'Duty refund', 'Cost recovery'],
          },
        ],
        workflowNodes: ['Destination check', 'HS code lookup', 'DDP option', 'CN22 / CN23'],
      },
    ],
  },
  {
    title: 'Finance & Accounting',
    summary:
      'GL automation, marketplace payout reconciliation, landed cost, and channel-level P&L wired directly to operational events.',
    automations: [
      {
        title: 'Automated journal entries from operational events',
        summary:
          'Operational event → mapped journal → multi-entity / multi-currency post → audit trail',
        description:
          'Removes the month-end scramble by posting GL entries the moment operations happen:\n\n' +
          '- Subscribes to events: goods receipt, shipment, return, refund, write-off, transfer, production complete\n' +
          '- Maps each event to the right GL accounts (revenue, COGS, inventory, AR/AP) per entity and currency\n' +
          '- Posts entries in real time with full traceability back to the originating order, PO, or receipt\n' +
          '- Handles deferred revenue for pre-orders, subscriptions, and gift cards correctly\n' +
          '- Surfaces unposted/exception items in a daily dashboard so close is "review and approve" not "build from scratch"',
        workflowNodeStacks: [
          {
            title: 'Event sources',
            nodes: ['Goods receipt', 'Shipment', 'Return / refund', 'Write-off', 'Production'],
          },
          {
            title: 'Map',
            nodes: ['Account map', 'Entity / currency', 'Tax / discount split', 'Deferred rev rules'],
          },
          {
            title: 'Post',
            nodes: ['GL journal', 'Source link', 'Audit trail', 'FX rate apply'],
          },
          {
            title: 'Close support',
            nodes: ['Exception dashboard', 'Reviewer approval', 'Period lock'],
          },
        ],
        workflowNodes: ['Shipment', 'Account map', 'GL journal', 'Exception dashboard'],
      },
      {
        title: 'Marketplace payout reconciliation',
        summary:
          'Marketplace settlement file → line-level parse → match to orders → fee allocation → variance investigation',
        description:
          'Reconciles every Amazon/Walmart/Shopify Payments deposit against the underlying orders so you know your true take:\n\n' +
          '- Ingests settlement files and payout reports from each marketplace and processor\n' +
          '- Parses line-level fees (referral, FBA, storage, advertising, returns, chargebacks)\n' +
          '- Matches each payout line to the corresponding order or fee event in the OMS\n' +
          '- Allocates fees to the correct GL accounts and channel for accurate channel-level P&L\n' +
          '- Surfaces variances (missing payouts, unexpected fees) for finance to investigate',
        workflowNodeStacks: [
          {
            title: 'Ingest',
            nodes: ['Settlement file', 'API report pull', 'Header parse', 'Line parse'],
          },
          {
            title: 'Match',
            nodes: ['Order lookup', 'Fee category', 'Refund / chargeback link', 'Adjustment events'],
          },
          {
            title: 'Allocate',
            nodes: ['Channel tag', 'GL account map', 'Currency convert', 'Net deposit calc'],
          },
          {
            title: 'Investigate',
            nodes: ['Variance flag', 'Aging tracker', 'Marketplace case', 'Resolution log'],
          },
        ],
        workflowNodes: ['Settlement file', 'Order lookup', 'Channel tag', 'Variance flag'],
      },
      {
        title: 'Landed cost & SKU-level margin',
        summary:
          'Cost layers → freight + duty + overhead allocation → true COGS per SKU per warehouse → margin reporting',
        description:
          'Knows the true cost of every unit so pricing, channel mix, and discount decisions are backed by real numbers:\n\n' +
          '- Captures product cost, inbound freight, duty, brokerage, and overhead per receipt\n' +
          '- Allocates landed cost across SKUs by configurable basis (weight, value, units)\n' +
          '- Maintains cost layers (FIFO/WA) per warehouse so transfers and shipments draw the right cost\n' +
          '- Surfaces gross margin by SKU, channel, and campaign in a near-real-time dashboard\n' +
          '- Feeds contribution margin (after fulfillment + marketing) so the team can see what is truly profitable',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Product cost', 'Freight invoice', 'Duty / brokerage', 'Overhead pool'],
          },
          {
            title: 'Allocate',
            nodes: ['Basis (wt / val / units)', 'Per-SKU split', 'Cost layer write'],
          },
          {
            title: 'Consume',
            nodes: ['FIFO / WA pull', 'Shipment costing', 'Transfer costing'],
          },
          {
            title: 'Report',
            nodes: ['SKU margin', 'Channel P&L', 'Contribution margin', 'Trend dashboard'],
          },
        ],
        workflowNodes: ['Freight invoice', 'Per-SKU split', 'FIFO / WA pull', 'Channel P&L'],
      },
      {
        title: 'Tax engine (sales tax / VAT / marketplace facilitator)',
        summary: 'Order entry → jurisdiction lookup → rate calc → marketplace-facilitator carve-out → exemption apply → filing-ready ledger',
        description:
          'Calculates and reports tax across every channel and jurisdiction without spreadsheets at filing time:\n\n' +
          '- Determines tax jurisdiction from ship-to address (state, county, city, special district)\n' +
          '- Calculates sales tax / VAT at the line level using a connected tax engine (Avalara, TaxJar, Anrok)\n' +
          '- Recognizes marketplace-facilitator orders (Amazon, Walmart, Etsy) and excludes them from your remit\n' +
          '- Applies tax exemptions for B2B / nonprofit / reseller customers with cert on file\n' +
          '- Maintains a filing-ready ledger by jurisdiction so monthly / quarterly returns are an export, not a project',
        workflowNodeStacks: [
          {
            title: 'Locate',
            nodes: ['Ship-to parse', 'State / county / city', 'Special district', 'Nexus check'],
          },
          {
            title: 'Calculate',
            nodes: ['Tax engine call', 'Rate by line', 'VAT / GST handle', 'Rounding rule'],
          },
          {
            title: 'Carve out',
            nodes: ['Marketplace facilitator flag', 'Exemption cert apply', 'Exempt jurisdiction'],
          },
          {
            title: 'File',
            nodes: ['Per-jurisdiction ledger', 'Monthly export', 'Filing reconciliation', 'Audit pack'],
          },
        ],
        workflowNodes: ['Ship-to parse', 'Tax engine call', 'Marketplace facilitator flag', 'Per-jurisdiction ledger'],
      },
      {
        title: 'Subscription & deferred revenue',
        summary: 'Subscription billing → deferred revenue post → revenue recognition by delivery → renewal accounting → churn impact',
        description:
          'Books subscriptions correctly the first time so revenue isn\'t restated quarterly:\n\n' +
          '- Recognizes prepaid subscription revenue as deferred at the time of charge\n' +
          '- Releases revenue per fulfillment cycle (monthly / quarterly / on-delivery) into the appropriate period\n' +
          '- Handles partial periods, mid-cycle upgrades, and refunds with correct catch-up entries\n' +
          '- Mirrors logic for gift cards, store credit, and pre-orders so all deferred categories use one engine\n' +
          '- Surfaces deferred revenue balance and rolloff schedule for finance review',
        workflowNodeStacks: [
          {
            title: 'Book',
            nodes: ['Subscription charge', 'Deferred liability post', 'Service period stamp'],
          },
          {
            title: 'Recognize',
            nodes: ['Per-cycle release', 'Revenue journal', 'Period mapping', 'FX adjust'],
          },
          {
            title: 'Adjust',
            nodes: ['Mid-cycle upgrade', 'Refund / credit', 'Catch-up entry', 'Audit log'],
          },
          {
            title: 'Report',
            nodes: ['Deferred balance', 'Rolloff schedule', 'Cohort revenue view'],
          },
        ],
        workflowNodes: ['Subscription charge', 'Per-cycle release', 'Refund / credit', 'Deferred balance'],
      },
      {
        title: 'Multi-entity / multi-currency consolidation',
        summary: 'Per-entity ledgers → intercompany eliminations → FX translation → consolidated GL → reporting pack',
        description:
          'Closes the books across multiple entities, brands, and currencies without month-end heroics:\n\n' +
          '- Maintains a separate GL per legal entity / brand with its own functional currency and chart of accounts\n' +
          '- Handles intercompany transactions (transfers, shared services, loans) with automatic matching and elimination\n' +
          '- Translates each entity to the reporting currency at month-end FX rates with CTA tracking\n' +
          '- Produces consolidated P&L, balance sheet, and cash flow with drill-down to the source entity and transaction\n' +
          '- Locks periods, supports prior-period adjustments, and generates the audit pack',
        workflowNodeStacks: [
          {
            title: 'Per-entity',
            nodes: ['Functional currency', 'Local CoA', 'Local GL', 'Local close calendar'],
          },
          {
            title: 'Intercompany',
            nodes: ['IC transaction tag', 'Match engine', 'Elimination entry', 'Reconciliation report'],
          },
          {
            title: 'Translate',
            nodes: ['Month-end FX rate', 'Translation engine', 'CTA tracking', 'FX gain / loss'],
          },
          {
            title: 'Consolidate',
            nodes: ['Consolidated P&L', 'Consolidated BS', 'Consolidated CF', 'Drill-down'],
          },
          {
            title: 'Close',
            nodes: ['Period lock', 'Prior-period adj', 'Audit pack export'],
          },
        ],
        workflowNodes: ['Local GL', 'Match engine', 'Translation engine', 'Consolidated P&L'],
      },
    ],
  },
  {
    title: 'Demand Planning',
    summary:
      'ML-based forecasting, scenario planning for campaigns and launches, and S&OP alignment between sales, supply, and finance.',
    automations: [
      {
        title: 'ML demand forecasting',
        summary:
          'Sales history + seasonality + campaign signals → ML model → SKU-level forecast → reorder feed → planner override',
        description:
          'Replaces gut-feel reordering with statistically defensible forecasts at the SKU and location level:\n\n' +
          '- Trains on multi-year sales history with seasonality, day-of-week, and holiday effects\n' +
          '- Incorporates promo calendar, paid media spend, and influencer drops as exogenous signals\n' +
          '- Produces SKU-by-location forecasts at daily/weekly granularity with confidence bands\n' +
          '- Feeds reorder points and replenishment in the procurement module - planners can override per SKU\n' +
          '- Continuously back-tests forecast accuracy and retrains on new actuals',
        workflowNodeStacks: [
          {
            title: 'Inputs',
            nodes: ['Sales history', 'Seasonality', 'Promo calendar', 'Media spend', 'External signals'],
          },
          {
            title: 'Model',
            nodes: ['Feature build', 'Train job', 'Confidence bands', 'Per-SKU per-location'],
          },
          {
            title: 'Use',
            nodes: ['Reorder feed', 'Safety stock recalc', 'Planner override', 'Approval'],
          },
          {
            title: 'Learn',
            nodes: ['Actuals capture', 'Accuracy back-test', 'Drift alert', 'Retrain trigger'],
          },
        ],
        workflowNodes: ['Sales history', 'Train job', 'Reorder feed', 'Accuracy back-test'],
      },
      {
        title: 'Scenario planning for campaigns & launches',
        summary:
          'Scenario inputs → uplift model → inventory + production impact → feasibility check → committed plan',
        description:
          'Models the impact of marketing campaigns, influencer drops, and new product launches before you commit:\n\n' +
          '- Planner inputs the scenario (channel, spend, target audience, promo depth, expected dates)\n' +
          '- Uplift model estimates demand pull-forward and incremental units per SKU\n' +
          '- Cascades the impact into inventory, production, and inbound logistics to surface stockout risk\n' +
          '- Compares scenarios side-by-side - what does a 20% deeper promo do to margin and ATS\n' +
          '- Locks the chosen scenario into the forecast so planning, buying, and warehouse all align',
        workflowNodeStacks: [
          {
            title: 'Inputs',
            nodes: ['Channel & spend', 'Audience', 'Promo depth', 'Target date'],
          },
          {
            title: 'Uplift',
            nodes: ['Historical analog', 'Incremental units', 'Pull-forward effect', 'Per-SKU split'],
          },
          {
            title: 'Cascade',
            nodes: ['Inventory impact', 'Production load', 'Inbound freight', 'Stockout risk'],
          },
          {
            title: 'Decide',
            nodes: ['Side-by-side compare', 'Margin model', 'Commit to forecast'],
          },
        ],
        workflowNodes: ['Channel & spend', 'Incremental units', 'Stockout risk', 'Commit to forecast'],
      },
      {
        title: 'S&OP digest & alignment',
        summary:
          'Sales actuals + supply view + finance constraints → unified S&OP brief → exec review → action items',
        description:
          'Produces a weekly/monthly S&OP brief that aligns sales, supply, and finance off the same data:\n\n' +
          '- Pulls sales actuals vs forecast, inventory health, open POs, and forecast accuracy\n' +
          '- Layers in finance constraints (cash, working capital, OTB budget) so plans stay funded\n' +
          '- Highlights stockout risks, overstock candidates, and SKUs trending off forecast\n' +
          '- Auto-drafts an exec brief with charts and recommended actions; team annotates and locks the plan\n' +
          '- Action items flow back to procurement (PO adjustments) and marketing (promo throttling)',
        workflowNodeStacks: [
          {
            title: 'Pull',
            nodes: ['Sales vs forecast', 'Inventory health', 'Open POs', 'Forecast accuracy'],
          },
          {
            title: 'Layer',
            nodes: ['Cash position', 'Working capital', 'OTB budget'],
          },
          {
            title: 'Surface',
            nodes: ['Stockout risk', 'Overstock candidates', 'Off-forecast SKUs'],
          },
          {
            title: 'Decide',
            nodes: ['Exec brief draft', 'Annotation', 'Plan lock', 'Action items'],
          },
          {
            title: 'Execute',
            nodes: ['PO adjustments', 'Promo throttle', 'Production rebalance'],
          },
        ],
        workflowNodes: ['Sales vs forecast', 'OTB budget', 'Stockout risk', 'Action items'],
      },
      {
        title: 'New product launch (NPI) planning',
        summary: 'Launch plan → lookalike SKU model → initial buy + safety stock → launch-window monitor → repeat-buy trigger',
        description:
          'Plans a new SKU launch without the usual stockout-or-overstock coin flip:\n\n' +
          '- Builds an initial demand model from lookalike SKUs (same category, similar price point, comparable launch context)\n' +
          '- Layers in launch marketing plan (paid media, influencer drops, email, PR) to size expected uplift\n' +
          '- Recommends initial buy quantity, launch-window safety stock, and reorder trigger for the second buy\n' +
          '- Monitors the first weeks tightly: actuals vs forecast daily, sell-through rate, channel mix\n' +
          '- Triggers an early repeat buy if velocity outpaces plan, or a markdown plan if it underperforms',
        workflowNodeStacks: [
          {
            title: 'Plan',
            nodes: ['Lookalike SKU pick', 'Category baseline', 'Launch marketing inputs', 'Channel mix target'],
          },
          {
            title: 'Buy',
            nodes: ['Initial qty calc', 'Safety stock buffer', 'Reorder trigger set', 'Approval'],
          },
          {
            title: 'Monitor',
            nodes: ['Daily actuals vs forecast', 'Sell-through rate', 'Channel split', 'Variance alert'],
          },
          {
            title: 'Act',
            nodes: ['Early repeat buy', 'Markdown plan', 'Marketing throttle', 'Forecast retune'],
          },
        ],
        workflowNodes: ['Lookalike SKU pick', 'Initial qty calc', 'Daily actuals vs forecast', 'Early repeat buy'],
      },
      {
        title: 'Replenishment plan generation',
        summary: 'Forecast + on-hand + open POs + lead time → time-phased plan → buyer queue → committed PO',
        description:
          'Generates a rolling replenishment plan that buyers actually trust:\n\n' +
          '- Pulls demand forecast, current on-hand, open POs in-flight, and supplier lead times per SKU per location\n' +
          '- Builds a time-phased view (weekly / monthly bucket) of projected on-hand vs target days-of-stock\n' +
          '- Surfaces SKUs about to drop below safety stock with the recommended order qty and earliest order date\n' +
          '- Buyer queue lets the buyer accept, modify, or defer with one click; accepted lines flow into the procurement PO module\n' +
          '- Tracks plan vs commit vs receipt accuracy so the planning parameters keep improving',
        workflowNodeStacks: [
          {
            title: 'Inputs',
            nodes: ['Demand forecast', 'Current on-hand', 'Open POs in-flight', 'Lead time'],
          },
          {
            title: 'Project',
            nodes: ['Time-phased view', 'Days-of-stock projection', 'Stockout date estimate', 'Target buffer'],
          },
          {
            title: 'Recommend',
            nodes: ['Order qty', 'Earliest order date', 'Vendor / source', 'Buyer queue'],
          },
          {
            title: 'Commit',
            nodes: ['Accept / modify / defer', 'PO trigger', 'Plan vs commit log'],
          },
          {
            title: 'Learn',
            nodes: ['Receipt vs plan', 'Accuracy track', 'Param tuning'],
          },
        ],
        workflowNodes: ['Demand forecast', 'Days-of-stock projection', 'Order qty', 'Receipt vs plan'],
      },
    ],
  },
];

/**
 * B2B ERP modules used by the first (Custom ERP) accordion section when the
 * B2B/DTC toggle is set to B2B. Sourced from the B2B furniture retail ERP
 * reference (multi-vendor dropship, configurable SKUs, freight tiers, credit
 * terms, quote-to-order, lateship management).
 *
 * @type {BusinessFunction[]}
 */
const erpModulesB2B = [
  {
    title: 'Inventory Management',
    summary:
      'Configurable SKU catalog with per-variant lead times, dimensional attributes, vendor linkage, and availability signals - built for thousands of orderable variants per parent item.',
    automations: [
      {
        title: 'Configurable SKU & variant catalog',
        summary:
          'Parent item → variant axes (fabric, finish, size) → child SKUs → per-SKU pricing → vendor link → availability flags',
        description:
          'Models furniture and configurable B2B catalogs the way they actually work - thousands of orderable variants per parent item:\n\n' +
          '- Parent item carries collection, vendor, marketing content, and merchandising attributes\n' +
          '- Each combination of fabric, color, finish, size, and configuration is a distinct child SKU with its own SKU number, customer-facing description, and availability flag\n' +
          '- Pricing layers stored at the SKU level: cost, list, MAP floor, sell, surcharge - automatically applied at order entry per account tier\n' +
          '- Rich attributes (dimensions, weight, materials, freight class) live in the same record so freight quoting and product display stay in sync\n' +
          '- Availability signals (in stock, back-ordered until [date], discontinued) propagate from catalog into order lines and customer communications',
        workflowNodeStacks: [
          {
            title: 'Parent item',
            nodes: ['Item master', 'Collection group', 'Vendor link', 'Marketing content', 'Status flag'],
          },
          {
            title: 'Variant axes',
            nodes: ['Fabric', 'Color / finish', 'Size / config', 'Combination matrix'],
          },
          {
            title: 'Per-SKU records',
            nodes: ['SKU number', 'Customer description', 'Availability flag', 'Image set'],
          },
          {
            title: 'Pricing layers',
            nodes: ['Cost', 'List', 'MAP floor', 'Sell', 'Surcharge'],
          },
          {
            title: 'Attributes',
            nodes: ['Dimensions', 'Weight / cube', 'Materials', 'Freight class'],
          },
        ],
        workflowNodes: ['Item master', 'Combination matrix', 'Availability flag', 'Sell'],
      },
      {
        title: 'Per-SKU lead time engine',
        summary:
          'SKU lead time min/max → vendor schedule → backorder ETA → promise date calc → revision tracking',
        description:
          'Lead times live where they actually vary - at the SKU level, not the item level:\n\n' +
          '- Stores min and max lead time per SKU per vendor (a standard fabric ships in 2 weeks; the same sofa in custom velvet ships in 12)\n' +
          '- Pulls from vendor production schedules and historical actuals to keep the values honest, not aspirational\n' +
          '- Calculates a customer-facing promise date at quote and order time, including freight transit\n' +
          '- Captures every ship date revision in a delivery-date history so vendor accountability and lateship attribution have hard numbers\n' +
          '- Surfaces back-in-stock dates for lateship recovery so reps and customers know when discontinued or delayed SKUs return',
        workflowNodeStacks: [
          {
            title: 'Sources',
            nodes: ['Vendor schedule', 'Historical actuals', 'Production calendar', 'Material lead times'],
          },
          {
            title: 'Per-SKU value',
            nodes: ['Min lead time', 'Max lead time', 'Confidence band', 'Last verified date'],
          },
          {
            title: 'Promise date',
            nodes: ['Lead time pull', 'Freight transit add', 'Buffer rule', 'Quote / order stamp'],
          },
          {
            title: 'Revisions',
            nodes: ['Original promise', 'Revised date', 'Revision history', 'Lateship flag'],
          },
        ],
        workflowNodes: ['Vendor schedule', 'Min lead time', 'Quote / order stamp', 'Revision history'],
      },
      {
        title: 'Vendor collection groupings & cross-sell',
        summary:
          'Collection membership → coordinated piece detection → cross-sell prompts → batch ordering hints',
        description:
          'Furniture sells in collections - the catalog reflects that and uses it operationally:\n\n' +
          '- Each item belongs to one or more vendor collections (e.g., "Westfield Living Room")\n' +
          '- Cross-sell engine surfaces coordinated pieces (sofa + matching loveseat + accent chair) at quote and order entry\n' +
          '- Color/finish dimension powers "complete the look" filtering across collections\n' +
          '- Reps and the storefront see suggested add-ons; system also flags batch-ordering opportunities to consolidate vendor POs\n' +
          '- Collection-level performance reporting shows which collections drive the most basket size and gross margin',
        workflowNodeStacks: [
          {
            title: 'Membership',
            nodes: ['Collection master', 'Item / SKU link', 'Color dimension', 'Coordination tag'],
          },
          {
            title: 'Cross-sell',
            nodes: ['Quote context', 'Suggested pieces', 'Color match filter', 'Add to quote'],
          },
          {
            title: 'Operational use',
            nodes: ['Batch PO hint', 'Single-vendor consolidation', 'Lead-time alignment'],
          },
          {
            title: 'Reporting',
            nodes: ['Collection AOV', 'Margin by collection', 'Attach rate'],
          },
        ],
        workflowNodes: ['Collection master', 'Suggested pieces', 'Batch PO hint', 'Collection AOV'],
      },
      {
        title: 'Vendor catalog ingest & change audit',
        summary: 'Vendor file → staging DB → diff vs catalog → enrichment → approve → publish + audit log',
        description:
          'Loads vendor catalogs into the system safely - changes don\'t hit production until a human approves:\n\n' +
          '- Ingests vendor catalog files (CSV, Excel, EDI 832, custom feeds) into a staging area separate from the live catalog\n' +
          '- Diffs every line against the existing catalog: new SKUs, price changes, MAP changes, lead-time changes, discontinued items\n' +
          '- Enriches with image links, attribute completion, and freight class lookups before publish\n' +
          '- Buyer / merchandiser reviews the diff and approves in batches; rejected lines stay in staging\n' +
          '- Every change written to a daily catalog audit (ListItemsEditedPreviousDay) so any team can trace when a SKU spec moved',
        workflowNodeStacks: [
          {
            title: 'Ingest',
            nodes: ['CSV / Excel / EDI', 'Staging DB', 'Per-vendor mapping', 'Validation rules'],
          },
          {
            title: 'Diff',
            nodes: ['New SKU detect', 'Price change', 'Lead-time change', 'Discontinued flag'],
          },
          {
            title: 'Enrich',
            nodes: ['Image link', 'Attribute fill', 'Freight class', 'Collection assign'],
          },
          {
            title: 'Approve',
            nodes: ['Diff review screen', 'Batch approve', 'Reject queue', 'Publish to live'],
          },
          {
            title: 'Audit',
            nodes: ['Daily edit log', 'Field-level history', 'Reverse / restore'],
          },
        ],
        workflowNodes: ['Staging DB', 'Price change', 'Image link', 'Daily edit log'],
      },
      {
        title: 'Discontinued / EOL & substitution workflow',
        summary: 'EOL signal → impact analysis → substitution mapping → customer / quote review → catalog retirement',
        description:
          'Handles end-of-life SKUs without leaving open orders or quotes stranded:\n\n' +
          '- Captures EOL signal from the vendor (planned discontinuation date, last-time-buy window)\n' +
          '- Runs impact analysis: open orders, open quotes, in-transit POs, accounts that bought it in the last 12 months\n' +
          '- Maps a recommended substitution SKU (same vendor, same collection, similar specs) for reps and storefront\n' +
          '- Notifies impacted customers / accounts proactively with the substitute and any pricing impact\n' +
          '- Retires the catalog record on the EOL date with full lineage so historical orders remain queryable',
        workflowNodeStacks: [
          {
            title: 'Signal',
            nodes: ['Vendor EOL notice', 'Last-time-buy window', 'Discontinued tag stage'],
          },
          {
            title: 'Impact',
            nodes: ['Open orders', 'Open quotes', 'In-transit POs', '12-month buyers'],
          },
          {
            title: 'Substitute',
            nodes: ['Same-vendor pick', 'Spec match', 'Pricing comparison', 'Storefront swap'],
          },
          {
            title: 'Communicate',
            nodes: ['Account notify', 'Rep brief', 'Quote re-issue', 'Order replacement offer'],
          },
          {
            title: 'Retire',
            nodes: ['Catalog status: EOL', 'Search hide', 'Historical lineage', 'Audit log'],
          },
        ],
        workflowNodes: ['Vendor EOL notice', '12-month buyers', 'Same-vendor pick', 'Catalog status: EOL'],
      },
    ],
  },
  {
    title: 'Procurement',
    summary:
      'Multi-vendor order splitting, PO per vendor, ship-date revision tracking, and vendor performance scorecards - the heart of dropship furniture operations.',
    automations: [
      {
        title: 'Multi-vendor order split & PO generation',
        summary:
          'Customer order → vendor grouping → vendor order records → PO per vendor → transmit → acknowledgment tracking',
        description:
          'Splits every customer order into clean per-vendor work and generates the right PO automatically:\n\n' +
          '- Customer order header carries the commercial relationship; below it the system creates one VendorOrder per vendor in the basket\n' +
          '- Each VendorOrder has its own line items with cost (not sell) pricing, expected ship date, status lifecycle, and ship-to address\n' +
          '- Generates a Purchase Order per vendor with the vendor SKU, quantity, cost, accessorial requirements, and delivery instructions\n' +
          '- Transmits via the right channel per vendor (email, EDI, vendor portal API) and tracks acknowledgment\n' +
          '- Maintains the three-layer hierarchy CustomerOrder → VendorOrder → VendorPO so each level can be queried, reported, and audited independently',
        workflowNodeStacks: [
          {
            title: 'Order intake',
            nodes: ['Customer order header', 'Line items', 'Bill-to / ship-to', 'Account terms'],
          },
          {
            title: 'Vendor split',
            nodes: ['Group by vendor', 'VendorOrder create', 'Cost pricing', 'Per-vendor ship date'],
          },
          {
            title: 'PO generation',
            nodes: ['Vendor SKU map', 'PO draft', 'Accessorial flags', 'Ship-to instructions'],
          },
          {
            title: 'Transmit & track',
            nodes: ['Email / EDI / portal', 'Send log', 'Acknowledgment watch', 'Status lifecycle'],
          },
        ],
        workflowNodes: ['Group by vendor', 'PO draft', 'Email / EDI / portal', 'Acknowledgment watch'],
      },
      {
        title: 'Vendor performance & lead-time learning',
        summary:
          'Promised vs actual capture → on-time rate → lead-time accuracy → quality / damage rate → composite scorecard',
        description:
          'Holds vendors accountable with hard numbers, not anecdotes:\n\n' +
          '- Captures promised ship date and actual ship date on every PO line; calculates on-time-in-full per vendor per SKU\n' +
          '- Lead time accuracy compares the at-PO lead time against actuals so planning parameters update from real data\n' +
          '- Tracks quality, damage, and replacement rate per vendor; rolls up into a composite vendor rank\n' +
          '- Surfaces vendors slipping on cost, lead time, or quality so sourcing can negotiate or shift volume\n' +
          '- Logs vendor communications (calls, revision requests, exception resolutions) against the PO so any rep can reconstruct the conversation',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Promised ship date', 'Actual ship date', 'Damage / replacement', 'Cost variance'],
          },
          {
            title: 'Compute',
            nodes: ['OTIF rate', 'Lead-time accuracy', 'Defect rate', 'Cost trend'],
          },
          {
            title: 'Rank',
            nodes: ['Composite score', 'Tier assignment', 'Watch list', 'Preferred status'],
          },
          {
            title: 'Communications log',
            nodes: ['PO notes', 'Email log', 'Call log', 'Revision history'],
          },
          {
            title: 'Action',
            nodes: ['Sourcing review', 'Volume reallocation', 'Contract renegotiation'],
          },
        ],
        workflowNodes: ['Actual ship date', 'OTIF rate', 'Composite score', 'PO notes'],
      },
      {
        title: 'PO lifecycle: ack → ship → receipt → invoice match',
        summary:
          'PO sent → vendor ack → ship date revision → tracking → receipt → vendor invoice match → AP feed',
        description:
          'A complete PO lifecycle so nothing falls through the cracks between order and payment:\n\n' +
          '- Tracks PO status from sent through acknowledged, in production, shipped, delivered, and invoiced\n' +
          '- Vendor confirmations and revision requests update the PO and trigger customer-facing communication when a ship date moves\n' +
          '- Tracking number and carrier captured (parsed from PO notes when vendors do not return structured data)\n' +
          '- Goods receipt event closes the PO line and unlocks the vendor invoice for matching\n' +
          '- Vendor invoice matched against PO + receipt with tolerances; clean matches auto-post, variances route to AP for review',
        workflowNodeStacks: [
          {
            title: 'Status timeline',
            nodes: ['Sent', 'Acknowledged', 'In production', 'Shipped', 'Delivered', 'Invoiced'],
          },
          {
            title: 'Vendor responses',
            nodes: ['Ack capture', 'Ship date revision', 'Customer notify', 'Hold flag'],
          },
          {
            title: 'Tracking',
            nodes: ['Tracking number parse', 'Carrier detect', 'Multi-leg link', 'Customer portal push'],
          },
          {
            title: 'Receipt',
            nodes: ['Goods received', 'Damage flag', 'Quantity reconcile', 'PO line close'],
          },
          {
            title: 'Invoice match',
            nodes: ['PO + receipt match', 'Tolerance check', 'Auto-post clean', 'Variance to AP'],
          },
        ],
        workflowNodes: ['Acknowledged', 'Ship date revision', 'Goods received', 'Auto-post clean'],
      },
      {
        title: 'New vendor onboarding & data import',
        summary: 'Vendor application → docs collection → catalog import → terms setup → first PO test → live status',
        description:
          'Onboards a new vendor in days instead of weeks - and the data lands clean:\n\n' +
          '- Vendor application captures contact, banking, tax (W-9), insurance, lead-time norms, and freight terms\n' +
          '- Compliance docs (insurance certs, tax IDs, signed agreements) collected and stored against the vendor master\n' +
          '- Initial catalog import via the staged ingest workflow with vendor-specific field mapping\n' +
          '- Terms setup: payment terms, MOQ, accessorial handling, tracking format expectations\n' +
          '- First PO runs as a test transaction; once cleared end-to-end, vendor is flipped to live status',
        workflowNodeStacks: [
          {
            title: 'Apply',
            nodes: ['Vendor application form', 'Contact / banking', 'Tax (W-9)', 'Insurance cert'],
          },
          {
            title: 'Compliance',
            nodes: ['Doc upload', 'Cert expiry watch', 'Signed agreement', 'Approval gate'],
          },
          {
            title: 'Catalog',
            nodes: ['Field mapping', 'Staged import', 'Sample review', 'Initial publish'],
          },
          {
            title: 'Terms',
            nodes: ['Payment terms', 'MOQ', 'Accessorial defaults', 'Tracking format'],
          },
          {
            title: 'Go live',
            nodes: ['Test PO', 'End-to-end verify', 'Live status flip'],
          },
        ],
        workflowNodes: ['Vendor application form', 'Doc upload', 'Field mapping', 'Test PO'],
      },
      {
        title: 'Replenishment PO for stocked SKUs',
        summary: 'Stocked-SKU reorder point → vendor + lead-time pull → consolidated PO → inbound schedule → receipt match',
        description:
          'For SKUs you actually stock (not pure dropship), automates the replenishment buy:\n\n' +
          '- Identifies stocked SKUs that hit reorder threshold based on velocity and current on-hand\n' +
          '- Consolidates same-vendor reorders into a single PO to maximize freight efficiency and hit MOQs\n' +
          '- Sizes the order to a target days-of-stock with seasonality and promo adjustments layered in\n' +
          '- Schedules inbound to consolidation warehouse and pre-stages dock / labor capacity\n' +
          '- Receipts match against PO; variances feed vendor scorecard and trigger AP three-way match',
        workflowNodeStacks: [
          {
            title: 'Trigger',
            nodes: ['Reorder threshold hit', 'Velocity check', 'Promo / seasonality overlay'],
          },
          {
            title: 'Size',
            nodes: ['Target days-of-stock', 'MOQ check', 'Container fill optimize', 'Buyer review'],
          },
          {
            title: 'Consolidate',
            nodes: ['Same-vendor batch', 'Multi-SKU PO', 'Freight tier select'],
          },
          {
            title: 'Schedule',
            nodes: ['Inbound dock slot', 'Labor capacity', 'Pre-receive pack'],
          },
          {
            title: 'Receive',
            nodes: ['Goods receipt', 'Variance flag', 'Scorecard update', 'AP match trigger'],
          },
        ],
        workflowNodes: ['Reorder threshold hit', 'Target days-of-stock', 'Same-vendor batch', 'Goods receipt'],
      },
    ],
  },
  {
    title: 'Order Management',
    summary:
      'Quote-to-order, B2B account model with bill-to/ship-to, pricing tiers, credit terms, tax exemption, and full lifecycle audit - the commercial layer purpose-built for B2B.',
    automations: [
      {
        title: 'Quote-to-order conversion',
        summary:
          'Quote draft → pricing + terms applied → customer approval → one-click conversion → preserved lineage',
        description:
          'Quotes are first-class records, not throwaway documents - and they convert to orders without re-entry:\n\n' +
          '- Reps build quotes against the persistent customer master with account-specific pricing applied automatically\n' +
          '- Quote captures line items, special pricing, freight estimates, lead times, and free-form notes\n' +
          '- Customer-facing quote PDF generated with terms, valid-until date, and accept link\n' +
          '- One-click conversion preserves pricing, lines, and notes through to the order; quote remains linked for audit\n' +
          '- Win/loss tracking on quotes by rep, account, and product so sales can see what is closing and what is not',
        workflowNodeStacks: [
          {
            title: 'Build',
            nodes: ['Customer master pull', 'Tier pricing apply', 'Line items', 'Freight estimate'],
          },
          {
            title: 'Send',
            nodes: ['Quote PDF', 'Valid-until', 'Accept link', 'Email log entry'],
          },
          {
            title: 'Convert',
            nodes: ['One-click convert', 'Pricing preserved', 'Notes carried', 'Quote → Order link'],
          },
          {
            title: 'Analyze',
            nodes: ['Win / loss tag', 'Rep performance', 'Reason codes', 'Reporting'],
          },
        ],
        workflowNodes: ['Customer master pull', 'Quote PDF', 'One-click convert', 'Win / loss tag'],
      },
      {
        title: 'B2B account model: bill-to, ship-to, pricing tier, credit',
        summary:
          'Persistent customer master → bill-to vs ship-to → pricing tier → credit limit → tax exemption → applied at every order',
        description:
          'Models the way B2B actually buys - persistent accounts, not anonymous shoppers:\n\n' +
          '- Customer master holds the account, contacts, assigned rep, history, and lifetime value\n' +
          '- Bill-to and ship-to are independent records linked at the order level (HQ pays, 15 job sites receive)\n' +
          '- Pricing tier applied automatically at order entry: account-specific contracts, volume discounts, MAP floors\n' +
          '- Credit terms tracked per account (Net 30/60/90, prepay for new) with credit limit, outstanding balance, and exposure flag\n' +
          '- Tax exemption certificates stored per account and applied automatically; retroactive corrections supported',
        workflowNodeStacks: [
          {
            title: 'Customer master',
            nodes: ['Account profile', 'Contacts', 'Assigned rep', 'LTV / history'],
          },
          {
            title: 'Bill-to / ship-to',
            nodes: ['Bill-to record', 'Ship-to record(s)', 'Per-order link', 'Address validate'],
          },
          {
            title: 'Pricing tier',
            nodes: ['Tier assignment', 'Contract overrides', 'Volume discount', 'MAP floor'],
          },
          {
            title: 'Credit',
            nodes: ['Term (Net 30/60/90)', 'Credit limit', 'Outstanding balance', 'Exposure flag'],
          },
          {
            title: 'Tax exemption',
            nodes: ['Cert on file', 'Auto-apply', 'Expiry watch', 'Retroactive credit'],
          },
        ],
        workflowNodes: ['Account profile', 'Ship-to record(s)', 'Tier assignment', 'Credit limit'],
      },
      {
        title: 'Order lifecycle, status history & exception alerting',
        summary:
          'State machine → every transition timestamped → daily exception alerts → rep dashboard → CX visibility',
        description:
          'A structured lifecycle so reps and customers always know exactly where an order stands:\n\n' +
          '- Status lifecycle: pending, confirmed, backordered, in transit, delivered, invoiced, closed - with cancellation and replacement branches\n' +
          '- Every transition recorded with old status, new status, timestamp, and actor for full audit\n' +
          '- Daily exception emails fire automatically: open orders without POs, missing tracking past threshold, hold-for-payment, white glove orders, lateships back-in-stock today\n' +
          '- Rep activity dashboard pulls hot orders, priority accounts, and overdue follow-ups\n' +
          '- Customer portal and CX agents read from the same lifecycle so the answer is always consistent',
        workflowNodeStacks: [
          {
            title: 'Lifecycle',
            nodes: ['Pending', 'Confirmed', 'Backordered', 'In transit', 'Delivered', 'Invoiced', 'Closed'],
          },
          {
            title: 'Branches',
            nodes: ['Hold for payment', 'Cancellation', 'Replacement', 'Return / credit'],
          },
          {
            title: 'Audit',
            nodes: ['Old → new status', 'Timestamp', 'Actor (rep / system)', 'Reason code'],
          },
          {
            title: 'Daily alerts',
            nodes: ['Orders w/o POs', 'Missing tracking >120d', 'Hold-for-payment', 'White glove queue', 'Lateship in stock today'],
          },
          {
            title: 'Surface',
            nodes: ['Rep dashboard', 'Hot orders view', 'Customer portal', 'CX agent screen'],
          },
        ],
        workflowNodes: ['Confirmed', 'Hold for payment', 'Old → new status', 'Orders w/o POs'],
      },
      {
        title: 'Replacement & cancellation history workflow',
        summary: 'Cancel / replace request → reason capture → original record preserved → linked replacement → finance settle',
        description:
          'Preserves history when orders cancel or replace - no silent deletes, full audit trail:\n\n' +
          '- Cancel request captures reason (customer change of mind, damage, vendor unable to fulfill, finance hold) with structured codes\n' +
          '- Original order stays intact with cancellation history (CustomerOrderCancellationHistory) - never overwritten\n' +
          '- Replacement order links back to the original via VendorReplacementOrder so the lineage is fully traceable\n' +
          '- Finance entries reverse / re-issue correctly: refund or credit on cancel, new charge on replacement\n' +
          '- Reason analytics surface why orders die so operations can fix root causes (vendor, freight, expectation, fraud)',
        workflowNodeStacks: [
          {
            title: 'Initiate',
            nodes: ['Cancel / replace request', 'Reason code', 'Originator (CX / rep / system)', 'Approval gate'],
          },
          {
            title: 'Preserve',
            nodes: ['Original record kept', 'Cancellation history entry', 'Status transition log', 'Document snapshot'],
          },
          {
            title: 'Link',
            nodes: ['Replacement order create', 'Lineage link', 'Vendor PO (priority)', 'Customer notify'],
          },
          {
            title: 'Settle',
            nodes: ['Refund / credit', 'New charge', 'GL adjustment', 'AR / AP entries'],
          },
          {
            title: 'Analyze',
            nodes: ['Reason rollup', 'Vendor attribution', 'Cancel rate trend', 'Root-cause review'],
          },
        ],
        workflowNodes: ['Reason code', 'Cancellation history entry', 'Replacement order create', 'Reason rollup'],
      },
      {
        title: 'Configure-to-order / custom variant entry',
        summary: 'Customer spec → variant builder → vendor confirms feasibility → custom SKU + price → committed lead time',
        description:
          'Handles configure-to-order furniture - custom fabric, finish, dimension - without breaking the catalog:\n\n' +
          '- Variant builder lets reps select fabric, finish, size, configuration from the parent item\'s allowed axes\n' +
          '- Custom (non-catalog) selections route to the vendor for feasibility, price, and lead-time confirmation\n' +
          '- On vendor confirm, system creates a one-off SKU with full traceability back to the parent item\n' +
          '- Quote / order carries the custom spec, custom price, and committed (longer) lead time\n' +
          '- All custom orders surface in a CTO queue for production tracking and proactive customer comms',
        workflowNodeStacks: [
          {
            title: 'Configure',
            nodes: ['Parent item pick', 'Allowed-axis selector', 'Spec validate', 'Visual preview'],
          },
          {
            title: 'Quote vendor',
            nodes: ['Vendor RFQ (custom)', 'Feasibility check', 'Cost + lead time', 'COA / sample option'],
          },
          {
            title: 'Create',
            nodes: ['One-off SKU', 'Parent linkage', 'Custom spec doc', 'Pricing apply'],
          },
          {
            title: 'Track',
            nodes: ['CTO queue', 'Production status', 'Promise date', 'Customer comms'],
          },
        ],
        workflowNodes: ['Allowed-axis selector', 'Vendor RFQ (custom)', 'One-off SKU', 'CTO queue'],
      },
      {
        title: 'Hot orders & priority lane',
        summary: 'Priority signal → hot flag → priority queue → expedited routing → daily exec view',
        description:
          'Flags high-value or high-stakes orders so they jump the queue and stay visible:\n\n' +
          '- Priority signal sources: order value above threshold, VIP account, contractual SLA, escalation flag, late-stage rescue\n' +
          '- Hot orders surface on a dedicated dashboard (vwHotOrders) seen by ops, sales, and exec\n' +
          '- Routing engine prioritizes expedited freight, fastest carrier option, and pre-cleared hold-for-payment review\n' +
          '- Daily exec digest summarizes hot orders, status, owner, and any blockers\n' +
          '- Resolution tracking shows time-to-clear so the priority lane stays effective and doesn\'t become noise',
        workflowNodeStacks: [
          {
            title: 'Signal',
            nodes: ['Value > $X', 'VIP account', 'Contract SLA', 'Escalation flag'],
          },
          {
            title: 'Flag',
            nodes: ['Hot order tag', 'Priority queue', 'Owner assignment', 'SLA timer'],
          },
          {
            title: 'Route',
            nodes: ['Expedited freight pick', 'Fast-lane warehouse', 'Pre-cleared hold review'],
          },
          {
            title: 'Surface',
            nodes: ['Hot orders dashboard', 'Daily exec digest', 'Slack / email alert'],
          },
          {
            title: 'Resolve',
            nodes: ['Time-to-clear track', 'Outcome log', 'Process feedback'],
          },
        ],
        workflowNodes: ['VIP account', 'Hot order tag', 'Expedited freight pick', 'Hot orders dashboard'],
      },
    ],
  },
  {
    title: 'Warehouse Management',
    summary:
      'For dropship-heavy B2B furniture: vendor receipt at consolidation centers, white glove staging, damage triage, and replacement orchestration.',
    automations: [
      {
        title: 'Vendor receipt & inspection at consolidation',
        summary:
          'Vendor delivery → ASN match → unload + inspect → photo capture → damage code → inventory or quarantine',
        description:
          'Even in dropship, consolidation receiving is the last quality gate before the customer:\n\n' +
          '- Pre-receives against the vendor PO and ASN so the dock team knows what is arriving\n' +
          '- Scans and counts on receipt; any short-ship or overage is flagged immediately\n' +
          '- Photo-documented inspection for damage, finish defects, and packaging issues\n' +
          '- Damage codes routed to vendor (chargeback) and replacement workflow (customer recovery)\n' +
          '- Clean goods released to staging or directly to outbound; damaged goods quarantined with full audit trail',
        workflowNodeStacks: [
          {
            title: 'Pre-receive',
            nodes: ['ASN ingest', 'Vendor PO match', 'Dock schedule', 'Expected list'],
          },
          {
            title: 'Receive',
            nodes: ['Truck check-in', 'Unload + scan', 'Quantity verify', 'Variance flag'],
          },
          {
            title: 'Inspect',
            nodes: ['Visual inspection', 'Photo capture', 'Damage code', 'Severity tag'],
          },
          {
            title: 'Disposition',
            nodes: ['Release to staging', 'Quarantine', 'Vendor chargeback', 'Replacement trigger'],
          },
        ],
        workflowNodes: ['ASN ingest', 'Quantity verify', 'Damage code', 'Replacement trigger'],
      },
      {
        title: 'White glove & freight tier staging',
        summary:
          'Order tier → staging zone → accessorial pick → blanket wrap → final mile carrier handoff',
        description:
          'Stages outbound by service tier so white glove and standard freight do not collide:\n\n' +
          '- Reads the order freight tier (white glove, threshold delivery, curbside, parcel) and routes to the correct staging zone\n' +
          '- Picks accessorial requirements (blankets, straps, padding, assembly tools) per order\n' +
          '- Blanket-wraps and consolidates pieces of multi-line orders so they ship together when possible\n' +
          '- Generates final-mile manifests for white glove carriers with delivery instructions, customer contact, and special handling notes\n' +
          '- Confirms hand-off with photo and signature back to the order timeline',
        workflowNodeStacks: [
          {
            title: 'Sort',
            nodes: ['Tier read (W1 / W2 / standard)', 'Staging zone assign', 'Multi-line consolidation'],
          },
          {
            title: 'Prep',
            nodes: ['Accessorial pick', 'Blanket wrap', 'Strap / pad', 'Label affix'],
          },
          {
            title: 'Manifest',
            nodes: ['Final-mile carrier select', 'Delivery instructions', 'Customer contact', 'Window confirm'],
          },
          {
            title: 'Handoff',
            nodes: ['Carrier load scan', 'Photo proof', 'Signature capture', 'Order timeline event'],
          },
        ],
        workflowNodes: ['Tier read (W1 / W2 / standard)', 'Blanket wrap', 'Final-mile carrier select', 'Photo proof'],
      },
      {
        title: 'Damage triage & replacement orchestration',
        summary:
          'Damage report → photo + severity → repair vs replace → vendor replacement order → customer recovery',
        description:
          'Turns damage into a managed workflow rather than a customer service fire drill:\n\n' +
          '- Inbound damage at receiving and outbound damage at delivery both feed the same triage queue\n' +
          '- Severity scoring decides repair-in-place, partial credit, or full replacement\n' +
          '- Replacement automatically generates a VendorReplacementOrder linked to the original; vendor PO issued with priority flag\n' +
          '- Customer kept in the loop with proactive communication (email + SMS) at each step\n' +
          '- Damage history feeds vendor performance scorecards and packaging-improvement requests',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Damage report', 'Photo evidence', 'Severity score', 'Linked order / line'],
          },
          {
            title: 'Decide',
            nodes: ['Repair-in-place', 'Partial credit', 'Full replacement', 'Approval threshold'],
          },
          {
            title: 'Replace',
            nodes: ['Replacement order', 'Vendor PO (priority)', 'Promise date update', 'Customer notify'],
          },
          {
            title: 'Learn',
            nodes: ['Vendor scorecard hit', 'Packaging feedback', 'Damage trend dashboard'],
          },
        ],
        workflowNodes: ['Photo evidence', 'Full replacement', 'Vendor PO (priority)', 'Damage trend dashboard'],
      },
      {
        title: 'Cross-dock direct-to-customer flow',
        summary: 'Inbound vendor delivery → ASN identifies cross-dock orders → route past put-away → outbound dock prep → customer ship',
        description:
          'For order-tagged inbound, skips put-away entirely and ships straight out:\n\n' +
          '- ASN tagging identifies which inbound items belong to specific outbound customer orders\n' +
          '- Receiving routes those items past the put-away workflow directly to the outbound staging zone\n' +
          '- Quality inspection still happens but on the cross-dock path, not the storage path\n' +
          '- Outbound documents (label, BOL, delivery instructions) pre-staged so handoff is immediate\n' +
          '- Reduces handle-time, storage cost, and overall lead-time-from-PO-to-customer',
        workflowNodeStacks: [
          {
            title: 'Tag',
            nodes: ['Order ↔ inbound match', 'ASN cross-dock flag', 'Pre-stage outbound docs'],
          },
          {
            title: 'Receive',
            nodes: ['Inbound scan', 'Cross-dock route', 'Skip put-away', 'Quality check'],
          },
          {
            title: 'Stage',
            nodes: ['Outbound dock zone', 'Carrier alignment', 'Label + BOL ready'],
          },
          {
            title: 'Ship',
            nodes: ['Carrier load', 'Tracking sync', 'Customer notify', 'Order timeline'],
          },
        ],
        workflowNodes: ['Order ↔ inbound match', 'Cross-dock route', 'Outbound dock zone', 'Carrier load'],
      },
      {
        title: 'Project & hold storage management',
        summary: 'Project order → consolidated receipt → hold zone → completion check → coordinated release → customer delivery',
        description:
          'Manages multi-line, multi-vendor B2B project orders that arrive over weeks and ship together:\n\n' +
          '- Marks orders as project or hold-for-completion at order entry (e.g., a hotel renovation buying 80 pieces from 12 vendors)\n' +
          '- Routes inbound items to a dedicated hold zone instead of general inventory; each item tagged to the project\n' +
          '- Tracks completion percentage per project and surfaces what\'s still outstanding by vendor and SKU\n' +
          '- Coordinated release on completion: builds a single outbound shipment with white-glove staging\n' +
          '- Customer-visible project tracker shows progress so the account always knows where things stand',
        workflowNodeStacks: [
          {
            title: 'Tag',
            nodes: ['Project order flag', 'Customer / project ID', 'Hold-for-completion rule', 'Outstanding line tracker'],
          },
          {
            title: 'Receive',
            nodes: ['Inbound to hold zone', 'Per-line tagging', 'Quality check', 'Completion % update'],
          },
          {
            title: 'Surface',
            nodes: ['Project dashboard', 'Outstanding by vendor', 'Outstanding by SKU', 'ETA roll-up'],
          },
          {
            title: 'Release',
            nodes: ['Completion check', 'Consolidated outbound', 'White-glove staging', 'Customer scheduling'],
          },
        ],
        workflowNodes: ['Project order flag', 'Inbound to hold zone', 'Project dashboard', 'Consolidated outbound'],
      },
    ],
  },
  {
    title: 'Freight & Fulfillment',
    summary:
      'Freight tier modeling, accessorial selection, multi-leg tracking (vendor → consolidator → customer), and lateship management - freight is half the operational complexity in B2B furniture.',
    automations: [
      {
        title: 'Freight tier & accessorial selection',
        summary:
          'Order context → tier rule → accessorial requirements → carrier filter → quote → committed cost',
        description:
          'Picks the right freight package for every furniture order - and prices it correctly upfront:\n\n' +
          '- Determines required tier from order context: white glove, threshold, curbside, parcel - based on item dimensions, weight, and customer preference\n' +
          '- Adds accessorial requirements automatically: liftgate, inside delivery, stair carry, debris removal, assembly\n' +
          '- Filters eligible carriers and pulls quotes only from those that can fulfill the tier and accessorials\n' +
          '- Surfaces total committed freight cost so margin is known at order time, not at vendor invoice time\n' +
          '- Special handling flags for restricted destinations (Alaska, Hawaii, remote zones) trigger upcharge or alternative routing',
        workflowNodeStacks: [
          {
            title: 'Determine tier',
            nodes: ['Item dim / weight', 'Customer preference', 'Address type (residential / commercial)', 'Tier rule engine'],
          },
          {
            title: 'Accessorials',
            nodes: ['Liftgate', 'Inside delivery', 'Stair carry', 'Debris removal', 'Assembly'],
          },
          {
            title: 'Quote',
            nodes: ['Eligible carrier filter', 'Parallel quote pull', 'Accessorial price add', 'Total cost commit'],
          },
          {
            title: 'Special handling',
            nodes: ['AK / HI flag', 'Remote zone check', 'Upcharge apply', 'Alt routing'],
          },
        ],
        workflowNodes: ['Item dim / weight', 'Stair carry', 'Eligible carrier filter', 'AK / HI flag'],
      },
      {
        title: 'Multi-leg shipment tracking',
        summary:
          'Vendor pickup → linehaul → consolidator → final-mile → customer delivery (each leg tracked + parsed from notes if unstructured)',
        description:
          'B2B furniture shipments rarely move in a single leg - the system tracks every hop:\n\n' +
          '- Captures tracking from vendor pickup, linehaul carrier, consolidator inbound, final-mile carrier, and customer delivery\n' +
          '- Parses tracking number and carrier from PO notes when vendors return updates as free text rather than structured data\n' +
          '- Normalizes carrier-specific status codes into a consistent set across all legs\n' +
          '- Surfaces the full multi-leg timeline to reps and customers so a "where is my order" question takes one screen, not three\n' +
          '- Stuck legs trigger automatic escalation with a Voice AI carrier call to chase resolution',
        workflowNodeStacks: [
          {
            title: 'Leg sources',
            nodes: ['Vendor pickup', 'Linehaul', 'Consolidator inbound', 'Final-mile', 'Customer delivery'],
          },
          {
            title: 'Ingest',
            nodes: ['Carrier API', 'Note parsing', 'Tracking extract', 'Carrier extract'],
          },
          {
            title: 'Normalize',
            nodes: ['Status map', 'Event dedup', 'Order timeline merge'],
          },
          {
            title: 'Surface',
            nodes: ['Rep view', 'Customer portal', 'CX agent screen'],
          },
          {
            title: 'Exceptions',
            nodes: ['Stuck leg detect', 'Auto-escalate', 'Voice AI carrier call', 'CX ticket'],
          },
        ],
        workflowNodes: ['Vendor pickup', 'Note parsing', 'Status map', 'Stuck leg detect'],
      },
      {
        title: 'Lateship monitoring & customer recovery',
        summary:
          'Promise date breach → lateship flag → root-cause attribution → customer comms → recovery action',
        description:
          'Furniture\'s most common operational failure handled with a structured workflow, not ad-hoc emails:\n\n' +
          '- Compares actual ship date against original promised ship date on every line; flags lateships automatically\n' +
          '- Attributes the cause (vendor delay, freight congestion, damage, replacement) using PO and shipment data\n' +
          '- Lateship-back-in-stock-today report fires daily so reps can re-engage stalled orders the moment a SKU returns\n' +
          '- Drafts proactive customer communication with the new ETA and recovery offer (credit, expedited freight, swap to in-stock alternative)\n' +
          '- Lateship rate by vendor and by SKU rolls into vendor scorecards and sourcing decisions',
        workflowNodeStacks: [
          {
            title: 'Detect',
            nodes: ['Original promise', 'Actual ship date', 'Variance calc', 'Lateship flag'],
          },
          {
            title: 'Attribute',
            nodes: ['Vendor delay', 'Freight congestion', 'Damage / replacement', 'Reason tag'],
          },
          {
            title: 'Recover',
            nodes: ['New ETA pull', 'Customer email draft', 'Credit / expedite offer', 'Swap suggestion'],
          },
          {
            title: 'Daily ops',
            nodes: ['Lateship-in-stock-today', 'Rep work queue', 'Re-engage script'],
          },
          {
            title: 'Report',
            nodes: ['Lateship % by vendor', 'Lateship % by SKU', 'Sourcing review'],
          },
        ],
        workflowNodes: ['Variance calc', 'Vendor delay', 'New ETA pull', 'Lateship-in-stock-today'],
      },
      {
        title: 'Customer delivery appointment scheduling',
        summary: 'Order ready → window options → customer self-schedule → carrier confirm → reminder cadence → delivery',
        description:
          'Coordinates white-glove and threshold delivery appointments without the phone-tag:\n\n' +
          '- Carrier returns available windows for the destination ZIP\n' +
          '- Customer-facing scheduler (email + SMS link) lets them pick a window and confirm contact details\n' +
          '- Carrier confirmation locks the slot; system handles reschedules and waitlist\n' +
          '- Reminder cadence (T-3 days, T-1 day, morning-of) reduces failed-delivery and missed-appointment rates\n' +
          '- Day-of arrival window narrows as the truck progresses; customer gets live ETA',
        workflowNodeStacks: [
          {
            title: 'Offer',
            nodes: ['Order ready signal', 'Carrier window pull', 'Eligible-day calc', 'Pricing tier check'],
          },
          {
            title: 'Schedule',
            nodes: ['Self-schedule link', 'Email + SMS', 'Window pick', 'Contact confirm'],
          },
          {
            title: 'Confirm',
            nodes: ['Carrier lock', 'Reschedule handling', 'Waitlist queue'],
          },
          {
            title: 'Remind',
            nodes: ['T-3 reminder', 'T-1 reminder', 'Morning-of reminder', 'Day-of live ETA'],
          },
        ],
        workflowNodes: ['Carrier window pull', 'Self-schedule link', 'Carrier lock', 'Day-of live ETA'],
      },
      {
        title: 'Returns & in-transit damage claims',
        summary: 'Damage report → photo evidence → carrier claim → vendor charge-back → customer recovery → resolution log',
        description:
          'Handles freight damage claims as a structured workflow, not chaos:\n\n' +
          '- Customer or driver reports damage at delivery; photos and notes captured immediately\n' +
          '- System opens a carrier claim with required documentation (BOL, packing list, photos, freight class)\n' +
          '- Determines liability path: carrier (in-transit damage), vendor (manufacturing / packaging), or shared\n' +
          '- Customer recovery options offered: replacement, repair, partial credit, or full refund\n' +
          '- Resolution tracked end-to-end; recovered $ posted to GL credit and rolled into vendor / carrier scorecards',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Damage report (driver / customer)', 'Photo + notes', 'Linked order / line', 'Severity score'],
          },
          {
            title: 'Liability',
            nodes: ['BOL / packing list pull', 'In-transit vs origin', 'Carrier vs vendor', 'Shared liability split'],
          },
          {
            title: 'Claim',
            nodes: ['Carrier claim file', 'Vendor charge-back', 'Doc package', 'Status track'],
          },
          {
            title: 'Recover customer',
            nodes: ['Replacement', 'Repair option', 'Partial credit', 'Full refund'],
          },
          {
            title: 'Settle',
            nodes: ['Recovered $ post', 'GL credit', 'Scorecard update', 'Resolution log'],
          },
        ],
        workflowNodes: ['Damage report (driver / customer)', 'In-transit vs origin', 'Carrier claim file', 'Recovered $ post'],
      },
    ],
  },
  {
    title: 'Finance & Accounting',
    summary:
      'AR aging, credit terms enforcement, landed cost (FOB + freight + duties), vendor invoice matching, and clean QuickBooks/accounting feed - finance built for B2B credit-based commerce.',
    automations: [
      {
        title: 'Credit terms & AR aging',
        summary:
          'Account terms → invoice issue → due-date watch → aging buckets → dunning sequence → credit hold trigger',
        description:
          'Manages the credit relationship that defines B2B commerce:\n\n' +
          '- Each account carries terms (Net 30/60/90 or prepay), credit limit, and current outstanding balance\n' +
          '- Invoices generated on order fulfillment, posted to AR with due date and account context\n' +
          '- Aging buckets (current, 30, 60, 90+) recalculated continuously; aged balances surface on a daily exception report\n' +
          '- Dunning sequence triggers on schedule: friendly reminder → past-due notice → escalation to credit team\n' +
          '- New orders that would push the account over its credit limit hit a hold-for-payment status until cleared',
        workflowNodeStacks: [
          {
            title: 'Account setup',
            nodes: ['Term assignment', 'Credit limit', 'Term graduation rules'],
          },
          {
            title: 'Invoice & post',
            nodes: ['Fulfillment trigger', 'Invoice generate', 'AR post', 'Due date set'],
          },
          {
            title: 'Aging',
            nodes: ['Current', '1-30', '31-60', '61-90', '90+'],
          },
          {
            title: 'Dunning',
            nodes: ['Friendly reminder', 'Past-due notice', 'Credit team escalation', 'Collections handoff'],
          },
          {
            title: 'Credit control',
            nodes: ['Limit check at order', 'Hold-for-payment', 'Manual override (approver)', 'Release on payment'],
          },
        ],
        workflowNodes: ['Credit limit', 'AR post', '31-60', 'Hold-for-payment'],
      },
      {
        title: 'Landed cost: FOB + freight + duty + brokerage',
        summary:
          'Vendor invoice → ocean / inland freight → customs + duty → brokerage → port + receiving labor → allocated SKU cost',
        description:
          'Tracks the true cost of goods, not just what the vendor invoices:\n\n' +
          '- Captures every cost component per receipt: vendor invoice (FOB), ocean/inland freight, customs duties, broker fees, port charges, receiving labor\n' +
          '- Allocates landed cost across SKUs in the receipt by configurable basis (weight, value, units, cube)\n' +
          '- Maintains cost layers per SKU per warehouse so transfers and shipments draw the correct cost\n' +
          '- Surfaces SKU-level and order-line-level gross margin in the Landed Gross Margin report\n' +
          '- Exposes the cost stack to merchandising so pricing and discount decisions are made against true margin',
        workflowNodeStacks: [
          {
            title: 'Cost components',
            nodes: ['Vendor FOB', 'Ocean / inland freight', 'Customs duty', 'Broker fee', 'Port charges', 'Receiving labor'],
          },
          {
            title: 'Allocate',
            nodes: ['Allocation basis', 'Per-SKU split', 'Cost layer write', 'Audit trail'],
          },
          {
            title: 'Consume',
            nodes: ['Shipment costing', 'Transfer costing', 'Replacement costing'],
          },
          {
            title: 'Report',
            nodes: ['Landed Gross Margin', 'SKU margin', 'Vendor margin', 'Order margin'],
          },
        ],
        workflowNodes: ['Vendor FOB', 'Allocation basis', 'Shipment costing', 'Landed Gross Margin'],
      },
      {
        title: 'Vendor invoice match & accounting export',
        summary:
          'Vendor invoice → match against PO + receipt → variance routing → GL post → daily QuickBooks export',
        description:
          'Closes the loop between operational events and the accounting system:\n\n' +
          '- Ingests vendor invoices via email, OCR, or EDI and links to the originating VendorOrder + VendorPO\n' +
          '- Three-way match against PO and goods receipt with configurable tolerances; clean matches auto-post\n' +
          '- Variance items route to AP with side-by-side comparison so the resolver sees PO vs receipt vs invoice in one view\n' +
          '- Posted invoices generate AP journals; daily CSV export to QuickBooks (or other accounting) keeps the books in sync without manual entry\n' +
          '- PCI-sensitive payment data (card numbers, expiry, gateway IDs) strictly isolated - never exposed to operational queries or AI agents',
        workflowNodeStacks: [
          {
            title: 'Ingest',
            nodes: ['Email / OCR / EDI', 'Header parse', 'Line parse', 'PO link'],
          },
          {
            title: 'Match',
            nodes: ['PO compare', 'Receipt compare', 'Quantity tolerance', 'Price tolerance'],
          },
          {
            title: 'Route',
            nodes: ['Auto-post clean', 'Variance to AP', 'Side-by-side view', 'Approver action'],
          },
          {
            title: 'Export',
            nodes: ['AP journal', 'Daily CSV', 'QuickBooks import', 'Reconciliation log'],
          },
          {
            title: 'PCI guard',
            nodes: ['Card data isolation', 'Tokenized refs', 'Operational query exclusion'],
          },
        ],
        workflowNodes: ['Email / OCR / EDI', 'PO compare', 'Auto-post clean', 'Daily CSV'],
      },
      {
        title: 'Customer invoicing with deposits (long-lead orders)',
        summary: 'Order → deposit invoice → balance schedule → milestone billing → final invoice → AR aging',
        description:
          'Handles deposits and milestone billing for long-lead furniture and project orders:\n\n' +
          '- Order entry captures deposit % and balance schedule (on ship, on delivery, milestones)\n' +
          '- Deposit invoice issued at order confirmation; balance invoice issued on the configured trigger\n' +
          '- Deposits booked as customer deposits (liability), released to revenue on fulfillment\n' +
          '- Late-deposit and overdue-balance flags surface on the AR exception report\n' +
          '- Customer portal shows invoice history, paid / unpaid status, and accepts ACH / card / wire payments',
        workflowNodeStacks: [
          {
            title: 'Configure',
            nodes: ['Deposit %', 'Balance trigger', 'Milestone schedule', 'Term overlay'],
          },
          {
            title: 'Invoice',
            nodes: ['Deposit invoice', 'Milestone invoice', 'Final invoice', 'PDF + portal'],
          },
          {
            title: 'Book',
            nodes: ['Customer deposit (liability)', 'Release on fulfillment', 'Revenue recognition', 'AR posting'],
          },
          {
            title: 'Watch',
            nodes: ['Late deposit', 'Overdue balance', 'Aging bucket', 'Dunning trigger'],
          },
          {
            title: 'Pay',
            nodes: ['ACH / card / wire', 'Payment apply', 'Receipt issue'],
          },
        ],
        workflowNodes: ['Deposit %', 'Deposit invoice', 'Customer deposit (liability)', 'Late deposit'],
      },
      {
        title: 'Sales rep commission tracking',
        summary: 'Rep assignment → commission rule → margin calc → period accrual → payout export',
        description:
          'Calculates rep commissions correctly the first time so payroll isn\'t arguing with sales every month:\n\n' +
          '- Rep assigned at order entry (with split rules for shared accounts and team selling)\n' +
          '- Commission rules support flat %, tiered, margin-based, product-category-specific, and SPIFs\n' +
          '- Calculates commissions on the same landed-margin number finance reports - no separate spreadsheet truth\n' +
          '- Period accrual posts to GL; clawback handled correctly on cancellations and returns\n' +
          '- Payout export feeds payroll; rep dashboard shows pipeline, accrued, and paid commissions in real time',
        workflowNodeStacks: [
          {
            title: 'Assign',
            nodes: ['Order rep tag', 'Account ownership', 'Split rules', 'Team selling'],
          },
          {
            title: 'Calculate',
            nodes: ['Commission rule', 'Tier / margin / SPIF', 'Landed margin pull', 'Per-line calc'],
          },
          {
            title: 'Accrue',
            nodes: ['Period accrual', 'GL post', 'Clawback on cancel / return'],
          },
          {
            title: 'Surface',
            nodes: ['Rep dashboard', 'Pipeline / accrued / paid', 'Manager view'],
          },
          {
            title: 'Pay',
            nodes: ['Payout export', 'Payroll feed', 'Pay statement'],
          },
        ],
        workflowNodes: ['Order rep tag', 'Commission rule', 'Period accrual', 'Payout export'],
      },
      {
        title: 'Order-level financial audit trail (OrderLedger)',
        summary: 'Every $ event tied to order → OrderLedger entry → balance over time → dispute / refund linkage',
        description:
          'Every financial event for every order tied to one ledger so disputes and audits take minutes, not days:\n\n' +
          '- Posts charge, credit, refund, adjustment, deposit, fee, and chargeback events to a per-order ledger (OrderLedger)\n' +
          '- Each entry carries amount, event type, source (system / rep / customer), timestamp, and reference doc link\n' +
          '- Balance trail shows order economics over time - what was billed, paid, refunded, owed at any point\n' +
          '- Dispute / chargeback workflow attaches evidence (delivery proof, communications, signed BOLs) to the ledger\n' +
          '- Reconciliation report compares OrderLedger to AR / AP / payment processor balances and flags drift',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Charge', 'Refund / credit', 'Adjustment', 'Deposit', 'Fee', 'Chargeback'],
          },
          {
            title: 'Ledger entry',
            nodes: ['Amount + type', 'Source actor', 'Timestamp', 'Reference doc link'],
          },
          {
            title: 'Balance',
            nodes: ['Running balance', 'As-of view', 'Per-order P&L', 'Net position'],
          },
          {
            title: 'Dispute',
            nodes: ['Chargeback link', 'Evidence attach', 'Submission', 'Outcome log'],
          },
          {
            title: 'Reconcile',
            nodes: ['vs AR / AP', 'vs Processor', 'Drift flag', 'Period close pack'],
          },
        ],
        workflowNodes: ['Refund / credit', 'Amount + type', 'Running balance', 'Chargeback link'],
      },
    ],
  },
  {
    title: 'Demand Planning',
    summary:
      'Velocity-based replenishment, vendor lead-time learning, and container/inbound load planning - planning calibrated for long-lead, dropship-heavy furniture operations.',
    automations: [
      {
        title: 'Velocity & bestseller intelligence',
        summary:
          'Order line history → SKU velocity → bestseller cache → replenishment signal → vendor batch ordering hints',
        description:
          'Surfaces what is selling so reps and buyers can act on real signal, not gut feel:\n\n' +
          '- Computes velocity per SKU per period (units sold per day/week/month) across all channels\n' +
          '- Maintains a most-sold-items cache and bestseller views so reps can prioritize quoting and merchandising\n' +
          '- Replenishment signal triggers when bestsellers approach reorder thresholds; flags candidate POs to the buying team\n' +
          '- Surfaces vendor-batch hints: items from the same vendor that should ship in one consolidated PO to reduce freight\n' +
          '- Performance reports by collection, vendor, and account show what is driving the book of business',
        workflowNodeStacks: [
          {
            title: 'Compute',
            nodes: ['Order line history', 'SKU velocity', 'Period rollup', 'Channel split'],
          },
          {
            title: 'Surface',
            nodes: ['Bestseller cache', 'Top SKU view', 'Slow-mover view', 'Trend dashboard'],
          },
          {
            title: 'Replenish',
            nodes: ['Reorder threshold', 'Replenishment signal', 'Buyer queue', 'PO suggestion'],
          },
          {
            title: 'Consolidate',
            nodes: ['Same-vendor batch', 'Freight optimization', 'Container load hint'],
          },
        ],
        workflowNodes: ['SKU velocity', 'Bestseller cache', 'Reorder threshold', 'Same-vendor batch'],
      },
      {
        title: 'Lead-time learning & promise-date accuracy',
        summary:
          'Actual ship date capture → vendor lead-time recompute → promise-date model update → confidence band → planner override',
        description:
          'Closes the loop between promised lead times and reality so customer promises stay honest:\n\n' +
          '- Captures actual ship date on every PO line and feeds it back into the lead-time engine\n' +
          '- Recomputes vendor and SKU-level lead times on a rolling window so seasonal slowdowns and capacity changes are reflected\n' +
          '- Confidence bands tighten or widen based on observed variance - high-variance SKUs get larger buffers in the customer promise\n' +
          '- Promise-date model surfaces the current best estimate at quote and order time\n' +
          '- Planners can override individual SKUs (new product introduction, known disruption) and the system tracks override accuracy',
        workflowNodeStacks: [
          {
            title: 'Capture',
            nodes: ['Promised vs actual', 'Per-vendor record', 'Per-SKU record', 'Rolling window'],
          },
          {
            title: 'Compute',
            nodes: ['Recompute mean', 'Variance band', 'Confidence interval', 'Drift detection'],
          },
          {
            title: 'Apply',
            nodes: ['Catalog update', 'Quote engine pull', 'Order promise stamp', 'Customer comms'],
          },
          {
            title: 'Override',
            nodes: ['Planner manual override', 'NPI flag', 'Disruption flag', 'Override accuracy track'],
          },
        ],
        workflowNodes: ['Promised vs actual', 'Variance band', 'Order promise stamp', 'Planner manual override'],
      },
      {
        title: 'Container & inbound load planning',
        summary:
          'Forecast + open POs → container fill calc → vendor consolidation → port + brokerage scheduling → inbound visibility',
        description:
          'For brands importing direct from manufacturers, plans inbound containers as a first-class workflow:\n\n' +
          '- Aggregates forecasted demand and open POs by vendor and origin port\n' +
          '- Calculates container fill (cube and weight) to maximize utilization and avoid LCL premiums\n' +
          '- Consolidates eligible POs into a single container booking; stages remaining items for the next sailing\n' +
          '- Schedules port pickup, customs brokerage, drayage, and inland transport with visibility on the order timeline\n' +
          '- In-transit container view shows what is on the water, when it lands, and which customer orders it unblocks',
        workflowNodeStacks: [
          {
            title: 'Inputs',
            nodes: ['Demand forecast', 'Open POs', 'Origin port', 'Vendor consolidation'],
          },
          {
            title: 'Container fill',
            nodes: ['Cube calc', 'Weight calc', 'Fill % target', 'LCL avoid'],
          },
          {
            title: 'Booking',
            nodes: ['Sailing schedule', 'Booking confirm', 'BOL / commercial invoice', 'ETA capture'],
          },
          {
            title: 'Inbound logistics',
            nodes: ['Port pickup', 'Customs brokerage', 'Drayage', 'Inland transport'],
          },
          {
            title: 'Visibility',
            nodes: ['On-water dashboard', 'Land date forecast', 'Order unblock map'],
          },
        ],
        workflowNodes: ['Open POs', 'Cube calc', 'Sailing schedule', 'On-water dashboard'],
      },
      {
        title: 'Sales pipeline → demand signal',
        summary: 'Quote pipeline → win-probability weight → projected demand by SKU → demand signal feed → buyer awareness',
        description:
          'Turns the sales rep pipeline into a forward-looking inventory signal so big quotes don\'t become surprise stockouts:\n\n' +
          '- Pulls open quotes with line item, qty, expected close date, and rep-assigned win probability\n' +
          '- Weights each line by probability and aggregates by SKU + location into a projected demand layer\n' +
          '- Surfaces high-probability large quotes that would deplete current stock so buyers can pre-position\n' +
          '- Lost / won outcomes feed back to calibrate win-probability accuracy per rep over time\n' +
          '- Sales and supply share the same projection so quote responses can include realistic lead-time commitments',
        workflowNodeStacks: [
          {
            title: 'Pull',
            nodes: ['Open quotes', 'Line / qty / SKU', 'Expected close date', 'Win probability'],
          },
          {
            title: 'Weight',
            nodes: ['Probability x qty', 'SKU + location aggregate', 'Time-bucket roll-up'],
          },
          {
            title: 'Surface',
            nodes: ['Stockout-risk quote alert', 'Buyer dashboard', 'Rep visibility'],
          },
          {
            title: 'Calibrate',
            nodes: ['Outcome capture', 'Win-rate by rep', 'Probability re-tune'],
          },
        ],
        workflowNodes: ['Open quotes', 'Probability x qty', 'Stockout-risk quote alert', 'Outcome capture'],
      },
      {
        title: 'Vendor capacity planning',
        summary: 'Forecast → vendor share → vendor capacity check → constraint flag → contingency vendor activation',
        description:
          'Aligns demand forecasts with what vendors can actually ship - especially critical with long-lead furniture vendors:\n\n' +
          '- Splits the demand forecast across primary and backup vendors per SKU based on sourcing strategy\n' +
          '- Compares planned demand against vendor capacity (production lines, allocated slots, lead-time buffer)\n' +
          '- Surfaces capacity constraints early so sourcing can negotiate, raise the order, or activate a backup\n' +
          '- Tracks vendor commitment vs delivery accuracy over rolling windows so capacity assumptions stay realistic\n' +
          '- Feeds quote / order promise dates so customer commitments are honest about supply constraints',
        workflowNodeStacks: [
          {
            title: 'Split',
            nodes: ['Per-vendor share', 'Sourcing strategy rule', 'SKU mapping'],
          },
          {
            title: 'Check',
            nodes: ['Vendor capacity profile', 'Planned vs available', 'Lead-time buffer', 'Constraint flag'],
          },
          {
            title: 'Resolve',
            nodes: ['Sourcing negotiation', 'Backup vendor activate', 'Capacity raise request'],
          },
          {
            title: 'Calibrate',
            nodes: ['Commitment vs delivery', 'Rolling accuracy', 'Capacity assumption update'],
          },
          {
            title: 'Inform',
            nodes: ['Quote engine pull', 'Order promise date', 'Customer comms'],
          },
        ],
        workflowNodes: ['Per-vendor share', 'Vendor capacity profile', 'Backup vendor activate', 'Order promise date'],
      },
    ],
  },
];

const DEFAULT_OUTER_INDEX = 0;
const DEFAULT_INNER_INDEX = null;

function WorkflowPreview({
  nodes,
  workflowNodeStacks,
  imageSrc,
  workflowMermaid,
  workflowMermaidBlocks,
  workflowMermaidLayout,
  mermaidRenderId,
  label,
}) {
  if (imageSrc) {
    return (
      <div className="mt-4 overflow-hidden rounded-lg border border-[var(--color-text-primary)]/10 bg-[var(--color-base)]/50">
        <img src={imageSrc} alt={label || 'Automation workflow'} className="h-auto w-full object-cover" loading="lazy" />
      </div>
    );
  }

  const blocks = workflowMermaidBlocks?.filter((b) => b.definition?.trim()) ?? [];
  if (blocks.length > 0 && mermaidRenderId) {
    const defaultLayout = workflowMermaidLayout === 'responsive' ? 'responsive' : 'fixed';
    return (
      <div
        className="mt-4 rounded-lg border border-[var(--color-text-primary)]/10 bg-[var(--color-text-primary)]/[0.03] p-4 md:p-5"
        role="img"
        aria-label={label ? `${label} workflow` : 'Automation workflow'}
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]/35">
          Workflow
        </p>
        <div className="space-y-6 text-[var(--color-text-primary)]">
          {blocks.map((block, i) => (
            <div key={`${block.title}-${i}`}>
              <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-primary)]/50 md:text-[11px]">
                {block.title}
              </p>
              <WorkflowMermaid
                definition={block.definition}
                renderId={`${mermaidRenderId}-block-${i}`}
                label={`${label} - ${block.title}`}
                layout={block.layout ?? defaultLayout}
                panZoom
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (workflowMermaid?.trim() && mermaidRenderId) {
    return (
      <div
        className="mt-4 rounded-lg border border-[var(--color-text-primary)]/10 bg-[var(--color-text-primary)]/[0.03] p-4 md:p-5"
        role="img"
        aria-label={label ? `${label} workflow` : 'Automation workflow'}
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]/35">
          Workflow
        </p>
        <div className="overflow-hidden text-[var(--color-text-primary)]">
          <WorkflowMermaid
            definition={workflowMermaid}
            renderId={mermaidRenderId}
            label={label}
            layout={workflowMermaidLayout === 'responsive' ? 'responsive' : 'fixed'}
            panZoom
          />
        </div>
      </div>
    );
  }

  const stacks =
    workflowNodeStacks && workflowNodeStacks.length > 0
      ? workflowNodeStacks
      : [{ nodes: nodes ?? [] }];

  return (
    <div className="mt-4 space-y-3" role="img" aria-label={label ? `${label} workflow` : 'Automation workflow'}>
      {stacks.map((stack, stackIndex) => (
        <div
          key={stack.title ? `${stack.title}-${stackIndex}` : `stack-${stackIndex}`}
          className="rounded-lg border border-[var(--color-text-primary)]/10 bg-[var(--color-text-primary)]/[0.03] p-4 md:p-5"
        >
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]/35">
            {stack.title || 'Workflow'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {stack.nodes.map((node, i) => (
              <div key={`${node}-${stackIndex}-${i}`} className="flex items-center gap-2 md:gap-3">
                {i > 0 && (
                  <div
                    className="hidden h-px w-4 bg-gradient-to-r from-[var(--color-accent)]/40 to-[var(--color-accent)]/10 sm:block md:w-6"
                    aria-hidden
                  />
                )}
                <div className="flex min-w-0 flex-col items-center gap-1.5 rounded-md border border-[var(--color-text-primary)]/12 bg-[var(--color-base)]/60 px-2.5 py-2 md:px-3">
                  <div className="h-1.5 w-1.5 rounded-sm bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]" />
                  <span className="max-w-[5.5rem] text-center font-mono text-[8px] uppercase leading-tight tracking-wider text-[var(--color-text-primary)]/55 md:max-w-[6.5rem] md:text-[9px]">
                    {node}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccordionSection({ sectionId, idPrefix, eyebrow, heading, description, description2, toggleOptions, activeToggle, onToggle, functions, openOuterIndex, setOpenOuterIndex, innerOpenIndex, setInnerOpenIndex }) {
  function selectOuter(index) {
    setOpenOuterIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      id={sectionId}
      className="relative border-b border-[var(--color-text-primary)]/5 bg-[var(--color-base)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl px-4 md:mb-16">
          <h2 className="mb-6 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
            {eyebrow}
          </h2>
          <h3 className="mb-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
            {heading}
          </h3>
          <p className="max-w-xl font-sans text-lg font-light leading-relaxed text-[var(--color-text-primary)]/50">
            {description}
          </p>
          {description2 && (
            <p className="mt-4 max-w-xl font-sans text-lg font-light leading-relaxed text-[var(--color-text-primary)]/50">
              {description2}
            </p>
          )}
        </div>

        {toggleOptions && toggleOptions.length > 0 && (
          <div className="mb-8 flex items-center gap-1 rounded-full border border-[var(--color-text-primary)]/10 bg-[var(--color-text-primary)]/[0.03] p-1 w-fit">
            {toggleOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onToggle?.(option)}
                className={cn(
                  'rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200',
                  activeToggle === option
                    ? 'bg-[var(--color-accent)] text-[var(--color-base)] shadow-[0_0_12px_var(--color-accent-glow)]'
                    : 'text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)]/80'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {functions.map((fn, outerIndex) => {
            const isOuterOpen = openOuterIndex === outerIndex;
            const panelId = `${idPrefix}-outer-panel-${outerIndex}`;
            const headerId = `${idPrefix}-outer-header-${outerIndex}`;

            return (
              <div
                key={fn.title}
                className="overflow-hidden rounded-2xl border border-[var(--color-text-primary)]/8 bg-[var(--color-text-primary)]/[0.02] luxe-glass"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOuterOpen}
                  aria-controls={panelId}
                  onClick={() => selectOuter(outerIndex)}
                  className="flex w-full flex-col gap-4 p-6 text-left transition-colors hover:bg-[var(--color-text-primary)]/[0.03] md:flex-row md:items-center md:justify-between md:gap-8 md:p-8"
                >
                  <div className="flex min-w-0 flex-1 items-baseline gap-4 md:gap-6">
                    <span className="shrink-0 font-mono text-xs tabular-nums text-[var(--color-text-primary)]/45 md:text-sm">
                      {String(outerIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-lg font-light tracking-tight text-[var(--color-text-primary)] md:text-xl">
                      {fn.title}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 items-start justify-between gap-4 md:justify-end">
                    <p className="max-w-xl font-sans text-sm font-light italic leading-relaxed text-[var(--color-text-primary)]/45 md:text-right">
                      {fn.summary}
                    </p>
                    <ChevronDown
                      className={cn(
                        'mt-0.5 h-5 w-5 shrink-0 text-[var(--color-text-primary)]/35 transition-transform duration-300',
                        isOuterOpen && 'rotate-180'
                      )}
                      aria-hidden
                    />
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={cn(
                    'grid border-t border-[var(--color-text-primary)]/6 transition-[grid-template-rows,opacity] duration-300 ease-out',
                    isOuterOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] border-transparent opacity-0'
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-2 px-4 pb-6 pt-3 md:space-y-2.5 md:px-6 md:pb-8 md:pt-4">
                      {fn.automations.map((auto, innerIndex) => {
                        const isInnerOpen = innerOpenIndex === innerIndex && isOuterOpen;
                        const innerPanelId = `${idPrefix}-inner-${outerIndex}-${innerIndex}`;
                        const innerHeaderId = `${idPrefix}-inner-h-${outerIndex}-${innerIndex}`;

                        return (
                          <div
                            key={`${auto.title}-${innerIndex}`}
                            className="overflow-hidden rounded-lg border border-[var(--color-text-primary)]/8 bg-[var(--color-text-primary)]/[0.02]"
                          >
                            <button
                              type="button"
                              id={innerHeaderId}
                              tabIndex={isOuterOpen ? 0 : -1}
                              aria-expanded={isInnerOpen}
                              aria-controls={innerPanelId}
                              onClick={() => {
                                if (!isOuterOpen) return;
                                setInnerOpenIndex((prev) =>
                                  prev === innerIndex ? null : innerIndex
                                );
                              }}
                              className="flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-text-primary)]/[0.04] md:gap-4 md:px-4 md:py-3"
                            >
                              <span className="mt-0.5 shrink-0 font-mono text-[10px] tabular-nums text-[var(--color-text-primary)]/35 md:text-xs">
                                {String(innerIndex + 1).padStart(2, '0')}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                  <span className="font-sans text-sm font-light text-[var(--color-text-primary)] md:text-[15px]">
                                    {auto.title}
                                  </span>
                                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-primary)]/35">
                                    {auto.summary}
                                  </span>
                                </div>
                              </div>
                              <ChevronDown
                                className={cn(
                                  'mt-0.5 h-4 w-4 shrink-0 text-[var(--color-text-primary)]/30 transition-transform duration-300',
                                  isInnerOpen && 'rotate-180'
                                )}
                                aria-hidden
                              />
                            </button>

                            <div
                              id={innerPanelId}
                              role="region"
                              aria-labelledby={innerHeaderId}
                              className={cn(
                                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                                isInnerOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                              )}
                            >
                              <div className="min-h-0 overflow-hidden">
                                {isInnerOpen && (
                                  <div className="border-t border-[var(--color-text-primary)]/6 px-3 pb-3 pt-2 md:px-4 md:pb-4 md:pt-3">
                                    {auto.description.includes('\n') ? (
                                      <div className="font-sans text-xs font-light leading-relaxed text-[var(--color-text-primary)]/50 md:text-sm">
                                        {auto.description.split('\n').filter(Boolean).map((line, li) =>
                                          line.startsWith('- ') ? null : (
                                            <p key={li} className="mb-2">{line}</p>
                                          )
                                        )}
                                        {auto.description.split('\n').filter(l => l.startsWith('- ')).length > 0 && (
                                          <ul className="mt-1 list-disc space-y-1.5 pl-4">
                                            {auto.description.split('\n').filter(l => l.startsWith('- ')).map((line, li) => (
                                              <li key={li}>{line.slice(2)}</li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    ) : (
                                      <p className="font-sans text-xs font-light leading-relaxed text-[var(--color-text-primary)]/50 md:text-sm">
                                        {auto.description}
                                      </p>
                                    )}
                                    <WorkflowPreview
                                      nodes={auto.workflowNodes}
                                      workflowNodeStacks={auto.workflowNodeStacks}
                                      imageSrc={auto.workflowImage}
                                      workflowMermaid={auto.workflowMermaid}
                                      workflowMermaidBlocks={auto.workflowMermaidBlocks}
                                      workflowMermaidLayout={auto.workflowMermaidLayout}
                                      mermaidRenderId={`${idPrefix}-mermaid-${outerIndex}-${innerIndex}`}
                                      label={auto.title}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function FeaturesDraftSection() {
  const baseId = useId();

  const [openOuterIndex, setOpenOuterIndex] = useState(DEFAULT_OUTER_INDEX);
  const [innerOpenIndex, setInnerOpenIndex] = useState(DEFAULT_INNER_INDEX);

  const [openOuterIndex2, setOpenOuterIndex2] = useState(DEFAULT_OUTER_INDEX);
  const [innerOpenIndex2, setInnerOpenIndex2] = useState(DEFAULT_INNER_INDEX);

  const [erpToggle, setErpToggle] = useState('B2B');

  const erpFunctions = erpToggle === 'B2B' ? erpModulesB2B : erpModulesDTC;

  useEffect(() => {
    if (openOuterIndex === null) setInnerOpenIndex(null);
    else setInnerOpenIndex(null);
  }, [openOuterIndex]);

  useEffect(() => {
    if (openOuterIndex2 === null) setInnerOpenIndex2(null);
    else setInnerOpenIndex2(null);
  }, [openOuterIndex2]);

  useEffect(() => {
    setOpenOuterIndex(DEFAULT_OUTER_INDEX);
    setInnerOpenIndex(DEFAULT_INNER_INDEX);
  }, [erpToggle]);

  return (
    <>
      <AccordionSection
        sectionId="solutions"
        idPrefix={`${baseId}-s1`}
        eyebrow="Custom ERP"
        heading="Your ERP, built from scratch"
        description="Stop paying $200K annually and a cut of your revenue for bloated software not built for your business. Below is the modular blueprint of what we build into a custom ERP - inventory, procurement, orders, warehouse, freight, finance, and demand planning - each module purpose-built around how you actually operate, all wired into a single real-time data model:"
        toggleOptions={['B2B', 'DTC']}
        activeToggle={erpToggle}
        onToggle={setErpToggle}
        functions={erpFunctions}
        openOuterIndex={openOuterIndex}
        setOpenOuterIndex={setOpenOuterIndex}
        innerOpenIndex={innerOpenIndex}
        setInnerOpenIndex={setInnerOpenIndex}
      />
      <AccordionSection
        sectionId="marketing-factory"
        idPrefix={`${baseId}-s2`}
        eyebrow="AI Marketing Factory"
        heading="Your AI marketing factory"
        description="A single photoshoot runs $20,000. A UGC ad costs $200-$400 per creator. Hiring more creatives, copywriters, and media buyers to keep up does not scale."
        description2="We build AI systems that produce unlimited ad creative, monitor every competitor move, and automate the research-to-launch pipeline - so your team ships more campaigns without the production costs or growing headcount. Browse the workflows:"
        functions={businessFunctions}
        openOuterIndex={openOuterIndex2}
        setOpenOuterIndex={setOpenOuterIndex2}
        innerOpenIndex={innerOpenIndex2}
        setInnerOpenIndex={setInnerOpenIndex2}
      />
    </>
  );
}
