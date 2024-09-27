import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../Nav';
import axios from 'axios';

const EventUpdate = () => {
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // New image state
  const [existingImage, setExistingImage] = useState(null); // State to track existing image
  const navigate = useNavigate();
  const { id } = useParams(); // Get event ID from URL

  // Fetch the event details on component mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const eventData = response.data;
        setEvent(eventData);
        setTitle(eventData.title);
        setDescription(eventData.description);
        setDate(eventData.date.split('T')[0]);
        setLocation(eventData.location);
        setExistingImage(eventData.images); // Store existing image
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    if (image) {
      formData.append('image', image); // Upload new image if selected
    }

    try {
      await axios.put(`http://localhost:3000/api/event/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/events'); // Redirect to events listing
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set selected image
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="bg-white p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Update Event</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Enter Title</label>
              <input
                className="border p-2 w-full rounded-md"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Enter Description</label>
              <textarea
                className="border p-2 w-full rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Event Date</label>
              <input
                className="border p-2 w-full rounded-md"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Location</label>
              <input
                className="border p-2 w-full rounded-md"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Event Image</label>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <button
                type="button"
                onClick={() => document.getElementById('fileInput').click()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Choose Image
              </button>
              {existingImage && !image && (
                <div>
                  <p className="text-gray-600">Current image:</p>
                  <img
                    src={`http://localhost:3000/uploads/${existingImage}`} // Adjust URL based on setup
                    alt="Event"
                    className="mt-2 w-full h-32 object-cover"
                  />
                </div>
              )}
              {image && (
                <p className="mt-2 text-gray-600">{image.name}</p> // Show selected file name
              )}
            </div>
            <button className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventUpdate;
