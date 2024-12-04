import { useForm, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import classNames from 'classnames';

interface Committee {
    id: number;
    name: string;
}

export default function CreateMeetingForm({ onClose }: { onClose: () => void }) {
    const { props } = usePage(); // Get Inertia page props

    const form = useForm({
        name: '',
        start_time: '',
        end_time: '',
        committees: [] as string[], // Array to store selected committee IDs
    });

    const [committees, setCommittees] = useState<Committee[]>([]);

    useEffect(() => {
        const fetchCommittees = async () => {
            try {

                const response = await window.axios.get('/api/committees');
                setCommittees(response.data);

            } catch (error) {
                console.error('Error fetching committees:', error);
            }


        };
        fetchCommittees();
    }, []);

    const createMeeting = async () => {
        try {
          await window.axios.post(route('meetings.store'), {
            name: form.data.name,
            start_time: form.data.start_time,
            end_time: form.data.end_time,
            committees: form.data.committees,
          });
          window.location.href = '/dashboard';

        } catch (error) {
          console.error('Error creating meeting:', error);
        }
      };



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
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />
                <InputError message={form.errors.name} className="mt-2" />
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
                    onChange={e => form.setData('start_time', e.currentTarget.value)}
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
                    onChange={e => form.setData('end_time', e.currentTarget.value)}
                />
            </div>

            {/* Committees */}
            <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2" htmlFor="endTime">
                    Include Committees
                </label>
                <select
                    multiple
                    id="committees"
                    name="committees" // Add name attribute
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    value={form.data.committees}
                    onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (option) =>
                            option.value
                        );
                        form.setData('committees', selected);
                    }}
                >
                    {committees.map((committee) => (
                        <option key={committee.id} value={committee.id}>
                            {committee.name}
                        </option>
                    ))}
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
                    onClick={createMeeting}
                    type="button"
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                >
                    Create Meeting
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
