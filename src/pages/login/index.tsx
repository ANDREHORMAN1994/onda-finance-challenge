import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { loginSchema, type LoginFormData } from '@/pages/login/schema';
import { appBrandName } from '@/shared/constants/app';
import { appRoutes } from '@/shared/constants/routes';
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
import { authenticateUser } from '@/shared/services/authService';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    return <Navigate replace to={appRoutes.dashboard} />;
  }

  const onSubmit = async (data: LoginFormData) => {
    clearErrors('root');

    try {
      const authenticatedUser = await authenticateUser(data);

      login(authenticatedUser.email);
      navigate(appRoutes.dashboard, { replace: true });
    } catch (error) {
      setError('root', {
        message:
          error instanceof Error
            ? error.message
            : 'Não foi possível autenticar a conta agora.',
        type: 'server',
      });
    }
  };

  return (
    <main className='min-h-screen bg-slate-950 text-white'>
      <div className='mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 sm:px-8'>
        <section className='grid w-full gap-8 lg:grid-cols-2'>
          <article className='flex flex-col justify-center space-y-6'>
            <div className='space-y-4'>
              <p className='text-sm font-semibold uppercase tracking-wide text-sky-300'>
                {appBrandName}
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

          <Card className='border-white/20 bg-white text-slate-950 shadow-xl'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700'>
                  <LockKeyhole className='h-6 w-6' />
                </span>
                <CardTitle className='text-2xl'>Acesso à conta</CardTitle>
              </div>
              <CardDescription className='pt-4'>
                Entre para consultar sua movimentação, acompanhar o saldo da conta e iniciar novas
                transferências.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='email'>E-mail</Label>
                    <Input
                      autoComplete='email'
                      className='mt-2'
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
                    <Label htmlFor='password'>Senha</Label>
                    <Input
                      autoComplete='current-password'
                      className='mt-2'
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

                {errors.root ? (
                  <Alert className='mt-6' variant='destructive'>
                    {errors.root.message}
                  </Alert>
                ) : null}

                <Button className='mt-6 w-full' disabled={isSubmitting} type='submit'>
                  {isSubmitting ? 'Entrando...' : 'Continuar'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
