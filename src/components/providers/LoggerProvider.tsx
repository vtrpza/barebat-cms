'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { logger, logNavigation } from '@/lib/logger';

function LoggerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Log navigation on route changes
    const query = Object.fromEntries(new URLSearchParams(searchParams.toString()));
    logNavigation(pathname, query);
  }, [pathname, searchParams]);

  // Log initial render
  useEffect(() => {
    logger.info('Application mounted', {
      timestamp: new Date().toISOString(),
      pathname,
      environment: process.env.NODE_ENV,
    });

    return () => {
      logger.info('Application unmounted', {
        timestamp: new Date().toISOString(),
      });
    };
  }, [pathname]);

  return null;
}

export function LoggerProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <LoggerContent />
      </Suspense>
      {children}
    </>
  );
} 