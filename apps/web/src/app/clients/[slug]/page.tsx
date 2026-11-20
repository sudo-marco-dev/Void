import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Unlisted, semi-private client entry point resolved via client subdomain rewrites
 * (e.g. `<client-slug>.yourdomain.me`). Intentionally omitted from the public portfolio `/`.
 */
const RESERVED_CLIENT_LABELS: Record<string, string> = {
  'vape-shop': 'Retail Inventory & Order Management Workspace',
  'iron-pulse-gym': 'Fitness Membership & Booking Workspace',
};

export const metadata: Metadata = {
  title: 'Private Client Workspace',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ClientWorkspacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = RESERVED_CLIENT_LABELS[slug];

  if (!label) {
    notFound();
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#09090b] px-4 py-12 text-zinc-100">
      <div className="w-full max-w-md border border-zinc-800 bg-[#111113] p-6 space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          Semi-Private Client Route · {slug}
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-50">{label}</h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          This client subdomain endpoint is reserved and isolated from the public portfolio. Module
          implementation and Supabase data wiring begin after portfolio testing and deployment.
        </p>
      </div>
    </main>
  );
}
