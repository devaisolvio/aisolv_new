import { useState } from 'react';
import { cn } from '../../lib/cn';

const tabs = ['Consulting', 'B2B SaaS', 'Logistics', 'Finance'];

const content = {
  Consulting: ['Accolade', 'Stanford', 'Westrom Group'],
  'B2B SaaS': ['Ballyhoo', 'Creative Launch', 'NeuroQ'],
  Logistics: ['Rugtomize', 'Volado', 'Trackem'],
  Finance: ['Life Seasons', 'AuraReveal'],
};

const proofPoints = [
  { value: '20+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '40%', label: 'Efficiency Boost' },
  { value: '24/7', label: 'Support' },
];

export default function TrustLogos() {
  const [activeTab, setActiveTab] = useState('Consulting');

  return (
    <section className="overflow-hidden border-b border-[var(--color-text-primary)]/5 bg-[var(--color-surface)] py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
        <div className="mb-24 grid w-full max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label} className="flex flex-col items-center text-center">
              <div className="mb-3 font-sans text-5xl font-light text-gradient-gold md:text-6xl">
                {point.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-primary)]/50">
                {point.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mb-12 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">
          Trusted by high-trust operators
        </p>

        <div className="mb-16 flex w-full max-w-3xl flex-wrap justify-center gap-8 border-b border-[var(--color-text-primary)]/10 pb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative -mb-6 pb-6 font-sans text-sm tracking-wide transition-all duration-300',
                activeTab === tab
                  ? 'font-medium text-[var(--color-text-primary)]'
                  : 'font-light text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70'
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-glow)]"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex w-full flex-wrap justify-center gap-y-12 opacity-60 md:gap-y-24">
          {content[activeTab].map((company, index) => (
            <div
              key={`${activeTab}-${company}`}
              className="w-1/2 animate-[fadeIn_0.5s_ease-out_forwards] text-center font-serif text-xl italic tracking-tight text-[var(--color-text-primary)] opacity-0 md:w-1/4 md:text-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {company}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
