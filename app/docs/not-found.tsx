import Link from 'next/link';
import { LucideArrowLeft, LucideSearch } from 'lucide-react';

export default function DocsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-charcoal px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 Icon */}
        <div className="text-6xl">📚</div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white">Page Not Found</h1>

        {/* Description */}
        <p className="text-lg text-gray-400">
          The documentation page you're looking for doesn't exist or has been
          moved.
        </p>

        {/* Links */}
        <div className="flex flex-col gap-3 pt-6">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage-500 text-charcoal font-semibold rounded-lg hover:bg-sage-400 transition-colors"
          >
            <LucideArrowLeft className="w-4 h-4" />
            Back to Docs
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-sage-500 text-sage-400 font-semibold rounded-lg hover:bg-sage-500/10 transition-colors"
          >
            <LucideSearch className="w-4 h-4" />
            Return Home
          </Link>
        </div>

        {/* Helpful Text */}
        <p className="text-sm text-gray-500 pt-4">
          If you think this is a mistake, please{' '}
          <a href="/contact" className="text-sage-400 hover:text-sage-300">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
