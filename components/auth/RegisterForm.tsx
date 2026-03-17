'use client';

/**
 * Register Form Component
 * User registration with password validation
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, Loader2, Check, X } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { label: 'At least 12 characters', check: (p) => p.length >= 12 },
  { label: 'Uppercase letter (A-Z)', check: (p) => /[A-Z]/.test(p) },
  { label: 'Lowercase letter (a-z)', check: (p) => /[a-z]/.test(p) },
  { label: 'Number (0-9)', check: (p) => /[0-9]/.test(p) },
  { label: 'Special character (!@#$%^&*)', check: (p) => /[!@#$%^&*]/.test(p) },
];

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordStrength = PASSWORD_REQUIREMENTS.filter((req) =>
    req.check(formData.password)
  ).length;

  const isPasswordValid = passwordStrength === PASSWORD_REQUIREMENTS.length;
  const passwordsMatch =
    formData.password === formData.confirmPassword && formData.password !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Success - redirect to login
      router.push('/auth/login?registered=true');
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
              disabled={loading}
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
              disabled={loading}
              required
            />
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="mt-3 space-y-2">
              {PASSWORD_REQUIREMENTS.map((req, idx) => {
                const met = req.check(formData.password);
                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    {met ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-slate-500" />
                    )}
                    <span className={met ? 'text-green-400' : 'text-slate-400'}>
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
              disabled={loading}
              required
            />
          </div>

          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              {passwordsMatch ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-400">Passwords match</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-red-400">Passwords do not match</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            required
            disabled={loading}
            className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 cursor-pointer"
          />
          <span className="text-xs text-slate-400">
            I agree to the{' '}
            <a href="/terms" className="text-cyan-400 hover:text-cyan-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-cyan-400 hover:text-cyan-300">
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isPasswordValid || !passwordsMatch}
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
