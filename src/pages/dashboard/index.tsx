import { ArrowRight, ArrowUpRight, Landmark, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const overviewCards = [
  {
    title: 'Saldo disponível',
    value: 'R$ 12.480,90',
    description: 'Valor disponível para movimentação imediata.',
    icon: Wallet,
  },
  {
    title: 'Última transferência',
    value: 'R$ 850,00',
    description: 'Enviada para Mariana Souza hoje às 09:42.',
    icon: ArrowUpRight,
  },
  {
    title: 'Conta principal',
    value: 'Onda Digital',
    description: 'Conta corrente individual em reais.',
    icon: Landmark,
  },
];

const recentTransactions = [
  {
    title: 'Transferência enviada',
    subtitle: 'Mariana Souza',
    amount: '- R$ 850,00',
  },
  {
    title: 'Pix recebido',
    subtitle: 'Carlos Eduardo',
    amount: '+ R$ 1.200,00',
  },
  {
    title: 'Pagamento de boleto',
    subtitle: 'Energia residencial',
    amount: '- R$ 214,37',
  },
];

export function DashboardPage() {
  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Resumo da sua conta.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Visualize o saldo atual, acompanhe suas movimentações recentes e
            acesse rapidamente a área de transferências.
          </p>
        </div>

        <Link
          to="/transfer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Ir para transferência
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {overviewCards.map(({ title, value, description, icon: Icon }) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{title}</p>
              <span className="rounded-full bg-sky-100 p-3 text-sky-700">
                <Icon className="h-5 w-5" />
              </span>
            </div>

            <p className="mt-6 text-2xl font-semibold text-slate-950">
              {value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Transações recentes
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Últimas movimentações registradas na conta.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {recentTransactions.map((transaction) => (
            <article
              key={transaction.title}
              className="flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {transaction.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {transaction.subtitle}
                </p>
              </div>
              <span className="text-sm font-medium text-sky-700">
                {transaction.amount}
              </span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
