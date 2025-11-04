'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';

import { notify } from '@/shared/lib/toaster';
import { FireIcon } from '@/shared/ui/icons/fire-icon';
import { Button } from '@/shared/ui/kit/button';
import { TextField } from '@/shared/ui/kit/text-field';

import { register } from '../api/register';
import { registerSchema } from '../model/register.schema';

export const RegisterForm = () => {
  const router = useRouter();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async data => {
      const { value } = data;

      const res = await register(value);

      if ('error' in res) {
        notify(
          Array.isArray(res.message) ? res.message.join(', ') : res.message,
        );
        return;
      }

      notify('Register successful');
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
          />
        )}
      </Field>
      <Field name="username">
        {field => (
          <TextField
            name={field.name}
            label="Username"
            placeholder="john.doe"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
          />
        )}
      </Field>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit]) => (
          <Button variant="outline" disabled={!canSubmit} type="submit">
            <FireIcon />
            Register
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
