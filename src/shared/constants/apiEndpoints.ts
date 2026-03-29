export const apiEndpoints = {
  account: {
    snapshot: '/account',
    transfer: '/account/transfer',
  },
  auth: {
    login: '/auth/login',
  },
} as const;
