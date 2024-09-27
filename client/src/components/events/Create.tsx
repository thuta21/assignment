import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Nav';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // For API calls

const EventCreate = () => {
  const navigate = useNavigate();

  // Initialize Formik with validation schema and form submission
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      image: null, // New field for the uploaded image
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Event title is required'),
      description: Yup.string().max(500, 'Description cannot exceed 500 characters'),
      date: Yup.date().required('Event date is required'),
      location: Yup.string().required('Event location is required'),
      image: Yup.mixed().required('An image file is required'), // New validation
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Append form fields to FormData
      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        const response = await axios.post(
          'http://localhost:3000/api/events',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
              'Content-Type': 'multipart/form-data', // Set content type for file uploads
            },
          }
        );
        console.log('New event created:', response.data);
        navigate('/events'); // Redirect to the events listing page
      } catch (error) {
        console.error('Error creating event:', error);
      }
    },
  });

  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="bg-white p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Event</h1>

          {/* Formik form */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Event Title</label>
              <input
                className={`border p-2 w-full rounded-md ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Description</label>
              <textarea
                className={`border p-2 w-full rounded-md ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''}`}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={500}
              />
              {formik.touched.description && formik.errors.description ? (
                <p className="text-red-500 text-sm">{formik.errors.description}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Event Date</label>
              <input
                className={`border p-2 w-full rounded-md ${formik.touched.date && formik.errors.date ? 'border-red-500' : ''}`}
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? (
                <p className="text-red-500 text-sm">{formik.errors.date}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Location</label>
              <input
                className={`border p-2 w-full rounded-md ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''}`}
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location ? (
                <p className="text-red-500 text-sm">{formik.errors.location}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Event Image</label>
              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/gif"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]); // Set the image file
                }}
                onBlur={formik.handleBlur}
                className={`border p-2 w-full rounded-md ${formik.touched.image && formik.errors.image ? 'border-red-500' : ''}`}
              />
              {formik.touched.image && formik.errors.image ? (
                <p className="text-red-500 text-sm">{formik.errors.image}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-green-400 px-4 py-2 rounded-md text-white hover:bg-green-500"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventCreate;
