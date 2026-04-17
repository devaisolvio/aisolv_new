/**
 * Post-purchase call-to-handwritten-letter workflow (NeuroQ-style reference).
 * Split into multiple Mermaid blocks for readability; each uses flowchart TD header
 * so WorkflowMermaid responsive mode can swap to LR on desktop.
 *
 * @typedef {{ title: string, definition: string, layout?: 'fixed' | 'responsive' }} MermaidWorkflowBlock
 */

/** @type {MermaidWorkflowBlock[]} */
export const neuroqPostPurchaseWorkflowBlocks = [
  {
    title: 'End-to-end customer journey',
    layout: 'responsive',
    definition: `flowchart TD
      inboundCall["Inbound sales call"]
      record["Recording plus metadata saved"]
      exportFeed["Batch to SFTP or data lake"]
      ingest["Pipeline picks up file"]
      transcribe["Speech to text plus diarization"]
      extract["AI structured personalization"]
      matchAddr["Customer plus ship-to validated"]
      pickStory["Testimonial matched verbatim"]
      writeLetter["Letter in brand voice"]
      checks["QA rubric and safety"]
      vendor["Handwriting vendor order"]
      mailbox["Physical letter delivered"]
      inboundCall --> record --> exportFeed --> ingest --> transcribe --> extract --> matchAddr --> pickStory --> writeLetter --> checks --> vendor --> mailbox`,
  },
  {
    title: 'Eligibility, timing, and joins',
    layout: 'responsive',
    definition: `flowchart TD
      nightly["Nightly dump calls orders audio"]
      disp{"Sold disposition"}
      linkCall["Join recording to call id"]
      linkCust["Join call to customer id"]
      addrOk{"Mailing address present and valid"}
      cooling["Cooling window e.g. T plus 5 days"]
      enqueue["Enqueue letter job"]
      skipNo["No letter"]
      nightly --> disp
      disp -->|not sold| skipNo
      disp -->|sold| linkCall --> linkCust --> addrOk
      addrOk -->|no| skipNo
      addrOk -->|yes| cooling --> enqueue`,
  },
  {
    title: 'Ingestion, storage, and call record',
    layout: 'responsive',
    definition: `flowchart TD
      subgraph ingestPipe [Ingestion]
        sched["Scheduled poll or listener"]
        detect["New file detected"]
        validate["Format size checksum"]
        dup{"Duplicate hash"}
        blob["Durable blob store"]
        row["Call record pending or ingested"]
      end
      sched --> detect --> validate --> dup
      dup -->|yes| skipDup["Skip log duplicate"]
      dup -->|no| blob --> row`,
  },
  {
    title: 'Transcription, extraction, and CRM cross-check',
    layout: 'responsive',
    definition: `flowchart TD
      subgraph intelPipe [Intelligence]
        pull["Fetch audio from blob"]
        stt["Transcribe with speaker labels"]
        labelSpk["Agent vs customer turns"]
        llm["Extract probes pain points agent name"]
        crm["Optional CRM probe compare"]
        flagMis["Mismatch flag for ops review"]
        merge["Persist extraction JSON"]
      end
      pull --> stt --> labelSpk --> llm --> crm
      crm -->|mismatch| flagMis --> merge
      crm -->|match or no CRM| merge`,
  },
  {
    title: 'Address, testimonial, and letter assembly',
    layout: 'responsive',
    definition: `flowchart TD
      subgraph matchPipe [Matching and composition]
        phone["Lookup by phone or order keys"]
        usps["USPS or address API validation"]
        pool["Testimonial pool by concern category"]
        rotate["Rotation least recently used"]
        lockTxt["Lock testimonial text verbatim"]
        voice["Voice profile plus template"]
        assemble["Opening personalized middle story close"]
      end
      phone --> usps --> pool --> rotate --> lockTxt --> voice --> assemble`,
  },
  {
    title: 'Validation, vendor, mail, and observability',
    layout: 'responsive',
    definition: `flowchart TD
      subgraph shipPipe [Fulfillment and ops]
        vWord["Verbatim testimonial match"]
        vLen["Length and page limits"]
        vSafe["Safety and claims policy"]
        vVar["Variation vs recent letters"]
        regen["Regenerate on any failed gate"]
        api["Vendor API plus idempotency"]
        confirm["Order id and mail window"]
        auditTrail["Append-only audit per stage"]
        dash["Throughput errors cost alerts"]
        retryFrom["Retry from failed stage backoff"]
        dlqOps["Dead letter queue manual fix"]
      end
      vWord -->|fail| regen
      vWord -->|pass| vLen
      vLen -->|fail| regen
      vLen -->|pass| vSafe
      vSafe -->|fail| regen
      vSafe -->|pass| vVar
      vVar -->|fail| regen
      vVar -->|pass| api --> confirm
      regen --> vWord
      api --> auditTrail
      confirm --> auditTrail
      auditTrail --> dash
      auditTrail --> retryFrom
      retryFrom -->|exhausted| dlqOps`,
  },
];
