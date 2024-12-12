import { secureStorage } from '@/lib/store';

export function useStorage() {
  const secure = secureStorage();

  return {
    ...secure,
  };
}
