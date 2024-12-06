import React, { PropsWithChildren } from 'react';
import SectionTitle from '@/Components/SectionTitle';

interface Props {
  title: string;
  description: string;
}

export default function AltActionSection({
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-5">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium text-white">{title}</h3>

          <p className="mt-1 text-sm text-gray-300">{description}</p>
        </div>
      </div>

      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="px-4 py-5 sm:p-6 bg-gray-600 shadow sm:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
