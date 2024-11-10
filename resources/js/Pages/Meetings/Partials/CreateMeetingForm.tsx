import { useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import classNames from 'classnames';

export default function CreateMeetingForm() {
  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    name: '',
    start_time: '',
    end_time: '',
  });

  function createMeeting() {
    form.post(route('meetings.store'), {
      errorBag: 'createMeeting',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createMeeting}
      title={'Meeting Details'}
      description={'Create a new meeting'}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >

      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Meeting Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoFocus
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

        <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="start_time" value="Start Date" />
            <TextInput
            id="start_time"
            type="datetime-local"
            className="mt-1 block w-full"
            value={form.data.start_time}
            onChange={e => form.setData('start_time', e.currentTarget.value)}
            />
            <InputError message={form.errors.start_time} className="mt-2" />
        </div>

        <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="end_time" value="End Date" />
            <TextInput
            id="end_time"
            type="datetime-local"
            className="mt-1 block w-full"
            value={form.data.end_time}
            onChange={e => form.setData('end_time', e.currentTarget.value)}
            />
            <InputError message={form.errors.end_time} className="mt-2" />
        </div>

    </FormSection>
  );
}
