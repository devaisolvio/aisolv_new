import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

const MIN_SCALE = 0.4;
const MAX_SCALE = 3.5;

/**
 * Pan + zoom wrapper for large SVG diagrams (wheel zoom, drag to pan, reset).
 * @param {{ children: import('react').ReactNode, className?: string }} props
 */
export default function MermaidPanCanvas({ children, className }) {
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const drag = useRef({ active: false, x: 0, y: 0, tx: 0, ty: 0 });

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, s + 0.2));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(MIN_SCALE, s - 0.2));
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? -0.12 : 0.12;
      setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + factor)));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    drag.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      tx,
      ty,
    };
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    setTx(drag.current.tx + dx);
    setTy(drag.current.ty + dy);
  };

  const onPointerUp = (e) => {
    drag.current.active = false;
    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={cn('relative rounded-md border border-[var(--color-text-primary)]/10 bg-[var(--color-base)]/40', className)}>
      <div className="pointer-events-none absolute right-2 top-2 z-10 max-w-[11rem] rounded bg-[var(--color-base)]/90 px-2 py-1 font-mono text-[9px] leading-snug text-[var(--color-text-primary)]/50 backdrop-blur-sm md:max-w-none md:text-[10px]">
        Drag to pan · scroll wheel to zoom
      </div>
      <div className="absolute bottom-2 left-2 z-10 flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={zoomOut}
          className="rounded border border-[var(--color-text-primary)]/20 bg-[var(--color-base)]/90 px-2 py-1 font-mono text-xs text-[var(--color-text-primary)]/80 hover:bg-[var(--color-text-primary)]/10"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          onClick={zoomIn}
          className="rounded border border-[var(--color-text-primary)]/20 bg-[var(--color-base)]/90 px-2 py-1 font-mono text-xs text-[var(--color-text-primary)]/80 hover:bg-[var(--color-text-primary)]/10"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded border border-[var(--color-text-primary)]/20 bg-[var(--color-base)]/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/70 hover:bg-[var(--color-text-primary)]/10"
        >
          Reset
        </button>
      </div>

      <div
        ref={viewportRef}
        role="presentation"
        className="h-[min(26rem,58vh)] w-full cursor-grab overflow-hidden touch-none selection:bg-transparent active:cursor-grabbing md:h-[min(32rem,62vh)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex min-h-full min-w-full items-start justify-start p-5 will-change-transform md:p-6"
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
