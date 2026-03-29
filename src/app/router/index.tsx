import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/app/router/protectedRoute';
import { DashboardPage } from '@/pages/dashboard';
import { LoginPage } from '@/pages/login';
import { TransferPage } from '@/pages/transfer';
import { appRoutes } from '@/shared/constants/routes';
import { AppShell } from '@/shared/layouts/appShell';
import { hasActiveSession } from '@/shared/utils/session';

function RootRedirect() {
  return (
    <Navigate
      replace
      to={hasActiveSession() ? appRoutes.dashboard : appRoutes.login}
    />
  );
}

const router = createBrowserRouter([
  {
    path: appRoutes.root,
    element: <RootRedirect />,
  },
  {
    path: appRoutes.login,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: appRoutes.dashboard,
            element: <DashboardPage />,
          },
          {
            path: appRoutes.transfer,
            element: <TransferPage />,
          },
        ],
      },
    ],
  },
  {
    path: appRoutes.notFound,
    element: <Navigate replace to={appRoutes.root} />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
