import { accountSnapshotSeed } from '@/shared/mocks/account';
import type { AccountSnapshot } from '@/shared/types/account';

const accountStorageKey = 'onda-finance:account';
const requestDelayInMs = 700;

function cloneAccountSnapshot(snapshot: AccountSnapshot) {
  return {
    ...snapshot,
    transactions: snapshot.transactions.map((transaction) => ({ ...transaction })),
  };
}

function wait(delay: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
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

export async function getAccountSnapshot() {
  await wait(requestDelayInMs);

  return cloneAccountSnapshot(getStoredSnapshot());
}
