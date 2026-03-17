/**
 * Health / Status Endpoint
 * Returns system status, version, live database connectivity, and recent commits.
 * Used for monitoring, uptime checks, and development status dashboards.
 * Date: 2026-03-06
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ---------------------------------------------------------------------------
// Recent commits — reflects the active development branch state.
// Update this list on each significant commit / deploy.
// ---------------------------------------------------------------------------
const RECENT_COMMITS = [
  {
    sha:     '4198da8',
    message: 'feat(db): add database initialization, seed, and migration scripts',
    date:    '2026-03-06',
    scope:   'db',
  },
  {
    sha:     '54647bc',
    message: 'feat(home): add Latest Research blog section linking to blog.vln.gg',
    date:    '2026-03-06',
    scope:   'home',
  },
  {
    sha:     '72bdd08',
    message: 'feat(blog): create blog.vln.gg subdomain resource',
    date:    '2026-03-06',
    scope:   'blog',
  },
  {
    sha:     '6a6b5dc',
    message: 'feat(auth): implement Phase 2 v1.1.0 authentication and audit intake infrastructure',
    date:    '2026-02-25',
    scope:   'auth',
  },
  {
    sha:     'eccb981',
    message: 'feat(infra): add Phase 1 infrastructure - sessions, health checks, and security scanning',
    date:    '2026-02-25',
    scope:   'infra',
  },
] as const;

// ---------------------------------------------------------------------------
// DB connectivity probe — non-fatal; degrades gracefully when DB is absent.
// ---------------------------------------------------------------------------
type DbStatus = 'ok' | 'not_configured' | 'error';

async function checkDatabase(): Promise<{ status: DbStatus; latencyMs?: number; error?: string }> {
  if (!process.env.DATABASE_URL) {
    return { status: 'not_configured' };
  }

  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', latencyMs: Date.now() - start };
  } catch (err) {
    return {
      status:    'error',
      latencyMs: Date.now() - start,
      error:     err instanceof Error ? err.message : 'Unknown database error',
    };
  }
}

// ---------------------------------------------------------------------------
// GET /api/health
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  try {
    const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
    const now       = new Date();

    const db = await checkDatabase();

    const overallStatus = db.status === 'error' ? 'degraded' : 'healthy';

    const payload = {
      status:      overallStatus,
      timestamp:   now.toISOString(),
      version:     '0.11.0',
      branch:      'claude/create-blog-resource-Ls8zy',
      commit:      RECENT_COMMITS[0].sha,
      environment: process.env.NODE_ENV || 'production',
      uptime:      Math.round(process.uptime()),
      requestId,

      checks: {
        api:      'ok' as const,
        database: db.status,
        ...(db.latencyMs !== undefined && { dbLatencyMs: db.latencyMs }),
        // Only surface raw DB errors in non-production environments
        ...(db.error && process.env.NODE_ENV !== 'production' && { dbError: db.error }),
      },

      features: {
        blog:        true,  // blog.vln.gg subdomain routing + 4 articles
        rss:         true,  // blog.vln.gg/rss.xml → /api/blog/rss
        blogSitemap: true,  // /blog/sitemap.xml with blog.vln.gg canonicals
        database:    db.status !== 'not_configured',
        auth:        true,  // NextAuth credentials + Google + GitHub
        auditIntake: true,  // /api/audits/intake
        bookings:    true,  // /api/bookings
      },

      recentCommits: RECENT_COMMITS,
    };

    return NextResponse.json(payload, {
      status: overallStatus === 'healthy' ? 200 : 207,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Request-ID':  requestId,
        'X-Version':     '0.11.0',
        'X-Commit':      RECENT_COMMITS[0].sha,
      },
    });
  } catch (error) {
    console.error('[Health Check Error]', error);

    return NextResponse.json(
      {
        status:    'unhealthy',
        timestamp: new Date().toISOString(),
        error:     error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

export async function HEAD(request: NextRequest) {
  const response = await GET(request);
  return new NextResponse(null, { status: response.status, headers: response.headers });
}
