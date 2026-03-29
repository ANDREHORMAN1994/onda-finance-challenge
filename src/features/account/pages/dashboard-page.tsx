import { ArrowRight, ArrowUpRight, Landmark, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const overviewCards = [
  {
    title: 'Saldo disponivel',
    value: 'R$ 0,00',
    description: 'Conectaremos o saldo mockado no proximo commit.',
    icon: Wallet,
  },
  {
    title: 'Ultima transferencia',
    value: 'Sem historico',
    description: 'A mutation de transferencia entra na proxima etapa.',
    icon: ArrowUpRight,
  },
  {
    title: 'Conta principal',
    value: 'Onda Digital',
    description: 'Area protegida pronta para receber dados reais.',
    icon: Landmark,
  },
];

const recentTransactions = [
  {
    title: 'Estrutura inicial pronta',
    subtitle: 'Router, providers e paginas base',
    amount: 'Infra',
  },
  {
    title: 'Autenticacao mock',
    subtitle: 'Entra no commit seguinte',
    amount: 'Proximo',
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
            Painel base pronto para receber saldo e extrato.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Neste commit a rota protegida, o layout e os placeholders ficaram
            organizados. No proximo, conectamos o estado da conta.
          </p>
        </div>

        <Link
          to="/transfer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Ir para transferencia
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
              Transacoes recentes
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A lista abaixo e apenas um marcador para a estrutura da tela.
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
