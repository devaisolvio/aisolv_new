import { useContext } from 'react';
import { HomeVariantContext } from './homeVariantContext';

export function useHomeVariant() {
  const ctx = useContext(HomeVariantContext);
  if (!ctx) {
    throw new Error('useHomeVariant must be used within HomeVariantProvider');
  }
  return ctx;
}
