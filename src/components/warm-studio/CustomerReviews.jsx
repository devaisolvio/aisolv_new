const DEFAULT_CLIENT_IMAGE = '/clients/user.png';

const reviews = [
  {
    quote:
      'What a blessing it was to find Dhruv, I have hired over 30 or 40 vendors and he is head and shoulder above the others. Very professional, timely and the quality of the work is beyond good, its outstanding. I am very satisfied with the end results and so is my office staff. Thank you Dhruv.',
    name: 'Jon Westrom',
    role: 'Owner & Broker',
    company: 'Westrom Group',
    rating: 5,
    image: '/clients/john_westrom.jpg',
  },
  {
    quote:
      'Game-Changing AI Partner! Dhruv doesn’t just deliver - he thinks like a true business partner, deeply invested in our success. He transformed our ideas into powerful, efficient AI solutions that worked flawlessly. Fast, innovative, and genuinely focused on helping our business grow, not just finishing a project.',
    name: 'Marius Tyranowski',
    role: 'Owner & CEO',
    company: 'Reply42',
    rating: 5,
    image: '/clients/reply42_marius.jpg',
  },
  {
    quote:
      'Dhruv is an excellent engineer and systems architect. He went above and beyond my expectations. He embeds himself in the project and feels like a team player.',
    name: 'Pete Thompson',
    role: 'Owner & CEO',
    company: 'Ballyhoo Investments',
    rating: 5,
    image: DEFAULT_CLIENT_IMAGE,
  },
  {
    quote:
      'Dhruv is great! He\'s very smart and works quickly. Doesn\'t just complete tasks but contributes to the strategy and plan as well.',
    name: 'Clayton Wood',
    role: 'CEO & Owner',
    company: 'Volado Labs',
    rating: 5,
    image: '/clients/volado_clayton.jpg',
  },
  {
    quote: 'Enjoyed working together.',
    name: 'Yijia Shao',
    role: 'Doctor of Philosophy',
    company: 'Stanford University',
    rating: 5,
    image: '/clients/stanford_yijia.jpg',
  },
  {
    quote:
      'Dhruv was excellent to work with. Clear communication, fast turnaround, and the quality of the work was exactly what I wanted. He understood the brief quickly, asked the right questions, and delivered on time without needing constant back and forth. Reliable, detail oriented, and professional - the kind of technology partner you can trust to get things right the first time. I will definitely be working with him again and would recommend him to anyone looking for high quality results without stress.',
    name: 'Alex Ledingham',
    role: 'Cofounder',
    company: 'AuraReveal',
    rating: 5,
    image: '/clients/Alex_auraReveal.png',
  },
];

function ReviewCard({ review, featured = false, isLastInRow = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl luxe-glass ${
        featured ? 'lg:col-span-2' : ''
      } ${isLastInRow ? 'lg:col-span-2 lg:col-start-2' : ''}`}
    >
      <div className="flex h-full flex-col gap-8 bg-(--color-text-primary)/1 p-8 transition-colors duration-500 group-hover:bg-(--color-text-primary)/3 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-(--color-text-primary)/10 bg-(--color-base)/60">
              <img
                src={review.image || DEFAULT_CLIENT_IMAGE}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_CLIENT_IMAGE;
                }}
              />
            </div>
            <div>
              <p className="font-sans text-base font-light text-(--color-text-primary)">
                {review.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/45">
                {review.role} / {review.company}
              </p>
            </div>
          </div>

          <div className="font-serif text-5xl italic leading-none text-(--color-accent)/60">
            "
          </div>
        </div>

        <p
          className={`max-w-3xl font-sans leading-relaxed text-(--color-text-primary)/72 ${
            featured ? 'text-xl font-light md:text-2xl' : 'text-base font-light'
          }`}
        >
          {review.quote}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, index) => (
              <span
                key={`${review.name}-star-${index}`}
                className="text-lg leading-none text-(--color-accent)"
              >
                *
              </span>
            ))}
          </div>
          <span className="rounded-full border border-(--color-text-primary)/8 bg-(--color-base)/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/55">
            Verified Client Review
          </span>
        </div>
      </div>
    </article>
  );
}

export default function CustomerReviews() {
  const [featuredReview, ...supportingReviews] = reviews;

  return (
    <section className="relative overflow-hidden border-b border-(--color-text-primary)/5 bg-(--color-surface) py-24 lg:py-32">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-(--color-accent-glow) blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="max-w-3xl">
            <h2 className="mb-6 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-(--color-accent)">
              <div className="h-px w-8 bg-linear-to-r from-(--color-accent) to-transparent"></div>
              Customer Reviews
            </h2>
            <h3 className="mb-6 font-sans text-4xl font-light leading-[1.1] tracking-tight text-(--color-text-primary) md:text-5xl lg:text-6xl">
              What teams say after the system goes live.
            </h3>
            <p className="max-w-2xl font-sans text-lg font-light leading-relaxed text-(--color-text-primary)/50">
              These are real client reviews from founders, operators, and
              executives who worked directly with AiSolv on delivery, systems,
              and AI implementation.
            </p>
          </div>

          <div className="rounded-2xl border border-(--color-text-primary)/8 bg-(--color-base)/30 p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-text-primary)/45">
              Review Snapshot
            </p>
            <p className="font-sans text-sm font-light leading-relaxed text-(--color-text-primary)/58">
              6 client testimonials, all at a 5-star rating, with repeated
              mentions of communication, speed, technical quality, and strategic
              ownership.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ReviewCard review={featuredReview} featured />
          {supportingReviews.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${review.company}`}
              review={review}
              isLastInRow={index === supportingReviews.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
