/**
 * Authentication Error Page
 * /app/auth/error
 * Handles NextAuth.js authentication errors
 */

import { AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Authentication Error — VLN.gg',
};

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errors: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The verification token has expired or is invalid.',
    OAuthSignin: 'Error connecting to the OAuth provider.',
    OAuthCallback: 'Error in OAuth callback.',
    OAuthCreateAccount: 'Could not create user account.',
    EmailCreateAccount: 'Could not create user account.',
    Callback: 'An error occurred in the callback.',
    EmailSignInError: 'Could not send sign in email.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    SessionCallback: 'An error occurred in session callback.',
    default: 'An authentication error occurred.',
  };

  const error = searchParams.error || 'default';
  const message = errors[error] || errors.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Authentication Error
        </h1>

        <p className="text-slate-400 mb-8">{message}</p>

        <div className="flex gap-3">
          <a
            href="/auth/login"
            className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
          >
            Try Again
          </a>
          <a
            href="/"
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
