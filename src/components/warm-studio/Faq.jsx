import { useState } from 'react';
import { cn } from '../../lib/cn';
import MagneticButton from '../ui/MagneticButton';

const faqs = [
  {
    question: 'How long does it take to implement automation solutions?',
    answer:
      'Implementation timelines vary based on complexity, but most projects are completed within 2-4 weeks. We provide detailed timelines during our initial consultation.',
  },
  {
    question:
      'Will your automation solutions integrate with our existing property management systems?',
    answer:
      'Yes. Our solutions are built to connect seamlessly with the tools property managers already use. We integrate with leading platforms like AppFolio, Propertyware, LeadSimple, as well as communication tools such as Slack, Microsoft 365, and Google Workspace. Custom API integrations ensure smooth data flow between your leasing, accounting, and tenant support systems.',
  },
  {
    question: 'Do you provide training and ongoing support?',
    answer:
      'Absolutely! We include comprehensive training for your team as part of every implementation. Additionally, we offer 24/7 technical support, regular optimization reviews, and continuous monitoring to ensure your automation solutions perform at peak efficiency.',
  },
  {
    question: 'Is our data secure with your automation solutions?',
    answer:
      'Data security is our top priority. We implement enterprise-grade encryption, comply with GDPR and SOC 2 standards, and follow strict access controls. All automations are designed with security-first principles and undergo regular security audits.',
  },
  {
    question: 'Can automation solutions scale as our business grows?',
    answer:
      "Yes, our solutions are built with scalability in mind. Whether you're processing 100 or 100,000 transactions, our automation infrastructure can scale up or down based on your needs without requiring significant reconfiguration or additional development.",
  },
  {
    question: 'How do you ensure minimal disruption during implementation?',
    answer:
      'We use a phased rollout approach, implementing automations incrementally to minimize business disruption. Most implementations can be done during off-hours or in parallel with existing processes. We also provide comprehensive testing and fallback procedures.',
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <article className="group overflow-hidden rounded-2xl luxe-glass">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 bg-(--color-text-primary)/1 px-6 py-6 text-left transition-colors duration-500 group-hover:bg-(--color-text-primary)/3 md:px-8"
      >
        <span className="font-sans text-lg font-light tracking-tight text-(--color-text-primary) md:text-xl">
          {item.question}
        </span>

        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--color-text-primary)/10 bg-(--color-base)/60 font-mono text-lg text-(--color-accent) transition-transform duration-300',
            isOpen && 'rotate-45'
          )}
        >
          +
        </span>
      </button>

      <div
        className={cn(
          'grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-(--color-text-primary)/6 px-6 py-6 md:px-8">
            <p className="max-w-3xl font-sans text-base font-light leading-relaxed text-(--color-text-primary)/58">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-(--color-text-primary)/5 bg-(--color-base) py-24 lg:py-32"
    >
      <div className="absolute inset-0 opacity-45">
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-(--color-accent-glow) blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <div className="max-w-3xl">
            <h2 className="mb-6 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-(--color-accent)">
              <div className="h-px w-8 bg-linear-to-r from-(--color-accent) to-transparent"></div>
              Frequently Asked Questions
            </h2>
            <h3 className="mb-6 font-sans text-4xl font-light leading-[1.1] tracking-tight text-(--color-text-primary) md:text-5xl lg:text-6xl">
              Get answers to the most common questions about our automation solutions and implementation process.
            </h3>
          </div>

          <div className="rounded-2xl border border-(--color-text-primary)/8 bg-(--color-base)/30 p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/45">
              Still Have Questions?
            </p>
            <p className="font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/58">
              Our team is here to help. Schedule a free consultation to discuss
              your specific needs and get personalized answers.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href="https://calendly.com/admin-aisolv/discovery"
                target="_blank"
                rel="noreferrer"
                className="bg-white px-6 py-3 text-xs font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-(--color-text-primary)/90"
              >
                Schedule Free Consultation
              </MagneticButton>
              <MagneticButton
                href="/contact"
                variant="ghost"
                className="px-6 py-3 text-xs font-light tracking-widest text-(--color-text-primary)/55 hover:text-(--color-text-primary)"
              >
                Contact Support
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {faqs.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
