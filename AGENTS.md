<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config, v9) |
| `npm start` | Start production server |

No typecheck script — run `npx tsc --noEmit` if needed.

# Architecture

- **Next.js 16 + React 19** — route groups `(auth)` and `(front)` with separate layouts.
- **Prisma v7** (not v5/v6). Generator is `prisma-client` (not `prisma-client-js`). Output: `generated/prisma/` (gitignored).
- **Driver adapter**: `@prisma/adapter-mariadb` — DATABASE_URL must be a direct connection string, Prisma does NOT parse it automatically.
- **Database**: MariaDB via Docker on port `3307`. Connection pool: `?connection_limit=5&pool_timeout=30`.
- **Auth**: `better-auth` 1.6.11 with email/password. Catch-all handler at `src/app/api/auth/[...all]/route.ts`.
- **State**: Zustand with `persist` middleware (cart store keyed as `skill-cart` in localStorage).
- **CSS**: Tailwind v4 (`@import "tailwindcss"`), `tw-animate-css`, `shadcn/tailwind.css`. shadcn v4, style `radix-luma`, icon library `remixicon`.
- **Forms**: `react-hook-form` + `zod` + `@hookform/resolvers`.

# Prisma

```bash
npx prisma generate          # outputs to generated/prisma/ (gitignored)
npx prisma db push           # sync schema to DB
npx prisma migrate dev       # create & apply migration
```

Config file: `prisma.config.ts` (loads dotenv). Model names are plural/snake_case for legacy tables (e.g., `products`, `categories`, `orders`) and PascalCase for auth tables (`User`, `Session`, `Account`, `Verification` mapped to `user`, `session`, `account`, `verification`).

# ESLint

Flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.

# Docker

Multi-stage `node:24-alpine` build. Requires `npx prisma generate` before `npm run build`. Output is `.next/standalone`.

# Imports

`@/*` maps to `src/*`. Components in `src/components/`, UI primitives in `src/components/ui/`, lib in `src/lib/`, hooks in `src/hooks/`.
