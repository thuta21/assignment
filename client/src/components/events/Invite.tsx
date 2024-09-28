import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Invite = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [attendee, setAttendee] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}/invite`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      // Submit attendee registration data to the backend
      await axios.post(`http://localhost:3000/api/events/${id}/register`, attendee);
      // Redirect to the success page after successful registration
      navigate('/register-success');
    } catch (error) {
      console.error('Error registering attendee:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl">
        <div className="relative">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4">
            <i className="fas fa-calendar-alt"></i> {new Date(event.date).toLocaleDateString()} · {new Date(event.date).toLocaleTimeString()}
          </p>

          <div className="border-t border-b py-4 mb-4">
            <h2 className="font-semibold text-gray-700 mb-2">Additional Notes</h2>
            <p className="text-gray-600">{event.description || 'No additional notes available.'}</p>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gray-600 font-semibold">Location:</span>
            <p className="text-gray-600">{event.location}</p>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Register
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Register for {event.title}</h2>
              <input
                type="text"
                placeholder="Name"
                value={attendee.name}
                onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                className="border p-2 mb-4 w-full rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={attendee.email}
                onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                className="border p-2 mb-4 w-full rounded-md"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invite;
