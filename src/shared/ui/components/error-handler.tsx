import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { deleteAuthCookies } from '@/core/auth/model/delete-auth-cookies';
import type { HttpError } from '@/core/http/model/types';

import { ErrorText } from '../kit/error-text';

const isHttpError = (data: unknown): data is HttpError =>
  typeof data === 'object' && data !== null && 'error' in data;

export const ErrorHandler = async <T extends readonly unknown[]>({
  data,
  children,
}: {
  data: T;
  children: (
    ...resolvedData: { [K in keyof T]: Exclude<T[K], HttpError> }
  ) => ReactNode;
}) => {
  for (const res of data) {
    if (isHttpError(res) && res.statusCode === 401) {
      await deleteAuthCookies();
      redirect('/auth');
    }

    if (isHttpError(res) && res.statusCode !== 200) {
      const msg = Array.isArray(res.message)
        ? res.message.join(', ')
        : res.message;
      return <ErrorText value={msg} />;
    }
  }

  return (
    <>{children(...(data as { [K in keyof T]: Exclude<T[K], HttpError> }))}</>
  );
};
