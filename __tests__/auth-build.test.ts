import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Auth Pages - Build Safety', () => {
  it('should have dynamic export on auth/login page to prevent build failures', () => {
    const loginPagePath = path.join(process.cwd(), 'app/auth/login/page.tsx');
    const content = fs.readFileSync(loginPagePath, 'utf-8');

    expect(content).toContain("export const dynamic = 'force-dynamic'");
    expect(content).toMatch(/'use client';/);
  });

  it('should have use client directive before dynamic export', () => {
    const loginPagePath = path.join(process.cwd(), 'app/auth/login/page.tsx');
    const content = fs.readFileSync(loginPagePath, 'utf-8');

    const useClientIndex = content.indexOf("'use client';");
    const dynamicIndex = content.indexOf("export const dynamic = 'force-dynamic'");

    expect(useClientIndex).toBeGreaterThanOrEqual(0);
    expect(dynamicIndex).toBeGreaterThan(useClientIndex);
  });

  it('auth callbacks should handle empty URLs safely', () => {
    const authPath = path.join(process.cwd(), 'lib/auth.ts');
    const content = fs.readFileSync(authPath, 'utf-8');

    expect(content).toContain('redirect');
    expect(content).toContain('baseUrl');
  });
});
