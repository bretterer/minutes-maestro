import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.email'));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 flex items-center justify-center">
      <Head title="Forgot Password" />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">Forgot Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address,
          and we will email you a password reset link that will allow you to choose a new one.
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

          <div className="flex items-center justify-end mt-6">
            <PrimaryButton
              className={classNames(
                'px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600',
                { 'opacity-50': form.processing }
              )}
              disabled={form.processing}
            >
              Email Password Reset Link
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
