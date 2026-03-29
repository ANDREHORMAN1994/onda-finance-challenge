import { LockKeyhole, ShieldCheck } from 'lucide-react';

export function LoginPage() {
  return (
    <main className='min-h-screen bg-slate-950 text-white'>
      <div className='mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 sm:px-8'>
        <section className='grid w-full gap-8 lg:grid-cols-2'>
          <article className='flex flex-col justify-center space-y-6'>
            <div className='inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white'>
              <ShieldCheck className='h-7 w-7' />
            </div>

            <div className='space-y-4'>
              <p className='text-sm font-semibold uppercase tracking-wide text-sky-300'>
                Onda Finance
              </p>
              <h1 className='text-4xl font-semibold tracking-tight text-white'>
                Sua conta digital em um único lugar.
              </h1>
              <p className='max-w-xl text-base leading-7 text-slate-300'>
                Acompanhe saldo, transações recentes e transferências em uma
                experiência simples e direta.
              </p>
            </div>
          </article>

          <article className='rounded-3xl bg-white p-8 text-slate-950 shadow-xl'>
            <div className='flex items-center gap-3'>
              <span className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700'>
                <LockKeyhole className='h-6 w-6' />
              </span>
              <div>
                <p className='text-sm font-semibold uppercase tracking-wide text-sky-700'>/login</p>
                <h2 className='text-2xl font-semibold text-slate-950'>Acesso à conta</h2>
              </div>
            </div>

            <p className='mt-6 text-sm leading-6 text-slate-600'>
              Entre para consultar sua movimentação, acompanhar o saldo da conta
              e iniciar novas transferências.
            </p>

            <div className='mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6'>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Email</p>
                  <div className='mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400'>
                    seuemail@onda.finance
                  </div>
                </div>

                <div>
                  <p className='text-sm font-medium text-slate-500'>Senha</p>
                  <div className='mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400'>
                    ••••••••••••
                  </div>
                </div>
              </div>

              <button
                type='button'
                className='mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white'
              >
                Continuar
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
