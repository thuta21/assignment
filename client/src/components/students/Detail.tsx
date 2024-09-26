import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../Nav';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Simulate fetching student data based on the ID from the URL
    const fetchedStudent = {
      id: parseInt(id, 10),
      name: 'John Doe',
      email: 'john@example.com',
    };
    setStudent(fetchedStudent);
  }, [id]);

  if (!student) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="bg-white p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Student Details</h1>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Name</label>
            <p className="border p-2 w-full rounded-md">{student.name}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <p className="border p-2 w-full rounded-md">{student.email}</p>
          </div>
          <div className="flex justify-between mt-6">
            <Link to="/students">
              <button className="bg-blue-400 px-4 py-2 rounded-md text-white hover:bg-blue-500">
                Back to List
              </button>
            </Link>
            <Link to={`/students/update/${student.id}`}>
              <button className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
