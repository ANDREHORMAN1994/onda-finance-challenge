import { accountSnapshotSeed } from '@/shared/mocks/account';
import type { AccountSnapshot, TransferInput } from '@/shared/types/account';

export const accountStorageKey = 'onda-finance:account';
const requestDelayInMs = 700;

export class AccountServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccountServiceError';
  }
}

function cloneAccountSnapshot(snapshot: AccountSnapshot) {
  return {
    ...snapshot,
    transactions: snapshot.transactions.map((transaction) => ({ ...transaction })),
  };
}

function wait(delay: number) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, delay);
  });
}

function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
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

  window.localStorage.setItem(
    accountStorageKey,
    JSON.stringify(seededSnapshot),
  );

  return seededSnapshot;
}

function saveAccountSnapshot(snapshot: AccountSnapshot) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(accountStorageKey, JSON.stringify(snapshot));
}

export async function getAccountSnapshot() {
  await wait(requestDelayInMs);

  return cloneAccountSnapshot(getStoredSnapshot());
}

export async function transferFunds({ amount, recipient }: TransferInput) {
  await wait(requestDelayInMs);

  const normalizedRecipient = recipient.trim();
  const normalizedAmount = roundCurrency(amount);

  if (!normalizedRecipient) {
    throw new AccountServiceError('Informe o destinatário da transferência.');
  }

  if (normalizedAmount <= 0) {
    throw new AccountServiceError('Informe um valor maior que zero.');
  }

  const currentSnapshot = getStoredSnapshot();

  if (normalizedAmount > currentSnapshot.balance) {
    throw new AccountServiceError('Saldo insuficiente para concluir a transferência.');
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

  return cloneAccountSnapshot(updatedSnapshot);
}
