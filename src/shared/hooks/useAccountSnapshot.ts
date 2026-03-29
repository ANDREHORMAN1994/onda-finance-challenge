import { useQuery } from '@tanstack/react-query';

import { getAccountSnapshot } from '@/shared/services/accountService';

export const accountSnapshotQueryKey = ['account-snapshot'] as const;

export function useAccountSnapshot() {
  return useQuery({
    queryFn: getAccountSnapshot,
    queryKey: accountSnapshotQueryKey,
  });
}
