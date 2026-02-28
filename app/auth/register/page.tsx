/**
 * Register Page
 * /app/auth/register
 * User registration with email and password
 */

import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create Account — VLN.gg',
  description: 'Create your VLN account',
};

export default async function RegisterPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join VLN for advanced security auditing</p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
