const words = [
  'OUTREACH SYSTEMS',
  'CONTENT ENGINES',
  'ADS SYSTEMS',
  'OPERATIONS AUTOMATION',
];

export default function Marquee() {
  return (
    <div className="relative z-20 flex w-full overflow-hidden whitespace-nowrap border-y border-[var(--color-accent-hover)] bg-[var(--color-accent)] py-4">
      <div className="flex animate-[scrollText_20s_linear_infinite] items-center">
        {[...words, ...words, ...words].map((word, index) => (
          <div key={`${word}-${index}`} className="flex items-center">
            <span className="mx-8 font-mono text-sm font-medium uppercase tracking-[0.2em] text-black">
              {word}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-black/30"></span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scrollText {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </div>
  );
}
