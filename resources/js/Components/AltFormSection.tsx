import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import SectionTitle from '@/Components/SectionTitle';

interface Props {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
}

export default function AltFormSection({
  onSubmit,
  renderActions,
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions;

  return (
    <div className="flex flex-col gap-5">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-300">{description}</p>
        </div>
      </div>

      <div className="mt-5 md:mt-0 md:col-span-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div
            className={classNames(
              'px-4 py-5 bg-gray-200 sm:p-6 shadow',
              hasActions
                ? 'sm:rounded-tl-md sm:rounded-tr-md'
                : 'sm:rounded-md',
            )}
          >
            <div className="grid grid-cols-6 gap-6">{children}</div>
          </div>

          {hasActions && (
            <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
              {renderActions?.()}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
