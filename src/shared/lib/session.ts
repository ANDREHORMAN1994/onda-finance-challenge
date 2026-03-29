export const sessionStorageKey = 'onda-finance:session';

export function hasActiveSession() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(sessionStorageKey) === 'authenticated';
}
