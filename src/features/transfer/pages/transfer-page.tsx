import { ArrowRightLeft, BadgeCheck, CircleAlert } from 'lucide-react';

const transferChecklist = [
  'destinatario e valor com validacao',
  'feedback visual de sucesso e erro',
  'atualizacao do saldo e do historico',
];

export function TransferPage() {
  return (
    <section className="grid gap-6 xl:grid-cols-3">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <ArrowRightLeft className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Transferencia
            </p>
            <h1 className="text-2xl font-semibold text-slate-950">
              Formulario preparado para o proximo commit.
            </h1>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Destinatario</p>
            <p className="mt-3 text-base font-medium text-slate-900">
              Campo entra na etapa de formulario
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Valor</p>
            <p className="mt-3 text-base font-medium text-slate-900">
              Validacao com Zod fica para o proximo passo
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          A regra de saldo insuficiente ainda nao foi conectada. Nesta etapa, o
          foco e apenas a estrutura da rota protegida.
        </div>
      </article>

      <aside className="space-y-6">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-950">
              Estrutura pronta
            </h2>
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {transferChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <CircleAlert className="h-5 w-5 text-sky-300" />
            <h2 className="text-lg font-semibold">Observacao</h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Quando o fluxo for ligado, esta pagina vai compartilhar estado com o
            dashboard por meio de query e mutation.
          </p>
        </article>
      </aside>
    </section>
  );
}
