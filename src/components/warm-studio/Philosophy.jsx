import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
        },
      });

      timeline
        .from('.phil-text-1', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        .from(
          '.phil-text-2',
          {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.6'
        );
    }, container);

    return () => context.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={container}
      className="relative overflow-hidden border-b border-[var(--color-text-primary)]/5 bg-[var(--color-base)] px-6 py-40 lg:py-56"
    >
      <div className="parallax-bg absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_70%)]"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="phil-text-1 mb-12 max-w-3xl font-sans text-xl font-light leading-relaxed tracking-wide text-[var(--color-text-primary)]/40 md:text-3xl">
          Most agencies focus on selling <br className="hidden md:block" />
          <span className="font-normal text-[var(--color-text-primary)]/80">
            bloated $200K software platforms.
          </span>
        </p>
        <h2 className="phil-text-2 max-w-5xl font-sans text-5xl font-extralight leading-[1.05] tracking-tight text-[var(--color-text-primary)] md:text-7xl lg:text-[7rem]">
          We deliver <br />
          <span className="text-gradient-gold">exclusive architecture</span>
          <br /> you actually own.
        </h2>
      </div>
    </section>
  );
}
