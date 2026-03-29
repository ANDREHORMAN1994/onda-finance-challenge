import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import { useAuthStore } from '@/shared/stores/useAuthStore';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useAuthStore.setState({
    isAuthenticated: false,
    user: null,
  });
});
