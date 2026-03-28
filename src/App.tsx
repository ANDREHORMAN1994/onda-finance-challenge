const milestones = [
  'Bootstrap com React, TypeScript e Vite',
  'Tailwind e testes preparados para o desafio',
  'Pronto para receber rotas, providers e mocks realistas',
]

function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#d7f0ff,_#f7fbff_42%,_#f5f8fc_72%)] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-200/80 pb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-700">
              Onda Finance
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Base do desafio pronta para crescer com calma e boa estrutura.
            </h1>
          </div>

          <span className="hidden rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm backdrop-blur sm:inline-flex">
            Commit 1
          </span>
        </header>

        <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <article className="rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Este primeiro passo prepara a fundacao tecnica do mini banco
              digital: dependencias obrigatorias instaladas, Tailwind ativo e
              Vitest configurado para os fluxos que virao a seguir.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
                React 19
              </span>
              <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800">
                TypeScript
              </span>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
                Tailwind
              </span>
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                Vitest
              </span>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
              Proximos passos
            </p>

            <ol className="mt-6 space-y-4">
              {milestones.map((milestone, index) => (
                <li
                  key={milestone}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sm font-semibold text-sky-200">
                    0{index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-slate-200">
                    {milestone}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default App
