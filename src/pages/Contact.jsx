import { useLayoutEffect, useRef, useState } from 'react';
import { Headphones, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/warm-studio/Navbar';
import Footer from '../components/warm-studio/Footer';
import MagneticButton from '../components/ui/MagneticButton';

const FORM_WEBHOOK_URL = import.meta.env.VITE_FORM_WEBHOOK_URL ?? '';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { label: 'Email', value: 'admin@aisolv.io', href: 'mailto:admin@aisolv.io', Icon: Mail },
  { label: 'Phone', value: '+1 (609) 873-5310', href: 'tel:+16098735310', Icon: Phone },
  {
    label: 'Location',
    value: '802 Atkinson Cir, Hillsborough, NJ 08844',
    href: 'https://www.google.com/maps/search/?api=1&query=802+Atkinson+Cir,+Hillsborough,+NJ+08844',
    Icon: MapPin,
  },
];

const supportItems = [
  {
    title: '24/7 Customer support',
    description:
      'Priority support for active deployments. We monitor and respond quickly.',
    Icon: Headphones,
  },
  {
    title: 'Live chat and instant help',
    description:
      'Get quick answers from our team right inside your dashboard.',
    Icon: MessageSquareText,
  },
];

export default function Contact() {
  const container = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  useGSAP(
    () => {
      const heroItems = gsap.utils.toArray('.contact-hero-reveal');
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
          '.contact-hero-line',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'power2.inOut',
            clearProps: 'transform',
          },
          '-=0.55'
        );
    },
    { scope: container }
  );

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray('.contact-reveal-section').forEach((section) => {
        const items = section.querySelectorAll('.contact-stagger');
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

  async function handleSubmit(event) {
    event.preventDefault();

    if (!FORM_WEBHOOK_URL?.trim()) {
      setSubmitState({
        type: 'error',
        message:
          'Form is not configured. Please set VITE_FORM_WEBHOOK_URL or contact us via email.',
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
      consent: formData.get('consent') === 'on',
      source: 'contact-page',
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    try {
      const response = await fetch(FORM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      form.reset();
      setSubmitState({
        type: 'success',
        message: 'Your inquiry has been sent. We will get back to you shortly.',
      });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message:
          'We could not send your inquiry right now. Please try again or use the email above.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div ref={container} className="min-h-screen selection:bg-(--color-accent)/20">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-(--color-text-primary)/5 bg-(--color-base) pt-36 pb-22 md:pt-44 md:pb-28">
          <div className="absolute inset-0 z-0 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_60%)]"></div>

          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <div className="contact-hero-reveal mb-6 flex items-center justify-center gap-3">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent)"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-accent)">
                Contact AiSolv
              </span>
            </div>

            <h1 className="contact-hero-reveal mx-auto max-w-5xl font-sans text-5xl font-extralight leading-[0.98] tracking-tight text-(--color-text-primary) md:text-7xl lg:text-[5.25rem]">
              Let&apos;s connect. <span className="text-gradient-gold font-light">Reach out anytime.</span>
            </h1>

            <p className="contact-hero-reveal mx-auto mt-8 max-w-3xl font-sans text-lg font-light leading-relaxed text-(--color-text-primary)/55 md:text-xl">
              Share a bit about your workflow, current bottlenecks, or the AI
              system you want to build. We&apos;ll point you in the right direction.
            </p>

            <div className="mx-auto mt-12 h-px w-full max-w-4xl overflow-hidden bg-(--color-text-primary)/10">
              <div className="contact-hero-line h-full w-full bg-linear-to-r from-(--color-accent) to-transparent"></div>
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="contact-reveal-section border-b border-(--color-text-primary)/5 bg-(--color-surface) py-16 lg:py-20"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-3 md:grid-cols-3">
              {contactItems.map(({ label, value, href, Icon }) => {
                const content = (
                  <div className="contact-stagger flex h-full items-start gap-4 rounded-2xl bg-(--color-text-primary)/2 p-6">
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
                      {content}
                    </div>
                  </a>
                ) : (
                  <div key={label} className="rounded-2xl luxe-glass">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div className="contact-stagger rounded-3xl luxe-glass p-8 md:p-10">
                <h2 className="font-sans text-4xl font-light leading-[1.1] tracking-tight text-(--color-text-primary) md:text-5xl">
                  Let&apos;s connect! Reach out anytime!
                </h2>
                <p className="mt-5 max-w-xl font-sans text-base font-light leading-relaxed text-(--color-text-primary)/55">
                  We&apos;ll respond within one business day. For urgent production
                  issues, use the phone number above.
                </p>

                <div className="mt-10 space-y-5">
                  {supportItems.map(({ title, description, Icon }) => (
                    <div
                      key={title}
                      className="contact-stagger flex items-start gap-4 rounded-2xl border border-(--color-text-primary)/6 bg-(--color-base)/35 p-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.25)]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-sans text-lg font-light text-(--color-text-primary)">
                          {title}
                        </h3>
                        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/55">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="solutions" className="contact-stagger rounded-3xl luxe-glass p-8 md:p-10">
                <p className="max-w-xl font-sans text-xl font-light leading-relaxed text-(--color-text-primary)/78">
                  Connect with AiSolv. Share a bit about your project and
                  we&apos;ll get back to you.
                </p>

                <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary)/45">
                      Your Name*
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-3 w-full border-b border-(--color-text-primary)/12 bg-transparent pb-4 font-sans text-base font-light text-(--color-text-primary) outline-none transition-colors placeholder:text-(--color-text-primary)/25 focus:border-(--color-accent)"
                      placeholder="Enter your name"
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary)/45">
                      Email*
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-3 w-full border-b border-(--color-text-primary)/12 bg-transparent pb-4 font-sans text-base font-light text-(--color-text-primary) outline-none transition-colors placeholder:text-(--color-text-primary)/25 focus:border-(--color-accent)"
                      placeholder="you@company.com"
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary)/45">
                      Message
                    </span>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      className="mt-3 w-full rounded-2xl border border-(--color-text-primary)/8 bg-(--color-base)/30 px-5 py-4 font-sans text-base font-light text-(--color-text-primary) outline-none transition-colors placeholder:text-(--color-text-primary)/25 focus:border-(--color-accent)"
                      placeholder="Tell us about your current setup, business goals, or what you want to automate."
                    />
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 h-4 w-4 rounded border border-(--color-text-primary)/20 bg-transparent accent-(--color-accent)"
                    />
                    <span className="font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/55">
                      I agree to the{' '}
                      <a
                        href="/terms"
                        className="underline underline-offset-4 hover:text-(--color-text-primary)"
                      >
                        terms and conditions
                      </a>
                    </span>
                  </label>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                    <MagneticButton
                      href="https://calendly.com/admin-aisolv/discovery"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white px-10 py-4 text-sm font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-(--color-text-primary)/90"
                    >
                      BOOK STRATEGY CALL
                    </MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer rounded-full border border-(--color-text-primary)/12 px-8 py-4 font-mono text-sm font-light uppercase tracking-[0.2em] text-(--color-text-primary)/65 transition-colors hover:border-(--color-text-primary)/25 hover:text-(--color-text-primary)"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </div>

                  {submitState.message && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className={`font-sans text-sm font-light ${
                        submitState.type === 'success'
                          ? 'text-(--color-accent)'
                          : 'text-red-400/90'
                      }`}
                    >
                      {submitState.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}