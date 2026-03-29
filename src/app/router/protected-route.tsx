import { Navigate, Outlet } from 'react-router-dom';

import { hasActiveSession } from '@/shared/lib/session';

export function ProtectedRoute() {
  if (!hasActiveSession()) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
}
