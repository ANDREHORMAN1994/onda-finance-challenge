import { LockKeyhole, ShieldCheck } from 'lucide-react';

const nextCommitItems = [
  'login fake com persistencia local',
  'redirect automatico para area autenticada',
  'logout e estado global de sessao',
];

export function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 sm:px-8">
        <section className="grid w-full gap-8 lg:grid-cols-2">
          <article className="flex flex-col justify-center space-y-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                Onda Finance
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                Estrutura de rotas pronta para o desafio.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300">
                Esta tela ja esta encaixada no fluxo correto. No proximo commit,
                a autenticacao mock vai assumir a partir daqui.
              </p>
            </div>
          </article>

          <article className="rounded-3xl bg-white p-8 text-slate-950 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <LockKeyhole className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                  /login
                </p>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Tela base configurada
                </h2>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              A pagina de acesso ja existe na rota final. Falta apenas ligar o
              formulario, a store e a persistencia.
            </p>

            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Commit 3
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {nextCommitItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
