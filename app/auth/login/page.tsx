/**
 * Login Page
 * /app/auth/login
 * Email/password and OAuth authentication
 */

import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login — VLN.gg',
  description: 'Sign in to your VLN account',
};

export default async function LoginPage() {
  const session = await getAuth();

  // Redirect if already authenticated
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your VLN account</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Don&apos;t have an account?{' '}
          <a
            href="/auth/register"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
