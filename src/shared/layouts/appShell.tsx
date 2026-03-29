import { Landmark, LogOut } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import {
  appBrandName,
  appProductLabel,
  defaultUserEmail,
  defaultUserName,
} from '@/shared/constants/app';
import { navigationItems } from '@/shared/constants/navigation';
import { appRoutes } from '@/shared/constants/routes';
import { useAuthStore } from '@/shared/stores/useAuthStore';

function getNavItemClassName(isActive: boolean) {
  if (isActive) {
    return 'inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white';
  }

  return 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200';
}

export function AppShell() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate(appRoutes.login, { replace: true });
  };

  return (
    <div className='min-h-screen bg-slate-100 text-slate-950'>
      <header className='border-b border-slate-200 bg-white'>
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex items-center gap-3'>
            <span className='inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
              <Landmark className='h-5 w-5' />
            </span>

            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-sky-700'>
                {appBrandName}
              </p>
              <p className='text-sm text-slate-500'>{appProductLabel}</p>
            </div>
          </div>

          <nav className='flex flex-wrap items-center gap-3'>
            {navigationItems.map(({ label, to, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => getNavItemClassName(isActive)}>
                <Icon className='h-4 w-4' />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className='flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-end'>
            <div className='min-w-0 flex-1 text-left sm:flex-none sm:text-right'>
              <p className='text-sm font-medium text-slate-900'>
                {user?.name ?? defaultUserName}
              </p>
              <p className='max-w-56 truncate text-xs text-slate-500 sm:max-w-none'>
                {user?.email ?? defaultUserEmail}
              </p>
            </div>

            <button
              className='inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100'
              onClick={handleLogout}
              type='button'
            >
              <LogOut className='h-4 w-4' />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className='mx-auto w-full max-w-6xl px-6 py-8 sm:px-8'>
        <Outlet />
      </main>
    </div>
  );
}
