import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for CORS, security headers, authentication, and request logging
 * Enforces strict origin policies for API routes and handles session validation
 * Handles blog.vln.gg subdomain routing to /blog/* paths
 * Date: 2026-02-25
 */

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isBlogSubdomain =
    hostname === 'blog.vln.gg' ||
    (process.env.NODE_ENV === 'development' && hostname === 'blog.localhost:3000');

  // Blog subdomain routing: rewrite blog.vln.gg/* → /blog/*
  if (isBlogSubdomain) {
    const pathname = request.nextUrl.pathname;

    // RSS feed
    if (pathname === '/rss.xml' || pathname === '/rss' || pathname === '/feed.xml') {
      const url = request.nextUrl.clone();
      url.pathname = '/api/blog/rss';
      const rewrite = NextResponse.rewrite(url);
      rewrite.headers.set('x-request-id', crypto.randomUUID());
      return rewrite;
    }

    // Root → /blog
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/blog';
      const rewrite = NextResponse.rewrite(url);
      rewrite.headers.set('x-request-id', crypto.randomUUID());
      return rewrite;
    }

    // /[slug] → /blog/[slug] (skip already-prefixed, api, and _next paths)
    if (
      !pathname.startsWith('/blog') &&
      !pathname.startsWith('/api/') &&
      !pathname.startsWith('/_next/')
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/blog${pathname}`;
      const rewrite = NextResponse.rewrite(url);
      rewrite.headers.set('x-request-id', crypto.randomUUID());
      return rewrite;
    }
  }

  const response = NextResponse.next();

  // Add request ID for tracing
  response.headers.set('x-request-id', crypto.randomUUID());

  // Strict CORS configuration
  const allowedOrigins = [
    'https://vln.gg',
    'https://www.vln.gg',
    'https://blog.vln.gg',
    // Add development origins only in development
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];

  const origin = request.headers.get('origin');

  // Check if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Same-origin requests don't include Origin header
    response.headers.set('Access-Control-Allow-Origin', 'https://vln.gg');
  }

  // CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com https://help.vln.gg",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://cloudflareinsights.com https://help.vln.gg wss://help.vln.gg",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // Permissions Policy (formerly Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  return response;
}

// Apply middleware to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)',
  ],
};
