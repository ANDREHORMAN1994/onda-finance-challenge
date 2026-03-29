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
import { Alert } from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
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
    <section className='grid gap-6 xl:grid-cols-3'>
      <Card className='xl:col-span-2'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <span className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700'>
              <ArrowRightLeft className='h-6 w-6' />
            </span>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-sky-700'>
                Transferência
              </p>
              <CardTitle className='text-2xl'>
                Envie valores de forma rápida e segura.
              </CardTitle>
            </div>
          </div>
          <CardDescription className='pt-4'>
            Revise os dados antes de confirmar. Assim que a operação for
            concluída, o saldo e o histórico serão atualizados automaticamente.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isAccountLoading ? (
            <div className='rounded-2xl bg-slate-100 px-5 py-5'>
              <div className='h-4 w-36 rounded-full bg-slate-200' />
              <div className='mt-3 h-8 w-48 rounded-full bg-slate-200' />
            </div>
          ) : null}

          {isAccountError ? (
            <Alert variant='destructive'>
              <p className='font-medium'>Não foi possível carregar os dados da conta.</p>
              <Button
                className='mt-4'
                onClick={() => void refetch()}
                size='sm'
                type='button'
                variant='destructive'
              >
                Tentar novamente
              </Button>
            </Alert>
          ) : null}

          {!isAccountLoading && !isAccountError && accountSnapshot ? (
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
              <p className='text-sm font-medium text-slate-500'>Saldo disponível</p>
              <p className='mt-2 text-3xl font-semibold text-slate-950'>
                {formatCurrency(accountSnapshot.balance)}
              </p>
            </div>
          ) : null}

          <form className='mt-8 space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor='recipient'>Destinatário</Label>
              <Input
                className='mt-2'
                id='recipient'
                placeholder='Nome completo ou apelido'
                type='text'
                {...register('recipient')}
              />
              {errors.recipient ? (
                <p className='mt-2 text-sm text-rose-600'>
                  {errors.recipient.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor='amount'>Valor</Label>
              <Input
                className='mt-2'
                id='amount'
                inputMode='decimal'
                min='0.01'
                placeholder='0,00'
                step='0.01'
                type='number'
                {...register('amount')}
              />
              {errors.amount ? (
                <p className='mt-2 text-sm text-rose-600'>
                  {errors.amount.message}
                </p>
              ) : null}
            </div>

            {errors.root ? (
              <Alert variant='destructive'>{errors.root.message}</Alert>
            ) : null}

            {successMessage ? (
              <Alert variant='success'>{successMessage}</Alert>
            ) : null}

            <Button
              className='w-full'
              disabled={transferMutation.isPending || isAccountLoading || isAccountError}
              type='submit'
            >
              {transferMutation.isPending ? (
                <>
                  <LoaderCircle className='h-4 w-4 animate-spin' />
                  Processando transferência...
                </>
              ) : (
                'Confirmar transferência'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <aside className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <BadgeCheck className='h-5 w-5 text-emerald-600' />
              <CardTitle className='text-lg'>Dados da operação</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <dl className='space-y-4'>
              <div className='rounded-2xl bg-slate-50 px-4 py-4'>
                <dt className='text-sm font-medium text-slate-500'>Destinatário</dt>
                <dd className='mt-2 text-sm font-medium text-slate-900'>
                  {watchedRecipient?.trim() || 'Informe quem receberá o valor'}
                </dd>
              </div>

              <div className='rounded-2xl bg-slate-50 px-4 py-4'>
                <dt className='text-sm font-medium text-slate-500'>Valor</dt>
                <dd className={`mt-2 text-sm font-medium ${getAmountClassName(watchedAmount || 0)}`}>
                  {watchedAmount && watchedAmount > 0
                    ? formatCurrency(watchedAmount)
                    : 'Informe um valor para visualizar'}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className='border-slate-200 bg-slate-950 text-white'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <CircleAlert className='h-5 w-5 text-sky-300' />
              <CardTitle className='text-lg text-white'>Observação</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-300'>
              Após uma transferência bem-sucedida, o dashboard refletirá o novo
              saldo e a movimentação mais recente da conta.
            </p>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
}
