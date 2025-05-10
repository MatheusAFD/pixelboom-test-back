# Pixelboom User API

API RESTful em Node.js, TypeScript, Fastify, Drizzle ORM, SQLite e Zod.

## Endpoints

- `GET /api/users` — Lista usuários (paginação, busca, filtro por data)
- `GET /api/users/:id` — Busca usuário por ID
- `POST /api/users` — Cria usuário
- `PUT /api/users/:id` — Edita usuário
- `DELETE /api/users/:id` — Soft delete
- `GET /api/users/dashboard/stats` — Estatísticas de dashboard

## Rodando o projeto

```sh
pnpm install
pnpm run build # ou: pnpm run dev
```

## Estrutura

- `src/models` — Schemas e validações
- `src/controllers` — Rotas/controllers
- `src/usecases` — Lógica de negócio
- `src/db` — Configuração do Drizzle/SQLite

## Observações

- Validação de dados com Zod
- Soft delete (deletedAt)
- Paginação e busca por nome
- Filtros por data de criação
- Dashboard de usuários ativos/inativos
