import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { LoginPage } from '@/pages/login';
import { appRoutes } from '@/shared/constants/routes';
import { sessionStorageKey } from '@/shared/constants/storageKeys';

function renderLoginPage() {
  const router = createMemoryRouter(
    [
      {
        path: appRoutes.login,
        element: <LoginPage />,
      },
      {
        path: appRoutes.dashboard,
        element: <div>Dashboard carregado</div>,
      },
    ],
    {
      initialEntries: [appRoutes.login],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe('Login flow', () => {
  it('shows validation messages for invalid credentials', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(
      await screen.findByText('Informe seu e-mail.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('A senha deve ter pelo menos 6 caracteres.'),
    ).toBeInTheDocument();
  });

  it('creates a session and redirects after a successful login', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.type(screen.getByLabelText('E-mail'), 'andre@onda.finance');
    await user.type(screen.getByLabelText('Senha'), '123456');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(
      await screen.findByText('Dashboard carregado'),
    ).toBeInTheDocument();

    const storedSession = window.localStorage.getItem(sessionStorageKey);

    expect(storedSession).not.toBeNull();

    const parsedSession = JSON.parse(storedSession ?? '{}');

    expect(parsedSession.isAuthenticated).toBe(true);
    expect(parsedSession.user.email).toBe('andre@onda.finance');
    expect(parsedSession.user.name).toBe('Andre');
  });
});
