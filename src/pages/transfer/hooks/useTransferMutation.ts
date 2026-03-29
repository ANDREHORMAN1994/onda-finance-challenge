import { useMutation, useQueryClient } from '@tanstack/react-query';

import { transferFunds } from '@/shared/services/accountService';
import { accountSnapshotQueryKey } from '@/shared/hooks/useAccountSnapshot';

export function useTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferFunds,
    onSuccess: (snapshot) => {
      queryClient.setQueryData(accountSnapshotQueryKey, snapshot);
    },
  });
}
