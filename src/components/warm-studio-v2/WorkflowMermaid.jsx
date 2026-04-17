import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import MermaidPanCanvas from './MermaidPanCanvas';

let mermaidInstance = null;
let renderQueue = Promise.resolve();

const MD_MIN_WIDTH = '(min-width: 768px)';

function sanitizeRenderId(id) {
  return id.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function stripFlowchartHeader(definition) {
  return definition.replace(/^\s*flowchart\s+(TD|TB|LR|BT)\s*\n/i, '').trim();
}

async function getMermaid() {
  if (mermaidInstance) return mermaidInstance;
  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'dark',
    themeVariables: {
      fontSize: '16px',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      edgeLabelBackground: 'transparent',
      clusterBkg: 'transparent',
      clusterBorder: 'rgba(255,255,255,0.12)',
      mainBkg: 'transparent',
    },
    flowchart: {
      nodeSpacing: 28,
      rankSpacing: 32,
      padding: 10,
      useMaxWidth: false,
      htmlLabels: true,
    },
  });
  mermaidInstance = mermaid;
  return mermaid;
}

function cleanupMermaidErrors() {
  document
    .querySelectorAll('[id^="dwf-"],[id^="dmermaid-"],[data-mermaid-error]')
    .forEach((el) => el.remove());
}

function enqueueRender(id, definition) {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  renderQueue = renderQueue.then(async () => {
    try {
      const mermaid = await getMermaid();
      const result = await mermaid.render(id, definition);
      cleanupMermaidErrors();
      resolve(result);
    } catch (err) {
      cleanupMermaidErrors();
      reject(err);
    }
  });
  return promise;
}

/**
 * @param {{ definition: string, renderId: string, label?: string, layout?: 'fixed' | 'responsive', panZoom?: boolean }} props
 */
export default function WorkflowMermaid({
  definition,
  renderId,
  label,
  layout = 'fixed',
  panZoom = true,
}) {
  const hostRef = useRef(null);
  const safeId = sanitizeRenderId(renderId);

  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MD_MIN_WIDTH).matches : false
  );

  useEffect(() => {
    if (layout !== 'responsive') return;
    const mq = window.matchMedia(MD_MIN_WIDTH);
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [layout]);

  const builtDefinition = useMemo(() => {
    const raw = definition?.trim() ?? '';
    if (!raw) return '';
    if (layout !== 'responsive') return raw;
    const body = stripFlowchartHeader(raw);
    const direction = wide ? 'LR' : 'TD';
    if (!body) return raw;
    return `flowchart ${direction}\n${body}`;
  }, [definition, layout, wide]);

  useEffect(() => {
    if (!builtDefinition || !hostRef.current) return;

    const el = hostRef.current;
    let cancelled = false;

    const mermaidId = `wf-${safeId}-${Math.random().toString(36).slice(2, 9)}`;

    enqueueRender(mermaidId, builtDefinition)
      .then(({ svg }) => {
        if (cancelled || hostRef.current !== el) return;
        el.innerHTML = svg;
        const svgEl = el.querySelector('svg');
        if (svgEl) {
          const edgeLabels =
            svgEl.querySelector('g.edgeLabels') ??
            Array.from(svgEl.querySelectorAll('g')).find((g) =>
              (g.getAttribute('class') || '').toLowerCase().includes('edgelabel')
            );
          if (edgeLabels) {
            svgEl.appendChild(edgeLabels);
          }
        }
      })
      .catch((err) => {
        console.error(`[WorkflowMermaid] render failed (${mermaidId}):`, err);
        if (!cancelled && hostRef.current === el) {
          el.innerHTML = `<p class="font-mono text-[10px] text-[var(--color-text-primary)]/50">Diagram error: ${
            err?.message || 'unknown'
          }</p>`;
        }
      });

    return () => {
      cancelled = true;
      if (hostRef.current === el) {
        el.innerHTML = '';
      }
    };
  }, [builtDefinition, safeId]);

  const isLrDesktop = layout === 'responsive' && wide;

  const diagram = (
    <div
      ref={hostRef}
      className={cn(
        'workflow-mermaid text-[var(--color-text-primary)] [&_svg]:max-w-none [&_svg]:shrink-0',
        isLrDesktop ? '[&_svg]:max-h-none' : '[&_svg]:max-h-[min(36rem,70vh)]'
      )}
      role="img"
      aria-label={label ? `${label} workflow diagram` : 'Workflow diagram'}
    />
  );

  if (panZoom) {
    return <MermaidPanCanvas>{diagram}</MermaidPanCanvas>;
  }

  return diagram;
}
