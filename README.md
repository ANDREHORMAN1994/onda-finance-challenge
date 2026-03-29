# Onda Finance Challenge

Aplicação web de banco digital construída com React, TypeScript e Vite para simular um fluxo simples de fintech com login, dashboard, saldo, extrato e transferência.

## Visão geral

O projeto foi pensado para representar um recorte realista de um app bancário, mantendo a experiência simples e o código organizado. Mesmo sem backend real, a aplicação simula regras de negócio, persistência de sessão, atualização de saldo, histórico de transações e comportamento assíncrono com latência controlada.

## Produção

- URL: [https://onda-finance-challenge.vercel.app/](https://onda-finance-challenge.vercel.app/)

## Funcionalidades

- Login mock com validação de formulário e persistência de sessão
- Redirecionamento automático entre `/`, `/login`, `/dashboard` e `/transfer`
- Rotas protegidas para a área autenticada
- Dashboard com saldo disponível, última transferência e transações recentes
- Transferência com validação de destinatário, valor positivo e saldo insuficiente
- Atualização imediata do dashboard após nova transferência
- Persistência de sessão e dados mockados via `localStorage`
- Testes automatizados para login, dashboard e transferência
- Relatório de cobertura com Vitest

## Acesso à aplicação

O login é mockado. Para entrar:

- Use qualquer e-mail válido
- Use uma senha com pelo menos 6 caracteres

Exemplo:

- E-mail: `andre@onda.finance`
- Senha: `123456`

## Fluxo principal

O fluxo principal da aplicação foi organizado da seguinte forma:

- `/` redireciona automaticamente para `/login` ou `/dashboard`, conforme a sessão
- `/login` permite autenticação mock com persistência local
- `/dashboard` exibe saldo, última transferência e movimentações recentes
- `/transfer` envia uma nova transferência e atualiza o dashboard em seguida

## Stack utilizada

- React 19
- TypeScript
- Vite
- Tailwind CSS + CVA
- Primitivos de UI no padrão shadcn/ui com Radix UI
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Axios
- Vitest
- Testing Library

## Decisões técnicas

### Estado e dados

- `Zustand` foi usado apenas para sessão/autenticação, evitando misturar estado de interface com estado de dados assíncronos.
- `React Query` foi usado para os dados da conta, porque o saldo e as transações se comportam como dados vindos de servidor.
- `localStorage` foi usado para simular persistência entre recargas sem depender de backend.

### Formulários

- `React Hook Form` cuida da performance e da integração com inputs.
- `Zod` centraliza as regras de validação com tipagem consistente.

### UI e composição

- A interface foi organizada com componentes reutilizáveis no padrão `shadcn/ui`, usando `Radix UI`, `CVA`, `clsx` e `tailwind-merge`.
- Isso reduz repetição de classes, melhora consistência visual e deixa a base mais preparada para crescimento.

### Camada de API mockada

- `Axios` foi usado como cliente HTTP da aplicação.
- As respostas mockadas passam por um adapter local, o que aproxima a estrutura de um cenário real de integração sem depender de backend.

### Mock realista

- O login simula autenticação com atraso proposital via camada de API mockada.
- O serviço da conta simula leitura e atualização de dados com delay.
- O saldo é atualizado a partir da mesma fonte persistida usada pelo dashboard e pela transferência.

## Estrutura do projeto

```txt
src/
  app/
    providers/
    router/
  pages/
    dashboard/
    login/
    transfer/
  shared/
    components/
    constants/
    hooks/
    layouts/
    lib/
    mocks/
    services/
    stores/
    types/
    utils/
  test/
```

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview local

```bash
npm run preview
```

### Deploy em produção

```txt
https://onda-finance-challenge.vercel.app/
```

## Testes

Executar a suíte:

```bash
npm test
```

Executar em modo watch:

```bash
npm run test:watch
```

Gerar relatório de cobertura:

```bash
npm run test:coverage
```

O relatório HTML é gerado em:

```txt
coverage/index.html
```

## Qualidade e validação

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

## Considerações de segurança

Por ser um desafio front-end com dados mockados, esta aplicação não implementa autenticação real. Em um cenário de produção, alguns cuidados seriam indispensáveis, com responsabilidades distribuídas entre cliente, backend e infraestrutura:

- Nunca confiar em validações feitas apenas no front-end
- Validar autenticação, autorização e regras de negócio no backend
- Não expor segredos, tokens sensíveis ou lógica crítica no cliente
- Utilizar HTTPS em todos os ambientes
- Aplicar políticas contra vazamento de dados e acesso indevido
- Armazenamento seguro de segredos e credenciais fora do cliente
- Observabilidade e auditoria para rastrear eventos críticos, tentativas de fraude, falhas operacionais e movimentações financeiras com confiabilidade

## Melhorias futuras

- Integração com backend real para autenticação, saldo, extrato e transferência
- Extrato completo com paginação, filtros por período, tipo de transação e busca textual
- Confirmação de transferência com autenticação adicional para operações sensíveis
- Histórico detalhado de sessões, dispositivos conectados e alertas de segurança
- Pipeline de deploy com CI/CD, versionamento de ambientes e validações automatizadas
- Testes E2E para garantir fluxo completo autenticado
- Observabilidade com monitoramento de erros, métricas de uso e rastreamento de operações críticas
