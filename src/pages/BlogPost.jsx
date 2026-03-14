import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/warm-studio/Navbar';
import Footer from '../components/warm-studio/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { fetchBlogById } from '../lib/blog';

export default function BlogPost() {
  const { id } = useParams();
  const container = useRef(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setPost(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchBlogById(id)
      .then((data) => {
        if (!cancelled) setPost(data ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load post');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  useGSAP(
    () => {
      if (!post) return;
      const heroItems = gsap.utils.toArray('.post-hero-reveal');
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

      timeline
        .fromTo(
          heroItems,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.1,
            clearProps: 'transform,opacity,visibility',
          }
        )
        .fromTo(
          '.post-hero-line',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            clearProps: 'transform',
          },
          '-=0.5'
        )
        .fromTo(
          '.post-body',
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
          },
          '-=0.4'
        );
    },
    { scope: container, dependencies: [post] }
  );

  if (loading) {
    return (
      <div className="min-h-screen selection:bg-(--color-accent)/20">
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32">
          <p className="font-sans text-sm font-light text-(--color-text-primary)/50">
            Loading...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen selection:bg-(--color-accent)/20">
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 pt-32">
          <p className="font-sans text-sm font-light text-(--color-text-primary)/60">
            {error}
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-(--color-accent) hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen selection:bg-(--color-accent)/20">
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32">
          <p className="mb-6 font-sans text-xl font-light text-(--color-text-primary)/60">
            Post not found.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-(--color-accent) hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const htmlContent = post.content?.trim() || '';

  return (
    <div ref={container} className="min-h-screen selection:bg-(--color-accent)/20">
      <Navbar />

      <main>
        <article>
          <header className="relative overflow-hidden border-b border-(--color-text-primary)/5 bg-(--color-base) pt-36 pb-22 md:pt-44 md:pb-28">
            <div className="absolute inset-0 z-0 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_60%)]" />

            <div className="relative mx-auto max-w-3xl px-6">
              <Link
                to="/blogs"
                className="post-hero-reveal mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary)/50 transition-colors hover:text-(--color-accent)"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Blog
              </Link>

              {formattedDate && (
                <div className="post-hero-reveal mb-4 flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-accent)">
                    Blog
                  </span>
                  <time className="font-mono text-[10px] text-(--color-text-primary)/45" dateTime={post.created_at}>
                    {formattedDate}
                  </time>
                </div>
              )}

              <h1 className="post-hero-reveal font-sans text-4xl font-extralight leading-[1.08] tracking-tight text-(--color-text-primary) md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <div className="mt-10 h-px w-full overflow-hidden bg-(--color-text-primary)/10">
                <div className="post-hero-line h-full w-full bg-linear-to-r from-(--color-accent) to-transparent" />
              </div>
            </div>
          </header>

          <div className="border-b border-(--color-text-primary)/5 bg-(--color-surface) py-16 md:py-20">
            <div className="post-body mx-auto max-w-3xl px-6">
              {post.image && (
                <div className="mb-10 overflow-hidden rounded-2xl border border-(--color-text-primary)/10">
                  <img
                    src={post.image}
                    alt=""
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              <div
                className="post-content prose prose-invert max-w-none font-sans text-lg font-light leading-relaxed text-(--color-text-primary)/72 prose-headings:font-light prose-headings:text-(--color-text-primary) prose-p:mb-6 prose-a:text-(--color-accent) prose-a:no-underline hover:prose-a:underline prose-ul:my-6 prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: htmlContent || '<p>No content.</p>' }}
              />

              <div className="mt-16 flex flex-col gap-6 border-t border-(--color-text-primary)/5 pt-12 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-text-primary)/55 transition-colors hover:text-(--color-accent)"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  All posts
                </Link>
                <MagneticButton
                  href="https://calendly.com/admin-aisolv/discovery"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit bg-white px-8 py-3 text-sm font-light tracking-widest text-black shadow-[0_0_30px_var(--color-border-highlight)] hover:bg-(--color-text-primary)/90"
                >
                  TALK TO US
                </MagneticButton>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
