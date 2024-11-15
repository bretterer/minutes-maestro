import React from 'react';

export default function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal-container relative bg-white rounded-lg shadow-lg p-10 max-w-5xl w-11/12">
        <button
          onClick={onClose}
          className="close-button absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
