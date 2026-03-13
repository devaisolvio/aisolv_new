import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--color-base)]/80 backdrop-blur-md text-[#F4F0E6] text-sm border-b border-white/5">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center text-white scale-125">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z" /></svg>
          </div>
        </div>
        <div className="w-[1px] h-4 bg-white/20"></div>
        <div className="hidden lg:flex items-center gap-6 font-sans text-[13px] font-medium text-white/80">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">Product <span className="text-[8px] opacity-70">▼</span></a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">AI Technology <span className="text-[8px] opacity-70">▼</span></a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">Solutions <span className="text-[8px] opacity-70">▼</span></a>
          <a href="#" className="hover:text-white transition-colors">Customers</a>
          <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">Resources <span className="text-[8px] opacity-70">▼</span></a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-6 font-sans text-[13px] font-medium text-white/80">
        <a href="#" className="hover:text-white transition-colors">Contact sales</a>
        <a href="#" className="hover:text-white transition-colors">Sign in</a>
        <a href="#" className="hover:text-white transition-colors">View demo</a>
        <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
          Start free trial
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#0A0B0E]">
      {/* Heavy noise overlay specific to hero for that cinematic look */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      {/* Massive Bottom Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[80vh] bg-[radial-gradient(ellipse_at_bottom,rgba(243,111,23,0.4)_0%,transparent_60%)] blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[60vh] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.7)_0%,transparent_60%)] blur-[80px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight max-w-[1000px] mb-12 text-white shadow-black drop-shadow-2xl">
          The #1 AI Agent for <br /> all your enterprise operations
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] tracking-[0.2em] uppercase font-mono mb-12 text-white/70 font-bold">
          <span className="drop-shadow-md">#1 IN BAKE-OFFS</span>
          <span className="drop-shadow-md">#1 IN BENCHMARKS</span>
          <span className="drop-shadow-md">#1 FOR COMPLEX QUERIES</span>
          <span className="drop-shadow-md">#1 ON G2</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-md font-medium text-sm hover:bg-gray-200 transition-colors shadow-xl">
            Start free trial
          </button>
          <button className="bg-transparent border border-white/40 text-white px-6 py-3 rounded-md font-medium text-sm hover:bg-white/10 transition-colors backdrop-blur-sm">
            View demo
          </button>
        </div>
      </div>
    </section>
  );
};

const Logos = () => {
  const logos = [
    "ANTHROP\\C", "asana", "Aspire", "clay", "coda", "consensys",
    "Culture Amp", "LaunchDarkly →", "lightspeed", "Lovable", "marshmallow", "miro",
    "monday.com", "moneybox", "Personio", "Polymarket", "PRIZEPICKS", "RIOT GAMES",
    "Rocket Money", "shutterstock", "Snowflake", "synthesia", "Vanta", "WHOOP"
  ];
  return (
    <section className="py-24 px-6 relative z-10 w-full max-w-[1400px] mx-auto bg-[#0A0B0E]">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16 items-center justify-items-center opacity-70">
        {logos.map((logo, i) => (
          <div key={i} className={cn("font-bold text-xl tracking-tight text-white", logo.includes('\\') || logo.includes('.') ? "font-mono" : "font-sans")}>
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
};

const ContentSection = () => {
  return (
    <div className="relative z-20 w-full flex flex-col md:flex-row max-w-[1800px] mx-auto md:px-6 lg:px-12 mt-20 mb-32 pb-32">
      {/* Sticky Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 relative lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-6 py-8 pr-12 font-mono text-[10.5px] tracking-[0.2em] font-bold uppercase text-white/50 border-t border-white/10">
          <a href="#capabilities" className="text-white flex items-center justify-between border-b border-white/20 pb-4">
            01 Capabilities
            <div className="w-8 h-[2px] bg-[var(--color-accent)]"></div>
          </a>
          <a href="#performance" className="hover:text-white transition-colors pb-4 border-b border-white/10">02 Performance</a>
          <a href="#integrations" className="hover:text-white transition-colors pb-4 border-b border-white/10">03 Integrations</a>
          <a href="#technology" className="hover:text-white transition-colors pb-4 border-b border-white/10">04 Technology</a>
          <a href="#ai-team" className="hover:text-white transition-colors pb-4 border-b border-white/10">05 AI Team</a>
          <a href="#pricing" className="hover:text-white transition-colors pb-4 border-b border-white/10">06 Pricing</a>
        </div>
      </aside>

      {/* Main Content Areas (White Cards) */}
      <div className="flex-1 w-full bg-[#FAFAFA] text-[#1D1D1F] md:rounded-tl-[2rem] md:rounded-tr-[2rem] rounded-tl-3xl rounded-tr-3xl overflow-hidden min-h-[1000px] shadow-[0_0_60px_rgba(0,0,0,0.5)] relative border border-white/10">

        {/* Card 1: Capabilities */}
        <div className="p-8 md:p-16 lg:p-24 relative z-10 bg-[#FAFAFA]">
          {/* Header of the section */}
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[#F36F17] font-bold mb-16 border-b border-black/10 pb-6">
            <span className="w-1.5 h-1.5 bg-[#F36F17] rounded-sm"></span>
            Capabilities
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-[1000px] mb-12 text-center mx-auto text-balance">
            AiSolv resolves the most complex workflows on every channel
          </h2>

          <div className="flex flex-col md:flex-row gap-16 mb-24 max-w-6xl mx-auto items-start">
            <div className="md:w-1/3">
              <span className="font-mono text-xs text-black/30 mb-6 block">01</span>
              <p className="text-[17px] text-black/70 leading-relaxed font-normal">
                AiSolv handles even the most complex processes through a continuous improvement loop called the AiSolv Engine. Train our agents on your procedures, knowledge, and policies, test performance before launch, deploy across every channel, <span className="font-medium text-black">then analyze and improve with AI-powered Insights</span>—so every task is executed accurately and consistently.
              </p>
              <button className="mt-8 border border-black/20 rounded-md px-6 py-3 font-medium text-sm hover:bg-black/5 transition-colors">
                Explore all capabilities
              </button>
            </div>

            {/* Mock UI Graphic */}
            <div className="md:w-2/3 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden min-h-[500px] relative p-8 flex flex-col items-center justify-center">
              {/* Dot Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

              {/* Floating elements mimicking Fin's UI */}
              <div className="relative z-10 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col transform md:-translate-x-12">
                <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">A</span>
                    AiSolv Agent
                  </div>
                  <div className="flex gap-2 text-black/40">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Test</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Set live</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 bg-[#F9F9F9]">
                  <div className="bg-white border border-black/5 p-4 rounded-xl rounded-tl-sm text-sm shadow-sm text-black/80">
                    Teams that need more flexibility and support. It includes everything in our Basic plan, plus additional features like custom reporting, API access, and dedicated support.
                  </div>
                  <div className="bg-[#F36F17] text-white p-4 rounded-xl rounded-tr-sm text-sm self-end max-w-[85%] shadow-md">
                    Oh great, I need access to custom reports, can I upgrade now?
                  </div>
                  <div className="bg-white border border-black/5 p-4 rounded-xl rounded-tl-sm text-sm shadow-sm text-black/80 flex flex-col gap-3">
                    <p>Of course! I can process an upgrade to PayVona Pro for you now. Our Pro plan is $19.99 per month when billed monthly.</p>
                    <div className="flex gap-2 border border-black/10 rounded-lg p-1 bg-gray-50 mt-2">
                      <button className="flex-1 bg-white shadow-sm border border-black/5 rounded text-xs py-1.5 font-medium">Monthly</button>
                      <button className="flex-1 text-xs py-1.5 font-medium text-black/60">Annual</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background window element */}
              <div className="absolute top-12 right-12 w-[300px] h-[400px] bg-white rounded-2xl shadow-xl border border-black/10 z-0 p-4 opacity-50 blur-[1px]">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-16 bg-gray-50 rounded border border-gray-100"></div>
                  <div className="h-16 bg-gray-50 rounded border border-gray-100"></div>
                  <div className="h-16 bg-gray-50 rounded border border-gray-100"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Steps Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-20">
            <div className="border-t-2 border-transparent pt-6 hover:border-black/10 transition-colors">
              <h3 className="text-xl font-medium mb-3 text-black">1. Train</h3>
              <p className="text-[15px] text-black/60 mb-6 h-24 leading-relaxed">Train AiSolv to resolve even the most complex queries with your Procedures, knowledge and policies.</p>
              <a href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors text-black/80">Learn more</a>
            </div>
            <div className="border-t-2 border-transparent pt-6 hover:border-black/10 transition-colors">
              <h3 className="text-xl font-medium mb-3 text-black">2. Test</h3>
              <p className="text-[15px] text-black/60 mb-6 h-24 leading-relaxed">Run fully simulated workflows from start to finish to see exactly how AiSolv will behave before going live.</p>
              <a href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors text-black/80">Learn more</a>
            </div>
            <div className="border-t-2 border-[#F36F17] pt-6 relative">
              <h3 className="text-xl font-medium mb-3 text-black">3. Deploy</h3>
              <p className="text-[15px] text-black/60 mb-6 h-24 leading-relaxed">Set AiSolv live across every channel for consistent automated operations wherever your business runs.</p>
              <a href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors text-black/80">Learn more</a>
            </div>
            <div className="border-t-2 border-transparent pt-6 hover:border-black/10 transition-colors">
              <h3 className="text-xl font-medium mb-3 text-black">4. Analyze</h3>
              <p className="text-[15px] text-black/60 mb-6 h-24 leading-relaxed">Use AI-powered Insights to analyze and improve performance and deliver drastically better unit economics.</p>
              <a href="#" className="text-sm font-medium border-b border-black/20 pb-1 hover:border-black transition-colors text-black/80">Learn more</a>
            </div>
          </div>
        </div>

        {/* Card 2: Performance (Overlap effect) */}
        <div className="bg-[#FFFFFF] rounded-tl-[3rem] rounded-tr-[3rem] -mt-10 relative z-20 p-8 md:p-16 lg:p-24 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] border-t border-black/5 min-h-[600px]">
          <div id="performance" className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[#F36F17] font-bold mb-16 border-b border-black/10 pb-6 w-full">
            <span className="w-1.5 h-1.5 bg-[#F36F17] rounded-sm"></span>
            Unrivaled Performance
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-[1000px] mb-12">
            AiSolv outperforms the competition on every metric
          </h2>
        </div>

      </div>
    </div>
  );
};

export default function MidnightLuxe() {
  return (
    <div className="min-h-screen selection:bg-[var(--color-accent)]/20 bg-[#0A0B0E] font-sans">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <ContentSection />
      </main>
    </div>
  );
}
