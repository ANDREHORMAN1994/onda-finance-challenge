import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/app/router/protected-route';
import { DashboardPage } from '@/features/account/pages/dashboard-page';
import { LoginPage } from '@/features/auth/pages/login-page';
import { TransferPage } from '@/features/transfer/pages/transfer-page';
import { AppShell } from '@/shared/layouts/app-shell';
import { hasActiveSession } from '@/shared/lib/session';

function RootRedirect() {
  return (
    <Navigate replace to={hasActiveSession() ? '/dashboard' : '/login'} />
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/transfer',
            element: <TransferPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
