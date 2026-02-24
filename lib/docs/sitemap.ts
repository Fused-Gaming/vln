/**
 * VLN Docs Sitemap & Navigation Structure
 * Centralized configuration for all documentation pages and sections
 */

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

export interface DocSection {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  pages: DocPage[];
}

export const docsSitemap: DocSection[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your VLN development environment',
    icon: '🚀',
    order: 1,
    pages: [
      {
        slug: 'quick-start',
        title: 'Quick Start',
        description: 'TL;DR - Get running in 5 minutes',
        order: 1
      },
      {
        slug: 'prerequisites',
        title: 'Prerequisites',
        description: 'Install required tools and dependencies',
        order: 2
      },
      {
        slug: 'local-setup',
        title: 'Local Development Setup',
        description: 'Run VLN locally on your machine',
        order: 3
      },
      {
        slug: 'first-deploy',
        title: 'Your First Deployment',
        description: 'Deploy to Vercel in 10 minutes',
        order: 4
      },
      {
        slug: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Common setup issues and solutions',
        order: 5
      }
    ]
  },
  {
    slug: 'ci-cd',
    title: 'CI/CD Pipeline',
    description: 'GitHub Actions automation and workflows',
    icon: '🔧',
    order: 2,
    pages: [
      {
        slug: 'overview',
        title: 'Pipeline Overview',
        description: 'Architecture and design principles',
        order: 1
      },
      {
        slug: 'github-actions-ci',
        title: 'CI Workflow',
        description: 'Lint, test, and build automation',
        order: 2
      },
      {
        slug: 'github-actions-deploy',
        title: 'Deploy Workflow',
        description: 'Production deployment automation',
        order: 3
      },
      {
        slug: 'github-actions-preview',
        title: 'Preview Deployments',
        description: 'Automatic PR preview environments',
        order: 4
      },
      {
        slug: 'github-actions-security',
        title: 'Security Scanning',
        description: 'Automated security checks and audits',
        order: 5
      },
      {
        slug: 'triggers',
        title: 'Workflow Triggers',
        description: 'What triggers each workflow',
        order: 6
      },
      {
        slug: 'custom-workflows',
        title: 'Custom Workflows',
        description: 'Adding and modifying workflows',
        order: 7
      }
    ]
  },
  {
    slug: 'deployment',
    title: 'Deployment',
    description: 'Vercel and production deployment',
    icon: '🚀',
    order: 3,
    pages: [
      {
        slug: 'overview',
        title: 'Deployment Overview',
        description: 'Deployment philosophy and strategy',
        order: 1
      },
      {
        slug: 'vercel-setup',
        title: 'Vercel Configuration',
        description: 'Configure Vercel for VLN',
        order: 2
      },
      {
        slug: 'environments',
        title: 'Environments',
        description: 'Development, staging, and production',
        order: 3
      },
      {
        slug: 'manual-deploy',
        title: 'Manual Deployment',
        description: 'Deploy via CLI commands',
        order: 4
      },
      {
        slug: 'rollback',
        title: 'Rollback Procedures',
        description: 'How to rollback a deployment',
        order: 5
      },
      {
        slug: 'troubleshooting',
        title: 'Deployment Troubleshooting',
        description: 'Common deployment issues',
        order: 6
      }
    ]
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure',
    description: 'GitHub, secrets, and infrastructure',
    icon: '⚙️',
    order: 4,
    pages: [
      {
        slug: 'architecture',
        title: 'Architecture',
        description: 'Infrastructure overview and diagrams',
        order: 1
      },
      {
        slug: 'github-config',
        title: 'GitHub Configuration',
        description: 'Repository setup and branch protection',
        order: 2
      },
      {
        slug: 'secrets-management',
        title: 'Secrets Management',
        description: 'GitHub Secrets best practices',
        order: 3
      },
      {
        slug: 'environment-variables',
        title: 'Environment Variables',
        description: '.env setup for all environments',
        order: 4
      },
      {
        slug: 'infrastructure-as-code',
        title: 'Infrastructure as Code',
        description: 'Terraform and YAML templates',
        order: 5
      }
    ]
  },
  {
    slug: 'monitoring',
    title: 'Monitoring & Observability',
    description: 'Dashboards, alerts, and logging',
    icon: '📊',
    order: 5,
    pages: [
      {
        slug: 'overview',
        title: 'Monitoring Overview',
        description: 'Key metrics and dashboards',
        order: 1
      },
      {
        slug: 'alerts',
        title: 'Alert Configuration',
        description: 'Set up uptime and error alerts',
        order: 2
      },
      {
        slug: 'logging',
        title: 'Logging & Log Aggregation',
        description: 'Vercel and GitHub logs',
        order: 3
      },
      {
        slug: 'performance-tracking',
        title: 'Performance Tracking',
        description: 'Lighthouse and Core Web Vitals',
        order: 4
      },
      {
        slug: 'incident-response',
        title: 'Incident Response',
        description: 'Incident playbook and procedures',
        order: 5
      }
    ]
  },
  {
    slug: 'security',
    title: 'Security',
    description: 'Security policies and compliance',
    icon: '🔒',
    order: 6,
    pages: [
      {
        slug: 'overview',
        title: 'Security Overview',
        description: 'VLN security approach',
        order: 1
      },
      {
        slug: 'threat-model',
        title: 'Threat Modeling',
        description: 'STRIDE threat analysis',
        order: 2
      },
      {
        slug: 'secrets-policy',
        title: 'Secrets Policy',
        description: 'How secrets are managed',
        order: 3
      },
      {
        slug: 'access-control',
        title: 'Access Control',
        description: 'GitHub team permissions',
        order: 4
      },
      {
        slug: 'audit-logging',
        title: 'Audit Logging',
        description: 'What we log and why',
        order: 5
      },
      {
        slug: 'compliance',
        title: 'Compliance',
        description: 'SOC2, GDPR, and standards',
        order: 6
      }
    ]
  },
  {
    slug: 'testing',
    title: 'Testing',
    description: 'Testing strategy and automation',
    icon: '🧪',
    order: 7,
    pages: [
      {
        slug: 'strategy',
        title: 'Testing Strategy',
        description: 'Testing philosophy and approach',
        order: 1
      },
      {
        slug: 'unit-tests',
        title: 'Unit Tests',
        description: 'Vitest setup and patterns',
        order: 2
      },
      {
        slug: 'integration-tests',
        title: 'Integration Tests',
        description: 'API and database tests',
        order: 3
      },
      {
        slug: 'e2e-tests',
        title: 'E2E Tests',
        description: 'Playwright setup and patterns',
        order: 4
      },
      {
        slug: 'coverage',
        title: 'Test Coverage',
        description: 'Coverage thresholds and reporting',
        order: 5
      }
    ]
  },
  {
    slug: 'developers',
    title: 'For Developers',
    description: 'Contributing and code standards',
    icon: '👨‍💻',
    order: 8,
    pages: [
      {
        slug: 'contributing',
        title: 'Contributing Guide',
        description: 'How to contribute to VLN',
        order: 1
      },
      {
        slug: 'code-standards',
        title: 'Code Standards',
        description: 'TypeScript, React, Tailwind guidelines',
        order: 2
      },
      {
        slug: 'code-review',
        title: 'Code Review',
        description: 'PR review checklist and process',
        order: 3
      },
      {
        slug: 'git-workflow',
        title: 'Git Workflow',
        description: 'Git branching strategy',
        order: 4
      },
      {
        slug: 'commit-conventions',
        title: 'Commit Conventions',
        description: 'Conventional Commits format',
        order: 5
      },
      {
        slug: 'debugging',
        title: 'Debugging',
        description: 'Debugging techniques and tools',
        order: 6
      }
    ]
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    icon: '🆘',
    order: 9,
    pages: [
      {
        slug: 'faq',
        title: 'Frequently Asked Questions',
        description: 'Common questions and answers',
        order: 1
      },
      {
        slug: 'build-failures',
        title: 'Build Failures',
        description: 'Debugging build failures',
        order: 2
      },
      {
        slug: 'deployment-errors',
        title: 'Deployment Errors',
        description: 'Deployment troubleshooting',
        order: 3
      },
      {
        slug: 'performance-issues',
        title: 'Performance Issues',
        description: 'Performance troubleshooting',
        order: 4
      },
      {
        slug: 'emergency-procedures',
        title: 'Emergency Procedures',
        description: 'Emergency rollback and recovery',
        order: 5
      }
    ]
  },
  {
    slug: 'api-reference',
    title: 'API Reference',
    description: 'API endpoints and specifications',
    icon: '🔌',
    order: 10,
    pages: [
      {
        slug: 'overview',
        title: 'API Overview',
        description: 'VLN API endpoints',
        order: 1
      },
      {
        slug: 'authentication',
        title: 'Authentication',
        description: 'API authentication methods',
        order: 2
      },
      {
        slug: 'endpoints',
        title: 'Endpoints',
        description: 'Complete endpoint documentation',
        order: 3
      }
    ]
  }
];

/**
 * Get all sections
 */
export function getAllSections(): DocSection[] {
  return docsSitemap.sort((a, b) => a.order - b.order);
}

/**
 * Get section by slug
 */
export function getSectionBySlug(slug: string): DocSection | undefined {
  return docsSitemap.find(s => s.slug === slug);
}

/**
 * Get page by section and page slug
 */
export function getPageBySlug(
  sectionSlug: string,
  pageSlug: string
): DocPage | undefined {
  const section = getSectionBySlug(sectionSlug);
  return section?.pages.find(p => p.slug === pageSlug);
}

/**
 * Get all pages in a section
 */
export function getPagesBySection(sectionSlug: string): DocPage[] {
  const section = getSectionBySlug(sectionSlug);
  return section?.pages.sort((a, b) => a.order - b.order) || [];
}

/**
 * Get previous page in navigation
 */
export function getPreviousPage(
  sectionSlug: string,
  pageSlug: string
): { section: DocSection; page: DocPage } | null {
  const sections = getAllSections();
  const currentSectionIndex = sections.findIndex(s => s.slug === sectionSlug);

  if (currentSectionIndex === -1) return null;

  const currentSection = sections[currentSectionIndex];
  const currentPageIndex = currentSection.pages.findIndex(
    p => p.slug === pageSlug
  );

  // If we're not on the first page, return previous page in same section
  if (currentPageIndex > 0) {
    return {
      section: currentSection,
      page: currentSection.pages[currentPageIndex - 1]
    };
  }

  // If we're on the first page, go to last page of previous section
  if (currentSectionIndex > 0) {
    const previousSection = sections[currentSectionIndex - 1];
    const lastPage = previousSection.pages[previousSection.pages.length - 1];
    return {
      section: previousSection,
      page: lastPage
    };
  }

  return null;
}

/**
 * Get next page in navigation
 */
export function getNextPage(
  sectionSlug: string,
  pageSlug: string
): { section: DocSection; page: DocPage } | null {
  const sections = getAllSections();
  const currentSectionIndex = sections.findIndex(s => s.slug === sectionSlug);

  if (currentSectionIndex === -1) return null;

  const currentSection = sections[currentSectionIndex];
  const currentPageIndex = currentSection.pages.findIndex(
    p => p.slug === pageSlug
  );

  // If we're not on the last page, return next page in same section
  if (currentPageIndex < currentSection.pages.length - 1) {
    return {
      section: currentSection,
      page: currentSection.pages[currentPageIndex + 1]
    };
  }

  // If we're on the last page, go to first page of next section
  if (currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    const firstPage = nextSection.pages[0];
    return {
      section: nextSection,
      page: firstPage
    };
  }

  return null;
}

/**
 * Get breadcrumb path
 */
export function getBreadcrumbs(sectionSlug: string, pageSlug?: string) {
  const section = getSectionBySlug(sectionSlug);

  if (!section) return [];

  const crumbs = [
    {
      label: 'Docs',
      href: '/docs'
    },
    {
      label: section.title,
      href: `/docs/${sectionSlug}`
    }
  ];

  if (pageSlug) {
    const page = getPageBySlug(sectionSlug, pageSlug);
    if (page) {
      crumbs.push({
        label: page.title,
        href: `/docs/${sectionSlug}/${pageSlug}`
      });
    }
  }

  return crumbs;
}
