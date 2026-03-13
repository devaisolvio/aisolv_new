import React, { useState, useEffect } from 'react';
import WarmStudio from './WarmStudio';
import WarmStudioDarkHero from './WarmStudioDarkHero';
import WarmStudioDarkHeroBlack from './WarmStudioDarkHeroBlack';

const ThemeSwitcher = ({ theme, setTheme }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 p-1 rounded-full luxe-glass border-none shadow-2xl">
      <button
        onClick={() => setTheme('warm')}
        className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${theme === 'warm'
          ? 'bg-[var(--color-accent)] text-white shadow-[0_0_20px_var(--color-accent-glow)]'
          : 'text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70'
          }`}
      >
        Warm Studio
      </button>
      <button
        onClick={() => setTheme('azure')}
        className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${theme === 'azure'
          ? 'bg-[var(--color-accent)] text-white shadow-[0_0_20px_var(--color-accent-glow)]'
          : 'text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70'
          }`}
      >
        Azure Luxe
      </button>
      <button
        onClick={() => setTheme('warm-luxe')}
        className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${theme === 'warm-luxe'
          ? 'bg-[var(--color-accent)] text-white shadow-[0_0_20px_var(--color-accent-glow)]'
          : 'text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70'
          }`}
      >
        Warm Luxe
      </button>
      <button
        onClick={() => setTheme('warm-dark-hero')}
        className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${theme === 'warm-dark-hero'
          ? 'bg-[var(--color-accent)] text-white shadow-[0_0_20px_var(--color-accent-glow)]'
          : 'text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70'
          }`}
      >
        Warm Dark (Navy)
      </button>
      <button
        onClick={() => setTheme('warm-dark-hero-black')}
        className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${theme === 'warm-dark-hero-black'
          ? 'bg-[var(--color-accent)] text-white shadow-[0_0_20px_var(--color-accent-glow)]'
          : 'text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70'
          }`}
      >
        Warm Dark (Black)
      </button>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState('warm');

  useEffect(() => {
    // Force consistent background for the entire document
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div className={`theme-${theme} min-h-screen bg-[var(--color-base)] transition-colors duration-1000`}>
      {theme === 'warm-dark-hero' ? (
        <WarmStudioDarkHero theme={theme} />
      ) : theme === 'warm-dark-hero-black' ? (
        <WarmStudioDarkHeroBlack theme={theme} />
      ) : (
        <WarmStudio theme={theme} />
      )}
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </div>
  );
}
