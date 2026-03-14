import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import MagneticButton from '../ui/MagneticButton';
import { cn } from '../../lib/cn';

const headlineWords = ['AI', 'Accelerators', 'for', 'Business', 'Growth.'];

export default function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

      timeline
        .from('.hero-headline-word', {
          yPercent: 120,
          opacity: 0,
          rotationZ: 5,
          duration: 1.5,
          stagger: 0.08,
          delay: 0.2,
        })
        .from(
          '.hero-split',
          {
            y: 30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
          },
          '-=1'
        )
        .to(
          '.hero-line',
          {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '-=1.2'
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-base)] pt-32 pb-12"
    >
      <div className="absolute inset-0 z-0 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_60%)]"></div>

      <div className="relative z-20 mx-auto w-full max-w-5xl px-6 text-center">
        <div className="flex w-full flex-col gap-12">
          <h1 className="flex flex-wrap justify-center gap-x-6 gap-y-2 overflow-hidden text-center text-balance">
            {headlineWords.map((word, index) => (
              <div key={word} className="overflow-hidden pb-4">
                <span
                  className={cn(
                    'hero-headline-word inline-block font-sans text-6xl leading-[0.9] tracking-tight md:text-8xl lg:text-[8rem]',
                    index === 3 || index === 4
                      ? 'text-gradient-gold font-normal'
                      : 'text-[var(--color-text-primary)] font-extralight'
                  )}
                >
                  {word}
                </span>
              </div>
            ))}
          </h1>

          <div className="mx-auto flex w-full max-w-7xl flex-col items-end justify-between gap-12 md:flex-row">
            <div className="hero-split max-w-sm text-left">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]"></div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-accent)]">
                  For B2B Services Companies
                </span>
              </div>
              <p className="font-sans font-light leading-relaxed text-[var(--color-text-primary)]/50">
                Supercharging revenue and operations workflows to help
                businesses scale by eliminating repetitive manual work and
                replacing bloated software.
              </p>
            </div>

            <div className="hero-split flex w-full flex-col items-center gap-6 sm:flex-row md:w-auto">
              <MagneticButton
                href="https://calendly.com/admin-aisolv/discovery"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white px-10 py-3 text-sm font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-[var(--color-text-primary)]/90 sm:w-auto"
              >
                INITIATE
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                className="w-full text-sm py-3 font-light tracking-wide text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] sm:w-auto"
              >
                View architecture
              </MagneticButton>
            </div>
          </div>

          <div className="h-[1px] w-full overflow-hidden bg-[var(--color-text-primary)]/10">
            <div className="hero-line h-full w-0 bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
