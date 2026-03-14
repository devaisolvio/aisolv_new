import { useLayoutEffect, useRef } from 'react';
import { Check, Mail, MapPin, Phone, ShieldCheck, Target, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/warm-studio/Navbar';
import Footer from '../components/warm-studio/Footer';
import MagneticButton from '../components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { label: 'Email', value: 'admin@aisolv.io', href: 'mailto:admin@aisolv.io', Icon: Mail },
  { label: 'Phone', value: '+1 (609) 873-5310', href: 'tel:+16098735310', Icon: Phone },
  { label: 'Location', value: '802 Atkinson Cir, Hillsborough, NJ 08844', Icon: MapPin },
];

const bullets = [
  'Practical AI that ships, not research experiments',
  'Clear success metrics with weekly demos',
  'Security-first delivery with auditability and least-privilege access',
];

const facts = [
  {
    title: 'Outcome-driven',
    text: 'We start from the KPI and work backwards so every sprint maps to business impact.',
    Icon: Target,
  },
  {
    title: 'Fast iterations',
    text: 'Lean pilots in weeks, then scale what works with observability and feedback loops.',
    Icon: Zap,
  },
  {
    title: 'Production-safe',
    text: 'Guardrails, monitoring, and change control keep systems reliable after launch.',
    Icon: ShieldCheck,
  },
];

const stats = [
  { value: '20+', label: 'Happy clients' },
  { value: '40%', label: 'Avg. efficiency boost' },
];

export default function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      const heroItems = gsap.utils.toArray('.about-hero-reveal');
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

      timeline
        .fromTo(
          heroItems,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.14,
            delay: 0.15,
            clearProps: 'transform,opacity,visibility',
          }
        )
        .fromTo(
          '.about-hero-cta',
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            clearProps: 'transform,opacity,visibility',
          },
          '-=0.55'
        )
        .fromTo(
          '.about-hero-line',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'power2.inOut',
            clearProps: 'transform',
          },
          '-=0.7'
        );
    },
    { scope: container }
  );

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray('.about-reveal-section').forEach((section) => {
        const items = section.querySelectorAll('.about-stagger');
        if (!items.length) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              items,
              { y: 36, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.95,
                stagger: 0.12,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
              }
            );
          },
        });
      });
    }, container);

    return () => context.revert();
  }, []);

  return (
    <div ref={container} className="min-h-screen selection:bg-(--color-accent)/20">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-(--color-text-primary)/5 bg-(--color-base) pt-36 pb-22 md:pt-44 md:pb-28">
          <div className="absolute inset-0 z-0 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_60%)]"></div>

          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <div className="about-hero-reveal mb-6 flex items-center justify-center gap-3">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent)"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-accent)">
                Who We Are
              </span>
            </div>

            <h1 className="about-hero-reveal mx-auto max-w-5xl font-sans text-5xl font-extralight leading-[0.98] tracking-tight text-(--color-text-primary) md:text-7xl lg:text-[5.25rem]">
              About <span className="text-gradient-gold font-light">AiSolv</span>
            </h1>

            <p className="about-hero-reveal mx-auto mt-8 max-w-3xl font-sans text-lg font-light leading-relaxed text-(--color-text-primary)/55 md:text-xl">
              AiSolv helps teams automate busywork and make decisions faster
              with safe, production-grade AI. We build pragmatic systems that
              fit your stack and deliver measurable business value.
            </p>

            <div className="about-hero-cta mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton
                href="https://calendly.com/admin-aisolv/discovery"
                target="_blank"
                rel="noreferrer"
                className="bg-white px-10 py-4 text-sm font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-(--color-text-primary)/90"
              >
                BOOK DISCOVERY CALL
              </MagneticButton>
              <MagneticButton
                href="/contact"
                variant="ghost"
                className="px-8 py-4 text-sm font-light tracking-widest text-(--color-text-primary)/55 hover:text-(--color-text-primary)"
              >
                CONTACT US
              </MagneticButton>
            </div>

            <div className="mx-auto mt-12 h-px w-full max-w-4xl overflow-hidden bg-(--color-text-primary)/10">
              <div className="about-hero-line h-full w-full bg-linear-to-r from-(--color-accent) to-transparent"></div>
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="about-reveal-section border-b border-(--color-text-primary)/5 bg-(--color-surface) py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {contactItems.map(({ label, value, href, Icon }) => {
                const Content = (
                  <div className="about-stagger flex h-full items-start gap-4 rounded-2xl bg-(--color-text-primary)/2 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-text-primary)/8 bg-(--color-base)/70">
                      <Icon className="h-4 w-4 text-(--color-accent)" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/45">
                        {label}
                      </p>
                      <p className="mt-2 font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/78">
                        {value}
                      </p>
                    </div>
                  </div>
                );

                return href ? (
                  <a key={label} href={href} className="group rounded-2xl luxe-glass">
                    <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                      {Content}
                    </div>
                  </a>
                ) : (
                  <div key={label} className="rounded-2xl luxe-glass">
                    {Content}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
              <div className="about-stagger">
                <h2 className="mb-5 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-(--color-accent)">
                  <div className="h-px w-8 bg-linear-to-r from-(--color-accent) to-transparent"></div>
                  About AiSolv
                </h2>
                <p className="max-w-3xl font-sans text-xl font-light leading-relaxed text-(--color-text-primary)/78 md:text-2xl">
                  We build pragmatic systems, from data pipelines and RAG
                  assistants to workflow automations, that fit the way your team
                  already operates.
                </p>

                <ul className="mt-8 space-y-4">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-accent) text-black">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="font-sans text-base font-light leading-relaxed text-(--color-text-primary)/58">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="results" className="about-stagger rounded-3xl luxe-glass p-8 md:p-9">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/45">
                  What We Focus On
                </p>
                <p className="font-sans text-lg font-light leading-relaxed text-(--color-text-primary)/72">
                  Shipping value fast, keeping systems safe, and making change
                  measurable.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-(--color-text-primary)/6 bg-(--color-base)/40 p-5"
                    >
                      <div className="mb-2 font-sans text-3xl font-light text-gradient-gold">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/45">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="solutions"
          className="about-reveal-section border-b border-(--color-text-primary)/5 bg-(--color-base) py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="about-stagger mb-12 max-w-3xl">
              <h2 className="mb-6 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-(--color-accent)">
                <div className="h-px w-8 bg-linear-to-r from-(--color-accent) to-transparent"></div>
                Quick Facts
              </h2>
              <h3 className="font-sans text-4xl font-light leading-[1.1] tracking-tight text-(--color-text-primary) md:text-5xl">
                Precise by design, fast in delivery.
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {facts.map(({ title, text, Icon }) => (
                <article key={title} className="about-stagger rounded-2xl luxe-glass p-6 md:p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-(--color-text-primary)/8 bg-(--color-base)/70 text-(--color-accent)">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h4 className="mt-5 font-sans text-xl font-light tracking-tight text-(--color-text-primary)">
                    {title}
                  </h4>
                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/55">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}