/**
 * Exact copy of WarmStudio for safe experimentation.
 * Edit this file only — WarmStudio.jsx stays the shipped homepage.
 */
import { lazy, Suspense } from 'react';
import Navbar from './components/warm-studio/Navbar';
import Hero from './components/warm-studio/Hero';
import TrustLogos from './components/warm-studio/TrustLogos';
import Marquee from './components/warm-studio/Marquee';
import CustomerReviews from './components/warm-studio/CustomerReviews';
import Faq from './components/warm-studio/Faq';
import Philosophy from './components/warm-studio/Philosophy';
import PhaseDeliveryCards from './components/warm-studio/PhaseDeliveryCards';
import Footer from './components/warm-studio/Footer';

const FeaturesDraftSection = lazy(() => import('./components/warm-studio/FeaturesDraftSection'));

const draftHeadlineLines = [
  ['Custom', 'ERP', '&'],
  ['AI', 'Workflows'],
  ['for', 'Ecom'],
];

export default function WarmStudioDraft() {
  return (
    <div className="min-h-screen selection:bg-(--color-accent)/20">
      <Navbar />
      <main>
        <Hero
          headlineLines={draftHeadlineLines}
          goldWordIndices={[1, 3, 4, 6]}
          eyebrow="Pallets to performance ads, automated"
          lead="We build intelligent systems for B2B and D2C operators running multi-channel brands. Two core offerings:"
          leadBullets={[
            '<strong style="color:var(--color-accent)">Custom ERP</strong> - NetSuite, Cin7, Oracle, DOSS all take a cut of your revenue for bloated software. We build a custom system that costs less, does more, and you own it.',
            '<strong style="color:var(--color-accent)">AI Marketing Factory</strong> - Unlimited ad creative, always-on competitor research, and intelligent automation so your team operates at 10x without 10x the headcount.',
          ]}
        />
        <TrustLogos layout="wall" />
        <Marquee />
        <Suspense
          fallback={
            <section className="border-b border-[var(--color-text-primary)]/5 bg-[var(--color-base)] py-24 lg:py-32">
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-primary)]/40">
                Loading solutions…
              </p>
            </section>
          }
        >
          <FeaturesDraftSection />
        </Suspense>
        <Philosophy />
        <PhaseDeliveryCards />
        <CustomerReviews />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
