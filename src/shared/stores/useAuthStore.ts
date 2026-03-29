import { create } from 'zustand';

import {
  clearSession,
  createSession,
  getSession,
  type SessionUser,
} from '@/shared/utils/session';

type AuthStore = {
  isAuthenticated: boolean;
  user: SessionUser | null;
  login: (email: string) => void;
  logout: () => void;
};

const initialSession = getSession();

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: initialSession?.isAuthenticated ?? false,
  user: initialSession?.user ?? null,
  login: (email) => {
    const session = createSession(email);

    set({
      isAuthenticated: Boolean(session?.isAuthenticated),
      user: session?.user ?? null,
    });
  },
  logout: () => {
    clearSession();

    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
