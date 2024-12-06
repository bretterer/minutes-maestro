import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Register() {
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 flex items-center justify-center">
      <Head title="Register" />
      <div className="w-full max-w-md p-6 bg-blue-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-gray-50">Create an Account</h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Please fill in the details to create a new account.
        </p>

        <form onSubmit={onSubmit} className="mt-6">
          <div>
            <InputLabel htmlFor="name">Name</InputLabel>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2 text-yellow-400" message={form.errors.name} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2 text-yellow-400" message={form.errors.email} />
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
              autoComplete="new-password"
            />
            <InputError className="mt-2 text-yellow-400" message={form.errors.password} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
            <TextInput
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={form.data.password_confirmation}
              onChange={(e) =>
                form.setData('password_confirmation', e.currentTarget.value)
              }
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2 text-yellow-400" message={form.errors.password_confirmation} />
          </div>

          <div className="flex items-center justify-between mt-6">
            <Link
              href={route('login')}
              className="underline text-sm text-gray-300 hover:text-gray-400"
            >
              Already registered?
            </Link>

            <PrimaryButton
              className={classNames(
                'px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600',
                { 'opacity-50': form.processing }
              )}
              disabled={form.processing}
            >
              Register
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
