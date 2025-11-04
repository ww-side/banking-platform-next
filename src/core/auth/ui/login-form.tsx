'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';

import { notify } from '@/shared/lib/toaster';
import { FireIcon } from '@/shared/ui/icons/fire-icon';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import { login } from '../api/login';
import { loginSchema } from '../model/login.schema';

export const LoginForm = () => {
  const router = useRouter();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async data => {
      const { value } = data;

      const res = await login(value);

      if ('error' in res) {
        notify(
          Array.isArray(res.message) ? res.message.join(', ') : res.message,
        );
        return;
      }

      notify('Login successful');
      router.push('/');
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit().catch(console.error);
      }}
      className="flex w-[400px] flex-col gap-4"
    >
      <Field name="email">
        {field => (
          <TextField
            name={field.name}
            label="Email"
            placeholder="john.doe@example.com"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            intent={field.state.meta.errors.length ? 'danger' : 'primary'}
            hint={field.state.meta.errors
              .map(error => error?.message)
              .join(', ')}
          />
        )}
      </Field>
      <Field name="password">
        {field => (
          <TextField
            name={field.name}
            label="Password"
            placeholder="********"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            intent={field.state.meta.errors.length ? 'danger' : 'primary'}
            hint={field.state.meta.errors
              .map(error => error?.message)
              .join(', ')}
          />
        )}
      </Field>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit]) => (
          <Button variant="outline" disabled={!canSubmit} type="submit">
            <FireIcon />
            Login
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
