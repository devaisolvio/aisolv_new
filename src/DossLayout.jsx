import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Layers, Settings, Zap } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[var(--color-base-dark)]/90 backdrop-blur-md text-[var(--color-text-light)] border-b border-[var(--color-border-dark)]">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-[var(--color-text-light)] rounded-[2px] flex items-center justify-center relative overflow-hidden group-hover:border-[var(--color-accent)] transition-colors">
                        <div className="w-1.5 h-1.5 bg-[var(--color-text-light)] group-hover:bg-[var(--color-accent)] transition-colors"></div>
                    </div>
                    <span className="font-sans font-bold text-xl tracking-tight">AiSolv</span>
                </div>

                <div className="hidden lg:flex items-center gap-8 font-sans text-[13px] text-[var(--color-text-light)]/80">
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Products <span className="opacity-50 text-[10px]">▼</span></a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Solutions <span className="opacity-50 text-[10px]">▼</span></a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Resources <span className="opacity-50 text-[10px]">▼</span></a>
                    <a href="#" className="hover:text-white transition-colors">Integrations</a>
                    <a href="#" className="hover:text-white transition-colors">Careers</a>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-8 font-sans text-[13px] font-medium">
                <a href="#" className="text-[var(--color-text-light)]/80 hover:text-white transition-colors">Sign in</a>
                <button className="bg-[var(--color-text-light)] text-[var(--color-text-dark)] px-5 py-2.5 rounded-sm hover:bg-white transition-colors cursor-pointer">
                    Book a demo
                </button>
            </div>
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="relative min-h-screen pt-32 pb-24 bg-[var(--color-base-dark)] bg-grid-dark flex flex-col border-b border-[var(--color-border-dark)] overflow-hidden">
            <div className="max-w-[1400px] mx-auto w-full px-8 flex-1 flex flex-col justify-center relative z-10">

                {/* Main 2-column layout */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mt-16">

                    {/* Left Text */}
                    <div className="lg:w-1/2 max-w-xl">
                        <h1 className="font-sans font-medium text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8">
                            AiSolv Operations Cloud is the ERP evolved
                        </h1>
                        <p className="font-sans text-lg text-[var(--color-text-light)]/60 mb-10 leading-relaxed font-light">
                            Our Adaptive Resource Platform (ARP) powers AI-native operations for real-world enterprises, unleashing the global value chain.
                        </p>
                        <button className="bg-transparent border border-[var(--color-border-dark)] hover:border-[var(--color-text-light)]/50 text-[var(--color-text-light)] px-6 py-3 rounded-sm font-sans text-sm transition-colors cursor-pointer backdrop-blur-sm">
                            Book a demo
                        </button>
                    </div>

                    {/* Right Graphic (Placeholder for Isometric SVG) */}
                    <div className="lg:w-1/2 relative w-full h-[400px] flex justify-center items-center">
                        {/* Circular rotating background orbit */}
                        <div className="absolute w-[500px] h-[500px] border border-dashed border-[var(--color-border-dark)] rounded-full rotate-x-[60deg] animate-[spin_30s_linear_infinite]"></div>

                        {/* Isometric Stack visualization */}
                        <div className="relative group perspective-1000 transform scale-90 md:scale-100">
                            <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-[0_20px_40px_rgba(255,107,0,0.15)]">
                                <g transform="translate(200, 150) scale(1.5)">
                                    {/* Layer 3 (Bottom) */}
                                    <path d="M0 40 L-100 90 L0 140 L100 90 Z" fill="#0c12e8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" className="transition-transform duration-500 group-hover:translate-y-2" />
                                    <path d="M-100 90 L-100 110 L0 160 L0 140 Z" fill="#0a0ec4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="transition-transform duration-500 group-hover:translate-y-2" />
                                    <path d="M0 140 L0 160 L100 110 L100 90 Z" fill="#080a96" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="transition-transform duration-500 group-hover:translate-y-2" />
                                    <text x="-90" y="115" fill="white" fontSize="8" fontFamily="monospace" transform="skewY(26)">DataStudio</text>

                                    {/* Layer 2 (Middle) */}
                                    <path d="M0 10 L-100 60 L0 110 L100 60 Z" fill="#1b22ff" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                                    <path d="M-100 60 L-100 80 L0 130 L0 110 Z" fill="#141ae6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                    <path d="M0 110 L0 130 L100 80 L100 60 Z" fill="#0f14ba" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                    <text x="-90" y="85" fill="white" fontSize="8" fontFamily="monospace" transform="skewY(26)">ARP</text>

                                    {/* Layer 1 (Top) */}
                                    <path d="M0 -20 L-100 30 L0 80 L100 30 Z" fill="#2d33ff" stroke="rgba(255,255,255,0.7)" strokeWidth="1" className="transition-transform duration-500 group-hover:-translate-y-2" />
                                    <path d="M-100 30 L-100 50 L0 100 L0 80 Z" fill="#242adb" stroke="rgba(255,255,255,0.4)" strokeWidth="1" className="transition-transform duration-500 group-hover:-translate-y-2" />
                                    <path d="M0 80 L0 100 L100 50 L100 30 Z" fill="#1b20b5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" className="transition-transform duration-500 group-hover:-translate-y-2" />
                                    <text x="-90" y="55" fill="white" fontSize="8" fontFamily="monospace" transform="skewY(26)">IDP</text>

                                    {/* Sphere on top */}
                                    <g transform="translate(0, -35) scale(0.6)" className="animate-[bounce_4s_ease-in-out_infinite]">
                                        <circle cx="0" cy="0" r="40" fill="transparent" stroke="white" strokeWidth="1" />
                                        <ellipse cx="0" cy="0" rx="40" ry="15" fill="transparent" stroke="white" strokeWidth="1" opacity="0.5" />
                                        <ellipse cx="0" cy="0" rx="15" ry="40" fill="transparent" stroke="white" strokeWidth="1" opacity="0.5" />
                                        <path d="M-28 -28 L28 28 M-28 28 L28 -28" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Tabs Segment */}
            <div className="absolute w-full bottom-0 left-0 border-t border-[var(--color-border-dark)] bg-[var(--color-base-dark)]/50 backdrop-blur-md hidden md:block z-20">
                <div className="max-w-[1400px] mx-auto px-8 flex justify-between">
                    {[
                        { title: 'Adapt', sub: 'your operations', active: false },
                        { title: 'Connect', sub: 'any tool', active: true },
                        { title: 'Unify', sub: 'your master data', active: false },
                        { title: 'Automate', sub: 'the value chain', active: false },
                        { title: 'Analyze', sub: 'what matters most', active: false },
                        { title: 'Store', sub: 'without limits', active: false },
                    ].map((tab, i) => (
                        <div key={i} className="py-6 flex-1 border-b-2 cursor-pointer transition-all hover:bg-white/5 px-4" style={{ borderColor: tab.active ? 'var(--color-text-light)' : 'transparent' }}>
                            <div className="font-sans text-[15px] font-medium text-[var(--color-text-light)] leading-tight">{tab.title}</div>
                            <div className="font-sans text-[13px] text-[var(--color-text-light)]/40 font-light">{tab.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatementSection = () => {
    return (
        <section className="py-32 bg-[var(--color-base-light)] text-[var(--color-text-dark)] bg-grid-light border-b border-[var(--color-border-light)]">
            <div className="max-w-[1400px] mx-auto px-8">
                <h2 className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-[1.1] tracking-tight">
                    ERP is broken. To fix it, we created something completely new.
                </h2>
            </div>
        </section>
    );
};

const FeatureGrid = () => {
    const features = [
        {
            icon: <Box className="w-6 h-6 stroke-[1.5]" />,
            title: "Adaptive, flexible,\nand durable",
            desc: "Most systems force you to conform. AiSolv adapts to you.\n\nUnify master data, operations, and intelligence into one platform. Easily update workflows, automations, and integrations with clicks – not tickets. Make faster decisions with built-in, real-time analytics, no additional BI tools required."
        },
        {
            icon: <Zap className="w-6 h-6 stroke-[1.5]" />,
            title: "Fast to setup\nand scale",
            desc: "Launch in months. Iterate in minutes.\n\nOther ERPs take years to setup and months to change. AiSolv is built with modular, no-code architecture that lets you deploy 3x faster, make changes on the fly, and speed up every step of your value chain by 10x or more."
        },
        {
            icon: <Settings className="w-6 h-6 stroke-[1.5]" />,
            title: "More value,\nno ERP tax",
            desc: "Unlock real strategy and solutions. No support fees.\n\nOur value engineers work with you to deeply understand your business, custom-build your workspace, and provide 24/7 support. We price downstream of value, so every engagement is engineered to maximize your ROI."
        },
        {
            icon: <Layers className="w-6 h-6 stroke-[1.5]" />,
            title: "Built on\nIntelligence",
            desc: "AI everywhere you need it.\n\nStop adding disjointed AI wrappers to legacy software. AiSolv embeds autonomous agents directly into your core business logic, turning static databases into self-healing, predictive engines that anticipate problems before they happen."
        }
    ];

    return (
        <section className="bg-[var(--color-base-light)] text-[var(--color-text-dark)] pb-1 border-b border-[var(--color-border-light)] bg-grid-light">
            <div className="max-w-[1400px] mx-auto w-full border-l border-r border-[var(--color-border-light)] relative">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={cn(
                                "p-12 md:p-16 flex flex-col md:flex-row gap-8 relative",
                                (i === 0 || i === 1) && "border-b border-[var(--color-border-light)]",
                                (i === 0 || i === 2) && "md:border-r border-[var(--color-border-light)]"
                            )}
                        >
                            <div className="shrink-0 mt-1">
                                {feature.icon}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-sans font-medium text-2xl lg:text-3xl tracking-tight leading-tight mb-8 whitespace-pre-line text-[var(--color-text-dark)]">
                                    {feature.title}
                                </h3>
                                <p className="font-sans text-[15px] leading-relaxed text-[var(--color-text-dark)]/70 whitespace-pre-line font-light">
                                    {feature.desc.split('\n\n').map((para, j) => (
                                        <React.Fragment key={j}>
                                            {j === 0 ? <strong className="font-medium text-[var(--color-text-dark)]">{para}</strong> : para}
                                            {j < feature.desc.split('\n\n').length - 1 && <><br /><br /></>}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const FooterCTA = () => {
    return (
        <section className="py-32 bg-[var(--color-base-light)] text-[var(--color-text-dark)] bg-grid-light relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-8 relative z-10">

                {/* Top Split CTA */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-32 border-b border-[var(--color-border-light)] mb-32 relative">
                    {/* Subtle horizontal dashed line crossing the screen */}
                    <div className="absolute top-1/2 left-[-100vw] right-[-100vw] h-[1px] border-t border-dashed border-[var(--color-border-light)] -z-10 hidden md:block"></div>

                    <div>
                        <h2 className="font-sans font-medium text-4xl md:text-5xl tracking-tight mb-4">
                            Upgrade your operations.
                        </h2>
                        <p className="font-sans text-[17px] text-[var(--color-text-dark)]/50 font-light">
                            Fast to deploy. Easy to change. Built to scale.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <button className="bg-[var(--color-text-dark)] text-[var(--color-text-light)] px-8 py-4 rounded-sm hover:bg-[var(--color-text-dark)]/90 transition-colors font-sans text-sm font-medium">
                            Book a demo
                        </button>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="font-sans font-medium text-4xl md:text-5xl lg:text-[4rem] tracking-tight leading-[1.1] mb-8 max-w-xl text-balance">
                        Trusted by industry leaders
                    </h3>
                    <p className="font-sans text-[15px] text-[var(--color-text-dark)]/60 max-w-md mx-auto leading-relaxed font-light relative">
                        {/* Subtle horizontal dashed line crossing the text */}
                        <span className="absolute top-1/2 left-[-50vw] right-[-50vw] h-[1px] border-t border-dashed border-[var(--color-border-light)] -z-10 hidden md:block"></span>

                        Our customers save time, grow margins, and expand faster — all without adding headcount.
                    </p>
                </div>

            </div>
        </section>
    );
}


export default function DossLayout() {
    return (
        <div className="min-h-screen selection:bg-[var(--color-accent)] selection:text-white bg-[var(--color-base-dark)]">
            <Navbar />
            <main>
                <Hero />
                <StatementSection />
                <FeatureGrid />
                <FooterCTA />
            </main>
        </div>
    );
}
