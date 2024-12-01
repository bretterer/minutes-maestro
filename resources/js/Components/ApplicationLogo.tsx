import React from 'react';

export default function ApplicationLogo({ className }: { className?: string }) {
  return (
    <div className={`text-2xl font-bold text-blue-600 ${className}`}>
      Minutes Maestro
    </div>
  );
}
