import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../ui/MagneticButton';
import { cn } from '../../lib/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <nav
        className={cn(
          'pointer-events-auto flex items-center justify-between rounded-full px-8 py-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'w-[min(90%,800px)] luxe-glass'
            : 'w-full max-w-7xl border border-transparent bg-transparent'
        )}
      >
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="AiSolv logo"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="font-sans text-xl font-light tracking-wide text-[var(--color-text-primary)]">
            AiSolv
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/about"
            className={cn(
              'font-sans text-sm tracking-wide transition-colors',
              scrolled
                ? 'text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]'
            )}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={cn(
              'font-sans text-sm tracking-wide transition-colors',
              scrolled
                ? 'text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]'
            )}
          >
            Contact
          </Link>
          <Link
            to="/blogs"
            className={cn(
              'font-sans text-sm tracking-wide transition-colors',
              scrolled
                ? 'text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]'
            )}
          >
            Blogs
          </Link>
        </div>

        <MagneticButton
          href="https://calendly.com/admin-aisolv/discovery"
          target="_blank"
          rel="noreferrer"
          variant={scrolled ? 'primary' : 'outline'}
          className={cn(
            'px-6 py-2 font-mono text-sm tracking-widest uppercase',
            !scrolled &&
              'border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
          )}
        >
          Engage
        </MagneticButton>
      </nav>
    </header>
  );
}
