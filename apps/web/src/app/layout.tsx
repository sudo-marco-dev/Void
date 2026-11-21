import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionProvider } from '@/components/portfolio/motion-provider';
import { CONTACT_LINKS, PROFILE } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const THEME_INIT_SCRIPT =
  "try{var t=localStorage.getItem('void-theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}";

const DEV_SW_CLEANUP_SCRIPT =
  "try{if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(regs){if(!regs.length)return;Promise.all(regs.map(function(r){return r.unregister();})).then(function(){return 'caches' in window?caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return caches.delete(k);}));}):undefined;}).then(function(){if(!sessionStorage.getItem('void-sw-cleaned')){sessionStorage.setItem('void-sw-cleaned','1');window.location.reload();}});}).catch(function(){});}}catch(e){}";

const siteUrl = getSiteUrl();
const siteTitle = `${PROFILE.fullName} | Portfolio`;
const siteDescription =
  'Portfolio of Marco Rye S. Dela Serna, a 4th-year BSIT student building full-stack web systems (Next.js, React, Supabase), ESP32 hardware prototypes, and Onshape + 3D-printed enclosures.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: PROFILE.fullName, url: CONTACT_LINKS.githubUrl }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: PROFILE.fullName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b100e' },
    { media: '(prefers-color-scheme: light)', color: '#f4f3ee' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {process.env.NODE_ENV === 'development' ? (
          <script dangerouslySetInnerHTML={{ __html: DEV_SW_CLEANUP_SCRIPT }} />
        ) : null}
      </head>
      <body className="min-h-dvh overflow-x-clip bg-[var(--void-bg)] font-sans text-[var(--void-ink)] antialiased selection:bg-[var(--void-accent)]/20">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
