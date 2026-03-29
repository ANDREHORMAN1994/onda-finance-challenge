import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('Setup', () => {
  it('should run tests', () => {
    expect(true).toBe(true);
  });
});
