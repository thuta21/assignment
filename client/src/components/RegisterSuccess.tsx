import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSuccess: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg text-center p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for registering for the event. You will receive an email with further details shortly.
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccess;
