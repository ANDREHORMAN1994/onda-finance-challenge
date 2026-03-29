import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountSnapshotQueryKey } from '@/shared/constants/queryKeys';
import { transferFunds } from '@/shared/services/accountService';

export function useTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferFunds,
    onSuccess: (snapshot) => {
      queryClient.setQueryData(accountSnapshotQueryKey, snapshot);
    },
  });
}
