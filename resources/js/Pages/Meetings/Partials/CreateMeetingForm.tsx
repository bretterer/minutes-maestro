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

export default function CreateMeetingForm({onClose}: {onClose: () => void }) {
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
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
      <link rel="stylesheet" type="text/css" href="/css/QuillCustom.css" />

      <h3 className="text-3xl font-semibold text-gray-100 mb-6">
        Create a meeting
      </h3>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter meeting title"
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Start Time */}
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2" htmlFor="startTime">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* End Time */}
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2" htmlFor="endTime">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Committees */}
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2" htmlFor="endTime">
          Include Committees
        </label>
        <select multiple id="committees"
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onClose}
          className="bg-gray-600 text-gray-200 py-3 px-6 rounded-lg shadow-md mr-4 hover:bg-gray-700 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Save Minutes
        </button>
      </div>
    </div>
)









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
