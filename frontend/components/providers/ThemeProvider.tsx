'use client';

/**
 * ThemeProvider wraps the entire app and manages dark/light mode.
 * It reads from the Zustand store and applies the class to the HTML element.
 */
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
