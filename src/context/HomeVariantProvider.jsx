import { useCallback, useMemo, useState } from 'react';
import { HomeVariantContext } from './homeVariantContext';

const STORAGE_KEY = 'aisolv_home_preview_side';

export function HomeVariantProvider({ children }) {
  const [side, setSideState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === 'draft' || stored === 'current' || stored === 'draftV2') return stored;
    } catch {
      /* ignore */
    }
    return 'current';
  });

  const setSide = useCallback((next) => {
    setSideState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ side, setSide }), [side, setSide]);

  return (
    <HomeVariantContext.Provider value={value}>
      {children}
    </HomeVariantContext.Provider>
  );
}
