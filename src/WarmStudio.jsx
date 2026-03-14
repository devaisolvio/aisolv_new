import Navbar from './components/warm-studio/Navbar';
import Hero from './components/warm-studio/Hero';
import TrustLogos from './components/warm-studio/TrustLogos';
import Marquee from './components/warm-studio/Marquee';
import CustomerReviews from './components/warm-studio/CustomerReviews';
import Faq from './components/warm-studio/Faq';
import Features from './components/warm-studio/Features';
import Philosophy from './components/warm-studio/Philosophy';
import PhaseDeliveryCards from './components/warm-studio/PhaseDeliveryCards';
import Footer from './components/warm-studio/Footer';

export default function WarmStudio() {
  return (
    <div className="min-h-screen selection:bg-(--color-accent)/20">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <Marquee />
       
        <Features />
        <Philosophy />
        <PhaseDeliveryCards />
        <CustomerReviews />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
