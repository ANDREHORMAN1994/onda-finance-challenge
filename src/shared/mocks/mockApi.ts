import axios, {
  AxiosError,
  type AxiosAdapter,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { apiEndpoints } from '@/shared/constants/apiEndpoints';
import { accountStorageKey } from '@/shared/constants/storageKeys';
import { mockApiDelayInMs, mockLoginDelayInMs } from '@/shared/constants/timings';
import { accountSnapshotSeed } from '@/shared/mocks/account';
import type { AccountSnapshot, TransferInput } from '@/shared/types/account';

type AuthenticateInput = {
  email: string;
  password: string;
};

type AuthenticateResponse = {
  email: string;
};

function wait(delay: number) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, delay);
  });
}

function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function cloneAccountSnapshot(snapshot: AccountSnapshot) {
  return {
    ...snapshot,
    transactions: snapshot.transactions.map((transaction) => ({ ...transaction })),
  };
}

function parseStoredSnapshot(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<AccountSnapshot>;

    if (
      !parsed.accountName ||
      typeof parsed.balance !== 'number' ||
      !Array.isArray(parsed.transactions)
    ) {
      return null;
    }

    return parsed as AccountSnapshot;
  } catch {
    return null;
  }
}

function getStoredSnapshot() {
  if (typeof window === 'undefined') {
    return cloneAccountSnapshot(accountSnapshotSeed);
  }

  const existingSnapshot = parseStoredSnapshot(
    window.localStorage.getItem(accountStorageKey),
  );

  if (existingSnapshot) {
    return existingSnapshot;
  }

  const seededSnapshot = cloneAccountSnapshot(accountSnapshotSeed);

  window.localStorage.setItem(accountStorageKey, JSON.stringify(seededSnapshot));

  return seededSnapshot;
}

function saveAccountSnapshot(snapshot: AccountSnapshot) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(accountStorageKey, JSON.stringify(snapshot));
}

function parseRequestData<T>(data: AxiosRequestConfig['data']) {
  if (!data) {
    return {} as T;
  }

  if (typeof data === 'string') {
    return JSON.parse(data) as T;
  }

  return data as T;
}

function createResponse<T>(
  config: InternalAxiosRequestConfig,
  data: T,
  status = 200,
  statusText = 'OK',
) {
  return {
    config,
    data,
    headers: {},
    request: null,
    status,
    statusText,
  } satisfies AxiosResponse<T>;
}

function createApiError(
  config: InternalAxiosRequestConfig,
  message: string,
  status = 400,
) {
  const response = createResponse(config, { message }, status, 'Bad Request');

  return new AxiosError(
    message,
    axios.AxiosError.ERR_BAD_REQUEST,
    config,
    null,
    response,
  );
}

async function handleAuthenticateRequest(config: InternalAxiosRequestConfig) {
  await wait(mockLoginDelayInMs);

  const payload = parseRequestData<AuthenticateInput>(config.data);

  if (!payload.email?.trim()) {
    throw createApiError(config, 'Informe um e-mail válido.');
  }

  if (!payload.password?.trim()) {
    throw createApiError(config, 'Informe a senha para continuar.');
  }

  return createResponse<AuthenticateResponse>(config, {
    email: payload.email.trim(),
  });
}

async function handleAccountSnapshotRequest(config: InternalAxiosRequestConfig) {
  await wait(mockApiDelayInMs);

  return createResponse(config, cloneAccountSnapshot(getStoredSnapshot()));
}

async function handleTransferRequest(config: InternalAxiosRequestConfig) {
  await wait(mockApiDelayInMs);

  const payload = parseRequestData<TransferInput>(config.data);
  const normalizedRecipient = payload.recipient?.trim() ?? '';
  const normalizedAmount = roundCurrency(payload.amount ?? 0);

  if (!normalizedRecipient) {
    throw createApiError(config, 'Informe o destinatário da transferência.');
  }

  if (normalizedAmount <= 0) {
    throw createApiError(config, 'Informe um valor maior que zero.');
  }

  const currentSnapshot = getStoredSnapshot();

  if (normalizedAmount > currentSnapshot.balance) {
    throw createApiError(config, 'Saldo insuficiente para concluir a transferência.');
  }

  const updatedSnapshot = {
    ...currentSnapshot,
    balance: roundCurrency(currentSnapshot.balance - normalizedAmount),
    transactions: [
      {
        id: `txn-${Date.now()}`,
        title: 'Transferência enviada',
        counterpart: normalizedRecipient,
        amount: -normalizedAmount,
        type: 'transfer_sent' as const,
        createdAt: new Date().toISOString(),
      },
      ...currentSnapshot.transactions,
    ],
  } satisfies AccountSnapshot;

  saveAccountSnapshot(updatedSnapshot);

  return createResponse(config, cloneAccountSnapshot(updatedSnapshot));
}

export const mockApiAdapter: AxiosAdapter = async (config) => {
  const method = config.method?.toLowerCase();
  const url = config.url;

  if (method === 'post' && url === apiEndpoints.auth.login) {
    return handleAuthenticateRequest(config);
  }

  if (method === 'get' && url === apiEndpoints.account.snapshot) {
    return handleAccountSnapshotRequest(config);
  }

  if (method === 'post' && url === apiEndpoints.account.transfer) {
    return handleTransferRequest(config);
  }

  throw createApiError(config, 'Rota mock não encontrada.', 404);
};
