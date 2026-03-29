import { useQuery } from '@tanstack/react-query';

import { getAccountSnapshot } from '@/shared/services/accountService';

export function useDashboardData() {
  return useQuery({
    queryFn: getAccountSnapshot,
    queryKey: ['account-snapshot'],
  });
}
