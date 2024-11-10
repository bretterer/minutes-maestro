import CreateMeetingForm from '@/Pages/Meetings/Partials/CreateMeetingForm';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

export default function Create() {
  return (
    <AppLayout
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
    </AppLayout>
  );
}
