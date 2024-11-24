import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 flex items-center justify-center">
      <Head title="Email Verification" />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Before continuing, please verify your email address by clicking on the
          link we just sent you. If you didn’t receive the email, we’ll gladly send you another.
        </p>

        {verificationLinkSent && (
          <div className="mt-4 font-medium text-center text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6">
          <div className="flex flex-col space-y-4">
            <PrimaryButton
              className={classNames(
                'px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600',
                { 'opacity-50': form.processing }
              )}
              disabled={form.processing}
            >
              Resend Verification Email
            </PrimaryButton>

            <div className="flex items-center justify-between mt-4">
              <Link
                href={route('profile.show')}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Edit Profile
              </Link>

              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Log Out
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
