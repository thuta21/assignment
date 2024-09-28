import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useHistory
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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
              onClick={() => navigate('/')}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
