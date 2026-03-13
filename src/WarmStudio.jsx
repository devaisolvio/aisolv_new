import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Bot, Layers, Check, Search, GitBranch } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// Utility for merging tailwind classes safely
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- MICRO-COMPONENTS --- //

const MagneticButton = ({ children, className, variant = 'primary', ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Simplistic magnetic effect
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      gsap.to(btn, { x, y, scale: 1.03, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center rounded-full font-sans font-medium transition-all duration-300 transform-gpu cursor-pointer group";

  const variants = {
    primary: "bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-hover)] px-8 py-4 shadow-lg shadow-[var(--color-accent-glow)]",
    outline: "bg-transparent border border-[var(--color-text-primary)]\/20 text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] px-8 py-4",
    ghost: "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)]\/5 px-6 py-3"
  };

  return (
    <button ref={buttonRef} className={cn(baseStyles, variants[variant], className)} {...props}>
      {/* Sliding background layer for inner hover effect */}
      <span className="absolute inset-0 w-full h-full bg-[var(--color-text-primary)]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></span>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// --- MAIN SECTIONS --- //

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto flex items-center justify-between px-8 py-4 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "w-[min(90%,800px)] luxe-glass"
            : "w-full max-w-7xl bg-transparent border border-transparent"
        )}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AiSolv logo" className="w-8 h-8 object-contain shrink-0" />
          <span className={cn("font-sans font-light text-xl tracking-wide", scrolled ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]")}>
            AiSolv
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#approach" className={cn("font-sans text-sm tracking-wide transition-colors", scrolled ? "text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]")}>Approach</a>
          <a href="#solutions" className={cn("font-sans text-sm tracking-wide transition-colors", scrolled ? "text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]")}>Solutions</a>
          <a href="#results" className={cn("font-sans text-sm tracking-wide transition-colors", scrolled ? "text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]")}>Results</a>
        </div>

        <MagneticButton variant={scrolled ? "primary" : "outline"} className={cn("py-2 px-6 text-sm tracking-widest uppercase font-mono", !scrolled && "border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]")}>
          Engage
        </MagneticButton>
      </nav>
    </header>
  );
};

const Hero = ({ theme }) => {
  const container = useRef(null);

  useGSAP(() => {
    if (theme === 'azure') {
      const words = document.querySelectorAll('.hero-headline-word');
      gsap.from(words, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.5
      });

      gsap.from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: "power2.out"
      });
    } else {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-headline-word", {
        yPercent: 120,
        opacity: 0,
        rotationZ: 5,
        duration: 1.5,
        stagger: 0.08,
        delay: 0.2
      })
        .from(".hero-split", {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2
        }, "-=1")
        .to(".hero-line", {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut"
        }, "-=1.2");
    }
  }, { scope: container, dependencies: [theme] });

  return (
    <section ref={container} className="relative min-h-[100dvh] w-full overflow-hidden bg-[var(--color-base)] flex flex-col items-center justify-center pt-32 pb-12 border-b border-[var(--color-border)]">
      {/* Background Effects */}
      {theme === 'azure' ? (
        <div className="azure-aurora"></div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_60%)] animate-[pulse_8s_ease-in-out_infinite]"></div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center">
        {theme === 'azure' ? (
          <div className="flex flex-col items-center gap-8">
            <h1 className="flex flex-col gap-2 items-center">
              <span className="hero-headline-word font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--color-text-primary)] font-medium leading-tight tracking-tight">
                AI Accelerators
              </span>
              <span className="hero-headline-word font-serif text-5xl md:text-7xl lg:text-8xl text-gradient-gold font-bold italic leading-tight tracking-tight">
                for Business Growth
              </span>
            </h1>

            <p className="hero-sub max-w-2xl text-[var(--color-text-secondary)] text-lg md:text-xl font-sans leading-relaxed font-light">
              We build custom AI ecosystems that instantly scale your outreach, content, and operations—resulting in a radically better performance experience.
            </p>

            <div className="hero-sub flex flex-wrap items-center justify-center gap-4 mt-4">
              <MagneticButton className="px-10 py-5 bg-white text-black hover:bg-[var(--color-text-primary)] shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                Contact Sales
              </MagneticButton>
              <MagneticButton variant="outline" className="px-10 py-5 text-[var(--color-text-primary)] border-[var(--color-border-highlight)]">
                View Demo
              </MagneticButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12 w-full">
            <h1 className="flex flex-wrap gap-x-6 gap-y-2 text-balance overflow-hidden justify-center text-center">
              {["AI", "Accelerators", "for", "Business", "Growth."].map((word, i) => (
                <div key={i} className="overflow-hidden pb-4">
                  <span className={cn(
                    "hero-headline-word inline-block tracking-tight leading-[0.9]",
                    theme === 'warm-luxe' ? "font-serif" : "font-sans",
                    (i === 3 || i === 4)
                      ? "text-gradient-gold font-normal"
                      : (theme === 'warm-luxe' ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-primary)] font-extralight"),
                    "text-6xl md:text-8xl lg:text-[8rem]"
                  )}>
                    {word}
                  </span>
                </div>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row items-end justify-between gap-12 w-full max-w-7xl mx-auto">
              <div className="hero-split max-w-sm text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] tracking-widest text-[var(--color-accent)] uppercase">For B2B Services Companies</span>
                </div>
                <p className="font-sans text-[var(--color-text-primary)]/50 font-light leading-relaxed">
                  Supercharging revenue and operations workflows to help businesses scale by eliminating repetitive manual work and replacing bloated software.
                </p>
              </div>

              <div className="hero-split flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                <MagneticButton className="w-full sm:w-auto text-sm font-light tracking-widest px-10 bg-white text-black hover:bg-[var(--color-text-primary)]/90 shadow-[0_0_30px_var(--color-border-highlight)]">
                  INITIATE
                </MagneticButton>
                <MagneticButton variant="ghost" className="w-full sm:w-auto text-sm font-light tracking-wide text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)]">
                  View architecture
                </MagneticButton>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[var(--color-text-primary)]/10 overflow-hidden">
              <div className="hero-line h-full bg-gradient-to-r from-[var(--color-accent)] to-transparent w-0"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const TrustLogos = () => {
  const [activeTab, setActiveTab] = useState('Consulting');
  const tabs = ['Consulting', 'B2B SaaS', 'Logistics', 'Finance'];

  const content = {
    'Consulting': ['Accolade', 'Stanford', 'Westrom Group'],
    'B2B SaaS': ['Ballyhoo', 'Creative Launch', 'NeuroQ'],
    'Logistics': ['Rugtomize', 'Volado', 'Trackem'],
    'Finance': ['Life Seasons', 'AuraReveal']
  };

  return (
    <section className="py-24 bg-[var(--color-surface)] border-b border-[var(--color-text-primary)]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* Exact aisolv.io Proof Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mb-24">
          <div className="text-center flex flex-col items-center">
            <div className="font-sans font-light text-5xl md:text-6xl text-gradient-gold mb-3">20+</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-primary)]/50 uppercase">Happy Clients</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="font-sans font-light text-5xl md:text-6xl text-gradient-gold mb-3">100%</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-primary)]/50 uppercase">Satisfaction Rate</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="font-sans font-light text-5xl md:text-6xl text-gradient-gold mb-3">40%</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-primary)]/50 uppercase">Efficiency Boost</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="font-sans font-light text-5xl md:text-6xl text-gradient-gold mb-3">24/7</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-primary)]/50 uppercase">Support</div>
          </div>
        </div>

        <p className="font-mono text-[10px] tracking-widest text-[var(--color-text-primary)]/40 uppercase mb-12 text-center">Trusted by high-trust operators</p>

        <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-[var(--color-text-primary)]/10 pb-6 w-full max-w-3xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "font-sans text-sm tracking-wide transition-all duration-300 relative pb-6 -mb-6",
                activeTab === tab ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-primary)]/40 font-light hover:text-[var(--color-text-primary)]/70"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-glow)]"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-y-12 md:gap-y-24 opacity-60 w-full">
          {content[activeTab].map((company, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="w-1/2 md:w-1/4 text-center font-serif italic text-xl md:text-2xl text-[var(--color-text-primary)] tracking-tight animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {company}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
};

const Marquee = () => {
  const words = ["OUTREACH SYSTEMS", "CONTENT ENGINES", "ADS SYSTEMS", "OPERATIONS AUTOMATION"];

  return (
    <div className="w-full bg-[var(--color-accent)] py-4 overflow-hidden flex whitespace-nowrap border-y border-[var(--color-accent-hover)] relative z-20">
      <div className="animate-[scrollText_20s_linear_infinite] flex items-center">
        {[...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="font-mono text-sm tracking-[0.2em] font-medium text-black uppercase mx-8">{word}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scrollText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

// --- FEATURE COMPONENTS --- //

const NodeDiagram = ({ nodes }) => {
  return (
    <div className="relative h-64 w-full flex items-center justify-center p-6 overflow-hidden mt-2">
      {/* Background glow */}
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-20"></div>

      <div className="relative w-full max-w-sm mx-auto flex justify-between items-center z-10 px-4">
        {nodes.map((node, i) => (
          <div key={i} className="flex flex-col items-center gap-4 relative group" style={{ width: `${100 / nodes.length}%` }}>
            {/* Connection Line segment (except last) */}
            {i !== nodes.length - 1 && (
              <div className="absolute top-[11px] left-[50%] w-full h-[1px] bg-[var(--color-accent)] opacity-20 -z-10 group-hover:opacity-60 transition-opacity"></div>
            )}

            {/* The Node */}
            <div className="w-6 h-6 rounded-sm bg-[var(--color-base)] border border-[var(--color-accent)] flex items-center justify-center shadow-[0_0_10px_var(--color-accent-glow)] group-hover:shadow-[0_0_15px_var(--color-accent-glow)] transition-all">
              <div className="w-1.5 h-1.5 rounded-sm bg-[var(--color-accent)] animate-pulse"></div>
            </div>

            {/* Node Label */}
            <span className="font-mono text-[9px] tracking-widest text-center text-[var(--color-text-primary)]/40 group-hover:text-[var(--color-accent)] transition-colors uppercase">
              {node}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const accelerators = [
    {
      title: "Outreach Systems",
      desc: "Automated prospecting and qualification to fill your pipeline.",
      nodes: ["Enrichment", "Targeting"],
      cards: [
        {
          heading: "Data Enrichment",
          content: "Append verified firmographics, technographics, key contacts, and social URLs. Normalize fields and dedupe so your CRM stays clean."
        },
        {
          heading: "ICP Targeting",
          content: "Define your ICP and score accounts by industry, size, region, tech stack, and intent to surface high-fit target lists."
        }
      ]
    },
    {
      title: "Content Creation Engines",
      desc: "Scale blog posts, landing pages, and SEO assets with AI.",
      nodes: ["Repurposing", "SEO"],
      cards: [
        {
          heading: "Content Repurposing",
          content: "Turn webinars, blogs, and support answers into channel-specific posts, emails, and short scripts-on-brand, with reusable CTAs."
        },
        {
          heading: "SEO Optimization",
          content: "Optimize titles, metas, schema, and internal links. Audit pages, fix issues, and surface keyword gaps to lift organic growth."
        }
      ]
    },
    {
      title: "Ads Systems",
      desc: "Launch and scale paid campaigns faster with creative generation, audience expansion, and experiment automation across Google, Meta, and LinkedIn.",
      nodes: ["Creative", "Experiments"],
      cards: [
        {
          heading: "Creative Variants",
          content: "Generate on-brand headlines, copy, and visuals from your brief. Auto-trim to channel specs and track performance by concept."
        },
        {
          heading: "Experiment Orchestrator",
          content: "Spin up A/B tests with budget guardrails, UTM hygiene, and automatic pausing on under-performance."
        }
      ]
    },
    {
      title: "Operations Accelerators",
      desc: "Automate repetitive ops tasks-routing, data hygiene, escalations, and reporting-so teams move faster with fewer errors.",
      nodes: ["Automation", "SLAs"],
      cards: [
        {
          heading: "Workflow Automation",
          content: "Trigger multi-step workflows from events in your CRM, helpdesk, or billing-no spreadsheets, full audit trail."
        },
        {
          heading: "Data Quality & SLAs",
          content: "Normalize fields, dedupe records, and enforce response SLAs with alerts and weekly rollups."
        }
      ]
    }
  ];

  return (
    <section id="solutions" className="py-24 lg:py-32 relative bg-[var(--color-base)] border-b border-[var(--color-text-primary)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20 px-4">
          <h2 className="font-mono font-medium text-[var(--color-accent)] text-[10px] tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
            The 4 Accelerators
          </h2>
          <h3 className="font-sans font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-8">
            What we build for teams
          </h3>
          <p className="font-sans text-lg text-[var(--color-text-primary)]/50 max-w-xl font-light leading-relaxed">
            We don't sell you another tool. We build intelligent infrastructure tailored to your exact workflows, transferring ownership directly to you.
          </p>
        </div>

        {/* Glassmorphic Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accelerators.map((acc, i) => (
            <div key={i} className="flex flex-col luxe-glass rounded-2xl overflow-hidden group">
              <NodeDiagram nodes={acc.nodes} />
              <div className="p-8 border-t border-[var(--color-text-primary)]/5 bg-[var(--color-text-primary)]/[0.01] group-hover:bg-[var(--color-text-primary)]/[0.03] transition-colors duration-500 h-full flex flex-col justify-end">
                <h4 className="font-sans font-light text-xl text-[var(--color-text-primary)] mb-3">{acc.title}</h4>
                <p className="font-sans text-[var(--color-text-primary)]/50 text-sm font-light leading-relaxed">
                  {acc.desc}
                </p>
                <div className="mt-6 grid gap-4">
                  {acc.cards.map((card) => (
                    <div key={card.heading} className="rounded-xl border border-[var(--color-text-primary)]/5 bg-[var(--color-base)]/40 p-4">
                      <h5 className="font-sans text-sm text-[var(--color-text-primary)] mb-2">{card.heading}</h5>
                      <p className="font-sans text-sm text-[var(--color-text-primary)]/50 font-light leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Simple scroll trigger fade out for the background text
      gsap.to(".parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      });

      tl.from(".phil-text-1", { y: 30, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".phil-text-2", { y: 40, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.6");

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={container} className="relative py-40 lg:py-56 px-6 overflow-hidden bg-[var(--color-base)] border-b border-[var(--color-text-primary)]/5">
      {/* Luxurious abstract gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_70%)] parallax-bg"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="phil-text-1 font-sans text-xl md:text-3xl text-[var(--color-text-primary)]/40 mb-12 max-w-3xl font-light tracking-wide leading-relaxed">
          Most agencies focus on selling <br className="hidden md:block" /><span className="text-[var(--color-text-primary)]/80 font-normal">bloated $200K software platforms.</span>
        </p>
        <h2 className="phil-text-2 font-sans font-extralight text-5xl md:text-7xl lg:text-[7rem] text-[var(--color-text-primary)] leading-[1.05] max-w-5xl tracking-tight">
          We deliver <br /><span className="text-gradient-gold">exclusive architecture</span><br /> you actually own.
        </h2>
      </div>
    </section>
  );
};

const PhaseDeliveryCards = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      num: "01",
      title: "Discovery & Analysis",
      desc: "We analyze your current workflows, identify bottlenecks, and understand your specific business needs.",
      details: "We analyze your current workflows, identify bottlenecks, and understand your specific business needs.",
      bullets: ["Process mapping", "Pain point identification", "ROI assessment", "Custom requirements"]
    },
    {
      num: "02",
      title: "Strategy & Design",
      desc: "Our experts design a tailored automation strategy that aligns with your business goals and objectives.",
      details: "Our experts design a tailored automation strategy that aligns with your business goals and objectives.",
      bullets: ["Solution architecture", "Technology selection", "Integration planning", "Timeline creation"]
    },
    {
      num: "03",
      title: "Implementation",
      desc: "We implement and configure your automation solutions with minimal disruption to your operations.",
      details: "We implement and configure your automation solutions with minimal disruption to your operations.",
      bullets: ["System setup", "Data migration", "Testing & validation", "Staff training"]
    },
    {
      num: "04",
      title: "Launch & Optimization",
      desc: "We launch your automation and continuously monitor and optimize performance for maximum efficiency.",
      details: "We launch your automation and continuously monitor and optimize performance for maximum efficiency.",
      bullets: ["Go-live support", "Performance monitoring", "Continuous optimization", "Success metrics"]
    }
  ];

  return (
    <section id="process" className="py-24 lg:py-40 relative z-10 bg-[var(--color-base)] border-b border-[var(--color-text-primary)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="font-mono font-medium text-[var(--color-accent)] text-[10px] tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
            The Protocol
          </h2>
          <h3 className="font-sans font-light text-5xl md:text-6xl lg:text-7xl tracking-tight text-[var(--color-text-primary)] leading-[1.1]">
            How we <span className="font-extralight text-gradient-gold">execute.</span>
          </h3>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {phases.map((phase, i) => {
            const isActive = activePhase === i;
            return (
              <div
                key={i}
                onClick={() => setActivePhase(i)}
                className={cn(
                  "luxe-glass rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                  isActive ? "bg-[var(--color-text-primary)]/[0.04] border-[var(--color-text-primary)]/20" : "bg-[var(--color-text-primary)]/[0.01] hover:bg-[var(--color-text-primary)]/[0.03]"
                )}
              >
                <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                  <div className="flex items-center gap-8">
                    <span className={cn("font-mono text-3xl font-light transition-colors duration-500", isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]/20")}>
                      {phase.num}
                    </span>
                    <h4 className={cn("font-sans text-2xl md:text-4xl tracking-tight transition-colors duration-500", isActive ? "text-[var(--color-text-primary)] font-light" : "text-[var(--color-text-primary)]/50 font-extralight")}>
                      {phase.title}
                    </h4>
                  </div>
                  <div className={cn("md:w-1/3 transition-all duration-500", isActive ? "opacity-100 translate-y-0" : "opacity-50 translate-y-2")}>
                    <p className={cn("font-sans text-sm md:text-base leading-relaxed transition-colors duration-500", isActive ? "text-[var(--color-text-primary)]/80 font-light" : "text-[var(--color-text-primary)]/40 font-extralight")}>
                      {phase.desc}
                    </p>
                  </div>
                </div>

                {/* Expander Section */}
                <div
                  className={cn(
                    "grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-8 md:p-12 pt-0 md:pt-0 flex flex-col md:flex-row gap-8 border-t border-[var(--color-text-primary)]/5 mt-4 group">
                      <div className="md:w-1/2 min-h-[160px] flex items-center justify-center p-8 border border-[var(--color-text-primary)]/5 rounded-xl bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_70%)] relative overflow-hidden">
                        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-80 z-10" style={{ animationName: 'scanHorizontalSoft', animationDuration: '4s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
                        <svg className="w-16 h-16 stroke-[var(--color-text-primary)]/20 animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
                          <circle cx="50" cy="50" r="40" strokeDasharray="4 8" />
                          <circle cx="50" cy="50" r="20" stroke="var(--color-accent)" className="opacity-50" />
                        </svg>
                      </div>
                      <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"></div>
                          <span className="font-mono text-[10px] tracking-widest text-[var(--color-text-primary)]/50 uppercase">Architecture Node Activated</span>
                        </div>
                        <p className="font-sans text-[var(--color-text-primary)]/60 font-light leading-relaxed">
                          {phase.details}
                        </p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {phase.bullets.map((bullet) => (
                            <div key={bullet} className="rounded-lg border border-[var(--color-text-primary)]/5 bg-[var(--color-base)]/30 px-4 py-3">
                              <span className="font-mono text-[10px] tracking-widest text-[var(--color-text-primary)]/60 uppercase">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[var(--color-base)] pt-32 pb-12 px-6 relative z-20 border-t border-[var(--color-text-primary)]/5 overflow-hidden">
      {/* Abstract Global Network / Map representation */}
      <div className="absolute inset-x-0 bottom-0 h-[600px] z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] md:w-full h-full bg-[radial-gradient(ellipse_at_bottom,var(--color-accent-glow)_0%,transparent_60%)]"></div>

        {/* Network Nodes */}
        <svg className="absolute bottom-0 w-full h-[300px] md:h-full" viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none">
          <path d="M-100 200 Q 300 50, 500 200 T 1100 200" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="4 8" className="opacity-40 animate-[dash_10s_linear_infinite]" />
          <path d="M100 300 Q 400 350, 600 250 T 1200 150" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 4" className="animate-[dash_15s_linear_infinite_reverse]" />
          <path d="M-50 100 Q 250 150, 450 100 T 1050 300" stroke="var(--color-border-highlight)" strokeWidth="0.5" />

          <circle cx="200" cy="180" r="3" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="500" cy="200" r="4" fill="var(--color-accent)" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
          <circle cx="800" cy="220" r="3" fill="var(--color-accent)" className="animate-pulse" style={{ animationDelay: '2s' }} />

          <circle cx="350" cy="280" r="2" fill="var(--color-text-primary)" className="opacity-50" />
          <circle cx="650" cy="230" r="3" fill="var(--color-text-primary)" className="opacity-50 animate-pulse" />
          <circle cx="950" cy="170" r="2" fill="var(--color-text-primary)" className="opacity-50" />

          <circle cx="150" cy="120" r="2" fill="var(--color-text-primary)" className="opacity-20" />
          <circle cx="450" cy="100" r="3" fill="var(--color-text-primary)" className="opacity-20 animate-[pulse_4s_ease-in-out_infinite]" />
          <circle cx="850" cy="280" r="2" fill="var(--color-text-primary)" className="opacity-20" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <h2 className="font-sans font-extralight text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[var(--color-text-primary)] mb-10 text-center leading-[1.1]">
          Ready to supercharge <br /><span className="text-gradient-gold">your operations?</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 mb-32">
          <MagneticButton className="text-sm font-light tracking-widest px-10 py-5 bg-white text-black hover:bg-[var(--color-text-primary)]/90 shadow-[0_0_30px_var(--color-border-highlight)]">
            INITIATE STRATEGY SESSION <ArrowRight className="w-4 h-4 ml-2" />
          </MagneticButton>
          <MagneticButton variant="ghost" className="text-sm font-light tracking-widest text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] px-10 py-5">
            REQUEST FREE SETUP
          </MagneticButton>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-16 border-t border-[var(--color-text-primary)]/5 pt-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center shadow-[0_0_15px_var(--color-accent-glow)] shrink-0">
                <div className="w-2 h-2 rounded-sm bg-[var(--color-base)]"></div>
              </div>
              <span className="font-sans font-light text-xl text-[var(--color-text-primary)] tracking-wide">
                AiSolv
              </span>
            </div>
            <p className="font-sans text-sm text-[var(--color-text-primary)]/40 max-w-sm mb-8 font-light leading-relaxed">
              AI-powered automation accelerators for high-trust B2B services companies. Precision engineered.
            </p>
            <div className="flex items-center gap-3 px-3 py-1.5 w-fit rounded-full luxe-glass border-none bg-[var(--color-text-primary)]/[0.02]">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-text-primary)]/50 uppercase">System_Operational</span>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-sm tracking-wide text-[var(--color-text-primary)] mb-6">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm font-light text-[var(--color-text-primary)]/40">
              <li><a href="#approach" className="hover:text-[var(--color-text-primary)] transition-colors">Approach</a></li>
              <li><a href="#solutions" className="hover:text-[var(--color-text-primary)] transition-colors">Solutions</a></li>
              <li><a href="#results" className="hover:text-[var(--color-text-primary)] transition-colors">Results</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm tracking-wide text-[var(--color-text-primary)] mb-6">Legal</h4>
            <ul className="space-y-4 font-sans text-sm font-light text-[var(--color-text-primary)]/40">
              <li><a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function WarmStudio({ theme = 'warm' }) {
  return (
    <div className="min-h-screen selection:bg-[var(--color-accent)]/20">
      <Navbar />
      <main>
        <Hero theme={theme} />
        <TrustLogos />
        <Marquee />
        <Features />
        <Philosophy />
        <PhaseDeliveryCards />
        <Footer />
      </main>
    </div>
  );
}
