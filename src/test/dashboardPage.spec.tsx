import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { DashboardPage } from '@/pages/dashboard';
import { formatCurrency } from '@/shared/utils/formatters';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function renderDashboardPage() {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>,
  );
}

function hasExactText(expectedText: string) {
  return (_content: string, node: Element | null) =>
    node?.textContent === expectedText;
}

describe('Dashboard page', () => {
  it('renders the mocked account data after loading', async () => {
    renderDashboardPage();

    expect(
      await screen.findByText(hasExactText(formatCurrency(12480.9))),
    ).toBeInTheDocument();
    expect(screen.getByText('Última transferência')).toBeInTheDocument();
    expect(screen.getAllByText(/Mariana Souza/i)).not.toHaveLength(0);
    expect(screen.getByText('Pix recebido')).toBeInTheDocument();
    expect(screen.getAllByText(/Energia residencial/i)).not.toHaveLength(0);
  });
});
