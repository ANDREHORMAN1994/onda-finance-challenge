import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { loginSchema, type LoginFormData } from '@/pages/login/schema';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    return <Navigate replace to='/dashboard' />;
  }

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 600);
    });

    login(data.email);
    navigate('/dashboard', { replace: true });
  };

  return (
    <main className='min-h-screen bg-slate-950 text-white'>
      <div className='mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 sm:px-8'>
        <section className='grid w-full gap-8 lg:grid-cols-2'>
          <article className='flex flex-col justify-center space-y-6'>
            <div className='space-y-4'>
              <p className='text-sm font-semibold uppercase tracking-wide text-sky-300'>
                Onda Finance
              </p>
              <h1 className='text-3xl font-semibold tracking-tight text-white'>
                Sua conta digital em um único lugar.
              </h1>
              <p className='max-w-xl text-base leading-7 text-slate-300'>
                Acompanhe saldo, transações recentes e transferências em uma experiência simples e
                direta.
              </p>
            </div>
          </article>

          <article className='rounded-3xl bg-white p-8 text-slate-950 shadow-xl'>
            <div className='flex items-center gap-3'>
              <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700'>
                <LockKeyhole className='h-6 w-6' />
              </span>
              <h2 className='text-2xl font-semibold text-slate-950'>Acesso à conta</h2>
            </div>

            <p className='mt-6 text-sm leading-6 text-slate-600'>
              Entre para consultar sua movimentação, acompanhar o saldo da conta e iniciar novas
              transferências.
            </p>

            <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-slate-500' htmlFor='email'>
                    E-mail
                  </label>
                  <input
                    autoComplete='email'
                    className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500'
                    id='email'
                    placeholder='seuemail@onda.finance'
                    type='email'
                    {...register('email')}
                  />
                  {errors.email ? (
                    <p className='mt-2 text-sm text-rose-600'>{errors.email.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className='text-sm font-medium text-slate-500' htmlFor='password'>
                    Senha
                  </label>
                  <input
                    autoComplete='current-password'
                    className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500'
                    id='password'
                    placeholder='Digite sua senha'
                    type='password'
                    {...register('password')}
                  />
                  {errors.password ? (
                    <p className='mt-2 text-sm text-rose-600'>{errors.password.message}</p>
                  ) : null}
                </div>
              </div>

              <button
                className='mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400'
                disabled={isSubmitting}
                type='submit'
              >
                {isSubmitting ? 'Entrando...' : 'Continuar'}
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}
