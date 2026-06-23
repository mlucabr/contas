# Painel Financeiro Pessoal

Aplicação para gestão de finanças pessoais com foco em:

- histórico de despesas e receitas
- projeção de fluxo de caixa futuro
- gestão de cartão de crédito
- parcelamentos
- recorrências
- contas a pagar e a receber
- separação entre caixa e patrimônio investido
- importação e exportação Excel

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Recharts
- SheetJS (xlsx)

## Como rodar

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Depois abra:

- http://localhost:3000/dashboard
- http://localhost:3000/api/accounts
- http://localhost:3000/api/cards
- http://localhost:3000/api/transactions
- http://localhost:3000/api/projections

## Observações da regra de negócio

- investimento entra como despesa
- recorrências entram na projeção
- fatura do cartão é manual
- contas de investimento ficam separadas do caixa
