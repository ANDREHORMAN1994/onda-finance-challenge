import { Landmark, LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutGrid,
  },
  {
    label: 'Transferência',
    to: '/transfer',
    icon: ArrowRightLeft,
  },
];

function getNavItemClassName(isActive: boolean) {
  if (isActive) {
    return 'inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white';
  }

  return 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200';
}

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Landmark className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                Onda Finance
              </p>
              <p className="text-sm text-slate-500">
                Conta digital
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            {navigationItems.map(({ label, to, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => getNavItemClassName(isActive)}>
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
