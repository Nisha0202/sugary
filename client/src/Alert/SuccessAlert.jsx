import React, { useState } from 'react';

const SuccessAlert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex items-center justify-center bg-gray-100 p-2 border border-gray-300 rounded shadow-xl"
    >
      <div className="relative p-4 w-80 ">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-black"
          onClick={() => setIsVisible(false)}
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
        <div className="alert alert-success border-0 text-green-700 font-bold bg-gray-100 flex gap-1
         items-center p-2 max-w-md rounded-md mt-1">
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
      </div>
    </div>
  );
};

export default SuccessAlert;

