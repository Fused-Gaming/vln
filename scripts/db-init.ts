/**
 * VLN Database Initialization Script
 *
 * Validates environment variables, tests the PostgreSQL connection, and
 * reports exactly what needs to happen before the application can start.
 *
 * Run this script before your first `pnpm db:migrate` or `pnpm db:push`.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Required environment variable:
 *
 *   DATABASE_URL
 *     PostgreSQL connection string.
 *     Format: postgresql://<user>:<password>@<host>:<port>/<database>
 *     Example (local):  postgresql://postgres:secret@localhost:5432/vln_dev
 *     Example (Supabase pooler): postgresql://postgres.[ref]:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
 *
 * Optional environment variables:
 *
 *   DATABASE_URL_DIRECT
 *     A non-pooled connection string used by Prisma CLI commands (migrate, push).
 *     Required when DATABASE_URL points to a PgBouncer / Supabase Transaction pooler.
 *     If omitted, DATABASE_URL is used for both runtime and CLI commands.
 *     Example (Supabase direct): postgresql://postgres.[ref]:password@db.[ref].supabase.co:5432/postgres
 *
 *   NEXTAUTH_SECRET
 *     Used by NextAuth for JWT signing. Generate with: openssl rand -base64 32
 *
 *   NEXTAUTH_URL
 *     The canonical URL of the deployment. Example: https://vln.gg
 *
 *   SEED_ADMIN_EMAIL      — email for the initial admin user (default: admin@vln.gg)
 *   SEED_ADMIN_PASSWORD   — password for initial admin user  (required in production)
 *   SEED_ADMIN_NAME       — display name for admin           (default: VLN Administrator)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Initialization sequence once all checks pass:
 *
 *   1.  pnpm db:generate       # Regenerate the Prisma client after schema changes
 *   2.  pnpm db:migrate:dev    # Apply migrations in development (creates migration files)
 *      — OR —
 *       pnpm db:migrate        # Apply existing migrations in production (no new files)
 *   3.  pnpm db:seed           # Insert initial admin user and VLN Research team
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Usage:
 *   pnpm db:init
 *   DATABASE_URL="postgresql://..." pnpm db:init
 */

import postgres from 'postgres';
import 'dotenv/config';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CheckResult {
  label: string;
  status: 'ok' | 'warn' | 'fail';
  value?: string;
  detail?: string;
}

// ---------------------------------------------------------------------------
// Environment checks
// ---------------------------------------------------------------------------

const REQUIRED: Array<{ key: string; description: string; example: string }> = [
  {
    key:         'DATABASE_URL',
    description: 'PostgreSQL connection string (runtime + Prisma CLI)',
    example:     'postgresql://user:pass@localhost:5432/vln_dev',
  },
];

const OPTIONAL: Array<{ key: string; description: string; example?: string }> = [
  {
    key:         'DATABASE_URL_DIRECT',
    description: 'Non-pooled URL for Prisma CLI when DATABASE_URL uses a connection pooler',
    example:     'postgresql://user:pass@db.host:5432/vln_dev',
  },
  {
    key:         'NEXTAUTH_SECRET',
    description: 'JWT signing secret — openssl rand -base64 32',
  },
  {
    key:         'NEXTAUTH_URL',
    description: 'Canonical deployment URL',
    example:     'https://vln.gg',
  },
  {
    key:         'SEED_ADMIN_EMAIL',
    description: 'Initial admin email (default: admin@vln.gg)',
  },
  {
    key:         'SEED_ADMIN_PASSWORD',
    description: 'Initial admin password — required for production seed',
  },
  {
    key:         'SEED_ADMIN_NAME',
    description: 'Initial admin display name (default: VLN Administrator)',
  },
];

function checkEnv(): CheckResult[] {
  const results: CheckResult[] = [];

  for (const { key, description, example } of REQUIRED) {
    const val = process.env[key];
    if (!val) {
      results.push({
        label:  key,
        status: 'fail',
        detail: `Required. ${description}${example ? `\n         Example: ${example}` : ''}`,
      });
    } else {
      // Mask credentials in the printed value
      const masked = val.replace(/:([^@/]+)@/, ':****@');
      results.push({ label: key, status: 'ok', value: masked });
    }
  }

  for (const { key, description, example } of OPTIONAL) {
    const val = process.env[key];
    if (!val) {
      results.push({
        label:  key,
        status: 'warn',
        detail: `Optional. ${description}${example ? `\n         Example: ${example}` : ''}`,
      });
    } else {
      const masked = val.replace(/:([^@/]+)@/, ':****@');
      results.push({ label: key, status: 'ok', value: key.toLowerCase().includes('password') || key === 'NEXTAUTH_SECRET' ? '****' : masked });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Connection test
// ---------------------------------------------------------------------------

async function testConnection(connectionString: string): Promise<{
  ok: boolean;
  pgVersion?: string;
  dbName?: string;
  error?: string;
}> {
  const sql = postgres(connectionString, {
    max:            1,
    connect_timeout: 10,
    idle_timeout:    5,
  });

  try {
    const [row] = await sql`SELECT version(), current_database() AS db_name`;
    await sql.end();
    // Extract short version, e.g. "PostgreSQL 16.1 ..."
    const pgVersion = (row.version as string).split(' ').slice(0, 2).join(' ');
    return { ok: true, pgVersion, dbName: row.db_name as string };
  } catch (err) {
    await sql.end().catch(() => {});
    return { ok: false, error: (err as Error).message };
  }
}

// ---------------------------------------------------------------------------
// Renderer
// ---------------------------------------------------------------------------

const ICONS = { ok: '✓', warn: '⚠', fail: '✗' } as const;
const COLORS = {
  ok:    '\x1b[32m',  // green
  warn:  '\x1b[33m',  // yellow
  fail:  '\x1b[31m',  // red
  reset: '\x1b[0m',
  dim:   '\x1b[2m',
  bold:  '\x1b[1m',
} as const;

function colorize(status: 'ok' | 'warn' | 'fail', text: string): string {
  return `${COLORS[status]}${text}${COLORS.reset}`;
}

function printSection(title: string): void {
  console.log(`\n${COLORS.bold}${title}${COLORS.reset}`);
  console.log('─'.repeat(60));
}

function printResult(r: CheckResult): void {
  const icon  = colorize(r.status, ICONS[r.status]);
  const label = r.label.padEnd(28);
  const value = r.value ? `${COLORS.dim}${r.value}${COLORS.reset}` : '';
  console.log(`  ${icon}  ${label} ${value}`);
  if (r.detail) {
    r.detail.split('\n').forEach(line => {
      console.log(`     ${COLORS.dim}${line}${COLORS.reset}`);
    });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n${COLORS.bold}VLN — Database Initialization Check${COLORS.reset}`);
  console.log(`${'═'.repeat(60)}`);

  // 1. Environment variable checks
  printSection('Environment Variables');
  const envResults = checkEnv();
  envResults.forEach(printResult);

  const hasFails = envResults.some(r => r.status === 'fail');

  // 2. Connection test (only if DATABASE_URL is set)
  const databaseUrl = process.env.DATABASE_URL;
  printSection('Database Connection');

  if (!databaseUrl) {
    console.log(`  ${colorize('fail', '✗')}  Skipped — DATABASE_URL is not set`);
  } else {
    process.stdout.write('  Testing connection… ');
    const conn = await testConnection(databaseUrl);
    if (conn.ok) {
      console.log(colorize('ok', '✓'));
      console.log(`  ${colorize('ok', ICONS.ok)}  ${'Server'.padEnd(28)} ${COLORS.dim}${conn.pgVersion}${COLORS.reset}`);
      console.log(`  ${colorize('ok', ICONS.ok)}  ${'Database'.padEnd(28)} ${COLORS.dim}${conn.dbName}${COLORS.reset}`);

      // Check if DATABASE_URL_DIRECT differs (pooler in use)
      const directUrl = process.env.DATABASE_URL_DIRECT;
      if (directUrl && directUrl !== databaseUrl) {
        process.stdout.write('  Testing direct connection… ');
        const direct = await testConnection(directUrl);
        if (direct.ok) {
          console.log(colorize('ok', '✓'));
          console.log(`  ${colorize('ok', ICONS.ok)}  ${'Direct (CLI)'.padEnd(28)} ${COLORS.dim}${direct.pgVersion}${COLORS.reset}`);
        } else {
          console.log(colorize('fail', '✗'));
          console.log(`  ${colorize('fail', ICONS.fail)}  DATABASE_URL_DIRECT failed: ${direct.error}`);
        }
      }
    } else {
      console.log(colorize('fail', '✗'));
      console.log(`  ${colorize('fail', ICONS.fail)}  Connection failed: ${conn.error}`);
      console.log(`\n  ${COLORS.dim}Common causes:`);
      console.log(`    • PostgreSQL is not running`);
      console.log(`    • Wrong host / port in DATABASE_URL`);
      console.log(`    • Incorrect credentials`);
      console.log(`    • Database does not exist — run: createdb vln_dev${COLORS.reset}`);
    }
  }

  // 3. Next steps
  printSection('Next Steps');

  if (hasFails) {
    console.log(`  ${colorize('fail', ICONS.fail)}  Fix the failed checks above, then re-run: ${COLORS.dim}pnpm db:init${COLORS.reset}`);
  } else {
    const steps = [
      { cmd: 'pnpm db:generate',     desc: 'Regenerate Prisma client after schema changes' },
      { cmd: 'pnpm db:migrate:dev',  desc: 'Apply migrations in development (creates migration files)' },
      { cmd: '  — OR —',             desc: '' },
      { cmd: 'pnpm db:migrate',      desc: 'Apply existing migrations in production (no new files created)' },
      { cmd: 'pnpm db:seed',         desc: 'Insert initial admin user and VLN Research team' },
    ];

    steps.forEach(({ cmd, desc }) => {
      if (!desc) { console.log(`\n  ${COLORS.dim}${cmd}${COLORS.reset}`); return; }
      console.log(`\n  ${colorize('ok', '$')}  ${COLORS.bold}${cmd}${COLORS.reset}`);
      console.log(`     ${COLORS.dim}${desc}${COLORS.reset}`);
    });

    console.log(`\n  ${COLORS.dim}For development (create + reset):${COLORS.reset}`);
    console.log(`\n  ${colorize('warn', '$')}  ${COLORS.bold}pnpm db:reset${COLORS.reset}`);
    console.log(`     ${COLORS.dim}Drops and recreates the database, re-applies all migrations and re-seeds${COLORS.reset}`);

    console.log(`\n  ${COLORS.dim}To browse data visually:${COLORS.reset}`);
    console.log(`\n  ${colorize('ok', '$')}  ${COLORS.bold}pnpm db:studio${COLORS.reset}`);
    console.log(`     ${COLORS.dim}Opens Prisma Studio in your browser (localhost:5555)${COLORS.reset}\n`);
  }

  console.log('═'.repeat(60) + '\n');
  process.exit(hasFails ? 1 : 0);
}

main().catch((err) => {
  console.error('\n✗  db-init failed unexpectedly:\n', err);
  process.exit(1);
});
