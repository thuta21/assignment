import React, { useState, useEffect } from 'react';
import Navigation from '../Nav';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';

const OrganizerList = () => {
  const [organizers, setOrganizers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [organizersPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/organizers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrganizers(response.data);
      } catch (error) {
        console.error('Error fetching organizers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrganizers = organizers.filter(organizer =>
    organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    organizer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastOrganizer = currentPage * organizersPerPage;
  const indexOfFirstOrganizer = indexOfLastOrganizer - organizersPerPage;
  const currentOrganizers = filteredOrganizers.slice(indexOfFirstOrganizer, indexOfLastOrganizer);
  const totalPages = Math.ceil(filteredOrganizers.length / organizersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navigation />
      <ToastContainer />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="bg-white p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Organizers</h1>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border rounded-md p-2 w-full"
            />
          </div>

          {loading ? (
            <div className="flex justify-center">
              <ClipLoader color={"#4A90E2"} loading={loading} size={50} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">ID</th>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Name</th>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrganizers.map(organizer => (
                    <tr key={organizer.id}>
                      <td className="border-b p-2">{organizer.id}</td>
                      <td className="border-b p-2">{organizer.name}</td>
                      <td className="border-b p-2">{organizer.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-3 py-1 border rounded-md ${
                      page === currentPage ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerList;
