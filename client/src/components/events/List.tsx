import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Nav';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShareAlt } from 'react-icons/fa';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShareLink = (eventId) => {
    const baseUrl = window.location.origin;  // Automatically gets the base URL
    const inviteLink = `${baseUrl}/events/${eventId}/invite`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success('Invite link copied to clipboard!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch((error) => {
      toast.error('Failed to copy invite link!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error copying invite link:', error);
    });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const token = localStorage.getItem('token');
              await axios.delete(`http://localhost:3000/api/events/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setEvents(events.filter(event => event.id !== id));
              toast.success('Event deleted successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } catch (error) {
              toast.error('Error deleting event!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.error('Error deleting event:', error);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            toast.info('Delete action cancelled.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
        },
      ],
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

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
            <h1 className="text-2xl font-bold text-gray-800">Events</h1>
            <Link to="/events/create">
              <button className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500">
                Create
              </button>
            </Link>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or location..."
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
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Image</th>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Title</th>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Location</th>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Date</th>
                    <th className="border-b-2 p-2 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents.map(event => (
                    <tr key={event.id}>
                      <td className="border-b p-2">{event.id}</td>
                      <td className="border-b p-2">
                        {event.images && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        )}
                      </td>
                      <td className="border-b p-2">{event.title}</td>
                      <td className="border-b p-2">{event.location}</td>
                      <td className="border-b p-2">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="border-b p-2 space-x-2">
                        <Link to={`/events/${event.id}`}>
                          <button className="text-green-500 hover:text-green-700">
                            <FaEye />
                          </button>
                        </Link>
                        <Link to={`/events/${event.id}/edit`}>
                          <button className="text-blue-500 hover:text-blue-700">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          onClick={() => handleShareLink(event.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaShareAlt />
                        </button>
                      </td>
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

export default EventList;
