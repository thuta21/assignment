import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Nav';

const StudentCreate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic for submitting data (API call).
    console.log('New student created:', { name, email });
    navigate('/students'); // Go back to the listing page
  };

  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="bg-white p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Student</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Enter Name</label>
              <input
                className="border p-2 w-full rounded-md"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Enter Email</label>
              <input
                className="border p-2 w-full rounded-md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentCreate;
