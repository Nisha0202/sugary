import React, { useState } from 'react';

const Sure = ({ message, onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className="absolute mt-12 z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex items-center justify-center bg-white border border-gray-300 rounded shadow"
    >
      <div className="relative p-4 max-w-md ">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-black"
          onClick={() => {
            setIsVisible(false);
            onCancel();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="alert alert-success min-w-64 border-0 text-green-600 font-bold bg-white flex gap-1 items-start p-2 max-w-md rounded-md mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="">{message}</span>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              setIsVisible(false);
              onConfirm();
            }}
            className="px-4 py-2 font-bold text-red-600 hover:text-text hover:bg-gray-200 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="px-4 py-2 font-bold text-green-600 hover:text-text hover:bg-gray-200 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sure;


