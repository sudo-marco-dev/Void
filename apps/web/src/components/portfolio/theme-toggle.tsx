'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

interface ActiveViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition?: () => void;
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeTransitionRef = useRef<ActiveViewTransition | null>(null);
  const activeAnimRef = useRef<Animation | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  function applyTheme(next: Theme) {
    document.documentElement.classList.toggle('light', next === 'light');
    try {
      localStorage.setItem('void-theme', next);
    } catch {
      // Ignore storage access failures in strict privacy browsers.
    }
    setTheme(next);
  }

  function handleToggle() {
    const current: Theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const next: Theme = current === 'dark' ? 'light' : 'dark';

    // If a circular transition is mid-flight, cancel it immediately and commit the new state synchronously.
    if (activeTransitionRef.current) {
      activeAnimRef.current?.cancel();
      activeTransitionRef.current.skipTransition?.();
      activeAnimRef.current = null;
      activeTransitionRef.current = null;
      flushSync(() => {
        applyTheme(next);
      });
      return;
    }

    const button = buttonRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => ActiveViewTransition;
    };

    if (!button || !doc.startViewTransition || reducedMotion) {
      flushSync(() => {
        applyTheme(next);
      });
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        applyTheme(next);
      });
    });

    activeTransitionRef.current = transition;

    transition.ready
      .then(() => {
        if (activeTransitionRef.current !== transition) return;
        activeAnimRef.current = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        // View transition aborted; state is already applied.
      });

    transition.finished
      .catch(() => {
        // Ignore abort errors on rapid double-clicks.
      })
      .finally(() => {
        if (activeTransitionRef.current === transition) {
          activeTransitionRef.current = null;
          activeAnimRef.current = null;
        }
      });
  }

  const isLight = mounted && theme === 'light';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="inline-flex h-11 w-11 items-center justify-center border border-[var(--void-border)] bg-[var(--void-surface)] text-[var(--void-ink-secondary)] transition-colors hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)] md:h-9 md:w-9"
    >
      {isLight ? (
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
