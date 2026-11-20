import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[var(--void-bg)] px-4 py-12 text-[var(--void-ink)]">
      <div className="w-full max-w-md space-y-5 border border-[var(--void-border)] bg-[var(--void-surface)] p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--void-accent)]">
          404 · Route Not Found
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--void-ink)]">
          Page not available
        </h1>
        <p className="text-sm leading-relaxed text-[var(--void-ink-muted)]">
          The requested path does not exist or is restricted on this host. Return to the main
          portfolio to browse web builds, interactive 3D models, and hardware prototypes.
        </p>
        <div className="pt-1">
          <Link
            href="/"
            className="inline-flex min-h-[40px] items-center justify-center border border-[var(--void-border)] bg-[var(--void-btn-bg)] px-4 font-mono text-xs font-medium text-[var(--void-btn-ink)] transition-colors hover:bg-[var(--void-btn-hover)]"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
