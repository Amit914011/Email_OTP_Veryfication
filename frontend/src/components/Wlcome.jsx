import React from 'react';

function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 font-poppins">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {/* Checkmark Icon */}
        <div className="text-green-500 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2l4-4m0-6a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-gray-600 mb-6">
          Your email has been <span className="font-semibold text-green-600">verified successfully</span>.
        </p>

        {/* Continue Button */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition duration-300"
          onClick={() => {
            alert('Continuing to the dashboard...');
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Welcome;
