import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ROOT_DOMAIN = (process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000').toLowerCase();

function extractClientSubdomain(hostHeader: string): string | null {
  const host = hostHeader.toLowerCase();
  const hostname = host.split(':')[0] ?? '';
  const rootHostname = ROOT_DOMAIN.split(':')[0] ?? 'localhost';

  if (
    !hostname ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === rootHostname ||
    hostname === `www.${rootHostname}` ||
    hostname.endsWith('.vercel.app')
  ) {
    return null;
  }

  // Local testing: e.g. client-slug.localhost:3000
  if (hostname.endsWith('.localhost')) {
    const sub = hostname.slice(0, -'.localhost'.length);
    return /^[a-z0-9-]+$/.test(sub) && sub !== 'www' ? sub : null;
  }

  // Production custom domain: e.g. client-slug.yourdomain.me
  if (hostname.endsWith(`.${rootHostname}`)) {
    const sub = hostname.slice(0, -(rootHostname.length + 1));
    return /^[a-z0-9-]+$/.test(sub) && sub !== 'www' ? sub : null;
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/clients') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get('host') ?? '';
  const subdomain = extractClientSubdomain(host);

  if (!subdomain) {
    return NextResponse.next();
  }

  // Rewrite semi-private client subdomains to their unlisted route without exposing links on `/`.
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/clients/${subdomain}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
