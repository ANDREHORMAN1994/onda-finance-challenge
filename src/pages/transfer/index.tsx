import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRightLeft,
  BadgeCheck,
  CircleAlert,
  LoaderCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import {
  transferSchema,
  type TransferFormData,
  type TransferFormInput,
} from '@/pages/transfer/schema';
import { useTransferMutation } from '@/pages/transfer/hooks/useTransferMutation';
import { useAccountSnapshot } from '@/shared/hooks/useAccountSnapshot';
import { AccountServiceError } from '@/shared/services/accountService';
import { formatCurrency } from '@/shared/utils/formatters';

function getAmountClassName(amount: number) {
  if (amount > 0) {
    return 'text-emerald-600';
  }

  return 'text-rose-600';
}

export function TransferPage() {
  const [successMessage, setSuccessMessage] = useState('');
  const {
    data: accountSnapshot,
    isError: isAccountError,
    isLoading: isAccountLoading,
    refetch,
  } = useAccountSnapshot();
  const transferMutation = useTransferMutation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<TransferFormInput, undefined, TransferFormData>({
    defaultValues: {
      amount: 0,
      recipient: '',
    },
    resolver: zodResolver(transferSchema),
  });

  const watchedRecipientValue = useWatch({
    control,
    name: 'recipient',
  });
  const watchedAmountValue = useWatch({
    control,
    name: 'amount',
  });
  const watchedRecipient =
    typeof watchedRecipientValue === 'string' ? watchedRecipientValue : '';
  const watchedAmount =
    typeof watchedAmountValue === 'number'
      ? watchedAmountValue
      : Number(watchedAmountValue || 0);

  const onSubmit = async (data: TransferFormData) => {
    setSuccessMessage('');

    if (!accountSnapshot) {
      return;
    }

    if (data.amount > accountSnapshot.balance) {
      setError('amount', {
        message: 'Saldo insuficiente para concluir a transferência.',
        type: 'manual',
      });

      return;
    }

    try {
      const updatedSnapshot = await transferMutation.mutateAsync({
        amount: data.amount,
        recipient: data.recipient,
      });

      reset({
        amount: 0,
        recipient: '',
      });

      setSuccessMessage(
        `Transferência de ${formatCurrency(data.amount)} enviada para ${data.recipient}. Saldo atual: ${formatCurrency(updatedSnapshot.balance)}.`,
      );
    } catch (error) {
      if (error instanceof AccountServiceError) {
        setError('root', {
          message: error.message,
          type: 'server',
        });
      } else {
        setError('root', {
          message: 'Não foi possível concluir a transferência agora.',
          type: 'server',
        });
      }
    }
  };

  return (
    <section className="grid gap-6 xl:grid-cols-3">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <ArrowRightLeft className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Transferência
            </p>
            <h1 className="text-2xl font-semibold text-slate-950">
              Envie valores de forma rápida e segura.
            </h1>
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-600">
          Revise os dados antes de confirmar. Assim que a operação for
          concluída, o saldo e o histórico serão atualizados automaticamente.
        </p>

        {isAccountLoading ? (
          <div className="mt-8 rounded-2xl bg-slate-100 px-5 py-5">
            <div className="h-4 w-36 rounded-full bg-slate-200" />
            <div className="mt-3 h-8 w-48 rounded-full bg-slate-200" />
          </div>
        ) : null}

        {isAccountError ? (
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-5">
            <p className="text-sm font-medium text-rose-900">
              Não foi possível carregar os dados da conta.
            </p>
            <button
              className="mt-4 inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
              onClick={() => void refetch()}
              type="button"
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        {!isAccountLoading && !isAccountError && accountSnapshot ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Saldo disponível</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {formatCurrency(accountSnapshot.balance)}
            </p>
          </div>
        ) : null}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="recipient"
            >
              Destinatário
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              id="recipient"
              placeholder="Nome completo ou apelido"
              type="text"
              {...register('recipient')}
            />
            {errors.recipient ? (
              <p className="mt-2 text-sm text-rose-600">
                {errors.recipient.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600" htmlFor="amount">
              Valor
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              id="amount"
              inputMode="decimal"
              min="0.01"
              placeholder="0,00"
              step="0.01"
              type="number"
              {...register('amount')}
            />
            {errors.amount ? (
              <p className="mt-2 text-sm text-rose-600">
                {errors.amount.message}
              </p>
            ) : null}
          </div>

          {errors.root ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
              {errors.root.message}
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              {successMessage}
            </div>
          ) : null}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={transferMutation.isPending || isAccountLoading || isAccountError}
            type="submit"
          >
            {transferMutation.isPending ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Processando transferência...
              </>
            ) : (
              'Confirmar transferência'
            )}
          </button>
        </form>
      </article>

      <aside className="space-y-6">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-950">
              Dados da operação
            </h2>
          </div>

          <dl className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <dt className="text-sm font-medium text-slate-500">Destinatário</dt>
              <dd className="mt-2 text-sm font-medium text-slate-900">
                {watchedRecipient?.trim() || 'Informe quem receberá o valor'}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <dt className="text-sm font-medium text-slate-500">Valor</dt>
              <dd className={`mt-2 text-sm font-medium ${getAmountClassName(watchedAmount || 0)}`}>
                {watchedAmount && watchedAmount > 0
                  ? formatCurrency(watchedAmount)
                  : 'Informe um valor para visualizar'}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <CircleAlert className="h-5 w-5 text-sky-300" />
            <h2 className="text-lg font-semibold">Observação</h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Após uma transferência bem-sucedida, o dashboard refletirá o novo
            saldo e a movimentação mais recente da conta.
          </p>
        </article>
      </aside>
    </section>
  );
}
