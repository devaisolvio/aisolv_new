import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden border-t border-[var(--color-text-primary)]/5 bg-[var(--color-base)] px-6 pt-32 pb-12">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[600px] overflow-hidden opacity-30">
        <div className="absolute bottom-0 left-1/2 h-full w-[150%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,var(--color-accent-glow)_0%,transparent_60%)] md:w-full"></div>

        <svg
          className="absolute bottom-0 h-[300px] w-full md:h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-100 200 Q 300 50, 500 200 T 1100 200"
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            className="animate-[dash_10s_linear_infinite] opacity-40"
          />
          <path
            d="M100 300 Q 400 350, 600 250 T 1200 150"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="animate-[dash_15s_linear_infinite_reverse]"
          />
          <path
            d="M-50 100 Q 250 150, 450 100 T 1050 300"
            stroke="var(--color-border-highlight)"
            strokeWidth="0.5"
          />

          <circle cx="200" cy="180" r="3" fill="var(--color-accent)" className="animate-pulse" />
          <circle
            cx="500"
            cy="200"
            r="4"
            fill="var(--color-accent)"
            className="animate-[pulse_3s_ease-in-out_infinite]"
            style={{ animationDelay: '1s' }}
          />
          <circle
            cx="800"
            cy="220"
            r="3"
            fill="var(--color-accent)"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />

          <circle cx="350" cy="280" r="2" fill="var(--color-text-primary)" className="opacity-50" />
          <circle
            cx="650"
            cy="230"
            r="3"
            fill="var(--color-text-primary)"
            className="animate-pulse opacity-50"
          />
          <circle cx="950" cy="170" r="2" fill="var(--color-text-primary)" className="opacity-50" />

          <circle cx="150" cy="120" r="2" fill="var(--color-text-primary)" className="opacity-20" />
          <circle
            cx="450"
            cy="100"
            r="3"
            fill="var(--color-text-primary)"
            className="animate-[pulse_4s_ease-in-out_infinite] opacity-20"
          />
          <circle cx="850" cy="280" r="2" fill="var(--color-text-primary)" className="opacity-20" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <h2 className="mb-10 text-center font-sans text-5xl font-extralight leading-[1.1] tracking-tighter text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
          Ready to supercharge <br />
          <span className="text-gradient-gold">your operations?</span>
        </h2>

        <div className="mb-32 flex flex-col gap-6 sm:flex-row">
          <MagneticButton
            href="https://calendly.com/admin-aisolv/discovery"
            target="_blank"
            rel="noreferrer"
            className="min-h-16 min-w-[320px] bg-white px-10 py-5 text-sm font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-[var(--color-text-primary)]/90"
          >
            INITIATE STRATEGY SESSION <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="https://calendly.com/admin-aisolv/discovery"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            className="min-h-16 min-w-[320px] bg-[var(--color-text-primary)]/8 px-10 py-5 text-sm font-light tracking-widest text-[var(--color-text-primary)]/50 hover:bg-[var(--color-text-primary)]/10 hover:text-[var(--color-text-primary)]"
          >
            REQUEST FREE SETUP
          </MagneticButton>
        </div>

        <div className="grid w-full grid-cols-1 gap-16 border-t border-[var(--color-text-primary)]/5 pt-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-6 flex items-center gap-3 w-fit">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] shadow-[0_0_15px_var(--color-accent-glow)]">
                <div className="h-2 w-2 rounded-sm bg-[var(--color-base)]"></div>
              </div>
              <span className="font-sans text-xl font-light tracking-wide text-[var(--color-text-primary)]">
                AiSolv
              </span>
            </Link>

            <p className="mb-8 max-w-sm font-sans text-sm font-light leading-relaxed text-[var(--color-text-primary)]/40">
              AI-powered automation accelerators for high-trust B2B services
              companies. Precision engineered.
            </p>

            <div className="flex w-fit items-center gap-3 rounded-full border-none bg-[var(--color-text-primary)]/[0.02] px-3 py-1.5 luxe-glass">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/50">
                System_Operational
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@dhruv-bais-ai"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-text-primary)]/10 bg-[var(--color-text-primary)]/[0.02] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]/55 transition-colors hover:border-red-500/20 hover:text-[var(--color-text-primary)]"
              >
                YouTube
              </a>
              <a
                href="https://www.linkedin.com/in/dhruv-bais/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-text-primary)]/10 bg-[var(--color-text-primary)]/[0.02] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]/55 transition-colors hover:border-blue-500/20 hover:text-[var(--color-text-primary)]"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-sans text-sm tracking-wide text-[var(--color-text-primary)]">
              Navigation
            </h4>
            <ul className="space-y-4 font-sans text-sm font-light text-[var(--color-text-primary)]/40">
              <li>
                <Link to="/about" className="transition-colors hover:text-[var(--color-text-primary)]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[var(--color-text-primary)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="transition-colors hover:text-[var(--color-text-primary)]">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-sans text-sm tracking-wide text-[var(--color-text-primary)]">
              Legal
            </h4>
            <ul className="space-y-4 font-sans text-sm font-light text-[var(--color-text-primary)]/40">
              <li>
                <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
