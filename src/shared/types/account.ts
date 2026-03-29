export type AccountTransactionType =
  | 'transfer_sent'
  | 'pix_received'
  | 'bill_payment';

export type AccountTransaction = {
  id: string;
  title: string;
  counterpart: string;
  amount: number;
  type: AccountTransactionType;
  createdAt: string;
};

export type AccountSnapshot = {
  accountName: string;
  balance: number;
  transactions: AccountTransaction[];
};

export type TransferInput = {
  amount: number;
  recipient: string;
};
