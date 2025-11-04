'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { LoadingForm } from '@/shared/ui/components/loading-form';

import { RegisterForm } from './register-form';

const LoginForm = dynamic(
  () => import('./login-form').then(mod => mod.LoginForm),
  {
    ssr: false,
    loading: () => <LoadingForm />,
  },
);

export const AuthForm = () => {
  const [hasAccount, setHasAccount] = useState(false);

  return (
    <FormLayout>
      {!hasAccount ? <RegisterForm /> : <LoginForm />}
      <button
        type="button"
        className="ml-auto cursor-pointer"
        onClick={() => setHasAccount(!hasAccount)}
      >
        <p className="text-sm text-gray-600">
          {hasAccount ? 'Create an account' : 'Already have an account? Login'}
        </p>
      </button>
    </FormLayout>
  );
};

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col gap-2 rounded-xl bg-gray-100 p-10">
      {children}
    </section>
  );
};
