import { defaultUserName } from '@/shared/constants/app';
import { sessionStorageKey } from '@/shared/constants/storageKeys';

export type SessionUser = {
  email: string;
  name: string;
};

export type SessionData = {
  isAuthenticated: true;
  user: SessionUser;
};

function getNameFromEmail(email: string) {
  const [localPart] = email.split('@');

  const displayName = localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return displayName || defaultUserName;
}

function parseSession(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<SessionData>;

    if (
      parsed.isAuthenticated !== true ||
      !parsed.user?.email ||
      !parsed.user?.name
    ) {
      return null;
    }

    return parsed as SessionData;
  } catch {
    return null;
  }
}

export function getSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  return parseSession(window.localStorage.getItem(sessionStorageKey));
}

export function hasActiveSession() {
  return getSession()?.isAuthenticated === true;
}

export function createSession(email: string) {
  if (typeof window === 'undefined') {
    return null;
  }

  const session = {
    isAuthenticated: true,
    user: {
      email,
      name: getNameFromEmail(email),
    },
  } satisfies SessionData;

  window.localStorage.setItem(sessionStorageKey, JSON.stringify(session));

  return session;
}

export function clearSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(sessionStorageKey);
}
