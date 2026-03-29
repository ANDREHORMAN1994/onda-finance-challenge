import type { AccountSnapshot } from '@/shared/types/account';

export const accountSnapshotSeed: AccountSnapshot = {
  accountName: 'Onda Digital',
  balance: 12480.9,
  transactions: [
    {
      id: 'txn-001',
      title: 'Transferência enviada',
      counterpart: 'Mariana Souza',
      amount: -850,
      type: 'transfer_sent',
      createdAt: '2026-03-29T09:42:00-03:00',
    },
    {
      id: 'txn-002',
      title: 'Pix recebido',
      counterpart: 'Carlos Eduardo',
      amount: 1200,
      type: 'pix_received',
      createdAt: '2026-03-28T18:15:00-03:00',
    },
    {
      id: 'txn-003',
      title: 'Pagamento de boleto',
      counterpart: 'Energia residencial',
      amount: -214.37,
      type: 'bill_payment',
      createdAt: '2026-03-28T08:10:00-03:00',
    },
  ],
};
