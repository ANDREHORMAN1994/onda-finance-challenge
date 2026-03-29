import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TransferPage } from '@/pages/transfer';
import { accountStorageKey } from '@/shared/constants/storageKeys';
import { formatCurrency } from '@/shared/utils/formatters';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        retry: false,
      },
    },
  });
}

function renderTransferPage() {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <TransferPage />
    </QueryClientProvider>,
  );
}

function hasExactText(expectedText: string) {
  return (_content: string, node: Element | null) =>
    node?.textContent === expectedText;
}

describe('Transfer flow', () => {
  it('submits a transfer and updates the persisted account snapshot', async () => {
    const user = userEvent.setup();

    renderTransferPage();

    expect(
      await screen.findByText(hasExactText(formatCurrency(12480.9))),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText('Destinatário'), 'Ana Martins');
    await user.clear(screen.getByLabelText('Valor'));
    await user.type(screen.getByLabelText('Valor'), '500');
    await user.click(
      screen.getByRole('button', { name: 'Confirmar transferência' }),
    );

    expect(
      await screen.findByText(
        hasExactText(
          `Transferência de ${formatCurrency(500)} enviada para Ana Martins. Saldo atual: ${formatCurrency(11980.9)}.`,
        ),
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(hasExactText(formatCurrency(11980.9))),
      ).toBeInTheDocument();
    });

    const storedSnapshot = window.localStorage.getItem(accountStorageKey);

    expect(storedSnapshot).not.toBeNull();

    const parsedSnapshot = JSON.parse(storedSnapshot ?? '{}');

    expect(parsedSnapshot.balance).toBe(11980.9);
    expect(parsedSnapshot.transactions[0].counterpart).toBe('Ana Martins');
    expect(parsedSnapshot.transactions[0].amount).toBe(-500);
  });

  it('blocks transfers that exceed the available balance', async () => {
    const user = userEvent.setup();

    renderTransferPage();

    expect(
      await screen.findByText(hasExactText(formatCurrency(12480.9))),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText('Destinatário'), 'Conta Externa');
    await user.clear(screen.getByLabelText('Valor'));
    await user.type(screen.getByLabelText('Valor'), '13000');
    await user.click(
      screen.getByRole('button', { name: 'Confirmar transferência' }),
    );

    expect(
      await screen.findByText('Saldo insuficiente para concluir a transferência.'),
    ).toBeInTheDocument();

    const storedSnapshot = window.localStorage.getItem(accountStorageKey);

    expect(storedSnapshot).not.toBeNull();

    const parsedSnapshot = JSON.parse(storedSnapshot ?? '{}');

    expect(parsedSnapshot.balance).toBe(12480.9);
    expect(parsedSnapshot.transactions).toHaveLength(3);
  });
});
