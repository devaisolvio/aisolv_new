import { useState } from 'react';
import { cn } from '../../lib/cn';

const phases = [
  {
    num: '01',
    title: 'Discovery & Analysis',
    desc:
      'We analyze your current workflows, identify bottlenecks, and understand your specific business needs.',
    details:
      'We analyze your current workflows, identify bottlenecks, and understand your specific business needs.',
    bullets: [
      'Process mapping',
      'Pain point identification',
      'ROI assessment',
      'Custom requirements',
    ],
  },
  {
    num: '02',
    title: 'Strategy & Design',
    desc:
      'Our experts design a tailored automation strategy that aligns with your business goals and objectives.',
    details:
      'Our experts design a tailored automation strategy that aligns with your business goals and objectives.',
    bullets: [
      'Solution architecture',
      'Technology selection',
      'Integration planning',
      'Timeline creation',
    ],
  },
  {
    num: '03',
    title: 'Implementation',
    desc:
      'We implement and configure your automation solutions with minimal disruption to your operations.',
    details:
      'We implement and configure your automation solutions with minimal disruption to your operations.',
    bullets: [
      'System setup',
      'Data migration',
      'Testing & validation',
      'Staff training',
    ],
  },
  {
    num: '04',
    title: 'Launch & Optimization',
    desc:
      'We launch your automation and continuously monitor and optimize performance for maximum efficiency.',
    details:
      'We launch your automation and continuously monitor and optimize performance for maximum efficiency.',
    bullets: [
      'Go-live support',
      'Performance monitoring',
      'Continuous optimization',
      'Success metrics',
    ],
  },
];

export default function PhaseDeliveryCards() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="process"
      className="relative z-10 border-b border-[var(--color-text-primary)]/5 bg-[var(--color-base)] py-24 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-6 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
            The Process
          </h2>
          <h3 className="font-sans text-5xl font-light leading-[1.1] tracking-tight text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
            How we <span className="text-gradient-gold font-extralight">execute.</span>
          </h3>
        </div>

        <div className="flex w-full flex-col gap-4">
          {phases.map((phase, index) => {
            const isActive = activePhase === index;

            return (
              <div
                key={phase.num}
                onClick={() => setActivePhase(index)}
                className={cn(
                  'cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] luxe-glass',
                  isActive
                    ? 'bg-[var(--color-text-primary)]/[0.04] border-[var(--color-text-primary)]/20'
                    : 'bg-[var(--color-text-primary)]/[0.01] hover:bg-[var(--color-text-primary)]/[0.03]'
                )}
              >
                <div className="relative z-10 flex flex-col justify-between gap-8 p-8 md:flex-row md:items-center md:p-12">
                  <div className="flex items-center gap-8">
                    <span
                      className={cn(
                        'font-mono text-3xl font-light transition-colors duration-500',
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-text-primary)]/20'
                      )}
                    >
                      {phase.num}
                    </span>
                    <h4
                      className={cn(
                        'font-sans text-2xl tracking-tight transition-colors duration-500 md:text-4xl',
                        isActive
                          ? 'font-light text-[var(--color-text-primary)]'
                          : 'font-extralight text-[var(--color-text-primary)]/50'
                      )}
                    >
                      {phase.title}
                    </h4>
                  </div>

                  <div
                    className={cn(
                      'transition-all duration-500 md:w-1/3',
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-2 opacity-50'
                    )}
                  >
                    <p
                      className={cn(
                        'font-sans text-sm leading-relaxed transition-colors duration-500 md:text-base',
                        isActive
                          ? 'font-light text-[var(--color-text-primary)]/80'
                          : 'font-extralight text-[var(--color-text-primary)]/40'
                      )}
                    >
                      {phase.desc}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    'grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="group mt-4 flex flex-col gap-8 border-t border-[var(--color-text-primary)]/5 p-8 pt-0 md:flex-row md:p-12 md:pt-0">
                      <div className="relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-xl border border-[var(--color-text-primary)]/5 bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_70%)] p-8 md:w-1/2">
                        <div
                          className="absolute inset-x-0 z-10 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-80"
                          style={{
                            animationName: 'scanHorizontalSoft',
                            animationDuration: '4s',
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'ease-in-out',
                          }}
                        ></div>
                        <svg
                          className="h-16 w-16 animate-[spin_40s_linear_infinite] stroke-[var(--color-text-primary)]/20"
                          viewBox="0 0 100 100"
                          fill="none"
                          strokeWidth="1"
                        >
                          <circle cx="50" cy="50" r="40" strokeDasharray="4 8" />
                          <circle
                            cx="50"
                            cy="50"
                            r="20"
                            stroke="var(--color-accent)"
                            className="opacity-50"
                          />
                        </svg>
                      </div>

                      <div className="mt-4 flex flex-col justify-center md:w-1/2">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]"></div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/50">
                            Architecture Node Activated
                          </span>
                        </div>
                        <p className="font-sans font-light leading-relaxed text-[var(--color-text-primary)]/60">
                          {phase.details}
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {phase.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="group rounded-lg border border-[var(--color-text-primary)]/5 bg-[var(--color-base)]/30 px-4 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--color-text-primary)]/15 hover:bg-[var(--color-base)]/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                            >
                              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/60 transition-colors duration-300 group-hover:text-[var(--color-text-primary)]/90">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
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
