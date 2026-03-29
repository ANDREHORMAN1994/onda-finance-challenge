import { Navigate, Outlet } from 'react-router-dom';

import { appRoutes } from '@/shared/constants/routes';
import { hasActiveSession } from '@/shared/utils/session';

export function ProtectedRoute() {
  if (!hasActiveSession()) {
    return <Navigate replace to={appRoutes.login} />;
  }

  return <Outlet />;
}
