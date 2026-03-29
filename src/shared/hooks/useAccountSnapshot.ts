import { useQuery } from '@tanstack/react-query';

import { accountSnapshotQueryKey } from '@/shared/constants/queryKeys';
import { getAccountSnapshot } from '@/shared/services/accountService';

export function useAccountSnapshot() {
  return useQuery({
    queryFn: getAccountSnapshot,
    queryKey: accountSnapshotQueryKey,
  });
}
