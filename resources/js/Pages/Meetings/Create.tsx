import CreateMeetingForm from '@/Pages/Meetings/Partials/CreateMeetingForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

export default function Create() {
  return (
    <AuthenticatedLayout
      title="Create Meeting"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Create Meeting
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <CreateMeetingForm />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
