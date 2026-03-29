import axios from 'axios';

import { apiEndpoints } from '@/shared/constants/apiEndpoints';
import { apiClient } from '@/shared/lib/apiClient';
import type { AccountSnapshot, TransferInput } from '@/shared/types/account';

export class AccountServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccountServiceError';
  }
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === 'string') {
      return message;
    }
  }

  return fallbackMessage;
}

export async function getAccountSnapshot() {
  try {
    const { data } = await apiClient.get<AccountSnapshot>(
      apiEndpoints.account.snapshot,
    );

    return data;
  } catch (error) {
    throw new AccountServiceError(
      getErrorMessage(error, 'Não foi possível carregar os dados da conta.'),
    );
  }
}

export async function transferFunds({ amount, recipient }: TransferInput) {
  try {
    const { data } = await apiClient.post<AccountSnapshot>(
      apiEndpoints.account.transfer,
      {
        amount,
        recipient,
      },
    );

    return data;
  } catch (error) {
    throw new AccountServiceError(
      getErrorMessage(
        error,
        'Não foi possível concluir a transferência agora.',
      ),
    );
  }
}
