'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
interface FormData {
  name: string;
  email: string;
}

type FormStatus = 'idle' | 'loading' | 'success';

interface WaitlistFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  className?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({
  onSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call if no onSubmit provided
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setStatus('success');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
      setStatus('idle');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (status === 'success') {
    return (
      <div className="min-h-[700px] flex items-center justify-center p-6">
        <div className="relative w-full max-w-md p-8 rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-blue-500/30 opacity-30" />
          <div className="relative flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
            <h2 className="text-2xl font-bold text-white">
              Thank you for joining!
            </h2>
            <p className="text-gray-200">
              We&apos;ll notify you when we launch. Stay tuned!
            </p>
          </div>
          <div className="w-[90%] ml-auto mr-auto mt-6 items-center justify-center flex">
            <Link
              href="/"
              className={cn(buttonVariants(), 'ml-auto mr-auto w-[60%]')}
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[600px] flex items-center justify-center p-6 ${className}`}
    >
      <div className="relative w-full max-w-md p-8 rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 opacity-30" />

        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
            Join InFuse Waitlist
          </h2>
          <p className="text-gray-200 mb-8 animate-fade-in opacity-90">
            Be the first to experience that secured MPC wallet.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-slide-up">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2 animate-slide-up">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm animate-shake">{error}</p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 rounded-lg text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all disabled:opacity-70 animate-slide-up flex items-center justify-center space-x-2"
              shine
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <span>Join Waitlist</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;
