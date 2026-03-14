import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '../../lib/cn';

const variants = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-hover)] px-8 py-4 shadow-lg shadow-[var(--color-accent-glow)]',
  outline:
    'bg-transparent border border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] px-8 py-4',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)]/5 px-6 py-3',
};

export default function MagneticButton({
  children,
  className,
  href,
  variant = 'primary',
  ...props
}) {
  const buttonRef = useRef(null);
  const Component = href ? 'a' : 'button';

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.2;

      gsap.to(button, {
        x,
        y,
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Component
      ref={buttonRef}
      className={cn(
        'relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full font-sans font-medium transition-all duration-300 transform-gpu group',
        variants[variant],
        className
      )}
      href={href}
      {...props}
    >
      <span className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-[var(--color-text-primary)]/10 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-0"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
}
