import { ArrowUpRight, Wallet } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useAccountSnapshot } from '@/shared/hooks/useAccountSnapshot';
import { formatCurrency, formatTransactionDate } from '@/shared/utils/formatters';

function getTransactionAmountClassName(amount: number) {
  if (amount < 0) {
    return 'text-rose-600';
  }

  return 'text-emerald-600';
}

export function DashboardPage() {
  const { data: accountSnapshot, isError, isLoading, refetch } = useAccountSnapshot();

  const lastTransfer = accountSnapshot?.transactions.find(
    (transaction) => transaction.type === 'transfer_sent',
  );

  const overviewCards = [
    {
      title: 'Saldo disponível',
      value: accountSnapshot ? formatCurrency(accountSnapshot.balance) : '--',
      description: 'Valor disponível para movimentação imediata.',
      icon: Wallet,
    },
    {
      title: 'Última transferência',
      value: lastTransfer ? formatCurrency(Math.abs(lastTransfer.amount)) : '--',
      description: lastTransfer
        ? `${lastTransfer.counterpart} • ${formatTransactionDate(lastTransfer.createdAt)}`
        : 'Nenhuma transferência recente encontrada.',
      icon: ArrowUpRight,
    },
  ];

  return (
    <section className='space-y-8'>
      <header className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold uppercase tracking-wide text-sky-700'>Dashboard</p>
          <h1 className='text-3xl font-semibold tracking-tight text-slate-950'>
            Resumo da sua conta.
          </h1>
          <p className='max-w-2xl text-base leading-7 text-slate-600'>
            Visualize o saldo atual, acompanhe suas movimentações recentes e acesse rapidamente a
            área de transferências.
          </p>
        </div>
      </header>

      <div className='grid gap-4 lg:grid-cols-2'>
        {overviewCards.map(({ title, value, description, icon: Icon }) => (
          <Card key={title}>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-slate-500'>{title}</p>
                <span className='rounded-full bg-sky-100 p-3 text-sky-700'>
                  <Icon className='h-5 w-5' />
                </span>
              </div>

              <p className='mt-6 text-2xl font-semibold text-slate-950'>{value}</p>
              <p className='mt-2 text-sm leading-6 text-slate-600'>{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <CardTitle>Transações recentes</CardTitle>
              <CardDescription className='mt-2'>
                Últimas movimentações registradas na conta.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className='space-y-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`transaction-skeleton-${index + 1}`}
                  className='rounded-2xl bg-slate-100 px-4 py-5'
                >
                  <div className='h-4 w-40 rounded-full bg-slate-200' />
                  <div className='mt-3 h-3 w-28 rounded-full bg-slate-200' />
                </div>
              ))}
            </div>
          ) : null}

          {isError ? (
            <div className='rounded-2xl border border-rose-200 bg-rose-50 p-5'>
              <p className='text-sm font-medium text-rose-900'>
                Não foi possível carregar as movimentações da conta.
              </p>
              <Button
                className='mt-4'
                onClick={() => void refetch()}
                size='sm'
                type='button'
                variant='destructive'
              >
                Tentar novamente
              </Button>
            </div>
          ) : null}

          {!isLoading && !isError && accountSnapshot?.transactions.length === 0 ? (
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
              <p className='text-sm text-slate-600'>
                Ainda não há movimentações registradas nesta conta.
              </p>
            </div>
          ) : null}

          {!isLoading && !isError && accountSnapshot?.transactions.length ? (
            <div className='space-y-3'>
              {accountSnapshot.transactions.map((transaction) => (
                <article
                  key={transaction.id}
                  className='flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between'
                >
                  <div>
                    <p className='font-medium text-slate-900'>{transaction.title}</p>
                    <p className='mt-1 text-sm text-slate-500'>
                      {transaction.counterpart} • {formatTransactionDate(transaction.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${getTransactionAmountClassName(transaction.amount)}`}
                  >
                    {transaction.amount > 0 ? '+ ' : '- '}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </article>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
