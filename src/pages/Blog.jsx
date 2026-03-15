import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/warm-studio/Navbar';
import Footer from '../components/warm-studio/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { fetchBlogs } from '../lib/blog';

gsap.registerPlugin(ScrollTrigger);

function BlogCardSkeleton({ className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl luxe-glass ${className}`.trim()}
      aria-hidden
    >
      <div className="flex h-full flex-col bg-(--color-text-primary)/1 p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="h-3 w-12 animate-pulse rounded bg-(--color-text-primary)/15" />
          <span className="h-3 w-16 animate-pulse rounded bg-(--color-text-primary)/10" />
        </div>
        <div className="mb-3 h-6 w-full max-w-[85%] animate-pulse rounded bg-(--color-text-primary)/15 md:h-7" />
        <div className="mb-2 h-4 w-full animate-pulse rounded bg-(--color-text-primary)/10" />
        <div className="mb-2 h-4 w-full animate-pulse rounded bg-(--color-text-primary)/10" />
        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-(--color-text-primary)/10" />
        <div className="mt-4 flex items-center gap-2">
          <span className="h-3 w-20 animate-pulse rounded bg-(--color-text-primary)/10" />
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, className = '' }) {
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <Link
      to={`/blogs/${post.id}`}
      className={`blog-card group block overflow-hidden rounded-2xl luxe-glass transition-transform duration-300 hover:-translate-y-1 ${className}`.trim()}
    >
      <div className="flex h-full flex-col bg-(--color-text-primary)/1 p-6 transition-colors duration-500 group-hover:bg-(--color-text-primary)/3 md:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-accent)">
            Blog
          </span>
          {date && (
            <time className="font-mono text-[10px] text-(--color-text-primary)/45" dateTime={post.created_at}>
              {date}
            </time>
          )}
        </div>
        <h3 className="mb-3 font-sans text-xl font-light tracking-tight text-(--color-text-primary) transition-colors group-hover:text-(--color-accent) md:text-2xl">
          {post.title}
        </h3>
        <p className="flex-1 font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/55">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary)/50 group-hover:text-(--color-accent)">
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  const container = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchBlogs()
      .then((data) => {
        if (!cancelled) setPosts(data ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load posts');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useGSAP(
    () => {
      const heroItems = gsap.utils.toArray('.blog-hero-reveal');
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

      timeline
        .fromTo(
          heroItems,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.14,
            delay: 0.15,
            clearProps: 'transform,opacity,visibility',
          }
        )
        .fromTo(
          '.blog-hero-line',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'power2.inOut',
            clearProps: 'transform',
          },
          '-=0.55'
        );
    },
    { scope: container }
  );

  useLayoutEffect(() => {
    if (!posts.length) return;
    const context = gsap.context(() => {
      const cards = container.current?.querySelectorAll('.blog-card');
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: container.current?.querySelector('.blog-grid'),
            start: 'top 78%',
          },
        }
      );
    }, container);

    return () => context.revert();
  }, [posts.length]);

  return (
    <div ref={container} className="min-h-screen selection:bg-(--color-accent)/20">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-(--color-text-primary)/5 bg-(--color-base) pt-36 pb-22 md:pt-44 md:pb-28">
          <div className="absolute inset-0 z-0 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <div className="blog-hero-reveal mb-6 flex items-center justify-center gap-3">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent)" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-accent)">
                Blog
              </span>
            </div>

            <h1 className="blog-hero-reveal mx-auto max-w-5xl font-sans text-5xl font-extralight leading-[0.98] tracking-tight text-(--color-text-primary) md:text-7xl lg:text-[5.25rem]">
              Insights on <span className="text-gradient-gold font-light">automation</span> and
              operations.
            </h1>

            <p className="blog-hero-reveal mx-auto mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-(--color-text-primary)/55 md:text-xl">
              Practical takes on building systems that scale, integrating tools, and delivering
              value without the bloat.
            </p>

            <div className="mx-auto mt-12 h-px w-full max-w-4xl overflow-hidden bg-(--color-text-primary)/10">
              <div className="blog-hero-line h-full w-full bg-linear-to-r from-(--color-accent) to-transparent" />
            </div>
          </div>
        </section>

        <section className="border-b border-(--color-text-primary)/5 bg-(--color-surface) py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            {loading && (
              <div className="blog-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4">
                <p className="font-sans text-sm font-light text-(--color-text-primary)/60">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="font-mono text-[10px] uppercase tracking-widest text-(--color-accent) hover:underline"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <div className="blog-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <div className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-(--color-text-primary)/5 pt-16">
              <p className="font-sans text-sm font-light text-(--color-text-primary)/50">
                {posts.length === 0 && !loading && !error
                  ? 'No posts yet.'
                  : 'More posts and deep dives coming soon.'}
              </p>
              <MagneticButton
                href="https://calendly.com/admin-aisolv/discovery"
                target="_blank"
                rel="noreferrer"
                className="bg-white px-8 py-3 text-sm font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-(--color-text-primary)/90"
              >
                TALK TO US
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
