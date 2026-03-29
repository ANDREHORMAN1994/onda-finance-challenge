import { ArrowRightLeft, LayoutGrid, type LucideIcon } from 'lucide-react';

import { appRoutes } from '@/shared/constants/routes';

type NavigationItem = {
  icon: LucideIcon;
  label: string;
  to: string;
};

export const navigationItems: NavigationItem[] = [
  {
    icon: LayoutGrid,
    label: 'Dashboard',
    to: appRoutes.dashboard,
  },
  {
    icon: ArrowRightLeft,
    label: 'Transferência',
    to: appRoutes.transfer,
  },
];
