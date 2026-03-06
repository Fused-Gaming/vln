/**
 * Prisma Configuration (Prisma 7.x)
 *
 * In Prisma 7, datasource URLs are no longer specified in schema.prisma.
 * This file provides DATABASE_URL to the Prisma CLI (migrate, db push, db pull, studio).
 * The runtime client adapter is configured separately in lib/prisma.ts.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Required environment variables:
 *
 *   DATABASE_URL
 *     PostgreSQL connection string used by both the Prisma CLI and the
 *     runtime adapter (lib/prisma.ts).
 *
 *     Format:  postgresql://<user>:<password>@<host>:<port>/<database>
 *     Local:   postgresql://postgres:secret@localhost:5432/vln_dev
 *     Supabase pooler: postgresql://postgres.[ref]:[pass]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
 *
 *   DATABASE_URL_DIRECT  (optional — only needed when DATABASE_URL uses a connection pooler)
 *     A direct, non-pooled connection string for Prisma CLI commands.
 *     Required when DATABASE_URL points to PgBouncer / Supabase Transaction pooler,
 *     because connection poolers don't support the extended query protocol that
 *     Prisma Migrate requires.
 *
 *     Supabase direct: postgresql://postgres.[ref]:[pass]@db.[ref].supabase.co:5432/postgres
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * How this file is used:
 *   - `pnpm db:migrate:dev`  — prisma migrate dev   (reads DATABASE_URL_DIRECT if set)
 *   - `pnpm db:migrate`      — prisma migrate deploy (reads DATABASE_URL_DIRECT if set)
 *   - `pnpm db:push`         — prisma db push
 *   - `pnpm db:studio`       — prisma studio
 *   - `pnpm db:generate`     — prisma generate       (no URL needed, reads schema only)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is NOT used at runtime. Runtime connections are managed by
 * lib/prisma.ts using the @prisma/adapter-pg + postgres driver adapter.
 */

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// DATABASE_URL_DIRECT is used for CLI commands when DATABASE_URL points to a
// connection pooler (PgBouncer / Supabase). Falls back to DATABASE_URL otherwise.
const cliUrl = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: cliUrl,
  },
});
