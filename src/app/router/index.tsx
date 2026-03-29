import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/app/router/protectedRoute';
import { DashboardPage } from '@/pages/dashboard';
import { LoginPage } from '@/pages/login';
import { TransferPage } from '@/pages/transfer';
import { AppShell } from '@/shared/layouts/appShell';
import { hasActiveSession } from '@/shared/utils/session';

function RootRedirect() {
  return <Navigate replace to={hasActiveSession() ? '/dashboard' : '/login'} />;
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
    element: <Navigate replace to='/' />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
