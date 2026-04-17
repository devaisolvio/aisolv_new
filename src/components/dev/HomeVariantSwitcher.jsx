import { useLocation } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { useHomeVariant } from '../../context/useHomeVariant';

const VARIANTS = [
  { id: 'current', label: '← Current' },
  { id: 'draft', label: 'Draft copy' },
  { id: 'draftV2', label: 'Draft v2 →' },
];

export default function HomeVariantSwitcher() {
  const { pathname } = useLocation();
  const { side, setSide } = useHomeVariant();

  if (pathname !== '/') return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-5 pt-10"
      role="region"
      aria-label="Homepage preview: current, draft, or draft v2"
    >
      <div className="pointer-events-auto flex items-stretch gap-0 overflow-hidden rounded-full border border-[var(--color-text-primary)]/10 luxe-glass shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        {VARIANTS.map((variant, index) => (
          <div key={variant.id} className="flex items-stretch">
            {index > 0 && (
              <div
                className="w-px shrink-0 bg-[var(--color-text-primary)]/10"
                aria-hidden
              />
            )}
            <button
              type="button"
              onClick={() => setSide(variant.id)}
              className={cn(
                'min-w-[140px] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 sm:min-w-[160px]',
                side === variant.id
                  ? 'bg-[var(--color-accent)] text-[var(--color-text-primary)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                  : 'bg-transparent text-[var(--color-text-primary)]/45 hover:bg-[var(--color-text-primary)]/5 hover:text-[var(--color-text-primary)]/75'
              )}
            >
              {variant.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
