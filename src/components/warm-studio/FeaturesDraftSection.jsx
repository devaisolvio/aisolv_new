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
    title: 'Operations',
    summary:
      'We analyze your current workflows, identify bottlenecks, and automate routing, data hygiene, escalations, and reporting.',
    automations: [
      {
        title: 'Order Shipping and Fulfillment - Label to Doorstep Automation',
        summary: 'New order → carrier selected → label purchased → warehouse dispatched → customer tracked',
        description:
          'Fully automated order fulfillment that replaced a two-person manual process:\n\n' +
          '- Polls the ERP (synced with Shopify) for new fulfillment orders, splits them by warehouse location, and determines shipping type - small parcel via UPS or pallet/LTL via freight broker\n' +
          '- Small parcel labels are purchased automatically with a human approval gate on anything over $75 to catch expensive routing errors\n' +
          '- Pallet shipments pull quotes from multiple freight sources, compare on cost and transit time, and flag when variance exceeds 50% so nothing ships without a sanity check\n' +
          '- BOLs are generated and routed to the correct warehouse; all labels and documents are stored in Drive organized by fulfillment order (active vs shipped) with links written back into ERP order notes\n' +
          '- Multiple tracking numbers per order are handled and synced through the ERP back to Shopify so customers see complete tracking\n' +
          '- Delivery is confirmed only when the warehouse scans the signed BOL - not when they mark it shipped\n' +
          '- In-transit exceptions trigger automatic escalation, and a post-delivery feedback loop captures logistics manager ratings to improve future carrier selection',
        workflowNodeStacks: [
          {
            title: 'Order detection & routing',
            nodes: ['ERP poll', 'Fulfillment order split', 'Warehouse assignment', 'Ship type (parcel vs LTL)', 'Dedup check'],
          },
          {
            title: 'Small parcel labels',
            nodes: ['Carrier API rates', 'Rate compare', 'Approval gate (>$75)', 'Label purchase', 'Drive upload'],
          },
          {
            title: 'Pallet & LTL freight',
            nodes: ['Warehouse quote', 'Broker quotes', 'Rate + transit compare', 'Variance flag (50%+)', 'BOL generation', 'BOL to warehouse'],
          },
          {
            title: 'Dispatch & tracking',
            nodes: ['ERP order notes', 'Label link attach', 'Send to warehouse', 'Multi-tracking sync', 'Shopify update'],
          },
          {
            title: 'Exception monitoring',
            nodes: ['In-transit status check', 'Delay detection', 'Auto-escalation', 'Voice AI carrier call'],
          },
          {
            title: 'Completion & feedback',
            nodes: ['Signed BOL scan', 'Delivery confirmed', 'Rating prompt', 'Carrier score update', 'Archive to shipped'],
          },
        ],
        workflowNodes: ['ERP poll', 'Label purchase', 'Multi-tracking sync', 'Delivery confirmed'],
      },
      {
        title: 'Supply Chain and Logistics Intelligence - Carrier Scoring to Demand Forecasting',
        summary: 'Carrier scoring → historical learning → demand signals → inventory visibility → vendor coordination',
        description:
          'Intelligence layer built on top of the fulfillment pipeline:\n\n' +
          '- A carrier decision engine scores every option on cost, route history, reliability, and transit time - pulling from internal shipment history and external carrier reputation data\n' +
          '- New carriers with no track record fall back to internet research; if none of the top cheapest broker options have solid ratings, the system defaults to the warehouse carrier (the gold standard - they own the issues, not you)\n' +
          '- Every completed shipment feeds back into the engine: the logistics manager rates it, notes are stored, and the model gets smarter over time\n' +
          '- Bad experiences are flagged so the system avoids repeat mistakes, passing the top 50 relevant historical instances into the context window for each new decision\n' +
          '- On the inventory side, the system ties warehouse stock levels, safety thresholds, demand forecasting (with LLM context on SKU details, seasonality, and planning decisions), and reorder triggers into one operational surface\n' +
          '- PO generation workflows fire automatically when stock dips below thresholds, vendor lead times are tracked, and a monthly review digest rolls up carrier performance, forecast accuracy, and cost trends',
        workflowNodeStacks: [
          {
            title: 'Carrier decision engine',
            nodes: ['Cost scoring', 'Route analysis', 'Reliability weight', 'Transit time', 'Composite rank', 'Warehouse fallback'],
          },
          {
            title: 'Historical intelligence',
            nodes: ['Past shipment log', 'Bad experience flags', 'Top 50 context pass', 'RAG supplement'],
          },
          {
            title: 'Demand forecasting',
            nodes: ['Sales velocity', 'Seasonality', 'SKU trends', 'LLM context', 'Reorder triggers'],
          },
          {
            title: 'Inventory visibility',
            nodes: ['Warehouse levels', 'Safety stock', 'Multi-location sync'],
          },
          {
            title: 'PO & vendor coordination',
            nodes: ['Auto PO generation', 'Vendor lead times', 'Multi-source aggregation', 'Approval workflow', 'Cost tracking'],
          },
          {
            title: 'Reporting & learning',
            nodes: ['Carrier performance report', 'Manager feedback loop', 'Monthly review digest', 'Model retrain'],
          },
        ],
        workflowNodes: ['Cost scoring', 'Bad experience flags', 'Sales velocity', 'Auto PO generation'],
      },
      {
        title: 'Telehealth Blood Work Pipeline - Intake to AI-Powered Nurse Report',
        summary: 'Client intake → lab results ingested → AI analysis → nurse-reviewed report → sales call',
        description:
          'End-to-end automation for a telehealth business where the entire operation was bottlenecked by nurse capacity to manually review blood work:\n\n' +
          '- Client onboarding captures intake forms (health history, goals, medications, allergies, female-specific fields like PCOS and endometriosis) and consent via DocuSign, all consolidated through the CRM\n' +
          '- Blood work is ordered through a lab intermediary that routes to Quest (46 states) or regional labs depending on location; requisition barcodes link physical samples back to the digital order\n' +
          '- Results are ingested automatically when labs bulk-release (Tuesdays and Fridays), with a webhook that fires only after confirming complete results - not partials; clients who bring their own blood work upload through a separate concierge intake that merges into the same pipeline\n' +
          '- AI parses the lab report, cross-references intake form responses, and generates a branded 10-page report with optimal ranges, marker interpretations, and improvement guidance - all tuned per lab provider since definitions differ across Quest, LabCorp, and others\n' +
          '- Peptide and therapy recommendations are layered in based on blood markers, state-level prescription restrictions, contraindications, allergies, and current medications\n' +
          '- Reports are never auto-sent; the nurse reviews, edits through a custom dashboard, adds personal notes, and walks the client through everything on a live sales call\n' +
          '- Call recordings are processed to extract preferences, objections, and clinical notes that feed back into the patient record for future personalization\n' +
          '- All infrastructure is HIPAA compliant with encrypted pipelines, PII obfuscation, and secure VM hosting',
        workflowNodeStacks: [
          {
            title: 'Client intake & onboarding',
            nodes: ['PHI form capture', 'CRM entry', 'Consent via DocuSign', 'Intake form (health history)', 'Provider assignment'],
          },
          {
            title: 'Blood work ordering',
            nodes: ['Lab intermediary API', 'State routing (Quest / regional)', 'Requisition + barcode', 'Appointment scheduling'],
          },
          {
            title: 'Results ingestion',
            nodes: ['Webhook listener', 'Partial result guard', 'Multi-lab format parse', 'DIY upload merge', 'Screenshot-to-PDF', 'CRM attachment'],
          },
          {
            title: 'AI analysis & report',
            nodes: ['Marker extraction', 'Reference range scoring', 'Intake cross-reference', 'Branded report generation', 'Optimal range visuals'],
          },
          {
            title: 'Recommendations engine',
            nodes: ['Blood marker match', 'State restriction filter', 'Contraindication check', 'Product catalog lookup'],
          },
          {
            title: 'Nurse review & delivery',
            nodes: ['Custom dashboard', 'Report edit tools', 'Personal notes', 'Sales call prep', 'Client send gate'],
          },
          {
            title: 'Post-call intelligence',
            nodes: ['Call transcript parse', 'Preference extraction', 'Objection tagging', 'Patient record update'],
          },
        ],
        workflowNodes: ['Intake form', 'Lab results ingested', 'AI report', 'Nurse review'],
      },
      {
        title: 'Cross-system approval ladder',
        summary: 'Rules + Slack + ERP',
        description:
          'Built for teams drowning in “who approved this?” We route spend and policy exceptions with signed trails and automatic nudges before money or inventory moves.',
        workflowNodes: ['Request', 'Policy check', 'Slack ping', 'ERP post'],
      },
      {
        title: 'SLA breach orchestration',
        summary: 'Detect → escalate → own',
        description:
          'When queues stall, we open the right ticket, page the owner, and roll up weekly so leadership sees patterns - not one-off heroics.',
        workflowNodes: ['Queue watch', 'Threshold', 'Escalate', 'Rollup'],
      },
      {
        title: 'Ops exception triage desk',
        summary: 'Single intake surface',
        description:
          'One surface for weird edge cases: bad SKUs, split shipments, vendor misses - classified, assigned, and closed with audit context.',
        workflowNodes: ['Intake', 'Classify', 'Assign', 'Resolve'],
      },
    ],
  },
  {
    title: 'Data & intelligence',
    summary:
      'We make metrics, definitions, and pipelines trustworthy so leaders automate decisions on data that matches across tools.',
    automations: [
      {
        title: 'Matt - CallRail, calls, and attribution (full thread)',
        summary: 'Capture every discussion',
        description:
          'Reminder to fold in everything from Matt: every working session and decision, CallRail and call-level data, how calls flow into reporting, attribution joins to CRM and ads, and any other pipelines you sketched together. Treat this as the master bucket until you split it into shipped diagrams and metrics.',
        workflowNodes: ['CallRail', 'Calls', 'Join', 'Report'],
      },
      {
        title: 'Accolade build (reminder)',
        summary: 'You asked to tag this',
        description:
          'Placeholder for the Accolade work you just recalled - expand with the real pipeline, metrics, and integrations so this row does not stay vague.',
        workflowNodes: ['Accolade', 'Scope', 'Data', 'Ship'],
      },
      {
        title: 'Metric definition sync',
        summary: 'CRM ↔ warehouse ↔ BI',
        description:
          'We lock revenue and customer definitions across CRM, billing, and BI so every team defends the same number in the room.',
        workflowNodes: ['Source A', 'Map', 'Source B', 'Publish'],
      },
      {
        title: 'Executive pulse rollup',
        summary: 'Governed weekly brief',
        description:
          'Scheduled rollups with lineage: what changed, why it matters, and what broke - without exporting five spreadsheets.',
        workflowNodes: ['Ingest', 'Normalize', 'Dashboard', 'Digest'],
      },
      {
        title: 'Integration health monitor',
        summary: 'Webhooks + replay',
        description:
          'Catch silent sync failures before AI and automations amplify bad data - alerts, replay queues, and runbook hooks.',
        workflowNodes: ['Webhook', 'Validate', 'Replay', 'Alert'],
      },
      {
        title: 'Thirdbase Capital - Programs and Materials',
        summary: 'Client capture',
        description:
          'Placeholder for Thirdbase Capital deliverables - fund storytelling, LP-facing materials, portfolio narratives, or whatever slice of marketing/GTM you own for them. Expand with specifics from the engagement.',
        workflowNodes: ['Story', 'Deck', 'Web', 'Outreach'],
      },
      {
        title: 'Hilo - Dashboards, Reporting, and Operational Intelligence',
        summary: 'Raw data → live dashboards → decisions',
        description:
          'Custom dashboards and reporting layer built on top of Hilo operational data. Pulls from support tickets, subscription events, billing, product usage, and agent performance into a unified view. Leadership sees real-time KPIs - resolution time, ticket volume by category, subscription churn signals, agent efficiency - without exporting CSVs or waiting for someone to build a report. Automated alerts surface anomalies before they become fires.',
        workflowNodes: ['Data pull', 'Normalize', 'Dashboard', 'Alerts'],
      },
      {
        title: 'Employer Data Stewardship Layer - Disparate Sources to Unified Benefits Intelligence',
        summary: 'Scattered vendor files → unified warehouse → self-service insights for benefits teams',
        description:
          'Self-insured employers are drowning in vendor data that arrives on completely different cadences - daily, weekly, monthly, quarterly - with no single place to see the full picture:\n\n' +
          '- Ingestion layer that normalizes every vendor file into a single warehouse regardless of format or delivery schedule\n' +
          '- ROI attribution engine that solves multi-vendor care journey attribution (marketing → navigation → platform → clinical partner) so the same dollar saved is not claimed four times by four vendors\n' +
          '- User-friendly query layer for benefit leaders who are not data people - natural language questions, instant answers, no more waiting a week for a static deck\n' +
          '- Health plan data access layer that surfaces data employers actually own but plans gate behind "false walls," including trigger code audits so programs do not sit dormant for months\n' +
          '- Vendor performance scoring that reconciles contradictory reports across employers by normalizing for account team quality - so you know whether the product is bad or just the team assigned to you\n' +
          '- Automated anomaly detection and alerts so leadership sees problems before the next quarterly review',
        workflowNodeStacks: [
          {
            title: 'Ingest & normalize',
            nodes: ['Vendor file intake', 'Cadence detection', 'Schema normalize', 'Dedup', 'Warehouse load'],
          },
          {
            title: 'ROI attribution',
            nodes: ['Touchpoint map', 'Journey stitch', 'Attribution model', 'Dollar dedup'],
          },
          {
            title: 'Benefits query layer',
            nodes: ['Natural language query', 'Insight generation', 'Self-service dashboard'],
          },
          {
            title: 'Plan data access',
            nodes: ['Employer data rights', 'Plan wall bypass', 'Trigger code audit', 'Data release'],
          },
          {
            title: 'Vendor performance',
            nodes: ['Report ingest', 'Cross-employer normalize', 'Account team factor', 'Contradiction flag', 'Composite score'],
          },
          {
            title: 'Monitoring & alerts',
            nodes: ['Anomaly detection', 'Threshold alerts', 'Leadership digest'],
          },
        ],
        workflowNodes: ['Vendor file intake', 'Attribution model', 'Self-service dashboard', 'Leadership digest'],
      },
    ],
  },
  {
    title: 'Marketing',
    summary:
      'We align content, creative, and channel execution so demand programs scale without losing brand voice or measurement.',
    automations: [
      {
        title: 'Post-Purchase Call Personalization - Handwritten Letter Pipeline',
        summary: 'Calls → letter in mailbox',
        description:
          'This pipeline targets purchasers only. Sold-call dispositions are joined to the customer record and validated for a mailable address. After a short cooling window - so the product can land first - the recording is transcribed and structured fields are extracted from the transcript: agent name, pain points, progression concerns, and whether the story centers on the buyer or a loved one. A testimonial is matched to the pain category, the letter is drafted in your brand voice, and automated QA reruns generation when any gate fails. The approved pack is submitted to the handwriting vendor API; sends, costs, and an append-only audit trail roll up in a single operations dashboard.',
        workflowNodes: ['Ingest', 'Extract', 'Letter', 'Mail'],
        workflowMermaidBlocks: neuroqPostPurchaseWorkflowBlocks,
        workflowMermaidLayout: 'responsive',
      },
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
    ],
  },
  {
    title: 'Sales & GTM',
    summary:
      'We tighten prospecting, qualification, and pipeline mechanics so outbound and paid motions compound instead of conflicting.',
    automations: [
      {
        title: 'CRM automation & pipeline hygiene',
        summary: 'Routing, stages, tasks',
        description:
          'Lead routing, stage rules, task creation, follow-up sequences, stale-deal hygiene - reps sell instead of babysitting fields. Deeper sync lives under Data & intelligence; CS tickets live under Customer experience & service.',
        workflowNodes: ['Lead in', 'Score', 'Route', 'Task + SLA'],
      },
      {
        title: 'Enrichment + ICP fit pass',
        summary: 'List → CRM write',
        description:
          'Batch enrichment with dedupe gates before CRM writes so outbound volume does not trash your system of record.',
        workflowNodes: ['List in', 'Enrich', 'Dedupe', 'CRM write'],
      },
      {
        title: 'Paid experiment guardrails',
        summary: 'Budget + UTM + pause',
        description:
          'Spin tests with budget caps, UTM hygiene, and auto-pause on bad efficiency - same playbook across Google, Meta, LinkedIn.',
        workflowNodes: ['Budget', 'UTM', 'Launch', 'Guardrail'],
      },
      {
        title: 'Thirdbase Capital - pipeline and deal room',
        summary: 'GTM capture',
        description:
          'Reminder: log the Sales/GTM side for Thirdbase Capital too - CRM hygiene, sequences, diligence data rooms, or portfolio intro flows that sit next to the marketing materials.',
        workflowNodes: ['CRM', 'Sequences', 'Data room', 'Follow-up'],
      },
    ],
  },
  {
    title: 'Customer experience & service',
    summary:
      'We connect support, success, and fulfillment signals so customers get consistent answers, faster resolution, and fewer handoffs.',
    automations: [
      {
        title: 'Hilo - guided, troubleshooting, and escalation',
        summary: 'Customer service depth',
        description:
          'What they wanted: troubleshooting workflows, escalation paths, and guided flows so agents (human or AI) follow the same playbooks. The product is complex - setup, billing, subscriptions, replacements (e.g. consumables like bands), plus software, technique, and hardware - so support has to span “how does this work?” through transactional “how do I buy online?” and payment processing.',
        workflowNodes: ['Troubleshoot', 'Escalate', 'Guide', 'Resolve'],
      },
      {
        title: 'Hilo - FAQs, learnings, and agent feedback loops',
        summary: 'Knowledge that improves',
        description:
          'Use the FAQs they publish on the site as extractable documents - not static dumps. Attach specific learnings to those sources, and design flows that loop back: capture feedback when the agent is wrong so the next run behaves correctly and the knowledge base tightens over time.',
        workflowNodes: ['FAQ ingest', 'Learnings', 'Feedback', 'Retrain'],
      },
      {
        title: 'Hilo - subscriptions, billing, and commerce questions',
        summary: 'Money + lifecycle',
        description:
          'Cover subscription lifecycle, billing edge cases, payment processing, and self-serve purchase paths alongside general FAQ-style answers so one system handles both confusion and commerce.',
        workflowNodes: ['Subscribe', 'Bill', 'Pay', 'Purchase'],
      },
      {
        title: 'Customer onboarding automations',
        summary: 'Closed-won → first value',
        description:
          'From contract signed or checkout complete through first success: provisioning, welcome and task sequences, training scheduling, milestone checklists, clean handoffs from sales or implementation, and early health pings so stuck accounts surface before churn.',
        workflowNodes: ['Trigger', 'Provision', 'Train', 'Health'],
      },
    ],
  },
  {
    title: 'Finance & accounting',
    summary:
      'We connect operational signals to forecasting, margin, and cash discipline so finance and accounting see the same truth as the front line.',
    automations: [
      {
        title: 'Vrva Coffee - finance work (reminder)',
        summary: 'Add details later',
        description:
          'Reminder: capture everything you scoped for Vrva Coffee under finance and accounting - close processes, payables/receivables touchpoints, inventory or COGS tie-outs, and any automation threads you discussed - then replace this stub with the real narrative.',
        workflowNodes: ['Scope', 'AP/AR', 'Close', 'Ship'],
      },
      {
        title: 'Treasury and incoming checks (exceptions)',
        summary: 'Reminder: check meeting',
        description:
          'Treasury-style handling for checks that arrive with exceptions - routing, research, and resolution. Reminder: pull the detailed reference from the meeting you had specifically on checks and exception handling.',
        workflowNodes: ['Check in', 'Exception', 'Research', 'Resolve'],
      },
      {
        title: 'Accounts payable - HVAC distributor (PE-backed)',
        summary: 'Conversation to extend',
        description:
          'Track the AP automation / process work discussed with the HVAC distributor backed by a PE firm - you mentioned you will loop in more context later. Scope likely includes invoice intake, approvals, and distributor-specific edge cases.',
        workflowNodes: ['Vendor', 'Invoice', 'Approve', 'Pay'],
      },
      {
        title: 'Vendor invoice intake (AP)',
        summary: 'Inbox → match → pay',
        description:
          'Invoice capture, matching, approvals, and disbursement prep with vendor master hygiene - procure-to-pay without shadow spreadsheets.',
        workflowNodes: ['Inbox', 'Extract', 'Match', 'Approve'],
      },
      {
        title: 'Close checklist automation',
        summary: 'Tasks + evidence + lock',
        description:
          'Recurring close tasks with owners, evidence links, and lock steps so nothing “falls through” between subledgers.',
        workflowNodes: ['Task list', 'Owner ping', 'Evidence', 'Lock'],
      },
      {
        title: 'Cash application dispute loop',
        summary: 'Bank → match → exception',
        description:
          'Bank feed matching with exception routing and GL-safe resolution paths - less month-end archaeology.',
        workflowNodes: ['Bank feed', 'Match', 'Exception', 'GL post'],
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

  useEffect(() => {
    if (openOuterIndex === null) setInnerOpenIndex(null);
    else setInnerOpenIndex(null);
  }, [openOuterIndex]);

  useEffect(() => {
    if (openOuterIndex2 === null) setInnerOpenIndex2(null);
    else setInnerOpenIndex2(null);
  }, [openOuterIndex2]);

  return (
    <>
      <AccordionSection
        sectionId="solutions"
        idPrefix={`${baseId}-s1`}
        eyebrow="Custom ERP"
        heading="Your ERP, built from scratch"
        description="Stop paying $200K annually and a cut of your revenue for bloated software not built for your business. These are the workflows we build into a custom ERP - operations, data, shipping, finance, customer experience - all purpose-built, all yours:"
        toggleOptions={['B2B', 'DTC']}
        activeToggle={erpToggle}
        onToggle={setErpToggle}
        functions={businessFunctions}
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
