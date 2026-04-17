/**
 * Third standalone homepage variant - Draft v2.
 * Edit this file and anything under components/warm-studio-v2/ freely;
 * none of those changes affect WarmStudio or WarmStudioDraft.
 */
import { lazy, Suspense } from 'react';
import Navbar from './components/warm-studio-v2/Navbar';
import Hero from './components/warm-studio-v2/Hero';
import TrustLogos from './components/warm-studio-v2/TrustLogos';
import Marquee from './components/warm-studio-v2/Marquee';
import CustomerReviews from './components/warm-studio-v2/CustomerReviews';
import Faq from './components/warm-studio-v2/Faq';
import Philosophy from './components/warm-studio-v2/Philosophy';
import PhaseDeliveryCards from './components/warm-studio-v2/PhaseDeliveryCards';
import Footer from './components/warm-studio-v2/Footer';

const FeaturesDraftSection = lazy(() => import('./components/warm-studio-v2/FeaturesDraftSection'));

const draftHeadlineLines = [
  ['Custom', 'ERP', '&'],
  ['AI', 'Workflows'],
  ['for', 'Ecom'],
];

export default function WarmStudioDraftV2() {
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
