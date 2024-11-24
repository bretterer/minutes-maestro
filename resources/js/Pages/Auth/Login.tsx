import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 flex items-center justify-center">
      <Head title="Login" />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please log in to your account
        </p>

        {status && (
          <div className="mt-4 text-center font-medium text-sm text-green-600">
            {status}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6">
          <div>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.currentTarget.value)}
              required
              autoFocus
            />
            <InputError className="mt-2" message={form.errors.email} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
              id="password"
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={form.data.password}
              onChange={(e) => form.setData('password', e.currentTarget.value)}
              required
              autoComplete="current-password"
            />
            <InputError className="mt-2" message={form.errors.password} />
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={form.data.remember === 'on'}
                onChange={(e) =>
                  form.setData('remember', e.currentTarget.checked ? 'on' : '')
                }
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
            {canResetPassword && (
              <div>
                <Link
                  href={route('password.request')}
                  className="underline text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="flex items-center justify-end">
              <Link
                href={route('register')}
                className="underline text-sm text-indigo-600 hover:text-indigo-800"
              >
                Need an account?
              </Link>

              <PrimaryButton
                className={classNames(
                  'ml-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600',
                  { 'opacity-50': form.processing }
                )}
                disabled={form.processing}
              >
                Log in
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
