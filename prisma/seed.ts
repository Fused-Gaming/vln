/**
 * VLN Database Seed Script
 *
 * Creates the minimum required data to operate a fresh VLN instance:
 *   - Initial admin user
 *   - VLN Research team with admin as lead
 *   - Default notification settings for admin
 *
 * Environment variables consumed:
 *   DATABASE_URL          — required, PostgreSQL connection string
 *   SEED_ADMIN_EMAIL      — admin user email       (default: admin@vln.gg)
 *   SEED_ADMIN_PASSWORD   — admin user password    (required in production; must be ≥12 chars)
 *   SEED_ADMIN_NAME       — admin user display name (default: VLN Administrator)
 *
 * Usage:
 *   pnpm db:seed
 *   DATABASE_URL="postgresql://..." pnpm db:seed
 */

import { PrismaClient, UserRole, TeamRole } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// ---------------------------------------------------------------------------
// Bootstrap Prisma with the same adapter used in production (lib/prisma.ts)
// ---------------------------------------------------------------------------

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('\n✗ DATABASE_URL is not set. Cannot seed.\n');
  console.error('  Set it in .env.local or export it before running pnpm db:seed\n');
  process.exit(1);
}

const pool = postgres(connectionString, { max: 1 });
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
  log: ['error'],
});

// ---------------------------------------------------------------------------
// Seed configuration — override with env vars
// ---------------------------------------------------------------------------

const ADMIN_EMAIL    = process.env.SEED_ADMIN_EMAIL    || 'admin@vln.gg';
const ADMIN_NAME     = process.env.SEED_ADMIN_NAME     || 'VLN Administrator';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

const TEAM_SLUG = 'vln-research';
const TEAM_NAME = 'VLN Research';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolvePassword(): string {
  if (ADMIN_PASSWORD) return ADMIN_PASSWORD;

  // Development fallback — print a loud warning
  const devPassword = 'VLN-dev-admin-2026!';
  console.warn('\n⚠  SEED_ADMIN_PASSWORD is not set.');
  console.warn(`   Using development default: "${devPassword}"`);
  console.warn('   Set SEED_ADMIN_PASSWORD before seeding a production instance.\n');
  return devPassword;
}

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function main() {
  console.log('\n🌱  VLN database seed starting…\n');

  // 1. Admin user
  const password     = resolvePassword();
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where:  { email: ADMIN_EMAIL },
    update: {},
    create: {
      email:         ADMIN_EMAIL,
      name:          ADMIN_NAME,
      role:          UserRole.ADMIN,
      passwordHash,
      emailVerified: new Date(),
    },
  });

  console.log(`  ✓  Admin user         — ${admin.email}  (id: ${admin.id})`);

  // 2. Notification settings for admin
  await prisma.notificationSettings.upsert({
    where:  { userId: admin.id },
    update: {},
    create: {
      userId:              admin.id,
      emailAuditUpdates:   true,
      emailPaymentAlerts:  true,
      emailReportReady:    true,
      emailTeamInvites:    true,
      smsAuditUpdates:     false,
      smsPaymentAlerts:    false,
      dailyDigest:         true,
      frequencyPreference: 'immediate',
    },
  });

  console.log(`  ✓  Notification prefs — ${admin.email}`);

  // 3. VLN Research team — admin is team lead
  const team = await prisma.team.upsert({
    where:  { slug: TEAM_SLUG },
    update: {},
    create: {
      name:        TEAM_NAME,
      slug:        TEAM_SLUG,
      description: 'Core VLN security research and audit team',
      leadId:      admin.id,
      website:     'https://vln.gg',
    },
  });

  console.log(`  ✓  Team               — "${team.name}"  (slug: ${team.slug})`);

  // 4. Admin as ADMIN member of the team
  await prisma.teamMember.upsert({
    where:  { teamId_userId: { teamId: team.id, userId: admin.id } },
    update: {},
    create: {
      teamId: team.id,
      userId: admin.id,
      role:   TeamRole.ADMIN,
    },
  });

  console.log(`  ✓  Team membership    — ${admin.email} → ${team.slug} [ADMIN]\n`);

  // 5. Summary
  console.log('─'.repeat(56));
  console.log('  Seed complete.\n');
  console.log('  Admin login:');
  console.log(`    Email    : ${ADMIN_EMAIL}`);
  console.log(`    Password : ${ADMIN_PASSWORD ? '(from SEED_ADMIN_PASSWORD env var)' : resolvePassword()}`);
  console.log('\n  Change the admin password immediately after first login.\n');
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main()
  .catch((err) => {
    console.error('\n✗  Seed failed:\n', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
