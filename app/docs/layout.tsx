import { Metadata } from 'next';
import { Sidebar } from '@/components/docs/Sidebar';
import { DocHeader } from '@/components/docs/DocHeader';
import { DocFooter } from '@/components/docs/DocFooter';
import '@/styles/docs.css';

export const metadata: Metadata = {
  title: 'VLN Documentation',
  description:
    'Comprehensive documentation for VLN DevOps, security, and smart contract auditing',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'VLN Documentation',
    description:
      'Comprehensive documentation for VLN DevOps, security, and smart contract auditing',
    url: 'https://vln.gg/docs',
    siteName: 'VLN',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VLN Documentation',
    description:
      'Comprehensive documentation for VLN DevOps, security, and smart contract auditing'
  }
};

export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocHeader />
      <div className="flex min-h-screen bg-charcoal">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            {/* Content Area */}
            <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {children}
            </div>

            {/* Right Sidebar - Reserved for TOC */}
            <aside className="hidden xl:block w-64 flex-shrink-0" />
          </div>

          {/* Footer */}
          <DocFooter />
        </main>
      </div>
    </>
  );
}
