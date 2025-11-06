'use client';

import { Activity } from 'react';

export const ErrorText = ({ value }: { value?: string }) => (
  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
    <p className="mb-2 font-semibold">
      Ooops, the application is currently not available. Please try again later.
    </p>
    <Activity mode={value ? 'visible' : 'hidden'}>
      <p className="text-sm text-red-700">More details: {value}</p>
    </Activity>
  </div>
);
