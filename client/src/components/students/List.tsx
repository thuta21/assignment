import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Nav';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [studentsPerPage] = useState(3); // Students per page

  useEffect(() => {
    // Simulate fetching data from API.
    const fetchedStudents = [
      { id: 1, name: 'John Doe', age: 23, phoneNo: '123', email: 'john@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 2, name: 'Jane Smith', age: 23, phoneNo: '123', email: 'jane@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 3, name: 'Bob Johnson', age: 23, phoneNo: '123', email: 'bob@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 4, name: 'Alice Davis', age: 24, phoneNo: '123', email: 'alice@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 5, name: 'Charlie Brown', age: 25, phoneNo: '123', email: 'charlie@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 6, name: 'David Wilson', age: 26, phoneNo: '123', email: 'david@example.com', imageUrl: 'https://via.placeholder.com/50' },
      // Add more students for testing pagination
      { id: 7, name: 'Emma Stone', age: 27, phoneNo: '123', email: 'emma@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 8, name: 'Liam Neeson', age: 28, phoneNo: '123', email: 'liam@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 9, name: 'Olivia Wilde', age: 29, phoneNo: '123', email: 'olivia@example.com', imageUrl: 'https://via.placeholder.com/50' },
      { id: 10, name: 'Noah Centineo', age: 30, phoneNo: '123', email: 'noah@example.com', imageUrl: 'https://via.placeholder.com/50' },
    ];
    setStudents(fetchedStudents);
  }, []);

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
    console.log('Deleted student with id:', id);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="bg-white p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Students</h1>
            <Link to="/students/create">
              <button className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500">
                Create
              </button>
            </Link>
          </div>

          {/* Search input field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border rounded-md p-2 w-full"
            />
          </div>

          {/* Scrollable table container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">ID</th>
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Image</th> {/* New Image Column */}
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Name</th>
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Email</th>
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Age</th>
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Phone No</th>
                  <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100 transition duration-300">
                    <td className="border-b p-2">{student.id}</td>
                    <td className="border-b p-2"> {/* Image cell */}
                      <img
                        src={student.imageUrl}
                        alt={`${student.name}'s profile`}
                        className="rounded-full w-12 h-12" // Adjust size as needed
                      />
                    </td>
                    <td className="border-b p-2">{student.name}</td>
                    <td className="border-b p-2">{student.email}</td>
                    <td className="border-b p-2">{student.age}</td>
                    <td className="border-b p-2">{student.phoneNo}</td>
                    <td className="border-b p-2 flex space-x-2">
                      <Link to={`/students/update/${student.id}`}>
                        <button className="bg-blue-400 px-3 py-1 text-white rounded hover:bg-blue-500">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-400 px-3 py-1 text-white rounded hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
