import React, { useState } from 'react';
import { useFormik } from 'formik';
import { register } from './api'; // Import the register API function

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email format';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    },
    onSubmit: async values => {
      try {
        await register(values.name, values.email, values.password);
        setSuccess('Registration successful! Please log in.');
        setError('');
        formik.resetForm(); // Optionally reset the form after successful registration
      } catch (err) {
        setError(err.message || 'Registration failed');
        setSuccess('');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create an Account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 ${
                formik.errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && <div className="text-red-500 mt-2 text-sm">{formik.errors.name}</div>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 ${
                formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && <div className="text-red-500 mt-2 text-sm">{formik.errors.email}</div>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 ${
                formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && <div className="text-red-500 mt-2 text-sm">{formik.errors.password}</div>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 ${
                formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && (
              <div className="text-red-500 mt-2 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
          {success && <div className="text-green-500 mb-4 text-sm">{success}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md font-medium hover:bg-green-600 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
